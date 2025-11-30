import React from 'react';
import ProjectCard from './ProjectCard';
const projectsData = require('../data/projects.json');

const Projects = () => {
  // Separate pinned, contributed, and other projects
  const pinnedProjects = projectsData.filter(p => p.pinned);
  const contributedProjects = projectsData.filter(p => p.isContributed && !p.pinned);
  const otherProjects = projectsData
    .filter(p => !p.pinned && !p.isContributed)
    .sort((a, b) => (b.stars || 0) - (a.stars || 0));

  return (
    <div className="max-w-[96rem] mx-auto font-mono">
      {/* Terminal header */}
      <div className="mb-6 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 border-b border-gray-700">
          <div className="flex gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs text-gray-400 flex-1 text-center">~/projects</span>
        </div>
        <div className="bg-gray-100 dark:bg-black p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-400">$</span>
            <span className="text-gray-700 dark:text-white ml-2">cat PROJECTS.md</span>
          </div>
          <div className="ml-4 text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p>
              A collection of tools, plugins, and utilities I've created or contributed to.
            </p>
            <p className="flex items-center gap-4">
              <a
                href="https://github.com/Piotr1215"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500 hover:text-purple-400"
              >
                ./follow.sh
              </a>
              <span className="text-gray-500">// GitHub @Piotr1215</span>
            </p>
          </div>
        </div>
      </div>

      {/* Pinned Projects */}
      {pinnedProjects.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6 font-mono">
            <span className="text-green-400">$</span>
            <span className="text-gray-600 dark:text-gray-400">ls --pinned</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pinnedProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* Contributed Projects */}
      {contributedProjects.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6 font-mono">
            <span className="text-green-400">$</span>
            <span className="text-gray-600 dark:text-gray-400">ls --contributed</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {contributedProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-6 font-mono">
            <span className="text-green-400">$</span>
            <span className="text-gray-600 dark:text-gray-400">ls --all</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {otherProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
