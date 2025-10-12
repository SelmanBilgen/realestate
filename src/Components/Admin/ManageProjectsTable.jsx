import React from 'react';
import { projects } from '../ProjectsGrid/ProjectsGrid';
import './AdminTable.css';

const ManageProjectsTable = () => {
  return (
    <div className="admin-section-container">
      <div className="admin-section-header">
        <h2 className="admin-section-title">Manage Projects</h2>
        <button className="add-new-btn">+ Add New Project</button>
      </div>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Periphery</th>
              <th>Selling Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <td>{project.title}</td>
                <td>{project.location}</td>
                <td>{project.price}</td>
                <td>
                  <span className={`status-${project.status.toLowerCase()}`}>{project.status}</span>
                </td>
                <td className="actions-cell">
                  <button className="action-btn edit-btn">✏️</button>
                  <button className="action-btn delete-btn">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProjectsTable;