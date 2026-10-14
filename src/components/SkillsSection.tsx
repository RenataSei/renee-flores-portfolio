import React from 'react';
import { 
  Code2, 
  Database, 
  ShieldCheck, 
  Terminal, 
  Cpu
} from 'lucide-react';
import { SKILLS_CATEGORIES } from '../data/projectsData';

const categoryIcons: Record<string, React.ReactNode> = {
  'Full-Stack Web Development': <Code2 size={20} className="text-cyan" />,
  'Databases & Concurrency': <Database size={20} className="text-blue" />,
  'Security & Quality Standards': <ShieldCheck size={20} className="text-amber" />,
  'Systems, Automation & Tools': <Terminal size={20} className="text-emerald" />,
  'Systems, Mobile & Tooling': <Terminal size={20} className="text-emerald" />
};

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="section-container">
      <div className="container">
        
        <div className="section-header text-center">
          <div className="section-tag">
            <Cpu size={14} />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="section-title">Core Stack & Engineering Practices</h2>
          <p className="section-subtitle mx-auto">
            Technologies and engineering workflows applied across client projects, thesis implementations, and production systems.
          </p>
        </div>

        {/* Skills Cards Grid — Categorized without subjective 'Advanced/Expert' ratings */}
        <div className="skills-grid">
          {SKILLS_CATEGORIES.map((group, idx) => (
            <div key={idx} className="glass-card skill-card">
              <div className="skill-card-header">
                <div className="skill-category-top">
                  <span className="skill-category-icon">
                    {categoryIcons[group.category] || <Code2 size={20} />}
                  </span>
                  <h3 className="skill-group-title">{group.category}</h3>
                </div>
              </div>

              <div className="skill-list">
                {group.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-row">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-note">{skill.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Grounded ISO 25010 Framework Callout */}
        <div className="glass-card iso-banner">
          <div className="iso-banner-icon">
            <ShieldCheck size={30} className="text-cyan" />
          </div>
          <div className="iso-banner-content">
            <h4 className="iso-banner-title">Evaluated Against ISO/IEC 25010 Quality Characteristics</h4>
            <p className="iso-banner-text">
              Utilized the <strong>ISO/IEC 25010:2011</strong> software product quality model as our academic thesis evaluation rubric—evaluating system performance across <strong>Functional Suitability</strong>, <strong>Reliability</strong>, <strong>Usability</strong>, and <strong>Performance Efficiency</strong> under panel scrutiny.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
