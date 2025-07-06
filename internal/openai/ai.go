package openai

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
)

type OpenAIRequest struct {
	Model       string    `json:"model"`
	Messages    []Message `json:"messages"`
	MaxTokens   int       `json:"max_tokens"`
	Temperature float32   `json:"temperature"`
}

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type OpenAIResponse struct {
	Choices []struct {
		Message Message `json:"message"`
	} `json:"choices"`
	Error *struct {
		Message string `json:"message"`
		Type    string `json:"type"`
		Code    any    `json:"code"`
	} `json:"error,omitempty"`
}

func GetSuggestionsFromLogs(logContent string, explain bool) string {
	apiKey := os.Getenv("OPENAI_API_KEY")
	if apiKey == "" {
		return "❌ OPENAI_API_KEY not found in environment."
	}

	if len(logContent) == 0 {
		return "❌ Log file is empty. No content to analyze."
	}

	systemPrompt := `
You are an expert API performance and architecture engineer embedded in a CLI tool.
Your job is to analyze the given API monitoring logs and:

1. Identify patterns in execution time, error rates, and thresholds.
2. Detect bad response codes, spikes, or frequent threshold violations.
3. Recommend concrete fixes like:
   - Retry logic
   - Timeout/backoff improvements
   - Caching strategies
   - Header tweaks (e.g. Accept-Encoding)
   - Pagination or batching
4. Output must contain these sections:
   - 📊 Patterns Detected
   - 🛠️ Code Suggestions (Go snippets if applicable)
   - 💡 Dev Tips
   - 🚨 Risk Alerts

Respond in markdown-style CLI format using clear bullet points and code blocks.`

	if explain {
		systemPrompt += "\n\nAlso explain *why* each recommendation is made based on log behavior."
	}

	reqBody := OpenAIRequest{
		Model:       "gpt-3.5-turbo-1106",
		MaxTokens:   700,
		Temperature: 0.3,
		Messages: []Message{
			{
				Role:    "system",
				Content: systemPrompt,
			},
			{
				Role:    "user",
				Content: fmt.Sprintf("Here is the API log file content (JSON format):\n\n%s", logContent),
			},
		},
	}

	jsonData, err := json.Marshal(reqBody)
	if err != nil {
		return "❌ Failed to encode request payload: " + err.Error()
	}

	req, err := http.NewRequest("POST", "https://api.openai.com/v1/chat/completions", bytes.NewBuffer(jsonData))
	if err != nil {
		return "❌ Failed to create request: " + err.Error()
	}

	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "❌ Failed to contact OpenAI API: " + err.Error()
	}
	defer resp.Body.Close()

	respBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return "❌ Failed to read OpenAI response: " + err.Error()
	}

	var aiResp OpenAIResponse
	if err := json.Unmarshal(respBytes, &aiResp); err != nil {
		return fmt.Sprintf("❌ Failed to parse OpenAI response: %s\nRaw: %s", err.Error(), string(respBytes))
	}

	if aiResp.Error != nil {
		return fmt.Sprintf("❌ OpenAI API Error: %s", aiResp.Error.Message)
	}

	if len(aiResp.Choices) == 0 {
		return fmt.Sprintf("❌ No suggestions returned. Full response: %s", string(respBytes))
	}

	return aiResp.Choices[0].Message.Content
}
