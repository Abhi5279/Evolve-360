// // // // // // // import { Link, useNavigate } from "react-router-dom";
// // // // // // // import { useAuth } from "../context/AuthContext";

// // // // // // // export default function Navbar() {
// // // // // // //   const { user, logout, isAuthenticated } = useAuth();
// // // // // // //   const navigate = useNavigate();

// // // // // // //   const handleLogout = () => {
// // // // // // //     logout();
// // // // // // //     navigate("/login");
// // // // // // //   };

// // // // // // //   if (!isAuthenticated) return null;

// // // // // // //   return (
// // // // // // //     <nav className="border-b border-[var(--color-border-soft)] bg-[var(--color-bg-main)] px-6 py-4">

// // // // // // //       <div className="max-w-7xl mx-auto flex justify-between items-center">

// // // // // // //         {/* Logo */}
// // // // // // //         <Link
// // // // // // //           to="/dashboard"
// // // // // // //           className="text-2xl font-bold"
// // // // // // //         >
// // // // // // //           AdaptiveAI
// // // // // // //         </Link>

// // // // // // //         {/* Links */}
// // // // // // //         <div className="flex items-center gap-6 text-sm font-medium text-[var(--color-text-secondary)]">

// // // // // // //           <Link to="/dashboard" className="hover:text-[var(--color-text-main)]">
// // // // // // //             Dashboard
// // // // // // //           </Link>

// // // // // // //           <Link to="/workout" className="hover:text-[var(--color-text-main)]">
// // // // // // //             Workout
// // // // // // //           </Link>

// // // // // // //           <Link to="/readiness" className="hover:text-[var(--color-text-main)]">
// // // // // // //             Readiness
// // // // // // //           </Link>

// // // // // // //           <Link to="/nutrition" className="hover:text-[var(--color-text-main)]">
// // // // // // //             Nutrition
// // // // // // //           </Link>

// // // // // // //           <Link to="/aps" className="hover:text-[var(--color-text-main)]">
// // // // // // //             APS
// // // // // // //           </Link>

// // // // // // //         </div>

// // // // // // //         {/* Right Side */}
// // // // // // //         <div className="flex items-center gap-4">

// // // // // // //           <div className="w-9 h-9 rounded-lg bg-[var(--color-text-main)] text-white flex items-center justify-center font-semibold text-sm">
// // // // // // //             {user?.name?.[0]}
// // // // // // //           </div>

// // // // // // //           <button
// // // // // // //             onClick={handleLogout}
// // // // // // //             className="btn-outline"
// // // // // // //           >
// // // // // // //             Logout
// // // // // // //           </button>

// // // // // // //         </div>

// // // // // // //       </div>

// // // // // // //     </nav>
// // // // // // //   );
// // // // // // // }

// // // // // // import { Link, useNavigate, useLocation } from "react-router-dom";
// // // // // // import { useAuth } from "../context/AuthContext";

// // // // // // export default function Navbar() {
// // // // // //   const { user, logout, isAuthenticated } = useAuth();
// // // // // //   const navigate = useNavigate();
// // // // // //   const location = useLocation();

// // // // // //   const navItems = [
// // // // // //     { name: "Dashboard", path: "/dashboard" },
// // // // // //     { name: "Workout", path: "/workout" },
// // // // // //     { name: "Readiness", path: "/readiness" },
// // // // // //     { name: "Nutrition", path: "/nutrition" },
// // // // // //     { name: "APS", path: "/aps" },
// // // // // //   ];

// // // // // //   const handleLogout = () => {
// // // // // //     logout();
// // // // // //     navigate("/login");
// // // // // //   };

// // // // // //   if (!isAuthenticated) return null;

// // // // // //   return (
// // // // // //     <nav className="sticky top-0 z-50 bg-[var(--color-bg-main)] border-b border-[var(--color-border-soft)] backdrop-blur-md">
// // // // // //       <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

// // // // // //         {/* Logo */}
// // // // // //         <Link
// // // // // //           to="/dashboard"
// // // // // //           className="text-xl font-bold tracking-tight text-[var(--color-text-main)]"
// // // // // //         >
// // // // // //           AdaptiveAI
// // // // // //         </Link>

// // // // // //         {/* Center Navigation - Envato Style */}
// // // // // //         <div className="hidden md:flex items-center gap-8 text-sm font-medium">
// // // // // //           {navItems.map((item) => {
// // // // // //             const isActive = location.pathname === item.path;

// // // // // //             return (
// // // // // //               <Link
// // // // // //                 key={item.path}
// // // // // //                 to={item.path}
// // // // // //                 className={`relative transition duration-200 
// // // // // //                   ${
// // // // // //                     isActive
// // // // // //                       ? "text-[var(--color-primary)]"
// // // // // //                       : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)]"
// // // // // //                   }`}
// // // // // //               >
// // // // // //                 {item.name}

// // // // // //                 {/* Active underline animation */}
// // // // // //                 <span
// // // // // //                   className={`absolute left-0 -bottom-2 h-[2px] w-full transition-all duration-300
// // // // // //                     ${
// // // // // //                       isActive
// // // // // //                         ? "bg-[var(--color-primary)]"
// // // // // //                         : "bg-transparent"
// // // // // //                     }`}
// // // // // //                 />
// // // // // //               </Link>
// // // // // //             );
// // // // // //           })}
// // // // // //         </div>

// // // // // //         {/* Right Side */}
// // // // // //         <div className="flex items-center gap-4">

// // // // // //           {/* User Avatar */}
// // // // // //           <div className="w-9 h-9 rounded-xl bg-[var(--color-text-main)] text-white flex items-center justify-center font-semibold text-sm shadow-sm">
// // // // // //             {user?.name?.[0]}
// // // // // //           </div>

// // // // // //           {/* Logout */}
// // // // // //           <button
// // // // // //             onClick={handleLogout}
// // // // // //             className="btn-outline"
// // // // // //           >
// // // // // //             Logout
// // // // // //           </button>

// // // // // //         </div>

// // // // // //       </div>
// // // // // //     </nav>
// // // // // //   );
// // // // // // }


// // // // // import { Link, useNavigate, useLocation } from "react-router-dom";
// // // // // import { useAuth } from "../context/AuthContext";
// // // // // import { User, LogOut } from "lucide-react";

// // // // // export default function Navbar() {
// // // // //   const { logout, isAuthenticated } = useAuth();
// // // // //   const navigate = useNavigate();
// // // // //   const location = useLocation();

// // // // //   const navItems = [
// // // // //     { name: "Dashboard", path: "/dashboard" },
// // // // //     { name: "Workout", path: "/workout" },
// // // // //     { name: "Readiness", path: "/readiness" },
// // // // //     { name: "Nutrition", path: "/nutrition" },
// // // // //     { name: "APS", path: "/aps" },
// // // // //   ];

// // // // //   const handleLogout = () => {
// // // // //     logout();
// // // // //     navigate("/login");
// // // // //   };

// // // // //   if (!isAuthenticated) return null;

// // // // //   return (
// // // // //     <nav className="sticky top-0 z-50 bg-[var(--color-bg-main)] border-b border-[var(--color-border-soft)] backdrop-blur-md">
// // // // //       <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

// // // // //         {/* Logo */}
// // // // //         <Link
// // // // //           to="/dashboard"
// // // // //           className="text-xl font-bold tracking-tight text-[var(--color-text-main)]"
// // // // //         >
// // // // //           AdaptiveAI
// // // // //         </Link>

// // // // //         {/* Center Navigation */}
// // // // //         <div className="hidden md:flex items-center gap-8 text-sm font-medium">
// // // // //           {navItems.map((item) => {
// // // // //             const isActive = location.pathname === item.path;

// // // // //             return (
// // // // //               <Link
// // // // //                 key={item.path}
// // // // //                 to={item.path}
// // // // //                 className={`relative transition duration-200
// // // // //                   ${
// // // // //                     isActive
// // // // //                       ? "text-[var(--color-primary)]"
// // // // //                       : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)]"
// // // // //                   }`}
// // // // //               >
// // // // //                 {item.name}

// // // // //                 <span
// // // // //                   className={`absolute left-0 -bottom-2 h-[2px] w-full transition-all duration-300
// // // // //                     ${
// // // // //                       isActive
// // // // //                         ? "bg-[var(--color-primary)]"
// // // // //                         : "bg-transparent"
// // // // //                     }`}
// // // // //                 />
// // // // //               </Link>
// // // // //             );
// // // // //           })}
// // // // //         </div>

// // // // //         {/* Right Side */}
// // // // //         <div className="flex items-center gap-4">

// // // // //           {/* Profile Icon → Onboarding */}
// // // // //           <Link
// // // // //             to="/onboarding"
// // // // //             className="p-2 rounded-lg hover:bg-[var(--color-bg-soft)] transition"
// // // // //           >
// // // // //             <User
// // // // //               size={20}
// // // // //               className={`${
// // // // //                 location.pathname === "/onboarding"
// // // // //                   ? "text-[var(--color-primary)]"
// // // // //                   : "text-[var(--color-text-secondary)]"
// // // // //               }`}
// // // // //             />
// // // // //           </Link>

// // // // //           {/* Logout Icon */}
// // // // //           <button
// // // // //             onClick={handleLogout}
// // // // //             className="p-2 rounded-lg hover:bg-[var(--color-bg-soft)] transition text-[var(--color-text-secondary)] hover:text-red-500"
// // // // //           >
// // // // //             <LogOut size={20} />
// // // // //           </button>

// // // // //         </div>

// // // // //       </div>
// // // // //     </nav>
// // // // //   );
// // // // // }


// // // // import { Link, useNavigate, useLocation } from "react-router-dom";
// // // // import { useAuth } from "../context/AuthContext";
// // // // import { User, LogOut } from "lucide-react";

// // // // const navStyles = `
// // // //   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

// // // //   .epa-navbar {
// // // //     background: #111111;
// // // //     border-bottom: 1px solid rgba(198,167,94,0.2);
// // // //     position: sticky;
// // // //     top: 0;
// // // //     z-index: 50;
// // // //   }

// // // //   .epa-navbar-inner {
// // // //     max-width: 1200px;
// // // //     margin: 0 auto;
// // // //     padding: 0 32px;
// // // //     height: 64px;
// // // //     display: flex;
// // // //     align-items: center;
// // // //     justify-content: space-between;
// // // //   }

// // // //   .epa-navbar-logo {
// // // //     font-family: 'Cormorant Garamond', Georgia, serif;
// // // //     font-size: 1.2rem;
// // // //     font-weight: 600;
// // // //     color: #C6A75E;
// // // //     letter-spacing: 0.06em;
// // // //     text-decoration: none;
// // // //     display: flex;
// // // //     align-items: baseline;
// // // //     gap: 8px;
// // // //     flex-shrink: 0;
// // // //   }

// // // //   .epa-navbar-logo-sub {
// // // //     font-family: 'DM Sans', sans-serif;
// // // //     font-size: 9px;
// // // //     font-weight: 600;
// // // //     letter-spacing: 0.18em;
// // // //     text-transform: uppercase;
// // // //     color: rgba(198,167,94,0.5);
// // // //   }

// // // //   .epa-nav-center {
// // // //     display: flex;
// // // //     align-items: center;
// // // //     gap: 2px;
// // // //   }

// // // //   .epa-nav-link {
// // // //     font-family: 'DM Sans', sans-serif;
// // // //     font-size: 10.5px;
// // // //     font-weight: 500;
// // // //     letter-spacing: 0.12em;
// // // //     text-transform: uppercase;
// // // //     color: #A1A1A1;
// // // //     text-decoration: none;
// // // //     padding: 8px 16px;
// // // //     position: relative;
// // // //     transition: color 0.2s ease;
// // // //   }

// // // //   .epa-nav-link::after {
// // // //     content: '';
// // // //     position: absolute;
// // // //     left: 16px;
// // // //     right: 16px;
// // // //     bottom: 0;
// // // //     height: 1px;
// // // //     background: transparent;
// // // //     transition: background 0.2s ease;
// // // //   }

// // // //   .epa-nav-link:hover {
// // // //     color: #E8E6E3;
// // // //   }

// // // //   .epa-nav-link.active {
// // // //     color: #C6A75E;
// // // //   }

// // // //   .epa-nav-link.active::after {
// // // //     background: rgba(198,167,94,0.7);
// // // //   }

// // // //   .epa-navbar-right {
// // // //     display: flex;
// // // //     align-items: center;
// // // //     gap: 4px;
// // // //     flex-shrink: 0;
// // // //   }

// // // //   .epa-navbar-icon-btn {
// // // //     width: 36px;
// // // //     height: 36px;
// // // //     border-radius: 8px;
// // // //     background: transparent;
// // // //     border: 1px solid transparent;
// // // //     display: flex;
// // // //     align-items: center;
// // // //     justify-content: center;
// // // //     cursor: pointer;
// // // //     transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
// // // //     color: #A1A1A1;
// // // //     text-decoration: none;
// // // //   }

// // // //   .epa-navbar-icon-btn:hover {
// // // //     background: rgba(198,167,94,0.06);
// // // //     border-color: rgba(198,167,94,0.2);
// // // //     color: #E8E6E3;
// // // //   }

// // // //   .epa-navbar-icon-btn.active {
// // // //     color: #C6A75E;
// // // //     border-color: rgba(198,167,94,0.25);
// // // //     background: rgba(198,167,94,0.05);
// // // //   }

// // // //   .epa-navbar-icon-btn.logout:hover {
// // // //     color: #8B2020;
// // // //     border-color: rgba(92,26,26,0.4);
// // // //     background: rgba(92,26,26,0.1);
// // // //   }

// // // //   .epa-navbar-divider {
// // // //     width: 1px;
// // // //     height: 20px;
// // // //     background: rgba(198,167,94,0.15);
// // // //     margin: 0 8px;
// // // //   }
// // // // `;

// // // // export default function Navbar() {
// // // //   const { logout, isAuthenticated } = useAuth();
// // // //   const navigate = useNavigate();
// // // //   const location = useLocation();

// // // //   const navItems = [
// // // //     { name: "Dashboard", path: "/dashboard" },
// // // //     { name: "Workout",   path: "/workout"   },
// // // //     { name: "Readiness", path: "/readiness" },
// // // //     { name: "Nutrition", path: "/nutrition" },
// // // //     { name: "APS",       path: "/aps"       },
// // // //     { name: "Heart Rate", path: "/heartrate" },
// // // //   ];

// // // //   const handleLogout = () => {
// // // //     logout();
// // // //     navigate("/login");
// // // //   };

// // // //   if (!isAuthenticated) return null;

// // // //   return (
// // // //     <>
// // // //       <style>{navStyles}</style>

// // // //       <nav className="epa-navbar">
// // // //         <div className="epa-navbar-inner">

// // // //           {/* Logo */}
// // // //           <Link to="/dashboard" className="epa-navbar-logo">
// // // //             Elite Performance
// // // //             <span className="epa-navbar-logo-sub">Atelier</span>
// // // //           </Link>

// // // //           {/* Center Nav */}
// // // //           <div className="epa-nav-center">
// // // //             {navItems.map((item) => {
// // // //               const isActive = location.pathname === item.path;
// // // //               return (
// // // //                 <Link
// // // //                   key={item.path}
// // // //                   to={item.path}
// // // //                   className={`epa-nav-link${isActive ? " active" : ""}`}
// // // //                 >
// // // //                   {item.name}
// // // //                 </Link>
// // // //               );
// // // //             })}
// // // //           </div>

// // // //           {/* Right icons */}
// // // //           <div className="epa-navbar-right">
// // // //             <Link
// // // //               to="/onboarding"
// // // //               className={`epa-navbar-icon-btn${location.pathname === "/onboarding" ? " active" : ""}`}
// // // //               title="Profile"
// // // //             >
// // // //               <User size={16} />
// // // //             </Link>

// // // //             <div className="epa-navbar-divider" />

// // // //             <button
// // // //               onClick={handleLogout}
// // // //               className="epa-navbar-icon-btn logout"
// // // //               title="Sign Out"
// // // //             >
// // // //               <LogOut size={16} />
// // // //             </button>
// // // //           </div>

// // // //         </div>
// // // //       </nav>
// // // //     </>
// // // //   );
// // // // }


// // // import { Link, useNavigate, useLocation } from "react-router-dom";
// // // import { useAuth } from "../context/AuthContext";
// // // import { User, LogOut } from "lucide-react";

// // // const NAV_ITEMS = [
// // //   { name: "Dashboard", path: "/dashboard" },
// // //   { name: "Workout", path: "/workout" },
// // //   { name: "Readiness", path: "/readiness" },
// // //   { name: "Nutrition", path: "/nutrition" },
// // //   // { name: "APS",        path: "/aps"        },
// // //   { name: "Heart Rate", path: "/heartrate" },
// // // ];

// // // export default function Navbar() {
// // //   const { logout, isAuthenticated } = useAuth();
// // //   const navigate = useNavigate();
// // //   const location = useLocation();

// // //   const handleLogout = () => { logout(); navigate("/login"); };

// // //   if (!isAuthenticated) return null;

// // //   return (
// // //     <nav style={{
// // //       position: "sticky",
// // //       top: 0,
// // //       zIndex: 50,
// // //       background: "rgba(255,255,255,0.75)",
// // //       backdropFilter: "blur(20px)",
// // //       WebkitBackdropFilter: "blur(20px)",
// // //       borderBottom: "1px solid rgba(99,102,241,0.1)",
// // //       boxShadow: "0 1px 24px rgba(99,102,241,0.06)",
// // //     }}>
// // //       <div style={{
// // //         maxWidth: 1200,
// // //         margin: "0 auto",
// // //         padding: "0 48px",
// // //         height: 64,
// // //         display: "flex",
// // //         alignItems: "center",
// // //         justifyContent: "space-between",
// // //         gap: 24,
// // //       }}>

// // //         {/* ── Logo ──
// // //         <Link to="/dashboard" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: 8, flexShrink: 0 }}>
// // //           <span style={{
// // //             fontFamily: "'Outfit', sans-serif",
// // //             fontSize: "1.1rem",
// // //             fontWeight: 800,
// // //             letterSpacing: "-0.01em",
// // //             background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
// // //             WebkitBackgroundClip: "text",
// // //             WebkitTextFillColor: "transparent",
// // //           }}>
// // //             EVOLVE
// // //           </span>
// // //           <span style={{
// // //             fontFamily: "'Outfit', sans-serif",
// // //             fontSize: 9,
// // //             fontWeight: 700,
// // //             letterSpacing: "0.2em",
// // //             textTransform: "uppercase",
// // //             color: "#94a3b8",
// // //           }}>
// // //             360
// // //           </span>
// // //         </Link> */}
// // //         {/* ── Logo ── */}
// // //         <Link to="/dashboard" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>

// // //           {/* Icon badge */}
// // //           <div style={{
// // //             width: 32, height: 32,
// // //             borderRadius: 9,
// // //             background: "linear-gradient(135deg, #2563eb, #6366f1, #7c3aed)",
// // //             display: "flex", alignItems: "center", justifyContent: "center",
// // //             boxShadow: "0 2px 10px rgba(99,102,241,0.35)",
// // //             flexShrink: 0,
// // //           }}>
// // //             <svg viewBox="0 0 48 34" width="22" height="22" fill="none"
// // //               stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6">
// // //               {/* Left wheel */}
// // //               <circle cx="10" cy="24" r="8" />
// // //               <circle cx="10" cy="24" r="2.5" strokeOpacity="0.5" />
// // //               <line x1="10" y1="16" x2="10" y2="24" strokeOpacity="0.6" />
// // //               <line x1="18" y1="24" x2="10" y2="24" strokeOpacity="0.6" />
// // //               {/* Right wheel */}
// // //               <circle cx="38" cy="24" r="8" />
// // //               <circle cx="38" cy="24" r="2.5" strokeOpacity="0.5" />
// // //               <line x1="38" y1="16" x2="38" y2="24" strokeOpacity="0.6" />
// // //               <line x1="30" y1="24" x2="38" y2="24" strokeOpacity="0.6" />
// // //               {/* Frame */}
// // //               <polyline points="10,24 24,24 20,10 32,8 24,24" />
// // //               <line x1="20" y1="10" x2="10" y2="24" />
// // //               <line x1="32" y1="8" x2="38" y2="24" />
// // //               {/* Seat */}
// // //               <line x1="15" y1="7" x2="23" y2="7" />
// // //               <line x1="19" y1="7" x2="20" y2="10" />
// // //               {/* Handlebars */}
// // //               <line x1="32" y1="4" x2="40" y2="4" />
// // //               <line x1="40" y1="4" x2="40" y2="8" />
// // //               {/* BB dot */}
// // //               <circle cx="24" cy="24" r="2" fill="white" stroke="none" />
// // //             </svg>
// // //           </div>

// // //           {/* Wordmark */}
// // //           <div style={{ display: "flex", flexDirection: "column", gap: 0, lineHeight: 1 }}>
// // //             <span style={{
// // //               fontFamily: "'Outfit', sans-serif",
// // //               fontSize: "1rem",
// // //               fontWeight: 800,
// // //               letterSpacing: "-0.02em",
// // //               background: "linear-gradient(135deg, #2563eb, #6366f1, #7c3aed)",
// // //               WebkitBackgroundClip: "text",
// // //               WebkitTextFillColor: "transparent",
// // //               backgroundClip: "text",
// // //             }}>
// // //               EVOLVE
// // //             </span>
// // //             <span style={{
// // //               fontFamily: "'Outfit', sans-serif",
// // //               fontSize: 7,
// // //               fontWeight: 700,
// // //               letterSpacing: "0.22em",
// // //               textTransform: "uppercase",
// // //               color: "#94a3b8",
// // //               marginTop: 1,
// // //             }}>
// // //               360
// // //             </span>
// // //           </div>

// // //         </Link>

// // //         {/* ── Center Nav ── */}
// // //         <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
// // //           {NAV_ITEMS.map(({ name, path }) => {
// // //             const isActive = location.pathname === path;
// // //             return (
// // //               <Link
// // //                 key={path}
// // //                 to={path}
// // //                 style={{
// // //                   fontFamily: "'Outfit', sans-serif",
// // //                   fontSize: 11,
// // //                   fontWeight: isActive ? 700 : 500,
// // //                   letterSpacing: "0.1em",
// // //                   textTransform: "uppercase",
// // //                   textDecoration: "none",
// // //                   padding: "6px 14px",
// // //                   borderRadius: 10,
// // //                   position: "relative",
// // //                   color: isActive ? "#6366f1" : "#64748b",
// // //                   background: isActive ? "rgba(99,102,241,0.08)" : "transparent",
// // //                   transition: "all 0.2s ease",
// // //                 }}
// // //                 onMouseOver={e => {
// // //                   if (!isActive) {
// // //                     e.currentTarget.style.color = "#6366f1";
// // //                     e.currentTarget.style.background = "rgba(99,102,241,0.05)";
// // //                   }
// // //                 }}
// // //                 onMouseOut={e => {
// // //                   if (!isActive) {
// // //                     e.currentTarget.style.color = "#64748b";
// // //                     e.currentTarget.style.background = "transparent";
// // //                   }
// // //                 }}
// // //               >
// // //                 {name}
// // //                 {/* Active underline */}
// // //                 {isActive && (
// // //                   <span style={{
// // //                     position: "absolute",
// // //                     bottom: -1,
// // //                     left: "50%",
// // //                     transform: "translateX(-50%)",
// // //                     width: "60%",
// // //                     height: 2,
// // //                     background: "linear-gradient(90deg, #3b82f6, #6366f1)",
// // //                     borderRadius: 999,
// // //                   }} />
// // //                 )}
// // //               </Link>
// // //             );
// // //           })}
// // //         </div>

// // //         {/* ── Right icons ── */}
// // //         <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
// // //           {/* Profile */}
// // //           <Link
// // //             to="/onboarding"
// // //             title="Profile"
// // //             style={{
// // //               width: 36, height: 36, borderRadius: 10,
// // //               display: "flex", alignItems: "center", justifyContent: "center",
// // //               textDecoration: "none",
// // //               color: location.pathname === "/onboarding" ? "#6366f1" : "#94a3b8",
// // //               background: location.pathname === "/onboarding" ? "rgba(99,102,241,0.08)" : "transparent",
// // //               border: location.pathname === "/onboarding" ? "1px solid rgba(99,102,241,0.2)" : "1px solid transparent",
// // //               transition: "all 0.2s",
// // //             }}
// // //             onMouseOver={e => { e.currentTarget.style.background = "rgba(99,102,241,0.08)"; e.currentTarget.style.color = "#6366f1"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)"; }}
// // //             onMouseOut={e => {
// // //               if (location.pathname !== "/onboarding") {
// // //                 e.currentTarget.style.background = "transparent";
// // //                 e.currentTarget.style.color = "#94a3b8";
// // //                 e.currentTarget.style.borderColor = "transparent";
// // //               }
// // //             }}
// // //           >
// // //             <User size={16} />
// // //           </Link>

// // //           {/* Divider */}
// // //           <div style={{ width: 1, height: 20, background: "rgba(99,102,241,0.12)", margin: "0 4px" }} />

// // //           {/* Logout */}
// // //           <button
// // //             onClick={handleLogout}
// // //             title="Sign Out"
// // //             style={{
// // //               width: 36, height: 36, borderRadius: 10,
// // //               display: "flex", alignItems: "center", justifyContent: "center",
// // //               background: "transparent", border: "1px solid transparent",
// // //               cursor: "pointer", color: "#94a3b8", transition: "all 0.2s",
// // //             }}
// // //             onMouseOver={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.2)"; }}
// // //             onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.borderColor = "transparent"; }}
// // //           >
// // //             <LogOut size={16} />
// // //           </button>
// // //         </div>

// // //       </div>
// // //     </nav>
// // //   );
// // // }


// // import { Link, useNavigate, useLocation } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";
// // import { User, LogOut } from "lucide-react";
// // import { useEffect, useState, useRef } from "react";
// // import { readinessAPI } from "../api/axios";

// // const NAV_ITEMS = [
// //   { name: "Dashboard", path: "/dashboard" },
// //   { name: "Workout", path: "/workout" },
// //   { name: "Readiness", path: "/readiness" },
// //   { name: "Nutrition", path: "/nutrition" },
// //   { name: "Heart Rate", path: "/heartrate" },
// //    { name: "APS", path: "/aps" },
// // ];

// // /* ── Readiness suggestion logic ── */
// // function getReadinessSuggestion(score, category) {
// //   if (!score && score !== 0) return null;

// //   if (category === "low" || score < 45) {
// //     return {
// //       level: "low",
// //       emoji: "🔴",
// //       headline: "Rest or Light Activity",
// //       suggestions: [
// //         "Reduce training intensity by 40–60%",
// //         "Focus on mobility & stretching",
// //         "Prioritize sleep and recovery",
// //         "Light walk or yoga only",
// //       ],
// //       color: "#f43f5e",
// //       bg: "rgba(244,63,94,0.08)",
// //       border: "rgba(244,63,94,0.2)",
// //       glow: "rgba(244,63,94,0.15)",
// //       dot: "#f43f5e",
// //       pulse: "#fecdd3",
// //     };
// //   }
// //   if (category === "moderate" || score < 75) {
// //     return {
// //       level: "moderate",
// //       emoji: "🟡",
// //       headline: "Moderate Training",
// //       suggestions: [
// //         "Reduce intensity by ~20%",
// //         "Avoid max-effort sets today",
// //         "Focus on technique & form",
// //         "Keep sessions under 60 min",
// //       ],
// //       color: "#f59e0b",
// //       bg: "rgba(245,158,11,0.08)",
// //       border: "rgba(245,158,11,0.2)",
// //       glow: "rgba(245,158,11,0.15)",
// //       dot: "#f59e0b",
// //       pulse: "#fde68a",
// //     };
// //   }
// //   return {
// //     level: "high",
// //     emoji: "🟢",
// //     headline: "Peak Performance Ready",
// //     suggestions: [
// //       "Go for PRs & max effort sets",
// //       "Increase volume by 10–15%",
// //       "Tackle your hardest sessions",
// //       "Full intensity — you're primed!",
// //     ],
// //     color: "#10b981",
// //     bg: "rgba(16,185,129,0.08)",
// //     border: "rgba(16,185,129,0.2)",
// //     glow: "rgba(16,185,129,0.15)",
// //     dot: "#10b981",
// //     pulse: "#a7f3d0",
// //   };
// // }

// // /* ── Readiness Indicator ── */
// // function ReadinessIndicator({ userId }) {
// //   const [data, setData] = useState(null);
// //   const [hovered, setHovered] = useState(false);
// //   const [loaded, setLoaded] = useState(false);
// //   const timeoutRef = useRef(null);

// //   useEffect(() => {
// //     if (!userId) return;
// //     readinessAPI.getHistory(userId).then((res) => {
// //       const latest = res.data?.[0];
// //       if (latest) {
// //         setData(latest);
// //       }
// //       setLoaded(true);
// //     }).catch(() => setLoaded(true));
// //   }, [userId]);

// //   if (!loaded || !data) return null;

// //   const suggestion = getReadinessSuggestion(data.readinessScore, data.readinessCategory);
// //   if (!suggestion) return null;

// //   const handleMouseEnter = () => {
// //     clearTimeout(timeoutRef.current);
// //     setHovered(true);
// //   };
// //   const handleMouseLeave = () => {
// //     timeoutRef.current = setTimeout(() => setHovered(false), 200);
// //   };

// //   return (
// //     <div
// //       style={{ position: "relative", display: "flex", alignItems: "center" }}
// //       onMouseEnter={handleMouseEnter}
// //       onMouseLeave={handleMouseLeave}
// //     >
// //       {/* ── Indicator Button ── */}
// //       <button
// //         style={{
// //           position: "relative",
// //           width: 34,
// //           height: 34,
// //           borderRadius: 10,
// //           border: `1px solid ${suggestion.border}`,
// //           background: suggestion.bg,
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           cursor: "pointer",
// //           transition: "all 0.2s",
// //           boxShadow: hovered ? `0 0 0 3px ${suggestion.glow}` : "none",
// //         }}
// //       >
// //         {/* Pulse ring */}
// //         <span style={{
// //           position: "absolute",
// //           inset: -3,
// //           borderRadius: 12,
// //           border: `1.5px solid ${suggestion.dot}`,
// //           opacity: 0.4,
// //           animation: "readiness-pulse 2s ease-in-out infinite",
// //           pointerEvents: "none",
// //         }} />

// //         {/* Score arc / icon */}
// //         <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
// //           {/* Background ring */}
// //           <circle cx="9" cy="9" r="7" stroke={suggestion.border.replace("0.2", "0.4")} strokeWidth="1.5" fill="none" />
// //           {/* Progress arc */}
// //           <circle
// //             cx="9" cy="9" r="7"
// //             stroke={suggestion.dot}
// //             strokeWidth="2"
// //             fill="none"
// //             strokeLinecap="round"
// //             strokeDasharray={`${(data.readinessScore / 100) * 43.98} 43.98`}
// //             transform="rotate(-90 9 9)"
// //             style={{ transition: "stroke-dasharray 0.6s ease" }}
// //           />
// //           {/* Center dot */}
// //           <circle cx="9" cy="9" r="2.5" fill={suggestion.dot} />
// //         </svg>

// //         {/* Score badge */}
// //         <span style={{
// //           position: "absolute",
// //           top: -6,
// //           right: -6,
// //           minWidth: 16,
// //           height: 16,
// //           borderRadius: 999,
// //           background: suggestion.dot,
// //           color: "white",
// //           fontSize: 8,
// //           fontWeight: 800,
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           padding: "0 3px",
// //           boxShadow: `0 2px 6px ${suggestion.glow}`,
// //           letterSpacing: "-0.02em",
// //         }}>
// //           {data.readinessScore}
// //         </span>
// //       </button>

// //       {/* ── Hover Tooltip ── */}
// //       {hovered && (
// //         <div style={{
// //           position: "absolute",
// //           top: "calc(100% + 12px)",
// //           right: 0,
// //           width: 260,
// //           background: "rgba(15,23,42,0.97)",
// //           backdropFilter: "blur(20px)",
// //           border: `1px solid ${suggestion.border}`,
// //           borderRadius: 16,
// //           padding: 16,
// //           boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${suggestion.border}, inset 0 1px 0 rgba(255,255,255,0.06)`,
// //           zIndex: 1000,
// //           animation: "tooltip-in 0.18s cubic-bezier(0.34,1.56,0.64,1)",
// //           transformOrigin: "top right",
// //         }}>
// //           {/* Arrow */}
// //           <div style={{
// //             position: "absolute",
// //             top: -6,
// //             right: 13,
// //             width: 10,
// //             height: 10,
// //             background: "rgba(15,23,42,0.97)",
// //             border: `1px solid ${suggestion.border}`,
// //             borderBottom: "none",
// //             borderRight: "none",
// //             transform: "rotate(45deg)",
// //           }} />

// //           {/* Header */}
// //           <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
// //             <div style={{
// //               width: 36,
// //               height: 36,
// //               borderRadius: 10,
// //               background: suggestion.bg,
// //               border: `1px solid ${suggestion.border}`,
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               flexShrink: 0,
// //             }}>
// //               <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
// //                 <circle cx="10" cy="10" r="8" stroke={suggestion.border.replace("0.2", "0.5")} strokeWidth="1.5" fill="none" />
// //                 <circle
// //                   cx="10" cy="10" r="8"
// //                   stroke={suggestion.dot}
// //                   strokeWidth="2.5"
// //                   fill="none"
// //                   strokeLinecap="round"
// //                   strokeDasharray={`${(data.readinessScore / 100) * 50.27} 50.27`}
// //                   transform="rotate(-90 10 10)"
// //                 />
// //                 <text x="10" y="13.5" textAnchor="middle" fontSize="7" fontWeight="800" fill={suggestion.dot} fontFamily="sans-serif">
// //                   {data.readinessScore}
// //                 </text>
// //               </svg>
// //             </div>
// //             <div>
// //               <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: suggestion.dot, marginBottom: 3 }}>
// //                 Today's Readiness
// //               </p>
// //               <p style={{ fontSize: 13, fontWeight: 800, color: "white", lineHeight: 1.2 }}>
// //                 {suggestion.headline}
// //               </p>
// //             </div>
// //           </div>

// //           {/* Divider */}
// //           <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 12 }} />

// //           {/* Suggestions */}
// //           <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
// //             {suggestion.suggestions.map((s, i) => (
// //               <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
// //                 <div style={{
// //                   width: 5,
// //                   height: 5,
// //                   borderRadius: "50%",
// //                   background: suggestion.dot,
// //                   marginTop: 5,
// //                   flexShrink: 0,
// //                   opacity: 1 - i * 0.15,
// //                 }} />
// //                 <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.4, fontWeight: 500 }}>{s}</p>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Footer */}
// //           <div style={{
// //             marginTop: 12,
// //             paddingTop: 10,
// //             borderTop: "1px solid rgba(255,255,255,0.06)",
// //             display: "flex",
// //             justifyContent: "space-between",
// //             alignItems: "center",
// //           }}>
// //             <span style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
// //               {new Date(data.date).toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" })}
// //             </span>
// //             <Link to="/readiness" style={{
// //               fontSize: 9,
// //               fontWeight: 700,
// //               letterSpacing: "0.12em",
// //               textTransform: "uppercase",
// //               color: suggestion.dot,
// //               textDecoration: "none",
// //               padding: "4px 10px",
// //               borderRadius: 999,
// //               background: suggestion.bg,
// //               border: `1px solid ${suggestion.border}`,
// //               transition: "opacity 0.15s",
// //             }}>
// //               View Details →
// //             </Link>
// //           </div>
// //         </div>
// //       )}

// //       <style>{`
// //         @keyframes readiness-pulse {
// //           0%, 100% { opacity: 0.4; transform: scale(1); }
// //           50% { opacity: 0.15; transform: scale(1.12); }
// //         }
// //         @keyframes tooltip-in {
// //           from { opacity: 0; transform: scale(0.9) translateY(-4px); }
// //           to   { opacity: 1; transform: scale(1) translateY(0); }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }

// // /* ── Main Navbar ── */
// // export default function Navbar() {
// //   const { logout, isAuthenticated, user } = useAuth();
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const handleLogout = () => {
// //     logout();
// //     navigate("/login");
// //   };

// //   if (!isAuthenticated) return null;

// //   return (
// //     <nav style={{
// //       position: "sticky",
// //       top: 0,
// //       zIndex: 100,
// //       display: "flex",
// //       alignItems: "center",
// //       justifyContent: "space-between",
// //       padding: "0 32px",
// //       height: 64,
// //       background: "rgba(255,255,255,0.92)",
// //       backdropFilter: "blur(20px)",
// //       borderBottom: "1px solid rgba(226,232,240,0.8)",
// //       boxShadow: "0 1px 20px rgba(0,0,0,0.04)",
// //     }}>

// //       {/* ── Logo ── */}
// //       <Link to="/dashboard" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
// //         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// //           {/* Bike icon */}
// //           {/* <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
// //           <circle cx="5" cy="14" r="4.5" stroke="#6366f1" strokeWidth="1.5" fill="none"/>
// //           <circle cx="23" cy="14" r="4.5" stroke="#6366f1" strokeWidth="1.5" fill="none"/>
// //           <path d="M5 14 L10 5 L18 5 L23 14" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
// //           <path d="M14 5 L14 10 L23 14" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
// //           <circle cx="14" cy="5" r="1.5" fill="#6366f1"/>
// //           <path d="M18 5 L22 2" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round"/>
// //         </svg> */}
// //           <span style={{ fontSize: "1.05rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
// //             <span style={{ color: "#0f172a" }}>EVOLVE</span>
// //             <span style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}> 360</span>
// //           </span>
// //         </div>
// //       </Link>
// //       {/* ── Center Nav ── */}
// //       <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
// //         {NAV_ITEMS.map(({ name, path }) => {
// //           const isActive = location.pathname === path;
// //           return (
// //             <Link key={path} to={path} style={{
// //               position: "relative",
// //               padding: "8px 14px",
// //               borderRadius: 10,
// //               fontSize: 13,
// //               fontWeight: isActive ? 700 : 500,
// //               color: isActive ? "#6366f1" : "#64748b",
// //               background: isActive ? "rgba(99,102,241,0.07)" : "transparent",
// //               textDecoration: "none",
// //               transition: "all 0.15s",
// //             }}
// //               onMouseOver={e => { if (!isActive) { e.currentTarget.style.color = "#6366f1"; e.currentTarget.style.background = "rgba(99,102,241,0.05)"; } }}
// //               onMouseOut={e => { if (!isActive) { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.background = "transparent"; } }}
// //             >
// //               {name}
// //               {isActive && (
// //                 <span style={{
// //                   position: "absolute",
// //                   bottom: 2,
// //                   left: "50%",
// //                   transform: "translateX(-50%)",
// //                   width: 16,
// //                   height: 2,
// //                   borderRadius: 999,
// //                   background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
// //                 }} />
// //               )}
// //             </Link>
// //           );
// //         })}
// //       </div>

// //       {/* ── Right Icons ── */}
// //       <div style={{ display: "flex", alignItems: "center", gap: 8 }}>

// //         {/* ✦ Readiness Indicator */}
// //         <ReadinessIndicator userId={user?.id} />

// //         {/* Divider */}
// //         <div style={{ width: 1, height: 22, background: "#e2e8f0", margin: "0 4px" }} />

// //         {/* Profile */}
// //         <Link to="/onboarding" style={{
// //           width: 34,
// //           height: 34,
// //           borderRadius: 10,
// //           border: location.pathname === "/onboarding" ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent",
// //           background: location.pathname === "/onboarding" ? "rgba(99,102,241,0.08)" : "transparent",
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           color: location.pathname === "/onboarding" ? "#6366f1" : "#94a3b8",
// //           transition: "all 0.15s",
// //         }}
// //           onMouseOver={e => { e.currentTarget.style.background = "rgba(99,102,241,0.08)"; e.currentTarget.style.color = "#6366f1"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)"; }}
// //           onMouseOut={e => { if (location.pathname !== "/onboarding") { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.borderColor = "transparent"; } }}
// //         >
// //           <User size={16} />
// //         </Link>

// //         {/* Divider */}
// //         <div style={{ width: 1, height: 22, background: "#e2e8f0", margin: "0 2px" }} />

// //         {/* Logout */}
// //         <button onClick={handleLogout} style={{
// //           width: 34,
// //           height: 34,
// //           borderRadius: 10,
// //           border: "1px solid transparent",
// //           background: "transparent",
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           color: "#94a3b8",
// //           cursor: "pointer",
// //           transition: "all 0.15s",
// //         }}
// //           onMouseOver={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.2)"; }}
// //           onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.borderColor = "transparent"; }}
// //         >
// //           <LogOut size={16} />
// //         </button>
// //       </div>

// //     </nav>
// //   );
// // }

// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { User, LogOut, BarChart2 } from "lucide-react";
// import { useEffect, useState, useRef } from "react";
// import { readinessAPI } from "../api/axios";

// const NAV_ITEMS = [
//   { name: "Dashboard", path: "/dashboard" },
//   { name: "Workout", path: "/workout" },
//   { name: "Readiness", path: "/readiness" },
//   { name: "Water Tracker", path: "/water-tracker" },
//   { name: "Heart Rate", path: "/heartrate" },
//   { name: "Nutrition", path: "/nutrition" },
//   { name: "APS", path: "/aps" },
//   { name: "Model", path: "/model" },
//   { name: "Analyzer", path: "/analyzer" },
//   { name: "APS History", path: "/aps-history", icon: BarChart2 },

// ];

// /* ── Readiness suggestion logic ── */
// function getReadinessSuggestion(score, category) {
//   if (!score && score !== 0) return null;

//   if (category === "low" || score < 45) {
//     return {
//       level: "low",
//       headline: "Rest or Light Activity",
//       suggestions: [
//         "Reduce training intensity by 40–60%",
//         "Focus on mobility & stretching",
//         "Prioritize sleep and recovery",
//         "Light walk or yoga only",
//       ],
//       color: "#f43f5e",
//       bg: "rgba(244,63,94,0.08)",
//       border: "rgba(244,63,94,0.2)",
//       glow: "rgba(244,63,94,0.15)",
//       dot: "#f43f5e",
//     };
//   }
//   if (category === "moderate" || score < 75) {
//     return {
//       level: "moderate",
//       headline: "Moderate Training",
//       suggestions: [
//         "Reduce intensity by ~20%",
//         "Avoid max-effort sets today",
//         "Focus on technique & form",
//         "Keep sessions under 60 min",
//       ],
//       color: "#f59e0b",
//       bg: "rgba(245,158,11,0.08)",
//       border: "rgba(245,158,11,0.2)",
//       glow: "rgba(245,158,11,0.15)",
//       dot: "#f59e0b",
//     };
//   }
//   return {
//     level: "high",
//     headline: "Peak Performance Ready",
//     suggestions: [
//       "Go for PRs & max effort sets",
//       "Increase volume by 10–15%",
//       "Tackle your hardest sessions",
//       "Full intensity — you're primed!",
//     ],
//     color: "#10b981",
//     bg: "rgba(16,185,129,0.08)",
//     border: "rgba(16,185,129,0.2)",
//     glow: "rgba(16,185,129,0.15)",
//     dot: "#10b981",
//   };
// }

// /* ── Readiness Indicator ── */
// function ReadinessIndicator({ userId }) {
//   const [data, setData] = useState(null);
//   const [hovered, setHovered] = useState(false);
//   const [loaded, setLoaded] = useState(false);
//   const timeoutRef = useRef(null);

//   useEffect(() => {
//     if (!userId) return;
//     readinessAPI.getHistory(userId)
//       .then(res => { if (res.data?.[0]) setData(res.data[0]); })
//       .catch(() => { })
//       .finally(() => setLoaded(true));
//   }, [userId]);

//   if (!loaded || !data) return null;
//   const suggestion = getReadinessSuggestion(data.readinessScore, data.readinessCategory);
//   if (!suggestion) return null;

//   const handleMouseEnter = () => { clearTimeout(timeoutRef.current); setHovered(true); };
//   const handleMouseLeave = () => { timeoutRef.current = setTimeout(() => setHovered(false), 200); };

//   return (
//     <div style={{ position: "relative", display: "flex", alignItems: "center" }}
//       onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

//       {/* Indicator button */}
//       <button style={{
//         position: "relative", width: 34, height: 34, borderRadius: 10,
//         border: `1px solid ${suggestion.border}`, background: suggestion.bg,
//         display: "flex", alignItems: "center", justifyContent: "center",
//         cursor: "pointer", transition: "all 0.2s",
//         boxShadow: hovered ? `0 0 0 3px ${suggestion.glow}` : "none",
//       }}>
//         <span style={{
//           position: "absolute", inset: -3, borderRadius: 12,
//           border: `1.5px solid ${suggestion.dot}`, opacity: 0.4,
//           animation: "readiness-pulse 2s ease-in-out infinite", pointerEvents: "none",
//         }} />
//         <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
//           <circle cx="9" cy="9" r="7" stroke={suggestion.border.replace("0.2", "0.4")} strokeWidth="1.5" fill="none" />
//           <circle cx="9" cy="9" r="7" stroke={suggestion.dot} strokeWidth="2" fill="none"
//             strokeLinecap="round"
//             strokeDasharray={`${(data.readinessScore / 100) * 43.98} 43.98`}
//             transform="rotate(-90 9 9)"
//             style={{ transition: "stroke-dasharray 0.6s ease" }} />
//           <circle cx="9" cy="9" r="2.5" fill={suggestion.dot} />
//         </svg>
//         <span style={{
//           position: "absolute", top: -6, right: -6, minWidth: 16, height: 16,
//           borderRadius: 999, background: suggestion.dot, color: "white",
//           fontSize: 8, fontWeight: 800, display: "flex", alignItems: "center",
//           justifyContent: "center", padding: "0 3px",
//           boxShadow: `0 2px 6px ${suggestion.glow}`, letterSpacing: "-0.02em",
//         }}>
//           {data.readinessScore}
//         </span>
//       </button>

//       {/* Hover tooltip */}
//       {hovered && (
//         <div style={{
//           position: "absolute", top: "calc(100% + 12px)", right: 0, width: 260,
//           background: "rgba(15,23,42,0.97)", backdropFilter: "blur(20px)",
//           border: `1px solid ${suggestion.border}`, borderRadius: 16, padding: 16,
//           boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${suggestion.border}, inset 0 1px 0 rgba(255,255,255,0.06)`,
//           zIndex: 1000, animation: "tooltip-in 0.18s cubic-bezier(0.34,1.56,0.64,1)",
//           transformOrigin: "top right",
//         }}>
//           <div style={{
//             position: "absolute", top: -6, right: 13, width: 10, height: 10,
//             background: "rgba(15,23,42,0.97)", border: `1px solid ${suggestion.border}`,
//             borderBottom: "none", borderRight: "none", transform: "rotate(45deg)"
//           }} />

//           <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
//             <div style={{
//               width: 36, height: 36, borderRadius: 10, background: suggestion.bg,
//               border: `1px solid ${suggestion.border}`, display: "flex",
//               alignItems: "center", justifyContent: "center", flexShrink: 0
//             }}>
//               <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//                 <circle cx="10" cy="10" r="8" stroke={suggestion.border.replace("0.2", "0.5")} strokeWidth="1.5" fill="none" />
//                 <circle cx="10" cy="10" r="8" stroke={suggestion.dot} strokeWidth="2.5" fill="none"
//                   strokeLinecap="round"
//                   strokeDasharray={`${(data.readinessScore / 100) * 50.27} 50.27`}
//                   transform="rotate(-90 10 10)" />
//                 <text x="10" y="13.5" textAnchor="middle" fontSize="7" fontWeight="800"
//                   fill={suggestion.dot} fontFamily="sans-serif">{data.readinessScore}</text>
//               </svg>
//             </div>
//             <div>
//               <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: suggestion.dot, marginBottom: 3 }}>
//                 Today's Readiness
//               </p>
//               <p style={{ fontSize: 13, fontWeight: 800, color: "white", lineHeight: 1.2 }}>{suggestion.headline}</p>
//             </div>
//           </div>

//           <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 12 }} />

//           <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
//             {suggestion.suggestions.map((s, i) => (
//               <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
//                 <div style={{
//                   width: 5, height: 5, borderRadius: "50%", background: suggestion.dot,
//                   marginTop: 5, flexShrink: 0, opacity: 1 - i * 0.15
//                 }} />
//                 <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.4, fontWeight: 500 }}>{s}</p>
//               </div>
//             ))}
//           </div>

//           <div style={{
//             marginTop: 12, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.06)",
//             display: "flex", justifyContent: "space-between", alignItems: "center"
//           }}>
//             <span style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
//               {new Date(data.date).toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" })}
//             </span>
//             <Link to="/readiness" style={{
//               fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
//               color: suggestion.dot, textDecoration: "none", padding: "4px 10px",
//               borderRadius: 999, background: suggestion.bg, border: `1px solid ${suggestion.border}`,
//             }}>
//               View Details →
//             </Link>
//           </div>
//         </div>
//       )}

//       <style>{`
//         @keyframes readiness-pulse {
//           0%, 100% { opacity: 0.4; transform: scale(1); }
//           50%       { opacity: 0.15; transform: scale(1.12); }
//         }
//         @keyframes tooltip-in {
//           from { opacity: 0; transform: scale(0.9) translateY(-4px); }
//           to   { opacity: 1; transform: scale(1) translateY(0); }
//         }
//       `}</style>
//     </div>
//   );
// }

// /* ── Main Navbar ── */
// export default function Navbar() {
//   const { logout, isAuthenticated, user } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => { logout(); navigate("/login"); };

//   if (!isAuthenticated) return null;

//   return (
//     <nav style={{
//       position: "sticky", top: 0, zIndex: 100,
//       display: "flex", alignItems: "center", justifyContent: "space-between",
//       padding: "0 28px", height: 64,
//       background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)",
//       borderBottom: "1px solid rgba(226,232,240,0.8)",
//       boxShadow: "0 1px 20px rgba(0,0,0,0.04)",
//     }}>

//       {/* ── Logo ── */}
//       <Link
//         to="/dashboard"
//         style={{
//           textDecoration: "none",
//           display: "flex",
//           alignItems: "center",
//           gap: 10,
//           flexShrink: 0
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           {/* <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
//       <circle cx="5" cy="14" r="4.5" stroke="#6366f1" strokeWidth="1.5" fill="none"/>
//       <circle cx="23" cy="14" r="4.5" stroke="#6366f1" strokeWidth="1.5" fill="none"/>
//       <path d="M5 14 L10 5 L18 5 L23 14" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
//       <path d="M14 5 L14 10 L23 14" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
//       <circle cx="14" cy="5" r="1.5" fill="#6366f1"/>
//       <path d="M18 5 L22 2" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round"/>
//     </svg> */}

//           <span style={{ fontSize: "1.05rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
//             <span style={{ color: "#0f172a" }}>EVOLVE</span>
//             <span
//               style={{
//                 background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent"
//               }}
//             >
//               360
//             </span>
//           </span>
//         </div>
//       </Link>

//       {/* ── Center Nav ── */}
//       <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
//         {NAV_ITEMS.map(({ name, path, icon: Icon }) => {
//           const isActive = location.pathname === path;
//           const isApsHistory = path === "/aps-history";
//           return (
//             <Link key={path} to={path} style={{
//               position: "relative", padding: "7px 12px", borderRadius: 10,
//               fontSize: 12.5, fontWeight: isActive ? 700 : 500,
//               color: isActive
//                 ? isApsHistory ? "#7c3aed" : "#6366f1"
//                 : "#64748b",
//               background: isActive
//                 ? isApsHistory ? "rgba(124,58,237,0.08)" : "rgba(99,102,241,0.07)"
//                 : "transparent",
//               textDecoration: "none", transition: "all 0.15s",
//               display: "flex", alignItems: "center", gap: 5,
//               // Subtle highlight for APS History
//               ...(isApsHistory && !isActive ? {
//                 border: "1px solid rgba(124,58,237,0.15)",
//                 background: "rgba(124,58,237,0.03)",
//               } : { border: "1px solid transparent" }),
//             }}
//               onMouseOver={e => {
//                 if (!isActive) {
//                   e.currentTarget.style.color = isApsHistory ? "#7c3aed" : "#6366f1";
//                   e.currentTarget.style.background = isApsHistory ? "rgba(124,58,237,0.07)" : "rgba(99,102,241,0.05)";
//                 }
//               }}
//               onMouseOut={e => {
//                 if (!isActive) {
//                   e.currentTarget.style.color = "#64748b";
//                   e.currentTarget.style.background = isApsHistory ? "rgba(124,58,237,0.03)" : "transparent";
//                 }
//               }}
//             >
//               {Icon && <Icon size={13} />}
//               {name}
//               {isActive && (
//                 <span style={{
//                   position: "absolute", bottom: 2, left: "50%",
//                   transform: "translateX(-50%)", width: 16, height: 2,
//                   borderRadius: 999,
//                   background: isApsHistory
//                     ? "linear-gradient(90deg, #7c3aed, #6366f1)"
//                     : "linear-gradient(90deg, #6366f1, #8b5cf6)",
//                 }} />
//               )}
//             </Link>
//           );
//         })}
//       </div>

//       {/* ── Right Icons ── */}
//       <div style={{ display: "flex", alignItems: "center", gap: 8 }}>

//         {/* Readiness Indicator */}
//         <ReadinessIndicator userId={user?.id} />

//         <div style={{ width: 1, height: 22, background: "#e2e8f0", margin: "0 4px" }} />

//         {/* Profile */}
//         <Link to="/onboarding" style={{
//           width: 34, height: 34, borderRadius: 10,
//           border: location.pathname === "/onboarding" ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent",
//           background: location.pathname === "/onboarding" ? "rgba(99,102,241,0.08)" : "transparent",
//           display: "flex", alignItems: "center", justifyContent: "center",
//           color: location.pathname === "/onboarding" ? "#6366f1" : "#94a3b8",
//           transition: "all 0.15s",
//         }}
//           onMouseOver={e => { e.currentTarget.style.background = "rgba(99,102,241,0.08)"; e.currentTarget.style.color = "#6366f1"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)"; }}
//           onMouseOut={e => { if (location.pathname !== "/onboarding") { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.borderColor = "transparent"; } }}
//         >
//           <User size={16} />
//         </Link>

//         <div style={{ width: 1, height: 22, background: "#e2e8f0", margin: "0 2px" }} />

//         {/* Logout */}
//         <button onClick={handleLogout} style={{
//           width: 34, height: 34, borderRadius: 10,
//           border: "1px solid transparent", background: "transparent",
//           display: "flex", alignItems: "center", justifyContent: "center",
//           color: "#94a3b8", cursor: "pointer", transition: "all 0.15s",
//         }}
//           onMouseOver={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.2)"; }}
//           onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.borderColor = "transparent"; }}
//         >
//           <LogOut size={16} />
//         </button>
//       </div>
//     </nav>
//   );
// }

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, LogOut, BarChart2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { readinessAPI } from "../api/axios";

/* ══════════════════════════════════════════════
   NAV STRUCTURE
   Top-level: quick-check / daily pages
   More menu: the deep feature pages
══════════════════════════════════════════════ */
const TOP_NAV = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Workout", path: "/workout" },
  { name: "Readiness", path: "/readiness" },
  { name: "Nutrition", path: "/nutrition" },
  { name: "Model", path: "/model" },
  { name: "APS", path: "/aps" },

];

const MORE_NAV = [
  { name: "Water", path: "/water-tracker", emoji: "💧" },
  { name: "Heart Rate", path: "/heartrate", emoji: "❤️" },
  { name: "APS History", path: "/aps-history", emoji: "📊" },
  { name: "Analyzer", path: "/analyzer", emoji: "🔍" },
];

/* ══════════════════════════════════════════════
   READINESS LOGIC (unchanged)
══════════════════════════════════════════════ */
function getReadinessSuggestion(score, category) {
  if (!score && score !== 0) return null;
  if (category === "low" || score < 45) {
    return {
      level: "low", headline: "Rest or Light Activity",
      suggestions: ["Reduce training intensity by 40–60%", "Focus on mobility & stretching", "Prioritize sleep and recovery", "Light walk or yoga only"],
      color: "#f43f5e", bg: "rgba(244,63,94,0.08)", border: "rgba(244,63,94,0.2)", glow: "rgba(244,63,94,0.15)", dot: "#f43f5e",
    };
  }
  if (category === "moderate" || score < 75) {
    return {
      level: "moderate", headline: "Moderate Training",
      suggestions: ["Reduce intensity by ~20%", "Avoid max-effort sets today", "Focus on technique & form", "Keep sessions under 60 min"],
      color: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)", glow: "rgba(245,158,11,0.15)", dot: "#f59e0b",
    };
  }
  return {
    level: "high", headline: "Peak Performance Ready",
    suggestions: ["Go for PRs & max effort sets", "Increase volume by 10–15%", "Tackle your hardest sessions", "Full intensity — you're primed!"],
    color: "#10b981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)", glow: "rgba(16,185,129,0.15)", dot: "#10b981",
  };
}

/* ══════════════════════════════════════════════
   READINESS INDICATOR (unchanged from original)
══════════════════════════════════════════════ */
function ReadinessIndicator({ userId }) {
  const [data, setData] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!userId) return;
    readinessAPI.getHistory(userId)
      .then(res => { if (res.data?.[0]) setData(res.data[0]); })
      .catch(() => { })
      .finally(() => setLoaded(true));
  }, [userId]);

  if (!loaded || !data) return null;
  const suggestion = getReadinessSuggestion(data.readinessScore, data.readinessCategory);
  if (!suggestion) return null;

  const handleMouseEnter = () => { clearTimeout(timeoutRef.current); setHovered(true); };
  const handleMouseLeave = () => { timeoutRef.current = setTimeout(() => setHovered(false), 200); };

  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center" }}
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

      <button style={{
        position: "relative", width: 34, height: 34, borderRadius: 10,
        border: `1px solid ${suggestion.border}`, background: suggestion.bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", transition: "all 0.2s",
        boxShadow: hovered ? `0 0 0 3px ${suggestion.glow}` : "none",
      }}>
        <span style={{ position: "absolute", inset: -3, borderRadius: 12, border: `1.5px solid ${suggestion.dot}`, opacity: 0.4, animation: "readiness-pulse 2s ease-in-out infinite", pointerEvents: "none" }} />
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7" stroke={suggestion.border.replace("0.2", "0.4")} strokeWidth="1.5" fill="none" />
          <circle cx="9" cy="9" r="7" stroke={suggestion.dot} strokeWidth="2" fill="none"
            strokeLinecap="round"
            strokeDasharray={`${(data.readinessScore / 100) * 43.98} 43.98`}
            transform="rotate(-90 9 9)"
            style={{ transition: "stroke-dasharray 0.6s ease" }} />
          <circle cx="9" cy="9" r="2.5" fill={suggestion.dot} />
        </svg>
        <span style={{
          position: "absolute", top: -6, right: -6, minWidth: 16, height: 16,
          borderRadius: 999, background: suggestion.dot, color: "white",
          fontSize: 8, fontWeight: 800, display: "flex", alignItems: "center",
          justifyContent: "center", padding: "0 3px",
          boxShadow: `0 2px 6px ${suggestion.glow}`, letterSpacing: "-0.02em",
        }}>{data.readinessScore}</span>
      </button>

      {hovered && (
        <div style={{
          position: "absolute", top: "calc(100% + 12px)", right: 0, width: 260,
          background: "rgba(15,23,42,0.97)", backdropFilter: "blur(20px)",
          border: `1px solid ${suggestion.border}`, borderRadius: 16, padding: 16,
          boxShadow: `0 20px 60px rgba(0,0,0,0.4),0 0 0 1px ${suggestion.border},inset 0 1px 0 rgba(255,255,255,0.06)`,
          zIndex: 1000, animation: "tooltip-in 0.18s cubic-bezier(0.34,1.56,0.64,1)",
          transformOrigin: "top right",
        }}>
          <div style={{ position: "absolute", top: -6, right: 13, width: 10, height: 10, background: "rgba(15,23,42,0.97)", border: `1px solid ${suggestion.border}`, borderBottom: "none", borderRight: "none", transform: "rotate(45deg)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: suggestion.bg, border: `1px solid ${suggestion.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke={suggestion.border.replace("0.2", "0.5")} strokeWidth="1.5" fill="none" />
                <circle cx="10" cy="10" r="8" stroke={suggestion.dot} strokeWidth="2.5" fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${(data.readinessScore / 100) * 50.27} 50.27`}
                  transform="rotate(-90 10 10)" />
                <text x="10" y="13.5" textAnchor="middle" fontSize="7" fontWeight="800" fill={suggestion.dot} fontFamily="sans-serif">{data.readinessScore}</text>
              </svg>
            </div>
            <div>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: suggestion.dot, marginBottom: 3 }}>Today's Readiness</p>
              <p style={{ fontSize: 13, fontWeight: 800, color: "white", lineHeight: 1.2 }}>{suggestion.headline}</p>
            </div>
          </div>
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 12 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {suggestion.suggestions.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: suggestion.dot, marginTop: 5, flexShrink: 0, opacity: 1 - i * 0.15 }} />
                <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.4, fontWeight: 500 }}>{s}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {new Date(data.date).toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" })}
            </span>
            <Link to="/readiness" style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: suggestion.dot, textDecoration: "none", padding: "4px 10px", borderRadius: 999, background: suggestion.bg, border: `1px solid ${suggestion.border}` }}>
              View Details →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   MORE DROPDOWN
══════════════════════════════════════════════ */
function MoreMenu({ currentPath }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const timeoutRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const anyActive = MORE_NAV.some(item => item.path === currentPath);

  const handleMouseEnter = () => { clearTimeout(timeoutRef.current); setOpen(true); };
  const handleMouseLeave = () => { timeoutRef.current = setTimeout(() => setOpen(false), 120); };

  return (
    <div ref={ref} style={{ position: "relative" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger pill */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: "relative",
          display: "flex", alignItems: "center", gap: 5,
          padding: "7px 13px", borderRadius: 10,
          fontSize: 12.5, fontWeight: anyActive ? 700 : 500,
          color: anyActive ? "#6366f1" : "#64748b",
          background: anyActive ? "rgba(99,102,241,0.07)" : "transparent",
          border: anyActive ? "1px solid rgba(99,102,241,0.15)" : "1px solid transparent",
          cursor: "pointer", transition: "all 0.15s",
        }}
        onMouseOver={e => { if (!anyActive) { e.currentTarget.style.color = "#6366f1"; e.currentTarget.style.background = "rgba(99,102,241,0.05)"; } }}
        onMouseOut={e => { if (!anyActive) { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.background = "transparent"; } }}
      >
        Features
        {/* Chevron */}
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
          <polyline points="2 4 6 8 10 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* Active dot if a More page is active */}
        {anyActive && (
          <span style={{ position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)", width: 16, height: 2, borderRadius: 999, background: "linear-gradient(90deg,#6366f1,#8b5cf6)" }} />
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)",
          width: 220,
          background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(226,232,240,0.9)",
          borderRadius: 16, overflow: "hidden",
          boxShadow: "0 16px 48px rgba(99,102,241,0.12), 0 2px 8px rgba(0,0,0,0.06)",
          zIndex: 200,
          animation: "dropdown-in 0.18s cubic-bezier(0.34,1.56,0.64,1)",
          transformOrigin: "top center",
        }}>
          {/* Arrow */}
          <div style={{ position: "absolute", top: -6, left: "50%", transform: "translateX(-50%) rotate(45deg)", width: 10, height: 10, background: "rgba(255,255,255,0.98)", border: "1px solid rgba(226,232,240,0.9)", borderBottom: "none", borderRight: "none" }} />

          {/* Section label */}
          <div style={{ padding: "12px 16px 8px", borderBottom: "1px solid rgba(226,232,240,0.6)" }}>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#94a3b8" }}>Main Features</p>
          </div>

          {/* Items */}
          <div style={{ padding: "6px 8px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
            {MORE_NAV.map(({ name, path, emoji }) => {
              const isActive = currentPath === path;
              return (
                <Link key={path} to={path}
                  onClick={() => setOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "9px 12px", borderRadius: 10,
                    textDecoration: "none", transition: "all 0.12s",
                    background: isActive ? "rgba(99,102,241,0.07)" : "transparent",
                    border: isActive ? "1px solid rgba(99,102,241,0.12)" : "1px solid transparent",
                  }}
                  onMouseOver={e => { if (!isActive) { e.currentTarget.style.background = "rgba(99,102,241,0.04)"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.08)"; } }}
                  onMouseOut={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; } }}
                >
                  {/* Emoji icon */}
                  <span style={{
                    width: 28, height: 28, borderRadius: 8, fontSize: 14,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: isActive ? "rgba(99,102,241,0.1)" : "rgba(148,163,184,0.08)",
                    border: isActive ? "1px solid rgba(99,102,241,0.2)" : "1px solid rgba(148,163,184,0.15)",
                    flexShrink: 0,
                  }}>{emoji}</span>

                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: isActive ? 700 : 500, color: isActive ? "#6366f1" : "#374151", lineHeight: 1 }}>{name}</p>
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", flexShrink: 0 }} />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN NAVBAR
══════════════════════════════════════════════ */
export default function Navbar() {
  const { logout, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => { logout(); navigate("/login"); };

  if (!isAuthenticated) return null;

  return (
    <>
      <style>{`
        @keyframes readiness-pulse {
          0%,100% { opacity:0.4; transform:scale(1); }
          50%      { opacity:0.15; transform:scale(1.12); }
        }
        @keyframes tooltip-in {
          from { opacity:0; transform:scale(0.9) translateY(-4px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes dropdown-in {
          from { opacity:0; transform:translateX(-50%) scale(0.95) translateY(-4px); }
          to   { opacity:1; transform:translateX(-50%) scale(1) translateY(0); }
        }
      `}</style>

      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 28px", height: 64,
        background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(226,232,240,0.8)",
        boxShadow: "0 1px 20px rgba(0,0,0,0.04)",
        fontFamily: "'Outfit', sans-serif",
      }}>

        {/* ── LOGO ── */}
        <Link to="/dashboard" style={{ textDecoration: "none", flexShrink: 0 }}>
          <span style={{ fontSize: "1.05rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
            <span style={{ color: "#0f172a" }}>EVOLVE</span>
            <span style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>360</span>
          </span>
        </Link>

        {/* ── CENTER NAV ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>

          {/* Top-level pages */}
          {TOP_NAV.map(({ name, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link key={path} to={path} style={{
                position: "relative", padding: "7px 12px", borderRadius: 10,
                fontSize: 12.5, fontWeight: isActive ? 700 : 500,
                color: isActive ? "#6366f1" : "#64748b",
                background: isActive ? "rgba(99,102,241,0.07)" : "transparent",
                border: isActive ? "1px solid rgba(99,102,241,0.15)" : "1px solid transparent",
                textDecoration: "none", transition: "all 0.15s",
              }}
                onMouseOver={e => { if (!isActive) { e.currentTarget.style.color = "#6366f1"; e.currentTarget.style.background = "rgba(99,102,241,0.05)"; } }}
                onMouseOut={e => { if (!isActive) { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.background = "transparent"; } }}
              >
                {name}
                {isActive && (
                  <span style={{ position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)", width: 16, height: 2, borderRadius: 999, background: "linear-gradient(90deg,#6366f1,#8b5cf6)" }} />
                )}
              </Link>
            );
          })}

          {/* Divider between top-nav and More */}
          <div style={{ width: 1, height: 16, background: "rgba(226,232,240,0.9)", margin: "0 4px" }} />

          {/* More / Features dropdown */}
          <MoreMenu currentPath={location.pathname} />
        </div>

        {/* ── RIGHT SIDE ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>

          {/* Readiness indicator */}
          <ReadinessIndicator userId={user?.id} />

          {/* Thin divider */}
          <div style={{ width: 1, height: 22, background: "rgba(226,232,240,0.9)", margin: "0 2px" }} />

          {/* Profile */}
          <Link to="/onboarding" style={{
            width: 34, height: 34, borderRadius: 10,
            border: location.pathname === "/onboarding" ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent",
            background: location.pathname === "/onboarding" ? "rgba(99,102,241,0.08)" : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: location.pathname === "/onboarding" ? "#6366f1" : "#94a3b8",
            transition: "all 0.15s",
          }}
            onMouseOver={e => { e.currentTarget.style.background = "rgba(99,102,241,0.08)"; e.currentTarget.style.color = "#6366f1"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)"; }}
            onMouseOut={e => { if (location.pathname !== "/onboarding") { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.borderColor = "transparent"; } }}
          >
            <User size={16} />
          </Link>

          {/* Logout */}
          <button onClick={handleLogout} style={{
            width: 34, height: 34, borderRadius: 10,
            border: "1px solid transparent", background: "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#94a3b8", cursor: "pointer", transition: "all 0.15s",
          }}
            onMouseOver={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.2)"; }}
            onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.borderColor = "transparent"; }}
          >
            <LogOut size={16} />
          </button>
        </div>

      </nav>
    </>
  );
}