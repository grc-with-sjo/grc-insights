---
title: "SOC 2 finally talks about AI. Your vendor still doesn't have to."
issue: 6
series: field-notes
date: 2026-11-15
regions: [US, GLOBAL]
sectors: [saas, cloud, tech]
categories: [frameworks, ai-governance, third-party-risk]
description: "The AICPA's draft 2027 SOC 2 criteria name the right AI risks, then make every one optional. A clean report still won't tell you the thing you most need to know: where your vendor uses AI."
image: /assets/og-v2/2026-11-15-soc2-finally-talks-about-ai.png
essay: true
cover: "https://images.unsplash.com/photo-1763568258235-f40425a94af9?w=1600&q=75&auto=format&fit=crop"
cover_alt: "A code editor with an AI Actions menu open, offering options such as Generate Code and Find Problems"
cover_credit: "Photo: Daniil Komov / Unsplash"
cover_credit_url: "https://unsplash.com/photos/computer-screen-displaying-code-with-a-context-menu-bglsBQQwMWA"
---

No exceptions noted.

Three words every vendor wants, and I have stopped finding them reassuring.

A clean SOC 2 report lands in my inbox. Access reviewed. Changes approved. And I still can't tell you the one thing I opened it to find out: where this vendor uses AI.

It might be running their support desk. It might be writing the code I'm about to depend on. It might be reading my data inside the product. Those are three different risks, and the report meant to reassure me is silent on all of them.

So when the AICPA, the body behind SOC 2, published its draft 2027 criteria on 27 October, I read all 58 pages hoping that silence was over. It is, partly. The draft is late, it is welcome, and it still leaves the question I started with unanswered.

## The people who wrote this have been paying attention

The list of risks is good. It names "prompt injection, jailbreak chaining, and data poisoning". It wants AI monitored for "bias amplification, unexpected model outputs, or unintended behaviors". It asks that users be told when output comes from AI, that access reviews catch "AI or other technology accounts that do not need access", and that vendor reviews cover "AI models, APIs, or plugins".

If you handed me that list and asked what keeps AI risk teams up at night, I would not change much.

Then you turn back to the draft's Background section, to paragraph .08, where it explains how those items are meant to be used.

## Every word of it is optional

The AI items are points of focus, and the draft is direct about what that means: using the criteria "does not require an assessment of whether each point of focus is addressed", and "each point of focus does not require a specific control".

> On paper, a vendor can leave every one of these unaddressed, and nothing in the criteria says the opinion has to change.

The AICPA's guidance on applying the criteria to AI is marked "currently under development", so auditors do not yet have it either.

The most concrete controls have a second hurdle. "Pre-deployment validation, bias testing, and revalidation upon retraining" and "human review or override" sit under processing integrity, a category each vendor chooses whether to include. The draft itself notes that security is the category addressed in most engagements. A security-only report never gets that far, and those are exactly the controls I would want behind an AI that makes decisions about my customers.

Then there is the calendar. If approved, the criteria apply to engagements beginning on or after 31 December 2027, with early adoption permitted. Agents are holding credentials and acting inside production systems today. The reports we rely on could stay on the old criteria for another full year.

## The biggest gap is the one nobody is demoing

Almost all of this draft looks at AI in the product. Its language keeps returning to "AI components of the system".

Look at how software gets built now. Coding assistants draft the change, and agents increasingly open the pull request. The draft's change-management section does add AI points, but they cover training data and adversarial inputs. The points on authorising, testing and approving a change do not mention AI at all. Nothing asks who reviewed code a model wrote, what an agent is allowed to merge, or what evidence that review left behind.

The closest it comes is a line about restricting "unilateral code development or configuration and implementation by a single user". It was written with a person in mind. I would like to know what the auditor does when that single user is an agent.

So a vendor could ship AI-written code to production all year, and nothing in these criteria would make the report say so. The one place that could still change is the description criteria, the rules for what a vendor must tell you about its system. The AICPA's draft page lists them as "[Coming Soon](https://www.aicpa-cima.com/resources/download/aicpa-exposure-drafts-proposed-2027-soc-2-trust-services-criteria-and-description-criteria)". That is the document I will be waiting for.

## Others are moving faster, in pieces

Nothing on the market closes this alone, but SOC 2 is no longer the only place to look.

ISO/IEC 42001 is a certifiable management system standard for AI, which tells you whether anyone is governing it. ISO/IEC 27090, published in October, is guidance on AI-specific threats such as data poisoning and model theft. Cloud Security Alliance's STAR for AI Level 2, announced on 27 October, adds third-party-verified AI assurance on top of ISO certification and its AI Controls Matrix. AIUC-1 goes furthest on behaviour, with live testing of AI agents and quarterly updates.

The detail I keep coming back to is that the AICPA is rolling out a joint SOC 2 and AIUC-1 engagement with AIUC, with full launch expected in early 2027. I read that as the AICPA conceding the point: for AI agents, SOC 2 on its own was not going to be enough.

## So the rigour has to come from people

SOC 2 is established, auditors know how to run it, and buyers trust the format. I don't expect that to change, and I wouldn't want to start over. But if we keep relying on it, the weight shifts to two groups.

The first is auditors. The criteria let an engagement stop at the minimum, so it falls to them to dig deeper: to ask where AI is used, to test the AI risks that matter for that system, and to be plain about what was and wasn't examined.

The second is in-house GRC teams. Enforcement and rigour can't wait for a criterion to demand them, and they can't depend on whether the AI touches the product. An agent with production access, a model drafting code and an assistant reading support tickets each need an owner, a control and evidence, whether or not a customer ever sees them.

## What I would do on Monday

I would keep asking for the SOC 2 report, and stop letting it end the conversation.

For every critical vendor I would ask one question the report cannot answer: where do you use AI, to run the business, to build the software, or inside what I am buying? The answer decides everything after it. AI in the product points me to processing integrity and an AI-specific assurance. AI in the build points me to how code gets reviewed. AI in operations points me to access and data handling.

I would put the answer in the contract, because a questionnaire goes stale the day it is signed. And I would use the draft's AI points of focus as a checklist on my own programme now, since it is the best preview we have of what auditors will eventually ask.

It will slow some procurement, and vendors will push back while their auditors are not asking yet. I can live with that. What I cannot do any more is read "no exceptions noted" and assume that AI was part of what got examined.

The comment window closes on 15 January 2027. If you depend on these reports, tell the AICPA what you need them to say about how software gets built.

## Sources

1. AICPA: [AICPA proposes update of SOC 2 Trust Services Criteria](https://www.aicpa-cima.com/news/article/aicpa-proposes-update-of-soc-2-r-trust-services-criteria-to-enhance-the-relevance-usability-and-value-of-cpas-reports)
2. AICPA: Proposed 2027 SOC 2 Trust Services Criteria, exposure draft, 27 October 2026
3. AICPA: [Joint AICPA and AIUC assurance offering](https://www.aicpa-cima.com/news/article/auditors-meet-urgent-demand-for-ai-assurance-with-new-offering-from-aicpa-and-aiuc)
4. ISO: [ISO/IEC 27090:2026](https://www.iso.org/standard/27090)
5. Cloud Security Alliance: [STAR for AI Level 2](https://cloudsecurityalliance.org/press-releases/2026/10/27/cloud-security-alliance-launches-star-for-ai-level-2-to-strengthen-ai-governance-and-trust)
