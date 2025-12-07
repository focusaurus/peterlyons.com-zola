#!/usr/bin/env bash
set -euo pipefail

# Remove slug lines from frontmatter in all blog post index.md files
find content/problog -name "index.md" -type f | while read -r file; do
  # Use sed to delete lines that match the slug pattern
  sed -i '/^slug = /d' "$file"
  echo "Processed: $file"
done

echo "Done! Removed slug lines from all blog posts."
