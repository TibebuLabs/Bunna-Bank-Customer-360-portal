import { useState } from "react";
import {
  HiWifi, HiSignal, HiMagnifyingGlass, HiXMark, HiPlus,
  HiBuildingOffice2, HiHashtag, HiCheckCircle, HiExclamationTriangle,
  HiArrowLeft, HiSparkles
} from "react-icons/hi2";
import { useLang } from "../i18n/LanguageContext";
import { BUNNA_BRANCHES } from "../data/branchData";

const BASE_NET = Object.fromEntries(
  BUNNA_BRANCHES.map(b => [b.solId, {
    lan: `192.168.${b.solId % 255}.0/24`,
    wan: `10.${Math.floor(b.solId / 100)}.${b.solId % 100}.1`,
    gateway: `192.168.${b.solId % 255}.1`,
    dns: "8.8.8.8 / 8.8.4.4",
    bandwidth: `${[2, 4, 8, 10][b.solId % 4]} Mbps`,
    isp: ["Ethio Telecom", "Safaricom", "Ethio Telecom Fiber"][b.solId % 3],
    status: b.solId % 7 === 0 ? "degraded" : b.solId % 13 === 0 ? "down" : "up",
    uptime: `${99 - (b.solId % 3)}.${b.solId % 10}%`,
    serviceNo: `${1000000 + b.solId * 1337}`,
    vlan: `VLAN ${100 + (b.solId % 20)}`,
  }])
);

const ST = {
  up:       { dot: "bg-emerald-400", badge: "bg-emerald-100 text-emerald-700", label: "Online",   labelAm: "በመስመር ላይ" },
  degraded: { dot: "bg-amber-400",   badge: "bg-amber-100 text-amber-700",     label: "Degraded", labelAm: "ዝቅተኛ" },
  down:     { dot: "bg-red-400",     badge: "bg-red-100 text-red-700",         label: "Offline",  labelAm: "ከመስመር ውጭ" },
};

const EMPTY_FORM = { solId:"", branchName:"", lan:"", wan:"", gateway:"", dns:"", bandwidth:"", isp:"", vlan:"", serviceNo:"", status:"up" };

function RegisterNetwork({ onBack, onSave, isAm }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const required = ["solId","branchName","lan","wan","gateway","bandwidth","isp","serviceNo"];
  const set = (k,v) => { setForm(f=>({...f,[k]:v})); if(errors[k]) setErrors(e=>{const n={...e};delete n[k];return n;}); };

  const validate = () => {
    const e = {};
    required.forEach(k => { if (!form[k]?.trim()) e[k] = isAm ? "ያስፈልጋል" : "Required"; });
    if (form.solId && !/^\d+$/.test(form.solId.trim())) e.solId = isAm ? "ቁጥር ብቻ" : "Numbers only";
    if (form.serviceNo && !/^\d+$/.test(form.serviceNo.trim())) e.serviceNo = isAm ? "ቁጥር ብቻ" : "Numbers only";
    return e;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); onSave && onSave(form); }, 1000);
  };

  const F = ({ k, label, labelAm, placeholder, type="text" }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
        {isAm ? labelAm : label}{required.includes(k) && <span className="text-red-400 ml-1">*</span>}
      </label>
      <div className={`flex items-center border-2 rounded-xl px-3 transition-all ${errors[k] ? "border-red-300 bg-red-50" : "border-gray-200 focus-within:border-[#3d1209]"}`}>
        <input type={type} placeholder={placeholder} value={form[k]} onChange={e=>set(k,e.target.value)}
          className="flex-1 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none bg-transparent font-mono" />
      </div>
      {errors[k] && <p className="text-xs text-red-500 mt-1">{errors[k]}</p>}
    </div>
  );

  if (done) return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-blue-200">
        <HiCheckCircle className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{isAm ? "ኔትወርክ ተመዝግቧል!" : "Network Registered!"}</h2>
      <p className="text-gray-500 mb-1"><span className="font-semibold text-[#3d1209]">{form.branchName}</span> {isAm ? "ተጨምሯል።" : "has been added."}</p>
      <p className="text-xs text-gray-400 font-mono mb-8">SOL ID: {form.solId} · LAN: {form.lan}</p>
      <div className="flex gap-3">
        <button onClick={() => { setForm(EMPTY_FORM); setDone(false); }}
          className="px-6 py-2.5 bg-[#3d1209] text-white rounded-xl text-sm font-semibold hover:bg-[#5a1b0e] transition-colors">
          {isAm ? "ሌላ ምዝገባ" : "Register Another"}
        </button>
        <button onClick={onBack} className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors">
          {isAm ? "ወደ ኔትወርክ" : "Back to Network"}
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#3d1209] transition-colors font-medium mb-8">
        <HiArrowLeft className="w-4 h-4" />{isAm ? "ወደ ኔትወርክ ተመለስ" : "Back to Network Info"}
      </button>
      <div className="flex items-start gap-4 mb-8">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 flex-shrink-0">
          <HiSparkles className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{isAm ? "አዲስ ኔትወርክ ምዝገባ" : "Register New Network"}</h1>
          <p className="text-gray-500 text-sm mt-1">{isAm ? "የቅርንጫፍ ኔትወርክ መረጃ ያስገቡ" : "Enter branch network details"}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center text-white"><HiHashtag className="w-5 h-5" /></div>
              <h2 className="text-white font-semibold text-sm">{isAm ? "የቅርንጫፍ መለያ" : "Branch Identity"}</h2>
            </div>
            <div className="p-5 space-y-4">
              <F k="solId" label="SOL ID" labelAm="SOL ID" placeholder="e.g. 139" />
              <F k="branchName" label="Branch Name" labelAm="የቅርንጫፍ ስም" placeholder="e.g. DEJEN" />
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center text-white"><HiWifi className="w-5 h-5" /></div>
              <h2 className="text-white font-semibold text-sm">{isAm ? "አድራሻ" : "Addressing"}</h2>
            </div>
            <div className="p-5 space-y-4">
              <F k="lan" label="LAN" labelAm="LAN" placeholder="e.g. 192.168.1.0/24" />
              <F k="wan" label="WAN" labelAm="WAN" placeholder="e.g. 10.0.139.1" />
              <F k="gateway" label="Gateway" labelAm="ጌትዌይ" placeholder="e.g. 192.168.1.1" />
              <F k="dns" label="DNS" labelAm="DNS" placeholder="e.g. 8.8.8.8 / 8.8.4.4" />
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-violet-500 to-purple-500 px-5 py-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center text-white"><HiSignal className="w-5 h-5" /></div>
              <h2 className="text-white font-semibold text-sm">{isAm ? "ግንኙነት" : "Connectivity"}</h2>
            </div>
            <div className="p-5 space-y-4">
              <F k="bandwidth" label="Bandwidth" labelAm="ባንድዊድዝ" placeholder="e.g. 10 Mbps" />
              <F k="isp" label="ISP" labelAm="ISP" placeholder="e.g. Ethio Telecom" />
              <F k="vlan" label="VLAN" labelAm="VLAN" placeholder="e.g. VLAN 110" />
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center text-white"><HiCheckCircle className="w-5 h-5" /></div>
              <h2 className="text-white font-semibold text-sm">{isAm ? "አገልግሎት ቁጥር እና ሁኔታ" : "Service No. & Status"}</h2>
            </div>
            <div className="p-5 space-y-4">
              <F k="serviceNo" label="Service Number" labelAm="የአገልግሎት ቁጥር" placeholder="e.g. 1234567" />
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  {isAm ? "ሁኔታ" : "Status"}
                </label>
                <select value={form.status} onChange={e=>set("status",e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-700 outline-none focus:border-[#3d1209]">
                  <option value="up">{isAm ? "በመስመር ላይ" : "Online"}</option>
                  <option value="degraded">{isAm ? "ዝቅተኛ" : "Degraded"}</option>
                  <option value="down">{isAm ? "ከመስመር ውጭ" : "Offline"}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 bg-[#3d1209] hover:bg-[#5a1b0e] text-white font-semibold px-8 py-3 rounded-xl text-sm transition-colors disabled:opacity-60 shadow-lg shadow-[#3d1209]/20">
            {loading
              ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{isAm ? "በመመዝገብ ላይ..." : "Registering..."}</>
              : <><HiCheckCircle className="w-4 h-4" />{isAm ? "ምዝገባ" : "Register Network"}</>}
          </button>
          <button type="button" onClick={onBack} className="px-6 py-3 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors">
            {isAm ? "ሰርዝ" : "Cancel"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function NetworkInfo() {
  const { lang } = useLang();
  const isAm = lang === "am";
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [registering, setRegistering] = useState(false);
  const [extraNets, setExtraNets] = useState({});

  const NETWORK_DATA = { ...BASE_NET, ...extraNets };

  const allBranches = [
    ...BUNNA_BRANCHES,
    ...Object.keys(extraNets)
      .filter(id => !BUNNA_BRANCHES.find(b => b.solId === Number(id)))
      .map(id => ({ solId: Number(id), code: extraNets[id].branchName, amharic: "", district: "", region: "" }))
  ];

  const filtered = allBranches.filter(b => {
    const q = search.toLowerCase();
    const net = NETWORK_DATA[b.solId];
    if (!net) return false;
    const matchSearch = !q ||
      b.code.toLowerCase().includes(q) ||
      (b.amharic || "").includes(q) ||
      String(b.solId).includes(q) ||
      net.lan.includes(q) ||
      net.wan.includes(q);
    const matchStatus = statusFilter === "all" || net.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = {
    up:       allBranches.filter(b => NETWORK_DATA[b.solId]?.status === "up").length,
    degraded: allBranches.filter(b => NETWORK_DATA[b.solId]?.status === "degraded").length,
    down:     allBranches.filter(b => NETWORK_DATA[b.solId]?.status === "down").length,
  };

  const handleSave = (form) => {
    setExtraNets(prev => ({
      ...prev,
      [Number(form.solId)]: {
        lan: form.lan, wan: form.wan, gateway: form.gateway,
        dns: form.dns || "—", bandwidth: form.bandwidth,
        isp: form.isp, status: form.status,
        uptime: "100.0%", serviceNo: form.serviceNo,
        vlan: form.vlan || "—",
      }
    }));
  };

  if (registering) return <RegisterNetwork onBack={() => setRegistering(false)} onSave={handleSave} isAm={isAm} />;

  if (selected) {
    const net = NETWORK_DATA[selected.solId];
    const st = ST[net.status];
    return (
      <div>
        <button onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#3d1209] transition-colors font-medium mb-6">
          ← {isAm ? "ወደ ኔትወርክ መረጃ ተመለስ" : "Back to Network Info"}
        </button>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
          <div className="flex items-start justify-between mb-6 pb-5 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                <HiWifi className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{selected.code}</h1>
                {selected.amharic && <p className="text-sm text-gray-500">{selected.amharic}</p>}
                <p className="text-xs font-mono text-gray-400 mt-0.5">SOL ID: {selected.solId}</p>
              </div>
            </div>
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 ${st.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
              {isAm ? st.labelAm : st.label}
            </span>
          </div>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
            <NetItem label="LAN"       value={net.lan}                icon={<HiWifi className="w-4 h-4 text-blue-500" />} />
            <NetItem label="WAN"       value={net.wan}                icon={<HiSignal className="w-4 h-4 text-cyan-500" />} />
            <NetItem label="Gateway"   value={net.gateway}            icon={<HiSignal className="w-4 h-4 text-violet-500" />} />
            <NetItem label="DNS"       value={net.dns}                icon={<HiHashtag className="w-4 h-4 text-gray-400" />} />
            <NetItem label="Bandwidth" value={net.bandwidth}          icon={<HiSignal className="w-4 h-4 text-emerald-500" />} />
            <NetItem label="ISP"       value={net.isp}                icon={<HiBuildingOffice2 className="w-4 h-4 text-amber-500" />} />
            <NetItem label="Uptime"    value={net.uptime}             icon={<HiCheckCircle className="w-4 h-4 text-emerald-500" />} />
            <NetItem label="VLAN"      value={net.vlan}               icon={<HiHashtag className="w-4 h-4 text-blue-400" />} />
            <NetItem label={isAm ? "የአገልግሎት ቁጥር" : "Service No."} value={net.serviceNo} icon={<HiHashtag className="w-4 h-4 text-teal-500" />} />
            {selected.district && <NetItem label={isAm ? "ወረዳ" : "District"} value={selected.district} icon={<HiBuildingOffice2 className="w-4 h-4 text-gray-400" />} />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{isAm ? "የኔትወርክ መረጃ" : "Network Information"}</h1>
          <p className="text-gray-500 text-sm mt-1">{isAm ? "የቅርንጫፍ ኔትወርክ ሁኔታ" : "Branch network status overview"}</p>
        </div>
        <button onClick={() => setRegistering(true)}
          className="flex items-center gap-2 bg-[#3d1209] hover:bg-[#5a1b0e] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-lg shadow-[#3d1209]/20">
          <HiPlus className="w-4 h-4" />
          {isAm ? "አዲስ ኔትወርክ" : "New Network"}
        </button>
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { key:"up",       label:"Online",   labelAm:"በመስመር ላይ", count:counts.up,       color:"from-emerald-500 to-teal-500",  icon:<HiCheckCircle className="w-6 h-6" /> },
          { key:"degraded", label:"Degraded", labelAm:"ዝቅተኛ",     count:counts.degraded, color:"from-amber-500 to-orange-500",  icon:<HiExclamationTriangle className="w-6 h-6" /> },
          { key:"down",     label:"Offline",  labelAm:"ከመስመር ውጭ", count:counts.down,     color:"from-red-500 to-rose-500",      icon:<HiSignal className="w-6 h-6" /> },
        ].map(s => (
          <button key={s.key} onClick={() => setStatusFilter(statusFilter === s.key ? "all" : s.key)}
            className={`bg-gradient-to-br ${s.color} rounded-2xl p-5 text-white text-left transition-all shadow-sm ${statusFilter === s.key ? "ring-4 ring-offset-2 ring-gray-300 scale-[1.02]" : "hover:scale-[1.01]"}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">{s.icon}</div>
              <span className="text-3xl font-bold">{s.count}</span>
            </div>
            <div className="font-semibold text-sm">{isAm ? s.labelAm : s.label}</div>
            <div className="text-white/70 text-xs">{isAm ? "ቅርንጫፎች" : "branches"}</div>
          </button>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 flex items-center bg-white border-2 border-gray-200 rounded-xl px-4 gap-3 focus-within:border-[#3d1209] transition-all">
          <HiMagnifyingGlass className="text-gray-400 w-4 h-4 flex-shrink-0" />
          <input type="text" placeholder={isAm ? "ቅርንጫፍ፣ SOL ID፣ LAN/WAN ይፈልጉ..." : "Search branch, SOL ID, LAN/WAN..."}
            value={search} onChange={e => setSearch(e.target.value)}
            className="flex-1 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent" />
          {search && <button onClick={() => setSearch("")} className="text-gray-300 hover:text-gray-500"><HiXMark className="w-4 h-4" /></button>}
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#3d1209] min-w-[140px]">
          <option value="all">{isAm ? "ሁሉም" : "All Status"}</option>
          <option value="up">{isAm ? "በመስመር ላይ" : "Online"}</option>
          <option value="degraded">{isAm ? "ዝቅተኛ" : "Degraded"}</option>
          <option value="down">{isAm ? "ከመስመር ውጭ" : "Offline"}</option>
        </select>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <HiWifi className="w-14 h-14 mx-auto mb-4 text-gray-300" />
          <p>{isAm ? "ምንም ቅርንጫፍ አልተገኘም" : "No branches found"}</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {[
                    "SOL ID",
                    isAm ? "ቅርንጫፍ" : "Branch",
                    "LAN", "WAN",
                    isAm ? "ባንድዊድዝ" : "Bandwidth",
                    "ISP",
                    isAm ? "አፕታይም" : "Uptime",
                    isAm ? "የአገልግሎት ቁጥር" : "Service No.",
                    isAm ? "ሁኔታ" : "Status",
                    ""
                  ].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(b => {
                  const net = NETWORK_DATA[b.solId];
                  const st = ST[net.status];
                  return (
                    <tr key={b.solId} onClick={() => setSelected(b)}
                      className="border-t border-gray-50 hover:bg-blue-50/40 cursor-pointer transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">{b.solId}</td>
                      <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">{b.code}</td>
                      <td className="px-4 py-3 font-mono text-xs text-blue-600">{net.lan}</td>
                      <td className="px-4 py-3 font-mono text-xs text-cyan-600">{net.wan}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{net.bandwidth}</td>
                      <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{net.isp}</td>
                      <td className="px-4 py-3 text-xs font-mono text-emerald-600">{net.uptime}</td>
                      <td className="px-4 py-3 text-xs font-mono text-teal-700">{net.serviceNo}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit ${st.badge}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                          {isAm ? st.labelAm : st.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#3d1209] text-xs font-semibold whitespace-nowrap">{isAm ? "ይመልከቱ →" : "View →"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function NetItem({ label, value, icon }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex-shrink-0">{icon}</div>
      <div>
        <div className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">{label}</div>
        <div className="text-sm font-medium text-gray-700 font-mono">{value}</div>
      </div>
    </div>
  );
}
