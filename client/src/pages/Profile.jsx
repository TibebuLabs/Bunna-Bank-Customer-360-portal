import { useLang } from "../i18n/LanguageContext";
import {
  HiUserCircle, HiEnvelope, HiPhone, HiBuildingOffice2,
  HiShieldCheck, HiCalendarDays, HiPencilSquare,
} from "react-icons/hi2";

export default function Profile({ user }) {
  const { t } = useLang();
  const initials = user?.fullName
    ? user.fullName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "U";

  const fields = [
    { icon: <HiUserCircle className="w-4 h-4" />, label: t.fullName, value: user?.fullName || "Demo Staff" },
    { icon: <HiEnvelope className="w-4 h-4" />, label: t.email, value: user?.email || "staff@bunnabank.et" },
    { icon: <HiPhone className="w-4 h-4" />, label: t.phoneLabel, value: user?.phone || "+251 91 234 5678" },
    { icon: <HiBuildingOffice2 className="w-4 h-4" />, label: t.branch, value: user?.branch || t.headOffice },
    { icon: <HiShieldCheck className="w-4 h-4" />, label: t.role, value: user?.role || t.officer },
    { icon: <HiCalendarDays className="w-4 h-4" />, label: t.memberSince, value: user?.since || "January 2024" },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Hero card */}
      <div className="relative bg-gradient-to-br from-[#3d1209] via-[#5a1b0e] to-[#7a2a15] rounded-3xl p-8 mb-6 overflow-hidden shadow-xl">
        {/* decorative circles */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-amber-500/10 rounded-full" />

        <div className="relative flex items-center gap-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-3xl shadow-2xl border-4 border-white/20">
            {initials}
          </div>
          <div>
            <h2 className="text-white text-2xl font-bold">{user?.fullName || "Demo Staff"}</h2>
            <p className="text-amber-300/80 text-sm capitalize mt-0.5">{user?.role || "Officer"} · Bunna Bank</p>
            <div className="flex items-center gap-2 mt-3">
              <span className="flex items-center gap-1.5 bg-green-500/20 text-green-300 text-xs px-3 py-1 rounded-full border border-green-500/30">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" /> {t.activeStatus}
              </span>
              <span className="bg-amber-500/20 text-amber-300 text-xs px-3 py-1 rounded-full border border-amber-500/30">
                {t.verified}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Info grid */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">{t.profileTitle}</h3>
          <button className="flex items-center gap-1.5 text-xs text-[#3d1209] hover:text-amber-700 font-medium transition-colors">
            <HiPencilSquare className="w-3.5 h-3.5" /> {t.editProfile}
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {fields.map(({ icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 px-6 py-4">
              <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
                {icon}
              </span>
              <div className="flex-1">
                <div className="text-xs text-gray-400 mb-0.5">{label}</div>
                <div className="text-sm font-medium text-gray-800">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
