---
title: "Canada's regulators are writing the AI rules while Parliament stalls"
issue: 1
series: catch-up
date: 2026-10-11
regions: [CA]
sectors: [tech, saas, cloud, banking, retail]
categories: [privacy-law, ai-governance, enforcement, third-party-risk]
description: "Bill C-36 sits at first reading. Meanwhile Canada's privacy regulators ruled on OpenAI and Grok, and told you vendor accountability stays with you."
---

## TL;DR

- Bill C-36 has not moved since first reading on 2026-06-15. PIPEDA is still the law, and Canada has no AI statute.
- Regulators set the bar instead: OPC findings against OpenAI and X/xAI, and vendor guidance that keeps accountability with you.
- Provincial reform is quiet. Most provincial dates rest on law-firm summaries, so verify before you plan.

## What changed

**Update: federal privacy reform is stuck at first reading** (Canada, first reading 2026-06-15). Bill C-36, the Protecting Privacy and Consumer Data Act, shows no second-reading activity on LEGISinfo, so PIPEDA stays in force. The bill is bigger than its progress suggests: a new Digital Safety and Data Protection Commission, administrative penalties up to the greater of $10M or 3% of prior-year global revenue, a private right of action, and a duty to publicly describe automated decision systems with legal or similarly significant effects. It has no AI Part. The "AI for All" national strategy of 2026-06-04 promises legislative modernisation, not a standalone AI law. [Source](https://www.parl.ca/legisinfo/en/bill/45-1/c-36) · [Bill text](https://www.parl.ca/DocumentViewer/en/45-1/bill/C-36/first-reading) · [Strategy](https://www.pm.gc.ca/en/news/news-releases/2026/06/04/prime-minister-carney-launches-ai-all-canadas-new-national-artificial)

**OpenAI's initial ChatGPT training did not comply** (Canada, Québec, BC, Alberta; 2026-05-06). A joint investigation by the OPC and the Québec, BC and Alberta commissioners found overcollection, no valid consent or transparency, inaccuracy, weak access, correction and deletion, and accountability gaps. The federal complaint was well-founded and conditionally resolved after OpenAI limited personal and sensitive data in training. Alberta found a PIPA consent contravention and took commitments that include quarterly compliance reports. [Source](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_260506/) · [OIPC Alberta](https://oipc.ab.ca/joint-report-openai-chatgpt/)

**Grok: well-founded and not resolved** (Canada, 2026-06-11). PIPEDA Findings #2026-004 held that X Corp. and X.AI LLC had no valid express consent for generating sexualized deepfakes, and that the generation was not appropriate under s.5(3). The OPC recommended suspending Grok Imagine, annual third-party audits and circumvention monitoring. The respondents declined suspension and committed to four other recommendations with quarterly reports. The Commissioner cannot issue binding orders under current law, which is why the OPC filed a Federal Court application against Google on 2026-08-28. Volume is rising too: 3,044 PIPEDA complaints in 2025-26, up 109%. [Source](https://www.priv.gc.ca/en/opc-actions-and-decisions/investigations/investigations-into-businesses/2026/pipeda-2026-004/) · [Google application](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_260828/) · [Annual report](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_260604/)

**You stay accountable for your service providers** (Canada, published 2026-09-10; comments close 2026-12-04). New OPC guidance on third-party service providers says accountability stays with the business. It covers due diligence, contract terms and how to demonstrate accountability. [Source](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_260910/)

**Bill C-8 is law, but its cyber duties wait on orders** (Canada, Royal Assent 2026-06-15). C-8 enacts the Critical Cyber Systems Protection Act, to be phased in for designated operators in finance, telecom, energy and transport. The Telecommunications Act amendments took effect on assent. No commencement order, regulations or designations were found as of about 2026-10-01 ⚠️ verify. [Source](https://www.parl.ca/legisinfo/en/bill/45-1/c-8) · [Public Safety](https://www.canada.ca/en/public-safety-canada/news/2026/06/government-of-canada-strengthens-cyber-security-and-critical-infrastructure-with-royal-assent-of-bill-c8.html)

**Provinces: quiet, and mostly secondary-sourced** (Québec, BC, Alberta, Ontario).

- Update: Québec Law 25 has applied in full since 2024-09-22, but no CAI administrative monetary penalty was found ⚠️ verify ([Osler](https://www.osler.com/fr/articles/mises-%C3%A0-jour/loi-25-nouveau-regime-d-application-de-la-loi-quebecoise-sur-la-protection-des-renseignements-pers/)). The CAI's five-year report, tabled 2026-06-11, proposes 74 changes, including limits on mass collection to train AI ⚠️ verify ([Bulletin Aylmer](https://bulletinaylmer.com/quebec-s-access-and-privacy-watchdog-seeks-a-sweeping-overhaul-though-its-report-may-go-nowhere-fast)).
- BC PIPA is unamended, with no bill found, while the OIPC's 2025/26 annual report calls for modernised laws ⚠️ verify ([OIPC BC](https://oipc.bc.ca/documents/news-releases/3187)). Bill 9 amended public-sector FIPPA, mostly on access, with Royal Assent on 2026-05-28 ⚠️ verify ([Gowling](https://gowlingwlg.com/en/insights-resources/articles/2026/british-columbia-modernizes-freedom-of-information-and-public-sector-access-regime)).
- Alberta's public-sector privacy management programme duty under POPA applied from 2026-06-11 ([OIPC Alberta](https://oipc.ab.ca/legislation/popa/)). Private-sector PIPA reform is still consultation only, with no bill confirmed ([Alberta](https://www.alberta.ca/personal-information-protection-act-engagement)).
- Ontario's Bill 97 stages FIPPA/MFIPPA changes, with MFIPPA PIAs and breach reporting from 2027-01-01 ⚠️ verify ([WeirFoulds](https://www.weirfoulds.com/bill-97-explained-key-access-and-privacy-changes-for-ontarios-fippa-and-mfippa-institutions)).

> **This week:** One item. On 2026-10-07 the Privacy Commissioner appeared before the House public safety committee on security screening, a public-sector Privacy Act matter outside PIPEDA ([OPC](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_261007/)). Nothing new turned up for C-36, C-8, AI law, OSFI or the provincial commissioners. Read that as "nothing found", not "nothing happened": Hansard and the Canada Gazette were not checked.

## Sector lens

| Sector | What it means | What to do |
|---|---|---|
| Tech | The OpenAI and Grok findings test consent, appropriateness and minimisation for AI training and generation under today's PIPEDA ([OPC](https://www.priv.gc.ca/en/opc-actions-and-decisions/investigations/investigations-into-businesses/2026/pipeda-2026-004/)). | Add training-data provenance and consent records to your PIA template. |
| Product / SaaS | Your Canadian customers stay accountable for what you do with their data ([OPC](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_260910/)). Expect sharper due diligence and contract terms. | Keep an answer pack ready: data map, sub-processors, AI use, PIA. |
| Cloud | C-8 will apply to designated operators in finance, telecom, energy and transport. Expect their obligations to flow down to providers once orders land. | List which customers sit in those four sectors. |
| Banking / FinServ | OSFI E-23 treats AI/ML as models and takes effect 2027-05-01, about 6.5 months away ([OSFI](https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027)). | Build the model inventory now, including third-party and embedded AI. |
| Retail | The OPC opened a PIPEDA investigation on 2026-09-21 into the IDScan.net breach, where ID scans were exfiltrated ([OPC](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_260921/)). Age-assurance guidance landed on 2026-05-04 ([OPC](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_260504/)). | If you scan IDs or check age, review what you keep and which vendor holds it. |

## My take

Stop waiting for C-36. Too many programmes park privacy work "until the federal bill lands". That was a mistake with C-27 and it is a bigger one now.

The rules for AI in Canada are being written in findings, not statutes. The OpenAI and Grok decisions tell you exactly what the OPC tests: valid consent, whether the purpose is appropriate, how much data you took, and how fast you respond when something goes wrong. The Grok remedies (third-party audits, circumvention monitoring, quarterly progress reports) read like a control framework. Treat them as one.

The OPC cannot issue binding orders today. Do not read that as low risk. It is going to Federal Court instead, complaints have more than doubled, and C-36 would add revenue-linked penalties and a private right of action. When the law catches up, your evidence trail will be judged against the expectations regulators are setting now.

My position is simple. Make the vendor and AI inventory the centre of your programme. One inventory answers the OPC's service-provider guidance, OSFI E-23 and Alberta's programme duty. Pre-map to C-36 only where it is cheap: an automated-decision register and documented PIAs. Do not budget around C-36 timing. It still needs second reading, committee, the Senate, Royal Assent and a commencement order.

## What to do now

- Add AI training-data provenance and consent questions to your PIA template, using the OpenAI and Grok findings as the test.
- Build one inventory of vendors and AI systems with owner, data categories and contract terms. Read the OPC service-provider guidance and comment by 2026-12-04 if it affects you.
- Start an automated-decision-system register. It maps to C-36's transparency duty and costs little.
- FinServ: scope the OSFI E-23 model inventory to include third-party and embedded AI before 2027-05-01.
- Put the provincial dates in your calendar as "to verify", and confirm them against the official statute sites before you commit budget.

## On the radar

- **2026-12-04**: OPC third-party service-provider guidance: comment period closes ([Radar](/grc-insights/radar/#ca-opc-tpsp-guidance))
- **2027-01-01**: Ontario Bill 97: MFIPPA PIAs, breach reporting and whistleblower provision take effect ⚠️ verify ([Radar](/grc-insights/radar/#ca-on-bill97))
- Dates in other jurisdictions are on the [Radar](/grc-insights/radar/).

## Sources

1. Parliament of Canada: [LEGISinfo, Bill C-36](https://www.parl.ca/legisinfo/en/bill/45-1/c-36)
2. Parliament of Canada: [Bill C-36, first reading text](https://www.parl.ca/DocumentViewer/en/45-1/bill/C-36/first-reading)
3. Prime Minister of Canada: [AI for All national strategy launch](https://www.pm.gc.ca/en/news/news-releases/2026/06/04/prime-minister-carney-launches-ai-all-canadas-new-national-artificial)
4. OPC: [Joint investigation into OpenAI ChatGPT](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_260506/)
5. OIPC Alberta: [Joint report on OpenAI ChatGPT](https://oipc.ab.ca/joint-report-openai-chatgpt/)
6. OPC: [PIPEDA Findings #2026-004 (X Corp. and X.AI LLC)](https://www.priv.gc.ca/en/opc-actions-and-decisions/investigations/investigations-into-businesses/2026/pipeda-2026-004/)
7. OPC: [Federal Court application regarding Google](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_260828/)
8. OPC: [2025-26 annual report](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_260604/)
9. OPC: [Guidance on third-party service providers](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_260910/)
10. Parliament of Canada: [LEGISinfo, Bill C-8](https://www.parl.ca/legisinfo/en/bill/45-1/c-8)
11. Public Safety Canada: [Royal Assent of Bill C-8](https://www.canada.ca/en/public-safety-canada/news/2026/06/government-of-canada-strengthens-cyber-security-and-critical-infrastructure-with-royal-assent-of-bill-c8.html)
12. Osler (secondary): [Loi 25 enforcement regime](https://www.osler.com/fr/articles/mises-%C3%A0-jour/loi-25-nouveau-regime-d-application-de-la-loi-quebecoise-sur-la-protection-des-renseignements-pers/)
13. Bulletin Aylmer (secondary): [CAI five-year report](https://bulletinaylmer.com/quebec-s-access-and-privacy-watchdog-seeks-a-sweeping-overhaul-though-its-report-may-go-nowhere-fast)
14. OIPC BC: [2025/26 annual report release](https://oipc.bc.ca/documents/news-releases/3187)
15. Gowling WLG (secondary): [BC modernizes FOI and public-sector access regime](https://gowlingwlg.com/en/insights-resources/articles/2026/british-columbia-modernizes-freedom-of-information-and-public-sector-access-regime)
16. OIPC Alberta: [Protection of Privacy Act](https://oipc.ab.ca/legislation/popa/)
17. Government of Alberta: [PIPA engagement](https://www.alberta.ca/personal-information-protection-act-engagement)
18. WeirFoulds (secondary): [Bill 97 explained](https://www.weirfoulds.com/bill-97-explained-key-access-and-privacy-changes-for-ontarios-fippa-and-mfippa-institutions)
19. OSFI: [Guideline E-23, Model Risk Management (2027)](https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027)
20. OPC: [Investigation into the IDScan.net breach](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_260921/)
21. OPC: [Age-assurance guidance](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_260504/)
22. OPC: [Commissioner's appearance on security screening](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_261007/)
