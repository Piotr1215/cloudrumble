import React from "react";
import Link from "@docusaurus/Link";

export default function BlogReel({ blogs = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog, index) => (
        <a
          key={index}
          href={blog.link}
          target="_blank"
          rel="noopener noreferrer"
          className="blog-card group"
        >
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
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="font-semibold text-xl mb-3 line-clamp-2 group-hover:text-purple-500 transition-colors text-gray-900 dark:text-gray-100">
                {blog.title}
              </h3>
              {blog.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
                  {blog.description}
                </p>
              )}
              {blog.categories && blog.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.categories.slice(0, 3).map((category, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
              {blog.date && (
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-auto">
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
