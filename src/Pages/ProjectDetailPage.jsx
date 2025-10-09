import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import ProjectDetailHeader from '../Components/ProjectDetail/ProjectDetailHeader';
import ProjectImageGallery from '../Components/ProjectDetail/ProjectImageGallery';
import ProjectSidebar from '../Components/ProjectDetail/ProjectSidebar';
import ProjectInfo from '../Components/ProjectDetail/ProjectInfo';
import { projects } from '../Components/ProjectsGrid/ProjectsGrid';
import './ProjectDetailPage.css';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id));

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