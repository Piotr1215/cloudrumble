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

# Generate hero banner from HTML to PNG
hero-banner HTML_FILE OUTPUT_FILE:
    npx playwright screenshot --wait-for-timeout 2000 --full-page --viewport-size 1920,1080 {{HTML_FILE}} {{OUTPUT_FILE}}

# List pending guestbook submissions from Netlify
guestbook-list:
    #!/usr/bin/env bash
    set -euo pipefail
    TOKEN=$(echo "$NETLIFY_CLOUDRUMBLE_GUESTBOOK" | tr -d '\n')
    SITE_ID="46affbd2-980c-49c3-89f2-fc74edfa84c4"

    submissions=$(curl -s -H "Authorization: Bearer $TOKEN" \
        "https://api.netlify.com/api/v1/sites/$SITE_ID/submissions")

    count=$(echo "$submissions" | jq length)
    if [ "$count" -eq 0 ]; then
        echo "No pending submissions"
        exit 0
    fi

    echo "=== Pending Guestbook Submissions ==="
    echo "$submissions" | jq -r '.[] | "[\(.id)] \(.data.name) - \"\(.data.message)\" (\(.created_at | split("T")[0]))"'

# Approve a guestbook submission by ID
guestbook-approve ID:
    #!/usr/bin/env bash
    set -euo pipefail
    TOKEN=$(echo "$NETLIFY_CLOUDRUMBLE_GUESTBOOK" | tr -d '\n')
    SITE_ID="46affbd2-980c-49c3-89f2-fc74edfa84c4"
    JSON_FILE="src/data/guestbook.json"

    # Fetch the submission
    submission=$(curl -s -H "Authorization: Bearer $TOKEN" \
        "https://api.netlify.com/api/v1/sites/$SITE_ID/submissions" | \
        jq -r '.[] | select(.id == "{{ID}}")')

    if [ -z "$submission" ]; then
        echo "Submission {{ID}} not found"
        exit 1
    fi

    name=$(echo "$submission" | jq -r '.data.name')
    message=$(echo "$submission" | jq -r '.data.message')
    date=$(echo "$submission" | jq -r '.created_at | split("T")[0]')

    echo "Approving: $name - \"$message\""

    # Get next ID
    next_id=$(jq '[.[].id] | max + 1' "$JSON_FILE")

    # Add to JSON
    jq --arg name "$name" \
       --arg msg "$message" \
       --arg date "$date" \
       --argjson id "$next_id" \
       '. += [{"id": $id, "name": $name, "message": $msg, "date": $date, "approved": true}]' \
       "$JSON_FILE" > "$JSON_FILE.tmp" && mv "$JSON_FILE.tmp" "$JSON_FILE"

    # Delete from Netlify
    curl -s -X DELETE -H "Authorization: Bearer $TOKEN" \
        "https://api.netlify.com/api/v1/submissions/{{ID}}" > /dev/null

    echo "Added to guestbook.json and deleted from Netlify"
