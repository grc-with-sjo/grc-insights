"""Generate the 300x300 LinkedIn newsletter logo (assets/newsletter-logo.png), matching og-card.png."""
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

SIZE, SCALE = 300, 4  # draw at 4x, then downsample for clean edges
S = SIZE * SCALE
TOP, BOTTOM = (15, 23, 42), (30, 27, 75)
ROSE, CIRCLE, WHITE = (253, 164, 175), (36, 38, 70), (255, 255, 255)
FONT = "/System/Library/Fonts/Helvetica.ttc"


def gradient():
    img = Image.new("RGB", (S, S))
    draw = ImageDraw.Draw(img)
    for y in range(S):
        t = y / (S - 1)
        draw.line([(0, y), (S, y)], fill=tuple(round(a + (b - a) * t) for a, b in zip(TOP, BOTTOM)))
    return img


def centred(draw, y, text, font, fill, tracking=0):
    widths = [draw.textlength(c, font=font) for c in text]
    x = (S - sum(widths) - tracking * (len(text) - 1)) / 2
    for c, w in zip(text, widths):
        draw.text((x, y), c, font=font, fill=fill)
        x += w + tracking


def main(out: Path):
    img = gradient()
    draw = ImageDraw.Draw(img)
    draw.ellipse([S * 0.62, -S * 0.22, S * 1.22, S * 0.38], fill=CIRCLE)
    centred(draw, S * 0.25, "GRC", ImageFont.truetype(FONT, int(S * 0.33), index=1), WHITE)
    draw.rectangle([S * 0.36, S * 0.66, S * 0.64, S * 0.665 + SCALE * 2], fill=ROSE)
    centred(draw, S * 0.71, "INSIGHTS", ImageFont.truetype(FONT, int(S * 0.095), index=1), ROSE, tracking=S * 0.018)
    out.parent.mkdir(parents=True, exist_ok=True)
    img.resize((SIZE, SIZE), Image.LANCZOS).save(out, optimize=True)


if __name__ == "__main__":
    main(Path(sys.argv[1] if len(sys.argv) > 1 else "assets/newsletter-logo.png"))
