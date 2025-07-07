import { 
  Terminal, 
  Mail, 
  FileText, 
  Brain, 
  Container, 
  Zap,
  Shield,
  BarChart3,
  Clock,
  AlertTriangle,
  Code,
  Globe
} from 'lucide-react';

const features = [
  {
    icon: Terminal,
    title: 'One-line Monitoring',
    description: 'Start monitoring any API endpoint with a single command. No complex setup required.',
    code: 'pingify monitor --url api.example.com'
  },
  {
    icon: Mail,
    title: 'Smart Alerts',
    description: 'Get email notifications when your APIs exceed performance thresholds or go down.',
    code: '--email dev@company.com --threshold 500ms'
  },
  {
    icon: FileText,
    title: 'JSON Logging',
    description: 'All monitoring data is automatically saved to structured JSON logs for analysis.',
    code: 'logs/monitor_<hash>.json'
  },
  {
    icon: Brain,
    title: 'AI Error Analysis',
    description: 'Get intelligent suggestions from OpenAI GPT to optimize your API performance.',
    code: 'pingify ai --url api.example.com --explain'
  },
  {
    icon: Container,
    title: 'Docker Ready',
    description: 'Run Pingify in any environment with our lightweight Docker container.',
    code: 'docker run pingify monitor --url api.com'
  },
  {
    icon: Zap,
    title: 'Real-time Monitoring',
    description: 'Watch your API performance in real-time with customizable intervals.',
    code: '--interval 10s --duration 5m'
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    description: 'Environment-based configuration keeps your credentials safe and secure.',
    code: 'SMTP_HOST=smtp.gmail.com'
  },
  {
    icon: BarChart3,
    title: 'Performance Reports',
    description: 'Generate detailed reports with success rates, average response times, and trends.',
    code: 'pingify report --url api.example.com'
  },
  {
    icon: Clock,
    title: 'Threshold Monitoring',
    description: 'Set custom performance thresholds and get alerted when they are exceeded.',
    code: '--threshold 800ms --alert'
  },
  {
    icon: AlertTriangle,
    title: 'Failure Detection',
    description: 'Automatically detect API failures, timeouts, and performance degradation.',
    code: 'HTTP 500 - Service Unavailable'
  },
  {
    icon: Code,
    title: 'Developer First',
    description: 'Built by developers, for developers. Clean CLI interface with helpful output.',
    code: '✅ HTTP 200 - 234ms'
  },
  {
    icon: Globe,
    title: 'Any API',
    description: 'Monitor REST APIs, GraphQL endpoints, webhooks, or any HTTP service.',
    code: '--method POST --body \'{"query":"..."}\''
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gray-900 dark:text-white">Powerful Features for</span>
            <br />
            <span className="gradient-text">Modern Developers</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Everything you need to monitor, analyze, and optimize your APIs from the command line.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 text-white mr-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {feature.description}
              </p>
              
              <div className="code-block">
                <code className="text-neon-blue text-xs">
                  {feature.code}
                </code>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to start monitoring?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Install Pingify and start monitoring your APIs in under 30 seconds.
            </p>
            <button className="btn-primary">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}