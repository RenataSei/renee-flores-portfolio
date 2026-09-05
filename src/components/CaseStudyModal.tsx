import React, { useEffect } from 'react';
import { X, Shield, Lock, Award, CheckCircle2, Terminal, AlertTriangle, Layers, Activity, GitCommit, Image as ImageIcon } from 'lucide-react';
import type { Project } from '../data/projectsData';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container glass-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-meta-top">
            <span className={`badge ${project.category === 'commission' ? 'badge-cyan' : 'badge-emerald'}`}>
              {project.type}
            </span>
            {project.ndaProtected && (
              <span className="badge badge-amber">
                <Lock size={12} />
                <span>Confidential Architecture • NDA Enforced</span>
              </span>
            )}
            {project.isoStandard && (
              <span className="badge badge-rose">
                <Award size={12} />
                <span>ISO/IEC 25010 Evaluated</span>
              </span>
            )}
          </div>

          <button 
            id="close-modal-btn"
            onClick={onClose} 
            className="modal-close-btn"
            aria-label="Close Case Study"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="modal-body">
          <h2 id="modal-title" className="modal-title">{project.title}</h2>
          <p className="modal-subtitle">{project.subtitle}</p>

          <div className="modal-info-strip">
            <div className="info-cell">
              <span className="info-lbl">ROLE</span>
              <span className="info-val">{project.role}</span>
            </div>
            <div className="info-cell">
              <span className="info-lbl">TIMEFRAME</span>
              <span className="info-val">{project.timeframe}</span>
            </div>
            <div className="info-cell">
              <span className="info-lbl">PRIMARY DOMAINS</span>
              <span className="info-val">{project.tags.slice(0, 3).join(' • ')}</span>
            </div>
          </div>

          {/* NDA Notice Banner if applicable */}
          {project.ndaProtected && (
            <div className="modal-nda-banner">
              <div className="nda-banner-icon">
                <Shield size={22} className="text-amber" />
              </div>
              <div className="nda-banner-text">
                <h4>Confidentiality & Non-Disclosure Notice</h4>
                <p>
                  In compliance with formal NDA agreements, all proprietary client branding, production URLs, and customer-facing UI assets are strictly redacted. The technical details presented below highlight the isolated backend security patterns, cryptographic validation, and schema optimizations authored for the project.
                </p>
              </div>
            </div>
          )}

          {/* Key Metrics / Attributes Grid */}
          <div className="modal-metrics-grid">
            {project.metrics.map((m, i) => (
              <div key={i} className="modal-metric-card">
                <span className="metric-big-val text-gradient">{m.value}</span>
                <span className="metric-desc">{m.label}</span>
              </div>
            ))}
          </div>

          {/* Architecture Diagram (if available) */}
          {project.architectureDiagram && (
            <div className="modal-section">
              <div className="modal-section-title">
                <Layers size={18} className="text-cyan" />
                <h3>System Architecture & Component Flow</h3>
              </div>
              <div className="architecture-diagram-box">
                <pre className="diagram-pre">{project.architectureDiagram}</pre>
              </div>
            </div>
          )}

          {/* Section: Challenge */}
          <div className="modal-section">
            <div className="modal-section-title">
              <AlertTriangle size={18} className="text-rose" />
              <h3>The Technical Problem</h3>
            </div>
            <p className="modal-narrative">{project.challenge}</p>
          </div>

          {/* Section: Engineering Solution */}
          <div className="modal-section">
            <div className="modal-section-title">
              <Terminal size={18} className="text-cyan" />
              <h3>Engineering Intervention & Solution</h3>
            </div>
            <p className="modal-narrative">{project.solution}</p>
          </div>

          {/* Visual Checkpoints & Evidence Gallery */}
          {project.visualCheckpoints && project.visualCheckpoints.length > 0 && (
            <div className="modal-section">
              <div className="modal-section-title">
                <ImageIcon size={18} className="text-sky" />
                <h3>Implementation Checkpoints & Visual Evidence</h3>
              </div>
              <div className="visual-checkpoints-grid">
                {project.visualCheckpoints.map((cp, idx) => (
                  <div key={idx} className="checkpoint-card">
                    <div className="checkpoint-top">
                      <span className="checkpoint-badge">{cp.tag}</span>
                      <span className="checkpoint-index">0{idx + 1}</span>
                    </div>
                    <h4 className="checkpoint-title">{cp.title}</h4>
                    <p className="checkpoint-caption">{cp.caption}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Architectural Decisions */}
          <div className="modal-section">
            <div className="modal-section-title">
              <GitCommit size={18} className="text-blue" />
              <h3>Key Engineering Decisions</h3>
            </div>
            <ul className="modal-checklist">
              {project.architectureDetails.map((detail, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={16} className="text-emerald check-icon" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Academic Evaluation Framework if applicable */}
          {project.isoStandard && (
            <div className="modal-iso-box">
              <div className="iso-badge-row">
                <Award size={18} className="text-rose" />
                <h4>Academic Evaluation Framework (ISO/IEC 25010)</h4>
              </div>
              <p className="iso-desc">{project.isoStandard}</p>
            </div>
          )}

          {/* Section: Impact */}
          <div className="modal-section">
            <div className="modal-section-title">
              <Activity size={18} className="text-emerald" />
              <h3>Outcome & Results</h3>
            </div>
            <p className="modal-narrative">{project.impact}</p>
          </div>

          {/* Tech Stack Pills */}
          <div className="modal-stack-section">
            <span className="stack-label">Technologies Deployed:</span>
            <div className="modal-tags">
              {project.tags.map((t, idx) => (
                <span key={idx} className="tech-tag">{t}</span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary-glass">
            <span>Close Case Study</span>
          </button>
        </div>

      </div>
    </div>
  );
};
