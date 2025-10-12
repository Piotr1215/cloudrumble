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

  return <BlogReel blogs={blogs} />;
}

export default function MediumPage() {
  return (
    <Layout
      title="Medium Blog Posts"
      description="Latest blog posts on Kubernetes, DevOps, Platform Engineering, and Cloud Native technologies"
    >
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-[96rem] mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Medium Blog</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              Technical articles on Kubernetes, Platform Engineering, DevOps, and Cloud Native technologies
            </p>
            <div className="flex justify-center gap-4 mb-6">
              <a
                href="https://medium.com/@piotrzan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                </svg>
                Follow on Medium
              </a>
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
