---
name: blog-writer
description: Write and revise CloudRumble technical blog posts with Piotr's voice, a reader's problem, the idea's evolution, purposeful visuals, and verified demos. Use for blog drafts, revisions, titles, and diagrams.
---

# Blog Writer

Help people understand an idea and try it. Explain why it matters and how it evolved through the author's experience and judgment. Keep the central idea visible.

## Reference Posts

Read [references/writing-style.md](references/writing-style.md) and Piotr's supplied examples before outlining. Read a relevant post of his when he supplies none. Match his approach to teaching, audience, transitions, and pictures. Adapt the structure without copying another post's sentences, palette, or characters.

Start with the reader's problem. State who the blog is for and what they will learn. Use a warm first-person account of the author's experience alongside direct address to the reader. Explain terms when they first matter. Use light humor where it fits.

Check the source repository and ask its owner when history or intent is unclear. Use only experiences the record supports. Never invent an anecdote or turn one shell workflow into a claim about all software history.

## Story

A technical explainer or tool introduction can follow this shape:

1. Introduction: the problem, audience, terms, and what the reader will learn. A promise such as "By the end of this blog" should match what the walkthrough delivers.
2. Evolution: the starting point, each improvement, and the problem that remained. Use numbered waves when the subject has a real progression, with a picture for each change.
3. Architecture: the roles and interactions that explain the idea. Use a component diagram with a short legend, or a sequence diagram when order matters.
4. Demo scenario: the flow, prerequisites, setup, ways to observe behavior, numbered examples with real output, and cleanup. Explain what each result lets the reader do.
5. Conclusion: the author's view, concrete benefits, and honest challenges or limits.

Keep enough architecture to explain the story. Link to technical docs for exhaustive mechanisms, evaluation tables, and reference lists. Keep useful source and inspiration links in the prose. Preserve explanation, transitions, and personality.

## Titles

Keep an approved title. When one is needed, use [headline-matrix](../headline-matrix/SKILL.md) and [references/blog-titles.md](references/blog-titles.md) for ideas. Treat their formulas as suggestions, then filter them against the post and the house voice. The title should name the topic and reader's problem. A count, urgency, teaser, or call to action is optional. Reject clickbait and claims the post cannot support.

## Voice

Write as you would speak to a competent colleague. Use short words, active voice, connected paragraphs, and varied sentence lengths. State the setup, audience, or task each claim applies to.

Cut marketing language, canned hooks, repeated "not X, not Y" contrasts, rhetorical tricolons, and unsupported aphorisms. Keep lists of parallel facts. Avoid spec-sheet compression, generic histories, and compulsory closing CTAs. Once Piotr approves the voice, correct factual problems without reopening the whole style.

## File Structure

Use the repo's frontmatter, hero, truncate marker, and image sizing conventions. Add component imports only when the post uses them.

```mdx
---
title: "The topic and reader's problem"
date: YYYY-MM-DD
draft: true
tags: ["development"]
image: _media/hero-image.png
description: "What the reader will learn"
---

![Hero description](_media/hero-image.png)

<style>{`article img:not(:first-of-type) { max-width: 700px; height: auto; }`}</style>

## Introduction

Introduce the problem and what the reader will learn.

<!--truncate-->
```

For Medium, prefer standard Markdown headings, paragraphs, lists, code, and images. Docusaurus widgets may not survive export. Inline the commands needed for a complete walkthrough, even when setup is routine; link to large manifests and unrelated boilerplate.

## Visuals

Plan pictures with the story. Each should explain a pain, an improvement, an interaction, or a result. Use pictures beyond the hero to explain an evolving idea.

Keep one cast with clear roles across a cartoon series. Use short speech and clear changes between scenes. Cute characters and humor can carry technical meaning. Choose an original palette that fits the post. Keep editable sources beside rendered assets.

Choose the renderer that fits the visual:

- Cartoon panels: inspect and reuse the HTML, CSS, and emoji workflow in `blog/_media/diagrams/panels/render.sh` when appropriate.
- Component and sequence diagrams: PlantUML can show roles, a legend, and the order of calls.
- Mermaid: use the existing processing workflow when it fits the diagram.

```bash
just blog-diagrams
python3 scripts/__process_blog_mermaid.py blog/my-post.mdx
```

Use Markdown images. Store the hero in `blog/_media/`, diagrams and panels in `blog/_media/diagrams/`, and screenshots as WebP where appropriate. Avoid a fixed node count or mandatory dark theme; choose clarity and a palette suited to the post.

Render the actual page at desktop and phone widths. Check every image, including lazy-loaded ones, and read its text at the displayed size. Link dense diagrams to full-size images with clear captions.

## Demos and Claims

For a runnable walkthrough, follow the published setup from a fresh clone in a clean environment. Check PATH, Git identity, versions, model setup, and working directories throughout, including cleanup. Test the whole sequence the reader will copy.

Save exact commands, stdout, stderr, meaningful exit codes, and wall times in an evidence file. Explain expected nonzero exits. Supply cleanup commands; remove shared models, caches, or tools only when authorized.

Scope timings to the input, question, hardware, versions, model load state, and index or cache state. Distinguish a warm model with an empty index from a cold model run. Label historical results read in docs separately from measurements rerun for the post.

Check prose and figure claims against structured runtime reports where available, such as classif's `-j`. Establish the route from runtime evidence, not from a diagram's labels. State evidence limits: search can miss a passage, and its answer does not establish that every part was read.

## Review and Medium

Review the rendered article as a whole. Check that readers can understand the problem, follow the evolution, learn from the pictures, and try the demo. Verify image targets, source links, commands, and claims. Use the existing production build to catch missing assets and compilation errors.

For an authorized Medium export, use the `publish-medium` skill. Image assets must be live at the URLs used by the exported HTML; deploy only within the user's authorization. After the final text and assets land, check the actual deployed post URL and image contents. Check non-image links for unresolved relative URLs.

Honor the requested handoff. For a clipboard export, load rich HTML as `text/html`, use the desktop session's display environment, and read back the payload after the copy command returns. The clipboard owner must remain alive to serve the selection. A successful converter exit or HTML printed in the terminal does not establish that the clipboard is ready.

## Development Commands

```bash
npm run start
just blog-diagrams
just blog-serve
just diagrams-regen
npm run build
```

## Resources

- [Writing style](references/writing-style.md): voice, reference posts, and lessons from the accepted classif rewrite.
- [Title ideas](references/blog-titles.md): a pattern bank to filter against the post's content and voice.
- [Headline matrix](../headline-matrix/SKILL.md): title brainstorming when needed.
