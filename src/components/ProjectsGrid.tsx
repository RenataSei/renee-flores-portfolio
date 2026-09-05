import React, { useState, useMemo } from 'react';
import type { Project } from '../data/projectsData';
import { PROJECTS_DATA } from '../data/projectsData';
import { ProjectCard } from './ProjectCard';
import { Briefcase, FolderGit2, Sparkles } from 'lucide-react';

interface ProjectsGridProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<'all' | 'commission' | 'personal'>('all');

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return PROJECTS_DATA;
    return PROJECTS_DATA.filter((p) => p.category === filter);
  }, [filter]);

  const counts = useMemo(() => {
    return {
      all: PROJECTS_DATA.length,
      commission: PROJECTS_DATA.filter((p) => p.category === 'commission').length,
      personal: PROJECTS_DATA.filter((p) => p.category === 'personal').length,
    };
  }, []);

  return (
    <section id="projects" className="section-container">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Proven Engineering Deliveries</span>
          </div>
          <h2 className="section-title">Case Studies & Architectures</h2>
          <p className="section-subtitle mx-auto">
            From high-pressure 14-day client rescues to secure fintech backends and autonomous agentic workflows.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="filter-pill-bar">
          <button
            id="filter-all"
            onClick={() => setFilter('all')}
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          >
            <span>All Works</span>
            <span className="filter-count">{counts.all}</span>
          </button>

          <button
            id="filter-commissions"
            onClick={() => setFilter('commission')}
            className={`filter-btn ${filter === 'commission' ? 'active' : ''}`}
          >
            <Briefcase size={15} />
            <span>Client Commissions</span>
            <span className="filter-count">{counts.commission}</span>
          </button>

          <button
            id="filter-personal"
            onClick={() => setFilter('personal')}
            className={`filter-btn ${filter === 'personal' ? 'active' : ''}`}
          >
            <FolderGit2 size={15} />
            <span>Personal & AI Systems</span>
            <span className="filter-count">{counts.personal}</span>
          </button>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
