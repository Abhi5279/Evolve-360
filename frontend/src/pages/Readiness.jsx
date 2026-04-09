// // // // import { useEffect, useState } from "react";
// // // // import { readinessAPI } from "../api/axios";
// // // // import { useAuth } from "../context/AuthContext";

// // // // export default function Readiness() {
// // // //   const { user } = useAuth();

// // // //   const today = new Date().toISOString().split("T")[0];

// // // //   const [form, setForm] = useState({
// // // //     sleepHours: "",
// // // //     stressLevel: "medium",
// // // //     subjectiveFeeling: "normal",
// // // //     restingHeartRate: "",
// // // //     hydrationLevelPercent: 70,
// // // //   });

// // // //   const [history, setHistory] = useState([]);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState("");

// // // //   const handleChange = (e) => {
// // // //     setForm((prev) => ({
// // // //       ...prev,
// // // //       [e.target.name]: e.target.value,
// // // //     }));
// // // //   };

// // // //   const fetchHistory = async () => {
// // // //     try {
// // // //       const res = await readinessAPI.getHistory(user.id);
// // // //       setHistory(res.data);
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchHistory();
// // // //   }, []);

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     setError("");
// // // //     setLoading(true);

// // // //     try {
// // // //       await readinessAPI.submit({
// // // //         userId: user.id,
// // // //         date: today,
// // // //         ...form,
// // // //       });

// // // //       await fetchHistory();

// // // //       alert("Readiness submitted");

// // // //     } catch (err) {
// // // //       setError(err.message || "Failed to submit readiness");
// // // //     }

// // // //     setLoading(false);
// // // //   };

// // // //   return (
// // // //     <div>

// // // //       <h1 className="text-3xl font-bold mb-8">
// // // //         Daily Readiness
// // // //       </h1>

// // // //       {/* Form */}
// // // //       <div className="card mb-10">

// // // //         {error && (
// // // //           <div className="mb-4 p-3 text-sm bg-red-100 text-red-600 rounded-lg">
// // // //             {error}
// // // //           </div>
// // // //         )}

// // // //         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">

// // // //           <input
// // // //             type="number"
// // // //             name="sleepHours"
// // // //             placeholder="Sleep Hours"
// // // //             required
// // // //             value={form.sleepHours}
// // // //             onChange={handleChange}
// // // //             className="input-field"
// // // //           />

// // // //           <select
// // // //             name="stressLevel"
// // // //             value={form.stressLevel}
// // // //             onChange={handleChange}
// // // //             className="input-field"
// // // //           >
// // // //             <option value="low">Low Stress</option>
// // // //             <option value="medium">Medium Stress</option>
// // // //             <option value="high">High Stress</option>
// // // //           </select>

// // // //           <select
// // // //             name="subjectiveFeeling"
// // // //             value={form.subjectiveFeeling}
// // // //             onChange={handleChange}
// // // //             className="input-field"
// // // //           >
// // // //             <option value="fresh">Fresh</option>
// // // //             <option value="normal">Normal</option>
// // // //             <option value="tired">Tired</option>
// // // //           </select>

// // // //           <input
// // // //             type="number"
// // // //             name="restingHeartRate"
// // // //             placeholder="Resting Heart Rate"
// // // //             value={form.restingHeartRate}
// // // //             onChange={handleChange}
// // // //             className="input-field"
// // // //           />

// // // //           <input
// // // //             type="number"
// // // //             name="hydrationLevelPercent"
// // // //             placeholder="Hydration %"
// // // //             value={form.hydrationLevelPercent}
// // // //             onChange={handleChange}
// // // //             className="input-field"
// // // //           />

// // // //           <button
// // // //             type="submit"
// // // //             disabled={loading}
// // // //             className="btn-primary col-span-2"
// // // //           >
// // // //             {loading ? "Submitting..." : "Submit Readiness"}
// // // //           </button>

// // // //         </form>

// // // //       </div>

// // // //       {/* History */}
// // // //       <div>

// // // //         <h2 className="text-2xl font-semibold mb-4">
// // // //           Last 30 Days
// // // //         </h2>

// // // //         <div className="space-y-3">
// // // //           {history.map((item) => (
// // // //             <div key={item._id} className="card flex justify-between">
// // // //               <span>
// // // //                 {new Date(item.date).toLocaleDateString()}
// // // //               </span>
// // // //               <span>
// // // //                 Score: <strong>{item.readinessScore}</strong>
// // // //               </span>
// // // //               <span>
// // // //                 {item.readinessCategory}
// // // //               </span>
// // // //             </div>
// // // //           ))}
// // // //         </div>

// // // //       </div>

// // // //     </div>
// // // //   );
// // // // }


// // // import { useEffect, useState } from "react";
// // // import { readinessAPI } from "../api/axios";
// // // import { useAuth } from "../context/AuthContext";

// // // export default function Readiness() {
// // //   const { user } = useAuth();
// // //   const today = new Date().toISOString().split("T")[0];

// // //   const [form, setForm] = useState({
// // //     sleepHours: "",
// // //     stressLevel: "medium",
// // //     subjectiveFeeling: 7, // numeric now
// // //     restingHeartRate: "",
// // //     hydrationLevelPercent: 70,
// // //   });

// // //   const [history, setHistory] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState("");

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;

// // //     setForm((prev) => ({
// // //       ...prev,
// // //       [name]:
// // //         name === "sleepHours" ||
// // //         name === "restingHeartRate" ||
// // //         name === "hydrationLevelPercent" ||
// // //         name === "subjectiveFeeling"
// // //           ? Number(value)
// // //           : value,
// // //     }));
// // //   };

// // //   /* ================= FETCH HISTORY ================= */

// // //   const fetchHistory = async () => {
// // //     try {
// // //       const res = await readinessAPI.getHistory(user.id);
// // //       setHistory(res.data);
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     if (user?.id) fetchHistory();
// // //   }, [user]);

// // //   /* ================= SUBMIT ================= */

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setError("");
// // //     setLoading(true);

// // //     try {
// // //       await readinessAPI.submit({
// // //         userId: user.id,
// // //         date: today,
// // //         ...form,
// // //       });

// // //       await fetchHistory();
// // //     } catch (err) {
// // //       setError(
// // //         err.response?.data?.message || "Failed to submit readiness"
// // //       );
// // //     }

// // //     setLoading(false);
// // //   };

// // //   /* ================= CATEGORY COLOR ================= */

// // //   const getCategoryColor = (category) => {
// // //     switch (category) {
// // //       case "high":
// // //         return "text-green-400 bg-green-500/10 border-green-500/30";
// // //       case "moderate":
// // //         return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30";
// // //       case "low":
// // //         return "text-red-400 bg-red-500/10 border-red-500/30";
// // //       default:
// // //         return "text-gray-400 bg-gray-500/10 border-gray-500/30";
// // //     }
// // //   };

// // //   return (
// // //     <div className="max-w-5xl mx-auto p-6">

// // //       <h1 className="text-3xl font-bold mb-8">
// // //         Daily Readiness
// // //       </h1>

// // //       {/* ================= FORM ================= */}

// // //       <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-10 shadow-lg">

// // //         {error && (
// // //           <div className="mb-4 p-3 text-sm bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg">
// // //             {error}
// // //           </div>
// // //         )}

// // //         <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

// // //           <div>
// // //             <label className="text-sm text-gray-400 block mb-1">
// // //               Sleep Hours
// // //             </label>
// // //             <input
// // //               type="number"
// // //               name="sleepHours"
// // //               required
// // //               value={form.sleepHours}
// // //               onChange={handleChange}
// // //               className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // //             />
// // //           </div>

// // //           <div>
// // //             <label className="text-sm text-gray-400 block mb-1">
// // //               Stress Level
// // //             </label>
// // //             <select
// // //               name="stressLevel"
// // //               value={form.stressLevel}
// // //               onChange={handleChange}
// // //               className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2"
// // //             >
// // //               <option value="low">Low</option>
// // //               <option value="medium">Medium</option>
// // //               <option value="high">High</option>
// // //             </select>
// // //           </div>

// // //           <div>
// // //             <label className="text-sm text-gray-400 block mb-1">
// // //               Subjective Feeling (1-10)
// // //             </label>
// // //             <input
// // //               type="number"
// // //               name="subjectiveFeeling"
// // //               min="1"
// // //               max="10"
// // //               value={form.subjectiveFeeling}
// // //               onChange={handleChange}
// // //               className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2"
// // //             />
// // //           </div>

// // //           <div>
// // //             <label className="text-sm text-gray-400 block mb-1">
// // //               Resting Heart Rate
// // //             </label>
// // //             <input
// // //               type="number"
// // //               name="restingHeartRate"
// // //               value={form.restingHeartRate}
// // //               onChange={handleChange}
// // //               className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2"
// // //             />
// // //           </div>

// // //           <div>
// // //             <label className="text-sm text-gray-400 block mb-1">
// // //               Hydration %
// // //             </label>
// // //             <input
// // //               type="number"
// // //               name="hydrationLevelPercent"
// // //               min="0"
// // //               max="100"
// // //               value={form.hydrationLevelPercent}
// // //               onChange={handleChange}
// // //               className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2"
// // //             />
// // //           </div>

// // //           <button
// // //             type="submit"
// // //             disabled={loading}
// // //             className="col-span-2 bg-indigo-600 hover:bg-indigo-700 transition rounded-xl py-3 font-semibold"
// // //           >
// // //             {loading ? "Submitting..." : "Submit Readiness"}
// // //           </button>

// // //         </form>

// // //       </div>

// // //       {/* ================= HISTORY ================= */}

// // //       <h2 className="text-2xl font-semibold mb-6">
// // //         Last 30 Days
// // //       </h2>

// // //       <div className="space-y-4">
// // //         {history.length === 0 && (
// // //           <p className="text-gray-400">No readiness data found.</p>
// // //         )}

// // //         {history.map((item) => (
// // //           <div
// // //             key={item._id}
// // //             className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex justify-between items-center shadow"
// // //           >
// // //             <div>
// // //               <p className="font-medium">
// // //                 {new Date(item.date).toLocaleDateString()}
// // //               </p>
// // //               <p className="text-sm text-gray-400">
// // //                 Sleep: {item.sleepHours}h | HR: {item.restingHeartRate || "-"}
// // //               </p>
// // //             </div>

// // //             <div className="text-right">
// // //               <p className="text-lg font-bold">
// // //                 {item.readinessScore}
// // //               </p>
// // //               <span
// // //                 className={`text-xs px-3 py-1 rounded-full border ${getCategoryColor(
// // //                   item.readinessCategory
// // //                 )}`}
// // //               >
// // //                 {item.readinessCategory}
// // //               </span>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>

// // //     </div>
// // //   );
// // // }



// // import { useEffect, useState } from "react";
// // import { readinessAPI } from "../api/axios";
// // import { useAuth } from "../context/AuthContext";

// // /* ─────────────────────────────────────────────
// //    MINI SPARKLINE (pure SVG, no deps)
// // ───────────────────────────────────────────── */
// // function Sparkline({ data, color = "#f97316", height = 40 }) {
// //   if (!data || data.length < 2) return null;
// //   const w = 200, h = height;
// //   const min = Math.min(...data);
// //   const max = Math.max(...data);
// //   const range = max - min || 1;
// //   const pts = data.map((v, i) => {
// //     const x = (i / (data.length - 1)) * w;
// //     const y = h - ((v - min) / range) * (h - 6) - 3;
// //     return `${x},${y}`;
// //   });
// //   return (
// //     <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }}>
// //       <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
// //       <circle cx={pts[pts.length - 1].split(",")[0]} cy={pts[pts.length - 1].split(",")[1]} r="3" fill={color} />
// //     </svg>
// //   );
// // }

// // /* ─────────────────────────────────────────────
// //    BAR CHART (readiness score over time)
// // ───────────────────────────────────────────── */
// // function ReadinessBarChart({ history }) {
// //   if (!history || history.length === 0) return null;
// //   const recent = [...history].reverse().slice(0, 14);
// //   const max = 100;

// //   const catColor = (cat) => {
// //     if (cat === "high")     return "#22c55e";
// //     if (cat === "moderate") return "#eab308";
// //     if (cat === "low")      return "#ef4444";
// //     return "#6b7280";
// //   };

// //   return (
// //     <div className="space-y-2">
// //       <div className="flex items-end gap-1.5 h-28">
// //         {recent.map((item, i) => {
// //           const score = item.readinessScore ?? 0;
// //           const pct   = (score / max) * 100;
// //           const color = catColor(item.readinessCategory);
// //           return (
// //             <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
// //               {/* Tooltip */}
// //               <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 rounded-lg px-2 py-1.5 text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
// //                 <p className="font-bold">{score}</p>
// //                 <p className="text-gray-400">{new Date(item.date).toLocaleDateString("en", { month: "short", day: "numeric" })}</p>
// //               </div>
// //               <div
// //                 className="w-full rounded-t-md transition-all duration-300"
// //                 style={{ height: `${Math.max(pct, 4)}%`, backgroundColor: color, opacity: 0.85 }}
// //               />
// //             </div>
// //           );
// //         })}
// //       </div>
// //       <div className="flex gap-1.5">
// //         {recent.map((item, i) => (
// //           <div key={i} className="flex-1 text-center text-[9px] text-gray-600 truncate">
// //             {new Date(item.date).toLocaleDateString("en", { day: "numeric" })}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────
// //    STAT SUMMARY CARD
// // ───────────────────────────────────────────── */
// // function StatCard({ label, value, sub, color, sparkData, sparkColor }) {
// //   const colors = {
// //     orange: "border-orange-500/40 bg-orange-500/10",
// //     blue:   "border-blue-500/40 bg-blue-500/10",
// //     green:  "border-green-500/40 bg-green-500/10",
// //     purple: "border-purple-500/40 bg-purple-500/10",
// //   };
// //   const textColors = {
// //     orange: "text-orange-400", blue: "text-blue-400", green: "text-green-400", purple: "text-purple-400",
// //   };
// //   return (
// //     <div className={`rounded-xl border px-4 pt-4 pb-3 ${colors[color]}`}>
// //       <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{label}</p>
// //       <p className={`text-2xl font-black ${textColors[color]}`}>{value ?? "—"}</p>
// //       {sub && <p className="text-gray-500 text-xs mt-0.5">{sub}</p>}
// //       {sparkData && sparkData.length > 1 && (
// //         <div className="mt-2 opacity-70">
// //           <Sparkline data={sparkData} color={sparkColor ?? "#f97316"} height={28} />
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────
// //    CATEGORY BADGE
// // ───────────────────────────────────────────── */
// // function CategoryBadge({ category }) {
// //   const cls = {
// //     high:     "text-green-400 bg-green-500/10 border-green-500/30",
// //     moderate: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
// //     low:      "text-red-400 bg-red-500/10 border-red-500/30",
// //   }[category] ?? "text-gray-400 bg-gray-500/10 border-gray-500/30";

// //   return (
// //     <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-widest ${cls}`}>
// //       {category ?? "—"}
// //     </span>
// //   );
// // }

// // /* ─────────────────────────────────────────────
// //    FEELING SELECTOR (1–10 pill grid)
// // ───────────────────────────────────────────── */
// // function FeelingSelector({ value, onChange }) {
// //   return (
// //     <div className="grid grid-cols-10 gap-1">
// //       {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
// //         const active = value === n;
// //         const color =
// //           n <= 3 ? (active ? "bg-red-500 border-red-400 text-white" : "border-red-500/30 text-red-400 hover:bg-red-500/10")
// //           : n <= 6 ? (active ? "bg-yellow-500 border-yellow-400 text-white" : "border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10")
// //           : (active ? "bg-green-500 border-green-400 text-white" : "border-green-500/30 text-green-400 hover:bg-green-500/10");
// //         return (
// //           <button
// //             key={n}
// //             type="button"
// //             onClick={() => onChange(n)}
// //             className={`rounded-lg py-2 text-xs font-bold border transition-all ${color}`}
// //           >
// //             {n}
// //           </button>
// //         );
// //       })}
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────
// //    STRESS SELECTOR
// // ───────────────────────────────────────────── */
// // function StressSelector({ value, onChange }) {
// //   const opts = [
// //     { val: "low",    label: "Low",    emoji: "😌", cls: "border-green-500/40 text-green-400",  active: "bg-green-500 border-green-400 text-white" },
// //     { val: "medium", label: "Medium", emoji: "😐", cls: "border-yellow-500/40 text-yellow-400", active: "bg-yellow-500 border-yellow-400 text-white" },
// //     { val: "high",   label: "High",   emoji: "😤", cls: "border-red-500/40 text-red-400",       active: "bg-red-500 border-red-400 text-white" },
// //   ];
// //   return (
// //     <div className="grid grid-cols-3 gap-2">
// //       {opts.map(({ val, label, emoji, cls, active }) => (
// //         <button
// //           key={val}
// //           type="button"
// //           onClick={() => onChange(val)}
// //           className={`flex flex-col items-center gap-1 py-3 rounded-xl border text-xs font-bold transition-all ${value === val ? active : `${cls} hover:opacity-80`}`}
// //         >
// //           <span className="text-lg">{emoji}</span>
// //           {label}
// //         </button>
// //       ))}
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────
// //    SLIDER INPUT
// // ───────────────────────────────────────────── */
// // function SliderInput({ label, name, value, min, max, unit, onChange, color = "accent-orange-500" }) {
// //   const pct = ((value - min) / (max - min)) * 100;
// //   return (
// //     <div className="space-y-2">
// //       <div className="flex justify-between text-xs">
// //         <span className="text-gray-400 font-semibold">{label}</span>
// //         <span className="text-white font-black">{value}{unit}</span>
// //       </div>
// //       <input
// //         type="range"
// //         name={name}
// //         min={min}
// //         max={max}
// //         value={value}
// //         onChange={onChange}
// //         className={`w-full h-2 rounded-full appearance-none bg-gray-700 cursor-pointer ${color}`}
// //         style={{
// //           background: `linear-gradient(to right, #f97316 ${pct}%, #374151 ${pct}%)`
// //         }}
// //       />
// //       <div className="flex justify-between text-[10px] text-gray-600">
// //         <span>{min}{unit}</span><span>{max}{unit}</span>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────
// //    HISTORY ROW
// // ───────────────────────────────────────────── */
// // function HistoryRow({ item, index }) {
// //   const [open, setOpen] = useState(false);
// //   const score = item.readinessScore ?? 0;
// //   const barColor =
// //     item.readinessCategory === "high"     ? "bg-green-500"
// //     : item.readinessCategory === "moderate" ? "bg-yellow-500"
// //     : "bg-red-500";

// //   return (
// //     <div className={`rounded-xl border overflow-hidden transition-all ${open ? "border-orange-500/40 bg-gray-800/90" : "border-gray-700/40 bg-gray-800/40 hover:border-gray-600/60"}`}>
// //       <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition-colors">
// //         {/* Score bar */}
// //         <div className="shrink-0 w-10 h-10 rounded-lg bg-gray-700/60 flex items-center justify-center">
// //           <span className="text-white text-sm font-black">{score}</span>
// //         </div>

// //         {/* Date + quick stats */}
// //         <div className="flex-1 text-left">
// //           <p className="text-white text-sm font-bold">
// //             {new Date(item.date).toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" })}
// //           </p>
// //           <div className="flex gap-3 mt-0.5">
// //             <span className="text-gray-500 text-xs">😴 {item.sleepHours}h</span>
// //             {item.restingHeartRate && <span className="text-gray-500 text-xs">❤️ {item.restingHeartRate} bpm</span>}
// //             <span className="text-gray-500 text-xs">💧 {item.hydrationLevelPercent}%</span>
// //           </div>
// //         </div>

// //         {/* Score mini-bar */}
// //         <div className="w-20 hidden sm:block">
// //           <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
// //             <div className={`h-full rounded-full ${barColor}`} style={{ width: `${score}%` }} />
// //           </div>
// //         </div>

// //         <CategoryBadge category={item.readinessCategory} />
// //         <span className={`text-gray-500 text-sm transition-transform duration-200 ml-1 ${open ? "rotate-180" : ""}`}>▾</span>
// //       </button>

// //       {open && (
// //         <div className="px-5 pb-5 border-t border-gray-700/30 pt-4">
// //           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
// //             {[
// //               { label: "Readiness Score", val: item.readinessScore, sub: item.readinessCategory },
// //               { label: "Sleep Hours",     val: `${item.sleepHours}h` },
// //               { label: "Feeling (1–10)",  val: item.subjectiveFeeling },
// //               { label: "Stress Level",    val: item.stressLevel },
// //               { label: "Resting HR",      val: item.restingHeartRate ? `${item.restingHeartRate} bpm` : "—" },
// //               { label: "Hydration",       val: `${item.hydrationLevelPercent}%` },
// //             ].map(({ label, val, sub }) => (
// //               <div key={label} className="bg-gray-900/60 rounded-lg px-3 py-3 border border-gray-700/40">
// //                 <p className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold">{label}</p>
// //                 <p className="text-white text-sm font-black mt-1 capitalize">{val ?? "—"}</p>
// //                 {sub && <p className="text-gray-500 text-[10px] capitalize mt-0.5">{sub}</p>}
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────
// //    MAIN PAGE
// // ───────────────────────────────────────────── */
// // export default function Readiness() {
// //   const { user } = useAuth();
// //   const today = new Date().toISOString().split("T")[0];

// //   const [form, setForm] = useState({
// //     sleepHours:            7,
// //     stressLevel:           "medium",
// //     subjectiveFeeling:     7,
// //     restingHeartRate:      "",
// //     hydrationLevelPercent: 70,
// //   });

// //   const [history, setHistory] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error,   setError]   = useState("");
// //   const [success, setSuccess] = useState(false);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setForm((prev) => ({
// //       ...prev,
// //       [name]: ["sleepHours", "restingHeartRate", "hydrationLevelPercent", "subjectiveFeeling"].includes(name)
// //         ? Number(value) : value,
// //     }));
// //   };

// //   const fetchHistory = async () => {
// //     try {
// //       const res = await readinessAPI.getHistory(user.id);
// //       setHistory(res.data);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   useEffect(() => {
// //     if (user?.id) fetchHistory();
// //   }, [user]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);
// //     try {
// //       await readinessAPI.submit({ userId: user.id, date: today, ...form });
// //       setSuccess(true);
// //       setTimeout(() => setSuccess(false), 3000);
// //       await fetchHistory();
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Failed to submit readiness");
// //     }
// //     setLoading(false);
// //   };

// //   /* ── derived stats ── */
// //   const latest       = history[0];
// //   const avgScore     = history.length ? Math.round(history.reduce((a, b) => a + (b.readinessScore ?? 0), 0) / history.length) : null;
// //   const avgSleep     = history.length ? (history.reduce((a, b) => a + (b.sleepHours ?? 0), 0) / history.length).toFixed(1) : null;
// //   const scoreHistory = [...history].reverse().map((h) => h.readinessScore ?? 0);
// //   const sleepHistory = [...history].reverse().map((h) => h.sleepHours ?? 0);

// //   const inp = "w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/60 focus:bg-gray-700/80 transition-all";

// //   return (
// //     <div className="min-h-screen bg-gray-950 text-white">
// //       <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

// //         {/* ── HERO HEADER ── */}
// //         <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/60 shadow-2xl p-8">
// //           <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

// //           <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
// //             <div className="space-y-2">
// //               <p className="text-orange-400 text-xs font-semibold tracking-[0.2em] uppercase">Recovery Tracker</p>
// //               <h1 className="text-3xl font-black text-white tracking-tight">Daily Readiness</h1>
// //               <p className="text-gray-400 text-sm">{today} · How is your body feeling today?</p>
// //             </div>

// //             {latest && (
// //               <div className="flex gap-3 flex-wrap">
// //                 <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-center">
// //                   <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Last Score</p>
// //                   <p className="text-2xl font-black text-white">{latest.readinessScore}</p>
// //                   <CategoryBadge category={latest.readinessCategory} />
// //                 </div>
// //                 <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-center">
// //                   <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">30-Day Avg</p>
// //                   <p className="text-2xl font-black text-white">{avgScore ?? "—"}</p>
// //                   <p className="text-gray-500 text-[10px] mt-1">{history.length} entries</p>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* ── STATS ROW ── */}
// //         {history.length > 0 && (
// //           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
// //             <StatCard label="Avg Score"    value={avgScore}   sub="30-day"   color="orange" sparkData={scoreHistory} sparkColor="#f97316" />
// //             <StatCard label="Avg Sleep"    value={`${avgSleep}h`} sub="per night" color="blue"   sparkData={sleepHistory} sparkColor="#3b82f6" />
// //             <StatCard label="Last Feeling" value={`${latest?.subjectiveFeeling}/10`} sub="subjective" color="green"  />
// //             <StatCard label="Last HR"      value={latest?.restingHeartRate ? `${latest.restingHeartRate}` : "—"} sub="bpm resting" color="purple" />
// //           </div>
// //         )}

// //         <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

// //           {/* ── FORM ── */}
// //           <div className="lg:col-span-2">
// //             <div className="rounded-2xl border border-gray-700/50 bg-gray-800/60 overflow-hidden sticky top-6">
// //               <div className="px-6 py-4 border-b border-gray-700/40 flex items-center gap-3">
// //                 <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">🧠</div>
// //                 <h2 className="text-white font-black text-lg">Check-in</h2>
// //               </div>

// //               {error && (
// //                 <div className="mx-6 mt-4 p-3 text-sm bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl">{error}</div>
// //               )}

// //               <form onSubmit={handleSubmit} className="p-6 space-y-6">

// //                 {/* Sleep slider */}
// //                 <SliderInput
// //                   label="Sleep Hours"
// //                   name="sleepHours"
// //                   value={form.sleepHours}
// //                   min={0} max={12} unit="h"
// //                   onChange={handleChange}
// //                 />

// //                 {/* Hydration slider */}
// //                 <SliderInput
// //                   label="Hydration Level"
// //                   name="hydrationLevelPercent"
// //                   value={form.hydrationLevelPercent}
// //                   min={0} max={100} unit="%"
// //                   onChange={handleChange}
// //                 />

// //                 {/* Resting HR */}
// //                 <div className="space-y-2">
// //                   <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Resting Heart Rate (bpm)</label>
// //                   <input
// //                     type="number"
// //                     name="restingHeartRate"
// //                     placeholder="e.g. 58"
// //                     value={form.restingHeartRate}
// //                     onChange={handleChange}
// //                     className={inp}
// //                   />
// //                 </div>

// //                 {/* Stress selector */}
// //                 <div className="space-y-2">
// //                   <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Stress Level</label>
// //                   <StressSelector value={form.stressLevel} onChange={(v) => setForm({ ...form, stressLevel: v })} />
// //                 </div>

// //                 {/* Feeling selector */}
// //                 <div className="space-y-2">
// //                   <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">How do you feel? (1–10)</label>
// //                   <FeelingSelector value={form.subjectiveFeeling} onChange={(v) => setForm({ ...form, subjectiveFeeling: v })} />
// //                 </div>

// //                 <button
// //                   type="submit"
// //                   disabled={loading}
// //                   className="w-full px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 active:scale-95 transition-all text-white text-sm font-bold shadow-lg shadow-orange-500/30 disabled:opacity-50"
// //                 >
// //                   {loading ? "Submitting..." : success ? "✓ Logged!" : "Submit Check-in"}
// //                 </button>
// //               </form>
// //             </div>
// //           </div>

// //           {/* ── CHART + HISTORY ── */}
// //           <div className="lg:col-span-3 space-y-6">

// //             {/* Bar chart card */}
// //             {history.length > 0 && (
// //               <div className="rounded-2xl border border-gray-700/50 bg-gray-800/60 overflow-hidden">
// //                 <div className="px-6 py-4 border-b border-gray-700/40 flex items-center justify-between">
// //                   <div className="flex items-center gap-3">
// //                     <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">📊</div>
// //                     <h2 className="text-white font-black text-lg">Score Trend</h2>
// //                   </div>
// //                   <div className="flex gap-3 text-[10px] font-semibold uppercase tracking-wide">
// //                     <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" />High</span>
// //                     <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" />Moderate</span>
// //                     <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" />Low</span>
// //                   </div>
// //                 </div>
// //                 <div className="px-6 pb-6 pt-4">
// //                   <ReadinessBarChart history={history} />
// //                 </div>
// //               </div>
// //             )}

// //             {/* History list */}
// //             <div className="space-y-3">
// //               <div className="flex items-center justify-between">
// //                 <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Last 30 Days</p>
// //                 <span className="text-gray-600 text-xs">{history.length} entries</span>
// //               </div>

// //               {history.length === 0 ? (
// //                 <div className="rounded-2xl border border-dashed border-gray-700 bg-gray-800/30 py-16 flex flex-col items-center justify-center gap-3 text-center">
// //                   <p className="text-4xl">🌙</p>
// //                   <p className="text-white font-bold">No check-ins yet.</p>
// //                   <p className="text-gray-400 text-sm">Submit your first daily readiness to start tracking.</p>
// //                 </div>
// //               ) : (
// //                 <div className="space-y-2">
// //                   {history.map((item, i) => (
// //                     <HistoryRow key={item._id} item={item} index={i} />
// //                   ))}
// //                 </div>
// //               )}
// //             </div>

// //           </div>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { readinessAPI } from "../api/axios";
// import { useAuth } from "../context/AuthContext";

// const readinessStyles = `
//   .epa-rd-root {
//     min-height: 100vh;
//     background: #111111;
//     color: #E8E6E3;
//     font-family: 'DM Sans', system-ui, sans-serif;
//   }

//   .epa-rd-container {
//     max-width: 1100px;
//     margin: 0 auto;
//     padding: 56px 32px 100px;
//     display: flex;
//     flex-direction: column;
//     gap: 36px;
//   }

//   /* ── Hero header ── */
//   .epa-rd-hero {
//     background: #1C1C1C;
//     border: 1px solid rgba(198,167,94,0.15);
//     border-top: 2px solid rgba(198,167,94,0.7);
//     border-radius: 8px;
//     padding: 36px;
//     display: flex;
//     align-items: flex-start;
//     justify-content: space-between;
//     gap: 24px;
//     flex-wrap: wrap;
//   }

//   .epa-rd-eyebrow {
//     font-size: 10px;
//     font-weight: 600;
//     letter-spacing: 0.18em;
//     text-transform: uppercase;
//     color: #C6A75E;
//     margin-bottom: 10px;
//   }

//   .epa-rd-title {
//     font-family: 'Cormorant Garamond', Georgia, serif;
//     font-size: 2.2rem;
//     font-weight: 600;
//     color: #E8E6E3;
//     letter-spacing: -0.01em;
//     line-height: 1.1;
//     margin-bottom: 6px;
//   }

//   .epa-rd-date {
//     font-size: 11px;
//     color: #A1A1A1;
//     letter-spacing: 0.06em;
//   }

//   .epa-rd-hero-right {
//     display: flex;
//     gap: 12px;
//     flex-wrap: wrap;
//   }

//   .epa-rd-score-pill {
//     background: #111111;
//     border: 1px solid rgba(198,167,94,0.2);
//     border-radius: 8px;
//     padding: 16px 24px;
//     text-align: center;
//     min-width: 120px;
//   }

//   .epa-rd-score-label {
//     font-size: 9px;
//     font-weight: 600;
//     letter-spacing: 0.18em;
//     text-transform: uppercase;
//     color: #A1A1A1;
//     margin-bottom: 8px;
//   }

//   .epa-rd-score-num {
//     font-family: 'Cormorant Garamond', Georgia, serif;
//     font-size: 2.4rem;
//     font-weight: 600;
//     color: #E8E6E3;
//     line-height: 1;
//     letter-spacing: -0.02em;
//   }

//   /* ── Category badge ── */
//   .epa-rd-badge {
//     display: inline-flex;
//     align-items: center;
//     gap: 5px;
//     padding: 3px 10px;
//     border-radius: 4px;
//     font-size: 9px;
//     font-weight: 600;
//     letter-spacing: 0.12em;
//     text-transform: uppercase;
//     border: 1px solid;
//     margin-top: 8px;
//   }

//   .epa-rd-badge.high     { color: #2E8B6A; border-color: rgba(46,139,106,0.3); background: rgba(14,59,50,0.3); }
//   .epa-rd-badge.moderate { color: #B8953E; border-color: rgba(198,167,94,0.3); background: rgba(198,167,94,0.08); }
//   .epa-rd-badge.low      { color: #C0605A; border-color: rgba(92,26,26,0.4); background: rgba(92,26,26,0.2); }

//   /* ── Stat cards ── */
//   .epa-rd-stats-grid {
//     display: grid;
//     grid-template-columns: repeat(4, 1fr);
//     gap: 16px;
//   }

//   @media (max-width: 768px) {
//     .epa-rd-stats-grid { grid-template-columns: repeat(2, 1fr); }
//   }

//   .epa-rd-stat-card {
//     background: #1C1C1C;
//     border: 1px solid rgba(198,167,94,0.15);
//     border-top: 2px solid rgba(198,167,94,0.5);
//     border-radius: 8px;
//     padding: 18px 16px 14px;
//   }

//   .epa-rd-stat-label {
//     font-size: 9px;
//     font-weight: 600;
//     letter-spacing: 0.16em;
//     text-transform: uppercase;
//     color: #A1A1A1;
//     margin-bottom: 8px;
//   }

//   .epa-rd-stat-value {
//     font-family: 'Cormorant Garamond', Georgia, serif;
//     font-size: 2rem;
//     font-weight: 600;
//     color: #E8E6E3;
//     line-height: 1;
//     letter-spacing: -0.02em;
//   }

//   .epa-rd-stat-sub {
//     font-size: 10px;
//     color: #A1A1A1;
//     margin-top: 4px;
//   }

//   .epa-rd-sparkline {
//     margin-top: 10px;
//     opacity: 0.7;
//   }

//   /* ── Main grid ── */
//   .epa-rd-main-grid {
//     display: grid;
//     grid-template-columns: 2fr 3fr;
//     gap: 24px;
//     align-items: start;
//   }

//   @media (max-width: 900px) {
//     .epa-rd-main-grid { grid-template-columns: 1fr; }
//   }

//   /* ── Form card ── */
//   .epa-rd-form-card {
//     background: #1C1C1C;
//     border: 1px solid rgba(198,167,94,0.15);
//     border-radius: 8px;
//     overflow: hidden;
//     position: sticky;
//     top: 24px;
//   }

//   .epa-rd-form-header {
//     padding: 18px 24px;
//     border-bottom: 1px solid rgba(198,167,94,0.1);
//     display: flex;
//     align-items: center;
//     gap: 12px;
//   }

//   .epa-rd-form-icon {
//     width: 32px;
//     height: 32px;
//     border-radius: 8px;
//     background: rgba(198,167,94,0.06);
//     border: 1px solid rgba(198,167,94,0.2);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 14px;
//   }

//   .epa-rd-form-title {
//     font-family: 'Cormorant Garamond', Georgia, serif;
//     font-size: 1.15rem;
//     font-weight: 600;
//     color: #E8E6E3;
//   }

//   .epa-rd-form-body {
//     padding: 24px;
//     display: flex;
//     flex-direction: column;
//     gap: 24px;
//   }

//   /* ── Field label ── */
//   .epa-rd-field-label {
//     font-size: 9px;
//     font-weight: 600;
//     letter-spacing: 0.16em;
//     text-transform: uppercase;
//     color: #A1A1A1;
//     margin-bottom: 10px;
//     display: block;
//   }

//   /* ── Slider ── */
//   .epa-rd-slider-row {
//     display: flex;
//     align-items: center;
//     gap: 16px;
//   }

//   .epa-rd-slider {
//     flex: 1;
//     -webkit-appearance: none;
//     appearance: none;
//     height: 1px;
//     background: rgba(198,167,94,0.15);
//     border-radius: 1px;
//     outline: none;
//     cursor: pointer;
//   }

//   .epa-rd-slider::-webkit-slider-thumb {
//     -webkit-appearance: none;
//     width: 14px;
//     height: 14px;
//     border-radius: 50%;
//     background: #C6A75E;
//     border: 2px solid #111111;
//     cursor: pointer;
//   }

//   .epa-rd-slider-val {
//     font-family: 'Cormorant Garamond', Georgia, serif;
//     font-size: 1.5rem;
//     font-weight: 600;
//     color: #C6A75E;
//     min-width: 36px;
//     text-align: right;
//     letter-spacing: -0.02em;
//   }

//   .epa-rd-slider-bounds {
//     display: flex;
//     justify-content: space-between;
//     margin-top: 6px;
//     font-size: 9px;
//     color: rgba(161,161,161,0.5);
//     letter-spacing: 0.05em;
//   }

//   /* ── Text input ── */
//   .epa-rd-input {
//     width: 100%;
//     background: #111111;
//     border: 1px solid rgba(198,167,94,0.18);
//     border-radius: 8px;
//     color: #E8E6E3;
//     font-family: 'DM Sans', sans-serif;
//     font-size: 13px;
//     padding: 11px 14px;
//     outline: none;
//     transition: border-color 0.2s;
//     box-sizing: border-box;
//   }

//   .epa-rd-input::placeholder { color: rgba(161,161,161,0.4); }
//   .epa-rd-input:focus { border-color: rgba(198,167,94,0.55); }

//   /* ── Stress selector ── */
//   .epa-stress-grid {
//     display: grid;
//     grid-template-columns: repeat(3, 1fr);
//     gap: 8px;
//   }

//   .epa-stress-btn {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 4px;
//     padding: 12px 8px;
//     border-radius: 8px;
//     border: 1px solid rgba(198,167,94,0.15);
//     background: transparent;
//     font-family: 'DM Sans', sans-serif;
//     font-size: 9px;
//     font-weight: 600;
//     letter-spacing: 0.1em;
//     text-transform: uppercase;
//     color: #A1A1A1;
//     cursor: pointer;
//     transition: all 0.18s ease;
//   }

//   .epa-stress-btn:hover { border-color: rgba(198,167,94,0.4); color: #E8E6E3; }

//   .epa-stress-btn.low.active    { background: rgba(14,59,50,0.4); border-color: rgba(46,139,106,0.5); color: #2E8B6A; }
//   .epa-stress-btn.medium.active { background: rgba(198,167,94,0.1); border-color: rgba(198,167,94,0.5); color: #C6A75E; }
//   .epa-stress-btn.high.active   { background: rgba(92,26,26,0.3); border-color: rgba(92,26,26,0.6); color: #C0605A; }

//   .epa-stress-icon { font-size: 18px; margin-bottom: 2px; }

//   /* ── Feeling grid ── */
//   .epa-feeling-grid {
//     display: grid;
//     grid-template-columns: repeat(10, 1fr);
//     gap: 4px;
//   }

//   .epa-feeling-btn {
//     padding: 8px 2px;
//     border-radius: 6px;
//     border: 1px solid rgba(198,167,94,0.15);
//     background: transparent;
//     font-family: 'DM Sans', sans-serif;
//     font-size: 11px;
//     font-weight: 700;
//     color: #A1A1A1;
//     cursor: pointer;
//     transition: all 0.15s ease;
//   }

//   .epa-feeling-btn:hover { border-color: rgba(198,167,94,0.4); color: #E8E6E3; }

//   .epa-feeling-btn.low.active    { background: rgba(92,26,26,0.4); border-color: rgba(92,26,26,0.7); color: #E57373; }
//   .epa-feeling-btn.mid.active    { background: rgba(198,167,94,0.12); border-color: rgba(198,167,94,0.5); color: #C6A75E; }
//   .epa-feeling-btn.high.active   { background: rgba(14,59,50,0.4); border-color: rgba(46,139,106,0.5); color: #2E8B6A; }

//   /* ── Submit btn ── */
//   .epa-rd-submit {
//     width: 100%;
//     padding: 13px;
//     border-radius: 8px;
//     border: none;
//     background: #C6A75E;
//     color: #111111;
//     font-family: 'DM Sans', sans-serif;
//     font-size: 11px;
//     font-weight: 700;
//     letter-spacing: 0.12em;
//     text-transform: uppercase;
//     cursor: pointer;
//     transition: background 0.2s ease;
//   }

//   .epa-rd-submit:hover { background: #b8954f; }
//   .epa-rd-submit:disabled { opacity: 0.45; cursor: not-allowed; }
//   .epa-rd-submit.success { background: rgba(14,59,50,0.6); color: #2E8B6A; border: 1px solid rgba(46,139,106,0.4); }

//   /* ── Error ── */
//   .epa-rd-error {
//     margin: 0 24px;
//     padding: 12px 16px;
//     background: rgba(92,26,26,0.3);
//     border: 1px solid rgba(92,26,26,0.5);
//     border-radius: 8px;
//     font-size: 12px;
//     color: #E57373;
//     letter-spacing: 0.04em;
//   }

//   /* ── Chart card ── */
//   .epa-rd-chart-card {
//     background: #1C1C1C;
//     border: 1px solid rgba(198,167,94,0.15);
//     border-radius: 8px;
//     overflow: hidden;
//   }

//   .epa-rd-chart-header {
//     padding: 18px 24px;
//     border-bottom: 1px solid rgba(198,167,94,0.1);
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//   }

//   .epa-rd-chart-title {
//     font-family: 'Cormorant Garamond', Georgia, serif;
//     font-size: 1.1rem;
//     font-weight: 600;
//     color: #E8E6E3;
//   }

//   .epa-rd-legend {
//     display: flex;
//     gap: 16px;
//     font-size: 9px;
//     font-weight: 600;
//     letter-spacing: 0.1em;
//     text-transform: uppercase;
//   }

//   .epa-rd-legend-item {
//     display: flex;
//     align-items: center;
//     gap: 5px;
//   }

//   .epa-rd-legend-dot {
//     width: 6px;
//     height: 6px;
//     border-radius: 50%;
//     flex-shrink: 0;
//   }

//   .epa-rd-chart-body {
//     padding: 24px;
//   }

//   /* ── Bar chart ── */
//   .epa-bar-chart-bars {
//     display: flex;
//     align-items: flex-end;
//     gap: 4px;
//     height: 100px;
//   }

//   .epa-bar-wrap {
//     flex: 1;
//     height: 100%;
//     display: flex;
//     align-items: flex-end;
//     position: relative;
//     cursor: pointer;
//   }

//   .epa-bar-wrap:hover .epa-bar-tooltip { opacity: 1; }

//   .epa-bar {
//     width: 100%;
//     border-radius: 2px 2px 0 0;
//     opacity: 0.8;
//     transition: opacity 0.15s;
//     min-height: 3px;
//   }

//   .epa-bar-wrap:hover .epa-bar { opacity: 1; }

//   .epa-bar-tooltip {
//     position: absolute;
//     bottom: calc(100% + 6px);
//     left: 50%;
//     transform: translateX(-50%);
//     background: #1C1C1C;
//     border: 1px solid rgba(198,167,94,0.25);
//     border-radius: 6px;
//     padding: 6px 10px;
//     font-size: 10px;
//     white-space: nowrap;
//     opacity: 0;
//     pointer-events: none;
//     z-index: 10;
//     color: #E8E6E3;
//     transition: opacity 0.15s;
//   }

//   .epa-bar-tooltip-score {
//     font-weight: 700;
//     color: #C6A75E;
//     font-size: 12px;
//   }

//   .epa-bar-dates {
//     display: flex;
//     gap: 4px;
//     margin-top: 8px;
//   }

//   .epa-bar-date {
//     flex: 1;
//     text-align: center;
//     font-size: 8px;
//     color: rgba(161,161,161,0.4);
//     letter-spacing: 0.04em;
//   }

//   /* ── Section label ── */
//   .epa-rd-section-label {
//     font-size: 9px;
//     font-weight: 600;
//     letter-spacing: 0.2em;
//     text-transform: uppercase;
//     color: #A1A1A1;
//     margin-bottom: 14px;
//   }

//   /* ── History row ── */
//   .epa-rd-history-row {
//     background: #1C1C1C;
//     border: 1px solid rgba(198,167,94,0.12);
//     border-radius: 8px;
//     overflow: hidden;
//     transition: border-color 0.2s;
//   }

//   .epa-rd-history-row:hover { border-color: rgba(198,167,94,0.3); }
//   .epa-rd-history-row.open  { border-color: rgba(198,167,94,0.4); }

//   .epa-rd-history-btn {
//     width: 100%;
//     display: flex;
//     align-items: center;
//     gap: 14px;
//     padding: 14px 20px;
//     background: transparent;
//     border: none;
//     cursor: pointer;
//     transition: background 0.15s;
//     text-align: left;
//   }

//   .epa-rd-history-btn:hover { background: rgba(198,167,94,0.03); }

//   .epa-rd-history-score-box {
//     width: 36px;
//     height: 36px;
//     border-radius: 8px;
//     background: #111111;
//     border: 1px solid rgba(198,167,94,0.15);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-family: 'Cormorant Garamond', Georgia, serif;
//     font-size: 1.1rem;
//     font-weight: 600;
//     color: #E8E6E3;
//     flex-shrink: 0;
//   }

//   .epa-rd-history-date {
//     font-size: 13px;
//     font-weight: 600;
//     color: #E8E6E3;
//     margin-bottom: 3px;
//   }

//   .epa-rd-history-meta {
//     display: flex;
//     gap: 12px;
//     font-size: 10px;
//     color: #A1A1A1;
//     letter-spacing: 0.04em;
//   }

//   .epa-rd-history-bar-wrap {
//     flex: 0 0 80px;
//   }

//   .epa-rd-history-bar-track {
//     height: 2px;
//     background: rgba(198,167,94,0.1);
//     border-radius: 1px;
//     overflow: hidden;
//   }

//   .epa-rd-history-bar-fill {
//     height: 100%;
//     border-radius: 1px;
//   }

//   .epa-rd-chevron {
//     font-size: 11px;
//     color: #A1A1A1;
//     transition: transform 0.2s;
//     margin-left: auto;
//     flex-shrink: 0;
//   }

//   .epa-rd-chevron.open { transform: rotate(180deg); }

//   .epa-rd-history-detail {
//     padding: 16px 20px 20px;
//     border-top: 1px solid rgba(198,167,94,0.1);
//     display: grid;
//     grid-template-columns: repeat(3, 1fr);
//     gap: 10px;
//   }

//   @media (max-width: 600px) {
//     .epa-rd-history-detail { grid-template-columns: repeat(2, 1fr); }
//   }

//   .epa-rd-detail-box {
//     background: #111111;
//     border: 1px solid rgba(198,167,94,0.1);
//     border-radius: 8px;
//     padding: 12px 14px;
//   }

//   .epa-rd-detail-label {
//     font-size: 8px;
//     font-weight: 600;
//     letter-spacing: 0.16em;
//     text-transform: uppercase;
//     color: #A1A1A1;
//     margin-bottom: 5px;
//   }

//   .epa-rd-detail-val {
//     font-family: 'Cormorant Garamond', Georgia, serif;
//     font-size: 1.3rem;
//     font-weight: 600;
//     color: #E8E6E3;
//     text-transform: capitalize;
//     line-height: 1;
//   }

//   .epa-rd-detail-sub {
//     font-size: 9px;
//     color: #A1A1A1;
//     margin-top: 3px;
//     text-transform: capitalize;
//     letter-spacing: 0.04em;
//   }

//   /* ── Empty state ── */
//   .epa-rd-empty {
//     background: #1C1C1C;
//     border: 1px dashed rgba(198,167,94,0.2);
//     border-radius: 8px;
//     padding: 64px 32px;
//     text-align: center;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 14px;
//   }

//   .epa-rd-empty-icon {
//     width: 50px;
//     height: 50px;
//     border-radius: 50%;
//     border: 1px solid rgba(198,167,94,0.25);
//     background: rgba(198,167,94,0.04);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 20px;
//     margin-bottom: 4px;
//   }

//   .epa-rd-empty-title {
//     font-family: 'Cormorant Garamond', Georgia, serif;
//     font-size: 1.3rem;
//     font-weight: 600;
//     color: #E8E6E3;
//   }

//   .epa-rd-empty-sub {
//     font-size: 12px;
//     color: #A1A1A1;
//     max-width: 300px;
//     line-height: 1.7;
//   }

//   .epa-rd-divider {
//     border: none;
//     border-top: 1px solid rgba(198,167,94,0.1);
//   }
// `;

// /* ─────────────────────────────────────────────
//    SPARKLINE
// ───────────────────────────────────────────── */
// function Sparkline({ data, color = "#C6A75E", height = 32 }) {
//   if (!data || data.length < 2) return null;
//   const w = 200, h = height;
//   const min = Math.min(...data);
//   const max = Math.max(...data);
//   const range = max - min || 1;
//   const pts = data.map((v, i) => {
//     const x = (i / (data.length - 1)) * w;
//     const y = h - ((v - min) / range) * (h - 6) - 3;
//     return `${x},${y}`;
//   });
//   return (
//     <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height }}>
//       <polyline
//         points={pts.join(" ")}
//         fill="none"
//         stroke={color}
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <circle
//         cx={pts[pts.length - 1].split(",")[0]}
//         cy={pts[pts.length - 1].split(",")[1]}
//         r="2.5"
//         fill={color}
//       />
//     </svg>
//   );
// }

// /* ─────────────────────────────────────────────
//    BAR CHART
// ───────────────────────────────────────────── */
// function ReadinessBarChart({ history }) {
//   if (!history || history.length === 0) return null;
//   const recent = [...history].reverse().slice(0, 14);

//   const catColor = (cat) => {
//     if (cat === "high")     return "#2E8B6A";
//     if (cat === "moderate") return "#C6A75E";
//     if (cat === "low")      return "#8B3030";
//     return "#A1A1A1";
//   };

//   return (
//     <div>
//       <div className="epa-bar-chart-bars">
//         {recent.map((item, i) => {
//           const score = item.readinessScore ?? 0;
//           const pct = Math.max((score / 100) * 100, 3);
//           return (
//             <div key={i} className="epa-bar-wrap">
//               <div className="epa-bar-tooltip">
//                 <div className="epa-bar-tooltip-score">{score}</div>
//                 <div style={{ color: "#A1A1A1", fontSize: 9 }}>
//                   {new Date(item.date).toLocaleDateString("en", { month: "short", day: "numeric" })}
//                 </div>
//               </div>
//               <div
//                 className="epa-bar"
//                 style={{ height: `${pct}%`, backgroundColor: catColor(item.readinessCategory) }}
//               />
//             </div>
//           );
//         })}
//       </div>
//       <div className="epa-bar-dates">
//         {recent.map((item, i) => (
//           <div key={i} className="epa-bar-date">
//             {new Date(item.date).toLocaleDateString("en", { day: "numeric" })}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    CATEGORY BADGE
// ───────────────────────────────────────────── */
// function CategoryBadge({ category }) {
//   const cls = category === "high" ? "high" : category === "moderate" ? "moderate" : "low";
//   return (
//     <span className={`epa-rd-badge ${cls}`}>
//       {category ?? "—"}
//     </span>
//   );
// }

// /* ─────────────────────────────────────────────
//    STAT CARD
// ───────────────────────────────────────────── */
// function StatCard({ label, value, sub, sparkData }) {
//   return (
//     <div className="epa-rd-stat-card">
//       <p className="epa-rd-stat-label">{label}</p>
//       <p className="epa-rd-stat-value">{value ?? "—"}</p>
//       {sub && <p className="epa-rd-stat-sub">{sub}</p>}
//       {sparkData && sparkData.length > 1 && (
//         <div className="epa-rd-sparkline">
//           <Sparkline data={sparkData} color="rgba(198,167,94,0.6)" height={28} />
//         </div>
//       )}
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    FEELING SELECTOR
// ───────────────────────────────────────────── */
// function FeelingSelector({ value, onChange }) {
//   return (
//     <div className="epa-feeling-grid">
//       {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
//         const tier = n <= 3 ? "low" : n <= 6 ? "mid" : "high";
//         const active = value === n;
//         return (
//           <button
//             key={n}
//             type="button"
//             onClick={() => onChange(n)}
//             className={`epa-feeling-btn ${tier}${active ? " active" : ""}`}
//           >
//             {n}
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    STRESS SELECTOR
// ───────────────────────────────────────────── */
// function StressSelector({ value, onChange }) {
//   const opts = [
//     { val: "low",    label: "Low",    icon: "○" },
//     { val: "medium", label: "Medium", icon: "◎" },
//     { val: "high",   label: "High",   icon: "●" },
//   ];
//   return (
//     <div className="epa-stress-grid">
//       {opts.map(({ val, label, icon }) => (
//         <button
//           key={val}
//           type="button"
//           onClick={() => onChange(val)}
//           className={`epa-stress-btn ${val}${value === val ? " active" : ""}`}
//         >
//           <span className="epa-stress-icon">{icon}</span>
//           {label}
//         </button>
//       ))}
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    SLIDER INPUT
// ───────────────────────────────────────────── */
// function SliderInput({ label, name, value, min, max, unit, onChange }) {
//   return (
//     <div>
//       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
//         <span className="epa-rd-field-label" style={{ marginBottom: 0 }}>{label}</span>
//         <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 600, color: "#C6A75E" }}>
//           {value}{unit}
//         </span>
//       </div>
//       <div className="epa-rd-slider-row">
//         <input
//           type="range"
//           name={name}
//           min={min}
//           max={max}
//           value={value}
//           onChange={onChange}
//           className="epa-rd-slider"
//           style={{ flex: 1 }}
//         />
//       </div>
//       <div className="epa-rd-slider-bounds">
//         <span>{min}{unit}</span>
//         <span>{max}{unit}</span>
//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    HISTORY ROW
// ───────────────────────────────────────────── */
// function HistoryRow({ item }) {
//   const [open, setOpen] = useState(false);
//   const score = item.readinessScore ?? 0;

//   const barColor =
//     item.readinessCategory === "high"     ? "#2E8B6A"
//     : item.readinessCategory === "moderate" ? "#C6A75E"
//     : "#8B3030";

//   return (
//     <div className={`epa-rd-history-row${open ? " open" : ""}`}>
//       <button className="epa-rd-history-btn" onClick={() => setOpen(!open)}>
//         <div className="epa-rd-history-score-box">{score}</div>
//         <div style={{ flex: 1 }}>
//           <p className="epa-rd-history-date">
//             {new Date(item.date).toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" })}
//           </p>
//           <div className="epa-rd-history-meta">
//             <span>Sleep {item.sleepHours}h</span>
//             {item.restingHeartRate && <span>{item.restingHeartRate} bpm</span>}
//             <span>Hydration {item.hydrationLevelPercent}%</span>
//           </div>
//         </div>
//         <div className="epa-rd-history-bar-wrap">
//           <div className="epa-rd-history-bar-track">
//             <div
//               className="epa-rd-history-bar-fill"
//               style={{ width: `${score}%`, backgroundColor: barColor }}
//             />
//           </div>
//         </div>
//         <CategoryBadge category={item.readinessCategory} />
//         <span className={`epa-rd-chevron${open ? " open" : ""}`}>▾</span>
//       </button>

//       {open && (
//         <div className="epa-rd-history-detail">
//           {[
//             { label: "Readiness Score", val: item.readinessScore, sub: item.readinessCategory },
//             { label: "Sleep Hours",     val: `${item.sleepHours}h` },
//             { label: "Feeling (1–10)",  val: item.subjectiveFeeling },
//             { label: "Stress Level",    val: item.stressLevel },
//             { label: "Resting HR",      val: item.restingHeartRate ? `${item.restingHeartRate} bpm` : "—" },
//             { label: "Hydration",       val: `${item.hydrationLevelPercent}%` },
//           ].map(({ label, val, sub }) => (
//             <div key={label} className="epa-rd-detail-box">
//               <p className="epa-rd-detail-label">{label}</p>
//               <p className="epa-rd-detail-val">{val ?? "—"}</p>
//               {sub && <p className="epa-rd-detail-sub">{sub}</p>}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    MAIN PAGE
// ───────────────────────────────────────────── */
// export default function Readiness() {
//   const { user } = useAuth();
//   const today = new Date().toISOString().split("T")[0];

//   const [form, setForm] = useState({
//     sleepHours:            7,
//     stressLevel:           "medium",
//     subjectiveFeeling:     7,
//     restingHeartRate:      "",
//     hydrationLevelPercent: 70,
//   });

//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error,   setError]   = useState("");
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: ["sleepHours","restingHeartRate","hydrationLevelPercent","subjectiveFeeling"].includes(name)
//         ? Number(value) : value,
//     }));
//   };

//   const fetchHistory = async () => {
//     try {
//       const res = await readinessAPI.getHistory(user.id);
//       setHistory(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     if (user?.id) fetchHistory();
//   }, [user]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       await readinessAPI.submit({ userId: user.id, date: today, ...form });
//       setSuccess(true);
//       setTimeout(() => setSuccess(false), 3000);
//       await fetchHistory();
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to submit readiness");
//     }
//     setLoading(false);
//   };

//   /* ── derived stats ── */
//   const latest       = history[0];
//   const avgScore     = history.length ? Math.round(history.reduce((a, b) => a + (b.readinessScore ?? 0), 0) / history.length) : null;
//   const avgSleep     = history.length ? (history.reduce((a, b) => a + (b.sleepHours ?? 0), 0) / history.length).toFixed(1) : null;
//   const scoreHistory = [...history].reverse().map((h) => h.readinessScore ?? 0);
//   const sleepHistory = [...history].reverse().map((h) => h.sleepHours ?? 0);

//   return (
//     <div className="epa-rd-root">
//       <style>{readinessStyles}</style>

//       <div className="epa-rd-container">

//         {/* ── HERO ── */}
//         <div className="epa-rd-hero">
//           <div>
//             <p className="epa-rd-eyebrow">Recovery Intelligence</p>
//             <h1 className="epa-rd-title">Daily Readiness</h1>
//             <p className="epa-rd-date">{today} — Daily biometric check-in</p>
//           </div>

//           {latest && (
//             <div className="epa-rd-hero-right">
//               <div className="epa-rd-score-pill">
//                 <p className="epa-rd-score-label">Last Score</p>
//                 <p className="epa-rd-score-num">{latest.readinessScore}</p>
//                 <CategoryBadge category={latest.readinessCategory} />
//               </div>
//               <div className="epa-rd-score-pill">
//                 <p className="epa-rd-score-label">30-Day Avg</p>
//                 <p className="epa-rd-score-num">{avgScore ?? "—"}</p>
//                 <p style={{ fontSize: 10, color: "#A1A1A1", marginTop: 8, letterSpacing: "0.06em" }}>
//                   {history.length} entries
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* ── STAT ROW ── */}
//         {history.length > 0 && (
//           <div className="epa-rd-stats-grid">
//             <StatCard label="Avg Score"    value={avgScore}          sub="30-day average"  sparkData={scoreHistory} />
//             <StatCard label="Avg Sleep"    value={`${avgSleep}h`}    sub="per night"       sparkData={sleepHistory} />
//             <StatCard label="Last Feeling" value={`${latest?.subjectiveFeeling}/10`} sub="subjective score" />
//             <StatCard label="Resting HR"   value={latest?.restingHeartRate ? `${latest.restingHeartRate}` : "—"} sub="bpm" />
//           </div>
//         )}

//         {/* ── MAIN GRID ── */}
//         <div className="epa-rd-main-grid">

//           {/* FORM */}
//           <div className="epa-rd-form-card">
//             <div className="epa-rd-form-header">
//               <div className="epa-rd-form-icon">◉</div>
//               <h2 className="epa-rd-form-title">Daily Check-In</h2>
//             </div>

//             {error && <div className="epa-rd-error">⚠ {error}</div>}

//             <form onSubmit={handleSubmit} className="epa-rd-form-body">
//               <SliderInput
//                 label="Sleep Hours"
//                 name="sleepHours"
//                 value={form.sleepHours}
//                 min={0} max={12} unit="h"
//                 onChange={handleChange}
//               />

//               <hr className="epa-rd-divider" />

//               <SliderInput
//                 label="Hydration Level"
//                 name="hydrationLevelPercent"
//                 value={form.hydrationLevelPercent}
//                 min={0} max={100} unit="%"
//                 onChange={handleChange}
//               />

//               <hr className="epa-rd-divider" />

//               <div>
//                 <label className="epa-rd-field-label">Resting Heart Rate (bpm)</label>
//                 <input
//                   type="number"
//                   name="restingHeartRate"
//                   placeholder="e.g. 58"
//                   value={form.restingHeartRate}
//                   onChange={handleChange}
//                   className="epa-rd-input"
//                 />
//               </div>

//               <hr className="epa-rd-divider" />

//               <div>
//                 <label className="epa-rd-field-label">Stress Level</label>
//                 <StressSelector
//                   value={form.stressLevel}
//                   onChange={(v) => setForm({ ...form, stressLevel: v })}
//                 />
//               </div>

//               <hr className="epa-rd-divider" />

//               <div>
//                 <label className="epa-rd-field-label">Subjective Feeling (1–10)</label>
//                 <FeelingSelector
//                   value={form.subjectiveFeeling}
//                   onChange={(v) => setForm({ ...form, subjectiveFeeling: v })}
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`epa-rd-submit${success ? " success" : ""}`}
//               >
//                 {loading ? "Submitting…" : success ? "✓ Check-In Logged" : "Submit Check-In"}
//               </button>
//             </form>
//           </div>

//           {/* RIGHT: Chart + History */}
//           <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

//             {/* Score trend */}
//             {history.length > 0 && (
//               <div className="epa-rd-chart-card">
//                 <div className="epa-rd-chart-header">
//                   <h2 className="epa-rd-chart-title">Score Trend</h2>
//                   <div className="epa-rd-legend">
//                     <div className="epa-rd-legend-item">
//                       <div className="epa-rd-legend-dot" style={{ background: "#2E8B6A" }} />
//                       <span style={{ color: "#A1A1A1" }}>High</span>
//                     </div>
//                     <div className="epa-rd-legend-item">
//                       <div className="epa-rd-legend-dot" style={{ background: "#C6A75E" }} />
//                       <span style={{ color: "#A1A1A1" }}>Moderate</span>
//                     </div>
//                     <div className="epa-rd-legend-item">
//                       <div className="epa-rd-legend-dot" style={{ background: "#8B3030" }} />
//                       <span style={{ color: "#A1A1A1" }}>Low</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="epa-rd-chart-body">
//                   <ReadinessBarChart history={history} />
//                 </div>
//               </div>
//             )}

//             {/* History */}
//             <div>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
//                 <p className="epa-rd-section-label" style={{ marginBottom: 0 }}>Check-In History</p>
//                 <span style={{ fontSize: 10, color: "#A1A1A1" }}>{history.length} entries</span>
//               </div>

//               {history.length === 0 ? (
//                 <div className="epa-rd-empty">
//                   <div className="epa-rd-empty-icon">◯</div>
//                   <h3 className="epa-rd-empty-title">No Check-Ins Yet</h3>
//                   <p className="epa-rd-empty-sub">
//                     Submit your first daily readiness to begin tracking recovery and performance trends.
//                   </p>
//                 </div>
//               ) : (
//                 <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//                   {history.map((item) => (
//                     <HistoryRow key={item._id} item={item} />
//                   ))}
//                 </div>
//               )}
//             </div>

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { readinessAPI } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import {
  Activity, Heart, Droplets, Wind, CheckCircle, ChevronDown,
} from "lucide-react";

/* ─── Sparkline ─── */
function Sparkline({ data, color = "#6366f1", height = 32 }) {
  if (!data || data.length < 2) return null;
  const w = 200, h = height;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 6) - 3;
    return `${x},${y}`;
  });
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height }}>
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1].split(",")[0]} cy={pts[pts.length - 1].split(",")[1]} r="2.5" fill={color} />
    </svg>
  );
}

/* ─── Bar Chart ─── */
function ReadinessBarChart({ history }) {
  if (!history || history.length === 0) return null;
  const recent = [...history].reverse().slice(0, 14);
  const catColor = (cat) =>
    cat === "high" ? "#10b981" : cat === "moderate" ? "#6366f1" : "#f43f5e";

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 100 }}>
        {recent.map((item, i) => {
          const score = item.readinessScore ?? 0;
          const pct = Math.max((score / 100) * 100, 3);
          return (
            <div key={i} style={{ flex: 1, height: "100%", display: "flex", alignItems: "flex-end", position: "relative" }}
              className="group">
              <div style={{
                position: "absolute", bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)",
                background: "white", border: "1px solid #e5e7eb", borderRadius: 8, padding: "6px 10px",
                fontSize: 10, whiteSpace: "nowrap", opacity: 0, pointerEvents: "none", zIndex: 10,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)", transition: "opacity 0.15s",
              }} className="group-hover:opacity-100">
                <div style={{ fontWeight: 700, color: "#111827" }}>{score}</div>
                <div style={{ color: "#9ca3af", fontSize: 9 }}>
                  {new Date(item.date).toLocaleDateString("en", { month: "short", day: "numeric" })}
                </div>
              </div>
              <div style={{
                width: "100%", height: `${pct}%`, borderRadius: "4px 4px 0 0",
                background: catColor(item.readinessCategory), opacity: 0.8, transition: "opacity 0.15s",
              }} className="group-hover:opacity-100" />
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
        {recent.map((item, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 8, color: "#d1d5db" }}>
            {new Date(item.date).toLocaleDateString("en", { day: "numeric" })}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Category Badge ─── */
function CategoryBadge({ category }) {
  const styles = {
    high:     { background: "#d1fae5", color: "#059669", border: "1px solid #a7f3d0" },
    moderate: { background: "#eef2ff", color: "#6366f1", border: "1px solid #c7d2fe" },
    low:      { background: "#fff1f2", color: "#f43f5e", border: "1px solid #fecdd3" },
  };
  const s = styles[category] || { background: "#f3f4f6", color: "#6b7280", border: "1px solid #e5e7eb" };
  return (
    <span style={{ ...s, padding: "3px 10px", borderRadius: 999, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
      {category ?? "—"}
    </span>
  );
}

/* ─── Stat Card ─── */
function StatCard({ label, value, sub, sparkData, gradient, icon }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid #e5e7eb", borderRadius: 24, padding: 24, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: gradient, display: "flex", alignItems: "center", justifyContent: "center", color: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
          {icon}
        </div>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9ca3af" }}>{label}</p>
      </div>
      <p style={{ fontSize: "2rem", fontWeight: 800, color: "#111827", lineHeight: 1 }}>{value ?? "—"}</p>
      {sub && <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: 4 }}>{sub}</p>}
      {sparkData && sparkData.length > 1 && (
        <div style={{ marginTop: 12, opacity: 0.8 }}>
          <Sparkline data={sparkData} color="#6366f1" height={28} />
        </div>
      )}
    </div>
  );
}

/* ─── Slider Input ─── */
function SliderInput({ label, name, value, min, max, unit, onChange }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b7280" }}>{label}</span>
        <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#6366f1" }}>{value}{unit}</span>
      </div>
      <input type="range" name={name} min={min} max={max} value={value} onChange={onChange}
        style={{ width: "100%", accentColor: "#6366f1", cursor: "pointer" }} />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 9, color: "#d1d5db" }}>
        <span>{min}{unit}</span><span>{max}{unit}</span>
      </div>
    </div>
  );
}

/* ─── Stress Selector ─── */
function StressSelector({ value, onChange }) {
  const opts = [
    { val: "low",    label: "Low",    icon: "○", active: { background: "#d1fae5", border: "1px solid #a7f3d0", color: "#059669" } },
    { val: "medium", label: "Medium", icon: "◎", active: { background: "#eef2ff", border: "1px solid #c7d2fe", color: "#6366f1" } },
    { val: "high",   label: "High",   icon: "●", active: { background: "#fff1f2", border: "1px solid #fecdd3", color: "#f43f5e" } },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
      {opts.map(({ val, label, icon, active }) => {
        const isActive = value === val;
        return (
          <button key={val} type="button" onClick={() => onChange(val)}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "12px 8px", borderRadius: 12, cursor: "pointer", transition: "all 0.15s",
              ...(isActive ? active : { background: "rgba(255,255,255,0.5)", border: "1px solid #e5e7eb", color: "#9ca3af" }) }}>
            <span style={{ fontSize: 18 }}>{icon}</span>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Feeling Selector ─── */
function FeelingSelector({ value, onChange }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 4 }}>
      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
        const isActive = value === n;
        const color = n <= 3 ? "#f43f5e" : n <= 6 ? "#6366f1" : "#10b981";
        const bg    = n <= 3 ? "#fff1f2" : n <= 6 ? "#eef2ff" : "#d1fae5";
        const border = n <= 3 ? "#fecdd3" : n <= 6 ? "#c7d2fe" : "#a7f3d0";
        return (
          <button key={n} type="button" onClick={() => onChange(n)}
            style={{ padding: "8px 2px", borderRadius: 8, cursor: "pointer", transition: "all 0.15s", fontWeight: 700, fontSize: 13,
              border: isActive ? `1px solid ${border}` : "1px solid #e5e7eb",
              background: isActive ? bg : "rgba(255,255,255,0.5)",
              color: isActive ? color : "#9ca3af" }}>
            {n}
          </button>
        );
      })}
    </div>
  );
}

/* ─── History Row ─── */
function HistoryRow({ item }) {
  const [open, setOpen] = useState(false);
  const score = item.readinessScore ?? 0;
  const barColor = item.readinessCategory === "high" ? "#10b981" : item.readinessCategory === "moderate" ? "#6366f1" : "#f43f5e";

  return (
    <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: open ? "1px solid #c7d2fe" : "1px solid #e5e7eb", borderRadius: 16, overflow: "hidden", transition: "border-color 0.2s", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
      <button onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "14px 20px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
        {/* Score box */}
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", fontWeight: 800, color: "white", flexShrink: 0, boxShadow: "0 4px 12px rgba(99,102,241,0.3)" }}>
          {score}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#111827", marginBottom: 3 }}>
            {new Date(item.date).toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" })}
          </p>
          <div style={{ display: "flex", gap: 12, fontSize: 11, color: "#9ca3af" }}>
            <span>Sleep {item.sleepHours}h</span>
            {item.restingHeartRate && <span>{item.restingHeartRate} bpm</span>}
            <span>Hydration {item.hydrationLevelPercent}%</span>
          </div>
        </div>
        <div style={{ width: 80, flexShrink: 0 }}>
          <div style={{ height: 4, background: "#f3f4f6", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${score}%`, background: barColor, borderRadius: 999 }} />
          </div>
        </div>
        <CategoryBadge category={item.readinessCategory} />
        <ChevronDown size={16} style={{ color: "#9ca3af", transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }} />
      </button>

      {open && (
        <div style={{ padding: "16px 20px 20px", borderTop: "1px solid #f3f4f6", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {[
            { label: "Readiness Score", val: item.readinessScore, sub: item.readinessCategory },
            { label: "Sleep Hours",     val: `${item.sleepHours}h` },
            { label: "Feeling (1–10)",  val: item.subjectiveFeeling },
            { label: "Stress Level",    val: item.stressLevel },
            { label: "Resting HR",      val: item.restingHeartRate ? `${item.restingHeartRate} bpm` : "—" },
            { label: "Hydration",       val: `${item.hydrationLevelPercent}%` },
          ].map(({ label, val, sub }) => (
            <div key={label} style={{ background: "rgba(238,242,255,0.5)", border: "1px solid #e0e7ff", borderRadius: 12, padding: "12px 14px" }}>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 5 }}>{label}</p>
              <p style={{ fontSize: "1.2rem", fontWeight: 800, color: "#111827", textTransform: "capitalize", lineHeight: 1 }}>{val ?? "—"}</p>
              {sub && <p style={{ fontSize: 9, color: "#9ca3af", marginTop: 3, textTransform: "capitalize", letterSpacing: "0.04em" }}>{sub}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main Page ─── */
export default function Readiness() {
  const { user } = useAuth();
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    sleepHours: 7, stressLevel: "medium", subjectiveFeeling: 7,
    restingHeartRate: "", hydrationLevelPercent: 70,
  });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ["sleepHours","restingHeartRate","hydrationLevelPercent","subjectiveFeeling"].includes(name)
        ? Number(value) : value,
    }));
  };

  const fetchHistory = async () => {
    try {
      const res = await readinessAPI.getHistory(user.id);
      setHistory(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { if (user?.id) fetchHistory(); }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await readinessAPI.submit({ userId: user.id, date: today, ...form });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      await fetchHistory();
    } catch (err) { setError(err.response?.data?.message || "Failed to submit readiness"); }
    setLoading(false);
  };

  const latest       = history[0];
  const avgScore     = history.length ? Math.round(history.reduce((a, b) => a + (b.readinessScore ?? 0), 0) / history.length) : null;
  const avgSleep     = history.length ? (history.reduce((a, b) => a + (b.sleepHours ?? 0), 0) / history.length).toFixed(1) : null;
  const scoreHistory = [...history].reverse().map((h) => h.readinessScore ?? 0);
  const sleepHistory = [...history].reverse().map((h) => h.sleepHours ?? 0);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f8fafc, #eff6ff, #eef2ff)", position: "relative", overflow: "hidden" }}>

      {/* Blobs */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div className="animate-blob" style={{ position: "absolute", top: "-10rem", right: "-10rem", width: "24rem", height: "24rem", borderRadius: "50%", background: "#93c5fd", mixBlendMode: "multiply", filter: "blur(64px)", opacity: 0.3 }} />
        <div className="animate-blob animation-delay-2000" style={{ position: "absolute", bottom: "-10rem", left: "-10rem", width: "24rem", height: "24rem", borderRadius: "50%", background: "#c4b5fd", mixBlendMode: "multiply", filter: "blur(64px)", opacity: 0.3 }} />
        <div className="animate-blob animation-delay-4000" style={{ position: "absolute", top: "40%", left: "40%", width: "20rem", height: "20rem", borderRadius: "50%", background: "#a5b4fc", mixBlendMode: "multiply", filter: "blur(64px)", opacity: 0.2 }} />
      </div>

      <main style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "56px 48px 100px", display: "flex", flexDirection: "column", gap: 48 }}>

        {/* ── HERO ── */}
        <section style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "inline-block", padding: "6px 20px", marginBottom: 20, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", background: "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(99,102,241,0.08))", border: "2px solid rgba(99,102,241,0.2)", borderRadius: 999 }}>
              <span style={{ background: "linear-gradient(135deg, #2563eb, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                ◎ Recovery Intelligence
              </span>
            </div>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, lineHeight: 1.1 }}>
              <span style={{ background: "linear-gradient(135deg, #0f172a, #1e3a8a, #312e81)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}>Daily Readiness</span>
              <span style={{ background: "linear-gradient(135deg, #2563eb, #6366f1, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}>Check-In</span>
            </h1>
            <p style={{ marginTop: 12, fontSize: "0.95rem", color: "#6b7280" }}>{today} — Daily biometric assessment</p>
          </div>

          {latest && (
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {[
                { label: "Last Score", value: latest.readinessScore, sub: <CategoryBadge category={latest.readinessCategory} /> },
                { label: "30-Day Avg", value: avgScore ?? "—", sub: <span style={{ fontSize: 11, color: "#9ca3af" }}>{history.length} entries</span> },
              ].map(({ label, value, sub }) => (
                <div key={label} style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid #e5e7eb", borderRadius: 20, padding: "20px 28px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", textAlign: "center", minWidth: 120 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 8 }}>{label}</p>
                  <p style={{ fontSize: "2.5rem", fontWeight: 800, color: "#111827", lineHeight: 1 }}>{value}</p>
                  <div style={{ marginTop: 8 }}>{sub}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── STAT ROW ── */}
        {history.length > 0 && (
          <section style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            <StatCard label="Avg Score"    value={avgScore}              sub="30-day average"     sparkData={scoreHistory} gradient="linear-gradient(135deg,#6366f1,#8b5cf6)" icon={<Activity size={18} />} />
            <StatCard label="Avg Sleep"    value={`${avgSleep}h`}        sub="per night"          sparkData={sleepHistory} gradient="linear-gradient(135deg,#3b82f6,#06b6d4)" icon={<Wind size={18} />} />
            <StatCard label="Last Feeling" value={`${latest?.subjectiveFeeling}/10`} sub="subjective score" gradient="linear-gradient(135deg,#10b981,#14b8a6)" icon={<Heart size={18} />} />
            <StatCard label="Resting HR"   value={latest?.restingHeartRate ? `${latest.restingHeartRate}` : "—"} sub="bpm" gradient="linear-gradient(135deg,#f59e0b,#ef4444)" icon={<Activity size={18} />} />
          </section>
        )}

        {/* ── MAIN GRID ── */}
        <section style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: 32, alignItems: "start" }}>

          {/* FORM */}
          <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid #e5e7eb", borderRadius: 24, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.06)", position: "sticky", top: 24 }}>
            {/* Form header */}
            <div style={{ padding: "20px 28px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", gap: 12, background: "linear-gradient(135deg, rgba(99,102,241,0.04), rgba(139,92,246,0.04))" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", boxShadow: "0 4px 12px rgba(99,102,241,0.3)" }}>
                <CheckCircle size={18} />
              </div>
              <div>
                <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827" }}>Daily Check-In</h2>
                <p style={{ fontSize: 11, color: "#9ca3af" }}>Log today's biometrics</p>
              </div>
            </div>

            {error && (
              <div style={{ margin: "16px 24px 0", padding: "12px 16px", background: "#fff1f2", border: "1px solid #fecdd3", borderRadius: 12, fontSize: 12, color: "#f43f5e" }}>
                ⚠ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ padding: 28, display: "flex", flexDirection: "column", gap: 24 }}>
              <SliderInput label="Sleep Hours" name="sleepHours" value={form.sleepHours} min={0} max={12} unit="h" onChange={handleChange} />
              <div style={{ height: 1, background: "#f3f4f6" }} />
              <SliderInput label="Hydration Level" name="hydrationLevelPercent" value={form.hydrationLevelPercent} min={0} max={100} unit="%" onChange={handleChange} />
              <div style={{ height: 1, background: "#f3f4f6" }} />

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b7280", display: "block", marginBottom: 10 }}>Resting Heart Rate (bpm)</label>
                <input type="number" name="restingHeartRate" placeholder="e.g. 58" value={form.restingHeartRate} onChange={handleChange}
                  style={{ width: "100%", background: "rgba(238,242,255,0.5)", border: "1px solid #e0e7ff", borderRadius: 12, color: "#111827", fontFamily: "inherit", fontSize: 14, padding: "11px 14px", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" }} />
              </div>
              <div style={{ height: 1, background: "#f3f4f6" }} />

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b7280", display: "block", marginBottom: 10 }}>Stress Level</label>
                <StressSelector value={form.stressLevel} onChange={(v) => setForm({ ...form, stressLevel: v })} />
              </div>
              <div style={{ height: 1, background: "#f3f4f6" }} />

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b7280", display: "block", marginBottom: 10 }}>Subjective Feeling (1–10)</label>
                <FeelingSelector value={form.subjectiveFeeling} onChange={(v) => setForm({ ...form, subjectiveFeeling: v })} />
              </div>

              <button type="submit" disabled={loading}
                style={{ width: "100%", padding: "14px", borderRadius: 14, border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.2s",
                  ...(success
                    ? { background: "#d1fae5", color: "#059669", border: "1px solid #a7f3d0" }
                    : { background: "linear-gradient(135deg, #2563eb, #6366f1, #7c3aed)", color: "white", boxShadow: "0 4px 20px rgba(99,102,241,0.35)", opacity: loading ? 0.6 : 1 })
                }}>
                {loading ? "Submitting…" : success ? "✓ Check-In Logged" : "Submit Check-In"}
              </button>
            </form>
          </div>

          {/* RIGHT: Chart + History */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Score Trend */}
            {history.length > 0 && (
              <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid #e5e7eb", borderRadius: 24, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                <div style={{ padding: "20px 28px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827" }}>Score Trend</h2>
                  <div style={{ display: "flex", gap: 16, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {[["#10b981","High"],["#6366f1","Moderate"],["#f43f5e","Low"]].map(([c,l]) => (
                      <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
                        <span style={{ color: "#9ca3af" }}>{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ padding: 28 }}>
                  <ReadinessBarChart history={history} />
                </div>
              </div>
            )}

            {/* History */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827" }}>Check-In History</h2>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af" }}>{history.length} entries</span>
                </div>
              </div>

              {history.length === 0 ? (
                <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "2px dashed #c7d2fe", borderRadius: 24, padding: "64px 32px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", border: "2px dashed #a5b4fc", display: "flex", alignItems: "center", justifyContent: "center", color: "#6366f1" }}>
                    <Activity size={24} />
                  </div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827" }}>No Check-Ins Yet</h3>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280", maxWidth: 300, lineHeight: 1.7 }}>
                    Submit your first daily readiness to begin tracking recovery and performance trends.
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {history.map((item) => <HistoryRow key={item._id} item={item} />)}
                </div>
              )}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer style={{ position: "relative", background: "#0f172a", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "48px 48px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
          <div>
            <h2 style={{ fontSize: "1.375rem", fontWeight: 800 }}>
              <span style={{ color: "white" }}>ELITE</span>
              <span style={{ background: "linear-gradient(135deg,#60a5fa,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ATELIER</span>
            </h2>
            <p style={{ color: "#6b7280", fontSize: "0.8rem", marginTop: 4 }}>AI-powered performance engineering.</p>
          </div>
          <p style={{ color: "#4b5563", fontSize: "0.8rem" }}>© 2026 Elite Performance Atelier. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}