import React, { useState } from 'react';
import {
  GraduationCap,
  School,
  Cross,
  Briefcase,
  Navigation,
  MapPin,
  Clock,
  Compass,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { propertyData } from '../data/propertyData';

const categoryIconMap = {
  colleges: GraduationCap,
  schools: School,
  hospitals: Cross,
  techparks: Briefcase,
  transit: Navigation
};

export const NearbyConnectivity = ({ onOpenEnquiry }) => {
  const { nearbyLocations, projectInfo } = propertyData;
  const [activeTab, setActiveTab] = useState(nearbyLocations.categories[0].id);

  const currentCategory = nearbyLocations.categories.find(cat => cat.id === activeTab) || nearbyLocations.categories[0];
  const IconActive = categoryIconMap[currentCategory.id] || MapPin;

  return (
    <section className="section nearby-section" id="location">
      <div className="container">
        <div className="section-header reveal-up">
          <div className="section-tag gold">
            <Compass size={14} className="animate-sparkle" />
            <span>{nearbyLocations.subtitle}</span>
          </div>
          <h2 className="section-title">
            Everything Within <span className="text-burgundy">Easy Reach</span>
          </h2>
          <p className="section-description">
            {nearbyLocations.description}
          </p>
        </div>

        {/* Category Navigation Tabs */}
        <div className="nearby-tabs-wrapper reveal-fade">
          <div className="nearby-tabs-list">
            {nearbyLocations.categories.map((category) => {
              const TabIcon = categoryIconMap[category.id] || MapPin;
              const isActive = activeTab === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  className={`nearby-tab-btn hover-lift ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(category.id)}
                >
                  <TabIcon size={18} className="nearby-tab-icon" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area: Grid of Landmarks + Map Preview */}
        <div className="nearby-grid-layout reveal-up">
          {/* Left Column: Landmark Cards */}
          <div className="landmarks-column">
            <div className="landmarks-header">
              <div className="category-indicator">
                <IconActive size={20} className="indicator-icon text-gold animate-sparkle" />
                <h3>{currentCategory.name} Near {projectInfo.name}</h3>
              </div>
              <span className="landmarks-count">{currentCategory.items.length} Key Destinations</span>
            </div>

            <div className="landmarks-cards-grid" key={activeTab}>
              {currentCategory.items.map((item, idx) => (
                <div key={idx} className="landmark-card hover-lift animate-fade-in" style={{ animationDelay: `${idx * 70}ms` }}>
                  <div className="landmark-info">
                    <div className="landmark-badge">{item.landmark}</div>
                    <h4 className="landmark-name">{item.name}</h4>
                  </div>

                  <div className="landmark-metrics">
                    <div className="metric-badge distance-badge hover-scale">
                      <MapPin size={13} />
                      <span>{item.distance}</span>
                    </div>
                    <div className="metric-badge time-badge hover-scale">
                      <Clock size={13} />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Location Map & Advantages Card */}

        </div>
      </div>
    </section>
  );
};
