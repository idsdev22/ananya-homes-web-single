import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Shield, Send, ArrowRight, FileDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { propertyData } from '../data/propertyData';

export const EnquiryModal = ({ isOpen, onClose, initialData = {} }) => {
  const { projectInfo } = propertyData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plotInterest: initialData?.title || 'General Enquiry',
    message: '',
    consent: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (initialData?.title) {
      setFormData(prev => ({
        ...prev,
        plotInterest: initialData.title
      }));
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch (err) {
        // Confetti fallback
      }
    }, 800);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-content-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className="modal-close-btn"
          onClick={handleClose}
          title="Close Modal"
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="modal-success-view">
            <CheckCircle2 size={56} className="modal-success-icon text-gold" />
            <h3 className="modal-success-title">Enquiry Received!</h3>
            <p className="modal-success-text">
              Thank you, <strong>{formData.name}</strong>. Our senior property advisor will reach out to you at <strong>{formData.phone}</strong> with the requested details, layout plan, and pre-launch benefits.
            </p>
            <button 
              type="button" 
              className="btn-primary w-100 mt-4"
              onClick={handleClose}
            >
              Done
            </button>
          </div>
        ) : (
          <div className="modal-form-view">
            <div className="modal-header">
              <span className="modal-badge">{projectInfo.name} • VIP Registration</span>
              <h3 className="modal-title">
                {initialData?.mode === 'brochure' ? 'Download Project Brochure' : 'Register Your Interest'}
              </h3>
              <p className="modal-subtitle">
                {initialData?.mode === 'brochure' 
                  ? 'Enter your details below to instantly download the master plan & pricing PDF.' 
                  : 'Get customized pricing, plot availability chart, and schedule a priority site visit.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Your Full Name *" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="form-group">
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="Email Address" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <div className="phone-input-wrap">
                  <span className="phone-prefix">+91</span>
                  <input 
                    type="tel" 
                    className="form-input phone-field" 
                    placeholder="Phone Number *" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    title="Please enter 10 digit mobile number"
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <select 
                  className="form-input" 
                  name="plotInterest"
                  value={formData.plotInterest}
                  onChange={handleChange}
                >
                  <option value="General Enquiry">Interested In: General Enquiry</option>
                  <option value="1.50 Cents Compact Plot">1.50 Cents Compact Plot</option>
                  <option value="3.00 Cents Classic Plot">3.00 Cents Classic Villa Plot</option>
                  <option value="4.50 Cents Premium Plot">4.50 Cents Premium Villa Plot</option>
                  <option value="6.00 Cents Signature Estate">6.00 Cents Signature Estate Plot</option>
                  <option value="Custom Luxury Villa Construction">Turnkey Luxury Villa Construction</option>
                </select>
              </div>

              <div className="form-group consent-group">
                <label className="consent-label">
                  <input 
                    type="checkbox" 
                    name="consent" 
                    checked={formData.consent} 
                    onChange={handleChange} 
                    required 
                  />
                  <span className="consent-text">
                    I authorize <strong>{projectInfo.developer}</strong> to contact me via Call/WhatsApp with project updates.
                  </span>
                </label>
              </div>

              <button 
                type="submit" 
                className="submit-btn w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    {initialData?.mode === 'brochure' ? (
                      <>
                        <span>Get Instant Brochure (PDF)</span>
                        <FileDown size={16} />
                      </>
                    ) : (
                      <>
                        <span>Request Callback & Price Sheet</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </>
                )}
              </button>

              <div className="form-security-footer">
                <Shield size={12} />
                <span>DTCP Approved • Strict Privacy Protected</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
