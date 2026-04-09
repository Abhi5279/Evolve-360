// // import React, { useState, useEffect, useRef } from "react";
// // import Webcam from "react-webcam";

// // // ─────────────────────────────────────────────────────────────
// // //  🔑 PASTE YOUR API KEYS HERE
// // // ─────────────────────────────────────────────────────────────
// // const GEMINI_API_KEY = "AIzaSyAqeLDtcot9XVzUPPWQQzWVy4jocmKxJtM";
// // const PEXELS_API_KEY  = "yVNSo9fZ5vgwmvLdvfF5qr9TSKLnnjFN6LqiiZwuUIRW6yhWj8I8ha68";

// // // ─────────────────────────────────────────────────────────────
// // //  GEMINI — direct browser call
// // // ─────────────────────────────────────────────────────────────
// // async function analyzePostureAI(angleStats, rawKeypoints, snapshotImage, mode, description, exerciseType) {
// //   const prompt = `
// // You are a licensed physiotherapist and biomechanics expert.

// // SESSION DETAILS:
// // Mode: ${mode}
// // Exercise Type: ${exerciseType}
// // User Description: ${description || "None"}

// // ANGLE DATA:
// // ${JSON.stringify(angleStats, null, 2)}

// // KEYPOINT SAMPLE (first 3):
// // ${JSON.stringify((rawKeypoints || []).slice(0, 3), null, 2)}

// // TASKS:
// // 1. Identify the movement pattern being performed.
// // 2. Evaluate overall posture quality from the image and angle data.
// // 3. Detect any asymmetry, instability, or compensation patterns.
// // 4. Assess injury risk level and clearly explain the reason.
// // 5. Provide ${mode === "Correction" ? "corrective improvement steps to fix existing mistakes" : "guided step-by-step instructions to teach correct form from scratch"}.
// // 6. Assign an overall posture score between 0 and 10.

// // SCORING RULE:
// //   0-3  = High risk / poor form
// //   4-6  = Moderate errors present
// //   7-8  = Minor corrections needed
// //   9-10 = Excellent form

// // IMPORTANT:
// // - summary must be detailed (minimum 5-6 sentences).
// // - correction_keywords: 3-5 specific image search terms.
// // - Return ONLY raw JSON — no markdown, no backticks.

// // JSON FORMAT:
// // {
// //   "overall_score": <0-10>,
// //   "risk_level": "LOW" | "MEDIUM" | "HIGH",
// //   "risk_reason": "",
// //   "movement_pattern": "",
// //   "mistakes_detected": [],
// //   "improvement_points": [],
// //   "summary": "",
// //   "correction_keywords": []
// // }`;

// //   const parts = [{ text: prompt }];
// //   if (snapshotImage?.startsWith("data:image")) {
// //     parts.push({ inline_data: { mime_type: "image/jpeg", data: snapshotImage.split(",")[1] } });
// //   }

// //   const res = await fetch(
// //     `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
// //     {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ contents: [{ role: "user", parts }] }),
// //     }
// //   );

// //   if (!res.ok) throw new Error(`Gemini HTTP ${res.status}`);
// //   const data = await res.json();
// //   const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
// //   const match = text.match(/\{[\s\S]*\}/);
// //   if (!match) throw new Error("No JSON in Gemini response");

// //   const p = JSON.parse(match[0]);
// //   const score = Math.max(0, Math.min(10, Number(p.overall_score) || 5));
// //   const risk = ["LOW","MEDIUM","HIGH"].includes(p.risk_level?.toUpperCase()) ? p.risk_level.toUpperCase() : "LOW";

// //   return {
// //     overall_score:       score,
// //     risk_level:          risk,
// //     risk_reason:         p.risk_reason        || "",
// //     movement_pattern:    p.movement_pattern   || "",
// //     mistakes_detected:   Array.isArray(p.mistakes_detected)  ? p.mistakes_detected  : [],
// //     improvement_points:  Array.isArray(p.improvement_points) ? p.improvement_points : [],
// //     summary:             p.summary            || "Posture analysis completed.",
// //     correction_keywords: Array.isArray(p.correction_keywords) ? p.correction_keywords : ["posture correction exercise"],
// //   };
// // }

// // // ─────────────────────────────────────────────────────────────
// // //  PEXELS — direct browser call
// // // ─────────────────────────────────────────────────────────────
// // async function fetchReferenceImages(keywords) {
// //   const defaults = ["correct standing posture physiotherapy","shoulder posture correction exercise","back straight posture physiotherapy","proper spine alignment posture"];
// //   const terms = Array.isArray(keywords) && keywords.length > 0 ? keywords : defaults;
// //   const images = [], used = new Set();

// //   for (const term of terms.slice(0, 4)) {
// //     if (images.length >= 4) break;
// //     try {
// //       const res = await fetch(
// //         `https://api.pexels.com/v1/search?query=${encodeURIComponent(term + " proper form")}&per_page=3&orientation=portrait&size=large`,
// //         { headers: { Authorization: PEXELS_API_KEY } }
// //       );
// //       const d = await res.json();
// //       for (const photo of d.photos || []) {
// //         if (images.length >= 4) break;
// //         const url = photo.src.large2x || photo.src.large || photo.src.medium;
// //         if (!used.has(url)) { used.add(url); images.push({ url, width: 400, height: 600 }); }
// //       }
// //     } catch (_) {}
// //   }

// //   if (images.length === 0) {
// //     try {
// //       const res = await fetch(`https://api.pexels.com/v1/search?query=correct+posture+standing+physiotherapy&per_page=4&orientation=portrait`, { headers: { Authorization: PEXELS_API_KEY } });
// //       const d = await res.json();
// //       for (const photo of d.photos || []) {
// //         const url = photo.src.large2x || photo.src.large || photo.src.medium;
// //         images.push({ url, width: 400, height: 600 });
// //       }
// //     } catch (_) {}
// //   }
// //   return images;
// // }

// // // ─────────────────────────────────────────────────────────────
// // //  MAIN ORCHESTRATOR  (was the Express controller)
// // // ─────────────────────────────────────────────────────────────
// // async function runAnalysis({ mode, duration, description, exerciseType, angleStats, rawKeypoints, snapshotImage }) {
// //   try {
// //     const ai = await analyzePostureAI(angleStats, rawKeypoints, snapshotImage, mode, description, exerciseType);
// //     const referenceImages = await fetchReferenceImages(ai.correction_keywords);
// //     return {
// //       mode, duration, exerciseType,
// //       overall_score:     ai.overall_score,
// //       risk_level:        ai.risk_level,
// //       risk_reason:       ai.risk_reason,
// //       movement_pattern:  ai.movement_pattern,
// //       mistakes_detected: ai.mistakes_detected,
// //       guidance_points:   mode === "Guidance"   ? ai.improvement_points : [],
// //       correction_points: mode === "Correction" ? ai.improvement_points : [],
// //       summary:           ai.summary,
// //       reference_images:  referenceImages,
// //     };
// //   } catch (err) {
// //     console.error("Analysis error:", err);
// //     return {
// //       mode, duration, exerciseType,
// //       overall_score: 5, risk_level: "LOW",
// //       risk_reason: "AI temporarily unavailable — check your API keys.",
// //       movement_pattern: "", mistakes_detected: [],
// //       guidance_points: [], correction_points: [],
// //       summary: "A temporary issue occurred during analysis. Please verify your GEMINI_API_KEY and PEXELS_API_KEY at the top of App.jsx and try again.",
// //       reference_images: [],
// //     };
// //   }
// // }

// // // ═════════════════════════════════════════════════════════════
// // //  PAGE 1 — SETUP
// // // ═════════════════════════════════════════════════════════════
// // function SetupPage({ onStart }) {
// //   const [mode, setMode]               = useState("Correction");
// //   const [duration, setDuration]       = useState(30);
// //   const [description, setDescription] = useState("");
// //   const [exerciseType, setExerciseType] = useState("Auto-detect");

// //   const durationOptions = mode === "Guidance" ? [5, 10, 15] : [30, 60, 120, 180, 240, 300];

// //   const label = { display:"block", fontSize:11, fontWeight:700, color:"#627d98", textTransform:"uppercase", letterSpacing:1, marginBottom:8 };
// //   const fieldStyle = { width:"100%", padding:"13px 14px", borderRadius:12, border:"2px solid #e2e8f0", fontSize:14, color:"#102a43", outline:"none", background:"#fff", boxSizing:"border-box" };

// //   return (
// //     <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg,#f0f4f8 0%,#d9e2ec 100%)", padding:20, fontFamily:"'Inter',-apple-system,sans-serif" }}>
// //       <div style={{ width:"100%", maxWidth:480, background:"rgba(255,255,255,0.88)", backdropFilter:"blur(14px)", borderRadius:30, padding:45, boxShadow:"0 20px 50px rgba(0,0,0,0.08)", border:"1px solid rgba(255,255,255,0.5)" }}>

// //         <div style={{ textAlign:"center", marginBottom:32 }}>
// //           <div style={{ fontSize:48, marginBottom:10 }}>🧘‍♂️</div>
// //           <h2 style={{ margin:0, fontSize:24, fontWeight:800, color:"#102a43" }}>Configure Analysis</h2>
// //           <p style={{ color:"#627d98", marginTop:6, fontSize:14 }}>Set your parameters for AI posture tracking</p>
// //         </div>

// //         {/* Mode Toggle */}
// //         <label style={label}>Analysis Mode *</label>
// //         <div style={{ display:"flex", gap:10, marginBottom:24, background:"#f1f5f9", padding:6, borderRadius:14 }}>
// //           {["Correction","Guidance"].map((m) => (
// //             <button key={m} onClick={() => { setMode(m); setDuration(m==="Guidance"?5:30); }}
// //               style={{ flex:1, padding:12, borderRadius:10, border:"none", cursor:"pointer", fontWeight:600, fontSize:14, transition:"all 0.2s",
// //                 backgroundColor: mode===m ? "#0066FF" : "transparent",
// //                 color: mode===m ? "#fff" : "#486581",
// //                 boxShadow: mode===m ? "0 4px 12px rgba(0,102,255,0.2)" : "none" }}>
// //               {m}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Exercise + Duration */}
// //         <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 }}>
// //           <div>
// //             <label style={label}>Exercise Type</label>
// //             <select value={exerciseType} onChange={(e)=>setExerciseType(e.target.value)} style={fieldStyle}>
// //               {["Auto-detect","Wrist Flexion","Shoulder Raise","Squat","Plank"].map(o=><option key={o}>{o}</option>)}
// //             </select>
// //           </div>
// //           <div>
// //             <label style={label}>Duration *</label>
// //             <select value={duration} onChange={(e)=>setDuration(Number(e.target.value))} style={fieldStyle}>
// //               {durationOptions.map(d=><option key={d} value={d}>{d>=60?`${d/60} min`:`${d} sec`}</option>)}
// //             </select>
// //           </div>
// //         </div>

// //         {/* Description */}
// //         <label style={label}>Clinical Description (optional)</label>
// //         <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}
// //           placeholder="e.g. Chronic lumbar stiffness..."
// //           style={{ ...fieldStyle, marginBottom:24 }} />

// //         {/* Start */}
// //         <button onClick={()=>onStart({mode,duration,description,exerciseType})}
// //           onMouseEnter={e=>{e.currentTarget.style.backgroundColor="#0052cc";e.currentTarget.style.transform="translateY(-2px)";}}
// //           onMouseLeave={e=>{e.currentTarget.style.backgroundColor="#0066FF";e.currentTarget.style.transform="translateY(0)";}}
// //           style={{ width:"100%", padding:18, borderRadius:16, border:"none", backgroundColor:"#0066FF", color:"white", fontSize:16, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:10, boxShadow:"0 10px 25px rgba(0,102,255,0.25)", transition:"all 0.2s" }}>
// //           <span>🎥</span> Start AI Recording
// //         </button>

// //         <p style={{ textAlign:"center", fontSize:11, color:"#9fb3c8", marginTop:20 }}>
// //           Ensure your camera environment is well-lit for maximum skeletal accuracy.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // // ═════════════════════════════════════════════════════════════
// // //  PAGE 2 — RECORDING
// // // ═════════════════════════════════════════════════════════════
// // function RecordingPage({ sessionData, onFinish }) {
// //   const webcamRef   = useRef(null);
// //   const canvasRef   = useRef(null);
// //   const finishedRef = useRef(false);
// //   const [detector, setDetector] = useState(null);
// //   const [timeLeft, setTimeLeft] = useState(sessionData.duration);
// //   const [loading, setLoading]   = useState(false);

// //   // Load MoveNet
// //   useEffect(() => {
// //     if (!window.poseDetection) return;
// //     window.poseDetection.createDetector(
// //       window.poseDetection.SupportedModels.MoveNet,
// //       { modelType: window.poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING }
// //     ).then(setDetector);
// //   }, []);

// //   // Skeleton loop
// //   useEffect(() => {
// //     if (!detector) return;
// //     let af;
// //     const CONNECTIONS = [[0,1],[0,2],[1,3],[2,4],[5,7],[7,9],[6,8],[8,10],[5,6],[5,11],[6,12],[11,12],[11,13],[13,15],[12,14],[14,16]];
// //     const loop = async () => {
// //       const vid = webcamRef.current?.video;
// //       if (vid?.readyState === 4) {
// //         const canvas = canvasRef.current;
// //         const ctx = canvas.getContext("2d");
// //         canvas.width = vid.videoWidth; canvas.height = vid.videoHeight;
// //         const poses = await detector.estimatePoses(vid);
// //         ctx.clearRect(0, 0, canvas.width, canvas.height);
// //         if (poses[0]) {
// //           const kp = poses[0].keypoints;
// //           ctx.strokeStyle="#00f2ff"; ctx.lineWidth=4; ctx.shadowBlur=15; ctx.shadowColor="#00f2ff";
// //           CONNECTIONS.forEach(([a,b])=>{
// //             if(kp[a]?.score>0.5&&kp[b]?.score>0.5){ctx.beginPath();ctx.moveTo(kp[a].x,kp[a].y);ctx.lineTo(kp[b].x,kp[b].y);ctx.stroke();}
// //           });
// //           kp.forEach(p=>{
// //             if(p.score>0.5){ctx.beginPath();ctx.arc(p.x,p.y,5,0,2*Math.PI);ctx.fillStyle="#fff";ctx.shadowBlur=8;ctx.fill();}
// //           });
// //         }
// //       }
// //       af = requestAnimationFrame(loop);
// //     };
// //     loop();
// //     return ()=>cancelAnimationFrame(af);
// //   }, [detector]);

// //   // Countdown
// //   useEffect(()=>{
// //     if(timeLeft===0){handleFinish();return;}
// //     const t=setTimeout(()=>setTimeLeft(p=>p-1),1000);
// //     return()=>clearTimeout(t);
// //   },[timeLeft]);

// //   const handleFinish = async () => {
// //     if (finishedRef.current) return;
// //     finishedRef.current = true;
// //     setLoading(true);
// //     const snapshot = webcamRef.current?.getScreenshot();
// //     const result = await runAnalysis({ ...sessionData, angleStats:{}, rawKeypoints:[], snapshotImage:snapshot });
// //     onFinish(result);
// //   };

// //   const progress = ((sessionData.duration - timeLeft) / sessionData.duration) * 100;

// //   return (
// //     <div style={{ height:"100vh", width:"100%", backgroundColor:"#05070a", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", color:"#fff", overflow:"hidden", position:"relative", fontFamily:"'Inter',sans-serif" }}>
// //       <style>{`
// //         @keyframes blink{0%,100%{opacity:1}50%{opacity:0.2}}
// //         @keyframes scanline{0%{top:0%}100%{top:100%}}
// //         @keyframes spin{to{transform:rotate(360deg)}}
// //         .rec-dot{animation:blink 1s infinite}
// //         .scan{position:absolute;width:100%;height:2px;background:linear-gradient(to right,transparent,rgba(0,242,255,0.5),transparent);animation:scanline 4s linear infinite;z-index:5;pointer-events:none}
// //       `}</style>

// //       {/* Timer + progress */}
// //       <div style={{ position:"absolute", top:36, zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
// //         <div style={{ display:"flex", alignItems:"center", gap:12, background:"rgba(255,255,255,0.1)", backdropFilter:"blur(10px)", padding:"12px 24px", borderRadius:100, border:"1px solid rgba(255,255,255,0.2)", fontSize:20, fontWeight:700, letterSpacing:1, boxShadow:"0 10px 30px rgba(0,0,0,0.5)" }}>
// //           <div className="rec-dot" style={{ width:12, height:12, backgroundColor:"#ff4b4b", borderRadius:"50%" }} />
// //           <span>LIVE ANALYSIS: {timeLeft}s</span>
// //         </div>
// //         <div style={{ width:260, height:4, background:"rgba(255,255,255,0.1)", borderRadius:999, overflow:"hidden" }}>
// //           <div style={{ width:`${progress}%`, height:"100%", background:"#00f2ff", borderRadius:999, transition:"width 1s linear" }} />
// //         </div>
// //       </div>

// //       {/* Camera viewport */}
// //       <div style={{ position:"relative", width:"90vw", maxWidth:1000, aspectRatio:"16/9", borderRadius:32, overflow:"hidden", border:"1px solid rgba(255,255,255,0.15)", boxShadow:"0 0 100px rgba(0,242,255,0.15)" }}>
// //         <div className="scan" />

// //         {/* Corner accents */}
// //         {[{top:16,left:16,borderTop:"2px solid #00f2ff",borderLeft:"2px solid #00f2ff",borderRadius:"8px 0 0 0"},
// //           {top:16,right:16,borderTop:"2px solid #00f2ff",borderRight:"2px solid #00f2ff",borderRadius:"0 8px 0 0"},
// //           {bottom:16,left:16,borderBottom:"2px solid #00f2ff",borderLeft:"2px solid #00f2ff",borderRadius:"0 0 0 8px"},
// //           {bottom:16,right:16,borderBottom:"2px solid #00f2ff",borderRight:"2px solid #00f2ff",borderRadius:"0 0 8px 0"}
// //         ].map((s,i)=>(
// //           <div key={i} style={{ position:"absolute", width:28, height:28, opacity:0.75, zIndex:10, pointerEvents:"none", ...s }} />
// //         ))}

// //         {/* Info panel */}
// //         <div style={{ position:"absolute", bottom:28, left:28, zIndex:10, background:"rgba(0,0,0,0.5)", backdropFilter:"blur(10px)", borderRadius:12, padding:"12px 16px", fontSize:11, color:"#00f2ff", textTransform:"uppercase", letterSpacing:1, borderLeft:"3px solid #00f2ff", lineHeight:1.9 }}>
// //           <div>Status: Processing</div>
// //           <div>Mode: {sessionData.mode}</div>
// //           <div>Resolution: 1080p</div>
// //         </div>

// //         <Webcam ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={{ width:1280, height:720 }}
// //           style={{ width:"100%", height:"100%", objectFit:"cover", transform:"scaleX(-1)" }} />
// //         <canvas ref={canvasRef}
// //           style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", objectFit:"cover", transform:"scaleX(-1)", zIndex:2 }} />

// //         {/* Analyzing overlay */}
// //         {loading && (
// //           <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.78)", zIndex:20, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:18 }}>
// //             <div style={{ width:52, height:52, border:"4px solid rgba(0,242,255,0.2)", borderTop:"4px solid #00f2ff", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
// //             <p style={{ color:"#00f2ff", fontWeight:700, letterSpacing:2, fontSize:13, textTransform:"uppercase", margin:0 }}>Analyzing posture…</p>
// //           </div>
// //         )}
// //       </div>

// //       <p style={{ marginTop:28, color:"rgba(255,255,255,0.3)", fontSize:14 }}>
// //         Position yourself within the frame for optimal AI accuracy
// //       </p>
// //     </div>
// //   );
// // }

// // // ═════════════════════════════════════════════════════════════
// // //  PAGE 3 — RESULT
// // // ═════════════════════════════════════════════════════════════
// // function ResultPage({ analysis, onRestart }) {
// //   if (!analysis) return null;

// //   const risk = analysis.risk_level?.toUpperCase();
// //   const color = risk==="HIGH" ? "#ef4444" : risk==="MEDIUM" ? "#f59e0b" : "#10b981";
// //   const sessionId = useRef(Math.floor(Math.random()*10000)).current;

// //   const card = { background:"#fff", borderRadius:24, padding:32, boxShadow:"0 4px 6px -1px rgba(0,0,0,0.05),0 10px 15px -3px rgba(0,0,0,0.08)", marginBottom:24, border:"1px solid #e2e8f0" };
// //   const row  = { padding:"12px 16px", borderRadius:12, marginBottom:8, fontSize:14, display:"flex", alignItems:"flex-start", gap:8, border:"1px solid" };

// //   return (
// //     <div style={{ backgroundColor:"#f8fafc", minHeight:"100vh", padding:"40px 20px", fontFamily:"'Inter',-apple-system,sans-serif", color:"#1e293b" }}>
// //       <style>{`@keyframes up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.rpt{animation:up 0.5s ease forwards}`}</style>

// //       <div className="rpt" style={{ maxWidth:1000, margin:"0 auto" }}>

// //         {/* Header */}
// //         <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:30 }}>
// //           <div>
// //             <h1 style={{ margin:0, fontSize:28, fontWeight:800 }}>Analysis Report</h1>
// //             <p style={{ color:"#64748b", marginTop:4, fontSize:14 }}>Session ID: #{sessionId}</p>
// //           </div>
// //           <button onClick={onRestart}
// //             onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
// //             onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
// //             style={{ backgroundColor:"#0066FF", color:"white", padding:"14px 28px", borderRadius:14, border:"none", fontWeight:600, cursor:"pointer", boxShadow:"0 4px 12px rgba(0,102,255,0.25)", transition:"all 0.2s" }}>
// //             New Assessment
// //           </button>
// //         </div>

// //         {/* Score card */}
// //         <div style={{ ...card, display:"flex", alignItems:"center", flexWrap:"wrap", gap:24 }}>
// //           <div style={{ position:"relative", flexShrink:0 }}>
// //             <svg width="110" height="110" style={{ transform:"rotate(-90deg)" }}>
// //               <circle cx="55" cy="55" r="44" fill="none" stroke="#f1f5f9" strokeWidth="10"/>
// //               <circle cx="55" cy="55" r="44" fill="none" stroke={color} strokeWidth="10"
// //                 strokeDasharray={`${(analysis.overall_score/10)*276.5} 276.5`} strokeLinecap="round"/>
// //             </svg>
// //             <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
// //               <span style={{ fontSize:24, fontWeight:800 }}>{analysis.overall_score}</span>
// //               <span style={{ fontSize:11, color:"#94a3b8" }}>/10</span>
// //             </div>
// //           </div>
// //           <div style={{ flex:1, minWidth:250 }}>
// //             <span style={{ padding:"6px 16px", borderRadius:100, fontSize:11, fontWeight:700, letterSpacing:1, textTransform:"uppercase", backgroundColor:`${color}18`, color, display:"inline-block", marginBottom:10 }}>
// //               {analysis.risk_level} RISK
// //             </span>
// //             <h2 style={{ margin:"0 0 8px", fontSize:20 }}>{analysis.mode} Assessment</h2>
// //             <p style={{ margin:0, fontSize:14, color:"#64748b", lineHeight:1.65 }}>
// //               <strong style={{ color:"#475569" }}>Summary:</strong> {analysis.summary}
// //             </p>
// //           </div>
// //         </div>

// //         {/* Clinical + Mistakes grid */}
// //         <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:24 }}>
// //           <div style={card}>
// //             <h3 style={{ fontSize:13, marginTop:0, color:"#475569", textTransform:"uppercase", letterSpacing:1 }}>Clinical Observations</h3>
// //             <label style={{ fontSize:11, fontWeight:700, color:"#94a3b8", display:"block", marginBottom:4 }}>RISK REASON</label>
// //             <p style={{ margin:"0 0 16px", fontSize:15, color:"#334155" }}>{analysis.risk_reason||"—"}</p>
// //             <label style={{ fontSize:11, fontWeight:700, color:"#94a3b8", display:"block", marginBottom:4 }}>MOVEMENT PATTERN</label>
// //             <p style={{ margin:0, fontSize:15, color:"#334155" }}>{analysis.movement_pattern||"—"}</p>
// //           </div>

// //           {analysis.mistakes_detected?.length>0 && (
// //             <div style={{ ...card, borderLeft:`6px solid ${color}` }}>
// //               <h3 style={{ fontSize:16, marginTop:0 }}>⚠️ Detected Inconsistencies</h3>
// //               <ul style={{ listStyle:"none", padding:0, margin:0 }}>
// //                 {analysis.mistakes_detected.map((m,i)=>(
// //                   <li key={i} style={{ ...row, backgroundColor:"#f8fafc", borderColor:"#f1f5f9" }}>
// //                     <span style={{ color, fontWeight:700, flexShrink:0 }}>•</span>{m}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           )}
// //         </div>

// //         {/* Mode actions */}
// //         <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:24 }}>
// //           {analysis.mode==="Correction" && analysis.correction_points?.length>0 && (
// //             <div style={card}>
// //               <h3 style={{ fontSize:13, marginTop:0, color:"#0066FF", textTransform:"uppercase", letterSpacing:1 }}>Correction Protocol</h3>
// //               <ul style={{ listStyle:"none", padding:0, margin:0 }}>
// //                 {analysis.correction_points.map((p,i)=>(
// //                   <li key={i} style={{ ...row, backgroundColor:"#eff6ff", borderColor:"#dbeafe" }}>
// //                     <span style={{ color:"#0066FF", fontWeight:700, flexShrink:0 }}>✓</span>{p}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           )}
// //           {analysis.mode==="Guidance" && analysis.guidance_points?.length>0 && (
// //             <div style={card}>
// //               <h3 style={{ fontSize:13, marginTop:0, color:"#10b981", textTransform:"uppercase", letterSpacing:1 }}>Step-by-Step Guidance</h3>
// //               <ul style={{ listStyle:"none", padding:0, margin:0 }}>
// //                 {analysis.guidance_points.map((p,i)=>(
// //                   <li key={i} style={{ ...row, backgroundColor:"#f0fdf4", borderColor:"#d1fae5" }}>
// //                     <span style={{ color:"#10b981", fontWeight:700, flexShrink:0 }}>{i+1}.</span>{p}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           )}
// //         </div>

// //         {/* Reference images */}
// //         {analysis.reference_images?.length>0 && (
// //           <div style={{ marginTop:20 }}>
// //             <h3 style={{ fontSize:18, marginBottom:16, paddingLeft:8 }}>Anatomical References</h3>
// //             <div style={{ display:"flex", flexWrap:"wrap", gap:16 }}>
// //               {analysis.reference_images.map((img,i)=>(
// //                 <div key={i} style={{ borderRadius:20, overflow:"hidden", boxShadow:"0 4px 12px rgba(0,0,0,0.1)", border:"4px solid white" }}>
// //                   <img src={img.url} alt="Reference" style={{ width:180, height:260, objectFit:"cover", display:"block" }} />
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // // ═════════════════════════════════════════════════════════════
// // //  ROOT
// // // ═════════════════════════════════════════════════════════════
// // export default function App() {
// //   const [page, setPage]           = useState("setup");
// //   const [sessionData, setSessionData] = useState(null);
// //   const [analysis, setAnalysis]   = useState(null);

// //   return (
// //     <>
// //       {page==="setup"     && <SetupPage     onStart={(d)=>{setSessionData(d);setPage("recording");}} />}
// //       {page==="recording" && <RecordingPage sessionData={sessionData} onFinish={(r)=>{setAnalysis(r);setPage("result");}} />}
// //       {page==="result"    && <ResultPage    analysis={analysis} onRestart={()=>{setAnalysis(null);setPage("setup");}} />}
// //     </>
// //   );
// // }


// import React, { useState, useEffect, useRef } from "react";
// import Webcam from "react-webcam";

// // ─────────────────────────────────────────────────────────────
// //  🔑 API KEYS
// // ─────────────────────────────────────────────────────────────
// const GEMINI_API_KEY = "AIzaSyAqeLDtcot9XVzUPPWQQzWVy4jocmKxJtM";
// const PEXELS_API_KEY  = "yVNSo9fZ5vgwmvLdvfF5qr9TSKLnnjFN6LqiiZwuUIRW6yhWj8I8ha68";

// // ─────────────────────────────────────────────────────────────
// //  DESIGN SYSTEM — Elite Atelier
// // ─────────────────────────────────────────────────────────────
// const glass = {
//   background: "rgba(255,255,255,0.85)",
//   backdropFilter: "blur(16px)",
//   WebkitBackdropFilter: "blur(16px)",
//   border: "1px solid rgba(255,255,255,0.9)",
//   boxShadow: "0 4px 24px rgba(99,102,241,0.08), 0 1px 4px rgba(0,0,0,0.04)",
// };

// const GRAD = {
//   primary: "linear-gradient(135deg, #2563eb, #6366f1, #7c3aed)",
//   icon:    "linear-gradient(135deg, #6366f1, #8b5cf6)",
//   header:  "linear-gradient(135deg, rgba(99,102,241,0.04), rgba(139,92,246,0.04))",
// };

// const C = {
//   primary: "#6366f1", primaryDeep: "#2563eb", primaryPurple: "#7c3aed",
//   success: "#10b981", warning: "#f59e0b", danger: "#ef4444",
//   text: "#0f172a", textMid: "#64748b", textLight: "#94a3b8",
//   border: "#e0e7ff", borderSoft: "#e2e8f0", bgAccent: "#eef2ff",
// };

// const metaBadge = {
//   background: "rgba(238,242,255,0.6)", border: "1px solid #e0e7ff",
//   borderRadius: 12, padding: "12px 14px",
// };

// const sLabel = {
//   fontSize: 9, fontWeight: 700, letterSpacing: "0.14em",
//   textTransform: "uppercase", color: "#94a3b8", marginBottom: 5,
// };

// const sectionTitle = {
//   fontSize: 10, fontWeight: 700, letterSpacing: "0.2em",
//   textTransform: "uppercase", color: "#94a3b8", marginBottom: 16,
// };

// function Tag({ color = C.primary, bg = "rgba(99,102,241,0.08)", border = "1px solid rgba(99,102,241,0.2)", children }) {
//   return (
//     <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
//       padding: "2px 8px", borderRadius: 4, background: bg, color, border }}>
//       {children}
//     </span>
//   );
// }

// // ─────────────────────────────────────────────────────────────
// //  BIKE LOADER (Elite Atelier style)
// // ─────────────────────────────────────────────────────────────
// function BikeLoader({ label = "Analyzing…" }) {
//   return (
//     <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(15,23,42,0.75)",
//       backdropFilter: "blur(8px)", display: "flex", flexDirection: "column",
//       alignItems: "center", justifyContent: "center", gap: 24 }}>
//       <style>{`
//         @keyframes spin { to { transform: rotate(360deg); } }
//         @keyframes pulse-ring {
//           0% { transform: scale(0.85); opacity: 0.6; }
//           50% { transform: scale(1.1); opacity: 0.25; }
//           100% { transform: scale(0.85); opacity: 0.6; }
//         }
//         @keyframes dot-bounce {
//           0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-10px)}
//         }
//       `}</style>
//       <div style={{ position: "relative", width: 80, height: 80 }}>
//         <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
//           background: "rgba(99,102,241,0.15)", animation: "pulse-ring 2s ease-in-out infinite" }} />
//         <div style={{ position: "absolute", inset: 8, borderRadius: "50%",
//           border: "3px solid rgba(99,102,241,0.15)",
//           borderTop: "3px solid #6366f1",
//           animation: "spin 0.9s linear infinite" }} />
//         <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
//           justifyContent: "center", fontSize: 22 }}>🧠</div>
//       </div>
//       <div style={{ display: "flex", gap: 6 }}>
//         {[0,1,2].map(i => (
//           <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#6366f1",
//             animation: `dot-bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
//         ))}
//       </div>
//       <p style={{ color: "rgba(255,255,255,0.9)", fontWeight: 700, letterSpacing: "0.12em",
//         textTransform: "uppercase", fontSize: 13, fontFamily: "'Outfit', sans-serif", margin: 0 }}>
//         {label}
//       </p>
//       <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, margin: 0,
//         fontFamily: "'Outfit', sans-serif" }}>
//         AI Biomechanics Engine Running
//       </p>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────
// //  GEMINI — upgraded prompt
// // ─────────────────────────────────────────────────────────────
// async function analyzePostureAI(angleStats, rawKeypoints, snapshotImage, mode, description, exerciseType) {
//   const prompt = `
// You are a licensed physiotherapist, biomechanics researcher, and clinical movement analyst with 20+ years of experience.

// ═══════════════════════════════════════════════════
// SESSION PARAMETERS
// ═══════════════════════════════════════════════════
// Mode: ${mode}
// Exercise Type: ${exerciseType}
// User Description: ${description || "None provided"}

// ═══════════════════════════════════════════════════
// BIOMECHANICAL DATA
// ═══════════════════════════════════════════════════
// Angle Statistics:
// ${JSON.stringify(angleStats, null, 2)}

// Keypoint Sample (first 5):
// ${JSON.stringify((rawKeypoints || []).slice(0, 5), null, 2)}

// ═══════════════════════════════════════════════════
// REQUIRED ANALYSIS TASKS
// ═══════════════════════════════════════════════════

// 1. MOVEMENT IDENTIFICATION
//    - Identify the exact movement/exercise being performed.
//    - Classify the primary movement pattern (push/pull/hinge/squat/carry/rotation/isometric).
//    - Name the primary and secondary muscle groups engaged.

// 2. POSTURE QUALITY ASSESSMENT
//    - Score overall posture quality (0–10).
//    - Evaluate joint alignment at key joints (spine, hip, knee, shoulder, elbow, wrist as relevant).
//    - Assess symmetry between left and right sides.
//    - Evaluate core engagement and stability.

// 3. DEVIATION & COMPENSATION DETECTION
//    - List every postural deviation observed with precise anatomical language.
//    - Describe any compensation patterns (e.g., hip hike, forward head, valgus collapse).
//    - Note which deviations are minor vs. significant.

// 4. INJURY RISK STRATIFICATION
//    - Assign risk level: LOW / MEDIUM / HIGH.
//    - Provide detailed clinical reasoning for the risk level.
//    - Identify the 1–2 joints or structures most at risk if deviations continue.

// 5. BIOMECHANICAL METRICS
//    - Estimate key angle ranges (e.g., knee flexion angle, hip hinge angle, elbow angle).
//    - Note if any ranges fall outside safe thresholds.
//    - Describe load distribution (anterior/posterior, bilateral balance).

// 6. ${mode === "Correction" ? "CORRECTIVE PROTOCOL" : "LEARNING GUIDANCE PROTOCOL"}
//    ${mode === "Correction"
//      ? "- Provide 5–7 specific, actionable corrective cues to fix the detected errors.\n   - Order cues from most critical to least critical.\n   - Include proprioceptive and tactile cues where relevant."
//      : "- Provide 5–7 step-by-step instructions for learning correct form from scratch.\n   - Include setup, execution, and finish position cues.\n   - Add breathing pattern guidance."}

// 7. CLINICAL SUMMARY
//    - Write a detailed paragraph (minimum 6 sentences) summarizing findings.
//    - Include what was done well, what needs improvement, and the clinical priority.

// 8. REFERENCE IMAGE KEYWORDS
//    - Generate 4 highly specific Pexels image search queries based on the EXACT movement pattern identified.
//    - Each query should be: "[exercise name] correct form [body part] physiotherapy" or "[muscle group] exercise technique physical therapy".
//    - Example for Bicep Curl: "bicep curl correct elbow position physiotherapy", "dumbbell curl arm exercise technique".
//    - These MUST match the actual movement detected, not generic posture terms.

// ═══════════════════════════════════════════════════
// SCORING GUIDE
// ═══════════════════════════════════════════════════
// 0–3  = High risk / poor form (multiple significant deviations)
// 4–6  = Moderate — notable errors requiring attention
// 7–8  = Good — minor corrections needed
// 9–10 = Excellent — near-perfect biomechanical form

// ═══════════════════════════════════════════════════
// OUTPUT RULES
// ═══════════════════════════════════════════════════
// - Return ONLY raw JSON, no markdown, no backticks, no explanation.
// - All array values must be non-empty strings.
// - summary must be minimum 6 sentences.

// {
//   "overall_score": <0-10 number>,
//   "risk_level": "LOW" | "MEDIUM" | "HIGH",
//   "risk_reason": "<detailed clinical risk explanation>",
//   "movement_pattern": "<exact exercise name, e.g. Bicep Curl (Dumbbell)>",
//   "movement_classification": "<push/pull/hinge/squat/rotation/isometric>",
//   "primary_muscles": ["<muscle1>", "<muscle2>"],
//   "secondary_muscles": ["<muscle1>", "<muscle2>"],
//   "joint_alignment": {
//     "spine": "<assessment>",
//     "hip": "<assessment>",
//     "shoulder": "<assessment>",
//     "elbow": "<assessment or N/A>",
//     "knee": "<assessment or N/A>"
//   },
//   "symmetry_score": <0-10>,
//   "core_engagement": "LOW" | "MODERATE" | "HIGH",
//   "angle_estimates": [
//     { "joint": "<joint name>", "estimated_angle": "<e.g. 85°>", "optimal_range": "<e.g. 75–95°>", "status": "OPTIMAL" | "DEVIATION" }
//   ],
//   "deviations": [
//     { "deviation": "<name>", "severity": "MINOR" | "SIGNIFICANT", "description": "<detail>" }
//   ],
//   "mistakes_detected": ["<mistake1>", "<mistake2>"],
//   "improvement_points": ["<point1>", "<point2>", "<point3>", "<point4>", "<point5>"],
//   "load_distribution": "<description of load balance>",
//   "at_risk_structures": ["<structure1>", "<structure2>"],
//   "summary": "<detailed 6-sentence clinical summary>",
//   "correction_keywords": ["<specific pexels query 1>", "<specific pexels query 2>", "<specific pexels query 3>", "<specific pexels query 4>"]
// }`;

//   const parts = [{ text: prompt }];
//   if (snapshotImage?.startsWith("data:image")) {
//     parts.push({ inline_data: { mime_type: "image/jpeg", data: snapshotImage.split(",")[1] } });
//   }

//   const res = await fetch(
//     `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ contents: [{ role: "user", parts }] }),
//     }
//   );
//   if (!res.ok) throw new Error(`Gemini HTTP ${res.status}`);
//   const data = await res.json();
//   const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
//   const match = text.match(/\{[\s\S]*\}/);
//   if (!match) throw new Error("No JSON in Gemini response");
//   const p = JSON.parse(match[0]);

//   const score = Math.max(0, Math.min(10, Number(p.overall_score) || 5));
//   const risk  = ["LOW","MEDIUM","HIGH"].includes(p.risk_level?.toUpperCase()) ? p.risk_level.toUpperCase() : "LOW";

//   return {
//     overall_score:          score,
//     risk_level:             risk,
//     risk_reason:            p.risk_reason           || "",
//     movement_pattern:       p.movement_pattern      || "Unknown Movement",
//     movement_classification:p.movement_classification || "",
//     primary_muscles:        Array.isArray(p.primary_muscles)   ? p.primary_muscles   : [],
//     secondary_muscles:      Array.isArray(p.secondary_muscles) ? p.secondary_muscles : [],
//     joint_alignment:        p.joint_alignment       || {},
//     symmetry_score:         Number(p.symmetry_score) || 5,
//     core_engagement:        p.core_engagement       || "MODERATE",
//     angle_estimates:        Array.isArray(p.angle_estimates)   ? p.angle_estimates   : [],
//     deviations:             Array.isArray(p.deviations)        ? p.deviations        : [],
//     mistakes_detected:      Array.isArray(p.mistakes_detected) ? p.mistakes_detected : [],
//     improvement_points:     Array.isArray(p.improvement_points)? p.improvement_points: [],
//     load_distribution:      p.load_distribution     || "",
//     at_risk_structures:     Array.isArray(p.at_risk_structures)? p.at_risk_structures: [],
//     summary:                p.summary               || "Analysis complete.",
//     correction_keywords:    Array.isArray(p.correction_keywords) ? p.correction_keywords : [],
//   };
// }

// // ─────────────────────────────────────────────────────────────
// //  PEXELS — uses AI-generated keywords from actual movement
// // ─────────────────────────────────────────────────────────────
// async function fetchReferenceImages(keywords, movementPattern) {
//   // Build queries from AI-detected movement pattern + keywords
//   const queries = [];

//   // If we have a movement pattern, build direct queries first
//   if (movementPattern && movementPattern !== "Unknown Movement") {
//     const movement = movementPattern.replace(/\(.*\)/, "").trim().toLowerCase();
//     queries.push(
//       `${movement} exercise correct form`,
//       `${movement} technique fitness gym`,
//     );
//   }

//   // Add AI-generated keywords
//   if (Array.isArray(keywords) && keywords.length > 0) {
//     queries.push(...keywords);
//   }

//   // Fallback
//   if (queries.length === 0) {
//     queries.push("exercise correct form physiotherapy", "strength training technique gym");
//   }

//   const images = [], used = new Set();

//   for (const term of queries.slice(0, 5)) {
//     if (images.length >= 4) break;
//     try {
//       const res = await fetch(
//         `https://api.pexels.com/v1/search?query=${encodeURIComponent(term)}&per_page=4&orientation=portrait&size=large`,
//         { headers: { Authorization: PEXELS_API_KEY } }
//       );
//       const d = await res.json();
//       for (const photo of d.photos || []) {
//         if (images.length >= 4) break;
//         const url = photo.src.large2x || photo.src.large || photo.src.medium;
//         if (!used.has(url)) {
//           used.add(url);
//           images.push({ url, photographer: photo.photographer, width: 400, height: 600 });
//         }
//       }
//     } catch (_) {}
//   }
//   return images;
// }

// // ─────────────────────────────────────────────────────────────
// //  ORCHESTRATOR
// // ─────────────────────────────────────────────────────────────
// async function runAnalysis({ mode, duration, description, exerciseType, angleStats, rawKeypoints, snapshotImage }) {
//   try {
//     const ai = await analyzePostureAI(angleStats, rawKeypoints, snapshotImage, mode, description, exerciseType);
//     const referenceImages = await fetchReferenceImages(ai.correction_keywords, ai.movement_pattern);
//     return {
//       mode, duration, exerciseType,
//       ...ai,
//       reference_images: referenceImages,
//     };
//   } catch (err) {
//     console.error("Analysis error:", err);
//     return {
//       mode, duration, exerciseType,
//       overall_score: 5, risk_level: "LOW",
//       risk_reason: "AI temporarily unavailable — verify API keys.",
//       movement_pattern: "Unknown", movement_classification: "",
//       primary_muscles: [], secondary_muscles: [],
//       joint_alignment: {}, symmetry_score: 5, core_engagement: "MODERATE",
//       angle_estimates: [], deviations: [],
//       mistakes_detected: [], improvement_points: [],
//       load_distribution: "", at_risk_structures: [],
//       summary: "A temporary issue occurred. Please verify your GEMINI_API_KEY and PEXELS_API_KEY.",
//       reference_images: [],
//     };
//   }
// }

// // ═════════════════════════════════════════════════════════════
// //  PAGE 1 — SETUP (Elite Atelier styled)
// // ═════════════════════════════════════════════════════════════
// function SetupPage({ onStart }) {
//   const [mode, setMode]               = useState("Correction");
//   const [duration, setDuration]       = useState(30);
//   const [description, setDescription] = useState("");
//   const [exerciseType, setExerciseType] = useState("Auto-detect");

//   const durationOptions = mode === "Guidance" ? [5, 10, 15] : [30, 60, 120, 180, 240, 300];

//   const fieldStyle = {
//     width: "100%", padding: "12px 14px", borderRadius: 10,
//     border: "1.5px solid #e0e7ff", fontSize: 13, color: "#0f172a",
//     outline: "none", background: "rgba(238,242,255,0.3)",
//     fontFamily: "'Outfit', sans-serif", boxSizing: "border-box",
//     transition: "border-color 0.2s",
//   };

//   return (
//     <div style={{ minHeight: "100vh", position: "relative", fontFamily: "'Outfit', sans-serif", overflow: "hidden" }}>
//       {/* Blobs */}
//       <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
//         <div style={{ position:"absolute", top:"-8rem", right:"-8rem", width:"26rem", height:"26rem", borderRadius:"50%", background:"#93c5fd", mixBlendMode:"multiply", filter:"blur(72px)", opacity:0.35 }} />
//         <div style={{ position:"absolute", bottom:"-8rem", left:"-8rem", width:"26rem", height:"26rem", borderRadius:"50%", background:"#c4b5fd", mixBlendMode:"multiply", filter:"blur(72px)", opacity:0.35 }} />
//         <div style={{ position:"absolute", top:"40%", left:"40%", width:"20rem", height:"20rem", borderRadius:"50%", background:"#a5b4fc", mixBlendMode:"multiply", filter:"blur(60px)", opacity:0.25, transform:"translate(-50%,-50%)" }} />
//       </div>

//       <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
//         <div style={{ width: "100%", maxWidth: 560 }}>

//           {/* Header card */}
//           <div style={{ ...glass, borderRadius: 24, padding: "36px 40px 28px", borderTop: "2px solid #6366f1", marginBottom: 24 }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
//               <div style={{ width: 48, height: 48, borderRadius: 14, background: GRAD.icon,
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 fontSize: 22, boxShadow: "0 4px 16px rgba(99,102,241,0.35)" }}>🧘</div>
//               <div>
//                 <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6366f1", marginBottom: 4 }}>
//                   AI Biomechanics Engine
//                 </p>
//                 <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.1 }}>
//                   Configure Analysis
//                 </h1>
//               </div>
//             </div>
//             <div style={{ display: "inline-flex", alignItems: "center", gap: 10,
//               background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)",
//               borderRadius: 10, padding: "8px 16px" }}>
//               <span style={{ fontSize: 13 }}>🔬</span>
//               <span style={{ fontSize: 10, fontWeight: 700, color: "#6366f1", letterSpacing: "0.1em", textTransform: "uppercase" }}>
//                 Evidence-Informed Posture Analysis
//               </span>
//               <span style={{ fontSize: 10, color: "#64748b" }}>• ACSM & NSCA aligned</span>
//             </div>
//           </div>

//           {/* Form card */}
//           <div style={{ ...glass, borderRadius: 24, padding: "32px 40px 36px" }}>

//             {/* Mode */}
//             <p style={sLabel}>Analysis Mode *</p>
//             <div style={{ display: "flex", gap: 10, marginBottom: 24, background: "rgba(238,242,255,0.5)", padding: 6, borderRadius: 14, border: "1px solid #e0e7ff" }}>
//               {["Correction", "Guidance"].map((m) => (
//                 <button key={m} onClick={() => { setMode(m); setDuration(m === "Guidance" ? 5 : 30); }}
//                   style={{ flex: 1, padding: "11px 0", borderRadius: 10, border: "none", cursor: "pointer",
//                     fontWeight: 700, fontSize: 13, fontFamily: "'Outfit', sans-serif", transition: "all 0.2s",
//                     background: mode === m ? GRAD.primary : "transparent",
//                     color: mode === m ? "#fff" : "#6366f1",
//                     boxShadow: mode === m ? "0 4px 14px rgba(99,102,241,0.3)" : "none" }}>
//                   {m}
//                 </button>
//               ))}
//             </div>

//             {/* Exercise + Duration */}
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }}>
//               <div>
//                 <p style={sLabel}>Exercise Type</p>
//                 <select value={exerciseType} onChange={(e) => setExerciseType(e.target.value)} style={fieldStyle}>
//                   {["Auto-detect","Wrist Flexion","Shoulder Raise","Bicep Curl","Squat","Deadlift","Plank","Push-up","Lunge"].map(o => <option key={o}>{o}</option>)}
//                 </select>
//               </div>
//               <div>
//                 <p style={sLabel}>Duration *</p>
//                 <select value={duration} onChange={(e) => setDuration(Number(e.target.value))} style={fieldStyle}>
//                   {durationOptions.map(d => <option key={d} value={d}>{d >= 60 ? `${d / 60} min` : `${d} sec`}</option>)}
//                 </select>
//               </div>
//             </div>

//             {/* Description */}
//             <p style={sLabel}>Clinical Description (optional)</p>
//             <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
//               placeholder="e.g. Chronic lumbar stiffness, previous shoulder injury…"
//               style={{ ...fieldStyle, marginBottom: 28 }} />

//             {/* Info grid */}
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 28 }}>
//               {[["Model", "Gemini 2.5 Flash"], ["Keypoints", "17-point MoveNet"], ["Output", "Clinical JSON"]].map(([l, v]) => (
//                 <div key={l} style={metaBadge}>
//                   <p style={sLabel}>{l}</p>
//                   <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0f172a" }}>{v}</p>
//                 </div>
//               ))}
//             </div>

//             {/* CTA */}
//             <button onClick={() => onStart({ mode, duration, description, exerciseType })}
//               style={{ width: "100%", padding: "15px 0", borderRadius: 14, border: "none",
//                 background: GRAD.primary, color: "white", fontSize: 13, fontWeight: 700,
//                 cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
//                 gap: 10, boxShadow: "0 4px 18px rgba(99,102,241,0.35)", fontFamily: "'Outfit', sans-serif",
//                 letterSpacing: "0.06em", textTransform: "uppercase", transition: "all 0.2s" }}>
//               🎥 Start AI Recording
//             </button>

//             <p style={{ textAlign: "center", fontSize: 11, color: "#94a3b8", marginTop: 16 }}>
//               Ensure well-lit environment for maximum skeletal accuracy
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ═════════════════════════════════════════════════════════════
// //  PAGE 2 — RECORDING
// // ═════════════════════════════════════════════════════════════
// function RecordingPage({ sessionData, onFinish }) {
//   const webcamRef   = useRef(null);
//   const canvasRef   = useRef(null);
//   const finishedRef = useRef(false);
//   const [detector, setDetector] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(sessionData.duration);
//   const [analyzing, setAnalyzing] = useState(false);

//   useEffect(() => {
//     if (!window.poseDetection) return;
//     window.poseDetection.createDetector(
//       window.poseDetection.SupportedModels.MoveNet,
//       { modelType: window.poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING }
//     ).then(setDetector);
//   }, []);

//   useEffect(() => {
//     if (!detector) return;
//     let af;
//     const CONNECTIONS = [[0,1],[0,2],[1,3],[2,4],[5,7],[7,9],[6,8],[8,10],[5,6],[5,11],[6,12],[11,12],[11,13],[13,15],[12,14],[14,16]];
//     const loop = async () => {
//       const vid = webcamRef.current?.video;
//       if (vid?.readyState === 4) {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");
//         canvas.width = vid.videoWidth; canvas.height = vid.videoHeight;
//         const poses = await detector.estimatePoses(vid);
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         if (poses[0]) {
//           const kp = poses[0].keypoints;
//           ctx.strokeStyle = "#6366f1"; ctx.lineWidth = 3;
//           ctx.shadowBlur = 12; ctx.shadowColor = "#6366f1";
//           CONNECTIONS.forEach(([a, b]) => {
//             if (kp[a]?.score > 0.5 && kp[b]?.score > 0.5) {
//               ctx.beginPath(); ctx.moveTo(kp[a].x, kp[a].y); ctx.lineTo(kp[b].x, kp[b].y); ctx.stroke();
//             }
//           });
//           kp.forEach(p => {
//             if (p.score > 0.5) {
//               ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
//               ctx.fillStyle = "#fff"; ctx.shadowBlur = 8; ctx.fill();
//             }
//           });
//         }
//       }
//       af = requestAnimationFrame(loop);
//     };
//     loop();
//     return () => cancelAnimationFrame(af);
//   }, [detector]);

//   useEffect(() => {
//     if (timeLeft === 0) { handleFinish(); return; }
//     const t = setTimeout(() => setTimeLeft(p => p - 1), 1000);
//     return () => clearTimeout(t);
//   }, [timeLeft]);

//   const handleFinish = async () => {
//     if (finishedRef.current) return;
//     finishedRef.current = true;
//     setAnalyzing(true);
//     const snapshot = webcamRef.current?.getScreenshot();
//     const result = await runAnalysis({ ...sessionData, angleStats: {}, rawKeypoints: [], snapshotImage: snapshot });
//     onFinish(result);
//   };

//   const progress = ((sessionData.duration - timeLeft) / sessionData.duration) * 100;

//   return (
//     <div style={{ height: "100vh", width: "100%", backgroundColor: "#05070a", display: "flex",
//       flexDirection: "column", alignItems: "center", justifyContent: "center",
//       color: "#fff", overflow: "hidden", position: "relative", fontFamily: "'Outfit', sans-serif" }}>
//       <style>{`
//         @keyframes blink{0%,100%{opacity:1}50%{opacity:0.2}}
//         @keyframes scanline{0%{top:0%}100%{top:100%}}
//         .rec-dot{animation:blink 1s infinite}
//         .scan{position:absolute;width:100%;height:2px;background:linear-gradient(to right,transparent,rgba(99,102,241,0.6),transparent);animation:scanline 4s linear infinite;z-index:5;pointer-events:none}
//       `}</style>

//       {analyzing && <BikeLoader label="Processing Biomechanics…" />}

//       {/* Timer */}
//       <div style={{ position: "absolute", top: 32, zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(99,102,241,0.15)",
//           backdropFilter: "blur(10px)", padding: "12px 28px", borderRadius: 100,
//           border: "1px solid rgba(99,102,241,0.3)", fontSize: 18, fontWeight: 700, letterSpacing: 1,
//           boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
//           <div className="rec-dot" style={{ width: 10, height: 10, backgroundColor: "#ef4444", borderRadius: "50%" }} />
//           LIVE ANALYSIS — {timeLeft}s
//         </div>
//         <div style={{ width: 280, height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 999, overflow: "hidden" }}>
//           <div style={{ width: `${progress}%`, height: "100%", background: GRAD.primary, borderRadius: 999, transition: "width 1s linear" }} />
//         </div>
//         <div style={{ display: "flex", gap: 16, fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
//           <span>Mode: {sessionData.mode}</span>
//           <span>•</span>
//           <span>{sessionData.exerciseType}</span>
//         </div>
//       </div>

//       {/* Viewport */}
//       <div style={{ position: "relative", width: "90vw", maxWidth: 1000, aspectRatio: "16/9",
//         borderRadius: 28, overflow: "hidden", border: "1px solid rgba(99,102,241,0.25)",
//         boxShadow: "0 0 80px rgba(99,102,241,0.2)" }}>
//         <div className="scan" />

//         {/* Corner accents */}
//         {[
//           { top:16, left:16, borderTop:"2px solid #6366f1", borderLeft:"2px solid #6366f1", borderRadius:"8px 0 0 0" },
//           { top:16, right:16, borderTop:"2px solid #6366f1", borderRight:"2px solid #6366f1", borderRadius:"0 8px 0 0" },
//           { bottom:16, left:16, borderBottom:"2px solid #6366f1", borderLeft:"2px solid #6366f1", borderRadius:"0 0 0 8px" },
//           { bottom:16, right:16, borderBottom:"2px solid #6366f1", borderRight:"2px solid #6366f1", borderRadius:"0 0 8px 0" },
//         ].map((s, i) => (
//           <div key={i} style={{ position: "absolute", width: 28, height: 28, opacity: 0.8, zIndex: 10, pointerEvents: "none", ...s }} />
//         ))}

//         {/* Status overlay */}
//         <div style={{ position: "absolute", bottom: 24, left: 24, zIndex: 10,
//           background: "rgba(15,23,42,0.7)", backdropFilter: "blur(10px)",
//           borderRadius: 12, padding: "12px 16px", fontSize: 10, color: "#6366f1",
//           textTransform: "uppercase", letterSpacing: "0.12em", borderLeft: "3px solid #6366f1", lineHeight: 2 }}>
//           <div>Status: Capturing</div>
//           <div>Mode: {sessionData.mode}</div>
//           <div>Engine: MoveNet Lightning</div>
//         </div>

//         <Webcam ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={{ width: 1280, height: 720 }}
//           style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)" }} />
//         <canvas ref={canvasRef}
//           style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
//             objectFit: "cover", transform: "scaleX(-1)", zIndex: 2 }} />
//       </div>

//       <p style={{ marginTop: 24, color: "rgba(255,255,255,0.25)", fontSize: 13, letterSpacing: "0.06em" }}>
//         Position yourself clearly in frame for optimal keypoint detection
//       </p>

//       <button onClick={handleFinish} disabled={analyzing}
//         style={{ marginTop: 16, padding: "10px 28px", borderRadius: 10, border: "1.5px solid rgba(99,102,241,0.35)",
//           background: "rgba(99,102,241,0.1)", color: "#a5b4fc", fontSize: 11, fontWeight: 700,
//           cursor: analyzing ? "not-allowed" : "pointer", letterSpacing: "0.1em", textTransform: "uppercase",
//           fontFamily: "'Outfit', sans-serif" }}>
//         Finish Early
//       </button>
//     </div>
//   );
// }

// // ═════════════════════════════════════════════════════════════
// //  PAGE 3 — RESULT (Full Elite Atelier Design)
// // ═════════════════════════════════════════════════════════════
// function ResultPage({ analysis, onRestart }) {
//   if (!analysis) return null;

//   const risk = analysis.risk_level?.toUpperCase();
//   const riskColor = risk === "HIGH" ? C.danger : risk === "MEDIUM" ? C.warning : C.success;
//   const riskBg    = risk === "HIGH" ? "rgba(239,68,68,0.08)" : risk === "MEDIUM" ? "rgba(245,158,11,0.08)" : "rgba(16,185,129,0.08)";
//   const riskBorder= risk === "HIGH" ? "rgba(239,68,68,0.2)"  : risk === "MEDIUM" ? "rgba(245,158,11,0.2)"  : "rgba(16,185,129,0.2)";

//   const scoreColor = analysis.overall_score >= 8 ? C.success : analysis.overall_score >= 5 ? C.warning : C.danger;
//   const circumference = 2 * Math.PI * 44;
//   const dashArray = `${(analysis.overall_score / 10) * circumference} ${circumference}`;

//   const sessionId = useRef(Math.floor(Math.random() * 90000) + 10000).current;

//   const coreColor = analysis.core_engagement === "HIGH" ? C.success : analysis.core_engagement === "MODERATE" ? C.warning : C.danger;

//   return (
//     <div style={{ minHeight: "100vh", position: "relative", fontFamily: "'Outfit', sans-serif" }}>
//       <style>{`
//         @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
//         .fu { animation: fadeUp 0.5s ease forwards; }
//         .fu1 { animation: fadeUp 0.5s 0.1s ease both; }
//         .fu2 { animation: fadeUp 0.5s 0.2s ease both; }
//         .fu3 { animation: fadeUp 0.5s 0.3s ease both; }
//         .fu4 { animation: fadeUp 0.5s 0.4s ease both; }
//         .fu5 { animation: fadeUp 0.5s 0.5s ease both; }
//       `}</style>

//       {/* Blobs */}
//       <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
//         <div style={{ position:"absolute", top:"-8rem", right:"-8rem", width:"26rem", height:"26rem", borderRadius:"50%", background:"#93c5fd", mixBlendMode:"multiply", filter:"blur(72px)", opacity:0.3 }} />
//         <div style={{ position:"absolute", bottom:"-8rem", left:"-8rem", width:"26rem", height:"26rem", borderRadius:"50%", background:"#c4b5fd", mixBlendMode:"multiply", filter:"blur(72px)", opacity:0.3 }} />
//       </div>

//       <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "52px 48px 96px", display: "flex", flexDirection: "column", gap: 32 }}>

//         {/* ── HEADER ── */}
//         <div className="fu" style={{ ...glass, borderRadius: 24, padding: 36, borderTop: "2px solid #6366f1" }}>
//           <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
//             <div>
//               <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6366f1", marginBottom: 8 }}>
//                 Biomechanics Report
//               </p>
//               <h1 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 800, color: "#0f172a", lineHeight: 1.1, marginBottom: 8 }}>
//                 AI Posture Analysis
//               </h1>
//               <p style={{ fontSize: 12, color: "#94a3b8" }}>Session ID: #{sessionId} &nbsp;·&nbsp; Mode: {analysis.mode} &nbsp;·&nbsp; Duration: {analysis.duration}s</p>
//               <div style={{ display: "inline-flex", alignItems: "center", gap: 10,
//                 background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)",
//                 borderRadius: 10, padding: "8px 16px", marginTop: 14 }}>
//                 <span style={{ fontSize: 13 }}>🔬</span>
//                 <span style={{ fontSize: 10, fontWeight: 700, color: "#6366f1", letterSpacing: "0.1em", textTransform: "uppercase" }}>
//                   Evidence-Informed Analysis
//                 </span>
//                 <span style={{ fontSize: 10, color: "#64748b" }}>• Gemini 2.5 Flash + MoveNet</span>
//               </div>
//             </div>
//             <button onClick={onRestart}
//               style={{ padding: "12px 28px", borderRadius: 12, border: "none",
//                 background: GRAD.primary, color: "white", fontSize: 11, fontWeight: 700,
//                 cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
//                 boxShadow: "0 4px 16px rgba(99,102,241,0.3)", fontFamily: "'Outfit', sans-serif",
//                 letterSpacing: "0.08em", textTransform: "uppercase" }}>
//               ↩ New Assessment
//             </button>
//           </div>
//         </div>

//         {/* ── ROW 1: Score + Movement + Risk ── */}
//         <div className="fu1" style={{ display: "grid", gridTemplateColumns: "280px 1fr 1fr", gap: 20 }}>

//           {/* Score gauge */}
//           <div style={{ ...glass, borderRadius: 20, padding: 28, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
//             <p style={sLabel}>Overall Score</p>
//             <div style={{ position: "relative" }}>
//               <svg width="130" height="130" style={{ transform: "rotate(-90deg)" }}>
//                 <circle cx="65" cy="65" r="44" fill="none" stroke="#e0e7ff" strokeWidth="10" />
//                 <circle cx="65" cy="65" r="44" fill="none" stroke={scoreColor} strokeWidth="10"
//                   strokeDasharray={dashArray} strokeLinecap="round" />
//               </svg>
//               <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
//                 <span style={{ fontSize: 30, fontWeight: 800, color: "#0f172a" }}>{analysis.overall_score}</span>
//                 <span style={{ fontSize: 11, color: "#94a3b8" }}>/10</span>
//               </div>
//             </div>
//             <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
//               <Tag color={riskColor} bg={riskBg} border={`1px solid ${riskBorder}`}>{risk} RISK</Tag>
//               {analysis.movement_classification && (
//                 <Tag color="#6366f1" bg="rgba(99,102,241,0.08)" border="1px solid rgba(99,102,241,0.2)">{analysis.movement_classification}</Tag>
//               )}
//             </div>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, width: "100%", marginTop: 4 }}>
//               <div style={{ ...metaBadge, textAlign: "center" }}>
//                 <p style={sLabel}>Symmetry</p>
//                 <p style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a" }}>{analysis.symmetry_score}/10</p>
//               </div>
//               <div style={{ ...metaBadge, textAlign: "center" }}>
//                 <p style={sLabel}>Core</p>
//                 <p style={{ fontSize: "0.85rem", fontWeight: 700, color: coreColor }}>{analysis.core_engagement}</p>
//               </div>
//             </div>
//           </div>

//           {/* Movement pattern */}
//           <div style={{ ...glass, borderRadius: 20, padding: 28 }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20,
//               padding: "14px 20px", background: GRAD.header,
//               borderBottom: "1px solid rgba(99,102,241,0.1)", margin: "-28px -28px 20px", borderRadius: "20px 20px 0 0" }}>
//               <div style={{ width: 32, height: 32, borderRadius: 10, background: GRAD.icon,
//                 display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14,
//                 boxShadow: "0 2px 8px rgba(99,102,241,0.3)" }}>🏋️</div>
//               <div>
//                 <p style={{ fontSize: 11, fontWeight: 700, color: "#0f172a" }}>Movement Identification</p>
//                 <p style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>Detected by AI vision analysis</p>
//               </div>
//             </div>
//             <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", marginBottom: 6 }}>{analysis.movement_pattern}</h2>
//             <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 16 }}>Primary Muscles</p>
//             <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
//               {(analysis.primary_muscles || []).map((m, i) => (
//                 <Tag key={i} color="#6366f1" bg="rgba(99,102,241,0.08)" border="1px solid rgba(99,102,241,0.2)">{m}</Tag>
//               ))}
//             </div>
//             <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 10 }}>Secondary Muscles</p>
//             <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
//               {(analysis.secondary_muscles || []).map((m, i) => (
//                 <Tag key={i} color="#64748b" bg="rgba(148,163,184,0.08)" border="1px solid rgba(148,163,184,0.2)">{m}</Tag>
//               ))}
//             </div>
//             {analysis.load_distribution && (
//               <div style={{ marginTop: 16, background: "rgba(238,242,255,0.5)", border: "1px solid #e0e7ff", borderRadius: 10, padding: "10px 14px" }}>
//                 <p style={sLabel}>Load Distribution</p>
//                 <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>{analysis.load_distribution}</p>
//               </div>
//             )}
//           </div>

//           {/* Risk details */}
//           <div style={{ ...glass, borderRadius: 20, padding: 28 }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20,
//               padding: "14px 20px", background: `${riskBg}`,
//               borderBottom: `1px solid ${riskBorder}`, margin: "-28px -28px 20px", borderRadius: "20px 20px 0 0" }}>
//               <div style={{ width: 32, height: 32, borderRadius: 10,
//                 background: `linear-gradient(135deg, ${riskColor}, ${riskColor}aa)`,
//                 display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14 }}>⚠️</div>
//               <div>
//                 <p style={{ fontSize: 11, fontWeight: 700, color: "#0f172a" }}>Risk Stratification</p>
//                 <p style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>Clinical injury risk assessment</p>
//               </div>
//               <div style={{ marginLeft: "auto", background: riskBg, border: `1px solid ${riskBorder}`,
//                 borderRadius: 6, padding: "3px 10px" }}>
//                 <span style={{ fontSize: 9, fontWeight: 700, color: riskColor, letterSpacing: "0.1em", textTransform: "uppercase" }}>{risk}</span>
//               </div>
//             </div>
//             <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>{analysis.risk_reason}</p>
//             {analysis.at_risk_structures?.length > 0 && (
//               <>
//                 <p style={{ ...sLabel, marginBottom: 10 }}>At-Risk Structures</p>
//                 {analysis.at_risk_structures.map((s, i) => (
//                   <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6,
//                     background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.12)",
//                     borderRadius: 8, padding: "8px 12px" }}>
//                     <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.danger, flexShrink: 0 }} />
//                     <span style={{ fontSize: 12, color: "#64748b" }}>{s}</span>
//                   </div>
//                 ))}
//               </>
//             )}
//           </div>
//         </div>

//         {/* ── ROW 2: Joint Alignment + Angle Estimates ── */}
//         {(Object.keys(analysis.joint_alignment || {}).length > 0 || analysis.angle_estimates?.length > 0) && (
//           <div className="fu2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

//             {/* Joint alignment */}
//             {Object.keys(analysis.joint_alignment || {}).length > 0 && (
//               <div style={{ ...glass, borderRadius: 20, overflow: "hidden" }}>
//                 <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(226,232,240,0.8)", background: GRAD.header, display: "flex", alignItems: "center", gap: 12 }}>
//                   <div style={{ width: 32, height: 32, borderRadius: 10, background: GRAD.icon, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14, boxShadow: "0 2px 8px rgba(99,102,241,0.3)" }}>🦴</div>
//                   <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>Joint Alignment Analysis</h2>
//                 </div>
//                 <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 10 }}>
//                   {Object.entries(analysis.joint_alignment).filter(([, v]) => v && v !== "N/A").map(([joint, assessment]) => (
//                     <div key={joint} style={{ background: "rgba(238,242,255,0.4)", border: "1px solid #e0e7ff", borderRadius: 10, padding: "12px 16px" }}>
//                       <p style={sLabel}>{joint}</p>
//                       <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>{assessment}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Angle estimates */}
//             {analysis.angle_estimates?.length > 0 && (
//               <div style={{ ...glass, borderRadius: 20, overflow: "hidden" }}>
//                 <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(226,232,240,0.8)", background: GRAD.header, display: "flex", alignItems: "center", gap: 12 }}>
//                   <div style={{ width: 32, height: 32, borderRadius: 10, background: GRAD.icon, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14, boxShadow: "0 2px 8px rgba(99,102,241,0.3)" }}>📐</div>
//                   <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>Biomechanical Angle Estimates</h2>
//                 </div>
//                 <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 10 }}>
//                   {analysis.angle_estimates.map((ae, i) => {
//                     const isOk = ae.status === "OPTIMAL";
//                     return (
//                       <div key={i} style={{ display: "flex", alignItems: "center", gap: 12,
//                         background: isOk ? "rgba(16,185,129,0.05)" : "rgba(245,158,11,0.05)",
//                         border: `1px solid ${isOk ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)"}`,
//                         borderRadius: 10, padding: "12px 16px" }}>
//                         <div style={{ flex: 1 }}>
//                           <p style={sLabel}>{ae.joint}</p>
//                           <p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{ae.estimated_angle}</p>
//                           <p style={{ fontSize: 11, color: "#94a3b8" }}>Optimal: {ae.optimal_range}</p>
//                         </div>
//                         <div style={{ background: isOk ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)",
//                           border: `1px solid ${isOk ? "rgba(16,185,129,0.2)" : "rgba(245,158,11,0.2)"}`,
//                           borderRadius: 6, padding: "3px 10px" }}>
//                           <span style={{ fontSize: 9, fontWeight: 700, color: isOk ? C.success : C.warning, letterSpacing: "0.1em", textTransform: "uppercase" }}>{ae.status}</span>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* ── ROW 3: Deviations + Protocol ── */}
//         <div className="fu3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

//           {/* Deviations */}
//           {analysis.deviations?.length > 0 && (
//             <div style={{ ...glass, borderRadius: 20, overflow: "hidden" }}>
//               <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(226,232,240,0.8)", background: GRAD.header, display: "flex", alignItems: "center", gap: 12 }}>
//                 <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#ef4444,#f97316)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14 }}>⚡</div>
//                 <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>Detected Deviations</h2>
//               </div>
//               <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 10 }}>
//                 {analysis.deviations.map((d, i) => {
//                   const isSig = d.severity === "SIGNIFICANT";
//                   return (
//                     <div key={i} style={{ background: isSig ? "rgba(239,68,68,0.05)" : "rgba(245,158,11,0.04)",
//                       border: `1px solid ${isSig ? "rgba(239,68,68,0.15)" : "rgba(245,158,11,0.15)"}`,
//                       borderRadius: 10, padding: "12px 16px" }}>
//                       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
//                         <p style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>{d.deviation}</p>
//                         <Tag color={isSig ? C.danger : C.warning}
//                           bg={isSig ? "rgba(239,68,68,0.08)" : "rgba(245,158,11,0.08)"}
//                           border={`1px solid ${isSig ? "rgba(239,68,68,0.2)" : "rgba(245,158,11,0.2)"}`}>
//                           {d.severity}
//                         </Tag>
//                       </div>
//                       <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.6 }}>{d.description}</p>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* Protocol */}
//           <div style={{ ...glass, borderRadius: 20, overflow: "hidden" }}>
//             <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(226,232,240,0.8)", background: GRAD.header, display: "flex", alignItems: "center", gap: 12 }}>
//               <div style={{ width: 32, height: 32, borderRadius: 10,
//                 background: analysis.mode === "Correction" ? GRAD.icon : "linear-gradient(135deg,#10b981,#059669)",
//                 display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14,
//                 boxShadow: "0 2px 8px rgba(99,102,241,0.3)" }}>
//                 {analysis.mode === "Correction" ? "🔧" : "📋"}
//               </div>
//               <div>
//                 <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>
//                   {analysis.mode === "Correction" ? "Correction Protocol" : "Guided Learning Protocol"}
//                 </h2>
//                 <p style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>
//                   {analysis.mode === "Correction" ? "Prioritized corrective cues" : "Step-by-step form guidance"}
//                 </p>
//               </div>
//             </div>
//             <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 10 }}>
//               {analysis.improvement_points.map((point, i) => (
//                 <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12,
//                   background: analysis.mode === "Correction" ? "rgba(238,242,255,0.5)" : "rgba(16,185,129,0.05)",
//                   border: analysis.mode === "Correction" ? "1px solid #e0e7ff" : "1px solid rgba(16,185,129,0.15)",
//                   borderRadius: 10, padding: "12px 14px" }}>
//                   <div style={{ width: 22, height: 22, borderRadius: 6, flexShrink: 0,
//                     background: analysis.mode === "Correction" ? GRAD.icon : "linear-gradient(135deg,#10b981,#059669)",
//                     display: "flex", alignItems: "center", justifyContent: "center",
//                     color: "white", fontSize: 10, fontWeight: 800 }}>
//                     {i + 1}
//                   </div>
//                   <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.65, margin: 0 }}>{point}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ── ROW 4: Summary ── */}
//         <div className="fu3" style={{ ...glass, borderRadius: 20, overflow: "hidden" }}>
//           <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(226,232,240,0.8)", background: GRAD.header, display: "flex", alignItems: "center", gap: 12 }}>
//             <div style={{ width: 32, height: 32, borderRadius: 10, background: GRAD.icon, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14, boxShadow: "0 2px 8px rgba(99,102,241,0.3)" }}>📝</div>
//             <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>Clinical Summary</h2>
//             <div style={{ marginLeft: "auto", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 6, padding: "3px 10px" }}>
//               <span style={{ fontSize: 9, fontWeight: 700, color: "#6366f1", letterSpacing: "0.1em", textTransform: "uppercase" }}>AI Generated</span>
//             </div>
//           </div>
//           <div style={{ padding: 28 }}>
//             <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.85 }}>{analysis.summary}</p>
//             {analysis.mistakes_detected?.length > 0 && (
//               <>
//                 <p style={{ ...sectionTitle, marginTop: 24 }}>Key Inconsistencies Flagged</p>
//                 <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
//                   {analysis.mistakes_detected.map((m, i) => (
//                     <div key={i} style={{ display: "flex", alignItems: "center", gap: 8,
//                       background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.12)",
//                       borderRadius: 8, padding: "7px 12px" }}>
//                       <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.danger, flexShrink: 0 }} />
//                       <span style={{ fontSize: 12, color: "#64748b" }}>{m}</span>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>

//         {/* ── ROW 5: Reference Images ── */}
//         {analysis.reference_images?.length > 0 && (
//           <div className="fu4">
//             <p style={sectionTitle}>Anatomical Reference Images</p>
//             <p style={{ fontSize: 11, color: "#94a3b8", marginBottom: 16, marginTop: -12 }}>
//               Based on detected movement: {analysis.movement_pattern}
//             </p>
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
//               {analysis.reference_images.map((img, i) => (
//                 <div key={i} style={{ ...glass, borderRadius: 16, overflow: "hidden", border: "1px solid #e0e7ff" }}>
//                   <div style={{ height: 220, overflow: "hidden" }}>
//                     <img src={img.url} alt={`Reference ${i + 1}`}
//                       style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.3s" }}
//                       onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
//                       onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
//                     />
//                   </div>
//                   <div style={{ padding: "10px 14px" }}>
//                     <p style={sLabel}>Reference {i + 1}</p>
//                     {img.photographer && <p style={{ fontSize: 10, color: "#94a3b8" }}>📷 {img.photographer}</p>}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//       </div>

//       {/* Footer */}
//       <footer style={{ position: "relative", zIndex: 1, background: "#0f172a", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "40px 48px" }}>
//         <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
//           <div>
//             <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "white" }}>POSTURE</span>
//             <span style={{ fontSize: "1.1rem", fontWeight: 800, background: GRAD.primary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI</span>
//             <p style={{ fontSize: "0.75rem", color: "#475569", marginTop: 4 }}>AI-powered biomechanics analysis engine.</p>
//           </div>
//           <div style={{ textAlign: "right" }}>
//             <p style={{ color: "#334155", fontSize: "0.75rem" }}>© 2026 Elite Atelier. All rights reserved.</p>
//             <p style={{ color: "#1e293b", fontSize: 10, marginTop: 6, maxWidth: 480, lineHeight: 1.6 }}>
//               This analysis is intended for educational and reference purposes only. Always consult a licensed physiotherapist for clinical diagnosis and treatment.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// // ═════════════════════════════════════════════════════════════
// //  ROOT
// // ═════════════════════════════════════════════════════════════
// export default function App() {
//   const [page, setPage]               = useState("setup");
//   const [sessionData, setSessionData] = useState(null);
//   const [analysis, setAnalysis]       = useState(null);

//   return (
//     <>
//       {page === "setup"     && <SetupPage onStart={(d) => { setSessionData(d); setPage("recording"); }} />}
//       {page === "recording" && <RecordingPage sessionData={sessionData} onFinish={(r) => { setAnalysis(r); setPage("result"); }} />}
//       {page === "result"    && <ResultPage analysis={analysis} onRestart={() => { setAnalysis(null); setPage("setup"); }} />}
//     </>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";

// ─────────────────────────────────────────────
// API KEYS
// ─────────────────────────────────────────────
const GEMINI_API_KEY = "AIzaSyCD-ABq7bGsBLlnR3tfXx2ykx6BSQj8a6Q";
const PEXELS_API_KEY = "yVNSo9fZ5vgwmvLdvfF5qr9TSKLnnjFN6LqiiZwuUIRW6yhWj8I8ha68";

// ─────────────────────────────────────────────
// MOCK BACKEND — physio data only
// (Replace with real API routes later)
// ─────────────────────────────────────────────
const MOCK_BACKEND = {
  savedSessions: [],
  async savePhysioSession(data) {
    const record = {
      id: `PHYSIO-${Date.now()}`,
      timestamp: new Date().toISOString(),
      patientDescription: data.patientDescription,
      clinicianNotes: data.clinicianNotes,
      sessionType: data.sessionType,
      bodyRegion: data.bodyRegion,
      rehabilitationPhase: data.rehabilitationPhase,
      analysis: {
        overall_score: data.overall_score,
        risk_level: data.risk_level,
        movement_pattern: data.movement_pattern,
        primary_muscles: data.primary_muscles,
        deviations: data.deviations,
        clinical_summary: data.clinical_summary,
        treatment_goals: data.treatment_goals,
        contraindications: data.contraindications,
        home_exercise_program: data.home_exercise_program,
        functional_goals: data.functional_goals,
        reassessment_date: data.reassessment_date,
      },
    };
    this.savedSessions.push(record);
    console.log("✅ Physio session saved to mock backend:", record);
    return { success: true, sessionId: record.id, record };
  },
  async getPhysioSessions() {
    return this.savedSessions;
  },
};

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const ATHLETE_PALETTE = {
  grad: "linear-gradient(135deg, #2563eb, #6366f1, #7c3aed)",
  accent: "#6366f1",
  accentDeep: "#2563eb",
  accentAlt: "#7c3aed",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  text: "#0f172a",
  textMid: "#64748b",
  border: "#e0e7ff",
  bg: "#f8fafc",
  card: "rgba(255,255,255,0.9)",
  tag: "rgba(99,102,241,0.1)",
};

const PHYSIO_PALETTE = {
  grad: "linear-gradient(135deg, #0f766e, #0891b2, #1d4ed8)",
  accent: "#0891b2",
  accentDeep: "#0f766e",
  accentAlt: "#1d4ed8",
  success: "#059669",
  warning: "#d97706",
  danger: "#dc2626",
  text: "#0c1a1a",
  textMid: "#4b7280",
  border: "#ccfbf1",
  bg: "#f0fdf9",
  card: "rgba(255,255,255,0.92)",
  tag: "rgba(8,145,178,0.1)",
};

const glass = (palette) => ({
  background: palette.card,
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: `1px solid ${palette.border}`,
  boxShadow: `0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)`,
  borderRadius: 18,
});

// ─────────────────────────────────────────────
// GEMINI — ATHLETE PROMPT
// ─────────────────────────────────────────────
async function analyzeAthletePosture(angleStats, rawKeypoints, snapshotImage, mode, description, exerciseType) {
  const prompt = `You are a licensed physiotherapist, biomechanics researcher, and clinical movement analyst with 20+ years of experience.

SESSION PARAMETERS
Mode: ${mode}
Exercise Type: ${exerciseType}
User Description: ${description || "None provided"}

BIOMECHANICAL DATA
Angle Statistics: ${JSON.stringify(angleStats, null, 2)}
Keypoint Sample: ${JSON.stringify((rawKeypoints || []).slice(0, 5), null, 2)}

Analyze this athlete/general user's posture and return ONLY raw JSON matching exactly this structure:
{
  "overall_score": <0-10>,
  "risk_level": "LOW"|"MEDIUM"|"HIGH",
  "risk_reason": "",
  "movement_pattern": "",
  "movement_classification": "",
  "primary_muscles": [""],
  "secondary_muscles": [""],
  "joint_alignment": { "spine": "", "hip": "", "shoulder": "", "elbow": "", "knee": "" },
  "symmetry_score": <0-10>,
  "core_engagement": "LOW"|"MODERATE"|"HIGH",
  "angle_estimates": [{ "joint": "", "estimated_angle": "", "optimal_range": "", "status": "OPTIMAL"|"DEVIATION" }],
  "deviations": [{ "deviation": "", "severity": "MINOR"|"SIGNIFICANT", "description": "" }],
  "mistakes_detected": [""],
  "improvement_points": ["","","","",""],
  "load_distribution": "",
  "at_risk_structures": [""],
  "summary": "<minimum 6 sentences>",
  "correction_keywords": ["","","",""]
}`;

  return callGemini(prompt, snapshotImage);
}

// ─────────────────────────────────────────────
// GEMINI — PHYSIOTHERAPIST PROMPT (separate, clinical-grade)
// ─────────────────────────────────────────────
async function analyzePhysioPosture(angleStats, rawKeypoints, snapshotImage, sessionConfig) {
  const prompt = `You are a specialist clinical physiotherapist conducting a formal biomechanical assessment. Apply ICF framework, evidence-based outcome measures, and clinical reasoning.

CLINICAL SESSION PARAMETERS
Session Type: ${sessionConfig.sessionType}
Body Region: ${sessionConfig.bodyRegion}
Rehabilitation Phase: ${sessionConfig.rehabilitationPhase}
Chief Complaint: ${sessionConfig.patientDescription}
Clinician Notes: ${sessionConfig.clinicianNotes || "None"}

BIOMECHANICAL DATA
Angle Statistics: ${JSON.stringify(angleStats, null, 2)}
Keypoint Sample: ${JSON.stringify((rawKeypoints || []).slice(0, 5), null, 2)}

Conduct a full clinical physiotherapy assessment. Return ONLY raw JSON:
{
  "overall_score": <0-10 functional score>,
  "risk_level": "LOW"|"MEDIUM"|"HIGH",
  "risk_reason": "",
  "movement_pattern": "",
  "movement_classification": "",
  "primary_muscles": [""],
  "secondary_muscles": [""],
  "joint_alignment": { "spine": "", "hip": "", "shoulder": "", "elbow": "", "knee": "" },
  "symmetry_score": <0-10>,
  "core_engagement": "LOW"|"MODERATE"|"HIGH",
  "angle_estimates": [{ "joint": "", "estimated_angle": "", "optimal_range": "", "status": "OPTIMAL"|"DEVIATION" }],
  "deviations": [{ "deviation": "", "severity": "MINOR"|"SIGNIFICANT", "description": "" }],
  "icf_impairments": ["<body function/structure impairments>"],
  "icf_activity_limitations": ["<activity limitations>"],
  "icf_participation_restrictions": ["<participation restrictions>"],
  "contraindications": ["<list any movements/activities to avoid>"],
  "treatment_goals": {
    "short_term": ["<0-4 week goals>"],
    "long_term": ["<4-12 week goals>"]
  },
  "home_exercise_program": [
    { "exercise": "", "sets": "", "reps": "", "frequency": "", "rationale": "" }
  ],
  "manual_therapy_recommendations": [""],
  "outcome_measures": ["<recommended validated outcome measures e.g. NDI, DASH, KOOS>"],
  "functional_goals": ["<SMART functional goals>"],
  "reassessment_date": "<recommended timeframe>",
  "clinical_flags": {
    "red_flags": ["<serious pathology indicators if any>"],
    "yellow_flags": ["<psychosocial factors if any>"]
  },
  "clinical_summary": "<minimum 8 clinical sentences including diagnosis, prognosis, and treatment rationale>",
  "correction_keywords": ["","","",""]
}`;

  return callGemini(prompt, snapshotImage, true);
}

async function callGemini(prompt, snapshotImage, isPhysio = false) {
  const parts = [{ text: prompt }];
  if (snapshotImage?.startsWith("data:image")) {
    parts.push({ inline_data: { mime_type: "image/jpeg", data: snapshotImage.split(",")[1] } });
  }
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ role: "user", parts }] }),
    }
  );
  if (!res.ok) throw new Error(`Gemini HTTP ${res.status}`);
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON in Gemini response");
  return JSON.parse(match[0]);
}

// ─────────────────────────────────────────────
// PEXELS
// ─────────────────────────────────────────────
async function fetchReferenceImages(keywords, movementPattern) {
  const queries = [];
  if (movementPattern && movementPattern !== "Unknown Movement") {
    const m = movementPattern.replace(/\(.*\)/, "").trim().toLowerCase();
    queries.push(`${m} exercise correct form`, `${m} technique fitness gym`);
  }
  if (Array.isArray(keywords)) queries.push(...keywords);
  if (queries.length === 0) queries.push("exercise correct form physiotherapy");

  const images = [], used = new Set();
  for (const term of queries.slice(0, 5)) {
    if (images.length >= 4) break;
    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(term)}&per_page=4&orientation=portrait&size=large`,
        { headers: { Authorization: PEXELS_API_KEY } }
      );
      const d = await res.json();
      for (const photo of d.photos || []) {
        if (images.length >= 4) break;
        const url = photo.src.large2x || photo.src.large || photo.src.medium;
        if (!used.has(url)) {
          used.add(url);
          images.push({ url, photographer: photo.photographer });
        }
      }
    } catch (_) {}
  }
  return images;
}

// ─────────────────────────────────────────────
// ORCHESTRATOR
// ─────────────────────────────────────────────
async function runAnalysis(userType, sessionData, angleStats, rawKeypoints, snapshotImage) {
  try {
    let ai;
    if (userType === "physio") {
      ai = await analyzePhysioPosture(angleStats, rawKeypoints, snapshotImage, sessionData);
    } else {
      ai = await analyzeAthletePosture(angleStats, rawKeypoints, snapshotImage, sessionData.mode, sessionData.description, sessionData.exerciseType);
    }

    const score = Math.max(0, Math.min(10, Number(ai.overall_score) || 5));
    const risk = ["LOW","MEDIUM","HIGH"].includes(ai.risk_level?.toUpperCase()) ? ai.risk_level.toUpperCase() : "LOW";
    const result = { userType, ...sessionData, ...ai, overall_score: score, risk_level: risk };

    result.reference_images = await fetchReferenceImages(ai.correction_keywords, ai.movement_pattern);

    // Save physio sessions to mock backend
    if (userType === "physio") {
      const saved = await MOCK_BACKEND.savePhysioSession({ ...sessionData, ...result });
      result._backendId = saved.sessionId;
      result._savedAt = new Date().toISOString();
    }

    return result;
  } catch (err) {
    console.error("Analysis error:", err);
    return {
      userType, ...sessionData,
      overall_score: 5, risk_level: "LOW",
      risk_reason: "AI temporarily unavailable.",
      movement_pattern: "Unknown", movement_classification: "",
      primary_muscles: [], secondary_muscles: [],
      joint_alignment: {}, symmetry_score: 5, core_engagement: "MODERATE",
      angle_estimates: [], deviations: [], mistakes_detected: [],
      improvement_points: ["Please verify your API keys and try again."],
      load_distribution: "", at_risk_structures: [],
      summary: "Analysis failed. Please check your GEMINI_API_KEY.",
      correction_keywords: [], reference_images: [],
      clinical_summary: "Analysis failed. Please check your GEMINI_API_KEY.",
    };
  }
}

// ─────────────────────────────────────────────
// COMPONENT: Loader
// ─────────────────────────────────────────────
function BikeLoader({ label = "Analyzing…", palette }) {
  const c = palette || ATHLETE_PALETTE;
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(255,255,255,0.92)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", zIndex:1000, backdropFilter:"blur(12px)" }}>
      <div style={{ fontSize:52, marginBottom:20, animation:"spin 2s linear infinite" }}>🧠</div>
      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        {[0,1,2].map(i => (
          <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:c.grad, animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite` }} />
        ))}
      </div>
      <div style={{ fontSize:15, fontWeight:700, color:c.text, fontFamily:"'DM Sans', sans-serif" }}>{label}</div>
      <div style={{ fontSize:11, color:c.textMid, marginTop:6, fontFamily:"'DM Sans', sans-serif" }}>
        {palette === PHYSIO_PALETTE ? "Generating Clinical Report…" : "AI Biomechanics Engine Running"}
      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounce { 0%,80%,100% { transform: scale(0.6); opacity:0.4; } 40% { transform: scale(1); opacity:1; } }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────
// PAGE 0 — USER TYPE SELECTION
// ─────────────────────────────────────────────
function UserTypePage({ onSelect }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg, #f8fafc 0%, #eff6ff 50%, #f0fdf9 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:24, fontFamily:"'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@700;800&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      {/* Background blobs */}
      <div style={{ position:"fixed", top:"-15%", left:"-10%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"fixed", bottom:"-15%", right:"-10%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(8,145,178,0.06) 0%, transparent 70%)", pointerEvents:"none" }} />

      <div style={{ maxWidth:600, width:"100%", textAlign:"center" }}>
        {/* Logo */}
        <div style={{ marginBottom:40 }}>
          <div style={{ fontSize:52, marginBottom:16 }}>🧘</div>
          <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:36, fontWeight:800, color:"#0f172a", margin:0, lineHeight:1.1 }}>
            PostureAI
          </h1>
          <p style={{ fontSize:14, color:"#64748b", marginTop:10, fontWeight:400 }}>
            AI-Powered Biomechanics Analysis Engine
          </p>
        </div>

        {/* Selection prompt */}
        <p style={{ fontSize:17, fontWeight:600, color:"#0f172a", marginBottom:28 }}>
          Who are you?
        </p>
        <p style={{ fontSize:13, color:"#64748b", marginBottom:36, lineHeight:1.6 }}>
          Choose your profile to get a tailored analysis experience with the right metrics, prompts, and reporting format.
        </p>

        {/* Cards */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
          {/* Athlete Card */}
          <div
            onMouseEnter={() => setHovered("athlete")}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSelect("athlete")}
            style={{
              background: hovered === "athlete" ? "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(124,58,237,0.08))" : "rgba(255,255,255,0.9)",
              border: hovered === "athlete" ? "2px solid #6366f1" : "2px solid #e0e7ff",
              borderRadius:20, padding:32, cursor:"pointer",
              transition:"all 0.25s ease",
              transform: hovered === "athlete" ? "translateY(-4px)" : "translateY(0)",
              boxShadow: hovered === "athlete" ? "0 16px 40px rgba(99,102,241,0.2)" : "0 4px 16px rgba(0,0,0,0.06)",
            }}>
            <div style={{ fontSize:44, marginBottom:16 }}>🏋️</div>
            <div style={{ fontFamily:"'Playfair Display', serif", fontSize:20, fontWeight:700, color:"#0f172a", marginBottom:8 }}>
              Athlete / User
            </div>
            <div style={{ fontSize:12, color:"#64748b", lineHeight:1.6 }}>
              General posture correction, fitness form analysis, performance optimization, and injury prevention.
            </div>
            <div style={{ marginTop:20, display:"flex", flexWrap:"wrap", gap:6, justifyContent:"center" }}>
              {["Form Check","Score 0–10","Corrections","Risk Level"].map(t => (
                <span key={t} style={{ background:"rgba(99,102,241,0.1)", color:"#6366f1", border:"1px solid rgba(99,102,241,0.2)", borderRadius:20, padding:"3px 10px", fontSize:10, fontWeight:600 }}>{t}</span>
              ))}
            </div>
            <div style={{ marginTop:24, background:"linear-gradient(135deg, #2563eb, #6366f1, #7c3aed)", color:"#fff", borderRadius:10, padding:"10px 0", fontSize:12, fontWeight:700, letterSpacing:"0.08em" }}>
              SELECT →
            </div>
          </div>

          {/* Physiotherapist Card */}
          <div
            onMouseEnter={() => setHovered("physio")}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSelect("physio")}
            style={{
              background: hovered === "physio" ? "linear-gradient(135deg, rgba(8,145,178,0.08), rgba(15,118,110,0.08))" : "rgba(255,255,255,0.9)",
              border: hovered === "physio" ? "2px solid #0891b2" : "2px solid #ccfbf1",
              borderRadius:20, padding:32, cursor:"pointer",
              transition:"all 0.25s ease",
              transform: hovered === "physio" ? "translateY(-4px)" : "translateY(0)",
              boxShadow: hovered === "physio" ? "0 16px 40px rgba(8,145,178,0.2)" : "0 4px 16px rgba(0,0,0,0.06)",
            }}>
            <div style={{ fontSize:44, marginBottom:16 }}>🩺</div>
            <div style={{ fontFamily:"'Playfair Display', serif", fontSize:20, fontWeight:700, color:"#0c1a1a", marginBottom:8 }}>
              Physiotherapist
            </div>
            <div style={{ fontSize:12, color:"#4b7280", lineHeight:1.6 }}>
              Clinical biomechanical assessment, ICF framework, treatment planning, HEP, and patient outcome tracking.
            </div>
            <div style={{ marginTop:20, display:"flex", flexWrap:"wrap", gap:6, justifyContent:"center" }}>
              {["ICF Framework","HEP","Clinical Goals","Saved to Records"].map(t => (
                <span key={t} style={{ background:"rgba(8,145,178,0.1)", color:"#0891b2", border:"1px solid rgba(8,145,178,0.2)", borderRadius:20, padding:"3px 10px", fontSize:10, fontWeight:600 }}>{t}</span>
              ))}
            </div>
            <div style={{ marginTop:24, background:"linear-gradient(135deg, #0f766e, #0891b2, #1d4ed8)", color:"#fff", borderRadius:10, padding:"10px 0", fontSize:12, fontWeight:700, letterSpacing:"0.08em" }}>
              SELECT →
            </div>
          </div>
        </div>

        <p style={{ marginTop:32, fontSize:11, color:"#94a3b8" }}>
          🔬 Evidence-Informed • Gemini 2.5 Flash + MoveNet Lightning
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PAGE 1A — ATHLETE SETUP
// ─────────────────────────────────────────────
function AthleteSetupPage({ onStart, onBack }) {
  const p = ATHLETE_PALETTE;
  const [mode, setMode] = useState("Correction");
  const [duration, setDuration] = useState(30);
  const [description, setDescription] = useState("");
  const [exerciseType, setExerciseType] = useState("Auto-detect");
  const durationOptions = mode === "Guidance" ? [5, 10, 15] : [30, 60, 120, 180, 240, 300];

  const field = { width:"100%", padding:"11px 14px", borderRadius:10, border:`1.5px solid ${p.border}`, fontSize:13, color:p.text, outline:"none", background:"rgba(238,242,255,0.3)", fontFamily:"'DM Sans', sans-serif", boxSizing:"border-box" };

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg, #f8fafc 0%, #eff6ff 60%, #f8fafc 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:24, fontFamily:"'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@700;800&display=swap'); * { box-sizing: border-box; }`}</style>
      <div style={{ maxWidth:480, width:"100%" }}>
        <button onClick={onBack} style={{ background:"none", border:"none", color:p.textMid, fontSize:13, cursor:"pointer", marginBottom:24, display:"flex", alignItems:"center", gap:6, fontFamily:"'DM Sans', sans-serif" }}>
          ← Back to Profile
        </button>
        <div style={{ ...glass(p), padding:36 }}>
          <div style={{ textAlign:"center", marginBottom:28 }}>
            <div style={{ fontSize:36, marginBottom:10 }}>🏋️</div>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:24, margin:0, color:p.text }}>Configure Session</h2>
            <p style={{ fontSize:12, color:p.textMid, marginTop:6 }}>Athlete / General User Mode</p>
          </div>

          {/* Mode toggle */}
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#94a3b8", marginBottom:8 }}>Analysis Mode</div>
          <div style={{ display:"flex", gap:8, marginBottom:20, background:"rgba(238,242,255,0.5)", padding:4, borderRadius:12 }}>
            {["Correction", "Guidance"].map(m => (
              <button key={m} onClick={() => { setMode(m); setDuration(m === "Guidance" ? 5 : 30); }}
                style={{ flex:1, padding:"10px 0", borderRadius:9, border:"none", cursor:"pointer", fontWeight:700, fontSize:13, fontFamily:"'DM Sans', sans-serif", transition:"all 0.2s",
                  background: mode === m ? p.grad : "transparent", color: mode === m ? "#fff" : p.accent }}>
                {m}
              </button>
            ))}
          </div>

          {/* Exercise + Duration */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:18 }}>
            <div>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#94a3b8", marginBottom:6 }}>Exercise</div>
              <select value={exerciseType} onChange={e => setExerciseType(e.target.value)} style={field}>
                {["Auto-detect","Wrist Flexion","Shoulder Raise","Bicep Curl","Squat","Deadlift","Plank","Push-up","Lunge"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#94a3b8", marginBottom:6 }}>Duration</div>
              <select value={duration} onChange={e => setDuration(Number(e.target.value))} style={field}>
                {durationOptions.map(d => <option key={d} value={d}>{d >= 60 ? `${d/60} min` : `${d} sec`}</option>)}
              </select>
            </div>
          </div>

          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#94a3b8", marginBottom:6 }}>Description (optional)</div>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="Any injuries, goals, or notes…"
            style={{ ...field, resize:"vertical", marginBottom:24 }} />

          <button onClick={() => onStart({ mode, duration, description, exerciseType })}
            style={{ width:"100%", padding:"14px 0", borderRadius:12, border:"none", background:p.grad, color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans', sans-serif", letterSpacing:"0.06em", textTransform:"uppercase" }}>
            🎥 Start Recording
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PAGE 1B — PHYSIOTHERAPIST SETUP
// ─────────────────────────────────────────────
function PhysioSetupPage({ onStart, onBack }) {
  const p = PHYSIO_PALETTE;
  const [sessionType, setSessionType] = useState("Initial Assessment");
  const [bodyRegion, setBodyRegion] = useState("Lumbar Spine");
  const [rehabilitationPhase, setRehabPhase] = useState("Acute");
  const [patientDescription, setPatientDesc] = useState("");
  const [clinicianNotes, setClinicianNotes] = useState("");
  const [duration, setDuration] = useState(60);

  const field = { width:"100%", padding:"11px 14px", borderRadius:10, border:`1.5px solid ${p.border}`, fontSize:13, color:p.text, outline:"none", background:"rgba(240,253,249,0.6)", fontFamily:"'DM Sans', sans-serif", boxSizing:"border-box" };

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg, #f0fdf9 0%, #ecfdf5 50%, #f0f9ff 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:24, fontFamily:"'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@700;800&display=swap'); * { box-sizing: border-box; }`}</style>
      <div style={{ maxWidth:540, width:"100%" }}>
        <button onClick={onBack} style={{ background:"none", border:"none", color:p.textMid, fontSize:13, cursor:"pointer", marginBottom:24, display:"flex", alignItems:"center", gap:6, fontFamily:"'DM Sans', sans-serif" }}>
          ← Back to Profile
        </button>
        <div style={{ ...glass(p), padding:36 }}>
          {/* Clinical header */}
          <div style={{ textAlign:"center", marginBottom:28 }}>
            <div style={{ fontSize:36, marginBottom:10 }}>🩺</div>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:24, margin:0, color:p.text }}>Clinical Session Setup</h2>
            <p style={{ fontSize:12, color:p.textMid, marginTop:6 }}>Physiotherapist Mode — Clinical-Grade Assessment</p>
          </div>

          {/* Session + Region + Phase */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:16 }}>
            <div>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#4b7280", marginBottom:6 }}>Session Type</div>
              <select value={sessionType} onChange={e => setSessionType(e.target.value)} style={field}>
                {["Initial Assessment","Reassessment","Treatment Session","Discharge Assessment","Home Visit","Telehealth Review"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#4b7280", marginBottom:6 }}>Body Region</div>
              <select value={bodyRegion} onChange={e => setBodyRegion(e.target.value)} style={field}>
                {["Lumbar Spine","Cervical Spine","Thoracic Spine","Shoulder","Elbow / Wrist","Hip","Knee","Ankle / Foot","Upper Limb (bilateral)","Lower Limb (bilateral)","Full Body"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:16 }}>
            <div>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#4b7280", marginBottom:6 }}>Rehabilitation Phase</div>
              <select value={rehabilitationPhase} onChange={e => setRehabPhase(e.target.value)} style={field}>
                {["Acute (0–7 days)","Sub-acute (1–6 weeks)","Chronic (>6 weeks)","Post-surgical","Return to Sport","Maintenance"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#4b7280", marginBottom:6 }}>Recording Duration</div>
              <select value={duration} onChange={e => setDuration(Number(e.target.value))} style={field}>
                {[30,60,120,180,300].map(d => <option key={d} value={d}>{d >= 60 ? `${d/60} min` : `${d} sec`}</option>)}
              </select>
            </div>
          </div>

          {/* Patient description */}
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#4b7280", marginBottom:6 }}>Patient Chief Complaint *</div>
          <textarea value={patientDescription} onChange={e => setPatientDesc(e.target.value)} rows={3}
            placeholder="e.g. L5/S1 disc herniation with radiculopathy, 6-week post-operative rotator cuff repair…"
            style={{ ...field, resize:"vertical", marginBottom:16 }} />

          {/* Clinician notes */}
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#4b7280", marginBottom:6 }}>Clinician Notes (optional)</div>
          <textarea value={clinicianNotes} onChange={e => setClinicianNotes(e.target.value)} rows={2}
            placeholder="Prior history, previous treatments, relevant red flags…"
            style={{ ...field, resize:"vertical", marginBottom:24 }} />

          {/* Clinical badge */}
          <div style={{ background:"rgba(8,145,178,0.06)", border:"1px solid #ccfbf1", borderRadius:10, padding:"10px 14px", marginBottom:24, display:"flex", alignItems:"center", gap:8 }}>
            <span>💾</span>
            <span style={{ fontSize:11, color:p.textMid }}>This session will be automatically saved to patient records (mock backend)</span>
          </div>

          <button onClick={() => onStart({ sessionType, bodyRegion, rehabilitationPhase: rehabilitationPhase.split(" ")[0], patientDescription, clinicianNotes, duration, exerciseType: "Clinical Movement Assessment" })}
            style={{ width:"100%", padding:"14px 0", borderRadius:12, border:"none", background:p.grad, color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans', sans-serif", letterSpacing:"0.06em", textTransform:"uppercase" }}>
            🎥 Start Clinical Recording
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PAGE 2 — RECORDING (shared)
// ─────────────────────────────────────────────
function RecordingPage({ userType, sessionData, onFinish }) {
  const p = userType === "physio" ? PHYSIO_PALETTE : ATHLETE_PALETTE;
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const finishedRef = useRef(false);
  const [detector, setDetector] = useState(null);
  const [timeLeft, setTimeLeft] = useState(sessionData.duration);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    if (!window.poseDetection) return;
    window.poseDetection.createDetector(
      window.poseDetection.SupportedModels.MoveNet,
      { modelType: window.poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING }
    ).then(setDetector);
  }, []);

  useEffect(() => {
    if (!detector) return;
    let af;
    const CONNECTIONS = [[0,1],[0,2],[1,3],[2,4],[5,7],[7,9],[6,8],[8,10],[5,6],[5,11],[6,12],[11,12],[11,13],[13,15],[12,14],[14,16]];
    const loop = async () => {
      const vid = webcamRef.current?.video;
      if (vid?.readyState === 4) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = vid.videoWidth; canvas.height = vid.videoHeight;
        const poses = await detector.estimatePoses(vid);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (poses[0]) {
          const kp = poses[0].keypoints;
          ctx.strokeStyle = p.accent; ctx.lineWidth = 3;
          ctx.shadowBlur = 12; ctx.shadowColor = p.accent;
          CONNECTIONS.forEach(([a, b]) => {
            if (kp[a]?.score > 0.5 && kp[b]?.score > 0.5) {
              ctx.beginPath(); ctx.moveTo(kp[a].x, kp[a].y); ctx.lineTo(kp[b].x, kp[b].y); ctx.stroke();
            }
          });
          kp.forEach(pt => {
            if (pt.score > 0.5) { ctx.beginPath(); ctx.arc(pt.x, pt.y, 5, 0, 2*Math.PI); ctx.fillStyle="#fff"; ctx.shadowBlur=8; ctx.fill(); }
          });
        }
      }
      af = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(af);
  }, [detector]);

  useEffect(() => {
    if (timeLeft === 0) { handleFinish(); return; }
    const t = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft]);

  const handleFinish = async () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setAnalyzing(true);
    const snapshot = webcamRef.current?.getScreenshot();
    const result = await runAnalysis(userType, sessionData, {}, [], snapshot);
    onFinish(result);
  };

  const progress = ((sessionData.duration - timeLeft) / sessionData.duration) * 100;

  return (
    <div style={{ minHeight:"100vh", background:"#0f172a", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, fontFamily:"'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&display=swap');`}</style>
      {analyzing && <BikeLoader label={userType === "physio" ? "Generating Clinical Report…" : "Analyzing Posture…"} palette={p} />}

      {/* Timer bar */}
      <div style={{ width:"100%", maxWidth:600, marginBottom:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
          <span style={{ color:p.accent, fontSize:13, fontWeight:700 }}>⬤ LIVE · {timeLeft}s remaining</span>
          <span style={{ color:"#64748b", fontSize:12 }}>{userType === "physio" ? "Clinical" : sessionData.mode} · {sessionData.exerciseType}</span>
        </div>
        <div style={{ height:4, background:"rgba(255,255,255,0.1)", borderRadius:2 }}>
          <div style={{ height:"100%", width:`${progress}%`, background:p.grad, borderRadius:2, transition:"width 1s linear" }} />
        </div>
      </div>

      {/* Camera */}
      <div style={{ position:"relative", maxWidth:600, width:"100%", borderRadius:20, overflow:"hidden", border:`2px solid ${p.accent}`, boxShadow:`0 0 40px ${p.accent}33` }}>
        <Webcam ref={webcamRef} screenshotFormat="image/jpeg" style={{ width:"100%", display:"block" }} />
        <canvas ref={canvasRef} style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%" }} />
        {/* Corners */}
        {[{top:12,left:12,borderTop:`2px solid ${p.accent}`,borderLeft:`2px solid ${p.accent}`,borderRadius:"8px 0 0 0"},
          {top:12,right:12,borderTop:`2px solid ${p.accent}`,borderRight:`2px solid ${p.accent}`,borderRadius:"0 8px 0 0"},
          {bottom:12,left:12,borderBottom:`2px solid ${p.accent}`,borderLeft:`2px solid ${p.accent}`,borderRadius:"0 0 0 8px"},
          {bottom:12,right:12,borderBottom:`2px solid ${p.accent}`,borderRight:`2px solid ${p.accent}`,borderRadius:"0 0 8px 0"},
        ].map((s,i) => <div key={i} style={{ position:"absolute", width:24, height:24, ...s }} />)}
        {/* Status overlay */}
        <div style={{ position:"absolute", bottom:16, left:16, right:16, display:"flex", justifyContent:"space-between" }}>
          <span style={{ background:"rgba(0,0,0,0.6)", color:"#10b981", padding:"4px 10px", borderRadius:8, fontSize:11, fontWeight:700 }}>● CAPTURING</span>
          <span style={{ background:"rgba(0,0,0,0.6)", color:"#94a3b8", padding:"4px 10px", borderRadius:8, fontSize:11 }}>MoveNet Lightning</span>
        </div>
      </div>

      <button onClick={handleFinish} style={{ marginTop:24, padding:"12px 32px", borderRadius:12, border:`1.5px solid ${p.accent}`, background:"transparent", color:p.accent, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans', sans-serif" }}>
        Finish Early →
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// PAGE 3A — ATHLETE RESULT
// ─────────────────────────────────────────────
function AthleteResultPage({ analysis, onRestart }) {
  const p = ATHLETE_PALETTE;
  const risk = analysis.risk_level?.toUpperCase();
  const riskColor = risk === "HIGH" ? p.danger : risk === "MEDIUM" ? p.warning : p.success;
  const scoreColor = analysis.overall_score >= 8 ? p.success : analysis.overall_score >= 5 ? p.warning : p.danger;
  const circumference = 2 * Math.PI * 44;
  const sessionId = useRef(Math.floor(Math.random() * 90000) + 10000).current;

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg, #f8fafc 0%, #eff6ff 50%, #f8fafc 100%)", padding:"24px 20px 60px", fontFamily:"'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@700;800&display=swap'); * { box-sizing: border-box; }`}</style>

      <div style={{ maxWidth:900, margin:"0 auto" }}>
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28 }}>
          <div>
            <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:28, margin:0, color:p.text }}>Biomechanics Report</h1>
            <p style={{ fontSize:12, color:p.textMid, marginTop:4 }}>Session #{sessionId} · {analysis.mode} · {analysis.duration}s</p>
          </div>
          <button onClick={onRestart} style={{ padding:"10px 20px", borderRadius:10, border:`1.5px solid ${p.border}`, background:"#fff", color:p.accent, fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans', sans-serif" }}>
            ↩ New Session
          </button>
        </div>

        {/* Row 1: Score + Movement + Risk */}
        <div style={{ display:"grid", gridTemplateColumns:"200px 1fr 240px", gap:16, marginBottom:16 }}>
          {/* Score */}
          <div style={{ ...glass(p), padding:24, textAlign:"center" }}>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#94a3b8", marginBottom:16 }}>Overall Score</div>
            <svg width={100} height={100} style={{ display:"block", margin:"0 auto 12px" }}>
              <circle cx={50} cy={50} r={44} fill="none" stroke="#e0e7ff" strokeWidth={6} />
              <circle cx={50} cy={50} r={44} fill="none" stroke={scoreColor} strokeWidth={6}
                strokeDasharray={`${(analysis.overall_score/10)*circumference} ${circumference}`}
                strokeLinecap="round" transform="rotate(-90 50 50)" />
              <text x={50} y={50} textAnchor="middle" dominantBaseline="central" fontSize={22} fontWeight={800} fill={scoreColor}>{analysis.overall_score}</text>
            </svg>
            <div style={{ fontSize:10, color:"#94a3b8" }}>out of 10</div>
            <div style={{ marginTop:12, fontSize:11, fontWeight:700, color:riskColor, background:`${riskColor}18`, border:`1px solid ${riskColor}30`, borderRadius:8, padding:"4px 8px" }}>{risk} RISK</div>
          </div>

          {/* Movement */}
          <div style={{ ...glass(p), padding:24 }}>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#94a3b8", marginBottom:12 }}>Movement Identification</div>
            <div style={{ fontSize:18, fontWeight:700, color:p.text, marginBottom:10 }}>{analysis.movement_pattern}</div>
            {analysis.movement_classification && <div style={{ fontSize:11, color:p.textMid, marginBottom:14 }}>{analysis.movement_classification}</div>}
            <div style={{ marginBottom:8 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#94a3b8", marginBottom:6 }}>Primary Muscles</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {(analysis.primary_muscles || []).map((m, i) => <span key={i} style={{ background:p.tag, color:p.accent, border:`1px solid ${p.border}`, borderRadius:20, padding:"3px 10px", fontSize:11, fontWeight:600 }}>{m}</span>)}
              </div>
            </div>
            {analysis.secondary_muscles?.length > 0 && (
              <div>
                <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#94a3b8", marginBottom:6 }}>Secondary</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {analysis.secondary_muscles.map((m, i) => <span key={i} style={{ background:"rgba(100,116,139,0.08)", color:"#64748b", border:"1px solid #e2e8f0", borderRadius:20, padding:"3px 10px", fontSize:11 }}>{m}</span>)}
                </div>
              </div>
            )}
          </div>

          {/* Risk */}
          <div style={{ ...glass(p), padding:24, borderLeft:`3px solid ${riskColor}` }}>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#94a3b8", marginBottom:12 }}>Risk Assessment</div>
            <div style={{ fontSize:22, fontWeight:800, color:riskColor, marginBottom:8 }}>{risk}</div>
            <div style={{ fontSize:12, color:p.textMid, lineHeight:1.6, marginBottom:14 }}>{analysis.risk_reason}</div>
            {analysis.at_risk_structures?.length > 0 && (
              <>
                <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#94a3b8", marginBottom:6 }}>At-Risk Structures</div>
                {analysis.at_risk_structures.map((s, i) => (
                  <div key={i} style={{ background:`${riskColor}10`, border:`1px solid ${riskColor}25`, borderRadius:6, padding:"5px 10px", fontSize:11, color:riskColor, fontWeight:600, marginBottom:4 }}>{s}</div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Row 2: Deviations + Protocol */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
          {analysis.deviations?.length > 0 && (
            <div style={{ ...glass(p), padding:24 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#94a3b8", marginBottom:14 }}>Detected Deviations</div>
              {analysis.deviations.map((d, i) => (
                <div key={i} style={{ marginBottom:12, padding:"10px 12px", borderRadius:10, background: d.severity==="SIGNIFICANT" ? "rgba(239,68,68,0.05)" : "rgba(245,158,11,0.05)", border:`1px solid ${d.severity==="SIGNIFICANT" ? "rgba(239,68,68,0.15)" : "rgba(245,158,11,0.15)"}` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                    <div style={{ fontSize:12, fontWeight:700, color:p.text }}>{d.deviation}</div>
                    <span style={{ fontSize:9, fontWeight:700, color: d.severity==="SIGNIFICANT" ? p.danger : p.warning }}>{d.severity}</span>
                  </div>
                  <div style={{ fontSize:11, color:p.textMid }}>{d.description}</div>
                </div>
              ))}
            </div>
          )}
          <div style={{ ...glass(p), padding:24 }}>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#94a3b8", marginBottom:14 }}>
              {analysis.mode === "Correction" ? "Correction Protocol" : "Learning Protocol"}
            </div>
            {analysis.improvement_points.map((pt, i) => (
              <div key={i} style={{ display:"flex", gap:12, marginBottom:12, alignItems:"flex-start" }}>
                <div style={{ width:24, height:24, borderRadius:"50%", background:p.grad, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, flexShrink:0 }}>{i+1}</div>
                <div style={{ fontSize:12, color:p.text, lineHeight:1.6, paddingTop:3 }}>{pt}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div style={{ ...glass(p), padding:28, marginBottom:16 }}>
          <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#94a3b8", marginBottom:12 }}>Clinical Summary</div>
          <p style={{ fontSize:13, color:p.text, lineHeight:1.8, margin:0 }}>{analysis.summary}</p>
        </div>

        {/* Reference Images */}
        {analysis.reference_images?.length > 0 && (
          <div style={{ ...glass(p), padding:28 }}>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#94a3b8", marginBottom:16 }}>Reference Images — {analysis.movement_pattern}</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:12 }}>
              {analysis.reference_images.map((img, i) => (
                <div key={i} style={{ borderRadius:12, overflow:"hidden", border:`1px solid ${p.border}` }}>
                  <img src={img.url} alt="reference" style={{ width:"100%", height:180, objectFit:"cover", display:"block" }} />
                  {img.photographer && <div style={{ padding:"6px 8px", fontSize:9, color:p.textMid }}>📷 {img.photographer}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PAGE 3B — PHYSIOTHERAPIST RESULT
// ─────────────────────────────────────────────
function PhysioResultPage({ analysis, onRestart }) {
  const p = PHYSIO_PALETTE;
  const risk = analysis.risk_level?.toUpperCase();
  const riskColor = risk === "HIGH" ? p.danger : risk === "MEDIUM" ? p.warning : p.success;
  const scoreColor = analysis.overall_score >= 8 ? p.success : analysis.overall_score >= 5 ? p.warning : p.danger;
  const circumference = 2 * Math.PI * 44;

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg, #f0fdf9 0%, #ecfdf5 40%, #f0f9ff 100%)", padding:"24px 20px 60px", fontFamily:"'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@700;800&display=swap'); * { box-sizing: border-box; }`}</style>

      <div style={{ maxWidth:960, margin:"0 auto" }}>
        {/* Header */}
        <div style={{ ...glass(p), padding:"20px 28px", marginBottom:20, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
              <span style={{ fontSize:22 }}>🩺</span>
              <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:24, margin:0, color:p.text }}>Clinical Assessment Report</h1>
            </div>
            <p style={{ fontSize:12, color:p.textMid, margin:0 }}>
              {analysis.sessionType} · {analysis.bodyRegion} · Phase: {analysis.rehabilitationPhase}
              {analysis._backendId && <span style={{ marginLeft:12, background:"rgba(8,145,178,0.12)", color:p.accent, padding:"2px 8px", borderRadius:6, fontSize:10, fontWeight:700 }}>💾 Saved: {analysis._backendId}</span>}
            </p>
          </div>
          <button onClick={onRestart} style={{ padding:"10px 20px", borderRadius:10, border:`1.5px solid ${p.border}`, background:"#fff", color:p.accent, fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans', sans-serif" }}>
            ↩ New Session
          </button>
        </div>

        {/* Row 1: Score + Patient Info + Risk */}
        <div style={{ display:"grid", gridTemplateColumns:"180px 1fr 240px", gap:16, marginBottom:16 }}>
          {/* Score */}
          <div style={{ ...glass(p), padding:24, textAlign:"center" }}>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#4b7280", marginBottom:14 }}>Functional Score</div>
            <svg width={90} height={90} style={{ display:"block", margin:"0 auto 10px" }}>
              <circle cx={45} cy={45} r={40} fill="none" stroke="#ccfbf1" strokeWidth={6} />
              <circle cx={45} cy={45} r={40} fill="none" stroke={scoreColor} strokeWidth={6}
                strokeDasharray={`${(analysis.overall_score/10)*(2*Math.PI*40)} ${2*Math.PI*40}`}
                strokeLinecap="round" transform="rotate(-90 45 45)" />
              <text x={45} y={45} textAnchor="middle" dominantBaseline="central" fontSize={20} fontWeight={800} fill={scoreColor}>{analysis.overall_score}</text>
            </svg>
            <div style={{ fontSize:10, color:"#4b7280" }}>/ 10</div>
            <div style={{ marginTop:10, fontSize:11, fontWeight:700, color:riskColor, background:`${riskColor}18`, borderRadius:8, padding:"4px 8px" }}>{risk} RISK</div>
            {analysis.symmetry_score && <div style={{ marginTop:8, fontSize:10, color:"#4b7280" }}>Symmetry: {analysis.symmetry_score}/10</div>}
          </div>

          {/* Patient / Clinical Info */}
          <div style={{ ...glass(p), padding:24 }}>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#4b7280", marginBottom:12 }}>Patient Profile</div>
            <div style={{ fontSize:13, color:p.text, marginBottom:10, lineHeight:1.5 }}><strong>Chief Complaint:</strong> {analysis.patientDescription || "Not specified"}</div>
            {analysis.clinicianNotes && <div style={{ fontSize:12, color:p.textMid, marginBottom:12 }}><strong>Clinician Notes:</strong> {analysis.clinicianNotes}</div>}
            <div style={{ fontSize:12, color:p.text, fontWeight:600, marginBottom:6 }}>Detected Movement: <span style={{ color:p.accent }}>{analysis.movement_pattern}</span></div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:10 }}>
              {(analysis.primary_muscles || []).map((m, i) => (
                <span key={i} style={{ background:p.tag, color:p.accent, border:`1px solid ${p.border}`, borderRadius:20, padding:"3px 10px", fontSize:11, fontWeight:600 }}>{m}</span>
              ))}
            </div>
            {analysis.reassessment_date && (
              <div style={{ marginTop:14, background:"rgba(8,145,178,0.06)", border:`1px solid ${p.border}`, borderRadius:8, padding:"8px 12px", fontSize:11, color:p.accent }}>
                📅 Recommended Reassessment: <strong>{analysis.reassessment_date}</strong>
              </div>
            )}
          </div>

          {/* Risk + Flags */}
          <div style={{ ...glass(p), padding:24, borderLeft:`3px solid ${riskColor}` }}>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#4b7280", marginBottom:10 }}>Clinical Flags</div>
            {analysis.clinical_flags?.red_flags?.filter(f => f).length > 0 && (
              <div style={{ marginBottom:12 }}>
                <div style={{ fontSize:10, fontWeight:700, color:p.danger, marginBottom:6 }}>🔴 Red Flags</div>
                {analysis.clinical_flags.red_flags.map((f, i) => <div key={i} style={{ fontSize:11, color:p.text, padding:"3px 0", borderBottom:`1px solid #fee2e2` }}>{f}</div>)}
              </div>
            )}
            {analysis.clinical_flags?.yellow_flags?.filter(f => f).length > 0 && (
              <div>
                <div style={{ fontSize:10, fontWeight:700, color:p.warning, marginBottom:6 }}>🟡 Yellow Flags</div>
                {analysis.clinical_flags.yellow_flags.map((f, i) => <div key={i} style={{ fontSize:11, color:p.text, padding:"3px 0" }}>{f}</div>)}
              </div>
            )}
            {analysis.at_risk_structures?.length > 0 && (
              <div style={{ marginTop:12 }}>
                <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#4b7280", marginBottom:6 }}>At-Risk Structures</div>
                {analysis.at_risk_structures.map((s, i) => <div key={i} style={{ fontSize:11, color:riskColor, fontWeight:600, marginBottom:3 }}>• {s}</div>)}
              </div>
            )}
          </div>
        </div>

        {/* ICF Framework */}
        {(analysis.icf_impairments || analysis.icf_activity_limitations || analysis.icf_participation_restrictions) && (
          <div style={{ ...glass(p), padding:28, marginBottom:16 }}>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#4b7280", marginBottom:16 }}>ICF Framework Analysis</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>
              {[
                { label:"Body Function / Structure", data: analysis.icf_impairments, color:"#7c3aed", bg:"rgba(124,58,237,0.06)" },
                { label:"Activity Limitations", data: analysis.icf_activity_limitations, color:p.warning, bg:"rgba(217,119,6,0.06)" },
                { label:"Participation Restrictions", data: analysis.icf_participation_restrictions, color:p.danger, bg:"rgba(220,38,38,0.06)" },
              ].map(({ label, data, color, bg }) => (
                <div key={label} style={{ background:bg, border:`1px solid ${color}25`, borderRadius:12, padding:16 }}>
                  <div style={{ fontSize:9, fontWeight:700, color, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:10 }}>{label}</div>
                  {(data || []).map((item, i) => <div key={i} style={{ fontSize:11, color:p.text, padding:"4px 0", borderBottom:`1px solid ${color}15` }}>{item}</div>)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Treatment Goals */}
        {analysis.treatment_goals && (
          <div style={{ ...glass(p), padding:28, marginBottom:16 }}>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#4b7280", marginBottom:16 }}>Treatment Goals</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              <div>
                <div style={{ fontSize:10, fontWeight:700, color:p.success, marginBottom:10 }}>SHORT-TERM (0–4 weeks)</div>
                {(analysis.treatment_goals.short_term || []).map((g, i) => (
                  <div key={i} style={{ display:"flex", gap:10, marginBottom:8, alignItems:"flex-start" }}>
                    <div style={{ width:20, height:20, borderRadius:"50%", background:p.success, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:800, flexShrink:0 }}>{i+1}</div>
                    <div style={{ fontSize:12, color:p.text, lineHeight:1.5, paddingTop:2 }}>{g}</div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize:10, fontWeight:700, color:p.accent, marginBottom:10 }}>LONG-TERM (4–12 weeks)</div>
                {(analysis.treatment_goals.long_term || []).map((g, i) => (
                  <div key={i} style={{ display:"flex", gap:10, marginBottom:8, alignItems:"flex-start" }}>
                    <div style={{ width:20, height:20, borderRadius:"50%", background:p.grad, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:800, flexShrink:0 }}>{i+1}</div>
                    <div style={{ fontSize:12, color:p.text, lineHeight:1.5, paddingTop:2 }}>{g}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* HEP */}
        {analysis.home_exercise_program?.length > 0 && (
          <div style={{ ...glass(p), padding:28, marginBottom:16 }}>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#4b7280", marginBottom:16 }}>Home Exercise Program (HEP)</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:14 }}>
              {analysis.home_exercise_program.map((ex, i) => (
                <div key={i} style={{ background:"rgba(8,145,178,0.04)", border:`1px solid ${p.border}`, borderRadius:12, padding:16 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:p.text, marginBottom:8 }}>{ex.exercise}</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:6, marginBottom:8 }}>
                    {[["Sets", ex.sets], ["Reps", ex.reps], ["Frequency", ex.frequency]].map(([l, v]) => (
                      <div key={l} style={{ textAlign:"center", background:"rgba(255,255,255,0.7)", borderRadius:8, padding:"6px 4px" }}>
                        <div style={{ fontSize:8, fontWeight:700, color:"#4b7280", textTransform:"uppercase", letterSpacing:"0.1em" }}>{l}</div>
                        <div style={{ fontSize:12, fontWeight:700, color:p.accent }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  {ex.rationale && <div style={{ fontSize:11, color:p.textMid, lineHeight:1.5 }}>📝 {ex.rationale}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Manual Therapy + Outcome Measures */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
          {analysis.manual_therapy_recommendations?.length > 0 && (
            <div style={{ ...glass(p), padding:24 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#4b7280", marginBottom:14 }}>Manual Therapy Recommendations</div>
              {analysis.manual_therapy_recommendations.map((r, i) => (
                <div key={i} style={{ display:"flex", gap:10, marginBottom:8, alignItems:"flex-start" }}>
                  <span style={{ color:p.accent, fontSize:13 }}>⚡</span>
                  <div style={{ fontSize:12, color:p.text, lineHeight:1.5 }}>{r}</div>
                </div>
              ))}
            </div>
          )}
          {analysis.outcome_measures?.length > 0 && (
            <div style={{ ...glass(p), padding:24 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#4b7280", marginBottom:14 }}>Recommended Outcome Measures</div>
              {analysis.outcome_measures.map((o, i) => (
                <div key={i} style={{ background:"rgba(8,145,178,0.06)", border:`1px solid ${p.border}`, borderRadius:8, padding:"7px 12px", marginBottom:6, fontSize:12, color:p.text, fontWeight:600 }}>
                  📊 {o}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Deviations */}
        {analysis.deviations?.length > 0 && (
          <div style={{ ...glass(p), padding:28, marginBottom:16 }}>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#4b7280", marginBottom:14 }}>Observed Deviations</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              {analysis.deviations.map((d, i) => (
                <div key={i} style={{ padding:"10px 14px", borderRadius:10, background: d.severity==="SIGNIFICANT" ? "rgba(220,38,38,0.05)" : "rgba(217,119,6,0.05)", border:`1px solid ${d.severity==="SIGNIFICANT" ? "rgba(220,38,38,0.15)" : "rgba(217,119,6,0.15)"}` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <div style={{ fontSize:12, fontWeight:700, color:p.text }}>{d.deviation}</div>
                    <span style={{ fontSize:9, fontWeight:700, color: d.severity==="SIGNIFICANT" ? p.danger : p.warning }}>{d.severity}</span>
                  </div>
                  <div style={{ fontSize:11, color:p.textMid }}>{d.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contraindications */}
        {analysis.contraindications?.filter(c => c).length > 0 && (
          <div style={{ ...glass(p), padding:24, marginBottom:16, borderLeft:`3px solid ${p.danger}` }}>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:p.danger, marginBottom:12 }}>⛔ Contraindications</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {analysis.contraindications.map((c, i) => (
                <span key={i} style={{ background:"rgba(220,38,38,0.08)", color:p.danger, border:"1px solid rgba(220,38,38,0.2)", borderRadius:8, padding:"5px 12px", fontSize:12, fontWeight:600 }}>{c}</span>
              ))}
            </div>
          </div>
        )}

        {/* Clinical Summary */}
        <div style={{ ...glass(p), padding:28, marginBottom:16 }}>
          <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#4b7280", marginBottom:12 }}>Clinical Summary</div>
          <p style={{ fontSize:13, color:p.text, lineHeight:1.9, margin:0 }}>{analysis.clinical_summary || analysis.summary}</p>
        </div>

        {/* Reference Images */}
        {analysis.reference_images?.length > 0 && (
          <div style={{ ...glass(p), padding:28 }}>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#4b7280", marginBottom:16 }}>Clinical Reference Images</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:12 }}>
              {analysis.reference_images.map((img, i) => (
                <div key={i} style={{ borderRadius:12, overflow:"hidden", border:`1px solid ${p.border}` }}>
                  <img src={img.url} alt="reference" style={{ width:"100%", height:180, objectFit:"cover", display:"block" }} />
                  {img.photographer && <div style={{ padding:"6px 8px", fontSize:9, color:p.textMid }}>📷 {img.photographer}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign:"center", marginTop:40, fontSize:11, color:"#94a3b8" }}>
          <p>⚕️ This clinical report is AI-generated and intended to assist physiotherapists only. Not a substitute for professional clinical judgment.</p>
          {analysis._backendId && <p style={{ color:p.accent }}>Session saved · ID: {analysis._backendId} · {analysis._savedAt}</p>}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("userType");
  const [userType, setUserType] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  return (
    <>
      {page === "userType" && (
        <UserTypePage onSelect={(type) => { setUserType(type); setPage("setup"); }} />
      )}

      {page === "setup" && userType === "athlete" && (
        <AthleteSetupPage
          onBack={() => setPage("userType")}
          onStart={(data) => { setSessionData(data); setPage("recording"); }}
        />
      )}

      {page === "setup" && userType === "physio" && (
        <PhysioSetupPage
          onBack={() => setPage("userType")}
          onStart={(data) => { setSessionData(data); setPage("recording"); }}
        />
      )}

      {page === "recording" && (
        <RecordingPage
          userType={userType}
          sessionData={sessionData}
          onFinish={(result) => { setAnalysis(result); setPage("result"); }}
        />
      )}

      {page === "result" && userType === "athlete" && (
        <AthleteResultPage
          analysis={analysis}
          onRestart={() => { setAnalysis(null); setPage("userType"); }}
        />
      )}

      {page === "result" && userType === "physio" && (
        <PhysioResultPage
          analysis={analysis}
          onRestart={() => { setAnalysis(null); setPage("userType"); }}
        />
      )}
    </>
  );
}