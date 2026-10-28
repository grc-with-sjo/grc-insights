"""Link-preview card tests: run with `python3 -m unittest tests/test_cards.py` from the repo root."""
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))

from PIL import Image  # noqa: E402
from cards_style import canvas, wrap_title  # noqa: E402


class CardTests(unittest.TestCase):
    def test_long_title_wraps_to_three_lines_max(self):
        img, draw = canvas()
        font, lines = wrap_title(draw, "word " * 60, 1000)
        self.assertLessEqual(len(lines), 3)
        self.assertTrue(all(draw.textlength(line, font=font) <= 1000 for line in lines))

    def test_generated_cards_are_1200x630(self):
        cards = list((ROOT / "assets" / "og-v2").glob("*.png"))
        self.assertGreaterEqual(len(cards), 4)
        for p in cards:
            self.assertEqual(Image.open(p).size, (1200, 630), p.name)


if __name__ == "__main__":
    unittest.main()


class GeneratorTests(unittest.TestCase):
    def test_hand_picked_image_is_not_overwritten(self):
        import make_og_cards
        issue = ROOT / "_issues" / "2099-01-zz-generator-test.md"
        issue.write_text('---\ntitle: "Generator test"\nissue: 99\nseries: monthly\ndate: 2099-01-03\n'
                         'categories: [privacy-law]\nimage: /assets/custom/hand-picked.png\n---\nBody\n', encoding="utf-8")
        try:
            make_og_cards.issue_card(issue)
            self.assertIn("image: /assets/custom/hand-picked.png", issue.read_text(encoding="utf-8"))
        finally:
            issue.unlink()
            (ROOT / "assets" / "og-v2" / f"{issue.stem}.png").unlink(missing_ok=True)
