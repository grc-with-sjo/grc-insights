---
title: "Cyber deadlines keep slipping. Build assurance that travels."
issue: 2
series: catch-up
date: 2026-10-11
calendar_date: 2026-11-22
regions: [US, CA, EU, GLOBAL]
sectors: [cloud, saas, tech, hardware, banking]
categories: [cybersecurity, frameworks, third-party-risk]
description: "US cyber deadlines keep slipping while Europe's reporting clock already runs. Don't budget around enforcement dates; build controls and evidence that work across regimes."
---

## In brief

- US defence-contractor certification and critical-infrastructure incident reporting have both slipped, with no new dates ⚠️ verify.
- In Europe, makers of connected products must now send an early warning within 24 hours of an actively exploited vulnerability ⚠️ verify.
- US federal cloud authorization is moving to automated evidence, and ISO/IEC 42001, the AI management-system standard, is landing as a customer credential, not a legal requirement.

## The story so far

Security obligations for cloud and software providers come from two directions. Governments write rules: the US defence-contractor certification programme (CMMC), the US critical-infrastructure incident-reporting law (CIRCIA), Canada's Bill C-8 and the EU's Cyber Resilience Act. Customers ask for certificates: ISO/IEC 27001, the international security management standard; SOC 2, the US audit report buyers ask for first; and now ISO/IEC 42001 for AI.

A year ago, several government dates looked fixed. Between May and October 2026, the US dates moved and Canada's new cyber regime waited for designations. Meanwhile, the EU's first product-security reporting duty went live on schedule, and the US federal cloud programme set an end date for its old route.

The rules are tightening, but not on the published timetable. This issue argues that you should stop budgeting around enforcement dates and build controls and evidence that satisfy several regimes at once.

## What happened

### Washington's cyber deadlines have slipped, and Ottawa's regime has not started

Start with the dates that moved. The Cybersecurity Maturity Model Certification (CMMC) is the US Department of War's (formerly Department of Defense) programme that adds third-party audits to contractors' self-assessments against NIST SP 800-171, a control baseline from NIST, the US federal standards agency. On 2026-07-13 the department suspended Phase 2, the third-party step planned for 2026-11-10, pending a 60-day review with no published outcome ⚠️ verify. [Crowell](https://www.crowell.com/en/insights/client-alerts/department-of-war-immediately-suspends-cmmc-phase-ii-requirements-launches-60-day-reform-review) ([Radar](/grc-insights/radar/#us-cmmc))

Incident reporting has stalled too. The Cyber Incident Reporting for Critical Infrastructure Act of 2022 (CIRCIA) tells CISA, the US federal cyber agency, to write reporting rules. Its April 2024 proposal set 72 hours for covered incidents and 24 hours for ransom payments. The final rule missed its October 2025 statutory deadline and a May 2026 target ⚠️ verify. [Hunton](https://www.hunton.com/privacy-and-cybersecurity-law-blog/cisa-plans-to-finalize-cyber-incident-reporting-regulations-in-september-2026)

Canada's version is law but not live. Bill C-8 received Royal Assent on 2026-06-15 and created the Critical Cyber Systems Protection Act (CCSPA), which will require designated operators in sectors such as finance and telecom to run cyber programmes and report incidents; as of about 2026-10-01 it had no in-force order, no regulations and no designations ⚠️ verify. [openparliament.ca](https://openparliament.ca/bills/45-1/C-8/) ([Radar](/grc-insights/radar/#ca-c8-cyber)) What has started is the Canadian Program for Cyber Security Certification (CPCSC) for defence suppliers: its self-attested Level 1 arrived on 2026-04-14, with no official dates for Levels 2 and 3. [PSPC](https://www.canada.ca/en/public-services-procurement/news/2026/04/government-of-canada-introduces-level-1-of-canadian-program-for-cyber-security-certification.html)

I read these pauses as moving the paperwork, not the controls.

**Takeaway:** Keep building to NIST SP 800-171 and a 72-hour incident clock; take the enforcement dates out of the budget.

**Open question:** Will the CMMC review simplify the programme, or reopen work contractors have already paid for?

### Europe's product-security reporting clock is already running

Europe went the other way. The Cyber Resilience Act (CRA, Regulation (EU) 2024/2847) sets security duties for manufacturers of products with digital elements sold in the EU. Since 2026-09-11, they must report actively exploited vulnerabilities and severe incidents to ENISA, the EU cybersecurity agency: an early warning within 24 hours, a notification within 72 hours, then a final report ⚠️ verify. [European Commission](https://digital-strategy.ec.europa.eu/en/policies/cra-reporting) ([Radar](/grc-insights/radar/#eu-cra))

The 24-hour warning matches CIRCIA's fastest proposed clock, and it applies now. I expect a team built for the CRA to cover the slower clocks too.

**Takeaway:** If you ship connected products into the EU, test a 24-hour early warning on a weekend.

**Open question:** Where does a SaaS product with a downloadable agent or app sit: inside the CRA or outside it?

### FedRAMP 20x turns cloud authorization into continuous evidence

While the rules slip, assurance is changing format. FedRAMP is the US federal authorization programme for cloud services sold to agencies. Its Rev5 route relies on document-heavy packages; FedRAMP 20x replaces them with machine-validated Key Security Indicators (KSIs). [FedRAMP](https://www.fedramp.gov/20x/)

The first Moderate pilot authorizations came on 2026-03-06, and six more on 2026-04-27. Phase 3 is now active. On 2027-06-11, FedRAMP plans to stop accepting new Rev5 certifications. [FedRAMP](https://www.fedramp.gov/20x/) ([Radar](/grc-insights/radar/#us-fedramp-20x))

The bigger change is evidence that systems generate and machines check. I expect it to be reusable in a way a static package never was.

**Takeaway:** If US agencies are on your roadmap, plan for 20x, not Rev5, and automate evidence now.

**Open question:** Will commercial customers and auditors accept KSI-style automated evidence, or keep asking for the narrative?

### ISO 42001 is landing as a sales credential, not a legal shield

The same logic applies to AI. ISO/IEC 42001:2023 is the international AI management-system standard, certified by audit like ISO 27001. It is landing in procurement, not law: a voluntary certificate vendors use to stand out in due diligence. It is not a harmonised standard under the EU AI Act, the EU's AI law, so it gives no legal presumption of conformity ⚠️ verify. [Radar](/grc-insights/radar/#global-iso-42001)

Buyers are asking anyway. ServiceNow, Salesforce and Google each publish a 42001 certification with product-specific scopes. [ServiceNow](https://www.servicenow.com/blogs/2025/iso-certification-ai-management-system), [Salesforce](https://compliance.salesforce.com/categories/iso-42001), [Google Cloud](https://cloud.google.com/security/compliance/iso-42001) The Cloud Security Alliance (CSA), a cloud-security industry body, built 42001 certification into its STAR for AI Level 2 designation on 2025-11-20. [CSA STAR](https://cloudsecurityalliance.org/star)

I expect procurement questionnaires, not regulators, to drive 42001 for now: one certificate answers buyers in several markets.

**Takeaway:** Scope 42001 to the products customers ask about, and never present it as EU AI Act compliance.

**Open question:** When EU-endorsed AI standards arrive, will buyers still value a 42001 certificate, or treat it as a stepping stone?

> **This week:** nothing material found in the research window's final week.

## Where I land

Stop treating government enforcement dates as the plan. In one summer, CMMC's next phase was paused, CIRCIA missed another target and Canada's CCSPA waited for designations. Anyone who planned around those dates is re-planning. The obligation that did arrive on time, CRA reporting, came with a 24-hour clock.

I would build one base layer and reuse it everywhere: ISO 27001:2022 and SOC 2 as the customer-facing currency, NIST SP 800-171 and 800-53 (the federal control catalogue behind FedRAMP) underneath for government work, and an incident process that can produce a 24-hour early warning. On top, ISO 42001 and CSA STAR for AI carry the AI story customers ask about. Each piece answers several regimes, and none depends on a regulator's calendar.

Format matters as much as framework. FedRAMP 20x signals that assurance is moving from documents to telemetry. I want evidence generated by systems that serves a federal assessor, a bank's vendor review and an ISO auditor alike.

The trade-off I accept is spending on controls before any regulator requires them, and redoing some government-specific paperwork, for CMMC or later CPCSC levels, after the reviews land. I would rather redo paperwork than rebuild controls under a deadline that suddenly becomes real.

## The questions still open

- How far self-attestation will carry Canadian defence suppliers: Ottawa has set no dates for CPCSC Levels 2 and 3, so nobody can yet price the audit step.
- How AI assurance converges: SOC 2 has no AI-specific criteria ⚠️ verify ([CSA Labs](https://labs.cloudsecurityalliance.org/research/csa-research-note-soc2-ai-controls-gap-20260830-csa-styled/)) and 42001 carries no EU legal presumption, so auditors and buyers are improvising.

## What to do this quarter

- Run a tabletop on an actively exploited vulnerability and time how long a 24-hour early warning takes.
- Map controls once: NIST SP 800-171 and 800-53 to ISO 27001:2022 and SOC 2, with evidence in one place.
- Ask key vendors for their current ISO 27001:2022 certificate and check its scope.
- If you supply Canada's defence sector, complete CPCSC Level 1 self-attestation before a contract asks for it.

### If you work in…

| Sector | What it means | What to do |
|---|---|---|
| Cloud | FedRAMP plans to stop accepting new Rev5 certifications on 2027-06-11. | Plan new federal authorizations for 20x. |
| Product / SaaS | Customers ask for ISO 27001, SOC 2 and now 42001. | Scope 42001 to the AI products buyers ask about. |
| Hardware | CRA vulnerability reporting applies now ⚠️ verify. | Test the 24-hour early warning end to end. |
| Banking / FinServ | Finance operators can be designated under the CCSPA ⚠️ verify. | Keep a 72-hour incident playbook ready. |

## On the radar

No firm security dates fall within 90 days of 2026-11-22. The next is further out:

- **2027-06-11** (beyond 90 days): FedRAMP plans to stop accepting new Rev5 certifications ([Radar](/grc-insights/radar/#us-fedramp-20x))
- Everything else, dated or not: [the full Radar](/grc-insights/radar/)

## Sources

1. Crowell & Moring (secondary): [Department of War suspends CMMC Phase II](https://www.crowell.com/en/insights/client-alerts/department-of-war-immediately-suspends-cmmc-phase-ii-requirements-launches-60-day-reform-review)
2. Hunton (secondary): [CISA plans to finalize CIRCIA regulations](https://www.hunton.com/privacy-and-cybersecurity-law-blog/cisa-plans-to-finalize-cyber-incident-reporting-regulations-in-september-2026)
3. openparliament.ca (secondary): [Bill C-8](https://openparliament.ca/bills/45-1/C-8/)
4. PSPC: [Level 1 of the CPCSC](https://www.canada.ca/en/public-services-procurement/news/2026/04/government-of-canada-introduces-level-1-of-canadian-program-for-cyber-security-certification.html)
5. European Commission: [CRA reporting](https://digital-strategy.ec.europa.eu/en/policies/cra-reporting)
6. FedRAMP: [FedRAMP 20x](https://www.fedramp.gov/20x/)
7. ServiceNow: [ISO 42001 certification](https://www.servicenow.com/blogs/2025/iso-certification-ai-management-system)
8. Salesforce: [ISO 42001](https://compliance.salesforce.com/categories/iso-42001)
9. Google Cloud: [ISO/IEC 42001](https://cloud.google.com/security/compliance/iso-42001)
10. Cloud Security Alliance: [STAR registry](https://cloudsecurityalliance.org/star)
11. CSA Labs (secondary): [SOC 2 AI controls gap](https://labs.cloudsecurityalliance.org/research/csa-research-note-soc2-ai-controls-gap-20260830-csa-styled/)
