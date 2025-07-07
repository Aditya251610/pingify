import { useState } from 'react';
import { Moon, Sun, Menu, X, Github, Terminal } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Usage', href: '#usage' },
    { name: 'Docs', href: '#docs' },
    { name: 'Open Source', href: '#opensource' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Terminal className="h-8 w-8 text-neon-blue" />
            <span className="text-xl font-bold gradient-text">Pingify</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-neon-blue transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/Aditya251610/pingify"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-neon-blue transition-colors duration-200"
            >
              <Github className="h-5 w-5" />
            </a>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg glass hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-200"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg glass hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 dark:text-gray-300 hover:text-neon-blue transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}