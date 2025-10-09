import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectDetailHeader.css';

const ProjectDetailHeader = ({ project }) => {
  return (
    <div className="project-detail-header">
      <div className="breadcrumb">
        <Link to="/">&larr; Back to Projects</Link>
      </div>
      <div className="status-badges">
        {project.status && <span className={`badge ${project.status.toLowerCase()}`}>{project.status}</span>}
        {project.goldenVisa && <span className="badge golden-visa">🏅 Golden Visa Eligible</span>}
      </div>
      <h1 className="project-title">{project.title}</h1>
      <p className="project-location">📍 {project.location}</p>
      <div className="property-summary">
        <div className="summary-item">
          <p>Size: {project.area}</p>
        </div>
        <div className="summary-item">
          <p>Bedrooms: {project.bedrooms}</p>
        </div>
        <div className="summary-item">
          <p>Bathrooms: {project.bathrooms}</p>
        </div>
        <div className="summary-item">
          <p>Completion: {project.completion}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailHeader;