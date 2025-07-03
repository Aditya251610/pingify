package requester

import (
	"bytes"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"time"
)

func isValidURL(rawURL string) bool {
	parsedURL, err := url.ParseRequestURI(rawURL)
	if err != nil {
		return false
	}

	return parsedURL.Scheme != "" && parsedURL.Host != ""
}

func ExecuteRequest(rawURL, method, headers, body, timeout string, pretty bool) (string, int, time.Duration, error) {
	if rawURL == "" || !isValidURL(rawURL) {
		return "", 0, 0, errors.New("URL is required") // ✅ now returns 4 values
	}

	if method == "" || method == "GET" {
		method = "GET"
	}

	client := &http.Client{}
	var requestBody io.Reader
	if body != "" {
		requestBody = bytes.NewBufferString(body)
	}

	req, err := http.NewRequest(method, rawURL, requestBody)
	if err != nil {
		return "", 0, 0, fmt.Errorf("failed to create request: %w", err) // ✅ 4 values
	}

	req.Header.Set("Content-Type", "application/json")

	start := time.Now()
	resp, err := client.Do(req)
	duration := time.Since(start)
	if err != nil {
		return "", 0, duration, fmt.Errorf("failed to execute request: %w", err) // ✅ 4 values
	}

	defer resp.Body.Close()

	responseBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", 0, duration, fmt.Errorf("failed to read response body: %w", err) // ✅ 4 values
	}

	return string(responseBody), resp.StatusCode, duration, nil
}
