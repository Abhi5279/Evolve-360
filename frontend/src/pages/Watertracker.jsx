// import { useState, useEffect, useRef, useCallback } from "react";
// import {
//   Droplets, Plus, Trash2, Bell, BellOff,
//   TrendingUp, Target, Zap, Award, ChevronDown, RotateCcw
// } from "lucide-react";

// /* ─────────────────────────────────────────────
//    DESIGN TOKENS  (extracted from APS.jsx theme)
// ───────────────────────────────────────────── */
// const T = {
//   gradBody:    "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #eff6ff 100%)",
//   gradPrimary: "linear-gradient(135deg, #0ea5e9, #6366f1, #0284c7)",
//   blue:        "#0ea5e9",
//   indigo:      "#6366f1",
//   cyan:        "#06b6d4",
//   text:        "#0f172a",
//   textMid:     "#475569",
//   textLight:   "#64748b",
//   muted:       "#94a3b8",
//   borderSoft:  "#bae6fd",
//   borderLight: "rgba(255,255,255,0.9)",
//   surface:     "rgba(255,255,255,0.82)",
//   shadowCard:  "0 4px 32px rgba(14,165,233,0.12), 0 1px 6px rgba(0,0,0,0.05)",
//   success:     "#22c55e",
//   danger:      "#f43f5e",
//   amber:       "#f59e0b",
// };

// const glass = {
//   background:           T.surface,
//   backdropFilter:       "blur(20px)",
//   WebkitBackdropFilter: "blur(20px)",
//   border:               `1px solid ${T.borderLight}`,
//   boxShadow:            T.shadowCard,
// };

// const KEYFRAMES = `
// @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

// * { box-sizing: border-box; margin: 0; padding: 0; }

// @keyframes fadeUp {
//   from { opacity: 0; transform: translateY(18px); }
//   to   { opacity: 1; transform: translateY(0); }
// }
// @keyframes gradientShift {
//   0%   { background-position: 0% 50%; }
//   50%  { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// }
// @keyframes fillBar {
//   from { width: 0%; }
//   to   { width: var(--target-w); }
// }
// @keyframes countUp {
//   from { opacity: 0; transform: scale(0.85); }
//   to   { opacity: 1; transform: scale(1); }
// }
// @keyframes ripple {
//   0%   { transform: scale(0); opacity: 0.6; }
//   100% { transform: scale(4); opacity: 0; }
// }
// @keyframes slideIn {
//   from { opacity: 0; transform: translateX(-10px); }
//   to   { opacity: 1; transform: translateX(0); }
// }
// @keyframes toastIn {
//   from { opacity: 0; transform: translateX(-50%) translateY(16px); }
//   to   { opacity: 1; transform: translateX(-50%) translateY(0); }
// }

// .wt-fade   { animation: fadeUp 0.4s ease forwards; }
// .wt-delay1 { animation-delay: 0.05s; opacity: 0; }
// .wt-delay2 { animation-delay: 0.10s; opacity: 0; }
// .wt-delay3 { animation-delay: 0.15s; opacity: 0; }
// .wt-delay4 { animation-delay: 0.20s; opacity: 0; }
// .wt-count  { animation: countUp 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards; }

// .log-row { animation: slideIn 0.25s ease forwards; }

// .qbtn:hover {
//   background: rgba(14,165,233,0.12) !important;
//   border-color: #0ea5e9 !important;
//   color: #0ea5e9 !important;
//   transform: translateY(-1px);
// }

// .del-btn:hover { color: #f43f5e !important; }

// .card-hover:hover {
//   border-color: rgba(14,165,233,0.3) !important;
//   transform: translateY(-2px);
//   transition: all 0.2s ease;
// }
// `;

// /* ─────────────────────────────────────────────
//    LOCAL STORAGE HELPERS
// ───────────────────────────────────────────── */
// const LS_KEY     = "hydrotrack_data";
// const LS_HISTORY = "hydrotrack_history";
// const LS_PREFS   = "hydrotrack_prefs";

// function getTodayKey() {
//   return new Date().toISOString().split("T")[0];
// }

// function loadToday() {
//   try {
//     const raw = localStorage.getItem(LS_KEY);
//     if (!raw) return null;
//     const data = JSON.parse(raw);
//     if (data.date !== getTodayKey()) return null; // stale — new day
//     return data;
//   } catch { return null; }
// }

// function saveToday(state) {
//   localStorage.setItem(LS_KEY, JSON.stringify({ ...state, date: getTodayKey() }));
// }

// function loadHistory() {
//   try {
//     const raw = localStorage.getItem(LS_HISTORY);
//     return raw ? JSON.parse(raw) : [];
//   } catch { return []; }
// }

// function saveHistory(history) {
//   localStorage.setItem(LS_HISTORY, JSON.stringify(history));
// }

// function loadPrefs() {
//   try {
//     const raw = localStorage.getItem(LS_PREFS);
//     return raw ? JSON.parse(raw) : { target: 2800, email: "", userId: "", notifEnabled: true };
//   } catch { return { target: 2800, email: "", userId: "", notifEnabled: true }; }
// }

// function savePrefs(prefs) {
//   localStorage.setItem(LS_PREFS, JSON.stringify(prefs));
// }

// /* ─────────────────────────────────────────────
//    MINI SPARKLINE
// ───────────────────────────────────────────── */
// function Sparkline({ data, color }) {
//   if (!data || data.length < 2) return null;
//   const W = 80, H = 28;
//   const max = Math.max(...data, 1);
//   const pts = data.map((v, i) => {
//     const x = (i / (data.length - 1)) * W;
//     const y = H - (v / max) * (H - 4) - 2;
//     return `${x.toFixed(1)},${y.toFixed(1)}`;
//   });
//   const last = pts[pts.length - 1].split(",");
//   return (
//     <svg viewBox={`0 0 ${W} ${H}`} style={{ width: 50, height: H }}>
//       <polyline points={pts.join(" ")} fill="none" stroke={color}
//         strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//       <circle cx={last[0]} cy={last[1]} r="2.5" fill={color} />
//     </svg>
//   );
// }

// /* ─────────────────────────────────────────────
//    RING CHART (SVG donut progress)
// ───────────────────────────────────────────── */
// function RingChart({ pct, color }) {
//   const R = 52, C = 64, stroke = 10;
//   const circumference = 2 * Math.PI * R;
//   const filled = (Math.min(pct, 100) / 100) * circumference;
//   return (
//     <svg viewBox="0 0 128 128" style={{ width: 128, height: 128 }}>
//       <circle cx={C} cy={C} r={R} fill="none"
//         stroke="rgba(226,232,240,0.6)" strokeWidth={stroke} />
//       <circle cx={C} cy={C} r={R} fill="none"
//         stroke={color} strokeWidth={stroke}
//         strokeDasharray={`${filled} ${circumference - filled}`}
//         strokeDashoffset={circumference * 0.25}
//         strokeLinecap="round"
//         style={{ transition: "stroke-dasharray 0.8s cubic-bezier(.4,0,.2,1)" }} />
//       <text x={C} y={C - 4} textAnchor="middle"
//         fontSize="20" fontWeight="900" fill={color}
//         fontFamily="'Outfit', sans-serif">{Math.round(pct)}%</text>
//       <text x={C} y={C + 14} textAnchor="middle"
//         fontSize="9" fill="#94a3b8" fontFamily="'Outfit', sans-serif">hydrated</text>
//     </svg>
//   );
// }

// /* ─────────────────────────────────────────────
//    WEEK BAR CHART (last 7 days)
// ───────────────────────────────────────────── */
// function WeekBarChart({ history, target }) {
//   const days = [];
//   for (let i = 6; i >= 0; i--) {
//     const d = new Date();
//     d.setDate(d.getDate() - i);
//     const key = d.toISOString().split("T")[0];
//     const entry = history.find(h => h.date === key);
//     days.push({
//       label: d.toLocaleDateString("en", { weekday: "short" }),
//       consumed: entry?.consumed || 0,
//       isToday: i === 0,
//     });
//   }

//   const max = Math.max(...days.map(d => d.consumed), target);

//   return (
//     <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120, paddingBottom: 4 }}>
//       {days.map((day, i) => {
//         const pct = max > 0 ? (day.consumed / max) * 100 : 0;
//         const reached = day.consumed >= target;
//         const color = reached ? T.success : day.isToday ? T.blue : T.indigo;
//         return (
//           <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column",
//             alignItems: "center", gap: 4, height: "100%" }}>
//             {/* Tooltip value */}
//             <div style={{ fontSize: 9, color: T.muted, opacity: day.consumed > 0 ? 1 : 0 }}>
//               {day.consumed > 0 ? `${(day.consumed / 1000).toFixed(1)}L` : ""}
//             </div>
//             {/* Bar */}
//             <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
//               <div style={{
//                 width: "100%",
//                 height: `${Math.max(pct, day.consumed > 0 ? 4 : 0)}%`,
//                 background: `linear-gradient(to top, ${color}cc, ${color})`,
//                 borderRadius: "4px 4px 0 0",
//                 opacity: day.isToday ? 1 : 0.65,
//                 transition: "height 0.6s cubic-bezier(.4,0,.2,1)",
//                 boxShadow: day.isToday ? `0 0 8px ${color}44` : "none",
//               }} />
//             </div>
//             {/* Day label */}
//             <div style={{
//               fontSize: 9, fontWeight: day.isToday ? 800 : 600,
//               color: day.isToday ? T.blue : T.muted,
//             }}>{day.label}</div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    HOURLY LOG CHART
// ───────────────────────────────────────────── */
// function HourlyChart({ logs }) {
//   const hours = Array(24).fill(0);
//   logs.forEach(log => {
//     const h = new Date(log.time).getHours();
//     hours[h] += log.amount;
//   });
//   const max = Math.max(...hours, 1);
//   const visible = hours.slice(6, 23); // 6AM to 10PM
//   const labels  = Array.from({ length: 17 }, (_, i) => i + 6);

//   return (
//     <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 80 }}>
//       {visible.map((val, i) => {
//         const pct = (val / max) * 100;
//         const isNow = new Date().getHours() === labels[i];
//         return (
//           <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column",
//             alignItems: "center", gap: 2, height: "100%" }}>
//             <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
//               <div style={{
//                 width: "100%",
//                 height: `${Math.max(pct, val > 0 ? 8 : 0)}%`,
//                 background: val > 0
//                   ? `linear-gradient(to top, ${T.cyan}cc, ${T.cyan})`
//                   : "rgba(226,232,240,0.4)",
//                 borderRadius: "3px 3px 0 0",
//                 outline: isNow ? `2px solid ${T.blue}` : "none",
//                 transition: "height 0.4s ease",
//               }} />
//             </div>
//             <div style={{ fontSize: 7, color: i % 4 === 0 ? T.muted : "transparent" }}>
//               {labels[i]}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    STAT CARD
// ───────────────────────────────────────────── */
// function StatCard({ label, value, sub, color, icon: Icon, spark, delay }) {
//   return (
//     <div className={`wt-fade ${delay} card-hover`} style={{
//       ...glass, borderRadius: 20, padding: "20px 22px",
//       position: "relative", overflow: "hidden", cursor: "default",
//       transition: "all 0.2s ease",
//     }}>
//       <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3,
//         background: T.gradPrimary, opacity: 0.7 }} />
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//         <div>
//           <div style={{ width: 36, height: 36, borderRadius: 10,
//             background: `${color}18`, border: `1px solid ${color}33`,
//             display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
//             <Icon size={16} color={color} />
//           </div>
//           <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em",
//             textTransform: "uppercase", color: T.muted, marginBottom: 4 }}>{label}</p>
//           <p className="wt-count" style={{ fontSize: 30, fontWeight: 900, color,
//             lineHeight: 1, fontFamily: "'Outfit', sans-serif" }}>{value}</p>
//           {sub && <p style={{ fontSize: 11, color: T.textMid, marginTop: 4 }}>{sub}</p>}
//         </div>
//         {spark && <Sparkline data={spark} color={color} />}
//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    TOAST
// ───────────────────────────────────────────── */
// function Toast({ msg, show }) {
//   if (!show) return null;
//   return (
//     <div style={{
//       position: "fixed", bottom: 28, left: "50%",
//       transform: "translateX(-50%)",
//       background: "#0f172a", border: "1px solid rgba(14,165,233,0.3)",
//       borderRadius: 99, padding: "12px 24px",
//       fontSize: 13, color: "#fff", zIndex: 999,
//       animation: "toastIn 0.3s ease forwards",
//       boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
//       whiteSpace: "nowrap",
//     }}>{msg}</div>
//   );
// }

// /* ─────────────────────────────────────────────
//    MAIN COMPONENT
// ───────────────────────────────────────────── */
// const QUICK_AMOUNTS = [150, 250, 350, 500];
// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// export default function WaterTracker() {

//   /* ── Prefs ── */
//   const [prefs, setPrefs] = useState(loadPrefs);
//   const [showSettings, setShowSettings] = useState(false);
//   const [settingEmail, setSettingEmail]   = useState(prefs.email);
//   const [settingUserId, setSettingUserId] = useState(prefs.userId);
//   const [settingTarget, setSettingTarget] = useState(prefs.target);

//   /* ── Today state ── */
//   const [consumed, setConsumed] = useState(0);
//   const [logs, setLogs]         = useState([]);
//   const [customAmt, setCustomAmt] = useState("");

//   /* ── History ── */
//   const [history, setHistory] = useState(loadHistory);

//   /* ── UI ── */
//   const [toast, setToast]   = useState({ show: false, msg: "" });
//   const [apiStatus, setApiStatus] = useState(null); // null | "sending" | "ok" | "err"

//   /* ── Load today from localStorage ── */
//   useEffect(() => {
//     const today = loadToday();
//     if (today) {
//       setConsumed(today.consumed || 0);
//       setLogs(today.logs || []);
//     }
//   }, []);

//   /* ── Persist today whenever consumed/logs change ── */
//   useEffect(() => {
//     saveToday({ consumed, logs });
//     // Archive to history at midnight / on load
//     archiveToday(consumed);
//   }, [consumed, logs]);

//   /* ── Archive today's total into history ── */
//   function archiveToday(amount) {
//     const key = getTodayKey();
//     const existing = loadHistory();
//     const idx = existing.findIndex(h => h.date === key);
//     if (idx >= 0) {
//       existing[idx].consumed = amount;
//     } else {
//       existing.unshift({ date: key, consumed: amount, target: prefs.target });
//     }
//     const trimmed = existing.slice(0, 90); // keep 90 days
//     saveHistory(trimmed);
//     setHistory(trimmed);
//   }

//   /* ── Show toast ── */
//   function showToast(msg) {
//     setToast({ show: true, msg });
//     setTimeout(() => setToast({ show: false, msg: "" }), 2500);
//   }

//   /* ── Add water ── */
//   function addWater(amount) {
//     const amt = Number(amount);
//     if (!amt || amt <= 0) return;
//     const newConsumed = consumed + amt;
//     const newLog = { amount: amt, time: new Date().toISOString(), id: Date.now() };
//     setConsumed(newConsumed);
//     setLogs(prev => [newLog, ...prev]);
//     setCustomAmt("");

//     if (newConsumed >= prefs.target && consumed < prefs.target) {
//       showToast("🎉 Daily goal reached! Amazing!");
//     } else {
//       showToast(`+${amt}ml logged 💧`);
//     }

//     // Sync to backend if configured
//     if (prefs.email && prefs.userId) {
//       syncToBackend(newConsumed, prefs.target);
//     }
//   }

//   /* ── Delete log entry ── */
//   function deleteLog(id, amount) {
//     setLogs(prev => prev.filter(l => l.id !== id));
//     setConsumed(prev => Math.max(0, prev - amount));
//     showToast("Entry removed");
//   }

//   /* ── Reset today ── */
//   function resetToday() {
//     if (!confirm("Reset today's water intake?")) return;
//     setConsumed(0);
//     setLogs([]);
//     showToast("Reset complete");
//   }

//   /* ── Sync to backend ── */
//   async function syncToBackend(totalConsumed, target) {
//     try {
//       setApiStatus("sending");
//       await fetch(`${API_BASE}/api/water-reminders/sync`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           target,
//           consumed: totalConsumed,
//           status: totalConsumed >= target ? "completed" : "onTrack",
//         }),
//       });
//       setApiStatus("ok");
//       setTimeout(() => setApiStatus(null), 2000);
//     } catch {
//       setApiStatus("err");
//       setTimeout(() => setApiStatus(null), 3000);
//     }
//   }

//   /* ── Send test reminder ── */
//   async function sendTestReminder() {
//     if (!prefs.email || !prefs.userId) {
//       showToast("⚠️ Set email & userId in settings first");
//       return;
//     }
//     try {
//       setApiStatus("sending");
//       const res = await fetch(`${API_BASE}/api/water-reminders/test`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: prefs.userId,
//           email: prefs.email,
//           target: prefs.target,
//           consumed,
//         }),
//       });
//       const data = await res.json();
//       setApiStatus("ok");
//       showToast(`📧 Reminder sent to ${prefs.email}`);
//       setTimeout(() => setApiStatus(null), 3000);
//     } catch {
//       setApiStatus("err");
//       showToast("❌ Failed to send reminder");
//       setTimeout(() => setApiStatus(null), 3000);
//     }
//   }

//   /* ── Save settings ── */
//   function saveSettings() {
//     const newPrefs = {
//       target: Number(settingTarget) || 2800,
//       email: settingEmail.trim(),
//       userId: settingUserId.trim(),
//       notifEnabled: prefs.notifEnabled,
//     };
//     setPrefs(newPrefs);
//     savePrefs(newPrefs);
//     setShowSettings(false);
//     showToast("Settings saved ✅");
//   }

//   /* ── Derived values ── */
//   const target        = prefs.target;
//   const remaining     = Math.max(target - consumed, 0);
//   const pct           = target > 0 ? Math.min((consumed / target) * 100, 100) : 0;
//   const glassCount    = Math.round(consumed / 250);
//   const glassTotal    = Math.round(target / 250);
//   const statusColor   = pct >= 100 ? T.success : pct >= 60 ? T.blue : pct >= 30 ? T.amber : T.danger;
//   const statusLabel   = pct >= 100 ? "Goal Reached 🎉" : pct >= 60 ? "On Track" : pct >= 30 ? "Needs Attention" : "Behind";
//   const weekConsumed  = history.slice(0, 7).map(h => h.consumed);
//   const avgDaily      = weekConsumed.length
//     ? Math.round(weekConsumed.reduce((a, b) => a + b, 0) / weekConsumed.length)
//     : 0;
//   const bestDay       = history.length ? Math.max(...history.map(h => h.consumed)) : 0;
//   const streak        = (() => {
//     let s = 0;
//     for (let i = 0; i < history.length; i++) {
//       if (history[i].consumed >= target) s++;
//       else break;
//     }
//     return s;
//   })();

//   return (
//     <>
//       <style>{KEYFRAMES}</style>

//       {/* Background blobs */}
//       <div style={{ position:"fixed", top:-100, right:-80, width:380, height:380, borderRadius:"50%",
//         background:"rgba(14,165,233,0.08)", filter:"blur(80px)", pointerEvents:"none", zIndex:0 }} />
//       <div style={{ position:"fixed", bottom:-80, left:"15%", width:280, height:280, borderRadius:"50%",
//         background:"rgba(6,182,212,0.06)", filter:"blur(60px)", pointerEvents:"none", zIndex:0 }} />

//       <div style={{ minHeight: "100vh", background: T.gradBody,
//         fontFamily: "'Outfit', sans-serif", padding: "40px 20px 80px",
//         position: "relative", zIndex: 1 }}>
//         <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>

//           {/* ── HEADER ── */}
//           <div className="wt-fade" style={{ display:"flex", alignItems:"flex-start",
//             justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
//             <div>
//               <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.2em",
//                 textTransform:"uppercase", color: T.blue, marginBottom:6 }}>◆ Hydration Dashboard</p>
//               <h1 style={{ fontSize:"clamp(1.8rem, 4vw, 2.6rem)", fontWeight:900,
//                 color: T.text, letterSpacing:"-0.03em", lineHeight:1.05 }}>
//                 HydroTrack
//                 <span style={{ display:"block", background: T.gradPrimary,
//                   WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
//                   backgroundClip:"text", backgroundSize:"200% auto",
//                   animation:"gradientShift 3s linear infinite" }}>
//                   Water Tracker
//                 </span>
//               </h1>
//               <p style={{ fontSize:12, color: T.muted, marginTop:4 }}>
//                 {new Date().toLocaleDateString("en", { weekday:"long", month:"long", day:"numeric" })}
//               </p>
//             </div>

//             <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
//               {/* API status dot */}
//               {apiStatus && (
//                 <div style={{ display:"flex", alignItems:"center", gap:6,
//                   padding:"6px 14px", borderRadius:99,
//                   background: apiStatus==="ok" ? "rgba(34,197,94,0.1)"
//                     : apiStatus==="err" ? "rgba(244,63,94,0.1)"
//                     : "rgba(14,165,233,0.1)",
//                   border: `1px solid ${apiStatus==="ok" ? T.success : apiStatus==="err" ? T.danger : T.blue}33`,
//                   fontSize:11, fontWeight:700,
//                   color: apiStatus==="ok" ? T.success : apiStatus==="err" ? T.danger : T.blue }}>
//                   <div style={{ width:6, height:6, borderRadius:"50%",
//                     background:"currentColor" }} />
//                   {apiStatus==="sending" ? "Syncing..." : apiStatus==="ok" ? "Synced" : "Sync failed"}
//                 </div>
//               )}

//               <button onClick={sendTestReminder} style={{
//                 padding:"8px 18px", borderRadius:10,
//                 border:`1px solid ${T.borderSoft}`, background: T.surface,
//                 color: T.blue, fontFamily:"'Outfit', sans-serif",
//                 fontSize:12, fontWeight:700, cursor:"pointer",
//                 display:"flex", alignItems:"center", gap:6,
//               }}>
//                 <Bell size={13} /> Send Reminder
//               </button>

//               <button onClick={() => setShowSettings(!showSettings)} style={{
//                 padding:"8px 18px", borderRadius:10,
//                 border:`1px solid ${showSettings ? T.blue : T.borderSoft}`,
//                 background: showSettings ? "rgba(14,165,233,0.1)" : T.surface,
//                 color: showSettings ? T.blue : T.muted,
//                 fontFamily:"'Outfit', sans-serif",
//                 fontSize:12, fontWeight:700, cursor:"pointer",
//               }}>
//                 ⚙ Settings
//               </button>
//             </div>
//           </div>

//           {/* ── SETTINGS PANEL ── */}
//           {showSettings && (
//             <div className="wt-fade" style={{ ...glass, borderRadius:20, padding:"24px 28px" }}>
//               <div style={{ position:"absolute", top:0, left:0, right:0, height:3,
//                 background: T.gradPrimary, opacity:0.7, borderRadius:"20px 20px 0 0" }} />
//               <p style={{ fontSize:14, fontWeight:800, color: T.text, marginBottom:16 }}>
//                 ⚙ Settings & Notifications
//               </p>
//               <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:12 }}>
//                 <div>
//                   <label style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em",
//                     textTransform:"uppercase", color: T.muted, display:"block", marginBottom:6 }}>
//                     Daily Target (ml)
//                   </label>
//                   <input type="number" value={settingTarget}
//                     onChange={e => setSettingTarget(e.target.value)}
//                     style={{ width:"100%", padding:"10px 14px", borderRadius:10,
//                       border:`1px solid ${T.borderSoft}`, background:"rgba(240,249,255,0.8)",
//                       color: T.text, fontFamily:"'Outfit', sans-serif", fontSize:14,
//                       outline:"none" }} />
//                 </div>
//                 <div>
//                   <label style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em",
//                     textTransform:"uppercase", color: T.muted, display:"block", marginBottom:6 }}>
//                     Email for Reminders
//                   </label>
//                   <input type="email" value={settingEmail} placeholder="you@example.com"
//                     onChange={e => setSettingEmail(e.target.value)}
//                     style={{ width:"100%", padding:"10px 14px", borderRadius:10,
//                       border:`1px solid ${T.borderSoft}`, background:"rgba(240,249,255,0.8)",
//                       color: T.text, fontFamily:"'Outfit', sans-serif", fontSize:14,
//                       outline:"none" }} />
//                 </div>
//                 <div>
//                   <label style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em",
//                     textTransform:"uppercase", color: T.muted, display:"block", marginBottom:6 }}>
//                     User ID (from backend)
//                   </label>
//                   <input type="text" value={settingUserId} placeholder="MongoDB _id"
//                     onChange={e => setSettingUserId(e.target.value)}
//                     style={{ width:"100%", padding:"10px 14px", borderRadius:10,
//                       border:`1px solid ${T.borderSoft}`, background:"rgba(240,249,255,0.8)",
//                       color: T.text, fontFamily:"'Outfit', sans-serif", fontSize:14,
//                       outline:"none" }} />
//                 </div>
//               </div>
//               <div style={{ display:"flex", gap:10, marginTop:16 }}>
//                 <button onClick={saveSettings} style={{
//                   padding:"10px 24px", borderRadius:10,
//                   background: T.gradPrimary, border:"none",
//                   color:"#fff", fontFamily:"'Outfit', sans-serif",
//                   fontSize:13, fontWeight:700, cursor:"pointer",
//                 }}>Save Settings</button>
//                 <button onClick={() => setShowSettings(false)} style={{
//                   padding:"10px 20px", borderRadius:10,
//                   border:`1px solid ${T.borderSoft}`, background:"transparent",
//                   color: T.muted, fontFamily:"'Outfit', sans-serif",
//                   fontSize:13, fontWeight:700, cursor:"pointer",
//                 }}>Cancel</button>
//               </div>
//             </div>
//           )}

//           {/* ── TOP STAT CARDS ── */}
//           <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:16 }}>
//             <StatCard label="Consumed" value={`${(consumed/1000).toFixed(1)}L`}
//               sub={`${glassCount} of ${glassTotal} glasses`}
//               color={T.blue} icon={Droplets} spark={weekConsumed} delay="wt-delay1" />
//             <StatCard label="Remaining" value={`${(remaining/1000).toFixed(1)}L`}
//               sub={`${Math.round(remaining/250)} glasses left`}
//               color={remaining === 0 ? T.success : T.amber} icon={Target} delay="wt-delay2" />
//             <StatCard label="7-Day Avg" value={`${(avgDaily/1000).toFixed(1)}L`}
//               sub="daily average"
//               color={T.indigo} icon={TrendingUp} delay="wt-delay3" />
//             <StatCard label="Streak" value={`${streak}d`}
//               sub="consecutive goal days"
//               color={streak >= 3 ? T.success : T.muted} icon={Award} delay="wt-delay4" />
//           </div>

//           {/* ── MAIN GRID: ring + input ── */}
//           <div style={{ display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:20 }}>

//             {/* Ring Progress */}
//             <div className="wt-fade wt-delay2" style={{ ...glass, borderRadius:20, padding:"24px",
//               position:"relative", overflow:"hidden" }}>
//               <div style={{ position:"absolute", top:0, left:0, right:0, height:3,
//                 background: T.gradPrimary, opacity:0.7 }} />
//               <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.18em",
//                 textTransform:"uppercase", color: T.muted, marginBottom:2 }}>Today's Progress</p>
//               <p style={{ fontSize:15, fontWeight:800, color: T.text, marginBottom:20 }}>
//                 Daily Goal Tracker
//               </p>
//               <div style={{ display:"flex", alignItems:"center", gap:24 }}>
//                 <RingChart pct={pct} color={statusColor} />
//                 <div style={{ flex:1 }}>
//                   {/* Progress bar */}
//                   <div style={{ height:8, background:"rgba(226,232,240,0.8)",
//                     borderRadius:99, overflow:"hidden", marginBottom:10 }}>
//                     <div style={{ height:"100%", width:`${pct}%`,
//                       background:`linear-gradient(90deg, ${T.blue}, ${T.cyan})`,
//                       borderRadius:99,
//                       transition:"width 0.8s cubic-bezier(.4,0,.2,1)" }} />
//                   </div>
//                   <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
//                     {[
//                       { label:"Consumed",  val:`${consumed}ml`,   color: T.blue },
//                       { label:"Remaining", val:`${remaining}ml`,  color: statusColor },
//                       { label:"Target",    val:`${target}ml`,     color: T.muted },
//                       { label:"Status",    val: statusLabel,      color: statusColor },
//                     ].map(({ label, val, color }) => (
//                       <div key={label} style={{ display:"flex", justifyContent:"space-between",
//                         fontSize:12 }}>
//                         <span style={{ color: T.muted, fontWeight:600 }}>{label}</span>
//                         <span style={{ color, fontWeight:800 }}>{val}</span>
//                       </div>
//                     ))}
//                   </div>
//                   <div style={{ marginTop:14, padding:"10px 14px", borderRadius:10,
//                     background:`${T.blue}0d`, border:`1px solid ${T.blue}22` }}>
//                     <p style={{ fontSize:10, color: T.muted }}>Next suggested intake</p>
//                     <p style={{ fontSize:18, fontWeight:900, color: T.blue,
//                       fontFamily:"'Outfit', sans-serif" }}>
//                       {Math.min(Math.ceil(remaining / 2), 500)}ml
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Log Input */}
//             <div className="wt-fade wt-delay3" style={{ ...glass, borderRadius:20, padding:"24px",
//               position:"relative", overflow:"hidden" }}>
//               <div style={{ position:"absolute", top:0, left:0, right:0, height:3,
//                 background: T.gradPrimary, opacity:0.7 }} />
//               <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
//                 marginBottom:18 }}>
//                 <div>
//                   <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.18em",
//                     textTransform:"uppercase", color: T.muted, marginBottom:2 }}>Log Intake</p>
//                   <p style={{ fontSize:15, fontWeight:800, color: T.text }}>Add Water 💧</p>
//                 </div>
//                 <button onClick={resetToday} title="Reset today"
//                   style={{ padding:"6px 12px", borderRadius:8,
//                     border:`1px solid ${T.borderSoft}`, background:"transparent",
//                     color: T.muted, cursor:"pointer", display:"flex",
//                     alignItems:"center", gap:4, fontSize:11, fontWeight:600,
//                     fontFamily:"'Outfit', sans-serif" }}>
//                   <RotateCcw size={11} /> Reset
//                 </button>
//               </div>

//               {/* Quick buttons */}
//               <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em",
//                 textTransform:"uppercase", color: T.muted, marginBottom:8 }}>Quick Add</p>
//               <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
//                 {QUICK_AMOUNTS.map(amt => (
//                   <button key={amt} className="qbtn" onClick={() => addWater(amt)}
//                     style={{ padding:"10px 16px", borderRadius:99,
//                       border:`1px solid ${T.borderSoft}`,
//                       background:"rgba(240,249,255,0.6)",
//                       color: T.textMid, fontFamily:"'Outfit', sans-serif",
//                       fontSize:13, fontWeight:700, cursor:"pointer",
//                       transition:"all 0.15s" }}>
//                     {amt}ml
//                   </button>
//                 ))}
//                 <button className="qbtn" onClick={() => addWater(750)}
//                   style={{ padding:"10px 16px", borderRadius:99,
//                     border:`1px solid ${T.borderSoft}`,
//                     background:"rgba(240,249,255,0.6)",
//                     color: T.textMid, fontFamily:"'Outfit', sans-serif",
//                     fontSize:13, fontWeight:700, cursor:"pointer",
//                     transition:"all 0.15s" }}>
//                   750ml
//                 </button>
//               </div>

//               {/* Custom input */}
//               <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em",
//                 textTransform:"uppercase", color: T.muted, marginBottom:8 }}>Custom Amount</p>
//               <div style={{ display:"flex", gap:10, marginBottom:20 }}>
//                 <input type="number" value={customAmt} placeholder="Enter ml..."
//                   onChange={e => setCustomAmt(e.target.value)}
//                   onKeyDown={e => e.key === "Enter" && addWater(customAmt)}
//                   style={{ flex:1, padding:"11px 16px", borderRadius:10,
//                     border:`1px solid ${T.borderSoft}`,
//                     background:"rgba(240,249,255,0.8)",
//                     color: T.text, fontFamily:"'Outfit', sans-serif",
//                     fontSize:14, outline:"none" }} />
//                 <button onClick={() => addWater(customAmt)} style={{
//                   padding:"11px 20px", borderRadius:10,
//                   background: T.gradPrimary, border:"none",
//                   color:"#fff", fontFamily:"'Outfit', sans-serif",
//                   fontSize:14, fontWeight:700, cursor:"pointer",
//                   display:"flex", alignItems:"center", gap:6,
//                   whiteSpace:"nowrap",
//                 }}>
//                   <Plus size={15} /> Add
//                 </button>
//               </div>

//               {/* Today's logs */}
//               <div style={{ display:"flex", justifyContent:"space-between",
//                 alignItems:"center", marginBottom:10 }}>
//                 <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em",
//                   textTransform:"uppercase", color: T.muted }}>Today's Log</p>
//                 <p style={{ fontSize:10, color: T.muted }}>{logs.length} entries</p>
//               </div>
//               <div style={{ maxHeight:200, overflowY:"auto",
//                 display:"flex", flexDirection:"column", gap:6,
//                 scrollbarWidth:"thin", scrollbarColor:`${T.borderSoft} transparent` }}>
//                 {logs.length === 0 ? (
//                   <div style={{ textAlign:"center", padding:"24px 0",
//                     color: T.muted, fontSize:13 }}>
//                     No logs yet — add your first glass!
//                   </div>
//                 ) : logs.map(log => (
//                   <div key={log.id} className="log-row" style={{
//                     display:"flex", alignItems:"center", justifyContent:"space-between",
//                     padding:"9px 14px", borderRadius:10,
//                     background:"rgba(240,249,255,0.7)",
//                     border:`1px solid ${T.borderSoft}`,
//                   }}>
//                     <div style={{ display:"flex", alignItems:"center", gap:10 }}>
//                       <span style={{ fontSize:14 }}>💧</span>
//                       <span style={{ fontSize:13, fontWeight:800, color: T.blue }}>
//                         +{log.amount}ml
//                       </span>
//                     </div>
//                     <div style={{ display:"flex", alignItems:"center", gap:12 }}>
//                       <span style={{ fontSize:11, color: T.muted }}>
//                         {new Date(log.time).toLocaleTimeString("en",
//                           { hour:"2-digit", minute:"2-digit" })}
//                       </span>
//                       <button className="del-btn" onClick={() => deleteLog(log.id, log.amount)}
//                         style={{ background:"none", border:"none",
//                           color: T.muted, cursor:"pointer",
//                           transition:"color 0.15s", padding:"2px" }}>
//                         <Trash2 size={13} />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* ── CHARTS ROW ── */}
//           <div style={{ display:"grid", gridTemplateColumns:"1.3fr 1fr", gap:20 }}>

//             {/* 7-day bar chart */}
//             <div className="wt-fade wt-delay3" style={{ ...glass, borderRadius:20, padding:"24px",
//               position:"relative", overflow:"hidden" }}>
//               <div style={{ position:"absolute", top:0, left:0, right:0, height:3,
//                 background: T.gradPrimary, opacity:0.7 }} />
//               <div style={{ display:"flex", justifyContent:"space-between",
//                 alignItems:"flex-start", marginBottom:16 }}>
//                 <div>
//                   <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.18em",
//                     textTransform:"uppercase", color: T.muted, marginBottom:2 }}>Weekly View</p>
//                   <p style={{ fontSize:15, fontWeight:800, color: T.text }}>Last 7 Days</p>
//                 </div>
//                 <div style={{ display:"flex", gap:12, fontSize:9, fontWeight:700 }}>
//                   {[["#22c55e","Goal met"],["#0ea5e9","Today"],["#6366f1","Other"]].map(([c,l]) => (
//                     <div key={l} style={{ display:"flex", alignItems:"center", gap:4 }}>
//                       <div style={{ width:6, height:6, borderRadius:"50%", background:c }} />
//                       <span style={{ color: T.muted }}>{l}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <WeekBarChart history={history} target={target} />
//               {/* Target line label */}
//               <p style={{ fontSize:10, color: T.muted, marginTop:8, textAlign:"center" }}>
//                 Daily target: {target}ml · Best day: {(bestDay/1000).toFixed(1)}L
//               </p>
//             </div>

//             {/* Hourly chart */}
//             <div className="wt-fade wt-delay4" style={{ ...glass, borderRadius:20, padding:"24px",
//               position:"relative", overflow:"hidden" }}>
//               <div style={{ position:"absolute", top:0, left:0, right:0, height:3,
//                 background: T.gradPrimary, opacity:0.7 }} />
//               <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.18em",
//                 textTransform:"uppercase", color: T.muted, marginBottom:2 }}>Intake Pattern</p>
//               <p style={{ fontSize:15, fontWeight:800, color: T.text, marginBottom:16 }}>
//                 Today by Hour
//               </p>
//               {logs.length === 0 ? (
//                 <div style={{ height:80, display:"flex", alignItems:"center",
//                   justifyContent:"center", color: T.muted, fontSize:12 }}>
//                   Log water to see your pattern
//                 </div>
//               ) : (
//                 <HourlyChart logs={logs} />
//               )}
//               <p style={{ fontSize:10, color: T.muted, marginTop:10, textAlign:"center" }}>
//                 Hours 6AM–10PM · {logs.length} entries today
//               </p>
//             </div>
//           </div>

//           {/* ── 30-DAY HISTORY MINI LIST ── */}
//           <div className="wt-fade wt-delay4" style={{ ...glass, borderRadius:20, padding:"24px",
//             position:"relative", overflow:"hidden" }}>
//             <div style={{ position:"absolute", top:0, left:0, right:0, height:3,
//               background: T.gradPrimary, opacity:0.7 }} />
//             <div style={{ display:"flex", justifyContent:"space-between",
//               alignItems:"center", marginBottom:16 }}>
//               <div>
//                 <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.18em",
//                   textTransform:"uppercase", color: T.muted, marginBottom:2 }}>History</p>
//                 <p style={{ fontSize:15, fontWeight:800, color: T.text }}>
//                   Past {Math.min(history.length, 14)} Days
//                 </p>
//               </div>
//               <p style={{ fontSize:11, color: T.muted }}>
//                 {history.filter(h => h.consumed >= target).length} / {history.length} goals met
//               </p>
//             </div>
//             <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
//               {history.slice(0, 14).map((entry, i) => {
//                 const p = target > 0 ? Math.min((entry.consumed / target) * 100, 100) : 0;
//                 const c = p >= 100 ? T.success : p >= 60 ? T.blue : p >= 30 ? T.amber : T.danger;
//                 const isToday = entry.date === getTodayKey();
//                 return (
//                   <div key={entry.date} style={{
//                     display:"flex", alignItems:"center", gap:14,
//                     padding:"10px 14px", borderRadius:12,
//                     background: isToday ? `${T.blue}08` : "rgba(240,249,255,0.5)",
//                     border:`1px solid ${isToday ? T.blue+"33" : T.borderSoft}`,
//                     animation:`fadeUp 0.3s ease ${i * 25}ms both`,
//                   }}>
//                     <div style={{ width:38, height:38, borderRadius:10, flexShrink:0,
//                       background:`${c}15`, border:`1.5px solid ${c}33`,
//                       display:"flex", alignItems:"center", justifyContent:"center",
//                       fontSize:12, fontWeight:900, color: c,
//                       fontFamily:"'Outfit', sans-serif" }}>
//                       {Math.round(p)}%
//                     </div>
//                     <div style={{ flex:1, minWidth:0 }}>
//                       <div style={{ display:"flex", justifyContent:"space-between",
//                         alignItems:"center", marginBottom:4 }}>
//                         <span style={{ fontSize:12, fontWeight:700, color: T.text }}>
//                           {isToday ? "Today" : new Date(entry.date + "T12:00:00")
//                             .toLocaleDateString("en", { weekday:"short", month:"short", day:"numeric" })}
//                         </span>
//                         <span style={{ fontSize:11, fontWeight:800, color: c }}>
//                           {(entry.consumed / 1000).toFixed(1)}L / {(target/1000).toFixed(1)}L
//                         </span>
//                       </div>
//                       <div style={{ height:5, background:"rgba(226,232,240,0.8)",
//                         borderRadius:99, overflow:"hidden" }}>
//                         <div style={{ height:"100%", width:`${p}%`,
//                           background:`linear-gradient(90deg, ${c}, ${c}bb)`,
//                           borderRadius:99, transition:"width 0.6s ease" }} />
//                       </div>
//                     </div>
//                     {p >= 100 && (
//                       <span style={{ fontSize:14, flexShrink:0 }}>✅</span>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//         </div>
//       </div>

//       <Toast msg={toast.msg} show={toast.show} />
//     </>
//   );
// }

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Droplets, Plus, Trash2, Bell, BellOff,
  TrendingUp, Target, Zap, Award, ChevronDown, RotateCcw
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { waterRemindersAPI } from "../api/axios";

/* ─────────────────────────────────────────────
   DESIGN TOKENS  (extracted from APS.jsx theme)
───────────────────────────────────────────── */
const T = {
  gradBody:    "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #eff6ff 100%)",
  gradPrimary: "linear-gradient(135deg, #0ea5e9, #6366f1, #0284c7)",
  blue:        "#0ea5e9",
  indigo:      "#6366f1",
  cyan:        "#06b6d4",
  text:        "#0f172a",
  textMid:     "#475569",
  textLight:   "#64748b",
  muted:       "#94a3b8",
  borderSoft:  "#bae6fd",
  borderLight: "rgba(255,255,255,0.9)",
  surface:     "rgba(255,255,255,0.82)",
  shadowCard:  "0 4px 32px rgba(14,165,233,0.12), 0 1px 6px rgba(0,0,0,0.05)",
  success:     "#22c55e",
  danger:      "#f43f5e",
  amber:       "#f59e0b",
};

const glass = {
  background:           T.surface,
  backdropFilter:       "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border:               `1px solid ${T.borderLight}`,
  boxShadow:            T.shadowCard,
};

const KEYFRAMES = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes fillBar {
  from { width: 0%; }
  to   { width: var(--target-w); }
}
@keyframes countUp {
  from { opacity: 0; transform: scale(0.85); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes ripple {
  0%   { transform: scale(0); opacity: 0.6; }
  100% { transform: scale(4); opacity: 0; }
}
@keyframes slideIn {
  from { opacity: 0; transform: translateX(-10px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes toastIn {
  from { opacity: 0; transform: translateX(-50%) translateY(16px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}

.wt-fade   { animation: fadeUp 0.4s ease forwards; }
.wt-delay1 { animation-delay: 0.05s; opacity: 0; }
.wt-delay2 { animation-delay: 0.10s; opacity: 0; }
.wt-delay3 { animation-delay: 0.15s; opacity: 0; }
.wt-delay4 { animation-delay: 0.20s; opacity: 0; }
.wt-count  { animation: countUp 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards; }

.log-row { animation: slideIn 0.25s ease forwards; }

.qbtn:hover {
  background: rgba(14,165,233,0.12) !important;
  border-color: #0ea5e9 !important;
  color: #0ea5e9 !important;
  transform: translateY(-1px);
}

.del-btn:hover { color: #f43f5e !important; }

.card-hover:hover {
  border-color: rgba(14,165,233,0.3) !important;
  transform: translateY(-2px);
  transition: all 0.2s ease;
}
`;

/* ─────────────────────────────────────────────
   LOCAL STORAGE HELPERS
───────────────────────────────────────────── */
const LS_KEY     = "hydrotrack_data";
const LS_HISTORY = "hydrotrack_history";
const LS_PREFS   = "hydrotrack_prefs";

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

function loadToday() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.date !== getTodayKey()) return null; // stale — new day
    return data;
  } catch { return null; }
}

function saveToday(state) {
  localStorage.setItem(LS_KEY, JSON.stringify({ ...state, date: getTodayKey() }));
}

function loadHistory() {
  try {
    const raw = localStorage.getItem(LS_HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveHistory(history) {
  localStorage.setItem(LS_HISTORY, JSON.stringify(history));
}

function loadPrefs() {
  try {
    const raw = localStorage.getItem(LS_PREFS);
    return raw ? JSON.parse(raw) : { target: 2800, email: "", userId: "", notifEnabled: true };
  } catch { return { target: 2800, email: "", userId: "", notifEnabled: true }; }
}

function savePrefs(prefs) {
  localStorage.setItem(LS_PREFS, JSON.stringify(prefs));
}

/* ─────────────────────────────────────────────
   MINI SPARKLINE
───────────────────────────────────────────── */
function Sparkline({ data, color }) {
  if (!data || data.length < 2) return null;
  const W = 80, H = 28;
  const max = Math.max(...data, 1);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - (v / max) * (H - 4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const last = pts[pts.length - 1].split(",");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: 50, height: H }}>
      <polyline points={pts.join(" ")} fill="none" stroke={color}
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r="2.5" fill={color} />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   RING CHART (SVG donut progress)
───────────────────────────────────────────── */
function RingChart({ pct, color }) {
  const R = 52, C = 64, stroke = 10;
  const circumference = 2 * Math.PI * R;
  const filled = (Math.min(pct, 100) / 100) * circumference;
  return (
    <svg viewBox="0 0 128 128" style={{ width: 128, height: 128 }}>
      <circle cx={C} cy={C} r={R} fill="none"
        stroke="rgba(226,232,240,0.6)" strokeWidth={stroke} />
      <circle cx={C} cy={C} r={R} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeDasharray={`${filled} ${circumference - filled}`}
        strokeDashoffset={circumference * 0.25}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray 0.8s cubic-bezier(.4,0,.2,1)" }} />
      <text x={C} y={C - 4} textAnchor="middle"
        fontSize="20" fontWeight="900" fill={color}
        fontFamily="'Outfit', sans-serif">{Math.round(pct)}%</text>
      <text x={C} y={C + 14} textAnchor="middle"
        fontSize="9" fill="#94a3b8" fontFamily="'Outfit', sans-serif">hydrated</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   WEEK BAR CHART (last 7 days)
───────────────────────────────────────────── */
function WeekBarChart({ history, target }) {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    const entry = history.find(h => h.date === key);
    days.push({
      label: d.toLocaleDateString("en", { weekday: "short" }),
      consumed: entry?.consumed || 0,
      isToday: i === 0,
    });
  }

  const max = Math.max(...days.map(d => d.consumed), target);

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120, paddingBottom: 4 }}>
      {days.map((day, i) => {
        const pct = max > 0 ? (day.consumed / max) * 100 : 0;
        const reached = day.consumed >= target;
        const color = reached ? T.success : day.isToday ? T.blue : T.indigo;
        return (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", gap: 4, height: "100%" }}>
            {/* Tooltip value */}
            <div style={{ fontSize: 9, color: T.muted, opacity: day.consumed > 0 ? 1 : 0 }}>
              {day.consumed > 0 ? `${(day.consumed / 1000).toFixed(1)}L` : ""}
            </div>
            {/* Bar */}
            <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
              <div style={{
                width: "100%",
                height: `${Math.max(pct, day.consumed > 0 ? 4 : 0)}%`,
                background: `linear-gradient(to top, ${color}cc, ${color})`,
                borderRadius: "4px 4px 0 0",
                opacity: day.isToday ? 1 : 0.65,
                transition: "height 0.6s cubic-bezier(.4,0,.2,1)",
                boxShadow: day.isToday ? `0 0 8px ${color}44` : "none",
              }} />
            </div>
            {/* Day label */}
            <div style={{
              fontSize: 9, fontWeight: day.isToday ? 800 : 600,
              color: day.isToday ? T.blue : T.muted,
            }}>{day.label}</div>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   HOURLY LOG CHART
───────────────────────────────────────────── */
function HourlyChart({ logs }) {
  const hours = Array(24).fill(0);
  logs.forEach(log => {
    const h = new Date(log.time).getHours();
    hours[h] += log.amount;
  });
  const max = Math.max(...hours, 1);
  const visible = hours.slice(6, 23); // 6AM to 10PM
  const labels  = Array.from({ length: 17 }, (_, i) => i + 6);

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 80 }}>
      {visible.map((val, i) => {
        const pct = (val / max) * 100;
        const isNow = new Date().getHours() === labels[i];
        return (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", gap: 2, height: "100%" }}>
            <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
              <div style={{
                width: "100%",
                height: `${Math.max(pct, val > 0 ? 8 : 0)}%`,
                background: val > 0
                  ? `linear-gradient(to top, ${T.cyan}cc, ${T.cyan})`
                  : "rgba(226,232,240,0.4)",
                borderRadius: "3px 3px 0 0",
                outline: isNow ? `2px solid ${T.blue}` : "none",
                transition: "height 0.4s ease",
              }} />
            </div>
            <div style={{ fontSize: 7, color: i % 4 === 0 ? T.muted : "transparent" }}>
              {labels[i]}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   STAT CARD
───────────────────────────────────────────── */
function StatCard({ label, value, sub, color, icon: Icon, spark, delay }) {
  return (
    <div className={`wt-fade ${delay} card-hover`} style={{
      ...glass, borderRadius: 20, padding: "20px 22px",
      position: "relative", overflow: "hidden", cursor: "default",
      transition: "all 0.2s ease",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: T.gradPrimary, opacity: 0.7 }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ width: 36, height: 36, borderRadius: 10,
            background: `${color}18`, border: `1px solid ${color}33`,
            display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
            <Icon size={16} color={color} />
          </div>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", color: T.muted, marginBottom: 4 }}>{label}</p>
          <p className="wt-count" style={{ fontSize: 30, fontWeight: 900, color,
            lineHeight: 1, fontFamily: "'Outfit', sans-serif" }}>{value}</p>
          {sub && <p style={{ fontSize: 11, color: T.textMid, marginTop: 4 }}>{sub}</p>}
        </div>
        {spark && <Sparkline data={spark} color={color} />}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TOAST
───────────────────────────────────────────── */
function Toast({ msg, show }) {
  if (!show) return null;
  return (
    <div style={{
      position: "fixed", bottom: 28, left: "50%",
      transform: "translateX(-50%)",
      background: "#0f172a", border: "1px solid rgba(14,165,233,0.3)",
      borderRadius: 99, padding: "12px 24px",
      fontSize: 13, color: "#fff", zIndex: 999,
      animation: "toastIn 0.3s ease forwards",
      boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
      whiteSpace: "nowrap",
    }}>{msg}</div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const QUICK_AMOUNTS = [150, 250, 350, 500];

export default function WaterTracker() {

  /* ── Auth — pull userId + email directly from context ── */
  const { user } = useAuth();
  const userId = user?._id || user?.id;
  const email  = user?.email;

  /* ── Prefs — only target remains in localStorage ── */
  const [prefs, setPrefs]           = useState(loadPrefs);
  const [showSettings, setShowSettings] = useState(false);
  const [settingTarget, setSettingTarget] = useState(prefs.target);

  /* ── Today state ── */
  const [consumed, setConsumed] = useState(0);
  const [logs, setLogs]         = useState([]);
  const [customAmt, setCustomAmt] = useState("");

  /* ── History ── */
  const [history, setHistory] = useState(loadHistory);

  /* ── UI ── */
  const [toast, setToast]   = useState({ show: false, msg: "" });
  const [apiStatus, setApiStatus] = useState(null); // null | "sending" | "ok" | "err"

  /* ── Load today from localStorage ── */
  useEffect(() => {
    const today = loadToday();
    if (today) {
      setConsumed(today.consumed || 0);
      setLogs(today.logs || []);
    }
  }, []);

  /* ── Persist today whenever consumed/logs change ── */
  useEffect(() => {
    saveToday({ consumed, logs });
    // Archive to history at midnight / on load
    archiveToday(consumed);
  }, [consumed, logs]);

  /* ── Archive today's total into history ── */
  function archiveToday(amount) {
    const key = getTodayKey();
    const existing = loadHistory();
    const idx = existing.findIndex(h => h.date === key);
    if (idx >= 0) {
      existing[idx].consumed = amount;
    } else {
      existing.unshift({ date: key, consumed: amount, target: prefs.target });
    }
    const trimmed = existing.slice(0, 90); // keep 90 days
    saveHistory(trimmed);
    setHistory(trimmed);
  }

  /* ── Show toast ── */
  function showToast(msg) {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2500);
  }

  /* ── Add water ── */
  function addWater(amount) {
    const amt = Number(amount);
    if (!amt || amt <= 0) return;
    const newConsumed = consumed + amt;
    const newLog = { amount: amt, time: new Date().toISOString(), id: Date.now() };
    setConsumed(newConsumed);
    setLogs(prev => [newLog, ...prev]);
    setCustomAmt("");

    if (newConsumed >= prefs.target && consumed < prefs.target) {
      showToast("🎉 Daily goal reached! Amazing!");
    } else {
      showToast(`+${amt}ml logged 💧`);
    }

    // Sync to backend using auth user details
    if (userId && email) {
      syncToBackend(newConsumed, prefs.target);
    }
  }

  /* ── Delete log entry ── */
  function deleteLog(id, amount) {
    setLogs(prev => prev.filter(l => l.id !== id));
    setConsumed(prev => Math.max(0, prev - amount));
    showToast("Entry removed");
  }

  /* ── Reset today ── */
  function resetToday() {
    if (!confirm("Reset today's water intake?")) return;
    setConsumed(0);
    setLogs([]);
    showToast("Reset complete");
  }

  /* ── Sync to backend ── */
  async function syncToBackend(totalConsumed, target) {
    try {
      setApiStatus("sending");
      await waterRemindersAPI.sync({
        target,
        consumed: totalConsumed,
        status: totalConsumed >= target ? "completed" : "onTrack",
      });
      setApiStatus("ok");
      setTimeout(() => setApiStatus(null), 2000);
    } catch {
      setApiStatus("err");
      setTimeout(() => setApiStatus(null), 3000);
    }
  }

  /* ── Send test reminder ── */
  async function sendTestReminder() {
    if (!userId || !email) {
      showToast("⚠️ You must be logged in to send reminders");
      return;
    }
    try {
      setApiStatus("sending");
      await waterRemindersAPI.sendTest({
        userId,
        email,
        target: prefs.target,
        consumed,
      });
      setApiStatus("ok");
      showToast(`📧 Reminder sent to ${email}`);
      setTimeout(() => setApiStatus(null), 3000);
    } catch {
      setApiStatus("err");
      showToast("❌ Failed to send reminder");
      setTimeout(() => setApiStatus(null), 3000);
    }
  }

  /* ── Save settings ── */
  function saveSettings() {
    const newPrefs = {
      ...prefs,
      target: Number(settingTarget) || 2800,
    };
    setPrefs(newPrefs);
    savePrefs(newPrefs);
    setShowSettings(false);
    showToast("Settings saved ✅");
  }

  /* ── Derived values ── */
  const target        = prefs.target;
  const remaining     = Math.max(target - consumed, 0);
  const pct           = target > 0 ? Math.min((consumed / target) * 100, 100) : 0;
  const glassCount    = Math.round(consumed / 250);
  const glassTotal    = Math.round(target / 250);
  const statusColor   = pct >= 100 ? T.success : pct >= 60 ? T.blue : pct >= 30 ? T.amber : T.danger;
  const statusLabel   = pct >= 100 ? "Goal Reached 🎉" : pct >= 60 ? "On Track" : pct >= 30 ? "Needs Attention" : "Behind";
  const weekConsumed  = history.slice(0, 7).map(h => h.consumed);
  const avgDaily      = weekConsumed.length
    ? Math.round(weekConsumed.reduce((a, b) => a + b, 0) / weekConsumed.length)
    : 0;
  const bestDay       = history.length ? Math.max(...history.map(h => h.consumed)) : 0;
  const streak        = (() => {
    let s = 0;
    for (let i = 0; i < history.length; i++) {
      if (history[i].consumed >= target) s++;
      else break;
    }
    return s;
  })();

  return (
    <>
      <style>{KEYFRAMES}</style>

      {/* Background blobs */}
      <div style={{ position:"fixed", top:-100, right:-80, width:380, height:380, borderRadius:"50%",
        background:"rgba(14,165,233,0.08)", filter:"blur(80px)", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"fixed", bottom:-80, left:"15%", width:280, height:280, borderRadius:"50%",
        background:"rgba(6,182,212,0.06)", filter:"blur(60px)", pointerEvents:"none", zIndex:0 }} />

      <div style={{ minHeight: "100vh", background: T.gradBody,
        fontFamily: "'Outfit', sans-serif", padding: "40px 20px 80px",
        position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>

          {/* ── HEADER ── */}
          <div className="wt-fade" style={{ display:"flex", alignItems:"flex-start",
            justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
            <div>
              <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.2em",
                textTransform:"uppercase", color: T.blue, marginBottom:6 }}>◆ Hydration Dashboard</p>
              <h1 style={{ fontSize:"clamp(1.8rem, 4vw, 2.6rem)", fontWeight:900,
                color: T.text, letterSpacing:"-0.03em", lineHeight:1.05 }}>
                HydroTrack
                <span style={{ display:"block", background: T.gradPrimary,
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                  backgroundClip:"text", backgroundSize:"200% auto",
                  animation:"gradientShift 3s linear infinite" }}>
                  Water Tracker
                </span>
              </h1>
              <p style={{ fontSize:12, color: T.muted, marginTop:4 }}>
                {new Date().toLocaleDateString("en", { weekday:"long", month:"long", day:"numeric" })}
              </p>
            </div>

            <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
              {/* API status dot */}
              {apiStatus && (
                <div style={{ display:"flex", alignItems:"center", gap:6,
                  padding:"6px 14px", borderRadius:99,
                  background: apiStatus==="ok" ? "rgba(34,197,94,0.1)"
                    : apiStatus==="err" ? "rgba(244,63,94,0.1)"
                    : "rgba(14,165,233,0.1)",
                  border: `1px solid ${apiStatus==="ok" ? T.success : apiStatus==="err" ? T.danger : T.blue}33`,
                  fontSize:11, fontWeight:700,
                  color: apiStatus==="ok" ? T.success : apiStatus==="err" ? T.danger : T.blue }}>
                  <div style={{ width:6, height:6, borderRadius:"50%",
                    background:"currentColor" }} />
                  {apiStatus==="sending" ? "Syncing..." : apiStatus==="ok" ? "Synced" : "Sync failed"}
                </div>
              )}

              <button onClick={sendTestReminder} style={{
                padding:"8px 18px", borderRadius:10,
                border:`1px solid ${T.borderSoft}`, background: T.surface,
                color: T.blue, fontFamily:"'Outfit', sans-serif",
                fontSize:12, fontWeight:700, cursor:"pointer",
                display:"flex", alignItems:"center", gap:6,
              }}>
                <Bell size={13} /> Send Reminder
              </button>

              <button onClick={() => setShowSettings(!showSettings)} style={{
                padding:"8px 18px", borderRadius:10,
                border:`1px solid ${showSettings ? T.blue : T.borderSoft}`,
                background: showSettings ? "rgba(14,165,233,0.1)" : T.surface,
                color: showSettings ? T.blue : T.muted,
                fontFamily:"'Outfit', sans-serif",
                fontSize:12, fontWeight:700, cursor:"pointer",
              }}>
                ⚙ Settings
              </button>
            </div>
          </div>

          {/* ── SETTINGS PANEL ── */}
          {showSettings && (
            <div className="wt-fade" style={{ ...glass, borderRadius:20, padding:"24px 28px", position:"relative" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:3,
                background: T.gradPrimary, opacity:0.7, borderRadius:"20px 20px 0 0" }} />
              <p style={{ fontSize:14, fontWeight:800, color: T.text, marginBottom:16 }}>
                ⚙ Settings & Notifications
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:12 }}>

                {/* Daily target — only editable field */}
                <div>
                  <label style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em",
                    textTransform:"uppercase", color: T.muted, display:"block", marginBottom:6 }}>
                    Daily Target (ml)
                  </label>
                  <input type="number" value={settingTarget}
                    onChange={e => setSettingTarget(e.target.value)}
                    style={{ width:"100%", padding:"10px 14px", borderRadius:10,
                      border:`1px solid ${T.borderSoft}`, background:"rgba(240,249,255,0.8)",
                      color: T.text, fontFamily:"'Outfit', sans-serif", fontSize:14,
                      outline:"none" }} />
                </div>

                {/* Email — read-only from auth context */}
                <div>
                  <label style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em",
                    textTransform:"uppercase", color: T.muted, display:"block", marginBottom:6 }}>
                    Reminder Email
                  </label>
                  <div style={{ padding:"10px 14px", borderRadius:10,
                    border:`1px solid ${T.borderSoft}`,
                    background:"rgba(226,232,240,0.4)",
                    color: T.textMid, fontSize:14,
                    display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:13 }}>✉️</span>
                    <span>{email || "Not logged in"}</span>
                  </div>
                  <p style={{ fontSize:10, color: T.muted, marginTop:4 }}>
                    Pulled from your account
                  </p>
                </div>

                {/* User ID — read-only from auth context */}
                <div>
                  <label style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em",
                    textTransform:"uppercase", color: T.muted, display:"block", marginBottom:6 }}>
                    User ID
                  </label>
                  <div style={{ padding:"10px 14px", borderRadius:10,
                    border:`1px solid ${T.borderSoft}`,
                    background:"rgba(226,232,240,0.4)",
                    color: T.muted, fontSize:12, fontFamily:"monospace",
                    overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    {userId || "Not logged in"}
                  </div>
                  <p style={{ fontSize:10, color: T.muted, marginTop:4 }}>
                    Pulled from your account
                  </p>
                </div>

              </div>
              <div style={{ display:"flex", gap:10, marginTop:16 }}>
                <button onClick={saveSettings} style={{
                  padding:"10px 24px", borderRadius:10,
                  background: T.gradPrimary, border:"none",
                  color:"#fff", fontFamily:"'Outfit', sans-serif",
                  fontSize:13, fontWeight:700, cursor:"pointer",
                }}>Save Settings</button>
                <button onClick={() => setShowSettings(false)} style={{
                  padding:"10px 20px", borderRadius:10,
                  border:`1px solid ${T.borderSoft}`, background:"transparent",
                  color: T.muted, fontFamily:"'Outfit', sans-serif",
                  fontSize:13, fontWeight:700, cursor:"pointer",
                }}>Cancel</button>
              </div>
            </div>
          )}

          {/* ── TOP STAT CARDS ── */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:16 }}>
            <StatCard label="Consumed" value={`${(consumed/1000).toFixed(1)}L`}
              sub={`${glassCount} of ${glassTotal} glasses`}
              color={T.blue} icon={Droplets} spark={weekConsumed} delay="wt-delay1" />
            <StatCard label="Remaining" value={`${(remaining/1000).toFixed(1)}L`}
              sub={`${Math.round(remaining/250)} glasses left`}
              color={remaining === 0 ? T.success : T.amber} icon={Target} delay="wt-delay2" />
            <StatCard label="7-Day Avg" value={`${(avgDaily/1000).toFixed(1)}L`}
              sub="daily average"
              color={T.indigo} icon={TrendingUp} delay="wt-delay3" />
            <StatCard label="Streak" value={`${streak}d`}
              sub="consecutive goal days"
              color={streak >= 3 ? T.success : T.muted} icon={Award} delay="wt-delay4" />
          </div>

          {/* ── MAIN GRID: ring + input ── */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:20 }}>

            {/* Ring Progress */}
            <div className="wt-fade wt-delay2" style={{ ...glass, borderRadius:20, padding:"24px",
              position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:3,
                background: T.gradPrimary, opacity:0.7 }} />
              <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.18em",
                textTransform:"uppercase", color: T.muted, marginBottom:2 }}>Today's Progress</p>
              <p style={{ fontSize:15, fontWeight:800, color: T.text, marginBottom:20 }}>
                Daily Goal Tracker
              </p>
              <div style={{ display:"flex", alignItems:"center", gap:24 }}>
                <RingChart pct={pct} color={statusColor} />
                <div style={{ flex:1 }}>
                  {/* Progress bar */}
                  <div style={{ height:8, background:"rgba(226,232,240,0.8)",
                    borderRadius:99, overflow:"hidden", marginBottom:10 }}>
                    <div style={{ height:"100%", width:`${pct}%`,
                      background:`linear-gradient(90deg, ${T.blue}, ${T.cyan})`,
                      borderRadius:99,
                      transition:"width 0.8s cubic-bezier(.4,0,.2,1)" }} />
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    {[
                      { label:"Consumed",  val:`${consumed}ml`,   color: T.blue },
                      { label:"Remaining", val:`${remaining}ml`,  color: statusColor },
                      { label:"Target",    val:`${target}ml`,     color: T.muted },
                      { label:"Status",    val: statusLabel,      color: statusColor },
                    ].map(({ label, val, color }) => (
                      <div key={label} style={{ display:"flex", justifyContent:"space-between",
                        fontSize:12 }}>
                        <span style={{ color: T.muted, fontWeight:600 }}>{label}</span>
                        <span style={{ color, fontWeight:800 }}>{val}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop:14, padding:"10px 14px", borderRadius:10,
                    background:`${T.blue}0d`, border:`1px solid ${T.blue}22` }}>
                    <p style={{ fontSize:10, color: T.muted }}>Next suggested intake</p>
                    <p style={{ fontSize:18, fontWeight:900, color: T.blue,
                      fontFamily:"'Outfit', sans-serif" }}>
                      {Math.min(Math.ceil(remaining / 2), 500)}ml
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Log Input */}
            <div className="wt-fade wt-delay3" style={{ ...glass, borderRadius:20, padding:"24px",
              position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:3,
                background: T.gradPrimary, opacity:0.7 }} />
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                marginBottom:18 }}>
                <div>
                  <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.18em",
                    textTransform:"uppercase", color: T.muted, marginBottom:2 }}>Log Intake</p>
                  <p style={{ fontSize:15, fontWeight:800, color: T.text }}>Add Water 💧</p>
                </div>
                <button onClick={resetToday} title="Reset today"
                  style={{ padding:"6px 12px", borderRadius:8,
                    border:`1px solid ${T.borderSoft}`, background:"transparent",
                    color: T.muted, cursor:"pointer", display:"flex",
                    alignItems:"center", gap:4, fontSize:11, fontWeight:600,
                    fontFamily:"'Outfit', sans-serif" }}>
                  <RotateCcw size={11} /> Reset
                </button>
              </div>

              {/* Quick buttons */}
              <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em",
                textTransform:"uppercase", color: T.muted, marginBottom:8 }}>Quick Add</p>
              <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
                {QUICK_AMOUNTS.map(amt => (
                  <button key={amt} className="qbtn" onClick={() => addWater(amt)}
                    style={{ padding:"10px 16px", borderRadius:99,
                      border:`1px solid ${T.borderSoft}`,
                      background:"rgba(240,249,255,0.6)",
                      color: T.textMid, fontFamily:"'Outfit', sans-serif",
                      fontSize:13, fontWeight:700, cursor:"pointer",
                      transition:"all 0.15s" }}>
                    {amt}ml
                  </button>
                ))}
                <button className="qbtn" onClick={() => addWater(750)}
                  style={{ padding:"10px 16px", borderRadius:99,
                    border:`1px solid ${T.borderSoft}`,
                    background:"rgba(240,249,255,0.6)",
                    color: T.textMid, fontFamily:"'Outfit', sans-serif",
                    fontSize:13, fontWeight:700, cursor:"pointer",
                    transition:"all 0.15s" }}>
                  750ml
                </button>
              </div>

              {/* Custom input */}
              <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em",
                textTransform:"uppercase", color: T.muted, marginBottom:8 }}>Custom Amount</p>
              <div style={{ display:"flex", gap:10, marginBottom:20 }}>
                <input type="number" value={customAmt} placeholder="Enter ml..."
                  onChange={e => setCustomAmt(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addWater(customAmt)}
                  style={{ flex:1, padding:"11px 16px", borderRadius:10,
                    border:`1px solid ${T.borderSoft}`,
                    background:"rgba(240,249,255,0.8)",
                    color: T.text, fontFamily:"'Outfit', sans-serif",
                    fontSize:14, outline:"none" }} />
                <button onClick={() => addWater(customAmt)} style={{
                  padding:"11px 20px", borderRadius:10,
                  background: T.gradPrimary, border:"none",
                  color:"#fff", fontFamily:"'Outfit', sans-serif",
                  fontSize:14, fontWeight:700, cursor:"pointer",
                  display:"flex", alignItems:"center", gap:6,
                  whiteSpace:"nowrap",
                }}>
                  <Plus size={15} /> Add
                </button>
              </div>

              {/* Today's logs */}
              <div style={{ display:"flex", justifyContent:"space-between",
                alignItems:"center", marginBottom:10 }}>
                <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em",
                  textTransform:"uppercase", color: T.muted }}>Today's Log</p>
                <p style={{ fontSize:10, color: T.muted }}>{logs.length} entries</p>
              </div>
              <div style={{ maxHeight:200, overflowY:"auto",
                display:"flex", flexDirection:"column", gap:6,
                scrollbarWidth:"thin", scrollbarColor:`${T.borderSoft} transparent` }}>
                {logs.length === 0 ? (
                  <div style={{ textAlign:"center", padding:"24px 0",
                    color: T.muted, fontSize:13 }}>
                    No logs yet — add your first glass!
                  </div>
                ) : logs.map(log => (
                  <div key={log.id} className="log-row" style={{
                    display:"flex", alignItems:"center", justifyContent:"space-between",
                    padding:"9px 14px", borderRadius:10,
                    background:"rgba(240,249,255,0.7)",
                    border:`1px solid ${T.borderSoft}`,
                  }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <span style={{ fontSize:14 }}>💧</span>
                      <span style={{ fontSize:13, fontWeight:800, color: T.blue }}>
                        +{log.amount}ml
                      </span>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <span style={{ fontSize:11, color: T.muted }}>
                        {new Date(log.time).toLocaleTimeString("en",
                          { hour:"2-digit", minute:"2-digit" })}
                      </span>
                      <button className="del-btn" onClick={() => deleteLog(log.id, log.amount)}
                        style={{ background:"none", border:"none",
                          color: T.muted, cursor:"pointer",
                          transition:"color 0.15s", padding:"2px" }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── CHARTS ROW ── */}
          <div style={{ display:"grid", gridTemplateColumns:"1.3fr 1fr", gap:20 }}>

            {/* 7-day bar chart */}
            <div className="wt-fade wt-delay3" style={{ ...glass, borderRadius:20, padding:"24px",
              position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:3,
                background: T.gradPrimary, opacity:0.7 }} />
              <div style={{ display:"flex", justifyContent:"space-between",
                alignItems:"flex-start", marginBottom:16 }}>
                <div>
                  <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.18em",
                    textTransform:"uppercase", color: T.muted, marginBottom:2 }}>Weekly View</p>
                  <p style={{ fontSize:15, fontWeight:800, color: T.text }}>Last 7 Days</p>
                </div>
                <div style={{ display:"flex", gap:12, fontSize:9, fontWeight:700 }}>
                  {[["#22c55e","Goal met"],["#0ea5e9","Today"],["#6366f1","Other"]].map(([c,l]) => (
                    <div key={l} style={{ display:"flex", alignItems:"center", gap:4 }}>
                      <div style={{ width:6, height:6, borderRadius:"50%", background:c }} />
                      <span style={{ color: T.muted }}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <WeekBarChart history={history} target={target} />
              {/* Target line label */}
              <p style={{ fontSize:10, color: T.muted, marginTop:8, textAlign:"center" }}>
                Daily target: {target}ml · Best day: {(bestDay/1000).toFixed(1)}L
              </p>
            </div>

            {/* Hourly chart */}
            <div className="wt-fade wt-delay4" style={{ ...glass, borderRadius:20, padding:"24px",
              position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:3,
                background: T.gradPrimary, opacity:0.7 }} />
              <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.18em",
                textTransform:"uppercase", color: T.muted, marginBottom:2 }}>Intake Pattern</p>
              <p style={{ fontSize:15, fontWeight:800, color: T.text, marginBottom:16 }}>
                Today by Hour
              </p>
              {logs.length === 0 ? (
                <div style={{ height:80, display:"flex", alignItems:"center",
                  justifyContent:"center", color: T.muted, fontSize:12 }}>
                  Log water to see your pattern
                </div>
              ) : (
                <HourlyChart logs={logs} />
              )}
              <p style={{ fontSize:10, color: T.muted, marginTop:10, textAlign:"center" }}>
                Hours 6AM–10PM · {logs.length} entries today
              </p>
            </div>
          </div>

          {/* ── 30-DAY HISTORY MINI LIST ── */}
          <div className="wt-fade wt-delay4" style={{ ...glass, borderRadius:20, padding:"24px",
            position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:3,
              background: T.gradPrimary, opacity:0.7 }} />
            <div style={{ display:"flex", justifyContent:"space-between",
              alignItems:"center", marginBottom:16 }}>
              <div>
                <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.18em",
                  textTransform:"uppercase", color: T.muted, marginBottom:2 }}>History</p>
                <p style={{ fontSize:15, fontWeight:800, color: T.text }}>
                  Past {Math.min(history.length, 14)} Days
                </p>
              </div>
              <p style={{ fontSize:11, color: T.muted }}>
                {history.filter(h => h.consumed >= target).length} / {history.length} goals met
              </p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {history.slice(0, 14).map((entry, i) => {
                const p = target > 0 ? Math.min((entry.consumed / target) * 100, 100) : 0;
                const c = p >= 100 ? T.success : p >= 60 ? T.blue : p >= 30 ? T.amber : T.danger;
                const isToday = entry.date === getTodayKey();
                return (
                  <div key={entry.date} style={{
                    display:"flex", alignItems:"center", gap:14,
                    padding:"10px 14px", borderRadius:12,
                    background: isToday ? `${T.blue}08` : "rgba(240,249,255,0.5)",
                    border:`1px solid ${isToday ? T.blue+"33" : T.borderSoft}`,
                    animation:`fadeUp 0.3s ease ${i * 25}ms both`,
                  }}>
                    <div style={{ width:38, height:38, borderRadius:10, flexShrink:0,
                      background:`${c}15`, border:`1.5px solid ${c}33`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:12, fontWeight:900, color: c,
                      fontFamily:"'Outfit', sans-serif" }}>
                      {Math.round(p)}%
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", justifyContent:"space-between",
                        alignItems:"center", marginBottom:4 }}>
                        <span style={{ fontSize:12, fontWeight:700, color: T.text }}>
                          {isToday ? "Today" : new Date(entry.date + "T12:00:00")
                            .toLocaleDateString("en", { weekday:"short", month:"short", day:"numeric" })}
                        </span>
                        <span style={{ fontSize:11, fontWeight:800, color: c }}>
                          {(entry.consumed / 1000).toFixed(1)}L / {(target/1000).toFixed(1)}L
                        </span>
                      </div>
                      <div style={{ height:5, background:"rgba(226,232,240,0.8)",
                        borderRadius:99, overflow:"hidden" }}>
                        <div style={{ height:"100%", width:`${p}%`,
                          background:`linear-gradient(90deg, ${c}, ${c}bb)`,
                          borderRadius:99, transition:"width 0.6s ease" }} />
                      </div>
                    </div>
                    {p >= 100 && (
                      <span style={{ fontSize:14, flexShrink:0 }}>✅</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      <Toast msg={toast.msg} show={toast.show} />
    </>
  );
}