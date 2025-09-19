import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import YouTubeReel from "./components/YouTubeReel";
import BrowserOnly from "@docusaurus/BrowserOnly";

const CHANNEL_ID = "UCkWVN7H3JqGtJ5Pv5bvCrAw";
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const CORS_PROXY = "https://api.allorigins.win/raw?url=";

function YouTubeContent() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(CORS_PROXY + encodeURIComponent(RSS_URL));
        const text = await response.text();

        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");
        const entries = xml.getElementsByTagName("entry");

        const videoList = [];
        for (let i = 0; i < Math.min(entries.length, 12); i++) {
          const entry = entries[i];
          const videoId = entry.getElementsByTagName("yt:videoId")[0]?.textContent;
          const title = entry.getElementsByTagName("title")[0]?.textContent;
          const published = entry.getElementsByTagName("published")[0]?.textContent;
          const mediaGroup = entry.getElementsByTagName("media:group")[0];
          const description = mediaGroup?.getElementsByTagName("media:description")[0]?.textContent;

          if (videoId) {
            videoList.push({
              id: videoId,
              videoId: videoId,
              title: title || "Untitled",
              thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
              description: description?.substring(0, 150) + "..." || "",
              date: new Date(published).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }),
            });
          }
        }

        setVideos(videoList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos. Please try again later.");
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-xl">Loading latest videos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return <YouTubeReel videos={videos} />;
}

export default function YouTubePage() {
  return (
    <Layout
      title="YouTube Videos"
      description="Watch my latest YouTube videos and tutorials from Cloud-Native Corner"
    >
      <main className="container mx-auto px-4 py-12">
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
      </main>
    </Layout>
  );
}