import { useState, useRef, useEffect } from "react";
import { HiPaperAirplane, HiCpuChip, HiUser, HiSparkles, HiKey, HiXMark, HiCheckCircle, HiGlobeAlt, HiArrowPath } from "react-icons/hi2";
import { findAnswer, FALLBACK } from "../data/itSupportKB";

const GEMINI_MODELS = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];

async function getAvailableModel(apiKey) {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    if (!res.ok) return GEMINI_MODELS[0];
    const data = await res.json();
    const names = (data.models || []).filter(m => m.supportedGenerationMethods?.includes("generateContent")).map(m => m.name.replace("models/", ""));
    for (const p of GEMINI_MODELS) { if (names.includes(p)) return p; }
    return names.find(n => n.includes("flash")) || names[0] || GEMINI_MODELS[0];
  } catch { return GEMINI_MODELS[0]; }
}

const PROMPT_EN = `You are BUNA AI, the official IT Support and Banking Assistant for Buna Bank (BIB), Ethiopia. You are warm, professional, and give comprehensive detailed answers. Respond warmly to ALL messages including greetings. For banking/IT questions, give thorough step-by-step answers. FINACLE MENUS: HOAACSB(Saving), HOAACCA(Current), HOAACOD(OD), HOAACTD(TD), HOAACLA(Loan). Verify: HOAACVSB, HOAACVCA, HOAACVOD, HOAACVTD, HOAACVLA. Ops: HACM(modify), HCAAC(close), HPAYOFF(loan close), HAFSM(freeze), HALM(lien), HCLM(collateral), HLADISB(disburse), HACLHM(OD limit), HPBP(passbook), HPSP(statement). COMMON FIXES: 1. Invalid Customer Account: CIF lost, create new CIF in CRM, use BIB Support portal to change CIF. WARNING: Cancel instead of Verify permanently deletes account. 2. Address not populating: UPDATE crmuser.ADDRESS SET START_DATE=SYSDATE WHERE CUST_ID='<CIF>'. 3. HACLINQ fatal error: DELETE FROM crmuser.PHONEEMAIL WHERE CUST_ID='<CIF>' AND ROWNUM=1. 4. Disbursement fails: check Gross Disbursement flag, operative account balance, drawing power=Equal in HACLHM. 5. Interest not collecting: HACM > Interest tab > Collect Interest=Yes. RULES: Always give numbered steps. Bold menu names. Include SQL when needed. Never ask for passwords.`;

const PROMPT_AM = `You are BUNA AI, the official IT Support and Banking Assistant for Buna Bank (BIB), Ethiopia. The user is writing in Amharic, so you MUST respond entirely in Amharic (Ethiopic script). Be warm, professional, and give comprehensive detailed answers in Amharic. Respond to ALL messages including greetings. Key Finacle menus: HOAACSB, HOAACCA, HOAACOD, HOAACTD, HOAACLA (opening), HACM (modify), HCAAC (close), HAFSM (freeze), HALM (lien), HCLM (collateral), HLADISB (disburse), HACLHM (OD limit), HPBP (passbook). Common fixes: 1. Invalid Customer Account: CIF lost, create new CIF, use BIB Support portal. 2. Address: UPDATE crmuser.ADDRESS SET START_DATE=SYSDATE WHERE CUST_ID='<CIF>'. 3. HACLINQ error: DELETE FROM crmuser.PHONEEMAIL WHERE CUST_ID='<CIF>' AND ROWNUM=1. 4. Disbursement: check Gross Disbursement, operative account, drawing power=Equal. 5. Interest: HACM > Interest tab > Collect Interest=Yes. RULES: Always respond in Amharic. Give numbered steps. Never ask for passwords.`;

const _cache = {};

async function askGemini(apiKey, msg, lang, history = [], idx = 0) {
  if (idx === 0 && !_cache[apiKey]) _cache[apiKey] = await getAvailableModel(apiKey);
  const model = idx === 0 ? (_cache[apiKey] || GEMINI_MODELS[0]) : (GEMINI_MODELS[idx] || GEMINI_MODELS[0]);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const body = {
    system_instruction: { parts: [{ text: lang === "am" ? PROMPT_AM : PROMPT_EN }] },
    contents: [...history.slice(-6).map(m => ({ role: m.role === "user" ? "user" : "model", parts: [{ text: m.text }] })), { role: "user", parts: [{ text: msg }] }],
    generationConfig: { temperature: 0.3, maxOutputTokens: 2000, topP: 0.85 },
    safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }],
  };
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (res.status === 429) {
    const err = await res.json().catch(() => ({}));
    const match = (err?.error?.message || "").match(/retry in ([0-9.]+)s/i);
    await new Promise(r => setTimeout(r, match ? Math.ceil(parseFloat(match[1]) * 1000) + 500 : 6000));
    if (idx + 1 < GEMINI_MODELS.length) return askGemini(apiKey, msg, lang, history, idx + 1);
    throw new Error("Rate limited. Please try again.");
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (idx + 1 < GEMINI_MODELS.length) { delete _cache[apiKey]; return askGemini(apiKey, msg, lang, history, idx + 1); }
    throw new Error(err?.error?.message || `HTTP ${res.status}`);
  }
  return (await res.json())?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
}

const BADGE = { local: { label: "Local KB", cls: "bg-amber-100 text-amber-700" }, gemini: { label: "BUNA AI", cls: "bg-blue-100 text-blue-700" } };

function MsgText({ text }) {
  return (
    <div className="space-y-0.5 text-sm leading-relaxed">
      {text.split("\n").map((line, i) => {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        const r = parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p);
        if (line.startsWith("- ") || line.startsWith("* ")) return <div key={i} className="flex gap-2"><span className="text-amber-600">•</span><span>{r}</span></div>;
        if (/^\d+\./.test(line)) return <div key={i} className="flex gap-2 ml-2"><span className="text-[#3d1209] font-bold text-xs">{line.match(/^\d+/)[0]}.</span><span>{r}</span></div>;
        if (/^#{1,3} /.test(line)) return <div key={i} className="font-bold text-gray-800 mt-1">{line.replace(/^#+\s/, "")}</div>;
        if (line.trim() === "") return <div key={i} className="h-1.5" />;
        return <div key={i}>{r}</div>;
      })}
    </div>
  );
}

function ApiKeyModal({ onSave, onClose }) {
  const [val, setVal] = useState(localStorage.getItem("gemini_key") || "");
  const save = () => { if (val.trim()) { localStorage.setItem("gemini_key", val.trim()); onSave(val.trim()); onClose(); } };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="bg-gradient-to-br from-[#3d1209] to-[#7a2a15] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center"><HiKey className="w-5 h-5 text-white" /></div>
            <div><div className="text-white font-semibold">Gemini API Key</div><div className="text-amber-300/70 text-xs">Stored locally in your browser</div></div>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white"><HiXMark className="w-5 h-5" /></button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <p className="text-xs text-blue-700 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">Get your free key at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="underline font-semibold">aistudio.google.com</a></p>
          <input type="password" value={val} onChange={e => setVal(e.target.value)} onKeyDown={e => e.key === "Enter" && save()} placeholder="AIza..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#3d1209]" autoFocus />
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={save} className="flex-1 bg-[#3d1209] hover:bg-[#5a1b0e] text-white font-semibold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2"><HiCheckCircle className="w-4 h-4" /> Activate</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ITSupport() {
  const [uiLang, setUiLang] = useState("en");
  const initMsg = { role: "bot", src: "local", text: "Hello! I'm **BUNA AI** - your IT Support & Banking Assistant for Buna Bank.\n\nI can help with:\n- Finacle CBS - account opening, verification, modifications\n- Loan Operations - disbursement, collateral, OD limits\n- Database Fixes - Toad SQL solutions for Finacle errors\n- IT Support - passwords, VPN, network, printers, ITSM\n\nAsk me anything or pick a quick topic below." };
  const [messages, setMessages] = useState([initMsg]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [typingMsg, setTypingMsg] = useState("");
  const envKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  const [geminiKey, setGeminiKey] = useState((envKey && envKey !== "your_gemini_api_key_here") ? envKey : (localStorage.getItem("gemini_key") || ""));
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [geminiError, setGeminiError] = useState("");
  const [msgCount, setMsgCount] = useState(0);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const QUICK_EN = ["Open saving account", "Invalid Customer Account error", "Freeze account (HAFSM)", "Loan disbursement fails", "Interest not collecting", "HACLINQ fatal error", "Collateral (HCLM)", "Address not populating", "Password reset", "ITSM ticket", "Finacle menu reference", "VPN issue"];
  const QUICK_AM = ["Saving account", "Invalid Customer Account", "Freeze (HAFSM)", "Disbursement error", "Interest problem", "HACLINQ error", "Collateral", "Address issue", "Password reset", "ITSM ticket", "Finacle menus", "VPN"];

  const switchLang = (lang) => {
    setUiLang(lang);
    const greeting = lang === "am"
      ? { role: "bot", src: "local", text: "ጤና ይስጥልኝ! እኔ **BUNA AI** ነኝ - የቡና ባንክ አይቲ ድጋፍ ረዳትዎ።\n\nእነዚህን ልርዳዎ እችላለሁ:\n- ፊናክል CBS - አካውንት መክፈት፣ ማረጋገጥ\n- ብድር ስራዎች - disbursement፣ ዋስትና\n- ዳታቤዝ ማስተካከያ - Toad SQL\n- አይቲ ድጋፍ - ፓስወርድ፣ VPN፣ ITSM\n\nጥያቄዎን ይጠይቁ።" }
      : initMsg;
    setMessages([greeting]);
    setInput("");
    setGeminiError("");
  };

  const send = async (text) => {
    const msg = (text || input).trim();
    if (!msg || typing) return;
    setInput("");
    setGeminiError("");
    setMessages(prev => [...prev, { role: "user", text: msg }]);
    setMsgCount(c => c + 1);
    setTyping(true);
    const lang = /[\u1200-\u137F]/.test(msg) ? "am" : uiLang;
    const { answer } = findAnswer(msg);
    if (geminiKey) {
      setTypingMsg("BUNA AI is thinking...");
      try {
        const history = messages.filter(m => m.role === "user" || m.role === "bot").slice(-6);
        const reply = await askGemini(geminiKey, msg, lang, history);
        setMessages(prev => [...prev, { role: "bot", src: "gemini", text: reply }]);
      } catch (err) {
        setGeminiError(err.message);
        setMessages(prev => [...prev, { role: "bot", src: "local", text: answer || FALLBACK[lang] }]);
      }
    } else {
      await new Promise(r => setTimeout(r, 400));
      setMessages(prev => [...prev, { role: "bot", src: "local", text: answer || FALLBACK[lang] }]);
    }
    setTyping(false);
    setTypingMsg("");
  };

  const isAm = uiLang === "am";

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-3xl mx-auto">
      {showKeyModal && <ApiKeyModal onSave={setGeminiKey} onClose={() => setShowKeyModal(false)} />}
      <div className="relative bg-gradient-to-br from-[#3d1209] via-[#5a1b0e] to-[#7a2a15] rounded-3xl px-6 py-5 mb-4 overflow-hidden shadow-xl flex-shrink-0">
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/5 rounded-full" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center"><HiCpuChip className="w-6 h-6 text-white" /></div>
            <div>
              <div className="text-white font-bold text-lg flex items-center gap-2">BUNA AI {geminiKey && <span className="text-[10px] bg-blue-400/30 text-blue-200 px-2 py-0.5 rounded-full border border-blue-400/30 font-normal">AI Powered</span>}</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /><span className="text-amber-300/80 text-xs">Online</span></span>
                <span className="text-amber-300/40 text-xs">·</span>
                <span className="flex items-center gap-1 text-xs text-amber-300/70"><HiGlobeAlt className="w-3 h-3" /> {geminiKey ? "BUNA AI" : "Local KB"}</span>
                {msgCount > 0 && <><span className="text-amber-300/40 text-xs">·</span><span className="text-xs text-amber-300/60">{msgCount} messages</span></>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {msgCount > 0 && <button onClick={() => { setMessages([isAm ? { role: "bot", src: "local", text: "ጤና ይስጥልኝ! BUNA AI ነኝ። ጥያቄዎን ይጠይቁ።" } : initMsg]); setMsgCount(0); setGeminiError(""); }} className="bg-white/10 hover:bg-white/20 border border-white/15 text-white/70 hover:text-white text-xs px-2.5 py-1.5 rounded-xl"><HiArrowPath className="w-3 h-3" /></button>}
            <button onClick={() => setShowKeyModal(true)} className={`border text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 ${geminiKey ? "bg-blue-500/20 border-blue-400/30 text-blue-200" : "bg-white/15 hover:bg-white/25 border-white/20 text-white"}`}><HiKey className="w-3.5 h-3.5" /> {geminiKey ? (isAm ? "AI ነቅቷል" : "AI Active") : (isAm ? "AI አንቃ" : "Enable AI")}</button>
            <button onClick={() => switchLang(isAm ? "en" : "am")} className="bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-xl">{isAm ? "English" : "አማርኛ"}</button>
          </div>
        </div>
      </div>
      {geminiError && <div className="flex-shrink-0 mb-3 bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-2.5 rounded-xl flex items-center justify-between gap-3"><span>AI error: {geminiError}</span><button onClick={() => setGeminiError("")}><HiXMark className="w-4 h-4" /></button></div>}
      {!geminiKey && <div className="flex-shrink-0 mb-3 bg-blue-50 border border-blue-200 text-blue-700 text-xs px-4 py-2.5 rounded-xl flex items-center justify-between gap-3"><span><strong>Unlock BUNA AI:</strong> Add your free Gemini API key for intelligent answers.</span><button onClick={() => setShowKeyModal(true)} className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">Add Key</button></div>}
      <div className="flex-shrink-0 mb-3">
        <p className="text-xs text-gray-400 mb-2 px-1">{isAm ? "ፈጣን ርዕሶች:" : "Quick topics:"}</p>
        <div className="flex flex-wrap gap-1.5">
          {(isAm ? QUICK_AM : QUICK_EN).map(q => <button key={q} onClick={() => send(q)} disabled={typing} className="text-xs bg-white border border-gray-200 hover:border-amber-400 hover:bg-amber-50 text-gray-600 hover:text-[#3d1209] px-3 py-1.5 rounded-xl transition-all shadow-sm disabled:opacity-50">{q}</button>)}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-2">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${m.role === "bot" ? "bg-gradient-to-br from-[#3d1209] to-amber-700" : "bg-gradient-to-br from-gray-200 to-gray-300"}`}>{m.role === "bot" ? <HiSparkles className="w-4 h-4 text-white" /> : <HiUser className="w-4 h-4 text-gray-600" />}</div>
            <div className={`max-w-[82%] flex flex-col gap-1 ${m.role === "user" ? "items-end" : "items-start"}`}>
              {m.role === "bot" && m.src && <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${BADGE[m.src]?.cls}`}>{BADGE[m.src]?.label}</span>}
              <div className={`rounded-2xl px-4 py-3 shadow-sm ${m.role === "bot" ? "bg-white border border-gray-100 text-gray-800 rounded-tl-sm" : "bg-[#3d1209] text-white rounded-tr-sm"}`}>{m.role === "bot" ? <MsgText text={m.text} /> : <p className="text-sm">{m.text}</p>}</div>
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#3d1209] to-amber-700 flex items-center justify-center flex-shrink-0"><HiSparkles className="w-4 h-4 text-white" /></div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              {typingMsg ? <div className="flex items-center gap-2"><div className="flex gap-1">{[0,150,300].map(d => <span key={d} className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay:`${d}ms`}} />)}</div><p className="text-xs text-gray-400 italic">{typingMsg}</p></div>
              : <div className="flex gap-1 items-center h-5">{[0,150,300].map(d => <span key={d} className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay:`${d}ms`}} />)}</div>}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="flex-shrink-0 pt-3">
        <div className="flex gap-2 bg-white border-2 border-gray-200 focus-within:border-[#3d1209] rounded-2xl px-4 py-2 transition-all shadow-sm">
          <textarea rows={1} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} placeholder={isAm ? "ማንኛውም ጥያቄ ይጠይቁ..." : "Ask any Finacle, IT, or banking question..."} className="flex-1 resize-none text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent py-1.5 max-h-32" />
          <button onClick={() => send()} disabled={!input.trim() || typing} className="self-end w-9 h-9 bg-[#3d1209] hover:bg-[#5a1b0e] disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-all flex-shrink-0"><HiPaperAirplane className="w-4 h-4" /></button>
        </div>
        <p className="text-center text-[10px] text-gray-300 mt-2">BUNA AI - Responses are for guidance only - Never share your password</p>
      </div>
    </div>
  );
}