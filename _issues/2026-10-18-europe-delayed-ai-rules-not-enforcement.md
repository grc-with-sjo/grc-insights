---
title: "Europe moved its AI deadlines, but its privacy regulators did not wait"
issue: 3
series: catch-up
date: 2026-10-14
calendar_date: 2026-10-18
regions: [EU, UK]
sectors: [tech, saas, banking, retail]
categories: [ai-governance, privacy-law, enforcement]
description: "Europe gave high-risk AI more time, but its privacy regulators kept fining under existing law. If your plan was built around the AI deadlines, what does it leave uncovered?"
---

## In brief

- The EU pushed its AI law's heaviest duties, for uses such as hiring and credit scoring, to December 2027. Two narrower AI rules still start on 2026-12-02.
- Privacy enforcement did not pause: Ireland's privacy regulator fined Google EUR 403M in September over location data.
- In the UK, new automated-decision rules have applied since February, and a 30-day duty to acknowledge privacy complaints since June.

## The story so far

For a North American company with European customers, two EU laws matter most. The General Data Protection Regulation (GDPR) is the EU's privacy law. National regulators enforce it and coordinate through the European Data Protection Board (EDPB), their joint body. The AI Act is the EU's newer AI law. It sorts AI uses by risk, with the heaviest duties on "high-risk" uses such as hiring and credit scoring.

In July the EU amended the AI Act through a package known as the AI Omnibus and pushed those duties back. A second package, the Digital Omnibus, would change parts of the GDPR, but EU governments have not yet agreed their position on it. The UK kept its own version of the GDPR after leaving the EU and is updating it through the Data (Use and Access) Act 2025, which amends its privacy and e-marketing rules.

So the question for this issue: if Europe delayed its new AI rules but not its privacy enforcement, where should a team put its next quarter of effort?

## What happened

### The AI Act's big deadline moved to 2027, but December 2026 still applies

The delay is narrower than it first sounds. The AI Omnibus is Regulation (EU) 2026/1744, an amending law published in the EU's Official Journal on 2026-07-24. It moves the high-risk duties for uses listed in the Act's Annex III, such as hiring, education and credit scoring, to 2027-12-02. For AI built into already-regulated products, listed in Annex I, the new date is 2028-08-02. [Source](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ:L_202601744)

Two things did not move. From 2026-12-02, generative AI systems placed on the market before 2026-08-02 must meet the Act's rule on marking AI-generated output, and new prohibited practices apply.

General-purpose AI models, the large models other products build on, are a third front. A law-firm update from Wilson Sonsini (WSGR) reports that the European Commission's powers over their providers, including fines, became usable on 2026-08-02 ⚠️ verify. [WSGR](https://www.wsgrdataadvisor.com/2026/08/eu-ai-act-enforcement-phase-begins/) No enforcement action has surfaced, but research here was incomplete, so the silence is hard to read.

**Takeaway:** The delay covers high-risk uses; the 2026-12-02 date for generative AI marking and the new prohibitions still stands.

**Open question:** Who has confirmed that AI-output marking works in your product, and where is that recorded?

### Privacy regulators kept fining under the law they already have

Meanwhile, privacy regulators used the GDPR as it stands. Ireland's Data Protection Commission (DPC) is that country's GDPR regulator. On 2026-09-21 it fined Google EUR 403M over three location and activity settings, citing the legal basis, transparency, retention and accountability, and gave Google six months to comply. [Source](https://www.dataprotection.ie/en/news-media/latest-news/data-protection-commission-fines-google-eu403-million-following-inquiry-googles-processing-location)

A second case points at automated decisions. The GDPR limits decisions about people made by automated means alone. Dutch technology press reports that the Netherlands' privacy regulator, the Autoriteit Persoonsgegevens (AP), fined Uber EUR 824.99M under that rule and the transparency rules, over driver accounts deactivated by a system alone, and that Uber plans to appeal ⚠️ verify. [ioplus](https://www.ioplus.nl/nl/posts/uber-beboet-met-825-miljoen--wat-het-echt-betekent)

Neither case needed a new law, and GDPR changes are not close. Agence Europe, a Brussels news service, reported that EU governments' vote on their Digital Omnibus position, planned for 2026-10-07, was postponed under pressure from Germany and France. [Agence Europe](https://agenceurope.eu/en/bulletin/article/13954/5/vote-on-digital-omnibus-postponed-until-11-october-under-pressure-from-paris-and-berlin) I do not expect any GDPR change to apply in 2026.

**Takeaway:** Enforcement is visible today on location data and on decisions that cut people off, such as deactivations, fraud flags and credit refusals.

**Open question:** For each automated decision that can lock someone out, could you show a regulator what the human reviewer looked at?

### The UK's automated-decision rules are already live

The UK shows the same pattern, without a delay. Most of the Data (Use and Access) Act's privacy changes, including new rules on automated decisions, came into force on 2026-02-05. From 2026-06-19, organisations must acknowledge a privacy complaint within 30 days and investigate it. [Source](https://legislation.gov.uk/uksi/2026/82)

Law-firm and trade reports say that on 2026-09-30 the Information Commissioner's Office (ICO), the UK privacy regulator, became the Information Commission, run by a board, with existing investigations continuing ⚠️ verify. [Recordinglaw](https://www.recordinglaw.com/news/uk-information-commission-transfer-september-2026/) A summary of its 2025-26 annual report by the news service Freevacy says complaints rose 81% to 76,743, with only 27.4% answered within 90 days ⚠️ verify. [Freevacy](https://www.freevacy.com/news/ico/ico-publishes-2025-26-annual-report/7587)

**Takeaway:** With the regulator under that load, the 30-day duty puts the first response on organisations; one tracked complaint queue makes it easier to meet.

**Open question:** If a UK customer complained through support chat tomorrow, would anyone recognise it as a privacy complaint?

> **This week:** Research for 2026-10-04 to 2026-10-11 was incomplete, so treat the week as unknown. The outcome of the postponed Digital Omnibus vote is not yet known ([Agence Europe](https://agenceurope.eu/en/bulletin/article/13954/5/vote-on-digital-omnibus-postponed-until-11-october-under-pressure-from-paris-and-berlin)).

## How I'd approach it

The uncertainty I would name first is not when the AI rules apply; those dates are written down. It is how much of a plan quietly assumed the AI deadlines were the main event.

I would sort dates into three kinds. Fixed: 2026-12-02 for generative AI marking and the new prohibitions, and the UK rules live since February and June. Moved: 2027-12-02 for high-risk uses and 2028-08-02 for AI inside regulated products. Unknown: any GDPR change from the Digital Omnibus, and the first visible use of the Commission's powers over general-purpose models.

Then I would look for work that holds its value whichever way the unknowns go. An automated-decision register is the clearest example: each decision, its effect on a person, who reviews it and what evidence the review leaves. It serves the GDPR, the UK's new rules and, later, the high-risk AI duties. An inventory of generative AI features works the same way: it answers the December marking duty whatever happens to the other dates.

I would not pause high-risk AI work entirely. Classification and supplier questions take time, and extra months can vanish inside one budget cycle.

The trade-off: a quarter spent on automated decisions, location data and complaints means slower progress on high-risk AI documentation. If that work then runs late, the gap shows in 2027. I find that easier to explain than a gap in controls for rules that already apply.

## Questions to take to your team

- **Which of our automated decisions can deactivate, refuse or flag a person, and who reviews them before they take effect?** They often sit in fraud or support tooling, outside anything labelled "AI".
- **Which generative AI features do we offer in the EU, and when was each first made available there?** The December duty turns on that date, and launch records usually sit with product teams.
- **Who owns a UK privacy complaint from the moment it arrives, wherever it arrives?** The 30-day clock is easy to miss when complaints arrive through general support.

## What to do this quarter

- Consider listing generative AI features offered in the EU before 2026-08-02 and confirming each marks its output by 2026-12-02.
- Map automated decisions affecting EU and UK users into one register: decision, effect, human reviewer, evidence.
- Confirm the legal basis, notices and retention for location data, using the DPC's Google findings as a checklist.
- Confirm that UK privacy complaints reach one tracked queue with a 30-day acknowledgement target.
- Consider commenting on the EDPB's draft guidelines on anonymisation and web scraping for generative AI before 2026-10-30, if relevant. [EDPB](https://www.edpb.europa.eu/news/edpb-sheds-light-on-anonymisation-and-web-scraping-for-generative-ai-and-adopts-final-version_en)

### If you work in…

| Sector | What it means | What to do |
|---|---|---|
| Tech | Generative AI marking and new prohibitions apply from 2026-12-02. | Inventory EU generative AI features. |
| Product / SaaS | Automated deactivations fall under EU and UK automated-decision rules. | Check those flows for evidenced human review. |
| Banking / FinServ | AI Act credit-scoring duties wait until 2027-12-02; UK automated-decision rules apply now. | Document human review of credit and fraud decisions. |
| Retail | Location data drew the period's best-confirmed fine. | Review the location data you keep. |

## On the radar

- **2026-10-30**: EDPB draft guidelines on anonymisation and web scraping for generative AI: consultation closes ([Radar](/grc-insights/radar/#eu-gdpr))
- **2026-12-02**: EU AI Act: marking duty for older generative AI systems and new prohibitions apply ([Radar](/grc-insights/radar/#eu-ai-act))
- **2027-12-02**: EU AI Act: high-risk duties for Annex III uses apply ([Radar](/grc-insights/radar/#eu-ai-act))

## Sources

1. EUR-Lex: [Regulation (EU) 2026/1744 (AI Omnibus)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ:L_202601744)
2. WSGR (secondary): [EU AI Act enforcement phase begins](https://www.wsgrdataadvisor.com/2026/08/eu-ai-act-enforcement-phase-begins/)
3. Data Protection Commission: [DPC fines Google EUR 403 million](https://www.dataprotection.ie/en/news-media/latest-news/data-protection-commission-fines-google-eu403-million-following-inquiry-googles-processing-location)
4. ioplus (secondary): [Uber fined EUR 825 million](https://www.ioplus.nl/nl/posts/uber-beboet-met-825-miljoen--wat-het-echt-betekent)
5. Agence Europe: [Vote on Digital Omnibus postponed](https://agenceurope.eu/en/bulletin/article/13954/5/vote-on-digital-omnibus-postponed-until-11-october-under-pressure-from-paris-and-berlin)
6. legislation.gov.uk: [SI 2026/82](https://legislation.gov.uk/uksi/2026/82)
7. Recordinglaw (secondary): [UK Information Commission transfer](https://www.recordinglaw.com/news/uk-information-commission-transfer-september-2026/)
8. Freevacy (secondary): [ICO 2025-26 annual report](https://www.freevacy.com/news/ico/ico-publishes-2025-26-annual-report/7587)
9. EDPB: [Anonymisation and web scraping for generative AI](https://www.edpb.europa.eu/news/edpb-sheds-light-on-anonymisation-and-web-scraping-for-generative-ai-and-adopts-final-version_en)
