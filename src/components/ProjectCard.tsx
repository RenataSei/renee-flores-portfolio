import React from 'react';
import { Shield, Lock, ArrowRight, Clock, Award } from 'lucide-react';
import type { Project } from '../data/projectsData';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <article className="glass-card project-card">
      
      {/* Card Header & Badges */}
      <div className="card-top">
        <div className="badge-row">
          <span className={`badge ${project.category === 'commission' ? 'badge-cyan' : 'badge-emerald'}`}>
            {project.category === 'commission' ? 'Client Commission' : 'Personal Project'}
          </span>

          {project.ndaProtected && (
            <span className="badge badge-amber">
              <Lock size={12} />
              <span>NDA Protected</span>
            </span>
          )}

          {project.isoStandard && (
            <span className="badge badge-rose">
              <Award size={12} />
              <span>ISO 25010</span>
            </span>
          )}
        </div>

        <div className="project-timeframe">
          <Clock size={13} />
          <span>{project.timeframe}</span>
        </div>
      </div>

      {/* Main Title & Subtitle */}
      <div className="card-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="project-summary">{project.summary}</p>

        {/* NDA Protocol Notice */}
        {project.ndaProtected && (
          <div className="nda-callout">
            <Shield size={16} className="text-amber" />
            <span>Proprietary client UI masked per NDA; system architecture and security protocols featured.</span>
          </div>
        )}

        {/* Quick Metrics Grid */}
        <div className="card-metrics-grid">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="metric-pill">
              <span className="metric-pill-val">{m.value}</span>
              <span className="metric-pill-lbl">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Technology Tags */}
        <div className="tags-row">
          {project.tags.map((tag, idx) => (
            <span key={idx} className="tech-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer Action */}
      <div className="card-footer">
        <button 
          id={`view-case-study-${project.id}`}
          onClick={() => onSelect(project)} 
          className="btn-card-action"
        >
          <span>View Deep-Dive & Architecture</span>
          <ArrowRight size={15} />
        </button>
      </div>

    </article>
  );
};
