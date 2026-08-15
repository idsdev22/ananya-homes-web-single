import React, { useState } from 'react';
import { propertyData } from '../data/propertyData';
import { ShieldCheck, CheckCircle2, Phone, Sparkles, Send, Hospital, GraduationCap, Briefcase, Plane } from 'lucide-react';
import heroBg from '../assets/banner.png';
import './HeroBanner.css';

const transitIcons = {
  Hospital: Hospital,
  GraduationCap: GraduationCap,
  Briefcase: Briefcase,
  Plane: Plane
};

export const HeroBanner = ({ onFormSuccess, onOpenEnquiry }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consent: true
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { projectInfo, heroBanner } = propertyData;

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
    <section className="hero-custom-banner" style={{ backgroundImage: `url(${heroBg})` }}>
      {/* Mobile image to guarantee full aspect-ratio view on mobile */}
      <div className="hero-mobile-img-wrap d-flex-mobile">
        <img src={heroBg} alt="Property Banner" className="hero-mobile-img" />
      </div>

      {/* Floating Instant Enquiry Box */}
      <div className="hero-enquiry-box">
        <div className="enquiry-box-header">
          <h3 className="enquiry-title">Enquire Now</h3>
        </div>

        {isSubmitted ? (
          <div className="enquiry-success-msg">
            <CheckCircle2 size={36} className="text-gold" />
            <h4>Thank You!</h4>
            <p>Our Senior Property Advisor will connect with you on WhatsApp / Call with the layout & price sheet.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="enquiry-form">
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit mobile number"
              required
            />
            <label className="enquiry-consent">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
              />
              <span>I authorize <strong>Adissia Developers</strong> and its representatives to call, SMS, email, or WhatsApp me about its products and offers. This consent overrides any registration for DNC/NDNC.</span>
            </label>
            <button type="submit" className="enquiry-submit">
              <span>SUBMIT</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
