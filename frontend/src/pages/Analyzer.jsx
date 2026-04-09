// import { useState, useRef, useCallback } from "react";
// import { Zap, RefreshCw, ChevronDown, Camera, Upload, X, Check } from "lucide-react";

// /* ══════════════════════════════════════════════
//    THEME TOKENS — extracted from Workout.jsx
//    • Light glass cards (rgba 255,255,255,0.85)
//    • Light blobs: #93c5fd / #c4b5fd / #a5b4fc  mixBlendMode:multiply
//    • Accent: #6366f1 / #8b5cf6 indigo-violet
//    • Text dark: #0f172a
//    • Muted: #94a3b8 / #64748b
//    • Badge bg: rgba(238,242,255,0.6) / border #e0e7ff
//    • CTA: linear-gradient(135deg,#2563eb,#6366f1,#7c3aed)
//    • Font: Outfit
// ══════════════════════════════════════════════ */
// const glass = {
//   background: "rgba(255,255,255,0.85)",
//   backdropFilter: "blur(16px)",
//   WebkitBackdropFilter: "blur(16px)",
//   border: "1px solid rgba(255,255,255,0.9)",
//   boxShadow: "0 4px 24px rgba(99,102,241,0.08), 0 1px 4px rgba(0,0,0,0.04)",
// };

// const TAG_STYLES = {
//   primary:   { background: "rgba(99,102,241,0.08)",  color: "#6366f1", border: "1px solid rgba(99,102,241,0.2)" },
//   secondary: { background: "rgba(16,185,129,0.08)",  color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" },
//   muscle:    { background: "rgba(148,163,184,0.08)", color: "#64748b", border: "1px solid rgba(148,163,184,0.2)" },
//   danger:    { background: "rgba(239,68,68,0.08)",   color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" },
//   warning:   { background: "rgba(245,158,11,0.08)",  color: "#d97706", border: "1px solid rgba(245,158,11,0.2)" },
// };

// /* ══════════════════════════════════════════════
//    GLOBAL STYLES
// ══════════════════════════════════════════════ */
// const GlobalStyles = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
//     *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//     body {
//       font-family: 'Outfit', sans-serif;
//       background: linear-gradient(135deg, #f8fafc, #eff6ff, #eef2ff);
//       min-height: 100vh;
//       color: #0f172a;
//     }
//     @keyframes blob {
//       0%,100% { transform: translate(0,0) scale(1); }
//       33%      { transform: translate(28px,-18px) scale(1.06); }
//       66%      { transform: translate(-18px,14px) scale(0.96); }
//     }
//     @keyframes fadeUp {
//       from { opacity:0; transform:translateY(18px); }
//       to   { opacity:1; transform:translateY(0); }
//     }
//     @keyframes spin {
//       from { transform:rotate(0deg); }
//       to   { transform:rotate(360deg); }
//     }
//     .card-lift { transition: transform 0.2s, box-shadow 0.2s; }
//     .card-lift:hover { transform: translateY(-2px); box-shadow: 0 10px 36px rgba(99,102,241,0.13) !important; }
//     .upload-zone { transition: all 0.2s; }
//     .upload-zone:hover { border-color: rgba(99,102,241,0.45) !important; background: rgba(238,242,255,0.55) !important; }
//     .cam-zone { transition: all 0.2s; }
//     .cam-zone:hover { border-color: rgba(234,88,12,0.4) !important; background: rgba(255,107,0,0.03) !important; }
//   `}</style>
// );

// /* ══════════════════════════════════════════════
//    BLOBS  (exact from Workout.jsx)
// ══════════════════════════════════════════════ */
// function Blobs() {
//   return (
//     <div style={{ position:"fixed", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0 }}>
//       <div style={{ position:"absolute", top:"-8rem",  right:"-8rem", width:"26rem", height:"26rem", borderRadius:"50%", background:"#93c5fd", mixBlendMode:"multiply", filter:"blur(72px)", opacity:0.35, animation:"blob 9s ease-in-out infinite" }} />
//       <div style={{ position:"absolute", bottom:"-8rem", left:"-8rem", width:"26rem", height:"26rem", borderRadius:"50%", background:"#c4b5fd", mixBlendMode:"multiply", filter:"blur(72px)", opacity:0.35, animation:"blob 11s ease-in-out infinite 2s" }} />
//       <div style={{ position:"absolute", top:"40%",    left:"40%",    width:"20rem", height:"20rem", borderRadius:"50%", background:"#a5b4fc", mixBlendMode:"multiply", filter:"blur(60px)", opacity:0.25, transform:"translate(-50%,-50%)", animation:"blob 13s ease-in-out infinite 4s" }} />
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════
//    TAG  (exact from Workout.jsx)
// ══════════════════════════════════════════════ */
// function Tag({ type = "muscle", children }) {
//   return (
//     <span style={{ ...TAG_STYLES[type], fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", padding:"2px 8px", borderRadius:4 }}>
//       {children}
//     </span>
//   );
// }

// /* ══════════════════════════════════════════════
//    EVIDENCE STRIP  (mirrors EvidenceTrustStrip)
// ══════════════════════════════════════════════ */
// function EvidenceStrip() {
//   return (
//     <div style={{ display:"inline-flex", alignItems:"center", gap:10, background:"rgba(99,102,241,0.06)", border:"1px solid rgba(99,102,241,0.15)", borderRadius:10, padding:"8px 16px", marginTop:16 }}>
//       <span style={{ fontSize:13 }}>🔬</span>
//       <div>
//         <span style={{ fontSize:10, fontWeight:700, color:"#6366f1", letterSpacing:"0.1em", textTransform:"uppercase" }}>AI Vision Analysis System</span>
//         <span style={{ fontSize:10, color:"#64748b", marginLeft:8 }}>Powered by Gemini 1.5 · Elite coaching protocols</span>
//       </div>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════
//    CARD SECTION HEADER  (mirrors WorkoutHeader sub-sections)
// ══════════════════════════════════════════════ */
// function CardHeader({ emoji, title, sub }) {
//   return (
//     <div style={{ padding:"16px 24px", borderBottom:"1px solid rgba(226,232,240,0.8)", background:"linear-gradient(135deg,rgba(99,102,241,0.04),rgba(139,92,246,0.04))", display:"flex", alignItems:"center", gap:12 }}>
//       <div style={{ width:32, height:32, borderRadius:10, background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, boxShadow:"0 2px 8px rgba(99,102,241,0.3)" }}>{emoji}</div>
//       <div>
//         <p style={{ fontSize:"0.95rem", fontWeight:700, color:"#0f172a" }}>{title}</p>
//         {sub && <p style={{ fontSize:10, color:"#94a3b8", letterSpacing:"0.08em", textTransform:"uppercase", marginTop:2 }}>{sub}</p>}
//       </div>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════
//    GEMINI API
// ══════════════════════════════════════════════ */
// async function analyzeFitnessImage(imageData) {
//   const API_KEY = "AIzaSyCvAfUQod04qGjB5lubdR2McQ1DganZzzU";
//   const res = await fetch(
//     `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
//     {
//       method:"POST",
//       headers:{ "Content-Type":"application/json" },
//       body: JSON.stringify({
//         contents:[{ parts:[
//           { inline_data:{ mime_type:imageData.mimeType, data:imageData.data } },
//           { text:`You are an elite performance coach at a luxury fitness atelier. Analyze this fitness equipment image with maximum precision.
// Return ONLY a raw JSON object — no markdown, no backticks, nothing else. Exact structure:
// {
//   "equipment":{ "name":"string","category":"Cardio|Strength|Flexibility|Functional|Recovery","difficulty":"Beginner|Intermediate|Advanced|Elite","muscleGroups":["string"],"calories":"e.g. 400–600 kcal/hr" },
//   "overview":"2–3 sentence expert description",
//   "technique":{ "setup":["string"],"execution":["string"],"breathing":"string" },
//   "workouts":[
//     { "name":"string","level":"Beginner","duration":"20 min","structure":"3×12","restPeriod":"60s","intensity":58,"description":"string","trainingEffect":"string","adjustmentHints":{"lowReadiness":"string","highReadiness":"string"} },
//     { "name":"string","level":"Intermediate","duration":"35 min","structure":"4×10","restPeriod":"45s","intensity":76,"description":"string","trainingEffect":"string","adjustmentHints":{"lowReadiness":"string","highReadiness":"string"} },
//     { "name":"string","level":"Advanced","duration":"50 min","structure":"5×6–8","restPeriod":"30s","intensity":93,"description":"string","trainingEffect":"string","adjustmentHints":{"lowReadiness":"string","highReadiness":"string"} }
//   ],
//   "coachTips":["string","string","string"],
//   "commonMistakes":["string","string","string"],
//   "safetyNotes":["string","string"],
//   "progressionLogic":"string",
//   "weeklyEmphasis":"string"
// }` },
//         ]}],
//         generationConfig:{ temperature:0.3, maxOutputTokens:2200 },
//       }),
//     }
//   );
//   if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);
//   const data = await res.json();
//   const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
//   return JSON.parse(text.replace(/```json|```/g,"").trim());
// }

// /* ══════════════════════════════════════════════
//    INTENSITY BAR
// ══════════════════════════════════════════════ */
// function IntensityBar({ value }) {
//   const color = value>=88 ? "linear-gradient(90deg,#ef4444,#dc2626)" : value>=72 ? "linear-gradient(90deg,#f97316,#ea580c)" : "linear-gradient(90deg,#10b981,#059669)";
//   return (
//     <div style={{ display:"flex", alignItems:"center", gap:10 }}>
//       <div style={{ flex:1, height:5, background:"rgba(148,163,184,0.15)", borderRadius:999, overflow:"hidden" }}>
//         <div style={{ height:"100%", width:`${value}%`, background:color, borderRadius:999, transition:"width 0.9s cubic-bezier(0.34,1.56,0.64,1)" }} />
//       </div>
//       <span style={{ fontSize:10, fontWeight:700, color:"#94a3b8", minWidth:28 }}>{value}%</span>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════
//    WORKOUT CARD  (mirrors ExerciseCard from Workout.jsx)
// ══════════════════════════════════════════════ */
// function WorkoutCard({ w, idx }) {
//   const [expanded, setExpanded] = useState(false);
//   const tagType = w.level === "Beginner" ? "secondary" : w.level === "Advanced" ? "danger" : "primary";
//   return (
//     <div className="card-lift" style={{ background:"rgba(238,242,255,0.4)", border:"1px solid #e0e7ff", borderRadius:14, overflow:"hidden", animation:`fadeUp 0.4s ease ${idx*0.1}s both` }}>
//       <div style={{ display:"flex", alignItems:"flex-start", gap:14, padding:18 }}>
//         <div style={{ width:30, height:30, borderRadius:9, background:"linear-gradient(135deg,#6366f1,#8b5cf6)", color:"white", fontSize:12, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"0 2px 8px rgba(99,102,241,0.3)" }}>{idx+1}</div>
//         <div style={{ flex:1, minWidth:0 }}>
//           <p style={{ fontSize:13, fontWeight:700, color:"#0f172a", marginBottom:8 }}>{w.name}</p>
//           <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
//             <Tag type={tagType}>{w.level}</Tag>
//             <Tag type="muscle">{w.duration}</Tag>
//           </div>
//         </div>
//         <div style={{ flexShrink:0, textAlign:"right" }}>
//           <p style={{ fontSize:14, fontWeight:800, color:"#0f172a", letterSpacing:"-0.01em" }}>{w.structure}</p>
//           <p style={{ fontSize:10, color:"#94a3b8", marginTop:3 }}>{w.restPeriod} rest</p>
//         </div>
//       </div>

//       <div style={{ padding:"0 18px 16px" }}>
//         <p style={{ fontSize:11, color:"#64748b", lineHeight:1.6, marginBottom:12 }}>{w.description}</p>
//         <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#94a3b8", marginBottom:6 }}>Intensity</p>
//         <IntensityBar value={w.intensity} />
//       </div>

//       {(w.trainingEffect || w.adjustmentHints) && (
//         <>
//           <button onClick={() => setExpanded(!expanded)}
//             style={{ width:"100%", padding:"9px 18px", borderTop:"1px solid #e0e7ff", background:"transparent", border:"none", borderTop:"1px solid #e0e7ff", fontSize:9, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#94a3b8", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
//             {expanded ? "Hide Details" : "View Details"}
//             <ChevronDown size={12} style={{ transform:expanded?"rotate(180deg)":"none", transition:"transform 0.2s" }} />
//           </button>
//           {expanded && (
//             <div style={{ padding:"16px 18px 18px", borderTop:"1px solid #e0e7ff", display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
//               {w.trainingEffect && (
//                 <div style={{ background:"rgba(99,102,241,0.05)", border:"1px solid #e0e7ff", borderRadius:10, padding:14 }}>
//                   <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#6366f1", marginBottom:8 }}>Training Effect</p>
//                   <p style={{ fontSize:11, color:"#64748b", lineHeight:1.6 }}>{w.trainingEffect}</p>
//                 </div>
//               )}
//               {w.adjustmentHints && (
//                 <div style={{ background:"rgba(16,185,129,0.05)", border:"1px solid #d1fae5", borderRadius:10, padding:14 }}>
//                   <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#10b981", marginBottom:8 }}>Readiness Adjustments</p>
//                   {w.adjustmentHints.lowReadiness  && <p style={{ fontSize:11, color:"#64748b", lineHeight:1.6, marginBottom:6 }}><span style={{ color:"#94a3b8" }}>Low: </span>{w.adjustmentHints.lowReadiness}</p>}
//                   {w.adjustmentHints.highReadiness && <p style={{ fontSize:11, color:"#64748b", lineHeight:1.6 }}><span style={{ color:"#94a3b8" }}>High: </span>{w.adjustmentHints.highReadiness}</p>}
//                 </div>
//               )}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════
//    RESULT PANEL
// ══════════════════════════════════════════════ */
// function ResultPanel({ result }) {
//   const { equipment, overview, technique, workouts, coachTips, commonMistakes, safetyNotes, progressionLogic, weeklyEmphasis } = result;
//   const diffTag = equipment.difficulty === "Beginner" ? "secondary" : equipment.difficulty === "Advanced" || equipment.difficulty === "Elite" ? "danger" : "primary";

//   return (
//     <div style={{ display:"flex", flexDirection:"column", gap:24, animation:"fadeUp 0.5s ease both" }}>

//       {/* Equipment Overview */}
//       <div style={{ ...glass, borderRadius:24, overflow:"hidden", borderTop:"2px solid #6366f1" }}>
//         <div style={{ padding:"18px 28px", borderBottom:"1px solid rgba(226,232,240,0.8)", background:"linear-gradient(135deg,rgba(99,102,241,0.04),rgba(139,92,246,0.04))", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, flexWrap:"wrap" }}>
//           <div style={{ display:"flex", alignItems:"center", gap:12 }}>
//             <div style={{ width:34, height:34, borderRadius:10, background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, boxShadow:"0 2px 8px rgba(99,102,241,0.3)" }}>⚡</div>
//             <div>
//               <p style={{ fontSize:"1rem", fontWeight:700, color:"#0f172a" }}>{equipment.name}</p>
//               <p style={{ fontSize:10, color:"#94a3b8", letterSpacing:"0.08em", textTransform:"uppercase", marginTop:2 }}>{equipment.category} Equipment</p>
//             </div>
//           </div>
//           <div style={{ display:"flex", gap:6 }}>
//             <Tag type="primary">{equipment.category}</Tag>
//             <Tag type={diffTag}>{equipment.difficulty}</Tag>
//           </div>
//         </div>
//         <div style={{ padding:"24px 28px" }}>
//           <p style={{ fontSize:13, color:"#64748b", lineHeight:1.75, marginBottom:24 }}>{overview}</p>
//           {/* Stats */}
//           <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:20 }}>
//             {[
//               { label:"Calories / Hour", value:equipment.calories, color:"#f97316" },
//               { label:"Difficulty",      value:equipment.difficulty, color:"#6366f1" },
//               { label:"Muscle Groups",   value:`${equipment.muscleGroups.length} areas`, color:"#10b981" },
//             ].map(({ label,value,color }) => (
//               <div key={label} style={{ background:"rgba(238,242,255,0.6)", border:"1px solid #e0e7ff", borderRadius:12, padding:"14px 16px" }}>
//                 <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#94a3b8", marginBottom:6 }}>{label}</p>
//                 <p style={{ fontSize:"0.95rem", fontWeight:800, color, textTransform:"capitalize" }}>{value}</p>
//               </div>
//             ))}
//           </div>
//           {/* Muscle tags */}
//           <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#94a3b8", marginBottom:10 }}>Target Muscles</p>
//           <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
//             {equipment.muscleGroups.map((m,i) => <Tag key={i} type="muscle">{m}</Tag>)}
//           </div>
//         </div>
//       </div>

//       {/* Technique */}
//       <div style={{ ...glass, borderRadius:20, overflow:"hidden" }}>
//         <CardHeader emoji="🎯" title="Technique Mastery" sub="Elite form coaching" />
//         <div style={{ padding:"24px 28px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
//           <div>
//             <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#6366f1", marginBottom:14 }}>Setup Protocol</p>
//             <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
//               {technique.setup.map((s,i) => (
//                 <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
//                   <div style={{ width:22, height:22, borderRadius:"50%", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, color:"white", flexShrink:0, marginTop:1 }}>{i+1}</div>
//                   <p style={{ fontSize:12, color:"#64748b", lineHeight:1.6 }}>{s}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div>
//             <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#10b981", marginBottom:14 }}>Execution Cues</p>
//             <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:16 }}>
//               {technique.execution.map((cue,i) => (
//                 <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
//                   <span style={{ color:"#6366f1", fontSize:14, flexShrink:0, lineHeight:1.7 }}>›</span>
//                   <p style={{ fontSize:12, color:"#64748b", lineHeight:1.6 }}>{cue}</p>
//                 </div>
//               ))}
//             </div>
//             <div style={{ background:"rgba(99,102,241,0.05)", border:"1px solid #e0e7ff", borderRadius:10, padding:"12px 14px" }}>
//               <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#6366f1", marginBottom:6 }}>Breathing</p>
//               <p style={{ fontSize:12, color:"#64748b", lineHeight:1.6 }}>{technique.breathing}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Workouts */}
//       <div>
//         <div style={{ display:"flex", alignItems:"baseline", gap:12, marginBottom:16 }}>
//           <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#94a3b8" }}>Workout Protocols</p>
//           <span style={{ fontSize:9, fontWeight:700, color:"#c7d2fe" }}>{workouts.length} programs</span>
//         </div>
//         <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
//           {workouts.map((w,i) => <WorkoutCard key={i} w={w} idx={i} />)}
//         </div>
//       </div>

//       {/* Coach Tips + Mistakes */}
//       <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
//         <div style={{ ...glass, borderRadius:20, overflow:"hidden" }}>
//           <CardHeader emoji="🏆" title="Coach Tips" sub="Elite performance cues" />
//           <div style={{ padding:"18px 22px", display:"flex", flexDirection:"column", gap:12 }}>
//             {coachTips.map((tip,i) => (
//               <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
//                 <span style={{ color:"#f59e0b", fontSize:14, flexShrink:0 }}>★</span>
//                 <p style={{ fontSize:12, color:"#64748b", lineHeight:1.6 }}>{tip}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div style={{ ...glass, borderRadius:20, overflow:"hidden" }}>
//           <CardHeader emoji="⚠" title="Common Mistakes" sub="Errors to avoid" />
//           <div style={{ padding:"18px 22px", display:"flex", flexDirection:"column", gap:12 }}>
//             {commonMistakes.map((m,i) => (
//               <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
//                 <span style={{ color:"#ef4444", fontSize:12, flexShrink:0, marginTop:2, fontWeight:700 }}>✕</span>
//                 <p style={{ fontSize:12, color:"#64748b", lineHeight:1.6 }}>{m}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Programme Notes (mirrors GlobalNotesCard from Workout.jsx) */}
//       <div style={{ ...glass, borderRadius:20, overflow:"hidden" }}>
//         <div style={{ padding:"18px 28px", borderBottom:"1px solid rgba(226,232,240,0.8)", display:"flex", alignItems:"center", gap:12, background:"linear-gradient(135deg,rgba(99,102,241,0.04),rgba(139,92,246,0.04))" }}>
//           <div style={{ width:32, height:32, borderRadius:10, background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontSize:14, boxShadow:"0 2px 8px rgba(99,102,241,0.3)" }}>◈</div>
//           <h2 style={{ fontSize:"1.05rem", fontWeight:700, color:"#0f172a" }}>Programme Notes</h2>
//         </div>
//         <div style={{ padding:28, display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
//           <div>
//             <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#6366f1", marginBottom:10 }}>Safety Notes</p>
//             {safetyNotes.map((note,i) => (
//               <div key={i} style={{ display:"flex", gap:8, marginBottom:8, fontSize:12, color:"#64748b", lineHeight:1.6 }}>
//                 <span style={{ color:"#6366f1", flexShrink:0 }}>›</span>
//                 <span>{note}</span>
//               </div>
//             ))}
//           </div>
//           <div>
//             <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#10b981", marginBottom:10 }}>Weekly Emphasis</p>
//             <p style={{ fontSize:12, color:"#64748b", lineHeight:1.7 }}>{weeklyEmphasis}</p>
//           </div>
//           {progressionLogic && (
//             <div style={{ gridColumn:"1 / -1", paddingTop:20, borderTop:"1px solid #f1f5f9" }}>
//               <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#94a3b8", marginBottom:10 }}>Progression Logic</p>
//               <p style={{ fontSize:12, color:"#64748b", lineHeight:1.75 }}>{progressionLogic}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════
//    LOADER  (matches app's BikeLoader spirit)
// ══════════════════════════════════════════════ */
// function Loader() {
//   return (
//     <div style={{ ...glass, borderRadius:20, padding:"60px 32px", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", gap:20 }}>
//       <div style={{ position:"relative", width:52, height:52 }}>
//         <div style={{ position:"absolute", inset:0, borderRadius:"50%", border:"2px solid rgba(99,102,241,0.1)" }} />
//         <div style={{ position:"absolute", inset:0, borderRadius:"50%", border:"2px solid transparent", borderTopColor:"#6366f1", animation:"spin 0.85s linear infinite" }} />
//         <div style={{ position:"absolute", inset:"10px", borderRadius:"50%", border:"2px solid transparent", borderTopColor:"#8b5cf6", animation:"spin 1.3s linear infinite reverse" }} />
//       </div>
//       <div>
//         <p style={{ fontSize:13, fontWeight:700, color:"#0f172a" }}>Analyzing Equipment</p>
//         <p style={{ fontSize:11, color:"#94a3b8", marginTop:4 }}>Elite AI coaching engine processing…</p>
//       </div>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════
//    MAIN APP
// ══════════════════════════════════════════════ */
// export default function FitnessAnalyzer() {
//   const [imagePreview, setImagePreview] = useState(null);
//   const [imageData,    setImageData]    = useState(null);
//   const [result,       setResult]       = useState(null);
//   const [loading,      setLoading]      = useState(false);
//   const [error,        setError]        = useState("");
//   const [inputMode,    setInputMode]    = useState("upload");
//   const [cameraOn,     setCameraOn]     = useState(false);

//   const videoRef  = useRef(null);
//   const streamRef = useRef(null);
//   const canvasRef = useRef(null);

//   const handleFile = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.size > 5 * 1024 * 1024) { setError("Image must be under 5MB."); return; }
//     setError(""); setResult(null);
//     setImagePreview(URL.createObjectURL(file));
//     const reader = new FileReader();
//     reader.onloadend = () => setImageData({ data: reader.result.split(",")[1], mimeType: file.type });
//     reader.readAsDataURL(file);
//   };

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode:"environment" } });
//       streamRef.current = stream;
//       if (videoRef.current) videoRef.current.srcObject = stream;
//       setCameraOn(true); setError("");
//     } catch { setError("Camera access denied."); }
//   };
//   const stopCamera = () => { streamRef.current?.getTracks().forEach(t => t.stop()); setCameraOn(false); };
//   const capturePhoto = useCallback(() => {
//     const v = videoRef.current, c = canvasRef.current;
//     if (!v || !c) return;
//     c.width = v.videoWidth; c.height = v.videoHeight;
//     c.getContext("2d").drawImage(v, 0, 0);
//     const url = c.toDataURL("image/jpeg", 0.92);
//     setImagePreview(url);
//     setImageData({ data: url.split(",")[1], mimeType:"image/jpeg" });
//     setResult(null); stopCamera();
//   }, []);

//   const handleAnalyze = async () => {
//     if (!imageData) { setError("Please upload or capture an image first."); return; }
//     setLoading(true); setError(""); setResult(null);
//     try { setResult(await analyzeFitnessImage(imageData)); }
//     catch (err) { setError("Analysis failed: " + err.message); }
//     setLoading(false);
//   };

//   const clearAll = () => { setImagePreview(null); setImageData(null); setResult(null); setError(""); };

//   return (
//     <>
//       <GlobalStyles />
//       <Blobs />

//       <div style={{ position:"relative", zIndex:1, minHeight:"100vh", display:"flex", flexDirection:"column" }}>

//         {/* NAV */}
//         <nav style={{ borderBottom:"1px solid rgba(255,255,255,0.6)", padding:"20px 48px", display:"flex", justifyContent:"space-between", alignItems:"center", background:"rgba(255,255,255,0.4)", backdropFilter:"blur(12px)" }}>
//           <span style={{ fontSize:"1.15rem", fontWeight:800 }}>
//             <span style={{ color:"#0f172a" }}>ELITE</span>
//             <span style={{ background:"linear-gradient(135deg,#2563eb,#6366f1,#7c3aed)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>ATELIER</span>
//           </span>
//           <div style={{ background:"rgba(99,102,241,0.08)", border:"1px solid rgba(99,102,241,0.2)", borderRadius:999, padding:"5px 16px" }}>
//             <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#6366f1" }}>Equipment AI</span>
//           </div>
//         </nav>

//         {/* MAIN */}
//         <main style={{ flex:1, maxWidth:1200, width:"100%", margin:"0 auto", padding:"52px 48px 96px", display:"flex", flexDirection:"column", gap:40 }}>

//           {/* HERO — mirrors WorkoutHeader */}
//           <div style={{ ...glass, borderRadius:24, padding:36, borderTop:"2px solid #6366f1" }}>
//             <div style={{ display:"flex", flexWrap:"wrap", alignItems:"flex-start", justifyContent:"space-between", gap:28 }}>
//               <div style={{ flex:1, minWidth:280 }}>
//                 <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#6366f1", marginBottom:10 }}>Equipment Analysis</p>
//                 <h1 style={{ fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:800, color:"#0f172a", lineHeight:1.1, marginBottom:6 }}>
//                   AI Fitness Equipment Analyzer
//                 </h1>
//                 <p style={{ fontSize:12, color:"#94a3b8", fontWeight:400, lineHeight:1.6, marginTop:8 }}>
//                   Upload or capture any fitness equipment and receive expert coaching protocols, technique breakdowns, and personalised workout programs.
//                 </p>
//                 <EvidenceStrip />
//               </div>
//               <div style={{ display:"flex", flexDirection:"column", gap:10, flexShrink:0 }}>
//                 <button onClick={handleAnalyze} disabled={loading || !imageData}
//                   style={{ padding:"12px 24px", background: !imageData ? "rgba(148,163,184,0.2)" : "linear-gradient(135deg,#2563eb,#6366f1,#7c3aed)", color: !imageData ? "#94a3b8" : "white", borderRadius:12, fontSize:11, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", border:"none", cursor: loading||!imageData ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, display:"flex", alignItems:"center", gap:8, boxShadow: imageData&&!loading ? "0 4px 16px rgba(99,102,241,0.3)" : "none", transition:"all 0.2s", whiteSpace:"nowrap", fontFamily:"Outfit,sans-serif" }}>
//                   <Zap size={14} />{loading ? "Analyzing…" : "Analyze Equipment"}
//                 </button>
//                 {imageData && (
//                   <button onClick={clearAll}
//                     style={{ padding:"11px 24px", background:"rgba(255,255,255,0.8)", color:"#6366f1", borderRadius:12, fontSize:11, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", border:"1.5px solid rgba(99,102,241,0.35)", cursor:"pointer", display:"flex", alignItems:"center", gap:8, transition:"all 0.2s", fontFamily:"Outfit,sans-serif" }}>
//                     <RefreshCw size={14} />Clear
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* INPUT + RESULTS */}
//           <div style={{ display:"grid", gridTemplateColumns: result||loading ? "360px 1fr" : "1fr", gap:32, alignItems:"start" }}>

//             {/* Input card — mirrors form card in Readiness / Workout */}
//             <div style={{ ...glass, borderRadius:20, overflow:"hidden", position: result ? "sticky" : "static", top:24 }}>
//               <CardHeader emoji="◎" title="Image Input" sub="Upload or use camera" />
//               <div style={{ padding:24 }}>

//                 {/* Mode toggle */}
//                 <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:20 }}>
//                   {[
//                     { key:"upload", icon:<Upload size={13}/>, label:"Upload" },
//                     { key:"camera", icon:<Camera size={13}/>, label:"Camera" },
//                   ].map(({ key,icon,label }) => (
//                     <button key={key}
//                       onClick={() => { setInputMode(key); if (key!=="camera") stopCamera(); }}
//                       style={{ padding:"10px 8px", borderRadius:10, cursor:"pointer", fontFamily:"Outfit,sans-serif", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", transition:"all 0.2s", display:"flex", alignItems:"center", justifyContent:"center", gap:6, border:"none",
//                         ...(inputMode===key
//                           ? { background:"linear-gradient(135deg,#2563eb,#6366f1,#7c3aed)", color:"white", boxShadow:"0 4px 12px rgba(99,102,241,0.28)" }
//                           : { background:"rgba(238,242,255,0.6)", color:"#6366f1", border:"1px solid rgba(99,102,241,0.15)" }
//                         ) }}>
//                       {icon}{label}
//                     </button>
//                   ))}
//                 </div>

//                 {/* Upload zone */}
//                 {inputMode==="upload" && (
//                   <label className="upload-zone"
//                     style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12, padding:"32px 20px", border:"2px dashed rgba(99,102,241,0.25)", borderRadius:14, cursor:"pointer", background:"rgba(238,242,255,0.3)" }}>
//                     <input type="file" accept="image/*" onChange={handleFile} style={{ display:"none" }} />
//                     <div style={{ width:44, height:44, borderRadius:"50%", background:"rgba(99,102,241,0.1)", border:"1px solid rgba(99,102,241,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
//                       <Upload size={20} color="#6366f1" />
//                     </div>
//                     <div style={{ textAlign:"center" }}>
//                       <p style={{ fontSize:13, fontWeight:600, color:"#6366f1" }}>Click to upload image</p>
//                       <p style={{ fontSize:10, color:"#94a3b8", marginTop:4 }}>JPG, PNG, WEBP — max 5MB</p>
//                     </div>
//                   </label>
//                 )}

//                 {/* Camera zone */}
//                 {inputMode==="camera" && (
//                   <div>
//                     <canvas ref={canvasRef} style={{ display:"none" }} />
//                     {!cameraOn ? (
//                       <button className="cam-zone" onClick={startCamera}
//                         style={{ width:"100%", padding:"30px 20px", borderRadius:14, border:"2px dashed rgba(234,88,12,0.28)", background:"rgba(255,107,0,0.02)", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:10, fontFamily:"Outfit,sans-serif" }}>
//                         <div style={{ width:44, height:44, borderRadius:"50%", background:"rgba(234,88,12,0.09)", border:"1px solid rgba(234,88,12,0.22)", display:"flex", alignItems:"center", justifyContent:"center" }}>
//                           <Camera size={20} color="#ea580c" />
//                         </div>
//                         <p style={{ fontSize:13, fontWeight:600, color:"#ea580c" }}>Start Camera</p>
//                       </button>
//                     ) : (
//                       <div style={{ borderRadius:14, overflow:"hidden", position:"relative", border:"1px solid rgba(99,102,241,0.15)" }}>
//                         <video ref={videoRef} autoPlay playsInline style={{ width:"100%", display:"block", maxHeight:240, objectFit:"cover" }} />
//                         <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:12, display:"flex", gap:8, background:"linear-gradient(to top,rgba(0,0,0,0.5),transparent)" }}>
//                           <button onClick={capturePhoto}
//                             style={{ flex:1, padding:"10px", borderRadius:10, border:"none", background:"linear-gradient(135deg,#2563eb,#6366f1)", color:"white", fontFamily:"Outfit,sans-serif", fontSize:11, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
//                             <Camera size={13}/> Capture
//                           </button>
//                           <button onClick={stopCamera}
//                             style={{ padding:"10px 14px", borderRadius:10, border:"1px solid rgba(255,255,255,0.3)", background:"rgba(0,0,0,0.3)", color:"white", cursor:"pointer" }}>
//                             <X size={13}/>
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {/* Preview */}
//                 {imagePreview && (
//                   <div style={{ marginTop:16, borderRadius:12, overflow:"hidden", border:"1px solid rgba(99,102,241,0.18)", position:"relative" }}>
//                     <img src={imagePreview} alt="Preview" style={{ width:"100%", display:"block", maxHeight:230, objectFit:"cover" }} />
//                     <div style={{ position:"absolute", top:10, right:10, padding:"4px 10px", background:"rgba(16,185,129,0.88)", backdropFilter:"blur(6px)", borderRadius:999, fontSize:9, color:"white", fontWeight:700, display:"flex", alignItems:"center", gap:4 }}>
//                       <Check size={10}/> Ready
//                     </div>
//                   </div>
//                 )}

//                 {/* Error */}
//                 {error && (
//                   <div style={{ marginTop:14, padding:"12px 16px", background:"rgba(239,68,68,0.06)", border:"1px solid rgba(239,68,68,0.18)", borderRadius:10, fontSize:12, color:"#ef4444" }}>
//                     ⚠ {error}
//                   </div>
//                 )}

//                 {/* Analyse button */}
//                 <button onClick={handleAnalyze} disabled={loading || !imageData}
//                   style={{ marginTop:16, width:"100%", padding:"13px", borderRadius:12, border:"none", fontFamily:"Outfit,sans-serif", fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", cursor: loading||!imageData ? "not-allowed" : "pointer", transition:"all 0.2s", display:"flex", alignItems:"center", justifyContent:"center", gap:8,
//                     background: !imageData ? "rgba(148,163,184,0.12)" : "linear-gradient(135deg,#2563eb,#6366f1,#7c3aed)",
//                     color: !imageData ? "#94a3b8" : "white",
//                     boxShadow: imageData&&!loading ? "0 4px 16px rgba(99,102,241,0.28)" : "none",
//                     opacity: loading ? 0.65 : 1,
//                   }}>
//                   <Zap size={14}/>{loading ? "Analyzing…" : "Analyze Equipment"}
//                 </button>
//               </div>
//             </div>

//             {/* Results / Empty */}
//             <div>
//               {loading && <Loader />}
//               {!loading && result && <ResultPanel result={result} />}
//               {!loading && !result && (
//                 <div style={{ ...glass, borderRadius:24, padding:"80px 32px", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", gap:20, border:"2px dashed #c7d2fe" }}>
//                   <div style={{ width:60, height:60, borderRadius:"50%", border:"2px dashed #a5b4fc", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28 }}>🏋️</div>
//                   <div>
//                     <h2 style={{ fontSize:"1.5rem", fontWeight:800, color:"#0f172a", marginBottom:8 }}>No Equipment Analyzed</h2>
//                     <p style={{ fontSize:"0.875rem", color:"#64748b", maxWidth:340, lineHeight:1.7 }}>
//                       Upload or capture a photo of any fitness equipment to receive your personalised elite coaching program.
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//         </main>

//         {/* FOOTER — exact from Workout.jsx */}
//         <footer style={{ position:"relative", zIndex:1, background:"#0f172a", borderTop:"1px solid rgba(255,255,255,0.05)", padding:"40px 48px" }}>
//           <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:20 }}>
//             <div>
//               <span style={{ fontSize:"1.1rem", fontWeight:800, color:"white" }}>ELITE</span>
//               <span style={{ fontSize:"1.1rem", fontWeight:800, background:"linear-gradient(135deg,#60a5fa,#818cf8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>ATELIER</span>
//               <p style={{ fontSize:"0.75rem", color:"#475569", marginTop:4 }}>Precision performance engineering.</p>
//             </div>
//             <div style={{ textAlign:"right" }}>
//               <p style={{ color:"#334155", fontSize:"0.75rem" }}>© 2026 Elite Performance Atelier. All rights reserved.</p>
//               <p style={{ color:"#1e293b", fontSize:10, marginTop:6, maxWidth:480, lineHeight:1.6 }}>
//                 This analysis is intended for general performance guidance. Adjust intensity based on your individual readiness.
//               </p>
//             </div>
//           </div>
//         </footer>

//       </div>
//     </>
//   );
// }

import { useState, useRef, useCallback } from "react";

/* ══════════════════════════════════════════════
   THEME TOKENS — exact from Workout.jsx
══════════════════════════════════════════════ */
const glass = {
  background: "rgba(255,255,255,0.85)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.9)",
  boxShadow: "0 4px 24px rgba(99,102,241,0.08), 0 1px 4px rgba(0,0,0,0.04)",
};

const TAG_STYLES = {
  primary: { background: "rgba(99,102,241,0.08)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.2)" },
  secondary: { background: "rgba(16,185,129,0.08)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" },
  muscle: { background: "rgba(148,163,184,0.08)", color: "#64748b", border: "1px solid rgba(148,163,184,0.2)" },
  danger: { background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" },
};

/* ══════════════════════════════════════════════
   GLOBAL STYLES
══════════════════════════════════════════════ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Outfit', sans-serif;
      background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #eef2ff 100%);
      min-height: 100vh;
      color: #0f172a;
    }
    @keyframes blob {
      0%,100% { transform: translate(0,0) scale(1); }
      33%      { transform: translate(28px,-18px) scale(1.06); }
      66%      { transform: translate(-18px,14px) scale(0.96); }
    }
    @keyframes fadeUp {
      from { opacity:0; transform:translateY(18px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes spin {
      from { transform:rotate(0deg); }
      to   { transform:rotate(360deg); }
    }
    .card-lift { transition: transform 0.2s, box-shadow 0.2s; cursor: default; }
    .card-lift:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(99,102,241,0.13) !important; }
    .upload-zone { transition: all 0.2s; cursor: pointer; }
    .upload-zone:hover { border-color: rgba(99,102,241,0.5) !important; background: rgba(238,242,255,0.6) !important; }
    .cam-btn { transition: all 0.2s; }
    .cam-btn:hover { border-color: rgba(234,88,12,0.45) !important; background: rgba(255,107,0,0.04) !important; }
    button { font-family: 'Outfit', sans-serif; }
  `}</style>
);

/* ══════════════════════════════════════════════
   BLOBS — exact from Workout.jsx
══════════════════════════════════════════════ */
function Blobs() {
  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <div style={{ position: "absolute", top: "-8rem", right: "-8rem", width: "26rem", height: "26rem", borderRadius: "50%", background: "#93c5fd", mixBlendMode: "multiply", filter: "blur(72px)", opacity: 0.35, animation: "blob 9s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "-8rem", left: "-8rem", width: "26rem", height: "26rem", borderRadius: "50%", background: "#c4b5fd", mixBlendMode: "multiply", filter: "blur(72px)", opacity: 0.35, animation: "blob 11s ease-in-out infinite 2s" }} />
      <div style={{ position: "absolute", top: "40%", left: "40%", width: "20rem", height: "20rem", borderRadius: "50%", background: "#a5b4fc", mixBlendMode: "multiply", filter: "blur(60px)", opacity: 0.25, transform: "translate(-50%,-50%)", animation: "blob 13s ease-in-out infinite 4s" }} />
    </div>
  );
}

/* ══════════════════════════════════════════════
   SVG ICONS (no lucide-react dependency)
══════════════════════════════════════════════ */
const Icon = {
  Zap: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Refresh: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.49" />
    </svg>
  ),
  Upload: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  ),
  Camera: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  X: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Check: ({ size = 10 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  ChevronDown: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
};

/* ══════════════════════════════════════════════
   TAG — exact from Workout.jsx
══════════════════════════════════════════════ */
function Tag({ type = "muscle", children }) {
  return (
    <span style={{ ...TAG_STYLES[type], fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 8px", borderRadius: 4 }}>
      {children}
    </span>
  );
}

/* ══════════════════════════════════════════════
   CARD HEADER — mirrors panel header pattern from Workout.jsx
══════════════════════════════════════════════ */
function CardHeader({ emoji, title, sub, right }) {
  return (
    <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(226,232,240,0.8)", background: "linear-gradient(135deg,rgba(99,102,241,0.04),rgba(139,92,246,0.04))", display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, boxShadow: "0 2px 8px rgba(99,102,241,0.3)", flexShrink: 0 }}>{emoji}</div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a" }}>{title}</p>
        {sub && <p style={{ fontSize: 10, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2 }}>{sub}</p>}
      </div>
      {right}
    </div>
  );
}

/* ══════════════════════════════════════════════
   EVIDENCE STRIP — mirrors EvidenceTrustStrip from Workout.jsx
══════════════════════════════════════════════ */
function EvidenceStrip() {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 10, padding: "8px 16px", marginTop: 16 }}>
      <span style={{ fontSize: 13 }}>🔬</span>
      <div>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#6366f1", letterSpacing: "0.1em", textTransform: "uppercase" }}>AI Vision Analysis System</span>
        <span style={{ fontSize: 10, color: "#64748b", marginLeft: 8 }}>Gemini 2.0 · Elite coaching protocols</span>
      </div>
    </div>
  );
}

// /* ══════════════════════════════════════════════
//    GEMINI API — fixed model name
// ══════════════════════════════════════════════ */
// async function analyzeFitnessImage(imageData) {
//   const API_KEY = "AIzaSyBilQMCu51Hmyq-RMeRrtcl9IPU3WIVa9g";
//   // ✅ Fixed: use gemini-2.0-flash which is stable and widely available
//   const res = await fetch(
//     `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${API_KEY}`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents: [{
//           parts: [
//             { inline_data: { mime_type: imageData.mimeType, data: imageData.data } },
//             {
//               text: `You are an elite performance coach at a luxury fitness atelier. Analyze this fitness equipment image.

// CRITICAL: Return ONLY a raw JSON object. No markdown fences, no backticks, no text before or after. Start with { and end with }.

// {
//   "equipment": {
//     "name": "Full equipment name",
//     "category": "Cardio",
//     "difficulty": "Intermediate",
//     "muscleGroups": ["Quadriceps", "Hamstrings", "Glutes"],
//     "calories": "400–600 kcal/hr"
//   },
//   "overview": "2 sentence expert description of this equipment and its performance benefits.",
//   "technique": {
//     "setup": ["Adjust seat height so knee is slightly bent at bottom", "Grip handles lightly", "Set resistance to a comfortable starting level"],
//     "execution": ["Keep back straight and core engaged", "Push through the full pedal stroke", "Maintain smooth cadence", "Look forward not down"],
//     "breathing": "Exhale on effort, inhale on recovery. Maintain steady rhythm."
//   },
//   "workouts": [
//     {
//       "name": "Foundation Builder",
//       "level": "Beginner",
//       "duration": "20 min",
//       "structure": "Steady state, low resistance",
//       "restPeriod": "No rest",
//       "intensity": 55,
//       "description": "Build aerobic base and familiarize with the equipment.",
//       "trainingEffect": "Improves cardiovascular endurance and fat oxidation",
//       "adjustmentHints": { "lowReadiness": "Reduce duration to 12 min", "highReadiness": "Add 5 min and increase resistance by 1 level" }
//     },
//     {
//       "name": "Interval Surge",
//       "level": "Intermediate",
//       "duration": "35 min",
//       "structure": "8×2 min hard / 1 min easy",
//       "restPeriod": "1 min active recovery",
//       "intensity": 78,
//       "description": "Improve VO2 max and lactate threshold with structured intervals.",
//       "trainingEffect": "Raises anaerobic threshold and sprint capacity",
//       "adjustmentHints": { "lowReadiness": "Drop to 5 intervals", "highReadiness": "Increase to 10 intervals" }
//     },
//     {
//       "name": "Peak Power Protocol",
//       "level": "Advanced",
//       "duration": "50 min",
//       "structure": "5×4 min max effort / 3 min recovery",
//       "restPeriod": "3 min",
//       "intensity": 94,
//       "description": "Maximum power output training for elite conditioning.",
//       "trainingEffect": "Maximizes peak power and neuromuscular efficiency",
//       "adjustmentHints": { "lowReadiness": "Reduce to 3 sets", "highReadiness": "Add resistance each set" }
//     }
//   ],
//   "coachTips": ["Tip 1 specific to this equipment", "Tip 2 specific to this equipment", "Tip 3 specific to this equipment"],
//   "commonMistakes": ["Mistake 1 specific to this equipment", "Mistake 2", "Mistake 3"],
//   "safetyNotes": ["Safety note 1", "Safety note 2"],
//   "progressionLogic": "Specific progression advice for this equipment over 4–12 weeks.",
//   "weeklyEmphasis": "How to integrate this equipment into a weekly training plan."
// }

// Customize ALL fields specifically for the equipment shown in the image. Do not use the example values above literally.`,
//             },
//           ],
//         }],
//         generationConfig: { temperature: 0.3, maxOutputTokens: 2200 },
//       }),
//     }
//   );
//   if (!res.ok) {
//     const errBody = await res.text();
//     throw new Error(`Gemini ${res.status}: ${errBody.slice(0, 200)}`);
//   }
//   const data = await res.json();
//   const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
//   // Strip any accidental markdown fences
//   const clean = raw.replace(/```json\s*/gi, "").replace(/```\s*/gi, "").trim();
//   return JSON.parse(clean);
// }

/* ══════════════════════════════════════════════
   GEMINI FITNESS IMAGE ANALYZER — PRODUCTION SAFE
══════════════════════════════════════════════ */

export async function analyzeFitnessImage(imageData) {
  const API_KEY =  "AIzaSyBilQMCu51Hmyq-RMeRrtcl9IPU3WIVa9g";

  if (!API_KEY) {
    throw new Error("GEMINI_API_KEY not found");
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                inline_data: {
                  mime_type: imageData.mimeType,
                  data: imageData.data
                }
              },
              {
                text: `You are an elite performance coach at a luxury fitness atelier. Analyze this fitness equipment image.

CRITICAL:
Return ONLY a raw JSON object.
No markdown fences.
No backticks.
No text before or after.
Start with { and end with }.

{
  "equipment": {
    "name": "Full equipment name",
    "category": "Cardio | Strength | Functional | Mobility",
    "difficulty": "Beginner | Intermediate | Advanced",
    "muscleGroups": ["Primary muscle 1", "Primary muscle 2"],
    "calories": "Estimated kcal/hour range"
  },
  "overview": "2 sentence expert description of this equipment and its performance benefits.",
  "technique": {
    "setup": ["Step 1", "Step 2", "Step 3"],
    "execution": ["Step 1", "Step 2", "Step 3", "Step 4"],
    "breathing": "Breathing guidance specific to this equipment."
  },
  "workouts": [
    {
      "name": "Beginner Protocol",
      "level": "Beginner",
      "duration": "20 min",
      "structure": "Describe structure",
      "restPeriod": "Rest description",
      "intensity": 55,
      "description": "What this workout achieves.",
      "trainingEffect": "Physiological benefit.",
      "adjustmentHints": {
        "lowReadiness": "How to reduce load",
        "highReadiness": "How to increase load"
      }
    },
    {
      "name": "Performance Builder",
      "level": "Intermediate",
      "duration": "35 min",
      "structure": "Describe structure",
      "restPeriod": "Rest description",
      "intensity": 75,
      "description": "What this workout achieves.",
      "trainingEffect": "Physiological benefit.",
      "adjustmentHints": {
        "lowReadiness": "How to reduce load",
        "highReadiness": "How to increase load"
      }
    },
    {
      "name": "Elite Conditioning",
      "level": "Advanced",
      "duration": "50 min",
      "structure": "Describe structure",
      "restPeriod": "Rest description",
      "intensity": 90,
      "description": "What this workout achieves.",
      "trainingEffect": "Physiological benefit.",
      "adjustmentHints": {
        "lowReadiness": "How to reduce load",
        "highReadiness": "How to increase load"
      }
    }
  ],
  "coachTips": [
    "Tip specific to this equipment",
    "Another advanced coaching cue",
    "Form optimization advice"
  ],
  "commonMistakes": [
    "Mistake specific to this equipment",
    "Another common error",
    "Safety-related mistake"
  ],
  "safetyNotes": [
    "Important safety note",
    "Joint or posture warning"
  ],
  "progressionLogic": "Explain how to progress intensity or complexity over 4–12 weeks.",
  "weeklyEmphasis": "How to integrate this equipment into a balanced weekly program."
}

Customize ALL fields specifically for the equipment shown in the image. Do not copy template text literally.`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2200
        }
      })
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini ${res.status}: ${errText.slice(0, 300)}`);
  }

  const data = await res.json();
  const raw =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  if (!raw) {
    throw new Error("Empty response from Gemini");
  }

  // Remove accidental markdown fences
  const cleaned = raw
    .replace(/```json/gi, "")
    .replace(/```/gi, "")
    .trim();

  // Safe JSON extraction
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("No valid JSON found in Gemini response");
  }

  try {
    return JSON.parse(cleaned.slice(start, end + 1));
  } catch (err) {
    console.error("Invalid JSON from Gemini:", cleaned);
    throw new Error("Gemini returned malformed JSON");
  }
}

/* ══════════════════════════════════════════════
   INTENSITY BAR
══════════════════════════════════════════════ */
function IntensityBar({ value }) {
  const color = value >= 88
    ? "linear-gradient(90deg,#ef4444,#dc2626)"
    : value >= 72
      ? "linear-gradient(90deg,#f97316,#ea580c)"
      : "linear-gradient(90deg,#10b981,#059669)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ flex: 1, height: 5, background: "rgba(148,163,184,0.15)", borderRadius: 999, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${value}%`, background: color, borderRadius: 999, transition: "width 0.9s cubic-bezier(0.34,1.56,0.64,1)" }} />
      </div>
      <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", minWidth: 30 }}>{value}%</span>
    </div>
  );
}

/* ══════════════════════════════════════════════
   WORKOUT CARD — mirrors ExerciseCard from Workout.jsx
══════════════════════════════════════════════ */
function WorkoutCard({ w, idx }) {
  const [expanded, setExpanded] = useState(false);
  const tagType = w.level === "Beginner" ? "secondary" : w.level === "Advanced" ? "danger" : "primary";

  return (
    <div className="card-lift" style={{ background: "rgba(238,242,255,0.4)", border: "1px solid #e0e7ff", borderRadius: 14, overflow: "hidden", animation: `fadeUp 0.4s ease ${idx * 0.1}s both` }}>

      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: 18 }}>
        {/* Number badge */}
        <div style={{ width: 30, height: 30, borderRadius: 9, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 8px rgba(99,102,241,0.3)" }}>
          {idx + 1}
        </div>
        {/* Name + tags */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>{w.name}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            <Tag type={tagType}>{w.level}</Tag>
            <Tag type="muscle">{w.duration}</Tag>
          </div>
        </div>
        {/* Structure + rest */}
        <div style={{ flexShrink: 0, textAlign: "right" }}>
          <p style={{ fontSize: 13, fontWeight: 800, color: "#0f172a" }}>{w.structure}</p>
          <p style={{ fontSize: 10, color: "#94a3b8", marginTop: 3 }}>{w.restPeriod} rest</p>
        </div>
      </div>

      <div style={{ padding: "0 18px 16px" }}>
        <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.6, marginBottom: 12 }}>{w.description}</p>
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 6 }}>Intensity</p>
        <IntensityBar value={w.intensity} />
      </div>

      {/* Expandable */}
      <button onClick={() => setExpanded(!expanded)}
        style={{ width: "100%", padding: "9px 18px", background: "transparent", border: "none", borderTop: "1px solid #e0e7ff", fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        {expanded ? "Hide Details" : "View Details"}
        <span style={{ display: "inline-block", transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
          <Icon.ChevronDown />
        </span>
      </button>

      {expanded && (
        <div style={{ padding: "16px 18px 18px", borderTop: "1px solid #e0e7ff", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {w.trainingEffect && (
            <div style={{ background: "rgba(99,102,241,0.05)", border: "1px solid #e0e7ff", borderRadius: 10, padding: 14 }}>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", marginBottom: 8 }}>Training Effect</p>
              <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.6 }}>{w.trainingEffect}</p>
            </div>
          )}
          {w.adjustmentHints && (
            <div style={{ background: "rgba(16,185,129,0.05)", border: "1px solid #d1fae5", borderRadius: 10, padding: 14 }}>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#10b981", marginBottom: 8 }}>Readiness Adjustments</p>
              {w.adjustmentHints.lowReadiness && <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.6, marginBottom: 6 }}><span style={{ color: "#94a3b8" }}>Low: </span>{w.adjustmentHints.lowReadiness}</p>}
              {w.adjustmentHints.highReadiness && <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.6 }}><span style={{ color: "#94a3b8" }}>High: </span>{w.adjustmentHints.highReadiness}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   RESULT PANEL
══════════════════════════════════════════════ */
function ResultPanel({ result }) {
  const { equipment, overview, technique, workouts, coachTips, commonMistakes, safetyNotes, progressionLogic, weeklyEmphasis } = result;
  const diffTag = equipment.difficulty === "Beginner" ? "secondary" : (equipment.difficulty === "Advanced" || equipment.difficulty === "Elite") ? "danger" : "primary";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "fadeUp 0.5s ease both" }}>

      {/* ── Equipment Overview ── */}
      <div style={{ ...glass, borderRadius: 24, overflow: "hidden", borderTop: "2px solid #6366f1" }}>
        <div style={{ padding: "18px 28px", borderBottom: "1px solid rgba(226,232,240,0.8)", background: "linear-gradient(135deg,rgba(99,102,241,0.04),rgba(139,92,246,0.04))", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, boxShadow: "0 2px 8px rgba(99,102,241,0.3)" }}>⚡</div>
            <div>
              <p style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>{equipment.name}</p>
              <p style={{ fontSize: 10, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2 }}>{equipment.category} Equipment</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <Tag type="primary">{equipment.category}</Tag>
            <Tag type={diffTag}>{equipment.difficulty}</Tag>
          </div>
        </div>

        <div style={{ padding: "24px 28px" }}>
          <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.75, marginBottom: 24 }}>{overview}</p>
          {/* Stats row — mirrors metadata badges in WorkoutHeader */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
            {[
              { label: "Calories / Hour", value: equipment.calories, color: "#f97316" },
              { label: "Difficulty", value: equipment.difficulty, color: "#6366f1" },
              { label: "Muscle Groups", value: `${equipment.muscleGroups.length} areas`, color: "#10b981" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ background: "rgba(238,242,255,0.6)", border: "1px solid #e0e7ff", borderRadius: 12, padding: "14px 16px" }}>
                <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 6 }}>{label}</p>
                <p style={{ fontSize: "0.95rem", fontWeight: 800, color, textTransform: "capitalize" }}>{value}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 10 }}>Target Muscles</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {equipment.muscleGroups.map((m, i) => <Tag key={i} type="muscle">{m}</Tag>)}
          </div>
        </div>
      </div>

      {/* ── Technique ── */}
      <div style={{ ...glass, borderRadius: 20, overflow: "hidden" }}>
        <CardHeader emoji="🎯" title="Technique Mastery" sub="Elite form coaching" />
        <div style={{ padding: "24px 28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", marginBottom: 14 }}>Setup Protocol</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {technique.setup.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "white", flexShrink: 0 }}>{i + 1}</div>
                  <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>{s}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#10b981", marginBottom: 14 }}>Execution Cues</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
              {technique.execution.map((cue, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: "#6366f1", fontSize: 16, flexShrink: 0, lineHeight: 1.5 }}>›</span>
                  <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>{cue}</p>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(99,102,241,0.05)", border: "1px solid #e0e7ff", borderRadius: 10, padding: "12px 14px" }}>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", marginBottom: 6 }}>Breathing</p>
              <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>{technique.breathing}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Workouts ── */}
      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#94a3b8" }}>Workout Protocols</p>
          <span style={{ fontSize: 9, fontWeight: 700, color: "#c7d2fe" }}>{workouts.length} programs</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {workouts.map((w, i) => <WorkoutCard key={i} w={w} idx={i} />)}
        </div>
      </div>

      {/* ── Coach Tips + Mistakes ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ ...glass, borderRadius: 20, overflow: "hidden" }}>
          <CardHeader emoji="🏆" title="Coach Tips" sub="Elite performance cues" />
          <div style={{ padding: "18px 22px", display: "flex", flexDirection: "column", gap: 12 }}>
            {coachTips.map((tip, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#f59e0b", fontSize: 14, flexShrink: 0 }}>★</span>
                <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ ...glass, borderRadius: 20, overflow: "hidden" }}>
          <CardHeader emoji="⚠️" title="Common Mistakes" sub="Errors to avoid" />
          <div style={{ padding: "18px 22px", display: "flex", flexDirection: "column", gap: 12 }}>
            {commonMistakes.map((m, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#ef4444", fontSize: 12, flexShrink: 0, marginTop: 2, fontWeight: 700 }}>✕</span>
                <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>{m}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Programme Notes — mirrors GlobalNotesCard from Workout.jsx ── */}
      <div style={{ ...glass, borderRadius: 20, overflow: "hidden" }}>
        <div style={{ padding: "18px 28px", borderBottom: "1px solid rgba(226,232,240,0.8)", display: "flex", alignItems: "center", gap: 12, background: "linear-gradient(135deg,rgba(99,102,241,0.04),rgba(139,92,246,0.04))" }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14, boxShadow: "0 2px 8px rgba(99,102,241,0.3)" }}>◈</div>
          <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a" }}>Programme Notes</h2>
        </div>
        <div style={{ padding: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", marginBottom: 10 }}>Safety Notes</p>
            {safetyNotes.map((note, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>
                <span style={{ color: "#6366f1", flexShrink: 0 }}>›</span>
                <span>{note}</span>
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#10b981", marginBottom: 10 }}>Weekly Emphasis</p>
            <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.7 }}>{weeklyEmphasis}</p>
          </div>
          {progressionLogic && (
            <div style={{ gridColumn: "1/-1", paddingTop: 20, borderTop: "1px solid #f1f5f9" }}>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 10 }}>Progression Logic</p>
              <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.75 }}>{progressionLogic}</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

/* ══════════════════════════════════════════════
   LOADER
══════════════════════════════════════════════ */
function Loader() {
  return (
    <div style={{ ...glass, borderRadius: 20, padding: "64px 32px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <div style={{ position: "relative", width: 52, height: 52 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid rgba(99,102,241,0.1)" }} />
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid transparent", borderTopColor: "#6366f1", animation: "spin 0.85s linear infinite" }} />
        <div style={{ position: "absolute", inset: "10px", borderRadius: "50%", border: "2px solid transparent", borderTopColor: "#8b5cf6", animation: "spin 1.3s linear infinite reverse" }} />
      </div>
      <div>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>Analyzing Equipment</p>
        <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>Elite AI coaching engine processing…</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════ */
export default function FitnessAnalyzer() {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputMode, setInputMode] = useState("upload"); // "upload" | "camera"
  const [cameraOn, setCameraOn] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);

  /* File upload */
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError("Image must be under 5MB."); return; }
    setError(""); setResult(null);
    setImagePreview(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.onloadend = () => setImageData({ data: reader.result.split(",")[1], mimeType: file.type });
    reader.readAsDataURL(file);
  };

  /* Camera */
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraOn(true); setError("");
    } catch { setError("Camera access denied. Allow camera permissions and try again."); }
  };
  const stopCamera = () => { streamRef.current?.getTracks().forEach(t => t.stop()); setCameraOn(false); };
  const capturePhoto = useCallback(() => {
    const v = videoRef.current, c = canvasRef.current;
    if (!v || !c) return;
    c.width = v.videoWidth; c.height = v.videoHeight;
    c.getContext("2d").drawImage(v, 0, 0);
    const url = c.toDataURL("image/jpeg", 0.92);
    setImagePreview(url);
    setImageData({ data: url.split(",")[1], mimeType: "image/jpeg" });
    setResult(null); stopCamera();
  }, []);

  /* Analyze */
  const handleAnalyze = async () => {
    if (!imageData) { setError("Please upload or capture an image first."); return; }
    setLoading(true); setError(""); setResult(null);
    try { setResult(await analyzeFitnessImage(imageData)); }
    catch (err) { setError("Analysis failed: " + err.message); }
    setLoading(false);
  };

  const clearAll = () => { setImagePreview(null); setImageData(null); setResult(null); setError(""); };

  const hasResult = result || loading;

  return (
    <>
      <GlobalStyles />
      <Blobs />

      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column" }}>

        {/* NAV */}
        <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.6)", padding: "18px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.45)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
          <span style={{ fontSize: "1.15rem", fontWeight: 800 }}>
            <span style={{ color: "#0f172a" }}>ELITE</span>
            <span style={{ background: "linear-gradient(135deg,#2563eb,#6366f1,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ATELIER</span>
          </span>
          <div style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 999, padding: "5px 16px" }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6366f1" }}>Equipment AI</span>
          </div>
        </nav>

        {/* MAIN */}
        <main style={{ flex: 1, maxWidth: 1200, width: "100%", margin: "0 auto", padding: "48px 48px 96px", display: "flex", flexDirection: "column", gap: 36 }}>

          {/* HERO — mirrors WorkoutHeader */}
          <div style={{ ...glass, borderRadius: 24, padding: "32px 36px", borderTop: "2px solid #6366f1" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 24 }}>
              <div style={{ flex: 1, minWidth: 260 }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6366f1", marginBottom: 10 }}>Equipment Analysis</p>
                <h1 style={{ fontSize: "clamp(1.5rem,3vw,2.1rem)", fontWeight: 800, color: "#0f172a", lineHeight: 1.1, marginBottom: 6 }}>
                  AI Fitness Equipment Analyzer
                </h1>
                <p style={{ fontSize: 12, color: "#94a3b8", fontWeight: 400, lineHeight: 1.65, marginTop: 8, maxWidth: 500 }}>
                  Upload or capture any fitness equipment and receive expert coaching protocols, technique breakdowns, and personalised workout programs powered by Gemini AI.
                </p>
                <EvidenceStrip />
              </div>
              {/* CTA buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
                <button onClick={handleAnalyze} disabled={loading || !imageData}
                  style={{ padding: "12px 24px", background: !imageData ? "rgba(148,163,184,0.15)" : "linear-gradient(135deg,#2563eb,#6366f1,#7c3aed)", color: !imageData ? "#94a3b8" : "white", borderRadius: 12, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", border: "none", cursor: loading || !imageData ? "not-allowed" : "pointer", opacity: loading ? 0.65 : 1, display: "flex", alignItems: "center", gap: 8, boxShadow: imageData && !loading ? "0 4px 16px rgba(99,102,241,0.3)" : "none", transition: "all 0.2s", whiteSpace: "nowrap" }}>
                  <Icon.Zap /> {loading ? "Analyzing…" : "Analyze Equipment"}
                </button>
                {imageData && !loading && (
                  <button onClick={clearAll}
                    style={{ padding: "11px 24px", background: "rgba(255,255,255,0.8)", color: "#6366f1", borderRadius: 12, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", border: "1.5px solid rgba(99,102,241,0.3)", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s" }}>
                    <Icon.Refresh /> Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* INPUT + RESULTS — side-by-side when result, stacked when not */}
          <div style={{ display: "grid", gridTemplateColumns: hasResult ? "340px 1fr" : "600px", justifyContent: hasResult ? "stretch" : "center", gap: 28, alignItems: "start" }}>

            {/* ── INPUT CARD ── */}
            <div style={{ ...glass, borderRadius: 20, overflow: "hidden", position: hasResult ? "sticky" : "static", top: 24 }}>
              <CardHeader emoji="◎" title="Image Input" sub="Upload or use camera" />
              <div style={{ padding: 22 }}>

                {/* Mode toggle */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 18 }}>
                  {[
                    { key: "upload", icon: <Icon.Upload size={13} />, label: "Upload" },
                    { key: "camera", icon: <Icon.Camera size={13} />, label: "Camera" },
                  ].map(({ key, icon, label }) => (
                    <button key={key}
                      onClick={() => { setInputMode(key); if (key !== "camera") stopCamera(); }}
                      style={{
                        padding: "10px 8px", borderRadius: 10, cursor: "pointer", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, border: "none",
                        ...(inputMode === key
                          ? { background: "linear-gradient(135deg,#2563eb,#6366f1,#7c3aed)", color: "white", boxShadow: "0 4px 12px rgba(99,102,241,0.28)" }
                          : { background: "rgba(238,242,255,0.6)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.15)" }
                        )
                      }}>
                      {icon} {label}
                    </button>
                  ))}
                </div>

                {/* Upload zone */}
                {inputMode === "upload" && (
                  <label className="upload-zone"
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "30px 20px", border: "2px dashed rgba(99,102,241,0.25)", borderRadius: 14, background: "rgba(238,242,255,0.3)" }}>
                    <input type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#6366f1" }}>
                      <Icon.Upload size={20} />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#6366f1" }}>Click to upload image</p>
                      <p style={{ fontSize: 10, color: "#94a3b8", marginTop: 4 }}>JPG, PNG, WEBP — max 5MB</p>
                    </div>
                  </label>
                )}

                {/* Camera zone */}
                {inputMode === "camera" && (
                  <div>
                    <canvas ref={canvasRef} style={{ display: "none" }} />
                    {!cameraOn ? (
                      <button className="cam-btn" onClick={startCamera}
                        style={{ width: "100%", padding: "28px 20px", borderRadius: 14, border: "2px dashed rgba(234,88,12,0.28)", background: "rgba(255,107,0,0.02)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(234,88,12,0.09)", border: "1px solid rgba(234,88,12,0.22)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ea580c" }}>
                          <Icon.Camera size={20} />
                        </div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "#ea580c" }}>Start Camera</p>
                      </button>
                    ) : (
                      <div style={{ borderRadius: 14, overflow: "hidden", position: "relative", border: "1px solid rgba(99,102,241,0.15)" }}>
                        <video ref={videoRef} autoPlay playsInline style={{ width: "100%", display: "block", maxHeight: 240, objectFit: "cover" }} />
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 12, display: "flex", gap: 8, background: "linear-gradient(to top,rgba(0,0,0,0.5),transparent)" }}>
                          <button onClick={capturePhoto}
                            style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#2563eb,#6366f1)", color: "white", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                            <Icon.Camera size={13} /> Capture
                          </button>
                          <button onClick={stopCamera}
                            style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.3)", background: "rgba(0,0,0,0.3)", color: "white", cursor: "pointer", display: "flex", alignItems: "center" }}>
                            <Icon.X />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Preview */}
                {imagePreview && (
                  <div style={{ marginTop: 16, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(99,102,241,0.18)", position: "relative" }}>
                    <img src={imagePreview} alt="Preview" style={{ width: "100%", display: "block", maxHeight: 220, objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: 10, right: 10, padding: "4px 10px", background: "rgba(16,185,129,0.9)", backdropFilter: "blur(6px)", borderRadius: 999, fontSize: 9, color: "white", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                      <Icon.Check size={10} /> Ready
                    </div>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div style={{ marginTop: 14, padding: "12px 14px", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.18)", borderRadius: 10, fontSize: 12, color: "#ef4444", lineHeight: 1.5 }}>
                    ⚠ {error}
                  </div>
                )}

                {/* Analyse button */}
                <button onClick={handleAnalyze} disabled={loading || !imageData}
                  style={{
                    marginTop: 16, width: "100%", padding: "13px", borderRadius: 12, border: "none", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: loading || !imageData ? "not-allowed" : "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    background: !imageData ? "rgba(148,163,184,0.12)" : "linear-gradient(135deg,#2563eb,#6366f1,#7c3aed)",
                    color: !imageData ? "#94a3b8" : "white",
                    boxShadow: imageData && !loading ? "0 4px 16px rgba(99,102,241,0.28)" : "none",
                    opacity: loading ? 0.65 : 1,
                  }}>
                  <Icon.Zap /> {loading ? "Analyzing…" : "Analyze Equipment"}
                </button>
              </div>
            </div>

            {/* ── RESULTS / EMPTY ── */}
            <div>
              {loading && <Loader />}
              {!loading && result && <ResultPanel result={result} />}
              {!loading && !result && !hasResult && (
                <div style={{ ...glass, borderRadius: 24, padding: "72px 32px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 20, border: "2px dashed #c7d2fe" }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", border: "2px dashed #a5b4fc", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>🏋️</div>
                  <div>
                    <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>No Equipment Analyzed</h2>
                    <p style={{ fontSize: "0.875rem", color: "#64748b", maxWidth: 320, lineHeight: 1.7 }}>
                      Upload or capture a photo of any fitness equipment to receive your personalised elite coaching program.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </main>

        {/* FOOTER — exact from Workout.jsx */}
        <footer style={{ position: "relative", zIndex: 1, background: "#0f172a", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "40px 48px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
            <div>
              <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "white" }}>ELITE</span>
              <span style={{ fontSize: "1.1rem", fontWeight: 800, background: "linear-gradient(135deg,#60a5fa,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ATELIER</span>
              <p style={{ fontSize: "0.75rem", color: "#475569", marginTop: 4 }}>Precision performance engineering.</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ color: "#334155", fontSize: "0.75rem" }}>© 2026 Elite Performance Atelier. All rights reserved.</p>
              <p style={{ color: "#1e293b", fontSize: 10, marginTop: 6, maxWidth: 480, lineHeight: 1.6 }}>
                This analysis is for general performance guidance. Adjust intensity based on your individual readiness.
              </p>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}