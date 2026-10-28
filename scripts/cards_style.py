"""Shared Mix 1 style for link-preview cards (spec 2026-10-28 §8): ink background, amber + ink
diamond brand band on the right, serif headline, teal chips."""
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
CANVAS, INK, MUTED_INK, TEAL, AMBER, LABEL = "#FBFAF7", "#13202B", "#24384A", "#0E4A57", "#F2B544", "#B7791F"
SOFT, DIM = (226, 232, 240), (176, 190, 200)
SERIF = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"  # closest installed serif to Fraunces
SANS = "/System/Library/Fonts/Helvetica.ttc"
BAND_X = 960  # brand pattern occupies x >= BAND_X
TEXT_W = BAND_X - 80 - 60


def sans(size, bold=False):
    return ImageFont.truetype(SANS, size, index=1 if bold else 0)


def serif(size):
    return ImageFont.truetype(SERIF, size)


def canvas():
    """Ink card with the brand band on the right: the same 135deg amber/ink tile as the site's CSS
    (amber 0-25%, ink 25-50%, #24384A 50-75%, ink 75-100%, 84px tile)."""
    img = Image.new("RGB", (W, H), INK)
    band = Image.new("RGB", (W - BAND_X, H), INK)
    px, tile = band.load(), 84
    colours = [AMBER, INK, MUTED_INK, INK]
    rgb = [Image.new("RGB", (1, 1), c).getpixel((0, 0)) for c in colours]
    for y in range(H):
        for x in range(W - BAND_X):
            t = ((x % tile) + (y % tile)) / (2 * tile)
            px[x, y] = rgb[min(int(t * 4), 3)]
    img.paste(band, (BAND_X, 0))
    draw = ImageDraw.Draw(img)
    draw.rectangle([BAND_X - 6, 0, BAND_X - 1, H], fill=AMBER)
    return img, draw


def wrap_title(draw, text, max_width, sizes=(66, 58, 52, 46), max_lines=3):
    """Largest serif size whose wrap fits in max_lines; the last line is ellipsised if still too long."""
    for size in sizes:
        fnt = serif(size)
        lines, line = [], ""
        for word in text.split():
            trial = f"{line} {word}".strip()
            if draw.textlength(trial, font=fnt) <= max_width:
                line = trial
            else:
                lines.append(line)
                line = word
        lines.append(line)
        if len(lines) <= max_lines:
            return fnt, lines
    lines = lines[:max_lines]
    while draw.textlength(lines[-1] + "…", font=fnt) > max_width and " " in lines[-1]:
        lines[-1] = lines[-1].rsplit(" ", 1)[0]
    lines[-1] += "…"
    return fnt, lines


def kicker(draw, text, y=82):
    draw.text((80, y), text.upper(), font=sans(24, bold=True), fill=AMBER)


def chips(draw, labels, y):
    fnt, x = sans(22, bold=True), 80
    for name in labels:
        w = draw.textlength(name, font=fnt) + 32
        if x + w > BAND_X - 40:
            break
        draw.rounded_rectangle([x, y, x + w, y + 42], radius=21, fill=TEAL)
        draw.text((x + 16, y + 9), name, font=fnt, fill="white")
        x += w + 10


def footer(draw, text):
    draw.text((80, 556), text, font=sans(24, bold=True), fill=DIM)
