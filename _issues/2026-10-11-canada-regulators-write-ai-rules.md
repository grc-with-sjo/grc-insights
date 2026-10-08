---
title: "Canada's AI privacy rules are arriving through regulators' findings, not new laws"
issue: 1
series: catch-up
date: 2026-10-08
calendar_date: 2026-10-11
regions: [CA]
sectors: [tech, saas, cloud, banking, retail]
categories: [privacy-law, ai-governance, enforcement, third-party-risk]
description: "Canada's new privacy bill has stalled and there is no federal AI law. So what should a Canadian privacy programme be built on while the law is unsettled?"
---

## In brief

- Canada's bill to replace its federal business privacy law has not moved since June, and there is no federal AI law.
- Regulators used today's law instead: OpenAI's early ChatGPT training and deepfakes made with X's Grok tool did not meet consent rules.
- New federal guidance says a business stays accountable for personal information it hands to vendors.

## The story so far

Canada's federal privacy law for businesses is the Personal Information Protection and Electronic Documents Act (PIPEDA). It governs how companies collect, use and share personal information, and its regulator is the Office of the Privacy Commissioner of Canada (OPC). Québec, British Columbia (BC) and Alberta have their own private-sector privacy laws and commissioners.

Ottawa has tried to replace PIPEDA before. Bill C-27 was the federal government's previous attempt, and it also carried Canada's first proposed AI law. C-27 lapsed when Parliament's session ended on 2025-01-06, so neither part became law. Its successor, Bill C-36, was introduced on 2026-06-15. It would replace PIPEDA's privacy rules but contains no AI law.

Meanwhile regulators keep enforcing the laws they already have. That leaves one central question: with the federal law unsettled, what should a Canadian privacy programme be built on in the meantime?

## What happened

### Ottawa's new privacy bill is substantial but has not moved

The obvious place to look first is the bill itself. C-36, the Protecting Privacy and Consumer Data Act, would create a new regulator, the Digital Safety and Data Protection Commission of Canada. It sets penalties at the greater of $10M or 3% of prior-year global revenue, lets individuals sue a business directly, and requires businesses to publicly describe automated decision systems with legal or similarly significant effects on people. [Bill text](https://www.parl.ca/DocumentViewer/en/45-1/bill/C-36/first-reading)

The bill had its first reading, the formal step of introducing it, on 2026-06-15. LEGISinfo, Parliament's bill tracker, shows no debate since. [Source](https://www.parl.ca/legisinfo/en/bill/45-1/c-36) It still needs second reading, committee study, the Senate, Royal Assent and an order bringing it into force; until then, PIPEDA applies.

**Takeaway:** Some C-36 requirements are cheap to prepare for now, but its timing is too uncertain to budget around.

**Open question:** Which C-36 requirements would we prepare for even if the bill changed in committee?

### Regulators are setting AI expectations through their findings

Meanwhile, regulators are applying existing law to AI. A finding is a regulator's published conclusion after investigating a complaint. On 2026-05-06, the OPC and the Québec, BC and Alberta commissioners reported that OpenAI's initial training of ChatGPT, its AI chatbot, did not comply: it collected more data than needed, without valid consent or transparency. The OPC found the federal complaint justified, and resolved on conditions after OpenAI limited personal and sensitive data in training. [Source](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_260506/)

On 2026-06-11 the OPC went further with Grok, X's AI chatbot and image generator. It found X Corp. and X.AI LLC had no valid express consent for generating sexualized deepfakes, and that the complaint was justified and not resolved. It recommended suspending Grok Imagine, the image tool, plus annual third-party audits and six months of monitoring for workarounds. The companies declined the suspension but committed to four other recommendations and quarterly reports. [Source](https://www.priv.gc.ca/en/opc-actions-and-decisions/investigations/investigations-into-businesses/2026/pipeda-2026-004/)

**Takeaway:** The Grok recommendations (audits, misuse monitoring, progress reports) read like a control set for any generative AI feature.

**Open question:** If our own AI feature were misused tomorrow, how quickly could we detect it and show what we did?

### Accountability for vendors stays with the business

The same logic reaches vendors. OPC guidance of 2026-09-10 says accountability stays with the business, which should be able to show due diligence and contract terms. Comments close 2026-12-04. [Source](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_260910/)

The OPC cannot issue binding orders under PIPEDA, so it went to Federal Court against Google on 2026-08-28 to implement its de-listing recommendations. [Source](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_260828/) Complaints are also rising: 3,044 under PIPEDA in 2025-26, up 109%. [Source](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_260604/)

**Takeaway:** A complete vendor and AI inventory answers the new guidance today and is likely to stay useful whatever C-36 becomes.

**Open question:** For our most important vendors, could we produce the due diligence and contract terms the guidance describes?

### The provinces add their own layer

Provincial law adds a second layer. According to law-firm summaries, Québec's Law 25, the province's modernised private-sector privacy law, has applied in full since 2024-09-22, with penalties of up to C$10M or 2% of worldwide turnover ⚠️ verify. [Osler](https://www.osler.com/fr/articles/mises-%C3%A0-jour/loi-25-nouveau-regime-d-application-de-la-loi-quebecoise-sur-la-protection-des-renseignements-pers/) Québec's regulator, the Commission d'accès à l'information (CAI), reportedly proposed 74 changes in a 2026-06-11 report, including limits on mass collection of data to train AI ⚠️ verify. [Bulletin Aylmer](https://bulletinaylmer.com/quebec-s-access-and-privacy-watchdog-seeks-a-sweeping-overhaul-though-its-report-may-go-nowhere-fast)

BC's private-sector Personal Information Protection Act (PIPA) appears unchanged, though that rests on a weak secondary source ⚠️ verify. Its regulator, the Office of the Information and Privacy Commissioner (OIPC), calls for modernised laws, and its annual report reportedly shows privacy complaints nearly doubling ⚠️ verify. [OIPC BC](https://oipc.bc.ca/documents/news-releases/3187)

**Takeaway:** For organisations operating in Québec, Law 25 is a natural reference point for design choices, once its details are confirmed.

**Open question:** Where do our Québec, BC and federal privacy processes differ, and does anyone own that comparison?

> **This week:** On 2026-10-07 the Privacy Commissioner spoke to a House of Commons committee on security screening, a public-sector matter outside PIPEDA ([OPC](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_261007/)).

## How I'd approach it

The uncertainty is about timing and shape. I expect federal reform to come, but nobody can say when, or what will survive committee. A plan that depends on a date nobody can name is hard to defend in a budget.

What we do know is how regulators apply today's law. The OpenAI and Grok findings asked the same things: was there valid consent, was the use appropriate, how much data was collected, and how fast did the company respond. The vendor guidance adds one more: can you show you kept control of data you handed to someone else.

So I would build around evidence that answers those questions under any outcome. The centre would be one inventory of vendors and AI systems. For each entry, I would record what personal data is involved, the consent basis, where any training data came from, and the contract terms. That record answers the OPC's vendor guidance today. It maps to C-36's rules on automated decisions if the bill passes. It also gives you something to show a provincial regulator.

For design choices, one way to hedge is to treat Québec's Law 25 as the reference point, once its details are confirmed against official sources. The OPC findings then show what evidence a regulator is likely to ask for.

The trade-off is real. Some of this work may not match C-36's final text, and a register built now may need rework. The cost of rework tends to be known and bounded. The cost of being unable to explain where training data came from, while complaints rise, is harder to predict. I would weigh those two rather than wait for certainty.

## Questions to take to your team

- **If a regulator asked tomorrow where the personal data used to train or tune our AI features came from, who would answer, and with what record?** Training data often sits with teams outside the usual privacy review.
- **Which of our vendors handle Canadian personal information or run AI on it, and could we produce the due diligence and contract terms for each?** The vendor list usually lives in procurement, not with the privacy team.
- **Which of our systems make decisions about people with legal or similarly significant effects, and could we describe each in plain language today?** Credit, hiring or fraud decisions often run inside vendor products and get missed.

## What to do this quarter

- Consider adding questions on AI training-data sources and consent to your privacy impact assessment (PIA) template.
- Map vendors and AI systems into one inventory, with data categories, consent basis and contract terms.
- Consider starting a register of automated decision systems; it costs little and maps to C-36.
- Confirm whether to comment on the OPC's service-provider guidance before 2026-12-04.

### If you work in…

| Sector | What it means | What to do |
|---|---|---|
| Tech | The OpenAI and Grok findings test AI consent under today's PIPEDA. | Compare generative AI features against the Grok recommendations. |
| Product / SaaS | Customers stay accountable for data you handle, so expect their questions. | Keep an answer pack: data map, sub-processors, AI use, PIA. |
| Cloud | I expect customers' vendor due diligence to reach hosting providers. | Document where Canadian personal data is stored. |
| Banking / FinServ | The Office of the Superintendent of Financial Institutions (OSFI), the federal financial regulator, treats AI as models under Guideline E-23 from 2027-05-01 ([OSFI](https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027)). | Consider folding third-party AI into the model inventory. |
| Retail | The OPC is investigating the IDScan.net breach, in which driver's licence and ID scans were stolen ([OPC](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_260921/)). | Review which ID data you keep and which vendor holds it. |

## On the radar

- **2026-12-04**: OPC third-party service-provider guidance: comment period closes ([Radar](/grc-insights/radar/#ca-opc-tpsp-guidance))
- **2027-01-01**: Ontario Bill 97, changes to Ontario's public-sector privacy laws: municipal PIAs and breach reporting take effect, according to law-firm summaries ⚠️ verify ([Radar](/grc-insights/radar/#ca-on-bill97))
- **2027-05-01**: OSFI Guideline E-23 on model risk, including AI, takes effect for federally regulated financial institutions ([Radar](/grc-insights/radar/#ca-osfi-e23))

## Sources

1. Parliament of Canada: [LEGISinfo, Bill C-36](https://www.parl.ca/legisinfo/en/bill/45-1/c-36)
2. Parliament of Canada: [Bill C-36, first reading](https://www.parl.ca/DocumentViewer/en/45-1/bill/C-36/first-reading)
3. Parliament of Canada: [LEGISinfo, Bill C-27](https://www.parl.ca/legisinfo/en/bill/44-1/c-27)
4. OPC: [OpenAI joint investigation](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_260506/)
5. OPC: [PIPEDA Findings #2026-004](https://www.priv.gc.ca/en/opc-actions-and-decisions/investigations/investigations-into-businesses/2026/pipeda-2026-004/)
6. OPC: [Third-party service providers guidance](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_260910/)
7. OPC: [Federal Court application, Google](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_260828/)
8. OPC: [2025-26 annual report](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_260604/)
9. Osler (secondary): [Loi 25 enforcement](https://www.osler.com/fr/articles/mises-%C3%A0-jour/loi-25-nouveau-regime-d-application-de-la-loi-quebecoise-sur-la-protection-des-renseignements-pers/)
10. Bulletin Aylmer (secondary): [CAI five-year report](https://bulletinaylmer.com/quebec-s-access-and-privacy-watchdog-seeks-a-sweeping-overhaul-though-its-report-may-go-nowhere-fast)
11. OIPC BC: [2025/26 annual report](https://oipc.bc.ca/documents/news-releases/3187)
12. OSFI: [Guideline E-23](https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027)
13. OPC: [IDScan.net investigation](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_260921/)
14. OPC: [Security screening appearance](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_261007/)
