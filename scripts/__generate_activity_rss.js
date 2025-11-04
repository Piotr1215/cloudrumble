#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load activity data
const videosData = require('../src/data/videos.json');
const blogsData = require('../src/data/blogs.json');
const talksData = require('../src/data/talks.json');

// Aggregate all activities
const activities = [];

// Add videos
videosData.forEach(video => {
  const date = new Date(video.publishedAt);
  activities.push({
    date: date,
    type: 'video',
    title: video.title,
    url: `https://youtube.com/watch?v=${video.videoId}`,
    description: video.description || '',
  });
});

// Add blogs
blogsData.forEach(blog => {
  const date = new Date(blog.publishedAt);
  activities.push({
    date: date,
    type: 'blog',
    title: blog.title,
    url: blog.link,
    description: blog.description || '',
  });
});

// Add talks (only past talks)
talksData
  .filter(talk => !talk.upcoming)
  .forEach(talk => {
    let date;
    if (talk.date.length === 7) {
      date = new Date(`${talk.date}-01`);
    } else {
      date = new Date(talk.date);
    }

    activities.push({
      date: date,
      type: 'talk',
      title: talk.title,
      url: talk.conferenceUrl || talk.recordingUrl || '',
      description: `Conference talk at ${talk.conference}`,
      conference: talk.conference,
    });
  });

// Sort by date (newest first)
activities.sort((a, b) => b.date - a.date);

// Generate RSS feed
const rssItems = activities
  .map(activity => {
    const pubDate = activity.date.toUTCString();
    const typeEmoji = activity.type === 'video' ? '▶️' : activity.type === 'blog' ? '📝' : '🎤';
    const typeLabel = activity.type.charAt(0).toUpperCase() + activity.type.slice(1);

    return `
    <item>
      <title>${typeEmoji} ${escapeXml(activity.title)}</title>
      <link>${escapeXml(activity.url)}</link>
      <guid>${escapeXml(activity.url)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(activity.description)}</description>
      <category>${typeLabel}</category>
      ${activity.conference ? `<category>${escapeXml(activity.conference)}</category>` : ''}
    </item>`;
  })
  .join('\n');

const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CloudRumble Activity Feed</title>
    <link>https://cloudrumble.net/activity</link>
    <description>Latest videos, blog posts, and conference talks from CloudRumble</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://cloudrumble.net/activity.rss" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

// Write RSS file to static directory
const outputPath = path.join(__dirname, '../static/activity.rss');
fs.writeFileSync(outputPath, rssFeed, 'utf8');

console.log(`✅ RSS feed generated: ${outputPath}`);
console.log(`📊 Total items: ${activities.length}`);

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
