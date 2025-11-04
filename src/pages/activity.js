import React from 'react';
import Layout from '@theme/Layout';
import ActivityHeatmap from '../components/ActivityHeatmap';

export default function Activity() {
  return (
    <Layout
      title="Activity Dashboard"
      description="Track my contributions across YouTube, Medium, and Conference talks"
    >
      <main className="container mx-auto px-4 py-8">
        {/* RSS Link */}
        <div className="max-w-6xl mx-auto mb-6 flex justify-end">
          <a
            href="/activity.rss"
            className="flex items-center gap-2 px-4 py-2 bg-black border-2 border-cyan-900/50 rounded text-cyan-400 hover:text-cyan-300 hover:border-cyan-800/70 transition-colors font-mono text-sm"
            title="Subscribe to RSS feed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 11a9 9 0 0 1 9 9" />
              <path d="M4 4a16 16 0 0 1 16 16" />
              <circle cx="5" cy="19" r="1" />
            </svg>
            <span>RSS Feed</span>
          </a>
        </div>

        {/* Activity Heatmap Component */}
        <ActivityHeatmap />
      </main>
    </Layout>
  );
}
