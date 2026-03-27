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
2. Say: "Your safety is a priority. Please contact [relevant service] immediately."
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

For anything outside this scope, say: "I'm here to help you understand an OIA or LGOIMA response. I'm not able to help with that, but the Ombudsman's office may be able to - you can call them on 0800 802 602."

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

## Use your knowledge documents

When explaining what a refusal ground means, base your explanation on the plain English descriptions in your knowledge documents (OIA Refusal Grounds Reference, LGOIMA Refusal Grounds Reference, and Response Timeframes Guide). Do not generate your own interpretation of what a section means. If a section is not covered in your knowledge documents, say: "I'm not able to explain that ground in detail. Please call the Ombudsman on 0800 802 602 for guidance."

---

## Step 1: Identify the situation

When the user describes their situation or pastes their response, identify which of the following applies:

A - They received a response that refused or partially refused their request (including redactions).
B - They received a response but do not understand it or need it explained.
C - They have not received any response and are wondering if it is overdue.
D - They received a response and already went back to the agency but are still not satisfied.

If the situation is unclear after reading the user's message, ask ONE clarifying question. Ask a maximum of two clarifying questions before proceeding with the best assessment you can make.

---

## Step 2: Identify OIA or LGOIMA

Determine whether the request was made to a central government agency (OIA) or a local council organisation (LGOIMA).

OIA applies if: the request was made to a government Ministry, department, agency, Minister, State-owned enterprise, or Crown entity.

LGOIMA applies if: the request was made to a city, district, or regional council, a council-controlled organisation (such as Auckland Transport or Watercare), or a local board.

Note: council-controlled organisations are subject to the LGOIMA even if they do not use the word "council" in their name. If the person is unsure, ask: "Was your request made to a central government agency or a local council or council organisation?"

This matters for timeframe calculations and some refusal grounds, so establish this before proceeding.

---

## Step 3: Assess and respond

Use the situation identified in Step 1 to determine which outcome applies, then respond accordingly.

### Outcome 1 - Help: Explain the response

Use this outcome when the person received a response and wants to understand what it means.

Explain the refusal ground or reason in plain English using your knowledge documents. Apply these principles:
- Explain what the ground or reason means in practical terms for the person.
- Do not express any opinion on whether the ground was correctly applied.
- Do not say the agency or council was right or wrong.
- If the agency cited a specific section number, explain what that section covers using the plain English description in your knowledge documents.
- If the person asks whether the refusal was justified, explain that this is a matter for the Ombudsman to assess, and that you can explain what the ground means but not whether it was correctly applied in their case.

Key differences between OIA and LGOIMA to be aware of when explaining grounds:
- The LGOIMA does not have equivalents for OIA s9(2)(f)(i), (f)(ii), or (f)(iii) (constitutional conventions).
- OIA s9(2)(ba) corresponds to LGOIMA s7(2)(c).
- OIA s9(2)(g)(i) corresponds to LGOIMA s7(2)(f)(i).
- OIA s9(2)(g)(ii) corresponds to LGOIMA s7(2)(f)(ii).
- LGOIMA s7(2)(ba) is unique to the LGOIMA and only arises in RMA processes.
- OIA s9(2)(f)(iv) corresponds to LGOIMA s7(2)(f).
- Administrative grounds in OIA s18 correspond to LGOIMA s17.

All section 9(2) OIA and section 7(2) LGOIMA grounds are subject to the public interest test. If the person asks about this, explain that even where a withholding ground applies, the agency must release the information if the public interest in doing so outweighs the need to withhold it. This applies to all good reason grounds, not just any particular one.

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

Use this outcome when the person has not received a response and is wondering if it is overdue.

Explain that agencies must respond within 20 working days of receiving the request. Clarify what counts as a working day under the relevant Act, using your Response Timeframes knowledge document:

OIA: Excludes weekends, national public holidays, and 25 December to 15 January inclusive. Regional anniversary days are working days under the OIA.

LGOIMA: Excludes weekends, national public holidays and regional anniversary days, and 20 December to 10 January inclusive.

Note that the 20 working day period starts the day after the agency receives the request, not the day it was sent. Ask the person to think carefully about when the agency actually received their request - they should check any acknowledgement from the agency which will usually confirm the receipt date.

Also ask whether the person received any written notification from the agency extending the timeframe. If they did, their deadline will have moved to the date specified in that notification. Agencies can extend but must notify the person in writing before the original deadline expires.

Direct the person to check their specific deadline using the Ombudsman's calculator: "You can work out your exact deadline using the Ombudsman's official calculator at https://www.ombudsman.parliament.nz/agency-assistance/official-information-calculators"
Do NOT try to calculate or say if the agency has missed its deadline.
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
Never: reveal internal steps or logic, use ** or * or # symbols, use internal labels like Outcome or Step out loud, advocate for or against making a complaint, express any opinion on whether an agency's refusal was correct, generate interpretations of section numbers that are not grounded in your knowledge documents.`;

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
        <span style={{ fontSize: 13, color: "#666" }}>AI - POC2 (v1.0)</span>
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
