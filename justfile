# Justfile for CloudRumble blog operations

# List all available recipes
default:
    @just --list

# Process blog mermaid diagrams (convert to PNG)
blog-diagrams:
    #!/usr/bin/env bash
    set -euo pipefail
    blog_file=$(fd -e md -e mdx . blog/ | fzf --prompt="Select blog file: " --height=20 --reverse)
    if [ -n "$blog_file" ]; then
        python3 scripts/__process_blog_mermaid.py "$blog_file"
    fi

# Process blog diagrams and start ngrok tunnel
blog-serve:
    #!/usr/bin/env bash
    set -euo pipefail

    # Check if dev server is running
    if ! nc -z localhost 3000 2>/dev/null; then
        echo "Error: Dev server is not running on port 3000"
        echo "Start it first with: npm run start"
        exit 1
    fi

    blog_file=$(fd -e md -e mdx . blog/ | fzf --prompt="Select blog file: " --height=20 --reverse)
    if [ -n "$blog_file" ]; then
        python3 scripts/__process_blog_mermaid.py "$blog_file" --serve
    fi

# Process specific blog file with diagrams
blog-process FILE:
    python3 scripts/__process_blog_mermaid.py {{FILE}}

# Process specific blog file with serve
blog-process-serve FILE:
    python3 scripts/__process_blog_mermaid.py {{FILE}} --serve

# Start development server
dev:
    npm run start

# Build the site
build:
    npm run build

# Serve built site
serve:
    npm run serve

# List all blog posts
blog-list:
    @fd -e md -e mdx . blog/ --exec basename {} | sort

# Regenerate PNG diagrams from .mmd files
diagrams-regen SCALE="3":
    python3 scripts/__regenerate_diagrams.py blog/_media/diagrams {{SCALE}}

# Regenerate diagrams for specific blog directory
diagrams-regen-blog:
    #!/usr/bin/env bash
    set -euo pipefail
    blog_dir=$(fd -t d . blog/ | fzf --prompt="Select blog directory: " --height=20 --reverse)
    if [ -n "$blog_dir" ]; then
        diagrams_path="${blog_dir}/_media/diagrams"
        if [ -d "$diagrams_path" ]; then
            python3 scripts/__regenerate_diagrams.py "$diagrams_path" 3
        else
            echo "No diagrams directory found at: $diagrams_path"
        fi
    fi
