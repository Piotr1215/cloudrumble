import React, { useState } from 'react';
import { Star, Copy, Check } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyInstall = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (project.installCommand) {
      await navigator.clipboard.writeText(project.installCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="terminal-card group block no-underline"
    >
      {/* Terminal header */}
      <div className="terminal-card-header">
        <div className="traffic-lights">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className="path">~/projects/{project.name.toLowerCase().replace(/\s+/g, '-')}</span>
      </div>

      <div className="terminal-card-body flex-1">
        {/* Project name with stars */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-300 dark:border-gray-700">
          <span className="text-green-500 text-sm">$</span>
          <span className="terminal-file truncate">
            {project.name}
          </span>
          {project.isContributed && (
            <span className="text-purple-600 dark:text-purple-400 text-xs border border-purple-500 px-1 rounded">
              CONTRIB
            </span>
          )}
          {project.stars !== undefined && (
            <span className="ml-auto flex items-center gap-1 text-yellow-600 dark:text-yellow-500 text-sm flex-shrink-0">
              <Star size={12} className="fill-current" />
              {project.stars.toLocaleString()}
            </span>
          )}
        </div>

        {/* Description as comment */}
        <p className="terminal-comment text-sm mb-4 flex-grow leading-relaxed">
          # {project.description}
        </p>

        {/* Tags as flags */}
        {project.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, index) => (
              <span key={index} className="terminal-tag">
                --{tag.toLowerCase().replace(/\s+/g, '-')}
              </span>
            ))}
          </div>
        )}

        {/* Install command */}
        {project.installCommand && (
          <div className="mt-auto pt-3 border-t border-gray-300 dark:border-gray-700">
            <div className="flex items-center gap-2 group/copy">
              <span className="text-green-500 text-xs">$</span>
              <code className="flex-1 text-xs text-gray-700 dark:text-gray-300 overflow-x-auto whitespace-nowrap">
                {project.installCommand}
              </code>
              <button
                onClick={handleCopyInstall}
                className="flex-shrink-0 p-1 opacity-0 group-hover/copy:opacity-100 hover:text-green-500 transition-all"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check size={12} className="text-green-500" />
                ) : (
                  <Copy size={12} className="text-gray-500" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </a>
  );
};

export default ProjectCard;
