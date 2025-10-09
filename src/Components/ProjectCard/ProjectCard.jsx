import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  const { id, location, title, price, pricePerSqm, area, imageUrl, status, goldenVisa } = project;

  return (
    <Link to={`/projects/${id}`} className="project-card-link">
      <div className="project-card">
        <div className="card-top">
          <img src={imageUrl} alt={title} className="project-image" />
          <div className="status-badges">
            {status === 'Available' && <span className="badge available">Available</span>}
            {status === 'Sold' && <span className="badge sold">Sold</span>}
            {status === 'Reserved' && <span className="badge reserved">Reserved</span>}
            {goldenVisa && <span className="badge golden-visa">Golden Visa</span>}
          </div>
        </div>
        <div className="card-bottom">
          <p className="location">📍 {location}</p>
          <h3 className="property-title">{title}</h3>
          <div className="price-size-row">
            <span className="price">{price}</span>
            <span className="price-per-sqm">{pricePerSqm}</span>
          </div>
          <p className="area-info">{area}</p>
          <button className="view-details-btn">View Details →</button>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;