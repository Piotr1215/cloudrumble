import React from 'react';
import TalkCard from './TalkCard';
const talksData = require('../data/talks.json');

const Talks = () => {
  // Separate upcoming, pinned, and other talks
  const upcomingTalks = talksData.filter(t => t.upcoming);
  const pinnedTalks = talksData.filter(t => t.pinned && !t.upcoming);

  // Sort all other talks in descending order (newest first)
  const allTalks = talksData
    .filter(talk => !talk.upcoming && !talk.pinned)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="max-w-[96rem] mx-auto font-mono">
      {/* Terminal header */}
      <div className="mb-6 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 border-b border-gray-700">
          <div className="flex gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs text-gray-400 flex-1 text-center">~/talks</span>
        </div>
        <div className="bg-gray-100 dark:bg-black p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-400">$</span>
            <span className="text-gray-700 dark:text-white ml-2">cat TALKS.md</span>
          </div>
          <div className="ml-4 text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p>
              Deeply technical talks driven by live demos and real-world experience.
              Hands-on, honest, and pragmatic - aimed at practitioners working with
              Kubernetes, infrastructure, and AI.
            </p>
            <p className="flex items-center gap-4">
              <a
                href="https://sessionize.com/piotr-zaniewski/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-400"
              >
                ./favorite.sh
              </a>
              <span className="text-gray-500">// Sessionize profile</span>
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming Talks */}
      {upcomingTalks.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-green-400">$</span>
            <span className="text-gray-600 dark:text-gray-400">ls --upcoming</span>
          </div>
          <div className="space-y-4">
            {upcomingTalks.map((talk, index) => (
              <TalkCard key={index} talk={talk} />
            ))}
          </div>
        </div>
      )}

      {/* Pinned Talks */}
      {pinnedTalks.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-green-400">$</span>
            <span className="text-gray-600 dark:text-gray-400">ls --pinned</span>
          </div>
          <div className="space-y-4">
            {pinnedTalks.map((talk, index) => (
              <TalkCard key={index} talk={talk} />
            ))}
          </div>
        </div>
      )}

      {/* All Talks */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-green-400">$</span>
          <span className="text-gray-600 dark:text-gray-400">ls --all</span>
        </div>
        <div className="space-y-4">
          {allTalks.map((talk, index) => (
            <TalkCard key={index} talk={talk} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Talks;
