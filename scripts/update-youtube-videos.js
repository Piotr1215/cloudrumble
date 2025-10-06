#!/usr/bin/env node

/**
 * Fetch latest YouTube videos and update videos.json
 * Usage: node scripts/update-youtube-videos.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const CHANNEL_ID = "UCkWVN7H3JqGtJ5Pv5bvCrAw";
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const VIDEOS_FILE = path.join(__dirname, '../src/data/videos.json');

/**
 * Fetch YouTube RSS feed
 */
function fetchRSS(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`Request failed with status ${res.statusCode}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Parse XML string to extract video data
 */
function parseVideos(xmlText) {
  const videos = [];

  // Simple regex-based parsing (works for YouTube RSS format)
  const entryRegex = /<entry>(.*?)<\/entry>/gs;
  const entries = xmlText.match(entryRegex) || [];

  for (const entry of entries.slice(0, 12)) {
    const videoIdMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
    const titleMatch = entry.match(/<title>(.*?)<\/title>/);
    const publishedMatch = entry.match(/<published>(.*?)<\/published>/);
    const descMatch = entry.match(/<media:description>(.*?)<\/media:description>/);

    if (videoIdMatch && titleMatch && publishedMatch) {
      const videoId = videoIdMatch[1];
      const title = titleMatch[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      const published = publishedMatch[1];
      const description = descMatch ? descMatch[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').substring(0, 150) + '...' : '';

      const date = new Date(published);
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      videos.push({
        id: videoId,
        videoId: videoId,
        title: title,
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        description: description,
        date: formattedDate,
        publishedAt: published
      });
    }
  }

  return videos;
}

/**
 * Main function
 */
async function main() {
  console.log('Fetching latest YouTube videos...');

  try {
    const xmlData = await fetchRSS(RSS_URL);
    const videos = parseVideos(xmlData);

    console.log(`Found ${videos.length} videos`);

    // Ensure directory exists
    const dir = path.dirname(VIDEOS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(
      VIDEOS_FILE,
      JSON.stringify(videos, null, 2) + '\n',
      'utf8'
    );

    console.log(`✓ Successfully updated ${VIDEOS_FILE}`);
  } catch (error) {
    console.error('Error fetching videos:', error.message);
    process.exit(1);
  }
}

main();
