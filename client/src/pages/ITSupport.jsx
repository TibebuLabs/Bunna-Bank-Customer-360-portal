import { useState, useRef, useEffect } from "react";
import {
  HiPaperAirplane, HiCpuChip, HiUser, HiSparkles,
  HiKey, HiXMark, HiCheckCircle, HiGlobeAlt,
} from "react-icons/hi2";
import { findAnswer, FALLBACK } from "../data/itSupportKB";

// ── Gemini REST helper ────────────────────────────────────────────────────────
const GEMINI_MODELS = [
  "gemini-2.0-flash-lite",
  "gemini-2.0-flash",
  "gemini-1.5-flash-latest",
  "gemini-1.5-flash-8b-latest",
];

// Fetch available models from the API and pick the best supported one
async function getAvailableModel(apiKey) {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    if (!res.ok) return GEMINI_MODELS[0];
    const data = await res.json();
    const names = (data.models || [])
      .filter(m => m.supportedGenerationMethods?.includes("generateContent"))
      .map(m => m.name.replace("models/", ""));
    // Prefer in order
    for (const preferred of GEMINI_MODELS) {
      if (names.includes(preferred)) return preferred;
    }
    // Fallback to first available flash model
    const flash = names.find(n => n.includes("flash"));
    return flash || names[0] || GEMINI_MODELS[0];
  } catch {
    return GEMINI_MODELS[0];
  }
}

// ── Rich system prompt with full Buna Bank + Finacle context ─────────────────
const SYSTEM_PROMPT_EN = `You are an expert IT Support Assistant for Buna Bank (BIB), Ethiopia. You specialize in:

1. FINACLE CORE BANKING SYSTEM (the bank uses Finacle by Infosys):
   - Account opening menus: HOAACSB (Saving/SBA), HOAACCA (Current/CAA), HOAACOD (Overdraft/ODA), HOAACTD (Time Deposit/TDA), HOAACLA (Term Loan/LAA)
   - Verification menus: HOAACVSB, HOAACVCA, HOAACVOD, HOAACVTD, HOAACVLA
   - Operations: HACM (modify), HCAAC (close), HAFSM (freeze/unfreeze), HALM (lien), HACLINQ (ledger), HACCBAL (balances), HACCDET (details)
   - Loan menus: HACLHM (OD limit), HCLM (collateral), HSCLM (link collateral), HLADISB (disburse), HPAYOFF (payoff), HLARA (reschedule)
   - Interest menus: HINTTM (OD interest), HLINTTM (loan interest), HACINT (force interest), HAITINQ (interest inquiry)
   - Reports: HPBP (passbook), HPSP (statement), HINTCERT (interest cert), HAINTRPT (interest report)
   - Account search: HACS, HACCDET
   - Name change: HAALM, HCCA (change CIF)
   - Scheme change: HACXFRSC, HTACBSH
   - Collateral: HCLM (lodge), HSCLM (link/unlink)
   - OD renewal: HACLHM
   - Loan disbursement: HLADISB, HPAYOFF

2. KEY DATABASE TABLES:
   - TBAADM.GAM: main account table (ENTITY_CRE_FLG='N'=unverified, ACCT_CLS_FLG='Y'=closed)
   - TBAADM.ADT: audit table (find pending verification — look for '!' in authorizer column)
   - TBAADM.SIP, TBAADM.SCMT: collateral tables
   - TBAADM.LHT: OD data, TBAADM.TAM: time deposit, TBAADM.LAM: loan
   - crmuser.ADDRESS: customer address (START_DATE must = system date)
   - crmuser.PHONEEMAIL: phone records (duplicates cause fatal errors)

3. COMMON PROBLEMS & SOLUTIONS:
   - "Invalid Customer Account" on verify → CIF lost/not in FINCORE → create new CIF, use BIB Support system to change CIF
   - Address not populating → START_DATE mismatch in ADDRESS table → fix with Toad: UPDATE crmuser.ADDRESS SET START_DATE=SYSDATE WHERE CUST_ID='<CIF>'
   - HACLINQ fatal error → duplicate phone records → delete from crmuser.PHONEEMAIL
   - Disbursement fails → check Gross Disbursement flag, operative account balance, drawing power=Equal in HACLHM
   - Saving not collecting interest → check HACM interest flag, check unverified pending in HCAAC/HAALM/HAFSM, check HINTTM
   - GR3 error on close → reject attached cheques via Inventory Management first
   - HACM fatal error → CIF phone/address problem or unverified pending in TBAADM.ADT
   - Cannot disburse → drawing power must be Equal, sanction limit = drawing power, check final disbursement flag in tbaadm.lam

4. ACCOUNT FORMATS: Saving: xxx9501+, Current: xxx9601+, OD: xxx9101+, Loan: xxx9001+

5. IT SUPPORT: Password reset, network/LAN issues, printer troubleshooting, VPN (Cisco AnyConnect/FortiClient to vpn.bunnabank.et), slow PC, ITSM portal at http://itsm.bunnabank.et

RULES:
- Always give step-by-step numbered instructions
- Always mention the exact Finacle menu name (e.g., HACM, HOAACSB)
- Never ask for or store passwords
- If issue needs database access, mention Toad
- If complex, advise opening ITSM ticket
- Be concise but complete
- Respond in English`;

const SYSTEM_PROMPT_AM = `አንተ የቡና ባንክ (BIB) ኢትዮጵያ ልምድ ያለው አይቲ ድጋፍ ረዳት ነህ። በፊናክል ኮር ባንኪንግ ሲስተም ላይ ልዩ ባለሙያ ነህ።

1. የፊናክል ሜኑዎች:
   - አካውንት መክፈት: HOAACSB (ቁጠባ)፣ HOAACCA (ቻሪ)፣ HOAACOD (OD)፣ HOAACTD (ታይም ዲፖዚት)፣ HOAACLA (ብድር)
   - ማረጋገጫ: HOAACVSB፣ HOAACVCA፣ HOAACVOD፣ HOAACVTD፣ HOAACVLA
   - ስራዎች: HACM (ማስተካከያ)፣ HCAAC (ዝጋት)፣ HAFSM (ማቀዝቀዝ)፣ HALM (lien)
   - ብድር: HACLHM፣ HCLM፣ HSCLM፣ HLADISB፣ HPAYOFF፣ HLARA
   - ሪፖርቶች: HPBP (ፓስቡክ)፣ HPSP (ስቴትመንት)

2. የተለመዱ ችግሮች እና መፍቻዎቻቸው:
   - "Invalid Customer Account" → CIF ጠፍቷል → አዲስ CIF ፍጠር፣ BIB Support system ተጠቀም
   - አድራሻ አይመጣም → ADDRESS table START_DATE ችግር → Toad ተጠቅሞ ያስተካክሉ
   - HACLINQ fatal error → ሁለት ስልክ ቁጥሮች → crmuser.PHONEEMAIL ያስወግዱ
   - Disbursement ይሳናል → Gross Disbursement + operative account ሂሳብ ያረጋግጡ
   - ወለድ አያከማችም → HACM interest flag፣ HCAAC/HAALM/HAFSM pending ያረጋግጡ

ህጎች:
- ሁልጊዜ ደረጃ-በ-ደረጃ መመሪያ ስጥ
- ሁልጊዜ ትክክለኛ የፊናክል ሜኑ ስም ጥቀስ
- ፓስወርድ ፈጽሞ አትጠይቅ
- ሁልጊዜ **በአማርኛ** ምላሽ ስጥ — ቴክኒካዊ ቃላት (HACM፣ CIF፣ SOL ID) ሳይቀሩ
- ምላሾችህ ግልጽ፣ አጭር እና ሙያዊ ይሁኑ`;

// Cache discovered model per API key
const _modelCache = {};

async function askGemini(apiKey, userMsg, lang, history = [], modelIndex = 0) {
  const systemPrompt = lang === "am" ? SYSTEM_PROMPT_AM : SYSTEM_PROMPT_EN;

  // On first call, discover the best available model
  if (modelIndex === 0 && !_modelCache[apiKey]) {
    _modelCache[apiKey] = await getAvailableModel(apiKey);
  }
  const model = modelIndex === 0
    ? (_modelCache[apiKey] || GEMINI_MODELS[0])
    : (GEMINI_MODELS[modelIndex] || GEMINI_MODELS[0]);

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  // Build conversation history for context
  const historyContents = history.slice(-6).map(m => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: m.text }],
  }));

  const body = {
    system_instruction: { parts: [{ text: systemPrompt }] },
    contents: [
      ...historyContents,
      { role: "user", parts: [{ text: userMsg }] },
    ],
    generationConfig: { temperature: 0.3, maxOutputTokens: 1000, topP: 0.8 },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
    ],
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (res.status === 429) {
    const err = await res.json().catch(() => ({}));
    const msg = err?.error?.message || "";
    const match = msg.match(/retry in ([0-9.]+)s/i);
    const waitMs = match ? Math.ceil(parseFloat(match[1]) * 1000) + 500 : 8000;
    await new Promise(r => setTimeout(r, waitMs));
    if (modelIndex + 1 < GEMINI_MODELS.length) {
      return askGemini(apiKey, userMsg, lang, history, modelIndex + 1);
    }
    throw new Error("All Gemini models are rate-limited. Please try again in a moment.");
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg = err?.error?.message || `HTTP ${res.status}`;
    if ((res.status === 403 || msg.includes("quota") || msg.includes("RESOURCE_EXHAUSTED") || msg.includes("not found") || msg.includes("not supported")) && modelIndex + 1 < GEMINI_MODELS.length) {
      // Clear cache so next call re-discovers
      delete _modelCache[apiKey];
      return askGemini(apiKey, userMsg, lang, history, modelIndex + 1);
    }
    throw new Error(msg);
  }

  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
}

// ── Constants ─────────────────────────────────────────────────────────────────
const GREETING = {
  en: { role: "bot", src: "local", text: `👋 Hello! I'm the **Bunna Bank IT Support Assistant** — powered by local knowledge + Gemini AI.

I can help with:
• Finacle account opening, verification & operations
• Password reset & account lockout
• Core Banking connectivity issues
• Printer, VPN & network troubleshooting
• Freezing, lien, collateral & loan operations
• Any Finacle menu questions (HACM, HOAACSB, HCLM...)

Type your question or pick a topic below.` },
  am: { role: "bot", src: "local", text: `👋 ጤና ይስጥልኝ! የ**ቡና ባንክ አይቲ ድጋፍ ረዳት** ነኝ — በአካባቢ እውቀት እና Gemini AI የተደገፈ።

እነዚህን ልርዳዎ እችላለሁ:
• የፊናክል መለያ መክፈት፣ ማረጋገጥ እና ስራዎች
• ፓስወርድ ዳግም ማስጀመር እና መቆለፍ
• ኮር ባንኪንግ ግንኙነት ችግሮች
• ማተሚያ፣ VPN እና ኔትወርክ ችግሮች
• ማቀዝቀዝ፣ ዋስትና፣ ብድር ስራዎች
• ማንኛውም የፊናክል ሜኑ ጥያቄዎች

ጥያቄዎን ይተይቡ ወይም ከታች ርዕስ ይምረጡ።` },
};

const QUICK = {
  en: ["Open saving account", "Freeze account (HAFSM)", "Verify account error", "Collateral (HCLM)", "Interest not collecting", "Disbursement error", "Finacle menu reference", "Password reset", "Printer not working", "ITSM ticket"],
  am: ["ቁጠባ አካውንት ክፈት", "አካውንት አቀዝቅዝ (HAFSM)", "ማረጋገጫ ስህተት", "ዋስትና (HCLM)", "ወለድ አያከማችም", "Disbursement ስህተት", "የፊናክል ሜኑ ማጣቀሻ", "ፓስወርድ ዳግም ማስጀመር", "ማተሚያ አይሰራም", "ITSM ቲኬት"],
};

const SOURCE_BADGE = {
  local: { label: "Local KB", color: "bg-amber-100 text-amber-700" },
  gemini: { label: "Gemini AI", color: "bg-blue-100 text-blue-700" },
};

// ── Markdown renderer ─────────────────────────────────────────────────────────
function MsgText({ text }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-0.5 text-sm leading-relaxed">
      {lines.map((line, i) => {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        const rendered = parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p);
        if (line.startsWith("• ") || line.startsWith("- "))
          return <div key={i} className="flex gap-2"><span className="text-amber-600 mt-0.5 flex-shrink-0">•</span><span>{rendered}</span></div>;
        if (/^\d+\./.test(line))
          return <div key={i} className="flex gap-2 ml-2"><span className="text-[#3d1209] font-mono font-bold text-xs mt-0.5 flex-shrink-0">{line.match(/^\d+/)[0]}.</span><span>{rendered}</span></div>;
        if (/^#{1,3} /.test(line))
          return <div key={i} className="font-bold text-gray-800 mt-1">{line.replace(/^#+\s/, "")}</div>;
        if (line.trim() === "") return <div key={i} className="h-1" />;
        return <div key={i}>{rendered}</div>;
      })}
    </div>
  );
}

// ── API Key modal ─────────────────────────────────────────────────────────────
function ApiKeyModal({ onSave, onClose }) {
  const [val, setVal] = useState(localStorage.getItem("gemini_key") || "");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-fade-in">
        <div className="bg-gradient-to-br from-[#3d1209] to-[#7a2a15] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center">
              <HiKey className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-semibold">Gemini API Key</div>
              <div className="text-amber-300/70 text-xs">Stored locally in your browser</div>
            </div>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white"><HiXMark className="w-5 h-5" /></button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <p className="text-xs text-gray-500">Get your free key at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-blue-600 underline">aistudio.google.com</a>. It stays in your browser only.</p>
          <input
            type="password"
            value={val}
            onChange={e => setVal(e.target.value)}
            placeholder="AIza..."
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#3d1209] transition-colors"
          />
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-colors">Cancel</button>
            <button onClick={() => { localStorage.setItem("gemini_key", val); onSave(val); onClose(); }}
              className="flex-1 bg-[#3d1209] hover:bg-[#5a1b0e] text-white font-semibold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
              <HiCheckCircle className="w-4 h-4" /> Save Key
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ITSupport() {
  const [uiLang, setUiLang] = useState("en");
  const [messages, setMessages] = useState([GREETING[uiLang]]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [typingMsg, setTypingMsg] = useState("");
  const [geminiKey, setGeminiKey] = useState(localStorage.getItem("gemini_key") || "");
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [geminiError, setGeminiError] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const switchLang = (lang) => { setUiLang(lang); setMessages([GREETING[lang]]); setInput(""); };

  const send = async (text) => {
    const msg = (text || input).trim();
    if (!msg || typing) return;
    setInput("");
    setGeminiError("");
    setMessages(prev => [...prev, { role: "user", text: msg }]);
    setTyping(true);
    setTypingMsg("");

    const { answer, lang } = findAnswer(msg);

    // If Gemini key exists, use it for everything the local KB doesn't cover
    // (including greetings, general questions, follow-ups, etc.)
    if (!answer && geminiKey) {
      setTypingMsg("Asking Gemini AI...");
      try {
        const history = messages.filter(m => m.role === "user" || m.role === "bot").slice(-6);
        const reply = await askGemini(geminiKey, msg, lang, history);
        setMessages(prev => [...prev, { role: "bot", src: "gemini", text: reply }]);
      } catch (err) {
        setGeminiError(err.message);
        // On Gemini failure, show local answer if available, else fallback
        setMessages(prev => [...prev, { role: "bot", src: "local", text: answer || FALLBACK[lang] }]);
      }
      setTyping(false);
      setTypingMsg("");
      return;
    }

    // Local KB answer (no Gemini key, or local match found)
    await new Promise(r => setTimeout(r, 500));
    setMessages(prev => [...prev, { role: "bot", src: "local", text: answer || FALLBACK[lang] }]);
    setTyping(false);
    setTypingMsg("");
  };

  const handleKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } };

  const label = {
    en: { placeholder: "Ask any IT or Finacle question...", quickTitle: "Quick topics:", langBtn: "አማርኛ", keyBtn: "Gemini Key", powered: "Local KB + Gemini AI" },
    am: { placeholder: "ማንኛውም አይቲ ወይም ፊናክል ጥያቄ ይጠይቁ...", quickTitle: "ፈጣን ርዕሶች:", langBtn: "English", keyBtn: "Gemini ቁልፍ", powered: "አካባቢ KB + Gemini AI" },
  }[uiLang];

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-3xl mx-auto">
      {showKeyModal && <ApiKeyModal onSave={setGeminiKey} onClose={() => setShowKeyModal(false)} />}

      {/* Header */}
      <div className="relative bg-gradient-to-br from-[#3d1209] via-[#5a1b0e] to-[#7a2a15] rounded-3xl px-6 py-5 mb-4 overflow-hidden shadow-xl flex-shrink-0">
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/5 rounded-full" />
        <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-amber-500/10 rounded-full" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
              <HiCpuChip className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-tight">
                {uiLang === "en" ? "IT Support Assistant" : "የአይቲ ድጋፍ ረዳት"}
              </div>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span className="text-amber-300/80 text-xs">Online</span>
                </span>
                <span className="text-amber-300/40 text-xs">·</span>
                <span className="flex items-center gap-1 text-xs text-amber-300/70">
                  <HiGlobeAlt className="w-3 h-3" /> {label.powered}
                </span>
                {geminiKey && (
                  <span className="bg-blue-500/20 text-blue-200 text-[10px] px-2 py-0.5 rounded-full border border-blue-400/30">Gemini ✓</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowKeyModal(true)}
              className="bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5">
              <HiKey className="w-3.5 h-3.5" /> {label.keyBtn}
            </button>
            <button onClick={() => switchLang(uiLang === "en" ? "am" : "en")}
              className="bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-all">
              {label.langBtn}
            </button>
          </div>
        </div>
      </div>

      {/* Gemini error banner */}
      {geminiError && (
        <div className="flex-shrink-0 mb-3 bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-2 rounded-xl flex items-center justify-between">
          <span>Gemini error: {geminiError}</span>
          <button onClick={() => setGeminiError("")}><HiXMark className="w-4 h-4" /></button>
        </div>
      )}

      {/* Quick topics */}
      <div className="flex-shrink-0 mb-3">
        <p className="text-xs text-gray-400 mb-2 px-1">{label.quickTitle}</p>
        <div className="flex flex-wrap gap-2">
          {QUICK[uiLang].map(q => (
            <button key={q} onClick={() => send(q)}
              className="text-xs bg-white border border-gray-200 hover:border-amber-400 hover:bg-amber-50 text-gray-600 hover:text-[#3d1209] px-3 py-1.5 rounded-xl transition-all shadow-sm">
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-2">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
              m.role === "bot" ? "bg-gradient-to-br from-[#3d1209] to-amber-600" : "bg-gradient-to-br from-gray-200 to-gray-300"
            }`}>
              {m.role === "bot" ? <HiSparkles className="w-4 h-4 text-white" /> : <HiUser className="w-4 h-4 text-gray-600" />}
            </div>
            <div className={`max-w-[80%] flex flex-col gap-1 ${m.role === "user" ? "items-end" : "items-start"}`}>
              {m.role === "bot" && m.src && (
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${SOURCE_BADGE[m.src]?.color}`}>
                  {SOURCE_BADGE[m.src]?.label}
                </span>
              )}
              <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                m.role === "bot"
                  ? "bg-white border border-gray-100 text-gray-800 rounded-tl-sm"
                  : "bg-[#3d1209] text-white rounded-tr-sm"
              }`}>
                {m.role === "bot" ? <MsgText text={m.text} /> : <p className="text-sm">{m.text}</p>}
              </div>
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#3d1209] to-amber-600 flex items-center justify-center flex-shrink-0">
              <HiSparkles className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              {typingMsg ? (
                <p className="text-xs text-gray-400 italic">{typingMsg}</p>
              ) : (
                <div className="flex gap-1 items-center h-5">
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              )}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 pt-3">
        {!geminiKey && (
          <div className="mb-2 text-center text-xs text-gray-400">
            <button onClick={() => setShowKeyModal(true)} className="text-[#3d1209] underline font-medium">Add Gemini API key</button>
            {" "}to unlock AI answers for any question
          </div>
        )}
        <div className="flex gap-2 bg-white border-2 border-gray-200 focus-within:border-[#3d1209] rounded-2xl px-4 py-2 transition-all shadow-sm">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={label.placeholder}
            className="flex-1 resize-none text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent py-1.5 max-h-28"
          />
          <button onClick={() => send()} disabled={!input.trim() || typing}
            className="self-end w-9 h-9 bg-[#3d1209] hover:bg-[#5a1b0e] disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-all flex-shrink-0">
            <HiPaperAirplane className="w-4 h-4" />
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-300 mt-2">
          {uiLang === "en"
            ? "Responses are for guidance only · Never share your password · Gemini key stored locally"
            : "ምላሾች መመሪያ ብቻ ናቸው · ፓስወርድዎን አይስጡ · Gemini ቁልፍ በአካባቢ ይቀመጣል"}
        </p>
      </div>
    </div>
  );
}
