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

  const pinnedVideos = videos.filter(v => v.pinned);
  const otherVideos = videos.filter(v => !v.pinned);

  return (
    <div className="space-y-16">
      {pinnedVideos.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-6 font-mono">
            <span className="text-green-400">$</span>
            <span className="text-gray-600 dark:text-gray-400">ls --pinned</span>
          </div>
          <YouTubeReel videos={pinnedVideos} />
        </div>
      )}
      {otherVideos.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-6 font-mono">
            <span className="text-green-400">$</span>
            <span className="text-gray-600 dark:text-gray-400">ls --latest</span>
          </div>
          <YouTubeReel videos={otherVideos} />
        </div>
      )}
    </div>
  );
}

export default function YouTubePage() {
  return (
    <Layout
      title="YouTube Videos"
      description="Watch my latest YouTube videos and tutorials from Cloud-Native Corner"
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
              <span className="text-xs text-gray-400 flex-1 text-center">~/videos</span>
            </div>
            <div className="bg-gray-100 dark:bg-black p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-green-400">$</span>
                <span className="text-gray-700 dark:text-white ml-2">cat VIDEOS.md</span>
              </div>
              <div className="ml-4 text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <p>
                  Cloud-Native Corner - videos on CLI tools, Neovim, Tmux, automation, and cloud-native technologies.
                </p>
                <p className="flex items-center gap-4">
                  <a
                    href="https://www.youtube.com/@cloud-native-corner"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:text-red-400"
                  >
                    ./subscribe.sh
                  </a>
                  <span className="text-gray-500">// 3.09K subscribers</span>
                </p>
              </div>
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
