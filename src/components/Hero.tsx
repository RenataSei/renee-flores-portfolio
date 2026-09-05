import React from 'react';
import { ShieldCheck, Cpu, ArrowDown, CheckCircle2, Globe } from 'lucide-react';
import { PROFILE_DATA } from '../data/projectsData';

interface HeroProps {
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onContactClick }) => {
  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        
        {/* Availability & Location Beacon */}
        <div className="status-badge-wrapper">
          <div className="status-pill">
            <span className="live-ping"></span>
            <span className="status-text">{PROFILE_DATA.availability}</span>
          </div>
        </div>

        {/* Main Headings — Confident, grounded, no shoulder pads */}
        <h1 className="hero-title">
          Engineering Reliable <br />
          <span className="text-gradient">Full-Stack Applications</span> & Systems.
        </h1>

        <p className="hero-description">
          Hi, I'm <strong className="text-white">Reneé Bernard Flores</strong> — a full-stack software engineer graduating from DLSU-D (BIT45). I build web applications and backend services using <strong>React</strong>, <strong>Node.js</strong>, <strong>C#</strong>, and <strong>ASP.NET Core</strong>, with a focus on reliability, application security, and practical problem solving.
        </p>

        {/* Primary CTA Buttons */}
        <div className="hero-cta-group">
          <a href="#projects" className="btn-primary-glow">
            <span>Explore Projects & Case Studies</span>
            <ArrowDown size={17} />
          </a>

          <button 
            id="hero-contact-btn"
            onClick={onContactClick}
            className="btn-secondary-glass"
          >
            <span>Get in Touch</span>
            <Globe size={17} />
          </button>
        </div>

        {/* Key Metrics / Highlights Strip — Verifiable and honest */}
        <div className="metrics-strip glass-card">
          {PROFILE_DATA.stats.map((stat, idx) => (
            <div key={idx} className="metric-cell">
              <span className="metric-value text-gradient">{stat.value}</span>
              <span className="metric-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Engineering Highlights Micro-Bar */}
        <div className="engineering-bar">
          <div className="eng-item">
            <Cpu size={16} className="text-cyan" />
            <span>React & Node.js</span>
          </div>
          <div className="eng-separator">•</div>
          <div className="eng-item">
            <Cpu size={16} className="text-blue" />
            <span>C# & ASP.NET Core</span>
          </div>
          <div className="eng-separator">•</div>
          <div className="eng-item">
            <ShieldCheck size={16} className="text-amber" />
            <span>Auth & Security (2FA, JWT)</span>
          </div>
          <div className="eng-separator">•</div>
          <div className="eng-item">
            <CheckCircle2 size={16} className="text-emerald" />
            <span>980 TOEIC Fluency</span>
          </div>
        </div>

      </div>
    </section>
  );
};
