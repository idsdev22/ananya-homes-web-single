import React from 'react';
import { CheckCircle2, ShieldCheck, Download, Award, Compass, Sparkles } from 'lucide-react';
import { propertyData } from '../data/propertyData';

export const ProjectOverview = ({ onOpenBrochure, onOpenEnquiry }) => {
  const { overview, projectInfo } = propertyData;

  return (
    <section className="section overview-section" id="overview">
      <div className="container">
        <div className="overview-grid">
          {/* Left Column: Visual Collage with smooth entrance */}
          <div className="overview-visual-col reveal-left">
            <div className="visual-card primary-visual hover-lift">
              <img
                src={overview.imagePrimary}
                alt={`${projectInfo.name} Architecture`}
                className="overview-img"
                loading="lazy"
              />
              <div className="visual-badge-floating animate-float-gentle">
                <Award size={20} className="badge-icon text-gold" />
                <div>
                  <div className="badge-title">DTCP Approved Layout</div>
                  <div className="badge-subtitle">Kurumbapalayam, Coimbatore</div>
                </div>
              </div>
            </div>

            <div className="visual-card secondary-visual d-none-mobile hover-lift">
              <img
                src={overview.imageSecondary}
                alt={`${projectInfo.name} Community`}
                className="overview-img-secondary"
                loading="lazy"
              />
              <div className="visual-overlay-stat pulse-badge">
                <div className="stat-highlight">100%</div>
                <div className="stat-text">Vasthu Compliant Plots</div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Highlights */}
          <div className="overview-content-col reveal-right">
            <div className="section-tag">
              <Sparkles size={14} className="animate-sparkle" />
              <span>{overview.subtitle}</span>
            </div>

            <h2 className="section-title">
              {overview.title}
            </h2>

            <p className="overview-lead">
              {overview.leadText}
            </p>

            {overview.paragraphs.map((p, idx) => (
              <p key={idx} className="overview-paragraph">
                {p}
              </p>
            ))}

            {/* Feature Highlights Grid with Staggered Entrance */}
            <div className="overview-highlights-list reveal-stagger">
              {overview.highlightsList.map((item, idx) => (
                <div key={idx} className="highlight-item hover-scale">
                  <div className="highlight-check">
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="highlight-text">{item}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}

          </div>
        </div>
      </div>
    </section>
  );
};

