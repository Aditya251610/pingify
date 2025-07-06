package monitor

import (
	"crypto/sha1"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
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

func isValidURL(rawURL string) bool {
	parsedURL, err := url.ParseRequestURI(rawURL)
	if err != nil {
		return false
	}
	return parsedURL.Scheme != "" && parsedURL.Host != ""
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

func ExecuteMonitor(rawURL, method, headers, body, timeout string, pretty bool, interval, duration, threshold time.Duration) (string, string, time.Duration, int, string, time.Time, error, bool) {
	if rawURL == "" || !isValidURL(rawURL) {
		return "", "", 0, 0, "", time.Time{}, errors.New("URL is required"), false
	}

	start := time.Now()
	end := start.Add(duration)
	lastStatus := 0
	lastStatusText := ""
	var exceeded bool
	var err error

	// Prepare log file path
	logDir := "logs"
	os.MkdirAll(logDir, os.ModePerm)
	logFile := filepath.Join(logDir, fmt.Sprintf("monitor_%s.json", hashURL(rawURL)))

	for t := start; t.Before(end); t = t.Add(interval) {
		response, status, execDuration, reqErr := requester.ExecuteRequest(rawURL, method, headers, body, timeout, pretty)
		if reqErr != nil {
			fmt.Println("❌ Error:", reqErr)
			err = reqErr
			break
		}

		fmt.Printf("✅ HTTP %d\n", status)
		fmt.Println(response)
		fmt.Println("⏱️ Execution Time:", execDuration)

		exceeded = execDuration > threshold
		if exceeded {
			fmt.Println("⚠️ Response time exceeded threshold!")
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

	return "Monitoring complete", rawURL, duration, lastStatus, lastStatusText, time.Now(), err, !exceeded && err == nil
}

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
