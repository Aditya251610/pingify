/*
Copyright © 2025 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"os"

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
apitest helps you catch issues early and improve development speed.`,
	// Uncomment the following line if your bare application
	// has an action associated with it:
	// Run: func(cmd *cobra.Command, args []string) { },
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}

func init() {
	// Here you will define your flags and configuration settings.
	// Cobra supports persistent flags, which, if defined here,
	// will be global for your application.

	// rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is $HOME/.apitest.yaml)")

	// Cobra also supports local flags, which will only run
	// when this action is called directly.
	rootCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
