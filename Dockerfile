# Use Golang base image (latest stable that supports gotip)
FROM golang:1.22 AS builder

# Install gotip to support Go 1.24.3+ features
RUN go install golang.org/dl/gotip@latest && \
    gotip download

WORKDIR /app

# Copy all project files
COPY . .

# Download dependencies using gotip
RUN gotip mod tidy

# Build the CLI tool using gotip
RUN gotip build -o pingify main.go

# Final image
FROM debian:bullseye-slim

WORKDIR /app

# Copy the binary from builder
COPY --from=builder /app/pingify /usr/local/bin/pingify

# Optional: Copy .env.example for reference
COPY --from=builder /app/.env.example /app/.env.example

# Set default entrypoint
ENTRYPOINT ["pingify"]
