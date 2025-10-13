import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../API/supabase';
import './AdminTable.css';

// Fetch function to get projects from Supabase
const fetchProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('id, title, financials')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const SalesProfitTable = () => {
  const { data: projects, isLoading, isError, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  return (
    <div className="admin-section-container">
      <div className="admin-section-header">
        <h2 className="admin-section-title">Sales and Profit Overview</h2>
      </div>
      <div className="admin-table-container">
        {isLoading && <div className="loading-state">Loading data...</div>}
        {isError && <div className="error-state">Error: {error.message}</div>}
        {projects && (
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
                  <td>{project.title ?? 'N/A'}</td>
                  <td className="bold-text">{project.financials?.targetSalesPrice ?? 'N/A'}</td>
                  <td className="bold-text">{project.financials?.totalProjectCost ?? 'N/A'}</td>
                  <td className="bold-text">{project.financials?.profit ?? 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SalesProfitTable;