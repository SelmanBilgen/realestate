import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import './ProjectsGrid.css';

export const projects = [
  {
    id: 1,
    location: 'Neos Kosmos, Athens',
    title: 'One Bedroom Apartment in Neos Kosmos',
    price: '€250,000',
    pricePerSqm: '€6,250/m²',
    area: '40m²',
    imageUrl: 'https://via.placeholder.com/400x250/1E88E5/fff?text=Neos+Kosmos',
    status: 'Available',
    goldenVisa: true,
    bedrooms: 1,
    bathrooms: 1,
    completion: 2026,
    about: 'Compact but stylish studio in central Athens close to many touristic attractions.',
    features: ['Compact Design', 'Central Location', 'Cultural Area', 'Investment Opportunity'],
    financials: {
      targetSellingPrice: '€220,000',
      pricePerSqmDetail: '€5,500',
      targetCost: '€125,000',
      roi: '76%',
      purchasePrice: '€95,000',
      transferFees: '€9,000',
      totalPurchaseCost: '€104,000',
      renovationEstimate: '€25,000',
      totalProjectCost: '€129,000',
      targetSalesPrice: '€220,000',
      profit: '€91,000',
      taxRate: '23%',
      profitAfterTax: '€70,070',
      capitalOwnerShare: '€52,552.5',
      managementShare: '€17,517.5',
    },
    images: {
      before: ['https://via.placeholder.com/800x500/ccc/fff?text=Before+1'],
      renders: ['https://via.placeholder.com/800x500/1E88E5/fff?text=Living+Room', 'https://via.placeholder.com/800x500/1E88E5/fff?text=Bedroom'],
      after: ['https://via.placeholder.com/800x500/28a745/fff?text=After+1'],
    },
  },
  {
    id: 2,
    location: 'Kallithea, Athens',
    title: 'Two Bedroom Apartment in Kallithea',
    price: '€175,000',
    pricePerSqm: '€2,917/m²',
    area: '60m²',
    imageUrl: 'https://via.placeholder.com/400x250/28a745/fff?text=Kallithea',
    status: 'Available',
    goldenVisa: false,
    bedrooms: 2,
    bathrooms: 1,
    completion: 2025,
    about: 'Spacious two-bedroom apartment perfect for families, located in a quiet neighborhood.',
    features: ['Family Friendly', 'Quiet Area', 'Good Transport Links'],
    financials: {
        targetSellingPrice: '€210,000',
        pricePerSqmDetail: '€3,500',
        targetCost: '€140,000',
        roi: '50%',
        purchasePrice: '€110,000',
        transferFees: '€10,000',
        totalPurchaseCost: '€120,000',
        renovationEstimate: '€20,000',
        totalProjectCost: '€140,000',
        targetSalesPrice: '€210,000',
        profit: '€70,000',
        taxRate: '23%',
        profitAfterTax: '€53,900',
        capitalOwnerShare: '€40,425',
        managementShare: '€13,475',
    },
    images: {
      before: ['https://via.placeholder.com/800x500/ccc/fff?text=Before+Kallithea'],
      renders: ['https://via.placeholder.com/800x500/28a745/fff?text=Living+Room+Kallithea'],
      after: ['https://via.placeholder.com/800x500/ff9800/fff?text=After+Kallithea'],
    },
  },
  // Add simplified data for other projects
];

const ProjectsGrid = () => {
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