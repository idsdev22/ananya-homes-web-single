import React, { useState } from 'react';

import { HeroBanner } from './components/HeroBanner';
import { OfferBanner } from './components/OfferBanner';
import { StatsCounter } from './components/StatsCounter';
import { ProjectOverview } from './components/ProjectOverview';
import { Configurations } from './components/Configurations';
import { Amenities } from './components/Amenities';
import { MasterPlanGallery } from './components/MasterPlanGallery';
import { InfrastructureSection } from './components/InfrastructureSection';
import { NearbyConnectivity } from './components/NearbyConnectivity';
import { FaqSection } from './components/FaqSection';
import { StickyActions } from './components/StickyActions';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { EnquiryModal } from './components/EnquiryModal';
import { propertyData } from './data/propertyData';
import { ShieldCheck, Phone, Mail, MapPin, Download } from 'lucide-react';
import './App.css';

function App() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    initialData: {}
  });

  const handleOpenEnquiry = (initialData = {}) => {
    setModalState({
      isOpen: true,
      initialData
    });
  };

  const handleOpenBrochure = () => {
    setModalState({
      isOpen: true,
      initialData: { mode: 'brochure', title: 'Project Brochure & Sanctioned Plan' }
    });
  };

  const handleCloseModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const handleSelectPlot = (plot) => {
    setModalState({
      isOpen: true,
      initialData: { title: `${plot.cent ? plot.cent + ' - ' : ''}${plot.type || 'Villa Plot'}` }
    });
  };

  const { projectInfo } = propertyData;

  return (
    <div className="app-container">

      <main>
        <HeroBanner 
          onFormSuccess={() => { }} 
          onOpenEnquiry={() => handleOpenEnquiry({ title: 'Hero Banner Enquiry' })} 
        />
        {/* <OfferBanner onOpenEnquiry={() => handleOpenEnquiry({ title: 'Pre-Launch Offer Privilege' })} /> */}
        <StatsCounter />
        <ProjectOverview
          onOpenBrochure={handleOpenBrochure}
          onOpenEnquiry={() => handleOpenEnquiry({ title: 'Site Visit Scheduling' })}
        />
        {/* <Configurations onSelectPlot={handleSelectPlot} /> */}
        <Amenities />
        <MasterPlanGallery onOpenBrochure={handleOpenBrochure} />
        <InfrastructureSection />
        <NearbyConnectivity onOpenEnquiry={() => handleOpenEnquiry({ title: 'Location Advantage' })} />
        {/* <FaqSection /> */}
      </main>

      {/* Simple Footer */}
      <footer className="simple-footer">
        <div className="container simple-footer-container">
          <div className="footer-copyright">© Adissia Developers Pvt Ltd. All rights reserved.</div>
          <div className="footer-links">
            <a href="#terms">Terms & Conditions</a>
            <a href="#privacy">Privacy Policy</a>
          </div>
        </div>
      </footer>

      <StickyActions onOpenEnquiry={() => handleOpenEnquiry({ title: 'Sticky Action Enquiry' })} />
      <FloatingWhatsApp />

      <EnquiryModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        initialData={modalState.initialData}
      />
    </div>
  );
}

export default App;
