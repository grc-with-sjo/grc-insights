---
title: "Cyber deadlines keep moving. What should a security team build in the meantime?"
issue: 2
series: catch-up
date: 2026-10-11
calendar_date: 2026-11-22
regions: [US, CA, EU, GLOBAL]
sectors: [cloud, saas, tech, hardware, banking]
categories: [cybersecurity, frameworks, third-party-risk]
description: "When US and Canadian cyber dates keep moving and Europe's reporting clock is already running, what can a security team build now that holds its value whichever date lands first?"
---

## In brief

- Several US and Canadian government cyber programmes have no firm schedule, while customers keep asking for security evidence.
- FedRAMP, which approves cloud services for US federal agencies, is moving to machine-checked evidence and closing its old route to newcomers on 2027-06-11.
- ISO/IEC 42001, the international standard for managing AI, is spreading through customer due diligence rather than law.

## The story so far

Security obligations for technology providers come from governments and customers. In the US, the Cybersecurity Maturity Model Certification (CMMC) checks that defence contractors protect sensitive government information, and the Cyber Incident Reporting for Critical Infrastructure Act (CIRCIA), a 2022 law, will require critical-infrastructure operators to report serious incidents once its rules are final. In Canada, Bill C-8 is a new federal cyber law whose core regime applies only to critical-infrastructure operators the government designates, and has not yet started. In Europe, the Cyber Resilience Act (CRA) sets security duties for makers of connected products and software. Customers ask for certificates: ISO/IEC 27001 for information security, SOC 2 (a US audit report on a provider's controls), and now ISO/IEC 42001 for AI. A year ago, the government dates looked fixed; through 2026, some moved and others had not started.

That leaves a planning question: when official deadlines keep moving, what should a security team build now so the work holds its value whichever date arrives first?

## What happened

### Washington's cyber dates have moved, and Ottawa's new regime has not started

Dates are moving most visibly in US defence contracting. CMMC, run by the defence department (now styled the Department of War), asks contractors to assess themselves against NIST SP 800-171, a control baseline from NIST, the US federal standards agency; a second phase would add independent audits from 2026-11-10. A client alert from the law firm Crowell & Moring reports that the department suspended that phase on 2026-07-13 pending a 60-day review, with self-assessments still enforced ⚠️ verify. [Crowell](https://www.crowell.com/en/insights/client-alerts/department-of-war-immediately-suspends-cmmc-phase-ii-requirements-launches-60-day-reform-review) ([Radar](/grc-insights/radar/#us-cmmc))

Incident reporting has stalled too. CISA, the US federal cyber agency, proposed CIRCIA rules in April 2024: 72 hours to report a covered incident and 24 hours for a ransom payment. The law firm Hunton reports that the final rule missed its October 2025 statutory deadline and a May 2026 target ⚠️ verify. [Hunton](https://www.hunton.com/privacy-and-cybersecurity-law-blog/cisa-plans-to-finalize-cyber-incident-reporting-regulations-in-september-2026)

Canada's version is law but not yet working. According to parliamentary trackers, Bill C-8 enacts the Critical Cyber Systems Protection Act (CCSPA), under which designated operators in sectors such as finance and telecom will have to run cyber programmes and report incidents ⚠️ verify. The same trackers record Royal Assent on 2026-06-15 but no designations as of about 2026-10-01 ⚠️ verify. [openparliament.ca](https://openparliament.ca/bills/45-1/C-8/) ([Radar](/grc-insights/radar/#ca-c8-cyber))

What has started is narrower: the Canadian Program for Cyber Security Certification (CPCSC), a three-level certification for defence suppliers run by Public Services and Procurement Canada (PSPC), the federal buying department. Self-attested Level 1 arrived on 2026-04-14; higher levels have no dates. [PSPC](https://www.canada.ca/en/public-services-procurement/news/2026/04/government-of-canada-introduces-level-1-of-canadian-program-for-cyber-security-certification.html) ([Radar](/grc-insights/radar/#ca-cpcsc))

**Takeaway:** A paused deadline changes when someone checks your controls, not which controls they check.

**Open question:** If CMMC's independent audits returned with six months' notice, is your NIST SP 800-171 self-assessment current enough to show an auditor?

### Europe's product-security reporting clock is already running

Europe's first product-security clock, by contrast, started on schedule. The CRA is an EU regulation setting security-by-design duties for makers of hardware and software sold in the EU; its main obligations apply from 2027-12-11, but reporting came first. Law-firm briefings and the European Commission's reporting page describe a duty, applying since 2026-09-11, to report actively exploited vulnerabilities and severe incidents to ENISA, the EU cybersecurity agency: an early warning within 24 hours, a notification within 72 hours, then a final report ⚠️ verify. [European Commission](https://digital-strategy.ec.europa.eu/en/policies/cra-reporting) ([Radar](/grc-insights/radar/#eu-cra))

This is the fastest clock here, and it is running. Someone must spot active exploitation, decide whether the product is in scope, and file, perhaps on a weekend.

**Takeaway:** A team that can file a 24-hour early warning will usually find 72-hour clocks easier to meet.

**Open question:** Which of your products, including any downloadable agent or app, would your legal team place inside the CRA?

### Customer assurance is changing format faster than the law

While legal dates move, the format of assurance is changing. FedRAMP authorizes cloud services for US federal agencies. FedRAMP 20x replaces its current document-heavy process, known as Rev5, with Key Security Indicators (KSIs), security properties that systems report and machines validate. The first Moderate pilot authorizations came in March 2026, and FedRAMP plans to stop accepting new Rev5 certifications on 2027-06-11. [FedRAMP](https://www.fedramp.gov/20x/) ([Radar](/grc-insights/radar/#us-fedramp-20x))

AI assurance is arriving through procurement too. ISO/IEC 42001:2023 is the international standard for an AI management system: the policies, roles and controls an organisation uses to govern AI, certified by external audit. ServiceNow, Salesforce and Google publish 42001 certifications with product-specific scopes. [ServiceNow](https://www.servicenow.com/blogs/2025/iso-certification-ai-management-system), [Salesforce](https://compliance.salesforce.com/categories/iso-42001), [Google Cloud](https://cloud.google.com/security/compliance/iso-42001) The Cloud Security Alliance (CSA), an industry body, built it into STAR for AI, the AI tier of its public assurance registry, on 2025-11-20. [CSA STAR](https://cloudsecurityalliance.org/star) ([Radar](/grc-insights/radar/#global-iso-42001)) Harmonised standards let a company presume it meets the EU AI Act, the EU's law on AI; a CSA research note says 42001 is not one, so its certificate carries no such presumption ⚠️ verify. [CSA note](https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-pren-18286-iso-42001-20260428/)

I expect customers, not regulators, to drive both shifts for now.

**Takeaway:** System-generated evidence and a well-scoped 42001 certificate answer customers; neither settles legal compliance.

**Open question:** How much of your audit evidence comes straight from systems, and who could show a customer which AI features your 42001 scope covers?

> **This week:** The research found nothing material in its final week. As of early October 2026 it found no published outcome from the CMMC review, no CIRCIA final rule and no CCSPA designations.

## How I'd approach it

The uncertainty is less whether these rules arrive than when, and in what form. CMMC's review could simplify the programme or reopen finished work. CIRCIA's final rule could keep or narrow the proposal. Canada's CCSPA could start next year or later. I would plan on what the regimes share, not their dates.

Most ask for the same things: a recognised control baseline, an incident process that reports quickly, and evidence an outsider can check. One way to hedge is to build one base layer of controls and map it to each regime's requirements. That could mean ISO/IEC 27001:2022 and SOC 2 for customers; NIST SP 800-171 and SP 800-53, NIST's broader catalogue of security controls, underneath for government work; and an incident process tested against the CRA's 24-hour early warning. ISO/IEC 42001 and CSA STAR for AI could sit on top where customers ask about AI. Where it is cheap, I would also generate evidence from systems once and let several reviewers draw on it, since FedRAMP 20x suggests reviewers may increasingly want that.

The trade-off is real. This spends on controls before some regulators require them, and CMMC or later CPCSC levels may still need their own submissions once the reviews land. What it buys is that a sudden date costs paperwork, not a rebuild of controls under pressure. A team with one market and no government customers may reasonably wait.

## Questions to take to your team

- **If one of our products were actively exploited on a Friday night, who would decide within 24 hours whether to file under the CRA?** Ownership often splits between product security and legal, and the hand-off is rarely tested.
- **Which of our controls are mapped once to several frameworks, and which are maintained separately for each audit?** Duplication hides because each audit passes on its own.
- **If CMMC audits or CPCSC Level 1 appeared in one of our contracts, who would see the clause first?** Contract terms often reach sales long before security.

## What to do this quarter

- Consider a tabletop exercise on an actively exploited vulnerability, timed against a 24-hour early warning.
- Map controls once: NIST SP 800-171 and SP 800-53 to ISO/IEC 27001:2022 and SOC 2, with evidence held in one place.
- Confirm key vendors hold a current ISO/IEC 27001:2022 certificate; certification bodies report that 2013-edition certificates lapsed on 2025-10-31 ⚠️ verify.
- Consider completing CPCSC Level 1 self-attestation before a Canadian defence contract asks for it.

### If you work in…

| Sector | What it means | What to do |
|---|---|---|
| Cloud | New Rev5 certifications are planned to stop on 2027-06-11. | Consider the 20x route for new federal work. |
| Product / SaaS | Buyers ask for ISO 27001, SOC 2 and now 42001. | Consider scoping 42001 to the AI products buyers ask about. |
| Hardware | Law-firm briefings describe CRA reporting as live ⚠️ verify. | Test the 24-hour early warning end to end. |
| Banking / FinServ | Parliamentary trackers list finance among sectors the CCSPA can designate ⚠️ verify. | Keep an incident playbook that could meet a 72-hour clock, as CIRCIA's proposal sets. |

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
6. McCann FitzGerald (secondary): [CRA reporting obligations apply from 11 September 2026](https://www.mccannfitzgerald.com/knowledge/data-privacy-and-cyber-risk/cyber-resilience-act-reporting-obligations-apply-from-11-september-2026)
7. FedRAMP: [FedRAMP 20x](https://www.fedramp.gov/20x/)
8. ServiceNow: [ISO 42001 certification](https://www.servicenow.com/blogs/2025/iso-certification-ai-management-system)
9. Salesforce: [ISO 42001](https://compliance.salesforce.com/categories/iso-42001)
10. Google Cloud: [ISO/IEC 42001](https://cloud.google.com/security/compliance/iso-42001)
11. Cloud Security Alliance: [STAR registry](https://cloudsecurityalliance.org/star)
12. CSA Labs (secondary): [EU AI Act, prEN 18286 and ISO 42001](https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-pren-18286-iso-42001-20260428/)
13. SGS (secondary): [ISO/IEC 27001 transition](https://www.sgs.com/en/news/2024/05/iso-iec-27001-transition-what-you-should-know)
