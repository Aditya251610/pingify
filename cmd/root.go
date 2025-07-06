/*
Copyright © 2025 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/spf13/cobra"
)

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "pingify",
	Short: "A fast, AI-powered CLI tool for testing APIs during development",
	Long: `Pingify is a developer-friendly CLI tool designed for real-time API testing
and debugging during development. 

It allows you to run HTTP requests, generate test cases, validate responses, and
get intelligent AI-powered feedback on failures, assertions, and optimization.

Features include:
- Live request execution
- JSON/YAML-based test file support
- Assertion and response validation
- GPT-assisted test generation and diagnosis

Whether you're building REST APIs, microservices, or backend systems,
pingify helps you catch issues early and improve development speed.`,
}

// Execute adds all child commands to the root command and sets flags appropriately.
func Execute() {
	// ✅ Load .env file at the very beginning
	err := godotenv.Load()
	if err != nil {
		fmt.Println("⚠️  Could not load .env file (email alerts may fail):", err)
	}

	// Run the CLI
	if err := rootCmd.Execute(); err != nil {
		os.Exit(1)
	}
}

func init() {
	rootCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
