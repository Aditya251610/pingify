import { ArrowRight, Play, Download } from 'lucide-react';
import Terminal3D from './Terminal3D';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-gray-900 dark:text-white">Effortless</span>
              <br />
              <span className="gradient-text">API Monitoring</span>
              <br />
              <span className="text-gray-700 dark:text-gray-300">from Your Terminal</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
              Pingify lets you monitor endpoints, get alerts, and analyze APIs via CLI. 
              Built for developers who want powerful monitoring without the complexity.
            </p>

            {/* Terminal Demo */}
            <div className="terminal-window mb-8 max-w-2xl">
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500"></div>
                <div className="terminal-dot bg-yellow-500"></div>
                <div className="terminal-dot bg-green-500"></div>
                <span className="text-gray-400 text-sm ml-4">Terminal</span>
              </div>
              <div className="p-4 text-left">
                <div className="font-mono text-sm">
                  <div className="text-neon-blue">$ pingify monitor \</div>
                  <div className="text-gray-400 ml-4">--url https://api.example.com \</div>
                  <div className="text-gray-400 ml-4">--interval 10s \</div>
                  <div className="text-gray-400 ml-4">--threshold 500ms \</div>
                  <div className="text-gray-400 ml-4">--email dev@company.com</div>
                  <div className="mt-2">
                    <div className="text-green-400">✅ HTTP 200 - 234ms</div>
                    <div className="text-green-400">✅ HTTP 200 - 189ms</div>
                    <div className="text-red-400">🚨 HTTP 200 - 678ms</div>
                    <div className="text-neon-blue">📧 Alert sent to dev@company.com</div>
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-neon-blue">$</span>
                    <span className="animate-terminal-cursor ml-1 bg-neon-blue w-2 h-4 inline-block"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="btn-primary flex items-center gap-2">
                <Download className="h-5 w-5" />
                Get Started
                <ArrowRight className="h-4 w-4" />
              </button>
              
              <a href="#docs" className="btn-secondary flex items-center gap-2">
                <Play className="h-5 w-5" />
                View Docs
              </a>
              
              <button className="btn-secondary flex items-center gap-2">
                🐳 Try with Docker
              </button>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start">
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-blue">1.2k+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">GitHub Stars</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-500">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Contributors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-green">99.9%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
              </div>
            </div>
          </div>

          {/* 3D Terminal */}
          <div className="relative">
            <Terminal3D />
            
            {/* Floating Status Cards */}
            <div className="absolute top-4 right-4 glass rounded-lg p-3 animate-float">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-mono text-gray-700 dark:text-gray-300">API Online</span>
              </div>
            </div>
            
            <div className="absolute bottom-8 left-4 glass rounded-lg p-3 animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
                <span className="text-sm font-mono text-gray-700 dark:text-gray-300">234ms avg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}