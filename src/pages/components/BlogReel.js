import React from "react";

export default function BlogReel({ blogs = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {blogs.map((blog, index) => (
        <a
          key={index}
          href={blog.link}
          target="_blank"
          rel="noopener noreferrer"
          className="blog-card group"
        >
          {/* Terminal header */}
          <div className="terminal-card-header">
            <div className="traffic-lights">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="path">~/blogs/{blog.title.toLowerCase().replace(/\s+/g, '-').slice(0, 25)}</span>
          </div>

          <div className="flex flex-col h-full">
            {blog.thumbnail && (
              <div className="relative aspect-video">
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
              </div>
            )}
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="terminal-file text-lg mb-2 line-clamp-2 group-hover:text-cyan-500 transition-colors">
                {blog.title}
              </h3>
              {blog.date && (
                <p className="text-xs terminal-comment mt-auto">
                  {blog.date}
                </p>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
