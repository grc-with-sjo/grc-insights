"""Generate the default 1200x630 social preview image (assets/og-card.png)."""
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
TOP, BOTTOM = (15, 23, 42), (30, 27, 75)
FONT = "/System/Library/Fonts/Helvetica.ttc"


def gradient():
    img = Image.new("RGB", (W, H))
    draw = ImageDraw.Draw(img)
    for y in range(H):
        t = y / (H - 1)
        draw.line([(0, y), (W, y)], fill=tuple(round(a + (b - a) * t) for a, b in zip(TOP, BOTTOM)))
    return img


def main(out: Path):
    img = gradient()
    draw = ImageDraw.Draw(img)
    draw.ellipse([W - 260, -140, W + 140, 260], fill=(36, 38, 70))
    tag = ImageFont.truetype(FONT, 30, index=1)
    title = ImageFont.truetype(FONT, 96, index=1)
    body = ImageFont.truetype(FONT, 38)
    draw.text((80, 110), "DIGITAL TRUST, DECODED · AI, PRIVACY & CYBER", font=tag, fill=(253, 164, 175))
    draw.text((80, 170), "GRC Insights", font=title, fill=(255, 255, 255))
    draw.text((80, 300), "How AI, privacy and security are evolving,", font=body, fill=(226, 232, 240))
    draw.text((80, 350), "and how governance should adapt.", font=body, fill=(226, 232, 240))
    draw.text((80, 520), "Surabhi Joshi · GRC · Vancouver, BC", font=tag, fill=(203, 213, 225))
    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, optimize=True)


if __name__ == "__main__":
    main(Path(sys.argv[1] if len(sys.argv) > 1 else "assets/og-card.png"))
