import React from 'react';
import './FilterBar.css';

const FilterBar = () => {
  return (
    <div className="filter-bar">
      <label className="filter-label">Filter Projects</label>
      <div className="filters">
        <select className="filter-dropdown">
          <option>All Areas</option>
        </select>
        <select className="filter-dropdown">
          <option>All Target Costs</option>
        </select>
        <select className="filter-dropdown">
          <option>All Selling Prices</option>
        </select>
        <select className="filter-dropdown">
          <option>All Properties</option>
        </select>
        <select className="filter-dropdown">
          <option>All Status</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;