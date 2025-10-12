import React from 'react';
import { projects } from '../ProjectsGrid/ProjectsGrid';
import './AdminTable.css';

const SalesProfitTable = () => {
  return (
    <div className="admin-section-container">
      <div className="admin-section-header">
        <h2 className="admin-section-title">Sales and Profit Overview</h2>
      </div>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Target Selling Price</th>
              <th>Total Cost</th>
              <th>Estimated Profit</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <td>{project.title}</td>
                <td className="bold-text">{project.financials.targetSalesPrice}</td>
                <td className="bold-text">{project.financials.totalProjectCost}</td>
                <td className="bold-text">{project.financials.profit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesProfitTable;