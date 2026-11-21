"""
Image pipeline for the portfolio.

1. Save your generated / photographed images into  public/images/_incoming/
   using the file names listed in docs/IMAGE_PROMPTS.md (any of .jpg .jpeg .png .webp).
2. Run:   python scripts/optimize_images.py
3. Optimised WebP files are written to their final paths (resized, compressed, EXIF/GPS stripped).

Requires Pillow:  pip install pillow
"""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent / 'public' / 'images'
INCOMING = ROOT / '_incoming'

# name -> (output path relative to public/images, max width, quality)
TARGETS = {
    'hero-bg': ('hero/hero-bg.webp', 2560, 82),
    'contact-bg': ('hero/contact-bg.webp', 2400, 78),
    'expertise-occupational': ('expertise/occupational.webp', 1800, 82),
    'expertise-fire': ('expertise/fire.webp', 1800, 82),
    'expertise-environment': ('expertise/environment.webp', 1800, 82),
    'expertise-systems': ('expertise/systems.webp', 1800, 82),
    'activity-campaign': ('activities/campaign.webp', 1400, 80),
    'activity-toolbox': ('activities/toolbox.webp', 1400, 80),
    'activity-inspection': ('activities/inspection.webp', 1400, 80),
    'activity-training': ('activities/training.webp', 1400, 80),
    'activity-fire': ('activities/fire.webp', 1400, 80),
    'activity-5s': ('activities/5s.webp', 1400, 80),
    'activity-documentation': ('activities/documentation.webp', 1400, 80),
    'activity-environment': ('activities/environment.webp', 1400, 80),
}


def main():
    if not INCOMING.exists():
        INCOMING.mkdir(parents=True)
        print(f'Created {INCOMING} - put your images there and run again.')
        return
    done = 0
    for f in sorted(INCOMING.iterdir()):
        if f.suffix.lower() not in {'.jpg', '.jpeg', '.png', '.webp'}:
            continue
        key = f.stem.lower()
        if key not in TARGETS:
            print(f'  skip {f.name} (unknown name - see docs/IMAGE_PROMPTS.md)')
            continue
        rel, max_w, q = TARGETS[key]
        out = ROOT / rel
        out.parent.mkdir(parents=True, exist_ok=True)
        im = ImageOps.exif_transpose(Image.open(f)).convert('RGB')  # drops EXIF/GPS metadata
        if im.width > max_w:
            im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
        im.save(out, 'WEBP', quality=q, method=6)
        print(f'  OK {f.name:32s} -> images/{rel}  ({im.width}x{im.height}, {out.stat().st_size // 1024} KB)')
        done += 1
    print(f'{done} image(s) optimised.')


if __name__ == '__main__':
    main()
