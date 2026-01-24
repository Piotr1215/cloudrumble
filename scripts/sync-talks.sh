#!/usr/bin/env bash
set -eo pipefail

# Sync talks from talks-tracker DuckDB to cloudrumble JSON
# Source: ../talks-tracker/data/talks.duckdb
# Output: src/data/talks.json

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
DUCKDB_PATH="${TALKS_DB:-$PROJECT_DIR/../talks-tracker/data/talks.duckdb}"
OUTPUT_PATH="$PROJECT_DIR/src/data/talks.json"

if [[ ! -f "$DUCKDB_PATH" ]]; then
  echo "Error: DuckDB file not found at $DUCKDB_PATH" >&2
  echo "Set TALKS_DB env var or ensure talks-tracker/data/talks.duckdb exists" >&2
  exit 1
fi

# Query all public talks (include status for UI filtering)
duckdb "$DUCKDB_PATH" -json -c "
SELECT
  title,
  abstract_text as description,
  date,
  conference,
  tags,
  recording_url as recordingUrl,
  conference_url as conferenceUrl,
  slides_url as slidesUrl,
  workshop_url as workshopUrl,
  type,
  status,
  CASE
    WHEN length(date) = 10 AND date >= strftime(current_date, '%Y-%m-%d') THEN true
    WHEN length(date) = 7 AND date >= strftime(current_date, '%Y-%m') THEN true
    ELSE false
  END as upcoming
FROM talks
WHERE status != 'rejected'
ORDER BY date DESC NULLS LAST;
" > "$OUTPUT_PATH"

echo "Synced talks to $OUTPUT_PATH"
