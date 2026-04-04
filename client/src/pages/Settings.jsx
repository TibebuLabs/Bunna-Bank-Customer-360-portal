import { useState } from "react";
import { useLang } from "../i18n/LanguageContext";
import {
  HiShieldCheck, HiBell, HiPaintBrush, HiGlobeAlt,
  HiLockClosed, HiCheckCircle, HiEye, HiEyeSlash, HiXMark,
} from "react-icons/hi2";

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative rounded-full transition-colors duration-200 focus:outline-none ${checked ? "bg-[#3d1209]" : "bg-gray-200"}`}
      style={{ height: "22px", width: "40px" }}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${checked ? "translate-x-[18px]" : "translate-x-0"}`}
      />
    </button>
  );
}

function Section({ icon, title, color, children }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-5">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
        <span className={`w-8 h-8 rounded-xl flex items-center justify-center ${color}`}>{icon}</span>
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="divide-y divide-gray-50">{children}</div>
    </div>
  );
}

function SettingRow({ label, desc, control }) {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div>
        <div className="text-sm font-medium text-gray-800">{label}</div>
        {desc && <div className="text-xs text-gray-400 mt-0.5">{desc}</div>}
      </div>
      <div className="ml-4 flex-shrink-0">{control}</div>
    </div>
  );
}

function PasswordField({ label, value, onChange, show, onToggle }) {
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder={label}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#3d1209] pr-10 transition-colors"
      />
      <button type="button" onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
        {show ? <HiEyeSlash className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
      </button>
    </div>
  );
}

function ChangePasswordModal({ onClose, t }) {
  const [fields, setFields] = useState({ current: "", next: "", confirm: "" });
  const [show, setShow] = useState({ current: false, next: false, confirm: false });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const toggleShow = (k) => setShow((s) => ({ ...s, [k]: !s[k] }));
  const setField = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));

  const strength = (pw) => {
    if (!pw) return 0;
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };

  const strengthLabel = ["", t.weak, t.fair, t.good, t.strong];
  const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-amber-500", "bg-green-500"];
  const s = strength(fields.next);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!fields.current) return setError(t.errCurrentRequired);
    if (fields.next.length < 8) return setError(t.errTooShort);
    if (fields.next !== fields.confirm) return setError(t.errNoMatch);
    setSuccess(true);
    setTimeout(onClose, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-fade-in">
        <div className="bg-gradient-to-br from-[#3d1209] to-[#7a2a15] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center">
              <HiLockClosed className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-semibold">{t.changePasswordTitle}</div>
              <div className="text-amber-300/70 text-xs">{t.keepSecure}</div>
            </div>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
            <HiXMark className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="px-6 py-10 text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <HiCheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <p className="font-semibold text-gray-800">{t.passwordUpdated}</p>
            <p className="text-xs text-gray-400 mt-1">{t.closing}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            <PasswordField label={t.currentPassword} value={fields.current} onChange={setField("current")} show={show.current} onToggle={() => toggleShow("current")} />
            <PasswordField label={t.newPassword} value={fields.next} onChange={setField("next")} show={show.next} onToggle={() => toggleShow("next")} />

            {fields.next && (
              <div className="space-y-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= s ? strengthColor[s] : "bg-gray-100"}`} />
                  ))}
                </div>
                <p className={`text-xs font-medium ${s <= 1 ? "text-red-500" : s === 2 ? "text-amber-500" : s === 3 ? "text-amber-600" : "text-green-600"}`}>
                  {strengthLabel[s]}
                </p>
              </div>
            )}

            <PasswordField label={t.confirmPassword} value={fields.confirm} onChange={setField("confirm")} show={show.confirm} onToggle={() => toggleShow("confirm")} />

            {error && <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

            <div className="flex gap-3 pt-1">
              <button type="button" onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 font-medium py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-colors">
                {t.cancel}
              </button>
              <button type="submit" className="flex-1 bg-[#3d1209] hover:bg-[#5a1b0e] text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                {t.updatePassword}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Settings() {
  const { lang, setLang, t } = useLang();
  const [prefs, setPrefs] = useState({
    emailAlerts: true,
    smsAlerts: false,
    loginNotify: true,
    twoFactor: false,
    sessionTimeout: true,
    darkMode: false,
    compactView: false,
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const set = (key) => (val) => setPrefs((p) => ({ ...p, [key]: val }));

  const langOptions = [
    { value: "en", label: "English" },
    { value: "am", label: "አማርኛ (Amharic)" },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {showPasswordModal && <ChangePasswordModal onClose={() => setShowPasswordModal(false)} t={t} />}

      <div className="relative bg-gradient-to-br from-[#3d1209] via-[#5a1b0e] to-[#7a2a15] rounded-3xl p-8 mb-6 overflow-hidden shadow-xl">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-amber-500/10 rounded-full" />
        <div className="relative flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center shadow-lg border border-white/20">
            <HiShieldCheck className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-white text-2xl font-bold">{t.settingsTitle}</h2>
            <p className="text-amber-300/70 text-sm mt-0.5">{t.settingsSubtitle}</p>
          </div>
        </div>
      </div>

      <Section icon={<HiBell className="w-4 h-4 text-amber-700" />} title={t.notificationsSection} color="bg-amber-50">
        <SettingRow label={t.emailAlerts} desc={t.emailAlertsDesc} control={<Toggle checked={prefs.emailAlerts} onChange={set("emailAlerts")} />} />
        <SettingRow label={t.smsAlerts} desc={t.smsAlertsDesc} control={<Toggle checked={prefs.smsAlerts} onChange={set("smsAlerts")} />} />
        <SettingRow label={t.loginNotify} desc={t.loginNotifyDesc} control={<Toggle checked={prefs.loginNotify} onChange={set("loginNotify")} />} />
      </Section>

      <Section icon={<HiLockClosed className="w-4 h-4 text-[#3d1209]" />} title={t.securitySection} color="bg-red-50">
        <SettingRow label={t.twoFactor} desc={t.twoFactorDesc} control={<Toggle checked={prefs.twoFactor} onChange={set("twoFactor")} />} />
        <SettingRow label={t.sessionTimeout} desc={t.sessionTimeoutDesc} control={<Toggle checked={prefs.sessionTimeout} onChange={set("sessionTimeout")} />} />
        <SettingRow
          label={t.changePassword}
          desc={t.changePasswordDesc}
          control={
            <button
              onClick={() => setShowPasswordModal(true)}
              className="text-xs font-semibold text-[#3d1209] hover:text-white bg-amber-50 hover:bg-[#3d1209] border border-amber-200 hover:border-[#3d1209] px-3 py-1.5 rounded-lg transition-all"
            >
              {t.update}
            </button>
          }
        />
      </Section>

      <Section icon={<HiPaintBrush className="w-4 h-4 text-amber-700" />} title={t.appearanceSection} color="bg-amber-50">
        <SettingRow label={t.darkMode} desc={t.darkModeDesc} control={<Toggle checked={prefs.darkMode} onChange={set("darkMode")} />} />
        <SettingRow label={t.compactView} desc={t.compactViewDesc} control={<Toggle checked={prefs.compactView} onChange={set("compactView")} />} />
      </Section>

      <Section icon={<HiGlobeAlt className="w-4 h-4 text-amber-700" />} title={t.languageSection} color="bg-amber-50">
        <SettingRow
          label={t.displayLanguage}
          desc={t.displayLanguageDesc}
          control={
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 focus:outline-none focus:border-[#3d1209] transition-colors"
            >
              {langOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          }
        />
      </Section>

      <div className="flex justify-end pb-8">
        <button className="flex items-center gap-2 bg-[#3d1209] hover:bg-[#5a1b0e] text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors shadow-md">
          <HiCheckCircle className="w-4 h-4" /> {t.saveChanges}
        </button>
      </div>
    </div>
  );
}
