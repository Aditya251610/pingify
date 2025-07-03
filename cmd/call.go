/*
Copyright © 2025 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"

	"github.com/Aditya251610/pingify/internal/requester"
	"github.com/spf13/cobra"
)

// callCmd represents the call command
var callCmd = &cobra.Command{
	Use:   "call",
	Short: "Send a real-time HTTP request and view the response",
	Long: `The "call" command lets you send a real-time HTTP request to any API endpoint directly from your terminal.
It supports GET, POST, PUT, DELETE, and other methods, along with optional headers and body payloads.

You can use this command to quickly test API endpoints during development without switching to Postman or curl.

Examples:
  pingify call --url https://api.example.com/login --method POST --body '{"email":"test@example.com","password":"123456"}'
  pingify call --url https://api.example.com/user/1 --method GET --headers '{"Authorization":"Bearer token"}'

Flags:
  --url       The full API URL to call (required)
  --method    HTTP method to use (default: GET)
  --body      Raw JSON body string to include in the request
  --headers   JSON string representing headers to send
  --timeout   Optional request timeout (e.g., 5s, 10s)
  --pretty    If true, formats and colorizes the response JSON`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Executing call command...")
		url, _ := cmd.Flags().GetString("url")
		method, _ := cmd.Flags().GetString("method")
		body, _ := cmd.Flags().GetString("body")
		headers, _ := cmd.Flags().GetString("headers")
		timeout, _ := cmd.Flags().GetString("timeout")
		pretty, _ := cmd.Flags().GetBool("pretty")

		// Call your internal request function
		response, status, duration, err := requester.ExecuteRequest(url, method, headers, body, timeout, pretty)
		if err != nil {
			fmt.Println("❌ Error:", err)
			return
		}

		fmt.Printf("✅ HTTP %d\n", status)
		fmt.Println(response)
		fmt.Println("⏱️ Execution Time:", duration)
	},
}

func init() {
	rootCmd.AddCommand(callCmd)
	callCmd.Flags().String("url", "", "The full API URL to call (required)")
	callCmd.Flags().String("method", "GET", "HTTP method to use")
	callCmd.Flags().String("body", "", "Raw JSON body string to include in the request")
	callCmd.Flags().String("headers", "", "JSON string representing headers to send")
	callCmd.Flags().String("timeout", "", "Request timeout (e.g., 5s, 10s)")
	callCmd.Flags().Bool("pretty", false, "Format and colorize the response")

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// callCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// callCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
