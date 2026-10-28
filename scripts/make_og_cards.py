"""Generate every link-preview card (1200x630) in the Mix 1 style.

Usage: python3 scripts/make_og_cards.py
Writes assets/og-v2/<issue-stem>.png for each issue plus home.png, about.png and radar.png, and points
each issue's front-matter `image:` at its card. Re-run after adding or retitling an issue.
"""
import re
from datetime import date
from pathlib import Path

from cards_style import AMBER, SOFT, TEXT_W, canvas, chips, footer, kicker, sans, serif, wrap_title

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "og-v2"
AUTHOR = "Surabhi Joshi · GRC & AI Governance Practitioner · Vancouver, BC"
SERIES = {"field-notes": "Field Notes", "catch-up": "Catch-up series", "monthly": "Monthly", "weekly": "Weekly",
          "feature": "Feature", "flash": "Flash"}
AREAS = {"ai-governance": "AI governance", "privacy-law": "Privacy", "enforcement": "Enforcement",
         "frameworks": "Frameworks", "third-party-risk": "Third-party risk", "cybersecurity": "Cybersecurity",
         "practitioner": "Practitioner"}


def front_matter(path):
    text = path.read_text(encoding="utf-8")
    fm = re.match(r"^---\n(.*?)\n---\n", text, re.S).group(1)
    get = lambda k: (re.search(rf'^{k}: "?(.*?)"?$', fm, re.M) or [None, ""])[1]
    cats = re.search(r"^categories: \[(.*)\]$", fm, re.M)
    return text, fm, get, [c.strip() for c in cats.group(1).split(",")] if cats else []


def save(img, name):
    OUT.mkdir(parents=True, exist_ok=True)
    img.save(OUT / name, optimize=True)
    return OUT / name


def issue_card(path):
    text, fm, get, cats = front_matter(path)
    img, draw = canvas()
    d = date.fromisoformat(get("date"))
    when = d.strftime("%B %Y") if get("series") == "field-notes" else f"{d.day} {d.strftime('%B %Y')}"
    num = get("issue")
    label = SERIES.get(get("series"), get("series")) + (f" · Issue {num}" if num and num != "0" else "")
    kicker(draw, f"GRC Insights · {label} · {when}")
    fnt, lines = wrap_title(draw, get("title"), TEXT_W)
    y = 136
    for line in lines:
        draw.text((80, y), line, font=fnt, fill="white")
        y += int(fnt.size * 1.18)
    chips(draw, [AREAS.get(c, c) for c in cats][:3], max(y + 24, 400))
    footer(draw, AUTHOR)
    out = save(img, f"{path.stem}.png")
    new_line = f"image: /assets/og-v2/{path.stem}.png"
    current = re.search(r"^image:\s*(\S+)\s*$", fm, re.M)
    if current is None:
        new_fm = fm + "\n" + new_line
    elif re.match(r"/assets/og(-v2)?/", current.group(1)):  # generated card (old or current folder)
        new_fm = fm.replace(current.group(0), new_line, 1)
    else:  # a hand-picked image: leave it alone
        new_fm = fm
    if new_fm != fm:
        path.write_text(text.replace(fm, new_fm, 1), encoding="utf-8")
    return out


def page_card(name, kick, title, lines, chip_labels, foot):
    img, draw = canvas()
    kicker(draw, kick)
    draw.text((80, 136), title, font=serif(84), fill="white")
    y = 262
    for line in lines:
        draw.text((80, y), line, font=sans(32), fill=SOFT)
        y += 44
    chips(draw, chip_labels, max(y + 26, 400))
    footer(draw, foot)
    return save(img, name)


if __name__ == "__main__":
    for issue in sorted((ROOT / "_issues").glob("*.*")):
        print(issue_card(issue))
    print(page_card("home.png", "Digital trust, decoded", "GRC Insights",
                    ["Where AI, privacy and cyber", "risk meet practice."],
                    ["AI governance", "Privacy", "Cybersecurity"], AUTHOR))
    print(page_card("about.png", "GRC Insights · About", "Surabhi Joshi",
                    ["GRC & AI Governance Practitioner", "Independent field notes."],
                    ["AI governance", "Privacy", "Cybersecurity"], "Vancouver, BC · Views are my own"))
    print(page_card("radar.png", "GRC Insights · Free public tracker", "Regulation Radar",
                    ["AI, privacy and cybersecurity laws and", "standards, each linked to its source."],
                    ["Canada", "US", "EU", "UK", "APAC", "India"], "Surabhi Joshi · Vancouver, BC"))
