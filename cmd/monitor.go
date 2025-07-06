package cmd

import (
	"fmt"
	"time"

	"github.com/Aditya251610/pingify/internal/monitor"
	"github.com/spf13/cobra"
)

// monitorCmd represents the monitor command
var monitorCmd = &cobra.Command{
	Use:   "monitor",
	Short: "Continuously monitor an API endpoint",
	Long: `The "monitor" command repeatedly pings an API endpoint for a duration, checking response time, status code, and errors.

Use this to test uptime or performance over time.

Example:
  pingify monitor --url https://example.com/api --interval 10s --duration 1m --threshold 800ms
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

		// Call ExecuteMonitor
		msg, monitoredURL, totalDuration, lastStatus, lastStatusText, endTime, err, success := monitor.ExecuteMonitor(
			url, method, headers, body, timeout, pretty, interval, duration, threshold,
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
		}
	},
}

func init() {
	rootCmd.AddCommand(monitorCmd)

	monitorCmd.Flags().String("url", "", "The full API URL to monitor (required)")
	monitorCmd.Flags().String("method", "GET", "HTTP method to use")
	monitorCmd.Flags().Duration("interval", 10*time.Second, "Interval between checks (e.g., 10s)")
	monitorCmd.Flags().Duration("duration", 1*time.Minute, "Total duration to monitor (e.g., 1m)")
	monitorCmd.Flags().String("headers", "", "JSON string representing headers to send")
	monitorCmd.Flags().String("body", "", "JSON body string to include in the request")
	monitorCmd.Flags().String("timeout", "5s", "Request timeout duration (e.g., 5s)")
	monitorCmd.Flags().Duration("threshold", 500*time.Millisecond, "Warn if response time exceeds this value (e.g., 500ms)")
	monitorCmd.Flags().Bool("pretty", false, "Format and colorize the response")
}
