import React, { useState } from 'react';
import './App.css';
import type { Project } from './data/projectsData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsGrid } from './components/ProjectsGrid';
import { SkillsSection } from './components/SkillsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { CaseStudyModal } from './components/CaseStudyModal';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
      <Navbar onContactClick={handleScrollToContact} />

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
    </div>
  );
};

export default App;
