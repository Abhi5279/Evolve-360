// // // import { useState } from "react";
// // // import { useNavigate, Link } from "react-router-dom";
// // // import { useAuth } from "../context/AuthContext";

// // // export default function Register() {
// // //   const navigate = useNavigate();
// // //   const { register } = useAuth();

// // //   const [form, setForm] = useState({
// // //     name: "",
// // //     email: "",
// // //     password: "",
// // //   });

// // //   const [error, setError] = useState("");
// // //   const [loading, setLoading] = useState(false);
// // //   const [success, setSuccess] = useState("");

// // //   const handleChange = (e) => {
// // //     setForm((prev) => ({
// // //       ...prev,
// // //       [e.target.name]: e.target.value,
// // //     }));
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setError("");
// // //     setSuccess("");
// // //     setLoading(true);

// // //     try {
// // //       await register(form.name, form.email, form.password);

// // //       setSuccess("Account created successfully. Please login.");

// // //       setTimeout(() => {
// // //         navigate("/login");
// // //       }, 1200);

// // //     } catch (err) {
// // //       setError(err.message || "Registration failed");
// // //     }

// // //     setLoading(false);
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center px-6">
// // //       <div className="card w-full max-w-md">

// // //         <h2 className="text-3xl font-bold mb-8 text-center">
// // //           Create Account
// // //         </h2>

// // //         {error && (
// // //           <div className="mb-4 p-3 text-sm bg-red-100 text-red-600 rounded-lg">
// // //             {error}
// // //           </div>
// // //         )}

// // //         {success && (
// // //           <div className="mb-4 p-3 text-sm bg-green-100 text-green-600 rounded-lg">
// // //             {success}
// // //           </div>
// // //         )}

// // //         <form onSubmit={handleSubmit} className="space-y-5">

// // //           <div>
// // //             <label className="block text-sm mb-2">
// // //               Name
// // //             </label>
// // //             <input
// // //               type="text"
// // //               name="name"
// // //               required
// // //               value={form.name}
// // //               onChange={handleChange}
// // //               className="input-field w-full"
// // //               placeholder="Enter your name"
// // //             />
// // //           </div>

// // //           <div>
// // //             <label className="block text-sm mb-2">
// // //               Email
// // //             </label>
// // //             <input
// // //               type="email"
// // //               name="email"
// // //               required
// // //               value={form.email}
// // //               onChange={handleChange}
// // //               className="input-field w-full"
// // //               placeholder="Enter your email"
// // //             />
// // //           </div>

// // //           <div>
// // //             <label className="block text-sm mb-2">
// // //               Password
// // //             </label>
// // //             <input
// // //               type="password"
// // //               name="password"
// // //               required
// // //               minLength={6}
// // //               value={form.password}
// // //               onChange={handleChange}
// // //               className="input-field w-full"
// // //               placeholder="Minimum 6 characters"
// // //             />
// // //           </div>

// // //           <button
// // //             type="submit"
// // //             disabled={loading}
// // //             className="btn-primary w-full"
// // //           >
// // //             {loading ? "Creating account..." : "Register"}
// // //           </button>

// // //         </form>

// // //         <p className="text-sm text-center mt-6 text-[var(--color-text-secondary)]">
// // //           Already have an account?{" "}
// // //           <Link
// // //             to="/login"
// // //             className="text-[var(--color-primary)] hover:underline font-medium"
// // //           >
// // //             Login
// // //           </Link>
// // //         </p>

// // //       </div>
// // //     </div>
// // //   );
// // // }


// // import { useState } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";
// // import BikeLoader from "../components/BikeLoader";

// // export default function Register() {
// //   const navigate = useNavigate();
// //   const { register } = useAuth();

// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //   });

// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [success, setSuccess] = useState("");

// //   const handleChange = (e) => {
// //     setForm((prev) => ({
// //       ...prev,
// //       [e.target.name]: e.target.value,
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setSuccess("");
// //     setLoading(true);

// //     try {
// //       await register(form.name, form.email, form.password);

// //       setSuccess("Account created successfully. Please login.");

// //       setTimeout(() => {
// //         navigate("/login");
// //       }, 1200);

// //     } catch (err) {
// //       setError(err.message || "Registration failed");
// //     }

// //     setLoading(false);
// //   };

// //   return (
// //     <>
// //       {loading && <BikeLoader />}

// //       <div className="min-h-screen flex items-center justify-center px-6">
// //         <div className="card w-full max-w-md">

// //           <h2 className="text-3xl font-bold mb-8 text-center">
// //             Create Account
// //           </h2>

// //           {error && (
// //             <div className="mb-4 p-3 text-sm bg-red-100 text-red-600 rounded-lg">
// //               {error}
// //             </div>
// //           )}

// //           {success && (
// //             <div className="mb-4 p-3 text-sm bg-green-100 text-green-600 rounded-lg">
// //               {success}
// //             </div>
// //           )}

// //           <form onSubmit={handleSubmit} className="space-y-5">

// //             <div>
// //               <label className="block text-sm mb-2">
// //                 Name
// //               </label>
// //               <input
// //                 type="text"
// //                 name="name"
// //                 required
// //                 value={form.name}
// //                 onChange={handleChange}
// //                 className="input-field w-full"
// //                 placeholder="Enter your name"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm mb-2">
// //                 Email
// //               </label>
// //               <input
// //                 type="email"
// //                 name="email"
// //                 required
// //                 value={form.email}
// //                 onChange={handleChange}
// //                 className="input-field w-full"
// //                 placeholder="Enter your email"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm mb-2">
// //                 Password
// //               </label>
// //               <input
// //                 type="password"
// //                 name="password"
// //                 required
// //                 minLength={6}
// //                 value={form.password}
// //                 onChange={handleChange}
// //                 className="input-field w-full"
// //                 placeholder="Minimum 6 characters"
// //               />
// //             </div>

// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="btn-primary w-full"
// //             >
// //               Register
// //             </button>

// //           </form>

// //           <p className="text-sm text-center mt-6 text-[var(--color-text-secondary)]">
// //             Already have an account?{" "}
// //             <Link
// //               to="/login"
// //               className="text-[var(--color-primary)] hover:underline font-medium"
// //             >
// //               Login
// //             </Link>
// //           </p>

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

//   .epar-root {
//     min-height: 100vh;
//     display: flex;
//     background: #111111;
//     font-family: 'DM Sans', sans-serif;
//     color: #E8E6E3;
//   }

//   /* ── LEFT PANEL ── */
//   .epar-left {
//     flex: 1.1;
//     position: relative;
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-end;
//     overflow: hidden;
//     min-height: 100vh;
//   }

//   .epar-left-img {
//     position: absolute;
//     inset: 0;
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     filter: brightness(0.28) contrast(1.1) saturate(0.7);
//   }

//   .epar-left-overlay {
//     position: absolute;
//     inset: 0;
//     background: linear-gradient(to top, rgba(17,17,17,0.98) 0%, rgba(17,17,17,0.55) 40%, rgba(17,17,17,0.08) 100%);
//   }

//   .epar-brand {
//     position: absolute;
//     top: 48px;
//     left: 52px;
//     z-index: 2;
//   }

//   .epar-brand-name {
//     font-family: 'Cormorant Garamond', Georgia, serif;
//     font-size: 1rem;
//     font-weight: 600;
//     color: #C6A75E;
//     letter-spacing: 0.08em;
//   }

//   .epar-brand-sub {
//     font-size: 8px;
//     font-weight: 600;
//     letter-spacing: 0.22em;
//     text-transform: uppercase;
//     color: rgba(198,167,94,0.45);
//     margin-top: 3px;
//   }

//   .epar-left-content {
//     position: relative;
//     z-index: 2;
//     padding: 52px;
//   }

//   .epar-quote {
//     font-family: 'Cormorant Garamond', Georgia, serif;
//     font-size: clamp(1.7rem, 2.8vw, 2.6rem);
//     font-weight: 500;
//     font-style: italic;
//     color: #E8E6E3;
//     line-height: 1.22;
//     margin-bottom: 18px;
//     letter-spacing: -0.01em;
//   }

//   .epar-quote em {
//     font-style: normal;
//     color: #C6A75E;
//   }

//   .epar-quote-attr {
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

//   .epar-quote-attr::before {
//     content: '';
//     width: 22px;
//     height: 1px;
//     background: rgba(198,167,94,0.35);
//   }

//   /* Steps / process cards */
//   .epar-steps-list {
//     display: flex;
//     flex-direction: column;
//     gap: 1px;
//     background: rgba(198,167,94,0.1);
//     border: 1px solid rgba(198,167,94,0.1);
//     border-radius: 8px;
//     overflow: hidden;
//     margin-bottom: 28px;
//   }

//   .epar-step-item {
//     background: rgba(17,17,17,0.88);
//     padding: 16px 20px;
//     display: flex;
//     align-items: flex-start;
//     gap: 16px;
//   }

//   .epar-step-num {
//     font-family: 'Cormorant Garamond', Georgia, serif;
//     font-size: 1.4rem;
//     font-weight: 600;
//     color: rgba(198,167,94,0.35);
//     line-height: 1;
//     flex-shrink: 0;
//     width: 24px;
//   }

//   .epar-step-label {
//     font-size: 10px;
//     font-weight: 700;
//     letter-spacing: 0.1em;
//     text-transform: uppercase;
//     color: #E8E6E3;
//     margin-bottom: 3px;
//   }

//   .epar-step-desc {
//     font-size: 11px;
//     color: #A1A1A1;
//     line-height: 1.5;
//   }

//   .epar-features {
//     display: flex;
//     flex-direction: column;
//     gap: 9px;
//   }

//   .epar-feature {
//     display: flex;
//     align-items: center;
//     gap: 11px;
//     font-size: 11px;
//     color: #A1A1A1;
//     letter-spacing: 0.02em;
//   }

//   .epar-feature-dot {
//     width: 4px;
//     height: 4px;
//     border-radius: 50%;
//     background: #C6A75E;
//     flex-shrink: 0;
//   }

//   /* ── RIGHT PANEL ── */
//   .epar-right {
//     width: 460px;
//     flex-shrink: 0;
//     background: #1C1C1C;
//     border-left: 1px solid rgba(198,167,94,0.1);
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     padding: 56px 52px;
//     position: relative;
//   }

//   .epar-right::before {
//     content: '';
//     position: absolute;
//     top: 0; left: 0; right: 0;
//     height: 2px;
//     background: rgba(198,167,94,0.55);
//   }

//   .epar-progress {
//     display: flex;
//     gap: 5px;
//     margin-bottom: 44px;
//   }

//   .epar-prog-dot { height: 1px; border-radius: 1px; }
//   .epar-prog-active { width: 36px; background: #C6A75E; }
//   .epar-prog-idle   { width: 20px; background: rgba(198,167,94,0.15); }

//   .epar-eyebrow {
//     font-size: 9px;
//     font-weight: 600;
//     letter-spacing: 0.22em;
//     text-transform: uppercase;
//     color: #C6A75E;
//     margin-bottom: 12px;
//   }

//   .epar-title {
//     font-family: 'Cormorant Garamond', Georgia, serif;
//     font-size: 2.5rem;
//     font-weight: 600;
//     color: #E8E6E3;
//     line-height: 1.05;
//     letter-spacing: -0.01em;
//     margin-bottom: 8px;
//   }

//   .epar-title em { font-style: italic; color: #C6A75E; }

//   .epar-subtitle {
//     font-size: 12px;
//     color: #A1A1A1;
//     margin-bottom: 36px;
//     line-height: 1.65;
//   }

//   .epar-form { display: flex; flex-direction: column; gap: 16px; }

//   .epar-field { display: flex; flex-direction: column; gap: 7px; }

//   .epar-label {
//     font-size: 9px;
//     font-weight: 600;
//     letter-spacing: 0.16em;
//     text-transform: uppercase;
//     color: #A1A1A1;
//   }

//   .epar-input {
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

//   .epar-input::placeholder { color: rgba(161,161,161,0.3); }
//   .epar-input:focus {
//     border-color: rgba(198,167,94,0.55);
//     background: rgba(198,167,94,0.02);
//   }

//   .epar-submit {
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

//   .epar-submit:hover { background: #b8954f; }
//   .epar-submit:disabled { opacity: 0.45; cursor: not-allowed; }

//   .epar-error {
//     padding: 12px 16px;
//     background: rgba(92,26,26,0.3);
//     border: 1px solid rgba(92,26,26,0.5);
//     border-radius: 8px;
//     font-size: 12px;
//     color: #E57373;
//     margin-bottom: 16px;
//   }

//   .epar-success {
//     padding: 12px 16px;
//     background: rgba(14,59,50,0.5);
//     border: 1px solid rgba(46,139,106,0.4);
//     border-radius: 8px;
//     font-size: 12px;
//     color: #4CAF85;
//     margin-bottom: 16px;
//   }

//   .epar-footer {
//     margin-top: 26px;
//     padding-top: 22px;
//     border-top: 1px solid rgba(198,167,94,0.08);
//     text-align: center;
//     font-size: 12px;
//     color: #A1A1A1;
//   }

//   .epar-footer a {
//     color: #C6A75E;
//     text-decoration: none;
//     font-weight: 600;
//     letter-spacing: 0.04em;
//   }

//   .epar-footer a:hover { opacity: 0.75; }

//   .epar-trust {
//     display: flex;
//     justify-content: center;
//     gap: 18px;
//     margin-top: 22px;
//   }

//   .epar-trust-item {
//     display: flex;
//     align-items: center;
//     gap: 5px;
//     font-size: 9px;
//     font-weight: 600;
//     letter-spacing: 0.1em;
//     text-transform: uppercase;
//     color: rgba(161,161,161,0.35);
//   }

//   .epar-trust-dot {
//     width: 3px;
//     height: 3px;
//     border-radius: 50%;
//     background: rgba(198,167,94,0.25);
//   }

//   @media (max-width: 860px) {
//     .epar-left { display: none; }
//     .epar-right { width: 100%; border-left: none; min-height: 100vh; }
//   }
// `;

// const ONBOARDING_STEPS = [
//   {
//     num: "01",
//     label: "Create Your Profile",
//     desc: "Name, email, and secure password to get started.",
//   },
//   {
//     num: "02",
//     label: "Complete Onboarding",
//     desc: "Share your goals, fitness level, and schedule.",
//   },
//   {
//     num: "03",
//     label: "Receive Your Protocol",
//     desc: "AI generates your personalized training & nutrition plan.",
//   },
// ];

// const FEATURES = [
//   "Adaptive training plans updated weekly",
//   "Biometric readiness & recovery scoring",
//   "Precision macro & nutrition tracking",
//   "Athlete Performance Score dashboard",
// ];

// export default function Register() {
//   const navigate = useNavigate();
//   const { register } = useAuth();

//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [error, setError]     = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) =>
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);
//     try {
//       await register(form.name, form.email, form.password);
//       setSuccess("Account created. Redirecting…");
//       setTimeout(() => navigate("/login"), 1200);
//     } catch (err) {
//       setError(err.message || "Registration failed");
//     }
//     setLoading(false);
//   };

//   return (
//     <>
//       <style>{styles}</style>
//       {loading && <BikeLoader />}

//       <div className="epar-root">

//         {/* ── LEFT ── */}
//         <div className="epar-left">
//           <img
//             src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=85"
//             alt="Elite performance training"
//             className="epar-left-img"
//           />
//           <div className="epar-left-overlay" />

//           <div className="epar-brand">
//             <div className="epar-brand-name">Elite Performance Atelier</div>
//             <div className="epar-brand-sub">AI-Powered Performance System</div>
//           </div>

//           <div className="epar-left-content">
//             <p className="epar-quote">
//               "Champions aren't made<br />
//               in gyms. They're made from<br />
//               <em>data, discipline & design.</em>"
//             </p>
//             <p className="epar-quote-attr">Elite Performance Atelier</p>

//             {/* How it works */}
//             <div className="epar-steps-list">
//               {ONBOARDING_STEPS.map((s) => (
//                 <div key={s.num} className="epar-step-item">
//                   <span className="epar-step-num">{s.num}</span>
//                   <div>
//                     <p className="epar-step-label">{s.label}</p>
//                     <p className="epar-step-desc">{s.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="epar-features">
//               {FEATURES.map((f) => (
//                 <div key={f} className="epar-feature">
//                   <span className="epar-feature-dot" />
//                   {f}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ── RIGHT ── */}
//         <div className="epar-right">

//           <div className="epar-progress">
//             <div className="epar-prog-dot epar-prog-active" />
//             <div className="epar-prog-dot epar-prog-idle" />
//             <div className="epar-prog-dot epar-prog-idle" />
//           </div>

//           <p className="epar-eyebrow">Step 1 of 3</p>
//           <h1 className="epar-title">Create Your<br /><em>Account</em></h1>
//           <p className="epar-subtitle">
//             Join the platform trusted by serious athletes.<br />
//             Your protocol awaits — let's build it together.
//           </p>

//           {error   && <div className="epar-error">⚠ {error}</div>}
//           {success && <div className="epar-success">✓ {success}</div>}

//           <form className="epar-form" onSubmit={handleSubmit}>
//             <div className="epar-field">
//               <label className="epar-label">Full Name</label>
//               <input
//                 type="text" name="name" required
//                 value={form.name} onChange={handleChange}
//                 className="epar-input" placeholder="Your name"
//               />
//             </div>

//             <div className="epar-field">
//               <label className="epar-label">Email Address</label>
//               <input
//                 type="email" name="email" required
//                 value={form.email} onChange={handleChange}
//                 className="epar-input" placeholder="athlete@example.com"
//               />
//             </div>

//             <div className="epar-field">
//               <label className="epar-label">Password</label>
//               <input
//                 type="password" name="password" required minLength={6}
//                 value={form.password} onChange={handleChange}
//                 className="epar-input" placeholder="Minimum 6 characters"
//               />
//             </div>

//             <button type="submit" disabled={loading} className="epar-submit">
//               {loading ? "Creating Account…" : "Create Account"}
//             </button>
//           </form>

//           <div className="epar-footer">
//             Already have an account? <Link to="/login">Sign In</Link>
//           </div>

//           <div className="epar-trust">
//             {["Secure", "Private", "Encrypted"].map((t) => (
//               <div key={t} className="epar-trust-item">
//                 <div className="epar-trust-dot" />{t}
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

  .reg-root {
    min-height: 100vh;
    display: flex;
    background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #eef2ff 100%);
    font-family: 'Outfit', sans-serif;
    color: #0f172a;
    overflow: hidden;
    position: relative;
  }

  /* ── blobs ── */
  .reg-blob {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }
  .reg-blob-1 {
    width: 520px; height: 520px;
    top: -140px; right: -100px;
    background: rgba(99,102,241,0.09);
  }
  .reg-blob-2 {
    width: 380px; height: 380px;
    bottom: -80px; left: 15%;
    background: rgba(124,58,237,0.07);
  }
  .reg-blob-3 {
    width: 260px; height: 260px;
    top: 40%; left: -60px;
    background: rgba(37,99,235,0.06);
  }

  /* ── LEFT PANEL ── */
  .reg-left {
    flex: 1.2;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 52px 60px;
    overflow: hidden;
    z-index: 1;
  }

  .reg-left-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.18) saturate(0.5);
    border-radius: 0 32px 32px 0;
  }

  .reg-left-gradient {
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

  .reg-left-content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /* brand */
  .reg-brand { display: flex; flex-direction: column; gap: 4px; }
  .reg-brand-mark { display: flex; align-items: center; gap: 10px; }
  .reg-brand-icon {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: rgba(255,255,255,0.2);
    border: 1px solid rgba(255,255,255,0.3);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
  }
  .reg-brand-name {
    font-size: 15px; font-weight: 700;
    color: white; letter-spacing: -0.01em;
  }
  .reg-brand-sub {
    font-size: 9px; font-weight: 600;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    margin-top: 2px; padding-left: 46px;
  }

  /* quote */
  .reg-quote-block { display: flex; flex-direction: column; gap: 28px; }

  .reg-quote {
    font-size: clamp(1.8rem, 2.6vw, 2.8rem);
    font-weight: 300;
    color: white;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }
  .reg-quote strong {
    font-weight: 800;
    background: linear-gradient(135deg, rgba(255,255,255,1), rgba(199,210,254,0.9));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .reg-quote-attr {
    font-size: 10px; font-weight: 600;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    display: flex; align-items: center; gap: 10px;
  }
  .reg-quote-attr::before {
    content: '';
    width: 24px; height: 1px;
    background: rgba(255,255,255,0.3);
  }

  /* onboarding steps */
  .reg-steps-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .reg-step-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.16);
    border-radius: 14px;
    padding: 16px 18px;
    backdrop-filter: blur(8px);
    transition: background 0.2s;
  }

  .reg-step-num {
    font-size: 1.2rem;
    font-weight: 900;
    color: rgba(255,255,255,0.25);
    line-height: 1;
    flex-shrink: 0;
    width: 28px;
    letter-spacing: -0.02em;
  }

  .reg-step-label {
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.06em; text-transform: uppercase;
    color: white; margin-bottom: 3px;
  }

  .reg-step-desc {
    font-size: 11px;
    color: rgba(255,255,255,0.55);
    line-height: 1.5;
  }

  /* features */
  .reg-features { display: flex; flex-direction: column; gap: 10px; }
  .reg-feature {
    display: flex; align-items: center; gap: 10px;
    font-size: 12px; color: rgba(255,255,255,0.6);
    letter-spacing: 0.01em;
  }
  .reg-feature-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: rgba(255,255,255,0.4); flex-shrink: 0;
  }

  /* ── RIGHT PANEL ── */
  .reg-right {
    width: 500px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 52px 48px;
    position: relative;
    z-index: 1;
  }

  /* glass card */
  .reg-card {
    background: rgba(255,255,255,0.82);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.9);
    border-radius: 24px;
    padding: 40px 38px;
    box-shadow: 0 8px 48px rgba(99,102,241,0.12), 0 2px 8px rgba(0,0,0,0.06);
  }

  /* step dots */
  .reg-progress { display: flex; gap: 6px; margin-bottom: 32px; }
  .reg-prog-dot { height: 3px; border-radius: 99px; }
  .reg-prog-active { width: 32px; background: linear-gradient(90deg, #2563eb, #6366f1); }
  .reg-prog-idle   { width: 16px; background: #e0e7ff; }

  .reg-eyebrow {
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: #6366f1; margin-bottom: 10px;
  }

  .reg-title {
    font-size: 2.1rem; font-weight: 800;
    color: #0f172a; line-height: 1.05;
    letter-spacing: -0.03em; margin-bottom: 8px;
  }
  .reg-title span {
    background: linear-gradient(135deg, #2563eb, #6366f1, #7c3aed);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .reg-subtitle {
    font-size: 13px; color: #64748b;
    margin-bottom: 30px; line-height: 1.65;
  }

  /* alerts */
  .reg-error {
    padding: 12px 16px;
    background: rgba(244,63,94,0.07);
    border: 1px solid rgba(244,63,94,0.25);
    border-radius: 12px;
    font-size: 12px; color: #f43f5e;
    margin-bottom: 18px;
    display: flex; align-items: center; gap: 8px;
  }

  .reg-success {
    padding: 12px 16px;
    background: rgba(34,197,94,0.07);
    border: 1px solid rgba(34,197,94,0.25);
    border-radius: 12px;
    font-size: 12px; color: #22c55e;
    margin-bottom: 18px;
    display: flex; align-items: center; gap: 8px;
  }

  /* form */
  .reg-form { display: flex; flex-direction: column; gap: 14px; }
  .reg-field { display: flex; flex-direction: column; gap: 7px; }

  .reg-label {
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: #64748b;
  }

  .reg-input {
    width: 100%;
    background: rgba(238,242,255,0.6);
    border: 1.5px solid #e0e7ff;
    border-radius: 12px;
    color: #0f172a;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    padding: 12px 16px;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }
  .reg-input::placeholder { color: #cbd5e1; }
  .reg-input:focus {
    border-color: #6366f1;
    background: rgba(238,242,255,0.9);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.10);
  }

  .reg-submit {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, #2563eb, #6366f1, #7c3aed);
    color: white;
    border: none;
    border-radius: 12px;
    font-family: 'Outfit', sans-serif;
    font-size: 12px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
    margin-top: 4px;
    box-shadow: 0 4px 20px rgba(99,102,241,0.32);
  }
  .reg-submit:hover  { opacity: 0.9; transform: translateY(-1px); }
  .reg-submit:active { transform: translateY(0); }
  .reg-submit:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

  /* footer */
  .reg-footer {
    margin-top: 22px;
    text-align: center;
    font-size: 13px; color: #94a3b8;
  }
  .reg-footer a {
    color: #6366f1; text-decoration: none; font-weight: 600;
  }
  .reg-footer a:hover { opacity: 0.75; }

  /* trust */
  .reg-trust {
    display: flex; justify-content: center;
    gap: 20px; margin-top: 18px;
  }
  .reg-trust-item {
    display: flex; align-items: center; gap: 5px;
    font-size: 9px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: #cbd5e1;
  }
  .reg-trust-dot {
    width: 4px; height: 4px; border-radius: 50%;
    background: #c7d2fe;
  }

  @media (max-width: 900px) {
    .reg-left  { display: none; }
    .reg-right { width: 100%; padding: 40px 20px; }
    .reg-card  { padding: 36px 28px; }
  }
`;

const ONBOARDING_STEPS = [
  {
    num: "01",
    label: "Create Your Profile",
    desc: "Name, email, and secure password to get started.",
  },
  {
    num: "02",
    label: "Complete Onboarding",
    desc: "Share your goals, fitness level, and schedule.",
  },
  {
    num: "03",
    label: "Receive Your Protocol",
    desc: "AI generates your personalized training & nutrition plan.",
  },
];

const FEATURES = [
  "Adaptive training plans updated weekly",
  "Biometric readiness & recovery scoring",
  "Precision macro & nutrition tracking",
  "Athlete Performance Score dashboard",
];

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form,    setForm]    = useState({ name: "", email: "", password: "" });
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      setSuccess("Account created. Redirecting…");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err.message || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <>
      <style>{styles}</style>
      {loading && <BikeLoader />}

      <div className="reg-root">
        {/* blobs */}
        <div className="reg-blob reg-blob-1" />
        <div className="reg-blob reg-blob-2" />
        <div className="reg-blob reg-blob-3" />

        {/* ── LEFT ── */}
        <div className="reg-left">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=85"
            alt="Elite performance training"
            className="reg-left-img"
          />
          <div className="reg-left-gradient" />

          <div className="reg-left-content">
            {/* Brand */}
            <div className="reg-brand">
              <div className="reg-brand-mark">
                <div className="reg-brand-icon">◆</div>
                <span className="reg-brand-name">Elite Performance Atelier</span>
              </div>
              <div className="reg-brand-sub">AI-Powered Performance System</div>
            </div>

            {/* Quote + steps */}
            <div className="reg-quote-block">
              <div>
                <p className="reg-quote">
                  Champions aren't<br />
                  made in gyms —<br />
                  they're made from <strong>data.</strong>
                </p>
                <p className="reg-quote-attr">Elite Performance Atelier</p>
              </div>

              <div className="reg-steps-list">
                {ONBOARDING_STEPS.map((s) => (
                  <div key={s.num} className="reg-step-item">
                    <span className="reg-step-num">{s.num}</span>
                    <div>
                      <p className="reg-step-label">{s.label}</p>
                      <p className="reg-step-desc">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="reg-features">
              {FEATURES.map((f) => (
                <div key={f} className="reg-feature">
                  <span className="reg-feature-dot" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="reg-right">
          <div className="reg-card">

            <div className="reg-progress">
              <div className="reg-prog-dot reg-prog-active" />
              <div className="reg-prog-dot reg-prog-idle" />
              <div className="reg-prog-dot reg-prog-idle" />
            </div>

            <p className="reg-eyebrow">◆ Step 1 of 3</p>
            <h1 className="reg-title">
              Create Your<br />
              <span>Account.</span>
            </h1>
            <p className="reg-subtitle">
              Join the platform trusted by serious athletes.<br />
              Your protocol awaits — let's build it together.
            </p>

            {error   && <div className="reg-error">  <span>⚠</span> {error}   </div>}
            {success && <div className="reg-success"><span>✓</span> {success}</div>}

            <form className="reg-form" onSubmit={handleSubmit}>
              <div className="reg-field">
                <label className="reg-label">Full Name</label>
                <input
                  type="text" name="name" required
                  value={form.name} onChange={handleChange}
                  className="reg-input" placeholder="Your name"
                />
              </div>

              <div className="reg-field">
                <label className="reg-label">Email Address</label>
                <input
                  type="email" name="email" required
                  value={form.email} onChange={handleChange}
                  className="reg-input" placeholder="athlete@example.com"
                />
              </div>

              <div className="reg-field">
                <label className="reg-label">Password</label>
                <input
                  type="password" name="password" required minLength={6}
                  value={form.password} onChange={handleChange}
                  className="reg-input" placeholder="Minimum 6 characters"
                />
              </div>

              <button type="submit" disabled={loading} className="reg-submit">
                {loading ? "Creating Account…" : "Create Account ✦"}
              </button>
            </form>

            <div className="reg-footer">
              Already have an account? <Link to="/login">Sign In</Link>
            </div>

            <div className="reg-trust">
              {["Secure", "Private", "Encrypted"].map((t) => (
                <div key={t} className="reg-trust-item">
                  <div className="reg-trust-dot" />{t}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}