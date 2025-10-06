import React, { useState } from 'react';
import { Star, ExternalLink, Copy, Check } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyInstall = async () => {
    if (project.installCommand) {
      await navigator.clipboard.writeText(project.installCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="project-card group">
      <div className="flex flex-col h-full">
        {/* Header with name and stars */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 m-0">
                  {project.name}
                </h3>
                <ExternalLink size={16} className="text-gray-500 dark:text-gray-400" />
              </a>
              {project.isContributed && (
                <span className="inline-flex items-center px-2 py-1 text-xs font-semibold bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded">
                  Contributor
                </span>
              )}
            </div>
          </div>
          {project.stars !== undefined && (
            <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md flex-shrink-0">
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {project.stars.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Install section - optional */}
        {project.installCommand && (
          <div className="mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Quick Install
            </div>
            <div className="relative">
              <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 font-mono text-xs">
                <code className="flex-1 overflow-x-auto text-gray-800 dark:text-gray-200">
                  {project.installCommand}
                </code>
                <button
                  onClick={handleCopyInstall}
                  className="flex-shrink-0 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check size={14} className="text-green-500" />
                  ) : (
                    <Copy size={14} className="text-gray-500 dark:text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
