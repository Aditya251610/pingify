// internal/monitor/report.go
package report

import (
	"crypto/sha1"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"time"
)

type ReportSummary struct {
	StartTime        time.Time     `json:"start_time"`
	EndTime          time.Time     `json:"end_time"`
	TotalChecks      int           `json:"total_checks"`
	SuccessCount     int           `json:"success_count"`
	ExceededCount    int           `json:"exceeded_count"`
	AvgExecutionTime time.Duration `json:"avg_execution_time"`
}

type MonitorLog struct {
	Timestamp     time.Time     `json:"timestamp"`
	StatusCode    int           `json:"status_code"`
	StatusText    string        `json:"status_text"`
	ExecutionTime time.Duration `json:"execution_time"`
	Success       bool          `json:"success"`
	Exceeded      bool          `json:"exceeded"`
}

// GenerateReport generates a summary report for the given URL
func GenerateReport(rawURL string) (*ReportSummary, error) {
	logs, err := ReadLogsForURL(rawURL)
	if err != nil {
		return nil, err
	}
	if len(logs) == 0 {
		return nil, errors.New("no logs found for this URL")
	}

	var total time.Duration
	var success, exceeded int

	for _, log := range logs {
		total += log.ExecutionTime
		if log.Success {
			success++
		}
		if log.Exceeded {
			exceeded++
		}
	}

	avg := total / time.Duration(len(logs))

	summary := &ReportSummary{
		StartTime:        logs[0].Timestamp,
		EndTime:          logs[len(logs)-1].Timestamp,
		TotalChecks:      len(logs),
		SuccessCount:     success,
		ExceededCount:    exceeded,
		AvgExecutionTime: avg,
	}

	saveReportToFile(rawURL, summary)

	return summary, nil
}

// ReadLogsForURL reads logs from the corresponding monitor log file for a given URL
func ReadLogsForURL(rawURL string) ([]MonitorLog, error) {
	hash := sha1.Sum([]byte(rawURL))
	filename := "monitor_" + hex.EncodeToString(hash[:]) + ".json"
	path := filepath.Join("logs", filename)

	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var logs []MonitorLog
	err = json.Unmarshal(data, &logs)
	if err != nil {
		return nil, err
	}

	return logs, nil
}

// saveReportToFile creates a report directory and writes a text summary for the given URL
func saveReportToFile(rawURL string, report *ReportSummary) {
	hash := sha1.Sum([]byte(rawURL))
	filename := "report_" + hex.EncodeToString(hash[:]) + ".txt"
	path := filepath.Join("reports", filename)

	_ = os.MkdirAll("reports", os.ModePerm)

	file, err := os.Create(path)
	if err != nil {
		fmt.Println("❌ Failed to write report file:", err)
		return
	}
	defer file.Close()

	reportContent := fmt.Sprintf(`📄 API Monitoring Report
🔗 URL Hash:    %x
📅 From:        %s
📅 To:          %s
📊 Total:       %d
✅ Success:     %d
⚠️ Exceeded:    %d
⏱️ Avg Time:    %s
`,
		hash,
		report.StartTime.Format("2006-01-02 15:04:05"),
		report.EndTime.Format("2006-01-02 15:04:05"),
		report.TotalChecks,
		report.SuccessCount,
		report.ExceededCount,
		report.AvgExecutionTime,
	)

	_, _ = file.WriteString(reportContent)
}
