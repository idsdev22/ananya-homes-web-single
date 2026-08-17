import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  X,
  ImageIcon,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { propertyData } from '../data/propertyData';

export const MasterPlanGallery = ({ onOpenBrochure }) => {
  const images = propertyData.galleryImages || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Touch swipe state
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 45;

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'Escape') {
        setLightboxIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, images.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Touch handlers for mobile swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const currentItem = images[currentIndex] || images[0];

  return (
    <section className="section gallery-section classic-gallery-theme" id="gallery">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal-up">
          <div className="section-tag gold">
            <ImageIcon size={14} className="animate-sparkle" />
            <span>Project Gallery</span>
          </div>
          <h2 className="section-title">
            Visual Showcase & <span className="text-gold">Site Gallery</span>
          </h2>
          <p className="section-description">
            Swipe through high-resolution project captures, approved layout plans, landscape boulevards, and community amenities.
          </p>
        </div>

        {/* PURE CLASSIC SWIPE SLIDER - No Filter Clutter, Clean Image Display */}
        {currentItem && (
          <div className="classic-swipe-showcase reveal-scale">
            {/* Main Featured Slide Stage */}
            <div
              className="pure-slide-stage"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div className="pure-image-wrapper">
                {/* 100% Pure Clean Image - No Text Overlaid on the photo */}
                <img
                  src={currentItem.image}
                  alt={currentItem.title || "Royal Varishtaa Site"}
                  className="pure-slide-img"
                  key={currentItem.id}
                  onClick={() => setLightboxIndex(currentIndex)}
                />

                {/* Subtle Classic Gold Frame */}
                <div className="pure-gold-frame"></div>

                {/* Unobtrusive Floating Zoom & Counter Badges */}
                <div className="pure-top-controls">
                  <div className="pure-counter-pill">
                    <span className="current-num">{String(currentIndex + 1).padStart(2, '0')}</span>
                    <span className="sep-slash">/</span>
                    <span className="total-num">{String(images.length).padStart(2, '0')}</span>
                  </div>

                  <button
                    type="button"
                    className="pure-fullscreen-btn hover-scale"
                    onClick={() => setLightboxIndex(currentIndex)}
                    title="Open Fullscreen Preview"
                  >
                    <Maximize2 size={16} />
                    <span>View Full Size</span>
                  </button>
                </div>

                {/* Classic Previous & Next Navigation Arrows */}
                <button
                  type="button"
                  className="pure-nav-btn prev-btn hover-scale"
                  onClick={handlePrev}
                  title="Previous image"
                  aria-label="Previous"
                >
                  <ChevronLeft size={28} />
                </button>

                <button
                  type="button"
                  className="pure-nav-btn next-btn hover-scale"
                  onClick={handleNext}
                  title="Next image"
                  aria-label="Next"
                >
                  <ChevronRight size={28} />
                </button>
              </div>

              {/* Minimal Clean Caption Below the Image (Not blocking the picture) */}
              <div className="pure-caption-bar">
                <div className="caption-text-wrap">
                  <span className="caption-label">ROYAL VARISHTAA • KURUMBAPALAYAM</span>
                  <h4 className="caption-title">{currentItem.title}</h4>
                </div>
                <div className="pure-swipe-hint">
                  <span className="swipe-hint-text">← Swipe to explore →</span>
                </div>
              </div>
            </div>

            {/* Interactive Thumbnail Carousel Strip */}
            <div className="pure-thumbnail-strip">
              <div className="pure-thumbnail-track">
                {images.map((item, idx) => (
                  <button
                    key={item.id || idx}
                    type="button"
                    className={`pure-thumb-card hover-lift ${currentIndex === idx ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                    title={item.title}
                  >
                    <img src={item.image} alt={`Thumbnail ${idx + 1}`} className="pure-thumb-img" />
                    <span className="thumb-idx">{String(idx + 1).padStart(2, '0')}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Master Plan Sanctioned Layout CTA */}

      </div>

      {/* Fullscreen Clean Lightbox Modal */}
      {lightboxIndex !== null && images[lightboxIndex] && (
        <div className="lightbox-backdrop" onClick={() => setLightboxIndex(null)}>
          <div className="lightbox-modal pure-lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setLightboxIndex(null)}
              title="Close Preview (Esc)"
            >
              <X size={24} />
            </button>

            {/* Lightbox Nav Arrows */}
            <button
              type="button"
              className="lightbox-arrow lb-prev"
              onClick={() => setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)}
              title="Previous"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              type="button"
              className="lightbox-arrow lb-next"
              onClick={() => setLightboxIndex((prev) => (prev + 1) % images.length)}
              title="Next"
            >
              <ChevronRight size={32} />
            </button>

            {/* Pure Lightbox Image */}
            <div className="pure-lightbox-image-container">
              <img
                src={images[lightboxIndex].image}
                alt={images[lightboxIndex].title}
                className="pure-lightbox-img"
              />
            </div>

            {/* Clean Lightbox Caption Footer */}
            <div className="pure-lightbox-footer">
              <div className="footer-title-wrap">
                <span className="footer-project-tag">ROYAL VARISHTAA • ANANYA HOMES</span>
                <h3 className="footer-title">{images[lightboxIndex].title}</h3>
              </div>
              <div className="footer-counter">
                {String(lightboxIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
