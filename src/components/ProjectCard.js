import React, { useState } from 'react';
import { Star, Copy, Check } from 'lucide-react';

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
    <div className="terminal-card group">
      <div className="flex flex-col h-full font-mono">
        {/* Terminal-style header */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
          <span className="text-green-400 text-sm">$</span>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold truncate"
          >
            {project.name}
          </a>
          {project.isContributed && (
            <span className="text-purple-400 text-xs border border-purple-500 px-1">
              CONTRIB
            </span>
          )}
          {project.stars !== undefined && (
            <span className="ml-auto flex items-center gap-1 text-yellow-500 text-sm flex-shrink-0">
              <Star size={12} className="fill-yellow-500" />
              {project.stars.toLocaleString()}
            </span>
          )}
        </div>

        {/* Description as comment */}
        <p className="text-gray-400 text-sm mb-4 flex-grow leading-relaxed">
          <span className="text-gray-600">#</span> {project.description}
        </p>

        {/* Tags as flags */}
        {project.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs text-gray-500 border border-gray-700 px-2 py-0.5"
              >
                --{tag.toLowerCase().replace(/\s+/g, '-')}
              </span>
            ))}
          </div>
        )}

        {/* Install command */}
        {project.installCommand && (
          <div className="mt-auto pt-3 border-t border-gray-700">
            <div className="flex items-center gap-2 group/copy">
              <span className="text-green-400 text-xs">➜</span>
              <code className="flex-1 text-xs text-gray-300 overflow-x-auto whitespace-nowrap">
                {project.installCommand}
              </code>
              <button
                onClick={handleCopyInstall}
                className="flex-shrink-0 p-1 opacity-0 group-hover/copy:opacity-100 hover:text-green-400 transition-all"
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
    </div>
  );
};

export default ProjectCard;
