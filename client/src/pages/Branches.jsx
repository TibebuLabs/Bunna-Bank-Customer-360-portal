import { useState } from "react";
import { useLang } from "../i18n/LanguageContext";
import { HiMagnifyingGlass, HiMapPin, HiPhone, HiUser, HiBuildingOffice2, HiXMark } from "react-icons/hi2";
import { BUNNA_BRANCHES } from "../data/branchData";

const REGIONS = ["All", ...Array.from(new Set(BUNNA_BRANCHES.map(b => b.region))).sort()];
const DISTRICTS = ["All", ...Array.from(new Set(BUNNA_BRANCHES.map(b => b.district))).sort()];

export default function Branches() {
  const { t } = useLang();
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const [districtFilter, setDistrictFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = BUNNA_BRANCHES.filter(b => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      b.code.toLowerCase().includes(q) ||
      b.amharic.includes(q) ||
      b.manager.toLowerCase().includes(q) ||
      b.district.toLowerCase().includes(q) ||
      b.location.includes(q) ||
      b.phone.includes(q) ||
      String(b.solId).includes(q);
    const matchRegion = regionFilter === "All" || b.region === regionFilter;
    const matchDistrict = districtFilter === "All" || b.district === districtFilter;
    return matchSearch && matchRegion && matchDistrict;
  });

  if (selected) {
    return <BranchDetail branch={selected} onBack={() => setSelected(null)} t={t} />;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t.branchesTitle}</h1>
          <p className="text-gray-500 text-sm mt-1">{BUNNA_BRANCHES.length} {t.branchesSubtitle} {filtered.length}</p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col xl:flex-row gap-3 mb-6">
        <div className="flex-1 flex items-center bg-white border-2 border-gray-200 rounded-xl px-4 gap-3 focus-within:border-[#3d1209] transition-all">
          <HiMagnifyingGlass className="text-gray-400 w-4 h-4 flex-shrink-0" />
          <input
            type="text"
            placeholder={t.branchSearchPlaceholder2}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-gray-300 hover:text-gray-500">
              <HiXMark className="w-4 h-4" />
            </button>
          )}
        </div>
        <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)}
          className="bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#3d1209] min-w-[160px]">
          {REGIONS.map(r => <option key={r}>{r}</option>)}
        </select>
        <select value={districtFilter} onChange={e => setDistrictFilter(e.target.value)}
          className="bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#3d1209] min-w-[200px]">
          {DISTRICTS.map(d => <option key={d}>{d}</option>)}
        </select>
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <HiBuildingOffice2 className="w-14 h-14 mx-auto mb-4 text-gray-300" />
          <p className="text-base">{t.noBranchFoundFor} "<span className="text-gray-600 font-medium">{search}</span>"</p>
        </div>
      )}

      {/* Branch Table */}
      {filtered.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {[t.solId, t.branchName, t.amharic, t.manager, t.phone, t.district, t.region, ""].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((b, i) => (
                  <tr key={i} onClick={() => setSelected(b)}
                    className="border-t border-gray-50 hover:bg-[#fdf8f5] cursor-pointer transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{b.solId}</td>
                    <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">{b.code}</td>
                    <td className="px-4 py-3 text-gray-600">{b.amharic}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{b.manager}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500 whitespace-nowrap">{b.phone || "—"}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{b.district}</td>
                    <td className="px-4 py-3">
                      <span className="bg-amber-50 text-amber-700 text-xs font-medium px-2 py-0.5 rounded-full">{b.region}</span>
                    </td>
                    <td className="px-4 py-3 text-[#3d1209] text-xs font-semibold whitespace-nowrap">{t.view}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function BranchDetail({ branch: b, onBack, t }) {
  return (
    <div>
      <button onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#3d1209] transition-colors font-medium mb-6">
        {t.backToBranches}
      </button>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
        <div className="flex items-start justify-between mb-5 pb-5 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[#3d1209] to-[#5a1b0e] rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {b.code[0]}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">{b.code}</h1>
              <p className="text-base text-gray-500 mt-0.5">{b.amharic}</p>
              <p className="text-xs font-mono text-gray-400 mt-0.5">SOL ID: {b.solId}</p>
            </div>
          </div>
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">ACTIVE</span>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
          <InfoItem label={t.branchManager} value={b.manager} icon={<HiUser className="w-4 h-4 text-[#3d1209]" />} />
          <InfoItem label={t.managerPhone} value={b.managerPhone} icon={<HiPhone className="w-4 h-4 text-[#3d1209]" />} />
          <InfoItem label={t.branchPhone} value={b.phone || "—"} icon={<HiPhone className="w-4 h-4 text-[#3d1209]" />} />
          {b.altPhone && <InfoItem label={t.altPhone} value={b.altPhone} icon={<HiPhone className="w-4 h-4 text-gray-400" />} />}
          {b.csm && <InfoItem label={t.csmOfficer} value={`${b.csm} ${b.csmPhone ? `· ${b.csmPhone}` : ""}`} icon={<HiUser className="w-4 h-4 text-gray-400" />} />}
          <InfoItem label={t.district} value={b.district} icon={<HiBuildingOffice2 className="w-4 h-4 text-gray-400" />} />
          <InfoItem label={t.region} value={b.region} icon={<HiMapPin className="w-4 h-4 text-gray-400" />} />
          <InfoItem label="Location" value={b.location} icon={<HiMapPin className="w-4 h-4 text-[#3d1209]" />} />
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value, icon }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex-shrink-0">{icon}</div>
      <div>
        <div className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">{label}</div>
        <div className="text-sm font-medium text-gray-700">{value}</div>
      </div>
    </div>
  );
}
