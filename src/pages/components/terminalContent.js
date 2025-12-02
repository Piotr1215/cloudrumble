import React from "react";
import Link from "@docusaurus/Link";
const videosData = require("../../data/videos.json");
const talksData = require("../../data/talks.json");
const blogsData = require("../../data/blogs.json");

export default function TerminalContent() {
  // Pinned (3) and Latest (3) for videos
  const pinnedVideos = videosData.filter(v => v.pinned).slice(0, 3);
  const latestVideos = videosData.filter(v => !v.pinned).slice(0, 3);

  // Pinned (3) and Latest (3) for blogs
  const pinnedBlogs = blogsData.filter(b => b.pinned).slice(0, 3);
  const latestBlogs = blogsData.filter(b => !b.pinned).slice(0, 3);

  // Talks: upcoming first, then pinned, then recent
  const upcomingTalks = talksData.filter(t => t.upcoming).slice(0, 3);
  const pinnedTalks = talksData.filter(t => t.pinned && !t.upcoming).slice(0, 3);
  const latestTalks = talksData.filter(t => !t.upcoming && !t.pinned).slice(0, 3);

  return (
    <section className="px-4">
      <div className="max-w-[96rem] mx-auto space-y-16">
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

            {/* Pinned Talks */}
            {pinnedTalks.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-green-400">➜</span>
                  <span className="text-blue-400">~/content/talks</span>
                  <span className="text-gray-500 dark:text-gray-300">$</span>
                  <span className="text-gray-900 dark:text-white ml-2">ls -lh --pinned</span>
                </div>

                <div className="ml-4 space-y-2">
                  {pinnedTalks.map((talk, idx) => (
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
            )}

            {/* Latest Talks */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-green-400">➜</span>
                <span className="text-blue-400">~/content/talks</span>
                <span className="text-gray-500 dark:text-gray-300">$</span>
                <span className="text-gray-900 dark:text-white ml-2">ls -lh --latest</span>
              </div>

              <div className="ml-4 space-y-2">
                {latestTalks.map((talk, idx) => (
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
            {/* Pinned Videos */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-green-400">➜</span>
                <span className="text-blue-400">~/content/videos</span>
                <span className="text-gray-500 dark:text-gray-300">$</span>
                <span className="text-gray-900 dark:text-white ml-2">ls -lh --pinned</span>
              </div>

              <div className="ml-4 space-y-2">
                {pinnedVideos.map((video, idx) => (
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
            </div>

            {/* Latest Videos */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-green-400">➜</span>
                <span className="text-blue-400">~/content/videos</span>
                <span className="text-gray-500 dark:text-gray-300">$</span>
                <span className="text-gray-900 dark:text-white ml-2">ls -lh --latest</span>
              </div>

              <div className="ml-4 space-y-2">
                {latestVideos.map((video, idx) => (
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

        {/* Medium Blogs Terminal */}
        <div className="rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-black shadow-xl overflow-hidden font-mono">
          <div className="flex items-center gap-2 border-b border-gray-700 bg-gray-800 px-4 py-2">
            <div className="flex gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 text-center text-xs text-gray-400">
              ~/content/medium
            </div>
          </div>

          <div className="p-6 text-base">
            {/* Pinned Blogs */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-green-400">➜</span>
                <span className="text-blue-400">~/content/medium</span>
                <span className="text-gray-500 dark:text-gray-300">$</span>
                <span className="text-gray-900 dark:text-white ml-2">ls -lh --pinned</span>
              </div>

              <div className="ml-4 space-y-2">
                {pinnedBlogs.map((blog, idx) => (
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
            </div>

            {/* Latest Blogs */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-green-400">➜</span>
                <span className="text-blue-400">~/content/medium</span>
                <span className="text-gray-500 dark:text-gray-300">$</span>
                <span className="text-gray-900 dark:text-white ml-2">ls -lh --latest</span>
              </div>

              <div className="ml-4 space-y-2">
                {latestBlogs.map((blog, idx) => (
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
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/medium"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold text-sm hover:no-underline"
              >
                <span>cd medium/</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
