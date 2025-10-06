#!/usr/bin/env node

/**
 * Update GitHub stars count for all projects in projects.json
 * Usage: node scripts/update-github-stars.js
 * Optionally set GITHUB_TOKEN environment variable for authenticated requests (higher rate limit)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const PROJECTS_FILE = path.join(__dirname, '../src/data/projects.json');
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

/**
 * Fetch data from GitHub API
 */
function fetchGitHubData(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'CloudRumble-Stars-Updater',
        ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` })
      }
    };

    https.get(url, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`GitHub API returned ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Extract owner and repo from GitHub URL
 */
function parseGitHubUrl(url) {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) {
    throw new Error(`Invalid GitHub URL: ${url}`);
  }
  return { owner: match[1], repo: match[2] };
}

/**
 * Update stars for a single project
 */
async function updateProjectStars(project) {
  try {
    const { owner, repo } = parseGitHubUrl(project.url);
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

    console.log(`Fetching stars for ${owner}/${repo}...`);
    const data = await fetchGitHubData(apiUrl);

    return {
      ...project,
      stars: data.stargazers_count
    };
  } catch (error) {
    console.error(`Error updating ${project.name}:`, error.message);
    return project;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('Reading projects.json...');
  const projects = JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf8'));

  console.log(`Found ${projects.length} projects. Updating stars...`);

  const updatedProjects = [];
  for (const project of projects) {
    const updated = await updateProjectStars(project);
    updatedProjects.push(updated);
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('Writing updated data to projects.json...');
  fs.writeFileSync(
    PROJECTS_FILE,
    JSON.stringify(updatedProjects, null, 2) + '\n',
    'utf8'
  );

  console.log('✓ Successfully updated GitHub stars!');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
