import React from "react";

const txnStyle = {
  CREDIT: { color: "text-green-600", bg: "bg-green-50", prefix: "+" },
  DEBIT:  { color: "text-red-600",   bg: "bg-red-50",   prefix: "-" },
};

const statusStyle = {
  SUCCESS:   "bg-green-100 text-green-700",
  COMPLETED: "bg-green-100 text-green-700",
  PENDING:   "bg-yellow-100 text-yellow-700",
  FAILED:    "bg-red-100 text-red-700",
  REVERSED:  "bg-gray-100 text-gray-600",
};

export default function TransactionTable({ transactions, loading, accountNo }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h3 className="font-semibold text-gray-800">Recent Transactions</h3>
          <p className="text-xs text-gray-400 mt-0.5">Account: <span className="font-mono">{accountNo}</span></p>
        </div>
        <span className="bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full">{transactions.length} records</span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-3 py-16 text-gray-400 text-sm">
          <div className="w-5 h-5 border-2 border-gray-200 border-t-[#3d1209] rounded-full animate-spin" />
          Loading transactions...
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm">No transactions found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["Date", "Description", "Channel", "Type", "Amount (ETB)", "Status"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => {
                const ts = txnStyle[t.TXN_TYPE] || { color: "text-gray-600", bg: "", prefix: "" };
                const ss = statusStyle[t.STATUS] || "bg-gray-100 text-gray-500";
                return (
                  <tr key={i} className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-gray-600 whitespace-nowrap">{t.TXN_DATE ? new Date(t.TXN_DATE).toLocaleDateString() : "—"}</td>
                    <td className="px-5 py-3.5 text-gray-700 max-w-xs truncate">{t.DESCRIPTION || "—"}</td>
                    <td className="px-5 py-3.5"><span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-md font-medium">{t.CHANNEL || "—"}</span></td>
                    <td className="px-5 py-3.5"><span className={`text-xs font-semibold px-2 py-1 rounded-md ${ts.bg} ${ts.color}`}>{t.TXN_TYPE}</span></td>
                    <td className={`px-5 py-3.5 font-mono font-semibold whitespace-nowrap ${ts.color}`}>{ts.prefix}{Number(t.AMOUNT).toLocaleString()}</td>
                    <td className="px-5 py-3.5"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ss}`}>{t.STATUS}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
