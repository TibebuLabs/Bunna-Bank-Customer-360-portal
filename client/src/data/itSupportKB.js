// Mock IT Support Knowledge Base — English & Amharic
// Each entry has keywords (matched against user input) and a response per language.

export const KB = [
  {
    keywords: ["password", "reset", "forgot", "locked", "lockout", "lock out", "ፓስወርድ", "የይለፍ ቃል", "ተቆልፏል", "ረሳሁ"],
    en: `**Password Reset / Account Lockout**

• Do **not** share your password with anyone, including IT staff.
• If your account is locked, wait **15 minutes** — it may auto-unlock.
• To reset your Windows login password:
  1. Press **Ctrl + Alt + Del** → click "Change a password"
  2. Enter your old password, then the new one (min. 8 chars, 1 uppercase, 1 number)
• For Core Banking (Flexcube/T24) password reset:
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
• ለ Core Banking (Flexcube/T24) ፓስወርድ ዳግም ማስጀመር:
  1. **የቅርንጫፍ አይቲ አስተባባሪ**ዎን ያነጋግሩ ወይም Help Desk ይደውሉ: **0115-XXXXXX**
  2. የሰራተኛ መታወቂያዎን ካረጋገጡ በኋላ ይቀይሩልዎታል።
• ከ3 ጊዜ በላይ ከተቆለፈ **ITSM portal** ላይ ቲኬት ይክፈቱ።

🔒 የደህንነት ማሳሰቢያ: ምስክርነቶችዎን በስልክ ወይም ኢሜይል አይስጡ።`
  },
  {
    keywords: ["flexcube", "t24", "core banking", "cbs", "cannot connect", "connection", "ኮር ባንኪንግ", "ግንኙነት", "አይገናኝም"],
    en: `**Core Banking (Flexcube / T24) Connectivity Issue**

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

    am: `**ኮር ባንኪንግ (Flexcube / T24) የግንኙነት ችግር**

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
  },
];

// Detect language: if input contains Ethiopic characters → Amharic
export function detectLang(text) {
  return /[\u1200-\u137F]/.test(text) ? "am" : "en";
}

// Find best matching KB entry
export function findAnswer(input) {
  const lower = input.toLowerCase();
  const lang = detectLang(input);
  for (const entry of KB) {
    if (entry.keywords.some(k => lower.includes(k.toLowerCase()))) {
      return { answer: entry[lang], lang };
    }
  }
  return { answer: null, lang };
}

export const FALLBACK = {
  en: `I'm sorry, I couldn't find a specific answer for that. Here are some things I can help with:

• Password reset & account lockout
• Core Banking (Flexcube/T24) connectivity
• Printer troubleshooting
• VPN & remote access
• Network / internet issues
• Slow or hanging computer
• How to open an ITSM ticket

Please try rephrasing your question, or call the Help Desk: **0115-XXXXXX**`,

  am: `ይቅርታ፣ ለዚህ ጥያቄ ትክክለኛ መልስ ማግኘት አልቻልኩም። እነዚህን ልርዳዎ እችላለሁ:

• ፓስወርድ ዳግም ማስጀመር እና መለያ መቆለፍ
• ኮር ባንኪንግ (Flexcube/T24) ግንኙነት
• ማተሚያ ችግር
• VPN እና ርቀት መዳረሻ
• ኔትወርክ / ኢንተርኔት ችግሮች
• ዝግ ወይም የሚቀዘቅዝ ኮምፒዩተር
• ITSM ቲኬት እንዴት ይከፈታል

ጥያቄዎን ዳግም ይሞክሩ፣ ወይም Help Desk ይደውሉ: **0115-XXXXXX**`
};
