# Use official Golang base image to build the binary
FROM golang:1.22 AS builder

WORKDIR /app

# Copy all project files
COPY . .

# Download dependencies
RUN go mod tidy

# Build the CLI tool
RUN go build -o pingify main.go

# Final image
FROM debian:bullseye-slim

WORKDIR /app

# Copy the binary from builder
COPY --from=builder /app/pingify /usr/local/bin/pingify

# Optional: Copy .env.example for reference
COPY --from=builder /app/.env.example /app/.env.example

# Set default entrypoint
ENTRYPOINT ["pingify"]
