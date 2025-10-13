import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../API/supabase';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import ProjectDetailHeader from '../Components/ProjectDetail/ProjectDetailHeader';
import ProjectImageGallery from '../Components/ProjectDetail/ProjectImageGallery';
import ProjectSidebar from '../Components/ProjectDetail/ProjectSidebar';
import ProjectInfo from '../Components/ProjectDetail/ProjectInfo';
import './ProjectDetailPage.css';

// Fetch function to get a single project by ID
const fetchProjectById = async (id) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single(); // Use .single() to get a single record

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const ProjectDetailPage = () => {
  const { id } = useParams();
  const { data: project, isLoading, isError, error } = useQuery({
    queryKey: ['project', id],
    queryFn: () => fetchProjectById(id),
  });

  if (isLoading) {
    return (
      <div className="project-detail-page">
        <Header />
        <div className="loading-state">Loading project details...</div>
        <Footer />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="project-detail-page">
        <Header />
        <div className="error-state">Error fetching project: {error.message}</div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="project-detail-page">
      <Header />
      <ProjectDetailHeader project={project} />
      <div className="detail-page-main-content">
        <div className="main-column">
          <ProjectImageGallery images={project.images} />
          <ProjectInfo project={project} />
        </div>
        <div className="sidebar-column">
          <ProjectSidebar project={project} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;