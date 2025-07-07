import { useState } from 'react';
import { Book, Terminal, Settings, Mail, Brain, BarChart3, Copy, Check } from 'lucide-react';

const docSections = [
  {
    id: 'installation',
    name: 'Installation',
    icon: Terminal,
    content: {
      title: 'Installation Guide',
      description: 'Multiple ways to install Pingify on your system',
      sections: [
        {
          title: 'Go Install (Recommended)',
          content: `# Install with Go (requires Go 1.20+)
go install github.com/Aditya251610/pingify@latest

# Verify installation
pingify --help`
        },
        {
          title: 'Docker',
          content: `# Pull the latest image
docker pull aditya251610/pingify:latest

# Run with Docker
docker run --rm pingify --help`
        },
        {
          title: 'From Source',
          content: `# Clone the repository
git clone https://github.com/Aditya251610/pingify.git
cd pingify

# Build from source
go build -o pingify .
./pingify --help`
        }
      ]
    }
  },
  {
    id: 'cli-flags',
    name: 'CLI Flags',
    icon: Settings,
    content: {
      title: 'Command Line Interface',
      description: 'Complete reference for all CLI commands and flags',
      sections: [
        {
          title: 'Monitor Command',
          content: `# Basic monitoring
pingify monitor --url <URL> [flags]

Flags:
  --url string        API endpoint to monitor (required)
  --method string     HTTP method (default "GET")
  --interval duration Interval between checks (default 10s)
  --duration duration Total monitoring duration (default 1m)
  --threshold duration Alert threshold (default 500ms)
  --headers string    JSON headers to send
  --body string       JSON body for POST/PUT requests
  --timeout string    Request timeout (default "5s")
  --alert             Enable email alerts
  --email string      Email address for alerts
  --pretty            Pretty print JSON responses`
        },
        {
          title: 'AI Command',
          content: `# AI analysis
pingify ai --url <URL> [flags]

Flags:
  --url string    API endpoint to analyze (required)
  --explain       Show detailed reasoning for suggestions`
        },
        {
          title: 'Report Command',
          content: `# Generate reports
pingify report --url <URL>

Flags:
  --url string    API endpoint to generate report for (required)`
        },
        {
          title: 'Call Command',
          content: `# Make single API calls
pingify call --url <URL> [flags]

Flags:
  --url string      API endpoint to call (required)
  --method string   HTTP method (default "GET")
  --headers string  JSON headers to send
  --body string     JSON body for request
  --timeout string  Request timeout
  --pretty          Pretty print response`
        }
      ]
    }
  },
  {
    id: 'env-setup',
    name: 'Environment Setup',
    icon: Settings,
    content: {
      title: 'Environment Configuration',
      description: 'Configure email alerts and AI analysis',
      sections: [
        {
          title: 'SMTP Configuration',
          content: `# Email alert configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_SENDER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# For Gmail, use App Passwords:
# 1. Enable 2FA on your Google account
# 2. Generate an App Password
# 3. Use the App Password as EMAIL_PASSWORD`
        },
        {
          title: 'OpenAI Configuration',
          content: `# AI analysis configuration
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Get your API key from:
# https://platform.openai.com/api-keys`
        },
        {
          title: 'Environment File',
          content: `# Create .env file in your project root
touch .env

# Add your configuration
echo "SMTP_HOST=smtp.gmail.com" >> .env
echo "SMTP_PORT=587" >> .env
echo "EMAIL_SENDER=your@gmail.com" >> .env
echo "EMAIL_PASSWORD=your-app-password" >> .env
echo "OPENAI_API_KEY=sk-..." >> .env`
        }
      ]
    }
  },
  {
    id: 'alerts',
    name: 'Alerts',
    icon: Mail,
    content: {
      title: 'Alert Configuration',
      description: 'Set up email notifications for API monitoring',
      sections: [
        {
          title: 'Email Alerts',
          content: `# Enable email alerts
pingify monitor \\
  --url https://api.example.com \\
  --alert \\
  --email dev@company.com \\
  --threshold 500ms

# Alert conditions:
# - Monitoring duration > 2 minutes
# - 20% or more requests exceed threshold
# - SMTP configuration is properly set`
        },
        {
          title: 'Alert Examples',
          content: `# High threshold monitoring
pingify monitor \\
  --url https://slow-api.com \\
  --threshold 2s \\
  --alert \\
  --email alerts@company.com

# Frequent monitoring with alerts
pingify monitor \\
  --url https://critical-api.com \\
  --interval 5s \\
  --duration 10m \\
  --threshold 200ms \\
  --alert \\
  --email sre@company.com`
        },
        {
          title: 'Alert Message Format',
          content: `# Example alert email:
Subject: Pingify API Alert!

⚠️ 3 out of 12 requests (25.00%) exceeded the threshold of 500ms.
URL: https://api.example.com

Timestamp: 2025-01-06 15:30:45
Monitoring Duration: 2m0s
Failure Rate: 25.00%`
        }
      ]
    }
  },
  {
    id: 'ai-analysis',
    name: 'AI Analysis',
    icon: Brain,
    content: {
      title: 'AI-Powered Analysis',
      description: 'Get intelligent suggestions for API optimization',
      sections: [
        {
          title: 'Basic AI Analysis',
          content: `# Analyze existing logs
pingify ai --url https://api.example.com

# If no logs exist, it will:
# 1. Monitor the API for ~3 minutes
# 2. Generate logs
# 3. Analyze with OpenAI GPT
# 4. Provide optimization suggestions`
        },
        {
          title: 'Detailed Analysis',
          content: `# Get detailed explanations
pingify ai --url https://api.example.com --explain

# This provides:
# - Detailed reasoning for each suggestion
# - Code examples and implementation tips
# - Performance optimization strategies
# - Best practices for API reliability`
        },
        {
          title: 'AI Analysis Output',
          content: `# Example AI suggestions:
📊 Patterns Detected
• High response times during peak hours
• Occasional 500ms+ spikes
• Consistent 200 status codes

🛠️ Code Suggestions
• Implement connection pooling
• Add response caching for GET requests
• Use compression (gzip) headers

💡 Dev Tips
• Consider implementing circuit breakers
• Add retry logic with exponential backoff
• Monitor database query performance

🚨 Risk Alerts
• Response time variance indicates load issues
• Consider horizontal scaling`
        }
      ]
    }
  },
  {
    id: 'reports',
    name: 'Reports',
    icon: BarChart3,
    content: {
      title: 'Performance Reports',
      description: 'Generate detailed monitoring reports',
      sections: [
        {
          title: 'Generate Reports',
          content: `# Generate report for monitored API
pingify report --url https://api.example.com

# Output includes:
# - Monitoring time range
# - Total number of checks
# - Success/failure counts
# - Average response time
# - Threshold violations`
        },
        {
          title: 'Report Output',
          content: `# Example report output:
📄 API Monitoring Report
🔗 URL:        https://api.example.com
📅 From:       2025-01-06 14:30:00
📅 To:         2025-01-06 14:35:00
📊 Total:      30
✅ Success:    28
⚠️ Exceeded:   2
⏱️ Avg Time:   234ms`
        },
        {
          title: 'Log Files',
          content: `# Log files are stored in:
logs/monitor_<url_hash>.json

# Report files are stored in:
reports/report_<url_hash>.txt

# Log file structure:
{
  "timestamp": "2025-01-06T14:30:00Z",
  "url": "https://api.example.com",
  "method": "GET",
  "status_code": 200,
  "status_text": "OK",
  "execution_time": "234ms",
  "threshold": "500ms",
  "exceeded": false,
  "success": true
}`
        }
      ]
    }
  }
];

export default function Documentation() {
  const [activeSection, setActiveSection] = useState('installation');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const activeDoc = docSections.find(section => section.id === activeSection);

  return (
    <section id="docs" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gray-900 dark:text-white">Complete</span>
            <br />
            <span className="gradient-text">Documentation</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Everything you need to know to get the most out of Pingify.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="glass rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Book className="h-5 w-5" />
                Documentation
              </h3>
              <nav className="space-y-2">
                {docSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10'
                    }`}
                  >
                    <section.icon className="h-4 w-4" />
                    {section.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeDoc && (
              <div className="glass rounded-xl p-8">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {activeDoc.content.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  {activeDoc.content.description}
                </p>

                <div className="space-y-8">
                  {activeDoc.content.sections.map((section, index) => (
                    <div key={index}>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        {section.title}
                      </h4>
                      <div className="relative">
                        <div className="code-block pr-12">
                          <pre className="text-neon-blue text-sm whitespace-pre-wrap">
                            {section.content}
                          </pre>
                        </div>
                        <button
                          onClick={() => copyToClipboard(section.content)}
                          className="absolute top-2 right-2 p-2 rounded-lg glass hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-200"
                        >
                          {copiedCode === section.content ? (
                            <Check className="h-4 w-4 text-green-400" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}