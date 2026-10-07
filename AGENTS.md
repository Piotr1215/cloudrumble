# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Build Commands
- Start development server: `npm run start`
- Build: `npm run build`
- Serve built site: `npm run serve`
- Docker build: `make build` or `docker build -t piotrzan/dcaguide .`
- Docker run: `docker run -itp 3000:3000 --name=docsify -v $(pwd):/docs piotrzan/dcaguide`

## Development Guide
- Clear cache: `npm run clear`
- Generate translations: `npm run write-translations`
- Generate heading IDs: `npm run write-heading-ids`

## Code Style
- Use React functional components with hooks
- Prefer Tailwind CSS for styling (configured in tailwind.config.js)
- Follow Docusaurus component conventions
- For PlantUML diagrams, follow guidelines in PLANTUML.md
- Place blog assets in blog/_media/
- Place documentation assets in docs/_media/

### Image Sizing and Embedding in Blog Posts

**Basic Setup:**
Place the hero image first (full width), then add CSS to size all subsequent images:

```jsx
import InfoCards from '@site/src/components/InfoCards';

![Hero Image](_media/hero-image.png)

<style>{`
  article img:not(:first-of-type) {
    max-width: 700px;
    height: auto;
  }
`}</style>
```

This ensures:
- First image (hero) renders at full width
- All other images are constrained to 700px max-width

**Embedding Images:**
Always use standard markdown syntax for images:

```markdown
![Description](_media/image-name.webp)
```

**Guidelines:**
- ✅ Use markdown syntax `![alt](_media/file.ext)` (best compatibility)
- ✅ Place images in `blog/_media/` for blog posts
- ✅ Use WebP format for photos/screenshots (better compression)
- ✅ Use PNG format for diagrams and illustrations with text
- ✅ Add CSS `<style>` block after imports to control sizing globally
- ✅ Default max-width: 700px for content images
- ❌ Do NOT use HTML `<img>` tags in blog posts (they don't render)
- ❌ Do NOT duplicate image formats (keep only one: WebP OR PNG)

**Image Quality:**
For crisp rendering at 700px display width:
- Mermaid diagrams: Generate at 4x scale (`-s 4`)
- Screenshots: Export at 2x resolution (1400px+ width)
- Photos: WebP format with quality 80-90

**Mermaid Diagrams:**
Diagrams are auto-processed and should also use markdown syntax:
```markdown
![Diagram Title](_media/diagrams/01-diagram-name.png)
```

See "Mermaid Diagram Workflow" section for diagram generation details.

## Project Structure
- /docs/ - Documentation content
- /blog/ - Blog posts
- /src/ - React components and custom code
- /src/data/talks.json - Conference talks data
- /static/ - Static assets
- /diagrams/ - PlantUML diagrams

## Adding Talks/Events

Talks are stored in `src/data/talks.json`. Add new entries at the top of the array.

**Required fields:**
```json
{
  "title": "Talk Title",
  "description": "Talk abstract/description",
  "date": "2026-02-16",
  "conference": "Conference Name",
  "tags": ["Kubernetes", "Platform Engineering"],
  "recordingUrl": null,
  "conferenceUrl": "https://...",
  "slidesUrl": null,
  "workshopUrl": null,
  "type": "talk",
  "status": "accepted",
  "upcoming": true
}
```

**Field values:**
- `type`: "talk", "workshop", or "keynote"
- `status`: "submitted", "accepted", or "completed"
- `upcoming`: true for future events, false for past
- `recordingUrl`/`slidesUrl`/`workshopUrl`: null until available

## Mermaid Diagram Workflow

### Processing Blog Diagrams
Convert mermaid code blocks in blog posts to PNG images:

```bash
# Interactive: Select blog with fzf
just blog-diagrams

# Or process specific file
python3 scripts/__process_blog_mermaid.py blog/my-post.mdx
```

**What it does:**
1. Extracts mermaid diagrams from blog markdown
2. Renders to PNG files in `blog/_media/diagrams/` (with 2x scale)
3. Saves source .mmd files alongside PNGs
4. Replaces mermaid code blocks with image links in the original file

### With Ngrok Tunnel
Process diagrams and start ngrok tunnel for preview:

```bash
# Start dev server first
npm run start

# Then process with serve option
just blog-serve
# or
python3 scripts/__process_blog_mermaid.py blog/my-post.mdx --serve
```

This will provide both local and public URLs for blog preview.

### Regenerating Diagrams
If you want to regenerate PNGs from existing .mmd files (e.g., to change scale):

```bash
# Regenerate all diagrams with default scale (2x)
just diagrams-regen

# Regenerate with custom scale
just diagrams-regen 3

# Or use the script directly
python3 scripts/__regenerate_diagrams.py blog/_media/diagrams 2
```

**Use cases:**
- Change rendering scale without re-extracting diagrams
- Update diagram theme or background
- Rebuild after updating mermaid-cli

### Files Created
For each mermaid diagram:
- `blog/_media/diagrams/01-diagram-name.mmd` - Source file (can be edited)
- `blog/_media/diagrams/01-diagram-name.png` - Rendered image (2x scale)

### Diagram Scale
Adjust scale with `--scale` parameter for crisp rendering:
- Scale 1: Original size
- Scale 2: 2x larger (default for auto-processing)
- Scale 3: 3x larger (for high-resolution displays)
- Scale 4: 4x larger (recommended for 700px display width - crisp rendering)

### Tweaking Individual Diagrams
For specific diagrams that need custom sizing (e.g., wide horizontal diagrams):

```bash
# Regenerate with custom width (useful for horizontal LR diagrams)
mmdc -i blog/_media/diagrams/02-syncer.mmd \
     -o blog/_media/diagrams/02-syncer.png \
     -b transparent -t dark -s 2 -w 2400

# Or with both width and height
mmdc -i diagram.mmd -o diagram.png \
     -b transparent -t dark -s 2 -w 2400 -H 1200
```

**Common parameters:**
- `-s` scale: Puppeteer scale factor (1, 2, 3)
- `-w` width: Page width in pixels (default: 800)
- `-H` height: Page height in pixels (default: 600)
- `-b` background: Background color (transparent, white, black)
- `-t` theme: Diagram theme (default, dark, forest, neutral)