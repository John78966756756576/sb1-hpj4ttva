import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Search as SearchIcon, User, Heart, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../ui/Button';
import { cn } from '../../utils/cn';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="h-4 w-4" /> },
    { name: 'Explore', path: '/explore', icon: <SearchIcon className="h-4 w-4" /> },
    { name: 'Favorites', path: '/favorites', icon: <Heart className="h-4 w-4" /> },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/90 dark:bg-secondary-900/90 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-primary-500 rounded-md transform rotate-45"></div>
            <div className="absolute inset-2 bg-white dark:bg-secondary-900 rounded-sm transform rotate-45"></div>
            <div className="absolute inset-3 bg-accent-500 rounded-sm transform rotate-45"></div>
          </div>
          <span className="font-bold text-xl text-secondary-900 dark:text-white">
            ArchRating
          </span>
        </Link>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'flex items-center gap-1.5 font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400',
                location.pathname === link.path 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-secondary-700 dark:text-secondary-300'
              )}
            >
              {link.icon}
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  className="absolute -bottom-6 w-1.5 h-1.5 bg-primary-500 rounded-full"
                  layoutId="navIndicator"
                />
              )}
            </Link>
          ))}
        </nav>
        
        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors text-secondary-600 dark:text-secondary-400"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          <Button 
            variant="secondary" 
            size="sm"
            icon={<User className="h-4 w-4" />}
          >
            Sign In
          </Button>
          
          <Button variant="primary" size="sm">
            Join Now
          </Button>
        </div>
        
        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors text-secondary-600 dark:text-secondary-400"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-secondary-900 dark:text-white" />
            ) : (
              <Menu className="h-6 w-6 text-secondary-900 dark:text-white" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <motion.div
        className="md:hidden overflow-hidden"
        initial={{ height: 0 }}
        animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="container-custom py-4 flex flex-col gap-4 bg-white dark:bg-secondary-900">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'flex items-center gap-2 p-2 rounded-md',
                location.pathname === link.path 
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                  : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800'
              )}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          
          <hr className="border-secondary-200 dark:border-secondary-800 my-2" />
          
          <div className="flex flex-col gap-3">
            <Button variant="secondary" icon={<User className="h-4 w-4" />}>
              Sign In
            </Button>
            
            <Button variant="primary">
              Join Now
            </Button>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Navbar;