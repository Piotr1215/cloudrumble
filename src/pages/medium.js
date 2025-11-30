import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import BlogReel from "./components/BlogReel";
import BrowserOnly from "@docusaurus/BrowserOnly";
const blogsData = require('../data/blogs.json');

function MediumContent() {
  const [blogs, setBlogs] = useState(blogsData);

  useEffect(() => {
    setBlogs(blogsData);
  }, []);

  const pinnedBlogs = blogs.filter(b => b.pinned);
  const otherBlogs = blogs.filter(b => !b.pinned);

  return (
    <div className="space-y-16">
      {pinnedBlogs.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-6 font-mono">
            <span className="text-green-400">$</span>
            <span className="text-gray-600 dark:text-gray-400">ls --pinned</span>
          </div>
          <BlogReel blogs={pinnedBlogs} />
        </div>
      )}
      {otherBlogs.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-6 font-mono">
            <span className="text-green-400">$</span>
            <span className="text-gray-600 dark:text-gray-400">ls --latest</span>
          </div>
          <BlogReel blogs={otherBlogs} />
        </div>
      )}
    </div>
  );
}

export default function MediumPage() {
  return (
    <Layout
      title="Medium Blog Posts"
      description="Latest blog posts on Kubernetes, DevOps, Platform Engineering, and Cloud Native technologies"
    >
      <main className="px-4 py-12">
        <div className="max-w-[96rem] mx-auto font-mono">
          {/* Terminal header */}
          <div className="mb-6 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 border-b border-gray-700">
              <div className="flex gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-gray-400 flex-1 text-center">~/blogs</span>
            </div>
            <div className="bg-gray-100 dark:bg-black p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-green-400">$</span>
                <span className="text-gray-700 dark:text-white ml-2">cat BLOGS.md</span>
              </div>
              <div className="ml-4 text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <p>
                  Technical articles on Kubernetes, Platform Engineering, DevOps, and Cloud Native technologies.
                </p>
                <p className="flex items-center gap-4">
                  <a
                    href="https://medium.com/@piotrzan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-400"
                  >
                    ./follow.sh
                  </a>
                  <span className="text-gray-500">// Medium @piotrzan</span>
                </p>
              </div>
            </div>
          </div>
          <BrowserOnly fallback={<div>Loading...</div>}>
            {() => <MediumContent />}
          </BrowserOnly>
        </div>
      </main>
    </Layout>
  );
}
