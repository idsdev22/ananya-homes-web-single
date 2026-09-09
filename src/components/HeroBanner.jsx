import React, { useState } from 'react';
import { propertyData } from '../data/propertyData';
import { ShieldCheck, CheckCircle2, Phone, MessageSquare, Sparkles, Send } from 'lucide-react';
import heroBg from '../assets/banner.png';
import mobileHeroBg from '../assets/mobile_banner.png';
import { submitLead } from '../services/leadService';
import './HeroBanner.css';

export const HeroBanner = ({ onFormSuccess, onOpenEnquiry }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { projectInfo } = propertyData;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'phone') {
      const numericVal = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({
        ...prev,
        phone: numericVal
      }));
      return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill in your name and phone number.');
      return;
    }
    if (formData.phone.length !== 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitLead({
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        source: 'Hero Banner Form'
      });
    } catch (err) {
      console.error('Lead submission error:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onFormSuccess) onFormSuccess(formData);
    }
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
              <p className="enquiry-subtitle">Have an enquiry? Share your details with us, and our team will get in touch with you shortly.</p>
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
                  <div className="hero-phone-input-wrap">
                    <span className="hero-phone-prefix">+91</span>
                    <input
                      type="tel"
                      className="hero-phone-field"
                      placeholder="Phone Number *"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      inputMode="numeric"
                      maxLength={10}
                      pattern="[0-9]{10}"
                      title="Please enter a valid 10-digit mobile number"
                      required
                    />
                  </div>
                </div>

                <div className="form-group-hero">
                  <input
                    type="text"
                    placeholder="City *"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="enquiry-submit" disabled={isSubmitting}>
                  <span>{isSubmitting ? 'SENDING...' : 'SENT ENQUIRY'}</span>
                  <Send size={15} />
                </button>

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
            <p className="enquiry-subtitle">Have an enquiry? Share your details with us, and our team will get in touch with you shortly.</p>
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
                <div className="hero-phone-input-wrap">
                  <span className="hero-phone-prefix">+91</span>
                  <input
                    type="tel"
                    className="hero-phone-field"
                    placeholder="Phone Number *"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    inputMode="numeric"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit mobile number"
                    required
                  />
                </div>
              </div>

              <div className="form-group-hero">
                <input
                  type="text"
                  placeholder="City *"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="enquiry-submit" disabled={isSubmitting}>
                <span>{isSubmitting ? 'SENDING...' : 'SENT ENQUIRY'}</span>
                <Send size={15} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

