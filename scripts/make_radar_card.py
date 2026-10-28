"""Generate the Regulation Radar social preview image (assets/og-radar.png, 1200x630)."""
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
TOP, BOTTOM = (15, 23, 42), (30, 27, 75)
FONT = "/System/Library/Fonts/Helvetica.ttc"
PINK, WHITE, SOFT, MUTED = (253, 164, 175), (255, 255, 255), (226, 232, 240), (203, 213, 225)
REGIONS = ["Canada", "US", "EU", "UK", "APAC", "India"]


def gradient():
    img = Image.new("RGB", (W, H))
    draw = ImageDraw.Draw(img)
    for y in range(H):
        t = y / (H - 1)
        draw.line([(0, y), (W, y)], fill=tuple(round(a + (b - a) * t) for a, b in zip(TOP, BOTTOM)))
    return img


def radar(draw, cx, cy):
    for r in (60, 115, 170, 225):
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(60, 64, 110), width=2)
    draw.line([(cx - 225, cy), (cx + 225, cy)], fill=(60, 64, 110), width=2)
    draw.line([(cx, cy - 225), (cx, cy + 225)], fill=(60, 64, 110), width=2)
    for dx, dy in ((-90, -60), (60, -150), (150, 40), (-40, 110), (110, 170), (-170, 30)):
        draw.ellipse([cx + dx - 9, cy + dy - 9, cx + dx + 9, cy + dy + 9], fill=PINK)


def main(out: Path):
    img = gradient()
    draw = ImageDraw.Draw(img)
    radar(draw, 1075, 315)
    tag = ImageFont.truetype(FONT, 28, index=1)
    title = ImageFont.truetype(FONT, 92, index=1)
    body = ImageFont.truetype(FONT, 36)
    chip = ImageFont.truetype(FONT, 26, index=1)
    draw.text((80, 96), "GRC INSIGHTS · FREE PUBLIC TRACKER", font=tag, fill=PINK)
    draw.text((80, 150), "Regulation Radar", font=title, fill=WHITE)
    draw.text((80, 278), "AI, privacy and cybersecurity laws", font=body, fill=SOFT)
    draw.text((80, 324), "and standards, each linked to its source.", font=body, fill=SOFT)
    x = 80
    for name in REGIONS:
        w = draw.textlength(name, font=chip) + 36
        draw.rounded_rectangle([x, 400, x + w, 448], radius=24, outline=PINK, width=2)
        draw.text((x + 18, 410), name, font=chip, fill=WHITE)
        x += w + 12
    draw.text((80, 530), "Surabhi Joshi · Vancouver, BC", font=tag, fill=MUTED)
    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, optimize=True)


if __name__ == "__main__":
    main(Path(sys.argv[1] if len(sys.argv) > 1 else "assets/og-radar.png"))
