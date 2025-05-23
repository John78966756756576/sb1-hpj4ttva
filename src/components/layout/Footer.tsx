import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail,
  Phone,
  MapPin,
  ExternalLink 
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 text-secondary-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-primary-500 rounded-md transform rotate-45"></div>
                <div className="absolute inset-2 bg-secondary-900 rounded-sm transform rotate-45"></div>
                <div className="absolute inset-3 bg-accent-500 rounded-sm transform rotate-45"></div>
              </div>
              <span className="font-bold text-xl text-white">
                ArchRating
              </span>
            </Link>
            <p className="text-sm">
              Discover and rate the world's most stunning architectural designs. 
              Our platform showcases premium houses across various styles and locations.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-secondary-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-secondary-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-secondary-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-secondary-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondary-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/explore" className="text-secondary-400 hover:text-white transition-colors">Explore Designs</Link>
              </li>
              <li>
                <Link to="/favorites" className="text-secondary-400 hover:text-white transition-colors">My Favorites</Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary-400 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Design Styles</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/style/modern" className="text-secondary-400 hover:text-white transition-colors">Modern</Link>
              </li>
              <li>
                <Link to="/style/minimalist" className="text-secondary-400 hover:text-white transition-colors">Minimalist</Link>
              </li>
              <li>
                <Link to="/style/contemporary" className="text-secondary-400 hover:text-white transition-colors">Contemporary</Link>
              </li>
              <li>
                <Link to="/style/industrial" className="text-secondary-400 hover:text-white transition-colors">Industrial</Link>
              </li>
              <li>
                <Link to="/style/mediterranean" className="text-secondary-400 hover:text-white transition-colors">Mediterranean</Link>
              </li>
              <li>
                <Link to="/style/coastal" className="text-secondary-400 hover:text-white transition-colors flex items-center gap-1">
                  All Styles <ExternalLink size={14} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary-400 mt-0.5 flex-shrink-0" />
                <span>123 Architecture Lane, Design District, CA 94103</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary-400 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary-400 flex-shrink-0" />
                <span>info@archrating.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-secondary-800" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© {currentYear} ArchRating. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-secondary-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-secondary-400 hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="text-secondary-400 hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;