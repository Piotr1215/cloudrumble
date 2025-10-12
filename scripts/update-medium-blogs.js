#!/usr/bin/env node

/**
 * Fetch latest Medium blog posts and update blogs.json
 * Usage: node scripts/update-medium-blogs.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const MEDIUM_USER = "piotrzan";
const RSS_URL = `https://medium.com/feed/@${MEDIUM_USER}`;
const BLOGS_FILE = path.join(__dirname, '../src/data/blogs.json');

/**
 * Fetch Medium RSS feed
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
 * Parse XML string to extract blog post data
 */
function parseBlogs(xmlText) {
  const blogs = [];

  // Simple regex-based parsing (works for Medium RSS format)
  const itemRegex = /<item>(.*?)<\/item>/gs;
  const items = xmlText.match(itemRegex) || [];

  for (const item of items.slice(0, 12)) {
    const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
    const linkMatch = item.match(/<link>(.*?)<\/link>/);
    const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);
    const descMatch = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/);
    const contentMatch = item.match(/<content:encoded><!\[CDATA\[(.*?)\]\]><\/content:encoded>/s);
    const categoryMatches = item.matchAll(/<category><!\[CDATA\[(.*?)\]\]><\/category>/g);

    if (titleMatch && linkMatch && pubDateMatch) {
      const title = titleMatch[1];
      // Remove RSS tracking parameters from link
      const link = linkMatch[1].split('?')[0];
      const pubDate = pubDateMatch[1];

      // Extract thumbnail from content:encoded or description HTML
      let thumbnail = '';
      let description = '';

      // Try content:encoded first (has full HTML with images)
      const htmlContent = contentMatch ? contentMatch[1] : (descMatch ? descMatch[1] : '');

      if (htmlContent) {
        // Extract first image from HTML
        const imgMatch = htmlContent.match(/<img[^>]+src="([^">]+)"/);
        if (imgMatch) {
          thumbnail = imgMatch[1];
        }

        // Remove HTML tags and entities for description
        description = htmlContent
          .replace(/<[^>]*>/g, '')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .trim()
          .substring(0, 150) + '...';
      }

      // Extract categories/tags
      const categories = [...categoryMatches].map(match => match[1]);

      const date = new Date(pubDate);
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      blogs.push({
        title: title,
        link: link,
        thumbnail: thumbnail,
        description: description,
        date: formattedDate,
        publishedAt: pubDate,
        categories: categories
      });
    }
  }

  return blogs;
}

/**
 * Main function
 */
async function main() {
  console.log('Fetching latest Medium blog posts...');

  try {
    const xmlData = await fetchRSS(RSS_URL);
    const blogs = parseBlogs(xmlData);

    console.log(`Found ${blogs.length} blog posts`);

    // Ensure directory exists
    const dir = path.dirname(BLOGS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(
      BLOGS_FILE,
      JSON.stringify(blogs, null, 2) + '\n',
      'utf8'
    );

    console.log(`✓ Successfully updated ${BLOGS_FILE}`);
  } catch (error) {
    console.error('Error fetching blog posts:', error.message);
    process.exit(1);
  }
}

main();
