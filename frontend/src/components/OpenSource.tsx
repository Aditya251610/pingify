import { Github, Star, GitFork, Users, Heart, ExternalLink } from 'lucide-react';

export default function OpenSource() {
  return (
    <section id="opensource" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gray-900 dark:text-white">Open Source &</span>
            <br />
            <span className="gradient-text">Community Driven</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Pingify is built in the open with ❤️ by developers, for developers. 
            Join our growing community and help make API monitoring better for everyone.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Stats & Info */}
          <div>
            <div className="glass rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Github className="h-6 w-6" />
                Repository Stats
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="text-2xl font-bold text-neon-blue">1.2k+</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">GitHub Stars</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <GitFork className="h-5 w-5 text-accent-500" />
                    <span className="text-2xl font-bold text-accent-500">180+</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Forks</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-neon-green" />
                    <span className="text-2xl font-bold text-neon-green">50+</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Contributors</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    <span className="text-2xl font-bold text-red-500">MIT</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">License</p>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="glass rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Built With
              </h3>
              <div className="flex flex-wrap gap-3">
                {['Go', 'Cobra CLI', 'OpenAI GPT', 'Docker', 'SMTP', 'JSON'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contribution Guide */}
          <div>
            <div className="glass rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Contributing
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    🚀 Getting Started
                  </h4>
                  <div className="code-block">
                    <code className="text-neon-blue text-sm">
                      git clone https://github.com/Aditya251610/pingify.git<br />
                      cd pingify<br />
                      go run main.go --help
                    </code>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    🛠️ Development
                  </h4>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                    <li>• Fork the repository</li>
                    <li>• Create a feature branch</li>
                    <li>• Make your changes</li>
                    <li>• Add tests if applicable</li>
                    <li>• Submit a pull request</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    📝 Areas to Contribute
                  </h4>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                    <li>• New monitoring features</li>
                    <li>• Additional alert channels</li>
                    <li>• Performance improvements</li>
                    <li>• Documentation updates</li>
                    <li>• Bug fixes and testing</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a
                href="https://github.com/Aditya251610/pingify"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2 justify-center"
              >
                <Github className="h-5 w-5" />
                View on GitHub
                <ExternalLink className="h-4 w-4" />
              </a>
              
              <a
                href="https://github.com/Aditya251610/pingify/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2 justify-center"
              >
                Report Issues
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Community Section */}
        <div className="mt-16 text-center">
          <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Join Our Community
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Connect with other developers, share your use cases, and help shape the future of Pingify.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/Aditya251610/pingify/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                💬 Discussions
              </a>
              <a
                href="https://github.com/Aditya251610/pingify/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                🐛 Issues
              </a>
              <a
                href="https://github.com/Aditya251610/pingify/pulls"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                🔄 Pull Requests
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}