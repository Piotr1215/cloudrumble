#!/usr/bin/env python3
"""
Regenerate PNG images from existing .mmd files.
Useful when you want to change rendering options without re-extracting diagrams.
"""

import os
import sys
import subprocess
from pathlib import Path


def regenerate_diagrams(diagrams_dir, scale=2):
    """Regenerate PNG files from existing .mmd files."""
    diagrams_path = Path(diagrams_dir)

    if not diagrams_path.exists():
        print(f"Error: Directory not found: {diagrams_dir}")
        return 0

    mmd_files = list(diagrams_path.glob('*.mmd'))

    if not mmd_files:
        print(f"No .mmd files found in {diagrams_dir}")
        return 0

    print(f"\nFound {len(mmd_files)} .mmd files")
    print(f"Regenerating with scale: {scale}x\n")

    success_count = 0

    for mmd_file in sorted(mmd_files):
        png_file = mmd_file.with_suffix('.png')

        print(f"  {mmd_file.name}")

        try:
            result = subprocess.run([
                'mmdc',
                '-i', str(mmd_file),
                '-o', str(png_file),
                '-b', 'transparent',
                '-t', 'dark',
                '-s', str(scale),
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
            return 0
        except Exception as e:
            print(f"    Error: {e}")

    print(f"\nSuccessfully regenerated {success_count}/{len(mmd_files)} diagrams")
    return success_count


def regenerate_single_diagram(mmd_file, scale=2):
    """Regenerate a single diagram file."""
    mmd_path = Path(mmd_file)

    if not mmd_path.exists():
        print(f"Error: File not found: {mmd_file}")
        return False

    png_file = mmd_path.with_suffix('.png')

    print(f"\nRegenerating: {mmd_path.name}")
    print(f"Scale: {scale}x\n")

    try:
        result = subprocess.run([
            'mmdc',
            '-i', str(mmd_path),
            '-o', str(png_file),
            '-b', 'transparent',
            '-t', 'dark',
            '-s', str(scale),
            '-w', '1600'
        ], capture_output=True, text=True, timeout=30)

        if result.returncode == 0 and png_file.exists():
            size_kb = png_file.stat().st_size / 1024
            print(f"  Rendered: {png_file.name} ({size_kb:.1f} KB)")
            return True
        else:
            print(f"  Failed to render")
            if result.stderr:
                print(f"  Error: {result.stderr[:100]}")
            return False
    except subprocess.TimeoutExpired:
        print(f"  Timeout rendering diagram")
        return False
    except FileNotFoundError:
        print(f"  mmdc not found - install with: npm install -g @mermaid-js/mermaid-cli")
        return False
    except Exception as e:
        print(f"  Error: {e}")
        return False


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 __regenerate_diagrams.py <path> [scale]")
        print("\nArguments:")
        print("  path      Path to directory with .mmd files OR single .mmd file")
        print("  scale     Scale factor (default: 2)")
        print("\nExamples:")
        print("  # Regenerate all diagrams in directory")
        print("  python3 __regenerate_diagrams.py blog/_media/diagrams")
        print("  python3 __regenerate_diagrams.py blog/_media/diagrams 3")
        print("\n  # Regenerate single diagram")
        print("  python3 __regenerate_diagrams.py blog/_media/diagrams/02-syncer.mmd 3")
        sys.exit(1)

    path = sys.argv[1]
    scale = int(sys.argv[2]) if len(sys.argv) > 2 else 2

    if not os.path.exists(path):
        print(f"Error: Path not found: {path}")
        sys.exit(1)

    # Check if it's a file or directory
    if os.path.isfile(path):
        # Single file
        if not path.endswith('.mmd'):
            print(f"Error: File must be a .mmd file: {path}")
            sys.exit(1)
        success = regenerate_single_diagram(path, scale)
        sys.exit(0 if success else 1)
    else:
        # Directory
        success_count = regenerate_diagrams(path, scale)
        sys.exit(0 if success_count > 0 else 1)


if __name__ == '__main__':
    main()
