import React from 'react';
import { ShieldCheck, PhoneCall, Download } from 'lucide-react';
import { propertyData } from '../data/propertyData';

export const Header = ({ onOpenEnquiry, onOpenBrochure }) => {
  const { projectInfo } = propertyData;

  return (
    <header className="site-header">
      <div className="container header-container">
        {/* Brand Logo & Title */}
        <div className="brand-logo-wrap">
          <div className="brand-crest">
            <span className="crest-symbol">🏛️</span>
          </div>
          <div className="brand-text">
            <div className="brand-title">{projectInfo.name}</div>
            <div className="brand-subtitle">{projectInfo.developer}</div>
          </div>
        </div>

        {/* Center DTCP Approval Badge */}
        <div className="header-badge-rera d-none-mobile">
          <ShieldCheck size={16} className="rera-icon" />
          <span><strong>{projectInfo.approvalBadge || "APPROVED DTCP"}</strong> • Kurumbapalayam</span>
        </div>

        {/* Right CTA Actions - NO Nav Menu as requested */}
        <div className="header-actions">
          <a 
            href={`tel:${projectInfo.phone}`} 
            className="header-phone-btn"
            title="Call Sales Team"
          >
            <PhoneCall size={16} />
            <span className="d-none-mobile">{projectInfo.phoneDisplay}</span>
          </a>

          <button 
            type="button"
            onClick={onOpenBrochure} 
            className="btn-header-cta"
          >
            <Download size={15} />
            <span>Brochure</span>
          </button>
        </div>
      </div>
    </header>
  );
};
