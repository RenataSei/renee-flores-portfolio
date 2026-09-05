import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`nav-wrapper ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="container nav-inner">
        {/* Brand Logo & Telemetry Indicator */}
        <a href="#hero" className="nav-brand">
          <div className="brand-icon">
            <Terminal size={18} className="text-cyan" />
          </div>
          <div className="brand-text">
            <span className="brand-name">Reneé Flores</span>
            <span className="brand-telemetry">
              <span className="pulse-dot"></span> DEV // ISO-25010
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-links">
          <a href="#projects" className="nav-link">Work & Commissions</a>
          <a href="#skills" className="nav-link">Skills & Architecture</a>
          <a href="#about" className="nav-link">About & Telemetry</a>
        </nav>

        {/* Action Buttons */}
        <div className="nav-actions">
          <button 
            id="nav-contact-btn"
            onClick={onContactClick} 
            className="btn-primary-glow"
          >
            <span>Get in Touch</span>
            <ArrowUpRight size={16} />
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            id="mobile-menu-toggle"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu glass-card">
          <a 
            href="#projects" 
            className="mobile-link" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Work & Commissions
          </a>
          <a 
            href="#skills" 
            className="mobile-link" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Skills & Architecture
          </a>
          <a 
            href="#about" 
            className="mobile-link" 
            onClick={() => setMobileMenuOpen(false)}
          >
            About & Telemetry
          </a>
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              onContactClick();
            }}
            className="btn-primary-glow mobile-contact-btn"
          >
            <span>Get in Touch</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      )}
    </header>
  );
};
