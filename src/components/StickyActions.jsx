import React, { useState, useEffect } from 'react';
import { Phone, MessageSquareText, ArrowUp } from 'lucide-react';
import { propertyData } from '../data/propertyData';

export const StickyActions = ({ onOpenEnquiry }) => {
  const { projectInfo } = propertyData;
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>


      {/* DESKTOP RIGHT-SIDE VERTICAL FLOATING ACTIONS */}
      <div className="vertical-floating-actions d-none-mobile">
        <a 
          href={`tel:${projectInfo.phone}`} 
          className="vertical-action-btn call-now-btn hover-lift"
          title="Call Property Advisor"
        >
          <Phone size={16} className="vertical-icon" />
          <span className="vertical-text">CALL NOW</span>
        </a>

        <button 
          type="button" 
          onClick={onOpenEnquiry} 
          className="vertical-action-btn enquire-now-btn btn-shimmer hover-lift"
          title="Get Price & Brochure"
        >
          <MessageSquareText size={16} className="vertical-icon" />
          <span className="vertical-text">ENQUIRE NOW</span>
        </button>
      </div>

      {/* MOBILE STICKY BOTTOM 50/50 BAR */}
      <div className="mobile-sticky-bottom-bar d-flex-mobile animate-slide-up">
        <a 
          href={`tel:${projectInfo.phone}`} 
          className="mobile-bar-btn mobile-call-btn"
          title="Call Now"
        >
          <Phone size={18} />
          <span>CALL NOW</span>
        </a>

        <button 
          type="button" 
          onClick={onOpenEnquiry} 
          className="mobile-bar-btn mobile-enquire-btn btn-shimmer"
          title="Enquire Now"
        >
          <MessageSquareText size={18} />
          <span>ENQUIRE NOW</span>
        </button>
      </div>

      {/* Floating Scroll to Top FAB */}
      {showScrollTop && (
        <button 
          type="button" 
          className="floating-scroll-top animate-pop-in hover-scale"
          onClick={scrollToTop}
          title="Scroll to top"
        >
          <ArrowUp size={18} />
        </button>
      )}


    </>
  );
};
