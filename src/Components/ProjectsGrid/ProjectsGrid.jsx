import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import './ProjectsGrid.css';

const projects = [
  {
    location: 'Neos Kosmos, Athens',
    title: 'One Bedroom Apartment in Neos Kosmos',
    price: '€250,000',
    pricePerSqm: '€6,250/m²',
    area: '40m²',
    imageUrl: 'https://via.placeholder.com/400x250',
    status: 'Available',
    goldenVisa: true,
  },
  {
    location: 'Kallithea, Athens',
    title: 'Two Bedroom Apartment in Kallithea',
    price: '€175,000',
    pricePerSqm: '€2,917/m²',
    area: '60m²',
    imageUrl: 'https://via.placeholder.com/400x250',
    status: 'Available',
    goldenVisa: false,
  },
  {
    location: 'Kallithea, Athens',
    title: 'Three Bedroom Apartment in Kallithea',
    price: '€230,000',
    pricePerSqm: '€3,067/m²',
    area: '75m²',
    imageUrl: 'https://via.placeholder.com/400x250',
    status: 'Reserved',
    goldenVisa: true,
  },
  {
    location: 'Moschato, Athens',
    title: 'Three Bedroom Maisonette in Moschato',
    price: '€250,000',
    pricePerSqm: '€2,273/m²',
    area: '110m²',
    imageUrl: 'https://via.placeholder.com/400x250',
    status: 'Available',
    goldenVisa: true,
  },
  {
    location: 'Nikis, Athens',
    title: 'Two Bedroom Apartment in Nikis',
    price: '€250,000',
    pricePerSqm: '€4,237/m²',
    area: '59m²',
    imageUrl: 'https://via.placeholder.com/400x250',
    status: 'Sold',
    goldenVisa: true,
  },
  {
    location: 'Afentouli, Athens',
    title: 'Three-Apartment Building in Afentouli',
    price: '€800,000',
    pricePerSqm: '€3,636/m²',
    area: '220m²',
    imageUrl: 'https://via.placeholder.com/400x250',
    status: 'Available',
    goldenVisa: true,
  },
  {
    location: 'Dafni, Athens',
    title: 'Ten-Apartment Building in Dafni',
    price: '€2,500,000',
    pricePerSqm: '€35,714/m²',
    area: '70m²',
    imageUrl: 'https://via.placeholder.com/400x250',
    status: 'Available',
    goldenVisa: true,
  },
  {
    location: 'Ano Patissia, Athens',
    title: 'Seven-Apartment Building in Ano Patissia',
    price: '€1,750,000',
    pricePerSqm: '€3,182/m²',
    area: '550m²',
    imageUrl: 'https://via.placeholder.com/400x250',
    status: 'Available',
    goldenVisa: true,
  },
  {
    location: 'Amerikis, Athens',
    title: 'Six-Apartment Building in Amerikis',
    price: '€1,200,000',
    pricePerSqm: '€3,871/m²',
    area: '310m²',
    imageUrl: 'https://via.placeholder.com/400x250',
    status: 'Available',
    goldenVisa: true,
  },
];

const ProjectsGrid = () => {
  return (
    <div className="projects-grid-container">
        <div className="projects-grid">
        {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
        ))}
        </div>
    </div>
  );
};

export default ProjectsGrid;