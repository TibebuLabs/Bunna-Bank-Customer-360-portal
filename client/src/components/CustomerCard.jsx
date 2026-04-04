import { HiBuildingOffice2, HiCreditCard, HiUser, HiPhone, HiEnvelope, HiIdentification, HiCalendar, HiLanguage } from "react-icons/hi2";
import { useLang } from "../i18n/LanguageContext";

// Map Oracle ACCT_STATUS codes to labels
const STATUS_MAP = {
  A: { label: "ACTIVE",  bg: "bg-green-100",  text: "text-green-700",  dot: "bg-green-500"  },
  D: { label: "DORMANT", bg: "bg-yellow-100", text: "text-yellow-700", dot: "bg-yellow-500" },
  F: { label: "FROZEN",  bg: "bg-red-100",    text: "text-red-700",    dot: "bg-red-500"    },
  C: { label: "CLOSED",  bg: "bg-gray-100",   text: "text-gray-500",   dot: "bg-gray-400"   },
};

// Map Oracle SCHM_TYPE codes to readable names
const SCHEME_MAP = {
  SBA: "Savings",
  CAA: "Current",
  TDA: "Fixed Deposit",
  ODA: "Overdraft",
  LAA: "Loan",
};

const LANG_MAP = { AMH: "Amharic", ENG: "English", ORM: "Oromiffa", TIG: "Tigrinya" };
const CONST_MAP = { SINGL: "Individual", JNTLY: "Joint", CORP: "Corporate", TRUST: "Trust" };

export default function CustomerCard({ customer: c, isSelected, onClick }) {
  const { t } = useLang();
  const status = STATUS_MAP[c.ACCT_STATUS] || STATUS_MAP.C;
  const schemeName = SCHEME_MAP[c.SCHM_TYPE] || c.SCHM_TYPE;

  const statusLabel = {
    A: t.active, F: t.frozen, D: t.dormant, C: t.closed,
  };

  const fmt = (n) => Number(n || 0).toLocaleString("en-ET", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div onClick={onClick}
      className={`bg-white rounded-2xl border cursor-pointer transition-all hover:shadow-md overflow-hidden ${
        isSelected ? "border-gray-200 shadow-md" : "border-gray-100"
      }`}>

      {/* Header strip */}
      <div className="bg-gradient-to-r from-[#3d1209] to-[#5a1b0e] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            {c.ACCT_NAME?.[0] || "?"}
          </div>
          <div>
            <div className="text-white font-bold text-base leading-tight">{c.ACCT_NAME}</div>
            <div className="text-amber-300/80 text-xs mt-0.5 font-mono">{c.CUST_ID}</div>
          </div>
        </div>
        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${status.bg} ${status.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {statusLabel[c.ACCT_STATUS] || status.label}
        </span>
      </div>

      <div className="p-5">
        <div className="bg-[#fdf8f5] border border-amber-100 rounded-xl px-4 py-3 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HiCreditCard className="w-4 h-4 text-[#3d1209]" />
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{t.accountNo}</span>
          </div>
          <span className="font-mono font-bold text-[#3d1209] text-base tracking-wider">{c.FORACID}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <BalanceBox label={t.clearBalance} value={fmt(c.CLRBAL)} highlight />
          <BalanceBox label={t.lienAmount}   value={fmt(c.LIEN_AMT)} />
          <BalanceBox label={t.unclearBal}   value={fmt(c.UNCLRBAL)} />
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-4">
          <InfoRow icon={<HiBuildingOffice2 className="w-3.5 h-3.5" />} label={t.branchSol}    value={c.SOL_ID} mono />
          <InfoRow icon={<HiCreditCard className="w-3.5 h-3.5" />}      label={t.product}      value={`${schemeName} (${c.SCHM_CODE})`} />
          <InfoRow icon={<HiCalendar className="w-3.5 h-3.5" />}        label={t.openDate}     value={c.ACCT_OPN_DATE} />
          <InfoRow icon={<HiCalendar className="w-3.5 h-3.5" />}        label={t.lastTxn}      value={c.LAST_TRAN_DATE || "—"} />
          <InfoRow icon={<HiUser className="w-3.5 h-3.5" />}            label={t.shortName}    value={c.SHORT_NAME} mono />
          <InfoRow icon={<HiLanguage className="w-3.5 h-3.5" />}        label={t.language}     value={LANG_MAP[c.LANGUAGE] || c.LANGUAGE} />
          <InfoRow icon={<HiIdentification className="w-3.5 h-3.5" />}  label={t.constitution} value={CONST_MAP[c.CUST_CONST] || c.CUST_CONST} />
          <InfoRow icon={<HiCreditCard className="w-3.5 h-3.5" />}      label={t.currency}     value={c.CURR_CODE} />
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4 pt-3 border-t border-gray-100">
          <TotalBox label={t.totalDeposits}    value={fmt(c.TOT_DEPOSIT_AMT)} />
          <TotalBox label={t.totalWithdrawals} value={fmt(c.TOT_WITHDRWL_AMT)} />
        </div>

        {c.SANCT_LIM > 0 && (
          <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 mb-4">
            <span className="text-xs text-gray-500 font-medium">{t.sanctionedLimit}</span>
            <span className="font-mono font-semibold text-gray-700 text-sm">ETB {fmt(c.SANCT_LIM)}</span>
          </div>
        )}

        {/* Contact info */}
        <div className="pt-3 border-t border-gray-100 space-y-1.5">
          {c.PHONE_NO && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <HiPhone className="w-3.5 h-3.5 text-gray-400" />
              <span className="font-mono">{c.PHONE_NO}</span>
            </div>
          )}
          {c.EMAIL && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <HiEnvelope className="w-3.5 h-3.5 text-gray-400" />
              <span className="truncate">{c.EMAIL}</span>
            </div>
          )}
          {c.NATIONAL_ID && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <HiIdentification className="w-3.5 h-3.5 text-gray-400" />
              <span className="font-mono">{c.NATIONAL_ID}</span>
            </div>
          )}
        </div>

        {/* Signature */}
        {c.SIGNATURE_IMAGE && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">{t.signature}</p>
            <img src={c.SIGNATURE_IMAGE} alt="Signature"
              className="w-full max-h-14 object-contain object-left bg-white rounded-lg border border-gray-100 p-1" />
          </div>
        )}

        {isSelected && (
          <div className="mt-3 text-center text-xs text-[#3d1209] font-semibold">{t.viewingTransactions}</div>
        )}
      </div>
    </div>
  );
}

function BalanceBox({ label, value, highlight }) {
  return (
    <div className={`rounded-xl px-3 py-2.5 text-center ${highlight ? "bg-[#3d1209]" : "bg-gray-50 border border-gray-100"}`}>
      <div className={`text-xs mb-1 ${highlight ? "text-amber-300/80" : "text-gray-400"}`}>{label}</div>
      <div className={`font-mono font-bold text-sm ${highlight ? "text-white" : "text-gray-700"}`}>{value}</div>
    </div>
  );
}

function TotalBox({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl px-3 py-2.5">
      <div className="text-xs text-gray-400 mb-0.5">{label}</div>
      <div className="font-mono font-semibold text-sm text-gray-700">{value}</div>
    </div>
  );
}

function InfoRow({ icon, label, value, mono }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-gray-400 mt-0.5 flex-shrink-0">{icon}</span>
      <div className="min-w-0">
        <div className="text-xs text-gray-400 uppercase tracking-wide leading-none mb-0.5">{label}</div>
        <div className={`text-sm font-medium text-gray-700 truncate ${mono ? "font-mono" : ""}`}>{value || "—"}</div>
      </div>
    </div>
  );
}
