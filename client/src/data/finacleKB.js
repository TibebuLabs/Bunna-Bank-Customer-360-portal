// finacleKB.js - Make sure this exports an ARRAY, not an object

export const FINACLE_KB = [
  // Account Opening
  {
    keywords: ["open saving", "saving account", "hoaacsb", "sba account", "ቁጠባ መለያ"],
    en: `**How to Open a Saving Account (SBA)**

**Menu:** HOAACSB

**Steps:**
1. Function: Select <Open>
2. CIF ID: Enter the customer's CIF ID
3. Scheme Code: Select SBA
4. Click <Go>

**Verify:** HOAACVSB

⚠️ Unverified accounts can receive deposits but cannot withdraw.`,
    am: `**የቁጠባ መለያ መክፈቻ (SBA)**

**ሜኑ:** HOAACSB

**ደረጃዎች:**
1. ተግባር: <Open> ይምረጡ
2. CIF መታወቂያ: የደንበኛውን CIF ያስገቡ
3. የዕቅድ ኮድ: SBA ይምረጡ
4. <Go> ይጫኑ

**አረጋግጥ:** HOAACVSB

⚠️ ያልተረጋገጡ መለያዎች ተቀማጭ ገንዘብ መቀበል ይችላሉ ነገር ግን መውጣት አይችሉም።`
  },
  {
    keywords: ["open current", "current account", "hoaacca", "caa account", "ካረንት መለያ"],
    en: `**How to Open a Current Account (CAA)**

**Menu:** HOAACCA

**Key Differences:**
- Account Statement should be "Statement"
- No interest calculated
- Accepts cheque issuance

**Verify:** HOAACVCA

**Account Formats:** xxx9601, xxx9602, xxx9603...`,
    am: `**የካረንት መለያ መክፈቻ (CAA)**

**ሜኑ:** HOAACCA

**ዋና ልዩነቶች:**
- የመለያ መግለጫ: "Statement" መሆን አለበት
- ወለድ አይሰላም
- ቼክ ማውጣት ይቻላል

**አረጋግጥ:** HOAACVCA

**የመለያ ቅርጸቶች:** xxx9601, xxx9602, xxx9603...`
  },
  {
    keywords: ["verify account", "hoaacvsb", "hoaacvca", "hoaacvod", "hoaacvtd", "hoaacvla", "አረጋግጥ"],
    en: `**How to Verify an Account**

**Verification Menus:**
- Saving: HOAACVSB
- Current: HOAACVCA
- Overdraft: HOAACVOD
- Time Deposit: HOAACVTD
- Term Loan: HOAACVLA

⚠️ If verifier selects "Cancel" instead of "Verify", the account is lost forever!`,
    am: `**መለያ እንዴት ማረጋገጥ ይቻላል**

**የማረጋገጫ ሜኑዎች:**
- ቁጠባ: HOAACVSB
- ካረንት: HOAACVCA
- ኦቨርድራፍት: HOAACVOD
- ጊዜያዊ ተቀማጭ: HOAACVTD
- ብድር: HOAACVLA

⚠️ አረጋጋጁ "Cancel" ከመረጠ መለያው ለዘላለም ይጠፋል!`
  },
  {
    keywords: ["freeze account", "hafsm", "block account", "ማቀዝቀዝ"],
    en: `**How to Freeze an Account (HAFSM)**

**Freeze Codes:**
- Total = No deposit, no withdrawal
- Debit = Deposit only
- Credit = Withdrawal only

**Verify** using same menu with verifier ID.`,
    am: `**መለያ እንዴት ማቀዝቀዝ ይቻላል (HAFSM)**

**የማቀዝቀዣ ኮዶች:**
- ጠቅላላ = ምንም ተቀማጭ እና መውጣት የለም
- ዴቢት = ተቀማጭ ብቻ
- ክሬዲት = መውጣት ብቻ

**አረጋግጥ** በተመሳሳይ ሜኑ በአረጋጋጁ መታወቂያ።`
  },
  {
    keywords: ["collateral", "hclm", "lodgment", "ዋስትና"],
    en: `**How to Lodge Collateral (HCLM)**

**Steps:**
1. Function: Lodge
2. Fill General Tab (Collateral Code, Ceiling limit, Margin %)
3. Fill Particulars Tab (Assessed value, Document No., Address)
4. Submit → Gets Collateral ID
5. Verify: HCLM

**Link to Loan:** Use HSCLM menu`,
    am: `**ዋስትና እንዴት ማስመዝገብ ይቻላል (HCLM)**

**ደረጃዎች:**
1. ተግባር: Lodge
2. አጠቃላይ ትር ይሙሉ
3. ዝርዝሮች ትር ይሙሉ
4. አስገቡ → Collateral ID ያመነጫል
5. አረጋግጥ: HCLM

**ከብድር ጋር ለማገናኘት:** HSCLM ሜኑ ይጠቀሙ`
  },
  {
    keywords: ["hacm", "modify account", "አርትዕ", "ለውጥ"],
    en: `**How to Modify Accounts (HACM)**

**Modification Menus:**
- Saving/Current/OD: HACM
- Time Deposit: HACMTD
- Term Loan: HACMLA
- OD Interest Rate: HINTTM
- Loan Schedule: HLARA

**Cannot modify?** Check for unverified pending in TBAADM.ADT`,
    am: `**መለያ እንዴት ማስተካከል ይቻላል (HACM)**

**የማስተካከያ ሜኑዎች:**
- ቁጠባ/ካረንት/ኦዲ: HACM
- ጊዜያዊ ተቀማጭ: HACMTD
- ብድር: HACMLA
- የኦዲ ወለድ ተመን: HINTTM
- የብድር መርሐግብር: HLARA

**ማስተካከል አይቻልም?** በ TBAADM.ADT ውስጥ ያልተረጋገጠ ተግባር ይፈልጉ`
  },
  {
    keywords: ["close account", "hcaac", "hpayoff", "ዝጋ", "መዝጋት"],
    en: `**How to Close Accounts**

- Saving/Current/OD: HCAAC
- Time Deposit: HCAACTD
- Loan: HPAYOFF (not HCAAC!)

**GR3 Error?** Reject attached cheques first via Inventory Management.`,
    am: `**መለያ እንዴት መዝጋት ይቻላል**

- ቁጠባ/ካረንት/ኦዲ: HCAAC
- ጊዜያዊ ተቀማጭ: HCAACTD
- ብድር: HPAYOFF (HCAAC አይጠቀሙ!)

**GR3 ስህተት?** በመጀመሪያ የተያያዙ ቼኮችን ውድቅ ያድርጉ።`
  },

  // ── FAQ 1: Invalid Customer Account ──────────────────────────────────────
  {
    keywords: [
      "invalid customer account", "customer account is invalid", "invalid account error",
      "verify error", "cif lost", "cif not found", "cif missing", "fincore cif",
      "አካውንት ማረጋገጥ ስህተት", "customer account invalid", "invalid cif", "hccfm"
    ],
    en: `**FAQ: "Invalid Customer Account" Error During Verification**

**Why it happens:**
The CIF was lost/cancelled after the account was opened, or the CIF was not added to FINCORE via the HCCFM menu.

**How to fix:**
1. Check if the CIF exists in FINCORE — use menu **HCCFM**
2. If missing, create a **new CIF** in CRM
3. Login to the **BIB Support System** (portal)
4. Change the old CIF of the unverified account to the new CIF
5. Retry account verification

⚠️ **Important:** If the verifier clicks **"Cancel"** instead of "Verify", the account is permanently deleted and the account number can never be reused on that branch.`,

    am: `**ጥያቄ: አካውንት ሲረጋገጥ "Customer Account is invalid" ስህተት ለምን ያሳያል?**

**ምክንያት:**
የደንበኛው CIF ከተከፈተ በኋላ ጠፍቷል/ተሰርዟል፣ ወይም CIF በ HCCFM ሜኑ FINCORE ላይ አልተጨመረም።

**የመፍቻ ደረጃዎች:**
1. CIF በ FINCORE ላይ መኖሩን **HCCFM** ሜኑ ተጠቅሞ ያረጋግጡ
2. ከሌለ፣ CRM ላይ **አዲስ CIF** ይፍጠሩ
3. **BIB Support System** (portal) ላይ ይግቡ
4. ያልተረጋገጠው አካውንት ያለው CIF ወደ አዲሱ ይቀይሩ
5. አካውንት ማረጋገጫ ዳግም ይሞክሩ

⚠️ **ማሳሰቢያ:** ማረጋጋጭ "Verify" ሳይጫን **"Cancel"** ከጫነ፣ አካውንቱ ለዘለዓለም ይጠፋል — አካውንት ቁጥሩ ዳግም ጥቅም ላይ አይውልም።`
  },

  // ── FAQ 2: Address Not Populating ────────────────────────────────────────
  {
    keywords: [
      "address not populating", "address missing", "address not showing", "address problem",
      "joint details", "cannot add joint", "start date address", "toad address",
      "fatal error verification", "address table", "start_date",
      "አድራሻ አይመጣም", "አድራሻ ችግር", "joint ማከል አልቻልኩም"
    ],
    en: `**FAQ: Address Not Populating During Account Opening**

**Why it happens:**
There is a mismatch between the system date and the START_DATE in the ADDRESS table in the database.

**How to fix:**
1. Open **Toad** and connect to the database
2. Run this SQL:
   \`UPDATE crmuser.ADDRESS SET START_DATE = SYSDATE WHERE CUST_ID = '<CIF_ID>'\`
3. Retry account opening

**This also fixes:**
• Unable to add joint account details
• "Fatal error" displayed during account verification
• Account verification shows fatal error when system date ≠ start date`,

    am: `**ጥያቄ: አካውንት ሲከፈት የደንበኛው አድራሻ ለምን አይመጣልኝም?**

**ምክንያት:**
የሲስተሙ ቀን እና በ ADDRESS table ላይ ያለው START_DATE አይዛመዱም።

**የመፍቻ ደረጃዎች:**
1. **Toad** ይክፈቱ እና ዳታቤዝ ያገናኙ
2. ይህን SQL ያሂዱ:
   \`UPDATE crmuser.ADDRESS SET START_DATE = SYSDATE WHERE CUST_ID = '<CIF_ID>'\`
3. አካውንት መክፈት ዳግም ይሞክሩ

**ይህ እንዲሁ ይፈታል:**
• Joint account ዝርዝሮች ማከል አለመቻል
• አካውንት ማረጋገጫ ላይ "Fatal error" መታየት
• የሲስተም ቀን ≠ start date ሲሆን የሚታየው ስህተት`
  },

  // ── FAQ 3: HACLINQ Fatal Error ───────────────────────────────────────────
  {
    keywords: [
      "haclinq fatal error", "haclinq error", "fatal error balance", "balance fatal error",
      "two phone records", "duplicate phone", "phone record problem", "phoneemail",
      "haclinq", "view balance error", "balance error",
      "HACLINQ ስህተት", "ሁለት ስልክ", "fatal error ሂሳብ", "ቀሪ ሂሳብ ስህተት"
    ],
    en: `**FAQ: HACLINQ Shows "Fatal Error" When Viewing Balance**

**Why it happens:**
The customer's CIF has two phone records registered in the system. This causes a fatal error in HACLINQ and also in HACM.

**How to fix:**
1. Open **CRM** and search for the customer CIF
2. Find and remove the **duplicate phone record**
   — OR use Toad to delete directly:
   \`DELETE FROM crmuser.PHONEEMAIL WHERE CUST_ID = '<CIF_ID>' AND ROWNUM = 1\`
3. Retry HACLINQ

**Also affects:** HACM menu will show the same fatal error for the same reason.`,

    am: `**ጥያቄ: HACLINQ ሲጠቀም "Fatal Error" ለምን ያሳያል?**

**ምክንያት:**
ደንበኛው (CIF) ሁለት ስልክ ቁጥሮች ተመዝግበውለታል። ይህ HACLINQ እና HACM ሜኑዎች ላይ fatal error ያስከትላል።

**የመፍቻ ደረጃዎች:**
1. **CRM** ይክፈቱ እና ደንበኛውን ይፈልጉ
2. ትርፍ ስልክ ቁጥር ያስወግዱ
   — ወይም Toad ተጠቅሞ ቀጥታ ይሰርዙ:
   \`DELETE FROM crmuser.PHONEEMAIL WHERE CUST_ID = '<CIF_ID>' AND ROWNUM = 1\`
3. HACLINQ ዳግም ይሞክሩ

**ማሳሰቢያ:** HACM ሜኑም ለዚሁ ምክንያት fatal error ሊያሳይ ይችላል።`
  },

  // ── FAQ 4: Disbursement Verification Fails ───────────────────────────────
  {
    keywords: [
      "disbursement verification fails", "disbursement error", "loan disbursement fails",
      "gross disbursement", "disbursement verification", "operative account balance",
      "disburse error", "cannot disburse", "disbursement problem",
      "disbursement", "ብድር ክፍያ ስህተት", "disbursement ማረጋገጫ", "ኦፕሬቲቭ አካውንት"
    ],
    en: `**FAQ: Loan Disbursement Verification Fails**

**Why it happens:**
If the maker selected **"Gross Disbursement"**, the system expects charges to be collected from the operative account. If the operative account has insufficient balance, verification fails.

**How to fix:**
1. Check whether the maker selected **Gross Disbursement** checkbox
2. If yes — advise the branch to **deposit sufficient balance** to the operative account
3. Retry verification

**Also check:**
• Drawing power must be **"Equal"** (not Derived) — use **HACLHM** menu to fix
• Sanction limit and drawing power amount must match
• For second disbursement: check the **final disbursement flag** is not set to YES in \`tbaadm.lam\` table`,

    am: `**ጥያቄ: የብድር ክፍያ ማረጋገጫ ሲሞከር ስህተት ካሳየ ምን ማድረግ አለብኝ?**

**ምክንያት:**
Maker **"Gross Disbursement"** ከመረጠ፣ ሲስተሙ ክፍያዎቹ ከ operative account እንዲሰበሰቡ ይጠብቃል። Operative account በቂ ሂሳብ ከሌለው ማረጋገጫ ይሳናል።

**የመፍቻ ደረጃዎች:**
1. Maker **Gross Disbursement** checkbox መርጧል ወይ ያረጋግጡ
2. ከሆነ — ቅርንጫፉ operative account ላይ **በቂ ሂሳብ እንዲያስቀምጥ** ያሳውቁ
3. ማረጋገጫ ዳግም ይሞክሩ

**እንዲሁም ያረጋግጡ:**
• Drawing power **"Equal"** መሆን አለበት — **HACLHM** ሜኑ ይጠቀሙ
• Sanction limit እና drawing power እኩል መሆን አለባቸው
• ሁለተኛ disbursement ከሆነ: \`tbaadm.lam\` ውስጥ final disbursement flag YES አለ ወይ ያረጋግጡ`
  },

  // ── FAQ 5: Saving Account Not Collecting Interest ────────────────────────
  {
    keywords: [
      "saving not collecting interest", "interest not collected", "no interest",
      "interest collection flag", "saving interest problem", "interest flag hacm",
      "unverified pending interest", "hcaac pending", "haalm pending", "hafsm pending",
      "ወለድ አያከማችም", "ወለድ ችግር", "interest collection", "saving interest"
    ],
    en: `**FAQ: Saving Account Not Collecting Interest**

**How to diagnose and fix:**

**Step 1 — Check interest collection flag:**
1. Open menu **HACM**
2. Go to **Interest & Tax** tab
3. Ensure **"Collect Interest"** is set to **Yes**

**Step 2 — Check for unverified pending operations:**
Check these menus for any unverified records that may be blocking the account:
• **HCAAC** — account close pending
• **HAALM** — account name change pending
• **HAFSM** — freeze/unfreeze pending

**Step 3 — Check interest settings:**
• Interest start date in **HINTTM** menu
• Ensure interest **compound frequency is NOT selected**
• Check interest rate is not zero

**Quick Menu Reference:**
• **HACM** — Modify Saving, Current, OD accounts
• **HCAAC** — Close Saving, Current, OD accounts
• **HAFSM** — Freeze or unfreeze an account
• **HALM** — Mark or unmark account for lien
• **HPBP** — Print a passbook`,

    am: `**ጥያቄ: ቁጠባ አካውንት ወለድ ለምን አያከማችም?**

**የምርመራ እና የመፍቻ ደረጃዎች:**

**ደረጃ 1 — የወለድ መሰብሰቢያ ምልክት ያረጋግጡ:**
1. **HACM** ሜኑ ይክፈቱ
2. **Interest & Tax** tab ይሂዱ
3. **"Collect Interest"** **Yes** መሆኑን ያረጋግጡ

**ደረጃ 2 — ያልተረጋገጡ ስራዎች ይፈልጉ:**
እነዚህ ሜኑዎች ላይ አካውንቱን የሚያግዱ ያልተረጋገጡ ስራዎች ይፈልጉ:
• **HCAAC** — አካውንት ዝጋት ያልተረጋገጠ
• **HAALM** — ስም ለውጥ ያልተረጋገጠ
• **HAFSM** — ማቀዝቀዝ/ማቅለጥ ያልተረጋገጠ

**ደረጃ 3 — የወለድ ቅንብሮች ያረጋግጡ:**
• **HINTTM** ሜኑ ላይ የወለድ መጀመሪያ ቀን
• Interest compound frequency **አልተመረጠም** ያረጋግጡ
• የወለድ መጠን ዜሮ አይደለም ያረጋግጡ

**ፈጣን ሜኑ ማጣቀሻ:**
• **HACM** — ቁጠባ፣ ቻሪ፣ OD አካውንቶች ማስተካከያ
• **HCAAC** — ቁጠባ፣ ቻሪ፣ OD አካውንቶች ዝጋት
• **HAFSM** — አካውንት ማቀዝቀዝ/ማቅለጥ
• **HALM** — Lien ምልክት ማድረግ/ማስወገድ
• **HPBP** — ፓስቡክ ማተም`
  },
];

// Make sure to export as array (not default object)
export default FINACLE_KB;