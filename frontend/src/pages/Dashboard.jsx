// // // // // // // import { useEffect, useState } from "react";
// // // // // // // import { workoutAPI, planAPI } from "../api/axios";
// // // // // // // import { useAuth } from "../context/AuthContext";
// // // // // // // import BikeLoader from "../components/BikeLoader";  

// // // // // // // export default function Dashboard() {
// // // // // // //   const { user } = useAuth();

// // // // // // //   const [plan, setPlan] = useState(null);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [generating, setGenerating] = useState(false);
// // // // // // //   const [error, setError] = useState("");

// // // // // // //   const fetchPlan = async () => {
// // // // // // //     try {
// // // // // // //       setLoading(true);
// // // // // // //       const res = await workoutAPI.getActivePlan(user.id);
// // // // // // //       setPlan(res.data.plan);
// // // // // // //       setError("");
// // // // // // //     } catch (err) {
// // // // // // //       setPlan(null);
// // // // // // //       setError("No active workout plan found");
// // // // // // //     }
// // // // // // //     setLoading(false);
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     if (user?.id) {
// // // // // // //       fetchPlan();
// // // // // // //     }
// // // // // // //   }, [user?.id]);

// // // // // // //   const handleGeneratePlan = async () => {
// // // // // // //     try {
// // // // // // //       setGenerating(true);
// // // // // // //       await planAPI.generate(user.id);
// // // // // // //       await fetchPlan();
// // // // // // //     } catch (err) {
// // // // // // //       alert(err.message || "Failed to generate plan");
// // // // // // //     }
// // // // // // //     setGenerating(false);
// // // // // // //   };

// // // // // // //   if (loading) {
// // // // // // //     return <BikeLoader/>;
// // // // // // //   }

// // // // // // // return (
// // // // // // //   <div className="space-y-16">

// // // // // // //     {/* HERO SECTION */}
// // // // // // //     <div className="bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-3xl p-10 shadow-xl">
// // // // // // //       <h1 className="text-4xl font-bold mb-4">
// // // // // // //         Adaptive Fitness Intelligence Platform
// // // // // // //       </h1>
// // // // // // //       <p className="text-lg opacity-90 max-w-3xl">
// // // // // // //         AI-powered personalized workout and nutrition optimization
// // // // // // //         designed for performance-driven individuals and athletes.
// // // // // // //       </p>

// // // // // // //       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
// // // // // // //         <div>
// // // // // // //           <h2 className="text-3xl font-bold">12,500+</h2>
// // // // // // //           <p className="text-sm opacity-80">Active Users</p>
// // // // // // //         </div>
// // // // // // //         <div>
// // // // // // //           <h2 className="text-3xl font-bold">4.8★</h2>
// // // // // // //           <p className="text-sm opacity-80">User Rating</p>
// // // // // // //         </div>
// // // // // // //         <div>
// // // // // // //           <h2 className="text-3xl font-bold">95%</h2>
// // // // // // //           <p className="text-sm opacity-80">Plan Accuracy</p>
// // // // // // //         </div>
// // // // // // //         <div>
// // // // // // //           <h2 className="text-3xl font-bold">30+</h2>
// // // // // // //           <p className="text-sm opacity-80">Countries</p>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </div>

// // // // // // //     {/* ABOUT SECTION */}
// // // // // // //     <div className="grid md:grid-cols-2 gap-10 items-center">
// // // // // // //       <div>
// // // // // // //         <h2 className="text-3xl font-bold mb-4">
// // // // // // //           About Our Platform
// // // // // // //         </h2>
// // // // // // //         <p className="text-gray-600 leading-relaxed">
// // // // // // //           Our system leverages AI-driven readiness metrics,
// // // // // // //           behavioral tracking, and predictive recovery scoring
// // // // // // //           to dynamically personalize your workouts.
// // // // // // //         </p>
// // // // // // //         <p className="text-gray-600 mt-4 leading-relaxed">
// // // // // // //           Whether you're focused on fat loss, muscle gain,
// // // // // // //           endurance, or general health — we adapt
// // // // // // //           your weekly plan based on real performance data.
// // // // // // //         </p>
// // // // // // //       </div>

// // // // // // //       <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
// // // // // // //         <h3 className="text-xl font-semibold">Platform Features</h3>
// // // // // // //         <ul className="space-y-2 text-gray-600">
// // // // // // //           <li>✔ Adaptive Weekly Plans</li>
// // // // // // //           <li>✔ AI Recovery Scoring</li>
// // // // // // //           <li>✔ Nutrition Budget Optimization</li>
// // // // // // //           <li>✔ Progressive Overload Automation</li>
// // // // // // //           <li>✔ Performance Analytics Dashboard</li>
// // // // // // //         </ul>
// // // // // // //       </div>
// // // // // // //     </div>

// // // // // // //     {/* ORIGINAL DASHBOARD CONTENT BELOW */}

// // // // // // //     <div>
// // // // // // //       <h2 className="text-2xl font-bold mb-6">
// // // // // // //         Welcome, {user.name}
// // // // // // //       </h2>
// // // // // // //     </div>

// // // // // // //     {!plan && (
// // // // // // //       <div className="card text-center">
// // // // // // //         <p className="mb-6 text-gray-500">
// // // // // // //           {error}
// // // // // // //         </p>

// // // // // // //         <button
// // // // // // //           onClick={handleGeneratePlan}
// // // // // // //           disabled={generating}
// // // // // // //           className="btn-primary"
// // // // // // //         >
// // // // // // //           {generating ? "Generating..." : "Generate Weekly Plan"}
// // // // // // //         </button>
// // // // // // //       </div>
// // // // // // //     )}

// // // // // // //     {plan && (
// // // // // // //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

// // // // // // //         <div className="card">
// // // // // // //           <h2 className="text-xl font-semibold mb-4">
// // // // // // //             Current Plan
// // // // // // //           </h2>
// // // // // // //           <p>Version: <strong>{plan.planVersion}</strong></p>
// // // // // // //           <p>Week: <strong>{plan.currentWeek}</strong></p>
// // // // // // //           <p>Duration: <strong>{plan.planDurationWeeks} weeks</strong></p>
// // // // // // //         </div>

// // // // // // //         <div className="card">
// // // // // // //           <h2 className="text-xl font-semibold mb-4">
// // // // // // //             Intensity
// // // // // // //           </h2>
// // // // // // //           <p>Base Intensity: <strong>{plan.baseIntensityLevel}</strong></p>
// // // // // // //           <p>Base Volume: <strong>{plan.baseVolumeLevel}</strong></p>
// // // // // // //         </div>

// // // // // // //         <div className="card">
// // // // // // //           <h2 className="text-xl font-semibold mb-4">
// // // // // // //             Workout Days
// // // // // // //           </h2>
// // // // // // //           <p>Planned Days: <strong>{plan.plannedWorkoutDays}</strong></p>
// // // // // // //           <p>Status: <strong>{plan.status}</strong></p>
// // // // // // //         </div>

// // // // // // //       </div>
// // // // // // //     )}

// // // // // // //   </div>
// // // // // // // );}


// // // // // // import { useEffect, useState } from "react";
// // // // // // import { planAPI } from "../api/axios";
// // // // // // import { useAuth } from "../context/AuthContext";
// // // // // // import BikeLoader from "../components/BikeLoader";

// // // // // // export default function Dashboard() {
// // // // // //   const { user } = useAuth();

// // // // // //   const [plan, setPlan] = useState(null);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [generating, setGenerating] = useState(false);
// // // // // //   const [error, setError] = useState("");

// // // // // //   /* ================= FETCH ACTIVE PLAN ================= */

// // // // // //   const fetchPlan = async () => {
// // // // // //     try {
// // // // // //       setLoading(true);
// // // // // //       const res = await planAPI.getActive(user.id);

// // // // // //       setPlan(res.data?.plan || null);
// // // // // //       setError("");
// // // // // //     } catch (err) {
// // // // // //       setPlan(null);
// // // // // //       setError("No active workout plan found");
// // // // // //     }
// // // // // //     setLoading(false);
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     if (user?.id) {
// // // // // //       fetchPlan();
// // // // // //     }
// // // // // //   }, [user?.id]);

// // // // // //   /* ================= GENERATE PLAN ================= */

// // // // // //   const handleGeneratePlan = async () => {
// // // // // //     try {
// // // // // //       setGenerating(true);
// // // // // //       await planAPI.generate(user.id);
// // // // // //       await fetchPlan();
// // // // // //     } catch (err) {
// // // // // //       alert(err.message || "Failed to generate plan");
// // // // // //     }
// // // // // //     setGenerating(false);
// // // // // //   };

// // // // // //   if (loading) return <BikeLoader />;

// // // // // //   return (
// // // // // //     <div className="space-y-16">

// // // // // //       {/* HERO SECTION */}
// // // // // //       <div className="bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-3xl p-10 shadow-xl">
// // // // // //         <h1 className="text-4xl font-bold mb-4">
// // // // // //           Adaptive Fitness Intelligence Platform
// // // // // //         </h1>
// // // // // //         <p className="text-lg opacity-90 max-w-3xl">
// // // // // //           AI-powered personalized workout and nutrition optimization
// // // // // //           designed for performance-driven individuals and athletes.
// // // // // //         </p>
// // // // // //       </div>

// // // // // //       {/* WELCOME */}
// // // // // //       <div>
// // // // // //         <h2 className="text-2xl font-bold mb-6">
// // // // // //           Welcome, {user?.name}
// // // // // //         </h2>
// // // // // //       </div>

// // // // // //       {/* NO PLAN */}
// // // // // //       {!plan && (
// // // // // //         <div className="card text-center p-8">
// // // // // //           <p className="mb-6 text-gray-500">
// // // // // //             {error}
// // // // // //           </p>

// // // // // //           <button
// // // // // //             onClick={handleGeneratePlan}
// // // // // //             disabled={generating}
// // // // // //             className="btn-primary"
// // // // // //           >
// // // // // //             {generating ? "Generating..." : "Generate Weekly Plan"}
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* PLAN EXISTS */}
// // // // // //       {plan && (
// // // // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

// // // // // //           {/* PLAN INFO */}
// // // // // //           <div className="card p-6">
// // // // // //             <h2 className="text-xl font-semibold mb-4">
// // // // // //               Current Plan
// // // // // //             </h2>
// // // // // //             <p>
// // // // // //               Plan ID: <strong>{plan._id}</strong>
// // // // // //             </p>
// // // // // //             <p>
// // // // // //               Status: <strong>{plan.status || "active"}</strong>
// // // // // //             </p>
// // // // // //           </div>

// // // // // //           {/* INTENSITY */}
// // // // // //           <div className="card p-6">
// // // // // //             <h2 className="text-xl font-semibold mb-4">
// // // // // //               Intensity
// // // // // //             </h2>
// // // // // //             <p>
// // // // // //               Base Intensity:{" "}
// // // // // //               <strong>{plan.baseIntensityLevel}</strong>
// // // // // //             </p>
// // // // // //             <p>
// // // // // //               Base Volume:{" "}
// // // // // //               <strong>{plan.baseVolumeLevel}</strong>
// // // // // //             </p>
// // // // // //           </div>

// // // // // //           {/* WORKOUT STRUCTURE */}
// // // // // //           <div className="card p-6">
// // // // // //             <h2 className="text-xl font-semibold mb-4">
// // // // // //               Workout Days
// // // // // //             </h2>
// // // // // //             <p>
// // // // // //               Planned Days:{" "}
// // // // // //               <strong>{plan.plannedWorkoutDays}</strong>
// // // // // //             </p>
// // // // // //             <p>
// // // // // //               Structure Days:{" "}
// // // // // //               <strong>{plan.weeklyStructure?.length || 0}</strong>
// // // // // //             </p>
// // // // // //           </div>

// // // // // //         </div>
// // // // // //       )}

// // // // // //     </div>
// // // // // //   );
// // // // // // }


// // // // // import { useEffect, useState } from "react";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import { planAPI } from "../api/axios";
// // // // // import { useAuth } from "../context/AuthContext";
// // // // // import BikeLoader from "../components/BikeLoader";

// // // // // const styles = `
// // // // //   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');

// // // // //   .epa-root {
// // // // //     font-family: 'DM Sans', sans-serif;
// // // // //     background-color: #111111;
// // // // //     color: #E8E6E3;
// // // // //     min-height: 100vh;
// // // // //   }

// // // // //   .epa-serif {
// // // // //     font-family: 'Cormorant Garamond', serif;
// // // // //   }

// // // // //   .epa-card {
// // // // //     background: #1C1C1C;
// // // // //     border: 1px solid rgba(198,167,94,0.15);
// // // // //     border-radius: 8px;
// // // // //     padding: 24px;
// // // // //   }

// // // // //   .epa-card-gold-top {
// // // // //     border-top: 2px solid rgba(198,167,94,0.7);
// // // // //   }

// // // // //   .epa-label {
// // // // //     font-family: 'DM Sans', sans-serif;
// // // // //     font-size: 10px;
// // // // //     font-weight: 600;
// // // // //     letter-spacing: 0.15em;
// // // // //     text-transform: uppercase;
// // // // //     color: #A1A1A1;
// // // // //   }

// // // // //   .epa-metric {
// // // // //     font-family: 'DM Sans', sans-serif;
// // // // //     font-size: 2.5rem;
// // // // //     font-weight: 700;
// // // // //     color: #E8E6E3;
// // // // //     letter-spacing: -0.02em;
// // // // //     line-height: 1;
// // // // //   }

// // // // //   .epa-metric-unit {
// // // // //     font-size: 0.85rem;
// // // // //     font-weight: 400;
// // // // //     color: #A1A1A1;
// // // // //     margin-left: 4px;
// // // // //     letter-spacing: 0.05em;
// // // // //   }

// // // // //   .epa-btn-primary {
// // // // //     background: #C6A75E;
// // // // //     color: #111111;
// // // // //     border: none;
// // // // //     border-radius: 8px;
// // // // //     padding: 14px 36px;
// // // // //     font-family: 'DM Sans', sans-serif;
// // // // //     font-size: 12px;
// // // // //     font-weight: 600;
// // // // //     letter-spacing: 0.12em;
// // // // //     text-transform: uppercase;
// // // // //     cursor: pointer;
// // // // //     transition: background 0.2s ease, opacity 0.2s ease;
// // // // //   }

// // // // //   .epa-btn-primary:hover {
// // // // //     background: #b8954f;
// // // // //   }

// // // // //   .epa-btn-primary:disabled {
// // // // //     opacity: 0.5;
// // // // //     cursor: not-allowed;
// // // // //   }

// // // // //   .epa-btn-outline {
// // // // //     background: transparent;
// // // // //     color: #C6A75E;
// // // // //     border: 1px solid rgba(198,167,94,0.5);
// // // // //     border-radius: 8px;
// // // // //     padding: 12px 28px;
// // // // //     font-family: 'DM Sans', sans-serif;
// // // // //     font-size: 11px;
// // // // //     font-weight: 600;
// // // // //     letter-spacing: 0.12em;
// // // // //     text-transform: uppercase;
// // // // //     cursor: pointer;
// // // // //     transition: border-color 0.2s ease, background 0.2s ease;
// // // // //   }

// // // // //   .epa-btn-outline:hover {
// // // // //     border-color: rgba(198,167,94,0.9);
// // // // //     background: rgba(198,167,94,0.05);
// // // // //   }

// // // // //   .epa-divider {
// // // // //     border: none;
// // // // //     border-top: 1px solid rgba(198,167,94,0.12);
// // // // //     margin: 0;
// // // // //   }

// // // // //   .epa-emerald-dot {
// // // // //     width: 6px;
// // // // //     height: 6px;
// // // // //     border-radius: 50%;
// // // // //     background: #2E8B6A;
// // // // //     display: inline-block;
// // // // //     flex-shrink: 0;
// // // // //   }

// // // // //   .epa-status-active {
// // // // //     display: inline-flex;
// // // // //     align-items: center;
// // // // //     gap: 8px;
// // // // //     background: rgba(14,59,50,0.4);
// // // // //     border: 1px solid rgba(46,139,106,0.25);
// // // // //     border-radius: 4px;
// // // // //     padding: 4px 12px;
// // // // //     font-size: 11px;
// // // // //     font-weight: 600;
// // // // //     letter-spacing: 0.1em;
// // // // //     text-transform: uppercase;
// // // // //     color: #2E8B6A;
// // // // //   }

// // // // //   .epa-nav-feature-card {
// // // // //     background: #1C1C1C;
// // // // //     border: 1px solid rgba(198,167,94,0.15);
// // // // //     border-radius: 8px;
// // // // //     padding: 28px 24px;
// // // // //     cursor: pointer;
// // // // //     transition: border-color 0.2s ease, transform 0.15s ease;
// // // // //     text-decoration: none;
// // // // //     display: flex;
// // // // //     flex-direction: column;
// // // // //     gap: 12px;
// // // // //   }

// // // // //   .epa-nav-feature-card:hover {
// // // // //     border-color: rgba(198,167,94,0.45);
// // // // //     transform: translateY(-2px);
// // // // //   }

// // // // //   .epa-hero-image {
// // // // //     width: 100%;
// // // // //     height: 100%;
// // // // //     object-fit: cover;
// // // // //     border-radius: 8px;
// // // // //     filter: brightness(0.75) contrast(1.1);
// // // // //   }

// // // // //   .epa-gold-text {
// // // // //     color: #C6A75E;
// // // // //   }

// // // // //   .epa-muted {
// // // // //     color: #A1A1A1;
// // // // //   }

// // // // //   .epa-section-heading {
// // // // //     font-family: 'Cormorant Garamond', serif;
// // // // //     font-size: 2rem;
// // // // //     font-weight: 600;
// // // // //     color: #E8E6E3;
// // // // //     letter-spacing: -0.01em;
// // // // //   }

// // // // //   .epa-feature-icon {
// // // // //     width: 40px;
// // // // //     height: 40px;
// // // // //     border-radius: 8px;
// // // // //     background: rgba(198,167,94,0.08);
// // // // //     border: 1px solid rgba(198,167,94,0.2);
// // // // //     display: flex;
// // // // //     align-items: center;
// // // // //     justify-content: center;
// // // // //     color: #C6A75E;
// // // // //     font-size: 16px;
// // // // //   }
// // // // // `;

// // // // // const FEATURES = [
// // // // //   {
// // // // //     label: "Training",
// // // // //     title: "Workout Protocol",
// // // // //     description: "Adaptive weekly programming calibrated to your readiness and performance trajectory.",
// // // // //     path: "/workout",
// // // // //     icon: "⚡",
// // // // //   },
// // // // //   {
// // // // //     label: "Recovery",
// // // // //     title: "Readiness Index",
// // // // //     description: "Daily biometric assessment and recovery scoring for optimal training decisions.",
// // // // //     path: "/readiness",
// // // // //     icon: "◎",
// // // // //   },
// // // // //   {
// // // // //     label: "Fuel",
// // // // //     title: "Nutrition Matrix",
// // // // //     description: "Precision macronutrient targets aligned with your training load and body composition goals.",
// // // // //     path: "/nutrition",
// // // // //     icon: "▲",
// // // // //   },
// // // // //   {
// // // // //     label: "Intelligence",
// // // // //     title: "APS Analytics",
// // // // //     description: "Athlete Performance Score — your composite readiness, output, and adaptation metric.",
// // // // //     path: "/aps",
// // // // //     icon: "∿",
// // // // //   },
// // // // // ];

// // // // // export default function Dashboard() {
// // // // //   const { user } = useAuth();
// // // // //   const navigate = useNavigate();

// // // // //   const [plan, setPlan] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [generating, setGenerating] = useState(false);
// // // // //   const [error, setError] = useState("");

// // // // //   const fetchPlan = async () => {
// // // // //     try {
// // // // //       setLoading(true);
// // // // //       const res = await planAPI.getActive(user.id);
// // // // //       setPlan(res.data?.plan || null);
// // // // //       setError("");
// // // // //     } catch (err) {
// // // // //       setPlan(null);
// // // // //       setError("No active workout plan found.");
// // // // //     }
// // // // //     setLoading(false);
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     if (user?.id) fetchPlan();
// // // // //   }, [user?.id]);

// // // // //   const handleGeneratePlan = async () => {
// // // // //     try {
// // // // //       setGenerating(true);
// // // // //       await planAPI.generate(user.id);
// // // // //       await fetchPlan();
// // // // //     } catch (err) {
// // // // //       alert(err.message || "Failed to generate plan");
// // // // //     }
// // // // //     setGenerating(false);
// // // // //   };

// // // // //   if (loading) return <BikeLoader />;

// // // // //   return (
// // // // //     <div className="epa-root">
// // // // //       <style>{styles}</style>

// // // // //       <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 32px 100px" }}>

// // // // //         {/* ── HERO ── */}
// // // // //         <div
// // // // //           style={{
// // // // //             display: "grid",
// // // // //             gridTemplateColumns: "1fr 1fr",
// // // // //             gap: 32,
// // // // //             marginBottom: 80,
// // // // //             minHeight: 420,
// // // // //           }}
// // // // //         >
// // // // //           {/* Left — image */}
// // // // //           <div style={{ position: "relative", borderRadius: 8, overflow: "hidden", minHeight: 380 }}>
// // // // //             <img
// // // // //               src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80"
// // // // //               alt="Elite performance training"
// // // // //               className="epa-hero-image"
// // // // //               style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
// // // // //             />
// // // // //             {/* Thin gold frame overlay */}
// // // // //             <div style={{
// // // // //               position: "absolute", inset: 0,
// // // // //               border: "1px solid rgba(198,167,94,0.25)",
// // // // //               borderRadius: 8,
// // // // //               pointerEvents: "none",
// // // // //             }} />
// // // // //           </div>

// // // // //           {/* Right — copy + metrics */}
// // // // //           <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 32 }}>
// // // // //             <div>
// // // // //               <p className="epa-label" style={{ marginBottom: 16 }}>
// // // // //                 Elite Performance Atelier — AI System
// // // // //               </p>
// // // // //               <h1 className="epa-serif" style={{
// // // // //                 fontSize: "clamp(2rem, 3.5vw, 3rem)",
// // // // //                 fontWeight: 600,
// // // // //                 lineHeight: 1.1,
// // // // //                 color: "#E8E6E3",
// // // // //                 marginBottom: 20,
// // // // //               }}>
// // // // //                 Engineered for Those<br />
// // // // //                 <em style={{ color: "#C6A75E" }}>Who Refuse Average</em>
// // // // //               </h1>
// // // // //               <p style={{ color: "#A1A1A1", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 440 }}>
// // // // //                 An adaptive intelligence platform built for competitive athletes and performance-driven individuals.
// // // // //                 Every variable calibrated. Every session deliberate.
// // // // //               </p>
// // // // //             </div>

// // // // //             {/* KPI strip */}
// // // // //             <hr className="epa-divider" />
// // // // //             <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
// // // // //               {[
// // // // //                 { label: "Recovery", value: "87", unit: "%" },
// // // // //                 { label: "APS Score", value: "94", unit: "pts" },
// // // // //                 { label: "Weekly Load", value: "4.2", unit: "k" },
// // // // //               ].map((kpi) => (
// // // // //                 <div key={kpi.label} className="epa-card epa-card-gold-top" style={{ padding: "18px 16px" }}>
// // // // //                   <p className="epa-label" style={{ marginBottom: 10 }}>{kpi.label}</p>
// // // // //                   <p className="epa-metric" style={{ fontSize: "2rem" }}>
// // // // //                     {kpi.value}
// // // // //                     <span className="epa-metric-unit">{kpi.unit}</span>
// // // // //                   </p>
// // // // //                 </div>
// // // // //               ))}
// // // // //             </div>
// // // // //             <hr className="epa-divider" />

// // // // //             <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
// // // // //               <span className="epa-emerald-dot" />
// // // // //               <span style={{ color: "#2E8B6A", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
// // // // //                 System Active
// // // // //               </span>
// // // // //               <span style={{ color: "#A1A1A1", fontSize: 12, marginLeft: 8 }}>
// // // // //                 — Welcome back, {user?.name}
// // // // //               </span>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* ── NAVIGATION MODULES ── */}
// // // // //         <div style={{ marginBottom: 80 }}>
// // // // //           <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 36 }}>
// // // // //             <h2 className="epa-section-heading">Performance Modules</h2>
// // // // //             <span className="epa-label">Core System Navigation</span>
// // // // //           </div>

// // // // //           <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
// // // // //             {FEATURES.map((f) => (
// // // // //               <div
// // // // //                 key={f.path}
// // // // //                 className="epa-nav-feature-card"
// // // // //                 onClick={() => navigate(f.path)}
// // // // //                 role="button"
// // // // //                 tabIndex={0}
// // // // //                 onKeyDown={(e) => e.key === "Enter" && navigate(f.path)}
// // // // //               >
// // // // //                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
// // // // //                   <div className="epa-feature-icon">{f.icon}</div>
// // // // //                   <span className="epa-label" style={{ color: "#C6A75E" }}>{f.label}</span>
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <h3 className="epa-serif" style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: 8, color: "#E8E6E3" }}>
// // // // //                     {f.title}
// // // // //                   </h3>
// // // // //                   <p style={{ color: "#A1A1A1", fontSize: "0.8rem", lineHeight: 1.6 }}>
// // // // //                     {f.description}
// // // // //                   </p>
// // // // //                 </div>
// // // // //                 <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
// // // // //                   <span style={{ color: "#C6A75E", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
// // // // //                     Enter Module
// // // // //                   </span>
// // // // //                   <span style={{ color: "#C6A75E", fontSize: 14 }}>→</span>
// // // // //                 </div>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* ── PLAN SECTION ── */}
// // // // //         <div>
// // // // //           <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 36 }}>
// // // // //             <h2 className="epa-section-heading">Training Programme</h2>
// // // // //             <span className="epa-label">Active Protocol</span>
// // // // //           </div>

// // // // //           {/* No Plan */}
// // // // //           {!plan && (
// // // // //             <div className="epa-card" style={{
// // // // //               textAlign: "center",
// // // // //               padding: "64px 48px",
// // // // //               display: "flex",
// // // // //               flexDirection: "column",
// // // // //               alignItems: "center",
// // // // //               gap: 24,
// // // // //             }}>
// // // // //               <div style={{
// // // // //                 width: 56, height: 56, borderRadius: "50%",
// // // // //                 border: "1px solid rgba(198,167,94,0.3)",
// // // // //                 display: "flex", alignItems: "center", justifyContent: "center",
// // // // //                 fontSize: 22, color: "#C6A75E", marginBottom: 8,
// // // // //               }}>
// // // // //                 ⊕
// // // // //               </div>
// // // // //               <div>
// // // // //                 <h3 className="epa-serif" style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 10, color: "#E8E6E3" }}>
// // // // //                   No Active Programme
// // // // //                 </h3>
// // // // //                 <p style={{ color: "#A1A1A1", fontSize: "0.875rem", maxWidth: 380, lineHeight: 1.7 }}>
// // // // //                   Your AI-generated adaptive training programme will be calibrated to your profile, goals, and current readiness state.
// // // // //                 </p>
// // // // //               </div>
// // // // //               <button
// // // // //                 onClick={handleGeneratePlan}
// // // // //                 disabled={generating}
// // // // //                 className="epa-btn-primary"
// // // // //                 style={{ marginTop: 8 }}
// // // // //               >
// // // // //                 {generating ? "Calibrating Protocol…" : "Generate Weekly Programme"}
// // // // //               </button>
// // // // //             </div>
// // // // //           )}

// // // // //           {/* Plan Exists */}
// // // // //           {plan && (
// // // // //             <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>

// // // // //               {/* Plan Info */}
// // // // //               <div className="epa-card epa-card-gold-top">
// // // // //                 <p className="epa-label" style={{ marginBottom: 20 }}>Programme Status</p>
// // // // //                 <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
// // // // //                   <div>
// // // // //                     <p className="epa-label" style={{ marginBottom: 6, fontSize: 9 }}>Plan ID</p>
// // // // //                     <p style={{ fontSize: "0.8rem", color: "#A1A1A1", fontFamily: "monospace", letterSpacing: "0.05em" }}>
// // // // //                       {plan._id}
// // // // //                     </p>
// // // // //                   </div>
// // // // //                   <hr className="epa-divider" />
// // // // //                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// // // // //                     <p className="epa-label" style={{ fontSize: 9 }}>Status</p>
// // // // //                     <span className="epa-status-active">
// // // // //                       <span className="epa-emerald-dot" />
// // // // //                       {plan.status || "Active"}
// // // // //                     </span>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>

// // // // //               {/* Intensity */}
// // // // //               <div className="epa-card epa-card-gold-top">
// // // // //                 <p className="epa-label" style={{ marginBottom: 20 }}>Load Parameters</p>
// // // // //                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
// // // // //                   <div>
// // // // //                     <p className="epa-label" style={{ marginBottom: 8, fontSize: 9 }}>Intensity</p>
// // // // //                     <p className="epa-metric" style={{ fontSize: "2rem" }}>
// // // // //                       {plan.baseIntensityLevel ?? "—"}
// // // // //                     </p>
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <p className="epa-label" style={{ marginBottom: 8, fontSize: 9 }}>Volume</p>
// // // // //                     <p className="epa-metric" style={{ fontSize: "2rem" }}>
// // // // //                       {plan.baseVolumeLevel ?? "—"}
// // // // //                     </p>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>

// // // // //               {/* Workout Structure */}
// // // // //               <div className="epa-card epa-card-gold-top">
// // // // //                 <p className="epa-label" style={{ marginBottom: 20 }}>Weekly Architecture</p>
// // // // //                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
// // // // //                   <div>
// // // // //                     <p className="epa-label" style={{ marginBottom: 8, fontSize: 9 }}>Planned Days</p>
// // // // //                     <p className="epa-metric" style={{ fontSize: "2.5rem" }}>
// // // // //                       {plan.plannedWorkoutDays ?? "—"}
// // // // //                     </p>
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <p className="epa-label" style={{ marginBottom: 8, fontSize: 9 }}>Structure Days</p>
// // // // //                     <p className="epa-metric" style={{ fontSize: "2.5rem" }}>
// // // // //                       {plan.weeklyStructure?.length ?? 0}
// // // // //                     </p>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>

// // // // //             </div>
// // // // //           )}
// // // // //         </div>

// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // import { useEffect, useState } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import { planAPI } from "../api/axios";
// // // // import { useAuth } from "../context/AuthContext";
// // // // import BikeLoader from "../components/BikeLoader";
// // // // import {
// // // //   Zap,
// // // //   Activity,
// // // //   Utensils,
// // // //   BarChart2,
// // // //   Plus,
// // // //   CheckCircle,
// // // //   Clock,
// // // //   TrendingUp,
// // // //   Flame,
// // // //   Heart,
// // // //   Shield,
// // // //   Calendar,
// // // //   ChevronRight,
// // // // } from "lucide-react";

// // // // /* ─── Feature module definitions ─── */
// // // // const FEATURES = [
// // // //   {
// // // //     label: "Training",
// // // //     title: "Workout Protocol",
// // // //     description:
// // // //       "Adaptive weekly programming calibrated to your readiness and performance trajectory.",
// // // //     path: "/workout",
// // // //     icon: <Zap className="w-7 h-7" />,
// // // //     gradient: "from-blue-500 to-cyan-500",
// // // //   },
// // // //   {
// // // //     label: "Recovery",
// // // //     title: "Readiness Index",
// // // //     description:
// // // //       "Daily biometric assessment and recovery scoring for optimal training decisions.",
// // // //     path: "/readiness",
// // // //     icon: <Heart className="w-7 h-7" />,
// // // //     gradient: "from-emerald-500 to-teal-500",
// // // //   },
// // // //   {
// // // //     label: "Fuel",
// // // //     title: "Nutrition Matrix",
// // // //     description:
// // // //       "Precision macronutrient targets aligned with your training load and body composition goals.",
// // // //     path: "/nutrition",
// // // //     icon: <Utensils className="w-7 h-7" />,
// // // //     gradient: "from-orange-500 to-red-500",
// // // //   },
// // // //   {
// // // //     label: "Intelligence",
// // // //     title: "APS Analytics",
// // // //     description:
// // // //       "Athlete Performance Score — your composite readiness, output, and adaptation metric.",
// // // //     path: "/aps",
// // // //     icon: <BarChart2 className="w-7 h-7" />,
// // // //     gradient: "from-indigo-500 to-purple-500",
// // // //   },
// // // // ];

// // // // /* ─── Today's schedule (placeholder content) ─── */
// // // // const TODAYS_SESSIONS = [
// // // //   { time: "06:30 AM", label: "Morning Mobility", type: "Recovery", done: true },
// // // //   { time: "09:00 AM", label: "Upper Strength — Push A", type: "Training", done: true },
// // // //   { time: "01:00 PM", label: "Nutrition Check-in", type: "Fuel", done: false },
// // // //   { time: "05:00 PM", label: "Evening Run — Zone 2", type: "Cardio", done: false },
// // // // ];

// // // // /* ─── Weekly summary stats ─── */
// // // // const WEEKLY_STATS = [
// // // //   { label: "Sessions Completed", value: "5", unit: "/ 6", icon: <CheckCircle className="w-5 h-5" />, gradient: "from-emerald-500 to-teal-500" },
// // // //   { label: "Avg Recovery", value: "87", unit: "%", icon: <Activity className="w-5 h-5" />, gradient: "from-blue-500 to-cyan-500" },
// // // //   { label: "Total Volume", value: "4.2", unit: "k reps", icon: <TrendingUp className="w-5 h-5" />, gradient: "from-indigo-500 to-purple-500" },
// // // //   { label: "Calories Burned", value: "3,140", unit: "kcal", icon: <Flame className="w-5 h-5" />, gradient: "from-orange-500 to-red-500" },
// // // // ];

// // // // /* ─── Reusable FeatureCard ─── */
// // // // function FeatureCard({ gradient, icon, label, title, description, onClick, delay }) {
// // // //   return (
// // // //     <div
// // // //       className={`group relative cursor-pointer animate-fade-in animation-delay-${delay}`}
// // // //       onClick={onClick}
// // // //       role="button"
// // // //       tabIndex={0}
// // // //       onKeyDown={(e) => e.key === "Enter" && onClick()}
// // // //     >
// // // //       {/* Glow layer */}
// // // //       <div
// // // //         className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500`}
// // // //       />
// // // //       {/* Card body */}
// // // //       <div className="relative bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform group-hover:scale-[1.02] h-full flex flex-col gap-5">
// // // //         {/* Top row */}
// // // //         <div className="flex items-start justify-between">
// // // //           <div
// // // //             className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-xl text-white transform group-hover:rotate-6 transition-transform`}
// // // //           >
// // // //             {icon}
// // // //           </div>
// // // //           <span className="text-xs font-bold tracking-widest uppercase text-indigo-500 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
// // // //             {label}
// // // //           </span>
// // // //         </div>
// // // //         {/* Text */}
// // // //         <div className="flex-1">
// // // //           <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
// // // //           <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
// // // //         </div>
// // // //         {/* CTA row */}
// // // //         <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:text-indigo-600 transition-colors">
// // // //           Enter Module <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // /* ─── Stat card ─── */
// // // // function StatCard({ label, value, unit, icon, gradient }) {
// // // //   return (
// // // //     <div className="group relative">
// // // //       <div
// // // //         className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl opacity-0 group-hover:opacity-15 blur-2xl transition-all duration-500`}
// // // //       />
// // // //       <div className="relative bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 transform group-hover:scale-[1.02]">
// // // //         <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg`}>
// // // //           {icon}
// // // //         </div>
// // // //         <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">{label}</p>
// // // //         <p className="text-3xl font-extrabold text-gray-900 leading-none">
// // // //           {value}
// // // //           <span className="text-sm font-normal text-gray-400 ml-1">{unit}</span>
// // // //         </p>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // /* ─── Main Dashboard ─── */
// // // // export default function Dashboard() {
// // // //   const { user } = useAuth();
// // // //   const navigate = useNavigate();

// // // //   const [plan, setPlan] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [generating, setGenerating] = useState(false);

// // // //   const fetchPlan = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const res = await planAPI.getActive(user.id);
// // // //       setPlan(res.data?.plan || null);
// // // //     } catch {
// // // //       setPlan(null);
// // // //     }
// // // //     setLoading(false);
// // // //   };

// // // //   useEffect(() => {
// // // //     if (user?.id) fetchPlan();
// // // //   }, [user?.id]);

// // // //   const handleGeneratePlan = async () => {
// // // //     try {
// // // //       setGenerating(true);
// // // //       await planAPI.generate(user.id);
// // // //       await fetchPlan();
// // // //     } catch (err) {
// // // //       alert(err.message || "Failed to generate plan");
// // // //     }
// // // //     setGenerating(false);
// // // //   };

// // // //   if (loading) return <BikeLoader />;

// // // //   return (
// // // //     <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">

// // // //       {/* ── Animated Background Blobs ── */}
// // // //       <div className="fixed inset-0 overflow-hidden pointer-events-none">
// // // //         <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob" />
// // // //         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000" />
// // // //         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
// // // //       </div>

// // // //       <main className="relative z-10 max-w-7xl mx-auto w-full px-6 py-14 flex flex-col gap-16">

// // // //         {/* ── HERO HEADER ── */}
// // // //         <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
// // // //           <div>
// // // //             {/* Badge */}
// // // //             <div className="inline-block px-5 py-2 mb-5 text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border-2 border-blue-600/20 rounded-full backdrop-blur-md animate-fade-in-down">
// // // //               <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
// // // //                 ⚡ Elite Performance Atelier — AI System
// // // //               </span>
// // // //             </div>
// // // //             <h1 className="text-5xl md:text-6xl font-extrabold leading-tight animate-fade-in">
// // // //               <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
// // // //                 Welcome back,
// // // //               </span>
// // // //               <br />
// // // //               <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
// // // //                 {user?.name ?? "Athlete"}.
// // // //               </span>
// // // //             </h1>
// // // //             <p className="mt-5 text-lg text-gray-500 max-w-xl leading-relaxed animate-fade-in animation-delay-200">
// // // //               Your adaptive intelligence platform is active. Every variable calibrated.
// // // //               <span className="font-semibold text-blue-700"> Every session deliberate.</span>
// // // //             </p>
// // // //           </div>

// // // //           {/* Status pill + hero image */}
// // // //           <div className="flex flex-col items-end gap-4 animate-fade-in animation-delay-400">
// // // //             <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md border border-emerald-200 rounded-2xl px-5 py-3 shadow-lg">
// // // //               <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
// // // //               <span className="text-sm font-bold text-emerald-600 tracking-wide uppercase">System Active</span>
// // // //             </div>
// // // //             <div className="relative w-72 h-44 rounded-3xl overflow-hidden shadow-2xl border border-white/40">
// // // //               <img
// // // //                 src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&q=80"
// // // //                 alt="Elite athlete training"
// // // //                 className="w-full h-full object-cover brightness-75 contrast-110"
// // // //               />
// // // //               <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent" />
// // // //               <div className="absolute bottom-3 left-4 text-white">
// // // //                 <p className="text-xs font-bold tracking-widest uppercase opacity-70">APS Score</p>
// // // //                 <p className="text-3xl font-extrabold leading-none">94 <span className="text-base font-normal opacity-70">pts</span></p>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </section>

// // // //         {/* ── WEEKLY STATS STRIP ── */}
// // // //         <section className="animate-fade-in animation-delay-200">
// // // //           <div className="flex items-baseline gap-4 mb-8">
// // // //             <h2 className="text-3xl font-extrabold text-gray-900">This Week</h2>
// // // //             <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Performance Summary</span>
// // // //           </div>
// // // //           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
// // // //             {WEEKLY_STATS.map((s) => (
// // // //               <StatCard key={s.label} {...s} />
// // // //             ))}
// // // //           </div>
// // // //         </section>

// // // //         {/* ── PERFORMANCE MODULES ── */}
// // // //         <section className="animate-fade-in animation-delay-400">
// // // //           <div className="flex items-baseline gap-4 mb-8">
// // // //             <h2 className="text-3xl font-extrabold text-gray-900">Performance Modules</h2>
// // // //             <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Core System Navigation</span>
// // // //           </div>
// // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // //             {FEATURES.map((f, i) => (
// // // //               <FeatureCard
// // // //                 key={f.path}
// // // //                 {...f}
// // // //                 onClick={() => navigate(f.path)}
// // // //                 delay={i * 200}
// // // //               />
// // // //             ))}
// // // //           </div>
// // // //         </section>

// // // //         {/* ── TWO COLUMN: Today's Schedule + Training Programme ── */}
// // // //         <section className="grid grid-cols-1 lg:grid-cols-5 gap-8 animate-fade-in animation-delay-600">

// // // //           {/* Today's Schedule — 2 cols */}
// // // //           <div className="lg:col-span-2">
// // // //             <div className="flex items-baseline gap-4 mb-6">
// // // //               <h2 className="text-3xl font-extrabold text-gray-900">Today</h2>
// // // //               <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Schedule</span>
// // // //             </div>
// // // //             <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl p-6 shadow-lg flex flex-col gap-1 divide-y divide-gray-100">
// // // //               {TODAYS_SESSIONS.map((s, i) => (
// // // //                 <div key={i} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
// // // //                   <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${s.done ? "bg-emerald-100 text-emerald-600" : "bg-indigo-50 text-indigo-400"}`}>
// // // //                     {s.done ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
// // // //                   </div>
// // // //                   <div className="flex-1 min-w-0">
// // // //                     <p className={`text-sm font-bold truncate ${s.done ? "text-gray-400 line-through" : "text-gray-800"}`}>{s.label}</p>
// // // //                     <p className="text-xs text-gray-400">{s.time}</p>
// // // //                   </div>
// // // //                   <span className={`text-xs font-bold tracking-wide uppercase px-2 py-1 rounded-lg ${
// // // //                     s.type === "Training" ? "bg-blue-50 text-blue-600" :
// // // //                     s.type === "Recovery" ? "bg-emerald-50 text-emerald-600" :
// // // //                     s.type === "Fuel" ? "bg-orange-50 text-orange-600" :
// // // //                     "bg-purple-50 text-purple-600"
// // // //                   }`}>{s.type}</span>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //           </div>

// // // //           {/* Training Programme — 3 cols */}
// // // //           <div className="lg:col-span-3">
// // // //             <div className="flex items-baseline gap-4 mb-6">
// // // //               <h2 className="text-3xl font-extrabold text-gray-900">Training Programme</h2>
// // // //               <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Active Protocol</span>
// // // //             </div>

// // // //             {!plan ? (
// // // //               /* ── No Plan ── */
// // // //               <div className="group relative h-full">
// // // //                 <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl opacity-0 group-hover:opacity-10 blur-2xl transition-all duration-500" />
// // // //                 <div className="relative bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl p-10 shadow-lg flex flex-col items-center justify-center text-center gap-6 h-full min-h-64">
// // // //                   <div className="w-16 h-16 rounded-full border-2 border-dashed border-indigo-300 flex items-center justify-center text-indigo-400">
// // // //                     <Plus className="w-8 h-8" />
// // // //                   </div>
// // // //                   <div>
// // // //                     <h3 className="text-2xl font-bold text-gray-900 mb-2">No Active Programme</h3>
// // // //                     <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
// // // //                       Your AI-generated adaptive training programme will be calibrated to your profile, goals, and current readiness state.
// // // //                     </p>
// // // //                   </div>
// // // //                   <button
// // // //                     onClick={handleGeneratePlan}
// // // //                     disabled={generating}
// // // //                     className="group px-10 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-2xl text-sm font-bold tracking-wide hover:shadow-2xl hover:shadow-blue-500/40 transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
// // // //                   >
// // // //                     <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
// // // //                     {generating ? "Calibrating Protocol…" : "Generate Weekly Programme"}
// // // //                   </button>
// // // //                 </div>
// // // //               </div>
// // // //             ) : (
// // // //               /* ── Plan Exists ── */
// // // //               <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 h-full">

// // // //                 {/* Status */}
// // // //                 <div className="group relative">
// // // //                   <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-3xl opacity-0 group-hover:opacity-15 blur-2xl transition-all duration-500" />
// // // //                   <div className="relative bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all border-t-2 border-t-emerald-400 h-full">
// // // //                     <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-5">Programme Status</p>
// // // //                     <div className="flex flex-col gap-4">
// // // //                       <div>
// // // //                         <p className="text-xs font-bold text-gray-400 mb-1">Plan ID</p>
// // // //                         <p className="text-xs text-gray-500 font-mono truncate">{plan._id}</p>
// // // //                       </div>
// // // //                       <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
// // // //                         <p className="text-xs font-bold text-gray-400">Status</p>
// // // //                         <span className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-lg">
// // // //                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
// // // //                           {plan.status || "Active"}
// // // //                         </span>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Load Parameters */}
// // // //                 <div className="group relative">
// // // //                   <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-15 blur-2xl transition-all duration-500" />
// // // //                   <div className="relative bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all border-t-2 border-t-blue-400 h-full">
// // // //                     <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-5">Load Parameters</p>
// // // //                     <div className="grid grid-cols-2 gap-4">
// // // //                       <div>
// // // //                         <p className="text-xs font-bold text-gray-400 mb-2">Intensity</p>
// // // //                         <p className="text-4xl font-extrabold text-gray-900 leading-none">{plan.baseIntensityLevel ?? "—"}</p>
// // // //                       </div>
// // // //                       <div>
// // // //                         <p className="text-xs font-bold text-gray-400 mb-2">Volume</p>
// // // //                         <p className="text-4xl font-extrabold text-gray-900 leading-none">{plan.baseVolumeLevel ?? "—"}</p>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Weekly Architecture */}
// // // //                 <div className="group relative">
// // // //                   <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-15 blur-2xl transition-all duration-500" />
// // // //                   <div className="relative bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all border-t-2 border-t-indigo-400 h-full">
// // // //                     <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-5">Weekly Architecture</p>
// // // //                     <div className="grid grid-cols-2 gap-4">
// // // //                       <div>
// // // //                         <p className="text-xs font-bold text-gray-400 mb-2">Planned Days</p>
// // // //                         <p className="text-4xl font-extrabold text-gray-900 leading-none">{plan.plannedWorkoutDays ?? "—"}</p>
// // // //                       </div>
// // // //                       <div>
// // // //                         <p className="text-xs font-bold text-gray-400 mb-2">Structure Days</p>
// // // //                         <p className="text-4xl font-extrabold text-gray-900 leading-none">{plan.weeklyStructure?.length ?? 0}</p>
// // // //                       </div>
// // // //                     </div>
// // // //                     <div className="mt-4 flex gap-1">
// // // //                       {Array.from({ length: 7 }).map((_, d) => (
// // // //                         <div
// // // //                           key={d}
// // // //                           className={`flex-1 h-1.5 rounded-full ${d < (plan.plannedWorkoutDays ?? 0) ? "bg-gradient-to-r from-indigo-500 to-purple-500" : "bg-gray-100"}`}
// // // //                         />
// // // //                       ))}
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </section>

// // // //         {/* ── QUICK ACTIONS ── */}
// // // //         <section className="animate-fade-in animation-delay-800">
// // // //           <div className="flex items-baseline gap-4 mb-6">
// // // //             <h2 className="text-3xl font-extrabold text-gray-900">Quick Actions</h2>
// // // //             <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Shortcuts</span>
// // // //           </div>
// // // //           <div className="flex flex-wrap gap-4">
// // // //             {[
// // // //               { label: "Log Today's Session", icon: <Activity className="w-5 h-5" />, primary: true, path: "/workout" },
// // // //               { label: "Check Readiness", icon: <Heart className="w-5 h-5" />, primary: false, path: "/readiness" },
// // // //               { label: "View Nutrition Plan", icon: <Utensils className="w-5 h-5" />, primary: false, path: "/nutrition" },
// // // //               { label: "Weekly Schedule", icon: <Calendar className="w-5 h-5" />, primary: false, path: "/workout" },
// // // //               { label: "View APS Report", icon: <Shield className="w-5 h-5" />, primary: false, path: "/aps" },
// // // //             ].map((a) =>
// // // //               a.primary ? (
// // // //                 <button
// // // //                   key={a.label}
// // // //                   onClick={() => navigate(a.path)}
// // // //                   className="group px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-2xl text-sm font-bold hover:shadow-2xl hover:shadow-blue-500/40 transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3"
// // // //                 >
// // // //                   <span className="group-hover:rotate-12 transition-transform">{a.icon}</span>
// // // //                   {a.label}
// // // //                 </button>
// // // //               ) : (
// // // //                 <button
// // // //                   key={a.label}
// // // //                   onClick={() => navigate(a.path)}
// // // //                   className="px-8 py-4 bg-white/80 backdrop-blur-md border-2 border-indigo-200 text-gray-700 rounded-2xl text-sm font-bold hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center gap-3"
// // // //                 >
// // // //                   <span className="text-indigo-500">{a.icon}</span>
// // // //                   {a.label}
// // // //                 </button>
// // // //               )
// // // //             )}
// // // //           </div>
// // // //         </section>

// // // //       </main>

// // // //       {/* ── FOOTER ── */}
// // // //       <footer className="relative bg-slate-900 border-t border-white/10 py-12 px-6 mt-8">
// // // //         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
// // // //           <div>
// // // //             <h2 className="text-white font-extrabold text-2xl tracking-tight">
// // // //               ELITE<span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">ATELIER</span>
// // // //             </h2>
// // // //             <p className="text-gray-400 text-sm mt-1">AI-powered performance engineering.</p>
// // // //           </div>
// // // //           <div className="flex gap-8 text-gray-400 font-medium text-sm">
// // // //             <a href="#" className="hover:text-blue-400 transition-colors">Training</a>
// // // //             <a href="#" className="hover:text-blue-400 transition-colors">Nutrition</a>
// // // //             <a href="#" className="hover:text-blue-400 transition-colors">Analytics</a>
// // // //             <a href="#" className="hover:text-blue-400 transition-colors">Support</a>
// // // //           </div>
// // // //           <p className="text-gray-500 text-sm">© 2026 Elite Performance Atelier. All rights reserved.</p>
// // // //         </div>
// // // //       </footer>

// // // //     </div>
// // // //   );
// // // // }

// // // import { useEffect, useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { planAPI } from "../api/axios";
// // // import { useAuth } from "../context/AuthContext";
// // // import BikeLoader from "../components/BikeLoader";
// // // import {
// // //   Zap, Activity, Utensils, BarChart2, Plus,
// // //   CheckCircle, Clock, TrendingUp, Flame, Heart,
// // //   Shield, Calendar, ChevronRight,
// // // } from "lucide-react";

// // // const FEATURES = [
// // //   {
// // //     label: "Training", title: "Workout Protocol",
// // //     description: "Adaptive weekly programming calibrated to your readiness and performance trajectory.",
// // //     path: "/workout", icon: <Zap className="w-7 h-7" />, gradient: "from-blue-500 to-cyan-500",
// // //   },
// // //   {
// // //     label: "Recovery", title: "Readiness Index",
// // //     description: "Daily biometric assessment and recovery scoring for optimal training decisions.",
// // //     path: "/readiness", icon: <Heart className="w-7 h-7" />, gradient: "from-emerald-500 to-teal-500",
// // //   },
// // //   {
// // //     label: "Fuel", title: "Nutrition Matrix",
// // //     description: "Precision macronutrient targets aligned with your training load and body composition goals.",
// // //     path: "/nutrition", icon: <Utensils className="w-7 h-7" />, gradient: "from-orange-500 to-red-500",
// // //   },
// // //   {
// // //     label: "Intelligence", title: "APS Analytics",
// // //     description: "Athlete Performance Score — composite readiness, output, and adaptation metric.",
// // //     path: "/aps", icon: <BarChart2 className="w-7 h-7" />, gradient: "from-indigo-500 to-purple-500",
// // //   },
// // // ];

// // // const TODAYS_SESSIONS = [
// // //   { time: "06:30 AM", label: "Morning Mobility", type: "Recovery", done: true },
// // //   { time: "09:00 AM", label: "Upper Strength — Push A", type: "Training", done: true },
// // //   { time: "01:00 PM", label: "Nutrition Check-in", type: "Fuel", done: false },
// // //   { time: "05:00 PM", label: "Evening Run — Zone 2", type: "Cardio", done: false },
// // // ];

// // // const WEEKLY_STATS = [
// // //   { label: "Sessions Completed", value: "5", unit: "/ 6", icon: <CheckCircle className="w-5 h-5" />, gradient: "from-emerald-500 to-teal-500" },
// // //   { label: "Avg Recovery",        value: "87", unit: "%",      icon: <Activity className="w-5 h-5" />,      gradient: "from-blue-500 to-cyan-500" },
// // //   { label: "Total Volume",        value: "4.2", unit: "k reps", icon: <TrendingUp className="w-5 h-5" />,   gradient: "from-indigo-500 to-purple-500" },
// // //   { label: "Calories Burned",     value: "3,140", unit: "kcal", icon: <Flame className="w-5 h-5" />,       gradient: "from-orange-500 to-red-500" },
// // // ];

// // // const SESSION_TYPE_STYLES = {
// // //   Training: "bg-blue-50 text-blue-600 border border-blue-100",
// // //   Recovery: "bg-emerald-50 text-emerald-600 border border-emerald-100",
// // //   Fuel:     "bg-orange-50 text-orange-600 border border-orange-100",
// // //   Cardio:   "bg-purple-50 text-purple-600 border border-purple-100",
// // // };

// // // function StatCard({ label, value, unit, icon, gradient }) {
// // //   return (
// // //     <div className="group relative">
// // //       <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500`} />
// // //       <div className="relative bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 transform group-hover:scale-[1.02]">
// // //         <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg`}>
// // //           {icon}
// // //         </div>
// // //         <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">{label}</p>
// // //         <p className="text-3xl font-extrabold text-gray-900 leading-none">
// // //           {value}
// // //           <span className="text-sm font-normal text-gray-400 ml-1">{unit}</span>
// // //         </p>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function FeatureCard({ gradient, icon, label, title, description, onClick }) {
// // //   return (
// // //     <div className="group relative cursor-pointer" onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onClick()}>
// // //       <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500`} />
// // //       <div className="relative bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform group-hover:scale-[1.02] h-full flex flex-col gap-5">
// // //         <div className="flex items-start justify-between">
// // //           <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-xl text-white transform group-hover:rotate-6 transition-transform`}>
// // //             {icon}
// // //           </div>
// // //           <span className="text-xs font-bold tracking-widest uppercase text-indigo-500 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
// // //             {label}
// // //           </span>
// // //         </div>
// // //         <div className="flex-1">
// // //           <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
// // //           <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
// // //         </div>
// // //         <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:text-indigo-600 transition-colors">
// // //           Enter Module <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default function Dashboard() {
// // //   const { user } = useAuth();
// // //   const navigate = useNavigate();
// // //   const [plan, setPlan] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [generating, setGenerating] = useState(false);

// // //   const fetchPlan = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const res = await planAPI.getActive(user.id);
// // //       setPlan(res.data?.plan || null);
// // //     } catch { setPlan(null); }
// // //     setLoading(false);
// // //   };

// // //   useEffect(() => { if (user?.id) fetchPlan(); }, [user?.id]);

// // //   const handleGeneratePlan = async () => {
// // //     try {
// // //       setGenerating(true);
// // //       await planAPI.generate(user.id);
// // //       await fetchPlan();
// // //     } catch (err) { alert(err.message || "Failed to generate plan"); }
// // //     setGenerating(false);
// // //   };

// // //   if (loading) return <BikeLoader />;

// // //   return (
// // //     <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">

// // //       {/* ── Background Blobs ── */}
// // //       <div className="fixed inset-0 overflow-hidden pointer-events-none">
// // //         <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob" />
// // //         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000" />
// // //         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
// // //       </div>

// // //       <main className="relative z-10 max-w-7xl mx-auto w-full px-8 py-14 flex flex-col gap-16">

// // //         {/* ── HERO ── */}
// // //         <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 animate-fade-in">
// // //           <div>
// // //             <div className="inline-block px-5 py-2 mb-5 text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border-2 border-blue-600/20 rounded-full backdrop-blur-md">
// // //               <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
// // //                 ⚡ Elite Performance Atelier — AI System
// // //               </span>
// // //             </div>
// // //             <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
// // //               <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
// // //                 Welcome back,
// // //               </span>
// // //               <br />
// // //               <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
// // //                 {user?.name ?? "Athlete"}.
// // //               </span>
// // //             </h1>
// // //             <p className="mt-5 text-lg text-gray-500 max-w-xl leading-relaxed animate-fade-in animation-delay-200">
// // //               Your adaptive intelligence platform is active. Every variable calibrated.{" "}
// // //               <span className="font-semibold text-blue-700">Every session deliberate.</span>
// // //             </p>
// // //           </div>

// // //           {/* Status + KPI card */}
// // //           <div className="flex flex-col items-end gap-4 animate-fade-in animation-delay-400">
// // //             <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md border border-emerald-200 rounded-2xl px-5 py-3 shadow-lg">
// // //               <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
// // //               <span className="text-sm font-bold text-emerald-600 tracking-wide uppercase">System Active</span>
// // //             </div>
// // //             <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl p-6 shadow-xl min-w-48">
// // //               <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">APS Score</p>
// // //               <p className="text-4xl font-extrabold text-gray-900 leading-none">
// // //                 94 <span className="text-base font-normal text-gray-400">pts</span>
// // //               </p>
// // //               <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
// // //                 <div className="h-full w-[94%] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </section>

// // //         {/* ── THIS WEEK ── */}
// // //         <section className="animate-fade-in animation-delay-200">
// // //           <div className="flex items-baseline gap-4 mb-8">
// // //             <h2 className="text-3xl font-extrabold text-gray-900">This Week</h2>
// // //             <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Performance Summary</span>
// // //           </div>
// // //           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
// // //             {WEEKLY_STATS.map((s) => <StatCard key={s.label} {...s} />)}
// // //           </div>
// // //         </section>

// // //         {/* ── PERFORMANCE MODULES ── */}
// // //         <section className="animate-fade-in animation-delay-400">
// // //           <div className="flex items-baseline gap-4 mb-8">
// // //             <h2 className="text-3xl font-extrabold text-gray-900">Performance Modules</h2>
// // //             <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Core System Navigation</span>
// // //           </div>
// // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // //             {FEATURES.map((f) => (
// // //               <FeatureCard key={f.path} {...f} onClick={() => navigate(f.path)} />
// // //             ))}
// // //           </div>
// // //         </section>

// // //         {/* ── TODAY + PLAN ── */}
// // //         <section className="grid grid-cols-1 lg:grid-cols-5 gap-8 animate-fade-in animation-delay-600">

// // //           {/* Today's Schedule */}
// // //           <div className="lg:col-span-2">
// // //             <div className="flex items-baseline gap-4 mb-6">
// // //               <h2 className="text-3xl font-extrabold text-gray-900">Today</h2>
// // //               <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Schedule</span>
// // //             </div>
// // //             <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl p-6 shadow-lg divide-y divide-gray-100">
// // //               {TODAYS_SESSIONS.map((s, i) => (
// // //                 <div key={i} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
// // //                   <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${s.done ? "bg-emerald-100 text-emerald-600" : "bg-indigo-50 text-indigo-400"}`}>
// // //                     {s.done ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
// // //                   </div>
// // //                   <div className="flex-1 min-w-0">
// // //                     <p className={`text-sm font-bold truncate ${s.done ? "text-gray-400 line-through" : "text-gray-800"}`}>{s.label}</p>
// // //                     <p className="text-xs text-gray-400">{s.time}</p>
// // //                   </div>
// // //                   <span className={`text-xs font-bold tracking-wide uppercase px-2 py-1 rounded-lg ${SESSION_TYPE_STYLES[s.type]}`}>
// // //                     {s.type}
// // //                   </span>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>

// // //           {/* Training Programme */}
// // //           <div className="lg:col-span-3">
// // //             <div className="flex items-baseline gap-4 mb-6">
// // //               <h2 className="text-3xl font-extrabold text-gray-900">Training Programme</h2>
// // //               <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Active Protocol</span>
// // //             </div>

// // //             {!plan ? (
// // //               <div className="group relative h-full">
// // //                 <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl opacity-0 group-hover:opacity-10 blur-2xl transition-all duration-500" />
// // //                 <div className="relative bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl p-10 shadow-lg flex flex-col items-center justify-center text-center gap-6 min-h-64">
// // //                   <div className="w-16 h-16 rounded-full border-2 border-dashed border-indigo-300 flex items-center justify-center text-indigo-400">
// // //                     <Plus className="w-8 h-8" />
// // //                   </div>
// // //                   <div>
// // //                     <h3 className="text-2xl font-bold text-gray-900 mb-2">No Active Programme</h3>
// // //                     <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
// // //                       Your AI-generated adaptive training programme will be calibrated to your profile, goals, and current readiness state.
// // //                     </p>
// // //                   </div>
// // //                   <button
// // //                     onClick={handleGeneratePlan}
// // //                     disabled={generating}
// // //                     className="group/btn px-10 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-2xl text-sm font-bold tracking-wide hover:shadow-2xl hover:shadow-blue-500/40 transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
// // //                   >
// // //                     <Zap className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
// // //                     {generating ? "Calibrating Protocol…" : "Generate Weekly Programme"}
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             ) : (
// // //               <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
// // //                 {/* Status */}
// // //                 <div className="bg-white/90 backdrop-blur-md border border-gray-200 border-t-2 border-t-emerald-400 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all">
// // //                   <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-5">Programme Status</p>
// // //                   <div className="flex flex-col gap-4">
// // //                     <div>
// // //                       <p className="text-xs font-bold text-gray-400 mb-1">Plan ID</p>
// // //                       <p className="text-xs text-gray-500 font-mono truncate">{plan._id}</p>
// // //                     </div>
// // //                     <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
// // //                       <p className="text-xs font-bold text-gray-400">Status</p>
// // //                       <span className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-lg">
// // //                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
// // //                         {plan.status || "Active"}
// // //                       </span>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //                 {/* Load */}
// // //                 <div className="bg-white/90 backdrop-blur-md border border-gray-200 border-t-2 border-t-blue-400 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all">
// // //                   <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-5">Load Parameters</p>
// // //                   <div className="grid grid-cols-2 gap-4">
// // //                     <div>
// // //                       <p className="text-xs font-bold text-gray-400 mb-2">Intensity</p>
// // //                       <p className="text-4xl font-extrabold text-gray-900 leading-none">{plan.baseIntensityLevel ?? "—"}</p>
// // //                     </div>
// // //                     <div>
// // //                       <p className="text-xs font-bold text-gray-400 mb-2">Volume</p>
// // //                       <p className="text-4xl font-extrabold text-gray-900 leading-none">{plan.baseVolumeLevel ?? "—"}</p>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //                 {/* Architecture */}
// // //                 <div className="bg-white/90 backdrop-blur-md border border-gray-200 border-t-2 border-t-indigo-400 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all">
// // //                   <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-5">Weekly Architecture</p>
// // //                   <div className="grid grid-cols-2 gap-4">
// // //                     <div>
// // //                       <p className="text-xs font-bold text-gray-400 mb-2">Planned Days</p>
// // //                       <p className="text-4xl font-extrabold text-gray-900 leading-none">{plan.plannedWorkoutDays ?? "—"}</p>
// // //                     </div>
// // //                     <div>
// // //                       <p className="text-xs font-bold text-gray-400 mb-2">Structure Days</p>
// // //                       <p className="text-4xl font-extrabold text-gray-900 leading-none">{plan.weeklyStructure?.length ?? 0}</p>
// // //                     </div>
// // //                   </div>
// // //                   <div className="mt-4 flex gap-1">
// // //                     {Array.from({ length: 7 }).map((_, d) => (
// // //                       <div key={d} className={`flex-1 h-1.5 rounded-full ${d < (plan.plannedWorkoutDays ?? 0) ? "bg-gradient-to-r from-indigo-500 to-purple-500" : "bg-gray-100"}`} />
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </section>

// // //         {/* ── QUICK ACTIONS ── */}
// // //         <section className="animate-fade-in animation-delay-800">
// // //           <div className="flex items-baseline gap-4 mb-6">
// // //             <h2 className="text-3xl font-extrabold text-gray-900">Quick Actions</h2>
// // //             <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Shortcuts</span>
// // //           </div>
// // //           <div className="flex flex-wrap gap-4">
// // //             {[
// // //               { label: "Log Today's Session", icon: <Activity className="w-5 h-5" />, primary: true,  path: "/workout" },
// // //               { label: "Check Readiness",     icon: <Heart className="w-5 h-5" />,    primary: false, path: "/readiness" },
// // //               { label: "View Nutrition Plan", icon: <Utensils className="w-5 h-5" />, primary: false, path: "/nutrition" },
// // //               { label: "Weekly Schedule",     icon: <Calendar className="w-5 h-5" />, primary: false, path: "/workout" },
// // //               { label: "View APS Report",     icon: <Shield className="w-5 h-5" />,   primary: false, path: "/aps" },
// // //             ].map((a) => a.primary ? (
// // //               <button key={a.label} onClick={() => navigate(a.path)}
// // //                 className="group px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-2xl text-sm font-bold hover:shadow-2xl hover:shadow-blue-500/40 transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3">
// // //                 <span className="group-hover:rotate-12 transition-transform">{a.icon}</span>
// // //                 {a.label}
// // //               </button>
// // //             ) : (
// // //               <button key={a.label} onClick={() => navigate(a.path)}
// // //                 className="px-8 py-4 bg-white/80 backdrop-blur-md border-2 border-indigo-200 text-gray-700 rounded-2xl text-sm font-bold hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center gap-3">
// // //                 <span className="text-indigo-500">{a.icon}</span>
// // //                 {a.label}
// // //               </button>
// // //             ))}
// // //           </div>
// // //         </section>

// // //       </main>

// // //       {/* ── FOOTER ── */}
// // //       <footer className="relative bg-slate-900 border-t border-white/10 py-12 px-6 mt-8">
// // //         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
// // //           <div>
// // //             <h2 className="text-white font-extrabold text-2xl tracking-tight">
// // //               ELITE<span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">ATELIER</span>
// // //             </h2>
// // //             <p className="text-gray-400 text-sm mt-1">AI-powered performance engineering.</p>
// // //           </div>
// // //           <div className="flex gap-8 text-gray-400 font-medium text-sm">
// // //             {["Training","Nutrition","Analytics","Support"].map(l => (
// // //               <a key={l} href="#" className="hover:text-blue-400 transition-colors">{l}</a>
// // //             ))}
// // //           </div>
// // //           <p className="text-gray-500 text-sm">© 2026 Elite Performance Atelier. All rights reserved.</p>
// // //         </div>
// // //       </footer>

// // //     </div>
// // //   );
// // // }


// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { planAPI } from "../api/axios";
// // import { useAuth } from "../context/AuthContext";
// // import BikeLoader from "../components/BikeLoader";
// // import {
// //   Zap, Activity, Utensils, BarChart2, Plus,
// //   CheckCircle, Clock, TrendingUp, Flame, Heart,
// //   Shield, Calendar, ChevronRight,
// // } from "lucide-react";

// // const FEATURES = [
// //   { label: "Training",     title: "Workout Protocol",  description: "Adaptive weekly programming calibrated to your readiness and performance trajectory.", path: "/workout",   icon: <Zap className="w-7 h-7" />,      gradient: "from-blue-500 to-cyan-500" },
// //   { label: "Recovery",     title: "Readiness Index",   description: "Daily biometric assessment and recovery scoring for optimal training decisions.",        path: "/readiness", icon: <Heart className="w-7 h-7" />,    gradient: "from-emerald-500 to-teal-500" },
// //   { label: "Fuel",         title: "Nutrition Matrix",  description: "Precision macronutrient targets aligned with your training load and body composition goals.", path: "/nutrition", icon: <Utensils className="w-7 h-7" />, gradient: "from-orange-500 to-red-500" },
// //   { label: "Intelligence", title: "APS Analytics",     description: "Athlete Performance Score — composite readiness, output, and adaptation metric.",        path: "/aps",       icon: <BarChart2 className="w-7 h-7" />, gradient: "from-indigo-500 to-purple-500" },
// // ];

// // const TODAYS_SESSIONS = [
// //   { time: "06:30 AM", label: "Morning Mobility",        type: "Recovery", done: true  },
// //   { time: "09:00 AM", label: "Upper Strength — Push A", type: "Training", done: true  },
// //   { time: "01:00 PM", label: "Nutrition Check-in",       type: "Fuel",     done: false },
// //   { time: "05:00 PM", label: "Evening Run — Zone 2",    type: "Cardio",   done: false },
// // ];

// // const WEEKLY_STATS = [
// //   { label: "Sessions Completed", value: "5",     unit: "/ 6",    icon: <CheckCircle className="w-5 h-5" />, gradient: "from-emerald-500 to-teal-500"  },
// //   { label: "Avg Recovery",        value: "87",    unit: "%",      icon: <Activity className="w-5 h-5" />,    gradient: "from-blue-500 to-cyan-500"      },
// //   { label: "Total Volume",        value: "4.2",   unit: "k reps", icon: <TrendingUp className="w-5 h-5" />,  gradient: "from-indigo-500 to-purple-500"  },
// //   { label: "Calories Burned",     value: "3,140", unit: "kcal",   icon: <Flame className="w-5 h-5" />,       gradient: "from-orange-500 to-red-500"     },
// // ];

// // const SESSION_TYPE_STYLES = {
// //   Training: "bg-blue-50 text-blue-600 border border-blue-100",
// //   Recovery: "bg-emerald-50 text-emerald-600 border border-emerald-100",
// //   Fuel:     "bg-orange-50 text-orange-600 border border-orange-100",
// //   Cardio:   "bg-purple-50 text-purple-600 border border-purple-100",
// // };

// // function StatCard({ label, value, unit, icon, gradient }) {
// //   return (
// //     <div className="group relative">
// //       <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500`} />
// //       <div className="relative bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 transform group-hover:scale-[1.02]">
// //         <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg`}>
// //           {icon}
// //         </div>
// //         <p style={{ color: "#6b7280", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{label}</p>
// //         <p style={{ fontSize: "1.875rem", fontWeight: 800, color: "#111827", lineHeight: 1 }}>
// //           {value}<span style={{ fontSize: "0.875rem", fontWeight: 400, color: "#9ca3af", marginLeft: 4 }}>{unit}</span>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // function FeatureCard({ gradient, icon, label, title, description, onClick }) {
// //   return (
// //     <div className="group relative cursor-pointer" onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onClick()}>
// //       <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500`} />
// //       <div className="relative bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform group-hover:scale-[1.02] h-full flex flex-col gap-5">
// //         <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
// //           <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-xl text-white transform group-hover:rotate-6 transition-transform`}>
// //             {icon}
// //           </div>
// //           <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6366f1", background: "#eef2ff", border: "1px solid #e0e7ff", padding: "3px 10px", borderRadius: 999 }}>
// //             {label}
// //           </span>
// //         </div>
// //         <div style={{ flex: 1 }}>
// //           <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#111827", marginBottom: 8 }}>{title}</h3>
// //           <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: 1.6 }}>{description}</p>
// //         </div>
// //         <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.875rem", fontWeight: 600, color: "#3b82f6" }} className="group-hover:text-indigo-600 transition-colors">
// //           Enter Module <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default function Dashboard() {
// //   const { user } = useAuth();
// //   const navigate = useNavigate();
// //   const [plan, setPlan] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [generating, setGenerating] = useState(false);

// //   const fetchPlan = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await planAPI.getActive(user.id);
// //       setPlan(res.data?.plan || null);
// //     } catch { setPlan(null); }
// //     setLoading(false);
// //   };

// //   useEffect(() => { if (user?.id) fetchPlan(); }, [user?.id]);

// //   const handleGeneratePlan = async () => {
// //     try {
// //       setGenerating(true);
// //       await planAPI.generate(user.id);
// //       await fetchPlan();
// //     } catch (err) { alert(err.message || "Failed to generate plan"); }
// //     setGenerating(false);
// //   };

// //   if (loading) return <BikeLoader />;

// //   return (
// //     <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(135deg, #f8fafc, #eff6ff, #eef2ff)", position: "relative", overflow: "hidden" }}>

// //       {/* ── Background Blobs ── */}
// //       <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
// //         <div className="animate-blob animation-delay-0"    style={{ position: "absolute", top: "-10rem",  right: "-10rem", width: "24rem", height: "24rem", borderRadius: "50%", background: "#93c5fd", mixBlendMode: "multiply", filter: "blur(64px)", opacity: 0.35 }} />
// //         <div className="animate-blob animation-delay-2000" style={{ position: "absolute", bottom: "-10rem", left: "-10rem",  width: "24rem", height: "24rem", borderRadius: "50%", background: "#c4b5fd", mixBlendMode: "multiply", filter: "blur(64px)", opacity: 0.35 }} />
// //         <div className="animate-blob animation-delay-4000" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "24rem", height: "24rem", borderRadius: "50%", background: "#a5b4fc", mixBlendMode: "multiply", filter: "blur(64px)", opacity: 0.25 }} />
// //       </div>

// //       <main style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", width: "100%", padding: "56px 48px 80px", display: "flex", flexDirection: "column", gap: 64 }}>

// //         {/* ── HERO ── */}
// //         <section style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }} className="animate-fade-in">
// //           <div>
// //             {/* Badge */}
// //             <div style={{ display: "inline-block", padding: "6px 20px", marginBottom: 20, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", background: "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(99,102,241,0.08))", border: "2px solid rgba(99,102,241,0.2)", borderRadius: 999 }}>
// //               <span style={{ background: "linear-gradient(135deg, #2563eb, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
// //                 ⚡ Elite Performance Atelier — AI System
// //               </span>
// //             </div>
// //             {/* Heading */}
// //             <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 0 }}>
// //               <span style={{ background: "linear-gradient(135deg, #0f172a, #1e3a8a, #312e81)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}>
// //                 Welcome back,
// //               </span>
// //               <span style={{ background: "linear-gradient(135deg, #2563eb, #6366f1, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}>
// //                 {user?.name ?? user?.email ?? "Athlete"}.
// //               </span>
// //             </h1>
// //             {/* Subtext — inline styles to avoid global a tag override */}
// //             <p style={{ marginTop: 20, fontSize: "1.05rem", color: "#6b7280", maxWidth: 480, lineHeight: 1.7 }}>
// //               Your adaptive intelligence platform is active. Every variable calibrated.{" "}
// //               <strong style={{ color: "#1d4ed8", fontWeight: 600 }}>Every session deliberate.</strong>
// //             </p>
// //           </div>

// //           {/* Right — status + APS */}
// //           <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 16 }}>
// //             <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", border: "1px solid #d1fae5", borderRadius: 16, padding: "10px 20px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
// //               <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#34d399", display: "inline-block" }} className="animate-pulse" />
// //               <span style={{ fontSize: 12, fontWeight: 700, color: "#059669", letterSpacing: "0.08em", textTransform: "uppercase" }}>System Active</span>
// //             </div>
// //             <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid #e5e7eb", borderRadius: 24, padding: "24px 28px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", minWidth: 200 }}>
// //               <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 4 }}>APS Score</p>
// //               <p style={{ fontSize: "2.5rem", fontWeight: 800, color: "#111827", lineHeight: 1 }}>
// //                 94 <span style={{ fontSize: "0.9rem", fontWeight: 400, color: "#9ca3af" }}>pts</span>
// //               </p>
// //               <div style={{ marginTop: 12, height: 6, background: "#f3f4f6", borderRadius: 999, overflow: "hidden" }}>
// //                 <div style={{ height: "100%", width: "94%", background: "linear-gradient(90deg, #3b82f6, #6366f1)", borderRadius: 999 }} />
// //               </div>
// //             </div>
// //           </div>
// //         </section>

// //         {/* ── THIS WEEK ── */}
// //         <section className="animate-fade-in animation-delay-200">
// //           <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 28 }}>
// //             <h2 style={{ fontSize: "1.875rem", fontWeight: 800, color: "#111827" }}>This Week</h2>
// //             <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9ca3af" }}>Performance Summary</span>
// //           </div>
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
// //             {WEEKLY_STATS.map((s) => <StatCard key={s.label} {...s} />)}
// //           </div>
// //         </section>

// //         {/* ── PERFORMANCE MODULES ── */}
// //         <section className="animate-fade-in animation-delay-400">
// //           <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 28 }}>
// //             <h2 style={{ fontSize: "1.875rem", fontWeight: 800, color: "#111827" }}>Performance Modules</h2>
// //             <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9ca3af" }}>Core System Navigation</span>
// //           </div>
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //             {FEATURES.map((f) => (
// //               <FeatureCard key={f.path} {...f} onClick={() => navigate(f.path)} />
// //             ))}
// //           </div>
// //         </section>

// //         {/* ── TODAY + PLAN ── */}
// //         <section className="animate-fade-in animation-delay-600" style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: 32 }}>

// //           {/* Today's Schedule */}
// //           <div>
// //             <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 24 }}>
// //               <h2 style={{ fontSize: "1.875rem", fontWeight: 800, color: "#111827" }}>Today</h2>
// //               <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9ca3af" }}>Schedule</span>
// //             </div>
// //             <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid #e5e7eb", borderRadius: 24, padding: "8px 24px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
// //               {TODAYS_SESSIONS.map((s, i) => (
// //                 <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 0", borderBottom: i < TODAYS_SESSIONS.length - 1 ? "1px solid #f3f4f6" : "none" }}>
// //                   <div style={{ width: 36, height: 36, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: s.done ? "#d1fae5" : "#eef2ff", color: s.done ? "#059669" : "#6366f1" }}>
// //                     {s.done ? <CheckCircle size={18} /> : <Clock size={18} />}
// //                   </div>
// //                   <div style={{ flex: 1, minWidth: 0 }}>
// //                     <p style={{ fontSize: "0.875rem", fontWeight: 700, color: s.done ? "#9ca3af" : "#111827", textDecoration: s.done ? "line-through" : "none", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.label}</p>
// //                     <p style={{ fontSize: "0.75rem", color: "#9ca3af" }}>{s.time}</p>
// //                   </div>
// //                   <span className={`text-xs font-bold tracking-wide uppercase px-2 py-1 rounded-lg ${SESSION_TYPE_STYLES[s.type]}`}>{s.type}</span>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Training Programme */}
// //           <div>
// //             <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 24 }}>
// //               <h2 style={{ fontSize: "1.875rem", fontWeight: 800, color: "#111827" }}>Training Programme</h2>
// //               <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9ca3af" }}>Active Protocol</span>
// //             </div>

// //             {!plan ? (
// //               <div className="group relative" style={{ height: "calc(100% - 64px)" }}>
// //                 <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl opacity-0 group-hover:opacity-10 blur-2xl transition-all duration-500" />
// //                 <div style={{ position: "relative", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid #e5e7eb", borderRadius: 24, padding: 40, boxShadow: "0 4px 24px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 24, minHeight: 280 }}>
// //                   <div style={{ width: 64, height: 64, borderRadius: "50%", border: "2px dashed #a5b4fc", display: "flex", alignItems: "center", justifyContent: "center", color: "#6366f1" }}>
// //                     <Plus size={32} />
// //                   </div>
// //                   <div>
// //                     <h3 style={{ fontSize: "1.375rem", fontWeight: 700, color: "#111827", marginBottom: 8 }}>No Active Programme</h3>
// //                     <p style={{ color: "#6b7280", fontSize: "0.875rem", maxWidth: 320, lineHeight: 1.7 }}>
// //                       Your AI-generated adaptive training programme will be calibrated to your profile, goals, and current readiness state.
// //                     </p>
// //                   </div>
// //                   <button onClick={handleGeneratePlan} disabled={generating}
// //                     className="group/btn"
// //                     style={{ padding: "14px 36px", background: "linear-gradient(135deg, #2563eb, #6366f1, #7c3aed)", color: "white", borderRadius: 16, fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.04em", border: "none", cursor: generating ? "not-allowed" : "pointer", opacity: generating ? 0.6 : 1, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 4px 20px rgba(99,102,241,0.35)", transition: "all 0.2s ease" }}>
// //                     <Zap size={18} />
// //                     {generating ? "Calibrating Protocol…" : "Generate Weekly Programme"}
// //                   </button>
// //                 </div>
// //               </div>
// //             ) : (
// //               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
// //                 {/* Status */}
// //                 <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid #e5e7eb", borderTop: "2px solid #34d399", borderRadius: 24, padding: 24, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
// //                   <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 20 }}>Programme Status</p>
// //                   <div>
// //                     <p style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", marginBottom: 4 }}>Plan ID</p>
// //                     <p style={{ fontSize: "0.75rem", color: "#6b7280", fontFamily: "monospace", wordBreak: "break-all" }}>{plan._id}</p>
// //                   </div>
// //                   <div style={{ borderTop: "1px solid #f3f4f6", marginTop: 16, paddingTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
// //                     <p style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af" }}>Status</p>
// //                     <span style={{ display: "flex", alignItems: "center", gap: 6, background: "#d1fae5", border: "1px solid #a7f3d0", color: "#059669", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 8 }}>
// //                       <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
// //                       {plan.status || "Active"}
// //                     </span>
// //                   </div>
// //                 </div>
// //                 {/* Load */}
// //                 <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid #e5e7eb", borderTop: "2px solid #3b82f6", borderRadius: 24, padding: 24, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
// //                   <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 20 }}>Load Parameters</p>
// //                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
// //                     <div>
// //                       <p style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", marginBottom: 6 }}>Intensity</p>
// //                       <p style={{ fontSize: "2.25rem", fontWeight: 800, color: "#111827", lineHeight: 1 }}>{plan.baseIntensityLevel ?? "—"}</p>
// //                     </div>
// //                     <div>
// //                       <p style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", marginBottom: 6 }}>Volume</p>
// //                       <p style={{ fontSize: "2.25rem", fontWeight: 800, color: "#111827", lineHeight: 1 }}>{plan.baseVolumeLevel ?? "—"}</p>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 {/* Architecture */}
// //                 <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid #e5e7eb", borderTop: "2px solid #6366f1", borderRadius: 24, padding: 24, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
// //                   <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 20 }}>Weekly Architecture</p>
// //                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
// //                     <div>
// //                       <p style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", marginBottom: 6 }}>Planned Days</p>
// //                       <p style={{ fontSize: "2.25rem", fontWeight: 800, color: "#111827", lineHeight: 1 }}>{plan.plannedWorkoutDays ?? "—"}</p>
// //                     </div>
// //                     <div>
// //                       <p style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", marginBottom: 6 }}>Structure Days</p>
// //                       <p style={{ fontSize: "2.25rem", fontWeight: 800, color: "#111827", lineHeight: 1 }}>{plan.weeklyStructure?.length ?? 0}</p>
// //                     </div>
// //                   </div>
// //                   <div style={{ marginTop: 16, display: "flex", gap: 4 }}>
// //                     {Array.from({ length: 7 }).map((_, d) => (
// //                       <div key={d} style={{ flex: 1, height: 6, borderRadius: 999, background: d < (plan.plannedWorkoutDays ?? 0) ? "linear-gradient(90deg, #6366f1, #7c3aed)" : "#f3f4f6" }} />
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </section>

// //         {/* ── QUICK ACTIONS ── */}
// //         <section className="animate-fade-in animation-delay-800">
// //           <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 24 }}>
// //             <h2 style={{ fontSize: "1.875rem", fontWeight: 800, color: "#111827" }}>Quick Actions</h2>
// //             <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9ca3af" }}>Shortcuts</span>
// //           </div>
// //           <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
// //             {[
// //               { label: "Log Today's Session", icon: <Activity size={18} />, primary: true,  path: "/workout"   },
// //               { label: "Check Readiness",     icon: <Heart size={18} />,    primary: false, path: "/readiness" },
// //               { label: "View Nutrition Plan", icon: <Utensils size={18} />, primary: false, path: "/nutrition" },
// //               { label: "Weekly Schedule",     icon: <Calendar size={18} />, primary: false, path: "/workout"   },
// //               { label: "View APS Report",     icon: <Shield size={18} />,   primary: false, path: "/aps"       },
// //             ].map((a) => (
// //               <button key={a.label} onClick={() => navigate(a.path)}
// //                 style={a.primary ? {
// //                   padding: "14px 28px", background: "linear-gradient(135deg, #2563eb, #6366f1, #7c3aed)", color: "white",
// //                   borderRadius: 14, fontSize: "0.875rem", fontWeight: 700, border: "none", cursor: "pointer",
// //                   display: "flex", alignItems: "center", gap: 10, boxShadow: "0 4px 20px rgba(99,102,241,0.3)", transition: "all 0.2s ease",
// //                 } : {
// //                   padding: "14px 28px", background: "rgba(255,255,255,0.8)", backdropFilter: "blur(8px)",
// //                   border: "2px solid #c7d2fe", color: "#374151", borderRadius: 14, fontSize: "0.875rem",
// //                   fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, transition: "all 0.2s ease",
// //                 }}>
// //                 <span style={{ color: a.primary ? "white" : "#6366f1" }}>{a.icon}</span>
// //                 {a.label}
// //               </button>
// //             ))}
// //           </div>
// //         </section>

// //       </main>

// //       {/* ── FOOTER ── */}
// //       <footer style={{ position: "relative", background: "#0f172a", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "48px 48px", marginTop: 32 }}>
// //         <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
// //           <div>
// //             <h2 style={{ fontSize: "1.375rem", fontWeight: 800, letterSpacing: "-0.01em" }}>
// //               <span style={{ color: "white" }}>ELITE</span>
// //               <span style={{ background: "linear-gradient(135deg, #60a5fa, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ATELIER</span>
// //             </h2>
// //             <p style={{ color: "#6b7280", fontSize: "0.8rem", marginTop: 4 }}>AI-powered performance engineering.</p>
// //           </div>
// //           <div style={{ display: "flex", gap: 32 }}>
// //             {["Training","Nutrition","Analytics","Support"].map(l => (
// //               <a key={l} href="#" style={{ color: "#6b7280", fontSize: "0.875rem", fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
// //                 onMouseOver={e => e.target.style.color = "#60a5fa"} onMouseOut={e => e.target.style.color = "#6b7280"}>
// //                 {l}
// //               </a>
// //             ))}
// //           </div>
// //           <p style={{ color: "#4b5563", fontSize: "0.8rem" }}>© 2026 Elite Performance Atelier. All rights reserved.</p>
// //         </div>
// //       </footer>

// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { planAPI } from "../api/axios";
// import { useAuth } from "../context/AuthContext";
// import BikeLoader from "../components/BikeLoader";
// import {
//   Zap, Activity, Utensils, BarChart2, Plus,
//   CheckCircle, Clock, TrendingUp, Flame, Heart,
//   Shield, Calendar, ChevronRight,
// } from "lucide-react";

// const FEATURES = [
//   { label: "Training",     title: "Workout Protocol",  description: "Adaptive weekly programming calibrated to your readiness and performance trajectory.", path: "/workout",   icon: <Zap size={22} />,      gradient: "linear-gradient(135deg,#3b82f6,#06b6d4)" },
//   { label: "Recovery",     title: "Readiness Index",   description: "Daily biometric assessment and recovery scoring for optimal training decisions.",        path: "/readiness", icon: <Heart size={22} />,    gradient: "linear-gradient(135deg,#10b981,#14b8a6)" },
//   { label: "Fuel",         title: "Nutrition Matrix",  description: "Precision macronutrient targets aligned with your training load and body composition goals.", path: "/nutrition", icon: <Utensils size={22} />, gradient: "linear-gradient(135deg,#f59e0b,#ef4444)" },
//   { label: "Intelligence", title: "APS Analytics",     description: "Athlete Performance Score — composite readiness, output, and adaptation metric.",        path: "/aps",       icon: <BarChart2 size={22} />, gradient: "linear-gradient(135deg,#8b5cf6,#6366f1)" },
// ];

// const TODAYS_SESSIONS = [
//   { time: "06:30 AM", label: "Morning Mobility",        type: "Recovery", done: true  },
//   { time: "09:00 AM", label: "Upper Strength — Push A", type: "Training", done: true  },
//   { time: "01:00 PM", label: "Nutrition Check-in",      type: "Fuel",     done: false },
//   { time: "05:00 PM", label: "Evening Run — Zone 2",    type: "Cardio",   done: false },
// ];

// const WEEKLY_STATS = [
//   { label: "Sessions Completed", value: "5",     unit: "/ 6",    icon: <CheckCircle size={18} />, gradient: "linear-gradient(135deg,#10b981,#14b8a6)" },
//   { label: "Avg Recovery",       value: "87",    unit: "%",      icon: <Activity size={18} />,    gradient: "linear-gradient(135deg,#3b82f6,#06b6d4)" },
//   { label: "Total Volume",       value: "4.2",   unit: "k reps", icon: <TrendingUp size={18} />,  gradient: "linear-gradient(135deg,#8b5cf6,#6366f1)" },
//   { label: "Calories Burned",    value: "3,140", unit: "kcal",   icon: <Flame size={18} />,       gradient: "linear-gradient(135deg,#f59e0b,#ef4444)" },
// ];

// const SESSION_BADGE = {
//   Training: { bg: "#eff6ff", color: "#3b82f6", border: "#bfdbfe" },
//   Recovery: { bg: "#f0fdf4", color: "#10b981", border: "#bbf7d0" },
//   Fuel:     { bg: "#fff7ed", color: "#f59e0b", border: "#fed7aa" },
//   Cardio:   { bg: "#f5f3ff", color: "#8b5cf6", border: "#ddd6fe" },
// };

// /* ── card wrapper ── */
// const glass = {
//   background: "rgba(255,255,255,0.85)",
//   backdropFilter: "blur(16px)",
//   WebkitBackdropFilter: "blur(16px)",
//   border: "1px solid rgba(255,255,255,0.9)",
//   boxShadow: "0 4px 24px rgba(99,102,241,0.08), 0 1px 4px rgba(0,0,0,0.04)",
// };

// export default function Dashboard() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [plan, setPlan]           = useState(null);
//   const [loading, setLoading]     = useState(true);
//   const [generating, setGen]      = useState(false);

//   const fetchPlan = async () => {
//     try {
//       setLoading(true);
//       const res = await planAPI.getActive(user.id);
//       setPlan(res.data?.plan || null);
//     } catch { setPlan(null); }
//     setLoading(false);
//   };

//   useEffect(() => { if (user?.id) fetchPlan(); }, [user?.id]);

//   const handleGeneratePlan = async () => {
//     try {
//       setGen(true);
//       await planAPI.generate(user.id);
//       await fetchPlan();
//     } catch (err) { alert(err.message || "Failed to generate plan"); }
//     setGen(false);
//   };

//   if (loading) return <BikeLoader />;

//   /* display name — prefer name, fall back to email prefix */
//   const displayName = user?.name || (user?.email ? user.email.split("@")[0] : "Athlete");

//   return (
//     <div style={{ fontFamily: "'Outfit', sans-serif", minHeight: "100vh", position: "relative" }}>

//       {/* ── Blobs ── */}
//       <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
//         <div className="animate-blob"                style={{ position:"absolute", top:"-8rem",  right:"-8rem",  width:"28rem", height:"28rem", borderRadius:"50%", background:"#93c5fd", mixBlendMode:"multiply", filter:"blur(72px)", opacity:0.4 }} />
//         <div className="animate-blob animation-delay-2000" style={{ position:"absolute", bottom:"-8rem", left:"-8rem",  width:"28rem", height:"28rem", borderRadius:"50%", background:"#c4b5fd", mixBlendMode:"multiply", filter:"blur(72px)", opacity:0.4 }} />
//         <div className="animate-blob animation-delay-4000" style={{ position:"absolute", top:"45%",  left:"45%",  width:"22rem", height:"22rem", borderRadius:"50%", background:"#a5b4fc", mixBlendMode:"multiply", filter:"blur(60px)", opacity:0.3, transform:"translate(-50%,-50%)" }} />
//       </div>

//       {/* ── Page content ── */}
//       <div style={{ position:"relative", zIndex:1, maxWidth:1200, margin:"0 auto", padding:"52px 48px 96px" }}>

//         {/* ══ HERO ══ */}
//         <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:32, marginBottom:64, flexWrap:"wrap" }}>

//           {/* Left */}
//           <div style={{ flex:"1 1 420px" }}>
//             {/* Badge */}
//             <div style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"6px 18px", marginBottom:24, fontSize:11, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", background:"rgba(99,102,241,0.07)", border:"1.5px solid rgba(99,102,241,0.18)", borderRadius:999 }}>
//               <span style={{ color:"#6366f1" }}>⚡</span>
//               <span style={{ background:"linear-gradient(135deg,#2563eb,#6366f1)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//                 Elite Performance Atelier — AI System
//               </span>
//             </div>

//             {/* Heading */}
//             <h1 style={{ fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:800, lineHeight:1.12, marginBottom:16 }}>
//               <span style={{ background:"linear-gradient(135deg,#0f172a,#1e3a8a)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", display:"block" }}>
//                 Welcome back,
//               </span>
//               <span style={{ background:"linear-gradient(135deg,#2563eb,#6366f1,#7c3aed)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", display:"block" }}>
//                 {displayName}.
//               </span>
//             </h1>

//             <p style={{ fontSize:"0.975rem", color:"#64748b", lineHeight:1.75, maxWidth:460 }}>
//               Your adaptive intelligence platform is active. Every variable calibrated.{" "}
//               <strong style={{ fontWeight:600, color:"#2563eb" }}>Every session deliberate.</strong>
//             </p>
//           </div>

//           {/* Right — status + APS */}
//           <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:14 }}>
//             <div style={{ display:"flex", alignItems:"center", gap:8, ...glass, borderRadius:14, padding:"10px 18px" }}>
//               <span style={{ width:8, height:8, borderRadius:"50%", background:"#10b981", display:"inline-block", boxShadow:"0 0 0 3px rgba(16,185,129,0.2)" }} />
//               <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#059669" }}>System Active</span>
//             </div>
//             <div style={{ ...glass, borderRadius:20, padding:"24px 28px", minWidth:188 }}>
//               <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#94a3b8", marginBottom:6 }}>APS Score</p>
//               <p style={{ fontSize:"2.25rem", fontWeight:800, color:"#0f172a", lineHeight:1 }}>
//                 94 <span style={{ fontSize:"0.85rem", fontWeight:400, color:"#94a3b8" }}>pts</span>
//               </p>
//               <div style={{ marginTop:12, height:5, background:"#e2e8f0", borderRadius:999 }}>
//                 <div style={{ height:"100%", width:"94%", background:"linear-gradient(90deg,#3b82f6,#6366f1)", borderRadius:999 }} />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ══ THIS WEEK ══ */}
//         <div style={{ marginBottom:56 }}>
//           <div style={{ display:"flex", alignItems:"baseline", gap:14, marginBottom:24 }}>
//             <h2 style={{ fontSize:"1.5rem", fontWeight:800, color:"#0f172a" }}>This Week</h2>
//             <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#94a3b8" }}>Performance Summary</span>
//           </div>
//           <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
//             {WEEKLY_STATS.map(({ label, value, unit, icon, gradient }) => (
//               <div key={label} style={{ ...glass, borderRadius:20, padding:"20px 22px" }}>
//                 <div style={{ width:36, height:36, borderRadius:10, background:gradient, display:"flex", alignItems:"center", justifyContent:"center", color:"white", marginBottom:14, boxShadow:"0 4px 12px rgba(0,0,0,0.12)" }}>
//                   {icon}
//                 </div>
//                 <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#94a3b8", marginBottom:6 }}>{label}</p>
//                 <p style={{ fontSize:"1.75rem", fontWeight:800, color:"#0f172a", lineHeight:1 }}>
//                   {value}<span style={{ fontSize:"0.8rem", fontWeight:400, color:"#94a3b8", marginLeft:4 }}>{unit}</span>
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ══ PERFORMANCE MODULES ══ */}
//         <div style={{ marginBottom:56 }}>
//           <div style={{ display:"flex", alignItems:"baseline", gap:14, marginBottom:24 }}>
//             <h2 style={{ fontSize:"1.5rem", fontWeight:800, color:"#0f172a" }}>Performance Modules</h2>
//             <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#94a3b8" }}>Core System Navigation</span>
//           </div>
//           <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
//             {FEATURES.map(({ label, title, description, path, icon, gradient }) => (
//               <div key={path} onClick={() => navigate(path)}
//                 style={{ ...glass, borderRadius:20, padding:24, cursor:"pointer", transition:"transform 0.2s, box-shadow 0.2s" }}
//                 onMouseOver={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 12px 32px rgba(99,102,241,0.15)"; }}
//                 onMouseOut={e  => { e.currentTarget.style.transform="translateY(0)";    e.currentTarget.style.boxShadow=glass.boxShadow; }}>
//                 <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:16 }}>
//                   <div style={{ width:48, height:48, borderRadius:14, background:gradient, display:"flex", alignItems:"center", justifyContent:"center", color:"white", boxShadow:"0 4px 14px rgba(0,0,0,0.15)" }}>
//                     {icon}
//                   </div>
//                   <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#6366f1", background:"#eef2ff", border:"1px solid #e0e7ff", padding:"3px 10px", borderRadius:999 }}>
//                     {label}
//                   </span>
//                 </div>
//                 <h3 style={{ fontSize:"1rem", fontWeight:700, color:"#0f172a", marginBottom:8 }}>{title}</h3>
//                 <p style={{ fontSize:"0.8rem", color:"#64748b", lineHeight:1.65, marginBottom:16 }}>{description}</p>
//                 <div style={{ display:"flex", alignItems:"center", gap:4, fontSize:"0.8rem", fontWeight:600, color:"#3b82f6" }}>
//                   Enter Module <ChevronRight size={14} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ══ TODAY + PLAN ══ */}
//         <div style={{ display:"grid", gridTemplateColumns:"2fr 3fr", gap:24, marginBottom:56 }}>

//           {/* Today */}
//           <div>
//             <div style={{ display:"flex", alignItems:"baseline", gap:14, marginBottom:20 }}>
//               <h2 style={{ fontSize:"1.5rem", fontWeight:800, color:"#0f172a" }}>Today</h2>
//               <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#94a3b8" }}>Schedule</span>
//             </div>
//             <div style={{ ...glass, borderRadius:20, overflow:"hidden" }}>
//               {TODAYS_SESSIONS.map((s, i) => {
//                 const badge = SESSION_BADGE[s.type] || SESSION_BADGE.Cardio;
//                 return (
//                   <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 20px", borderBottom: i < TODAYS_SESSIONS.length-1 ? "1px solid rgba(226,232,240,0.8)" : "none" }}>
//                     <div style={{ width:34, height:34, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, background: s.done ? "#f0fdf4" : "#eef2ff", color: s.done ? "#10b981" : "#6366f1" }}>
//                       {s.done ? <CheckCircle size={17} /> : <Clock size={17} />}
//                     </div>
//                     <div style={{ flex:1, minWidth:0 }}>
//                       <p style={{ fontSize:"0.85rem", fontWeight:700, color: s.done ? "#94a3b8" : "#0f172a", textDecoration: s.done ? "line-through" : "none", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{s.label}</p>
//                       <p style={{ fontSize:"0.72rem", color:"#94a3b8", marginTop:1 }}>{s.time}</p>
//                     </div>
//                     <span style={{ fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", padding:"3px 9px", borderRadius:8, background:badge.bg, color:badge.color, border:`1px solid ${badge.border}`, flexShrink:0 }}>
//                       {s.type}
//                     </span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Plan */}
//           <div>
//             <div style={{ display:"flex", alignItems:"baseline", gap:14, marginBottom:20 }}>
//               <h2 style={{ fontSize:"1.5rem", fontWeight:800, color:"#0f172a" }}>Training Programme</h2>
//               <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#94a3b8" }}>Active Protocol</span>
//             </div>

//             {!plan ? (
//               <div style={{ ...glass, borderRadius:20, padding:48, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", gap:20, minHeight:240 }}>
//                 <div style={{ width:60, height:60, borderRadius:"50%", border:"2px dashed #c7d2fe", display:"flex", alignItems:"center", justifyContent:"center", color:"#6366f1" }}>
//                   <Plus size={28} />
//                 </div>
//                 <div>
//                   <h3 style={{ fontSize:"1.2rem", fontWeight:700, color:"#0f172a", marginBottom:8 }}>No Active Programme</h3>
//                   <p style={{ fontSize:"0.85rem", color:"#64748b", maxWidth:300, lineHeight:1.7 }}>
//                     Your AI-generated adaptive training programme will be calibrated to your profile, goals, and current readiness.
//                   </p>
//                 </div>
//                 <button onClick={handleGeneratePlan} disabled={generating}
//                   style={{ padding:"13px 32px", background:"linear-gradient(135deg,#2563eb,#6366f1,#7c3aed)", color:"white", borderRadius:14, fontSize:"0.85rem", fontWeight:700, letterSpacing:"0.04em", border:"none", cursor: generating?"not-allowed":"pointer", opacity: generating?0.6:1, display:"flex", alignItems:"center", gap:8, boxShadow:"0 4px 20px rgba(99,102,241,0.3)", transition:"all 0.2s" }}>
//                   <Zap size={16} />
//                   {generating ? "Calibrating…" : "Generate Weekly Programme"}
//                 </button>
//               </div>
//             ) : (
//               <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>
//                 {/* Status */}
//                 <div style={{ ...glass, borderRadius:20, padding:22, borderTop:"2px solid #10b981" }}>
//                   <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#94a3b8", marginBottom:18 }}>Programme Status</p>
//                   <p style={{ fontSize:10, fontWeight:700, color:"#94a3b8", marginBottom:4 }}>Plan ID</p>
//                   <p style={{ fontSize:"0.7rem", color:"#64748b", fontFamily:"monospace", wordBreak:"break-all", marginBottom:16 }}>{plan._id}</p>
//                   <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", borderTop:"1px solid #f1f5f9", paddingTop:14 }}>
//                     <p style={{ fontSize:10, fontWeight:700, color:"#94a3b8" }}>Status</p>
//                     <span style={{ display:"flex", alignItems:"center", gap:5, background:"#f0fdf4", border:"1px solid #bbf7d0", color:"#059669", fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:8, textTransform:"uppercase", letterSpacing:"0.06em" }}>
//                       <span style={{ width:5, height:5, borderRadius:"50%", background:"#10b981" }} />
//                       {plan.status || "Active"}
//                     </span>
//                   </div>
//                 </div>
//                 {/* Load */}
//                 <div style={{ ...glass, borderRadius:20, padding:22, borderTop:"2px solid #3b82f6" }}>
//                   <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#94a3b8", marginBottom:18 }}>Load Parameters</p>
//                   <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
//                     {[["Intensity", plan.baseIntensityLevel],["Volume", plan.baseVolumeLevel]].map(([lbl,val]) => (
//                       <div key={lbl}>
//                         <p style={{ fontSize:10, fontWeight:700, color:"#94a3b8", marginBottom:6 }}>{lbl}</p>
//                         <p style={{ fontSize:"1.75rem", fontWeight:800, color:"#0f172a", lineHeight:1 }}>{val ?? "—"}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 {/* Architecture */}
//                 <div style={{ ...glass, borderRadius:20, padding:22, borderTop:"2px solid #8b5cf6" }}>
//                   <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#94a3b8", marginBottom:18 }}>Weekly Architecture</p>
//                   <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
//                     {[["Planned Days", plan.plannedWorkoutDays],["Structure Days", plan.weeklyStructure?.length ?? 0]].map(([lbl,val]) => (
//                       <div key={lbl}>
//                         <p style={{ fontSize:10, fontWeight:700, color:"#94a3b8", marginBottom:6 }}>{lbl}</p>
//                         <p style={{ fontSize:"1.75rem", fontWeight:800, color:"#0f172a", lineHeight:1 }}>{val ?? "—"}</p>
//                       </div>
//                     ))}
//                   </div>
//                   <div style={{ display:"flex", gap:4 }}>
//                     {Array.from({length:7}).map((_,d) => (
//                       <div key={d} style={{ flex:1, height:5, borderRadius:999, background: d<(plan.plannedWorkoutDays??0) ? "linear-gradient(90deg,#8b5cf6,#6366f1)" : "#e2e8f0" }} />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ══ QUICK ACTIONS ══ */}
//         <div>
//           <div style={{ display:"flex", alignItems:"baseline", gap:14, marginBottom:20 }}>
//             <h2 style={{ fontSize:"1.5rem", fontWeight:800, color:"#0f172a" }}>Quick Actions</h2>
//             <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#94a3b8" }}>Shortcuts</span>
//           </div>
//           <div style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
//             {[
//               { label:"Log Today's Session", icon:<Activity size={16} />, primary:true,  path:"/workout"   },
//               { label:"Check Readiness",     icon:<Heart size={16} />,    primary:false, path:"/readiness" },
//               { label:"View Nutrition Plan", icon:<Utensils size={16} />, primary:false, path:"/nutrition" },
//               { label:"Weekly Schedule",     icon:<Calendar size={16} />, primary:false, path:"/workout"   },
//               { label:"View APS Report",     icon:<Shield size={16} />,   primary:false, path:"/aps"       },
//             ].map((a) => (
//               <button key={a.label} onClick={() => navigate(a.path)}
//                 style={a.primary ? {
//                   padding:"12px 24px", background:"linear-gradient(135deg,#2563eb,#6366f1,#7c3aed)", color:"white",
//                   borderRadius:12, fontSize:"0.85rem", fontWeight:700, border:"none", cursor:"pointer",
//                   display:"flex", alignItems:"center", gap:8, boxShadow:"0 4px 16px rgba(99,102,241,0.28)", transition:"all 0.2s",
//                 } : {
//                   padding:"12px 24px", ...glass, color:"#374151",
//                   borderRadius:12, fontSize:"0.85rem", fontWeight:700, cursor:"pointer",
//                   display:"flex", alignItems:"center", gap:8, transition:"all 0.2s",
//                 }}
//                 onMouseOver={e => e.currentTarget.style.transform="translateY(-2px)"}
//                 onMouseOut={e  => e.currentTarget.style.transform="translateY(0)"}>
//                 <span style={{ color: a.primary ? "white" : "#6366f1" }}>{a.icon}</span>
//                 {a.label}
//               </button>
//             ))}
//           </div>
//         </div>

//       </div>

//       {/* ── Footer ── */}
//       <footer style={{ position:"relative", zIndex:1, background:"#0f172a", borderTop:"1px solid rgba(255,255,255,0.05)", padding:"40px 48px" }}>
//         <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:20 }}>
//           <div>
//             <span style={{ fontSize:"1.2rem", fontWeight:800, color:"white" }}>EVOLVE</span>
//             <span style={{ fontSize:"1.2rem", fontWeight:800, background:"linear-gradient(135deg,#60a5fa,#818cf8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>360</span>
//             <p style={{ fontSize:"0.75rem", color:"#475569", marginTop:4 }}>AI-powered performance engineering.</p>
//           </div>
//           <div style={{ display:"flex", gap:28 }}>
//             {["Training","Nutrition","Analytics","Support"].map(l => (
//               <a key={l} href="#" style={{ color:"#475569", fontSize:"0.85rem", fontWeight:500, textDecoration:"none" }}
//                 onMouseOver={e => e.target.style.color="#60a5fa"} onMouseOut={e => e.target.style.color="#475569"}>{l}</a>
//             ))}
//           </div>
//           <p style={{ color:"#334155", fontSize:"0.75rem" }}>© 2026 Elite Performance Atelier. All rights reserved.</p>
//         </div>
//       </footer>

//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { planAPI } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import BikeLoader from "../components/BikeLoader";
import {
  Zap, Activity, Utensils, BarChart2, Plus,
  CheckCircle, Heart, Shield, Calendar,
  ChevronRight, TrendingUp,
} from "lucide-react";

/* ─────────────────────────────────────────────
   PERFORMANCE MODULES  (navigation only, no fake data)
───────────────────────────────────────────── */
const FEATURES = [
  { label: "Training",     title: "Workout Protocol",  description: "Adaptive weekly programming calibrated to your readiness and performance trajectory.", path: "/workout",   icon: <Zap size={22} />,      gradient: "linear-gradient(135deg,#3b82f6,#06b6d4)" },
  { label: "Recovery",     title: "Readiness Index",   description: "Daily biometric assessment and recovery scoring for optimal training decisions.",        path: "/readiness", icon: <Heart size={22} />,    gradient: "linear-gradient(135deg,#10b981,#14b8a6)" },
  { label: "Fuel",         title: "Nutrition Matrix",  description: "Precision macronutrient targets aligned with your training load and body composition goals.", path: "/nutrition", icon: <Utensils size={22} />, gradient: "linear-gradient(135deg,#f59e0b,#ef4444)" },
  { label: "Intelligence", title: "APS Analytics",     description: "Athlete Performance Score — composite readiness, output, and adaptation metric.",        path: "/aps",       icon: <BarChart2 size={22} />, gradient: "linear-gradient(135deg,#8b5cf6,#6366f1)" },
];

/* ─────────────────────────────────────────────
   PHYSIOTHERAPY MODULES
───────────────────────────────────────────── */
const PHYSIO_FEATURES = [
  {
    label: "Rehab",
    title: "Rehab Tracker",
    description: "Log and monitor your prescribed rehabilitation exercises. Track RRS recovery scores and adherence over time.",
    path: "/rehab",
    sub: "RRS · Recovery Score",
    gradient: "linear-gradient(135deg,#059669,#10b981)",
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
      </svg>
    ),
  },
  {
    label: "Assessment",
    title: "Functional Test",
    description: "AI-benchmarked functional movement assessments. Compare your performance against clinical norms.",
    path: "/functional-tests",
    sub: "AI Benchmark · Norms",
    gradient: "linear-gradient(135deg,#0891b2,#06b6d4)",
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
  },
  {
    label: "Exercise",
    title: "Training Analysis",
    description: "Log therapeutic exercise sessions and monitor pain response, adherence, and rehabilitation progress.",
    path: "/training-analysis",
    sub: "AI Insights · Performance Score",
    gradient: "linear-gradient(135deg,#7c3aed,#6366f1)",
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18M9 17V9m4 8V5m4 12v-6"/>
      </svg>
    ),
  },
  {
    label: "Pain",
    title: "Pain Analysis",
    description: "AI-powered clinical pain evaluation with risk scoring, protective mode flags, and Gemini insights.",
    path: "/pain-analysis",
    sub: "AI Risk Detection · Recovery Insights",
    gradient: "linear-gradient(135deg,#be123c,#f43f5e)",
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8v4m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"/>
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────
   GLASS CARD STYLE
───────────────────────────────────────────── */
const glass = {
  background: "rgba(255,255,255,0.85)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.9)",
  boxShadow: "0 4px 24px rgba(99,102,241,0.08), 0 1px 4px rgba(0,0,0,0.04)",
};

/* ─────────────────────────────────────────────
   DASHBOARD
───────────────────────────────────────────── */
export default function Dashboard() {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const [plan,      setPlan]   = useState(null);
  const [loading,   setLoading] = useState(true);
  const [generating, setGen]   = useState(false);

  const fetchPlan = async () => {
    try {
      setLoading(true);
      const res = await planAPI.getActive(user.id);
      setPlan(res.data?.plan || null);
    } catch { setPlan(null); }
    setLoading(false);
  };

  useEffect(() => { if (user?.id) fetchPlan(); }, [user?.id]);

  const handleGeneratePlan = async () => {
    try {
      setGen(true);
      await planAPI.generate(user.id);
      await fetchPlan();
    } catch (err) { alert(err.message || "Failed to generate plan"); }
    setGen(false);
  };

  if (loading) return <BikeLoader />;

  const displayName = user?.name || (user?.email ? user.email.split("@")[0] : "Athlete");

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", minHeight: "100vh", position: "relative" }}>

      {/* ── Blobs ── */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div className="animate-blob" style={{ position:"absolute", top:"-8rem", right:"-8rem", width:"28rem", height:"28rem", borderRadius:"50%", background:"#93c5fd", mixBlendMode:"multiply", filter:"blur(72px)", opacity:0.4 }} />
        <div className="animate-blob animation-delay-2000" style={{ position:"absolute", bottom:"-8rem", left:"-8rem", width:"28rem", height:"28rem", borderRadius:"50%", background:"#c4b5fd", mixBlendMode:"multiply", filter:"blur(72px)", opacity:0.4 }} />
        <div className="animate-blob animation-delay-4000" style={{ position:"absolute", top:"45%", left:"45%", width:"22rem", height:"22rem", borderRadius:"50%", background:"#a5b4fc", mixBlendMode:"multiply", filter:"blur(60px)", opacity:0.3, transform:"translate(-50%,-50%)" }} />
      </div>

      {/* ── Page content ── */}
      <div style={{ position:"relative", zIndex:1, maxWidth:1200, margin:"0 auto", padding:"52px 48px 96px" }}>

        {/* ══ HERO ══ */}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:32, marginBottom:64, flexWrap:"wrap" }}>
          <div style={{ flex:"1 1 420px" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"6px 18px", marginBottom:24, fontSize:11, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", background:"rgba(99,102,241,0.07)", border:"1.5px solid rgba(99,102,241,0.18)", borderRadius:999 }}>
              <span style={{ color:"#6366f1" }}>⚡</span>
              <span style={{ background:"linear-gradient(135deg,#2563eb,#6366f1)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                Elite Performance Atelier — AI System
              </span>
            </div>
            <h1 style={{ fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:800, lineHeight:1.12, marginBottom:16 }}>
              <span style={{ background:"linear-gradient(135deg,#0f172a,#1e3a8a)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", display:"block" }}>
                Welcome back,
              </span>
              <span style={{ background:"linear-gradient(135deg,#2563eb,#6366f1,#7c3aed)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", display:"block" }}>
                {displayName}.
              </span>
            </h1>
            <p style={{ fontSize:"0.975rem", color:"#64748b", lineHeight:1.75, maxWidth:460 }}>
              Your adaptive intelligence platform is active. Every variable calibrated.{" "}
              <strong style={{ fontWeight:600, color:"#2563eb" }}>Every session deliberate.</strong>
            </p>
          </div>

          {/* Status pill only — no fake APS number */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:14 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, ...glass, borderRadius:14, padding:"10px 18px" }}>
              <span style={{ width:8, height:8, borderRadius:"50%", background:"#10b981", display:"inline-block", boxShadow:"0 0 0 3px rgba(16,185,129,0.2)" }} />
              <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#059669" }}>System Active</span>
            </div>
            <div style={{ ...glass, borderRadius:20, padding:"18px 24px", minWidth:180, textAlign:"center" }}>
              <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#94a3b8", marginBottom:8 }}>
                APS Score
              </p>
              <p style={{ fontSize:13, color:"#64748b", lineHeight:1.6 }}>
                Log a workout to<br/>generate your score.
              </p>
              <button onClick={() => navigate("/aps")} style={{
                marginTop:10, padding:"7px 16px", borderRadius:10,
                background:"linear-gradient(135deg,#2563eb,#6366f1)",
                color:"white", border:"none", cursor:"pointer",
                fontSize:11, fontWeight:700, letterSpacing:"0.06em",
              }}>
                Go to APS →
              </button>
            </div>
          </div>
        </div>

        {/* ══ PERFORMANCE MODULES ══ */}
        <div style={{ marginBottom:56 }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:14, marginBottom:24 }}>
            <h2 style={{ fontSize:"1.5rem", fontWeight:800, color:"#0f172a" }}>Performance Modules</h2>
            <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#94a3b8" }}>Core System Navigation</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
            {FEATURES.map(({ label, title, description, path, icon, gradient }) => (
              <div key={path} onClick={() => navigate(path)}
                style={{ ...glass, borderRadius:20, padding:24, cursor:"pointer", transition:"transform 0.2s, box-shadow 0.2s" }}
                onMouseOver={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 12px 32px rgba(99,102,241,0.15)"; }}
                onMouseOut={e  => { e.currentTarget.style.transform="translateY(0)";    e.currentTarget.style.boxShadow=glass.boxShadow; }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:16 }}>
                  <div style={{ width:48, height:48, borderRadius:14, background:gradient, display:"flex", alignItems:"center", justifyContent:"center", color:"white", boxShadow:"0 4px 14px rgba(0,0,0,0.15)" }}>
                    {icon}
                  </div>
                  <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#6366f1", background:"#eef2ff", border:"1px solid #e0e7ff", padding:"3px 10px", borderRadius:999 }}>
                    {label}
                  </span>
                </div>
                <h3 style={{ fontSize:"1rem", fontWeight:700, color:"#0f172a", marginBottom:8 }}>{title}</h3>
                <p style={{ fontSize:"0.8rem", color:"#64748b", lineHeight:1.65, marginBottom:16 }}>{description}</p>
                <div style={{ display:"flex", alignItems:"center", gap:4, fontSize:"0.8rem", fontWeight:600, color:"#3b82f6" }}>
                  Enter Module <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ TRAINING PROGRAMME ══ */}
        <div style={{ marginBottom:56 }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:14, marginBottom:20 }}>
            <h2 style={{ fontSize:"1.5rem", fontWeight:800, color:"#0f172a" }}>Training Programme</h2>
            <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#94a3b8" }}>Active Protocol</span>
          </div>

          {!plan ? (
            <div style={{ ...glass, borderRadius:20, padding:48, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", gap:20, minHeight:200 }}>
              <div style={{ width:60, height:60, borderRadius:"50%", border:"2px dashed #c7d2fe", display:"flex", alignItems:"center", justifyContent:"center", color:"#6366f1" }}>
                <Plus size={28} />
              </div>
              <div>
                <h3 style={{ fontSize:"1.2rem", fontWeight:700, color:"#0f172a", marginBottom:8 }}>No Active Programme</h3>
                <p style={{ fontSize:"0.85rem", color:"#64748b", maxWidth:320, lineHeight:1.7 }}>
                  Your AI-generated adaptive training programme will be calibrated to your profile, goals, and current readiness.
                </p>
              </div>
              <button onClick={handleGeneratePlan} disabled={generating}
                style={{ padding:"13px 32px", background:"linear-gradient(135deg,#2563eb,#6366f1,#7c3aed)", color:"white", borderRadius:14, fontSize:"0.85rem", fontWeight:700, letterSpacing:"0.04em", border:"none", cursor: generating?"not-allowed":"pointer", opacity: generating?0.6:1, display:"flex", alignItems:"center", gap:8, boxShadow:"0 4px 20px rgba(99,102,241,0.3)" }}>
                <Zap size={16} />
                {generating ? "Calibrating…" : "Generate Weekly Programme"}
              </button>
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>
              <div style={{ ...glass, borderRadius:20, padding:22, borderTop:"2px solid #10b981" }}>
                <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#94a3b8", marginBottom:18 }}>Programme Status</p>
                <p style={{ fontSize:10, fontWeight:700, color:"#94a3b8", marginBottom:4 }}>Plan ID</p>
                <p style={{ fontSize:"0.7rem", color:"#64748b", fontFamily:"monospace", wordBreak:"break-all", marginBottom:16 }}>{plan._id}</p>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", borderTop:"1px solid #f1f5f9", paddingTop:14 }}>
                  <p style={{ fontSize:10, fontWeight:700, color:"#94a3b8" }}>Status</p>
                  <span style={{ display:"flex", alignItems:"center", gap:5, background:"#f0fdf4", border:"1px solid #bbf7d0", color:"#059669", fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:8, textTransform:"uppercase", letterSpacing:"0.06em" }}>
                    <span style={{ width:5, height:5, borderRadius:"50%", background:"#10b981" }} />
                    {plan.status || "Active"}
                  </span>
                </div>
              </div>
              <div style={{ ...glass, borderRadius:20, padding:22, borderTop:"2px solid #3b82f6" }}>
                <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#94a3b8", marginBottom:18 }}>Load Parameters</p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  {[["Intensity", plan.baseIntensityLevel],["Volume", plan.baseVolumeLevel]].map(([lbl,val]) => (
                    <div key={lbl}>
                      <p style={{ fontSize:10, fontWeight:700, color:"#94a3b8", marginBottom:6 }}>{lbl}</p>
                      <p style={{ fontSize:"1.75rem", fontWeight:800, color:"#0f172a", lineHeight:1, textTransform:"capitalize" }}>{val ?? "—"}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ ...glass, borderRadius:20, padding:22, borderTop:"2px solid #8b5cf6" }}>
                <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#94a3b8", marginBottom:18 }}>Weekly Architecture</p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
                  {[["Planned Days", plan.plannedWorkoutDays],["Structure Days", plan.weeklyStructure?.length ?? 0]].map(([lbl,val]) => (
                    <div key={lbl}>
                      <p style={{ fontSize:10, fontWeight:700, color:"#94a3b8", marginBottom:6 }}>{lbl}</p>
                      <p style={{ fontSize:"1.75rem", fontWeight:800, color:"#0f172a", lineHeight:1 }}>{val ?? "—"}</p>
                    </div>
                  ))}
                </div>
                <div style={{ display:"flex", gap:4 }}>
                  {Array.from({length:7}).map((_,d) => (
                    <div key={d} style={{ flex:1, height:5, borderRadius:999, background: d < (plan.plannedWorkoutDays ?? 0) ? "linear-gradient(90deg,#8b5cf6,#6366f1)" : "#e2e8f0" }} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ══ PHYSIOTHERAPY MODULES ══ */}
        <div style={{ marginBottom:56 }}>
          {/* Section header with medical cross */}
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:24 }}>
            <h2 style={{ fontSize:"1.5rem", fontWeight:800, color:"#0f172a" }}>Physiotherapy</h2>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <div style={{ width:16, height:16, borderRadius:5, background:"linear-gradient(135deg,#10b981,#059669)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width={9} height={9} viewBox="0 0 24 24">
                  <path d="M12 2v20M2 12h20" stroke="white" strokeWidth={3.5} strokeLinecap="round"/>
                </svg>
              </div>
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#10b981" }}>Clinical Modules</span>
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
            {PHYSIO_FEATURES.map(({ label, title, description, path, sub, icon, gradient }) => (
              <div key={path} onClick={() => navigate(path)}
                style={{ ...glass, borderRadius:20, padding:24, cursor:"pointer",
                  transition:"transform 0.2s, box-shadow 0.2s",
                  borderTop:"2px solid rgba(16,185,129,0.25)" }}
                onMouseOver={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 12px 32px rgba(16,185,129,0.14)"; }}
                onMouseOut={e  => { e.currentTarget.style.transform="translateY(0)";    e.currentTarget.style.boxShadow=glass.boxShadow; }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:16 }}>
                  <div style={{ width:48, height:48, borderRadius:14, background:gradient, display:"flex", alignItems:"center", justifyContent:"center", color:"white", boxShadow:"0 4px 14px rgba(0,0,0,0.15)" }}>
                    {icon}
                  </div>
                  <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#10b981", background:"#ecfdf5", border:"1px solid #a7f3d0", padding:"3px 10px", borderRadius:999 }}>
                    {label}
                  </span>
                </div>
                <h3 style={{ fontSize:"1rem", fontWeight:700, color:"#0f172a", marginBottom:6 }}>{title}</h3>
                <p style={{ fontSize:"0.75rem", color:"#94a3b8", fontWeight:600, marginBottom:8, letterSpacing:"0.03em" }}>{sub}</p>
                <p style={{ fontSize:"0.8rem", color:"#64748b", lineHeight:1.65, marginBottom:16 }}>{description}</p>
                <div style={{ display:"flex", alignItems:"center", gap:4, fontSize:"0.8rem", fontWeight:600, color:"#10b981" }}>
                  Open Module <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ QUICK ACTIONS ══ */}
        <div>
          <div style={{ display:"flex", alignItems:"baseline", gap:14, marginBottom:20 }}>
            <h2 style={{ fontSize:"1.5rem", fontWeight:800, color:"#0f172a" }}>Quick Actions</h2>
            <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#94a3b8" }}>Shortcuts</span>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
            {[
              { label:"Log Today's Session",  icon:<Activity size={16} />,   primary:true,  path:"/workout"          },
              { label:"Check Readiness",      icon:<Heart size={16} />,      primary:false, path:"/readiness"        },
              { label:"View Nutrition Plan",  icon:<Utensils size={16} />,   primary:false, path:"/nutrition"        },
              { label:"Weekly Schedule",      icon:<Calendar size={16} />,   primary:false, path:"/workout"          },
              { label:"View APS Report",      icon:<Shield size={16} />,     primary:false, path:"/aps"              },
              /* ── 2 Rehab quick actions ── */
              {
                label:"Log Rehab Session",
                icon:(
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                ),
                primary:false,
                path:"/rehab",
                green: true,
              },
              {
                label:"Log Pain Report",
                icon:(
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 8v4m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"/>
                  </svg>
                ),
                primary:false,
                path:"/pain-analysis",
                rose: true,
              },
            ].map((a) => {
              const base = {
                padding:"12px 24px", borderRadius:12, fontSize:"0.85rem",
                fontWeight:700, cursor:"pointer", border:"none",
                display:"flex", alignItems:"center", gap:8, transition:"all 0.2s",
              };
              const style = a.primary
                ? { ...base, background:"linear-gradient(135deg,#2563eb,#6366f1,#7c3aed)", color:"white", boxShadow:"0 4px 16px rgba(99,102,241,0.28)" }
                : a.green
                ? { ...base, ...glass, color:"#059669", border:"1px solid #a7f3d0" }
                : a.rose
                ? { ...base, ...glass, color:"#e11d48", border:"1px solid #fecdd3" }
                : { ...base, ...glass, color:"#374151" };

              const iconColor = a.primary ? "white" : a.green ? "#10b981" : a.rose ? "#f43f5e" : "#6366f1";

              return (
                <button key={a.label} onClick={() => navigate(a.path)} style={style}
                  onMouseOver={e => e.currentTarget.style.transform="translateY(-2px)"}
                  onMouseOut={e  => e.currentTarget.style.transform="translateY(0)"}>
                  <span style={{ color: iconColor }}>{a.icon}</span>
                  {a.label}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── Footer ── */}
      <footer style={{ position:"relative", zIndex:1, background:"#0f172a", borderTop:"1px solid rgba(255,255,255,0.05)", padding:"40px 48px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:20 }}>
          <div>
            <span style={{ fontSize:"1.2rem", fontWeight:800, color:"white" }}>EVOLVE</span>
            <span style={{ fontSize:"1.2rem", fontWeight:800, background:"linear-gradient(135deg,#60a5fa,#818cf8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>360</span>
            <p style={{ fontSize:"0.75rem", color:"#475569", marginTop:4 }}>AI-powered performance engineering.</p>
          </div>
          <div style={{ display:"flex", gap:28 }}>
            {["Training","Nutrition","Analytics","Support"].map(l => (
              <a key={l} href="#" style={{ color:"#475569", fontSize:"0.85rem", fontWeight:500, textDecoration:"none" }}
                onMouseOver={e => e.target.style.color="#60a5fa"} onMouseOut={e => e.target.style.color="#475569"}>{l}</a>
            ))}
          </div>
          <p style={{ color:"#334155", fontSize:"0.75rem" }}>© 2026 Elite Performance Atelier. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}