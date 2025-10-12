#!/usr/bin/env python3
"""
Process Docusaurus blog files to extract and render Mermaid diagrams.
Converts mermaid code blocks to PNG images and updates markdown links.
Optionally starts development server and ngrok tunnel for preview.
"""

import os
import re
import sys
import subprocess
import json
import urllib.request
import urllib.error
import time
from pathlib import Path


def slugify(text):
    """Convert text to a valid filename slug."""
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text[:50]


def extract_mermaid_diagrams(file_path):
    """Extract all mermaid diagrams from a markdown/mdx file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    print(f"\nProcessing: {file_path}")

    lines = content.split('\n')
    diagrams = []
    current_heading = "diagram"
    in_mermaid = False
    mermaid_content = []
    diagram_counter = 1

    for line in lines:
        # Track headings for context
        if line.startswith('#'):
            current_heading = line.lstrip('#').strip()

        # Detect mermaid block start
        if line.strip().startswith('```mermaid'):
            in_mermaid = True
            mermaid_content = []
            continue

        # Collect mermaid content
        if in_mermaid:
            if line.strip().startswith('```'):
                in_mermaid = False

                # Create diagram name from heading
                slug = slugify(current_heading)
                if not slug:
                    slug = f"diagram-{diagram_counter}"

                diagram_name = f"{diagram_counter:02d}-{slug}"
                diagram_counter += 1

                diagrams.append({
                    'name': diagram_name,
                    'heading': current_heading,
                    'content': '\n'.join(mermaid_content)
                })
                print(f"  Found diagram: {diagram_name} ({current_heading})")
            else:
                mermaid_content.append(line)

    return diagrams


def render_diagrams(diagrams, output_dir):
    """Save mermaid files and render them to PNG."""
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    print(f"\nOutput directory: {output_dir}")
    print(f"Rendering {len(diagrams)} diagrams...\n")

    success_count = 0

    for diagram in diagrams:
        mmd_file = output_path / f"{diagram['name']}.mmd"
        png_file = output_path / f"{diagram['name']}.png"

        # Save .mmd file
        with open(mmd_file, 'w', encoding='utf-8') as f:
            f.write(diagram['content'])

        print(f"  {diagram['name']}")
        print(f"    {diagram['heading']}")

        # Render with mmdc with 3x scale and 1600px width for crisp diagrams
        try:
            result = subprocess.run([
                'mmdc',
                '-i', str(mmd_file),
                '-o', str(png_file),
                '-b', 'transparent',
                '-t', 'dark',
                '-s', '3',
                '-w', '1600'
            ], capture_output=True, text=True, timeout=30)

            if result.returncode == 0 and png_file.exists():
                size_kb = png_file.stat().st_size / 1024
                print(f"    Rendered: {png_file.name} ({size_kb:.1f} KB)")
                success_count += 1
            else:
                print(f"    Failed to render")
                if result.stderr:
                    print(f"    Error: {result.stderr[:100]}")
        except subprocess.TimeoutExpired:
            print(f"    Timeout rendering diagram")
        except FileNotFoundError:
            print(f"    mmdc not found - install with: npm install -g @mermaid-js/mermaid-cli")
            return success_count
        except Exception as e:
            print(f"    Error: {e}")

    print(f"\nSuccessfully rendered {success_count}/{len(diagrams)} diagrams")
    print(f"Output: {output_dir}")

    return success_count


def convert_blog_to_images(blog_file, diagrams, output_dir):
    """Convert blog markdown to use image links instead of mermaid blocks."""
    with open(blog_file, 'r', encoding='utf-8') as f:
        content = f.read()

    print(f"\nConverting mermaid blocks to image links...")

    # Calculate relative path from blog file to diagrams
    blog_dir = os.path.dirname(blog_file)
    rel_path = os.path.relpath(output_dir, blog_dir)

    # Replace mermaid blocks with image links
    diagram_index = 0
    def replace_mermaid(match):
        nonlocal diagram_index
        if diagram_index < len(diagrams):
            diagram = diagrams[diagram_index]
            diagram_index += 1
            return f"![{diagram['heading']}]({rel_path}/{diagram['name']}.png)"
        return match.group(0)

    content = re.sub(
        r'```mermaid.*?```',
        replace_mermaid,
        content,
        flags=re.DOTALL
    )

    # Write back to original file
    with open(blog_file, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  Updated: {blog_file}")

    return blog_file


def start_ngrok_tunnel(port=3000):
    """Start ngrok tunnel and return the public URL."""
    print(f"\nStarting ngrok tunnel on port {port}...")

    try:
        # Start ngrok in background
        ngrok_process = subprocess.Popen(
            ['ngrok', 'http', str(port)],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )

        # Wait for ngrok to start
        time.sleep(3)

        # Get the public URL from ngrok API
        try:
            response = urllib.request.urlopen('http://localhost:4040/api/tunnels')
            data = json.loads(response.read())

            if data['tunnels']:
                public_url = data['tunnels'][0]['public_url']
                print(f"  Ngrok tunnel: {public_url}")
                return public_url, ngrok_process
            else:
                print(f"  No tunnels found")
                ngrok_process.kill()
                return None, None

        except urllib.error.URLError:
            print(f"  Could not connect to ngrok API")
            ngrok_process.kill()
            return None, None

    except FileNotFoundError:
        print(f"  Ngrok not found - install from: https://ngrok.com/download")
        return None, None


def parse_blog_metadata(blog_file):
    """Parse frontmatter to extract date and construct blog URL path."""
    with open(blog_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract date from frontmatter
    date_match = re.search(r'^date:\s*(\d{4}-\d{2}-\d{2})', content, re.MULTILINE)
    if not date_match:
        return None

    date_str = date_match.group(1)
    year, month, day = date_str.split('-')

    # Extract slug from filename
    filename = os.path.basename(blog_file)
    # Remove extension
    filename = filename.replace('.mdx', '').replace('.md', '')
    # Remove date prefix if present (e.g., "2025-10-10-post-name" -> "post-name")
    slug = re.sub(r'^\d{4}-\d{2}-\d{2}-', '', filename)

    # Construct URL path: /blog/YYYY/MM/DD/slug
    url_path = f"/blog/{year}/{month}/{day}/{slug}"

    return url_path


def check_dev_server_running():
    """Check if dev server is running on port 3000 by making HTTP request."""
    try:
        response = urllib.request.urlopen('http://localhost:3000', timeout=2)
        return response.status == 200
    except (urllib.error.URLError, urllib.error.HTTPError, OSError):
        return False


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 __process_blog_mermaid.py <blog-file.md> [options]")
        print("\nOptions:")
        print("  --output-dir <dir>    Custom output directory for diagrams (default: _media/diagrams/)")
        print("  --serve               Start ngrok tunnel (requires dev server running on port 3000)")
        print("\nExamples:")
        print("  python3 __process_blog_mermaid.py blog/my-post.md")
        print("  python3 __process_blog_mermaid.py blog/my-post.mdx --serve")
        print("  python3 __process_blog_mermaid.py blog/my-post.md --output-dir blog/_media/custom")
        print("\nNote: If using --serve, start the dev server first with: npm run start")
        sys.exit(1)

    blog_file = sys.argv[1]

    if not os.path.exists(blog_file):
        print(f"Error: File not found: {blog_file}")
        sys.exit(1)

    # Parse command line options
    serve = False
    output_dir = None

    i = 2
    while i < len(sys.argv):
        arg = sys.argv[i]
        if arg == '--serve':
            serve = True
            i += 1
        elif arg == '--output-dir':
            if i + 1 < len(sys.argv):
                output_dir = sys.argv[i + 1]
                i += 2
            else:
                print("Error: --output-dir requires a directory argument")
                sys.exit(1)
        else:
            print(f"Error: Unknown option: {arg}")
            sys.exit(1)

    # Default output directory
    if output_dir is None:
        blog_dir = os.path.dirname(os.path.abspath(blog_file))
        output_dir = os.path.join(blog_dir, '_media', 'diagrams')

    # Extract diagrams
    diagrams = extract_mermaid_diagrams(blog_file)

    if not diagrams:
        print("\nNo mermaid diagrams found")
        sys.exit(0)

    # Render diagrams
    success_count = render_diagrams(diagrams, output_dir)

    if success_count == 0:
        print("\nFailed to render any diagrams")
        sys.exit(1)

    # Convert blog file (replaces mermaid blocks with image links)
    convert_blog_to_images(blog_file, diagrams, output_dir)

    # Start ngrok if requested
    if serve:
        # Check if dev server is running
        if not check_dev_server_running():
            print("\nError: Dev server is not running on port 3000")
            print("Please start it first with: npm run start")
            sys.exit(1)

        print("\nDev server detected on port 3000")

        # Start ngrok tunnel
        ngrok_url, ngrok_process = start_ngrok_tunnel(3000)
        if not ngrok_url:
            print("\nFailed to start ngrok tunnel")
            sys.exit(1)

        # Parse blog metadata to get correct URL
        blog_url_path = parse_blog_metadata(blog_file)
        if not blog_url_path:
            print("\nWarning: Could not parse blog date from frontmatter")
            blog_name = os.path.basename(blog_file).replace('.mdx', '').replace('.md', '')
            blog_url_path = f"/blog/{blog_name}"

        print(f"\nServer ready!")
        print(f"Local URL: http://localhost:3000{blog_url_path}")
        print(f"Public URL: {ngrok_url}{blog_url_path}")
        print(f"\nNgrok tunnel running (PID: {ngrok_process.pid})")
        print(f"\nTo stop ngrok:")
        print(f"  kill {ngrok_process.pid}")


if __name__ == '__main__':
    main()
