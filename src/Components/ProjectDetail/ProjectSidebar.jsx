import React from 'react';
import './ProjectSidebar.css';

const ProjectSidebar = ({ project }) => {
  const { financials } = project;

  return (
    <aside className="project-sidebar">
      <div className="sidebar-card">
        <h3 className="price-heading">Target Selling Price</h3>
        <p className="selling-price">{financials.targetSellingPrice}</p>
        {project.goldenVisa && (
          <p className="golden-visa-confirm">
            <span className="checkmark">✔</span> Golden Visa Eligible
          </p>
        )}
        <div className="price-details">
          <p>Price per m²: {financials.pricePerSqmDetail}</p>
          <p>Target Cost: {financials.targetCost}</p>
          <p>ROI: {financials.roi}</p>
        </div>
        <div className="sidebar-buttons">
          <button className="btn-primary">Schedule Viewing</button>
          <button className="btn-secondary">Download Brochure</button>
        </div>
      </div>
      <div className="sidebar-card contact-agent-card">
        <h3 className="contact-heading">Contact Agent</h3>
        <form>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="tel" placeholder="Phone Number" />
          <textarea placeholder={`I'm interested in the property: ${project.title}`}></textarea>
          <button type="submit" className="btn-primary">Send Inquiry</button>
        </form>
        <div className="agent-contact-info">
          <p>Call Us: <a href="tel:+306972250118">+30 697 225 0118</a></p>
          <p>Email Us: <a href="mailto:rigelhospitalitygr@gmail.com">rigelhospitalitygr@gmail.com</a></p>
        </div>
      </div>
    </aside>
  );
};

export default ProjectSidebar;