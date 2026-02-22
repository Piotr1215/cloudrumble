// WebMCP tools for Cloud Rumble — exposes site data to AI agents via navigator.modelContext
// Requires Chrome 146+ with chrome://flags/#enable-webmcp-testing

import talks from './data/talks.json';
import projects from './data/projects.json';
import blogs from './data/blogs.json';
import videos from './data/videos.json';

function matches(text, query) {
  if (!text || !query) return true;
  return text.toLowerCase().includes(query.toLowerCase());
}

function matchesAny(fields, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  return fields.some(f => {
    if (!f) return false;
    if (Array.isArray(f)) return f.some(item => String(item).toLowerCase().includes(q));
    return String(f).toLowerCase().includes(q);
  });
}

function registerTools() {
  if (!('modelContext' in navigator)) return;

  navigator.modelContext.registerTool({
    name: "search_talks",
    description: "Search Piotr's conference talks and workshops by keyword, tag, year, or status. Returns title, conference, date, tags, type, status, and available links (recording, slides, workshop).",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search term to match in title, description, conference name, or tags" },
        status: { type: "string", description: "Filter by status: submitted, accepted, or completed" },
        type: { type: "string", description: "Filter by type: talk, workshop, or keynote" },
      },
    },
    execute: async ({ query, status, type }) => {
      let results = talks.filter(t =>
        matchesAny([t.title, t.description, t.conference, t.tags], query) &&
        (!status || t.status === status) &&
        (!type || t.type === type)
      );
      const summary = results.map(t => ({
        title: t.title,
        conference: t.conference,
        date: t.date,
        type: t.type,
        status: t.status,
        tags: t.tags,
        ...(t.recordingUrl && { recordingUrl: t.recordingUrl }),
        ...(t.slidesUrl && { slidesUrl: t.slidesUrl }),
        ...(t.workshopUrl && { workshopUrl: t.workshopUrl }),
        ...(t.conferenceUrl && { conferenceUrl: t.conferenceUrl }),
      }));
      return { content: [{ type: "text", text: JSON.stringify({ count: summary.length, talks: summary }) }] };
    },
  });

  navigator.modelContext.registerTool({
    name: "search_projects",
    description: "Search Piotr's open source projects by name, tag, or category. Returns name, description, GitHub stars, URL, tags, and install command if available.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search term to match in name, description, or tags" },
        category: { type: "string", description: "Filter by category (e.g. web, container, cli, neovim)" },
      },
    },
    execute: async ({ query, category }) => {
      let results = projects.filter(p =>
        matchesAny([p.name, p.description, p.tags], query) &&
        (!category || matches(p.category, category))
      );
      const summary = results.map(p => ({
        name: p.name,
        description: p.description,
        stars: p.stars,
        url: p.url,
        tags: p.tags,
        category: p.category,
        ...(p.installCommand && { installCommand: p.installCommand }),
      }));
      return { content: [{ type: "text", text: JSON.stringify({ count: summary.length, projects: summary }) }] };
    },
  });

  navigator.modelContext.registerTool({
    name: "search_blogs",
    description: "Search Piotr's blog posts by keyword or category. Returns title, link, date, description, and categories.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search term to match in title, description, or categories" },
      },
    },
    execute: async ({ query }) => {
      let results = blogs.filter(b =>
        matchesAny([b.title, b.description, b.categories], query)
      );
      const summary = results.map(b => ({
        title: b.title,
        link: b.link,
        date: b.date,
        description: b.description,
        categories: b.categories,
      }));
      return { content: [{ type: "text", text: JSON.stringify({ count: summary.length, blogs: summary }) }] };
    },
  });

  navigator.modelContext.registerTool({
    name: "search_videos",
    description: "Search Piotr's YouTube videos by keyword. Returns title, video URL, date, and description.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search term to match in title or description" },
      },
    },
    execute: async ({ query }) => {
      let results = videos.filter(v =>
        matchesAny([v.title, v.description], query)
      );
      const summary = results.map(v => ({
        title: v.title,
        url: `https://www.youtube.com/watch?v=${v.videoId}`,
        date: v.date,
        description: v.description,
      }));
      return { content: [{ type: "text", text: JSON.stringify({ count: summary.length, videos: summary }) }] };
    },
  });

  navigator.modelContext.registerTool({
    name: "get_site_info",
    description: "Get an overview of Cloud Rumble: who Piotr is, what content is available, counts of talks/projects/blogs/videos, and navigation links.",
    inputSchema: { type: "object", properties: {} },
    execute: async () => {
      const info = {
        site: "Cloud Rumble",
        author: "Piotr Zaniewski",
        description: "IT certifications, Kubernetes, cloud native, platform engineering. Conference speaker, open source contributor, DevOps engineer at Loft Labs.",
        content: {
          talks: talks.length,
          projects: projects.length,
          blogs: blogs.length,
          videos: videos.length,
        },
        links: {
          talks: "/talks",
          projects: "/projects",
          blog: "/blog",
          videos: "/youtube",
          github: "https://github.com/Piotr1215",
          youtube: "https://www.youtube.com/channel/UCkWVN7H3JqGtJ5Pv5bvCrAw",
        },
        availableTools: ["search_talks", "search_projects", "search_blogs", "search_videos"],
      };
      return { content: [{ type: "text", text: JSON.stringify(info) }] };
    },
  });

  console.log('[WebMCP] Registered 5 tools: search_talks, search_projects, search_blogs, search_videos, get_site_info');
}

registerTools();
