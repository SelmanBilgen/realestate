import React from 'react';
import { projects } from '../ProjectsGrid/ProjectsGrid';
import './AdminTable.css';

const PurchaseCostTable = () => {
  return (
    <div className="admin-section-container">
      <div className="admin-section-header">
        <h2 className="admin-section-title">Purchase and Cost Overview</h2>
      </div>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Acquisition Price</th>
              <th>Renovation Cost</th>
              <th>Other Costs</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <td>{project.title}</td>
                <td>{project.financials.purchasePrice}</td>
                <td>{project.financials.renovationEstimate}</td>
                <td>{project.financials.transferFees}</td>
                <td>{project.financials.totalProjectCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseCostTable;