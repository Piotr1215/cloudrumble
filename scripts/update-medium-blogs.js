#!/usr/bin/env node

/**
 * Fetch latest Medium posts and update blogs.json
 * Usage: node scripts/update-medium-blogs.js
 */

const fs = require('fs');
const path = require('path');

const FEED_URL = 'https://medium.com/feed/@piotrzan';
const BLOGS_FILE = path.join(__dirname, '../src/data/blogs.json');
const MAX_POSTS = 12;

/**
 * Decode the XML/HTML entities Medium emits
 */
function decodeEntities(text) {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(code))
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

/**
 * Return the text of a tag, unwrapping CDATA
 */
function tagText(xml, tag) {
  const match = xml.match(new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`));
  return match ? match[1].trim() : '';
}

/**
 * First image in the post body, skipping Medium's tracking pixel
 */
function extractThumbnail(html) {
  const srcs = [...html.matchAll(/<img[^>]*\ssrc="([^"]+)"/g)].map(m => m[1]);
  return srcs.find(src => !src.includes('/_/stat')) || '';
}

/**
 * Plain-text opening of the post body, without image captions or code
 */
function extractDescription(html) {
  const text = decodeEntities(
    html
      .replace(/<figure[\s\S]*?<\/figure>/g, ' ')
      .replace(/<pre[\s\S]*?<\/pre>/g, ' ')
      .replace(/<\/(p|h\d|li|blockquote)>/g, ' ')
      .replace(/<[^>]*>/g, '')
  ).replace(/\s+/g, ' ').trim();
  return text ? text.substring(0, 150) + '...' : '';
}

/**
 * Parse Medium RSS into blogs.json entries
 */
function parseFeed(xmlText) {
  const items = xmlText.match(/<item>[\s\S]*?<\/item>/g) || [];

  return items.slice(0, MAX_POSTS).map(item => {
    const body = tagText(item, 'content:encoded');
    const pubDate = tagText(item, 'pubDate');
    const date = new Date(pubDate);
    const categories = [...item.matchAll(/<category>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/category>/g)].map(m => m[1]);

    return {
      title: decodeEntities(tagText(item, 'title')),
      link: tagText(item, 'link').split('?')[0],
      thumbnail: extractThumbnail(body),
      description: extractDescription(body),
      date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      publishedAt: date.toISOString(),
      categories
    };
  });
}

/**
 * Pinned entries first, then feed posts not already pinned
 */
function mergeBlogs(existingBlogs, feedBlogs) {
  const pinnedBlogs = existingBlogs.filter(b => b.pinned);
  const pinnedLinks = new Set(pinnedBlogs.map(b => b.link));
  return [...pinnedBlogs, ...feedBlogs.filter(b => !pinnedLinks.has(b.link))];
}

/**
 * Main function
 */
async function main() {
  console.log('Fetching latest Medium posts...');

  try {
    const res = await fetch(FEED_URL, { headers: { 'User-Agent': 'cloudrumble-blog-sync' } });
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const feedBlogs = parseFeed(await res.text());
    if (feedBlogs.length === 0) {
      throw new Error('Feed returned no posts, leaving blogs.json untouched');
    }
    console.log(`Found ${feedBlogs.length} posts from RSS`);

    const existingBlogs = fs.existsSync(BLOGS_FILE)
      ? JSON.parse(fs.readFileSync(BLOGS_FILE, 'utf8'))
      : [];
    const blogs = mergeBlogs(existingBlogs, feedBlogs);

    fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2) + '\n', 'utf8');

    console.log(`✓ Successfully updated ${BLOGS_FILE} (${blogs.length} posts)`);
  } catch (error) {
    console.error('Error fetching Medium posts:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { parseFeed, mergeBlogs, extractThumbnail, extractDescription };
