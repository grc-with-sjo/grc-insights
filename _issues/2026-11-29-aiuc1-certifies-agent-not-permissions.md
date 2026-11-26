---
title: "AIUC-1 certifies the AI agent. The risk still sits in what you let it do."
issue: 5
series: feature
date: 2026-11-24
calendar_date: 2026-11-29
regions: [GLOBAL, US, CA]
sectors: [saas, cloud, banking]
categories: [ai-governance, frameworks, third-party-risk]
description: "AIUC-1 ties AI agent testing to insurance, and that is what makes it worth reading. But it tests the vendor's agent, and I would still own the permissions I hand it."
image: /assets/og-v2/2026-11-29-aiuc1-certifies-agent-not-permissions.png
---

## In brief

- AIUC-1 is a standard for AI agents, the software that takes actions rather than only answering questions. The company behind it writes the standard, runs the tests, issues the certificate and sells insurance.
- The body behind SOC 2 reports is rolling out a joint SOC 2 and AIUC-1 engagement with several accounting firms, and expects a full launch in early 2027.
- A certificate covers one product, at one version of the standard, for one year. It says nothing about the access your own team gives that agent.

## The story so far

An AI agent does things. It sends the email, updates the record, books the refund. The assurance most of us lean on was not built for that. A SOC 2 report is an independent accountant's opinion on a vendor's controls, under criteria set by the AICPA (the American Institute of CPAs, the US accounting profession's standard-setter). As I wrote in [Issue 4](/grc-insights/issues/2026-11-15-soc2-finally-talks-about-ai/), the AICPA's draft 2027 criteria name AI risks but leave every AI point optional.

AIUC-1 tries to fill that gap from a different direction. It comes from the Artificial Intelligence Underwriting Company (AIUC), a San Francisco public benefit corporation that sells standards, audits and insurance for AI. The standard first launched in July 2025 and is updated every quarter. [Source](https://standard.aiuc-1.com/changelog/index.md) Its pitch is simple: an insurer that pays when an agent fails has a reason to test it properly.

This issue argues that the insurance link is what makes AIUC-1 worth reading, and that a certificate tests the vendor's agent, not the permissions you give it.

## What happened

### One company writes the standard, tests the agent and issues the certificate

Who does what decides how much weight a certificate can carry. AIUC says it creates the standard "with the AIUC-1 Consortium, uniting 300+ security & risk leaders across the Fortune 500". Members propose quarterly changes; the "AIUC Standards team finalize standard changes". [Source](https://standard.aiuc-1.com/standard-governance.md) The requirements sit under six principles: data and privacy, security, safety, reliability, accountability, and society. [Source](https://www.aiuc-1.com)

The 15 October 2026 release made human approval for sensitive tool operations a core control, citing browser agents "that can transact, delete, or change settings in real accounts". [Source](https://standard.aiuc-1.com/changelog/index.md)

An accredited audit firm checks the controls and recommends certification. The technical evaluations, the adversarial testing of the agent itself, "are currently conducted only by AIUC", and AIUC issues the certificate. [Source](https://standard.aiuc-1.com/standard-governance.md) Only AIUC accredits the auditors, through a witness audit. [Source](https://standard.aiuc-1.com/accredited-auditors.md) AIUC describes a certificate's scope as "Typically limited to specific product(s)". [Source](https://standard.aiuc-1.com/aiuc-1-certification.md) It lasts 12 months and needs fresh evaluations at least every three months, and AIUC itself calls it "a point-in-time assessment of controls, not a warranty". [Source](https://standard.aiuc-1.com/faq.md)

Zack Korman raised the independence problem in April, and Lenny Zeltser set it out on his blog a week later. Zeltser notes that "AIUC authors the framework, runs the technical evaluations, issues the certificates, and sells the AI agent insurance", and relays Korman's view that this "creates conflicts of interest at every step". [Source](https://zeltser.com/aiuc-1-cert) AIUC's reply, as Zeltser reports it, is that losses on certified agents land on AIUC, so loose certification would cost it money. AIUC has started a pilot with independent evaluators and formed an advisory group on governance, which is due to report with the 15 January 2027 release. [Source](https://standard.aiuc-1.com/standard-governance.md)

**Takeaway:** Read an AIUC-1 certificate as a tested claim about one product, at one version of the standard, with an expiry date.

**Open question:** If a vendor's certificate rests on tests AIUC ran itself, what would you need to see before you give it the weight you give an accountant's opinion?

### The AICPA is rolling it out next to SOC 2, with full launch expected early 2027

That question of who checks the checker is why the AICPA's involvement matters. On 19 October 2026 the AICPA and AIUC said they "are rolling out a joint assurance certification". The release adds: "Several CPA firms are now delivering a joint SOC 2® plus AIUC-1 offering to clients. Once initial engagements have concluded, a full launch of the joint certification is expected to take place in early 2027." [Source](https://www.aicpa-cima.com/news/article/auditors-meet-urgent-demand-for-ai-assurance-with-new-offering-from-aicpa-and-aiuc)

The product is "a single report delivered by one CPA-led engagement", combining a SOC 2 report and an AIUC-1 certification. The AICPA release names no firms. AIUC's own page on the offering fills some of that in: it says the engagement "is available with BDO, Deloitte, EisnerAmper, EY, Grant Thornton, KPMG, PwC, RSM and Schellman", and that "AIUC or accredited technical evaluation body runs the quarterly technical testing". [Source](https://standard.aiuc-1.com/soc2-joint-offering.md) Six of those nine firms do not appear on AIUC's accredited-auditor list, which I would want explained. Neither page says how one report carries both an accountant's opinion and a certificate that, under AIUC's rules, only AIUC issues.

Comments on the AICPA's draft 2027 SOC 2 criteria close on 15 January 2027, and if approved they apply to engagements beginning on or after 31 December 2027. [Source](https://www.aicpa-cima.com/news/article/aicpa-proposes-update-of-soc-2-r-trust-services-criteria-to-enhance-the-relevance-usability-and-value-of-cpas-reports) So the first joint reports will sit on today's SOC 2 criteria, with AIUC-1 carrying the AI-specific testing.

**Takeaway:** When a joint report arrives, read it as two pieces of evidence bound together, and work out which party stands behind each.

**Open question:** When a vendor hands you a joint report, who on your side could explain which parts a CPA firm attested to and which parts AIUC certified?

### Insurance gives the standard teeth, but the terms are hard to see

The feature that sets AIUC-1 apart from ISO/IEC 42001, the certifiable AI management system standard, is money. AIUC's pitch reads: "Insurers bear the cost when AI fails, giving them a financial stake in standards and audits that reduce real risks." [Source](https://www.aiuc.com) The Cloud Security Alliance made a similar case in September: insurance gives the auditor's work "a financial consequence beyond reputational risk". [Source](https://labs.cloudsecurityalliance.org/research/csa-research-note-third-party-ai-assurance-standards-2026092/)

The clearest public example is ElevenLabs, a voice AI company. In February 2026 it described an insurance policy for its voice agents and wrote: "This insurance coverage is enabled through AIUC-1 certification from the Artificial Intelligence Underwriting Company." [Source](https://elevenlabs.io/blog/aiuc-announcement) What I could not find on AIUC's own pages is which insurer carries the risk, the limits, or what triggers a payout.

The mainstream market is moving the other way. Verisk, whose ISO unit drafts standard policy wording that many US insurers adopt, filed "new optional multistate exclusion endorsements for Generative Artificial Intelligence" for general liability policies. [Source](https://core.verisk.com/LOB-PAGES/General-Liability-Hub) The filing is dated 17 July 2025, with a proposed effective date of 1 January 2026. [Source](https://core.verisk.com/Insights/Emerging-Issues/Articles/2025/July/Week-4/Emerging-Risks-in-ISO-General-Liability-Multistate-Filing)

**Takeaway:** An insurer with money on the line is a stronger signal than a badge, once you can see who the insurer is and what it covers.

**Open question:** If an agent you deployed made a costly mistake tomorrow, which of your own policies would respond, and has anyone read the AI wording at renewal?

## How I'd approach it

Where I've landed is that AIUC-1 is the most useful thing on the market for testing how an agent behaves. It is still a test of the vendor's agent, in the vendor's set-up.

My exposure starts after that. In my environment the agent acts with the access my team grants it: the systems it can reach, what it can spend or delete. The standard now expects human approval for sensitive actions, but whether that step is switched on in my tenant is my configuration, not the vendor's certificate. Andrew Roe at Sythe Labs made a version of this point in September, advising buyers to read a report "against the data and authority you plan to give the agent". [Source](https://sythelabs.com/blog/aiuc-1-framework-analysis) I also could not find a clear answer on what happens when the vendor swaps the underlying model between quarterly evaluations, and that is the gap I would ask about first.

So I find myself reading the certificate the way I read a SOC 2 report on a cloud provider: useful evidence about their side, paired with my own controls on mine. The insurance angle makes me take the testing more seriously. The unnamed balance sheet behind it makes me hold back from treating it as risk transfer.

Builders get a credible way to show testing, at the cost of an annual audit and quarterly retests. Buyers get better evidence, not a reason to skip their own access review. I could not find a regulator that references AIUC-1. For Canadian banks and insurers, the model-risk guideline E-23 from OSFI (the Office of the Superintendent of Financial Institutions, the federal regulator) covers AI models and takes effect on 1 May 2027. [Source](https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027)

The trade-off is time: asking for evaluation reports, scope and model-change terms slows procurement. I would rather spend it than inherit an agent's permissions by default.

## Questions to take to your team

- **For each AI agent you have approved, who decided what it is allowed to do, and where is that written down?** Agent access often comes in through a product setting rather than an access request, so it can miss the usual review.
- **If a vendor shows you an AIUC-1 certificate, could you name the product, the standard version and the date of the last quarterly evaluation it covers?** The badge is easy to accept; the scope behind it takes a follow-up question.
- **Which of your insurance policies would respond to a loss caused by an AI agent, and has your broker flagged any AI exclusions?** Exclusion wording tends to arrive at renewal, inside a document few people outside finance read.

## What to do this quarter

- Map every AI agent in use to its owner, its permissions and whether sensitive actions need human approval.
- Ask vendors that cite AIUC-1 for the scope, the locked standard version and the latest evaluation results.
- Add a contract term that a change of underlying model triggers notice and re-testing.
- Confirm with your broker how your current policies treat losses caused by AI, before your next renewal.

### If you work in…

| Sector | What it means | What to do |
|---|---|---|
| Product / SaaS | Customers may start asking for AIUC-1 alongside SOC 2, especially for agent features | Decide which agent features would be in scope before a customer asks, and budget for quarterly retests |
| Cloud | Agent platforms will be asked how certified agents behave in customer tenants | Document which controls are yours and which sit with the customer's configuration |
| Banking / FinServ | OSFI's E-23 applies to AI models at federally regulated banks and insurers from 1 May 2027 | Treat vendor agent certificates as one input to model inventory and validation, not a substitute |

## On the radar

- **15 January 2027**: AIUC-1: next quarterly release, with the advisory group's governance findings ([Radar](/grc-insights/radar/#global-aiuc-1))
- **15 January 2027**: SOC 2: comment period on the draft 2027 Trust Services Criteria closes ([Radar](/grc-insights/radar/#global-soc2))
- **Early 2027**: AICPA and AIUC: full launch of the joint SOC 2 plus AIUC-1 certification expected ([Radar](/grc-insights/radar/#global-aiuc-1))

## Sources

1. AIUC: [AIUC-1 standard governance](https://standard.aiuc-1.com/standard-governance.md)
2. AIUC: [AIUC-1 changelog](https://standard.aiuc-1.com/changelog/index.md)
3. AIUC: [Accredited auditors](https://standard.aiuc-1.com/accredited-auditors.md)
4. AIUC: [AIUC-1 FAQ](https://standard.aiuc-1.com/faq.md), [Certification](https://standard.aiuc-1.com/aiuc-1-certification.md) and [SOC 2 + AIUC-1 joint offering](https://standard.aiuc-1.com/soc2-joint-offering.md)
5. Lenny Zeltser: [AIUC-1 certification critique, 22 April 2026](https://zeltser.com/aiuc-1-cert)
6. Zack Korman: [post on X, April 2026](https://x.com/i/web/status/2044526340133585242)
7. AICPA: [Auditors meet urgent demand for AI assurance with new offering from AICPA and AIUC](https://www.aicpa-cima.com/news/article/auditors-meet-urgent-demand-for-ai-assurance-with-new-offering-from-aicpa-and-aiuc)
8. AICPA: [AICPA proposes update of SOC 2 Trust Services Criteria](https://www.aicpa-cima.com/news/article/aicpa-proposes-update-of-soc-2-r-trust-services-criteria-to-enhance-the-relevance-usability-and-value-of-cpas-reports)
9. AIUC: [Homepage](https://www.aiuc.com)
10. ElevenLabs: [AIUC announcement](https://elevenlabs.io/blog/aiuc-announcement)
11. Verisk: [General Liability Hub](https://core.verisk.com/LOB-PAGES/General-Liability-Hub) and [July 2025 ISO General Liability multistate filing](https://core.verisk.com/Insights/Emerging-Issues/Articles/2025/July/Week-4/Emerging-Risks-in-ISO-General-Liability-Multistate-Filing)
12. OSFI: [Guideline E-23, Model Risk Management (2027)](https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027)
13. Cloud Security Alliance: [Research note on third-party AI assurance standards, September 2026](https://labs.cloudsecurityalliance.org/research/csa-research-note-third-party-ai-assurance-standards-2026092/)
14. Sythe Labs: [AIUC-1 Framework: Requirements, Certification, and Limits](https://sythelabs.com/blog/aiuc-1-framework-analysis)
