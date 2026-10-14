import React, { useState, useEffect } from 'react';
import './App.css';
import type { Project } from './data/projectsData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsGrid } from './components/ProjectsGrid';
import { SkillsSection } from './components/SkillsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { CaseStudyModal } from './components/CaseStudyModal';
import { CliTerminal } from './components/CliTerminal';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Global hotkey listener for ~ / ` (Backtick / Tilde)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in regular forms (outside the terminal)
      const target = e.target as HTMLElement | null;
      const isInput = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA';
      const isCliInput = target?.classList.contains('cli-input');

      if ((e.key === '`' || e.key === '~') && (!isInput || isCliInput)) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleScrollToContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-root">
      {/* Dynamic Ambient Background (CSS GPU-efficient gradient) */}
      <div className="ambient-bg" aria-hidden="true" />

      {/* Navigation Bar */}
      <Navbar 
        onContactClick={handleScrollToContact}
        onTerminalClick={() => setIsTerminalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        <Hero onContactClick={handleScrollToContact} />
        <ProjectsGrid onSelectProject={setSelectedProject} />
        <SkillsSection />
        <AboutSection />
      </main>

      {/* Contact & Systems Footer */}
      <ContactSection />

      {/* Case Study Deep-Dive Modal */}
      <CaseStudyModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* Interactive Developer CLI Terminal Console */}
      <CliTerminal 
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onContactClick={handleScrollToContact}
      />
    </div>
  );
};

export default App;
