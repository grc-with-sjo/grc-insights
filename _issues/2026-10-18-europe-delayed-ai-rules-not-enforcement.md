---
title: "Europe delayed the AI rules, not the enforcement"
issue: 3
series: catch-up
date: 2026-10-14
calendar_date: 2026-10-18
regions: [EU, UK]
sectors: [tech, saas, banking, retail]
categories: [ai-governance, privacy-law, enforcement]
description: "The EU pushed its biggest AI Act deadlines to late 2027, but privacy regulators are already fining location tracking and, reportedly, automated decisions. Plan to the enforcement."
---

## In brief

- The EU moved the AI Act's main "high-risk" duties, for uses such as hiring and credit scoring, to December 2027. Two narrower AI rules still start on 2026-12-02.
- Privacy regulators did not wait: Ireland fined Google EUR 403M over location data, and the Dutch regulator reportedly fined Uber EUR 824.99M over drivers cut off by automated systems ⚠️ verify.
- In the UK, new rules on automated decisions have applied since February, and since June organisations must acknowledge data-protection complaints within 30 days.

## The story so far

Two EU laws matter most to a North American company with European customers. The General Data Protection Regulation (GDPR) is the EU's privacy law, enforced by national regulators who coordinate through the European Data Protection Board (EDPB). The AI Act (Regulation (EU) 2024/1689) is the EU's risk-based AI law, and its heaviest duties fall on "high-risk" systems.

In July the EU amended the AI Act through a package known as the AI Omnibus and pushed those duties back. A second package, the Digital Omnibus, would loosen parts of the GDPR, but it is still being negotiated. The UK, which runs its own version of the GDPR, has been phasing in reforms through the Data (Use and Access) Act 2025 (DUAA).

This issue argues that Europe delayed its new AI rules, not its enforcement of the old ones, and that your plan should follow the enforcement.

## What happened

### The AI Act's big deadline moved to 2027, but December 2026 still bites

The delay is real, but narrow. The AI Omnibus (Regulation (EU) 2026/1744) is the amending law, in force since 2026-07-27. It moves the high-risk duties for the uses listed in the Act's Annex III, such as hiring, education and credit scoring, to 2027-12-02. For AI built into products that are already regulated, listed in Annex I, the date is now 2028-08-02. [Source](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ:L_202601744)

Two things did not move. From 2026-12-02, generative AI systems placed on the market before 2026-08-02 must meet the Act's rule on marking AI-generated output (Article 50(2)). New prohibited practices also apply from that date.

General-purpose AI models, the large models other products build on, are the other live front. Secondary reporting says the European Commission's powers over their providers, including fines, became usable on 2026-08-02 ⚠️ verify. [WSGR](https://www.wsgrdataadvisor.com/2026/08/eu-ai-act-enforcement-phase-begins/) No enforcement action has surfaced, but the evidence is thin.

The delay buys time for hiring and credit models. It buys none for generative AI features.

**Takeaway:** Keep high-risk inventory work going, but put generative AI marking and the new prohibitions first for 2026-12-02.

**Open question:** When the Commission first uses its powers over general-purpose models, will it open with a fine or with dialogue?

### Privacy regulators are fining under the law they already have

While the AI deadlines moved, GDPR regulators used the law they already have. Ireland's Data Protection Commission (DPC), the national GDPR regulator, fined Google EUR 403M on 2026-09-21. The decision covers three location and activity settings, for processing between 2018 and 2020. The DPC found failures on lawfulness, transparency, retention and accountability, and gave Google six months to comply. [Source](https://www.dataprotection.ie/en/news-media/latest-news/data-protection-commission-fines-google-eu403-million-following-inquiry-googles-processing-location)

Article 22 of the GDPR restricts decisions made solely by automated means. Dutch press reports that the Netherlands' data protection authority, the Autoriteit Persoonsgegevens (AP), fined Uber EUR 824.99M under that rule and the GDPR's transparency rules, over driver accounts deactivated by a system alone ⚠️ verify. Uber has said it will appeal ⚠️ verify. [ioplus](https://www.ioplus.nl/nl/posts/uber-beboet-met-825-miljoen--wat-het-echt-betekent)

Neither case needed a new law. Nor is GDPR relief close. The member states have not yet agreed their position on the Digital Omnibus: a Council vote planned for early October was postponed after Germany and France pushed back ⚠️ verify. [Agence Europe](https://agenceurope.eu/en/bulletin/article/13954/5/vote-on-digital-omnibus-postponed-until-11-october-under-pressure-from-paris-and-berlin) I do not expect any GDPR change to apply in 2026.

**Takeaway:** Put automated decisions that cut people off, such as account deactivations, fraud flags and credit refusals, on your risk register with evidence of human review.

**Open question:** Where does a human "in the loop" end and a human who only confirms the system's answer begin?

### The UK's automated-decision rules are already live

The UK shows the same pattern, without even a delay. The DUAA amends the UK's data-protection and e-marketing laws. Most of its data-protection part, including the new rules on automated decisions, came into force on 2026-02-05. From 2026-06-19, organisations must acknowledge a data-protection complaint within 30 days and investigate it. [Source](https://legislation.gov.uk/uksi/2026/82)

The regulator is changing shape too. On 2026-09-30 the Information Commissioner's Office (ICO), the UK privacy regulator, became the Information Commission, run by a board, with existing investigations continuing ⚠️ verify. [Recordinglaw](https://www.recordinglaw.com/news/uk-information-commission-transfer-september-2026/) It is also stretched: complaints rose 81% to 76,743 in 2025-26, and only 27.4% were answered within 90 days ⚠️ verify. [Freevacy](https://www.freevacy.com/news/ico/ico-publishes-2025-26-annual-report/7587)

With the regulator this stretched, the new duty makes you the first line on complaints.

**Takeaway:** Treat the 30-day complaint acknowledgement as a live service level, run through one tracked queue.

**Open question:** Will a board-led Information Commission enforce more, or less, than a single commissioner did?

> **This week:** Research for 2026-10-04 to 2026-10-11 was incomplete, so treat the week as unknown, not quiet. The outcome of the postponed Council vote is not yet known ([Agence Europe](https://agenceurope.eu/en/bulletin/article/13954/5/vote-on-digital-omnibus-postponed-until-11-october-under-pressure-from-paris-and-berlin)).

## Where I land

Plan to the enforcement, not the delay. The AI Omnibus gave high-risk systems more time, and I would use it, not bank it. But it changed nothing about the GDPR, which is where the fines landed.

The two fines that stood out, one confirmed and one still reported ⚠️ verify, concern things many SaaS, banking and retail firms do every day: tracking location, and letting a system decide who keeps an account. Neither was about AI training data, and the research found no confirmed fine on that, so I would not let model-training worries crowd out the basics. In the UK, the automated-decision rules have applied since February.

So this quarter I would put three things ahead of Annex III readiness: an automated-decision register with the human reviewer named, a generative AI inventory checked against 2026-12-02, and a UK complaint process that acknowledges within 30 days.

I cannot point to a single enforcement action on general-purpose AI models. I read that as "not yet visible", not "not coming".

The trade-off I accept: spending on old-law controls while high-risk AI preparation slows. If the Commission moves fast, I will be behind on AI documentation. I would rather be behind on a deadline that moved than on a fine that already happened.

## The questions still open

- Whether the Digital Omnibus loosens the GDPR at all: Germany and France are pressing on trade secrets and a "low-risk controller" category.
- What counts as real human review: banks and retailers run automated decisions at a scale where reviewing each one is hard to evidence.
- When general-purpose AI enforcement becomes visible: no action has surfaced, and silence is hard to read.

## What to do this quarter

- List generative AI features offered in the EU before 2026-08-02, confirm output marking by 2026-12-02, and check them against the new prohibitions.
- Build an automated-decision register for EU and UK users: decision, effect, human reviewer, evidence.
- Review location and activity data for lawful basis, transparency and retention, using the Google findings as a checklist.
- If you anonymise data or scrape the web for AI, comment on the EDPB's July draft guidelines by 2026-10-30. [EDPB](https://www.edpb.europa.eu/news/edpb-sheds-light-on-anonymisation-and-web-scraping-for-generative-ai-and-adopts-final-version_en)

### If you work in…

| Sector | What it means | What to do |
|---|---|---|
| Tech | Generative AI marking and new prohibitions apply from 2026-12-02. | Inventory generative AI features sold in the EU. |
| Product / SaaS | The reported Uber fine concerns accounts deactivated by a system alone ⚠️ verify. | Check suspension and deactivation flows for real human review. |
| Banking / FinServ | AI Act credit-scoring duties wait to 2027-12-02; UK automated-decision rules apply now. | Document human review of credit and fraud decisions. |
| Retail | Location data drew the period's best-confirmed fine. | Review the location data you keep. |

## On the radar

- **2026-10-30**: EDPB draft guidelines on anonymisation and web scraping for generative AI: consultation closes ([Radar](/grc-insights/radar/#eu-gdpr))
- **2026-12-02**: EU AI Act: marking duty for older generative AI systems and new prohibitions apply ([Radar](/grc-insights/radar/#eu-ai-act))

## Sources

1. EUR-Lex: [Regulation (EU) 2026/1744 (AI Omnibus)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ:L_202601744)
2. WSGR (secondary): [EU AI Act enforcement phase begins](https://www.wsgrdataadvisor.com/2026/08/eu-ai-act-enforcement-phase-begins/)
3. Data Protection Commission: [DPC fines Google EUR 403 million](https://www.dataprotection.ie/en/news-media/latest-news/data-protection-commission-fines-google-eu403-million-following-inquiry-googles-processing-location)
4. ioplus (secondary): [Uber fined EUR 825 million](https://www.ioplus.nl/nl/posts/uber-beboet-met-825-miljoen--wat-het-echt-betekent)
5. Agence Europe: [Vote on Digital Omnibus postponed](https://agenceurope.eu/en/bulletin/article/13954/5/vote-on-digital-omnibus-postponed-until-11-october-under-pressure-from-paris-and-berlin)
6. EDPB: [Anonymisation and web scraping for generative AI](https://www.edpb.europa.eu/news/edpb-sheds-light-on-anonymisation-and-web-scraping-for-generative-ai-and-adopts-final-version_en)
7. legislation.gov.uk: [SI 2026/82](https://legislation.gov.uk/uksi/2026/82)
8. Recordinglaw (secondary): [UK Information Commission transfer](https://www.recordinglaw.com/news/uk-information-commission-transfer-september-2026/)
9. Freevacy (secondary): [ICO 2025-26 annual report](https://www.freevacy.com/news/ico/ico-publishes-2025-26-annual-report/7587)
