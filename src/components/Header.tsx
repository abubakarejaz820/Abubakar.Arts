import { useState } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';
import { useCart } from '../hooks/useCart';

interface HeaderProps {
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Catalog', href: '#catalog' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
    { name: 'Featured Artworks', href: '#featured-art'},
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg shadow-md transition-all duration-500">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-3 transform hover:scale-105 transition-transform duration-300">
              <img src="/images/logo.png" alt="Logo" className="h-10 w-10 rounded-full shadow-sm" />
              <span className="text-xl font-bold text-gray-900 dark:text-white tracking-wide">Abubakar.Arts</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:space-x-10 font-medium">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 px-2 py-1 group"
                >
                  {item.name}
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              ))}
            </nav>

            {/* Right Icons & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <button
                onClick={onCartClick}
                className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors duration-300"
              >
                <span className="sr-only">Cart</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.182 1.707.707 1.707H17m0-14v2m0 0v2m0 0h2m-2 0h2" />
                </svg>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors duration-300 shadow-sm"
              >
                {isDarkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-3 pb-4 space-y-2 border-t border-gray-200 dark:border-zinc-800 animate-slideDown">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>
    </>
  );
};