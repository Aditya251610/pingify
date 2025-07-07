import { useState } from 'react';
import { Copy, Check, Terminal, Container, Settings } from 'lucide-react';

const installMethods = [
  {
    id: 'go',
    name: 'Go Install',
    icon: Terminal,
    description: 'Install directly with Go (requires Go 1.20+)',
    commands: [
      'go install github.com/Aditya251610/pingify@latest',
      'pingify --help'
    ]
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: Container,
    description: 'Run with Docker (no dependencies required)',
    commands: [
      'docker pull aditya251610/pingify:latest',
      'docker run --rm pingify --help'
    ]
  },
  {
    id: 'source',
    name: 'From Source',
    icon: Settings,
    description: 'Build from source code',
    commands: [
      'git clone https://github.com/Aditya251610/pingify.git',
      'cd pingify',
      'go build -o pingify .',
      './pingify --help'
    ]
  }
];

const usageExamples = [
  {
    title: 'Basic Monitoring',
    description: 'Monitor an API endpoint every 10 seconds for 5 minutes',
    command: `pingify monitor \\
  --url https://api.example.com/health \\
  --interval 10s \\
  --duration 5m`
  },
  {
    title: 'With Alerts',
    description: 'Monitor with email alerts when response time exceeds 500ms',
    command: `pingify monitor \\
  --url https://api.example.com/users \\
  --threshold 500ms \\
  --alert \\
  --email dev@company.com`
  },
  {
    title: 'POST Request Monitoring',
    description: 'Monitor a POST endpoint with custom headers and body',
    command: `pingify monitor \\
  --url https://api.example.com/login \\
  --method POST \\
  --headers '{"Authorization":"Bearer token"}' \\
  --body '{"email":"test@example.com"}'`
  },
  {
    title: 'AI Analysis',
    description: 'Get AI-powered suggestions for API optimization',
    command: `pingify ai \\
  --url https://api.example.com/users \\
  --explain`
  },
  {
    title: 'Generate Reports',
    description: 'Create performance reports from monitoring logs',
    command: `pingify report \\
  --url https://api.example.com/users`
  },
  {
    title: 'Docker Usage',
    description: 'Run monitoring with Docker and environment variables',
    command: `docker run -e SMTP_HOST=smtp.gmail.com \\
  -e EMAIL_SENDER=alerts@company.com \\
  -e EMAIL_PASSWORD=app-password \\
  -e OPENAI_API_KEY=sk-... \\
  pingify monitor --url https://api.example.com`
  }
];

const envExample = `# SMTP Configuration for Email Alerts
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_SENDER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# OpenAI API Key for AI Analysis
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`;

export default function Usage() {
  const [activeTab, setActiveTab] = useState('go');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCommand(text);
      setTimeout(() => setCopiedCommand(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section id="usage" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gray-900 dark:text-white">Quick Start</span>
            <br />
            <span className="gradient-text">Installation & Usage</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Get up and running with Pingify in minutes. Choose your preferred installation method.
          </p>
        </div>

        {/* Installation Methods */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Installation
          </h3>
          
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {installMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setActiveTab(method.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === method.id
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white'
                    : 'glass text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10'
                }`}
              >
                <method.icon className="h-5 w-5" />
                {method.name}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {installMethods.map((method) => (
            <div
              key={method.id}
              className={`${activeTab === method.id ? 'block' : 'hidden'}`}
            >
              <div className="glass rounded-xl p-6 max-w-4xl mx-auto">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {method.description}
                </p>
                <div className="space-y-4">
                  {method.commands.map((command, index) => (
                    <div key={index} className="relative">
                      <div className="code-block pr-12">
                        <code className="text-neon-blue">{command}</code>
                      </div>
                      <button
                        onClick={() => copyToClipboard(command)}
                        className="absolute top-2 right-2 p-2 rounded-lg glass hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-200"
                      >
                        {copiedCommand === command ? (
                          <Check className="h-4 w-4 text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Usage Examples */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Usage Examples
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {usageExamples.map((example, index) => (
              <div key={index} className="glass rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {example.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {example.description}
                </p>
                <div className="relative">
                  <div className="code-block pr-12">
                    <code className="text-neon-blue text-sm">{example.command}</code>
                  </div>
                  <button
                    onClick={() => copyToClipboard(example.command)}
                    className="absolute top-2 right-2 p-2 rounded-lg glass hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-200"
                  >
                    {copiedCommand === example.command ? (
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

        {/* Environment Configuration */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Environment Configuration
          </h3>
          
          <div className="glass rounded-xl p-6 max-w-4xl mx-auto">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create a <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">.env</code> file 
              in your project root to enable email alerts and AI analysis:
            </p>
            <div className="relative">
              <div className="code-block pr-12">
                <pre className="text-neon-blue text-sm whitespace-pre-wrap">{envExample}</pre>
              </div>
              <button
                onClick={() => copyToClipboard(envExample)}
                className="absolute top-2 right-2 p-2 rounded-lg glass hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-200"
              >
                {copiedCommand === envExample ? (
                  <Check className="h-4 w-4 text-green-400" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}