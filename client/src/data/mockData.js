// Fields mapped from Oracle TBAadm.gam table
// FORACID = Account No, ACCT_NAME = Customer Name, CUST_ID = Customer ID
// ACCT_OPN_DATE = Open Date, ACCT_CLS_DATE = Close Date, SCHM_CODE = Scheme/Product
// CLRBAL = Clear Balance, UNCLRBAL = Unclear Balance, LIEN_AMT = Lien Amount
// SANCT_LIM = Sanctioned Limit, LIMIT_EXPIRY_DATE = Limit Expiry
// SOL_ID = Branch SOL ID, CUST_CONST = Customer Constitution
// ACCT_STATUS = Account Status (A=Active, D=Dormant, C=Closed, F=Frozen)
// CURR_CODE = Currency, LANGUAGE = Language preference

export const MOCK_CUSTOMERS = [
  {
    // Core identifiers
    FORACID:        "1019501030289",   // Account Number
    ACID:           "AB8711592",       // Internal Account ID
    CUST_ID:        "RC4410155",       // Customer ID
    ACCT_NAME:      "TIBEBU TEFERI FENTIE",
    SHORT_NAME:     "TTF",

    // Account details
    SCHM_TYPE:      "SBA",            // Scheme Type (SBA=Savings, CAA=Current, TDA=Fixed)
    SCHM_CODE:      "SL01",           // Product Code
    CURR_CODE:      "ETB",            // Currency
    SOL_ID:         "195",            // Branch SOL ID
    ENTITY_CRE_FLG: "Y",

    // Status
    ACCT_STATUS:    "A",              // A=Active, D=Dormant, C=Closed, F=Frozen
    ACCT_OPN_DATE:  "12/1/2025",      // Account Open Date
    ACCT_CLS_DATE:  null,
    LIMIT_EXPIRY_DATE: "4/1/2026",
    LAST_TRAN_DATE: "4/3/2026",

    // Balances
    CLRBAL:         1368.25,          // Clear Balance
    UNCLRBAL:       0,                // Unclear Balance
    LIEN_AMT:       0,                // Lien Amount
    SANCT_LIM:      50000,            // Sanctioned Limit
    TOT_WITHDRWL_AMT: 65513.26,       // Total Withdrawal
    TOT_DEPOSIT_AMT:  66881.51,       // Total Deposit

    // Customer profile
    CUST_CONST:     "SINGL",          // Constitution (SINGL, JNTLY, CORP)
    LANGUAGE:       "AMH",            // Language (AMH=Amharic)
    PHONE_NO:       "0911234567",
    EMAIL:          "tibebu.teferi@email.com",
    ADDRESS:        "Bole Sub-City, Addis Ababa",
    NATIONAL_ID:    "ET-1234567",
    DATE_OF_BIRTH:  "1985-03-15",
    PROFILE_PICTURE: null,
    SIGNATURE_IMAGE: null,
  },
  {
    FORACID:        "1000345678",
    ACID:           "AB8822341",
    CUST_ID:        "RC5521234",
    ACCT_NAME:      "TIGIST BEKELE WORKU",
    SHORT_NAME:     "TBW",
    SCHM_TYPE:      "CAA",
    SCHM_CODE:      "CL01",
    CURR_CODE:      "ETB",
    SOL_ID:         "102",
    ENTITY_CRE_FLG: "Y",
    ACCT_STATUS:    "A",
    ACCT_OPN_DATE:  "1/20/2019",
    ACCT_CLS_DATE:  null,
    LIMIT_EXPIRY_DATE: "4/1/2027",
    LAST_TRAN_DATE: "4/2/2026",
    CLRBAL:         340200.00,
    UNCLRBAL:       0,
    LIEN_AMT:       0,
    SANCT_LIM:      500000,
    TOT_WITHDRWL_AMT: 1250000,
    TOT_DEPOSIT_AMT:  1590200,
    CUST_CONST:     "SINGL",
    LANGUAGE:       "AMH",
    PHONE_NO:       "0922345678",
    EMAIL:          "tigist.bekele@email.com",
    ADDRESS:        "Kirkos Sub-City, Addis Ababa",
    NATIONAL_ID:    "ET-2345678",
    DATE_OF_BIRTH:  "1990-07-22",
    PROFILE_PICTURE: null,
    SIGNATURE_IMAGE: null,
  },
  {
    FORACID:        "1000456789",
    ACID:           "AB9933452",
    CUST_ID:        "RC6632345",
    ACCT_NAME:      "DAWIT HAILE GEBRE",
    SHORT_NAME:     "DHG",
    SCHM_TYPE:      "SBA",
    SCHM_CODE:      "SL01",
    CURR_CODE:      "ETB",
    SOL_ID:         "103",
    ENTITY_CRE_FLG: "Y",
    ACCT_STATUS:    "F",              // Frozen
    ACCT_OPN_DATE:  "9/14/2015",
    ACCT_CLS_DATE:  null,
    LIMIT_EXPIRY_DATE: null,
    LAST_TRAN_DATE: "1/10/2026",
    CLRBAL:         8900.50,
    UNCLRBAL:       0,
    LIEN_AMT:       8900.50,
    SANCT_LIM:      0,
    TOT_WITHDRWL_AMT: 45000,
    TOT_DEPOSIT_AMT:  53900.50,
    CUST_CONST:     "SINGL",
    LANGUAGE:       "AMH",
    PHONE_NO:       "0933456789",
    EMAIL:          "dawit.haile@email.com",
    ADDRESS:        "Yeka Sub-City, Addis Ababa",
    NATIONAL_ID:    "ET-3456789",
    DATE_OF_BIRTH:  "1978-11-05",
    PROFILE_PICTURE: null,
    SIGNATURE_IMAGE: null,
  },
  {
    FORACID:        "1000567890",
    ACID:           "AB7744563",
    CUST_ID:        "RC7743456",
    ACCT_NAME:      "MERON TADESSE ALEMU",
    SHORT_NAME:     "MTA",
    SCHM_TYPE:      "TDA",
    SCHM_CODE:      "TD01",
    CURR_CODE:      "ETB",
    SOL_ID:         "101",
    ENTITY_CRE_FLG: "Y",
    ACCT_STATUS:    "A",
    ACCT_OPN_DATE:  "3/1/2021",
    ACCT_CLS_DATE:  null,
    LIMIT_EXPIRY_DATE: "3/1/2027",
    LAST_TRAN_DATE: "3/1/2026",
    CLRBAL:         500000.00,
    UNCLRBAL:       0,
    LIEN_AMT:       500000,
    SANCT_LIM:      500000,
    TOT_WITHDRWL_AMT: 0,
    TOT_DEPOSIT_AMT:  500000,
    CUST_CONST:     "SINGL",
    LANGUAGE:       "AMH",
    PHONE_NO:       "0944567890",
    EMAIL:          "meron.tadesse@email.com",
    ADDRESS:        "Lideta Sub-City, Addis Ababa",
    NATIONAL_ID:    "ET-4567890",
    DATE_OF_BIRTH:  "1995-02-28",
    PROFILE_PICTURE: null,
    SIGNATURE_IMAGE: null,
  },
  {
    FORACID:        "1000678901",
    ACID:           "AB6655674",
    CUST_ID:        "RC8854567",
    ACCT_NAME:      "SOLOMON TESFAYE BEKELE",
    SHORT_NAME:     "STB",
    SCHM_TYPE:      "SBA",
    SCHM_CODE:      "SL01",
    CURR_CODE:      "ETB",
    SOL_ID:         "104",
    ENTITY_CRE_FLG: "Y",
    ACCT_STATUS:    "D",              // Dormant
    ACCT_OPN_DATE:  "4/30/2012",
    ACCT_CLS_DATE:  null,
    LIMIT_EXPIRY_DATE: null,
    LAST_TRAN_DATE: "6/15/2022",
    CLRBAL:         0,
    UNCLRBAL:       0,
    LIEN_AMT:       0,
    SANCT_LIM:      0,
    TOT_WITHDRWL_AMT: 120000,
    TOT_DEPOSIT_AMT:  120000,
    CUST_CONST:     "SINGL",
    LANGUAGE:       "AMH",
    PHONE_NO:       "0955678901",
    EMAIL:          "solomon.tesfaye@email.com",
    ADDRESS:        "Nifas Silk Sub-City, Addis Ababa",
    NATIONAL_ID:    "ET-5678901",
    DATE_OF_BIRTH:  "1982-08-19",
    PROFILE_PICTURE: null,
    SIGNATURE_IMAGE: null,
  },
];

export const MOCK_TRANSACTIONS = {
  "RC4410155": [
    { TXN_ID: "T001", TXN_DATE: "2026-04-03", TXN_TYPE: "CREDIT", AMOUNT: 15000,  DESCRIPTION: "Salary Deposit",       CHANNEL: "BRANCH", STATUS: "SUCCESS" },
    { TXN_ID: "T002", TXN_DATE: "2026-04-02", TXN_TYPE: "DEBIT",  AMOUNT: 2500,   DESCRIPTION: "ATM Withdrawal",        CHANNEL: "ATM",    STATUS: "SUCCESS" },
    { TXN_ID: "T003", TXN_DATE: "2026-04-01", TXN_TYPE: "DEBIT",  AMOUNT: 800,    DESCRIPTION: "Utility Bill Payment",  CHANNEL: "MOBILE", STATUS: "SUCCESS" },
    { TXN_ID: "T004", TXN_DATE: "2026-03-30", TXN_TYPE: "CREDIT", AMOUNT: 5000,   DESCRIPTION: "Transfer Received",     CHANNEL: "ONLINE", STATUS: "SUCCESS" },
    { TXN_ID: "T005", TXN_DATE: "2026-03-28", TXN_TYPE: "DEBIT",  AMOUNT: 1200,   DESCRIPTION: "POS Purchase",          CHANNEL: "POS",    STATUS: "SUCCESS" },
    { TXN_ID: "T006", TXN_DATE: "2026-03-25", TXN_TYPE: "DEBIT",  AMOUNT: 300,    DESCRIPTION: "Mobile Recharge",       CHANNEL: "MOBILE", STATUS: "SUCCESS" },
    { TXN_ID: "T007", TXN_DATE: "2026-03-20", TXN_TYPE: "CREDIT", AMOUNT: 20000,  DESCRIPTION: "Business Income",       CHANNEL: "BRANCH", STATUS: "SUCCESS" },
    { TXN_ID: "T008", TXN_DATE: "2026-03-15", TXN_TYPE: "DEBIT",  AMOUNT: 500,    DESCRIPTION: "Failed Transfer",       CHANNEL: "ONLINE", STATUS: "FAILED"  },
  ],
  "RC5521234": [
    { TXN_ID: "T009", TXN_DATE: "2026-04-03", TXN_TYPE: "CREDIT", AMOUNT: 50000,  DESCRIPTION: "Business Revenue",      CHANNEL: "BRANCH", STATUS: "SUCCESS" },
    { TXN_ID: "T010", TXN_DATE: "2026-04-01", TXN_TYPE: "DEBIT",  AMOUNT: 12000,  DESCRIPTION: "Supplier Payment",      CHANNEL: "ONLINE", STATUS: "SUCCESS" },
    { TXN_ID: "T011", TXN_DATE: "2026-03-29", TXN_TYPE: "DEBIT",  AMOUNT: 3500,   DESCRIPTION: "ATM Withdrawal",        CHANNEL: "ATM",    STATUS: "SUCCESS" },
    { TXN_ID: "T012", TXN_DATE: "2026-03-25", TXN_TYPE: "CREDIT", AMOUNT: 8000,   DESCRIPTION: "Refund",                CHANNEL: "ONLINE", STATUS: "SUCCESS" },
  ],
  "RC6632345": [],
  "RC7743456": [
    { TXN_ID: "T013", TXN_DATE: "2026-03-01", TXN_TYPE: "CREDIT", AMOUNT: 500000, DESCRIPTION: "Fixed Deposit Opening", CHANNEL: "BRANCH", STATUS: "SUCCESS" },
  ],
  "RC8854567": [],
};
