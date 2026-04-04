import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiMagnifyingGlass, HiBuildingLibrary, HiArrowRightOnRectangle,
  HiChartBar, HiCodeBracket, HiUserCircle
} from "react-icons/hi2";
import CustomerCard from "../components/CustomerCard";
import TransactionTable from "../components/TransactionTable";
import Reports from "./Reports";
import Branches from "./Branches";
import { MOCK_CUSTOMERS, MOCK_TRANSACTIONS } from "../data/mockData";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || '{"fullName":"Demo Staff","role":"officer"}');
  const inputRef = useRef(null);

  const [activePage, setActivePage] = useState("search");
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Live suggestions while typing
  const suggestions = (query || "").trim().length > 0
    ? MOCK_CUSTOMERS.filter(c =>
        c.FORACID?.includes((query || "").trim()) ||
        c.PHONE_NO?.includes((query || "").trim()) ||
        c.ACCT_NAME?.toLowerCase().includes((query || "").trim().toLowerCase()) ||
        c.CUST_ID?.toLowerCase().includes((query || "").trim().toLowerCase())
      )
    : [];

  const runSearch = (input) => {
    const raw = (input || "").trim();
    if (!raw) return;
    setShowDropdown(false);
    setLoading(true);
    setSearched(true);
    setCustomers([]);
    setSelectedCustomer(null);
    setTransactions([]);

    setTimeout(() => {
      const lower = raw.toLowerCase();
      const results = MOCK_CUSTOMERS.filter(c =>
        c.FORACID === raw ||                          // exact account number
        c.PHONE_NO === raw ||                         // exact phone number
        c.ACCT_NAME?.toLowerCase().includes(lower)   // partial name match
      );
      setCustomers(results);
      if (results.length === 1) {
        setSelectedCustomer(results[0]);
        setTransactions(MOCK_TRANSACTIONS[results[0].CUST_ID] || []);
      }
      setLoading(false);
    }, 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(query || "").trim()) return;
    runSearch(query);
  };

  const handleSuggestionClick = (customer) => {
    setQuery(customer.FORACID);
    runSearch(customer.FORACID);
    inputRef.current?.blur();
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowDropdown(true);
    // clear old results when user edits
    if (searched) {
      setSearched(false);
      setCustomers([]);
      setSelectedCustomer(null);
      setTransactions([]);
    }
  };

  const loadTransactions = (customer) => {
    setSelectedCustomer(customer);
    setTransactions(MOCK_TRANSACTIONS[customer.CUST_ID] || []);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-gradient-to-b from-[#3d1209] to-[#2d0d07] flex flex-col fixed top-0 left-0 bottom-0 z-10">
        <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <HiBuildingLibrary className="text-white w-5 h-5" />
          </div>
          <div>
            <div className="text-white font-bold text-base leading-tight">Bunna Bank</div>
            <div className="text-amber-300/70 text-xs">Customer 360</div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          <NavItem icon={<HiMagnifyingGlass className="w-4 h-4" />} label="Customer Search"
            active={activePage === "search"} onClick={() => setActivePage("search")} />
          <NavItem icon={<HiChartBar className="w-4 h-4" />} label="Reports"
            active={activePage === "reports"} onClick={() => setActivePage("reports")} />
          <NavItem icon={<HiCodeBracket className="w-4 h-4" />} label="Branches"
            active={activePage === "branches"} onClick={() => setActivePage("branches")} />
        </nav>

        <div className="px-3 pb-5">
          <div className="flex items-center gap-3 bg-white/10 rounded-xl px-3 py-3">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
              {user.fullName?.[0] || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-semibold truncate">{user.fullName}</div>
              <div className="text-amber-300/70 text-xs capitalize">{user.role}</div>
            </div>
            <button onClick={handleLogout} title="Logout" className="text-white/40 hover:text-red-400 transition-colors p-1">
              <HiArrowRightOnRectangle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 flex-1 p-8">

        {activePage === "search" && (
          <>
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Customer Lookup</h1>
                <p className="text-gray-500 text-sm mt-1">Search by Account Number, Phone Number or Name</p>
              </div>
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-full text-xs font-medium">
                <span className="w-2 h-2 bg-amber-500 rounded-full" />
                Demo Mode
              </div>
            </div>

            {/* Search with live dropdown */}
            <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
              <div className="flex-1 relative">
                <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl px-4 gap-3 focus-within:border-[#3d1209] transition-all">
                  <HiMagnifyingGlass className="text-gray-400 w-4 h-4 flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Enter Account No., Phone No. or Name"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => query.trim() && setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                    className="flex-1 py-3.5 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
                  />
                  {query && (
                    <button type="button" onClick={() => {
                      setQuery(""); setShowDropdown(false);
                      setSearched(false); setCustomers([]);
                      setSelectedCustomer(null); setTransactions([]);
                    }} className="text-gray-300 hover:text-gray-500 text-lg leading-none">×</button>
                  )}
                </div>

                {/* Live suggestions dropdown */}
                {showDropdown && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
                    {suggestions.map((c) => (
                      <button
                        key={c.CUSTOMER_ID}
                        type="button"
                        onMouseDown={() => handleSuggestionClick(c)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-0"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3d1209] to-[#5a1b0e] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {c.ACCT_NAME[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-800">{c.ACCT_NAME}</div>
                          <div className="text-xs text-gray-400 font-mono">{c.FORACID} · {c.PHONE_NO}</div>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          c.ACCT_STATUS === "A" ? "bg-green-100 text-green-700" :
                          c.ACCT_STATUS === "F" ? "bg-red-100 text-red-700" :
                          c.ACCT_STATUS === "D" ? "bg-yellow-100 text-yellow-700" :
                          "bg-gray-100 text-gray-500"
                        }`}>{c.ACCT_STATUS === "A" ? "ACTIVE" : c.ACCT_STATUS === "F" ? "FROZEN" : c.ACCT_STATUS === "D" ? "DORMANT" : "CLOSED"}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button type="submit" disabled={loading}
                className="bg-[#3d1209] hover:bg-[#5a1b0e] text-white font-semibold px-7 rounded-xl text-sm transition-colors disabled:opacity-60 flex items-center gap-2">
                {loading
                  ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Searching...</>
                  : "Search"}
              </button>
            </form>

            {/* Empty state before any search */}
            {!searched && !loading && (
              <div className="text-center py-20 text-gray-400">
                <HiMagnifyingGlass className="w-14 h-14 mx-auto mb-4 text-gray-300" />
                <p className="text-base font-medium text-gray-500">Search for a customer</p>
                <p className="text-sm mt-1">Enter an account number, phone number, or name above</p>
              </div>
            )}

            {/* No results */}
            {searched && !loading && customers.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <HiUserCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-base">No customer found for "<span className="text-gray-600 font-medium">{query}</span>"</p>
                <p className="text-sm mt-2">Try a different account number, phone, or name</p>
              </div>
            )}

            {/* Results — only show after a search was submitted */}
            {searched && customers.length > 0 && (
              <div className="mb-8">
                {customers.length > 1 && (
                  <p className="text-sm text-gray-500 mb-4">{customers.length} accounts found — click a card to view transactions</p>
                )}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                  {customers.map((c, i) => (
                    <CustomerCard key={i} customer={c}
                      isSelected={selectedCustomer?.FORACID === c.FORACID}
                      onClick={() => loadTransactions(c)} />
                  ))}
                </div>
              </div>
            )}

            {selectedCustomer && (
              <TransactionTable transactions={transactions} loading={false} accountNo={selectedCustomer.FORACID} />
            )}
          </>
        )}

        {activePage === "reports"  && <Reports />}
        {activePage === "branches" && <Branches />}
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm cursor-pointer transition-all text-left ${
        active ? "bg-white/15 text-white font-medium" : "text-white/50 hover:bg-white/10 hover:text-white/80"
      }`}>
      <span className={active ? "text-amber-400" : ""}>{icon}</span>
      {label}
    </button>
  );
}
