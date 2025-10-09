import React from 'react';
import './ProjectInfo.css';

const ProjectInfo = ({ project }) => {
  const { about, features, financials } = project;

  return (
    <div className="project-info-container">
      {/* About Section */}
      <div className="info-section">
        <h2 className="section-heading">About This Project</h2>
        <p>{about}</p>
      </div>

      {/* Features Section */}
      <div className="info-section">
        <h2 className="section-heading">Property Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">✔ {feature}</div>
          ))}
        </div>
      </div>

      {/* Cost Breakdown Section */}
      <div className="info-section cost-breakdown-section">
        <h2 className="section-heading">Purchase/Cost Breakdown</h2>
        <div className="cost-item">
          <span>Purchase Price:</span>
          <span>{financials.purchasePrice}</span>
        </div>
        <div className="cost-item">
          <span>Transfer Fees:</span>
          <span>{financials.transferFees}</span>
        </div>
        <div className="cost-item total">
          <span>Total Purchase Cost:</span>
          <span>{financials.totalPurchaseCost}</span>
        </div>
        <div className="cost-item">
          <span>Renovation Estimate:</span>
          <span>{financials.renovationEstimate}</span>
        </div>
        <div className="cost-item total">
          <span>Total Project Cost:</span>
          <span>{financials.totalProjectCost}</span>
        </div>
      </div>

      {/* Sales/Profit Section */}
      <div className="info-section sales-profit-section">
        <h2 className="section-heading">Sales/Profit</h2>
        <div className="profit-item">
          <span>Target Sales Price:</span>
          <span>{financials.targetSalesPrice}</span>
        </div>
        <div className="profit-item">
          <span>Profit:</span>
          <span>{financials.profit}</span>
        </div>
        <div className="profit-item">
          <span>Tax Rate:</span>
          <span>{financials.taxRate}</span>
        </div>
        <div className="profit-item total">
          <span>Profit After Tax:</span>
          <span>{financials.profitAfterTax}</span>
        </div>
        <div className="profit-distribution">
          <p>Capital Owner Share (75%) → {financials.capitalOwnerShare}</p>
          <p>Management Share (25%) → {financials.managementShare}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;