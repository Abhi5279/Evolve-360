// import { useState, useEffect, useRef } from "react";
// import { apsAPI, workoutAPI } from "../api/axios";
// import { useAuth } from "../context/AuthContext";
// import {
//   Activity, TrendingUp, TrendingDown, Zap, Award,
//   Calendar, ChevronDown, ChevronUp, Filter, BarChart2
// } from "lucide-react";

// /* ─────────────────────────────────────────────
//    DESIGN TOKENS  (exact match to APS.jsx)
// ───────────────────────────────────────────── */
// const T = {
//   gradBody:    "linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #eef2ff 100%)",
//   gradPrimary: "linear-gradient(135deg, #2563eb, #6366f1, #7c3aed)",
//   indigo:      "#6366f1",
//   blue:        "#2563eb",
//   violet:      "#7c3aed",
//   text:        "#0f172a",
//   textMid:     "#475569",
//   textLight:   "#64748b",
//   muted:       "#94a3b8",
//   borderSoft:  "#e0e7ff",
//   borderLight: "rgba(255,255,255,0.9)",
//   surface:     "rgba(255,255,255,0.82)",
//   shadowCard:  "0 4px 32px rgba(99,102,241,0.10), 0 1px 6px rgba(0,0,0,0.05)",
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

// @keyframes fadeUp {
//   from { opacity: 0; transform: translateY(18px); }
//   to   { opacity: 1; transform: translateY(0);    }
// }
// @keyframes fadeIn {
//   from { opacity: 0; }
//   to   { opacity: 1; }
// }
// @keyframes barGrow {
//   from { transform: scaleY(0); }
//   to   { transform: scaleY(1); }
// }
// @keyframes lineIn {
//   from { stroke-dashoffset: 1200; }
//   to   { stroke-dashoffset: 0; }
// }
// @keyframes countUp {
//   from { opacity: 0; transform: scale(0.85); }
//   to   { opacity: 1; transform: scale(1);    }
// }
// @keyframes gradientShift {
//   0%   { background-position: 0% 50%;   }
//   50%  { background-position: 100% 50%; }
//   100% { background-position: 0% 50%;   }
// }
// @keyframes pulse-ring {
//   0%   { transform: scale(1);   opacity: 0.5; }
//   100% { transform: scale(1.6); opacity: 0;   }
// }

// .aps-fade   { animation: fadeUp 0.4s ease forwards; }
// .aps-delay1 { animation-delay: 0.05s; opacity: 0; }
// .aps-delay2 { animation-delay: 0.10s; opacity: 0; }
// .aps-delay3 { animation-delay: 0.15s; opacity: 0; }
// .aps-delay4 { animation-delay: 0.20s; opacity: 0; }
// .aps-count  { animation: countUp 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards; }

// .row-hover:hover {
//   background: rgba(99,102,241,0.04) !important;
//   border-color: rgba(99,102,241,0.18) !important;
// }
// .bar-col:hover .bar-fill { opacity: 1 !important; }
// .bar-col:hover .bar-tip  { opacity: 1 !important; transform: translateY(0) !important; }
// `;

// /* ─────────────────────────────────────────────
//    HELPERS
// ───────────────────────────────────────────── */
// const apsColor = (score) => {
//   if (score == null) return T.muted;
//   if (score >= 80) return T.success;
//   if (score >= 50) return T.indigo;
//   return T.danger;
// };

// const apsLabel = (score) => {
//   if (score == null) return "—";
//   if (score >= 80) return "Elite";
//   if (score >= 65) return "Strong";
//   if (score >= 50) return "Moderate";
//   return "Low";
// };

// const recoveryColor = (type) => {
//   if (!type) return T.muted;
//   if (type === "optimal")     return T.success;
//   if (type === "active")      return T.indigo;
//   if (type === "maintenance") return T.amber;
//   return T.danger;
// };

// const fmtDate = (d) =>
//   new Date(d).toLocaleDateString("en", { month: "short", day: "numeric" });

// const fmtDateFull = (d) =>
//   new Date(d).toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric", year: "numeric" });

// /* ─────────────────────────────────────────────
//    SPARKLINE
// ───────────────────────────────────────────── */
// function MiniSparkline({ data, color, height = 28 }) {
//   if (!data || data.length < 2) return null;
//   const W = 120, H = height;
//   const min = Math.min(...data), max = Math.max(...data);
//   const range = max - min || 1;
//   const pts = data.map((v, i) => {
//     const x = (i / (data.length - 1)) * W;
//     const y = H - ((v - min) / range) * (H - 6) - 3;
//     return `${x.toFixed(1)},${y.toFixed(1)}`;
//   });
//   const last = pts[pts.length - 1].split(",");
//   return (
//     <svg viewBox={`0 0 ${W} ${H}`} style={{ width: 60, height }}>
//       <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="1.8"
//         strokeLinecap="round" strokeLinejoin="round" />
//       <circle cx={last[0]} cy={last[1]} r="2.5" fill={color} />
//     </svg>
//   );
// }

// /* ─────────────────────────────────────────────
//    BAR CHART (30-day APS)
// ───────────────────────────────────────────── */
// function APSBarChart({ data }) {
//   if (!data.length) return null;
//   const recent = [...data].slice(0, 30).reverse();
//   const max = Math.max(...recent.map(d => d.apsScore ?? 0), 100);

//   return (
//     <div style={{ position: "relative" }}>
//       {/* Y-axis guides */}
//       {[0, 25, 50, 75, 100].map(v => (
//         <div key={v} style={{
//           position: "absolute", left: 0, right: 0,
//           bottom: `${(v / max) * 100}%`,
//           borderTop: `1px dashed ${v === 0 ? "transparent" : "rgba(99,102,241,0.10)"}`,
//           display: "flex", alignItems: "center",
//         }}>
//           <span style={{ fontSize: 8, color: T.muted, marginLeft: -20, width: 18, textAlign: "right" }}>{v}</span>
//         </div>
//       ))}

//       <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 140, paddingLeft: 24, paddingBottom: 4 }}>
//         {recent.map((item, i) => {
//           const score = item.apsScore ?? 0;
//           const pct   = Math.max((score / max) * 100, 2);
//           const color = apsColor(score);
//           return (
//             <div key={i} className="bar-col"
//               style={{ flex: 1, height: "100%", display: "flex", alignItems: "flex-end", position: "relative", cursor: "default" }}>
//               {/* Tooltip */}
//               <div className="bar-tip" style={{
//                 position: "absolute", bottom: "calc(100% + 8px)", left: "50%",
//                 transform: "translateX(-50%) translateY(4px)",
//                 background: "#0f172a", border: "1px solid rgba(99,102,241,0.3)",
//                 borderRadius: 8, padding: "6px 10px",
//                 fontSize: 10, whiteSpace: "nowrap", opacity: 0,
//                 pointerEvents: "none", zIndex: 10,
//                 transition: "opacity 0.15s, transform 0.15s",
//                 boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
//               }}>
//                 <div style={{ fontWeight: 800, color: "white", fontSize: 12 }}>{score}</div>
//                 <div style={{ color: T.muted, fontSize: 9 }}>{fmtDate(item.date)}</div>
//                 <div style={{ color, fontSize: 9, fontWeight: 700, textTransform: "capitalize" }}>
//                   {item.recoveryType || apsLabel(score)}
//                 </div>
//               </div>
//               {/* Bar */}
//               <div className="bar-fill" style={{
//                 width: "100%", height: `${pct}%`,
//                 borderRadius: "4px 4px 0 0",
//                 background: `linear-gradient(to top, ${color}cc, ${color})`,
//                 opacity: 0.75,
//                 transformOrigin: "bottom",
//                 animation: `barGrow 0.5s cubic-bezier(0.34,1.2,0.64,1) ${i * 18}ms both`,
//                 transition: "opacity 0.2s",
//               }} />
//             </div>
//           );
//         })}
//       </div>

//       {/* X-axis dates */}
//       <div style={{ display: "flex", gap: 3, paddingLeft: 24, marginTop: 6 }}>
//         {recent.map((item, i) => (
//           <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 7.5, color: T.muted }}>
//             {i % 5 === 0 ? fmtDate(item.date) : ""}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    LINE CHART (trend)
// ───────────────────────────────────────────── */
// function TrendLineChart({ data }) {
//   if (!data || data.length < 2) return null;
//   const recent = [...data].slice(0, 30).reverse();
//   const W = 560, H = 110;
//   const scores = recent.map(d => d.apsScore ?? 0);
//   const minS = Math.min(...scores), maxS = Math.max(...scores);
//   const range = maxS - minS || 1;

//   const pts = recent.map((d, i) => {
//     const x = (i / (recent.length - 1)) * (W - 20) + 10;
//     const y = H - 10 - ((d.apsScore ?? 0 - minS) / range) * (H - 20);
//     return { x, y, d };
//   });

//   const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
//   const areaD = `${pathD} L ${pts[pts.length-1].x} ${H} L ${pts[0].x} ${H} Z`;

//   return (
//     <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: H, overflow: "visible" }}>
//       <defs>
//         <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%"   stopColor={T.indigo} stopOpacity="0.18" />
//           <stop offset="100%" stopColor={T.indigo} stopOpacity="0.01" />
//         </linearGradient>
//         <linearGradient id="strokeGrad" x1="0" y1="0" x2="1" y2="0">
//           <stop offset="0%"   stopColor={T.blue}   />
//           <stop offset="50%"  stopColor={T.indigo}  />
//           <stop offset="100%" stopColor={T.violet}  />
//         </linearGradient>
//       </defs>
//       {/* Zone lines */}
//       {[50, 80].map(zone => {
//         const y = H - 10 - ((zone - minS) / range) * (H - 20);
//         return y > 0 && y < H ? (
//           <line key={zone} x1="10" y1={y} x2={W - 10} y2={y}
//             stroke={zone === 80 ? T.success : T.amber}
//             strokeWidth="1" strokeDasharray="3,4" opacity="0.35" />
//         ) : null;
//       })}
//       {/* Area fill */}
//       <path d={areaD} fill="url(#lineGrad)" />
//       {/* Line */}
//       <path d={pathD} fill="none" stroke="url(#strokeGrad)" strokeWidth="2.5"
//         strokeLinecap="round" strokeLinejoin="round"
//         strokeDasharray="1200" strokeDashoffset="1200"
//         style={{ animation: "lineIn 1.2s ease forwards" }} />
//       {/* Dots */}
//       {pts.map((p, i) => (
//         <circle key={i} cx={p.x} cy={p.y} r="3" fill={apsColor(p.d.apsScore)} opacity="0.9" />
//       ))}
//     </svg>
//   );
// }

// /* ─────────────────────────────────────────────
//    DONUT CHART (distribution)
// ───────────────────────────────────────────── */
// function DonutChart({ elite, strong, moderate, low, total }) {
//   const R = 36, C = 44, stroke = 10;
//   const circumference = 2 * Math.PI * R;
//   const segments = [
//     { pct: elite    / total, color: T.success, label: "Elite"    },
//     { pct: strong   / total, color: T.indigo,  label: "Strong"   },
//     { pct: moderate / total, color: T.amber,   label: "Moderate" },
//     { pct: low      / total, color: T.danger,  label: "Low"      },
//   ];
//   let offset = 0;
//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//       <svg viewBox={`0 0 ${C * 2} ${C * 2}`} style={{ width: 88, height: 88, flexShrink: 0 }}>
//         <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(226,232,240,0.6)" strokeWidth={stroke} />
//         {segments.map((seg, i) => {
//           if (!seg.pct) return null;
//           const len = seg.pct * circumference;
//           const el = (
//             <circle key={i} cx={C} cy={C} r={R} fill="none"
//               stroke={seg.color} strokeWidth={stroke}
//               strokeDasharray={`${len} ${circumference - len}`}
//               strokeDashoffset={circumference * 0.25 - offset * circumference}
//               strokeLinecap="butt" />
//           );
//           offset += seg.pct;
//           return el;
//         })}
//         <text x={C} y={C + 2} textAnchor="middle" fontSize="12" fontWeight="800"
//           fill={T.text} fontFamily="'Outfit', sans-serif">{total}</text>
//         <text x={C} y={C + 14} textAnchor="middle" fontSize="7" fill={T.muted}
//           fontFamily="'Outfit', sans-serif">sessions</text>
//       </svg>
//       <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
//         {segments.map(s => (
//           <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
//             <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color, flexShrink: 0 }} />
//             <span style={{ fontSize: 11, color: T.textLight, fontWeight: 600, width: 64 }}>{s.label}</span>
//             <span style={{ fontSize: 11, fontWeight: 800, color: T.text }}>
//               {Math.round(s.pct * total)}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    STAT HERO CARD
// ───────────────────────────────────────────── */
// function HeroStat({ label, value, sub, color, icon: Icon, sparkData, delay = "" }) {
//   return (
//     <div className={`aps-fade ${delay}`} style={{
//       ...glass, borderRadius: 20, padding: "22px 24px",
//       position: "relative", overflow: "hidden",
//     }}>
//       <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: T.gradPrimary, opacity: 0.7 }} />
//       <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
//         <div>
//           <div style={{ width: 38, height: 38, borderRadius: 10, background: `${color}18`,
//             border: `1px solid ${color}33`, display: "flex", alignItems: "center",
//             justifyContent: "center", marginBottom: 12 }}>
//             <Icon size={18} color={color} />
//           </div>
//           <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.muted, marginBottom: 4 }}>{label}</p>
//           <p className="aps-count" style={{ fontSize: 32, fontWeight: 900, color, lineHeight: 1, fontFamily: "'Outfit', sans-serif" }}>{value}</p>
//           {sub && <p style={{ fontSize: 11, color: T.textMid, marginTop: 5, lineHeight: 1.4 }}>{sub}</p>}
//         </div>
//         {sparkData && <MiniSparkline data={sparkData} color={color} />}
//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    HISTORY ROW
// ───────────────────────────────────────────── */
// function HistoryRow({ item, index }) {
//   const [open, setOpen] = useState(false);
//   const score = item.apsScore ?? 0;
//   const color = apsColor(score);

//   return (
//     <div className="row-hover" style={{
//       background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)",
//       border: open ? "1.5px solid rgba(99,102,241,0.22)" : "1px solid rgba(226,232,240,0.9)",
//       borderRadius: 14, overflow: "hidden",
//       transition: "all 0.2s",
//       boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
//       animation: `fadeUp 0.35s ease ${index * 30}ms both`,
//     }}>
//       <button onClick={() => setOpen(!open)} style={{
//         width: "100%", display: "flex", alignItems: "center", gap: 14,
//         padding: "13px 18px", background: "transparent", border: "none",
//         cursor: "pointer", textAlign: "left",
//       }}>
//         {/* Score badge */}
//         <div style={{
//           width: 44, height: 44, borderRadius: 12, flexShrink: 0,
//           background: `linear-gradient(135deg, ${color}22, ${color}10)`,
//           border: `1.5px solid ${color}44`,
//           display: "flex", alignItems: "center", justifyContent: "center",
//           fontSize: 15, fontWeight: 900, color, fontFamily: "'Outfit', sans-serif",
//         }}>
//           {score}
//         </div>

//         {/* Date + meta */}
//         <div style={{ flex: 1, minWidth: 0 }}>
//           <p style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 3 }}>
//             {fmtDateFull(item.date)}
//           </p>
//           <div style={{ display: "flex", gap: 10, fontSize: 11, color: T.muted, flexWrap: "wrap" }}>
//             <span style={{ textTransform: "capitalize" }}>{item.recoveryType || "—"}</span>
//             <span style={{ color: T.borderSoft }}>|</span>
//             <span style={{ textTransform: "capitalize", color: apsColor(score), fontWeight: 600 }}>
//               {apsLabel(score)}
//             </span>
//             {item.readinessCategory && (
//               <>
//                 <span style={{ color: T.borderSoft }}>|</span>
//                 <span style={{ textTransform: "capitalize" }}>Readiness: {item.readinessCategory}</span>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Bar */}
//         <div style={{ width: 90, flexShrink: 0 }}>
//           <div style={{ height: 5, background: "rgba(226,232,240,0.8)", borderRadius: 999, overflow: "hidden" }}>
//             <div style={{ height: "100%", width: `${score}%`, background: `linear-gradient(90deg, ${color}, ${color}bb)`, borderRadius: 999, transition: "width 0.8s ease" }} />
//           </div>
//           <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3, fontSize: 8, color: T.muted }}>
//             <span>0</span><span>100</span>
//           </div>
//         </div>

//         {/* Score pill */}
//         <div style={{
//           padding: "4px 12px", borderRadius: 99,
//           background: `${color}14`, border: `1px solid ${color}33`,
//           fontSize: 10, fontWeight: 700, color,
//           letterSpacing: "0.06em", textTransform: "uppercase", flexShrink: 0,
//         }}>
//           {apsLabel(score)}
//         </div>

//         <div style={{ color: T.muted, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }}>
//           <ChevronDown size={15} />
//         </div>
//       </button>

//       {/* Expanded detail */}
//       {open && (
//         <div style={{ padding: "0 18px 16px", borderTop: "1px solid rgba(226,232,240,0.7)" }}>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, paddingTop: 14 }}>
//             {[
//               { label: "APS Score",       val: item.apsScore ?? "—",  color: apsColor(item.apsScore) },
//               { label: "Recovery Type",   val: item.recoveryType || "—", color: recoveryColor(item.recoveryType) },
//               { label: "Readiness",       val: item.readinessCategory || "—", color: T.indigo },
//               { label: "Date",            val: fmtDate(item.date), color: T.textMid },
//             ].map(({ label, val, color: c }) => (
//               <div key={label} style={{
//                 background: "rgba(238,242,255,0.55)", border: `1px solid ${T.borderSoft}`,
//                 borderRadius: 10, padding: "10px 12px",
//               }}>
//                 <p style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.muted, marginBottom: 5 }}>{label}</p>
//                 <p style={{ fontSize: 14, fontWeight: 800, color: c, textTransform: "capitalize", lineHeight: 1 }}>{val}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    MAIN PAGE
// ───────────────────────────────────────────── */
// export default function APSHistory() {
//   const { user } = useAuth();
//   const userId = user?._id || user?.id;

//   const [history,  setHistory]  = useState([]);
//   const [loading,  setLoading]  = useState(true);
//   const [filter,   setFilter]   = useState("all");   // all | elite | strong | moderate | low
//   const [range,    setRange]    = useState(30);       // 30 | 60 | 90
//   const [sortDir,  setSortDir]  = useState("desc");  // desc | asc
//   const [view,     setView]     = useState("bar");   // bar | line

//   useEffect(() => {
//     if (!userId) return;
//     setLoading(true);
//     apsAPI.getHistory(userId, range)
//       .then(res => setHistory(res.data || []))
//       .catch(() => setHistory([]))
//       .finally(() => setLoading(false));
//   }, [userId, range]);

//   /* ── Derived stats ── */
//   const scores       = history.map(h => h.apsScore ?? 0).filter(Boolean);
//   const avgScore     = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
//   const bestScore    = scores.length ? Math.max(...scores) : null;
//   const trend        = scores.length >= 2 ? scores[0] - scores[scores.length - 1] : 0;
//   const last7        = history.slice(0, 7).map(h => h.apsScore ?? 0);
//   const prev7        = history.slice(7, 14).map(h => h.apsScore ?? 0);
//   const last7avg     = last7.length  ? Math.round(last7.reduce((a,b) => a+b,0)  / last7.length)  : null;
//   const prev7avg     = prev7.length  ? Math.round(prev7.reduce((a,b) => a+b,0)  / prev7.length)  : null;
//   const weekChange   = (last7avg != null && prev7avg != null) ? last7avg - prev7avg : null;
//   const consistencyPct = history.length ? Math.round((history.filter(h => (h.apsScore ?? 0) >= 50).length / history.length) * 100) : null;

//   const elite    = history.filter(h => (h.apsScore ?? 0) >= 80).length;
//   const strong   = history.filter(h => (h.apsScore ?? 0) >= 65 && (h.apsScore ?? 0) < 80).length;
//   const moderate = history.filter(h => (h.apsScore ?? 0) >= 50 && (h.apsScore ?? 0) < 65).length;
//   const low      = history.filter(h => (h.apsScore ?? 0) < 50).length;

//   const sparkScores = [...history].reverse().slice(-14).map(h => h.apsScore ?? 0);

//   /* ── Filtered + sorted list ── */
//   const filtered = history
//     .filter(h => {
//       if (filter === "all")      return true;
//       if (filter === "elite")    return (h.apsScore ?? 0) >= 80;
//       if (filter === "strong")   return (h.apsScore ?? 0) >= 65 && (h.apsScore ?? 0) < 80;
//       if (filter === "moderate") return (h.apsScore ?? 0) >= 50 && (h.apsScore ?? 0) < 65;
//       if (filter === "low")      return (h.apsScore ?? 0) < 50;
//       return true;
//     })
//     .sort((a, b) => {
//       const da = new Date(a.date), db = new Date(b.date);
//       return sortDir === "desc" ? db - da : da - db;
//     });

//   /* ── Loading state ── */
//   if (loading) {
//     return (
//       <>
//         <style>{KEYFRAMES}</style>
//         <div style={{ minHeight: "100vh", background: T.gradBody, fontFamily: "'Outfit', sans-serif",
//           display: "flex", alignItems: "center", justifyContent: "center" }}>
//           <div style={{ textAlign: "center" }}>
//             <div style={{ width: 48, height: 48, borderRadius: "50%", border: `3px solid ${T.borderSoft}`,
//               borderTopColor: T.indigo, animation: "gradientShift 0.8s linear infinite",
//               margin: "0 auto 16px" }} />
//             <p style={{ fontSize: 13, color: T.muted, fontWeight: 600 }}>Loading performance history…</p>
//           </div>
//         </div>
//       </>
//     );
//   }

//   /* ── Empty state ── */
//   if (!history.length) {
//     return (
//       <>
//         <style>{KEYFRAMES}</style>
//         <div style={{ minHeight: "100vh", background: T.gradBody, fontFamily: "'Outfit', sans-serif",
//           display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
//           <div style={{ ...glass, borderRadius: 24, padding: "60px 40px", textAlign: "center", maxWidth: 400 }} className="aps-fade">
//             <div style={{ width: 60, height: 60, borderRadius: 16, background: "rgba(99,102,241,0.1)",
//               border: "1px solid rgba(99,102,241,0.2)", display: "flex", alignItems: "center",
//               justifyContent: "center", margin: "0 auto 20px" }}>
//               <BarChart2 size={28} color={T.indigo} />
//             </div>
//             <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: T.text, marginBottom: 8 }}>No History Yet</h2>
//             <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.7 }}>
//               Complete your first workout session to start tracking your Athlete Performance Score.
//             </p>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <style>{KEYFRAMES}</style>

//       {/* Background blobs */}
//       <div style={{ position: "fixed", top: -100, right: -80, width: 380, height: 380, borderRadius: "50%", background: "rgba(99,102,241,0.07)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
//       <div style={{ position: "fixed", bottom: -80, left: "15%", width: 280, height: 280, borderRadius: "50%", background: "rgba(124,58,237,0.05)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />
//       <div style={{ position: "fixed", top: "40%", left: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(37,99,235,0.04)", filter: "blur(50px)", pointerEvents: "none", zIndex: 0 }} />

//       <div style={{ minHeight: "100vh", background: T.gradBody, fontFamily: "'Outfit', sans-serif",
//         padding: "44px 24px 80px", position: "relative", zIndex: 1 }}>
//         <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: 32 }}>

//           {/* ── PAGE HEADER ── */}
//           <div className="aps-fade" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
//             <div>
//               <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.indigo, marginBottom: 8 }}>◆ Performance Analytics</p>
//               <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, color: T.text, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
//                 APS History
//                 <span style={{ display: "block", background: T.gradPrimary, WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent", backgroundClip: "text",
//                   backgroundSize: "200% auto", animation: "gradientShift 3s linear infinite" }}>
//                   &amp; Analytics
//                 </span>
//               </h1>
//               <p style={{ fontSize: 13, color: T.muted, marginTop: 6 }}>
//                 {history.length} sessions tracked · last updated {fmtDate(history[0]?.date)}
//               </p>
//             </div>

//             {/* Controls */}
//             <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
//               {/* Range */}
//               {[30, 60, 90].map(r => (
//                 <button key={r} onClick={() => setRange(r)} style={{
//                   padding: "7px 16px", borderRadius: 10,
//                   border: `1.5px solid ${range === r ? T.indigo : T.borderSoft}`,
//                   background: range === r ? "rgba(99,102,241,0.10)" : "rgba(238,242,255,0.5)",
//                   color: range === r ? T.indigo : T.muted,
//                   fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 700,
//                   cursor: "pointer", transition: "all 0.15s",
//                 }}>
//                   {r}d
//                 </button>
//               ))}
//               {/* Chart toggle */}
//               <div style={{ display: "flex", background: "rgba(238,242,255,0.6)", borderRadius: 10,
//                 border: `1px solid ${T.borderSoft}`, overflow: "hidden" }}>
//                 {[["bar", "Bar"], ["line", "Trend"]].map(([v, l]) => (
//                   <button key={v} onClick={() => setView(v)} style={{
//                     padding: "7px 14px", border: "none",
//                     background: view === v ? "rgba(99,102,241,0.12)" : "transparent",
//                     color: view === v ? T.indigo : T.muted,
//                     fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 700,
//                     cursor: "pointer", transition: "all 0.15s",
//                   }}>{l}</button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* ── HERO STATS ── */}
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
//             <HeroStat label="Avg APS Score" value={avgScore ?? "—"} sub={`across ${history.length} sessions`}
//               color={apsColor(avgScore)} icon={Activity} sparkData={sparkScores} delay="aps-delay1" />
//             <HeroStat label="Best Score" value={bestScore ?? "—"} sub="personal best"
//               color={T.success} icon={Award} delay="aps-delay2" />
//             <HeroStat label="This Week" value={last7avg ?? "—"} sub={weekChange != null
//                 ? `${weekChange >= 0 ? "+" : ""}${weekChange} vs last week` : "first week"}
//               color={weekChange != null && weekChange >= 0 ? T.success : T.danger}
//               icon={weekChange != null && weekChange >= 0 ? TrendingUp : TrendingDown} delay="aps-delay3" />
//             <HeroStat label="Consistency" value={consistencyPct != null ? `${consistencyPct}%` : "—"}
//               sub="sessions ≥ 50 APS" color={T.violet} icon={Zap} delay="aps-delay4" />
//           </div>

//           {/* ── CHART + DONUT ROW ── */}
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>

//             {/* Main chart */}
//             <div className="aps-fade aps-delay2" style={{ ...glass, borderRadius: 20, overflow: "hidden" }}>
//               <div style={{ height: 3, background: T.gradPrimary, opacity: 0.7 }} />
//               <div style={{ padding: "20px 24px 8px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
//                 <div>
//                   <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.muted }}>
//                     {view === "bar" ? "Score Distribution" : "Performance Trend"}
//                   </p>
//                   <p style={{ fontSize: 15, fontWeight: 800, color: T.text, marginTop: 2 }}>
//                     Last {Math.min(30, history.length)} sessions
//                   </p>
//                 </div>
//                 <div style={{ display: "flex", gap: 12, fontSize: 10, fontWeight: 700 }}>
//                   {[["#10b981","≥80 Elite"],["#6366f1","50–79 Good"],["#f43f5e","<50 Low"]].map(([c,l]) => (
//                     <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
//                       <div style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
//                       <span style={{ color: T.muted }}>{l}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div style={{ padding: "8px 24px 20px" }}>
//                 {view === "bar"
//                   ? <APSBarChart data={history} />
//                   : <TrendLineChart data={history} />
//                 }
//               </div>
//             </div>

//             {/* Distribution donut */}
//             <div className="aps-fade aps-delay3" style={{ ...glass, borderRadius: 20, overflow: "hidden" }}>
//               <div style={{ height: 3, background: T.gradPrimary, opacity: 0.7 }} />
//               <div style={{ padding: "20px 22px" }}>
//                 <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.muted, marginBottom: 2 }}>Distribution</p>
//                 <p style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 20 }}>Score Breakdown</p>
//                 <DonutChart elite={elite} strong={strong} moderate={moderate} low={low} total={history.length} />

//                 {/* Mini stat grid */}
//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 20 }}>
//                   {[
//                     { label: "Streak",   val: `${Math.min(history.filter(h=>(h.apsScore??0)>=50).length, 7)} days`, color: T.success },
//                     { label: "30d Avg",  val: avgScore ?? "—", color: T.indigo },
//                     { label: "Best Run", val: bestScore ?? "—", color: T.violet },
//                     { label: "Total",    val: history.length, color: T.textMid },
//                   ].map(({ label, val, color }) => (
//                     <div key={label} style={{ background: "rgba(238,242,255,0.5)", border: `1px solid ${T.borderSoft}`, borderRadius: 10, padding: "10px 12px" }}>
//                       <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.muted, marginBottom: 4 }}>{label}</p>
//                       <p style={{ fontSize: 16, fontWeight: 900, color, fontFamily: "'Outfit', sans-serif" }}>{val}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ── RECOVERY TYPE BREAKDOWN ── */}
//           <div className="aps-fade aps-delay3" style={{ ...glass, borderRadius: 20, padding: "20px 24px" }}>
//             <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.muted, marginBottom: 2 }}>Recovery Breakdown</p>
//             <p style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 16 }}>Sessions by Recovery Type</p>
//             <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//               {["optimal","active","maintenance","rest","high_fatigue"].map(type => {
//                 const count = history.filter(h => h.recoveryType === type).length;
//                 if (!count) return null;
//                 const pct = Math.round((count / history.length) * 100);
//                 const color = recoveryColor(type);
//                 return (
//                   <div key={type} style={{
//                     flex: 1, minWidth: 100,
//                     padding: "14px 16px", borderRadius: 14,
//                     background: `${color}0d`, border: `1px solid ${color}2a`,
//                   }}>
//                     <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color, marginBottom: 6 }}>{type.replace(/_/g," ")}</p>
//                     <p style={{ fontSize: 24, fontWeight: 900, color, lineHeight: 1, fontFamily: "'Outfit', sans-serif" }}>{count}</p>
//                     <p style={{ fontSize: 10, color: T.muted, marginTop: 4 }}>{pct}% of sessions</p>
//                     <div style={{ marginTop: 8, height: 3, background: "rgba(226,232,240,0.6)", borderRadius: 99, overflow: "hidden" }}>
//                       <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99 }} />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* ── HISTORY LIST ── */}
//           <div>
//             {/* List header */}
//             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
//               <div>
//                 <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: T.text }}>Session Log</h2>
//                 <p style={{ fontSize: 11, color: T.muted, marginTop: 1 }}>{filtered.length} of {history.length} entries</p>
//               </div>

//               <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//                 {/* Filter */}
//                 <div style={{ display: "flex", background: "rgba(238,242,255,0.7)", borderRadius: 10, border: `1px solid ${T.borderSoft}`, overflow: "hidden" }}>
//                   {[["all","All"],["elite","Elite"],["strong","Strong"],["moderate","Mod"],["low","Low"]].map(([v,l]) => (
//                     <button key={v} onClick={() => setFilter(v)} style={{
//                       padding: "6px 11px", border: "none",
//                       background: filter === v ? "rgba(99,102,241,0.12)" : "transparent",
//                       color: filter === v ? T.indigo : T.muted,
//                       fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 700,
//                       cursor: "pointer", transition: "all 0.15s",
//                     }}>{l}</button>
//                   ))}
//                 </div>

//                 {/* Sort */}
//                 <button onClick={() => setSortDir(d => d === "desc" ? "asc" : "desc")} style={{
//                   display: "flex", alignItems: "center", gap: 5,
//                   padding: "6px 12px", borderRadius: 10,
//                   border: `1px solid ${T.borderSoft}`, background: "rgba(238,242,255,0.5)",
//                   color: T.textLight, fontFamily: "'Outfit', sans-serif",
//                   fontSize: 10, fontWeight: 700, cursor: "pointer",
//                 }}>
//                   {sortDir === "desc" ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
//                   {sortDir === "desc" ? "Newest" : "Oldest"}
//                 </button>
//               </div>
//             </div>

//             {/* Rows */}
//             <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//               {filtered.length === 0 ? (
//                 <div style={{ ...glass, borderRadius: 16, padding: "40px 24px", textAlign: "center" }}>
//                   <p style={{ fontSize: 13, color: T.muted }}>No sessions match this filter.</p>
//                 </div>
//               ) : (
//                 filtered.map((item, i) => (
//                   <HistoryRow key={item._id || item.date} item={item} index={i} />
//                 ))
//               )}
//             </div>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { apsAPI, workoutAPI } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import {
  Activity, TrendingUp, TrendingDown, Zap, Award,
  Calendar, ChevronDown, ChevronUp, Filter, BarChart2
} from "lucide-react";

/* ─────────────────────────────────────────────
   DESIGN TOKENS  (exact match to APS.jsx)
───────────────────────────────────────────── */
const T = {
  gradBody:    "linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #eef2ff 100%)",
  gradPrimary: "linear-gradient(135deg, #2563eb, #6366f1, #7c3aed)",
  indigo:      "#6366f1",
  blue:        "#2563eb",
  violet:      "#7c3aed",
  text:        "#0f172a",
  textMid:     "#475569",
  textLight:   "#64748b",
  muted:       "#94a3b8",
  borderSoft:  "#e0e7ff",
  borderLight: "rgba(255,255,255,0.9)",
  surface:     "rgba(255,255,255,0.82)",
  shadowCard:  "0 4px 32px rgba(99,102,241,0.10), 0 1px 6px rgba(0,0,0,0.05)",
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

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0);    }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes barGrow {
  from { transform: scaleY(0); }
  to   { transform: scaleY(1); }
}
@keyframes lineIn {
  from { stroke-dashoffset: 1200; }
  to   { stroke-dashoffset: 0; }
}
@keyframes countUp {
  from { opacity: 0; transform: scale(0.85); }
  to   { opacity: 1; transform: scale(1);    }
}
@keyframes gradientShift {
  0%   { background-position: 0% 50%;   }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%;   }
}
@keyframes pulse-ring {
  0%   { transform: scale(1);   opacity: 0.5; }
  100% { transform: scale(1.6); opacity: 0;   }
}

.aps-fade   { animation: fadeUp 0.4s ease forwards; }
.aps-delay1 { animation-delay: 0.05s; opacity: 0; }
.aps-delay2 { animation-delay: 0.10s; opacity: 0; }
.aps-delay3 { animation-delay: 0.15s; opacity: 0; }
.aps-delay4 { animation-delay: 0.20s; opacity: 0; }
.aps-count  { animation: countUp 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards; }

.row-hover:hover {
  background: rgba(99,102,241,0.04) !important;
  border-color: rgba(99,102,241,0.18) !important;
}
.bar-col:hover .bar-fill { opacity: 1 !important; }
.bar-col:hover .bar-tip  { opacity: 1 !important; transform: translateY(0) !important; }
`;

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const apsColor = (score) => {
  if (score == null) return T.muted;
  if (score >= 80) return T.success;
  if (score >= 50) return T.indigo;
  return T.danger;
};

const apsLabel = (score) => {
  if (score == null) return "—";
  if (score >= 80) return "Elite";
  if (score >= 65) return "Strong";
  if (score >= 50) return "Moderate";
  return "Low";
};

const recoveryColor = (type) => {
  if (!type) return T.muted;
  if (type === "optimal")     return T.success;
  if (type === "active")      return T.indigo;
  if (type === "maintenance") return T.amber;
  return T.danger;
};

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en", { month: "short", day: "numeric" });

const fmtDateFull = (d) =>
  new Date(d).toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric", year: "numeric" });

/* ─────────────────────────────────────────────
   SPARKLINE
───────────────────────────────────────────── */
function MiniSparkline({ data, color, height = 28 }) {
  if (!data || data.length < 2) return null;
  const W = 120, H = height;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / range) * (H - 6) - 3;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const last = pts[pts.length - 1].split(",");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: 60, height }}>
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r="2.5" fill={color} />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   BAR CHART (30-day APS)
───────────────────────────────────────────── */
function APSBarChart({ data }) {
  if (!data.length) return null;
  const recent = [...data].slice(0, 30).reverse();
  const max = Math.max(...recent.map(d => d.apsScore ?? 0), 100);

  return (
    <div style={{ position: "relative" }}>
      {/* Y-axis guides */}
      {[0, 25, 50, 75, 100].map(v => (
        <div key={v} style={{
          position: "absolute", left: 0, right: 0,
          bottom: `${(v / max) * 100}%`,
          borderTop: `1px dashed ${v === 0 ? "transparent" : "rgba(99,102,241,0.10)"}`,
          display: "flex", alignItems: "center",
        }}>
          <span style={{ fontSize: 8, color: T.muted, marginLeft: -20, width: 18, textAlign: "right" }}>{v}</span>
        </div>
      ))}

      <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 140, paddingLeft: 24, paddingBottom: 4 }}>
        {recent.map((item, i) => {
          const score = item.apsScore ?? 0;
          const pct   = Math.max((score / max) * 100, 2);
          const color = apsColor(score);
          return (
            <div key={i} className="bar-col"
              style={{ flex: 1, height: "100%", display: "flex", alignItems: "flex-end", position: "relative", cursor: "default" }}>
              {/* Tooltip */}
              <div className="bar-tip" style={{
                position: "absolute", bottom: "calc(100% + 8px)", left: "50%",
                transform: "translateX(-50%) translateY(4px)",
                background: "#0f172a", border: "1px solid rgba(99,102,241,0.3)",
                borderRadius: 8, padding: "6px 10px",
                fontSize: 10, whiteSpace: "nowrap", opacity: 0,
                pointerEvents: "none", zIndex: 10,
                transition: "opacity 0.15s, transform 0.15s",
                boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
              }}>
                <div style={{ fontWeight: 800, color: "white", fontSize: 12 }}>{score}</div>
                <div style={{ color: T.muted, fontSize: 9 }}>{fmtDate(item.date)}</div>
                <div style={{ color, fontSize: 9, fontWeight: 700, textTransform: "capitalize" }}>
                  {item.recoveryType || apsLabel(score)}
                </div>
              </div>
              {/* Bar */}
              <div className="bar-fill" style={{
                width: "100%", height: `${pct}%`,
                borderRadius: "4px 4px 0 0",
                background: `linear-gradient(to top, ${color}cc, ${color})`,
                opacity: 0.75,
                transformOrigin: "bottom",
                animation: `barGrow 0.5s cubic-bezier(0.34,1.2,0.64,1) ${i * 18}ms both`,
                transition: "opacity 0.2s",
              }} />
            </div>
          );
        })}
      </div>

      {/* X-axis dates */}
      <div style={{ display: "flex", gap: 3, paddingLeft: 24, marginTop: 6 }}>
        {recent.map((item, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 7.5, color: T.muted }}>
            {i % 5 === 0 ? fmtDate(item.date) : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LINE CHART (trend)
───────────────────────────────────────────── */
function TrendLineChart({ data }) {
  if (!data || data.length < 2) return null;
  const recent = [...data].slice(0, 30).reverse();
  const W = 560, H = 110;
  const scores = recent.map(d => d.apsScore ?? 0);
  const minS = Math.min(...scores), maxS = Math.max(...scores);
  const range = maxS - minS || 1;

  const pts = recent.map((d, i) => {
    const x = (i / (recent.length - 1)) * (W - 20) + 10;
    const y = H - 10 - ((d.apsScore ?? 0 - minS) / range) * (H - 20);
    return { x, y, d };
  });

  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const areaD = `${pathD} L ${pts[pts.length-1].x} ${H} L ${pts[0].x} ${H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: H, overflow: "visible" }}>
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={T.indigo} stopOpacity="0.18" />
          <stop offset="100%" stopColor={T.indigo} stopOpacity="0.01" />
        </linearGradient>
        <linearGradient id="strokeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={T.blue}   />
          <stop offset="50%"  stopColor={T.indigo}  />
          <stop offset="100%" stopColor={T.violet}  />
        </linearGradient>
      </defs>
      {/* Zone lines */}
      {[50, 80].map(zone => {
        const y = H - 10 - ((zone - minS) / range) * (H - 20);
        return y > 0 && y < H ? (
          <line key={zone} x1="10" y1={y} x2={W - 10} y2={y}
            stroke={zone === 80 ? T.success : T.amber}
            strokeWidth="1" strokeDasharray="3,4" opacity="0.35" />
        ) : null;
      })}
      {/* Area fill */}
      <path d={areaD} fill="url(#lineGrad)" />
      {/* Line */}
      <path d={pathD} fill="none" stroke="url(#strokeGrad)" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="1200" strokeDashoffset="1200"
        style={{ animation: "lineIn 1.2s ease forwards" }} />
      {/* Dots */}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill={apsColor(p.d.apsScore)} opacity="0.9" />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   DONUT CHART (distribution)
───────────────────────────────────────────── */
function DonutChart({ elite, strong, moderate, low, total }) {
  const R = 36, C = 44, stroke = 10;
  const circumference = 2 * Math.PI * R;
  const segments = [
    { pct: elite    / total, color: T.success, label: "Elite"    },
    { pct: strong   / total, color: T.indigo,  label: "Strong"   },
    { pct: moderate / total, color: T.amber,   label: "Moderate" },
    { pct: low      / total, color: T.danger,  label: "Low"      },
  ];
  let offset = 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <svg viewBox={`0 0 ${C * 2} ${C * 2}`} style={{ width: 88, height: 88, flexShrink: 0 }}>
        <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(226,232,240,0.6)" strokeWidth={stroke} />
        {segments.map((seg, i) => {
          if (!seg.pct) return null;
          const len = seg.pct * circumference;
          const el = (
            <circle key={i} cx={C} cy={C} r={R} fill="none"
              stroke={seg.color} strokeWidth={stroke}
              strokeDasharray={`${len} ${circumference - len}`}
              strokeDashoffset={circumference * 0.25 - offset * circumference}
              strokeLinecap="butt" />
          );
          offset += seg.pct;
          return el;
        })}
        <text x={C} y={C + 2} textAnchor="middle" fontSize="12" fontWeight="800"
          fill={T.text} fontFamily="'Outfit', sans-serif">{total}</text>
        <text x={C} y={C + 14} textAnchor="middle" fontSize="7" fill={T.muted}
          fontFamily="'Outfit', sans-serif">sessions</text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {segments.map(s => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: T.textLight, fontWeight: 600, width: 64 }}>{s.label}</span>
            <span style={{ fontSize: 11, fontWeight: 800, color: T.text }}>
              {Math.round(s.pct * total)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STAT HERO CARD
───────────────────────────────────────────── */
function HeroStat({ label, value, sub, color, icon: Icon, sparkData, delay = "" }) {
  return (
    <div className={`aps-fade ${delay}`} style={{
      ...glass, borderRadius: 20, padding: "22px 24px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: T.gradPrimary, opacity: 0.7 }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: `${color}18`,
            border: `1px solid ${color}33`, display: "flex", alignItems: "center",
            justifyContent: "center", marginBottom: 12 }}>
            <Icon size={18} color={color} />
          </div>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.muted, marginBottom: 4 }}>{label}</p>
          <p className="aps-count" style={{ fontSize: 32, fontWeight: 900, color, lineHeight: 1, fontFamily: "'Outfit', sans-serif" }}>{value}</p>
          {sub && <p style={{ fontSize: 11, color: T.textMid, marginTop: 5, lineHeight: 1.4 }}>{sub}</p>}
        </div>
        {sparkData && <MiniSparkline data={sparkData} color={color} />}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HISTORY ROW
───────────────────────────────────────────── */
function HistoryRow({ item, index }) {
  const [open, setOpen] = useState(false);
  const score = item.apsScore ?? 0;
  const color = apsColor(score);

  return (
    <div className="row-hover" style={{
      background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)",
      border: open ? "1.5px solid rgba(99,102,241,0.22)" : "1px solid rgba(226,232,240,0.9)",
      borderRadius: 14, overflow: "hidden",
      transition: "all 0.2s",
      boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
      animation: `fadeUp 0.35s ease ${index * 30}ms both`,
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", alignItems: "center", gap: 14,
        padding: "13px 18px", background: "transparent", border: "none",
        cursor: "pointer", textAlign: "left",
      }}>
        {/* Score badge */}
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: `linear-gradient(135deg, ${color}22, ${color}10)`,
          border: `1.5px solid ${color}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 15, fontWeight: 900, color, fontFamily: "'Outfit', sans-serif",
        }}>
          {score}
        </div>

        {/* Date + meta */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 3 }}>
            {fmtDateFull(item.date)}
          </p>
          <div style={{ display: "flex", gap: 10, fontSize: 11, color: T.muted, flexWrap: "wrap" }}>
            <span style={{ textTransform: "capitalize" }}>{item.recoveryType || "—"}</span>
            <span style={{ color: T.borderSoft }}>|</span>
            <span style={{ textTransform: "capitalize", color: apsColor(score), fontWeight: 600 }}>
              {apsLabel(score)}
            </span>
            {item.readinessCategory && (
              <>
                <span style={{ color: T.borderSoft }}>|</span>
                <span style={{ textTransform: "capitalize" }}>Readiness: {item.readinessCategory}</span>
              </>
            )}
          </div>
        </div>

        {/* Bar */}
        <div style={{ width: 90, flexShrink: 0 }}>
          <div style={{ height: 5, background: "rgba(226,232,240,0.8)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${score}%`, background: `linear-gradient(90deg, ${color}, ${color}bb)`, borderRadius: 999, transition: "width 0.8s ease" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3, fontSize: 8, color: T.muted }}>
            <span>0</span><span>100</span>
          </div>
        </div>

        {/* Score pill */}
        <div style={{
          padding: "4px 12px", borderRadius: 99,
          background: `${color}14`, border: `1px solid ${color}33`,
          fontSize: 10, fontWeight: 700, color,
          letterSpacing: "0.06em", textTransform: "uppercase", flexShrink: 0,
        }}>
          {apsLabel(score)}
        </div>

        <div style={{ color: T.muted, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }}>
          <ChevronDown size={15} />
        </div>
      </button>

      {/* Expanded detail */}
      {open && (
        <div style={{ padding: "0 18px 16px", borderTop: "1px solid rgba(226,232,240,0.7)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, paddingTop: 14 }}>
            {[
              { label: "APS Score",       val: item.apsScore ?? "—",  color: apsColor(item.apsScore) },
              { label: "Recovery Type",   val: item.recoveryType || "—", color: recoveryColor(item.recoveryType) },
              { label: "Readiness",       val: item.readinessCategory || "—", color: T.indigo },
              { label: "Date",            val: fmtDate(item.date), color: T.textMid },
            ].map(({ label, val, color: c }) => (
              <div key={label} style={{
                background: "rgba(238,242,255,0.55)", border: `1px solid ${T.borderSoft}`,
                borderRadius: 10, padding: "10px 12px",
              }}>
                <p style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.muted, marginBottom: 5 }}>{label}</p>
                <p style={{ fontSize: 14, fontWeight: 800, color: c, textTransform: "capitalize", lineHeight: 1 }}>{val}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function APSHistory() {
  const { user } = useAuth();
  const userId = user?._id || user?.id;

  const [history,  setHistory]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState("all");   // all | elite | strong | moderate | low
  const [range,    setRange]    = useState(30);       // 30 | 60 | 90
  const [sortDir,  setSortDir]  = useState("desc");  // desc | asc
  const [view,     setView]     = useState("bar");   // bar | line

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    apsAPI.getHistory(userId, range)
      .then(res => {
        // Normalize whatever shape the API returns into a plain array
        const raw = res.data;
        if (Array.isArray(raw))               return setHistory(raw);
        if (Array.isArray(raw?.history))       return setHistory(raw.history);
        if (Array.isArray(raw?.data))          return setHistory(raw.data);
        if (Array.isArray(raw?.apsHistory))    return setHistory(raw.apsHistory);
        if (Array.isArray(raw?.records))       return setHistory(raw.records);
        // Fallback: try to extract any array value from the object
        if (raw && typeof raw === "object") {
          const found = Object.values(raw).find(v => Array.isArray(v));
          if (found) return setHistory(found);
        }
        setHistory([]);
      })
      .catch(() => setHistory([]))
      .finally(() => setLoading(false));
  }, [userId, range]);

  /* ── Derived stats ── */
  const scores       = history.map(h => h.apsScore ?? 0).filter(Boolean);
  const avgScore     = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
  const bestScore    = scores.length ? Math.max(...scores) : null;
  const trend        = scores.length >= 2 ? scores[0] - scores[scores.length - 1] : 0;
  const last7        = history.slice(0, 7).map(h => h.apsScore ?? 0);
  const prev7        = history.slice(7, 14).map(h => h.apsScore ?? 0);
  const last7avg     = last7.length  ? Math.round(last7.reduce((a,b) => a+b,0)  / last7.length)  : null;
  const prev7avg     = prev7.length  ? Math.round(prev7.reduce((a,b) => a+b,0)  / prev7.length)  : null;
  const weekChange   = (last7avg != null && prev7avg != null) ? last7avg - prev7avg : null;
  const consistencyPct = history.length ? Math.round((history.filter(h => (h.apsScore ?? 0) >= 50).length / history.length) * 100) : null;

  const elite    = history.filter(h => (h.apsScore ?? 0) >= 80).length;
  const strong   = history.filter(h => (h.apsScore ?? 0) >= 65 && (h.apsScore ?? 0) < 80).length;
  const moderate = history.filter(h => (h.apsScore ?? 0) >= 50 && (h.apsScore ?? 0) < 65).length;
  const low      = history.filter(h => (h.apsScore ?? 0) < 50).length;

  const sparkScores = [...history].reverse().slice(-14).map(h => h.apsScore ?? 0);

  /* ── Filtered + sorted list ── */
  const filtered = history
    .filter(h => {
      if (filter === "all")      return true;
      if (filter === "elite")    return (h.apsScore ?? 0) >= 80;
      if (filter === "strong")   return (h.apsScore ?? 0) >= 65 && (h.apsScore ?? 0) < 80;
      if (filter === "moderate") return (h.apsScore ?? 0) >= 50 && (h.apsScore ?? 0) < 65;
      if (filter === "low")      return (h.apsScore ?? 0) < 50;
      return true;
    })
    .sort((a, b) => {
      const da = new Date(a.date), db = new Date(b.date);
      return sortDir === "desc" ? db - da : da - db;
    });

  /* ── Loading state ── */
  if (loading) {
    return (
      <>
        <style>{KEYFRAMES}</style>
        <div style={{ minHeight: "100vh", background: T.gradBody, fontFamily: "'Outfit', sans-serif",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", border: `3px solid ${T.borderSoft}`,
              borderTopColor: T.indigo, animation: "gradientShift 0.8s linear infinite",
              margin: "0 auto 16px" }} />
            <p style={{ fontSize: 13, color: T.muted, fontWeight: 600 }}>Loading performance history…</p>
          </div>
        </div>
      </>
    );
  }

  /* ── Empty state ── */
  if (!history.length) {
    return (
      <>
        <style>{KEYFRAMES}</style>
        <div style={{ minHeight: "100vh", background: T.gradBody, fontFamily: "'Outfit', sans-serif",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ ...glass, borderRadius: 24, padding: "60px 40px", textAlign: "center", maxWidth: 400 }} className="aps-fade">
            <div style={{ width: 60, height: 60, borderRadius: 16, background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.2)", display: "flex", alignItems: "center",
              justifyContent: "center", margin: "0 auto 20px" }}>
              <BarChart2 size={28} color={T.indigo} />
            </div>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: T.text, marginBottom: 8 }}>No History Yet</h2>
            <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.7 }}>
              Complete your first workout session to start tracking your Athlete Performance Score.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{KEYFRAMES}</style>

      {/* Background blobs */}
      <div style={{ position: "fixed", top: -100, right: -80, width: 380, height: 380, borderRadius: "50%", background: "rgba(99,102,241,0.07)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: -80, left: "15%", width: 280, height: 280, borderRadius: "50%", background: "rgba(124,58,237,0.05)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", top: "40%", left: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(37,99,235,0.04)", filter: "blur(50px)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ minHeight: "100vh", background: T.gradBody, fontFamily: "'Outfit', sans-serif",
        padding: "44px 24px 80px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: 32 }}>

          {/* ── PAGE HEADER ── */}
          <div className="aps-fade" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.indigo, marginBottom: 8 }}>◆ Performance Analytics</p>
              <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, color: T.text, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
                APS History
                <span style={{ display: "block", background: T.gradPrimary, WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent", backgroundClip: "text",
                  backgroundSize: "200% auto", animation: "gradientShift 3s linear infinite" }}>
                  &amp; Analytics
                </span>
              </h1>
              <p style={{ fontSize: 13, color: T.muted, marginTop: 6 }}>
                {history.length} sessions tracked · last updated {fmtDate(history[0]?.date)}
              </p>
            </div>

            {/* Controls */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              {/* Range */}
              {[30, 60, 90].map(r => (
                <button key={r} onClick={() => setRange(r)} style={{
                  padding: "7px 16px", borderRadius: 10,
                  border: `1.5px solid ${range === r ? T.indigo : T.borderSoft}`,
                  background: range === r ? "rgba(99,102,241,0.10)" : "rgba(238,242,255,0.5)",
                  color: range === r ? T.indigo : T.muted,
                  fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 700,
                  cursor: "pointer", transition: "all 0.15s",
                }}>
                  {r}d
                </button>
              ))}
              {/* Chart toggle */}
              <div style={{ display: "flex", background: "rgba(238,242,255,0.6)", borderRadius: 10,
                border: `1px solid ${T.borderSoft}`, overflow: "hidden" }}>
                {[["bar", "Bar"], ["line", "Trend"]].map(([v, l]) => (
                  <button key={v} onClick={() => setView(v)} style={{
                    padding: "7px 14px", border: "none",
                    background: view === v ? "rgba(99,102,241,0.12)" : "transparent",
                    color: view === v ? T.indigo : T.muted,
                    fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 700,
                    cursor: "pointer", transition: "all 0.15s",
                  }}>{l}</button>
                ))}
              </div>
            </div>
          </div>

          {/* ── HERO STATS ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            <HeroStat label="Avg APS Score" value={avgScore ?? "—"} sub={`across ${history.length} sessions`}
              color={apsColor(avgScore)} icon={Activity} sparkData={sparkScores} delay="aps-delay1" />
            <HeroStat label="Best Score" value={bestScore ?? "—"} sub="personal best"
              color={T.success} icon={Award} delay="aps-delay2" />
            <HeroStat label="This Week" value={last7avg ?? "—"} sub={weekChange != null
                ? `${weekChange >= 0 ? "+" : ""}${weekChange} vs last week` : "first week"}
              color={weekChange != null && weekChange >= 0 ? T.success : T.danger}
              icon={weekChange != null && weekChange >= 0 ? TrendingUp : TrendingDown} delay="aps-delay3" />
            <HeroStat label="Consistency" value={consistencyPct != null ? `${consistencyPct}%` : "—"}
              sub="sessions ≥ 50 APS" color={T.violet} icon={Zap} delay="aps-delay4" />
          </div>

          {/* ── CHART + DONUT ROW ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>

            {/* Main chart */}
            <div className="aps-fade aps-delay2" style={{ ...glass, borderRadius: 20, overflow: "hidden" }}>
              <div style={{ height: 3, background: T.gradPrimary, opacity: 0.7 }} />
              <div style={{ padding: "20px 24px 8px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.muted }}>
                    {view === "bar" ? "Score Distribution" : "Performance Trend"}
                  </p>
                  <p style={{ fontSize: 15, fontWeight: 800, color: T.text, marginTop: 2 }}>
                    Last {Math.min(30, history.length)} sessions
                  </p>
                </div>
                <div style={{ display: "flex", gap: 12, fontSize: 10, fontWeight: 700 }}>
                  {[["#10b981","≥80 Elite"],["#6366f1","50–79 Good"],["#f43f5e","<50 Low"]].map(([c,l]) => (
                    <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
                      <span style={{ color: T.muted }}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: "8px 24px 20px" }}>
                {view === "bar"
                  ? <APSBarChart data={history} />
                  : <TrendLineChart data={history} />
                }
              </div>
            </div>

            {/* Distribution donut */}
            <div className="aps-fade aps-delay3" style={{ ...glass, borderRadius: 20, overflow: "hidden" }}>
              <div style={{ height: 3, background: T.gradPrimary, opacity: 0.7 }} />
              <div style={{ padding: "20px 22px" }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.muted, marginBottom: 2 }}>Distribution</p>
                <p style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 20 }}>Score Breakdown</p>
                <DonutChart elite={elite} strong={strong} moderate={moderate} low={low} total={history.length} />

                {/* Mini stat grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 20 }}>
                  {[
                    { label: "Streak",   val: `${Math.min(history.filter(h=>(h.apsScore??0)>=50).length, 7)} days`, color: T.success },
                    { label: "30d Avg",  val: avgScore ?? "—", color: T.indigo },
                    { label: "Best Run", val: bestScore ?? "—", color: T.violet },
                    { label: "Total",    val: history.length, color: T.textMid },
                  ].map(({ label, val, color }) => (
                    <div key={label} style={{ background: "rgba(238,242,255,0.5)", border: `1px solid ${T.borderSoft}`, borderRadius: 10, padding: "10px 12px" }}>
                      <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.muted, marginBottom: 4 }}>{label}</p>
                      <p style={{ fontSize: 16, fontWeight: 900, color, fontFamily: "'Outfit', sans-serif" }}>{val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── RECOVERY TYPE BREAKDOWN ── */}
          <div className="aps-fade aps-delay3" style={{ ...glass, borderRadius: 20, padding: "20px 24px" }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.muted, marginBottom: 2 }}>Recovery Breakdown</p>
            <p style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 16 }}>Sessions by Recovery Type</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["optimal","active","maintenance","rest","high_fatigue"].map(type => {
                const count = history.filter(h => h.recoveryType === type).length;
                if (!count) return null;
                const pct = Math.round((count / history.length) * 100);
                const color = recoveryColor(type);
                return (
                  <div key={type} style={{
                    flex: 1, minWidth: 100,
                    padding: "14px 16px", borderRadius: 14,
                    background: `${color}0d`, border: `1px solid ${color}2a`,
                  }}>
                    <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color, marginBottom: 6 }}>{type.replace(/_/g," ")}</p>
                    <p style={{ fontSize: 24, fontWeight: 900, color, lineHeight: 1, fontFamily: "'Outfit', sans-serif" }}>{count}</p>
                    <p style={{ fontSize: 10, color: T.muted, marginTop: 4 }}>{pct}% of sessions</p>
                    <div style={{ marginTop: 8, height: 3, background: "rgba(226,232,240,0.6)", borderRadius: 99, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── HISTORY LIST ── */}
          <div>
            {/* List header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
              <div>
                <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: T.text }}>Session Log</h2>
                <p style={{ fontSize: 11, color: T.muted, marginTop: 1 }}>{filtered.length} of {history.length} entries</p>
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {/* Filter */}
                <div style={{ display: "flex", background: "rgba(238,242,255,0.7)", borderRadius: 10, border: `1px solid ${T.borderSoft}`, overflow: "hidden" }}>
                  {[["all","All"],["elite","Elite"],["strong","Strong"],["moderate","Mod"],["low","Low"]].map(([v,l]) => (
                    <button key={v} onClick={() => setFilter(v)} style={{
                      padding: "6px 11px", border: "none",
                      background: filter === v ? "rgba(99,102,241,0.12)" : "transparent",
                      color: filter === v ? T.indigo : T.muted,
                      fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 700,
                      cursor: "pointer", transition: "all 0.15s",
                    }}>{l}</button>
                  ))}
                </div>

                {/* Sort */}
                <button onClick={() => setSortDir(d => d === "desc" ? "asc" : "desc")} style={{
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "6px 12px", borderRadius: 10,
                  border: `1px solid ${T.borderSoft}`, background: "rgba(238,242,255,0.5)",
                  color: T.textLight, fontFamily: "'Outfit', sans-serif",
                  fontSize: 10, fontWeight: 700, cursor: "pointer",
                }}>
                  {sortDir === "desc" ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
                  {sortDir === "desc" ? "Newest" : "Oldest"}
                </button>
              </div>
            </div>

            {/* Rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {filtered.length === 0 ? (
                <div style={{ ...glass, borderRadius: 16, padding: "40px 24px", textAlign: "center" }}>
                  <p style={{ fontSize: 13, color: T.muted }}>No sessions match this filter.</p>
                </div>
              ) : (
                filtered.map((item, i) => (
                  <HistoryRow key={item._id || item.date} item={item} index={i} />
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}