#!/usr/bin/env python3
"""Generate an image with the OpenAI images API and save it to a path.

Sends the prompt to OpenAI (external network call). Requires OPENAI_API_KEY in
the environment. Uses gpt-image-1, which returns base64 PNG data that this
script decodes and writes to the output path. Standard library only, no pip deps.

Usage:
  __generate_image.py --prompt "..." --out path/to/image.png
  __generate_image.py --prompt "..." --out hero.png --size 1536x1024 --quality high

On success prints a single JSON line: {"path": "...", "bytes": N, "size": "..."}
On failure prints the error to stderr and exits non-zero.
"""
import argparse
import base64
import json
import os
import sys
import urllib.error
import urllib.request

API_URL = "https://api.openai.com/v1/images/generations"
# gpt-image-1 supported sizes. "auto" lets the model pick.
VALID_SIZES = {"1024x1024", "1536x1024", "1024x1536", "auto"}


def main() -> int:
    p = argparse.ArgumentParser(description="Generate an image via OpenAI and save it.")
    p.add_argument("--prompt", required=True, help="Text prompt describing the image.")
    p.add_argument("--out", required=True, help="Output file path (.png).")
    p.add_argument("--size", default="1536x1024",
                   help="1024x1024 | 1536x1024 (landscape) | 1024x1536 (portrait) | auto.")
    p.add_argument("--model", default="gpt-image-1", help="Image model.")
    p.add_argument("--quality", default="auto",
                   help="auto | low | medium | high (gpt-image-1).")
    args = p.parse_args()

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("error: OPENAI_API_KEY is not set in the environment", file=sys.stderr)
        return 1

    if args.size not in VALID_SIZES:
        print(f"error: --size {args.size!r} not in {sorted(VALID_SIZES)}", file=sys.stderr)
        return 1

    out_dir = os.path.dirname(os.path.abspath(args.out))
    os.makedirs(out_dir, exist_ok=True)

    body = json.dumps({
        "model": args.model,
        "prompt": args.prompt,
        "size": args.size,
        "quality": args.quality,
        "n": 1,
    }).encode("utf-8")

    req = urllib.request.Request(
        API_URL,
        data=body,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        # Image generation can take 10-60s; give it room.
        with urllib.request.urlopen(req, timeout=180) as resp:
            payload = json.load(resp)
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", "replace")
        try:
            detail = json.loads(detail).get("error", {}).get("message", detail)
        except json.JSONDecodeError:
            pass
        print(f"error: OpenAI API {e.code}: {detail}", file=sys.stderr)
        return 1
    except urllib.error.URLError as e:
        print(f"error: network failure reaching OpenAI: {e.reason}", file=sys.stderr)
        return 1

    data = payload.get("data") or []
    b64 = data[0].get("b64_json") if data else None
    if not b64:
        print(f"error: no image data in response: {json.dumps(payload)[:300]}", file=sys.stderr)
        return 1

    image_bytes = base64.b64decode(b64)
    with open(args.out, "wb") as fh:
        fh.write(image_bytes)

    print(json.dumps({"path": args.out, "bytes": len(image_bytes), "size": args.size}))
    return 0


if __name__ == "__main__":
    sys.exit(main())
