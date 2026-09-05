import React from 'react';
import { Award, Compass, MapPin, GraduationCap, Gamepad2 } from 'lucide-react';
import { PROFILE_DATA } from '../data/projectsData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section-container">
      <div className="container">
        
        <div className="section-header text-center">
          <div className="section-tag">
            <span>Background & Identity</span>
          </div>
          <h2 className="section-title">About & Engineering Approach</h2>
          <p className="section-subtitle mx-auto">
            Practical software engineering balanced with accountability, systems curiosity, and team-first execution.
          </p>
        </div>

        <div className="about-grid">
          
          {/* Main Bio Card */}
          <div className="glass-card about-main-card">
            <div className="about-header">
              <div className="avatar-telemetry">
                <div className="avatar-placeholder">
                  <span>RF</span>
                </div>
                <div>
                  <h3 className="about-name">{PROFILE_DATA.name}</h3>
                  <p className="about-role">{PROFILE_DATA.headline}</p>
                </div>
              </div>
              <div className="location-pill">
                <MapPin size={14} className="text-cyan" />
                <span>Cavite / Dubai-Ready</span>
              </div>
            </div>

            <p className="about-narrative">
              I am a graduate of <strong>De La Salle University - Dasmariñas (BIT45)</strong>. My focus is on building responsive web applications and dependable backend services using React, Node.js, and C# ASP.NET Core. Throughout college and freelance projects, I’ve often stepped up to solve complex software problems under tight deadlines—including rescuing a broken client thesis system two weeks before defense.
            </p>

            <p className="about-narrative">
              I view software development much like playing support in team games: actively anticipating bottlenecks, communicating clearly, and building clean, reliable foundations so the entire team succeeds.
            </p>

            <div className="philosophy-quote">
              <span className="quote-mark">“</span>
              <p>Do everything with excellence, and everything else will follow.</p>
            </div>
          </div>

          {/* Key Background Pillars */}
          <div className="about-pillars">
            
            <div className="glass-card pillar-card">
              <div className="pillar-icon">
                <GraduationCap size={20} className="text-cyan" />
              </div>
              <div>
                <h4 className="pillar-title">DLSU-D BIT45 Graduate</h4>
                <p className="pillar-desc">
                  Rigorous computer studies foundation with hands-on system defense evaluated against ISO/IEC 25010 criteria.
                </p>
              </div>
            </div>

            <div className="glass-card pillar-card">
              <div className="pillar-icon">
                <Award size={20} className="text-amber" />
              </div>
              <div>
                <h4 className="pillar-title">980 TOEIC Fluency</h4>
                <p className="pillar-desc">
                  Near-perfect English operational fluency, ensuring clear and comfortable communication with cross-functional and international teams.
                </p>
              </div>
            </div>

            <div className="glass-card pillar-card">
              <div className="pillar-icon">
                <Compass size={20} className="text-emerald" />
              </div>
              <div>
                <h4 className="pillar-title">Global Mobility</h4>
                <p className="pillar-desc">
                  Open for remote developer positions worldwide and fully prepared for relocation to Dubai, UAE or Manila.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Technical & Worldcraft Influences Card */}
        <div className="glass-card worldcraft-card">
          <div className="worldcraft-header">
            <div className="badge badge-cyan worldcraft-badge">
              <Gamepad2 size={13} />
              <span>ENGINEERING & WORLDCRAFT</span>
            </div>
            <h3 className="worldcraft-title">Architectural Systems & Interactive Media</h3>
            <p className="worldcraft-subtitle">
              Beyond web and backend architecture, I draw heavy engineering inspiration from high-fidelity 
              interactive engines, kinetic interface design, and complex systems architecture:
            </p>
          </div>

          <div className="influences-grid">
            {/* Wuthering Waves */}
            <div className="influence-item">
              <div className="influence-item-header">
                <h4 className="influence-name">Wuthering Waves <span className="influence-dev">(Kuro Games)</span></h4>
                <span className="mono-sub">Custom UE4 • Vertical Streaming & Real-Time Hitboxes</span>
              </div>
              <p className="influence-desc">
                Deep technical admiration for squeezing immense visual fidelity from custom Unreal Engine 4 pipelines—seamless open-world vertical streaming, zero-latency combat hitboxes, and meditative traditional instrumentation (such as the Guqin in <em>Flowing Water</em>).
              </p>
            </div>

            {/* Zenless Zone Zero */}
            <div className="influence-item">
              <div className="influence-item-header">
                <h4 className="influence-name">Zenless Zone Zero <span className="influence-dev">(HoYoverse)</span></h4>
                <span className="mono-sub">Kinetic UI/UX • Micro-Animations & Audio Pacing</span>
              </div>
              <p className="influence-desc">
                A masterclass in kinetic UI responsiveness, retro-industrial typography, punchy sound design, and razor-sharp combat pacing that feels alive on every frame. A huge direct influence on tactile web micro-interactions.
              </p>
            </div>

            {/* Arknights: Endfield */}
            <div className="influence-item">
              <div className="influence-item-header">
                <h4 className="influence-name">Arknights: Endfield <span className="influence-dev">(Hypergryph)</span></h4>
                <span className="mono-sub">Automated Logistics • Industrial Worldbuilding</span>
              </div>
              <p className="influence-desc">
                Fascinated by its marriage of complex automated factory logistics pipelines, brutalist sci-fi environmental storytelling, and tactical systems design.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
