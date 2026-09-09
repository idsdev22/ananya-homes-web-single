import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Shield, Send, ArrowRight, FileDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { propertyData } from '../data/propertyData';
import { submitLead } from '../services/leadService';

export const EnquiryModal = ({ isOpen, onClose, initialData = {} }) => {
  const { projectInfo } = propertyData;
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);



  if (!isOpen) return null;

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

    const sourceContext = initialData?.mode === 'brochure'
      ? `Brochure Request (${initialData?.title || 'Main Plan'})`
      : (initialData?.title || 'Modal Enquiry');

    try {
      await submitLead({
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        source: sourceContext
      });
    } catch (err) {
      console.error('Lead submission error:', err);
    } finally {
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
    }
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
                {initialData?.mode === 'brochure' ? 'Download Project Brochure' : 'Enquire Now'}
              </h3>
              <p className="modal-subtitle">
                {initialData?.mode === 'brochure'
                  ? 'Enter your details below to instantly download the master plan & pricing PDF.'
                  : 'Have an enquiry? Share your details with us, and our team will get in touch with you shortly.'}
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
                <div className="phone-input-wrap">
                  <span className="phone-prefix">+91</span>
                  <input
                    type="tel"
                    className="form-input phone-field"
                    placeholder="Phone Number *"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    inputMode="numeric"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    title="Please enter 10 digit mobile number"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="City *"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
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
                        <span>Enquiry Now</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </>
                )}
              </button>


            </form>
          </div>
        )}
      </div>
    </div>
  );
};
