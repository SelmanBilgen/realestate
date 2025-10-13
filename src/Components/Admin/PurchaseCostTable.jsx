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

const PurchaseCostTable = () => {
  const { data: projects, isLoading, isError, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  return (
    <div className="admin-section-container">
      <div className="admin-section-header">
        <h2 className="admin-section-title">Purchase and Cost Overview</h2>
      </div>
      <div className="admin-table-container">
        {isLoading && <div className="loading-state">Loading data...</div>}
        {isError && <div className="error-state">Error: {error.message}</div>}
        {projects && (
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
                  <td>{project.title ?? 'N/A'}</td>
                  <td>{project.financials?.purchasePrice ?? 'N/A'}</td>
                  <td>{project.financials?.renovationEstimate ?? 'N/A'}</td>
                  <td>{project.financials?.transferFees ?? 'N/A'}</td>
                  <td>{project.financials?.totalProjectCost ?? 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PurchaseCostTable;