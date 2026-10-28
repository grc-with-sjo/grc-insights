---
title: "Banks have no new AI rulebook. They have six months until model risk covers AI anyway"
issue: 5
series: catch-up
date: 2026-11-08
calendar_date: 2026-11-01
regions: [CA, EU, UK, US]
sectors: [banking, cloud, saas]
categories: [ai-governance, frameworks, third-party-risk]
description: "No regulator has written an AI rulebook for banks, and none is needed: OSFI's E-23 brings AI under model risk on 1 May 2027. I would start with the vendor AI most inventories miss."
cover: "https://images.unsplash.com/photo-1771931321956-406056adbed3?w=1600&q=75&auto=format&fit=crop"
cover_alt: "A yellow cube printed with a low-to-high risk meter, resting on a keyboard"
cover_credit: "Photo: Sasun Bughdaryan / Unsplash"
cover_credit_url: "https://unsplash.com/photos/yellow-cube-with-risk-meter-on-keyboard-sLevDCcgmUI"
image: /assets/og-v2/2026-11-08-banks-ai-model-risk-may-2027.png
---

## In brief

- Canada's banking regulator, OSFI, is not writing new AI rules. Its model-risk guideline, E-23, already counts AI and machine learning as models, and it applies from 1 May 2027 with no phase-in.
- Most high-impact AI at UK financial firms now comes from vendors, and over half of firms say they struggle to apply model-risk rules to it.
- The EU delayed its credit-scoring AI duties to December 2027, and US regulators replaced their model-risk guidance with a version that leaves generative and agentic AI out of scope.

## The story so far

In Canada, the Office of the Superintendent of Financial Institutions (OSFI) supervises federally regulated banks, insurers and trust companies. It governs technology through guidelines rather than statutes: B-10 for third-party risk, B-13 for technology and cyber risk, E-21 for operational resilience, and E-23 for model risk. Québec's financial regulator, the Autorité des marchés financiers (AMF), supervises Québec insurers, cooperatives such as Desjardins and trust companies.

Abroad, the EU's AI Act lists credit scoring as a high-risk use. The EU's Digital Operational Resilience Act (DORA) and the UK's critical third parties regime let supervisors oversee the cloud providers banks depend on. US bank supervisors had relied since 2011 on model-risk guidance known as SR 11-7.

In October, OSFI made its position plain: existing guidelines already govern AI, and no AI rulebook is coming. This issue argues that the real deadline for bank AI governance is 1 May 2027, and that the hardest part of meeting it is vendor AI.

## What happened

### OSFI says its existing guidelines already cover AI

OSFI spent October repeating one message. Its fall risk outlook on 8 October focused on frontier AI and said boards stay accountable for it. [OSFI](https://www.osfi-bsif.gc.ca/en/news/osfi-releases-fall-risk-update-focused-frontier-ai) On 15 October it endorsed the Financial Stability Board's new sound practices for AI, named six existing guidelines that already govern AI use, and warned that slow adopters risk falling behind. [OSFI statement](https://www.osfi-bsif.gc.ca/en/news/osfi-statement-financial-stability-boards-publication-sound-practices-responsible-adoption)

The guideline that matters most is E-23. It was finalised on 11 September 2025 and takes effect on 1 May 2027 for all federally regulated financial institutions, with no interim milestones. It counts AI and machine-learning models as models. It requires an inventory of every model with more than negligible risk, a risk rating that sets how often each model is reviewed and who approves it, validation independent of development, and monitoring for drift in models that retrain themselves. Third-party models sit inside the same framework and get their own risk rating. [OSFI E-23](https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027)

Québec's AMF guideline on the use of AI takes effect the same day, according to law-firm summaries; the final text is French-only and I have not read it. It goes further than E-23 in two places: a directory of all AI systems, not just risky models, and duties to monitor bias, tell clients when they are dealing with AI and give them access to a person. [Blakes](https://www.blakes.com/insights/quebec-s-amf-issues-guideline-on-the-use-of-ai-for-financial-institutions/)

**Takeaway:** "No new AI rules" is not "no new AI expectations": from 1 May 2027 an AI model without a risk rating is an E-23 gap.

**Open question:** How many of your AI uses would meet E-23's definition of a model, and who decides the borderline cases?

### Vendor AI is now most of the exposure

The clearest evidence comes from the UK. On 26 October the Bank of England and the Financial Conduct Authority published their 2026 survey of AI in financial services. 86% of firms now use AI. Third-party systems make up 53% of the AI that firms rate as highly material, up from 35% in 2024, and the top three providers account for 54% of third-party relationships. 54% of firms say applying model-risk principles to vendor models is a challenge. [Bank of England](https://www.bankofengland.co.uk/report/2026/artificial-intelligence-in-uk-financial-services-2026)

OSFI's own guidance points the same way. Its 13 July 2026 technology risk bulletin on generative and agentic AI is phrased as practices institutions "can consider", not binding rules. It suggests requiring vendors to disclose whether and how they use AI, giving AI agents their own non-human identities with least privilege and short-lived credentials, logging agent activity, keeping a human approval step for high-impact actions, and testing AI failure scenarios in business continuity plans. [OSFI bulletin](https://www.osfi-bsif.gc.ca/en/risks/technology-cyber-risk-management/technology-risk-bulletin/generative-agentic-artificial-intelligence-implications-technology-cyber-security-operational) Banks are starting to act on it: RBC reportedly plans to block third-party AI agents from its authenticated digital services, citing the bulletin ⚠️ verify. [money.ca](https://money.ca/banking/rbc-ai-agents-banking-osfi-warning)

Supervisors are also reaching past the banks to the vendors. HM Treasury designated Microsoft, Google Cloud, AWS and Oracle entities as critical third parties, effective 13 July 2026. No AI model provider has been designated. [GOV.UK](https://www.gov.uk/government/news/uk-financial-system-strengthened-with-new-safeguards-for-major-technology-providers) In the EU, supervisors named their first 19 critical ICT third-party providers under DORA on 18 November 2025. [EIOPA](https://www.eiopa.europa.eu/european-supervisory-authorities-designate-critical-ict-third-party-providers-under-digital-2025-11-18_it)

**Takeaway:** An inventory built from what your teams developed will miss most of the AI that matters; start from contracts and procurement records.

**Open question:** Which of your critical vendors added AI features in the last year, and would your contracts have told you?

### Europe and the US moved in different directions

The EU delayed. Its AI Omnibus, published on 24 July 2026, moves the high-risk duties for uses such as credit scoring to 2 December 2027, according to law-firm summaries of the amending regulation. Credit scoring stays high-risk; only the date moved. [Cooley](https://cdp.cooley.com/digital-ai-omnibus-delays-key-deadlines-introduces-new-rules/) The European Banking Authority's 2025 mapping found that much of what the AI Act asks of banks overlaps with rules they already follow. [EBA](https://www.eba.europa.eu/sites/default/files/2025-11/d8b999ce-a1d9-4964-9606-971bbc2aaf89/AI%20Act%20implications%20for%20the%20EU%20banking%20sector.pdf)

The US stepped back. On 17 April 2026 the Federal Reserve and the Office of the Comptroller of the Currency replaced SR 11-7 with SR 26-2 / OCC Bulletin 2026-13. The new guidance is principles-based, not enforceable, aimed mainly at banks with more than $30 billion in assets, and places generative and agentic AI out of scope as "novel and rapidly evolving". A joint request for information on AI and model risk is planned but has not been issued. [OCC Bulletin 2026-13](https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-13.html) [Federal Reserve SR 26-2](https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm)

At the international level, the Financial Stability Board finalised 12 sound practices for responsible AI adoption on 15 October 2026. They are not binding, but they give supervisors a shared vocabulary: board oversight, documented AI use, materiality assessment from the start, human oversight and management of third-party AI dependencies. [FSB](https://www.fsb.org/2026/10/fsb-finalises-sound-practices-for-the-responsible-adoption-of-artificial-intelligence-ai/)

**Takeaway:** For a cross-border bank, the US step back does not lower the bar; Canada and Québec set it, and the EU arrives in December 2027.

**Open question:** If your generative AI is out of scope for US model-risk guidance, which framework governs it in your group today?

> **This week:** OSFI updated its page on its approach to responsible AI adoption on 23 October ([OSFI](https://www.osfi-bsif.gc.ca/en/about-osfi/multimedia-library/osfis-approach-responsible-ai-adoption)), and the Bank of England and FCA published the AI survey above on 26 October.

## How I'd approach it

The uncertainty I would name first is not the rules. OSFI has said what applies, and the dates are written down. It is how much AI a bank is running that nobody has classified as a model, most of it bought rather than built.

I would build one inventory to the strictest bar in play. For a Canadian institution that means E-23's model inventory, extended to the AMF's "all AI systems" if you operate in Québec. I would tier it by materiality once, so the same tiering can serve E-23, the EU's credit-scoring duties in 2027 and US expectations for a cross-border group.

Then I would treat vendor AI as model-risk work, not only procurement work. That means an AI-use disclosure clause at each contract renewal, a standalone risk rating for each vendor model that drives a material decision, and exit plans that someone has actually tested for the critical cloud and AI services.

E-21 gives a second deadline to use. Scenario testing of all critical operations is due on 1 September 2027, four months after E-23. I would put AI failure scenarios into that testing, so one mapping exercise produces evidence for both.

The trade-off: inventory and vendor work is slow and unglamorous, and it competes with teams that want to ship AI features. I would rather explain a slower launch now than an inventory gap in May 2027. For BC credit unions and insurers, BCFSA has not issued AI guidance that I could find. I would treat that as a gap, not a safe harbour, and build to E-23 by analogy.

## Questions to take to your team

- **How many of your AI models came from a vendor, and does each one have its own risk rating?** Vendor models often inherit the vendor's overall risk score, which E-23 does not accept.
- **Which of your vendors would tell you if they started using AI in a service you rely on?** Most contracts signed before 2024 say nothing about it.
- **Do your critical-operations maps show where AI sits inside each operation?** E-21 scenario testing will expose any operation where nobody knows.

## What to do this quarter

- Map every AI use against E-23's model definition and record who made each borderline call.
- Confirm that each vendor model driving a material decision has a standalone risk rating.
- Add an AI-use disclosure clause to the contract renewal template for critical and material vendors.
- Map AI dependencies into your E-21 critical-operations maps before scenario testing is designed.
- Confirm that agents with system access have their own identities, least privilege and activity logs, following OSFI's July bulletin.

### If you work in…

| Sector | What it means | What to do |
|---|---|---|
| Banking / FinServ | E-23 covers AI models from 1 May 2027, with no phase-in. | Build the AI-inclusive inventory and tiering now. |
| Cloud | UK supervisors now oversee major cloud providers directly. | Expect bank customers to ask for AI-use disclosure and exit support. |
| Product / SaaS | Bank customers must rate your models on their own under E-23. | Prepare model documentation your bank customers can use for validation. |

## On the radar

- **2 December 2026**: EU AI Act: marking duty for older generative AI systems and new prohibitions apply ([Radar](/grc-insights/radar/#eu-ai-act))
- **1 May 2027**: OSFI E-23 takes effect for all federally regulated financial institutions ([Radar](/grc-insights/radar/#ca-osfi-e23))
- **1 September 2027**: OSFI E-21: scenario testing of all critical operations due
- **2 December 2027**: EU AI Act: high-risk duties, including credit scoring, apply ([Radar](/grc-insights/radar/#eu-ai-act))

## Sources

1. OSFI: [Guideline E-23, Model Risk Management (2027)](https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027)
2. OSFI: [Fall risk update focused on frontier AI](https://www.osfi-bsif.gc.ca/en/news/osfi-releases-fall-risk-update-focused-frontier-ai)
3. OSFI: [Statement on the FSB's sound practices for responsible AI adoption](https://www.osfi-bsif.gc.ca/en/news/osfi-statement-financial-stability-boards-publication-sound-practices-responsible-adoption)
4. OSFI: [Technology risk bulletin on generative and agentic AI](https://www.osfi-bsif.gc.ca/en/risks/technology-cyber-risk-management/technology-risk-bulletin/generative-agentic-artificial-intelligence-implications-technology-cyber-security-operational)
5. OSFI: [OSFI's approach to responsible AI adoption](https://www.osfi-bsif.gc.ca/en/about-osfi/multimedia-library/osfis-approach-responsible-ai-adoption)
6. OSFI: [Guideline E-21, Operational Risk and Resilience](https://osfi-bsif.gc.ca/en/guidance/guidance-library/operational-risk-management-resilience-letter)
7. Bank of England: [Artificial intelligence in UK financial services 2026](https://www.bankofengland.co.uk/report/2026/artificial-intelligence-in-uk-financial-services-2026)
8. GOV.UK: [New safeguards for major technology providers](https://www.gov.uk/government/news/uk-financial-system-strengthened-with-new-safeguards-for-major-technology-providers)
9. EIOPA: [ESAs designate critical ICT third-party providers under DORA](https://www.eiopa.europa.eu/european-supervisory-authorities-designate-critical-ict-third-party-providers-under-digital-2025-11-18_it)
10. OCC: [Bulletin 2026-13, Model risk management](https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-13.html)
11. Federal Reserve: [SR 26-2](https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm)
12. FSB: [Sound practices for the responsible adoption of AI](https://www.fsb.org/2026/10/fsb-finalises-sound-practices-for-the-responsible-adoption-of-artificial-intelligence-ai/)
13. EBA: [AI Act implications for the EU banking sector](https://www.eba.europa.eu/sites/default/files/2025-11/d8b999ce-a1d9-4964-9606-971bbc2aaf89/AI%20Act%20implications%20for%20the%20EU%20banking%20sector.pdf)
14. Blakes (secondary): [Québec's AMF issues guideline on the use of AI](https://www.blakes.com/insights/quebec-s-amf-issues-guideline-on-the-use-of-ai-for-financial-institutions/)
15. Cooley (secondary): [Digital AI Omnibus delays key deadlines](https://cdp.cooley.com/digital-ai-omnibus-delays-key-deadlines-introduces-new-rules/)
16. money.ca (secondary): [RBC and AI agents](https://money.ca/banking/rbc-ai-agents-banking-osfi-warning)
