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

func GetSuggestionsFromLogs(logContent string) string {
	apiKey := os.Getenv("OPENAI_API_KEY")
	if apiKey == "" {
		return "❌ OPENAI_API_KEY not found in environment."
	}

	if len(logContent) == 0 {
		return "❌ Log file is empty. No content to analyze."
	}

	reqBody := OpenAIRequest{
		Model:       "gpt-3.5-turbo-1106",
		MaxTokens:   500,
		Temperature: 0.3,
		Messages: []Message{
			{
				Role:    "system",
				Content: "You're a performance expert for APIs. Analyze the logs and give suggestions to improve performance, reliability, or structure.",
			},
			{
				Role:    "user",
				Content: fmt.Sprintf("Here is the API log file content:\n\n%s", logContent),
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
