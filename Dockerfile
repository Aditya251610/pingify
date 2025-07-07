# ------------------------
# Build Stage
# ------------------------
    FROM golang:1.22 AS builder

    # Install gotip and setup latest Go features
    RUN go install golang.org/dl/gotip@latest && \
        gotip download
    
    # Set environment variables for static build
    ENV CGO_ENABLED=0 \
        GOOS=linux \
        GOARCH=amd64
    
    WORKDIR /app
    
    # Copy all project files
    COPY . .
    
    # Tidy and build the static binary
    RUN gotip mod tidy && \
        gotip build -o pingify .
    
    # ------------------------
    # Final Image (minimal, no glibc dependency)
    # ------------------------
    FROM scratch
    
    # Copy only the statically compiled binary
    COPY --from=builder /app/pingify /pingify
    
    # Set entrypoint
    ENTRYPOINT ["/pingify"]
    