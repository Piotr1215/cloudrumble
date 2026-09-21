---
name: create-image
description: >-
  Generate an image from a text prompt and save it as a PNG at a target path,
  using the OpenAI images API (gpt-image-1). Use whenever the user wants to
  create, generate, or make an image, illustration, hero image, banner, cover,
  thumbnail, or diagram-style picture and save it to a file. Trigger on "generate
  an image", "make a hero image", "create a banner", "image for this blog post",
  "render an illustration", or a prompt plus an output path. The blog-writer skill
  calls this for the hero-image step. Sends the prompt to OpenAI (external call).
license: MIT
metadata:
  category: media
---

# Role
Turn a text prompt into a saved PNG. One prompt in, one image file out at the path the caller names.

# Requires
- `OPENAI_API_KEY` in the environment (this machine has it set). No other keys needed.
- `python3` (standard library only, no pip installs).
- Network access. The prompt is sent to OpenAI, so do not put secrets in it.

# Process
Run the bundled script from this skill's directory. It calls the OpenAI images endpoint, decodes the returned base64, and writes the PNG.

```bash
python3 scripts/__generate_image.py \
  --prompt "PROMPT TEXT" \
  --out path/to/image.png \
  --size 1536x1024
```

If the working directory is elsewhere, use the script's absolute path instead. The script creates parent directories as needed and prints a JSON line with the saved path and byte size on success.

# Arguments
- `--prompt` (required): what to draw. Be concrete about subject, style, mood, and composition.
- `--out` (required): output file path. Use `.png`.
- `--size` (default `1536x1024`): `1536x1024` landscape, `1024x1536` portrait, `1024x1024` square, or `auto`.
- `--quality` (default `auto`): `low`, `medium`, `high`, or `auto`. Higher costs more and takes longer.
- `--model` (default `gpt-image-1`).

# Writing the prompt
- Name the subject, the visual style (flat vector, isometric, photographic, blueprint), and the palette.
- State composition for hero images: wide landscape, clear focal point, room for a title overlay, no text baked into the image (model text rendering is unreliable).
- One scene per call. For variations, change the prompt and call again.

# Output
A PNG at `--out`. The script prints `{"path": ..., "bytes": ..., "size": ...}`. Report the path back; do not paste the base64.

# Blog hero usage
For a CloudRumble post, generate a 1536x1024 landscape hero into `blog/_media/<slug>-hero.png`, then set that path in the post frontmatter `image:` field. Match the post's topic and the CloudRumble style: explanatory and clean, no clickbait imagery, no baked-in text.

**Example:**
```bash
python3 scripts/__generate_image.py \
  --prompt "Flat isometric illustration of two isolated workspaces on one laptop, cool blue and slate palette, clean vector style, wide landscape, space for a title overlay, no text" \
  --out blog/_media/account-isolation-hero.png \
  --size 1536x1024 --quality high
```

# Failure modes
- Missing `OPENAI_API_KEY`: the script exits with a clear message. Export the key, do not hardcode it.
- API or network error: the script prints the OpenAI error message and exits non-zero. Surface it; do not retry blindly on a 4xx (the prompt or request is the problem).
- Empty response: reported as an error. Retry once; if it persists, simplify the prompt.
