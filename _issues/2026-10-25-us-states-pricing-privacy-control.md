---
title: "In the US, pricing just became a privacy control, and the states still set the rules"
issue: 4
series: catch-up
date: 2026-11-01
calendar_date: 2026-10-25
regions: [US]
sectors: [retail, tech, saas]
categories: [privacy-law, ai-governance, enforcement]
description: "The FTC wants to see how Target and Walmart set prices from personal data, and no federal law is coming to override the states. I would build to the state floor, starting with pricing inputs."
cover: "https://images.unsplash.com/photo-1647427017067-8f33ccbae493?w=1600&q=75&auto=format&fit=crop"
cover_alt: "A cashier tapping a point-of-sale screen at a store checkout"
cover_credit: "Photo: Simon Kadula / Unsplash"
cover_credit_url: "https://unsplash.com/photos/a-person-is-using-a-pos-machine-in-a-store--gkndM1GvSA"
image: /assets/og-v2/2026-10-25-us-states-pricing-privacy-control.png
---

## In brief

- On 28 October the US Federal Trade Commission ordered nine companies, including Target and Walmart, to explain how personal data and loyalty status change the prices individual customers see.
- 24 US states now have comprehensive privacy laws, 20 of them in force, and no federal law overrides them. The push to preempt state AI laws has produced a paused lawsuit and a proposed policy statement, not a statute.
- 1 January 2027 is the next big date: California's rules on automated decisions and Colorado's rewritten AI law both start then.

## The story so far

The US has no general federal privacy law. Instead, states pass their own consumer privacy laws, enforced by state attorneys general and, in California, by a dedicated regulator, the California Privacy Protection Agency (now branded CalPrivacy). The Federal Trade Commission (FTC) polices unfair and deceptive practices nationally, which lets it act on privacy, data security and misleading AI claims.

Since late 2025, the White House has pushed to stop states regulating AI. Executive Order 14365 set up a Department of Justice task force to challenge state AI laws, and federal lawmakers have floated moratoriums. For a Canadian or US company selling into several states, the planning question has been whether to build to the state rules or wait for Washington to override them.

This issue argues that waiting is the riskier bet, and that the newest privacy exposure for retailers sits in an unexpected place: how prices are set.

## What happened

### The FTC asked nine companies how personal data sets their prices

The FTC opened a new front this month. On 28 October it voted 2-0 to send orders under Section 6(b) of the FTC Act, its power to compel information for a market study, to Delta, United, JetBlue, Lyft, Uber, DoorDash, Instacart, Target and Walmart. The orders ask whether prices vary by person based on loyalty membership or analysis of personal data, and require the companies to document their pricing "inputs, tools and procedures". Responses are due 45 days after receipt. [FTC](https://www.ftc.gov/news-events/news/press-releases/2026/10/ftc-launches-personalized-pricing-compensation-inquiry)

A 6(b) study carries no penalty, but it rarely stays a study. The FTC proposed a policy statement on 19 August saying that hiding the use of personal data to set individual prices can be unfair or deceptive; it has not been finalised. States are moving faster. Maryland's ban on surveillance pricing for food took effect on 1 October 2026, and New Jersey's grocery pricing law starts on 1 August 2027 with a right for consumers to sue. [Sidley](https://www.sidley.com/en/insights/publications/2026/10/from-disclosures-to-prohibitions-the-new-legal-landscape-on-the-use-of-consumer-data) [New Jersey Governor](https://www.nj.gov/governor/news/2026/20260723a.shtml)

**Takeaway:** If a pricing or loyalty engine uses personal data, it now belongs in the privacy data map, with an owner who can explain its inputs.

**Open question:** Could your pricing team list every personal-data input their models use, and would the privacy notice describe them?

### State enforcement keeps targeting the mechanics

The fines this year have mostly been about plumbing, not principles. California's Attorney General holds the record: a $12.75M settlement with General Motors over driver data on 8 May 2026, the largest penalty under the California Consumer Privacy Act so far, after $2.75M from Disney over opt-out failures in February. [California AG](https://oag.ca.gov/news/press-releases/when-it-comes-data-privacy-consumers-must-be-driver%E2%80%99s-seat-attorney-general) CalPrivacy fined Ford $375,703 for adding unnecessary friction to its opt-out process. [CalPrivacy](https://privacy.ca.gov/2026/03/ford-to-change-practices-pay-fine-for-adding-unnecessary-friction-to-opt-out-process/)

October added more. California's Attorney General secured $6M from the company formerly known as 23andMe over genetic data. [California AG](https://oag.ca.gov/news/press-releases/attorney-general-bonta-secures-6-million-settlement-23andme-litigation) Connecticut settled with Frontier Communications for $625,000 over a data breach. [Connecticut AG](https://portal.ct.gov/ag/press-releases/2026-press-releases/attorney-general-tong-announces-settlement-with-frontier-over-data-breach) Connecticut's amended privacy law also took effect on 1 October, banning the sale of precise geolocation data. [Connecticut AG](https://portal.ct.gov/ag/press-releases/2026-press-releases/rights-and-requirements-related-to-new-and-updated-privacy-laws)

The FTC's own orders this year carried conduct terms rather than large fines. In May it banned a Kochava subsidiary from selling sensitive location data without consent and required it to check that its data suppliers had obtained consent. [FTC](https://www.ftc.gov/news-events/news/press-releases/2026/05/ftc-ban-kochava-subsidiary-selling-sensitive-location-data-settle-charges-they-sold-location-data) I would read those as the more expensive outcome: an order that runs for years shapes product decisions long after a fine is paid.

**Takeaway:** Test your opt-out and deletion flows the way a regulator would, as a customer, before someone else does.

**Open question:** When did someone last complete your opt-out flow end to end and time how long it took?

### Preemption is noise; 1 January 2027 is the date

Federal preemption of state AI laws has not arrived. An executive order cannot itself override state law; that takes Congress or a valid federal rule. [Executive Order 14365](https://www.govinfo.gov/content/pkg/FR-2025-12-16/html/2025-23092.htm) The Department of Justice joined xAI's challenge to Colorado's original AI law in April, and a court order paused enforcement of that law while the case proceeds. [McDermott](https://www.mcdermottlaw.com/insights/colorado-ai-law-in-flux-comprehensive-replacement-bill-signed-after-federal-court-blocks-predecessors-enforcement/) The FTC proposed a policy statement in July claiming some state AI laws are preempted; it is still a proposal. [FTC](https://www.ftc.gov/news-events/news/press-releases/2026/07/ftc-seeks-public-comment-policy-statement-addressing-ai-accuracy)

The state rules keep their dates. Colorado replaced its old law in May with SB 26-189, a narrower regime that starts on 1 January 2027: notice when automated decision-making is used in a consequential decision, an explanation of adverse outcomes, and a route to human review. The Attorney General held a hearing on its rules on 26 October and has not yet adopted them. [McDermott](https://www.mcdermottlaw.com/insights/colorado-ai-law-in-flux-comprehensive-replacement-bill-signed-after-federal-court-blocks-predecessors-enforcement/) California's rules on automated decision-making technology (ADMT) start the same day. [CPPA](https://cppa.ca.gov/regulations/ccpa_updates.html) Oklahoma's and Louisiana's privacy laws do too. [MultiState](https://www.multistate.us/insider/2026/10/28/twenty-four-states-now-have-comprehensive-consumer-privacy-laws)

**Takeaway:** California and Colorado now ask for the same core: notice, an explanation when the outcome is adverse, and human review. One process can serve both.

**Open question:** If a customer asked tomorrow why an automated system turned them down, who would write the explanation, and from what record?

> **This week:** On 26 October the FTC and 20 states sued Dollar General over register prices higher than shelf prices ([FTC](https://www.ftc.gov/news-events/news/press-releases/2026/10/ftc-state-partners-sue-dollar-general-charging-consumers-more-advertised-many-products)), a pricing case rather than a privacy case, but another sign that retail pricing is where US regulators are looking.

## How I'd approach it

The uncertainty I would name first is not whether federal preemption arrives. It is how much of a company's privacy exposure sits in systems nobody files under privacy: pricing engines, loyalty programmes and decision tools owned by commercial teams.

I would build to the state floor and stop treating preemption as a planning assumption. The Senate voted 99-1 against a moratorium in 2025, and the live federal draft would spare state rules on how AI is used. If a federal law does arrive, a programme built to the strictest states will need trimming, not rebuilding.

For 1 January 2027, I would build one automated-decision capability rather than one per state: an inventory of decisions that affect consumers or employees, a notice before use, a way to explain an adverse outcome from the record, and a human who can review it. Employment AI notice duties in Illinois and Connecticut fit the same process.

Then I would bring pricing into the privacy programme. That means mapping which personal data feeds pricing and loyalty engines, deciding what the notice says about it, and treating location, health, genetic and children's data as never sold, nationally, rather than state by state.

The trade-off: a national floor set by the strictest states costs more than tailoring to each one, and some states will never ask for it. I find that cost easier to defend than a programme that depended on Washington moving first.

## Questions to take to your team

- **Who owns the data inputs to your pricing and loyalty models?** They often sit with commercial or data science teams, outside the privacy data map.
- **Which of your automated decisions would count as "consequential" in Colorado or "significant" in California?** Credit, housing, employment and insurance decisions are obvious; fraud and account-closure tools are easy to miss.
- **Where do you still decide privacy controls state by state?** Each exception is a place a regulator can find a gap.

## What to do this quarter

- Map the personal data used by pricing and loyalty engines and record an owner for each input.
- Inventory automated decisions about consumers and employees that start under California and Colorado rules on 1 January 2027.
- Test opt-out and deletion flows end to end, as a customer, and fix any extra steps.
- Confirm which state privacy laws apply to you in 2027, including Oklahoma and Louisiana.
- Confirm that precise geolocation, health, genetic and children's data are not sold anywhere you operate.

### If you work in…

| Sector | What it means | What to do |
|---|---|---|
| Retail | Personalized pricing and loyalty data are now under FTC study and state bans. | Map pricing inputs and align the privacy notice. |
| Tech | California and Colorado automated-decision rules start 1 January 2027. | Build one notice, explanation and human-review process. |
| Product / SaaS | Customers will ask you to support their notice and explanation duties. | Prepare decision logs and explanation features for customers. |

## On the radar

- **1 January 2027**: Colorado SB 26-189 and California ADMT rules take effect ([Radar](/grc-insights/radar/#us-co-ai-act))
- **1 January 2027**: Oklahoma and Louisiana privacy laws take effect ([Radar](/grc-insights/radar/#us-state-privacy))
- **1 May 2027**: Alabama privacy law takes effect ([Radar](/grc-insights/radar/#us-state-privacy))
- **1 August 2027**: New Jersey grocery pricing law takes effect, with a private right of action

## Sources

1. FTC: [FTC launches personalized pricing and compensation inquiry](https://www.ftc.gov/news-events/news/press-releases/2026/10/ftc-launches-personalized-pricing-compensation-inquiry)
2. FTC: [Kochava subsidiary banned from selling sensitive location data](https://www.ftc.gov/news-events/news/press-releases/2026/05/ftc-ban-kochava-subsidiary-selling-sensitive-location-data-settle-charges-they-sold-location-data)
3. FTC: [Proposed policy statement on AI accuracy](https://www.ftc.gov/news-events/news/press-releases/2026/07/ftc-seeks-public-comment-policy-statement-addressing-ai-accuracy)
4. FTC: [FTC and states sue Dollar General](https://www.ftc.gov/news-events/news/press-releases/2026/10/ftc-state-partners-sue-dollar-general-charging-consumers-more-advertised-many-products)
5. California AG: [General Motors settlement](https://oag.ca.gov/news/press-releases/when-it-comes-data-privacy-consumers-must-be-driver%E2%80%99s-seat-attorney-general)
6. California AG: [23andMe settlement](https://oag.ca.gov/news/press-releases/attorney-general-bonta-secures-6-million-settlement-23andme-litigation)
7. CalPrivacy: [Ford fined for opt-out friction](https://privacy.ca.gov/2026/03/ford-to-change-practices-pay-fine-for-adding-unnecessary-friction-to-opt-out-process/)
8. CPPA: [CCPA regulations updates (ADMT, risk assessments, audits)](https://cppa.ca.gov/regulations/ccpa_updates.html)
9. Connecticut AG: [Frontier settlement](https://portal.ct.gov/ag/press-releases/2026-press-releases/attorney-general-tong-announces-settlement-with-frontier-over-data-breach)
10. Connecticut AG: [Rights and requirements under new and updated privacy laws](https://portal.ct.gov/ag/press-releases/2026-press-releases/rights-and-requirements-related-to-new-and-updated-privacy-laws)
11. New Jersey Governor: [Fair Price Protection Act signed](https://www.nj.gov/governor/news/2026/20260723a.shtml)
12. Federal Register: [Executive Order 14365](https://www.govinfo.gov/content/pkg/FR-2025-12-16/html/2025-23092.htm)
13. MultiState (secondary): [Twenty-four states now have comprehensive consumer privacy laws](https://www.multistate.us/insider/2026/10/28/twenty-four-states-now-have-comprehensive-consumer-privacy-laws)
14. McDermott (secondary): [Colorado AI law in flux](https://www.mcdermottlaw.com/insights/colorado-ai-law-in-flux-comprehensive-replacement-bill-signed-after-federal-court-blocks-predecessors-enforcement/)
15. Sidley (secondary): [From disclosures to prohibitions: consumer data and pricing](https://www.sidley.com/en/insights/publications/2026/10/from-disclosures-to-prohibitions-the-new-legal-landscape-on-the-use-of-consumer-data)
