// // // // import { useState } from "react";
// // // // import { useNavigate, Link } from "react-router-dom";
// // // // import { useAuth } from "../context/AuthContext";

// // // // export default function Login() {
// // // //   const navigate = useNavigate();
// // // //   const { login } = useAuth();

// // // //   const [form, setForm] = useState({
// // // //     email: "",
// // // //     password: "",
// // // //   });

// // // //   const [error, setError] = useState("");
// // // //   const [loading, setLoading] = useState(false);

// // // //   const handleChange = (e) => {
// // // //     setForm((prev) => ({
// // // //       ...prev,
// // // //       [e.target.name]: e.target.value,
// // // //     }));
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     setError("");
// // // //     setLoading(true);

// // // //     try {
// // // //       const user = await login(form.email, form.password);

// // // //       // Redirect based on onboarding status
// // // //       if (!user.isOnboarded) {
// // // //         navigate("/onboarding");
// // // //       } else {
// // // //         navigate("/dashboard");
// // // //       }

// // // //     } catch (err) {
// // // //       setError(err.message || "Login failed");
// // // //     }

// // // //     setLoading(false);
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen flex items-center justify-center px-6">
// // // //       <div className="card w-full max-w-md">

// // // //         <h2 className="text-3xl font-bold mb-8 text-center">
// // // //           Login
// // // //         </h2>

// // // //         {error && (
// // // //           <div className="mb-4 p-3 text-sm bg-red-100 text-red-600 rounded-lg">
// // // //             {error}
// // // //           </div>
// // // //         )}

// // // //         <form onSubmit={handleSubmit} className="space-y-5">

// // // //           <div>
// // // //             <label className="block text-sm mb-2">
// // // //               Email
// // // //             </label>
// // // //             <input
// // // //               type="email"
// // // //               name="email"
// // // //               required
// // // //               value={form.email}
// // // //               onChange={handleChange}
// // // //               className="input-field w-full"
// // // //               placeholder="Enter your email"
// // // //             />
// // // //           </div>

// // // //           <div>
// // // //             <label className="block text-sm mb-2">
// // // //               Password
// // // //             </label>
// // // //             <input
// // // //               type="password"
// // // //               name="password"
// // // //               required
// // // //               value={form.password}
// // // //               onChange={handleChange}
// // // //               className="input-field w-full"
// // // //               placeholder="Enter your password"
// // // //             />
// // // //           </div>

// // // //           <button
// // // //             type="submit"
// // // //             disabled={loading}
// // // //             className="btn-primary w-full"
// // // //           >
// // // //             {loading ? "Signing in..." : "Sign In"}
// // // //           </button>

// // // //         </form>

// // // //         <p className="text-sm text-center mt-6 text-[var(--color-text-secondary)]">
// // // //           Don't have an account?{" "}
// // // //           <Link
// // // //             to="/register"
// // // //             className="text-[var(--color-primary)] hover:underline font-medium"
// // // //           >
// // // //             Register
// // // //           </Link>
// // // //         </p>

// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // import { useState } from "react";
// // // import { useNavigate, Link } from "react-router-dom";
// // // import { useAuth } from "../context/AuthContext";
// // // import BikeLoader from "../components/BikeLoader";

// // // export default function Login() {
// // //   const navigate = useNavigate();
// // //   const { login } = useAuth();

// // //   const [form, setForm] = useState({
// // //     email: "",
// // //     password: "",
// // //   });

// // //   const [error, setError] = useState("");
// // //   const [loading, setLoading] = useState(false);

// // //   const handleChange = (e) => {
// // //     setForm((prev) => ({
// // //       ...prev,
// // //       [e.target.name]: e.target.value,
// // //     }));
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setError("");
// // //     setLoading(true);

// // //     try {
// // //       const user = await login(form.email, form.password);

// // //       if (!user.isOnboarded) {
// // //         navigate("/onboarding");
// // //       } else {
// // //         navigate("/dashboard");
// // //       }

// // //     } catch (err) {
// // //       setError(err.message || "Login failed");
// // //     }

// // //     setLoading(false);
// // //   };

// // //   return (
// // //     <>
// // //       {/* Loader Overlay */}
// // //       {loading && <BikeLoader />}

// // //       <div className="min-h-screen flex items-center justify-center px-6">
// // //         <div className="card w-full max-w-md">

// // //           <h2 className="text-3xl font-bold mb-8 text-center">
// // //             Login
// // //           </h2>

// // //           {error && (
// // //             <div className="mb-4 p-3 text-sm bg-red-100 text-red-600 rounded-lg">
// // //               {error}
// // //             </div>
// // //           )}

// // //           <form onSubmit={handleSubmit} className="space-y-5">

// // //             <div>
// // //               <label className="block text-sm mb-2">
// // //                 Email
// // //               </label>
// // //               <input
// // //                 type="email"
// // //                 name="email"
// // //                 required
// // //                 value={form.email}
// // //                 onChange={handleChange}
// // //                 className="input-field w-full"
// // //                 placeholder="Enter your email"
// // //               />
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm mb-2">
// // //                 Password
// // //               </label>
// // //               <input
// // //                 type="password"
// // //                 name="password"
// // //                 required
// // //                 value={form.password}
// // //                 onChange={handleChange}
// // //                 className="input-field w-full"
// // //                 placeholder="Enter your password"
// // //               />
// // //             </div>

// // //             <button
// // //               type="submit"
// // //               disabled={loading}
// // //               className="btn-primary w-full"
// // //             >
// // //               Sign In
// // //             </button>

// // //           </form>

// // //           <p className="text-sm text-center mt-6 text-[var(--color-text-secondary)]">
// // //             Don't have an account?{" "}
// // //             <Link
// // //               to="/register"
// // //               className="text-[var(--color-primary)] hover:underline font-medium"
// // //             >
// // //               Register
// // //             </Link>
// // //           </p>

// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // }


// // import { useState } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";
// // import BikeLoader from "../components/BikeLoader";

// // const loginStyles = `
// //   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

// //   .epa-login-root {
// //     min-height: 100vh;
// //     display: flex;
// //     background: #111111;
// //     font-family: 'DM Sans', sans-serif;
// //     color: #E8E6E3;
// //   }

// //   /* ══ LEFT PANEL ══ */
// //   .epa-login-left {
// //     flex: 1.1;
// //     position: relative;
// //     display: flex;
// //     flex-direction: column;
// //     justify-content: flex-end;
// //     overflow: hidden;
// //     min-height: 100vh;
// //   }

// //   .epa-login-bg-img {
// //     position: absolute;
// //     inset: 0;
// //     width: 100%;
// //     height: 100%;
// //     object-fit: cover;
// //     filter: brightness(0.35) contrast(1.1) saturate(0.8);
// //   }

// //   .epa-login-left-overlay {
// //     position: absolute;
// //     inset: 0;
// //     background: linear-gradient(
// //       to top,
// //       rgba(17,17,17,0.98) 0%,
// //       rgba(17,17,17,0.6) 40%,
// //       rgba(17,17,17,0.1) 100%
// //     );
// //   }

// //   .epa-login-left-content {
// //     position: relative;
// //     z-index: 2;
// //     padding: 52px;
// //   }

// //   .epa-login-brand {
// //     position: absolute;
// //     top: 52px;
// //     left: 52px;
// //     z-index: 2;
// //   }

// //   .epa-login-brand-name {
// //     font-family: 'Cormorant Garamond', Georgia, serif;
// //     font-size: 1.05rem;
// //     font-weight: 600;
// //     color: #C6A75E;
// //     letter-spacing: 0.08em;
// //   }

// //   .epa-login-brand-sub {
// //     font-size: 8px;
// //     font-weight: 600;
// //     letter-spacing: 0.22em;
// //     text-transform: uppercase;
// //     color: rgba(198,167,94,0.5);
// //     margin-top: 2px;
// //   }

// //   .epa-login-quote {
// //     font-family: 'Cormorant Garamond', Georgia, serif;
// //     font-size: clamp(1.8rem, 3vw, 2.8rem);
// //     font-weight: 500;
// //     font-style: italic;
// //     color: #E8E6E3;
// //     line-height: 1.2;
// //     margin-bottom: 20px;
// //     letter-spacing: -0.01em;
// //   }

// //   .epa-login-quote em {
// //     font-style: normal;
// //     color: #C6A75E;
// //   }

// //   .epa-login-quote-attr {
// //     font-size: 10px;
// //     font-weight: 600;
// //     letter-spacing: 0.18em;
// //     text-transform: uppercase;
// //     color: rgba(198,167,94,0.55);
// //     margin-bottom: 48px;
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //   }

// //   .epa-login-quote-attr::before {
// //     content: '';
// //     width: 24px;
// //     height: 1px;
// //     background: rgba(198,167,94,0.4);
// //     display: inline-block;
// //   }

// //   /* Metric strip */
// //   .epa-login-metrics {
// //     display: grid;
// //     grid-template-columns: repeat(3, 1fr);
// //     gap: 1px;
// //     background: rgba(198,167,94,0.12);
// //     border: 1px solid rgba(198,167,94,0.12);
// //     border-radius: 8px;
// //     overflow: hidden;
// //   }

// //   .epa-login-metric {
// //     background: rgba(17,17,17,0.85);
// //     padding: 20px 18px;
// //     transition: background 0.2s;
// //   }

// //   .epa-login-metric:hover { background: rgba(28,28,28,0.9); }

// //   .epa-login-metric-label {
// //     font-size: 8px;
// //     font-weight: 600;
// //     letter-spacing: 0.18em;
// //     text-transform: uppercase;
// //     color: #A1A1A1;
// //     margin-bottom: 8px;
// //   }

// //   .epa-login-metric-value {
// //     font-family: 'Cormorant Garamond', Georgia, serif;
// //     font-size: 2rem;
// //     font-weight: 600;
// //     color: #E8E6E3;
// //     line-height: 1;
// //     letter-spacing: -0.02em;
// //   }

// //   .epa-login-metric-unit {
// //     font-size: 10px;
// //     color: #A1A1A1;
// //     font-family: 'DM Sans', sans-serif;
// //     font-weight: 400;
// //     margin-left: 3px;
// //   }

// //   .epa-login-metric-delta {
// //     font-size: 10px;
// //     color: #2E8B6A;
// //     margin-top: 4px;
// //     font-weight: 500;
// //   }

// //   /* Features list */
// //   .epa-login-features {
// //     display: flex;
// //     flex-direction: column;
// //     gap: 10px;
// //     margin-top: 28px;
// //   }

// //   .epa-login-feature {
// //     display: flex;
// //     align-items: center;
// //     gap: 12px;
// //     font-size: 11px;
// //     color: #A1A1A1;
// //     letter-spacing: 0.04em;
// //   }

// //   .epa-login-feature-dot {
// //     width: 4px;
// //     height: 4px;
// //     border-radius: 50%;
// //     background: #C6A75E;
// //     flex-shrink: 0;
// //   }

// //   /* ══ RIGHT PANEL ══ */
// //   .epa-login-right {
// //     width: 460px;
// //     flex-shrink: 0;
// //     background: #1C1C1C;
// //     border-left: 1px solid rgba(198,167,94,0.12);
// //     display: flex;
// //     flex-direction: column;
// //     justify-content: center;
// //     padding: 64px 52px;
// //     position: relative;
// //   }

// //   .epa-login-right::before {
// //     content: '';
// //     position: absolute;
// //     top: 0;
// //     left: 0;
// //     right: 0;
// //     height: 2px;
// //     background: rgba(198,167,94,0.6);
// //   }

// //   /* Step indicator dots */
// //   .epa-login-steps {
// //     display: flex;
// //     gap: 5px;
// //     margin-bottom: 48px;
// //   }

// //   .epa-login-step-dot {
// //     height: 1px;
// //     background: rgba(198,167,94,0.15);
// //     border-radius: 1px;
// //     transition: all 0.3s;
// //   }

// //   .epa-login-step-dot.w-short { width: 20px; }
// //   .epa-login-step-dot.w-long  { width: 36px; background: #C6A75E; }

// //   .epa-login-eyebrow {
// //     font-size: 9px;
// //     font-weight: 600;
// //     letter-spacing: 0.22em;
// //     text-transform: uppercase;
// //     color: #C6A75E;
// //     margin-bottom: 14px;
// //   }

// //   .epa-login-title {
// //     font-family: 'Cormorant Garamond', Georgia, serif;
// //     font-size: 2.6rem;
// //     font-weight: 600;
// //     color: #E8E6E3;
// //     line-height: 1.05;
// //     letter-spacing: -0.01em;
// //     margin-bottom: 8px;
// //   }

// //   .epa-login-title em {
// //     font-style: italic;
// //     color: #C6A75E;
// //   }

// //   .epa-login-subtitle {
// //     font-size: 12px;
// //     color: #A1A1A1;
// //     margin-bottom: 44px;
// //     line-height: 1.6;
// //   }

// //   /* ── Form ── */
// //   .epa-login-form {
// //     display: flex;
// //     flex-direction: column;
// //     gap: 20px;
// //   }

// //   .epa-login-field {
// //     display: flex;
// //     flex-direction: column;
// //     gap: 8px;
// //   }

// //   .epa-login-label {
// //     font-size: 9px;
// //     font-weight: 600;
// //     letter-spacing: 0.16em;
// //     text-transform: uppercase;
// //     color: #A1A1A1;
// //   }

// //   .epa-login-input {
// //     width: 100%;
// //     background: #111111;
// //     border: 1px solid rgba(198,167,94,0.18);
// //     border-radius: 8px;
// //     color: #E8E6E3;
// //     font-family: 'DM Sans', sans-serif;
// //     font-size: 13px;
// //     padding: 14px 16px;
// //     outline: none;
// //     transition: border-color 0.2s ease, background 0.2s ease;
// //     box-sizing: border-box;
// //   }

// //   .epa-login-input::placeholder { color: rgba(161,161,161,0.35); }
// //   .epa-login-input:focus {
// //     border-color: rgba(198,167,94,0.55);
// //     background: rgba(198,167,94,0.02);
// //   }

// //   /* ── Submit ── */
// //   .epa-login-submit {
// //     width: 100%;
// //     padding: 15px;
// //     background: #C6A75E;
// //     color: #111111;
// //     border: none;
// //     border-radius: 8px;
// //     font-family: 'DM Sans', sans-serif;
// //     font-size: 11px;
// //     font-weight: 700;
// //     letter-spacing: 0.14em;
// //     text-transform: uppercase;
// //     cursor: pointer;
// //     transition: background 0.2s ease;
// //     margin-top: 8px;
// //   }

// //   .epa-login-submit:hover { background: #b8954f; }
// //   .epa-login-submit:disabled { opacity: 0.45; cursor: not-allowed; }

// //   /* ── Error ── */
// //   .epa-login-error {
// //     padding: 12px 16px;
// //     background: rgba(92,26,26,0.3);
// //     border: 1px solid rgba(92,26,26,0.5);
// //     border-radius: 8px;
// //     font-size: 12px;
// //     color: #E57373;
// //     letter-spacing: 0.04em;
// //   }

// //   /* ── Register link ── */
// //   .epa-login-register {
// //     margin-top: 32px;
// //     padding-top: 28px;
// //     border-top: 1px solid rgba(198,167,94,0.1);
// //     text-align: center;
// //     font-size: 12px;
// //     color: #A1A1A1;
// //   }

// //   .epa-login-register a {
// //     color: #C6A75E;
// //     text-decoration: none;
// //     font-weight: 600;
// //     letter-spacing: 0.04em;
// //     transition: opacity 0.2s;
// //   }

// //   .epa-login-register a:hover { opacity: 0.75; }

// //   /* ── Divider ── */
// //   .epa-login-divider {
// //     display: flex;
// //     align-items: center;
// //     gap: 14px;
// //     margin: 4px 0;
// //   }

// //   .epa-login-divider-line {
// //     flex: 1;
// //     height: 1px;
// //     background: rgba(198,167,94,0.1);
// //   }

// //   .epa-login-divider-text {
// //     font-size: 9px;
// //     font-weight: 600;
// //     letter-spacing: 0.14em;
// //     text-transform: uppercase;
// //     color: rgba(161,161,161,0.4);
// //   }

// //   /* ── Trust badges ── */
// //   .epa-login-trust {
// //     display: flex;
// //     justify-content: center;
// //     gap: 20px;
// //     margin-top: 28px;
// //   }

// //   .epa-login-trust-item {
// //     display: flex;
// //     align-items: center;
// //     gap: 5px;
// //     font-size: 9px;
// //     font-weight: 600;
// //     letter-spacing: 0.1em;
// //     text-transform: uppercase;
// //     color: rgba(161,161,161,0.4);
// //   }

// //   .epa-login-trust-dot {
// //     width: 3px;
// //     height: 3px;
// //     border-radius: 50%;
// //     background: rgba(198,167,94,0.3);
// //   }

// //   @media (max-width: 900px) {
// //     .epa-login-left { display: none; }
// //     .epa-login-right {
// //       width: 100%;
// //       border-left: none;
// //       min-height: 100vh;
// //     }
// //   }
// // `;

// // const METRICS = [
// //   { label: "Active Athletes",  value: "2.4", unit: "k",   delta: "+12% this month" },
// //   { label: "Plans Generated",  value: "18",  unit: "k+",  delta: "+340 this week"  },
// //   { label: "Avg Recovery",     value: "87",  unit: "%",   delta: "↑ 4pts avg gain" },
// // ];

// // const FEATURES = [
// //   "AI-generated weekly training protocols",
// //   "Daily readiness & recovery scoring",
// //   "Precision nutrition matrix",
// //   "Athlete Performance Score (APS)",
// // ];

// // export default function Login() {
// //   const navigate = useNavigate();
// //   const { login } = useAuth();

// //   const [form, setForm]       = useState({ email: "", password: "" });
// //   const [error, setError]     = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const handleChange = (e) =>
// //     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);
// //     try {
// //       const user = await login(form.email, form.password);
// //       navigate(user.isOnboarded ? "/dashboard" : "/onboarding");
// //     } catch (err) {
// //       setError(err.message || "Login failed");
// //     }
// //     setLoading(false);
// //   };

// //   return (
// //     <>
// //       <style>{loginStyles}</style>
// //       {loading && <BikeLoader />}

// //       <div className="epa-login-root">

// //         {/* ══ LEFT ══ */}
// //         <div className="epa-login-left">
// //           <img
// //             src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=85"
// //             alt="Elite training"
// //             className="epa-login-bg-img"
// //           />
// //           <div className="epa-login-left-overlay" />

// //           {/* Brand mark */}
// //           <div className="epa-login-brand">
// //             <div className="epa-login-brand-name">Elite Performance Atelier</div>
// //             <div className="epa-login-brand-sub">AI-Powered Performance System</div>
// //           </div>

// //           {/* Bottom content */}
// //           <div className="epa-login-left-content">
// //             <p className="epa-login-quote">
// //               "The body achieves what<br />
// //               <em>the mind believes</em> —<br />
// //               and the data confirms."
// //             </p>
// //             <p className="epa-login-quote-attr">Elite Performance Atelier</p>

// //             {/* Metrics strip */}
// //             <div className="epa-login-metrics">
// //               {METRICS.map((m) => (
// //                 <div key={m.label} className="epa-login-metric">
// //                   <p className="epa-login-metric-label">{m.label}</p>
// //                   <p className="epa-login-metric-value">
// //                     {m.value}
// //                     <span className="epa-login-metric-unit">{m.unit}</span>
// //                   </p>
// //                   <p className="epa-login-metric-delta">{m.delta}</p>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* Feature list */}
// //             <div className="epa-login-features">
// //               {FEATURES.map((f) => (
// //                 <div key={f} className="epa-login-feature">
// //                   <span className="epa-login-feature-dot" />
// //                   {f}
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>

// //         {/* ══ RIGHT ══ */}
// //         <div className="epa-login-right">

// //           {/* Step dots (decorative) */}
// //           <div className="epa-login-steps">
// //             <div className="epa-login-step-dot w-long" />
// //             <div className="epa-login-step-dot w-short" />
// //             <div className="epa-login-step-dot w-short" />
// //           </div>

// //           <p className="epa-login-eyebrow">Athlete Access</p>
// //           <h1 className="epa-login-title">
// //             Welcome<br /><em>Back</em>
// //           </h1>
// //           <p className="epa-login-subtitle">
// //             Sign in to access your adaptive training protocol,<br />
// //             recovery analytics, and performance intelligence.
// //           </p>

// //           {error && (
// //             <div className="epa-login-error" style={{ marginBottom: 20 }}>
// //               ⚠ {error}
// //             </div>
// //           )}

// //           <form className="epa-login-form" onSubmit={handleSubmit}>
// //             <div className="epa-login-field">
// //               <label className="epa-login-label">Email Address</label>
// //               <input
// //                 type="email"
// //                 name="email"
// //                 required
// //                 value={form.email}
// //                 onChange={handleChange}
// //                 className="epa-login-input"
// //                 placeholder="athlete@example.com"
// //               />
// //             </div>

// //             <div className="epa-login-field">
// //               <label className="epa-login-label">Password</label>
// //               <input
// //                 type="password"
// //                 name="password"
// //                 required
// //                 value={form.password}
// //                 onChange={handleChange}
// //                 className="epa-login-input"
// //                 placeholder="••••••••"
// //               />
// //             </div>

// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="epa-login-submit"
// //             >
// //               {loading ? "Authenticating…" : "Enter Platform"}
// //             </button>
// //           </form>

// //           <div className="epa-login-register">
// //             New to the platform?{" "}
// //             <Link to="/register">Create Account</Link>
// //           </div>

// //           <div className="epa-login-trust">
// //             <div className="epa-login-trust-item">
// //               <div className="epa-login-trust-dot" />
// //               Secure
// //             </div>
// //             <div className="epa-login-trust-item">
// //               <div className="epa-login-trust-dot" />
// //               Private
// //             </div>
// //             <div className="epa-login-trust-item">
// //               <div className="epa-login-trust-dot" />
// //               Encrypted
// //             </div>
// //           </div>

// //         </div>

// //       </div>
// //     </>
// //   );
// // }

// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import BikeLoader from "../components/BikeLoader";

// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

//   .epa-root {
//     min-height: 100vh;
//     display: flex;
//     background: #111111;
//     font-family: 'DM Sans', sans-serif;
//     color: #E8E6E3;
//   }

//   /* ── LEFT PANEL ── */
//   .epa-left {
//     flex: 1.1;
//     position: relative;
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-end;
//     overflow: hidden;
//     min-height: 100vh;
//   }

//   .epa-left-img {
//     position: absolute;
//     inset: 0;
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     filter: brightness(0.32) contrast(1.1) saturate(0.75);
//   }

//   .epa-left-overlay {
//     position: absolute;
//     inset: 0;
//     background: linear-gradient(to top, rgba(17,17,17,0.98) 0%, rgba(17,17,17,0.55) 40%, rgba(17,17,17,0.08) 100%);
//   }

//   .epa-brand {
//     position: absolute;
//     top: 48px;
//     left: 52px;
//     z-index: 2;
//   }

//   .epa-brand-name {
//     font-family: 'Cormorant Garamond', Georgia, serif;
//     font-size: 1rem;
//     font-weight: 600;
//     color: #C6A75E;
//     letter-spacing: 0.08em;
//   }

//   .epa-brand-sub {
//     font-size: 8px;
//     font-weight: 600;
//     letter-spacing: 0.22em;
//     text-transform: uppercase;
//     color: rgba(198,167,94,0.45);
//     margin-top: 3px;
//   }

//   .epa-left-content {
//     position: relative;
//     z-index: 2;
//     padding: 52px;
//   }

//   .epa-quote {
//     font-family: 'Cormorant Garamond', Georgia, serif;
//     font-size: clamp(1.7rem, 2.8vw, 2.6rem);
//     font-weight: 500;
//     font-style: italic;
//     color: #E8E6E3;
//     line-height: 1.22;
//     margin-bottom: 18px;
//     letter-spacing: -0.01em;
//   }

//   .epa-quote em {
//     font-style: normal;
//     color: #C6A75E;
//   }

//   .epa-quote-attr {
//     font-size: 9px;
//     font-weight: 600;
//     letter-spacing: 0.18em;
//     text-transform: uppercase;
//     color: rgba(198,167,94,0.5);
//     margin-bottom: 40px;
//     display: flex;
//     align-items: center;
//     gap: 10px;
//   }

//   .epa-quote-attr::before {
//     content: '';
//     width: 22px;
//     height: 1px;
//     background: rgba(198,167,94,0.35);
//   }

//   .epa-metrics {
//     display: grid;
//     grid-template-columns: repeat(3, 1fr);
//     gap: 1px;
//     background: rgba(198,167,94,0.1);
//     border: 1px solid rgba(198,167,94,0.1);
//     border-radius: 8px;
//     overflow: hidden;
//     margin-bottom: 28px;
//   }

//   .epa-metric {
//     background: rgba(17,17,17,0.88);
//     padding: 18px 16px;
//   }

//   .epa-metric-label {
//     font-size: 8px;
//     font-weight: 600;
//     letter-spacing: 0.18em;
//     text-transform: uppercase;
//     color: #A1A1A1;
//     margin-bottom: 6px;
//   }

//   .epa-metric-value {
//     font-family: 'Cormorant Garamond', Georgia, serif;
//     font-size: 1.85rem;
//     font-weight: 600;
//     color: #E8E6E3;
//     line-height: 1;
//     letter-spacing: -0.02em;
//   }

//   .epa-metric-unit {
//     font-size: 10px;
//     color: #A1A1A1;
//     font-family: 'DM Sans', sans-serif;
//     font-weight: 400;
//     margin-left: 2px;
//   }

//   .epa-metric-delta {
//     font-size: 10px;
//     color: #4CAF85;
//     margin-top: 4px;
//     font-weight: 500;
//   }

//   .epa-features {
//     display: flex;
//     flex-direction: column;
//     gap: 9px;
//   }

//   .epa-feature {
//     display: flex;
//     align-items: center;
//     gap: 11px;
//     font-size: 11px;
//     color: #A1A1A1;
//     letter-spacing: 0.02em;
//   }

//   .epa-feature-dot {
//     width: 4px;
//     height: 4px;
//     border-radius: 50%;
//     background: #C6A75E;
//     flex-shrink: 0;
//   }

//   /* ── RIGHT PANEL ── */
//   .epa-right {
//     width: 460px;
//     flex-shrink: 0;
//     background: #1C1C1C;
//     border-left: 1px solid rgba(198,167,94,0.1);
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     padding: 64px 52px;
//     position: relative;
//   }

//   .epa-right::before {
//     content: '';
//     position: absolute;
//     top: 0; left: 0; right: 0;
//     height: 2px;
//     background: rgba(198,167,94,0.55);
//   }

//   .epa-steps {
//     display: flex;
//     gap: 5px;
//     margin-bottom: 44px;
//   }

//   .epa-step { height: 1px; border-radius: 1px; }
//   .epa-step-active { width: 36px; background: #C6A75E; }
//   .epa-step-idle   { width: 20px; background: rgba(198,167,94,0.15); }

//   .epa-eyebrow {
//     font-size: 9px;
//     font-weight: 600;
//     letter-spacing: 0.22em;
//     text-transform: uppercase;
//     color: #C6A75E;
//     margin-bottom: 12px;
//   }

//   .epa-title {
//     font-family: 'Cormorant Garamond', Georgia, serif;
//     font-size: 2.5rem;
//     font-weight: 600;
//     color: #E8E6E3;
//     line-height: 1.05;
//     letter-spacing: -0.01em;
//     margin-bottom: 8px;
//   }

//   .epa-title em { font-style: italic; color: #C6A75E; }

//   .epa-subtitle {
//     font-size: 12px;
//     color: #A1A1A1;
//     margin-bottom: 40px;
//     line-height: 1.65;
//   }

//   .epa-form { display: flex; flex-direction: column; gap: 18px; }

//   .epa-field { display: flex; flex-direction: column; gap: 7px; }

//   .epa-label {
//     font-size: 9px;
//     font-weight: 600;
//     letter-spacing: 0.16em;
//     text-transform: uppercase;
//     color: #A1A1A1;
//   }

//   .epa-input {
//     width: 100%;
//     background: #111111;
//     border: 1px solid rgba(198,167,94,0.18);
//     border-radius: 8px;
//     color: #E8E6E3;
//     font-family: 'DM Sans', sans-serif;
//     font-size: 13px;
//     padding: 13px 16px;
//     outline: none;
//     transition: border-color 0.2s, background 0.2s;
//     box-sizing: border-box;
//   }

//   .epa-input::placeholder { color: rgba(161,161,161,0.3); }
//   .epa-input:focus {
//     border-color: rgba(198,167,94,0.55);
//     background: rgba(198,167,94,0.02);
//   }

//   .epa-submit {
//     width: 100%;
//     padding: 14px;
//     background: #C6A75E;
//     color: #111111;
//     border: none;
//     border-radius: 8px;
//     font-family: 'DM Sans', sans-serif;
//     font-size: 11px;
//     font-weight: 700;
//     letter-spacing: 0.14em;
//     text-transform: uppercase;
//     cursor: pointer;
//     transition: background 0.2s;
//     margin-top: 6px;
//   }

//   .epa-submit:hover { background: #b8954f; }
//   .epa-submit:disabled { opacity: 0.45; cursor: not-allowed; }

//   .epa-error {
//     padding: 12px 16px;
//     background: rgba(92,26,26,0.3);
//     border: 1px solid rgba(92,26,26,0.5);
//     border-radius: 8px;
//     font-size: 12px;
//     color: #E57373;
//     margin-bottom: 18px;
//   }

//   .epa-footer {
//     margin-top: 28px;
//     padding-top: 24px;
//     border-top: 1px solid rgba(198,167,94,0.08);
//     text-align: center;
//     font-size: 12px;
//     color: #A1A1A1;
//   }

//   .epa-footer a {
//     color: #C6A75E;
//     text-decoration: none;
//     font-weight: 600;
//     letter-spacing: 0.04em;
//   }

//   .epa-footer a:hover { opacity: 0.75; }

//   .epa-trust {
//     display: flex;
//     justify-content: center;
//     gap: 18px;
//     margin-top: 24px;
//   }

//   .epa-trust-item {
//     display: flex;
//     align-items: center;
//     gap: 5px;
//     font-size: 9px;
//     font-weight: 600;
//     letter-spacing: 0.1em;
//     text-transform: uppercase;
//     color: rgba(161,161,161,0.35);
//   }

//   .epa-trust-dot {
//     width: 3px;
//     height: 3px;
//     border-radius: 50%;
//     background: rgba(198,167,94,0.25);
//   }

//   @media (max-width: 860px) {
//     .epa-left { display: none; }
//     .epa-right { width: 100%; border-left: none; min-height: 100vh; }
//   }
// `;

// const METRICS = [
//   { label: "Active Athletes", value: "2.4", unit: "k",  delta: "+12% this month" },
//   { label: "Plans Generated", value: "18",  unit: "k+", delta: "+340 this week"  },
//   { label: "Avg Recovery",    value: "87",  unit: "%",  delta: "↑ 4pts avg gain" },
// ];

// const FEATURES = [
//   "AI-generated weekly training protocols",
//   "Daily readiness & recovery scoring",
//   "Precision nutrition matrix",
//   "Athlete Performance Score (APS)",
// ];

// export default function Login() {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [form, setForm]       = useState({ email: "", password: "" });
//   const [error, setError]     = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) =>
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const user = await login(form.email, form.password);
//       navigate(user.isOnboarded ? "/dashboard" : "/onboarding");
//     } catch (err) {
//       setError(err.message || "Login failed");
//     }
//     setLoading(false);
//   };

//   return (
//     <>
//       <style>{styles}</style>
//       {loading && <BikeLoader />}

//       <div className="epa-root">

//         {/* ── LEFT ── */}
//         <div className="epa-left">
//           <img
//             src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=85"
//             alt="Elite training"
//             className="epa-left-img"
//           />
//           <div className="epa-left-overlay" />

//           <div className="epa-brand">
//             <div className="epa-brand-name">Elite Performance Atelier</div>
//             <div className="epa-brand-sub">AI-Powered Performance System</div>
//           </div>

//           <div className="epa-left-content">
//             <p className="epa-quote">
//               "The body achieves what<br />
//               <em>the mind believes</em> —<br />
//               and the data confirms."
//             </p>
//             <p className="epa-quote-attr">Elite Performance Atelier</p>

//             <div className="epa-metrics">
//               {METRICS.map((m) => (
//                 <div key={m.label} className="epa-metric">
//                   <p className="epa-metric-label">{m.label}</p>
//                   <p className="epa-metric-value">
//                     {m.value}<span className="epa-metric-unit">{m.unit}</span>
//                   </p>
//                   <p className="epa-metric-delta">{m.delta}</p>
//                 </div>
//               ))}
//             </div>

//             <div className="epa-features">
//               {FEATURES.map((f) => (
//                 <div key={f} className="epa-feature">
//                   <span className="epa-feature-dot" />
//                   {f}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ── RIGHT ── */}
//         <div className="epa-right">

//           <div className="epa-steps">
//             <div className="epa-step epa-step-active" />
//             <div className="epa-step epa-step-idle" />
//             <div className="epa-step epa-step-idle" />
//           </div>

//           <p className="epa-eyebrow">Athlete Access</p>
//           <h1 className="epa-title">Welcome<br /><em>Back</em></h1>
//           <p className="epa-subtitle">
//             Sign in to access your adaptive training protocol,<br />
//             recovery analytics, and performance intelligence.
//           </p>

//           {error && <div className="epa-error">⚠ {error}</div>}

//           <form className="epa-form" onSubmit={handleSubmit}>
//             <div className="epa-field">
//               <label className="epa-label">Email Address</label>
//               <input
//                 type="email" name="email" required
//                 value={form.email} onChange={handleChange}
//                 className="epa-input" placeholder="athlete@example.com"
//               />
//             </div>

//             <div className="epa-field">
//               <label className="epa-label">Password</label>
//               <input
//                 type="password" name="password" required
//                 value={form.password} onChange={handleChange}
//                 className="epa-input" placeholder="••••••••"
//               />
//             </div>

//             <button type="submit" disabled={loading} className="epa-submit">
//               {loading ? "Authenticating…" : "Enter Platform"}
//             </button>
//           </form>

//           <div className="epa-footer">
//             New to the platform? <Link to="/register">Create Account</Link>
//           </div>

//           <div className="epa-trust">
//             {["Secure", "Private", "Encrypted"].map((t) => (
//               <div key={t} className="epa-trust-item">
//                 <div className="epa-trust-dot" />{t}
//               </div>
//             ))}
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BikeLoader from "../components/BikeLoader";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .login-root {
    min-height: 100vh;
    display: flex;
    background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #eef2ff 100%);
    font-family: 'Outfit', sans-serif;
    color: #0f172a;
    overflow: hidden;
    position: relative;
  }

  /* ── decorative blobs ── */
  .login-blob {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }
  .login-blob-1 {
    width: 520px; height: 520px;
    top: -140px; right: -100px;
    background: rgba(99,102,241,0.09);
  }
  .login-blob-2 {
    width: 380px; height: 380px;
    bottom: -80px; left: 15%;
    background: rgba(124,58,237,0.07);
  }
  .login-blob-3 {
    width: 260px; height: 260px;
    top: 40%; left: -60px;
    background: rgba(37,99,235,0.06);
  }

  /* ── LEFT PANEL ── */
  .login-left {
    flex: 1.2;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 52px 60px;
    overflow: hidden;
    z-index: 1;
  }

  .login-left-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.18) saturate(0.5);
    border-radius: 0 32px 32px 0;
  }

  .login-left-gradient {
    position: absolute;
    inset: 0;
    border-radius: 0 32px 32px 0;
    background: linear-gradient(
      135deg,
      rgba(37,99,235,0.82) 0%,
      rgba(99,102,241,0.78) 45%,
      rgba(124,58,237,0.72) 100%
    );
    z-index: 1;
  }

  .login-left-content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /* brand */
  .login-brand {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .login-brand-mark {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .login-brand-icon {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: rgba(255,255,255,0.2);
    border: 1px solid rgba(255,255,255,0.3);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
  }
  .login-brand-name {
    font-size: 15px;
    font-weight: 700;
    color: white;
    letter-spacing: -0.01em;
  }
  .login-brand-sub {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    margin-top: 2px;
    padding-left: 46px;
  }

  /* quote block */
  .login-quote-block {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .login-quote {
    font-size: clamp(1.8rem, 2.6vw, 2.8rem);
    font-weight: 300;
    color: white;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }
  .login-quote strong {
    font-weight: 800;
    background: linear-gradient(135deg, rgba(255,255,255,1), rgba(199,210,254,0.9));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .login-quote-attr {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .login-quote-attr::before {
    content: '';
    width: 24px; height: 1px;
    background: rgba(255,255,255,0.3);
  }

  /* metric chips */
  .login-metrics {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  .login-metric {
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 14px;
    padding: 14px 18px;
    backdrop-filter: blur(8px);
    flex: 1;
    min-width: 90px;
  }
  .login-metric-label {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    margin-bottom: 6px;
  }
  .login-metric-value {
    font-size: 1.8rem;
    font-weight: 800;
    color: white;
    line-height: 1;
    letter-spacing: -0.02em;
  }
  .login-metric-unit {
    font-size: 11px;
    font-weight: 500;
    color: rgba(255,255,255,0.5);
    margin-left: 2px;
  }
  .login-metric-delta {
    font-size: 10px;
    color: rgba(167,243,208,0.9);
    margin-top: 5px;
    font-weight: 500;
  }

  /* features */
  .login-features {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .login-feature {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    color: rgba(255,255,255,0.6);
    letter-spacing: 0.01em;
  }
  .login-feature-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: rgba(255,255,255,0.4);
    flex-shrink: 0;
  }

  /* ── RIGHT PANEL ── */
  .login-right {
    width: 480px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px 52px;
    position: relative;
    z-index: 1;
  }

  /* glass card */
  .login-card {
    background: rgba(255,255,255,0.82);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.9);
    border-radius: 24px;
    padding: 44px 40px;
    box-shadow: 0 8px 48px rgba(99,102,241,0.12), 0 2px 8px rgba(0,0,0,0.06);
  }

  /* step dots */
  .login-steps {
    display: flex;
    gap: 6px;
    margin-bottom: 36px;
  }
  .login-step {
    height: 3px;
    border-radius: 99px;
    transition: width 0.3s;
  }
  .login-step-active { width: 32px; background: linear-gradient(90deg, #2563eb, #6366f1); }
  .login-step-idle   { width: 16px; background: #e0e7ff; }

  /* eyebrow */
  .login-eyebrow {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #6366f1;
    margin-bottom: 10px;
  }

  /* heading */
  .login-title {
    font-size: 2.2rem;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.05;
    letter-spacing: -0.03em;
    margin-bottom: 8px;
  }
  .login-title span {
    background: linear-gradient(135deg, #2563eb, #6366f1, #7c3aed);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .login-subtitle {
    font-size: 13px;
    color: #64748b;
    margin-bottom: 36px;
    line-height: 1.65;
  }

  /* error */
  .login-error {
    padding: 12px 16px;
    background: rgba(244,63,94,0.07);
    border: 1px solid rgba(244,63,94,0.25);
    border-radius: 12px;
    font-size: 12px;
    color: #f43f5e;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* form */
  .login-form { display: flex; flex-direction: column; gap: 16px; }

  .login-field { display: flex; flex-direction: column; gap: 7px; }

  .login-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #64748b;
  }

  .login-input {
    width: 100%;
    background: rgba(238,242,255,0.6);
    border: 1.5px solid #e0e7ff;
    border-radius: 12px;
    color: #0f172a;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    padding: 13px 16px;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }
  .login-input::placeholder { color: #cbd5e1; }
  .login-input:focus {
    border-color: #6366f1;
    background: rgba(238,242,255,0.9);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
  }

  .login-submit {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, #2563eb, #6366f1, #7c3aed);
    color: white;
    border: none;
    border-radius: 12px;
    font-family: 'Outfit', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
    margin-top: 4px;
    box-shadow: 0 4px 20px rgba(99,102,241,0.32);
  }
  .login-submit:hover { opacity: 0.9; transform: translateY(-1px); }
  .login-submit:active { transform: translateY(0); }
  .login-submit:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

  /* footer */
  .login-footer {
    margin-top: 24px;
    text-align: center;
    font-size: 13px;
    color: #94a3b8;
  }
  .login-footer a {
    color: #6366f1;
    text-decoration: none;
    font-weight: 600;
  }
  .login-footer a:hover { opacity: 0.75; }

  /* trust row */
  .login-trust {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  }
  .login-trust-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #cbd5e1;
  }
  .login-trust-dot {
    width: 4px; height: 4px;
    border-radius: 50%;
    background: #c7d2fe;
  }

  /* divider */
  .login-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 4px 0;
    color: #cbd5e1;
    font-size: 11px;
  }
  .login-divider::before,
  .login-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e0e7ff;
  }

  @media (max-width: 900px) {
    .login-left { display: none; }
    .login-right { width: 100%; padding: 40px 20px; }
    .login-card { padding: 36px 28px; }
  }
`;

const METRICS = [
  { label: "Active Athletes", value: "2.4", unit: "k",  delta: "+12% this month" },
  { label: "Plans Generated", value: "18",  unit: "k+", delta: "+340 this week"  },
  { label: "Avg Recovery",    value: "87",  unit: "%",  delta: "↑ 4pts avg gain" },
];

const FEATURES = [
  "AI-generated weekly training protocols",
  "Daily readiness & recovery scoring",
  "Precision nutrition matrix",
  "Athlete Performance Score (APS)",
];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm]       = useState({ email: "", password: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      navigate(user.isOnboarded ? "/dashboard" : "/onboarding");
    } catch (err) {
      setError(err.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <>
      <style>{styles}</style>
      {loading && <BikeLoader />}

      <div className="login-root">
        {/* Background blobs */}
        <div className="login-blob login-blob-1" />
        <div className="login-blob login-blob-2" />
        <div className="login-blob login-blob-3" />

        {/* ── LEFT ── */}
        <div className="login-left">
          <img
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=85"
            alt="Elite training"
            className="login-left-img"
          />
          <div className="login-left-gradient" />

          <div className="login-left-content">
            {/* Brand */}
            <div className="login-brand">
              <div className="login-brand-mark">
                <div className="login-brand-icon">◆</div>
                <span className="login-brand-name">Elite Performance Atelier</span>
              </div>
              <div className="login-brand-sub">AI-Powered Performance System</div>
            </div>

            {/* Middle content */}
            <div className="login-quote-block">
              <div>
                <p className="login-quote">
                  The body achieves<br />
                  what the <strong>mind</strong><br />
                  <strong>believes.</strong>
                </p>
                <p className="login-quote-attr">Elite Performance Atelier</p>
              </div>

              <div className="login-metrics">
                {METRICS.map((m) => (
                  <div key={m.label} className="login-metric">
                    <p className="login-metric-label">{m.label}</p>
                    <p className="login-metric-value">
                      {m.value}<span className="login-metric-unit">{m.unit}</span>
                    </p>
                    <p className="login-metric-delta">{m.delta}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="login-features">
              {FEATURES.map((f) => (
                <div key={f} className="login-feature">
                  <span className="login-feature-dot" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="login-right">
          <div className="login-card">

            <div className="login-steps">
              <div className="login-step login-step-active" />
              <div className="login-step login-step-idle" />
              <div className="login-step login-step-idle" />
            </div>

            <p className="login-eyebrow">◆ Athlete Access</p>
            <h1 className="login-title">
              Welcome<br />
              <span>Back.</span>
            </h1>
            <p className="login-subtitle">
              Sign in to access your adaptive training protocol,<br />
              recovery analytics, and performance intelligence.
            </p>

            {error && (
              <div className="login-error">
                <span>⚠</span> {error}
              </div>
            )}

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-field">
                <label className="login-label">Email Address</label>
                <input
                  type="email" name="email" required
                  value={form.email} onChange={handleChange}
                  className="login-input" placeholder="athlete@example.com"
                />
              </div>

              <div className="login-field">
                <label className="login-label">Password</label>
                <input
                  type="password" name="password" required
                  value={form.password} onChange={handleChange}
                  className="login-input" placeholder="••••••••"
                />
              </div>

              <div className="login-divider">or</div>

              <button type="submit" disabled={loading} className="login-submit">
                {loading ? "Authenticating…" : "Enter Platform ✦"}
              </button>
            </form>

            <div className="login-footer">
              New to the platform? <Link to="/register">Create Account</Link>
            </div>

            <div className="login-trust">
              {["Secure", "Private", "Encrypted"].map((t) => (
                <div key={t} className="login-trust-item">
                  <div className="login-trust-dot" />{t}
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </>
  );
}