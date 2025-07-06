package monitor

import (
	"crypto/sha1"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/smtp"
	"net/url"
	"os"
	"path/filepath"
	"time"

	"github.com/Aditya251610/pingify/internal/requester"
)

type MonitorLog struct {
	Timestamp     time.Time     `json:"timestamp"`
	URL           string        `json:"url"`
	Method        string        `json:"method"`
	StatusCode    int           `json:"status_code"`
	StatusText    string        `json:"status_text"`
	ExecutionTime time.Duration `json:"execution_time"`
	Threshold     time.Duration `json:"threshold"`
	Exceeded      bool          `json:"exceeded"`
	Success       bool          `json:"success"`
}

// --- Utility Functions ---
func isValidURL(rawURL string) bool {
	parsedURL, err := url.ParseRequestURI(rawURL)
	return err == nil && parsedURL.Scheme != "" && parsedURL.Host != ""
}

func hashURL(url string) string {
	h := sha1.New()
	h.Write([]byte(url))
	return hex.EncodeToString(h.Sum(nil))
}

func appendLogToFile(filename string, log MonitorLog) error {
	var logs []MonitorLog
	data, err := ioutil.ReadFile(filename)
	if err == nil {
		json.Unmarshal(data, &logs)
	}
	logs = append(logs, log)

	newData, err := json.MarshalIndent(logs, "", "  ")
	if err != nil {
		return err
	}
	return ioutil.WriteFile(filename, newData, 0644)
}

// --- Email Alert ---
func sendEmailAlert(message string, userEmail string) {
	smtpHost := os.Getenv("SMTP_HOST")
	smtpPort := os.Getenv("SMTP_PORT")
	sender := os.Getenv("EMAIL_SENDER")
	password := os.Getenv("EMAIL_PASSWORD")

	if smtpHost == "" || smtpPort == "" || sender == "" || password == "" || userEmail == "" {
		fmt.Println("⚠️ Email config missing or user email not provided")
		return
	}

	auth := smtp.PlainAuth("", sender, password, smtpHost)
	subject := "Subject: Pingify API Alert!\r\n"
	body := "\r\n" + message

	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, sender, []string{userEmail}, []byte(subject+body))
	if err != nil {
		fmt.Println("❌ Email alert failed:", err)
		return
	}
	fmt.Println("✅ Email alert sent to", userEmail)
}

// --- Monitor Logic ---
func ExecuteMonitor(
	rawURL, method, headers, body, timeout string,
	pretty bool,
	interval, duration, threshold time.Duration,
	alert bool,
	userEmail string,
) (string, string, time.Duration, int, string, time.Time, error, bool) {
	if !isValidURL(rawURL) {
		return "", "", 0, 0, "", time.Time{}, errors.New("Invalid URL"), false
	}

	start := time.Now()
	end := start.Add(duration)
	lastStatus := 0
	lastStatusText := ""
	var err error

	logDir := "logs"
	os.MkdirAll(logDir, os.ModePerm)
	logFile := filepath.Join(logDir, fmt.Sprintf("monitor_%s.json", hashURL(rawURL)))

	var totalChecks int
	var thresholdExceeded int

	for t := start; t.Before(end); t = t.Add(interval) {
		totalChecks++

		response, status, execDuration, reqErr := requester.ExecuteRequest(rawURL, method, headers, body, timeout, pretty)
		if reqErr != nil {
			fmt.Println("❌ Request Error:", reqErr)
			err = reqErr
			break
		}

		fmt.Printf("✅ HTTP %d\n", status)
		fmt.Println(response)
		fmt.Println("⏱️ Execution Time:", execDuration)

		exceeded := execDuration > threshold
		if exceeded {
			thresholdExceeded++
			fmt.Printf("🚨 Terminal Alert: API: %s exceeded threshold (%s > %s)\n", rawURL, execDuration, threshold)
		}

		lastStatus = status
		lastStatusText = httpStatusText(status)

		log := MonitorLog{
			Timestamp:     time.Now(),
			URL:           rawURL,
			Method:        method,
			StatusCode:    status,
			StatusText:    lastStatusText,
			ExecutionTime: execDuration,
			Threshold:     threshold,
			Exceeded:      exceeded,
			Success:       !exceeded && reqErr == nil,
		}
		appendLogToFile(logFile, log)

		time.Sleep(interval)
	}

	success := true
	failureRate := float64(thresholdExceeded) / float64(totalChecks)
	const failureThreshold = 0.2 // 20%

	if alert && duration > 2*time.Minute && failureRate >= failureThreshold {
		message := fmt.Sprintf("⚠️ %d out of %d requests (%.2f%%) exceeded the threshold of %s.\nURL: %s",
			thresholdExceeded, totalChecks, failureRate*100, threshold, rawURL)

		sendEmailAlert(message, userEmail)
		success = false
	}

	return "Monitoring complete", rawURL, duration, lastStatus, lastStatusText, time.Now(), err, success
}

// --- HTTP Status to Text ---
func httpStatusText(code int) string {
	switch code {
	case 200:
		return "OK"
	case 201:
		return "Created"
	case 400:
		return "Bad Request"
	case 401:
		return "Unauthorized"
	case 403:
		return "Forbidden"
	case 404:
		return "Not Found"
	case 500:
		return "Internal Server Error"
	case 503:
		return "Service Unavailable"
	default:
		return "Unknown"
	}
}
