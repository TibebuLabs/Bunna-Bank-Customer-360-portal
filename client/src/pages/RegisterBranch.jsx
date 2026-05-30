import { useState } from "react";
import {
  HiBuildingOffice2, HiIdentification, HiLanguage, HiWifi,
  HiSignal, HiPhone, HiHashtag, HiCheckCircle, HiArrowLeft,
  HiSparkles, HiMapPin, HiUser, HiDevicePhoneMobile
} from "react-icons/hi2";
import { useLang } from "../i18n/LanguageContext";

export default function RegisterBranch({ onBack }) {
  const { lang } = useLang();
  const isAm = lang === "am";

  const [form, setForm] = useState({
    solId: "", branchName: "", amharic: "", manager: "", managerPhone: "",
    phone: "", altPhone: "", csm: "", csmPhone: "", district: "", region: "",
    location: "", lan: "", wan: "", serviceCount: ""
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const required = ["solId", "branchName", "amharic", "manager", "managerPhone", "phone", "district", "region", "location", "lan", "wan", "serviceCount"];

  const validate = () => {
    const e = {};
    required.forEach(k => { if (!form[k]?.trim()) e[k] = isAm ? "ያስፈልጋል" : "Required"; });
    if (form.solId && !/^\d+$/.test(form.solId.trim())) e.solId = isAm ? "ቁጥር ብቻ" : "Numbers only";
    if (form.serviceCount && (isNaN(form.serviceCount) || Number(form.serviceCount) < 0))
      e.serviceCount = isAm ? "ትክክለኛ ቁጥር" : "Valid number";
    return e;
  };

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1000);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-emerald-200">
          <HiCheckCircle className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {isAm ? "ቅርንጫፍ ተመዝግቧል!" : "Branch Registered!"}
        </h2>
        <p className="text-gray-500 mb-1">
          <span className="font-semibold text-[#3d1209]">{form.branchName}</span>
          {isAm ? " ተጨምሯል።" : " has been added successfully."}
        </p>
        <p className="text-xs text-gray-400 font-mono mb-8">SOL ID: {form.solId}</p>
        <div className="flex gap-3">
          <button onClick={() => { setForm({ solId:"",branchName:"",amharic:"",manager:"",managerPhone:"",phone:"",altPhone:"",csm:"",csmPhone:"",district:"",region:"",location:"",lan:"",wan:"",serviceCount:"" }); setSubmitted(false); }}
            className="px-6 py-2.5 bg-[#3d1209] text-white rounded-xl text-sm font-semibold hover:bg-[#5a1b0e] transition-colors">
            {isAm ? "ሌላ ምዝገባ" : "Register Another"}
          </button>
          <button onClick={onBack}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors">
            {isAm ? "ወደ ቅርንጫፎች" : "Back to Branches"}
          </button>
        </div>
      </div>
    );
  }

  const Field = ({ k, label, labelAm, placeholder, type = "text", icon }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
        {isAm ? labelAm : label}
        {required.includes(k) && <span className="text-red-400 ml-1">*</span>}
      </label>
      <div className={`flex items-center gap-3 border-2 rounded-xl px-3 transition-all ${
        errors[k] ? "border-red-300 bg-red-50" : "border-gray-200 focus-within:border-[#3d1209]"
      }`}>
        <span className="text-gray-400 flex-shrink-0">{icon}</span>
        <input type={type} placeholder={placeholder} value={form[k]}
          onChange={e => set(k, e.target.value)}
          className="flex-1 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none bg-transparent" />
      </div>
      {errors[k] && <p className="text-xs text-red-500 mt-1">{errors[k]}</p>}
    </div>
  );

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#3d1209] transition-colors font-medium">
          <HiArrowLeft className="w-4 h-4" />
          {isAm ? "ወደ ቅርንጫፎች ተመለስ" : "Back to Branches"}
        </button>
      </div>

      <div className="flex items-start gap-4 mb-8">
        <div className="w-14 h-14 bg-gradient-to-br from-[#3d1209] to-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200 flex-shrink-0">
          <HiSparkles className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{isAm ? "አዲስ ቅርንጫፍ ምዝገባ" : "Register New Branch"}</h1>
          <p className="text-gray-500 text-sm mt-1">{isAm ? "ሁሉንም አስፈላጊ መረጃዎች ይሙሉ" : "Fill in all required branch details"}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

          {/* Branch Identity */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center text-white">
                <HiIdentification className="w-5 h-5" />
              </div>
              <h2 className="text-white font-semibold text-sm">{isAm ? "የቅርንጫፍ መለያ" : "Branch Identity"}</h2>
            </div>
            <div className="p-5 space-y-4">
              <Field k="solId" label="SOL ID" labelAm="SOL ID" placeholder="e.g. 139" icon={<HiHashtag className="w-4 h-4" />} />
              <Field k="branchName" label="Branch Name (English)" labelAm="የቅርንጫፍ ስም (እንግሊዝኛ)" placeholder="e.g. DEJEN" icon={<HiBuildingOffice2 className="w-4 h-4" />} />
              <Field k="amharic" label="Branch Name (Amharic)" labelAm="የቅርንጫፍ ስም (አማርኛ)" placeholder="ለምሳሌ ደጀን" icon={<HiLanguage className="w-4 h-4" />} />
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-5 py-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center text-white">
                <HiMapPin className="w-5 h-5" />
              </div>
              <h2 className="text-white font-semibold text-sm">{isAm ? "አካባቢ" : "Location"}</h2>
            </div>
            <div className="p-5 space-y-4">
              <Field k="district" label="District / Area Office" labelAm="ወረዳ / ቦታ ቢሮ" placeholder="e.g. Debre Markos Area Office" icon={<HiBuildingOffice2 className="w-4 h-4" />} />
              <Field k="region" label="Region" labelAm="ክልል" placeholder="e.g. Amhara" icon={<HiMapPin className="w-4 h-4" />} />
              <Field k="location" label="Location (Amharic description)" labelAm="አካባቢ (አማርኛ)" placeholder="ለምሳሌ የገበያ ማዕከል ፊት ለፊት..." icon={<HiMapPin className="w-4 h-4" />} />
            </div>
          </div>

          {/* Management */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-violet-500 to-purple-500 px-5 py-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center text-white">
                <HiUser className="w-5 h-5" />
              </div>
              <h2 className="text-white font-semibold text-sm">{isAm ? "አስተዳደር" : "Management"}</h2>
            </div>
            <div className="p-5 space-y-4">
              <Field k="manager" label="Branch Manager" labelAm="የቅርንጫፍ አስተዳዳሪ" placeholder="e.g. Ato Mamaru Gizachew" icon={<HiUser className="w-4 h-4" />} />
              <Field k="managerPhone" label="Manager Phone" labelAm="የአስተዳዳሪ ስልክ" placeholder="e.g. 09-15-51-35-51" type="tel" icon={<HiDevicePhoneMobile className="w-4 h-4" />} />
              <Field k="csm" label="CSM / Officer" labelAm="CSM / ኦፊሰር" placeholder="e.g. Begizew (BM)" icon={<HiUser className="w-4 h-4" />} />
              <Field k="csmPhone" label="CSM Phone" labelAm="የCSM ስልክ" placeholder="e.g. 0921317264" type="tel" icon={<HiDevicePhoneMobile className="w-4 h-4" />} />
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center text-white">
                <HiPhone className="w-5 h-5" />
              </div>
              <h2 className="text-white font-semibold text-sm">{isAm ? "ግንኙነት" : "Contact"}</h2>
            </div>
            <div className="p-5 space-y-4">
              <Field k="phone" label="Branch Phone" labelAm="የቅርንጫፍ ስልክ" placeholder="e.g. 058-776-00-19" type="tel" icon={<HiPhone className="w-4 h-4" />} />
              <Field k="altPhone" label="Alt. Phone" labelAm="ተጨማሪ ስልክ" placeholder="e.g. 058-7-76-01-40" type="tel" icon={<HiPhone className="w-4 h-4" />} />
            </div>
          </div>

          {/* Network */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden xl:col-span-2">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center text-white">
                <HiWifi className="w-5 h-5" />
              </div>
              <h2 className="text-white font-semibold text-sm">{isAm ? "ኔትወርክ እና አገልግሎቶች" : "Network & Services"}</h2>
            </div>
            <div className="p-5 grid grid-cols-1 xl:grid-cols-3 gap-4">
              <Field k="lan" label="LAN" labelAm="LAN" placeholder="e.g. 192.168.1.0/24" icon={<HiWifi className="w-4 h-4" />} />
              <Field k="wan" label="WAN" labelAm="WAN" placeholder="e.g. 10.0.0.1" icon={<HiSignal className="w-4 h-4" />} />
              <Field k="serviceCount" label="Number of Services" labelAm="የአገልግሎቶች ብዛት" placeholder="e.g. 12" type="number" icon={<HiHashtag className="w-4 h-4" />} />
            </div>
          </div>
        </div>

        {/* Live preview */}
        {(form.solId || form.branchName) && (
          <div className="bg-gradient-to-r from-[#3d1209]/5 to-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#3d1209] to-[#5a1b0e] rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {form.branchName?.[0] || "?"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-800">{form.branchName || "—"}</div>
              <div className="text-sm text-gray-500">{form.amharic || "—"}</div>
              <div className="flex flex-wrap gap-2 mt-1.5">
                {form.solId && <span className="text-xs font-mono text-gray-400">SOL: {form.solId}</span>}
                {form.district && <span className="text-xs text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">{form.district}</span>}
                {form.region && <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">{form.region}</span>}
                {form.lan && <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">LAN: {form.lan}</span>}
                {form.wan && <span className="text-xs text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full">WAN: {form.wan}</span>}
                {form.serviceCount && <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{form.serviceCount} services</span>}
              </div>
            </div>
            <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-3 py-1 rounded-full flex-shrink-0">PREVIEW</span>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 bg-[#3d1209] hover:bg-[#5a1b0e] text-white font-semibold px-8 py-3 rounded-xl text-sm transition-colors disabled:opacity-60 shadow-lg shadow-[#3d1209]/20">
            {loading
              ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{isAm ? "በመመዝገብ ላይ..." : "Registering..."}</>
              : <><HiCheckCircle className="w-4 h-4" />{isAm ? "ቅርንጫፍ ምዝገባ" : "Register Branch"}</>
            }
          </button>
          <button type="button" onClick={onBack}
            className="px-6 py-3 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors">
            {isAm ? "ሰርዝ" : "Cancel"}
          </button>
        </div>
      </form>
    </div>
  );
}
