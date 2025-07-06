package cmd

import (
	"fmt"
	"os"
	"path/filepath"
	"time"

	"github.com/Aditya251610/pingify/internal/monitor"
	"github.com/Aditya251610/pingify/internal/openai"
	"github.com/spf13/cobra"
)

var aiCmd = &cobra.Command{
	Use:   "ai",
	Short: "Analyze API behavior and get AI-powered suggestions",
	Long: `The AI command checks for existing logs or reports.
- If found, it analyzes them using OpenAI GPT.
- If not found, it monitors the API for ~3 minutes to gather data and then analyzes it.

Example:
  pingify ai --url https://jsonplaceholder.typicode.com/posts --explain`,
	Run: func(cmd *cobra.Command, args []string) {
		url, _ := cmd.Flags().GetString("url")
		explain, _ := cmd.Flags().GetBool("explain")

		if url == "" {
			fmt.Println("❌ Please provide a --url to analyze.")
			return
		}

		logFile := filepath.Join("logs", fmt.Sprintf("monitor_%s.json", monitor.HashURL(url)))
		var summary string

		// Step 1: Check if logs exist
		if _, err := os.Stat(logFile); err == nil {
			fmt.Println("📁 Log file found. Using it for analysis...")
			content, err := os.ReadFile(logFile)
			if err != nil {
				fmt.Println("❌ Failed to read log file:", err)
				return
			}
			summary = openai.GetSuggestionsFromLogs(string(content), explain)
		} else {
			// Step 2: If not, perform a long monitor
			fmt.Println("🔍 No logs found. Monitoring API for analysis (~3m)...")

			_, _, _, _, _, _, _, _ = monitor.ExecuteMonitor(
				url, "GET", "", "", "5s", false,
				10*time.Second, 3*time.Minute, 1*time.Second,
				false, "",
			)

			content, err := os.ReadFile(logFile)
			if err != nil {
				fmt.Println("❌ Monitoring failed or log not generated.")
				return
			}
			summary = openai.GetSuggestionsFromLogs(string(content), explain)
		}

		fmt.Println("🤖 AI Suggestions:\n\n" + summary)
	},
}

func init() {
	rootCmd.AddCommand(aiCmd)
	aiCmd.Flags().String("url", "", "API endpoint to analyze")
	aiCmd.Flags().Bool("explain", false, "Show detailed reasoning for each AI suggestion")
}
