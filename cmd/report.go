package cmd

import (
	"fmt"

	"github.com/Aditya251610/pingify/internal/report"
	"github.com/spf13/cobra"
)

var reportCmd = &cobra.Command{
	Use:   "report",
	Short: "View summary report of monitored API",
	Long: `Generates a summary report based on previously logged monitor data for a specific API.

Example:
  pingify report --url https://example.com/api`,
	Run: func(cmd *cobra.Command, args []string) {
		url, _ := cmd.Flags().GetString("url")
		if url == "" {
			fmt.Println("❌ Please provide a URL using --url")
			return
		}

		report, err := report.GenerateReport(url)
		if err != nil {
			fmt.Println("❌ Error reading logs:", err)
			return
		}

		fmt.Println("\n📄 API Monitoring Report")
		fmt.Println("🔗 URL:       ", url)
		fmt.Println("📅 From:      ", report.StartTime.Format("2006-01-02 15:04:05"))
		fmt.Println("📅 To:        ", report.EndTime.Format("2006-01-02 15:04:05"))
		fmt.Println("📊 Total:     ", report.TotalChecks)
		fmt.Println("✅ Success:   ", report.SuccessCount)
		fmt.Println("⚠️ Exceeded: ", report.ExceededCount)
		fmt.Println("⏱️ Avg Time:  ", report.AvgExecutionTime)
	},
}

func init() {
	rootCmd.AddCommand(reportCmd)
	reportCmd.Flags().String("url", "", "The URL of the monitored API (required)")
}
