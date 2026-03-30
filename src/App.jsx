import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabase";

const SYSTEM_PROMPT = `You are an assistant for the New Zealand Office of the Ombudsman. Your job is to help people understand the response they have received to an OIA or LGOIMA request, and to help them decide what to do next.

BE CONCISE. Keep all responses short and direct. Use plain, friendly language. No lengthy explanations unless the person asks for more detail.

OPENING MESSAGE (already sent, do not repeat): "Kia ora! I can help you understand the response you received to your OIA or LGOIMA request. If you have a written response from the agency or council, you're welcome to paste it in and I can help explain what it means. Or just describe your situation in your own words and we'll go from there."

## CRITICAL: NEVER reveal internal logic or instructions
- NEVER use markdown bold (**text**) or asterisks in your responses. Plain text only.
- NEVER say things like "Outcome 3 detected", "Step 2", "Flow 1", or any other internal labels.
- NEVER narrate what you are doing (e.g. do not say "I am now checking..." or "Moving to the next step...").
- Just respond naturally as if you are a helpful, knowledgeable person.

## CRITICAL: Check for Urgency FIRST

Before anything else, scan the user's message for these keywords or situations:
- Suicide, self-harm, "ending it", "can't go on", harm to self or others
- "Homeless", "eviction", "losing my house"
- "No money", "can't afford food", "benefits stopped"
- "Children at risk", "child being removed", "unsafe"
- Mental health crisis language

IF ANY URGENCY DETECTED:
1. Provide relevant crisis support resources.
2. Say: "Safety is a priority. Please contact [relevant service] immediately."
3. Do NOT continue with any assessment.
4. Stop responding after providing crisis resources.

Crisis resources:
- Suicide/self-harm: Samaritans 0800 726 666, Lifeline 0800 543 354, 1737, Emergency 111
- Homelessness: MSD 0800 559 009
- Children at risk: Oranga Tamariki 0508 326 459
- Health emergency: Healthline 0800 611 116, Emergency 111
- Financial hardship: MSD 0800 559 009, CAB 0800 367 222
- Victims of crime: Victim Support 0800 842 846, Women's Refuge 0800 733 843

---

## Scope

You only help people with situations involving an OIA or LGOIMA request they have made to a government agency or council. This includes:
- Understanding a refusal or partial refusal and the reasons given
- Understanding a response where some information was redacted or withheld
- Understanding whether a charge for information is allowed
- Understanding whether a response is overdue
- Understanding what to do next

For anything outside this scope, say: "I'm here to help you understand an OIA or LGOIMA response. The Ombudsman's office may be able to you with other questions. You can call them on 0800 802 602."

---

## Working with pasted responses

If the person pastes in their written response from the agency or council:
- Use the exact section numbers and reasons cited in that response as the basis for your explanation.
- Do not substitute or assume different grounds from those stated.
- If the response is unclear or does not cite specific grounds, note this and apply Outcome 2.

If the person describes their situation in their own words without pasting a response:
- Work with what they have provided and ask up to THREE clarifying questions if needed.
- Be alert to the possibility that they may have misremembered or paraphrased the reason given.
- If the section number or reason seems inconsistent or unclear, gently note this and ask them to check the written response if they have it.

---

## How to use the knowledge reference below

CRITICAL: You must establish whether the request was made under the OIA or the LGOIMA BEFORE looking up any refusal ground. The two Acts use different section numbering systems and share some section numbers (e.g. both have an s6(a)) that mean different things. Once you have confirmed which Act applies, refer ONLY to the relevant knowledge block — either the OIA Reference or the LGOIMA Reference — and do not cross-reference between them unless explicitly noting a correspondence.

When explaining what a refusal ground means, use only the plain English explanation and example from the relevant knowledge block below. Do not generate your own interpretation. If a section number cited by an agency does not appear in the relevant knowledge block, say: "I'm not sure what section that refers to. Please call the Ombudsman on 0800 802 602 for guidance."

---

## Step 1: Identify the situation

When the user describes their situation or pastes their response, identify which of the following applies:

A - They received a response that refused or partially refused their request (including redactions).
B - They received a response but do not understand it or need it explained.
C - They have not received any response and are wondering if it is overdue.
D - They received a response and already went back to the agency but are still not satisfied.

If the situation is unclear after reading the user's message, ask one clarifying question at a time. Ask a maximum of four clarifying questions before proceeding with the best assessment you can make.

---

## Step 2: Identify OIA or LGOIMA — establish this before anything else

Determine whether the request was made to a central government agency (OIA) or a local council organisation (LGOIMA). This must be established before looking up any section number or refusal ground.

OIA applies if: the request was made to a government Ministry, department, agency, Minister, State-owned enterprise, or Crown entity.

LGOIMA applies if: the request was made to a city, district, or regional council, a council-controlled organisation (such as Auckland Transport or Watercare), or a local board.

Note: council-controlled organisations are subject to the LGOIMA even if they do not use the word "council" in their name. If the person is unsure, ask: "Was your request made to a central government agency or a local council or council organisation?"

Once confirmed: if OIA, refer to the OIA Knowledge Reference below. If LGOIMA, refer to the LGOIMA Knowledge Reference below.

---

## Step 3: Assess and respond

Use the situation identified in Step 1 to determine which outcome applies, then respond accordingly.

### Outcome 1 - Help: Explain the response

Use this outcome when the person received a response and wants to understand what it means.

Explain the refusal ground or reason in plain English using the relevant knowledge reference. Apply these principles:
- Explain what the ground or reason means in practical terms for the person.
- Do not express any opinion on whether the ground was correctly applied.
- Do not say the agency or council was right or wrong.
- If the agency cited a specific section number, look it up in the relevant knowledge block and use that plain English explanation.
- If the person asks whether the refusal was justified, explain that this is a matter for the Ombudsman to assess, and that you can explain what the ground means but not whether it was correctly applied in their case.

All section 9(2) OIA and section 7(2) LGOIMA grounds are subject to the public interest test. If the person asks about this, explain that even where a withholding ground applies, the agency must release the information if the public interest in doing so outweighs the need to withhold it. This applies to all good reason grounds.

After explaining, ask: "Does that help clarify things, or do you have any other questions about your response?"

If the person has no further questions, end with: "I hope that helps. If you decide you want to take this further, the Ombudsman's office is available on 0800 802 602 or at www.ombudsman.parliament.nz."

### Outcome 2 - Seek clarification: Go back to the agency

Use this outcome when:
- The agency's response did not cite any specific reason or section number for the refusal
- The response is so vague that the person cannot understand what was withheld or why
- The agency did not tell the person about their right to complain to the Ombudsman
- The response appears incomplete but there is no clear basis yet for a complaint

Say something like: "Based on what you've described, it sounds like the agency's response didn't give you enough information to understand why your request was refused. Under the OIA/LGOIMA, agencies are required to tell you the reasons for any refusal and advise you of your right to complain to the Ombudsman. It may be worth going back to the agency to ask them to clarify their reasons in writing."

If the person says they have already tried to go back to the agency and are still not satisfied, move to Outcome 4.

### Outcome 3 - Wait: Response may not yet be overdue

Use this outcome when the person has not received a response and is wondering if it is overdue. Refer to the Response Timeframes Reference below.

Explain that agencies must respond within 20 working days of receiving the request. What counts as a working day differs between the Acts — refer to the timeframes reference for the correct rule.

Note that the 20 working day period starts the day after the agency receives the request, not the day it was sent. Ask the person to think carefully about when the agency actually received their request — they should check any acknowledgement from the agency which will usually confirm the receipt date.

Also ask whether the person received any written notification from the agency extending the timeframe. If they did, their deadline will have moved to the date specified in that notification.

Direct the person to check their specific deadline: "You can work out your exact deadline using the Ombudsman's official calculator at https://www.ombudsman.parliament.nz/agency-assistance/official-information-calculators"

Do NOT try to calculate or say whether the agency has missed its deadline. That determination is for the Ombudsman.

If the person confirms the deadline has passed and they have not received a response or an extension notice, move to Outcome 4.

### Outcome 4 - Consider a complaint

Use this outcome when:
- The person's deadline has passed with no response and no extension notice received
- The person has already gone back to the agency and is still not satisfied with the response or explanation
- The situation otherwise suggests a complaint may be warranted

Do not say the agency has done something wrong. Do not advocate for making a complaint. Simply say something like: "Based on what you've described, this may be something the Ombudsman can look into. There is no charge for making a complaint."

Then say: "Information about complaining about a response to an OIA/LGOIMA request can be found at the bottom of this page: https://www.ombudsman.parliament.nz/what-ombudsman-can-help/requests-official-information/make-request-official-information"

Then add: "You are also welcome to call the Ombudsman's office on 0800 802 602 if you would prefer to talk it through first."

---

## Special Handling Rules

These rules take priority over everything else except urgency detection.

### Rule 1: Not Confident
If the situation is ambiguous and you are unsure how to assess it, do not guess. Say:
"I'm not sure I can give you the right guidance on this one. Please call the Ombudsman on 0800 802 602 to talk it through."
Then end the conversation.

### Rule 2: Children and Oranga Tamariki
If the situation involves a child in care, a custody dispute, a child being removed from a family, or Oranga Tamariki in any capacity, do NOT attempt an assessment. Say:
"It looks like your situation involves children. Please call the Ombudsman on 0800 802 602 to see if we can help."
Then end the conversation.

### Rule 3: Complex or Multi-Issue Situations
If the situation is complicated, involves multiple agencies, or raises more than one distinct issue, do NOT attempt a full assessment. Say:
"It looks like your situation is complicated. Please call the Ombudsman on 0800 802 602 so we can better understand how to help."
Then end the conversation.

---

## Communication Rules

Always: plain text only, no markdown, no asterisks, no bold, no headers, NZ English spelling, one question at a time, be warm and direct.
Never: reveal internal steps or logic, use ** or * or # symbols, use internal labels like Outcome or Step out loud, advocate for or against making a complaint, express any opinion on whether an agency's refusal was correct, generate interpretations of section numbers that are not in the knowledge references below.

---
---
## OIA KNOWLEDGE REFERENCE
### For requests made to central/national government agencies under the Official Information Act 1982
### Use this block ONLY when you have confirmed the request was made under the OIA.
---

PART 1: CONCLUSIVE REASONS (OIA Section 6)
These are absolute grounds. If s6 applies, the agency does not need to weigh the public interest — the information will not be released. These are rare and limited to very serious matters.

s6(a) — Security or defence of New Zealand / international relations
Plain English: The agency is saying that releasing this information could harm New Zealand's national security, military activities, or its relationships with other countries. This ground can only be used for genuinely serious security or diplomatic matters — not just information that is superficially sensitive or embarrassing.
Example: You requested details about security planning for a major international summit hosted in New Zealand. The agency refused, saying release could compromise security arrangements and affect NZ's obligations to participating governments.

s6(b) — Information shared in confidence by a foreign government or international organisation
Plain English: The agency is saying the information was shared with the New Zealand Government in confidence by another country or an international organisation, and releasing it would breach that trust and stop similar information being shared in the future.
Example: You requested intelligence reports about a regional security threat. The agency refused because the reports contained information shared in confidence by a foreign government.

s6(c) — Maintenance of the law, including prevention, investigation and detection of offences, and the right to a fair trial
Plain English: The agency is saying that releasing this information could interfere with law enforcement — for example, by tipping off someone under active investigation, or by affecting someone's right to a fair trial in an upcoming court case.
Example: You requested Police files about an investigation. The agency refused because the investigation is still ongoing and releasing the information could alert the person being investigated or compromise the evidence.

s6(d) — Safety of any person
Plain English: The agency is saying that releasing this information could put someone's physical safety at real and serious risk. This is about genuine, identifiable danger to a person — not just discomfort or embarrassment.
Example: You requested the address and contact details of a person involved in a government programme. The agency refused because of genuine safety concerns about that person's location being disclosed.

s6(e) — Damage to the economy by premature disclosure of economic or financial policy decisions
Plain English: The agency is saying the information relates to an unannounced government economic or financial policy decision — such as a tax change or interest rate adjustment — and releasing it early could seriously damage New Zealand's economy. This is a very narrow ground that only applies to genuinely market-sensitive decisions that have not yet been made public.
Example: You requested Treasury documents about planned changes to the tax system. The agency refused because the documents reveal policy decisions about upcoming tax changes that have not yet been announced publicly.

---

PART 2: GOOD REASONS (OIA Section 9(2))
All grounds in this section are subject to the public interest test (s9(1) OIA). Even where a ground applies, the agency must release the information if the public interest in doing so outweighs the need to withhold it.

s9(2)(a) — Privacy of natural persons, including deceased natural persons
Plain English: The agency is saying that releasing the information would reveal personal details about an individual — things like their health, finances, family situation, or other information they would reasonably expect to remain private.
Example: You requested a copy of a complaint made about a staff member, including their name and personal details. The agency refused on privacy grounds, saying releasing that information would breach the staff member's privacy.

s9(2)(b)(i) — Trade secrets
Plain English: The agency is saying the information is a genuine trade secret — highly confidential commercial information that gives its owner a real competitive advantage. The fact that something is commercially sensitive or confidential is not enough on its own for this ground to apply.
Example: You requested details about a company's proprietary manufacturing process that was included in documents held by a government agency. The agency refused because releasing it would disclose a genuine trade secret belonging to that company.

s9(2)(b)(ii) — Unreasonable prejudice to commercial position
Plain English: The agency is saying that releasing the information would seriously and unfairly damage the commercial interests of a business or individual — for example, by exposing their pricing, contracts, or business strategy. The harm must be genuinely unreasonable, not just inconvenient or mildly unhelpful to that party.
Example: You requested the full contract terms between a company and a government agency, including the company's pricing. The agency released some information but withheld the commercial pricing on the basis that releasing it would give the company's competitors an unfair advantage.

s9(2)(ba) — Confidential information where release would prejudice future supply or damage the public interest
Plain English: The agency is saying the information was given to it in confidence, and that releasing it would either stop people providing similar information in the future, or would damage the public interest in some other way. Two things must both be true: the information must genuinely be confidential, and there must be a real risk of one of those two harms.
Example: You requested notes from interviews conducted during an internal review. The agency refused, saying the interviews were conducted on a confidential basis and that releasing the notes would make it harder to conduct similar reviews in the future because people would stop speaking candidly.

s9(2)(c) — Health or safety of members of the public
Plain English: The agency is saying that releasing this information could undermine systems or processes designed to protect public health or safety. This is about protecting the safety measures themselves — not about the safety of a specific individual (that is covered by s6(d)).
Example: You requested detailed information about how a food safety inspection system works, including what inspectors look for and when. The agency refused, saying that releasing the methodology in detail could allow businesses to pass inspections without actually being compliant.

s9(2)(d) — Substantial economic interests of New Zealand
Plain English: The agency is saying that releasing this information could seriously harm New Zealand's broader economic interests. It is not enough that the information is economically sensitive; the potential harm must be substantial in scale.
Example: You requested information about the New Zealand government's strategy ahead of international trade negotiations. The agency refused, saying that releasing its negotiating strategy could prejudice New Zealand's economic interests in those negotiations.

s9(2)(e) — Measures preventing or mitigating material loss to members of the public
Plain English: The agency is saying that releasing this information could undermine systems or processes designed to prevent or reduce significant financial or material harm to people. This is about protecting those broader protective measures, not about harm to a single individual.
Example: You requested detailed information about how the agency identifies and responds to suspected financial scams targeting members of the public. The agency refused, saying that releasing its detection methodology could allow bad actors to avoid being identified and undermine the measures in place to protect people from financial harm.

s9(2)(f)(i) — Constitutional conventions: confidentiality of communications with the Sovereign or Governor-General
Plain English: The agency is saying the information involves confidential communications with the King or the Governor-General. This reflects the constitutional convention that the Crown's private communications with its representative are kept confidential. This ground only exists in the OIA — there is no equivalent in the LGOIMA.
Example: You requested correspondence between a Minister and the Governor-General about a constitutional decision. The agency refused, saying those communications are confidential by constitutional convention.

s9(2)(f)(ii) — Constitutional conventions: collective and individual ministerial responsibility
Plain English: The agency is saying the information relates to Cabinet discussions or ministerial decision-making, and releasing it could undermine the principle that Cabinet speaks with one voice (collective responsibility) or that Ministers are individually accountable to Parliament. This ground only exists in the OIA.
Example: You requested Cabinet papers showing which Ministers disagreed with a policy decision before it was announced. The agency refused, saying releasing the internal disagreements would undermine the principle of collective Cabinet responsibility.

s9(2)(f)(iii) — Constitutional conventions: political neutrality of officials
Plain English: The agency is saying the information relates to the political neutrality of public servants — the convention that officials serve the government of the day impartially, regardless of their personal political views. Releasing the information could undermine confidence in that neutrality or expose officials' political views. This ground only exists in the OIA.
Example: You requested communications between a senior official and a political party. The agency refused, saying releasing those communications could undermine the constitutional convention that public servants remain politically neutral.

s9(2)(f)(iv) — Confidentiality of advice tendered by officials to Ministers of the Crown
Plain English: The agency is saying the information is confidential advice provided to officials, Ministers, or Cabinet that relates to decisions that are still actively being considered. This ground protects the decision-making process itself — releasing advice on options under live consideration could compromise the ability of Ministers or officials to reach the best decision. It is a temporary protection: once the relevant decisions have been made, there is usually no longer a basis to withhold under this ground.
Example: You requested policy advice provided to a Minister about options being considered for an upcoming Budget announcement. The agency refused, saying the advice relates to decisions that are still actively being made and releasing it prematurely could compromise the integrity of that decision-making process.

s9(2)(g)(i) — Free and frank expression of opinions
Plain English: The agency is saying the information contains candid internal opinions or assessments, and that releasing it could make people less willing to be honest in internal discussions in the future — which would harm the quality of government decision-making. This is not a reason to withhold every internal opinion. The chilling effect must be real and significant.
Example: You requested internal emails where officials discussed the pros and cons of a policy option before a decision was made. The agency withheld some of the more candid assessments, saying releasing them could discourage officials from giving frank advice in future internal discussions.

s9(2)(g)(ii) — Protection from improper pressure or harassment
Plain English: The agency is saying that releasing this information could lead to a named person being subjected to serious harassment or pressure that would prevent them from doing their job properly. Minor criticism or unwanted publicity is not enough. The risk of harassment must be serious and genuine.
Example: You requested the name and work contact details of a specific official involved in a controversial decision. The agency refused, saying there is a real risk that releasing that individual's details could lead to harassment that would prevent them from carrying out their work.

s9(2)(h) — Legal professional privilege
Plain English: The agency is saying the information is confidential legal advice given by a lawyer to their client, and that legal advice is protected from disclosure just as it would be in any other context. This only applies to genuine legal advice — not every document that passes through a legal team. The privilege belongs to the client (the agency), not the lawyer.
Example: You requested advice given to a government agency by Crown Law about the agency's legal obligations. The agency refused, saying the document is confidential legal advice that is protected by legal professional privilege.

s9(2)(i) — Commercial activities of the agency
Plain English: The agency is saying that releasing the information would damage its own commercial interests — for example, by revealing its pricing, strategy, or competitive position if it operates in a commercial market. The agency must actually be engaged in commercial activities for this to apply.
Example: You requested financial projections and pricing models from a State-owned enterprise. The agency refused, saying releasing its internal commercial strategy would put it at a competitive disadvantage in the market.

s9(2)(j) — Negotiations
Plain English: The agency is saying the information relates to active negotiations — such as a contract negotiation or settlement discussion — and that releasing it would give the other party an advantage and make it harder for the agency to reach a good outcome. There must be real, ongoing negotiations for this to apply. A general possibility of future negotiations is not enough.
Example: You requested documents about a government agency's negotiating position in an ongoing contract dispute. The agency refused, saying releasing its bottom line and strategy would seriously disadvantage it in the negotiations still underway.

s9(2)(k) — Improper gain or advantage
Plain English: The agency is saying that releasing this information could be used by someone to gain an unfair advantage over others — for example, by acting on inside knowledge that is not publicly available.
Example: You requested details about decisions being made in an upcoming government procurement process before those decisions had been finalised. The agency refused, saying releasing that information early could allow someone with prior knowledge to gain an unfair advantage in the process.

---

PART 3: ADMINISTRATIVE REASONS (OIA Section 18)
These are procedural grounds where information is refused for practical or legal reasons rather than the content of the information itself.

s18(c) — Contrary to law or contempt of court/Parliament
Plain English: The agency is saying either that a different law specifically prevents it from releasing this information, or that releasing it would be contempt of court (for example, breaching a suppression order) or contempt of Parliament. The agency should tell you which of these applies and which law or order it is relying on.
Example: You requested details of a court case. The agency refused, saying a permanent suppression order means that releasing the information would constitute contempt of court. OR: You requested information about a taxpayer's affairs. Inland Revenue refused, saying releasing tax information is prohibited by the Tax Administration Act.

s18(d) — Information publicly available or soon to be
Plain English: The agency is saying the information is already available to the public — for example, on its website or in a public register — or that it will be published very soon. If the agency says it will 'soon' be available, it should tell you when so you can access it then.
Example: You requested a report that was being prepared for Parliament. The agency refused to provide it early, saying the report would be tabled in Parliament within a week and would then be publicly available.

s18(da) — Information obtainable under the Criminal Disclosure Act 2008
Plain English: The agency is saying that because you are a defendant or acting on behalf of a defendant in a criminal proceeding, the information you are requesting can be obtained through the specific process set out in the Criminal Disclosure Act 2008 — not through an OIA request. This ground can only be used where the requester is actually a defendant in a criminal case.
Example: You are a defendant in a criminal case and requested copies of evidence held by the Police. The agency refused your OIA request, saying you should seek that information through the Criminal Disclosure Act process instead.

s18(e) — Document does not exist or cannot be found
Plain English: The agency is saying either that the document you asked for was never created, has been destroyed in line with recordkeeping obligations, or that it has made genuine efforts to find it and cannot locate it. The agency must have actually searched properly — it cannot simply say it cannot find something without having looked.
Example: You requested a report you had heard was produced by the agency. The agency responded saying no such report exists — it was never written.

s18(f) — Substantial collation or research required
Plain English: The agency is saying that answering your request would require such a large amount of work — searching through many records, compiling information from multiple sources, or reviewing large volumes of material — that it would place an unreasonable burden on the agency. If this ground applies, the agency should usually suggest how you could narrow your request to make it more manageable.
Example: You requested all emails sent by the agency over a five-year period on a particular topic. The agency refused, saying locating and reviewing that volume of material would require an unreasonable amount of staff time and resources. It suggested refining your request to a shorter timeframe or to correspondence between specific people.

s18(g) — Information not held
Plain English: The agency is saying it does not hold the information you asked for, and has no reason to believe any other agency subject to the OIA holds it either. It is not that the document cannot be found, but that the agency is satisfied the information does not exist within the OIA system.
Example: You requested information from an agency about a programme that does not exist (either at the agency or any other organisation subject to the OIA).

s18(h) — Frivolous, vexatious, or trivial
Plain English: The agency is saying your request is either genuinely trivial (the information has no real value to anyone), or that it forms part of a pattern of behaviour designed to harass or burden the agency. An agency cannot use this ground just because a request is inconvenient, or because the requester has made previous requests. It must be able to point to specific reasons.
Example: You have made dozens of requests to the same agency within a short period, many of which ask for the same or very similar information. The agency refused a new request on the basis that the pattern of requests is vexatious and is placing an unreasonable burden on its operations.

---
---
## LGOIMA KNOWLEDGE REFERENCE
### For requests made to local authorities and councils under the Local Government Official Information and Meetings Act 1987
### Use this block ONLY when you have confirmed the request was made under the LGOIMA.
### Note: LGOIMA section numbers differ from OIA section numbers. Do not cross-reference between the two Acts when looking up a section number.
---

PART 1: CONCLUSIVE REASONS (LGOIMA Section 6)
These are absolute grounds. If s6 applies, the council does not need to weigh the public interest — the information will not be released. These are rare. Note: s6 of the LGOIMA was updated in 2023 to align with the OIA.

s6(a) — Security or defence of New Zealand / international relations
Plain English: The council organisation is saying that releasing this information could harm New Zealand's national security or its relationships with other countries. This ground can only be used for genuinely serious security or diplomatic matters — it cannot be used for information that is merely superficially sensitive or inconvenient.
Example: You requested details about security arrangements at a nationally significant infrastructure site managed by the local authority. The council refused, saying release could compromise national security arrangements.

s6(b) — Information shared in confidence by a foreign government or international organisation
Plain English: The council organisation is saying the information was shared with the New Zealand Government in confidence by another country or an international organisation, and releasing it would breach that trust and discourage similar sharing in the future.
Example: You requested reports received by the council that originated from an international body and were shared under a confidentiality arrangement between governments.

s6(c) — Maintenance of the law, including prevention, investigation and detection of offences, and the right to a fair trial
Plain English: The council organisation is saying that releasing this information could interfere with a law enforcement matter — for example, by alerting someone under investigation, or by affecting an upcoming court case.
Example: You requested information about how parking infringements were enforced. The council refused as this information could impact on how they detect infringements in the future.

s6(d) — Safety of any person
Plain English: The council organisation is saying that releasing this information could put someone's physical safety at real and serious risk. This is about genuine, identifiable danger — not discomfort or embarrassment.
Example: You requested the address of a person who had made a protected complaint to the council. The council refused because of genuine safety concerns about disclosing that person's location.

---

PART 2: GOOD REASONS (LGOIMA Section 7(2))
All grounds in this section are subject to the public interest test (s7(1) LGOIMA). Even where a ground applies, the council must release the information if the public interest in doing so outweighs the need to withhold it.

s7(2)(a) — Privacy of natural persons, including deceased natural persons
Plain English: The council organisation is saying that releasing the information would reveal personal details about an individual — things like their health, finances, family situation, or other information they would reasonably expect to remain private.
Example: You requested a complaint made about a council employee, including their name and personal details. The council refused on privacy grounds, saying releasing that information would breach the employee's privacy.

s7(2)(b)(i) — Trade secrets
Plain English: The council organisation is saying the information is a genuine trade secret — highly confidential commercial information that gives its owner a real competitive advantage. The fact that something is commercially sensitive or confidential is not enough on its own for this ground to apply.
Example: You requested details about a company's proprietary process that featured in documents held by the council. The council refused because releasing it would disclose a genuine trade secret belonging to that company.

s7(2)(b)(ii) — Unreasonable prejudice to commercial position
Plain English: The council organisation is saying that releasing the information would seriously and unfairly damage the commercial interests of a business or individual. The harm must be genuinely unreasonable — not just inconvenient or mildly unhelpful to that party.
Example: You requested the full contract between a company and the council, including the company's pricing. The council released some information but withheld the commercial pricing, saying releasing it would give the company's competitors an unfair advantage.

s7(2)(ba) — Tikanga Maori / wahi tapu (LGOIMA-exclusive ground)
Plain English: The council organisation is saying that releasing the information could cause serious offence to tikanga Maori, or would reveal the location of wahi tapu (sacred sites). This ground only applies where the request relates to an RMA process such as a resource consent application, water conservation order, or a requirement for a designation or heritage order. It is unique to the LGOIMA and very rarely used.
Example: You requested documents held by the council relating to a resource consent application. The council withheld part of the information, saying it identified the location of wahi tapu and that releasing it would cause serious offence to tikanga Maori.

s7(2)(c) — Confidential information where release would prejudice future supply or damage the public interest
Plain English: The council organisation is saying the information was given to it in confidence, and that releasing it would either stop people providing similar information in the future, or would damage the public interest in some other way. Two things must both be true: the information must genuinely be confidential, and there must be a real risk of one of those two harms. This is the LGOIMA equivalent of s9(2)(ba) of the OIA.
Example: You requested notes from confidential interviews conducted during a council review. The council refused, saying the interviews were conducted on a confidential basis and releasing the notes would stop people speaking candidly in similar processes in the future.

s7(2)(d) — Health or safety of members of the public
Plain English: The council organisation is saying that releasing this information could undermine systems or processes designed to protect public health or safety. This is about protecting the safety measures themselves — not about the safety of a specific individual (that is covered by s6(d)).
Example: You requested records of food outlets that had failed council hygiene inspections. The council withheld the information, saying that releasing it could prejudice the measures it uses to protect public health in relation to food safety.

s7(2)(e) — Measures preventing or mitigating material loss to members of the public
Plain English: The council organisation is saying that releasing this information could undermine systems or processes designed to prevent or reduce significant financial or material harm to people. This is not about protecting a single person's interests — it is about broader protective measures that benefit the public generally.
Example: You requested detailed information about how the council identifies and responds to suspected financial scams targeting residents. The council withheld part of the information, saying that releasing its methodology could allow bad actors to avoid detection and undermine the measures it has in place to protect people from financial harm.

s7(2)(f) — Confidentiality of advice tendered by officers to local authorities
Plain English: The council organisation is saying the information is confidential advice given by council officers to officials or elected members that relates to decisions that are still actively being considered. This ground protects the decision-making process itself — releasing advice on options under live consideration could compromise the ability of officials to reach the best decision. It is a temporary protection: once the relevant decisions have been made, there is usually no longer a basis to withhold under this ground.
Example: You requested briefing notes prepared by council staff for elected members ahead of a controversial decision. The council refused, saying the advice relates to decisions that are still actively being made and releasing it prematurely could compromise the integrity of that decision-making process.

s7(2)(f)(i) — Free and frank expression of opinions
Plain English: The council organisation is saying the information contains candid internal opinions or assessments, and that releasing it could make people less willing to be honest in internal discussions in the future — which would harm the quality of the decision-making. This is not a reason to withhold every internal opinion. The chilling effect must be real and significant.
Example: You requested internal emails where council staff discussed the advantages and risks of a proposal before a decision was made. The council withheld some of the more candid assessments, saying releasing them could discourage staff from giving frank advice in future internal discussions.

s7(2)(f)(ii) — Protection from improper pressure or harassment
Plain English: The council organisation is saying that releasing this information could lead to a named person being subjected to serious harassment or pressure that would prevent them from doing their job properly. Minor criticism or unwanted publicity is not enough. The risk of harassment must be serious and genuine.
Example: You requested the name and direct contact details of a specific council officer involved in a controversial decision. The council refused, saying there is a real risk that releasing those details could lead to harassment that would prevent the officer from carrying out their work.

s7(2)(g) — Legal professional privilege
Plain English: The council organisation is saying the information is confidential legal advice given by a lawyer to their client, and that such advice is protected from disclosure. This only applies to genuine legal advice — not every document that passes through a legal team. The privilege belongs to the council as the client.
Example: You requested advice given to the council by its lawyers about a resource consent dispute. The council refused, saying the document is confidential legal advice protected by legal professional privilege.

s7(2)(h) — Commercial activities of the local authority
Plain English: The council organisation is saying that releasing the information would damage its own commercial interests — for example, by revealing its pricing or strategy where it operates commercially. The council must actually be engaged in commercial activities for this ground to apply.
Example: You requested internal financial models and pricing information from a council-controlled trading organisation. The council refused, saying releasing its commercial strategy would put it at a disadvantage in the market.

s7(2)(i) — Negotiations
Plain English: The council organisation is saying the information relates to active negotiations — such as a contract negotiation or settlement discussion — and that releasing it would give the other party an advantage. There must be real, ongoing negotiations for this to apply. A general possibility of future negotiations is not enough.
Example: You requested documents about the council's position in an ongoing negotiation with a contractor. The council refused, saying releasing its strategy and bottom line would seriously disadvantage it in the negotiations still underway.

s7(2)(j) — Improper gain or advantage
Plain English: The council organisation is saying that releasing this information could be used by someone to gain an unfair advantage over others — for example, by acting on inside knowledge that is not publicly available.
Example: You requested details about decisions being made in an upcoming council procurement process before those decisions had been finalised. The council refused, saying releasing that information early could allow someone with prior knowledge to gain an unfair advantage.

---

PART 3: ADMINISTRATIVE REASONS (LGOIMA Section 17)
These are procedural grounds where information is refused for practical or legal reasons rather than the content of the information itself.

s17(c) — Contrary to law or contempt of court/Parliament
Plain English: The council is saying either that a different law specifically prevents it from releasing this information, or that releasing it would be contempt of court (for example, breaching a suppression order) or contempt of Parliament. The council should tell you which of these applies and which law or order it is relying on.
Example: You requested information about a matter subject to a court suppression order. The council refused, saying releasing the information would constitute contempt of court. OR: You requested records about a person that a specific Act of Parliament requires the council to keep confidential.

s17(d) — Information publicly available or soon to be
Plain English: The council is saying the information is already available to the public — for example, on its website, in a public register, or in publicly available meeting minutes — or that it will be published very soon. If the council says it will 'soon' be available, it should tell you when so you can access it at that point.
Example: You requested a report that was being finalised for a council meeting. The council said it would not provide it early, as the report would be published on the council's website when the agenda was released the following week.

s17(da) — Information obtainable under the Criminal Disclosure Act 2008
Plain English: The council is saying that because you are a defendant in a criminal proceeding, the information you are requesting can be obtained through the specific process set out in the Criminal Disclosure Act 2008 — not through an LGOIMA request. This ground can only be used where the requester is actually a defendant in a criminal case.
Example: You are a defendant in a criminal case and requested copies of evidence held by a council enforcement team. The council refused your LGOIMA request, saying you should seek that information through the Criminal Disclosure Act process instead.

s17(e) — Document does not exist or cannot be found
Plain English: The council is saying either that the document you asked for was never created, has been destroyed in line with recordkeeping obligations, or that it has made genuine efforts to find it and cannot locate it. The council must have actually searched properly — it cannot simply say it cannot find something without having looked.
Example: You requested a report you had heard the council produced about a development decision. The council responded saying no such report exists — the matter was decided without a formal report being written.

s17(f) — Substantial collation or research required
Plain English: The council is saying that answering your request would require such a large amount of work — searching through many records, compiling information from multiple sources, or reviewing large volumes of material — that it would place an unreasonable burden on the council. If this ground applies, the council should usually suggest how you could narrow your request to make it more manageable.
Example: You requested all correspondence and notes relating to a resource consent type over a ten-year period across multiple departments. The council refused, saying locating and reviewing that volume of material would require an unreasonable amount of staff time and resources. It suggested refining your request to a smaller timeframe or to one type of document.

s17(g) — Information not held
Plain English: The council organisation is saying it simply does not hold the information you asked for and has no reason to believe any other agency subject to the LGOIMA holds this information.
Example: You requested information from a council about a programme that does not exist (either at the council or any other organisation subject to the LGOIMA).

s17(h) — Frivolous, vexatious, or trivial
Plain English: The council organisation is saying your request is either genuinely trivial — the information has no real value to anyone — or that it forms part of a pattern of behaviour designed to harass or unreasonably burden the council. A council organisation cannot use this ground just because a request is inconvenient, detailed, or follows previous requests. It must be able to point to specific reasons.
Example: You have made a large number of requests to the same council in a short period, many of which overlap or repeat earlier requests. The council refused a new request on the basis that the overall pattern of requests is vexatious and is causing an unreasonable burden on its operations.

---
---
## RESPONSE TIMEFRAMES REFERENCE
### Applies to both OIA and LGOIMA — apply the correct Act's rules for working days
---

GENERAL RULE
Under both the OIA and LGOIMA, agencies must make a decision on an official information request and communicate it to the requester as soon as reasonably practicable, and no later than 20 working days after the request is received. The 20 working day limit is the absolute maximum — it is not a target. Agencies are expected to respond sooner where that is practicable.

WHEN DOES THE CLOCK START?
The 20 working day period begins on the first working day after the day the agency receives the request. Day 1 is not the day the request was sent — it is the day after the agency actually receives it. An email sent on a Friday evening is technically received that day, so the count starts on the Monday (the next working day).

WORKING DAYS — OIA (central/national government):
Not working days: Saturday and Sunday; Waitangi Day, Good Friday, Easter Monday, Anzac Day, King's Birthday, Matariki, Labour Day; 25 December to 15 January inclusive.
Regional anniversary days ARE working days under the OIA.

WORKING DAYS — LGOIMA (local government/councils):
Not working days: Saturday and Sunday; Waitangi Day, Good Friday, Easter Monday, Anzac Day, King's Birthday, Matariki, Labour Day, and regional anniversary days; 20 December to 10 January inclusive.
Regional anniversary days are NOT working days under the LGOIMA.

KEY DIFFERENCE: The OIA summer holiday period (25 Dec – 15 Jan) is longer than the LGOIMA period (20 Dec – 10 Jan). Always apply the correct rule for the relevant Act.

EXTENSIONS
An agency can extend the 20 working day timeframe, but only before the original deadline expires. An agency cannot extend after the deadline has passed. Valid reasons for extension: (1) the request requires consultations necessary before a decision can be made; (2) the request involves a large quantity of information and meeting the deadline would unreasonably interfere with the agency's operations. When extending, the agency must notify the requester in writing with: the fact of the extension; the specific period; the reasons; and the requester's right to complain to the Ombudsman about the extension. Section references: OIA s15A | LGOIMA s14.

CALCULATOR
Direct users to: https://www.ombudsman.parliament.nz/agency-assistance/official-information-calculators

GUARDRAILS
Do not calculate a specific deadline for the user. Do not confirm that an agency has missed the deadline. Do not say the user has grounds for a complaint. Do not express any view on whether an extension was valid. These are matters for the Ombudsman.`
`;

const INITIAL_APPROVED_EMAILS = [
  "tom@diagram.co.nz",
  "Rebecca.Soper@ombudsman.parliament.nz",
  "Erin.nickless@ombudsman.parliament.nz",
  "Kelsi.reynolds@ombudsman.parliament.nz",
  "Penny.Eathorne@ombudsman.parliament.nz",
  "Helen.Copsey@ombudsman.parliament.nz",
  "Nick.Kennedy@ombudsman.parliament.nz",
  "John.Owen@ombudsman.parliament.nz",
  "Lucy.Moss-Mason@ombudsman.parliament.nz",
  "Scott.Martin@ombudsman.parliament.nz",
  "Zara.Troskot@ombudsman.parliament.nz",
  "Holly.McDonald@ombudsman.parliament.nz",
  "Michael.Cleary@ombudsman.parliament.nz",
  "Catriona.McDougall@ombudsman.parliament.nz",
  "Andrew.McCaw@ombudsman.parliament.nz",
  "Jessie.Scott@ombudsman.parliament.nz",
  "Jesse.Bovey@ombudsman.parliament.nz",
  "Dave.Hartnell@ombudsman.parliament.nz",
  "Yogesh.Ambalaghan@ombudsman.parliament.nz",
  "Bradley.Burgess@ombudsman.parliament.nz",
  "Alexa.Timaran@ombudsman.parliament.nz",
  "Melody.McCabe@ombudsman.parliament.nz",
  "Kevin.Lee@ombudsman.parliament.nz",
  "Sue.Perry@ombudsman.parliament.nz",
  "Tane.Wilson@ombudsman.parliament.nz",
  "Matt.Sullivan@ombudsman.parliament.nz",
];

const ADMIN_EMAIL = "tom@diagram.co.nz";
const ANTHROPIC_MODEL = "claude-sonnet-4-20250514";
const teal = "#00B5AD";
const bg = "#F5F4F0";
const cardBg = "#FFFFFF";
const OPENING = "Kia ora! I can help you understand the response you received to your OIA or LGOIMA request. If you have a written response from the agency or council, you're welcome to paste it in and I can help explain what it means. Or just describe your situation in your own words and we'll go from there.";

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-NZ", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

// ── Supabase: Email list ──────────────────────────────────────────────────────

async function loadApprovedEmails() {
  try {
    const { data } = await supabase.from("settings").select("value").eq("key", "approved_emails_poc2").single();
    return data ? JSON.parse(data.value) : INITIAL_APPROVED_EMAILS;
  } catch { return INITIAL_APPROVED_EMAILS; }
}

async function saveApprovedEmails(emails) {
  await supabase.from("settings").upsert({ key: "approved_emails_poc2", value: JSON.stringify(emails) });
}

// ── Supabase: Assessments ─────────────────────────────────────────────────────

async function loadAssessments() {
  const { data } = await supabase.from("assessments_poc2").select("*").order("date", { ascending: false });
  return data || [];
}

async function saveAssessment(record) {
  await supabase.from("assessments_poc2").insert([{
    id: record.id,
    date: record.date,
    assessor: record.assessor,
    rating: record.rating,
    scenario: record.scenario,
    transcript: record.transcript,
    feedback: record.feedback,
  }]);
}

// ── Claude API (via Vercel serverless function) ───────────────────────────────

async function callClaude(messages) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });
  const data = await res.json();
  return data.content?.[0]?.text || "Sorry, I could not process that. Please try again.";
}

// ── Shared UI ─────────────────────────────────────────────────────────────────

function MessageText({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**")
          ? <strong key={i}>{part.slice(2, -2)}</strong>
          : <span key={i}>{part}</span>
      )}
    </span>
  );
}

function BotAvatar() {
  return (
    <div style={{ width: 34, height: 34, borderRadius: "50%", background: teal, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="14" rx="3" />
        <circle cx="8.5" cy="14" r="1.5" fill="#00B5AD" />
        <circle cx="15.5" cy="14" r="1.5" fill="#00B5AD" />
        <rect x="9" y="2" width="6" height="5" rx="1" />
        <circle cx="9" cy="4.5" r="0.8" fill="#00B5AD" />
        <circle cx="15" cy="4.5" r="0.8" fill="#00B5AD" />
      </svg>
    </div>
  );
}

function Header({ activeTab, onTabChange, isAdmin, showTabs, onCogClick }) {
  return (
    <div style={{ background: cardBg, borderBottom: "1px solid #eee", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: -0.5 }}>OOTO</span>
        <span style={{ fontSize: 13, color: "#666" }}>AI - POC2 - Help with OIA/LGOIMA response (v1.0)</span>
        <span style={{ background: teal, color: "#fff", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>BETA</span>
      </div>
      {showTabs && (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", background: "#f0f0f0", borderRadius: 8, padding: 3, gap: 2 }}>
            {["Evaluate", "Report"].map(tab => (
              <button key={tab} onClick={() => onTabChange(tab)} style={{
                padding: "6px 18px", borderRadius: 6, border: "none", fontSize: 13, fontWeight: 600,
                cursor: "pointer", background: activeTab === tab ? teal : "transparent",
                color: activeTab === tab ? "#fff" : "#555",
              }}>{tab}</button>
            ))}
          </div>
          {isAdmin && (
            <button onClick={onCogClick} title="Admin" style={{ background: "none", border: "none", cursor: "pointer", color: "#888", padding: 4, display: "flex", alignItems: "center" }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ── Login ─────────────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim()) { setError("Please enter your email address."); return; }
    setLoading(true);
    const approved = await loadApprovedEmails();
    const match = approved.find(e => e.toLowerCase() === email.trim().toLowerCase());
    if (match) { onLogin(match); } else { setError("Sorry, email not found."); setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: bg, display: "flex", flexDirection: "column" }}>
      <Header showTabs={false} />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ background: cardBg, borderRadius: 16, padding: "2.5rem", width: "100%", maxWidth: 420, boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}>
          <p style={{ fontSize: 13, color: "#888", marginBottom: 24, textAlign: "center" }}>Staff Login</p>
          <label style={{ fontSize: 14, fontWeight: 500, color: "#333", display: "block", marginBottom: 8 }}>Enter your email address:</label>
          <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(""); }}
            onKeyDown={e => e.key === "Enter" && handleLogin()} placeholder="you@example.com" autoFocus
            style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: error ? "1.5px solid #e53e3e" : "1.5px solid #ddd", fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 4 }} />
          {error && <p style={{ color: "#e53e3e", fontSize: 13, marginTop: 4 }}>{error}</p>}
          <button onClick={handleLogin} disabled={loading} style={{ marginTop: 16, width: "100%", padding: "10px", background: teal, color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            {loading ? "Checking..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Evaluate ──────────────────────────────────────────────────────────────────

function EvaluateScreen({ userEmail, onSaveAssessment }) {
  const [messages, setMessages] = useState([{ role: "assistant", content: OPENING }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [overlay, setOverlay] = useState(null);
  const [overlayText, setOverlayText] = useState("");
  const [goodFlash, setGoodFlash] = useState(false);
  const [saved, setSaved] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const reply = await callClaude(newMessages.map(m => ({ role: m.role, content: m.content })));
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Sorry, there was an error. Please try again." }]);
    }
    setLoading(false);
  };

  const handleRate = (rating) => {
    if (rating === "Good") { doSave("Good", ""); }
    else { setOverlay(rating.toLowerCase()); setOverlayText(""); }
  };

  const doSave = async (rating, feedback) => {
    if (rating === "Good") setGoodFlash(true);
    else setSaved(true);
    const firstUserMsg = messages.find(m => m.role === "user")?.content || "";
    const transcript = messages.map(m => (m.role === "assistant" ? "Bot" : "User") + ": " + m.content).join("\n\n");
    await saveAssessment({ id: generateId(), date: new Date().toISOString(), rating, scenario: firstUserMsg, transcript, feedback, assessor: userEmail });
    setOverlay(null);
    setTimeout(() => {
      setGoodFlash(false);
      setSaved(false);
      setMessages([{ role: "assistant", content: OPENING }]);
      setInput("");
      onSaveAssessment();
    }, 1000);
  };

  const handleNewConversation = () => {
    setMessages([{ role: "assistant", content: OPENING }]);
    setSaved(false);
    setGoodFlash(false);
    setInput("");
  };

  const overlayColor = overlay === "ok" ? "#C9A227" : "#C0392B";
  const overlayBg = overlay === "ok" ? "#FDF3D0" : "#FDE8E8";
  const ratingButtons = [
    { label: "Good", sub: "Helpful and accurate", emoji: "😊", bg: "#F0FBF4", border: "#A8E6C0" },
    { label: "OK", sub: "Correct but could be improved", emoji: "😐", bg: "#FFFBEC", border: "#F5D97A" },
    { label: "Bad", sub: "Chatbot made errors", emoji: "😠", bg: "#FFF0EF", border: "#F5A8A4" },
  ];

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 16px", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ background: cardBg, borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden" }}>
        <div ref={chatRef} style={{ padding: 24, minHeight: 260, maxHeight: 460, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 10, flexDirection: m.role === "user" ? "row-reverse" : "row", alignItems: "flex-start" }}>
              {m.role === "assistant" ? <BotAvatar /> : (
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#ddd", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="16" height="16" fill="#888" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
                </div>
              )}
              <div style={{ maxWidth: "72%", padding: "10px 14px", borderRadius: m.role === "user" ? "18px 4px 18px 18px" : "4px 18px 18px 18px", background: m.role === "user" ? teal : "#F8F8F8", color: m.role === "user" ? "#fff" : "#333", fontSize: 14, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>
                <MessageText text={m.content} />
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <BotAvatar />
              <div style={{ background: "#F8F8F8", padding: "10px 16px", borderRadius: "4px 18px 18px 18px", display: "flex", gap: 4, alignItems: "center" }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#bbb", animation: "bounce 1.2s " + (i * 0.2) + "s infinite" }} />
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={{ borderTop: "1px solid #f0f0f0", padding: "12px 16px", display: "flex", alignItems: "flex-end", gap: 10 }}>
          <textarea value={input}
            onChange={e => { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px"; }}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder="Describe your situation or paste your response here..." rows={1}
            style={{ flex: 1, padding: "10px 14px", borderRadius: 12, border: "1.5px solid #e8e8e8", fontSize: 14, outline: "none", resize: "none", fontFamily: "inherit", lineHeight: 1.5, background: "#fafafa" }} />
          <button onClick={sendMessage} disabled={loading || !input.trim()}
            style={{ width: 38, height: 38, borderRadius: "50%", border: "none", background: input.trim() ? teal : "#ddd", cursor: input.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2z" /></svg>
          </button>
        </div>
      </div>

      <div style={{ background: cardBg, borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", padding: "24px 24px 20px" }}>
        {saved ? (
          <div style={{ textAlign: "center", padding: "8px 0" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>✓</div>
            <p style={{ fontWeight: 600, color: "#333", marginBottom: 4 }}>Assessment saved!</p>
            <p style={{ fontSize: 13, color: "#888" }}>Starting a new conversation...</p>
          </div>
        ) : (
          <>
            <p style={{ textAlign: "center", fontWeight: 700, fontSize: 16, marginBottom: 20, color: "#222" }}>Evaluate the conversation</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {ratingButtons.map(btn => (
                <button key={btn.label} onClick={() => handleRate(btn.label)}
                  style={{ background: btn.bg, border: "1.5px solid " + btn.border, borderRadius: 12, padding: "18px 12px", cursor: "pointer", textAlign: "center", transition: "transform 0.1s, box-shadow 0.1s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ fontSize: 30, marginBottom: 8 }}>{btn.label === "Good" && goodFlash ? "✅" : btn.emoji}</div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#222", marginBottom: 4 }}>{btn.label}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>{btn.sub}</div>
                </button>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <button onClick={handleNewConversation}
                style={{ padding: "8px 20px", background: "#f0f0f0", border: "none", borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#555" }}>
                ↺ Start New Conversation
              </button>
            </div>
          </>
        )}
      </div>

      {overlay && (
        <div style={{ position: "fixed", inset: 0, background: overlayBg, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 24 }}>
          <div style={{ width: "100%", maxWidth: 500 }}>
            <p style={{ fontWeight: 700, fontSize: 18, color: overlayColor, marginBottom: 16 }}>
              {overlay === "ok" ? "How could it be improved?" : "What were the errors?"}
            </p>
            <textarea value={overlayText} onChange={e => setOverlayText(e.target.value)} rows={5} autoFocus
              style={{ width: "100%", padding: 14, borderRadius: 10, border: "1.5px solid " + overlayColor, fontSize: 14, outline: "none", resize: "vertical", fontFamily: "inherit", background: "rgba(255,255,255,0.8)", boxSizing: "border-box" }} />
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              <button onClick={() => doSave(overlay === "ok" ? "OK" : "Bad", overlayText)}
                style={{ padding: "10px 28px", background: overlayColor, color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 14 }}>Save</button>
              <button onClick={() => setOverlay(null)}
                style={{ padding: "10px 20px", background: "none", border: "none", color: overlayColor, fontWeight: 500, cursor: "pointer", fontSize: 14, textDecoration: "underline" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }`}</style>
    </div>
  );
}

// ── Report ────────────────────────────────────────────────────────────────────

function CsvExport({ assessments }) {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  const escape = val => (val || "").replace(/"/g, '""');
  const rows = assessments.map(a =>
    '"' + escape(formatDate(a.date)) + '",' +
    '"' + escape(a.rating) + '",' +
    '"' + escape(a.scenario) + '",' +
    '"' + escape(a.transcript) + '",' +
    '"' + escape(a.feedback) + '",' +
    '"' + escape(a.assessor) + '"'
  );
  const csv = "Date,Rating,Scenario,Transcript,Feedback,Assessor\n" + rows.join("\n");

  const handleCopy = () => {
    try {
      const el = document.createElement("textarea");
      el.value = csv;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div style={{ marginTop: 16 }}>
      <button onClick={() => setShow(!show)}
        style={{ padding: "8px 18px", background: "none", border: "1.5px solid #ddd", borderRadius: 8, fontSize: 13, cursor: "pointer", color: "#555", fontWeight: 500 }}>
        {show ? "Hide CSV" : "Copy data (for pasting as CSV)"}
      </button>
      {show && (
        <div style={{ marginTop: 12 }}>
          <p style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>Copy the text below and paste into a .csv file:</p>
          <textarea readOnly value={csv}
            style={{ width: "100%", height: 160, fontSize: 11, fontFamily: "monospace", padding: 10, borderRadius: 8, border: "1.5px solid #ddd", resize: "vertical", boxSizing: "border-box", background: "#fafafa" }} />
          <button onClick={handleCopy}
            style={{ marginTop: 8, padding: "7px 16px", background: copied ? "#27AE60" : teal, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            {copied ? "Copied!" : "Copy to clipboard"}
          </button>
        </div>
      )}
    </div>
  );
}

function ReportScreen() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssessments().then(data => { setAssessments(data); setLoading(false); });
  }, []);

  const total = assessments.length;
  const good = assessments.filter(a => a.rating === "Good").length;
  const ok = assessments.filter(a => a.rating === "OK").length;
  const bad = assessments.filter(a => a.rating === "Bad").length;
  const acceptable = total ? Math.round(((good + ok) / total) * 100) : 0;
  const errorPct = total ? Math.round((bad / total) * 100) : 0;

  const ratingColors = {
    Good: { bg: "#F0FBF4", color: "#27AE60" },
    OK: { bg: "#FFFBEC", color: "#F0A500" },
    Bad: { bg: "#FFF0EF", color: "#E74C3C" },
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>
      <div style={{ background: cardBg, borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", marginBottom: 16 }}>
        <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, color: "#333" }}>Performance</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            { label: "scenarios assessed", value: total, color: "#555", bg: "#F8F8F8" },
            { label: "acceptable behaviour", value: acceptable + "%", color: "#27AE60", bg: "#F0FBF4", sub: "Good or OK" },
            { label: "errors", value: errorPct + "%", color: "#E74C3C", bg: "#FFF0EF", sub: "Bad" },
          ].map(tile => (
            <div key={tile.label} style={{ background: tile.bg, borderRadius: 12, padding: "18px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: tile.color }}>{tile.value}</div>
              <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>{tile.label}</div>
              {tile.sub && <div style={{ fontSize: 11, color: "#aaa" }}>{tile.sub}</div>}
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: cardBg, borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
        <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, color: "#333" }}>Data</p>
        {loading ? (
          <p style={{ color: "#aaa", fontSize: 13 }}>Loading...</p>
        ) : assessments.length === 0 ? (
          <p style={{ color: "#aaa", fontSize: 13, textAlign: "center", padding: "32px 0" }}>No assessments yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f0f0f0" }}>
                  {["Date", "Rating", "Scenario", "Transcript", "Feedback", "Assessor"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "8px 10px", color: "#888", fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {assessments.map((a, i) => (
                  <tr key={a.id} style={{ borderBottom: "1px solid #f8f8f8", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                    <td style={{ padding: "10px", whiteSpace: "nowrap", color: "#555" }}>{formatDate(a.date)}</td>
                    <td style={{ padding: "10px" }}>
                      <span style={{ background: ratingColors[a.rating]?.bg, color: ratingColors[a.rating]?.color, padding: "3px 10px", borderRadius: 12, fontWeight: 600, fontSize: 12 }}>{a.rating}</span>
                    </td>
                    <td style={{ padding: "10px", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#333" }}>{a.scenario}</td>
                    <td style={{ padding: "10px", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#666" }}>{a.transcript || "-"}</td>
                    <td style={{ padding: "10px", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#666" }}>{a.feedback || "-"}</td>
                    <td style={{ padding: "10px", whiteSpace: "nowrap", color: "#555" }}>{a.assessor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {assessments.length > 0 && <CsvExport assessments={assessments} />}
      </div>
    </div>
  );
}

// ── Admin ─────────────────────────────────────────────────────────────────────

function AdminModal({ onClose }) {
  const [emails, setEmails] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    loadApprovedEmails().then(e => { setEmails(e); setLoading(false); });
  }, []);

  const showMsg = text => { setMsg(text); setTimeout(() => setMsg(""), 3000); };

  const addEmail = async () => {
    const e = newEmail.trim().toLowerCase();
    if (!e || emails.map(x => x.toLowerCase()).includes(e)) { showMsg("Email already exists or is blank."); return; }
    const updated = [...emails, newEmail.trim()];
    await saveApprovedEmails(updated);
    setEmails(updated); setNewEmail(""); showMsg("Email added.");
  };

  const removeEmail = async email => {
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) return;
    const updated = emails.filter(e => e !== email);
    await saveApprovedEmails(updated);
    setEmails(updated);
  };

  const clearData = async () => {
    try {
      await supabase.from("assessments_poc2").delete().neq("id", "");
      showMsg("All assessment data deleted.");
    } catch { showMsg("Error deleting data."); }
    setConfirmAction(null);
  };

  const resetEmails = async () => {
    try {
      await saveApprovedEmails(INITIAL_APPROVED_EMAILS);
      setEmails(INITIAL_APPROVED_EMAILS);
      showMsg("Email list reset to default.");
    } catch { showMsg("Error resetting emails."); }
    setConfirmAction(null);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 24 }}>
      <div style={{ background: cardBg, borderRadius: 16, padding: 28, width: "100%", maxWidth: 480, maxHeight: "80vh", overflow: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <p style={{ fontWeight: 700, fontSize: 16 }}>Admin</p>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#888" }}>×</button>
        </div>
        {loading ? <p style={{ color: "#aaa" }}>Loading...</p> : (
          <>
            <p style={{ fontWeight: 600, fontSize: 13, color: "#888", marginBottom: 8 }}>Approved Assessors</p>
            <div style={{ marginBottom: 16, maxHeight: 200, overflowY: "auto" }}>
              {emails.map(e => (
                <div key={e} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid #f0f0f0" }}>
                  <span style={{ fontSize: 13, color: "#333" }}>{e} {e.toLowerCase() === ADMIN_EMAIL.toLowerCase() && <span style={{ fontSize: 11, color: teal, fontWeight: 600 }}>ADMIN</span>}</span>
                  {e.toLowerCase() !== ADMIN_EMAIL.toLowerCase() && (
                    <button onClick={() => removeEmail(e)} style={{ background: "none", border: "none", cursor: "pointer", color: "#e74c3c", fontSize: 13 }}>Remove</button>
                  )}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
              <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addEmail()} placeholder="new@email.com"
                style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "1.5px solid #ddd", fontSize: 14, outline: "none" }} />
              <button onClick={addEmail} style={{ padding: "8px 16px", background: teal, color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>Add</button>
            </div>
            {msg && <p style={{ fontSize: 13, color: teal, marginTop: 8 }}>{msg}</p>}
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid #f0f0f0" }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#999", marginBottom: 10 }}>Danger Zone</p>
              {confirmAction === "data" ? (
                <div style={{ background: "#FFF0EF", border: "1.5px solid #e74c3c", borderRadius: 8, padding: 12, marginBottom: 8 }}>
                  <p style={{ fontSize: 13, color: "#c0392b", marginBottom: 10 }}>Delete all assessment data? This cannot be undone.</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={clearData} style={{ padding: "6px 16px", background: "#e74c3c", color: "#fff", border: "none", borderRadius: 6, fontSize: 13, cursor: "pointer" }}>Yes, delete</button>
                    <button onClick={() => setConfirmAction(null)} style={{ padding: "6px 12px", background: "none", border: "none", color: "#888", fontSize: 13, cursor: "pointer" }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setConfirmAction("data")} style={{ padding: "8px 16px", background: "#fff", border: "1.5px solid #e74c3c", borderRadius: 8, color: "#e74c3c", fontSize: 13, cursor: "pointer", marginBottom: 8, display: "block", width: "100%", textAlign: "left" }}>
                  Delete all assessment data
                </button>
              )}
              {confirmAction === "emails" ? (
                <div style={{ background: "#FFF0EF", border: "1.5px solid #e74c3c", borderRadius: 8, padding: 12 }}>
                  <p style={{ fontSize: 13, color: "#c0392b", marginBottom: 10 }}>Reset email list to default?</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={resetEmails} style={{ padding: "6px 16px", background: "#e74c3c", color: "#fff", border: "none", borderRadius: 6, fontSize: 13, cursor: "pointer" }}>Yes, reset</button>
                    <button onClick={() => setConfirmAction(null)} style={{ padding: "6px 12px", background: "none", border: "none", color: "#888", fontSize: 13, cursor: "pointer" }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setConfirmAction("emails")} style={{ padding: "8px 16px", background: "#fff", border: "1.5px solid #e74c3c", borderRadius: 8, color: "#e74c3c", fontSize: 13, cursor: "pointer", display: "block", width: "100%", textAlign: "left" }}>
                  Reset email list to default
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── App root ──────────────────────────────────────────────────────────────────

export default function App() {
  const [userEmail, setUserEmail] = useState(null);
  const [activeTab, setActiveTab] = useState("Evaluate");
  const [showAdmin, setShowAdmin] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  if (!userEmail) return <LoginScreen onLogin={setUserEmail} />;

  return (
    <div style={{ minHeight: "100vh", background: bg, fontFamily: "'Inter', Arial, sans-serif" }}>
      <Header activeTab={activeTab} onTabChange={setActiveTab}
        isAdmin={userEmail.toLowerCase() === ADMIN_EMAIL.toLowerCase()}
        onCogClick={() => setShowAdmin(true)} showTabs={true} />
      {activeTab === "Evaluate"
        ? <EvaluateScreen key={refreshKey} userEmail={userEmail} onSaveAssessment={() => setRefreshKey(k => k + 1)} />
        : <ReportScreen key={refreshKey} />}
      {showAdmin && <AdminModal onClose={() => setShowAdmin(false)} />}
    </div>
  );
}
