// // // import { useEffect, useState } from "react";
// // // import { apsAPI } from "../api/axios";
// // // import { useAuth } from "../context/AuthContext";
// // // import {
// // //   LineChart,
// // //   Line,
// // //   XAxis,
// // //   YAxis,
// // //   Tooltip,
// // //   ResponsiveContainer,
// // //   CartesianGrid,
// // // } from "recharts";

// // // export default function APS() {
// // //   const { user } = useAuth();
// // //   const [data, setData] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     const fetchAPS = async () => {
// // //       try {
// // //         const res = await apsAPI.getHistory(user.id, 30);

// // //         const formatted = res.data.points.map((item) => ({
// // //           date: new Date(item.date).toLocaleDateString(),
// // //           apsScore: item.apsScore,
// // //         }));

// // //         setData(formatted);
// // //       } catch (err) {
// // //         console.error(err);
// // //       }

// // //       setLoading(false);
// // //     };

// // //     fetchAPS();
// // //   }, [user.id]);

// // //   if (loading) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-screen">
// // //         <div className="card">Loading APS history...</div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div>

// // //       <h1 className="text-3xl font-bold mb-8">
// // //         APS Performance (Last 30 Days)
// // //       </h1>

// // //       <div className="card h-[400px]">

// // //         {data.length === 0 ? (
// // //           <p>No APS data available</p>
// // //         ) : (
// // //           <ResponsiveContainer width="100%" height="100%">
// // //             <LineChart data={data}>
// // //               <CartesianGrid strokeDasharray="3 3" />
// // //               <XAxis dataKey="date" />
// // //               <YAxis domain={[0, 100]} />
// // //               <Tooltip />
// // //               <Line
// // //                 type="monotone"
// // //                 dataKey="apsScore"
// // //                 stroke="#FF6A00"
// // //                 strokeWidth={3}
// // //               />
// // //             </LineChart>
// // //           </ResponsiveContainer>
// // //         )}

// // //       </div>

// // //     </div>
// // //   );
// // // }


// // import { useState } from "react";
// // import { workoutAPI } from "../api/axios";
// // import { useAuth } from "../context/AuthContext";
// // import { Activity, Zap, ShieldAlert, TrendingUp } from "lucide-react";

// // export default function APS() {
// //   const { user } = useAuth();
// //   const today = new Date().toISOString().split("T")[0];

// //   const [form, setForm] = useState({
// //     weeklyPlanId: "",
// //     plannedWorkoutType: "upper",
// //     actualWorkoutType: "upper",
// //     plannedIntensityLevel: "moderate",
// //     plannedVolumeLevel: "moderate",
// //     intensityLevelUsed: "moderate",
// //     volumeLevelUsed: "moderate",
// //     completionPercentage: 100,
// //     durationMinutes: 60,
// //     perceivedExertion: 7,
// //     painReported: "",
// //     injuryRiskFlag: false,
// //     formQuality: 8,
// //     energyLevel: 8,
// //   });

// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [result, setResult] = useState(null);

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;

// //     setForm((prev) => ({
// //       ...prev,
// //       [name]:
// //         type === "checkbox"
// //           ? checked
// //           : [
// //             "completionPercentage",
// //             "durationMinutes",
// //             "perceivedExertion",
// //             "formQuality",
// //             "energyLevel",
// //           ].includes(name)
// //             ? Number(value)
// //             : value,
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);
// //     setResult(null);

// //     try {
// //       const payload = {
// //         userId: user.id,
// //         date: today,
// //         ...form,
// //         painReported:
// //           form.painReported.trim() === ""
// //             ? []
// //             : form.painReported.split(",").map((p) => p.trim()),
// //       };

// //       const res = await workoutAPI.complete(payload);
// //       setResult(res.data);
// //     } catch (err) {
// //       setError(
// //         err.response?.data?.message || "Failed to complete workout"
// //       );
// //     }

// //     setLoading(false);
// //   };

// //   return (
// //     <div style={{ maxWidth: 900, margin: "60px auto", padding: 24 }}>
// //       <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24 }}>
// //         Workout Completion
// //       </h1>

// //       {error && (
// //         <div style={{ background: "#fee2e2", padding: 12, borderRadius: 8, color: "#991b1b", marginBottom: 16 }}>
// //           {error}
// //         </div>
// //       )}

// //       <form
// //         onSubmit={handleSubmit}
// //         style={{
// //           background: "white",
// //           padding: 24,
// //           borderRadius: 16,
// //           boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
// //           display: "grid",
// //           gap: 16,
// //         }}
// //       >
// //         <input
// //           name="weeklyPlanId"
// //           placeholder="Weekly Plan ID"
// //           value={form.weeklyPlanId}
// //           onChange={handleChange}
// //           required
// //         />

// //         <select name="intensityLevelUsed" value={form.intensityLevelUsed} onChange={handleChange}>
// //           <option value="low">Low Intensity</option>
// //           <option value="moderate">Moderate Intensity</option>
// //           <option value="high">High Intensity</option>
// //         </select>

// //         <select name="volumeLevelUsed" value={form.volumeLevelUsed} onChange={handleChange}>
// //           <option value="low">Low Volume</option>
// //           <option value="moderate">Moderate Volume</option>
// //           <option value="high">High Volume</option>
// //         </select>

// //         <input
// //           type="number"
// //           name="completionPercentage"
// //           placeholder="Completion %"
// //           value={form.completionPercentage}
// //           onChange={handleChange}
// //         />

// //         <input
// //           type="number"
// //           name="durationMinutes"
// //           placeholder="Duration (minutes)"
// //           value={form.durationMinutes}
// //           onChange={handleChange}
// //         />

// //         <input
// //           type="number"
// //           name="perceivedExertion"
// //           placeholder="RPE (1–10)"
// //           value={form.perceivedExertion}
// //           onChange={handleChange}
// //         />

// //         <input
// //           name="painReported"
// //           placeholder="Pain areas (comma separated)"
// //           value={form.painReported}
// //           onChange={handleChange}
// //         />

// //         <label>
// //           <input
// //             type="checkbox"
// //             name="injuryRiskFlag"
// //             checked={form.injuryRiskFlag}
// //             onChange={handleChange}
// //           />
// //           Injury Risk Flag
// //         </label>

// //         <input
// //           type="number"
// //           name="formQuality"
// //           placeholder="Form Quality (1–10)"
// //           value={form.formQuality}
// //           onChange={handleChange}
// //         />

// //         <input
// //           type="number"
// //           name="energyLevel"
// //           placeholder="Energy Level (1–10)"
// //           value={form.energyLevel}
// //           onChange={handleChange}
// //         />

// //         <button
// //           type="submit"
// //           disabled={loading}
// //           style={{
// //             background: "#6366f1",
// //             color: "white",
// //             padding: 12,
// //             borderRadius: 10,
// //             fontWeight: 700,
// //             cursor: loading ? "not-allowed" : "pointer",
// //           }}
// //         >
// //           {loading ? "Submitting..." : "Complete Workout"}
// //         </button>
// //       </form>

// //       {result && (
// //         <div style={{ marginTop: 32, display: "grid", gap: 16 }}>
// //           <div style={cardStyle}>
// //             <Activity size={20} />
// //             <div>
// //               <p style={labelStyle}>APS Score</p>
// //               <p style={valueStyle}>{result.aps}</p>
// //             </div>
// //           </div>

// //           <div style={cardStyle}>
// //             <Zap size={20} />
// //             <div>
// //               <p style={labelStyle}>Recovery Type</p>
// //               <p style={valueStyle}>{result.recovery.recoveryType}</p>
// //               <p style={{ fontSize: 12, color: "#6b7280" }}>
// //                 {result.recovery.reason}
// //               </p>
// //             </div>
// //           </div>

// //           <div style={cardStyle}>
// //             <TrendingUp size={20} />
// //             <div>
// //               <p style={labelStyle}>Habit Risk</p>
// //               <p style={valueStyle}>{result.habitRisk.riskLevel}</p>
// //               <p style={{ fontSize: 12, color: "#6b7280" }}>
// //                 {result.habitRisk.reason}
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // const cardStyle = {
// //   display: "flex",
// //   gap: 16,
// //   alignItems: "center",
// //   background: "white",
// //   padding: 20,
// //   borderRadius: 14,
// //   boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
// // };

// // const labelStyle = {
// //   fontSize: 12,
// //   fontWeight: 700,
// //   color: "#6b7280",
// //   textTransform: "uppercase",
// // };

// // const valueStyle = {
// //   fontSize: 22,
// //   fontWeight: 800,
// // };

// import { useState } from "react";
// import { workoutAPI } from "../api/axios";
// import { useAuth } from "../context/AuthContext";
// import { Activity, Zap, TrendingUp, ChevronRight, ChevronLeft, Check } from "lucide-react";

// /* ─────────────────────────────────────────────
//    DESIGN TOKENS
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
//   from { opacity: 0; transform: translateY(16px); }
//   to   { opacity: 1; transform: translateY(0);    }
// }
// @keyframes countUp {
//   from { opacity: 0; transform: scale(0.8); }
//   to   { opacity: 1; transform: scale(1);   }
// }
// @keyframes shimmer {
//   0%   { background-position: -200% center; }
//   100% { background-position:  200% center; }
// }
// .aps-fade { animation: fadeUp 0.35s ease forwards; }
// .aps-count { animation: countUp 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
// `;

// /* ─────────────────────────────────────────────
//    STEP CONFIG
// ───────────────────────────────────────────── */
// const STEPS = [
//   { id: 0, label: "Plan",       icon: "📋", desc: "Workout details"      },
//   { id: 1, label: "Performance", icon: "⚡", desc: "How it went"          },
//   { id: 2, label: "Feedback",   icon: "🧠", desc: "Body & mind signals"  },
//   { id: 3, label: "Review",     icon: "✅", desc: "Confirm & submit"     },
// ];

// const WORKOUT_TYPES = ["upper","lower","full_body","push","pull","legs","cardio","mobility","rest"];
// const INTENSITY     = ["low","moderate","high"];
// const VOLUME        = ["low","moderate","high"];

// /* ─────────────────────────────────────────────
//    MICRO COMPONENTS
// ───────────────────────────────────────────── */
// function Label({ children }) {
//   return (
//     <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.textLight, marginBottom: 8 }}>
//       {children}
//     </p>
//   );
// }

// function StyledInput({ name, value, onChange, placeholder, type = "text" }) {
//   const [focused, setFocused] = useState(false);
//   return (
//     <input
//       name={name} value={value} onChange={onChange}
//       placeholder={placeholder} type={type}
//       onFocus={() => setFocused(true)}
//       onBlur={() => setFocused(false)}
//       style={{
//         width: "100%", padding: "12px 16px",
//         borderRadius: 12,
//         border: `1.5px solid ${focused ? T.indigo : T.borderSoft}`,
//         background: focused ? "rgba(238,242,255,0.9)" : "rgba(238,242,255,0.5)",
//         boxShadow: focused ? `0 0 0 3px rgba(99,102,241,0.10)` : "none",
//         fontFamily: "'Outfit', sans-serif",
//         fontSize: 14, color: T.text,
//         outline: "none", transition: "all 0.2s",
//         boxSizing: "border-box",
//       }}
//     />
//   );
// }

// function SegmentPicker({ options, value, onChange, name, colorize }) {
//   const colorMap = { low: T.success, moderate: T.indigo, high: T.danger };
//   return (
//     <div style={{ display: "flex", gap: 8 }}>
//       {options.map(opt => {
//         const active = value === opt;
//         const accent = colorize ? colorMap[opt] || T.indigo : T.indigo;
//         return (
//           <button key={opt} type="button" onClick={() => onChange({ target: { name, value: opt } })}
//             style={{
//               flex: 1, padding: "10px 6px",
//               borderRadius: 12,
//               border: `1.5px solid ${active ? accent : T.borderSoft}`,
//               background: active ? `${accent}18` : "rgba(238,242,255,0.4)",
//               color: active ? accent : T.muted,
//               fontFamily: "'Outfit', sans-serif",
//               fontSize: 12, fontWeight: active ? 700 : 500,
//               cursor: "pointer", transition: "all 0.18s",
//               letterSpacing: "0.04em", textTransform: "capitalize",
//             }}>
//             {opt}
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// function WorkoutTypePicker({ value, onChange, name }) {
//   const icons = { upper:"💪", lower:"🦵", full_body:"🏋️", push:"⬆️", pull:"⬇️", legs:"🦿", cardio:"🏃", mobility:"🧘", rest:"😴" };
//   return (
//     <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
//       {WORKOUT_TYPES.map(type => {
//         const active = value === type;
//         return (
//           <button key={type} type="button" onClick={() => onChange({ target: { name, value: type } })}
//             style={{
//               padding: "12px 8px",
//               borderRadius: 12,
//               border: `1.5px solid ${active ? T.indigo : T.borderSoft}`,
//               background: active ? "rgba(99,102,241,0.10)" : "rgba(238,242,255,0.4)",
//               color: active ? T.indigo : T.textLight,
//               fontFamily: "'Outfit', sans-serif",
//               fontSize: 11, fontWeight: active ? 700 : 500,
//               cursor: "pointer", transition: "all 0.18s",
//               textTransform: "capitalize", letterSpacing: "0.04em",
//               display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
//             }}>
//             <span style={{ fontSize: 18 }}>{icons[type]}</span>
//             {type.replace(/_/g, " ")}
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// function ScaleSlider({ name, value, onChange, min = 1, max = 10, label, colorize }) {
//   const pct  = ((value - min) / (max - min)) * 100;
//   const color = colorize
//     ? pct < 40 ? T.success : pct < 70 ? T.indigo : T.danger
//     : T.indigo;
//   return (
//     <div>
//       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//         <Label>{label}</Label>
//         <span style={{ fontSize: 20, fontWeight: 900, color, fontFamily: "'Outfit', sans-serif" }}>{value}</span>
//       </div>
//       <input type="range" name={name} min={min} max={max} value={value} onChange={onChange}
//         style={{ width: "100%", accentColor: color, cursor: "pointer", height: 4 }}
//       />
//       <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
//         <span style={{ fontSize: 10, color: T.muted }}>{min}</span>
//         <span style={{ fontSize: 10, color: T.muted }}>{max}</span>
//       </div>
//     </div>
//   );
// }

// function Toggle({ name, checked, onChange, label, desc }) {
//   return (
//     <div style={{
//       display: "flex", alignItems: "center", justifyContent: "space-between",
//       padding: "14px 16px", borderRadius: 14,
//       border: `1.5px solid ${checked ? T.danger : T.borderSoft}`,
//       background: checked ? "rgba(244,63,94,0.06)" : "rgba(238,242,255,0.4)",
//       transition: "all 0.2s", cursor: "pointer",
//     }} onClick={() => onChange({ target: { name, type: "checkbox", checked: !checked } })}>
//       <div>
//         <p style={{ fontSize: 13, fontWeight: 600, color: checked ? T.danger : T.text }}>{label}</p>
//         {desc && <p style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{desc}</p>}
//       </div>
//       <div style={{
//         width: 44, height: 24, borderRadius: 12, flexShrink: 0,
//         background: checked ? T.danger : "rgba(226,232,240,0.8)",
//         position: "relative", transition: "background 0.2s",
//         boxShadow: checked ? `0 2px 8px rgba(244,63,94,0.3)` : "inset 0 0 0 1px #e0e7ff",
//       }}>
//         <div style={{
//           position: "absolute", top: 3,
//           left: checked ? 23 : 3,
//           width: 18, height: 18, borderRadius: "50%",
//           background: "white", transition: "left 0.2s",
//           boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
//         }} />
//       </div>
//     </div>
//   );
// }

// /* Review row */
// function ReviewRow({ label, value }) {
//   return (
//     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${T.borderSoft}` }}>
//       <span style={{ fontSize: 11, color: T.textLight, fontWeight: 600, letterSpacing: "0.06em", textTransform: "capitalize" }}>{label.replace(/([A-Z])/g, " $1")}</span>
//       <span style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{String(value)}</span>
//     </div>
//   );
// }

// /* Result stat card */
// function StatCard({ icon: Icon, label, value, sub, color = T.indigo }) {
//   return (
//     <div style={{
//       ...glass, borderRadius: 20, padding: "24px 28px",
//       display: "flex", alignItems: "flex-start", gap: 16,
//       position: "relative", overflow: "hidden",
//     }}>
//       <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: T.gradPrimary, opacity: 0.6 }} />
//       <div style={{
//         width: 44, height: 44, borderRadius: 12, flexShrink: 0,
//         background: `${color}18`, border: `1px solid ${color}33`,
//         display: "flex", alignItems: "center", justifyContent: "center",
//       }}>
//         <Icon size={20} color={color} />
//       </div>
//       <div>
//         <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.muted, marginBottom: 4 }}>{label}</p>
//         <p style={{ fontSize: 28, fontWeight: 900, color, lineHeight: 1, fontFamily: "'Outfit', sans-serif" }} className="aps-count">{value}</p>
//         {sub && <p style={{ fontSize: 12, color: T.textMid, marginTop: 5, lineHeight: 1.5 }}>{sub}</p>}
//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    MAIN COMPONENT
// ───────────────────────────────────────────── */
// export default function APS() {
//   const { user } = useAuth();
//   const today = new Date().toISOString().split("T")[0];

//   const [step,    setStep]    = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error,   setError]   = useState("");
//   const [result,  setResult]  = useState(null);

//   const [form, setForm] = useState({
//     weeklyPlanId:          "",
//     plannedWorkoutType:    "upper",
//     actualWorkoutType:     "upper",
//     plannedIntensityLevel: "moderate",
//     plannedVolumeLevel:    "moderate",
//     intensityLevelUsed:    "moderate",
//     volumeLevelUsed:       "moderate",
//     completionPercentage:  100,
//     durationMinutes:       60,
//     perceivedExertion:     7,
//     painReported:          "",
//     injuryRiskFlag:        false,
//     formQuality:           8,
//     energyLevel:           8,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm(prev => ({
//       ...prev,
//       [name]: type === "checkbox"
//         ? checked
//         : ["completionPercentage","durationMinutes","perceivedExertion","formQuality","energyLevel"].includes(name)
//           ? Number(value)
//           : value,
//     }));
//   };

//   const handleSubmit = async () => {
//     setError(""); setLoading(true); setResult(null);
//     try {
//       const payload = {
//         userId: user.id, date: today, ...form,
//         painReported: form.painReported.trim() === ""
//           ? [] : form.painReported.split(",").map(p => p.trim()),
//       };
//       const res = await workoutAPI.complete(payload);
//       setResult(res.data);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to complete workout");
//     }
//     setLoading(false);
//   };

//   /* step content */
//   const stepContent = [

//     /* ── STEP 0: Plan ── */
//     <div key={0} className="aps-fade" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
//       <div>
//         <Label>Weekly Plan ID</Label>
//         <StyledInput name="weeklyPlanId" value={form.weeklyPlanId} onChange={handleChange} placeholder="e.g. plan_abc123" />
//         <p style={{ fontSize: 11, color: T.muted, marginTop: 6 }}>Find this in your active training plan dashboard.</p>
//       </div>
//       <div>
//         <Label>Planned Workout Type</Label>
//         <WorkoutTypePicker name="plannedWorkoutType" value={form.plannedWorkoutType} onChange={handleChange} />
//       </div>
//       <div>
//         <Label>Actual Workout Type</Label>
//         <WorkoutTypePicker name="actualWorkoutType" value={form.actualWorkoutType} onChange={handleChange} />
//       </div>
//     </div>,

//     /* ── STEP 1: Performance ── */
//     <div key={1} className="aps-fade" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
//       <div>
//         <Label>Intensity Used</Label>
//         <SegmentPicker name="intensityLevelUsed" value={form.intensityLevelUsed} options={INTENSITY} onChange={handleChange} colorize />
//       </div>
//       <div>
//         <Label>Volume Used</Label>
//         <SegmentPicker name="volumeLevelUsed" value={form.volumeLevelUsed} options={VOLUME} onChange={handleChange} colorize />
//       </div>
//       <ScaleSlider name="completionPercentage" value={form.completionPercentage} min={0} max={100} onChange={handleChange} label="Completion %" />
//       <div>
//         <Label>Duration</Label>
//         <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//           <StyledInput name="durationMinutes" value={form.durationMinutes} onChange={handleChange} type="number" placeholder="60" />
//           <span style={{ fontSize: 13, color: T.muted, whiteSpace: "nowrap", fontWeight: 600 }}>minutes</span>
//         </div>
//       </div>
//     </div>,

//     /* ── STEP 2: Feedback ── */
//     <div key={2} className="aps-fade" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
//       <ScaleSlider name="perceivedExertion" value={form.perceivedExertion} min={1} max={10} onChange={handleChange} label="Perceived Exertion (RPE)" colorize />
//       <ScaleSlider name="energyLevel"       value={form.energyLevel}       min={1} max={10} onChange={handleChange} label="Energy Level" />
//       <ScaleSlider name="formQuality"       value={form.formQuality}       min={1} max={10} onChange={handleChange} label="Form Quality" />
//       <div>
//         <Label>Pain Areas</Label>
//         <StyledInput name="painReported" value={form.painReported} onChange={handleChange} placeholder="knee, shoulder (comma separated)" />
//         <p style={{ fontSize: 11, color: T.muted, marginTop: 6 }}>Leave blank if none. Separate multiple areas with commas.</p>
//       </div>
//       <Toggle
//         name="injuryRiskFlag"
//         checked={form.injuryRiskFlag}
//         onChange={handleChange}
//         label="Flag Injury Risk"
//         desc="Enable if you felt something that may need attention"
//       />
//     </div>,

//     /* ── STEP 3: Review ── */
//     <div key={3} className="aps-fade" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//       <div style={{ padding: "18px 20px", borderRadius: 16, background: "rgba(238,242,255,0.6)", border: `1px solid ${T.borderSoft}` }}>
//         {[
//           ["Plan ID",           form.weeklyPlanId || "—"],
//           ["Planned Type",      form.plannedWorkoutType],
//           ["Actual Type",       form.actualWorkoutType],
//           ["Intensity",         form.intensityLevelUsed],
//           ["Volume",            form.volumeLevelUsed],
//           ["Completion",        `${form.completionPercentage}%`],
//           ["Duration",          `${form.durationMinutes} min`],
//           ["RPE",               `${form.perceivedExertion} / 10`],
//           ["Energy",            `${form.energyLevel} / 10`],
//           ["Form Quality",      `${form.formQuality} / 10`],
//           ["Pain Areas",        form.painReported || "None"],
//           ["Injury Risk Flag",  form.injuryRiskFlag ? "⚠ Yes" : "No"],
//         ].map(([label, value]) => <ReviewRow key={label} label={label} value={value} />)}
//       </div>
//       <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(99,102,241,0.07)", border: `1px solid rgba(99,102,241,0.15)` }}>
//         <p style={{ fontSize: 12, color: T.indigo, fontWeight: 600 }}>
//           ◆ Ready to calculate your Athlete Performance Score. Hit submit to get your results.
//         </p>
//       </div>
//     </div>,
//   ];

//   /* ── RESULT VIEW ── */
//   if (result) {
//     const apsScore = result.aps;
//     const apsColor = apsScore >= 80 ? T.success : apsScore >= 50 ? T.indigo : T.danger;
//     return (
//       <>
//         <style>{KEYFRAMES}</style>
//         {/* blobs */}
//         <div style={{ position: "fixed", top: -120, right: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(99,102,241,0.07)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />

//         <div style={{ minHeight: "100vh", background: T.gradBody, fontFamily: "'Outfit', sans-serif", padding: "48px 20px 60px", position: "relative", zIndex: 1 }}>
//           <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24, animation: "fadeUp 0.4s ease both" }}>

//             <div style={{ textAlign: "center" }}>
//               <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.indigo, marginBottom: 8 }}>◆ APS Result</p>
//               <div style={{ fontSize: 88, fontWeight: 900, color: apsColor, lineHeight: 1, letterSpacing: "-0.04em", fontFamily: "'Outfit', sans-serif" }} className="aps-count">
//                 {apsScore}
//               </div>
//               <p style={{ fontSize: 14, color: T.muted, marginTop: 8 }}>Athlete Performance Score</p>
//             </div>

//             <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//               <StatCard icon={Activity}   label="APS Score"    value={result.aps}                      color={apsColor} />
//               <StatCard icon={Zap}        label="Recovery"     value={result.recovery?.recoveryType}   sub={result.recovery?.reason}   color={T.indigo} />
//               <StatCard icon={TrendingUp} label="Habit Risk"   value={result.habitRisk?.riskLevel}     sub={result.habitRisk?.reason}  color={T.violet} />
//             </div>

//             <button onClick={() => { setResult(null); setStep(0); }} style={{
//               padding: "14px", borderRadius: 14,
//               background: T.gradPrimary, color: "white",
//               fontFamily: "'Outfit', sans-serif", fontSize: 12,
//               fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
//               border: "none", cursor: "pointer",
//               boxShadow: "0 4px 20px rgba(99,102,241,0.30)",
//             }}>
//               Log Another Workout ✦
//             </button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   /* ── MAIN WIZARD ── */
//   return (
//     <>
//       <style>{KEYFRAMES}</style>

//       {/* blobs */}
//       <div style={{ position: "fixed", top: -120, right: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(99,102,241,0.07)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
//       <div style={{ position: "fixed", bottom: -100, left: "20%", width: 300, height: 300, borderRadius: "50%", background: "rgba(124,58,237,0.05)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />

//       <div style={{ minHeight: "100vh", background: T.gradBody, fontFamily: "'Outfit', sans-serif", padding: "48px 20px 80px", position: "relative", zIndex: 1 }}>
//         <div style={{ maxWidth: 640, margin: "0 auto" }}>

//           {/* ── Header ── */}
//           <div style={{ marginBottom: 36, textAlign: "center" }}>
//             <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.indigo, marginBottom: 8 }}>◆ Workout Logger</p>
//             <h1 style={{ fontSize: "2rem", fontWeight: 800, color: T.text, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
//               Athlete Performance<br />
//               <span style={{ background: T.gradPrimary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Score</span>
//             </h1>
//             <p style={{ fontSize: 13, color: T.muted, marginTop: 8 }}>Log your session in 4 quick steps</p>
//           </div>

//           {/* ── Step progress ── */}
//           <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 36, position: "relative" }}>
//             {STEPS.map((s, i) => {
//               const done    = i < step;
//               const current = i === step;
//               return (
//                 <div key={s.id} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
//                   {/* connector line */}
//                   {i < STEPS.length - 1 && (
//                     <div style={{
//                       position: "absolute", top: 18, left: "50%", width: "100%", height: 2,
//                       background: done ? T.gradPrimary : T.borderSoft,
//                       transition: "background 0.4s",
//                       zIndex: 0,
//                     }} />
//                   )}
//                   {/* circle */}
//                   <div style={{
//                     width: 36, height: 36, borderRadius: "50%", zIndex: 1,
//                     display: "flex", alignItems: "center", justifyContent: "center",
//                     background: done ? T.gradPrimary : current ? "white" : "rgba(238,242,255,0.8)",
//                     border: `2px solid ${done ? "transparent" : current ? T.indigo : T.borderSoft}`,
//                     boxShadow: current ? `0 0 0 4px rgba(99,102,241,0.15)` : "none",
//                     transition: "all 0.3s",
//                     fontSize: done ? 14 : 16,
//                     cursor: done ? "pointer" : "default",
//                   }} onClick={() => done && setStep(i)}>
//                     {done ? <Check size={14} color="white" /> : s.icon}
//                   </div>
//                   <span style={{ fontSize: 10, fontWeight: current ? 700 : 500, color: current ? T.indigo : T.muted, marginTop: 6, letterSpacing: "0.04em" }}>
//                     {s.label}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>

//           {/* ── Card ── */}
//           <div style={{ ...glass, borderRadius: 24, overflow: "hidden", position: "relative" }}>
//             {/* gradient top line */}
//             <div style={{ height: 3, background: T.gradPrimary, opacity: 0.7 }} />

//             <div style={{ padding: "32px 32px 28px" }}>
//               {/* Step header */}
//               <div style={{ marginBottom: 28 }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
//                   <span style={{ fontSize: 22 }}>{STEPS[step].icon}</span>
//                   <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.indigo }}>
//                     Step {step + 1} of {STEPS.length} — {STEPS[step].label}
//                   </p>
//                 </div>
//                 <p style={{ fontSize: 13, color: T.muted }}>{STEPS[step].desc}</p>
//               </div>

//               {error && (
//                 <div style={{ padding: "12px 16px", borderRadius: 12, background: "rgba(244,63,94,0.07)", border: "1px solid rgba(244,63,94,0.25)", fontSize: 12, color: T.danger, marginBottom: 20, display: "flex", gap: 8 }}>
//                   <span>⚠</span>{error}
//                 </div>
//               )}

//               {/* Step content */}
//               {stepContent[step]}

//               {/* Navigation */}
//               <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
//                 {step > 0 && (
//                   <button type="button" onClick={() => setStep(s => s - 1)} style={{
//                     flex: 1, padding: "13px", borderRadius: 14,
//                     border: `1.5px solid ${T.borderSoft}`,
//                     background: "rgba(238,242,255,0.5)",
//                     color: T.textLight, fontFamily: "'Outfit', sans-serif",
//                     fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
//                     cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
//                   }}>
//                     <ChevronLeft size={14} /> Back
//                   </button>
//                 )}
//                 {step < STEPS.length - 1 ? (
//                   <button type="button" onClick={() => setStep(s => s + 1)} style={{
//                     flex: 2, padding: "13px",
//                     borderRadius: 14,
//                     background: T.gradPrimary, color: "white",
//                     fontFamily: "'Outfit', sans-serif",
//                     fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
//                     border: "none", cursor: "pointer",
//                     boxShadow: "0 4px 16px rgba(99,102,241,0.28)",
//                     display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
//                     transition: "opacity 0.2s",
//                   }}>
//                     Continue <ChevronRight size={14} />
//                   </button>
//                 ) : (
//                   <button type="button" onClick={handleSubmit} disabled={loading} style={{
//                     flex: 2, padding: "13px",
//                     borderRadius: 14,
//                     background: T.gradPrimary, color: "white",
//                     fontFamily: "'Outfit', sans-serif",
//                     fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
//                     border: "none", cursor: loading ? "not-allowed" : "pointer",
//                     boxShadow: "0 4px 16px rgba(99,102,241,0.28)",
//                     opacity: loading ? 0.6 : 1,
//                     display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
//                   }}>
//                     {loading ? "Calculating…" : "Submit & Get Score ✦"}
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Progress indicator text */}
//           <p style={{ textAlign: "center", fontSize: 11, color: T.muted, marginTop: 16 }}>
//             {step + 1} of {STEPS.length} steps complete
//             {step > 0 && <span style={{ color: T.indigo, fontWeight: 600 }}> · tap completed steps to go back</span>}
//           </p>

//         </div>
//       </div>
//     </>
//   );
// }

import { useState, useEffect } from "react";
import { workoutAPI, planAPI } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Activity, Zap, TrendingUp, ChevronRight, ChevronLeft, Check } from "lucide-react";

/* ─────────────────────────────────────────────
   DESIGN TOKENS
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
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0);    }
}
@keyframes countUp {
  from { opacity: 0; transform: scale(0.8); }
  to   { opacity: 1; transform: scale(1);   }
}
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}
@keyframes gradientShift {
  0%   { background-position: 0% 50%;   }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%;   }
}
.aps-fade  { animation: fadeUp 0.35s ease forwards; }
.aps-count { animation: countUp 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
`;

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const STEPS = [
  { id: 0, label: "Session",  icon: "⚡", desc: "How did the workout go?"  },
  { id: 1, label: "Feedback", icon: "🧠", desc: "Body & mind signals"      },
];

const WORKOUT_TYPES = ["upper","lower","full_body","push","pull","legs","cardio","mobility","rest"];
const INTENSITY     = ["low","moderate","high"];
const VOLUME        = ["low","moderate","high"];
const WORKOUT_ICONS = {
  upper:"💪", lower:"🦵", full_body:"🏋️", push:"⬆️",
  pull:"⬇️", legs:"🦿", cardio:"🏃", mobility:"🧘", rest:"😴",
};

/* ─────────────────────────────────────────────
   MICRO COMPONENTS
───────────────────────────────────────────── */
function Label({ children }) {
  return (
    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.textLight, marginBottom: 8 }}>
      {children}
    </p>
  );
}

function AutoFilledBadge({ label, value }) {
  return (
    <div style={{
      padding: "10px 14px", borderRadius: 12,
      background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.18)",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <span style={{ fontSize: 11, color: T.textLight, fontWeight: 600, textTransform: "capitalize" }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: T.text, textTransform: "capitalize" }}>{value}</span>
        <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 6px", borderRadius: 4, background: "rgba(34,197,94,0.12)", color: T.success, border: "1px solid rgba(34,197,94,0.2)" }}>Auto</span>
      </div>
    </div>
  );
}

function SegmentPicker({ options, value, onChange, name, colorize }) {
  const colorMap = { low: T.success, moderate: T.indigo, high: T.danger };
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {options.map(opt => {
        const active = value === opt;
        const accent = colorize ? colorMap[opt] || T.indigo : T.indigo;
        return (
          <button key={opt} type="button"
            onClick={() => onChange({ target: { name, value: opt } })}
            style={{
              flex: 1, padding: "11px 6px", borderRadius: 12,
              border: `1.5px solid ${active ? accent : T.borderSoft}`,
              background: active ? `${accent}18` : "rgba(238,242,255,0.4)",
              color: active ? accent : T.muted,
              fontFamily: "'Outfit', sans-serif",
              fontSize: 12, fontWeight: active ? 700 : 500,
              cursor: "pointer", transition: "all 0.18s",
              letterSpacing: "0.04em", textTransform: "capitalize",
            }}>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function WorkoutTypePicker({ value, onChange, name }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
      {WORKOUT_TYPES.map(type => {
        const active = value === type;
        return (
          <button key={type} type="button"
            onClick={() => onChange({ target: { name, value: type } })}
            style={{
              padding: "12px 8px", borderRadius: 12,
              border: `1.5px solid ${active ? T.indigo : T.borderSoft}`,
              background: active ? "rgba(99,102,241,0.10)" : "rgba(238,242,255,0.4)",
              color: active ? T.indigo : T.textLight,
              fontFamily: "'Outfit', sans-serif",
              fontSize: 11, fontWeight: active ? 700 : 500,
              cursor: "pointer", transition: "all 0.18s",
              textTransform: "capitalize", letterSpacing: "0.04em",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            }}>
            <span style={{ fontSize: 18 }}>{WORKOUT_ICONS[type]}</span>
            {type.replace(/_/g, " ")}
          </button>
        );
      })}
    </div>
  );
}

function ScaleSlider({ name, value, onChange, min = 1, max = 10, label, colorize, unit = "" }) {
  const pct   = ((value - min) / (max - min)) * 100;
  const color = colorize
    ? pct < 40 ? T.success : pct < 70 ? T.indigo : T.danger
    : T.indigo;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <Label>{label}</Label>
        <span style={{ fontSize: 22, fontWeight: 900, color, fontFamily: "'Outfit', sans-serif", lineHeight: 1 }}>
          {value}{unit}
        </span>
      </div>
      <input type="range" name={name} min={min} max={max} value={value} onChange={onChange}
        style={{ width: "100%", accentColor: color, cursor: "pointer", height: 4 }} />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        <span style={{ fontSize: 10, color: T.muted }}>{min}{unit}</span>
        <span style={{ fontSize: 10, color: T.muted }}>{max}{unit}</span>
      </div>
    </div>
  );
}

function StyledInput({ name, value, onChange, placeholder, type = "text" }) {
  const [focused, setFocused] = useState(false);
  return (
    <input name={name} value={value} onChange={onChange}
      placeholder={placeholder} type={type}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{
        width: "100%", padding: "12px 16px", borderRadius: 12,
        border: `1.5px solid ${focused ? T.indigo : T.borderSoft}`,
        background: focused ? "rgba(238,242,255,0.9)" : "rgba(238,242,255,0.5)",
        boxShadow: focused ? `0 0 0 3px rgba(99,102,241,0.10)` : "none",
        fontFamily: "'Outfit', sans-serif", fontSize: 14, color: T.text,
        outline: "none", transition: "all 0.2s", boxSizing: "border-box",
      }} />
  );
}

function Toggle({ name, checked, onChange, label, desc }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 16px", borderRadius: 14,
      border: `1.5px solid ${checked ? T.danger : T.borderSoft}`,
      background: checked ? "rgba(244,63,94,0.06)" : "rgba(238,242,255,0.4)",
      transition: "all 0.2s", cursor: "pointer",
    }} onClick={() => onChange({ target: { name, type: "checkbox", checked: !checked } })}>
      <div>
        <p style={{ fontSize: 13, fontWeight: 600, color: checked ? T.danger : T.text }}>{label}</p>
        {desc && <p style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{desc}</p>}
      </div>
      <div style={{
        width: 44, height: 24, borderRadius: 12, flexShrink: 0,
        background: checked ? T.danger : "rgba(226,232,240,0.8)",
        position: "relative", transition: "background 0.2s",
        boxShadow: checked ? `0 2px 8px rgba(244,63,94,0.3)` : "inset 0 0 0 1px #e0e7ff",
      }}>
        <div style={{
          position: "absolute", top: 3, left: checked ? 23 : 3,
          width: 18, height: 18, borderRadius: "50%",
          background: "white", transition: "left 0.2s",
          boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
        }} />
      </div>
    </div>
  );
}

function ReviewRow({ label, value, auto = false }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${T.borderSoft}` }}>
      <span style={{ fontSize: 11, color: T.textLight, fontWeight: 600, letterSpacing: "0.04em", textTransform: "capitalize" }}>
        {label.replace(/([A-Z])/g, " $1")}
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{String(value)}</span>
        {auto && (
          <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1px 5px", borderRadius: 4, background: "rgba(34,197,94,0.10)", color: T.success, border: "1px solid rgba(34,197,94,0.2)" }}>auto</span>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, color = T.indigo }) {
  return (
    <div style={{ ...glass, borderRadius: 20, padding: "24px 28px", display: "flex", alignItems: "flex-start", gap: 16, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: T.gradPrimary, opacity: 0.6 }} />
      <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: `${color}18`, border: `1px solid ${color}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={20} color={color} />
      </div>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.muted, marginBottom: 4 }}>{label}</p>
        <p style={{ fontSize: 28, fontWeight: 900, color, lineHeight: 1, fontFamily: "'Outfit', sans-serif" }} className="aps-count">{value}</p>
        {sub && <p style={{ fontSize: 12, color: T.textMid, marginTop: 5, lineHeight: 1.5 }}>{sub}</p>}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function APS() {
  const { user, setApsData } = useAuth();
  const today  = new Date().toISOString().split("T")[0];
  const userId = user?._id || user?.id;

  const [step,         setStep]         = useState(0);
  const [loading,      setLoading]      = useState(false);
  const [planLoading,  setPlanLoading]  = useState(true);
  const [error,        setError]        = useState("");
  const [result,       setResult]       = useState(null);
  const [plan,         setPlan]         = useState(null);

  /* ── Fields auto-filled from plan (never shown as inputs) ── */
  const [autoFields, setAutoFields] = useState({
    weeklyPlanId:          "",
    plannedWorkoutType:    "upper",
    plannedIntensityLevel: "moderate",
    plannedVolumeLevel:    "moderate",
  });

  /* ── Fields the user fills in ── */
  const [form, setForm] = useState({
    actualWorkoutType:    "upper",
    intensityLevelUsed:   "moderate",
    volumeLevelUsed:      "moderate",
    completionPercentage: 100,
    durationMinutes:      60,
    perceivedExertion:    7,
    painReported:         "",
    injuryRiskFlag:       false,
    formQuality:          8,
    energyLevel:          8,
  });

  /* ── Fetch active plan & auto-populate ── */
  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const res      = await planAPI.getActive(userId);
        const p        = res.data?.plan || null;
        setPlan(p);
        if (p) {
          const weekPlan = p.detailedPlan?.weekPlan || p.weeklyStructure || [];
          const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
          const dayObj   = weekPlan[todayIdx] || weekPlan[0] || null;

          const af = {
            weeklyPlanId:          p._id || p.id || "",
            plannedWorkoutType:    dayObj?.workoutType     || "upper",
            plannedIntensityLevel: p.baseIntensityLevel    || "moderate",
            plannedVolumeLevel:    p.baseVolumeLevel       || "moderate",
          };
          setAutoFields(af);

          // pre-fill actual fields to match planned as a sensible default
          setForm(prev => ({
            ...prev,
            actualWorkoutType:  af.plannedWorkoutType,
            intensityLevelUsed: af.plannedIntensityLevel,
            volumeLevelUsed:    af.plannedVolumeLevel,
          }));
        }
      } catch {
        // no plan found — user can still submit, auto fields will be empty
      } finally {
        setPlanLoading(false);
      }
    })();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox"
        ? checked
        : ["completionPercentage","durationMinutes","perceivedExertion","formQuality","energyLevel"].includes(name)
          ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    setError(""); setLoading(true); setResult(null);
    try {
      const payload = {
        userId, date: today,
        ...autoFields,
        ...form,
        painReported: form.painReported.trim() === ""
          ? [] : form.painReported.split(",").map(p => p.trim()),
      };
      const res = await workoutAPI.complete(payload);
      setResult(res.data);

      // ── Cache in AuthContext so Dashboard / Readiness can read it ──
      if (typeof setApsData === "function") {
        setApsData({
          ...res.data,
          date:        today,
          cachedAt:    Date.now(),
          workoutType: form.actualWorkoutType,
          duration:    form.durationMinutes,
          completion:  form.completionPercentage,
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit workout");
    }
    setLoading(false);
  };

  /* ─────────────────────────────────────────────
     STEP CONTENT
  ───────────────────────────────────────────── */
  const stepContent = [

    /* ── STEP 0 : Session ── */
    <div key={0} className="aps-fade" style={{ display: "flex", flexDirection: "column", gap: 22 }}>

      {/* Auto-filled banner */}
      {plan && !planLoading && (
        <div style={{ borderRadius: 14, border: "1px solid rgba(34,197,94,0.2)", background: "rgba(34,197,94,0.04)", padding: "14px 16px" }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.success, marginBottom: 12 }}>
            ✓ Auto-filled from your active plan
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <AutoFilledBadge label="Plan ID"           value={autoFields.weeklyPlanId ? `…${autoFields.weeklyPlanId.slice(-8)}` : "—"} />
            <AutoFilledBadge label="Planned Type"      value={autoFields.plannedWorkoutType} />
            <AutoFilledBadge label="Planned Intensity" value={autoFields.plannedIntensityLevel} />
            <AutoFilledBadge label="Planned Volume"    value={autoFields.plannedVolumeLevel} />
          </div>
        </div>
      )}

      {!plan && !planLoading && (
        <div style={{ padding: "12px 16px", borderRadius: 12, background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.25)", fontSize: 12, color: "#b45309" }}>
          ⚠ No active plan found — generate a workout plan first for best results.
        </div>
      )}

      <div>
        <Label>Actual Workout Type</Label>
        <p style={{ fontSize: 11, color: T.muted, marginBottom: 10 }}>Did you stick to the plan, or switch it up?</p>
        <WorkoutTypePicker name="actualWorkoutType" value={form.actualWorkoutType} onChange={handleChange} />
      </div>

      <div>
        <Label>Actual Intensity</Label>
        <SegmentPicker name="intensityLevelUsed" value={form.intensityLevelUsed} options={INTENSITY} onChange={handleChange} colorize />
      </div>

      <div>
        <Label>Actual Volume</Label>
        <SegmentPicker name="volumeLevelUsed" value={form.volumeLevelUsed} options={VOLUME} onChange={handleChange} colorize />
      </div>

      <ScaleSlider name="completionPercentage" value={form.completionPercentage} min={0} max={100} onChange={handleChange} label="Completion" unit="%" />

      <div>
        <Label>Duration</Label>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <StyledInput name="durationMinutes" value={form.durationMinutes} onChange={handleChange} type="number" placeholder="60" />
          <span style={{ fontSize: 13, color: T.muted, whiteSpace: "nowrap", fontWeight: 600 }}>minutes</span>
        </div>
      </div>
    </div>,

    /* ── STEP 1 : Feedback ── */
    <div key={1} className="aps-fade" style={{ display: "flex", flexDirection: "column", gap: 22 }}>

      <ScaleSlider name="perceivedExertion" value={form.perceivedExertion} min={1} max={10} onChange={handleChange} label="Perceived Exertion (RPE)" colorize />
      <ScaleSlider name="energyLevel"       value={form.energyLevel}       min={1} max={10} onChange={handleChange} label="Energy Level" />
      <ScaleSlider name="formQuality"       value={form.formQuality}       min={1} max={10} onChange={handleChange} label="Form Quality" />

      <div>
        <Label>Pain Areas</Label>
        <StyledInput name="painReported" value={form.painReported} onChange={handleChange} placeholder="knee, shoulder  (leave blank if none)" />
        <p style={{ fontSize: 11, color: T.muted, marginTop: 6 }}>Separate multiple areas with commas.</p>
      </div>

      <Toggle
        name="injuryRiskFlag"
        checked={form.injuryRiskFlag}
        onChange={handleChange}
        label="Flag Injury Risk"
        desc="Enable if something felt off or needs attention"
      />

      {/* Inline review summary */}
      <div style={{ padding: "16px 18px", borderRadius: 14, background: "rgba(238,242,255,0.6)", border: `1px solid ${T.borderSoft}` }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.muted, marginBottom: 12 }}>Session Summary</p>
        {plan && <ReviewRow label="Plan ID"           value={`…${autoFields.weeklyPlanId.slice(-8)}`}  auto />}
        {plan && <ReviewRow label="Planned Type"      value={autoFields.plannedWorkoutType}             auto />}
        {plan && <ReviewRow label="Planned Intensity" value={autoFields.plannedIntensityLevel}          auto />}
        {plan && <ReviewRow label="Planned Volume"    value={autoFields.plannedVolumeLevel}             auto />}
        <ReviewRow label="Actual Type"     value={form.actualWorkoutType}    />
        <ReviewRow label="Intensity Used"  value={form.intensityLevelUsed}   />
        <ReviewRow label="Volume Used"     value={form.volumeLevelUsed}      />
        <ReviewRow label="Completion"      value={`${form.completionPercentage}%`} />
        <ReviewRow label="Duration"        value={`${form.durationMinutes} min`}   />
      </div>
    </div>,
  ];

  /* ─────────────────────────────────────────────
     RESULT VIEW
  ───────────────────────────────────────────── */
  if (result) {
    const score    = result.aps;
    const apsColor = score >= 80 ? T.success : score >= 50 ? T.indigo : T.danger;

    return (
      <>
        <style>{KEYFRAMES}</style>
        <div style={{ position: "fixed", top: -120, right: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(99,102,241,0.07)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ minHeight: "100vh", background: T.gradBody, fontFamily: "'Outfit', sans-serif", padding: "48px 20px 60px", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 600, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }} className="aps-fade">

            {/* Big score card */}
            <div style={{ ...glass, borderRadius: 24, padding: "40px 32px", textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: T.gradPrimary, backgroundSize: "200% auto", animation: "gradientShift 2.4s linear infinite" }} />
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.indigo, marginBottom: 12 }}>◆ APS Result · {today}</p>
              <div style={{ fontSize: 100, fontWeight: 900, color: apsColor, lineHeight: 1, letterSpacing: "-0.04em", fontFamily: "'Outfit', sans-serif" }} className="aps-count">
                {score}
              </div>
              <p style={{ fontSize: 12, color: T.muted, marginTop: 8, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Athlete Performance Score</p>

              {/* Score band */}
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 18 }}>
                {[["0–49", T.danger, score < 50], ["50–79", T.indigo, score >= 50 && score < 80], ["80–100", T.success, score >= 80]].map(([label, color, active]) => (
                  <div key={label} style={{ padding: "4px 14px", borderRadius: 99, background: active ? `${color}18` : "rgba(226,232,240,0.5)", border: `1px solid ${active ? color : T.borderSoft}`, fontSize: 10, fontWeight: active ? 700 : 500, color: active ? color : T.muted }}>
                    {label}
                  </div>
                ))}
              </div>

              {/* Snapshot stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 24 }}>
                {[
                  { label: "Type",       value: form.actualWorkoutType.replace(/_/g," ") },
                  { label: "Duration",   value: `${form.durationMinutes}m`               },
                  { label: "Completion", value: `${form.completionPercentage}%`           },
                ].map(({ label, value }) => (
                  <div key={label} style={{ background: "rgba(238,242,255,0.6)", border: `1px solid ${T.borderSoft}`, borderRadius: 12, padding: "12px 10px", textAlign: "center" }}>
                    <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.muted, marginBottom: 4 }}>{label}</p>
                    <p style={{ fontSize: 14, fontWeight: 800, color: T.text, textTransform: "capitalize" }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Insight cards */}
            <StatCard icon={Zap}        label="Recovery Type" value={result.recovery?.recoveryType} sub={result.recovery?.reason}  color={T.indigo} />
            <StatCard icon={TrendingUp} label="Habit Risk"    value={result.habitRisk?.riskLevel}   sub={result.habitRisk?.reason} color={T.violet} />

            {/* Cached notice */}
            <div style={{ padding: "12px 16px", borderRadius: 12, background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)", fontSize: 12, color: T.success, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
              <Check size={14} />
              Score saved — visible on your Dashboard &amp; Readiness page.
            </div>

            <button onClick={() => { setResult(null); setStep(0); }} style={{
              padding: "14px", borderRadius: 14,
              background: T.gradPrimary, color: "white",
              fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              border: "none", cursor: "pointer",
              boxShadow: "0 4px 20px rgba(99,102,241,0.30)",
            }}>
              Log Another Workout ✦
            </button>
          </div>
        </div>
      </>
    );
  }

  /* ─────────────────────────────────────────────
     WIZARD VIEW
  ───────────────────────────────────────────── */
  return (
    <>
      <style>{KEYFRAMES}</style>

      <div style={{ position: "fixed", top: -120, right: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(99,102,241,0.07)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: -100, left: "20%", width: 300, height: 300, borderRadius: "50%", background: "rgba(124,58,237,0.05)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ minHeight: "100vh", background: T.gradBody, fontFamily: "'Outfit', sans-serif", padding: "48px 20px 80px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>

          {/* Page header */}
          <div style={{ marginBottom: 36, textAlign: "center" }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.indigo, marginBottom: 8 }}>◆ Workout Logger</p>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, color: T.text, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Athlete Performance<br />
              <span style={{ background: T.gradPrimary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Score</span>
            </h1>
            <p style={{ fontSize: 13, color: T.muted, marginTop: 8 }}>
              {planLoading
                ? "Loading your plan…"
                : plan
                  ? `Plan loaded · ${autoFields.plannedWorkoutType.replace(/_/g," ")} day · 2 quick steps`
                  : "Log your session in 2 quick steps"}
            </p>
          </div>

          {/* Step indicators */}
          <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 32 }}>
            {STEPS.map((s, i) => {
              const done    = i < step;
              const current = i === step;
              return (
                <div key={s.id} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                  {i < STEPS.length - 1 && (
                    <div style={{ position: "absolute", top: 18, left: "50%", width: "100%", height: 2, background: done ? T.gradPrimary : T.borderSoft, transition: "background 0.4s", zIndex: 0 }} />
                  )}
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", zIndex: 1,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: done ? T.gradPrimary : current ? "white" : "rgba(238,242,255,0.8)",
                    border: `2px solid ${done ? "transparent" : current ? T.indigo : T.borderSoft}`,
                    boxShadow: current ? `0 0 0 4px rgba(99,102,241,0.15)` : "none",
                    transition: "all 0.3s", fontSize: done ? 14 : 16,
                    cursor: done ? "pointer" : "default",
                  }} onClick={() => done && setStep(i)}>
                    {done ? <Check size={14} color="white" /> : s.icon}
                  </div>
                  <span style={{ fontSize: 10, fontWeight: current ? 700 : 500, color: current ? T.indigo : T.muted, marginTop: 6, letterSpacing: "0.04em" }}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Form card */}
          <div style={{ ...glass, borderRadius: 24, overflow: "hidden", position: "relative" }}>
            <div style={{ height: 3, background: T.gradPrimary, opacity: 0.7 }} />
            <div style={{ padding: "30px 30px 26px" }}>

              <div style={{ marginBottom: 26 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 20 }}>{STEPS[step].icon}</span>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.indigo }}>
                    Step {step + 1} of {STEPS.length} — {STEPS[step].label}
                  </p>
                </div>
                <p style={{ fontSize: 13, color: T.muted }}>{STEPS[step].desc}</p>
              </div>

              {error && (
                <div style={{ padding: "12px 16px", borderRadius: 12, background: "rgba(244,63,94,0.07)", border: "1px solid rgba(244,63,94,0.25)", fontSize: 12, color: T.danger, marginBottom: 20, display: "flex", gap: 8, alignItems: "center" }}>
                  <span>⚠</span>{error}
                </div>
              )}

              {stepContent[step]}

              {/* Navigation */}
              <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                {step > 0 && (
                  <button type="button" onClick={() => setStep(s => s - 1)} style={{
                    flex: 1, padding: "13px", borderRadius: 14,
                    border: `1.5px solid ${T.borderSoft}`,
                    background: "rgba(238,242,255,0.5)", color: T.textLight,
                    fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  }}>
                    <ChevronLeft size={14} /> Back
                  </button>
                )}
                {step < STEPS.length - 1 ? (
                  <button type="button" onClick={() => setStep(s => s + 1)} style={{
                    flex: 2, padding: "13px", borderRadius: 14,
                    background: T.gradPrimary, color: "white",
                    fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    border: "none", cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(99,102,241,0.28)",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  }}>
                    Continue <ChevronRight size={14} />
                  </button>
                ) : (
                  <button type="button" onClick={handleSubmit} disabled={loading} style={{
                    flex: 2, padding: "13px", borderRadius: 14,
                    background: T.gradPrimary, color: "white",
                    fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    border: "none", cursor: loading ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 16px rgba(99,102,241,0.28)",
                    opacity: loading ? 0.6 : 1,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  }}>
                    {loading ? "Calculating…" : "Get My Score ✦"}
                  </button>
                )}
              </div>
            </div>
          </div>

          <p style={{ textAlign: "center", fontSize: 11, color: T.muted, marginTop: 16 }}>
            {step + 1} of {STEPS.length} steps
            {step > 0 && <span style={{ color: T.indigo, fontWeight: 600 }}> · tap completed steps to go back</span>}
          </p>

        </div>
      </div>
    </>
  );
}