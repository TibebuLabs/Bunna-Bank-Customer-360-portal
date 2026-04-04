import { useState } from "react";
import { MOCK_CUSTOMERS } from "../data/mockData";
import { BUNNA_BRANCHES } from "../data/branchData";
import { HiBuildingOffice2, HiChartBar, HiUsers } from "react-icons/hi2";

// ── helpers ──────────────────────────────────────────────────────────────────
const count = (list, status) => list.filter(c => c.ACCT_STATUS === status).length;

function metrics(list) {
  return {
    total:   list.length,
    active:  count(list, "A"),
    inactive: list.filter(c => c.ACCT_STATUS !== "A").length,
    lien:    list.filter(c => (c.LIEN_AMT || 0) > 0).length,
    frozen:  count(list, "F"),
    dormant: count(list, "D"),
    closed:  count(list, "C"),
  };
}

// Get unique districts from branch data
const DISTRICTS = [...new Set(BUNNA_BRANCHES.map(b => b.district))].sort();

// Map SOL_ID → branch info
const SOL_MAP = {};
BUNNA_BRANCHES.forEach(b => { SOL_MAP[String(b.solId)] = b; });

// ── sub-components ────────────────────────────────────────────────────────────
function MetricGrid({ m, compact }) {
  const items = [
    { label: "Total Customers",  value: m.total,    bg: "bg-gray-50",    text: "text-gray-800"  },
    { label: "Active",           value: m.active,   bg: "bg-green-50",   text: "text-green-700" },
    { label: "Inactive",         value: m.inactive, bg: "bg-gray-50",    text: "text-gray-600"  },
    { label: "Lien",             value: m.lien,     bg: "bg-orange-50",  text: "text-orange-700"},
    { label: "Frozen",           value: m.frozen,   bg: "bg-red-50",     text: "text-red-700"   },
    { label: "Dormant",          value: m.dormant,  bg: "bg-yellow-50",  text: "text-yellow-700"},
  ];
  return (
    <div className={`grid gap-2 ${compact ? "grid-cols-3 xl:grid-cols-6" : "grid-cols-2 xl:grid-cols-6"}`}>
      {items.map(it => (
        <div key={it.label} className={`${it.bg} rounded-xl px-3 py-3 text-center`}>
          <div className={`text-xl font-bold font-mono ${it.text}`}>{it.value}</div>
          <div className="text-xs text-gray-500 mt-0.5">{it.label}</div>
        </div>
      ))}
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────
export default function Reports() {
  const [activeTab, setActiveTab] = useState("bank");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districtSearch, setDistrictSearch] = useState("");
  const [branchSearch, setBranchSearch] = useState("");

  const bankMetrics = metrics(MOCK_CUSTOMERS);

  // District-level: group customers by their branch's district
  const districtData = {};
  MOCK_CUSTOMERS.forEach(c => {
    const branch = SOL_MAP[String(c.SOL_ID)];
    const dist = branch?.district || "Unknown";
    if (!districtData[dist]) districtData[dist] = [];
    districtData[dist].push(c);
  });

  // Branch-level: group customers by SOL_ID
  const branchData = {};
  MOCK_CUSTOMERS.forEach(c => {
    const key = String(c.SOL_ID);
    if (!branchData[key]) branchData[key] = [];
    branchData[key].push(c);
  });

  const tabs = [
    { id: "bank",     label: "Bank Level",     icon: <HiChartBar className="w-4 h-4" /> },
    { id: "district", label: "District Level", icon: <HiBuildingOffice2 className="w-4 h-4" /> },
    { id: "branch",   label: "Branch Level",   icon: <HiUsers className="w-4 h-4" /> },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
          <p className="text-gray-500 text-sm mt-1">Live account status summary — demo data</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-full text-xs font-medium">
          <span className="w-2 h-2 bg-amber-500 rounded-full" />
          Demo Mode
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === t.id
                ? "bg-white text-[#3d1209] shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {/* ── BANK LEVEL ── */}
      {activeTab === "bank" && (
        <div className="space-y-5">
          {/* Summary counts */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <HiBuildingOffice2 className="w-6 h-6 text-gray-500" />
              </div>
              <div>
                <div className="text-3xl font-bold font-mono text-gray-800">{DISTRICTS.length}</div>
                <div className="text-sm text-gray-500 mt-0.5">Total Districts / Area Offices</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <HiUsers className="w-6 h-6 text-gray-500" />
              </div>
              <div>
                <div className="text-3xl font-bold font-mono text-gray-800">{BUNNA_BRANCHES.length}</div>
                <div className="text-sm text-gray-500 mt-0.5">Total Branches</div>
              </div>
            </div>
          </div>

          {/* Customer metrics */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-[#3d1209] to-[#5a1b0e] rounded-xl flex items-center justify-center">
                <HiChartBar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-800">Bunna Bank — All Branches</h2>
                <p className="text-xs text-gray-400">Consolidated account status across {BUNNA_BRANCHES.length} branches in {DISTRICTS.length} districts</p>
              </div>
            </div>
            <MetricGrid m={bankMetrics} />
          </div>

          {/* Status breakdown bar */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-gray-700 mb-4 text-sm uppercase tracking-wide">Account Status Breakdown</h3>
            {[
              { label: "Active",  value: bankMetrics.active,  color: "bg-green-500"  },
              { label: "Frozen",  value: bankMetrics.frozen,  color: "bg-red-400"    },
              { label: "Dormant", value: bankMetrics.dormant, color: "bg-yellow-400" },
              { label: "Closed",  value: bankMetrics.closed,  color: "bg-gray-300"   },
            ].map(row => {
              const pct = bankMetrics.total ? Math.round((row.value / bankMetrics.total) * 100) : 0;
              return (
                <div key={row.label} className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 font-medium">{row.label}</span>
                    <span className="text-gray-400 font-mono">{row.value} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className={`h-2 rounded-full ${row.color}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* District summary table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">Districts Summary</h3>
              <p className="text-xs text-gray-400 mt-0.5">{DISTRICTS.length} districts / area offices</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {["District / Area Office", "Branches", "Total", "Active", "Frozen", "Dormant", "Lien"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DISTRICTS.map(dist => {
                    const customers = districtData[dist] || [];
                    const m = metrics(customers);
                    const branchCount = BUNNA_BRANCHES.filter(b => b.district === dist).length;
                    return (
                      <tr key={dist} className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-700">{dist}</td>
                        <td className="px-4 py-3 font-mono text-gray-500">{branchCount}</td>
                        <td className="px-4 py-3 font-mono font-semibold text-gray-800">{m.total}</td>
                        <td className="px-4 py-3 font-mono text-green-700">{m.active}</td>
                        <td className="px-4 py-3 font-mono text-red-600">{m.frozen}</td>
                        <td className="px-4 py-3 font-mono text-yellow-600">{m.dormant}</td>
                        <td className="px-4 py-3 font-mono text-gray-500">{m.lien}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 border-t-2 border-gray-200">
                    <td className="px-4 py-3 font-bold text-gray-800">TOTAL</td>
                    <td className="px-4 py-3 font-mono font-bold text-gray-800">{BUNNA_BRANCHES.length}</td>
                    <td className="px-4 py-3 font-mono font-bold text-gray-800">{bankMetrics.total}</td>
                    <td className="px-4 py-3 font-mono font-bold text-green-700">{bankMetrics.active}</td>
                    <td className="px-4 py-3 font-mono font-bold text-red-600">{bankMetrics.frozen}</td>
                    <td className="px-4 py-3 font-mono font-bold text-yellow-600">{bankMetrics.dormant}</td>
                    <td className="px-4 py-3 font-mono font-bold text-gray-500">{bankMetrics.lien}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── DISTRICT LEVEL ── */}
      {activeTab === "district" && (
        <div className="space-y-4">
          {/* Search */}
          <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl px-4 gap-3 focus-within:border-[#3d1209] transition-all">
            <HiUsers className="text-gray-400 w-4 h-4 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search district name (e.g. Dessie, Bahir Dar...)"
              value={districtSearch}
              onChange={e => setDistrictSearch(e.target.value)}
              className="flex-1 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            />
            {districtSearch && (
              <button onClick={() => setDistrictSearch("")} className="text-gray-300 hover:text-gray-500 text-lg leading-none">×</button>
            )}
          </div>

          {/* Results */}
          {(() => {
            const filtered = DISTRICTS.filter(d =>
              d.toLowerCase().includes(districtSearch.toLowerCase())
            );
            if (filtered.length === 0) return (
              <div className="text-center py-16 text-gray-400 text-sm">
                No district found for "<span className="text-gray-600">{districtSearch}</span>"
              </div>
            );
            return filtered.map(dist => {
              const customers = districtData[dist] || [];
              const m = metrics(customers);
              return (
                <div key={dist} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
                        <HiBuildingOffice2 className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-sm">{dist}</div>
                        <div className="text-xs text-gray-400">{m.total} customers in system</div>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      m.active > 0 ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-400"
                    }`}>{m.active} active</span>
                  </div>
                  <MetricGrid m={m} compact />
                </div>
              );
            });
          })()}
        </div>
      )}

      {/* ── BRANCH LEVEL ── */}
      {activeTab === "branch" && (
        <div className="space-y-4">
          {/* Search */}
          <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl px-4 gap-3 focus-within:border-[#3d1209] transition-all">
            <HiUsers className="text-gray-400 w-4 h-4 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search branch name, SOL ID or district (e.g. Dejen, 139...)"
              value={branchSearch}
              onChange={e => setBranchSearch(e.target.value)}
              className="flex-1 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            />
            {branchSearch && (
              <button onClick={() => setBranchSearch("")} className="text-gray-300 hover:text-gray-500 text-lg leading-none">×</button>
            )}
          </div>

          {/* Results */}
          {(() => {
            const q = branchSearch.toLowerCase();
            const filtered = BUNNA_BRANCHES.filter(b =>
              !q ||
              b.code.toLowerCase().includes(q) ||
              b.amharic?.includes(branchSearch) ||
              String(b.solId).includes(q) ||
              b.district.toLowerCase().includes(q) ||
              b.manager?.toLowerCase().includes(q)
            );

            if (!branchSearch) return (
              <div className="text-center py-16 text-gray-400">
                <HiBuildingOffice2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm font-medium text-gray-500">Search for a branch</p>
                <p className="text-xs mt-1">Enter branch name, SOL ID, or district</p>
              </div>
            );

            if (filtered.length === 0) return (
              <div className="text-center py-16 text-gray-400 text-sm">
                No branch found for "<span className="text-gray-600">{branchSearch}</span>"
              </div>
            );

            return filtered.map(branch => {
              const customers = branchData[String(branch.solId)] || [];
              const m = metrics(customers);
              return (
                <div key={branch.solId} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-[#3d1209] to-[#5a1b0e] rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                        {branch.code[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-sm">{branch.code}
                          {branch.amharic && <span className="text-gray-400 font-normal ml-2">{branch.amharic}</span>}
                        </div>
                        <div className="text-xs text-gray-400 font-mono">SOL {branch.solId} · {branch.district}</div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 font-mono">{m.total} in system</span>
                  </div>
                  <MetricGrid m={m} compact />
                </div>
              );
            });
          })()}
        </div>
      )}
    </div>
  );
}
