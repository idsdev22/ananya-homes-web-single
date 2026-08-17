import React from 'react';
import { CheckCircle2, ShieldCheck, Download, Award, Compass, Sparkles } from 'lucide-react';
import { propertyData } from '../data/propertyData';

export const ProjectOverview = ({ onOpenBrochure, onOpenEnquiry }) => {
  const { overview, projectInfo } = propertyData;

  return (
    <section className="section overview-section" id="overview">
      <div className="container">
        <div className="overview-grid">
          {/* Left Column: Visual Collage */}
          <div className="overview-visual-col">
            <div className="visual-card primary-visual">
              <img
                src={overview.imagePrimary}
                alt={`${projectInfo.name} Architecture`}
                className="overview-img"
              />
              <div className="visual-badge-floating">
                <Award size={20} className="badge-icon text-gold" />
                <div>
                  <div className="badge-title">DTCP Approved Layout</div>
                  <div className="badge-subtitle">Kurumbapalayam, Coimbatore</div>
                </div>
              </div>
            </div>

            <div className="visual-card secondary-visual d-none-mobile">
              <img
                src={overview.imageSecondary}
                alt={`${projectInfo.name} Community`}
                className="overview-img-secondary"
              />
              <div className="visual-overlay-stat">
                <div className="stat-highlight">100%</div>
                <div className="stat-text">Vasthu Compliant Plots</div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Highlights */}
          <div className="overview-content-col">
            <div className="section-tag">
              <Sparkles size={14} />
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

            {/* Feature Highlights Grid */}
            <div className="overview-highlights-list">
              {overview.highlightsList.map((item, idx) => (
                <div key={idx} className="highlight-item">
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
