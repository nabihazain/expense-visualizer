import React from 'react';

const Filter = ({ selectedCategory, onCategoryChange }) => {
  const categories = ['All', 'Food', 'Travel', 'Billing', 'Others'];

  return (
    <div className="filter-container">
      <label htmlFor="category-filter">Filter by Category: </label>
      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat.toLowerCase()}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
