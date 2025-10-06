import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
const projectsData = require('../data/projects.json');

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Extract unique categories
  const categories = [...new Set(projectsData.map(project => project.category))];

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'all'
    ? projectsData
    : projectsData.filter(project => project.category === selectedCategory);

  // Sort: contributed repos first, then by stars (descending)
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    // Prioritize contributed projects
    if (a.isContributed && !b.isContributed) return -1;
    if (!a.isContributed && b.isContributed) return 1;
    // Then sort by stars
    return (b.stars || 0) - (a.stars || 0);
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Open Source Projects
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          A collection of tools, plugins, and utilities I've created or contributed to.
          From Neovim plugins to CLI tools, Kubernetes utilities to AI frameworks.
        </p>
      </div>

      {/* Category filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          All Projects
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg transition-colors capitalize ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
