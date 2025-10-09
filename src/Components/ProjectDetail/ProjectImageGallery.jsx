import React, { useState } from 'react';
import './ProjectImageGallery.css';

const ProjectImageGallery = ({ images }) => {
  const [activeTab, setActiveTab] = useState('renders');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images) {
    return <div>No images available.</div>;
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentImageIndex(0);
  };

  const currentImages = images[activeTab] || [];

  return (
    <div className="image-gallery-section">
      <div className="gallery-tabs">
        {Object.keys(images).map(tabName => (
          <button
            key={tabName}
            className={`tab-btn ${activeTab === tabName ? 'active' : ''}`}
            onClick={() => handleTabClick(tabName)}
          >
            {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
          </button>
        ))}
      </div>
      <div className="image-viewer">
        {currentImages.length > 0 ? (
          <img src={currentImages[currentImageIndex]} alt={`${activeTab} view`} />
        ) : (
          <p>No images for this view.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectImageGallery;