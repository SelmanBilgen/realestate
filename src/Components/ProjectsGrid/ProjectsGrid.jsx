import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../API/supabase';
import ProjectCard from '../ProjectCard/ProjectCard';
import './ProjectsGrid.css';

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

const ProjectsGrid = () => {
  const { data: projects, isLoading, isError, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  if (isLoading) {
    return <div className="loading-state">Loading projects...</div>;
  }

  if (isError) {
    return <div className="error-state">Error fetching projects: {error.message}</div>;
  }

  return (
    <div className="projects-grid-container">
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsGrid;