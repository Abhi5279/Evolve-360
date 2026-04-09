
// // import { useEffect, useRef, useState } from "react";

// // export default function HR() {
// //   const videoRef = useRef(null);
// //   const canvasRef = useRef(null);

// //   const [beats, setBeats] = useState(0);
// //   const [bpm, setBpm] = useState("--");
// //   const [status, setStatus] = useState("Press Start");
// //   const [seconds, setSeconds] = useState(0);
// //   const [running, setRunning] = useState(false);
// //   const [fingerPlaced, setFingerPlaced] = useState(false);

// //   const signalRef = useRef([]);
// //   const timeRef = useRef([]);
// //   const peakTimesRef = useRef([]);
// //   const startTimeRef = useRef(null);

// //   /* ------------------ SIGNAL HELPERS ------------------ */

// //   function extractSignal(frame) {
// //     const d = frame.data;
// //     let r = 0, g = 0, b = 0, c = 0;

// //     for (let i = 0; i < d.length; i += 4) {
// //       r += d[i];
// //       g += d[i + 1];
// //       b += d[i + 2];
// //       c++;
// //     }

// //     const avgR = r / c;
// //     const avgG = g / c;
// //     const avgB = b / c;

// //     const redDominance = avgR - (avgG + avgB) / 2;
// //     const fingerPresent = avgR > 150 && redDominance > 20;

// //     return { value: redDominance, fingerPresent };
// //   }

// //   function smoothSignal(signal, window = 5) {
// //     return signal.map((_, i) => {
// //       const start = Math.max(0, i - window);
// //       const slice = signal.slice(start, i + 1);
// //       return slice.reduce((a, b) => a + b, 0) / slice.length;
// //     });
// //   }

// //   function detectPeaks(signal, times) {
// //     const peaks = [];
// //     if (signal.length < 3) return peaks;

// //     const max = Math.max(...signal);
// //     const min = Math.min(...signal);
// //     const threshold = min + 0.6 * (max - min);

// //     for (let i = 1; i < signal.length - 1; i++) {
// //       if (
// //         signal[i] > threshold &&
// //         signal[i] > signal[i - 1] &&
// //         signal[i] > signal[i + 1]
// //       ) {
// //         if (
// //           peaks.length === 0 ||
// //           times[i] - peaks[peaks.length - 1] > 400
// //         ) {
// //           peaks.push(times[i]);
// //         }
// //       }
// //     }

// //     return peaks;
// //   }

// //   function calculateBPM(peakTimes) {
// //     if (peakTimes.length < 5) return null;

// //     const intervals = [];
// //     for (let i = 1; i < peakTimes.length; i++) {
// //       intervals.push((peakTimes[i] - peakTimes[i - 1]) / 1000);
// //     }

// //     const avg =
// //       intervals.reduce((a, b) => a + b, 0) / intervals.length;

// //     return Math.round(60 / avg);
// //   }

// //   function validateHR(bpm, finger) {
// //     if (!finger) return "Place finger properly";
// //     if (!bpm) return "Measuring…";
// //     if (bpm < 40 || bpm > 180) return "Unstable signal";
// //     return "Stable reading";
// //   }

// //   /* ------------------ CAMERA START ------------------ */

// //   async function start() {
// //     try {
// //       const stream = await navigator.mediaDevices.getUserMedia({
// //         video: { facingMode: "environment" },
// //       });

// //       videoRef.current.srcObject = stream;

// //       const track = stream.getVideoTracks()[0];
// //       if (track.getCapabilities?.().torch) {
// //         await track.applyConstraints({ advanced: [{ torch: true }] });
// //       }

// //       resetAll();
// //       setRunning(true);
// //       setStatus("Place finger on camera");
// //     } catch (err) {
// //       setStatus("Camera access denied");
// //     }
// //   }

// //   function stop() {
// //     setRunning(false);
// //     if (videoRef.current?.srcObject) {
// //       videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
// //     }
// //   }

// //   function resetAll() {
// //     signalRef.current = [];
// //     timeRef.current = [];
// //     peakTimesRef.current = [];
// //     startTimeRef.current = null;
// //     setBeats(0);
// //     setBpm("--");
// //     setSeconds(0);
// //     setFingerPlaced(false);
// //   }

// //   /* ------------------ MAIN LOOP ------------------ */

// //   useEffect(() => {
// //     if (!running) return;

// //     const interval = setInterval(() => {
// //       const video = videoRef.current;
// //       const canvas = canvasRef.current;
// //       if (!video || !canvas || video.readyState !== 4) return;

// //       const ctx = canvas.getContext("2d");
// //       canvas.width = video.videoWidth;
// //       canvas.height = video.videoHeight;
// //       ctx.drawImage(video, 0, 0);

// //       const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);

// //       const { value, fingerPresent } = extractSignal(frame);

// //       if (!fingerPresent) {
// //         resetAll();
// //         setStatus("Place finger on camera");
// //         return;
// //       }

// //       if (!fingerPlaced) {
// //         startTimeRef.current = Date.now();
// //         setFingerPlaced(true);
// //         setStatus("Measuring...");
// //       }

// //       signalRef.current.push(value);
// //       timeRef.current.push(Date.now());

// //       if (signalRef.current.length > 300) {
// //         signalRef.current.shift();
// //         timeRef.current.shift();
// //       }

// //       const smoothed = smoothSignal(signalRef.current);
// //       const peaks = detectPeaks(smoothed, timeRef.current);

// //       peakTimesRef.current = peaks;
// //       setBeats(peaks.length);

// //       const currentBPM = calculateBPM(peaks);
// //       if (currentBPM) setBpm(currentBPM);

// //       const elapsed = Math.floor(
// //         (Date.now() - startTimeRef.current) / 1000
// //       );
// //       setSeconds(elapsed);

// //       setStatus(validateHR(currentBPM, fingerPresent));

// //       if (elapsed >= 30) {
// //         stop();
// //         setStatus("Measurement complete");
// //       }
// //     }, 50);

// //     return () => clearInterval(interval);
// //   }, [running, fingerPlaced]);

// //   /* ------------------ UI ------------------ */

// //   return (
// //     <div style={{ textAlign: "center", padding: 20 }}>
// //       <h1>Heart Rate Monitor</h1>

// //       <video ref={videoRef} autoPlay playsInline width="260" />
// //       <canvas ref={canvasRef} style={{ display: "none" }} />

// //       <h3>Beats: {beats}</h3>
// //       <h2>Heart Rate: {bpm} BPM</h2>
// //       <p>Status: {status}</p>
// //       <p>Time: {seconds}s / 30s</p>

// //       {!running && <button onClick={start}>Start</button>}
// //     </div>
// //   );
// // }

// import { useEffect, useRef, useState } from "react";

// /* ─────────────────────────────────────────────
//    All colors from App.jsx :root CSS variables
//    --epa-bg, --epa-surface, --epa-gold, --epa-emerald,
//    --epa-emerald-bright, --epa-text, --epa-muted,
//    --epa-danger, --epa-border, --epa-serif, --epa-sans
// ───────────────────────────────────────────── */

// /* ── Injected keyframes ── */
// const KEYFRAMES = `
// @keyframes pulse-ring {
//   0%   { transform: scale(0.85); opacity: 0.8; }
//   50%  { transform: scale(1.15); opacity: 0.3; }
//   100% { transform: scale(0.85); opacity: 0.8; }
// }
// @keyframes ecg-scan {
//   0%   { transform: translateX(-100%); }
//   100% { transform: translateX(400%); }
// }
// @keyframes blink-dot {
//   0%, 100% { opacity: 1; }
//   50%       { opacity: 0.2; }
// }
// @keyframes shimmer {
//   0%   { background-position: -200% center; }
//   100% { background-position:  200% center; }
// }
// @keyframes count-up {
//   from { opacity: 0; transform: translateY(6px); }
//   to   { opacity: 1; transform: translateY(0); }
// }
// @keyframes fade-in {
//   from { opacity: 0; transform: translateY(12px); }
//   to   { opacity: 1; transform: translateY(0); }
// }
// @keyframes glow-pulse {
//   0%, 100% { box-shadow: 0 0 20px rgba(198,167,94,0.15); }
//   50%       { box-shadow: 0 0 40px rgba(198,167,94,0.35); }
// }
// `;

// /* ── History mock data: last 7 sessions ── */
// const HISTORY = [
//   { label: "Mon", bpm: 68, status: "Normal" },
//   { label: "Tue", bpm: 74, status: "Normal" },
//   { label: "Wed", bpm: 91, status: "Elevated" },
//   { label: "Thu", bpm: 65, status: "Normal" },
//   { label: "Fri", bpm: 72, status: "Normal" },
//   { label: "Sat", bpm: 88, status: "Elevated" },
//   { label: "Sun", bpm: 70, status: "Normal" },
// ];

// const ZONES = [
//   { label: "Rest",     range: "40–60",   color: "#4CAF85" },
//   { label: "Normal",   range: "60–100",  color: "var(--epa-gold)" },
//   { label: "Elevated", range: "100–140", color: "#e09a3a" },
//   { label: "High",     range: "140–180", color: "#e05555" },
// ];

// function getBpmZone(bpm) {
//   const n = Number(bpm);
//   if (isNaN(n))           return { label: "—",        color: "var(--epa-muted)" };
//   if (n < 60)             return { label: "Resting",   color: "#4CAF85" };
//   if (n < 100)            return { label: "Normal",    color: "var(--epa-gold)" };
//   if (n < 140)            return { label: "Elevated",  color: "#e09a3a" };
//   return                         { label: "High",      color: "#e05555" };
// }

// /* ── ECG SVG waveform (static decorative) ── */
// function ECGLine({ active, bpm }) {
//   const speed = bpm && bpm !== "--" ? Math.max(0.4, 1 - (bpm - 60) / 120) : 0.8;
//   const pts = "M0,40 L20,40 L25,10 L30,70 L35,40 L60,40 L65,20 L70,60 L75,40 L110,40 L115,5 L120,75 L125,40 L160,40";
//   return (
//     <div style={{ position: "relative", height: 80, overflow: "hidden", borderRadius: 8 }}>
//       {/* Grid lines */}
//       {[0,1,2,3,4].map(i => (
//         <div key={i} style={{ position: "absolute", top: `${i * 25}%`, left: 0, right: 0, height: 1, background: "rgba(198,167,94,0.06)" }} />
//       ))}
//       {[0,1,2,3,4,5,6,7].map(i => (
//         <div key={i} style={{ position: "absolute", left: `${i * 14.28}%`, top: 0, bottom: 0, width: 1, background: "rgba(198,167,94,0.06)" }} />
//       ))}

//       {/* Repeating SVG waveform */}
//       <svg viewBox="0 0 160 80" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: active ? 1 : 0.25, transition: "opacity 0.5s" }}>
//         <defs>
//           <linearGradient id="ecgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%" stopColor="var(--epa-gold)" stopOpacity="0" />
//             <stop offset="40%" stopColor="var(--epa-gold)" stopOpacity="1" />
//             <stop offset="100%" stopColor="var(--epa-gold)" stopOpacity="0.4" />
//           </linearGradient>
//           <filter id="ecgGlow">
//             <feGaussianBlur stdDeviation="1.5" result="blur" />
//             <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
//           </filter>
//         </defs>
//         <polyline points={pts} fill="none" stroke="url(#ecgGrad)" strokeWidth="1.5" filter="url(#ecgGlow)" />
//       </svg>

//       {/* Scan line */}
//       {active && (
//         <div style={{
//           position: "absolute", top: 0, bottom: 0, width: 2,
//           background: "linear-gradient(180deg, transparent, var(--epa-gold), transparent)",
//           animation: `ecg-scan ${speed * 2}s linear infinite`,
//           filter: "blur(1px)",
//         }} />
//       )}
//     </div>
//   );
// }

// /* ── Animated pulse orb ── */
// function PulseOrb({ active, bpm }) {
//   const zone = getBpmZone(bpm);
//   return (
//     <div style={{ position: "relative", width: 160, height: 160, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//       {/* Outer ring */}
//       {active && (
//         <>
//           <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `1px solid ${zone.color}`, opacity: 0.3, animation: "pulse-ring 1.8s ease-in-out infinite" }} />
//           <div style={{ position: "absolute", inset: 12, borderRadius: "50%", border: `1px solid ${zone.color}`, opacity: 0.2, animation: "pulse-ring 1.8s ease-in-out infinite 0.3s" }} />
//         </>
//       )}
//       {/* Core */}
//       <div style={{
//         width: 110, height: 110, borderRadius: "50%",
//         background: `radial-gradient(circle at 35% 35%, ${zone.color}22, ${zone.color}08)`,
//         border: `1.5px solid ${zone.color}55`,
//         display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
//         animation: active ? "glow-pulse 2s ease-in-out infinite" : "none",
//         transition: "border-color 0.5s, background 0.5s",
//       }}>
//         <span style={{ fontFamily: "var(--epa-serif)", fontSize: 32, fontWeight: 700, color: "var(--epa-text)", lineHeight: 1 }}>
//           {bpm}
//         </span>
//         <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--epa-muted)", marginTop: 4 }}>BPM</span>
//       </div>
//     </div>
//   );
// }

// /* ── Stat chip ── */
// function StatChip({ label, value, unit, color = "var(--epa-gold)" }) {
//   return (
//     <div style={{
//       background: "rgba(255,255,255,0.02)",
//       border: "1px solid rgba(198,167,94,0.12)",
//       borderRadius: "var(--epa-radius)",
//       padding: "14px 16px",
//       display: "flex", flexDirection: "column", gap: 4,
//     }}>
//       <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--epa-muted)" }}>{label}</span>
//       <span style={{ fontFamily: "var(--epa-serif)", fontSize: 22, fontWeight: 700, color, lineHeight: 1 }}>{value}</span>
//       {unit && <span style={{ fontSize: 10, color: "var(--epa-muted)" }}>{unit}</span>}
//     </div>
//   );
// }

// /* ── Weekly bar chart ── */
// function WeeklyChart() {
//   const max = Math.max(...HISTORY.map(h => h.bpm));
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//       <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--epa-muted)" }}>7-Day History</p>
//       <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80 }}>
//         {HISTORY.map((d, i) => {
//           const pct = (d.bpm / max) * 100;
//           const color = d.status === "Elevated" ? "#e09a3a" : "var(--epa-gold)";
//           return (
//             <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
//               <span style={{ fontSize: 9, color: "var(--epa-muted)", fontWeight: 600 }}>{d.bpm}</span>
//               <div style={{ width: "100%", height: `${pct}%`, background: `linear-gradient(180deg, ${color}, ${color}44)`, borderRadius: "3px 3px 0 0", minHeight: 8, transition: "height 0.5s ease" }} />
//               <span style={{ fontSize: 9, color: "var(--epa-muted)" }}>{d.label}</span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// /* ── Zone legend ── */
// function ZoneLegend() {
//   return (
//     <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
//       {ZONES.map(z => (
//         <div key={z.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: "var(--epa-radius)", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(198,167,94,0.08)" }}>
//           <div style={{ width: 8, height: 8, borderRadius: "50%", background: z.color, flexShrink: 0, boxShadow: `0 0 6px ${z.color}88` }} />
//           <div>
//             <p style={{ fontSize: 10, fontWeight: 700, color: "var(--epa-text)" }}>{z.label}</p>
//             <p style={{ fontSize: 9, color: "var(--epa-muted)" }}>{z.range} bpm</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    MAIN COMPONENT
// ───────────────────────────────────────────── */
// export default function HR() {
//   const videoRef  = useRef(null);
//   const canvasRef = useRef(null);

//   const [beats,        setBeats]        = useState(0);
//   const [bpm,          setBpm]          = useState("--");
//   const [status,       setStatus]       = useState("Ready to measure");
//   const [seconds,      setSeconds]      = useState(0);
//   const [running,      setRunning]      = useState(false);
//   const [fingerPlaced, setFingerPlaced] = useState(false);
//   const [complete,     setComplete]     = useState(false);

//   const signalRef    = useRef([]);
//   const timeRef      = useRef([]);
//   const peakTimesRef = useRef([]);
//   const startTimeRef = useRef(null);

//   const zone = getBpmZone(bpm);
//   const progress = Math.min(100, (seconds / 30) * 100);

//   /* ── Signal helpers ── */
//   function extractSignal(frame) {
//     const d = frame.data;
//     let r = 0, g = 0, b = 0, c = 0;
//     for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i+1]; b += d[i+2]; c++; }
//     const avgR = r/c, avgG = g/c, avgB = b/c;
//     const redDominance = avgR - (avgG+avgB)/2;
//     return { value: redDominance, fingerPresent: avgR > 150 && redDominance > 20 };
//   }

//   function smoothSignal(signal, window = 5) {
//     return signal.map((_, i) => {
//       const slice = signal.slice(Math.max(0, i-window), i+1);
//       return slice.reduce((a,b) => a+b, 0) / slice.length;
//     });
//   }

//   function detectPeaks(signal, times) {
//     const peaks = [];
//     if (signal.length < 3) return peaks;
//     const max = Math.max(...signal), min = Math.min(...signal);
//     const threshold = min + 0.6*(max-min);
//     for (let i = 1; i < signal.length-1; i++) {
//       if (signal[i] > threshold && signal[i] > signal[i-1] && signal[i] > signal[i+1]) {
//         if (peaks.length === 0 || times[i] - peaks[peaks.length-1] > 400) peaks.push(times[i]);
//       }
//     }
//     return peaks;
//   }

//   function calculateBPM(peakTimes) {
//     if (peakTimes.length < 5) return null;
//     const intervals = [];
//     for (let i = 1; i < peakTimes.length; i++) intervals.push((peakTimes[i]-peakTimes[i-1])/1000);
//     return Math.round(60 / (intervals.reduce((a,b) => a+b,0) / intervals.length));
//   }

//   function validateHR(bpm, finger) {
//     if (!finger) return "Place finger on lens";
//     if (!bpm)    return "Detecting pulse…";
//     if (bpm < 40 || bpm > 180) return "Unstable signal";
//     return "Stable reading";
//   }

//   /* ── Camera ── */
//   async function start() {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
//       videoRef.current.srcObject = stream;
//       const track = stream.getVideoTracks()[0];
//       if (track.getCapabilities?.().torch) await track.applyConstraints({ advanced: [{ torch: true }] });
//       resetAll();
//       setRunning(true);
//       setComplete(false);
//       setStatus("Place finger on lens");
//     } catch {
//       setStatus("Camera access denied");
//     }
//   }

//   function stop() {
//     setRunning(false);
//     if (videoRef.current?.srcObject) videoRef.current.srcObject.getTracks().forEach(t => t.stop());
//   }

//   function resetAll() {
//     signalRef.current = []; timeRef.current = []; peakTimesRef.current = [];
//     startTimeRef.current = null;
//     setBeats(0); setBpm("--"); setSeconds(0); setFingerPlaced(false); setComplete(false);
//   }

//   /* ── Main loop ── */
//   useEffect(() => {
//     if (!running) return;
//     const interval = setInterval(() => {
//       const video = videoRef.current, canvas = canvasRef.current;
//       if (!video || !canvas || video.readyState !== 4) return;

//       const ctx = canvas.getContext("2d");
//       canvas.width = video.videoWidth; canvas.height = video.videoHeight;
//       ctx.drawImage(video, 0, 0);

//       const { value, fingerPresent } = extractSignal(ctx.getImageData(0, 0, canvas.width, canvas.height));

//       if (!fingerPresent) { resetAll(); setStatus("Place finger on lens"); return; }

//       if (!fingerPlaced) { startTimeRef.current = Date.now(); setFingerPlaced(true); setStatus("Measuring…"); }

//       signalRef.current.push(value);
//       timeRef.current.push(Date.now());
//       if (signalRef.current.length > 300) { signalRef.current.shift(); timeRef.current.shift(); }

//       const smoothed = smoothSignal(signalRef.current);
//       const peaks    = detectPeaks(smoothed, timeRef.current);
//       peakTimesRef.current = peaks;
//       setBeats(peaks.length);

//       const currentBPM = calculateBPM(peaks);
//       if (currentBPM) setBpm(currentBPM);

//       const elapsed = Math.floor((Date.now()-startTimeRef.current)/1000);
//       setSeconds(elapsed);
//       setStatus(validateHR(currentBPM, fingerPresent));

//       if (elapsed >= 30) { stop(); setStatus("Measurement complete"); setComplete(true); }
//     }, 50);
//     return () => clearInterval(interval);
//   }, [running, fingerPlaced]);

//   return (
//     <>
//       <style>{KEYFRAMES}</style>
//       <video ref={videoRef} autoPlay playsInline style={{ display: "none" }} />
//       <canvas ref={canvasRef} style={{ display: "none" }} />

//       <div style={{
//         minHeight: "100vh",
//         background: "var(--epa-bg)",
//         color: "var(--epa-text)",
//         fontFamily: "var(--epa-sans)",
//         padding: "32px 16px",
//       }}>
//         <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24, animation: "fade-in 0.5s ease both" }}>

//           {/* ── HEADER ── */}
//           <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
//             <div>
//               <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--epa-gold)", marginBottom: 6 }}>Biometric Monitor</p>
//               <h1 style={{ fontFamily: "var(--epa-serif)", fontSize: 30, fontWeight: 700, color: "var(--epa-text)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>Heart Rate Analysis</h1>
//               <p style={{ fontSize: 12, color: "var(--epa-muted)", marginTop: 4 }}>Photoplethysmography · Camera Sensor · Real-time</p>
//             </div>

//             {/* Live indicator */}
//             <div style={{
//               display: "flex", alignItems: "center", gap: 8,
//               padding: "8px 16px", borderRadius: 99,
//               border: `1px solid ${running ? "rgba(76,175,133,0.4)" : "rgba(198,167,94,0.2)"}`,
//               background: running ? "rgba(14,59,50,0.5)" : "rgba(198,167,94,0.06)",
//             }}>
//               <span style={{ width: 7, height: 7, borderRadius: "50%", background: running ? "#4CAF85" : "var(--epa-muted)", animation: running ? "blink-dot 1s infinite" : "none" }} />
//               <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: running ? "#4CAF85" : "var(--epa-muted)" }}>
//                 {running ? "Live" : complete ? "Complete" : "Standby"}
//               </span>
//             </div>
//           </div>

//           {/* ── HERO ROW ── */}
//           <div style={{
//             display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16,
//           }}>

//             {/* LEFT: Camera + Controls */}
//             <div style={{
//               position: "relative",
//               borderRadius: "var(--epa-radius)",
//               border: "1px solid var(--epa-border)",
//               background: "var(--epa-surface)",
//               overflow: "hidden",
//               padding: 28,
//               display: "flex", flexDirection: "column", gap: 24,
//             }}>
//               {/* Gold top bar */}
//               <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--epa-gold), transparent)" }} />

//               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                 <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--epa-muted)" }}>Camera Sensor</p>
//                 <span style={{
//                   fontSize: 9, fontWeight: 700, padding: "3px 10px", borderRadius: 99,
//                   background: fingerPlaced ? "rgba(14,59,50,0.7)" : "rgba(198,167,94,0.08)",
//                   color: fingerPlaced ? "#4CAF85" : "var(--epa-muted)",
//                   border: `1px solid ${fingerPlaced ? "rgba(76,175,133,0.4)" : "rgba(198,167,94,0.15)"}`,
//                   textTransform: "uppercase", letterSpacing: "0.1em",
//                 }}>
//                   {fingerPlaced ? "Finger Detected" : "No Finger"}
//                 </span>
//               </div>

//               {/* Camera preview */}
//               <div style={{
//                 position: "relative",
//                 aspectRatio: "1",
//                 borderRadius: "var(--epa-radius)",
//                 background: "#0a0a0a",
//                 border: "1px solid rgba(198,167,94,0.15)",
//                 overflow: "hidden",
//                 display: "flex", alignItems: "center", justifyContent: "center",
//               }}>
//                 {running ? (
//                   <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                     {/* Simulated camera frame — the real video is hidden */}
//                     <div style={{ width: 80, height: 80, borderRadius: "50%", background: fingerPlaced ? "radial-gradient(circle, #c0302090, #6b000090)" : "radial-gradient(circle, #33333090, #11111090)", transition: "background 0.5s", animation: fingerPlaced && running ? "pulse-ring 1.2s ease-in-out infinite" : "none", border: "1px solid rgba(198,167,94,0.2)" }} />
//                     <div style={{ position: "absolute", top: 12, left: 12, right: 12, bottom: 12, border: "1px dashed rgba(198,167,94,0.2)", borderRadius: "var(--epa-radius)", pointerEvents: "none" }} />
//                     <div style={{ position: "absolute", top: 12, left: 12, width: 16, height: 16, borderTop: "2px solid var(--epa-gold)", borderLeft: "2px solid var(--epa-gold)", borderRadius: "2px 0 0 0" }} />
//                     <div style={{ position: "absolute", top: 12, right: 12, width: 16, height: 16, borderTop: "2px solid var(--epa-gold)", borderRight: "2px solid var(--epa-gold)", borderRadius: "0 2px 0 0" }} />
//                     <div style={{ position: "absolute", bottom: 12, left: 12, width: 16, height: 16, borderBottom: "2px solid var(--epa-gold)", borderLeft: "2px solid var(--epa-gold)", borderRadius: "0 0 0 2px" }} />
//                     <div style={{ position: "absolute", bottom: 12, right: 12, width: 16, height: 16, borderBottom: "2px solid var(--epa-gold)", borderRight: "2px solid var(--epa-gold)", borderRadius: "0 0 2px 0" }} />
//                   </div>
//                 ) : (
//                   <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
//                     <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.3 }}>
//                       <path d="M15 10l4.553-2.277A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" stroke="var(--epa-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                     <p style={{ fontSize: 11, color: "var(--epa-muted)" }}>Camera inactive</p>
//                   </div>
//                 )}
//               </div>

//               {/* Instruction */}
//               <div style={{
//                 padding: "12px 16px", borderRadius: "var(--epa-radius)",
//                 background: "rgba(198,167,94,0.05)",
//                 border: "1px solid rgba(198,167,94,0.12)",
//                 fontSize: 12, color: "var(--epa-muted)", lineHeight: 1.6,
//               }}>
//                 {running
//                   ? fingerPlaced
//                     ? "Hold your finger still on the rear camera. Keep steady for accurate results."
//                     : "Place your fingertip firmly over the rear camera lens. Cover it completely."
//                   : "Press Start to activate the rear camera. Cover lens with your fingertip."}
//               </div>

//               {/* Progress bar */}
//               {running && (
//                 <div>
//                   <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
//                     <span style={{ fontSize: 10, color: "var(--epa-muted)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Duration</span>
//                     <span style={{ fontSize: 11, fontWeight: 700, color: "var(--epa-text)" }}>{seconds}s / 30s</span>
//                   </div>
//                   <div style={{ height: 4, borderRadius: 99, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
//                     <div style={{ height: "100%", borderRadius: 99, width: `${progress}%`, background: "var(--epa-gold)", transition: "width 0.5s linear" }} />
//                   </div>
//                 </div>
//               )}

//               {/* Buttons */}
//               <div style={{ display: "flex", gap: 10 }}>
//                 {!running ? (
//                   <button onClick={start} style={{
//                     flex: 1, padding: "13px 0",
//                     borderRadius: "var(--epa-radius)",
//                     background: "var(--epa-gold)", color: "#111111",
//                     fontSize: 11, fontWeight: 700, fontFamily: "var(--epa-sans)",
//                     letterSpacing: "0.12em", textTransform: "uppercase",
//                     border: "none", cursor: "pointer",
//                     boxShadow: "0 4px 20px rgba(198,167,94,0.2)",
//                     transition: "background 0.2s",
//                   }}>
//                     Start Measurement
//                   </button>
//                 ) : (
//                   <button onClick={stop} style={{
//                     flex: 1, padding: "13px 0",
//                     borderRadius: "var(--epa-radius)",
//                     background: "rgba(92,26,26,0.5)", color: "#e05555",
//                     fontSize: 11, fontWeight: 700, fontFamily: "var(--epa-sans)",
//                     letterSpacing: "0.12em", textTransform: "uppercase",
//                     border: "1px solid rgba(92,26,26,0.8)", cursor: "pointer",
//                     transition: "background 0.2s",
//                   }}>
//                     Stop
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* RIGHT: Live data */}
//             <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

//               {/* BPM card */}
//               <div style={{
//                 borderRadius: "var(--epa-radius)",
//                 border: "1px solid var(--epa-border)",
//                 background: "var(--epa-surface)",
//                 overflow: "hidden",
//                 padding: 28,
//                 display: "flex", flexDirection: "column", gap: 20,
//                 flex: 1,
//               }}>
//                 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                   <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--epa-muted)" }}>Live Readings</p>
//                   <span style={{ fontSize: 10, fontWeight: 600, color: zone.color, letterSpacing: "0.08em", textTransform: "uppercase" }}>{zone.label}</span>
//                 </div>

//                 {/* Orb + stats */}
//                 <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
//                   <PulseOrb active={running && fingerPlaced} bpm={bpm} />
//                   <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
//                     <StatChip label="Beats Detected" value={beats} color={zone.color} />
//                     <StatChip label="Status" value={status.length > 16 ? status.slice(0,14)+"…" : status} color="var(--epa-muted)" />
//                   </div>
//                 </div>

//                 {/* ECG */}
//                 <div>
//                   <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--epa-muted)", marginBottom: 8 }}>Signal Waveform</p>
//                   <ECGLine active={running && fingerPlaced} bpm={bpm} />
//                 </div>

//                 {/* Status bar */}
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 8, borderTop: "1px solid rgba(198,167,94,0.08)" }}>
//                   <span style={{ fontSize: 11, color: "var(--epa-muted)" }}>
//                     {complete ? "✓ Session saved" : status}
//                   </span>
//                   <span style={{ fontSize: 10, color: complete ? "#4CAF85" : running ? "var(--epa-gold)" : "var(--epa-muted)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
//                     {complete ? "Complete" : running ? "Recording" : "Idle"}
//                   </span>
//                 </div>
//               </div>

//             </div>
//           </div>

//           {/* ── BOTTOM ROW: Charts + Zones + Stats ── */}
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>

//             {/* Weekly history */}
//             <div style={{
//               borderRadius: "var(--epa-radius)",
//               border: "1px solid var(--epa-border)",
//               background: "var(--epa-surface)",
//               padding: 24,
//             }}>
//               <WeeklyChart />
//             </div>

//             {/* Zones */}
//             <div style={{
//               borderRadius: "var(--epa-radius)",
//               border: "1px solid var(--epa-border)",
//               background: "var(--epa-surface)",
//               padding: 24,
//               display: "flex", flexDirection: "column", gap: 14,
//             }}>
//               <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--epa-muted)" }}>Heart Rate Zones</p>
//               <ZoneLegend />
//             </div>

//             {/* Session stats */}
//             <div style={{
//               borderRadius: "var(--epa-radius)",
//               border: "1px solid var(--epa-border)",
//               background: "var(--epa-surface)",
//               padding: 24,
//               display: "flex", flexDirection: "column", gap: 14,
//             }}>
//               <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--epa-muted)" }}>Session Info</p>
//               <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//                 {[
//                   { label: "Avg (7-day)",   value: "75 BPM",  color: "var(--epa-gold)" },
//                   { label: "Peak",          value: "91 BPM",  color: "#e09a3a" },
//                   { label: "Resting",       value: "65 BPM",  color: "#4CAF85" },
//                   { label: "Measurement",   value: "30 sec",  color: "var(--epa-muted)" },
//                 ].map(r => (
//                   <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, borderBottom: "1px solid rgba(198,167,94,0.07)" }}>
//                     <span style={{ fontSize: 11, color: "var(--epa-muted)" }}>{r.label}</span>
//                     <span style={{ fontSize: 13, fontWeight: 700, color: r.color, fontFamily: "var(--epa-serif)" }}>{r.value}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Accuracy hint */}
//               <div style={{ padding: "10px 12px", borderRadius: "var(--epa-radius)", background: "rgba(198,167,94,0.05)", border: "1px solid rgba(198,167,94,0.1)", fontSize: 11, color: "var(--epa-muted)", lineHeight: 1.5 }}>
//                 For best accuracy, hold still and ensure good lighting.
//               </div>
//             </div>

//           </div>

//         </div>
//       </div>
//     </>
//   );
// }

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   DESIGN TOKENS  (matches Profile / Nutrition theme)
───────────────────────────────────────────── */
const T = {
  gradBody:    "linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #eef2ff 100%)",
  gradPrimary: "linear-gradient(135deg, #2563eb, #6366f1, #7c3aed)",
  indigo:      "#6366f1",
  indigoDark:  "#4f46e5",
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
  warning:     "#f59e0b",
  danger:      "#f43f5e",
  r8: 8, r12: 12, r16: 16, r20: 20,
};

const glass = {
  background:           T.surface,
  backdropFilter:       "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border:               `1px solid ${T.borderLight}`,
  boxShadow:            T.shadowCard,
};

/* ─────────────────────────────────────────────
   KEYFRAMES
───────────────────────────────────────────── */
const KEYFRAMES = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

@keyframes pulse-ring {
  0%   { transform: scale(0.85); opacity: 0.8; }
  50%  { transform: scale(1.18); opacity: 0.25; }
  100% { transform: scale(0.85); opacity: 0.8; }
}
@keyframes ecg-scan {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}
@keyframes blink-dot {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.2; }
}
@keyframes fade-in {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes glow-pulse-indigo {
  0%, 100% { box-shadow: 0 0 20px rgba(99,102,241,0.18); }
  50%       { box-shadow: 0 0 42px rgba(99,102,241,0.38); }
}
`;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const HISTORY = [
  { label: "Mon", bpm: 68, status: "Normal" },
  { label: "Tue", bpm: 74, status: "Normal" },
  { label: "Wed", bpm: 91, status: "Elevated" },
  { label: "Thu", bpm: 65, status: "Normal" },
  { label: "Fri", bpm: 72, status: "Normal" },
  { label: "Sat", bpm: 88, status: "Elevated" },
  { label: "Sun", bpm: 70, status: "Normal" },
];

const ZONES = [
  { label: "Rest",     range: "40–60",   color: T.success },
  { label: "Normal",   range: "60–100",  color: T.indigo  },
  { label: "Elevated", range: "100–140", color: T.warning  },
  { label: "High",     range: "140–180", color: T.danger   },
];

function getBpmZone(bpm) {
  const n = Number(bpm);
  if (isNaN(n))  return { label: "—",        color: T.muted   };
  if (n < 60)    return { label: "Resting",   color: T.success };
  if (n < 100)   return { label: "Normal",    color: T.indigo  };
  if (n < 140)   return { label: "Elevated",  color: T.warning };
  return               { label: "High",      color: T.danger  };
}

/* ─────────────────────────────────────────────
   ECG LINE
───────────────────────────────────────────── */
function ECGLine({ active, bpm }) {
  const speed = bpm && bpm !== "--" ? Math.max(0.4, 1 - (bpm - 60) / 120) : 0.8;
  const pts = "M0,40 L20,40 L25,10 L30,70 L35,40 L60,40 L65,20 L70,60 L75,40 L110,40 L115,5 L120,75 L125,40 L160,40";
  return (
    <div style={{ position: "relative", height: 80, overflow: "hidden", borderRadius: T.r8, background: "rgba(238,242,255,0.4)", border: `1px solid ${T.borderSoft}` }}>
      {[0,1,2,3,4].map(i => (
        <div key={i} style={{ position: "absolute", top: `${i*25}%`, left: 0, right: 0, height: 1, background: "rgba(99,102,241,0.07)" }} />
      ))}
      {[0,1,2,3,4,5,6,7].map(i => (
        <div key={i} style={{ position: "absolute", left: `${i*14.28}%`, top: 0, bottom: 0, width: 1, background: "rgba(99,102,241,0.07)" }} />
      ))}
      <svg viewBox="0 0 160 80" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: active ? 1 : 0.2, transition: "opacity 0.5s" }}>
        <defs>
          <linearGradient id="ecgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={T.indigo} stopOpacity="0" />
            <stop offset="40%"  stopColor={T.indigo} stopOpacity="1" />
            <stop offset="100%" stopColor={T.violet} stopOpacity="0.4" />
          </linearGradient>
          <filter id="ecgGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <polyline points={pts} fill="none" stroke="url(#ecgGrad)" strokeWidth="1.8" filter="url(#ecgGlow)" />
      </svg>
      {active && (
        <div style={{
          position: "absolute", top: 0, bottom: 0, width: 2,
          background: `linear-gradient(180deg, transparent, ${T.indigo}, transparent)`,
          animation: `ecg-scan ${speed * 2}s linear infinite`,
          filter: "blur(1px)",
        }} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PULSE ORB
───────────────────────────────────────────── */
function PulseOrb({ active, bpm }) {
  const zone = getBpmZone(bpm);
  return (
    <div style={{ position: "relative", width: 160, height: 160, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {active && (
        <>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `1.5px solid ${zone.color}`, opacity: 0.3, animation: "pulse-ring 1.8s ease-in-out infinite" }} />
          <div style={{ position: "absolute", inset: 12, borderRadius: "50%", border: `1px solid ${zone.color}`, opacity: 0.15, animation: "pulse-ring 1.8s ease-in-out infinite 0.3s" }} />
        </>
      )}
      <div style={{
        width: 112, height: 112, borderRadius: "50%",
        background: `radial-gradient(circle at 35% 35%, ${zone.color}28, ${zone.color}08)`,
        border: `1.5px solid ${zone.color}55`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        animation: active ? "glow-pulse-indigo 2s ease-in-out infinite" : "none",
        transition: "border-color 0.5s, background 0.5s",
        boxShadow: active ? `0 0 32px ${zone.color}22` : "none",
      }}>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 34, fontWeight: 900, color: T.text, lineHeight: 1 }}>
          {bpm}
        </span>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.muted, marginTop: 4 }}>BPM</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STAT CHIP
───────────────────────────────────────────── */
function StatChip({ label, value, color = T.indigo }) {
  return (
    <div style={{
      ...glass,
      borderRadius: T.r12,
      padding: "14px 16px",
      display: "flex", flexDirection: "column", gap: 4,
    }}>
      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.muted }}>{label}</span>
      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 800, color, lineHeight: 1 }}>{value}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   WEEKLY BAR CHART
───────────────────────────────────────────── */
function WeeklyChart() {
  const max = Math.max(...HISTORY.map(h => h.bpm));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.muted }}>7-Day History</p>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80 }}>
        {HISTORY.map((d, i) => {
          const pct = (d.bpm / max) * 100;
          const color = d.status === "Elevated" ? T.warning : T.indigo;
          return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 9, color: T.muted, fontWeight: 600 }}>{d.bpm}</span>
              <div style={{
                width: "100%", height: `${pct}%`,
                background: `linear-gradient(180deg, ${color}, ${color}44)`,
                borderRadius: "4px 4px 0 0", minHeight: 8,
                transition: "height 0.5s ease",
                boxShadow: `0 2px 8px ${color}33`,
              }} />
              <span style={{ fontSize: 9, color: T.muted }}>{d.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ZONE LEGEND
───────────────────────────────────────────── */
function ZoneLegend() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
      {ZONES.map(z => (
        <div key={z.label} style={{
          display: "flex", alignItems: "center", gap: 9,
          padding: "10px 12px", borderRadius: T.r12,
          background: "rgba(238,242,255,0.5)", border: `1px solid ${T.borderSoft}`,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: z.color, flexShrink: 0, boxShadow: `0 0 7px ${z.color}99` }} />
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, color: T.text }}>{z.label}</p>
            <p style={{ fontSize: 9, color: T.muted }}>{z.range} bpm</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function HR() {
  const videoRef  = useRef(null);
  const canvasRef = useRef(null);

  const [beats,        setBeats]        = useState(0);
  const [bpm,          setBpm]          = useState("--");
  const [status,       setStatus]       = useState("Ready to measure");
  const [seconds,      setSeconds]      = useState(0);
  const [running,      setRunning]      = useState(false);
  const [fingerPlaced, setFingerPlaced] = useState(false);
  const [complete,     setComplete]     = useState(false);

  const signalRef    = useRef([]);
  const timeRef      = useRef([]);
  const peakTimesRef = useRef([]);
  const startTimeRef = useRef(null);

  const zone     = getBpmZone(bpm);
  const progress = Math.min(100, (seconds / 30) * 100);

  /* ── Signal helpers ── */
  function extractSignal(frame) {
    const d = frame.data;
    let r = 0, g = 0, b = 0, c = 0;
    for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i+1]; b += d[i+2]; c++; }
    const avgR = r/c, avgG = g/c, avgB = b/c;
    const redDominance = avgR - (avgG+avgB)/2;
    return { value: redDominance, fingerPresent: avgR > 150 && redDominance > 20 };
  }

  function smoothSignal(signal, window = 5) {
    return signal.map((_, i) => {
      const slice = signal.slice(Math.max(0, i-window), i+1);
      return slice.reduce((a,b) => a+b, 0) / slice.length;
    });
  }

  function detectPeaks(signal, times) {
    const peaks = [];
    if (signal.length < 3) return peaks;
    const max = Math.max(...signal), min = Math.min(...signal);
    const threshold = min + 0.6*(max-min);
    for (let i = 1; i < signal.length-1; i++) {
      if (signal[i] > threshold && signal[i] > signal[i-1] && signal[i] > signal[i+1]) {
        if (peaks.length === 0 || times[i] - peaks[peaks.length-1] > 400) peaks.push(times[i]);
      }
    }
    return peaks;
  }

  function calculateBPM(peakTimes) {
    if (peakTimes.length < 5) return null;
    const intervals = [];
    for (let i = 1; i < peakTimes.length; i++) intervals.push((peakTimes[i]-peakTimes[i-1])/1000);
    return Math.round(60 / (intervals.reduce((a,b) => a+b,0) / intervals.length));
  }

  function validateHR(bpm, finger) {
    if (!finger) return "Place finger on lens";
    if (!bpm)    return "Detecting pulse…";
    if (bpm < 40 || bpm > 180) return "Unstable signal";
    return "Stable reading";
  }

  async function start() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      videoRef.current.srcObject = stream;
      const track = stream.getVideoTracks()[0];
      if (track.getCapabilities?.().torch) await track.applyConstraints({ advanced: [{ torch: true }] });
      resetAll();
      setRunning(true);
      setComplete(false);
      setStatus("Place finger on lens");
    } catch {
      setStatus("Camera access denied");
    }
  }

  function stop() {
    setRunning(false);
    if (videoRef.current?.srcObject) videoRef.current.srcObject.getTracks().forEach(t => t.stop());
  }

  function resetAll() {
    signalRef.current = []; timeRef.current = []; peakTimesRef.current = [];
    startTimeRef.current = null;
    setBeats(0); setBpm("--"); setSeconds(0); setFingerPlaced(false); setComplete(false);
  }

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      const video = videoRef.current, canvas = canvasRef.current;
      if (!video || !canvas || video.readyState !== 4) return;
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth; canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      const { value, fingerPresent } = extractSignal(ctx.getImageData(0, 0, canvas.width, canvas.height));
      if (!fingerPresent) { resetAll(); setStatus("Place finger on lens"); return; }
      if (!fingerPlaced) { startTimeRef.current = Date.now(); setFingerPlaced(true); setStatus("Measuring…"); }
      signalRef.current.push(value);
      timeRef.current.push(Date.now());
      if (signalRef.current.length > 300) { signalRef.current.shift(); timeRef.current.shift(); }
      const smoothed = smoothSignal(signalRef.current);
      const peaks    = detectPeaks(smoothed, timeRef.current);
      peakTimesRef.current = peaks;
      setBeats(peaks.length);
      const currentBPM = calculateBPM(peaks);
      if (currentBPM) setBpm(currentBPM);
      const elapsed = Math.floor((Date.now()-startTimeRef.current)/1000);
      setSeconds(elapsed);
      setStatus(validateHR(currentBPM, fingerPresent));
      if (elapsed >= 30) { stop(); setStatus("Measurement complete"); setComplete(true); }
    }, 50);
    return () => clearInterval(interval);
  }, [running, fingerPlaced]);

  return (
    <>
      <style>{KEYFRAMES}</style>
      <video ref={videoRef} autoPlay playsInline style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Fixed background blobs */}
      <div style={{ position: "fixed", top: -120, right: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(99,102,241,0.07)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: -100, left: "20%", width: 300, height: 300, borderRadius: "50%", background: "rgba(124,58,237,0.05)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{
        minHeight: "100vh",
        background: T.gradBody,
        color: T.text,
        fontFamily: "'Outfit', sans-serif",
        padding: "36px 20px 60px",
        position: "relative", zIndex: 1,
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24, animation: "fade-in 0.5s ease both" }}>

          {/* ── HEADER ── */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.indigo, marginBottom: 6 }}>◆ Biometric Monitor</p>
              <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 30, fontWeight: 800, color: T.text, letterSpacing: "-0.02em", lineHeight: 1.1 }}>Heart Rate Analysis</h1>
              <p style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>Photoplethysmography · Camera Sensor · Real-time</p>
            </div>

            {/* Live indicator */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 18px", borderRadius: 99,
              border: `1px solid ${running ? "rgba(34,197,94,0.35)" : T.borderSoft}`,
              background: running ? "rgba(34,197,94,0.08)" : "rgba(238,242,255,0.6)",
              ...glass,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: running ? T.success : T.muted, animation: running ? "blink-dot 1s infinite" : "none" }} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: running ? T.success : T.muted }}>
                {running ? "Live" : complete ? "Complete" : "Standby"}
              </span>
            </div>
          </div>

          {/* ── HERO ROW ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

            {/* LEFT: Camera + Controls */}
            <div style={{
              ...glass,
              position: "relative",
              borderRadius: T.r20,
              overflow: "hidden",
              padding: 28,
              display: "flex", flexDirection: "column", gap: 22,
            }}>
              {/* Gradient top line */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: T.gradPrimary, opacity: 0.7 }} />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.muted }}>Camera Sensor</p>
                <span style={{
                  fontSize: 9, fontWeight: 700, padding: "3px 10px", borderRadius: 99,
                  background: fingerPlaced ? "rgba(34,197,94,0.1)" : "rgba(238,242,255,0.6)",
                  color: fingerPlaced ? T.success : T.muted,
                  border: `1px solid ${fingerPlaced ? "rgba(34,197,94,0.3)" : T.borderSoft}`,
                  textTransform: "uppercase", letterSpacing: "0.1em",
                }}>
                  {fingerPlaced ? "Finger Detected" : "No Finger"}
                </span>
              </div>

              {/* Camera preview */}
              <div style={{
                position: "relative", aspectRatio: "1",
                borderRadius: T.r16,
                background: "rgba(238,242,255,0.4)",
                border: `1px solid ${T.borderSoft}`,
                overflow: "hidden",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {running ? (
                  <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{
                      width: 80, height: 80, borderRadius: "50%",
                      background: fingerPlaced
                        ? `radial-gradient(circle, ${T.indigo}55, ${T.violet}33)`
                        : `radial-gradient(circle, rgba(226,232,240,0.5), rgba(241,245,249,0.3))`,
                      transition: "background 0.5s",
                      animation: fingerPlaced && running ? "pulse-ring 1.2s ease-in-out infinite" : "none",
                      border: `1.5px solid ${fingerPlaced ? T.indigo : T.borderSoft}`,
                      boxShadow: fingerPlaced ? `0 0 32px ${T.indigo}44` : "none",
                    }} />
                    {/* Corner brackets */}
                    <div style={{ position: "absolute", top: 12, left: 12, right: 12, bottom: 12, border: `1px dashed rgba(99,102,241,0.2)`, borderRadius: T.r12, pointerEvents: "none" }} />
                    {[
                      { top:12,  left:12,  borderTop:`2px solid ${T.indigo}`, borderLeft:`2px solid ${T.indigo}`,   borderRadius:"4px 0 0 0" },
                      { top:12,  right:12, borderTop:`2px solid ${T.indigo}`, borderRight:`2px solid ${T.indigo}`,  borderRadius:"0 4px 0 0" },
                      { bottom:12, left:12,  borderBottom:`2px solid ${T.indigo}`, borderLeft:`2px solid ${T.indigo}`,   borderRadius:"0 0 0 4px" },
                      { bottom:12, right:12, borderBottom:`2px solid ${T.indigo}`, borderRight:`2px solid ${T.indigo}`,  borderRadius:"0 0 4px 0" },
                    ].map((s, i) => (
                      <div key={i} style={{ position: "absolute", width: 16, height: 16, ...s }} />
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.25 }}>
                      <path d="M15 10l4.553-2.277A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" stroke={T.indigo} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p style={{ fontSize: 11, color: T.muted }}>Camera inactive</p>
                  </div>
                )}
              </div>

              {/* Instruction */}
              <div style={{
                padding: "12px 16px", borderRadius: T.r12,
                background: "rgba(238,242,255,0.6)",
                border: `1px solid ${T.borderSoft}`,
                fontSize: 12, color: T.textMid, lineHeight: 1.65,
              }}>
                {running
                  ? fingerPlaced
                    ? "Hold your finger still on the rear camera. Keep steady for accurate results."
                    : "Place your fingertip firmly over the rear camera lens. Cover it completely."
                  : "Press Start to activate the rear camera. Cover lens with your fingertip."}
              </div>

              {/* Progress bar */}
              {running && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                    <span style={{ fontSize: 10, color: T.muted, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Duration</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: T.text }}>{seconds}s / 30s</span>
                  </div>
                  <div style={{ height: 5, borderRadius: 99, background: "rgba(226,232,240,0.8)", overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 99, width: `${progress}%`, background: T.gradPrimary, transition: "width 0.5s linear" }} />
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div style={{ display: "flex", gap: 10 }}>
                {!running ? (
                  <button onClick={start} style={{
                    flex: 1, padding: "13px 0",
                    borderRadius: T.r12,
                    background: T.gradPrimary, color: "white",
                    fontSize: 11, fontWeight: 700, fontFamily: "'Outfit', sans-serif",
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    border: "none", cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(99,102,241,0.30)",
                    transition: "opacity 0.2s",
                  }}>
                    Start Measurement
                  </button>
                ) : (
                  <button onClick={stop} style={{
                    flex: 1, padding: "13px 0",
                    borderRadius: T.r12,
                    background: "rgba(244,63,94,0.1)", color: T.danger,
                    fontSize: 11, fontWeight: 700, fontFamily: "'Outfit', sans-serif",
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    border: `1.5px solid rgba(244,63,94,0.3)`, cursor: "pointer",
                    transition: "background 0.2s",
                  }}>
                    Stop
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT: Live data */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{
                ...glass,
                borderRadius: T.r20,
                overflow: "hidden",
                padding: 28,
                display: "flex", flexDirection: "column", gap: 20,
                flex: 1,
                position: "relative",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: T.gradPrimary, opacity: 0.7 }} />

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.muted }}>Live Readings</p>
                  <span style={{
                    fontSize: 10, fontWeight: 700, color: zone.color,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    padding: "3px 10px", borderRadius: 99,
                    background: `${zone.color}18`,
                    border: `1px solid ${zone.color}44`,
                  }}>
                    {zone.label}
                  </span>
                </div>

                {/* Orb + stats */}
                <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                  <PulseOrb active={running && fingerPlaced} bpm={bpm} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                    <StatChip label="Beats Detected" value={beats} color={zone.color} />
                    <StatChip label="Status" value={status.length > 16 ? status.slice(0,14)+"…" : status} color={T.textMid} />
                  </div>
                </div>

                {/* ECG */}
                <div>
                  <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.muted, marginBottom: 8 }}>Signal Waveform</p>
                  <ECGLine active={running && fingerPlaced} bpm={bpm} />
                </div>

                {/* Status bar */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, borderTop: `1px solid ${T.borderSoft}` }}>
                  <span style={{ fontSize: 11, color: T.muted }}>
                    {complete ? "✓ Session saved" : status}
                  </span>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                    color: complete ? T.success : running ? T.indigo : T.muted,
                  }}>
                    {complete ? "Complete" : running ? "Recording" : "Idle"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── BOTTOM ROW ── */}
        

        </div>
      </div>
    </>
  );
}