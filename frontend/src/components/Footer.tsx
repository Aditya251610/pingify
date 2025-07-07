import { Github, Mail, ExternalLink, Terminal, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Usage', href: '#usage' },
      { name: 'Documentation', href: '#docs' },
      { name: 'Examples', href: '#examples' },
    ],
    resources: [
      { name: 'GitHub Repository', href: 'https://github.com/Aditya251610/pingify', external: true },
      { name: 'Docker Hub', href: 'https://hub.docker.com/r/aditya251610/pingify', external: true },
      { name: 'Issues', href: 'https://github.com/Aditya251610/pingify/issues', external: true },
      { name: 'Discussions', href: 'https://github.com/Aditya251610/pingify/discussions', external: true },
    ],
    community: [
      { name: 'Contributing', href: 'https://github.com/Aditya251610/pingify/blob/main/CONTRIBUTING.md', external: true },
      { name: 'Code of Conduct', href: 'https://github.com/Aditya251610/pingify/blob/main/CODE_OF_CONDUCT.md', external: true },
      { name: 'License', href: 'https://github.com/Aditya251610/pingify/blob/main/LICENSE', external: true },
      { name: 'Changelog', href: 'https://github.com/Aditya251610/pingify/releases', external: true },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Terminal className="h-8 w-8 text-neon-blue" />
              <span className="text-2xl font-bold gradient-text">Pingify</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Fast, AI-powered API monitoring CLI tool that helps developers track response time, 
              detect performance issues, and get smart optimization suggestions.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://github.com/Aditya251610/pingify"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg glass hover:bg-white/20 transition-colors duration-200"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:aditya.dev2516@gmail.com"
                className="p-2 rounded-lg glass hover:bg-white/20 transition-colors duration-200"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {links.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-neon-blue transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-gray-400 hover:text-neon-blue transition-colors duration-200 flex items-center gap-1"
                  >
                    {link.name}
                    {link.external && <ExternalLink className="h-3 w-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Community</h3>
            <ul className="space-y-3">
              {links.community.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-gray-400 hover:text-neon-blue transition-colors duration-200 flex items-center gap-1"
                  >
                    {link.name}
                    {link.external && <ExternalLink className="h-3 w-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 text-gray-400 mb-4 md:mb-0">
              <span>© {currentYear} Pingify. Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>by</span>
              <a
                href="https://github.com/Aditya251610"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon-blue hover:text-neon-blue/80 transition-colors duration-200"
              >
                Aditya Sharma
              </a>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a
                href="https://github.com/Aditya251610/pingify/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neon-blue transition-colors duration-200"
              >
                MIT License
              </a>
              <span>•</span>
              <a
                href="https://github.com/Aditya251610/pingify/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neon-blue transition-colors duration-200"
              >
                v1.0.0
              </a>
              <span>•</span>
              <span>Built with Go</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}