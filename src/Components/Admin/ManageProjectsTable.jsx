import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../API/supabase';
import './AdminTable.css';

// Fetch function to get projects from Supabase
const fetchProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const ManageProjectsTable = () => {
  const { data: projects, isLoading, isError, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  return (
    <div className="admin-section-container">
      <div className="admin-section-header">
        <h2 className="admin-section-title">Manage Projects</h2>
        <button className="add-new-btn">+ Add New Project</button>
      </div>
      <div className="admin-table-container">
        {isLoading && <div className="loading-state">Loading projects...</div>}
        {isError && <div className="error-state">Error: {error.message}</div>}
        {projects && (
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
                  <td>{project.title ?? 'N/A'}</td>
                  <td>{project.location ?? 'N/A'}</td>
                  <td>€{(project.price ?? 0).toLocaleString()}</td>
                  <td>
                    <span className={`status-${(project.status ?? 'unknown').toLowerCase()}`}>{project.status ?? 'Unknown'}</span>
                  </td>
                  <td className="actions-cell">
                    <button className="action-btn edit-btn">✏️</button>
                    <button className="action-btn delete-btn">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageProjectsTable;