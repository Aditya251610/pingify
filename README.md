
# 🚀 Pingify

**Pingify** is a fast and AI-powered API monitoring CLI tool that helps developers track response time, detect performance issues, receive email alerts, and generate smart suggestions using OpenAI — making your APIs production-ready with zero guesswork.

---

## ✨ Features

- ✅ Real-time API health monitoring
- 📊 Logs execution time, status codes, and threshold breaches
- 📁 Saves results to JSON logs
- 📬 Sends email alerts when performance thresholds are exceeded
- 🤖 Analyzes logs with OpenAI to suggest improvements
- 🧠 Developer explanations with `--explain` flag
- 🐳 Docker support for language-agnostic use
- 🛠 Easy installation via GitHub or Docker

---

## 📦 Installation

### ✅ From GitHub

Make sure you have Go 1.20+ installed.

```bash
go install github.com/Aditya251610/pingify@latest
```

Then run:

```bash
pingify --help
```

---

### 🐳 From Docker

Clone the repository:

```bash
git clone https://github.com/Aditya251610/pingify.git
cd pingify
```

Build Docker image:

```bash
docker build -t pingify .
```

Run:

```bash
docker run --rm pingify --help
```

---

## ⚙️ Environment Configuration

Create a `.env` file in the project root with the following content:

```env
# SMTP Config (For Email Alerts)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_SENDER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# OpenAI API Key (For AI Suggestions)
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Copy template from `.env.example`:

```bash
cp .env.example .env
```

> ⚠️ Never commit `.env` to Git. Keep it local and secret.

---

## 🚀 Usage

### 🔍 Monitor API Health

```bash
pingify monitor   --url https://httpstat.us/200?sleep=1500   --interval 10s   --duration 30s   --threshold 1s   --email aditya.sharma16062016@gmail.com
```

🔔 This will:
- Ping the API every 10s for 30s
- Log the response
- Trigger email if 20%+ of requests exceed the 1s threshold

---

### 🤖 AI-Powered Analysis

```bash
pingify ai --url https://jsonplaceholder.typicode.com/posts
```

- If logs are found, analyzes them using OpenAI and gives performance + reliability suggestions.
- If logs are not found, it runs a 3-minute monitor and then generates suggestions.

---

### 🧠 Developer Explanation Mode

```bash
pingify ai --url https://jsonplaceholder.typicode.com/posts --explain
```

- Adds simplified code examples and dev tips with the analysis.
- Ideal for beginner to mid-level backend devs.

---

## 📂 Logs

Logs are automatically stored in `logs/` folder in JSON format:

```bash
logs/monitor_<hashed_url>.json
```

Example log entry:

```json
{
  "timestamp": "2025-07-06T12:34:56Z",
  "url": "https://...",
  "method": "GET",
  "status_code": 200,
  "execution_time": "234ms",
  "threshold": "1s",
  "exceeded": false,
  "success": true
}
```

---

## 🐳 Docker Usage

Run with your environment variables:

```bash
docker run -e SMTP_HOST=smtp.gmail.com   -e SMTP_PORT=587   -e EMAIL_SENDER=your@gmail.com   -e EMAIL_PASSWORD=your-app-password   -e OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx   pingify   monitor --url https://httpstat.us/200?sleep=1500 --interval 10s --duration 30s --threshold 1s --email your@gmail.com
```

---

## 🔄 Auto Updates (Coming Soon)

You can install from GitHub or DockerHub and update easily:

### From GitHub

```bash
go install github.com/Aditya251610/pingify@latest
```

### From DockerHub (Planned)

```bash
docker pull aditya251610/pingify:latest
```

GitHub Actions will soon be configured to auto-publish builds to DockerHub and GitHub Releases.

---

## 🧪 Example Test Command

```bash
pingify monitor   --url https://httpstat.us/200?sleep=1500   --interval 10s   --duration 30s   --threshold 1s   --email aditya.sharma16062016@gmail.com
```

---

## 🙌 Contributing

Contributions are welcome!

```bash
git clone https://github.com/Aditya251610/pingify.git
cd pingify
go run main.go monitor --url https://your-api.com
```

- Fork → Branch → PR 🚀
- For issues or ideas, open a [GitHub issue](https://github.com/Aditya251610/pingify/issues)

---

## 📝 License

MIT License © [Aditya Sharma](https://github.com/Aditya251610)

---

## 📬 Contact

📧 Email: aditya.dev2516@gmail.com  
🌐 GitHub: [Aditya251610](https://github.com/Aditya251610/pingify)

---
