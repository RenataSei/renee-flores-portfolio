import React, { useState } from 'react';
import { Mail, Copy, Check, ArrowUpRight, Heart } from 'lucide-react';
import { PROFILE_DATA } from '../data/projectsData';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="contact" className="contact-section">
      <div className="container">
        
        {/* Main Contact Card */}
        <div className="glass-card contact-card">
          <div className="contact-content">
            <div className="section-tag">
              <span>Direct Inquiries</span>
            </div>
            <h2 className="contact-title">Let's Build Resilient Systems Together.</h2>
            <p className="contact-subtitle">
              Whether you need a full-stack engineer for enterprise web platforms, an emergency codebase rescue, or an adaptable developer for your Dubai/remote team—I'd love to connect.
            </p>

            <div className="contact-actions-row">
              {/* Copy Email Button */}
              <button 
                id="copy-email-btn"
                onClick={handleCopyEmail}
                className="btn-primary-glow"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Email Address'}</span>
              </button>

              {/* Direct Mailto */}
              <a 
                href={`mailto:${PROFILE_DATA.socials.email}?subject=Developer%20Opportunity%20-%20Rene%C3%A9%20Flores`}
                className="btn-secondary-glass"
              >
                <Mail size={18} />
                <span>Open Mail Client</span>
                <ArrowUpRight size={16} />
              </a>

              {/* LinkedIn Link */}
              <a 
                href={PROFILE_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-glass"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
                <span>LinkedIn Profile</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          <div className="telemetry-box glass-card">
            <div className="telemetry-header">
              <span className="live-ping"></span>
              <span className="telemetry-title">WORKSTATION TELEMETRY</span>
            </div>
            <div className="telemetry-lines">
              <div className="telemetry-row">
                <span>SYSTEM:</span>
                <span className="text-cyan">DLSU-D BIT45 // HOMELAB-CORE</span>
              </div>
              <div className="telemetry-row">
                <span>STACK:</span>
                <span>MERN • C# ASP.NET CORE • DART</span>
              </div>
              <div className="telemetry-row">
                <span>STANDARDS:</span>
                <span className="text-emerald">ISO 25010:2011 COMPLIANT</span>
              </div>
              <div className="telemetry-row">
                <span>DISPATCH:</span>
                <span className="text-amber">OPEN FOR OPPORTUNITIES</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Micro Footer */}
        <div className="bottom-footer">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Reneé Bernard Flores. Designed & Engineered with precision.
          </p>
          <div className="footer-right">
            <span>Built with React + Vite</span>
            <span className="text-muted">•</span>
            <span className="footer-homelab">
              <Heart size={13} className="text-rose" /> Powered by AI Homelab
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
