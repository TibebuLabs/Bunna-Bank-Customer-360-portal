import { useState, useRef, useEffect } from "react";
import { useLang } from "../i18n/LanguageContext";
import {
  HiUserCircle,
  HiCog6Tooth,
  HiArrowRightOnRectangle,
  HiChevronDown,
  HiBell,
} from "react-icons/hi2";

export default function UserMenu({ user, onLogout, onNavigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { t } = useLang();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials = user?.fullName
    ? user.fullName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "U";

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 bg-white border border-gray-200 hover:border-amber-300 hover:shadow-md shadow-sm rounded-2xl px-3 py-2 transition-all group"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#3d1209] to-amber-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-inner">
          {initials}
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-xs font-semibold text-gray-800 leading-tight">{user?.fullName || "User"}</div>
          <div className="text-[10px] text-gray-400 capitalize leading-tight">{user?.role || "staff"}</div>
        </div>
        <HiChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#3d1209] to-[#7a2a15] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {initials}
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{user?.fullName || "User"}</div>
                <div className="text-amber-300/80 text-xs capitalize">{user?.role || "staff"}</div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span className="text-green-300 text-[10px]">{t.online}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div className="py-2">
            <MenuItem
              icon={<HiUserCircle className="w-4 h-4" />}
              label={t.myProfile}
              desc={t.viewAccount}
              color="text-[#3d1209] bg-amber-50"
              onClick={() => { onNavigate("profile"); setOpen(false); }}
            />
            <MenuItem
              icon={<HiCog6Tooth className="w-4 h-4" />}
              label={t.settings}
              desc={t.prefsAndSecurity}
              color="text-[#3d1209] bg-amber-50"
              onClick={() => { onNavigate("settings"); setOpen(false); }}
            />
            <MenuItem
              icon={<HiBell className="w-4 h-4" />}
              label={t.notifications}
              desc={t.alertsAndUpdates}
              color="text-amber-700 bg-amber-50"
              onClick={() => { onNavigate("notifications"); setOpen(false); }}
            />
          </div>

          <div className="border-t border-gray-100 py-2">
            <button
              onClick={() => { setOpen(false); onLogout(); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
              <span className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                <HiArrowRightOnRectangle className="w-4 h-4" />
              </span>
              <div className="text-left">
                <div className="font-medium text-sm">{t.signOut}</div>
                <div className="text-[10px] text-red-400">{t.endSession}</div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItem({ icon, label, desc, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
    >
      <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
        {icon}
      </span>
      <div className="text-left">
        <div className="text-sm font-medium text-gray-800">{label}</div>
        <div className="text-[10px] text-gray-400">{desc}</div>
      </div>
    </button>
  );
}
