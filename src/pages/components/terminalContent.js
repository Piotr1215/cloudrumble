import React from "react";
import Link from "@docusaurus/Link";
const videosData = require("../../data/videos.json");
const talksData = require("../../data/talks.json");
const blogsData = require("../../data/blogs.json");

export default function TerminalContent() {
  const recentVideos = videosData.slice(0, 6);
  const recentBlogs = blogsData.slice(0, 6);
  const upcomingTalks = talksData.filter(t => t.upcoming).slice(0, 3);
  const upcomingCount = upcomingTalks.length;
  const recentTalks = talksData.filter(t => !t.upcoming).slice(0, 6 - upcomingCount);

  return (
    <section className="px-4">
      <div className="mx-auto max-w-7xl space-y-16">
        {/* Videos Terminal */}
        <div className="rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-black shadow-xl overflow-hidden font-mono">
          <div className="flex items-center gap-2 border-b border-gray-700 bg-gray-800 px-4 py-2">
            <div className="flex gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 text-center text-xs text-gray-400">
              ~/content/videos
            </div>
          </div>

          <div className="p-6 text-base">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-green-400">➜</span>
              <span className="text-blue-400">~/content/videos</span>
              <span className="text-gray-500 dark:text-gray-300">$</span>
              <span className="text-gray-900 dark:text-white ml-2">ls -lh --recent</span>
            </div>

            <div className="ml-4 space-y-2">
              {recentVideos.map((video, idx) => (
                <Link
                  key={idx}
                  href={`https://youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:bg-gray-800 px-2 py-1 rounded transition-colors group hover:no-underline"
                >
                  <span className="text-blue-400">-rw-r--r--</span>
                  <span className="text-gray-500 text-xs w-24">{video.date}</span>
                  <span className="text-gray-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                    {video.title}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/youtube"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold text-sm hover:no-underline"
              >
                <span>cd videos/</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Blogs Terminal */}
        <div className="rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-black shadow-xl overflow-hidden font-mono">
          <div className="flex items-center gap-2 border-b border-gray-700 bg-gray-800 px-4 py-2">
            <div className="flex gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 text-center text-xs text-gray-400">
              ~/content/blogs
            </div>
          </div>

          <div className="p-6 text-base">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-green-400">➜</span>
              <span className="text-blue-400">~/content/blogs</span>
              <span className="text-gray-500 dark:text-gray-300">$</span>
              <span className="text-gray-900 dark:text-white ml-2">ls -lh --recent</span>
            </div>

            <div className="ml-4 space-y-2">
              {recentBlogs.map((blog, idx) => (
                <Link
                  key={idx}
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:bg-gray-800 px-2 py-1 rounded transition-colors group hover:no-underline"
                >
                  <span className="text-blue-400">-rw-r--r--</span>
                  <span className="text-gray-500 text-xs w-24">{blog.date}</span>
                  <span className="text-gray-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                    {blog.title}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-6 text-center">
              <a
                href="https://medium.com/@piotrzan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold text-sm hover:no-underline"
              >
                <span>cd blogs/</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Talks Terminal */}
        <div className="rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-black shadow-xl overflow-hidden font-mono">
          <div className="flex items-center gap-2 border-b border-gray-700 bg-gray-800 px-4 py-2">
            <div className="flex gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 text-center text-xs text-gray-400">
              ~/content/talks
            </div>
          </div>

          <div className="p-6 text-base">
            {/* Upcoming Talks */}
            {upcomingTalks.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-green-400">➜</span>
                  <span className="text-blue-400">~/content/talks</span>
                  <span className="text-gray-500 dark:text-gray-300">$</span>
                  <span className="text-gray-900 dark:text-white ml-2">ls -lh --upcoming</span>
                </div>

                <div className="ml-4 space-y-2">
                  {upcomingTalks.map((talk, idx) => (
                    <Link
                      key={idx}
                      href={talk.conferenceUrl || "/talks"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 hover:bg-gray-800 px-2 py-1 rounded transition-colors group hover:no-underline"
                    >
                      <span className="text-yellow-400">●</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-cyan-600 dark:text-cyan-400 font-semibold group-hover:text-cyan-300">{talk.title}</span>
                          <span className="text-gray-500 text-xs">[{talk.date}]</span>
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 text-xs mt-1">{talk.conference}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Talks */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-green-400">➜</span>
                <span className="text-blue-400">~/content/talks</span>
                <span className="text-gray-500 dark:text-gray-300">$</span>
                <span className="text-gray-900 dark:text-white ml-2">ls -lh --recent</span>
              </div>

              <div className="ml-4 space-y-2">
                {recentTalks.map((talk, idx) => (
                  <Link
                    key={idx}
                    href={talk.recordingUrl || talk.conferenceUrl || "/talks"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 hover:bg-gray-800 px-2 py-1 rounded transition-colors group hover:no-underline"
                  >
                    <span className="text-green-400">✓</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                          {talk.title}
                        </span>
                        <span className="text-gray-500 text-xs">[{talk.date}]</span>
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-xs mt-1">{talk.conference}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/talks"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold text-sm hover:no-underline"
              >
                <span>cd talks/</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
