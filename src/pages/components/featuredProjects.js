import React from "react";
import Link from "@docusaurus/Link";
const projectsData = require("../../data/projects.json");

// Get top 6 projects by stars (exclude contributed ones)
const topProjects = projectsData
  .filter(p => !p.isContributed)
  .sort((a, b) => (b.stars || 0) - (a.stars || 0))
  .slice(0, 6);

export default function FeaturedProjects() {
  return (
    <section className="px-4">
      <div className="mx-auto max-w-7xl">
        {/* Projects Terminal */}
        <div className="rounded-lg border-2 border-gray-700 bg-black shadow-xl overflow-hidden font-mono">
          <div className="flex items-center gap-2 border-b border-gray-700 bg-gray-800 px-4 py-2">
            <div className="flex gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 text-center text-xs text-gray-400">
              ~/projects
            </div>
          </div>

          <div className="p-6 text-base">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-green-400">➜</span>
              <span className="text-blue-400">~/projects</span>
              <span className="text-gray-300">$</span>
              <span className="text-white ml-2">ls -lh --sort=stars</span>
            </div>

            <div className="ml-4 space-y-3">
              {topProjects.map((project, idx) => (
                <Link
                  key={idx}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:bg-gray-800 px-2 py-2 rounded transition-colors group hover:no-underline"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-blue-400">drwxr-xr-x</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-cyan-400 font-semibold group-hover:text-cyan-300">
                          {project.name}
                        </span>
                        {project.stars && (
                          <span className="text-yellow-400 text-xs">
                            ⭐ {project.stars}
                          </span>
                        )}
                      </div>
                      <div className="text-gray-400 text-xs mb-1">
                        {project.description}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-purple-400 text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold text-sm hover:no-underline"
              >
                <span>cd projects/</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
