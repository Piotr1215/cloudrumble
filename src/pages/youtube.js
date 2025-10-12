import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import YouTubeReel from "./components/YouTubeReel";
import BrowserOnly from "@docusaurus/BrowserOnly";
const videosData = require('../data/videos.json');

function YouTubeContent() {
  const [videos, setVideos] = useState(videosData);
  const [loading, setLoading] = useState(false);

  // Videos are loaded from static JSON file
  // No need for async fetching or error handling
  useEffect(() => {
    setVideos(videosData);
  }, []);

  return <YouTubeReel videos={videos} />;
}

export default function YouTubePage() {
  return (
    <Layout
      title="YouTube Videos"
      description="Watch my latest YouTube videos and tutorials from Cloud-Native Corner"
    >
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-[96rem] mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Cloud-Native Corner</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              Latest videos on CLI tools, Neovim, Tmux, automation, and cloud-native technologies
            </p>
            <div className="flex justify-center gap-4 mb-6">
              <a
                href="https://www.youtube.com/@cloud-native-corner"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Subscribe on YouTube
            </a>
            <span className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
              3.09K subscribers • 113 videos
            </span>
          </div>
        </div>
        <BrowserOnly fallback={<div>Loading...</div>}>
          {() => <YouTubeContent />}
        </BrowserOnly>
        </div>
      </main>
    </Layout>
  );
}