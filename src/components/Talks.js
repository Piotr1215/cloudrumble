import React, { useState } from 'react';
import TalkCard from './TalkCard';
const talksData = require('../data/talks.json');

const Talks = () => {
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  
  // Sort the years array in descending order
  const years = [...new Set(talksData.map(talk => talk.date))].sort((a, b) => b.localeCompare(a));
  const allTags = [...new Set(talksData.flatMap(talk => talk.tags))];
  
  // Filter and sort the talks in descending order (newest first)
  const filteredTalks = talksData
    .filter(talk => {
      const yearMatch = selectedYear === 'all' || talk.date === selectedYear;
      const tagMatch = selectedTag === 'all' || talk.tags.includes(selectedTag);
      return yearMatch && tagMatch;
    })
    .sort((a, b) => b.date.localeCompare(a.date));  // Simple string comparison for YYYY-MM format

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Speaking Engagements
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Here are my recent talks and presentations at various conferences and events. 
          Feel free to check out the recordings and slides!
        </p>
      </div>
      <div className="mb-8 flex flex-wrap gap-4">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="talks-filter"
        >
          <option value="all">All Years</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="talks-filter"
        >
          <option value="all">All Topics</option>
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>
      <div>
        {filteredTalks.map((talk, index) => (
          <TalkCard key={index} talk={talk} />
        ))}
      </div>
    </div>
  );
};

export default Talks;
