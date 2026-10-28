---
title: "Europe moved its AI deadlines, but its privacy regulators did not wait"
issue: 3
series: catch-up
date: 2026-10-14
last_modified_at: 2026-10-18
calendar_date: 2026-10-18
regions: [EU, UK]
sectors: [tech, saas, banking, retail]
categories: [ai-governance, privacy-law, enforcement]
description: "Europe gave high-risk AI more time, but its privacy regulators kept fining under existing law. I would spend the next quarter on rules that already apply, starting with automated decisions."
image: /assets/og/2026-10-18-europe-delayed-ai-rules-not-enforcement.png
---

## In brief

- The EU pushed its AI law's heaviest duties, for uses such as hiring and credit scoring, to December 2027. Two narrower AI rules still start on 2 December 2026.
- Privacy enforcement did not pause: Ireland's privacy regulator fined Google EUR 403M in September over location data.
- In the UK, new automated-decision rules have applied since February, and a 30-day duty to acknowledge privacy complaints since June.

## The story so far

For a North American company with European customers, two EU laws matter most: the GDPR and the AI Act. National regulators enforce the GDPR and coordinate through the European Data Protection Board (EDPB). The AI Act sorts AI uses by risk, with the heaviest duties on "high-risk" uses such as hiring and credit scoring.

In July the EU amended the AI Act through a package known as the AI Omnibus and pushed those duties back. A second package, the Digital Omnibus, would change parts of the GDPR, but EU governments have not yet agreed their position on it. The UK has its own privacy law and is updating it through the Data (Use and Access) Act 2025, which amends its privacy and e-marketing rules.

That leaves the planning problem this issue works through: where to put the next quarter of effort when Europe delayed its new AI rules but not its privacy enforcement.

## What happened

### The AI Act's big deadline moved to 2027, but December 2026 still applies

The delay is narrower than it first sounds. The AI Omnibus is Regulation (EU) 2026/1744, an amending law published in the EU's Official Journal on 24 July 2026. It moves the high-risk duties for uses listed in the Act's Annex III, such as hiring, education and credit scoring, to 2 December 2027. For AI built into already-regulated products, listed in Annex I, the new date is 2 August 2028. [Source](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ:L_202601744)

Two things did not move. From 2 December 2026, generative AI systems placed on the market before 2 August 2026 must meet the Act's rule on marking AI-generated output, and new prohibited practices apply.

General-purpose AI models, the large models other products build on, are a third front. The European Commission's power to fine their providers, up to 3% of worldwide turnover or EUR 15M, has applied since 2 August 2026. [AI Act, Articles 101 and 113](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-113) No fine has been announced. The Commission's AI Office has sent requests for information to frontier model providers, and Commissioner Henna Virkkunen reportedly described them on 14 October as the first enforcement actions under the Act ⚠️ verify. [Commission speech](https://ec.europa.eu/commission/presscorner/api/files/document/print/en/speech_26_2150/SPEECH_26_2150_EN.pdf) I would read that as the Commission testing its process, not yet as a signal of where fines will land.

**Takeaway:** The delay covers high-risk uses; the 2 December 2026 date for generative AI marking and the new prohibitions still stands.

**Open question:** Who has confirmed that AI-output marking works in your product, and where is that recorded?

### Privacy regulators kept fining under the law they already have

The fines kept coming under the GDPR as it stands. Ireland's Data Protection Commission (DPC), Google's lead regulator in the EU, fined Google EUR 403M on 21 September 2026 over three location and activity settings. It cited lawfulness and fairness, transparency, retention and accountability, and gave Google six months to comply. The fine is not final until an Irish court confirms it, and RTÉ reports that Google is expected to appeal ⚠️ verify. [RTÉ](https://www.rte.ie/news/business/2026/0921/1592330-google-fined-403m-by-dpc/) [Source](https://www.dataprotection.ie/en/news-media/latest-news/data-protection-commission-fines-google-eu403-million-following-inquiry-googles-processing-location)

A second case points at automated decisions. The GDPR limits decisions about people made by automated means alone. On 21 August 2026 the Netherlands' privacy regulator, the Autoriteit Persoonsgegevens (AP), fined Uber EUR 824.99M under that rule. Driver accounts had been deactivated by a system alone, without meaningful human involvement, and drivers were not properly told how. Uber says it will challenge the fine. [AP](https://www.autoriteitpersoonsgegevens.nl/en/current/uber-fined-nearly-825-million-euros-for-automated-driver-blocking)

Neither case needed a new law, and GDPR changes are not close. Agence Europe, a Brussels news service, reported that EU governments' vote on their Digital Omnibus position, planned for 7 October 2026, was postponed under pressure from Germany and France. [Agence Europe](https://agenceurope.eu/en/bulletin/article/13954/5/vote-on-digital-omnibus-postponed-until-11-october-under-pressure-from-paris-and-berlin) According to the same service, the rescheduled meeting on 11 October passed without a vote either, and no new date has been set ⚠️ verify. [Agence Europe](https://agenceurope.eu/en/bulletin/article/13958/17/future-of-digital-omnibus-still-in-limbo-as-member-states-fail-to-agree) I do not expect any GDPR change to apply in 2026.

**Takeaway:** Enforcement is visible today on location data and on automated decisions that cut people off; fraud flags and credit refusals work the same way.

**Open question:** For each automated decision that can lock someone out, could you show a regulator what the human reviewer looked at?

### The UK's automated-decision rules are already live

The UK had no AI deadline to move. Its privacy changes are simply in force. Most of the Data (Use and Access) Act's privacy changes, including new rules on automated decisions, came into force on 5 February 2026. From 19 June 2026, organisations must acknowledge a privacy complaint within 30 days, then take appropriate steps to respond and tell the complainant the outcome. [Source](https://legislation.gov.uk/uksi/2026/82)

On 30 September 2026 the Information Commissioner's Office (ICO), the UK privacy regulator, became the Information Commission, led by a board of executive and non-executive members, with work in progress carrying over. [SI 2026/1015](https://www.legislation.gov.uk/uksi/2026/1015/made) The regulator is stretched: its 2025/26 annual report shows data protection complaints rising from 42,315 to 76,743, and only 27.4% assessed and responded to within 90 days, against an 80% target. [ICO annual report](https://ico.org.uk/about-the-ico/our-information/annual-reports/information-commissioners-annual-report-202526/performance-overview/)

**Takeaway:** With the regulator under that load, the 30-day duty puts the first response on organisations; one tracked complaint queue makes it easier to meet.

**Open question:** If a UK customer complained through support chat tomorrow, would anyone recognise it as a privacy complaint?

> **Update, 18 October:** EU ambassadors did not vote on the Digital Omnibus on 11 October either, and no new date is set ([Agence Europe](https://agenceurope.eu/en/bulletin/article/13958/17/future-of-digital-omnibus-still-in-limbo-as-member-states-fail-to-agree)). The Commission's AI Office has started sending information requests to general-purpose AI providers; no fines yet.

## How I'd approach it

The uncertainty I would name first is not when the AI rules apply; those dates are written down. It is how much of a plan quietly assumed the AI deadlines were the main event.

I would sort dates into three kinds. Fixed: 2 December 2026 for generative AI marking and the new prohibitions, and the UK rules live since February and June. Moved: 2 December 2027 for high-risk uses and 2 August 2028 for AI inside regulated products. Unknown: any GDPR change from the Digital Omnibus, and the first visible use of the Commission's powers over general-purpose models.

Then I would look for work that holds its value whichever way the unknowns go. An automated-decision register is the clearest example: each decision, its effect on a person, who reviews it and what evidence the review leaves. It serves the GDPR, the UK's new rules and, later, the high-risk AI duties. An inventory of generative AI features works the same way: it answers the December marking duty whatever happens to the other dates.

I would not pause high-risk AI work entirely. Classification and supplier questions take time, and extra months can vanish inside one budget cycle.

The trade-off: a quarter spent on automated decisions, location data and complaints means slower progress on high-risk AI documentation. If that work then runs late, the gap shows in 2027. I find that easier to explain than a gap in controls for rules that already apply.

## Questions to take to your team

- **Which of your automated decisions can deactivate, refuse or flag a person, and who reviews them before they take effect?** They often sit in fraud or support tooling, outside anything labelled "AI".
- **Which generative AI features do you offer in the EU, and when was each first made available there?** The December duty turns on that date, and launch records usually sit with product teams.
- **Who owns a UK privacy complaint from the moment it arrives, wherever it arrives?** The 30-day clock is easy to miss when complaints arrive through general support.

## What to do this quarter

- List generative AI features offered in the EU before 2 August 2026 and confirm each marks its output by 2 December 2026.
- Map automated decisions affecting EU and UK users into one register: decision, effect, human reviewer, evidence.
- Confirm the legal basis, notices and retention for location data, using the DPC's Google findings as a checklist.
- Confirm that UK privacy complaints reach one tracked queue with a 30-day acknowledgement target.
- If generative AI training is in scope for you, comment on the EDPB's draft guidelines on anonymisation and web scraping for generative AI before 30 October 2026. [EDPB](https://www.edpb.europa.eu/news/edpb-sheds-light-on-anonymisation-and-web-scraping-for-generative-ai-and-adopts-final-version_en)

### If you work in…

| Sector | What it means | What to do |
|---|---|---|
| Tech | Generative AI marking and new prohibitions apply from 2 December 2026. | Inventory EU generative AI features. |
| Product / SaaS | Automated deactivations fall under EU and UK automated-decision rules. | Check those flows for evidenced human review. |
| Banking / FinServ | AI Act credit-scoring duties wait until 2 December 2027; UK automated-decision rules apply now. | Document human review of credit and fraud decisions. |
| Retail | Location data drew the period's best-confirmed fine. | Review the location data you keep. |

## On the radar

- **30 October 2026**: EDPB draft guidelines on anonymisation and web scraping for generative AI: consultation closes ([Radar](/grc-insights/radar/#eu-gdpr))
- **2 December 2026**: EU AI Act: marking duty for older generative AI systems and new prohibitions apply ([Radar](/grc-insights/radar/#eu-ai-act))
- **2 December 2027**: EU AI Act: high-risk duties for Annex III uses apply ([Radar](/grc-insights/radar/#eu-ai-act))

## Sources

1. EUR-Lex: [Regulation (EU) 2026/1744 (AI Omnibus)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ:L_202601744)
2. European Commission: [AI Act, Article 113 (application dates, including Article 101 fines)](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-113)
3. Data Protection Commission: [DPC fines Google EUR 403 million](https://www.dataprotection.ie/en/news-media/latest-news/data-protection-commission-fines-google-eu403-million-following-inquiry-googles-processing-location)
4. Autoriteit Persoonsgegevens: [Uber fined nearly 825 million euros for automated driver blocking](https://www.autoriteitpersoonsgegevens.nl/en/current/uber-fined-nearly-825-million-euros-for-automated-driver-blocking)
5. Agence Europe: [Vote on Digital Omnibus postponed](https://agenceurope.eu/en/bulletin/article/13954/5/vote-on-digital-omnibus-postponed-until-11-october-under-pressure-from-paris-and-berlin)
6. legislation.gov.uk: [SI 2026/82](https://legislation.gov.uk/uksi/2026/82)
7. legislation.gov.uk: [SI 2026/1015 (Information Commission)](https://www.legislation.gov.uk/uksi/2026/1015/made)
8. ICO: [Annual report 2025/26, performance overview](https://ico.org.uk/about-the-ico/our-information/annual-reports/information-commissioners-annual-report-202526/performance-overview/)
9. EDPB: [Anonymisation and web scraping for generative AI (draft guidelines in consultation)](https://www.edpb.europa.eu/news/edpb-sheds-light-on-anonymisation-and-web-scraping-for-generative-ai-and-adopts-final-version_en)
10. Agence Europe: [Future of Digital Omnibus still in limbo](https://agenceurope.eu/en/bulletin/article/13958/17/future-of-digital-omnibus-still-in-limbo-as-member-states-fail-to-agree)
11. European Commission: [Speech by EVP Virkkunen, 14 October 2026](https://ec.europa.eu/commission/presscorner/api/files/document/print/en/speech_26_2150/SPEECH_26_2150_EN.pdf)
12. RTÉ (secondary): [Google fined €403m by DPC](https://www.rte.ie/news/business/2026/0921/1592330-google-fined-403m-by-dpc/)
