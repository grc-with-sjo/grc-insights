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
