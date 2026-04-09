// // import { Link, useLocation } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";

// // export default function Sidebar() {
// //   const { logout } = useAuth();
// //   const location = useLocation();

// //   const navItems = [
// //     { name: "Dashboard", path: "/dashboard" },
// //     { name: "Workout", path: "/workout" },
// //     { name: "Readiness", path: "/readiness" },
// //     { name: "Nutrition", path: "/nutrition" },
// //     { name: "APS", path: "/aps" },
// //   ];

// //   return (
// //     <div className="w-64 min-h-screen bg-[var(--color-bg-soft)] border-r border-[var(--color-border-soft)] p-6">

// //       <h2 className="text-xl font-bold mb-10">
// //         AdaptiveAI
// //       </h2>

// //       <nav className="space-y-3">
// //         {navItems.map((item) => (
// //           <Link
// //             key={item.path}
// //             to={item.path}
// //             className={`block px-4 py-2 rounded-lg transition 
// //               ${
// //                 location.pathname === item.path
// //                   ? "bg-[var(--color-primary)] text-white"
// //                   : "hover:bg-[var(--color-bg-main)]"
// //               }`}
// //           >
// //             {item.name}
// //           </Link>
// //         ))}
// //       </nav>

// //       <button
// //         onClick={logout}
// //         className="btn-outline mt-10 w-full"
// //       >
// //         Logout
// //       </button>

// //     </div>
// //   );
// // }


// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// // ── Icons (inline SVG so no extra dep needed) ──
// const icons = {
//   Dashboard:   "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
//   Workout:     "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064",
//   Readiness:   "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
//   Nutrition:   "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
//   APS:         "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
//   "APS History":"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
//   "HR Monitor":"M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
//   "Posture AI":"M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
// };

// function Icon({ path, size = 18 }) {
//   return (
//     <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
//       stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
//       {path.split("M").filter(Boolean).map((d, i) => (
//         <path key={i} d={"M" + d} />
//       ))}
//     </svg>
//   );
// }

// const mainNav = [
//   { name: "Dashboard",  path: "/dashboard" },
//   { name: "Workout",    path: "/workout" },
//   { name: "Readiness",  path: "/readiness" },
//   { name: "Nutrition",  path: "/nutrition" },
//   { name: "APS",        path: "/aps" },
// ];

// const toolsNav = [
//   { name: "APS History", path: "/aps-history" },
//   { name: "HR Monitor",  path: "/hr" },
//   { name: "Posture AI",  path: "/posture" },
// ];

// export default function Sidebar() {
//   const { logout } = useAuth();
//   const location   = useLocation();
//   const [collapsed, setCollapsed] = useState(false);

//   const isActive = (path) => location.pathname === path;

//   return (
//     <>
//       <style>{`
//         @keyframes fadeIn { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }
//         .sb-label { animation: fadeIn 0.2s ease forwards; }
//         @keyframes blob1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(6px,8px) scale(1.04)} }
//         @keyframes blob2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-5px,-6px) scale(1.03)} }
//         .sb-item:hover .sb-icon-wrap { box-shadow: 0 0 0 6px rgba(99,102,241,0.1); }
//         .sb-item:hover { background: rgba(99,102,241,0.07) !important; }
//         .sb-logout:hover { background: rgba(239,68,68,0.08) !important; color: #ef4444 !important; border-color: rgba(239,68,68,0.25) !important; }
//         .sb-collapse:hover { background: rgba(99,102,241,0.12) !important; }
//       `}</style>

//       <div style={{
//         width:           collapsed ? 72 : 240,
//         minHeight:       "100vh",
//         background:      "rgba(255,255,255,0.82)",
//         backdropFilter:  "blur(20px)",
//         WebkitBackdropFilter: "blur(20px)",
//         borderRight:     "1px solid rgba(99,102,241,0.1)",
//         boxShadow:       "4px 0 24px rgba(99,102,241,0.06)",
//         display:         "flex",
//         flexDirection:   "column",
//         padding:         collapsed ? "24px 12px" : "28px 16px",
//         position:        "relative",
//         overflow:        "hidden",
//         transition:      "width 0.28s cubic-bezier(0.4,0,0.2,1), padding 0.28s ease",
//         fontFamily:      "'Outfit', sans-serif",
//         flexShrink:      0,
//         zIndex:          50,
//       }}>

//         {/* Blobs */}
//         <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"160px", height:"160px",
//           borderRadius:"50%", background:"#c4b5fd", mixBlendMode:"multiply",
//           filter:"blur(50px)", opacity:0.2, pointerEvents:"none",
//           animation:"blob1 7s ease-in-out infinite" }} />
//         <div style={{ position:"absolute", bottom:"-40px", left:"-40px", width:"130px", height:"130px",
//           borderRadius:"50%", background:"#93c5fd", mixBlendMode:"multiply",
//           filter:"blur(45px)", opacity:0.18, pointerEvents:"none",
//           animation:"blob2 9s ease-in-out infinite" }} />

//         {/* Header */}
//         <div style={{ display:"flex", alignItems:"center", justifyContent: collapsed ? "center" : "space-between",
//           marginBottom: 32, position:"relative" }}>
//           {!collapsed && (
//             <div className="sb-label">
//               <span style={{ fontSize:"1.1rem", fontWeight:800, color:"#0f172a", letterSpacing:"-0.01em" }}>Adaptive</span>
//               <span style={{ fontSize:"1.1rem", fontWeight:800,
//                 background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
//                 WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>AI</span>
//             </div>
//           )}
//           {collapsed && (
//             <div style={{ width:34, height:34, borderRadius:10,
//               background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
//               display:"flex", alignItems:"center", justifyContent:"center",
//               boxShadow:"0 2px 10px rgba(99,102,241,0.35)", cursor:"pointer" }}
//               onClick={() => setCollapsed(false)}>
//               <span style={{ color:"white", fontWeight:800, fontSize:14 }}>A</span>
//             </div>
//           )}
//           {!collapsed && (
//             <button className="sb-collapse"
//               onClick={() => setCollapsed(true)}
//               title="Collapse sidebar"
//               style={{ width:28, height:28, borderRadius:8, border:"1px solid rgba(99,102,241,0.15)",
//                 background:"rgba(238,242,255,0.6)", cursor:"pointer",
//                 display:"flex", alignItems:"center", justifyContent:"center",
//                 color:"#6366f1", transition:"all 0.2s", flexShrink:0 }}>
//               <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
//                 <path d="M15 18l-6-6 6-6"/>
//               </svg>
//             </button>
//           )}
//         </div>

//         {/* Expand button when collapsed */}
//         {collapsed && (
//           <button className="sb-collapse"
//             onClick={() => setCollapsed(false)}
//             title="Expand sidebar"
//             style={{ width:34, height:34, borderRadius:10, border:"1px solid rgba(99,102,241,0.15)",
//               background:"rgba(238,242,255,0.6)", cursor:"pointer",
//               display:"flex", alignItems:"center", justifyContent:"center",
//               color:"#6366f1", transition:"all 0.2s", marginBottom:24, alignSelf:"center" }}>
//             <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
//               <path d="M9 18l6-6-6-6"/>
//             </svg>
//           </button>
//         )}

//         {/* Main Nav */}
//         {!collapsed && (
//           <p className="sb-label" style={{ fontSize:9, fontWeight:700, letterSpacing:"0.18em",
//             textTransform:"uppercase", color:"#94a3b8", marginBottom:10, paddingLeft:4 }}>
//             Main
//           </p>
//         )}
//         <nav style={{ display:"flex", flexDirection:"column", gap:4 }}>
//           {mainNav.map((item) => {
//             const active = isActive(item.path);
//             return (
//               <Link key={item.path} to={item.path} className="sb-item"
//                 title={collapsed ? item.name : undefined}
//                 style={{ display:"flex", alignItems:"center", gap:10,
//                   padding: collapsed ? "10px" : "10px 12px",
//                   borderRadius:12, textDecoration:"none", transition:"all 0.18s",
//                   justifyContent: collapsed ? "center" : "flex-start",
//                   background: active
//                     ? "linear-gradient(135deg,rgba(99,102,241,0.12),rgba(139,92,246,0.08))"
//                     : "transparent",
//                   border: active ? "1px solid rgba(99,102,241,0.2)" : "1px solid transparent",
//                   color: active ? "#6366f1" : "#64748b",
//                   boxShadow: active ? "0 2px 8px rgba(99,102,241,0.1)" : "none",
//                 }}>
//                 <div className="sb-icon-wrap" style={{ width:30, height:30, borderRadius:8, flexShrink:0,
//                   display:"flex", alignItems:"center", justifyContent:"center",
//                   background: active ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "rgba(148,163,184,0.1)",
//                   color: active ? "white" : "#94a3b8",
//                   boxShadow: active ? "0 2px 8px rgba(99,102,241,0.3)" : "none",
//                   transition:"all 0.2s" }}>
//                   <Icon path={icons[item.name]} size={15} />
//                 </div>
//                 {!collapsed && (
//                   <span className="sb-label" style={{ fontSize:13, fontWeight: active ? 700 : 500,
//                     whiteSpace:"nowrap", letterSpacing:"0.01em" }}>
//                     {item.name}
//                   </span>
//                 )}
//                 {!collapsed && active && (
//                   <div style={{ marginLeft:"auto", width:6, height:6, borderRadius:"50%",
//                     background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
//                     boxShadow:"0 0 6px rgba(99,102,241,0.5)" }} />
//                 )}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Divider */}
//         <div style={{ height:1, background:"rgba(99,102,241,0.1)", margin:"18px 4px" }} />

//         {/* Tools Nav */}
//         {!collapsed && (
//           <p className="sb-label" style={{ fontSize:9, fontWeight:700, letterSpacing:"0.18em",
//             textTransform:"uppercase", color:"#94a3b8", marginBottom:10, paddingLeft:4 }}>
//             Tools & Analytics
//           </p>
//         )}
//         <nav style={{ display:"flex", flexDirection:"column", gap:4 }}>
//           {toolsNav.map((item) => {
//             const active = isActive(item.path);
//             const toolColors = {
//               "APS History": { grad:"linear-gradient(135deg,#10b981,#059669)", glow:"rgba(16,185,129,0.3)", activeBg:"rgba(16,185,129,0.08)", activeBorder:"rgba(16,185,129,0.2)", activeText:"#10b981" },
//               "HR Monitor":  { grad:"linear-gradient(135deg,#ef4444,#f97316)", glow:"rgba(239,68,68,0.3)",  activeBg:"rgba(239,68,68,0.08)",  activeBorder:"rgba(239,68,68,0.2)",  activeText:"#ef4444" },
//               "Posture AI":  { grad:"linear-gradient(135deg,#6366f1,#8b5cf6)", glow:"rgba(99,102,241,0.3)", activeBg:"rgba(99,102,241,0.08)", activeBorder:"rgba(99,102,241,0.2)", activeText:"#6366f1" },
//             };
//             const tc = toolColors[item.name];
//             return (
//               <Link key={item.path} to={item.path} className="sb-item"
//                 title={collapsed ? item.name : undefined}
//                 style={{ display:"flex", alignItems:"center", gap:10,
//                   padding: collapsed ? "10px" : "10px 12px",
//                   borderRadius:12, textDecoration:"none", transition:"all 0.18s",
//                   justifyContent: collapsed ? "center" : "flex-start",
//                   background: active ? tc.activeBg : "transparent",
//                   border: active ? `1px solid ${tc.activeBorder}` : "1px solid transparent",
//                   color: active ? tc.activeText : "#64748b",
//                   boxShadow: active ? `0 2px 8px ${tc.glow}20` : "none",
//                 }}>
//                 <div className="sb-icon-wrap" style={{ width:30, height:30, borderRadius:8, flexShrink:0,
//                   display:"flex", alignItems:"center", justifyContent:"center",
//                   background: active ? tc.grad : "rgba(148,163,184,0.1)",
//                   color: active ? "white" : "#94a3b8",
//                   boxShadow: active ? `0 2px 8px ${tc.glow}` : "none",
//                   transition:"all 0.2s" }}>
//                   <Icon path={icons[item.name]} size={15} />
//                 </div>
//                 {!collapsed && (
//                   <span className="sb-label" style={{ fontSize:13, fontWeight: active ? 700 : 500,
//                     whiteSpace:"nowrap", letterSpacing:"0.01em" }}>
//                     {item.name}
//                   </span>
//                 )}
//                 {!collapsed && active && (
//                   <div style={{ marginLeft:"auto", width:6, height:6, borderRadius:"50%",
//                     background: tc.grad, boxShadow:`0 0 6px ${tc.glow}` }} />
//                 )}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Spacer */}
//         <div style={{ flex:1 }} />

//         {/* User + Logout */}
//         <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
//           {!collapsed && (
//             <div className="sb-label" style={{ background:"rgba(238,242,255,0.6)", border:"1px solid #e0e7ff",
//               borderRadius:12, padding:"10px 12px", display:"flex", alignItems:"center", gap:10 }}>
//               <div style={{ width:30, height:30, borderRadius:"50%",
//                 background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
//                 display:"flex", alignItems:"center", justifyContent:"center",
//                 color:"white", fontSize:13, fontWeight:700, flexShrink:0 }}>
//                 U
//               </div>
//               <div style={{ minWidth:0 }}>
//                 <p style={{ fontSize:12, fontWeight:700, color:"#0f172a", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>User</p>
//                 <p style={{ fontSize:10, color:"#94a3b8", letterSpacing:"0.06em", textTransform:"uppercase" }}>Active Session</p>
//               </div>
//             </div>
//           )}

//           <button onClick={logout} className="sb-logout"
//             title={collapsed ? "Logout" : undefined}
//             style={{ width:"100%", padding: collapsed ? "10px" : "10px 12px",
//               borderRadius:12, border:"1px solid rgba(148,163,184,0.25)",
//               background:"rgba(148,163,184,0.06)", color:"#94a3b8",
//               cursor:"pointer", fontFamily:"'Outfit', sans-serif",
//               fontSize:12, fontWeight:600, letterSpacing:"0.04em",
//               display:"flex", alignItems:"center", justifyContent: collapsed ? "center" : "flex-start",
//               gap:8, transition:"all 0.2s" }}>
//             <div style={{ width:28, height:28, borderRadius:8, flexShrink:0,
//               display:"flex", alignItems:"center", justifyContent:"center" }}>
//               <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
//               </svg>
//             </div>
//             {!collapsed && <span>Logout</span>}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/* ─────────────────────────────────────────────
   ICON RENDERER
───────────────────────────────────────────── */
function Icon({ path, size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round">
      {path.split("M").filter(Boolean).map((d, i) => (
        <path key={i} d={"M" + d} />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   NAV DATA
───────────────────────────────────────────── */
const coreNav = [
  //   { name: "Dashboard",   path: "/dashboard",
  //     icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  //   { name: "Workout",     path: "/workout",
  //     icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" },
  //   { name: "Readiness",   path: "/readiness",
  //     icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  //   { name: "Nutrition",   path: "/nutrition",
  //     icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" },
  //   { name: "APS",         path: "/aps",
  //     icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" },
  //   { name: "APS History", path: "/aps-history",
  //     icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" },
];

// Physiotherapy — emerald accent
const physioNav = [
  {
    name: "Rehab Tracker",
    path: "/rehab",
    sub: "RRS · Recovery Score",
    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
  },
  {
    name: "Functional Test",
    path: "/functional-tests",
    sub: "AI Benchmark · Norms",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    name: "Training Analysis",
    path: "/training-analysis",
    sub: "AI Insights · Performance Score",
    icon: "M3 3v18h18M9 17V9m4 8V5m4 12v-6",
  },
  {
    name: "Pain Analysis",
    path: "/pain-analysis",
    sub: "AI Risk Detection · Recovery Insights",
    icon: "M12 8v4m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z",
  },
];

/* ─────────────────────────────────────────────
   CSS
───────────────────────────────────────────── */
const STYLES = `
  @keyframes sbFade { from{opacity:0;transform:translateX(-5px)} to{opacity:1;transform:translateX(0)} }
  @keyframes dot-pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }

  .sb-lbl  { animation: sbFade 0.18s ease forwards; }
  .sb-core:hover  { background: rgba(99,102,241,0.06)  !important; }
  .sb-physio:hover{ background: rgba(16,185,129,0.06)  !important; }
  .sb-logout:hover{
    background: rgba(239,68,68,0.07) !important;
    color: #ef4444 !important;
    border-color: rgba(239,68,68,0.18) !important;
  }
  .sb-tog:hover { background: rgba(99,102,241,0.1) !important; }
`;

/* ─────────────────────────────────────────────
   CROSS ICON
───────────────────────────────────────────── */
function CrossIcon({ size = 10, color = "white" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M12 2v20M2 12h20" stroke={color} strokeWidth={3.5} strokeLinecap="round" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const active = (path) => location.pathname === path;
  const W = collapsed ? 66 : 228;

  return (
    <>
      <style>{STYLES}</style>

      <div style={{
        width: W, minHeight: "100vh", flexShrink: 0,
        display: "flex", flexDirection: "column",
        padding: collapsed ? "18px 9px" : "20px 12px",
        background: "rgba(255,255,255,0.90)",
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        borderRight: "1px solid rgba(99,102,241,0.08)",
        boxShadow: "4px 0 32px rgba(99,102,241,0.05)",
        fontFamily: "'Outfit', sans-serif",
        transition: "width 0.24s cubic-bezier(0.4,0,0.2,1), padding 0.24s ease",
        position: "relative", zIndex: 50, overflow: "hidden",
      }}>

        {/* BG glow blobs */}
        <div style={{
          position: "absolute", top: -50, right: -50, width: 140, height: 140,
          borderRadius: "50%", background: "rgba(99,102,241,0.05)",
          filter: "blur(44px)", pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", bottom: -40, left: -30, width: 110, height: 110,
          borderRadius: "50%", background: "rgba(16,185,129,0.04)",
          filter: "blur(36px)", pointerEvents: "none"
        }} />

        {/* ── LOGO ── */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          marginBottom: 24
        }}>
          {!collapsed ? (
            <div className="sb-lbl" style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{
                width: 24, height: 24, borderRadius: 7, flexShrink: 0,
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 8px rgba(99,102,241,0.32)"
              }}>
                <CrossIcon size={10} />
              </div>
              <span style={{ fontSize: 14, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.01em" }}>
                Evolve
                <span style={{
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  marginLeft: 4
                }}>360</span>
              </span>
            </div>
          ) : (
            <div onClick={() => setCollapsed(false)} style={{
              cursor: "pointer",
              width: 32, height: 32, borderRadius: 9,
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 8px rgba(99,102,241,0.3)"
            }}>
              <CrossIcon size={10} />
            </div>
          )}
          {!collapsed && (
            <button className="sb-tog" onClick={() => setCollapsed(true)} style={{
              width: 24, height: 24, borderRadius: 7, border: "1px solid rgba(99,102,241,0.12)",
              background: "rgba(238,242,255,0.7)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#94a3b8", transition: "all 0.18s",
            }}>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2.3} strokeLinecap="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
        </div>

        {/* Collapsed expand button */}
        {collapsed && (
          <button className="sb-tog" onClick={() => setCollapsed(false)} style={{
            width: 32, height: 32, borderRadius: 9, alignSelf: "center",
            border: "1px solid rgba(99,102,241,0.12)",
            background: "rgba(238,242,255,0.7)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#6366f1", transition: "all 0.18s", marginBottom: 18,
          }}>
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.3} strokeLinecap="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}

        {/* ── CORE NAV ── */}
        {/* {!collapsed && (
          <p className="sb-lbl" style={{ fontSize:8, fontWeight:700, letterSpacing:"0.2em",
            textTransform:"uppercase", color:"#94a3b8", marginBottom:7, paddingLeft:2 }}>
            Performance
          </p>
        )}
        <nav style={{ display:"flex", flexDirection:"column", gap:1.5 }}>
          {coreNav.map((item) => {
            const on = active(item.path);
            return (
              <Link key={item.path} to={item.path} className="sb-core"
                title={collapsed ? item.name : undefined}
                style={{
                  display:"flex", alignItems:"center", gap:8,
                  padding: collapsed ? "8px" : "8px 9px",
                  borderRadius:9, textDecoration:"none",
                  justifyContent: collapsed ? "center" : "flex-start",
                  background: on
                    ? "linear-gradient(135deg,rgba(99,102,241,0.09),rgba(139,92,246,0.05))"
                    : "transparent",
                  border: on ? "1px solid rgba(99,102,241,0.16)" : "1px solid transparent",
                  color: on ? "#6366f1" : "#64748b",
                  transition:"all 0.16s",
                }}>
                <div style={{ width:27, height:27, borderRadius:7, flexShrink:0,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  background: on ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "rgba(148,163,184,0.08)",
                  color: on ? "white" : "#94a3b8",
                  boxShadow: on ? "0 2px 7px rgba(99,102,241,0.26)" : "none",
                  transition:"all 0.18s",
                }}>
                  <Icon path={item.icon} />
                </div>
                {!collapsed && (
                  <span className="sb-lbl" style={{ fontSize:12, fontWeight: on ? 700 : 500,
                    whiteSpace:"nowrap", letterSpacing:"0.01em" }}>
                    {item.name}
                  </span>
                )}
                {!collapsed && on && (
                  <div style={{ marginLeft:"auto", width:5, height:5, borderRadius:"50%",
                    background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
                    boxShadow:"0 0 5px rgba(99,102,241,0.45)" }} />
                )}
              </Link>
            );
          })}
        </nav> */}

        {/* ── DIVIDER w/ Physio label ── */}
        <div style={{
          margin: "14px 0 11px", position: "relative",
          display: "flex", alignItems: "center", gap: 6
        }}>
          <div style={{
            flex: 1, height: 1,
            background: "linear-gradient(90deg,transparent,rgba(16,185,129,0.25))"
          }} />
          {!collapsed && (
            <div className="sb-lbl" style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
              <div style={{
                width: 13, height: 13, borderRadius: 4, flexShrink: 0,
                background: "linear-gradient(135deg,#10b981,#059669)",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <CrossIcon size={7} />
              </div>
              <span style={{
                fontSize: 8, fontWeight: 700, letterSpacing: "0.2em",
                textTransform: "uppercase", color: "#10b981"
              }}>
                Physiotherapy
              </span>
            </div>
          )}
          {collapsed && (
            <div style={{
              width: 13, height: 13, borderRadius: 4,
              background: "linear-gradient(135deg,#10b981,#059669)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <CrossIcon size={7} />
            </div>
          )}
          <div style={{
            flex: 1, height: 1,
            background: "linear-gradient(90deg,rgba(16,185,129,0.25),transparent)"
          }} />
        </div>

        {/* ── PHYSIO NAV ── */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {physioNav.map((item) => {
            const on = active(item.path);
            return (
              <Link key={item.path} to={item.path} className="sb-physio"
                title={collapsed ? item.name : undefined}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: collapsed ? "8px" : "8px 9px",
                  borderRadius: 9, textDecoration: "none",
                  justifyContent: collapsed ? "center" : "flex-start",
                  background: on
                    ? "linear-gradient(135deg,rgba(16,185,129,0.09),rgba(5,150,105,0.05))"
                    : "transparent",
                  border: on ? "1px solid rgba(16,185,129,0.2)" : "1px solid transparent",
                  color: on ? "#10b981" : "#64748b",
                  transition: "all 0.16s",
                }}>
                <div style={{
                  width: 27, height: 27, borderRadius: 7, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: on ? "linear-gradient(135deg,#10b981,#059669)" : "rgba(148,163,184,0.08)",
                  color: on ? "white" : "#94a3b8",
                  boxShadow: on ? "0 2px 7px rgba(16,185,129,0.26)" : "none",
                  transition: "all 0.18s",
                }}>
                  <Icon path={item.icon} />
                </div>
                {!collapsed && (
                  <div className="sb-lbl" style={{ minWidth: 0 }}>
                    <p style={{
                      fontSize: 12, fontWeight: on ? 700 : 500,
                      whiteSpace: "nowrap", color: on ? "#10b981" : "#64748b"
                    }}>
                      {item.name}
                    </p>
                    <p style={{ fontSize: 9, color: "#94a3b8", marginTop: 1, whiteSpace: "nowrap" }}>
                      {item.sub}
                    </p>
                  </div>
                )}
                {!collapsed && on && (
                  <div style={{
                    marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", flexShrink: 0,
                    background: "linear-gradient(135deg,#10b981,#059669)",
                    boxShadow: "0 0 5px rgba(16,185,129,0.45)"
                  }} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* ── USER CARD ── */}
        {!collapsed && (
          <div className="sb-lbl" style={{
            background: "rgba(238,242,255,0.65)",
            border: "1px solid rgba(99,102,241,0.09)", borderRadius: 10,
            padding: "9px 10px", display: "flex", alignItems: "center", gap: 8, marginBottom: 6
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontSize: 12, fontWeight: 800
            }}>
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{
                fontSize: 12, fontWeight: 700, color: "#0f172a",
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
              }}>
                {user?.name || "User"}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 1 }}>
                <div style={{
                  width: 5, height: 5, borderRadius: "50%", background: "#22c55e",
                  animation: "dot-pulse 2s ease-in-out infinite"
                }} />
                <p style={{
                  fontSize: 8.5, color: "#94a3b8",
                  letterSpacing: "0.06em", textTransform: "uppercase"
                }}>Active</p>
              </div>
            </div>
          </div>
        )}

        {/* ── LOGOUT ── */}
        <button onClick={logout} className="sb-logout"
          title={collapsed ? "Logout" : undefined}
          style={{
            width: "100%", padding: collapsed ? "8px" : "8px 9px",
            borderRadius: 9, border: "1px solid rgba(148,163,184,0.18)",
            background: "rgba(148,163,184,0.04)", color: "#94a3b8",
            cursor: "pointer", fontFamily: "'Outfit', sans-serif",
            fontSize: 12, fontWeight: 600, letterSpacing: "0.04em",
            display: "flex", alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            gap: 7, transition: "all 0.18s",
          }}>
          <div style={{
            width: 25, height: 25, borderRadius: 7, flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
          </div>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </>
  );
}