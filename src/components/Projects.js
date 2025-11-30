import React from 'react';
import ProjectCard from './ProjectCard';
const projectsData = require('../data/projects.json');

const Projects = () => {
  // Sort: contributed repos first, then by stars (descending)
  const sortedProjects = [...projectsData].sort((a, b) => {
    if (a.isContributed && !b.isContributed) return -1;
    if (!a.isContributed && b.isContributed) return 1;
    return (b.stars || 0) - (a.stars || 0);
  });

  return (
    <div className="max-w-[96rem] mx-auto font-mono">
      {/* Terminal header */}
      <div className="mb-6 border border-gray-700 rounded-lg overflow-hidden">
        <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 border-b border-gray-700">
          <div className="flex gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs text-gray-400 flex-1 text-center">~/projects</span>
        </div>
        <div className="bg-black p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-400">➜</span>
            <span className="text-blue-400">~</span>
            <span className="text-gray-300">$</span>
            <span className="text-white ml-2">ls -la projects/</span>
          </div>
          <p className="text-gray-400 ml-4 text-sm">
            A collection of tools, plugins, and utilities I've created or contributed to.
          </p>
        </div>
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
