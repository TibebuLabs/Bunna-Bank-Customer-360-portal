// itSupportKB.js - Complete IT Support Knowledge Base with Finacle Integration

// Import Finacle KB (assuming it's exported as an array)
import { FINACLE_KB } from "./finacleKB";

// ======================= MAIN KNOWLEDGE BASE =======================
// Ensure FINACLE_KB is an array, if not, handle gracefully
const getFinacleEntries = () => {
  if (Array.isArray(FINACLE_KB)) {
    return FINACLE_KB;
  }
  if (FINACLE_KB && typeof FINACLE_KB === 'object') {
    // If it's an object, convert to array of entries
    return Object.values(FINACLE_KB);
  }
  return [];
};

// Main KB array
export const KB = [
  {
    keywords: ["password", "reset", "forgot", "locked", "lockout", "lock out", "ፓስወርድ", "የይለፍ ቃል", "ተቆልፏል", "ረሳሁ"],
    en: `**Password Reset / Account Lockout**

• Do **not** share your password with anyone, including IT staff.
• If your account is locked, wait **15 minutes** — it may auto-unlock.
• To reset your Windows login password:
  1. Press **Ctrl + Alt + Del** → click "Change a password"
  2. Enter your old password, then the new one (min. 8 chars, 1 uppercase, 1 number)
• For Core Banking (Finacle) password reset:
  1. Contact your **Branch IT Coordinator** or call the Help Desk: **0115-XXXXXX**
  2. They will reset it after verifying your staff ID.
• If locked out more than 3 times, open a ticket in the **ITSM portal**.

🔒 Security reminder: Never share credentials over phone or email.`,

    am: `**ፓስወርድ ዳግም ማስጀመር / መለያ መቆለፍ**

• ፓስወርድዎን ለማንም — ለአይቲ ሰራተኞችም ጭምር — **አይስጡ**።
• መለያዎ ከተቆለፈ **15 ደቂቃ** ይጠብቁ — ራሱ ሊከፈት ይችላል።
• የዊንዶውስ ፓስወርድ ለመቀየር:
  1. **Ctrl + Alt + Del** ይጫኑ → "Change a password" ይምረጡ
  2. የቀድሞ ፓስወርድዎን ያስገቡ፣ ከዚያ አዲሱን (ቢያንስ 8 ቁምፊ፣ 1 ትልቅ ፊደል፣ 1 ቁጥር)
• ለ Core Banking (Finacle) ፓስወርድ ዳግም ማስጀመር:
  1. **የቅርንጫፍ አይቲ አስተባባሪ**ዎን ያነጋግሩ ወይም Help Desk ይደውሉ: **0115-XXXXXX**
  2. የሰራተኛ መታወቂያዎን ካረጋገጡ በኋላ ይቀይሩልዎታል።
• ከ3 ጊዜ በላይ ከተቆለፈ **ITSM portal** ላይ ቲኬት ይክፈቱ።

🔒 የደህንነት ማሳሰቢያ: ምስክርነቶችዎን በስልክ ወይም ኢሜይል አይስጡ።`
  },
  {
    keywords: ["flexcube", "t24", "finacle", "core banking", "cbs", "cannot connect", "connection", "ኮር ባንኪንግ", "ግንኙነት", "አይገናኝም"],
    en: `**Core Banking (Finacle) Connectivity Issue**

• First, check your **internet/LAN connection** — open a browser and test any website.
• Clear your browser cache:
  1. Press **Ctrl + Shift + Delete**
  2. Select "All time" and check Cached images, Cookies → click Clear
• Try a different browser (Chrome → Firefox or Edge).
• Check if the **CBS server is down** — ask a colleague if they have the same issue.
• Restart your PC and try again.
• If the issue persists after all steps → open a ticket in the **ITSM portal** with:
  - Your branch name & SOL ID
  - Error message screenshot
  - Time the issue started`,

    am: `**ኮር ባንኪንግ (Finacle) የግንኙነት ችግር**

• መጀመሪያ **የኢንተርኔት/LAN ግንኙነት**ዎን ያረጋግጡ — ብሮውዘር ከፍተው ድረ-ገጽ ይሞክሩ።
• የብሮውዘር ካሽ ያጽዱ:
  1. **Ctrl + Shift + Delete** ይጫኑ
  2. "All time" ይምረጡ፣ Cached images እና Cookies ምልክት ያድርጉ → Clear ይጫኑ
• ሌላ ብሮውዘር ይሞክሩ (Chrome → Firefox ወይም Edge)።
• **CBS ሰርቨር ወርዷል ወይ** — ባልደረቦችዎ ተመሳሳይ ችግር አለባቸው ወይ ይጠይቁ።
• ኮምፒዩተርዎን ዳግም ያስጀምሩ።
• ሁሉንም ከሞከሩ በኋላ ችግሩ ከቀጠለ → **ITSM portal** ላይ ቲኬት ይክፈቱ:
  - የቅርንጫፍ ስምዎ እና SOL ID
  - የስህተት መልዕክት ስክሪንሾት
  - ችግሩ የጀመረበት ሰዓት`
  },
  {
    keywords: ["printer", "print", "printing", "not printing", "ማተሚያ", "አታሚ", "አያትምም"],
    en: `**Printer Troubleshooting**

• Check that the printer is **powered on** and **online** (green light).
• Verify the **USB or network cable** is properly connected.
• Clear the print queue:
  1. Go to **Control Panel → Devices and Printers**
  2. Right-click your printer → **See what's printing**
  3. Cancel all pending jobs
• Restart the **Print Spooler** service:
  1. Press **Win + R** → type \`services.msc\` → Enter
  2. Find "Print Spooler" → Right-click → Restart
• Try printing a **test page** from printer properties.
• If the printer shows offline, right-click → **"Use Printer Online"**
• Hardware damage or paper jam that won't clear → open a ticket in **ITSM portal**.`,

    am: `**ማተሚያ ችግር መፍቻ**

• ማተሚያው **ተከፍቷል** እና **ኦንላይን** መሆኑን ያረጋግጡ (አረንጓዴ መብራት)።
• **USB ወይም የኔትወርክ ኬብል** በትክክል መገናኘቱን ያረጋግጡ።
• የህትመት ወረፋ ያጽዱ:
  1. **Control Panel → Devices and Printers** ይሂዱ
  2. ማተሚያዎ ላይ ቀኝ-ጠቅ → **See what's printing**
  3. ሁሉንም የሚጠባበቁ ስራዎች ይሰርዙ
• **Print Spooler** አገልግሎት ዳግም ያስጀምሩ:
  1. **Win + R** ይጫኑ → \`services.msc\` ይተይቡ → Enter
  2. "Print Spooler" ያግኙ → ቀኝ-ጠቅ → Restart
• ከማተሚያ ባህሪያት **የሙከራ ገጽ** ለማተም ይሞክሩ።
• ማተሚያው ኦፍላይን ካሳየ፣ ቀኝ-ጠቅ → **"Use Printer Online"**
• የሃርድዌር ጉዳት ወይም የወረቀት መጣበቅ → **ITSM portal** ላይ ቲኬት ይክፈቱ።`
  },
  {
    keywords: ["vpn", "remote", "remote access", "ርቀት", "ቪፒኤን"],
    en: `**VPN / Remote Access Issues**

• Ensure you have a **stable internet connection** before connecting VPN.
• Check VPN client is installed: look for the VPN icon in your system tray.
• To connect:
  1. Open the VPN client (e.g., Cisco AnyConnect / FortiClient)
  2. Enter the server address provided by IT: \`vpn.bunnabank.et\`
  3. Use your **Active Directory (AD) credentials**
• If connection fails:
  - Try disconnecting and reconnecting
  - Restart the VPN client
  - Check if your **firewall/antivirus** is blocking the VPN
• Still failing? Open a ticket in **ITSM portal** with your IP address and error screenshot.`,

    am: `**VPN / ርቀት መዳረሻ ችግሮች**

• VPN ከማገናኘትዎ በፊት **የተረጋጋ የኢንተርኔት ግንኙነት** እንዳለዎ ያረጋግጡ።
• VPN ክላይንት መጫኑን ያረጋግጡ: በሲስተም ትሬ ውስጥ VPN አዶ ይፈልጉ።
• ለመገናኘት:
  1. VPN ክላይንት ይክፈቱ (ለምሳሌ Cisco AnyConnect / FortiClient)
  2. አይቲ የሰጠዎትን ሰርቨር አድራሻ ያስገቡ: \`vpn.bunnabank.et\`
  3. **Active Directory (AD) ምስክርነቶች**ዎን ይጠቀሙ
• ግንኙነቱ ካልሰራ:
  - ያቋርጡ እና ዳግም ይሞክሩ
  - VPN ክላይንቱን ዳግም ያስጀምሩ
  - **ፋየርዎል/አንቲቫይረስ** VPN እያገደ ይሆን ያረጋግጡ
• አሁንም ካልሰራ? **ITSM portal** ላይ IP አድራሻዎን እና የስህተት ስክሪንሾት ጨምረው ቲኬት ይክፈቱ።`
  },
  {
    keywords: ["network", "internet", "wifi", "wi-fi", "lan", "no connection", "slow", "ኔትወርክ", "ኢንተርኔት", "ዋይፋይ", "ግንኙነት የለም", "ዝግ"],
    en: `**Network / Internet Troubleshooting**

• Check the **network cable** is plugged in (LAN port light should blink).
• For Wi-Fi: ensure Wi-Fi is turned on and you're connected to the correct SSID.
• Basic steps:
  1. Press **Win + R** → type \`cmd\` → Enter
  2. Type \`ipconfig\` — check you have a valid IP (not 169.x.x.x)
  3. Type \`ping 8.8.8.8\` — if it replies, internet is working
• Restart your **network adapter**:
  - Right-click network icon in taskbar → Troubleshoot problems
• Restart your **router/switch** if you have access.
• If only your PC has no connection (others work fine) → open a ticket in **ITSM portal**.`,

    am: `**ኔትወርክ / ኢንተርኔት ችግር መፍቻ**

• **የኔትወርክ ኬብል** መሰካቱን ያረጋግጡ (የLAN ፖርት መብራት ማብለጭለጭ አለበት)።
• ለዋይፋይ: ዋይፋይ ተከፍቷል እና ትክክለኛ SSID ላይ መሆንዎን ያረጋግጡ።
• መሰረታዊ ደረጃዎች:
  1. **Win + R** ይጫኑ → \`cmd\` ይተይቡ → Enter
  2. \`ipconfig\` ይተይቡ — ትክክለኛ IP አለዎ ወይ ያረጋግጡ (169.x.x.x ካልሆነ)
  3. \`ping 8.8.8.8\` ይተይቡ — ምላሽ ከሰጠ ኢንተርኔት ይሰራል
• **ኔትወርክ አዳፕተር**ዎን ዳግም ያስጀምሩ:
  - በታስክባር ላይ ያለውን ኔትወርክ አዶ ቀኝ-ጠቅ → Troubleshoot problems
• ሮውተር/ስዊቹን ዳግም ያስጀምሩ (ካለዎ)።
• ኮምፒዩተርዎ ብቻ ካልሰራ (ሌሎቹ ይሰራሉ) → **ITSM portal** ላይ ቲኬት ይክፈቱ።`
  },
  {
    keywords: ["slow", "computer", "pc", "hang", "freeze", "ዝግ", "ኮምፒዩተር", "ቀዘቀዘ", "ቆሟል"],
    en: `**Slow / Hanging Computer**

• Close unnecessary programs and browser tabs.
• Check **Task Manager** (Ctrl + Shift + Esc) for high CPU/RAM usage — end suspicious processes.
• Restart your PC — this clears memory and often fixes slowness.
• Run **Disk Cleanup**:
  1. Search "Disk Cleanup" in Start menu
  2. Select C: drive → check all boxes → OK
• Ensure Windows Updates are not running in the background.
• If the PC is very old or the issue is hardware-related → open a ticket in **ITSM portal**.`,

    am: `**ዝግ / የሚቀዘቅዝ ኮምፒዩተር**

• አላስፈላጊ ፕሮግራሞችን እና የብሮውዘር ትሮችን ይዝጉ።
• **Task Manager** (Ctrl + Shift + Esc) ይክፈቱ — ከፍተኛ CPU/RAM ጥቅም ያረጋግጡ፣ አጠራጣሪ ሂደቶችን ያቁሙ።
• ኮምፒዩተርዎን ዳግም ያስጀምሩ — ይህ ማህደረ ትውስታን ያጸዳል።
• **Disk Cleanup** ያሂዱ:
  1. Start menu ላይ "Disk Cleanup" ይፈልጉ
  2. C: ድራይቭ ይምረጡ → ሁሉንም ሳጥኖች ምልክት ያድርጉ → OK
• Windows Updates ከኋላ እየሄደ አለ ወይ ያረጋግጡ።
• ኮምፒዩተሩ በጣም አሮጌ ወይም ችግሩ ሃርድዌር ከሆነ → **ITSM portal** ላይ ቲኬት ይክፈቱ።`
  },
  {
    keywords: ["ticket", "itsm", "escalate", "support", "help desk", "helpdesk", "ቲኬት", "ድጋፍ", "ሄልፕ ዴስክ"],
    en: `**How to Open an ITSM Ticket**

1. Open your browser and go to: **http://itsm.bunnabank.et**
2. Log in with your **Active Directory credentials**
3. Click **"New Incident"**
4. Fill in:
   - Category (e.g., Network, Software, Hardware)
   - Priority (Low / Medium / High / Critical)
   - Description of the issue (include screenshots if possible)
   - Your branch name and SOL ID
5. Click **Submit** — you will receive a ticket number via email.
6. Help Desk will respond within **SLA time** (Critical: 1hr, High: 4hrs, Medium: 8hrs).

📞 Help Desk Direct Line: **0115-XXXXXX** (8AM–6PM, Mon–Sat)`,

    am: `**ITSM ቲኬት እንዴት ይከፈታል**

1. ብሮውዘርዎን ከፍተው ይሂዱ: **http://itsm.bunnabank.et**
2. **Active Directory ምስክርነቶች**ዎን ተጠቅመው ይግቡ
3. **"New Incident"** ይጫኑ
4. ይሙሉ:
   - ምድብ (ለምሳሌ ኔትወርክ፣ ሶፍትዌር፣ ሃርድዌር)
   - ቅድሚያ (ዝቅተኛ / መካከለኛ / ከፍተኛ / ወሳኝ)
   - የችግሩ መግለጫ (ስክሪንሾት ካለ ያያይዙ)
   - የቅርንጫፍ ስምዎ እና SOL ID
5. **Submit** ይጫኑ — በኢሜይል የቲኬት ቁጥር ይደርስዎታል።
6. Help Desk በ**SLA ጊዜ** ምላሽ ይሰጣል (ወሳኝ: 1ሰዓት፣ ከፍተኛ: 4ሰዓት፣ መካከለኛ: 8ሰዓት)።

📞 Help Desk ቀጥታ መስመር: **0115-XXXXXX** (ከጠዋቱ 2 — ከምሽቱ 12፣ ሰኞ–ቅዳሜ)`
  }
];

// ======================= HELPER FUNCTIONS =======================

// Detect language: if input contains Ethiopic characters → Amharic
export function detectLang(text) {
  if (!text || typeof text !== 'string') return 'en';
  return /[\u1200-\u137F]/.test(text) ? "am" : "en";
}

// Get all KB entries (main + Finacle)
function getAllEntries() {
  const finacleEntries = getFinacleEntries();
  return [...KB, ...finacleEntries];
}

// Find best matching KB entry
export function findAnswer(input) {
  if (!input || typeof input !== 'string') {
    return { answer: null, lang: 'en' };
  }
  
  const lower = input.toLowerCase().trim();
  const lang = detectLang(input);
  const allEntries = getAllEntries();
  
  // First try exact keyword matches
  for (const entry of allEntries) {
    if (entry.keywords && Array.isArray(entry.keywords)) {
      if (entry.keywords.some(k => lower.includes(k.toLowerCase()))) {
        const answer = entry[lang] || entry.en;
        if (answer) {
          return { answer, lang };
        }
      }
    }
  }
  
  // If no match found
  return { answer: null, lang };
}

// ======================= FALLBACK RESPONSES =======================
export const FALLBACK = {
  en: `I couldn't find a specific answer for that. Here are topics I can help with:

**IT Support:**
• Password reset & account lockout
• Core Banking connectivity issues
• Printer, VPN & network troubleshooting
• How to open an ITSM ticket

**Finacle (Account Management):**
• Open/verify saving, current, OD, loan accounts
• Freeze/unfreeze account (HAFSM)
• Mark/unmark lien (HALM)
• Interest not collecting (HACM)
• Disbursement errors
• Print passbook/statement (HPBP/HPSP)
• Finacle menu quick reference

Try rephrasing your question, or call Help Desk: **0115-XXXXXX**`,

  am: `ለዚህ ጥያቄ ትክክለኛ መልስ ማግኘት አልቻልኩም። እነዚህን ልረዳዎ እችላለሁ:

**አይቲ ድጋፍ:**
• ፓስወርድ ዳግም ማስጀመር
• ኮር ባንኪንግ ግንኙነት ችግሮች
• ማተሚያ፣ VPN እና ኔትወርክ
• ITSM ቲኬት

**ፊናክል (አካውንት አስተዳደር):**
• ቁጠባ፣ ካረንት፣ OD፣ ብድር አካውንት መክፈት/ማረጋገጥ
• አካውንት ማቀዝቀዝ/ማቅለጥ (HAFSM)
• Lien ምልክት (HALM)
• ወለድ አያከማችም (HACM)
• Disbursement ስህተቶች
• ፓስቡክ/ስቴትመንት ማተም
• የፊናክል ሜኑ ማጣቀሻ

እባክዎ ጥያቄዎን በተለየ መንገድ ይጠይቁ፣ ወይም Help Desk ይደውሉ: **0115-XXXXXX**`
};

// ======================= EXPORTS =======================
export default { KB, detectLang, findAnswer, FALLBACK };