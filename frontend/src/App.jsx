


// // // // // // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// // // // // // import { useState } from "react";
// // // // // // import ProtectedRoute from "./components/ProtectedRoute";
// // // // // // import Sidebar from "./components/Sidebar";

// // // // // // import Login from "./pages/Login";
// // // // // // import Register from "./pages/Register";
// // // // // // import Dashboard from "./pages/Dashboard";
// // // // // // import Onboarding from "./pages/Onboarding";
// // // // // // import Workout from "./pages/Workout";
// // // // // // import Readiness from "./pages/Readiness";
// // // // // // import Nutrition from "./pages/Nutrition";
// // // // // // import APS from "./pages/APS";

// // // // // // function AppLayout({ children }) {
// // // // // //   const [isOpen, setIsOpen] = useState(true);

// // // // // //   return (
// // // // // //     <div className="flex min-h-screen">

// // // // // //       {/* Sidebar */}
// // // // // //       <div
// // // // // //         className={`transition-all duration-300 ${
// // // // // //           isOpen ? "w-64" : "w-0"
// // // // // //         } overflow-hidden`}
// // // // // //       >
// // // // // //         <Sidebar />
// // // // // //       </div>

// // // // // //       {/* Main Content */}
// // // // // //       <div className="flex-1 flex flex-col">

// // // // // //         {/* Top Bar */}
// // // // // //         <div className="h-16 border-b border-[var(--color-border-soft)] bg-[var(--color-bg-main)] flex items-center px-6 justify-between">

// // // // // //           <button
// // // // // //             onClick={() => setIsOpen(!isOpen)}
// // // // // //             className="btn-outline px-4 py-1 text-sm"
// // // // // //           >
// // // // // //             {isOpen ? "Hide" : "Menu"}
// // // // // //           </button>

// // // // // //           <h1 className="font-semibold text-[var(--color-text-secondary)]">
// // // // // //             Adaptive Fitness Intelligence
// // // // // //           </h1>

// // // // // //         </div>

// // // // // //         {/* Page Content */}
// // // // // //         <main className="flex-1 p-8 bg-[var(--color-bg-main)]">
// // // // // //           {children}
// // // // // //         </main>

// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default function App() {
// // // // // //   return (
// // // // // //     <BrowserRouter>
// // // // // //       <Routes>

// // // // // //         {/* Public Routes */}
// // // // // //         <Route path="/login" element={<Login />} />
// // // // // //         <Route path="/register" element={<Register />} />

// // // // // //         {/* Protected Routes */}
// // // // // //         <Route
// // // // // //           path="/dashboard"
// // // // // //           element={
// // // // // //             <ProtectedRoute>
// // // // // //               <AppLayout>
// // // // // //                 <Dashboard />
// // // // // //               </AppLayout>
// // // // // //             </ProtectedRoute>
// // // // // //           }
// // // // // //         />

// // // // // //         <Route
// // // // // //           path="/onboarding"
// // // // // //           element={
// // // // // //             <ProtectedRoute>
// // // // // //               <AppLayout>
// // // // // //                 <Onboarding />
// // // // // //               </AppLayout>
// // // // // //             </ProtectedRoute>
// // // // // //           }
// // // // // //         />

// // // // // //         <Route
// // // // // //           path="/workout"
// // // // // //           element={
// // // // // //             <ProtectedRoute>
// // // // // //               <AppLayout>
// // // // // //                 <Workout />
// // // // // //               </AppLayout>
// // // // // //             </ProtectedRoute>
// // // // // //           }
// // // // // //         />

// // // // // //         <Route
// // // // // //           path="/readiness"
// // // // // //           element={
// // // // // //             <ProtectedRoute>
// // // // // //               <AppLayout>
// // // // // //                 <Readiness />
// // // // // //               </AppLayout>
// // // // // //             </ProtectedRoute>
// // // // // //           }
// // // // // //         />

// // // // // //         <Route
// // // // // //           path="/nutrition"
// // // // // //           element={
// // // // // //             <ProtectedRoute>
// // // // // //               <AppLayout>
// // // // // //                 <Nutrition />
// // // // // //               </AppLayout>
// // // // // //             </ProtectedRoute>
// // // // // //           }
// // // // // //         />

// // // // // //         <Route
// // // // // //           path="/aps"
// // // // // //           element={
// // // // // //             <ProtectedRoute>
// // // // // //               <AppLayout>
// // // // // //                 <APS />
// // // // // //               </AppLayout>
// // // // // //             </ProtectedRoute>
// // // // // //           }
// // // // // //         />

// // // // // //         <Route path="*" element={<Navigate to="/login" />} />

// // // // // //       </Routes>
// // // // // //     </BrowserRouter>
// // // // // //   );
// // // // // // }

// // // // // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// // // // // import ProtectedRoute from "./components/ProtectedRoute";
// // // // // import Navbar from "./components/Navbar";

// // // // // import Login from "./pages/Login";
// // // // // import Register from "./pages/Register";
// // // // // import Dashboard from "./pages/Dashboard";
// // // // // import Onboarding from "./pages/Onboarding";
// // // // // import Workout from "./pages/Workout";
// // // // // import Readiness from "./pages/Readiness";
// // // // // import Nutrition from "./pages/Nutrition";
// // // // // import APS from "./pages/APS";

// // // // // /* Layout without Sidebar */
// // // // // function AppLayout({ children }) {
// // // // //   return (
// // // // //     <div className="min-h-screen flex flex-col bg-[var(--color-bg-main)]">
      
// // // // //       {/* Top Navbar */}
// // // // //       <Navbar />

// // // // //       {/* Page Content */}
// // // // //       <main className="flex-1 p-8">
// // // // //         {children}
// // // // //       </main>

// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default function App() {
// // // // //   return (
// // // // //     <BrowserRouter>
// // // // //       <Routes>

// // // // //         {/* Public Routes */}
// // // // //         <Route path="/login" element={<Login />} />
// // // // //         <Route path="/register" element={<Register />} />

// // // // //         {/* Protected Routes */}
// // // // //         <Route
// // // // //           path="/dashboard"
// // // // //           element={
// // // // //             <ProtectedRoute>
// // // // //               <AppLayout>
// // // // //                 <Dashboard />
// // // // //               </AppLayout>
// // // // //             </ProtectedRoute>
// // // // //           }
// // // // //         />

// // // // //         <Route
// // // // //           path="/onboarding"
// // // // //           element={
// // // // //             <ProtectedRoute>
// // // // //               <AppLayout>
// // // // //                 <Onboarding />
// // // // //               </AppLayout>
// // // // //             </ProtectedRoute>
// // // // //           }
// // // // //         />

// // // // //         <Route
// // // // //           path="/workout"
// // // // //           element={
// // // // //             <ProtectedRoute>
// // // // //               <AppLayout>
// // // // //                 <Workout />
// // // // //               </AppLayout>
// // // // //             </ProtectedRoute>
// // // // //           }
// // // // //         />

// // // // //         <Route
// // // // //           path="/readiness"
// // // // //           element={
// // // // //             <ProtectedRoute>
// // // // //               <AppLayout>
// // // // //                 <Readiness />
// // // // //               </AppLayout>
// // // // //             </ProtectedRoute>
// // // // //           }
// // // // //         />

// // // // //         <Route
// // // // //           path="/nutrition"
// // // // //           element={
// // // // //             <ProtectedRoute>
// // // // //               <AppLayout>
// // // // //                 <Nutrition />
// // // // //               </AppLayout>
// // // // //             </ProtectedRoute>
// // // // //           }
// // // // //         />

// // // // //         <Route
// // // // //           path="/aps"
// // // // //           element={
// // // // //             <ProtectedRoute>
// // // // //               <AppLayout>
// // // // //                 <APS />
// // // // //               </AppLayout>
// // // // //             </ProtectedRoute>
// // // // //           }
// // // // //         />

// // // // //         <Route path="*" element={<Navigate to="/login" />} />

// // // // //       </Routes>
// // // // //     </BrowserRouter>
// // // // //   );
// // // // // }


// // // // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// // // // import ProtectedRoute from "./components/ProtectedRoute";
// // // // import Navbar from "./components/Navbar";

// // // // import Login from "./pages/Login";
// // // // import Register from "./pages/Register";
// // // // import Dashboard from "./pages/Dashboard";
// // // // import Onboarding from "./pages/Onboarding";
// // // // import Workout from "./pages/Workout";
// // // // import Readiness from "./pages/Readiness";
// // // // import Nutrition from "./pages/Nutrition";
// // // // import APS from "./pages/APS";
// // // // import HR from "./pages/HearRate";

// // // // const globalStyles = `
// // // //   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

// // // //   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

// // // //   :root {
// // // //     --color-bg-main:      #111111;
// // // //     --epa-bg:             #111111;
// // // //     --epa-surface:        #1C1C1C;
// // // //     --epa-gold:           #C6A75E;
// // // //     --epa-emerald:        #0E3B32;
// // // //     --epa-emerald-bright: #2E8B6A;
// // // //     --epa-text:           #E8E6E3;
// // // //     --epa-muted:          #A1A1A1;
// // // //     --epa-danger:         #5C1A1A;
// // // //     --epa-border:         rgba(198,167,94,0.15);
// // // //     --epa-radius:         8px;
// // // //     --epa-serif:          'Cormorant Garamond', Georgia, serif;
// // // //     --epa-sans:           'DM Sans', system-ui, sans-serif;
// // // //   }

// // // //   html, body, #root {
// // // //     min-height: 100vh;
// // // //     background-color: #111111;
// // // //     color: #E8E6E3;
// // // //     font-family: 'DM Sans', system-ui, sans-serif;
// // // //     -webkit-font-smoothing: antialiased;
// // // //   }

// // // //   ::-webkit-scrollbar { width: 6px; }
// // // //   ::-webkit-scrollbar-track { background: #111111; }
// // // //   ::-webkit-scrollbar-thumb { background: rgba(198,167,94,0.25); border-radius: 3px; }
// // // //   ::-webkit-scrollbar-thumb:hover { background: rgba(198,167,94,0.45); }
// // // //   ::selection { background: rgba(198,167,94,0.2); color: #E8E6E3; }

// // // //   /* ── Global component overrides so existing pages inherit the theme ── */
// // // //   .card {
// // // //     background: #1C1C1C !important;
// // // //     border: 1px solid rgba(198,167,94,0.15) !important;
// // // //     border-radius: 8px !important;
// // // //     color: #E8E6E3 !important;
// // // //   }

// // // //   .btn-primary {
// // // //     background: #C6A75E !important;
// // // //     color: #111111 !important;
// // // //     border: none !important;
// // // //     border-radius: 8px !important;
// // // //     padding: 13px 32px !important;
// // // //     font-family: 'DM Sans', sans-serif !important;
// // // //     font-size: 11px !important;
// // // //     font-weight: 600 !important;
// // // //     letter-spacing: 0.12em !important;
// // // //     text-transform: uppercase !important;
// // // //     cursor: pointer !important;
// // // //     transition: background 0.2s ease !important;
// // // //   }
// // // //   .btn-primary:hover  { background: #b8954f !important; }
// // // //   .btn-primary:disabled { opacity: 0.5 !important; cursor: not-allowed !important; }

// // // //   .btn-secondary, .btn-outline {
// // // //     background: transparent !important;
// // // //     color: #C6A75E !important;
// // // //     border: 1px solid rgba(198,167,94,0.45) !important;
// // // //     border-radius: 8px !important;
// // // //     padding: 12px 28px !important;
// // // //     font-family: 'DM Sans', sans-serif !important;
// // // //     font-size: 11px !important;
// // // //     font-weight: 600 !important;
// // // //     letter-spacing: 0.12em !important;
// // // //     text-transform: uppercase !important;
// // // //     cursor: pointer !important;
// // // //     transition: border-color 0.2s ease, background 0.2s ease !important;
// // // //   }
// // // //   .btn-secondary:hover, .btn-outline:hover {
// // // //     border-color: rgba(198,167,94,0.9) !important;
// // // //     background: rgba(198,167,94,0.05) !important;
// // // //   }

// // // //   input, textarea, select {
// // // //     background: #111111 !important;
// // // //     border: 1px solid rgba(198,167,94,0.2) !important;
// // // //     border-radius: 8px !important;
// // // //     color: #E8E6E3 !important;
// // // //     font-family: 'DM Sans', sans-serif !important;
// // // //   }
// // // //   input:focus, textarea:focus, select:focus {
// // // //     outline: none !important;
// // // //     border-color: rgba(198,167,94,0.6) !important;
// // // //   }
// // // //   input::placeholder, textarea::placeholder { color: #A1A1A1 !important; }

// // // //   /* ── Tailwind safety overrides ── */
// // // //   [class*="bg-linear"], [class*="bg-gradient"] { background: #1C1C1C !important; }
// // // //   .bg-white, .bg-gray-50, .bg-gray-100    { background-color: #1C1C1C !important; }
// // // //   .bg-indigo-600, .bg-purple-600, .bg-blue-600 { background-color: #C6A75E !important; color: #111111 !important; }
// // // //   .text-white                              { color: #E8E6E3 !important; }
// // // //   .text-gray-500, .text-gray-400, .text-gray-600 { color: #A1A1A1 !important; }
// // // //   .text-gray-900, .text-gray-800, .text-gray-700 { color: #E8E6E3 !important; }
// // // //   .border-gray-200, .border-gray-300       { border-color: rgba(198,167,94,0.15) !important; }
// // // //   .rounded-3xl, .rounded-2xl, .rounded-xl  { border-radius: 8px !important; }
// // // //   .shadow-xl, .shadow-lg, .shadow-md       { box-shadow: 0 4px 24px rgba(0,0,0,0.45) !important; }
// // // // `;

// // // // function AppLayout({ children }) {
// // // //   return (
// // // //     <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#111111" }}>
// // // //       <Navbar />
// // // //       <main style={{ flex: 1 }}>
// // // //         {children}
// // // //       </main>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default function App() {
// // // //   return (
// // // //     <>
// // // //       {/* Inject Elite Performance Atelier global styles once at root */}
// // // //       <style>{globalStyles}</style>

// // // //       <BrowserRouter>
// // // //         <Routes>

// // // //           {/* Public */}
// // // //           <Route path="/login"    element={<Login />} />
// // // //           <Route path="/register" element={<Register />} />

// // // //           {/* Protected */}
// // // //           <Route path="/dashboard"  element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
// // // //           <Route path="/onboarding" element={<ProtectedRoute><AppLayout><Onboarding /></AppLayout></ProtectedRoute>} />
// // // //           <Route path="/workout"    element={<ProtectedRoute><AppLayout><Workout /></AppLayout></ProtectedRoute>} />
// // // //           <Route path="/readiness"  element={<ProtectedRoute><AppLayout><Readiness /></AppLayout></ProtectedRoute>} />
// // // //           <Route path="/nutrition"  element={<ProtectedRoute><AppLayout><Nutrition /></AppLayout></ProtectedRoute>} />
// // // //           <Route path="/aps"        element={<ProtectedRoute><AppLayout><APS /></AppLayout></ProtectedRoute>} />
// // // //           <Route path="/heartrate"  element={<ProtectedRoute><AppLayout><HR /></AppLayout></ProtectedRoute>} />

// // // //           <Route path="*" element={<Navigate to="/login" />} />

// // // //         </Routes>
// // // //       </BrowserRouter>
// // // //     </>
// // // //   );
// // // // }

// // // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// // // import ProtectedRoute from "./components/ProtectedRoute";
// // // import Navbar from "./components/Navbar";

// // // import Login from "./pages/Login";
// // // import Register from "./pages/Register";
// // // import Dashboard from "./pages/Dashboard";
// // // import Onboarding from "./pages/Onboarding";
// // // import Workout from "./pages/Workout";
// // // import Readiness from "./pages/Readiness";
// // // import Nutrition from "./pages/Nutrition";
// // // import APS from "./pages/APS";
// // // import HR from "./pages/HearRate";

// // // const globalStyles = `
// // //   @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
// // //   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

// // //   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

// // //   html, body, #root {
// // //     min-height: 100vh;
// // //     -webkit-font-smoothing: antialiased;
// // //   }

// // //   ::-webkit-scrollbar { width: 6px; }
// // //   ::selection { background: rgba(99,102,241,0.2); color: #0f172a; }
// // // `;

// // // function AppLayout({ children }) {
// // //   return (
// // //     <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
// // //       <Navbar />
// // //       <main style={{ flex: 1 }}>
// // //         {children}
// // //       </main>
// // //     </div>
// // //   );
// // // }

// // // export default function App() {
// // //   return (
// // //     <>
// // //       <style>{globalStyles}</style>

// // //       <BrowserRouter>
// // //         <Routes>

// // //           {/* Public */}
// // //           <Route path="/login"    element={<Login />} />
// // //           <Route path="/register" element={<Register />} />

// // //           {/* Protected */}
// // //           <Route path="/dashboard"  element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
// // //           <Route path="/onboarding" element={<ProtectedRoute><AppLayout><Onboarding /></AppLayout></ProtectedRoute>} />
// // //           <Route path="/workout"    element={<ProtectedRoute><AppLayout><Workout /></AppLayout></ProtectedRoute>} />
// // //           <Route path="/readiness"  element={<ProtectedRoute><AppLayout><Readiness /></AppLayout></ProtectedRoute>} />
// // //           <Route path="/nutrition"  element={<ProtectedRoute><AppLayout><Nutrition /></AppLayout></ProtectedRoute>} />
// // //           <Route path="/aps"        element={<ProtectedRoute><AppLayout><APS /></AppLayout></ProtectedRoute>} />
// // //           <Route path="/heartrate"  element={<ProtectedRoute><AppLayout><HR /></AppLayout></ProtectedRoute>} />

// // //           <Route path="*" element={<Navigate to="/login" />} />

// // //         </Routes>
// // //       </BrowserRouter>
// // //     </>
// // //   );
// // // }

// // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// // import ProtectedRoute from "./components/ProtectedRoute";
// // import Navbar from "./components/Navbar";

// // import Login from "./pages/Login";
// // import Register from "./pages/Register";
// // import Dashboard from "./pages/Dashboard";
// // import Onboarding from "./pages/Onboarding";
// // import Workout from "./pages/Workout";
// // import Readiness from "./pages/Readiness";
// // import Nutrition from "./pages/Nutrition";
// // import APS from "./pages/APS";
// // import HR from "./pages/HearRate";

// // const globalStyles = `
// //   @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

// //   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

// //   html, body, #root {
// //     min-height: 100vh;
// //     font-family: 'Outfit', sans-serif;
// //     -webkit-font-smoothing: antialiased;
// //     overflow-x: hidden;
// //   }

// //   ::-webkit-scrollbar { width: 8px; }
// //   ::-webkit-scrollbar-track { background: #f1f5f9; }
// //   ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #3b82f6, #6366f1); border-radius: 10px; }
// //   ::-webkit-scrollbar-thumb:hover { background: linear-gradient(to bottom, #2563eb, #4f46e5); }

// //   ::selection { background: rgba(99,102,241,0.15); color: #0f172a; }
// // `;

// // function AppLayout({ children }) {
// //   return (
// //     <div style={{
// //       minHeight: "100vh",
// //       display: "flex",
// //       flexDirection: "column",
// //       background: "linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #eef2ff 100%)",
// //     }}>
// //       <Navbar />
// //       <main style={{ flex: 1, width: "100%" }}>
// //         {children}
// //       </main>
// //     </div>
// //   );
// // }

// // export default function App() {
// //   return (
// //     <>
// //       <style>{globalStyles}</style>
// //       <BrowserRouter>
// //         <Routes>
// //           <Route path="/login"      element={<Login />} />
// //           <Route path="/register"   element={<Register />} />
// //           <Route path="/dashboard"  element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
// //           <Route path="/onboarding" element={<ProtectedRoute><AppLayout><Onboarding /></AppLayout></ProtectedRoute>} />
// //           <Route path="/workout"    element={<ProtectedRoute><AppLayout><Workout /></AppLayout></ProtectedRoute>} />
// //           <Route path="/readiness"  element={<ProtectedRoute><AppLayout><Readiness /></AppLayout></ProtectedRoute>} />
// //           <Route path="/nutrition"  element={<ProtectedRoute><AppLayout><Nutrition /></AppLayout></ProtectedRoute>} />
// //           <Route path="/aps"        element={<ProtectedRoute><AppLayout><APS /></AppLayout></ProtectedRoute>} />
// //           <Route path="/heartrate"  element={<ProtectedRoute><AppLayout><HR /></AppLayout></ProtectedRoute>} />
// //           <Route path="*"           element={<Navigate to="/login" />} />
// //         </Routes>
// //       </BrowserRouter>
// //     </>
// //   );
// // }

// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Navbar from "./components/Navbar";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Onboarding from "./pages/Onboarding";
// import Workout from "./pages/Workout";
// import Readiness from "./pages/Readiness";
// import Nutrition from "./pages/Nutrition";
// import APS from "./pages/APS";
// import HR from "./pages/HearRate";
// import APSHistory from "./pages/Apshistory";
// import Model from "./pages/Model";
// import WaterTracker from "./pages/Watertracker";
// import Analyzer from "./pages/Analyzer";
// import Rehab from "./pages/Rehab";
// import FunctionalTest from "./pages/Functionaltest";

// const globalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//   html, body, #root {
//     min-height: 100vh;
//     font-family: 'Outfit', sans-serif;
//     -webkit-font-smoothing: antialiased;
//     overflow-x: hidden;
//   }

//   ::-webkit-scrollbar { width: 8px; }
//   ::-webkit-scrollbar-track { background: #f1f5f9; }
//   ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #3b82f6, #6366f1); border-radius: 10px; }
//   ::-webkit-scrollbar-thumb:hover { background: linear-gradient(to bottom, #2563eb, #4f46e5); }

//   ::selection { background: rgba(99,102,241,0.15); color: #0f172a; }
// `;

// function AppLayout({ children }) {
//   return (
//     <div style={{
//       minHeight: "100vh",
//       display: "flex",
//       flexDirection: "column",
//       background: "linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #eef2ff 100%)",
//     }}>
//       <Navbar />
//       <main style={{ flex: 1, width: "100%" }}>
//         {children}
//       </main>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <>
//       <style>{globalStyles}</style>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/login"       element={<Login />} />
//           <Route path="/register"    element={<Register />} />
//           <Route path="/dashboard"   element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
//           <Route path="/onboarding"  element={<ProtectedRoute><AppLayout><Onboarding /></AppLayout></ProtectedRoute>} />
//           <Route path="/workout"     element={<ProtectedRoute><AppLayout><Workout /></AppLayout></ProtectedRoute>} />
//           <Route path="/readiness"   element={<ProtectedRoute><AppLayout><Readiness /></AppLayout></ProtectedRoute>} />
//           <Route path="/nutrition"   element={<ProtectedRoute><AppLayout><Nutrition /></AppLayout></ProtectedRoute>} />
//           <Route path="/aps"         element={<ProtectedRoute><AppLayout><APS /></AppLayout></ProtectedRoute>} />
//           <Route path="/aps-history" element={<ProtectedRoute><AppLayout><APSHistory /></AppLayout></ProtectedRoute>} />
//           <Route path="/heartrate"   element={<ProtectedRoute><AppLayout><HR /></AppLayout></ProtectedRoute>} />
//           <Route path="/model"       element={<ProtectedRoute><AppLayout><Model /></AppLayout></ProtectedRoute>} />
//           <Route path="/water-tracker" element={<ProtectedRoute><AppLayout><WaterTracker /></AppLayout></ProtectedRoute>} />
//           <Route path="/analyzer"    element={<ProtectedRoute><AppLayout><Analyzer /></AppLayout></ProtectedRoute>} />
//           <Route path="/rehab"       element={<ProtectedRoute><AppLayout><Rehab /></AppLayout></ProtectedRoute>} />
//           <Route path="/functional-tests" element={<ProtectedRoute><AppLayout><FunctionalTest /></AppLayout></ProtectedRoute>} />
//           <Route path="*"            element={<Navigate to="/login" />} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import Workout from "./pages/Workout";
import Readiness from "./pages/Readiness";
import Nutrition from "./pages/Nutrition";
import APS from "./pages/APS";
import HR from "./pages/HearRate";
import APSHistory from "./pages/Apshistory";
import Model from "./pages/Model";
import WaterTracker from "./pages/Watertracker";
import Analyzer from "./pages/Analyzer";
import Rehab from "./pages/Rehab";
import FunctionalTest from "./pages/Functionaltest";
import TrainingAnalysis from "./pages/TrainingAnalysis";
import PainAnalysis from "./pages/Painanalysis";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body, #root {
    min-height: 100vh;
    font-family: 'Outfit', sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: #f1f5f9; }
  ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #3b82f6, #6366f1); border-radius: 10px; }
  ::-webkit-scrollbar-thumb:hover { background: linear-gradient(to bottom, #2563eb, #4f46e5); }

  ::selection { background: rgba(99,102,241,0.15); color: #0f172a; }
`;

function AppLayout({ children }) {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #eef2ff 100%)",
    }}>

      {/* ── Navbar spans full width at top ── */}
      <Navbar />

      {/* ── Below navbar: sidebar + page content ── */}
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <Sidebar />
        <main style={{ flex: 1, minWidth: 0, overflowY: "auto" }}>
          {children}
        </main>
      </div>

    </div>
  );
}

export default function App() {
  return (
    <>
      <style>{globalStyles}</style>
      <BrowserRouter>
        <Routes>

          {/* Public */}
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected — all get Navbar + Sidebar + content */}
          <Route path="/dashboard"        element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
          <Route path="/onboarding"       element={<ProtectedRoute><AppLayout><Onboarding /></AppLayout></ProtectedRoute>} />
          <Route path="/workout"          element={<ProtectedRoute><AppLayout><Workout /></AppLayout></ProtectedRoute>} />
          <Route path="/readiness"        element={<ProtectedRoute><AppLayout><Readiness /></AppLayout></ProtectedRoute>} />
          <Route path="/nutrition"        element={<ProtectedRoute><AppLayout><Nutrition /></AppLayout></ProtectedRoute>} />
          <Route path="/aps"              element={<ProtectedRoute><AppLayout><APS /></AppLayout></ProtectedRoute>} />
          <Route path="/aps-history"      element={<ProtectedRoute><AppLayout><APSHistory /></AppLayout></ProtectedRoute>} />
          <Route path="/heartrate"        element={<ProtectedRoute><AppLayout><HR /></AppLayout></ProtectedRoute>} />
          <Route path="/model"            element={<ProtectedRoute><AppLayout><Model /></AppLayout></ProtectedRoute>} />
          <Route path="/water-tracker"    element={<ProtectedRoute><AppLayout><WaterTracker /></AppLayout></ProtectedRoute>} />
          <Route path="/analyzer"         element={<ProtectedRoute><AppLayout><Analyzer /></AppLayout></ProtectedRoute>} />
          <Route path="/rehab"            element={<ProtectedRoute><AppLayout><Rehab /></AppLayout></ProtectedRoute>} />
          <Route path="/functional-tests" element={<ProtectedRoute><AppLayout><FunctionalTest /></AppLayout></ProtectedRoute>} />
          <Route path="/training-analysis" element={<ProtectedRoute><AppLayout><TrainingAnalysis /></AppLayout></ProtectedRoute>} />
          <Route path="/pain-analysis"     element={<ProtectedRoute><AppLayout><PainAnalysis /></AppLayout></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}