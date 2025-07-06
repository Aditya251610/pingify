package cmd

import (
	"fmt"
	"time"

	"github.com/Aditya251610/pingify/internal/monitor"
	"github.com/spf13/cobra"
)

var monitorCmd = &cobra.Command{
	Use:   "monitor",
	Short: "Continuously monitor an API endpoint and log performance",
	Long: `📡 Pingify: Monitor your API's uptime and responsiveness over time.

This command pings a given API endpoint repeatedly at set intervals, checking for:
  - HTTP status codes
  - API availability
  - Response time
  - Threshold violations

🔔 Optional Alerting:
  - Use --alert to enable alerts if the response time exceeds the defined threshold.
  - Use --email to specify the recipient for email alerts.
  - Alerts are only sent if duration is longer than 2 minutes and a threshold is exceeded.

📁 All logs are saved to 'logs/monitor_<url_hash>.json'

🔧 Example:
  pingify monitor --url https://example.com/api --interval 10s --duration 3m --threshold 800ms --alert --email user@example.com
`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("📡 Monitoring API endpoint...")

		url, _ := cmd.Flags().GetString("url")
		method, _ := cmd.Flags().GetString("method")
		body, _ := cmd.Flags().GetString("body")
		headers, _ := cmd.Flags().GetString("headers")
		timeout, _ := cmd.Flags().GetString("timeout")
		pretty, _ := cmd.Flags().GetBool("pretty")
		interval, _ := cmd.Flags().GetDuration("interval")
		duration, _ := cmd.Flags().GetDuration("duration")
		threshold, _ := cmd.Flags().GetDuration("threshold")
		alert, _ := cmd.Flags().GetBool("alert")
		email, _ := cmd.Flags().GetString("email")

		// Warn user if alert is on but email is missing
		if alert && email == "" {
			fmt.Println("⚠️  You enabled --alert but did not provide an --email address.")
			fmt.Println("    Please pass --email user@example.com to receive alerts.")
		}

		msg, monitoredURL, totalDuration, lastStatus, lastStatusText, endTime, err, success := monitor.ExecuteMonitor(
			url, method, headers, body, timeout, pretty, interval, duration, threshold, alert, email,
		)

		fmt.Println("=====================================")
		if err != nil {
			fmt.Println("❌ Monitor ended with error:", err)
		} else {
			fmt.Println("✅ Monitoring Complete")
			fmt.Println("🔗 URL:        ", monitoredURL)
			fmt.Println("📦 Message:    ", msg)
			fmt.Println("📊 Duration:   ", totalDuration)
			fmt.Println("📅 End Time:   ", endTime.Format(time.RFC1123))
			fmt.Println("📈 Last Status:", lastStatus, "-", lastStatusText)
			if success {
				fmt.Println("🎯 Thresholds respected.")
			} else {
				fmt.Println("⚠️ Thresholds exceeded.")
			}
			fmt.Println("📁 Logs saved under /logs directory.")
		}
	},
}

func init() {
	rootCmd.AddCommand(monitorCmd)

	monitorCmd.Flags().String("url", "", "The full API URL to monitor (required)")
	monitorCmd.Flags().String("method", "GET", "HTTP method to use")
	monitorCmd.Flags().Duration("interval", 10*time.Second, "Interval between checks (e.g., 10s)")
	monitorCmd.Flags().Duration("duration", 1*time.Minute, "Total monitoring duration (e.g., 3m)")
	monitorCmd.Flags().String("headers", "", "JSON string representing headers to send")
	monitorCmd.Flags().String("body", "", "JSON body string to include in the request")
	monitorCmd.Flags().String("timeout", "5s", "Request timeout duration (e.g., 5s)")
	monitorCmd.Flags().Duration("threshold", 500*time.Millisecond, "Alert if response time exceeds this value (e.g., 800ms)")
	monitorCmd.Flags().Bool("pretty", false, "Format and colorize the response output")
	monitorCmd.Flags().Bool("alert", false, "Enable alerting when threshold is exceeded")
	monitorCmd.Flags().String("email", "", "User email address to send alerts to")
}
