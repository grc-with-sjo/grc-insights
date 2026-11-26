---
title: "AIUC-1 certifies the AI agent. The risk still sits in what you let it do."
issue: 5
series: feature
date: 2026-11-24
calendar_date: 2026-11-29
regions: [GLOBAL, US, CA]
sectors: [saas, tech, cloud, banking]
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

The first thing I wanted to understand was who does what, because that decides how much weight a certificate can carry. AIUC says it creates the standard "with the AIUC-1 Consortium, uniting 300+ security & risk leaders across the Fortune 500". Members propose changes each quarter, but the "AIUC Standards team finalize standard changes" before release. [Source](https://standard.aiuc-1.com/standard-governance.md) The requirements sit under six principles: data and privacy, security, safety, reliability, accountability, and society.

Releases land on fixed dates: 15 January, 15 April, 15 July and 15 October. [Source](https://standard.aiuc-1.com/changelog/index.md) The 15 October 2026 release made human approval for sensitive tool operations a core control. AIUC's stated reason was browser agents "that can transact, delete, or change settings in real accounts".

Certification splits the work, but not the final say. An accredited audit firm checks the controls and recommends certification. The technical evaluations, the adversarial testing of the agent itself, "are currently conducted only by AIUC", and AIUC issues the certificate. [Source](https://standard.aiuc-1.com/standard-governance.md) Only AIUC accredits the auditors, through a witness audit. [Source](https://standard.aiuc-1.com/accredited-auditors.md) A certificate lasts 12 months, needs fresh evaluations at least every three months, and is "typically limited to specific product(s)". AIUC itself calls it "a point-in-time assessment of controls, not a warranty". [Source](https://standard.aiuc-1.com/faq.md)

Lenny Zeltser made the independence argument well in April. He notes that AIUC "writes the framework, runs the technical tests, issues certificates, and sells the insurance". He also relays Zack Korman's view that this "creates conflicts of interest at every step". [Source](https://zeltser.com/aiuc-1-cert) AIUC's reply, as Zeltser reports it, is that losses on certified agents land on AIUC, so loose certification would cost it money. AIUC has started a pilot with independent evaluators and formed an advisory group on governance, which is due to report with the 15 January 2027 release. [Source](https://standard.aiuc-1.com/standard-governance.md)

**Takeaway:** Read an AIUC-1 certificate as a tested claim about one product, at one version of the standard, with an expiry date.

**Open question:** If a vendor's certificate rests on tests AIUC ran itself, what would you need to see before you give it the weight you give an accountant's opinion?

### The AICPA is rolling it out next to SOC 2, with full launch expected early 2027

That question of who checks the checker is why the AICPA's involvement matters. On 19 October 2026 the AICPA and AIUC said they "are rolling out a joint assurance certification". The release adds: "Several CPA firms are now delivering a joint SOC 2® plus AIUC-1 offering to clients. Once initial engagements have concluded, a full launch of the joint certification is expected to take place in early 2027." [Source](https://www.aicpa-cima.com/news/article/auditors-meet-urgent-demand-for-ai-assurance-with-new-offering-from-aicpa-and-aiuc)

The product is described as "a single report delivered by one CPA-led engagement", combining a SOC 2 report and an AIUC-1 certification, renewed yearly with quarterly technical retesting. The release does not name the CPA firms. It also does not say who runs the technical tests inside the joint engagement, or how one report carries both an accountant's opinion and a certificate that, under AIUC's rules, only AIUC issues.

The timing overlaps with the AICPA's own work. Comments on the draft 2027 SOC 2 criteria close on 15 January 2027. If approved, those criteria apply to engagements beginning on or after 31 December 2027. [Source](https://www.aicpa-cima.com/news/article/aicpa-proposes-update-of-soc-2-r-trust-services-criteria-to-enhance-the-relevance-usability-and-value-of-cpas-reports) So the first joint reports will sit on today's SOC 2 criteria, with AIUC-1 carrying the AI-specific testing.

**Takeaway:** When a joint report arrives, read it as two pieces of evidence bound together, and work out which party stands behind each.

**Open question:** When a vendor hands you a joint report, who on your side could explain which parts a CPA firm attested to and which parts AIUC certified?

### Insurance gives the standard teeth, but the terms are hard to see

The feature that sets AIUC-1 apart from ISO/IEC 42001, the certifiable AI management system standard, is money. AIUC's pitch reads: "Insurers bear the cost when AI fails, giving them a financial stake in standards and audits that reduce real risks." [Source](https://www.aiuc.com)

The clearest public example is ElevenLabs, a voice AI company. In February 2026 it described an insurance policy for its voice agents and wrote: "This insurance coverage is enabled through AIUC-1 certification." [Source](https://elevenlabs.io/blog/aiuc-announcement) What I could not find on AIUC's pages is which insurer carries the risk, the limits, or what triggers a payout.

The mainstream market is moving the other way. Verisk, whose ISO unit drafts standard policy wording that many US insurers adopt, describes new optional exclusion endorsements for generative AI in general liability policies, according to summaries of its July 2025 filing ⚠️ verify. [Source](https://core.verisk.com/LOB-PAGES/General-Liability-Hub)

**Takeaway:** An insurer with money on the line is a stronger signal than a badge, once you can see who the insurer is and what it covers.

**Open question:** If an agent you deployed made a costly mistake tomorrow, which of your own policies would respond, and has anyone read the AI wording at renewal?

## How I'd approach it

Where I've landed is that AIUC-1 is the most useful thing on the market for testing how an agent behaves. It is still a test of the vendor's agent, in the vendor's set-up.

My exposure starts after that. The agent in my environment acts with the access my team grants it: which systems it can reach, which actions need a person to approve them, what it can spend or delete. The standard now expects human approval for sensitive actions. Whether that approval step is switched on in my tenant is my configuration, not the vendor's certificate. I also could not find a clear answer on what happens when the vendor swaps the underlying model between quarterly evaluations, and that is the gap I would ask about first.

So I find myself reading the certificate the way I read a SOC 2 report on a cloud provider: useful evidence about their side, paired with my own controls on mine. The insurance angle makes me take the testing more seriously. The unnamed balance sheet behind it makes me hold back from treating it as risk transfer.

The same split shows up for everyone the theme names. Builders get a credible way to show testing, at the cost of an annual audit and quarterly retests. Buyers get better evidence, not a reason to skip their own access review. Insurers outside AIUC have a test report to read rather than a badge to accept. For boards, the question is whose risk appetite is being applied. I could not find a regulator that references AIUC-1. For Canadian banks and insurers, the model-risk guideline E-23 from OSFI (the Office of the Superintendent of Financial Institutions, the federal regulator) covers AI models and takes effect on 1 May 2027. [Source](https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027)

The trade-off is time. Asking for evaluation reports, scope and model-change terms slows procurement. I would rather spend that time than inherit an agent's permissions by default.

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
| Tech | Agents in internal tools act with employee-level access | Run agent permissions through the same access review as people |
| Cloud | Agent platforms will be asked how certified agents behave in customer tenants | Document which controls are yours and which sit with the customer's configuration |
| Banking / FinServ | OSFI's E-23 applies to AI models at federally regulated banks and insurers from 1 May 2027 | Fold third-party agent certificates into model inventory and validation evidence, not in place of them |

## On the radar

- **15 January 2027**: AIUC-1: next quarterly release, with the advisory group's governance findings ([Radar](/grc-insights/radar/#global-aiuc-1))
- **15 January 2027**: SOC 2: comment period on the draft 2027 Trust Services Criteria closes ([Radar](/grc-insights/radar/#global-soc2))
- **Early 2027**: AICPA and AIUC: full launch of the joint SOC 2 plus AIUC-1 certification expected ([Radar](/grc-insights/radar/#global-aiuc-1))

## Sources

1. AIUC: [AIUC-1 standard governance](https://standard.aiuc-1.com/standard-governance.md)
2. AIUC: [AIUC-1 changelog](https://standard.aiuc-1.com/changelog/index.md)
3. AIUC: [Accredited auditors](https://standard.aiuc-1.com/accredited-auditors.md)
4. AIUC: [AIUC-1 FAQ](https://standard.aiuc-1.com/faq.md)
5. Lenny Zeltser: [AIUC-1 certification critique, 22 April 2026](https://zeltser.com/aiuc-1-cert)
6. AICPA: [Auditors meet urgent demand for AI assurance with new offering from AICPA and AIUC](https://www.aicpa-cima.com/news/article/auditors-meet-urgent-demand-for-ai-assurance-with-new-offering-from-aicpa-and-aiuc)
7. AICPA: [AICPA proposes update of SOC 2 Trust Services Criteria](https://www.aicpa-cima.com/news/article/aicpa-proposes-update-of-soc-2-r-trust-services-criteria-to-enhance-the-relevance-usability-and-value-of-cpas-reports)
8. AIUC: [Homepage](https://www.aiuc.com)
9. ElevenLabs: [AIUC announcement](https://elevenlabs.io/blog/aiuc-announcement)
10. Verisk: [General Liability Hub](https://core.verisk.com/LOB-PAGES/General-Liability-Hub)
11. OSFI: [Guideline E-23, Model Risk Management (2027)](https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027)
