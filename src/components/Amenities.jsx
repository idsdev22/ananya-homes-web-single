import React, { useState } from 'react';
import {
  Building2,
  Waves,
  Dumbbell,
  Trees,
  Trophy,
  Smile,
  Zap,
  Milestone,
  ShieldCheck,
  ShieldAlert,
  Droplets,
  Heart,
  BatteryCharging,
  Sparkles,
  Award,
  Footprints,
  Camera,
  Sun,
  Flower2,
  Radio,
  Layers,
  Activity
} from 'lucide-react';
import { propertyData } from '../data/propertyData';

const iconMap = {
  Building2: Building2,
  Waves: Waves,
  Dumbbell: Dumbbell,
  Trees: Trees,
  Trophy: Trophy,
  Smile: Smile,
  Zap: Zap,
  Milestone: Milestone,
  ShieldCheck: ShieldCheck,
  ShieldAlert: ShieldAlert,
  Droplets: Droplets,
  Heart: Heart,
  BatteryCharging: BatteryCharging,
  Footprints: Footprints,
  Camera: Camera,
  Sun: Sun,
  Flower2: Flower2,
  Radio: Radio,
  Layers: Layers,
  Activity: Activity
};

export const Amenities = () => {
  const { amenities, amenityCategories } = propertyData;
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredAmenities = activeCategory === 'all'
    ? amenities
    : amenities.filter(item => item.category === activeCategory);

  return (
    <section className="section amenities-section" id="amenities">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>World-Class Lifestyle</span>
          </div>
          <h2 className="section-title">
            Signature <span className="text-gold">Community</span> Amenities
          </h2>
          <p className="section-description">
            Experience curated lifestyle conveniences, sports facilities, and underground infrastructure designed for aristocratic comfort.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="amenity-tabs-wrapper">
          <div className="amenity-tabs-scroll">
            {amenityCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`amenity-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Amenities Icons & Text Title Only Grid */}
        <div className="amenities-icon-grid">
          {filteredAmenities.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Sparkles;
            return (
              <div key={item.id || idx} className="amenity-icon-card">
                <div className="amenity-icon-box">
                  <IconComponent size={24} className="amenity-svg-icon" />
                </div>
                <h4 className="amenity-card-text-title">{item.title}</h4>
              </div>
            );
          })}
        </div>

        {/* Bottom Highlights Bar */}
        {/* <div className="amenities-highlight-banner">
          <div className="amenity-highlight-item">
            <Award size={22} className="text-gold" />
            <div>
              <strong>100% Underground Infrastructure</strong>
              <span>Zero overhead wires & uninterrupted clean views</span>
            </div>
          </div>
          <div className="amenity-highlight-item">
            <Trees size={22} className="text-gold" />
            <div>
              <strong>40% Green Open Spaces</strong>
              <span>Victorian lamp avenues & botanical walking trails</span>
            </div>
          </div>
          <div className="amenity-highlight-item">
            <ShieldCheck size={22} className="text-gold" />
            <div>
              <strong>24/7 Gated Security</strong>
              <span>Compound perimeter with CCTV & RFID access</span>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};
