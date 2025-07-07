# ------------------------
# Build Stage
# ------------------------
    FROM golang:1.22 AS builder

    # Install gotip and setup latest Go features
    RUN go install golang.org/dl/gotip@latest && \
        gotip download
    
    # Set environment for static binary build
    ENV CGO_ENABLED=0 \
        GOOS=linux \
        GOARCH=amd64
    
    WORKDIR /app
    
    # Copy all source files
    COPY . .
    
    # Download dependencies and build statically
    RUN gotip mod tidy && \
        gotip build -o pingify .
    
    # ------------------------
    # Final Image (with TLS support)
    # ------------------------
    FROM gcr.io/distroless/static-debian11
    
    # Copy static binary and CA certificates for HTTPS
    COPY --from=builder /app/pingify /pingify
    COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
    
    # Set entrypoint
    ENTRYPOINT ["/pingify"]
    