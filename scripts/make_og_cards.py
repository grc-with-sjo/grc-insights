"""Generate per-page social preview cards (1200x630) for every issue and the About page.

Usage: python3 scripts/make_og_cards.py
Writes assets/og/<issue-name>.png and assets/og/about.png, and adds `image: /assets/og/<name>.png`
to each issue's front matter if it has no `image:` yet. Re-run after adding or retitling an issue.
"""
import re
from datetime import date
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
W, H = 1200, 630
TOP, BOTTOM = (15, 23, 42), (30, 27, 75)
FONT = "/System/Library/Fonts/Helvetica.ttc"
PINK, WHITE, SOFT, MUTED, LINE = (253, 164, 175), (255, 255, 255), (226, 232, 240), (203, 213, 225), (60, 64, 110)
SERIES = {"field-notes": "Field Notes", "catch-up": "Catch-up series", "monthly": "Monthly", "weekly": "Weekly",
          "feature": "Feature", "flash": "Flash"}
AREAS = {"ai-governance": "AI governance", "privacy-law": "Privacy", "enforcement": "Enforcement",
         "frameworks": "Frameworks", "third-party-risk": "Third-party risk", "cybersecurity": "Cybersecurity",
         "practitioner": "Practitioner"}


def font(size, bold=False):
    return ImageFont.truetype(FONT, size, index=1 if bold else 0)


def canvas():
    img = Image.new("RGB", (W, H))
    draw = ImageDraw.Draw(img)
    for y in range(H):
        t = y / (H - 1)
        draw.line([(0, y), (W, y)], fill=tuple(round(a + (b - a) * t) for a, b in zip(TOP, BOTTOM)))
    for r in (120, 200, 280):
        draw.ellipse([W - 40 - r, -40 - r, W - 40 + r, -40 + r], outline=LINE, width=2)
    return img, draw


def wrap(draw, text, fnt, width):
    lines, line = [], ""
    for word in text.split():
        trial = f"{line} {word}".strip()
        if draw.textlength(trial, font=fnt) <= width:
            line = trial
        else:
            lines.append(line)
            line = word
    lines.append(line)
    return lines


def title_block(draw, text, top, width=1000):
    for size in (68, 60, 54, 48):
        fnt = font(size, bold=True)
        lines = wrap(draw, text, fnt, width)
        if len(lines) <= 3:
            break
    y = top
    for line in lines[:3]:
        draw.text((80, y), line, font=fnt, fill=WHITE)
        y += int(size * 1.15)
    return y


def chips(draw, labels, y):
    fnt, x = font(24, bold=True), 80
    for name in labels:
        w = draw.textlength(name, font=fnt) + 32
        draw.rounded_rectangle([x, y, x + w, y + 44], radius=22, outline=PINK, width=2)
        draw.text((x + 16, y + 9), name, font=fnt, fill=WHITE)
        x += w + 10


def footer(draw):
    draw.text((80, 548), "Surabhi Joshi · GRC & AI Governance Practitioner · Vancouver, BC", font=font(26, bold=True), fill=MUTED)


def front_matter(path):
    text = path.read_text(encoding="utf-8")
    fm = re.match(r"^---\n(.*?)\n---\n", text, re.S).group(1)
    get = lambda k: (re.search(rf'^{k}: "?(.*?)"?$', fm, re.M) or [None, ""])[1]
    cats = re.search(r"^categories: \[(.*)\]$", fm, re.M)
    return text, fm, get, [c.strip() for c in cats.group(1).split(",")] if cats else []


def issue_card(path):
    text, fm, get, cats = front_matter(path)
    img, draw = canvas()
    d = date.fromisoformat(get("date"))
    num = get("issue")
    kicker = f"GRC INSIGHTS · {SERIES.get(get('series'), get('series')).upper()}"
    if num and num != "0":
        kicker += f" · ISSUE {num}"
    when = d.strftime('%B %Y') if get('series') == 'field-notes' else f"{d.day} {d.strftime('%B %Y')}"
    kicker += f" · {when.upper()}"
    draw.text((80, 88), kicker, font=font(26, bold=True), fill=PINK)
    y = title_block(draw, get("title"), 140)
    chips(draw, [AREAS.get(c, c) for c in cats][:3], max(y + 26, 400))
    footer(draw)
    out = ROOT / "assets" / "og" / f"{path.stem}.png"
    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, optimize=True)
    if not re.search(r"^image:", fm, re.M):
        new_fm = fm + f"\nimage: /assets/og/{path.stem}.png"
        path.write_text(text.replace(fm, new_fm, 1), encoding="utf-8")
    return out


def about_card():
    img, draw = canvas()
    draw.text((80, 96), "GRC INSIGHTS · ABOUT", font=font(26, bold=True), fill=PINK)
    draw.text((80, 150), "Surabhi Joshi", font=font(92, bold=True), fill=WHITE)
    draw.text((80, 278), "GRC & AI Governance Practitioner", font=font(40), fill=SOFT)
    draw.text((80, 330), "Independent field notes on AI, privacy and cybersecurity.", font=font(32), fill=SOFT)
    chips(draw, ["AI governance", "Privacy", "Cybersecurity"], 410)
    draw.text((80, 548), "Vancouver, BC · Views are my own", font=font(26, bold=True), fill=MUTED)
    out = ROOT / "assets" / "og" / "about.png"
    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, optimize=True)
    return out


if __name__ == "__main__":
    for issue in sorted((ROOT / "_issues").glob("*.*")):
        print(issue_card(issue))
    print(about_card())
