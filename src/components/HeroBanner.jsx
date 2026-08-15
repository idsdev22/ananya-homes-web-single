import React, { useState } from 'react';
import { propertyData } from '../data/propertyData';
import { ShieldCheck, CheckCircle2, Phone, MessageSquare, Sparkles, Send } from 'lucide-react';
import heroBg from '../assets/banner.png';
import mobileHeroBg from '../assets/mobile_banner.png';
import './HeroBanner.css';

export const HeroBanner = ({ onFormSuccess, onOpenEnquiry }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consent: true
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { projectInfo } = propertyData;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (onFormSuccess) onFormSuccess(formData);
  };

  return (
    <section className="hero-custom-banner-section" id="home">
      {/* Banner Graphic Wrapper */}
      <div className="hero-banner-media-container">
        <picture className="hero-banner-picture">
          <source media="(max-width: 768px)" srcSet={mobileHeroBg} />
          <source media="(min-width: 769px)" srcSet={heroBg} />
          <img 
            src={heroBg} 
            alt={`${projectInfo?.name || 'Royal Varishtaa'} - ${projectInfo?.tagline || 'Premium DTCP Plots'}`} 
            className="hero-banner-img"
            loading="eager"
            fetchPriority="high"
          />
        </picture>

        {/* Desktop / Tablet Floating Enquiry Form Overlay */}
        <div className="hero-enquiry-overlay-wrapper">
          <div className="hero-enquiry-box font-poppins">
            <div className="enquiry-box-header">
              <div className="enquiry-badge">
                <Sparkles size={13} className="text-gold" />
                <span>DIRECT BUILDER PRIVILEGE</span>
              </div>
              <h3 className="enquiry-title">Enquire Now</h3>
              <p className="enquiry-subtitle">Get instant layout plan & best price quote</p>
            </div>

            {isSubmitted ? (
              <div className="enquiry-success-msg">
                <div className="success-icon-wrap">
                  <CheckCircle2 size={40} className="text-gold" />
                </div>
                <h4>Thank You!</h4>
                <p>Our Senior Property Advisor will connect with you on WhatsApp / Call with the layout & price sheet.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="enquiry-form">
                <div className="form-group-hero">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group-hero">
                  <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group-hero">
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit mobile number"
                    required
                  />
                </div>

                <label className="enquiry-consent">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                  />
                  <span>
                    I authorize <strong>{projectInfo?.developer || 'Ananya Homes'}</strong> & representatives to contact me via Call, SMS, or WhatsApp.
                  </span>
                </label>

                <button type="submit" className="enquiry-submit">
                  <span>GET INSTANT PRICE DETAILS</span>
                  <Send size={15} />
                </button>

                <div className="enquiry-privacy-note">
                  <ShieldCheck size={13} />
                  <span>100% Privacy Guaranteed • No Spam</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Mobile-dedicated Enquiry Card (Displayed smoothly below the mobile banner) */}
      <div className="hero-mobile-enquiry-section">
        <div className="hero-enquiry-box font-poppins mobile-card-hero">
          <div className="enquiry-box-header">
            <div className="enquiry-badge">
              <Sparkles size={13} className="text-gold" />
              <span>DIRECT BUILDER PRIVILEGE</span>
            </div>
            <h3 className="enquiry-title">Enquire Now</h3>
            <p className="enquiry-subtitle">Get instant layout plan & best price quote</p>
          </div>

          {isSubmitted ? (
            <div className="enquiry-success-msg">
              <div className="success-icon-wrap">
                <CheckCircle2 size={40} className="text-gold" />
              </div>
              <h4>Thank You!</h4>
              <p>Our Senior Property Advisor will connect with you on WhatsApp / Call with the layout & price sheet.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="enquiry-form">
              <div className="form-group-hero">
                <input
                  type="text"
                  placeholder="Your Name *"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group-hero">
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group-hero">
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit mobile number"
                  required
                />
              </div>

              <label className="enquiry-consent">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                />
                <span>
                  I authorize <strong>{projectInfo?.developer || 'Ananya Homes'}</strong> & representatives to contact me via Call, SMS, or WhatsApp.
                </span>
              </label>

              <button type="submit" className="enquiry-submit">
                <span>GET INSTANT PRICE DETAILS</span>
                <Send size={15} />
              </button>

              <div className="enquiry-privacy-note">
                <ShieldCheck size={13} />
                <span>100% Privacy Guaranteed • No Spam</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

