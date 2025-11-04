import React, { useState, useEffect } from 'react';
import { useActivityData } from '../hooks/useActivityData';

export default function ActivityHeatmap() {
  const { stats, recentActivity } = useActivityData();
  const [displayedItems, setDisplayedItems] = useState([]);
  const [isStreaming, setIsStreaming] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return '▶';
      case 'blog':
        return '✎';
      case 'talk':
        return '◉';
      default:
        return '•';
    }
  };

  // Simulate tail -f streaming effect on mount
  useEffect(() => {
    // Wait for data to load
    if (recentActivity.length === 0) {
      return;
    }

    // Start streaming if we have data and haven't finished
    if (isStreaming && currentIndex < recentActivity.length) {
      const timer = setTimeout(() => {
        setDisplayedItems(prev => [...prev, recentActivity[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, 100); // Slightly slower so it's more visible

      return () => clearTimeout(timer);
    } else if (currentIndex >= recentActivity.length) {
      setIsStreaming(false);
    }
  }, [currentIndex, isStreaming, recentActivity.length]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Stats Terminal Window */}
      <div className="bg-black border-2 border-cyan-900/50 rounded overflow-hidden shadow-lg shadow-cyan-900/20">
        <div className="bg-zinc-900/80 px-4 py-2 border-b border-cyan-900/50 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-zinc-600"></div>
            <div className="w-3 h-3 rounded-full bg-zinc-600"></div>
            <div className="w-3 h-3 rounded-full bg-zinc-600"></div>
          </div>
          <span className="text-zinc-400 font-mono text-xs">stats.sh</span>
        </div>
        <div className="p-6 font-mono">
          <div className="text-sm mb-3">
            <span className="text-zinc-500">$</span>
            <span className="text-cyan-400 ml-2">./stats.sh activity.log</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm pl-4 border-l-2 border-cyan-900/50">
            <div className="whitespace-nowrap">
              <span className="text-cyan-400">total:</span>
              <span className="text-zinc-200 ml-2">{stats.totalActivities}</span>
            </div>
            <div className="whitespace-nowrap">
              <span className="text-cyan-400">videos:</span>
              <span className="text-zinc-200 ml-2">{stats.totalVideos}</span>
            </div>
            <div className="whitespace-nowrap">
              <span className="text-cyan-400">blogs:</span>
              <span className="text-zinc-200 ml-2">{stats.totalBlogs}</span>
            </div>
            <div className="whitespace-nowrap">
              <span className="text-cyan-400">talks:</span>
              <span className="text-zinc-200 ml-2">{stats.totalTalks}</span>
            </div>
            <div className="whitespace-nowrap">
              <span className="text-cyan-400">streak:</span>
              <span className="text-zinc-200 ml-2">{stats.longestStreak}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Log Terminal Window */}
      <div className="bg-black border-2 border-cyan-900/50 rounded overflow-hidden shadow-lg shadow-cyan-900/20">
        <div className="bg-zinc-900/80 px-4 py-2 border-b border-cyan-900/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-zinc-600"></div>
              <div className="w-3 h-3 rounded-full bg-zinc-600"></div>
              <div className="w-3 h-3 rounded-full bg-zinc-600"></div>
            </div>
            <span className="text-zinc-400 font-mono text-xs">activity.log</span>
          </div>
          <div className="text-zinc-500 font-mono text-xs">
            {displayedItems.length} / {recentActivity.length}
          </div>
        </div>

        <div className="p-6">
          <div className="text-sm mb-4 font-mono">
            <span className="text-zinc-500">$</span>
            <span className="text-cyan-400 ml-2">tail -f activity.log</span>
          </div>

          <div className="space-y-0 font-mono text-sm min-h-[200px]">
            {recentActivity.length === 0 && (
              <div className="py-4 text-zinc-500 text-xs">
                <span className="animate-pulse">Loading activity data...</span>
              </div>
            )}

            {displayedItems.map((activity, i) => (
              <div key={i} className="flex items-start py-2 border-b border-zinc-900 last:border-0 hover:bg-zinc-900/50 transition-colors px-2 -mx-2 rounded-sm">
                <span className="text-cyan-500 mr-3 mt-0.5 select-none">{getTypeIcon(activity.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-zinc-500 text-xs font-mono">[{activity.dateString}]</span>
                    <a
                      href={activity.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-200 hover:text-cyan-400 hover:underline"
                    >
                      {activity.title}
                    </a>
                  </div>
                  {activity.conference && (
                    <div className="text-zinc-500 text-xs mt-0.5 flex items-center gap-1">
                      <span className="text-cyan-700">→</span> {activity.conference}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isStreaming && recentActivity.length > 0 && (
              <div className="py-2 text-zinc-500 font-mono text-xs flex items-center gap-2">
                <span className="animate-pulse text-cyan-400">▮</span>
                <span>streaming...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
