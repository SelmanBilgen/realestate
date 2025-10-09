import React from 'react';
import Header from '../Components/Header/Header';
import Hero from '../Components/Hero/Hero';
import FilterBar from '../Components/FilterBar/FilterBar';
import ProjectsGrid from '../Components/ProjectsGrid/ProjectsGrid';
import CTA from '../Components/CTA/CTA';
import Footer from '../Components/Footer/Footer';

const HomePage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <FilterBar />
      <ProjectsGrid />
      <CTA />
      <Footer />
    </div>
  );
};

export default HomePage;