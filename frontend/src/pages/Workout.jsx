// // // // // // // // // // import { useState } from "react";
// // // // // // // // // // import { workoutAPI } from "../api/axios";
// // // // // // // // // // import { useAuth } from "../context/AuthContext";

// // // // // // // // // // export default function Workout() {
// // // // // // // // // //   const { user } = useAuth();

// // // // // // // // // //   const today = new Date().toISOString().split("T")[0];

// // // // // // // // // //   const [decision, setDecision] = useState(null);
// // // // // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // // // // //   const [completeLoading, setCompleteLoading] = useState(false);
// // // // // // // // // //   const [error, setError] = useState("");

// // // // // // // // // //   const handleStartWorkout = async () => {
// // // // // // // // // //     setError("");
// // // // // // // // // //     setLoading(true);

// // // // // // // // // //     try {
// // // // // // // // // //       const res = await workoutAPI.start({
// // // // // // // // // //         userId: user.id,
// // // // // // // // // //         date: today,
// // // // // // // // // //       });

// // // // // // // // // //       setDecision(res.data);

// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       setError(err.message || "Failed to start workout");
// // // // // // // // // //     }

// // // // // // // // // //     setLoading(false);
// // // // // // // // // //   };

// // // // // // // // // //   const handleCompleteWorkout = async () => {
// // // // // // // // // //     if (!decision) return;

// // // // // // // // // //     setCompleteLoading(true);

// // // // // // // // // //     try {
// // // // // // // // // //       await workoutAPI.complete({
// // // // // // // // // //         userId: user.id,
// // // // // // // // // //         weeklyPlanId: decision.currentWeek, // adjust later properly
// // // // // // // // // //         date: today,
// // // // // // // // // //         plannedWorkoutType: decision.plannedWorkoutType,
// // // // // // // // // //         actualWorkoutType: decision.plannedWorkoutType,
// // // // // // // // // //         intensityLevelUsed: "moderate",
// // // // // // // // // //         volumeLevelUsed: "moderate",
// // // // // // // // // //         completed: true,
// // // // // // // // // //         completionPercentage: 100,
// // // // // // // // // //         durationMinutes: 60,
// // // // // // // // // //         perceivedExertion: 7,
// // // // // // // // // //         readinessCategory: decision.adjustment.readinessCategory || "moderate",
// // // // // // // // // //         hydrationLevelPercent: 70,
// // // // // // // // // //       });

// // // // // // // // // //       alert("Workout logged successfully");

// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       alert(err.message || "Failed to complete workout");
// // // // // // // // // //     }

// // // // // // // // // //     setCompleteLoading(false);
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div>

// // // // // // // // // //       <h1 className="text-3xl font-bold mb-8">
// // // // // // // // // //         Today's Workout
// // // // // // // // // //       </h1>

// // // // // // // // // //       {error && (
// // // // // // // // // //         <div className="mb-6 p-3 text-sm bg-red-100 text-red-600 rounded-lg">
// // // // // // // // // //           {error}
// // // // // // // // // //         </div>
// // // // // // // // // //       )}

// // // // // // // // // //       <div className="card mb-6">

// // // // // // // // // //         <button
// // // // // // // // // //           onClick={handleStartWorkout}
// // // // // // // // // //           disabled={loading}
// // // // // // // // // //           className="btn-primary"
// // // // // // // // // //         >
// // // // // // // // // //           {loading ? "Checking readiness..." : "Start Workout"}
// // // // // // // // // //         </button>

// // // // // // // // // //       </div>

// // // // // // // // // //       {decision && (
// // // // // // // // // //         <div className="card space-y-4">

// // // // // // // // // //           <p>
// // // // // // // // // //             Day: <strong>{decision.day}</strong>
// // // // // // // // // //           </p>

// // // // // // // // // //           <p>
// // // // // // // // // //             Planned Type:{" "}
// // // // // // // // // //             <strong>{decision.plannedWorkoutType}</strong>
// // // // // // // // // //           </p>

// // // // // // // // // //           <p>
// // // // // // // // // //             Rest Day:{" "}
// // // // // // // // // //             <strong>
// // // // // // // // // //               {decision.isRestDay ? "Yes" : "No"}
// // // // // // // // // //             </strong>
// // // // // // // // // //           </p>

// // // // // // // // // //           <p>
// // // // // // // // // //             Adjustment:{" "}
// // // // // // // // // //             <strong>
// // // // // // // // // //               {JSON.stringify(decision.adjustment)}
// // // // // // // // // //             </strong>
// // // // // // // // // //           </p>

// // // // // // // // // //           {!decision.isRestDay && (
// // // // // // // // // //             <button
// // // // // // // // // //               onClick={handleCompleteWorkout}
// // // // // // // // // //               disabled={completeLoading}
// // // // // // // // // //               className="btn-primary"
// // // // // // // // // //             >
// // // // // // // // // //               {completeLoading
// // // // // // // // // //                 ? "Logging workout..."
// // // // // // // // // //                 : "Complete Workout"}
// // // // // // // // // //             </button>
// // // // // // // // // //           )}

// // // // // // // // // //         </div>
// // // // // // // // // //       )}

// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }


// // // // // // // // // import { useEffect, useState } from "react";
// // // // // // // // // import { workoutAPI, planAPI } from "../api/axios";
// // // // // // // // // import { useAuth } from "../context/AuthContext";
// // // // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // // // import BikeLoader from "../components/BikeLoader";

// // // // // // // // // export default function Workout() {
// // // // // // // // //   const { user } = useAuth();
// // // // // // // // //   const navigate = useNavigate();

// // // // // // // // //   const [plan, setPlan] = useState(null);
// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const [generating, setGenerating] = useState(false);
// // // // // // // // //   const [expandedDay, setExpandedDay] = useState(null);
// // // // // // // // //   const [decision, setDecision] = useState(null);

// // // // // // // // //   /* ============================================
// // // // // // // // //      PROFILE CHECK
// // // // // // // // //   ============================================ */

// // // // // // // // //   if (!user?.isOnboarded) {
// // // // // // // // //     return (
// // // // // // // // //       <div className="card text-center">
// // // // // // // // //         <h2 className="text-xl font-semibold mb-4">
// // // // // // // // //           Profile Required
// // // // // // // // //         </h2>
// // // // // // // // //         <p className="text-[var(--color-text-secondary)] mb-6">
// // // // // // // // //           Please complete your profile to generate
// // // // // // // // //           personalized workout plans.
// // // // // // // // //         </p>
// // // // // // // // //         <button
// // // // // // // // //           onClick={() => navigate("/onboarding")}
// // // // // // // // //           className="btn-primary"
// // // // // // // // //         >
// // // // // // // // //           Complete Profile
// // // // // // // // //         </button>
// // // // // // // // //       </div>
// // // // // // // // //     );
// // // // // // // // //   }

// // // // // // // // //   /* ============================================
// // // // // // // // //      FETCH PLAN
// // // // // // // // //   ============================================ */

// // // // // // // // //   const fetchPlan = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const res = await workoutAPI.getActivePlan(user.id);
// // // // // // // // //       setPlan(res.data.plan);
// // // // // // // // //     } catch {
// // // // // // // // //       setPlan(null);
// // // // // // // // //     }
// // // // // // // // //     setLoading(false);
// // // // // // // // //   };

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (user?.id) fetchPlan();
// // // // // // // // //   }, [user?.id]);

// // // // // // // // //   /* ============================================
// // // // // // // // //      GENERATE PLAN (NO MODAL)
// // // // // // // // //   ============================================ */

// // // // // // // // //   const handleGenerate = async () => {
// // // // // // // // //     try {
// // // // // // // // //       setGenerating(true);
// // // // // // // // //       await planAPI.generate(user.id);
// // // // // // // // //       await fetchPlan();
// // // // // // // // //     } catch (err) {
// // // // // // // // //       alert(err.message || "Failed to generate plan");
// // // // // // // // //     }
// // // // // // // // //     setGenerating(false);
// // // // // // // // //   };

// // // // // // // // //   /* ============================================
// // // // // // // // //      START WORKOUT
// // // // // // // // //   ============================================ */

// // // // // // // // //   const handleStartWorkout = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const today = new Date().toISOString().split("T")[0];
// // // // // // // // //       const res = await workoutAPI.start({
// // // // // // // // //         userId: user.id,
// // // // // // // // //         date: today,
// // // // // // // // //       });
// // // // // // // // //       setDecision(res.data);
// // // // // // // // //     } catch (err) {
// // // // // // // // //       alert(err.message || "Failed to start workout");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   /* ============================================
// // // // // // // // //      COMPLETE WORKOUT
// // // // // // // // //   ============================================ */

// // // // // // // // //   const completeWorkout = async (dayData) => {
// // // // // // // // //     try {
// // // // // // // // //       await workoutAPI.complete({
// // // // // // // // //         userId: user.id,
// // // // // // // // //         weeklyPlanId: plan._id,
// // // // // // // // //         date: new Date(),
// // // // // // // // //         plannedWorkoutType: dayData.workoutType,
// // // // // // // // //         actualWorkoutType: dayData.workoutType,
// // // // // // // // //         completed: true,
// // // // // // // // //       });
// // // // // // // // //       fetchPlan();
// // // // // // // // //     } catch (err) {
// // // // // // // // //       alert(err.message || "Failed to complete workout");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   /* ============================================
// // // // // // // // //      MARK ATTENDANCE
// // // // // // // // //   ============================================ */

// // // // // // // // //   const markAttendance = async (day) => {
// // // // // // // // //     try {
// // // // // // // // //       await workoutAPI.markAttendance(user.id, {
// // // // // // // // //         week: plan.currentWeek,
// // // // // // // // //         day,
// // // // // // // // //       });
// // // // // // // // //       fetchPlan();
// // // // // // // // //     } catch (err) {
// // // // // // // // //       alert(err.message || "Failed to mark attendance");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   if (loading) return <div>Loading...</div>;

// // // // // // // // //   return (
// // // // // // // // //     <>
// // // // // // // // //       {generating && <BikeLoader />}

// // // // // // // // //       <div className="space-y-10">

// // // // // // // // //         {/* HEADER SECTION */}
// // // // // // // // //         <div className="flex justify-between items-center">
// // // // // // // // //           <h1 className="text-2xl font-bold">
// // // // // // // // //             Weekly Workout Plan
// // // // // // // // //           </h1>

// // // // // // // // //           <button
// // // // // // // // //             onClick={handleGenerate}
// // // // // // // // //             disabled={generating}
// // // // // // // // //             className="btn-primary"
// // // // // // // // //           >
// // // // // // // // //             {plan ? "Regenerate Plan" : "Generate Plan"}
// // // // // // // // //           </button>
// // // // // // // // //         </div>

// // // // // // // // //         {/* NO PLAN */}
// // // // // // // // //         {!plan && (
// // // // // // // // //           <div className="card text-center">
// // // // // // // // //             <p className="text-[var(--color-text-secondary)]">
// // // // // // // // //               No active plan found. Click Generate Plan to create one.
// // // // // // // // //             </p>
// // // // // // // // //           </div>
// // // // // // // // //         )}

// // // // // // // // //         {/* PLAN DISPLAY */}
// // // // // // // // //         {plan && (
// // // // // // // // //           <>
// // // // // // // // //             {/* PLAN OVERVIEW */}
// // // // // // // // //             <div className="card grid md:grid-cols-3 gap-6">
// // // // // // // // //               <div>
// // // // // // // // //                 <h3 className="font-semibold mb-2">Plan Info</h3>
// // // // // // // // //                 <p>Version: {plan.planVersion}</p>
// // // // // // // // //                 <p>Week: {plan.currentWeek}</p>
// // // // // // // // //                 <p>Status: {plan.status}</p>
// // // // // // // // //               </div>

// // // // // // // // //               <div>
// // // // // // // // //                 <h3 className="font-semibold mb-2">Intensity</h3>
// // // // // // // // //                 <p>{plan.baseIntensityLevel}</p>
// // // // // // // // //                 <p>{plan.baseVolumeLevel}</p>
// // // // // // // // //               </div>

// // // // // // // // //               <div>
// // // // // // // // //                 <h3 className="font-semibold mb-2">Workout Days</h3>
// // // // // // // // //                 <p>{plan.plannedWorkoutDays} days/week</p>
// // // // // // // // //               </div>
// // // // // // // // //             </div>

// // // // // // // // //             {/* START TODAY */}
// // // // // // // // //             <div className="card">
// // // // // // // // //               <button
// // // // // // // // //                 onClick={handleStartWorkout}
// // // // // // // // //                 className="btn-primary"
// // // // // // // // //               >
// // // // // // // // //                 Start Today's Workout
// // // // // // // // //               </button>
// // // // // // // // //             </div>

// // // // // // // // //             {/* WEEK STRUCTURE */}
// // // // // // // // //             <div className="space-y-6">
// // // // // // // // //               {plan?.detailedPlan?.weekPlan?.map((dayData) => {

// // // // // // // // //                 const attendance =
// // // // // // // // //                   plan?.weeklyAttendance
// // // // // // // // //                     ?.find(w => w.week === plan.currentWeek)
// // // // // // // // //                     ?.days.find(d => d.day === dayData.day);

// // // // // // // // //                 return (
// // // // // // // // //                   <div key={dayData.day} className="card">

// // // // // // // // //                     <div className="flex justify-between items-center">
// // // // // // // // //                       <div>
// // // // // // // // //                         <h2 className="text-lg font-bold">
// // // // // // // // //                           Day {dayData.day} — {dayData.workoutType.toUpperCase()}
// // // // // // // // //                         </h2>
// // // // // // // // //                         <p className="text-[var(--color-text-secondary)]">
// // // // // // // // //                           {dayData.focus}
// // // // // // // // //                         </p>
// // // // // // // // //                       </div>

// // // // // // // // //                       <div className="flex gap-3">
// // // // // // // // //                         {!dayData.isRestDay && (
// // // // // // // // //                           <>
// // // // // // // // //                             <button
// // // // // // // // //                               onClick={() =>
// // // // // // // // //                                 setExpandedDay(
// // // // // // // // //                                   expandedDay === dayData.day
// // // // // // // // //                                     ? null
// // // // // // // // //                                     : dayData.day
// // // // // // // // //                                 )
// // // // // // // // //                               }
// // // // // // // // //                               className="border px-3 py-1 rounded"
// // // // // // // // //                             >
// // // // // // // // //                               Details
// // // // // // // // //                             </button>

// // // // // // // // //                             <button
// // // // // // // // //                               onClick={() => completeWorkout(dayData)}
// // // // // // // // //                               className="btn-primary"
// // // // // // // // //                             >
// // // // // // // // //                               Complete
// // // // // // // // //                             </button>
// // // // // // // // //                           </>
// // // // // // // // //                         )}

// // // // // // // // //                         <button
// // // // // // // // //                           onClick={() => markAttendance(dayData.day)}
// // // // // // // // //                           className={`px-3 py-1 rounded ${
// // // // // // // // //                             attendance?.status === "completed"
// // // // // // // // //                               ? "bg-green-500 text-white"
// // // // // // // // //                               : "bg-yellow-400 text-black"
// // // // // // // // //                           }`}
// // // // // // // // //                         >
// // // // // // // // //                           {attendance?.status || "Mark"}
// // // // // // // // //                         </button>
// // // // // // // // //                       </div>
// // // // // // // // //                     </div>

// // // // // // // // //                     {/* EXERCISES */}
// // // // // // // // //                     {expandedDay === dayData.day && (
// // // // // // // // //                       <div className="mt-6 space-y-4">
// // // // // // // // //                         {dayData.exercises.map((ex, i) => (
// // // // // // // // //                           <div key={i} className="border rounded-lg p-4">
// // // // // // // // //                             <h4 className="font-semibold">{ex.name}</h4>
// // // // // // // // //                             <p className="text-sm text-[var(--color-text-secondary)]">
// // // // // // // // //                               {ex.sets} sets • {ex.reps} • Rest {ex.restSeconds}s
// // // // // // // // //                             </p>
// // // // // // // // //                             <p className="text-xs mt-2">
// // // // // // // // //                               {ex.trainingEffect?.primaryEffect}
// // // // // // // // //                             </p>
// // // // // // // // //                           </div>
// // // // // // // // //                         ))}
// // // // // // // // //                       </div>
// // // // // // // // //                     )}

// // // // // // // // //                   </div>
// // // // // // // // //                 );
// // // // // // // // //               })}
// // // // // // // // //             </div>

// // // // // // // // //             {/* GLOBAL NOTES */}
// // // // // // // // //             <div className="card space-y-4">
// // // // // // // // //               <h3 className="font-semibold">Weekly Notes</h3>
// // // // // // // // //               <p>{plan?.detailedPlan?.globalNotes?.weeklyEmphasis}</p>

// // // // // // // // //               <ul className="list-disc pl-6 text-sm">
// // // // // // // // //                 {plan?.detailedPlan?.globalNotes?.injuryPreventionFocus?.map(
// // // // // // // // //                   (note, i) => (
// // // // // // // // //                     <li key={i}>{note}</li>
// // // // // // // // //                   )
// // // // // // // // //                 )}
// // // // // // // // //               </ul>
// // // // // // // // //             </div>
// // // // // // // // //           </>
// // // // // // // // //         )}
// // // // // // // // //       </div>
// // // // // // // // //     </>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // import { useEffect, useState } from "react";
// // // // // // // // import { workoutAPI, planAPI } from "../api/axios";
// // // // // // // // import { useAuth } from "../context/AuthContext";
// // // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // // import BikeLoader from "../components/BikeLoader";

// // // // // // // // export default function Workout() {
// // // // // // // //   const { user } = useAuth();
// // // // // // // //   const navigate = useNavigate();

// // // // // // // //   const [plan, setPlan] = useState(null);
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [generating, setGenerating] = useState(false);
// // // // // // // //   const [expandedDay, setExpandedDay] = useState(null);

// // // // // // // //   const [showStructureEditor, setShowStructureEditor] = useState(false);
// // // // // // // //   const [editingDay, setEditingDay] = useState(null);

// // // // // // // //   /* ================= PROFILE CHECK ================= */

// // // // // // // //   if (!user?.isOnboarded) {
// // // // // // // //     return (
// // // // // // // //       <div className="card text-center">
// // // // // // // //         <h2 className="text-xl font-semibold mb-4">
// // // // // // // //           Profile Required
// // // // // // // //         </h2>
// // // // // // // //         <button
// // // // // // // //           onClick={() => navigate("/onboarding")}
// // // // // // // //           className="btn-primary"
// // // // // // // //         >
// // // // // // // //           Complete Profile
// // // // // // // //         </button>
// // // // // // // //       </div>
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   /* ================= FETCH PLAN ================= */

// // // // // // // //   const fetchPlan = async () => {
// // // // // // // //     try {
// // // // // // // //       const res = await workoutAPI.getActivePlan(user.id);
// // // // // // // //       setPlan(res.data.plan);
// // // // // // // //     } catch {
// // // // // // // //       setPlan(null);
// // // // // // // //     }
// // // // // // // //     setLoading(false);
// // // // // // // //   };

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (user?.id) fetchPlan();
// // // // // // // //   }, [user?.id]);

// // // // // // // //   /* ================= GENERATE PLAN ================= */

// // // // // // // //   const handleGenerate = async () => {
// // // // // // // //     try {
// // // // // // // //       setGenerating(true);
// // // // // // // //       await planAPI.generate(user.id);
// // // // // // // //       await fetchPlan();
// // // // // // // //     } catch (err) {
// // // // // // // //       alert(err.message || "Failed to generate plan");
// // // // // // // //     }
// // // // // // // //     setGenerating(false);
// // // // // // // //   };

// // // // // // // //   /* ================= UPDATE STRUCTURE ================= */

// // // // // // // //   const updateWorkoutDay = async (day, newWorkoutType) => {
// // // // // // // //     try {
// // // // // // // //       await workoutAPI.updateStructure(user.id, {
// // // // // // // //         day,
// // // // // // // //         newWorkoutType,
// // // // // // // //       });

// // // // // // // //       alert(
// // // // // // // //         "Base structure updated. Please regenerate your AI plan."
// // // // // // // //       );

// // // // // // // //       fetchPlan();
// // // // // // // //       setEditingDay(null);

// // // // // // // //     } catch (err) {
// // // // // // // //       alert(err.message || "Failed to update workout day");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   /* ================= COMPLETE WORKOUT ================= */

// // // // // // // //   const completeWorkout = async (dayData) => {
// // // // // // // //     try {
// // // // // // // //       await workoutAPI.complete({
// // // // // // // //         userId: user.id,
// // // // // // // //         weeklyPlanId: plan._id,
// // // // // // // //         date: new Date(),
// // // // // // // //         plannedWorkoutType: dayData.workoutType,
// // // // // // // //         actualWorkoutType: dayData.workoutType,
// // // // // // // //         completed: true,
// // // // // // // //       });
// // // // // // // //       fetchPlan();
// // // // // // // //     } catch (err) {
// // // // // // // //       alert(err.message || "Failed to complete workout");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   if (loading) return <div>Loading...</div>;

// // // // // // // //   return (
// // // // // // // //     <>
// // // // // // // //       {generating && <BikeLoader />}

// // // // // // // //       <div className="space-y-10">

// // // // // // // //         {/* HEADER */}
// // // // // // // //         <div className="flex justify-between items-center">
// // // // // // // //           <h1 className="text-2xl font-bold">
// // // // // // // //             Weekly Workout Plan
// // // // // // // //           </h1>

// // // // // // // //           <button
// // // // // // // //             onClick={handleGenerate}
// // // // // // // //             disabled={generating}
// // // // // // // //             className="btn-primary"
// // // // // // // //           >
// // // // // // // //             {plan ? "Regenerate Plan" : "Generate Plan"}
// // // // // // // //           </button>
// // // // // // // //         </div>

// // // // // // // //         {/* NO PLAN */}
// // // // // // // //         {!plan && (
// // // // // // // //           <div className="card text-center">
// // // // // // // //             No active plan found. Click Generate Plan.
// // // // // // // //           </div>
// // // // // // // //         )}

// // // // // // // //         {plan && (
// // // // // // // //           <>
// // // // // // // //             {/* ================= BASE STRUCTURE ================= */}

// // // // // // // //             <div className="card">
// // // // // // // //               <div className="flex justify-between items-center mb-4">
// // // // // // // //                 <h3 className="font-semibold text-lg">
// // // // // // // //                   Base Rule Structure
// // // // // // // //                 </h3>

// // // // // // // //                 <button
// // // // // // // //                   onClick={() =>
// // // // // // // //                     setShowStructureEditor(!showStructureEditor)
// // // // // // // //                   }
// // // // // // // //                   className="border px-3 py-1 rounded"
// // // // // // // //                 >
// // // // // // // //                   {showStructureEditor ? "Close" : "Open"}
// // // // // // // //                 </button>
// // // // // // // //               </div>

// // // // // // // //               {showStructureEditor && (
// // // // // // // //                 <div className="space-y-4">

// // // // // // // //                   {plan.weeklyStructure.map((day) => (
// // // // // // // //                     <div
// // // // // // // //                       key={day.day}
// // // // // // // //                       className="flex justify-between items-center border rounded-lg p-3"
// // // // // // // //                     >
// // // // // // // //                       <div>
// // // // // // // //                         <p className="font-medium">
// // // // // // // //                           Day {day.day}
// // // // // // // //                         </p>
// // // // // // // //                         <p className="text-sm text-[var(--color-text-secondary)]">
// // // // // // // //                           {day.workoutType.toUpperCase()}
// // // // // // // //                         </p>
// // // // // // // //                       </div>

// // // // // // // //                       {editingDay === day.day ? (
// // // // // // // //                         <div className="flex gap-2">
// // // // // // // //                           <select
// // // // // // // //                             defaultValue={day.workoutType}
// // // // // // // //                             onChange={(e) =>
// // // // // // // //                               updateWorkoutDay(
// // // // // // // //                                 day.day,
// // // // // // // //                                 e.target.value
// // // // // // // //                               )
// // // // // // // //                             }
// // // // // // // //                             className="border px-2 py-1 rounded"
// // // // // // // //                           >
// // // // // // // //                             <option value="rest">Rest</option>
// // // // // // // //                             <option value="full">Full</option>
// // // // // // // //                             <option value="upper">Upper</option>
// // // // // // // //                             <option value="lower">Lower</option>
// // // // // // // //                             <option value="push">Push</option>
// // // // // // // //                             <option value="pull">Pull</option>
// // // // // // // //                             <option value="legs">Legs</option>
// // // // // // // //                           </select>

// // // // // // // //                           <button
// // // // // // // //                             onClick={() => setEditingDay(null)}
// // // // // // // //                             className="border px-2 rounded"
// // // // // // // //                           >
// // // // // // // //                             Cancel
// // // // // // // //                           </button>
// // // // // // // //                         </div>
// // // // // // // //                       ) : (
// // // // // // // //                         <button
// // // // // // // //                           onClick={() =>
// // // // // // // //                             setEditingDay(day.day)
// // // // // // // //                           }
// // // // // // // //                           className="btn-primary"
// // // // // // // //                         >
// // // // // // // //                           Edit
// // // // // // // //                         </button>
// // // // // // // //                       )}
// // // // // // // //                     </div>
// // // // // // // //                   ))}

// // // // // // // //                   {plan.needsRegeneration && (
// // // // // // // //                     <div className="p-3 bg-yellow-100 text-yellow-700 rounded-lg text-sm">
// // // // // // // //                       Structure modified. AI plan needs regeneration.
// // // // // // // //                     </div>
// // // // // // // //                   )}

// // // // // // // //                 </div>
// // // // // // // //               )}
// // // // // // // //             </div>

// // // // // // // //             {/* ================= PLAN OVERVIEW ================= */}

// // // // // // // //             <div className="card grid md:grid-cols-3 gap-6">
// // // // // // // //               <div>
// // // // // // // //                 <h3 className="font-semibold mb-2">Plan Info</h3>
// // // // // // // //                 <p>Version: {plan.planVersion}</p>
// // // // // // // //                 <p>Week: {plan.currentWeek}</p>
// // // // // // // //                 <p>Status: {plan.status}</p>
// // // // // // // //               </div>

// // // // // // // //               <div>
// // // // // // // //                 <h3 className="font-semibold mb-2">Intensity</h3>
// // // // // // // //                 <p>{plan.baseIntensityLevel}</p>
// // // // // // // //                 <p>{plan.baseVolumeLevel}</p>
// // // // // // // //               </div>

// // // // // // // //               <div>
// // // // // // // //                 <h3 className="font-semibold mb-2">Workout Days</h3>
// // // // // // // //                 <p>{plan.plannedWorkoutDays} days/week</p>
// // // // // // // //               </div>
// // // // // // // //             </div>

// // // // // // // //             {/* ================= WEEK PLAN ================= */}

// // // // // // // //             <div className="space-y-6">
// // // // // // // //               {plan?.detailedPlan?.weekPlan?.map((dayData) => (
// // // // // // // //                 <div key={dayData.day} className="card">

// // // // // // // //                   <div className="flex justify-between items-center">
// // // // // // // //                     <div>
// // // // // // // //                       <h2 className="text-lg font-bold">
// // // // // // // //                         Day {dayData.day} — {dayData.workoutType.toUpperCase()}
// // // // // // // //                       </h2>
// // // // // // // //                       <p className="text-[var(--color-text-secondary)]">
// // // // // // // //                         {dayData.focus}
// // // // // // // //                       </p>
// // // // // // // //                     </div>

// // // // // // // //                     <div className="flex gap-3">
// // // // // // // //                       <button
// // // // // // // //                         onClick={() =>
// // // // // // // //                           setExpandedDay(
// // // // // // // //                             expandedDay === dayData.day
// // // // // // // //                               ? null
// // // // // // // //                               : dayData.day
// // // // // // // //                           )
// // // // // // // //                         }
// // // // // // // //                         className="border px-3 py-1 rounded"
// // // // // // // //                       >
// // // // // // // //                         Details
// // // // // // // //                       </button>

// // // // // // // //                       <button
// // // // // // // //                         onClick={() => completeWorkout(dayData)}
// // // // // // // //                         className="btn-primary"
// // // // // // // //                       >
// // // // // // // //                         Complete
// // // // // // // //                       </button>
// // // // // // // //                     </div>
// // // // // // // //                   </div>

// // // // // // // //                   {expandedDay === dayData.day && (
// // // // // // // //                     <div className="mt-6 space-y-4">
// // // // // // // //                       {dayData.exercises.map((ex, i) => (
// // // // // // // //                         <div key={i} className="border rounded-lg p-4">
// // // // // // // //                           <h4 className="font-semibold">{ex.name}</h4>
// // // // // // // //                           <p className="text-sm text-[var(--color-text-secondary)]">
// // // // // // // //                             {ex.sets} sets • {ex.reps}
// // // // // // // //                           </p>
// // // // // // // //                         </div>
// // // // // // // //                       ))}
// // // // // // // //                     </div>
// // // // // // // //                   )}

// // // // // // // //                 </div>
// // // // // // // //               ))}
// // // // // // // //             </div>

// // // // // // // //           </>
// // // // // // // //         )}
// // // // // // // //       </div>
// // // // // // // //     </>
// // // // // // // //   );
// // // // // // // // }





// // // // // // // import { useEffect, useState } from "react";
// // // // // // // import { workoutAPI, planAPI } from "../api/axios";
// // // // // // // import { useAuth } from "../context/AuthContext";
// // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // import BikeLoader from "../components/BikeLoader";

// // // // // // // export default function Workout() {
// // // // // // //   const { user } = useAuth();
// // // // // // //   const navigate = useNavigate();

// // // // // // //   const [plan, setPlan] = useState(null);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [actionLoading, setActionLoading] = useState(false);
// // // // // // //   const [expandedDay, setExpandedDay] = useState(null);

// // // // // // //   const today = new Date();

// // // // // // //   /* ================= PROFILE CHECK ================= */

// // // // // // //   if (!user?.isOnboarded) {
// // // // // // //     return (
// // // // // // //       <div className="card text-center">
// // // // // // //         <h2 className="text-xl font-semibold mb-4">
// // // // // // //           Profile Required
// // // // // // //         </h2>
// // // // // // //         <button
// // // // // // //           onClick={() => navigate("/onboarding")}
// // // // // // //           className="btn-primary"
// // // // // // //         >
// // // // // // //           Complete Profile
// // // // // // //         </button>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   /* ================= FETCH ACTIVE PLAN ================= */

// // // // // // //   const fetchPlan = async () => {
// // // // // // //     try {
// // // // // // //       const res = await workoutAPI.getActivePlan(user.id);
// // // // // // //       setPlan(res.data.plan);
// // // // // // //     } catch {
// // // // // // //       setPlan(null);
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     if (user?.id) fetchPlan();
// // // // // // //   }, [user?.id]);

// // // // // // //   /* ================= GENERATE / REGENERATE ================= */

// // // // // // //   const handleGenerate = async () => {
// // // // // // //     try {
// // // // // // //       setActionLoading(true);

// // // // // // //       if (!plan) {
// // // // // // //         await planAPI.generate(user.id);
// // // // // // //       } else if (plan.needsRegeneration) {
// // // // // // //         await planAPI.regenerateAI(user.id);
// // // // // // //       } else {
// // // // // // //         await planAPI.regenerate(user.id);
// // // // // // //       }

// // // // // // //       await fetchPlan();
// // // // // // //     } catch (err) {
// // // // // // //       alert(err.response?.data?.message || "Plan action failed");
// // // // // // //     } finally {
// // // // // // //       setActionLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   /* ================= START WORKOUT ================= */

// // // // // // //   const startWorkout = async () => {
// // // // // // //     try {
// // // // // // //       setActionLoading(true);

// // // // // // //       const res = await workoutAPI.start({
// // // // // // //         userId: user.id,
// // // // // // //         date: today
// // // // // // //       });

// // // // // // //       alert(`Workout Started: ${res.data.plannedWorkoutType}`);

// // // // // // //     } catch (err) {
// // // // // // //       alert(err.response?.data?.message || "Cannot start workout");
// // // // // // //     } finally {
// // // // // // //       setActionLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   /* ================= COMPLETE WORKOUT ================= */

// // // // // // //   const completeWorkout = async (dayData) => {
// // // // // // //     try {
// // // // // // //       setActionLoading(true);

// // // // // // //       await workoutAPI.complete({
// // // // // // //         userId: user.id,
// // // // // // //         weeklyPlanId: plan._id,
// // // // // // //         date: today,
// // // // // // //         plannedWorkoutType: dayData.workoutType,
// // // // // // //         actualWorkoutType: dayData.workoutType,
// // // // // // //         intensityLevelUsed: plan.baseIntensityLevel,
// // // // // // //         volumeLevelUsed: plan.baseVolumeLevel,
// // // // // // //         completed: true,
// // // // // // //         completionPercentage: 100,
// // // // // // //         durationMinutes: 60,
// // // // // // //         painReported: [],
// // // // // // //         perceivedExertion: 7,
// // // // // // //         readinessCategory: "moderate",
// // // // // // //         hydrationLevelPercent: 80,
// // // // // // //         injuryRiskFlag: false
// // // // // // //       });

// // // // // // //       await fetchPlan();
// // // // // // //       alert("Workout completed");

// // // // // // //     } catch (err) {
// // // // // // //       alert(err.response?.data?.message || "Failed to complete workout");
// // // // // // //     } finally {
// // // // // // //       setActionLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   /* ================= MARK ATTENDANCE ================= */

// // // // // // //   const markAttendance = async (dayNumber, status) => {
// // // // // // //     try {
// // // // // // //       setActionLoading(true);

// // // // // // //       await workoutAPI.markAttendance(user.id, {
// // // // // // //         day: dayNumber,
// // // // // // //         status
// // // // // // //       });

// // // // // // //       await fetchPlan();
// // // // // // //     } catch (err) {
// // // // // // //       alert(err.response?.data?.message || "Failed to update attendance");
// // // // // // //     } finally {
// // // // // // //       setActionLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   if (loading) return <div>Loading...</div>;

// // // // // // //   return (
// // // // // // //     <>
// // // // // // //       {actionLoading && <BikeLoader />}

// // // // // // //       <div className="space-y-10">

// // // // // // //         {/* HEADER */}

// // // // // // //         <div className="flex justify-between items-center">
// // // // // // //           <h1 className="text-2xl font-bold">
// // // // // // //             Weekly Workout Plan
// // // // // // //           </h1>

// // // // // // //           <button
// // // // // // //             onClick={handleGenerate}
// // // // // // //             className="btn-primary"
// // // // // // //           >
// // // // // // //             {!plan
// // // // // // //               ? "Generate Plan"
// // // // // // //               : plan.needsRegeneration
// // // // // // //               ? "Regenerate AI Plan"
// // // // // // //               : "Regenerate Cycle"}
// // // // // // //           </button>
// // // // // // //         </div>

// // // // // // //         {!plan && (
// // // // // // //           <div className="card text-center">
// // // // // // //             No active plan found.
// // // // // // //           </div>
// // // // // // //         )}

// // // // // // //         {plan && (
// // // // // // //           <>
// // // // // // //             {/* START TODAY */}
// // // // // // //             <div className="card text-center">
// // // // // // //               <button
// // // // // // //                 onClick={startWorkout}
// // // // // // //                 className="btn-primary"
// // // // // // //               >
// // // // // // //                 Start Today's Workout
// // // // // // //               </button>
// // // // // // //             </div>

// // // // // // //             {/* WEEK PLAN */}
// // // // // // //             <div className="space-y-6">
// // // // // // //               {plan?.detailedPlan?.weekPlan?.map((dayData) => (
// // // // // // //                 <div key={dayData.day} className="card">

// // // // // // //                   <div className="flex justify-between items-center">
// // // // // // //                     <div>
// // // // // // //                       <h2 className="text-lg font-bold">
// // // // // // //                         Day {dayData.day} — {dayData.workoutType.toUpperCase()}
// // // // // // //                       </h2>
// // // // // // //                       <p className="text-sm">
// // // // // // //                         {dayData.focus}
// // // // // // //                       </p>
// // // // // // //                     </div>

// // // // // // //                     <div className="flex gap-2">

// // // // // // //                       <button
// // // // // // //                         onClick={() =>
// // // // // // //                           setExpandedDay(
// // // // // // //                             expandedDay === dayData.day
// // // // // // //                               ? null
// // // // // // //                               : dayData.day
// // // // // // //                           )
// // // // // // //                         }
// // // // // // //                         className="border px-3 py-1 rounded"
// // // // // // //                       >
// // // // // // //                         Details
// // // // // // //                       </button>

// // // // // // //                       <button
// // // // // // //                         onClick={() =>
// // // // // // //                           markAttendance(dayData.day, "completed")
// // // // // // //                         }
// // // // // // //                         className="border px-3 py-1 rounded"
// // // // // // //                       >
// // // // // // //                         ✓
// // // // // // //                       </button>

// // // // // // //                       <button
// // // // // // //                         onClick={() =>
// // // // // // //                           markAttendance(dayData.day, "missed")
// // // // // // //                         }
// // // // // // //                         className="border px-3 py-1 rounded"
// // // // // // //                       >
// // // // // // //                         ✗
// // // // // // //                       </button>

// // // // // // //                       <button
// // // // // // //                         onClick={() =>
// // // // // // //                           completeWorkout(dayData)
// // // // // // //                         }
// // // // // // //                         className="btn-primary"
// // // // // // //                       >
// // // // // // //                         Complete
// // // // // // //                       </button>
// // // // // // //                     </div>
// // // // // // //                   </div>

// // // // // // //                   {expandedDay === dayData.day && (
// // // // // // //                     <div className="mt-4 space-y-3">
// // // // // // //                       {dayData.exercises.map((ex, i) => (
// // // // // // //                         <div
// // // // // // //                           key={i}
// // // // // // //                           className="border rounded-lg p-3"
// // // // // // //                         >
// // // // // // //                           <h4>{ex.name}</h4>
// // // // // // //                           <p className="text-sm">
// // // // // // //                             {ex.sets} sets • {ex.reps}
// // // // // // //                           </p>
// // // // // // //                         </div>
// // // // // // //                       ))}
// // // // // // //                     </div>
// // // // // // //                   )}

// // // // // // //                 </div>
// // // // // // //               ))}
// // // // // // //             </div>
// // // // // // //           </>
// // // // // // //         )}
// // // // // // //       </div>
// // // // // // //     </>
// // // // // // //   );
// // // // // // // }

// // // // // // import { useEffect, useState } from "react";
// // // // // // import { workoutAPI, planAPI } from "../api/axios";
// // // // // // import { useAuth } from "../context/AuthContext";
// // // // // // import BikeLoader from "../components/BikeLoader";

// // // // // // export default function Workout() {
// // // // // //   const { user } = useAuth();

// // // // // //   const today = new Date().toISOString().split("T")[0];

// // // // // //   const [plan, setPlan] = useState(null);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [actionLoading, setActionLoading] = useState(false);

// // // // // //   const [startedDay, setStartedDay] = useState(null);
// // // // // //   const [attendanceDay, setAttendanceDay] = useState(null);
// // // // // //   const [completedData, setCompletedData] = useState({});

// // // // // //   const [readinessForm, setReadinessForm] = useState({
// // // // // //     sleepHours: "",
// // // // // //     stressLevel: "medium",
// // // // // //     subjectiveFeeling: "normal",
// // // // // //     restingHeartRate: "",
// // // // // //     hydrationLevelPercent: 70,
// // // // // //   });

// // // // // //   /* ================= FETCH PLAN ================= */

// // // // // //   const fetchPlan = async () => {
// // // // // //     try {
// // // // // //       const res = await workoutAPI.getActivePlan(user.id);
// // // // // //       setPlan(res.data.plan || null);
// // // // // //     } catch {
// // // // // //       setPlan(null);
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     if (user?.id) fetchPlan();
// // // // // //   }, [user?.id]);

// // // // // //   /* ================= GENERATE PLAN ================= */

// // // // // //   const handleGenerate = async () => {
// // // // // //     try {
// // // // // //       setActionLoading(true);

// // // // // //       if (!plan) await planAPI.generate(user.id);
// // // // // //       else if (plan?.needsRegeneration)
// // // // // //         await planAPI.regenerateAI(user.id);

// // // // // //       await fetchPlan();
// // // // // //     } catch (err) {
// // // // // //       alert(err.response?.data?.message || "Plan action failed");
// // // // // //     } finally {
// // // // // //       setActionLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   /* ================= START (READINESS + START TOGETHER) ================= */

// // // // // //   const startWorkout = async (dayData) => {
// // // // // //     try {
// // // // // //       setActionLoading(true);

// // // // // //       const res = await workoutAPI.start({
// // // // // //         userId: user.id,
// // // // // //         date: today,
// // // // // //         ...readinessForm,
// // // // // //         sorenessAreas: []
// // // // // //       });

// // // // // //       setStartedDay(dayData.day);

// // // // // //       console.log("Start response:", res.data);

// // // // // //     } catch (err) {
// // // // // //       alert(err.response?.data?.message || "Start failed");
// // // // // //     } finally {
// // // // // //       setActionLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   /* ================= ATTENDANCE ================= */

// // // // // //   const markAttendance = async (dayNumber) => {
// // // // // //     try {
// // // // // //       setActionLoading(true);

// // // // // //       await workoutAPI.markAttendance(user.id, {
// // // // // //         day: dayNumber,
// // // // // //         status: "completed",
// // // // // //       });

// // // // // //       setAttendanceDay(dayNumber);
// // // // // //     } catch (err) {
// // // // // //       alert(err.response?.data?.message || "Attendance failed");
// // // // // //     } finally {
// // // // // //       setActionLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   /* ================= COMPLETE ================= */

// // // // // //   const completeWorkout = async (dayData) => {
// // // // // //     try {
// // // // // //       setActionLoading(true);

// // // // // //       const res = await workoutAPI.complete({
// // // // // //         userId: user.id,
// // // // // //         weeklyPlanId: plan._id,
// // // // // //         date: today,
// // // // // //         plannedWorkoutType: dayData.workoutType,
// // // // // //         actualWorkoutType: dayData.workoutType,
// // // // // //         intensityLevelUsed: plan.baseIntensityLevel,
// // // // // //         volumeLevelUsed: plan.baseVolumeLevel,
// // // // // //         completed: true,
// // // // // //         completionPercentage: 100,
// // // // // //         durationMinutes: 60,
// // // // // //         perceivedExertion: 7,
// // // // // //         injuryRiskFlag: false,
// // // // // //       });

// // // // // //       setCompletedData((prev) => ({
// // // // // //         ...prev,
// // // // // //         [dayData.day]: res.data,
// // // // // //       }));

// // // // // //     } catch (err) {
// // // // // //       alert(err.response?.data?.message || "Completion failed");
// // // // // //     } finally {
// // // // // //       setActionLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   if (loading) return <div>Loading...</div>;

// // // // // //   const weekPlan = plan?.detailedPlan?.weekPlan || [];

// // // // // //   return (
// // // // // //     <>
// // // // // //       {actionLoading && <BikeLoader />}

// // // // // //       <div className="space-y-8">

// // // // // //         <div className="flex justify-between items-center">
// // // // // //           <h1 className="text-2xl font-bold">Weekly Workout Plan</h1>
// // // // // //           <button onClick={handleGenerate} className="btn-primary">
// // // // // //             {!plan ? "Generate Plan" :
// // // // // //               plan?.needsRegeneration ? "Regenerate AI Plan" : ""}
// // // // // //           </button>
// // // // // //         </div>

// // // // // //         {/* ================= WORKOUT DAYS ================= */}

// // // // // //         {weekPlan.map((dayData) => {
// // // // // //           const exercises = dayData?.exercises || [];
// // // // // //           const isCompleted = completedData[dayData.day];
// // // // // //           const isRest = dayData.workoutType === "rest";

// // // // // //           return (
// // // // // //             <div
// // // // // //               key={dayData.day}
// // // // // //               className={`card transition ${
// // // // // //                 isCompleted ? "opacity-50 line-through" : ""
// // // // // //               }`}
// // // // // //             >
// // // // // //               <div className="flex justify-between items-center">

// // // // // //                 <div>
// // // // // //                   <h2 className="font-bold">
// // // // // //                     Day {dayData.day} — {dayData.workoutType}
// // // // // //                   </h2>
// // // // // //                   <p className="text-sm">{dayData.focus}</p>
// // // // // //                 </div>

// // // // // //                 {!isRest && (
// // // // // //                   <div className="flex gap-2">

// // // // // //                     <button
// // // // // //                       onClick={() => startWorkout(dayData)}
// // // // // //                       disabled={isCompleted}
// // // // // //                       className="border px-3 py-1 rounded"
// // // // // //                     >
// // // // // //                       Start
// // // // // //                     </button>

// // // // // //                     <button
// // // // // //                       onClick={() => markAttendance(dayData.day)}
// // // // // //                       disabled={startedDay !== dayData.day || isCompleted}
// // // // // //                       className="border px-3 py-1 rounded"
// // // // // //                     >
// // // // // //                       Attendance
// // // // // //                     </button>

// // // // // //                     <button
// // // // // //                       onClick={() => completeWorkout(dayData)}
// // // // // //                       disabled={attendanceDay !== dayData.day || isCompleted}
// // // // // //                       className="btn-primary"
// // // // // //                     >
// // // // // //                       Complete
// // // // // //                     </button>
// // // // // //                   </div>
// // // // // //                 )}

// // // // // //                 {isRest && (
// // // // // //                   <span className="text-gray-500 font-semibold">
// // // // // //                     Rest Day
// // // // // //                   </span>
// // // // // //                 )}
// // // // // //               </div>

// // // // // //               {/* ================= READINESS INPUTS ================= */}
// // // // // //               {!isRest && !startedDay && (
// // // // // //                 <div className="grid grid-cols-2 gap-3 mt-4">

// // // // // //                   <input
// // // // // //                     type="number"
// // // // // //                     placeholder="Sleep Hours"
// // // // // //                     value={readinessForm.sleepHours}
// // // // // //                     onChange={(e) =>
// // // // // //                       setReadinessForm({
// // // // // //                         ...readinessForm,
// // // // // //                         sleepHours: e.target.value,
// // // // // //                       })
// // // // // //                     }
// // // // // //                     className="input-field"
// // // // // //                   />

// // // // // //                   <select
// // // // // //                     value={readinessForm.stressLevel}
// // // // // //                     onChange={(e) =>
// // // // // //                       setReadinessForm({
// // // // // //                         ...readinessForm,
// // // // // //                         stressLevel: e.target.value,
// // // // // //                       })
// // // // // //                     }
// // // // // //                     className="input-field"
// // // // // //                   >
// // // // // //                     <option value="low">Low Stress</option>
// // // // // //                     <option value="medium">Medium Stress</option>
// // // // // //                     <option value="high">High Stress</option>
// // // // // //                   </select>

// // // // // //                   <select
// // // // // //                     value={readinessForm.subjectiveFeeling}
// // // // // //                     onChange={(e) =>
// // // // // //                       setReadinessForm({
// // // // // //                         ...readinessForm,
// // // // // //                         subjectiveFeeling: e.target.value,
// // // // // //                       })
// // // // // //                     }
// // // // // //                     className="input-field"
// // // // // //                   >
// // // // // //                     <option value="fresh">Fresh</option>
// // // // // //                     <option value="normal">Normal</option>
// // // // // //                     <option value="tired">Tired</option>
// // // // // //                   </select>

// // // // // //                   <input
// // // // // //                     type="number"
// // // // // //                     placeholder="Resting HR"
// // // // // //                     value={readinessForm.restingHeartRate}
// // // // // //                     onChange={(e) =>
// // // // // //                       setReadinessForm({
// // // // // //                         ...readinessForm,
// // // // // //                         restingHeartRate: e.target.value,
// // // // // //                       })
// // // // // //                     }
// // // // // //                     className="input-field"
// // // // // //                   />

// // // // // //                   <input
// // // // // //                     type="number"
// // // // // //                     placeholder="Hydration %"
// // // // // //                     value={readinessForm.hydrationLevelPercent}
// // // // // //                     onChange={(e) =>
// // // // // //                       setReadinessForm({
// // // // // //                         ...readinessForm,
// // // // // //                         hydrationLevelPercent: e.target.value,
// // // // // //                       })
// // // // // //                     }
// // // // // //                     className="input-field col-span-2"
// // // // // //                   />
// // // // // //                 </div>
// // // // // //               )}

// // // // // //               {/* ================= EXERCISES ================= */}
// // // // // //               {!isRest && (
// // // // // //                 <div className="mt-4 space-y-2">
// // // // // //                   {exercises.map((ex, i) => (
// // // // // //                     <div key={i} className="border rounded p-2">
// // // // // //                       {ex.name} — {ex.sets} x {ex.reps}
// // // // // //                     </div>
// // // // // //                   ))}
// // // // // //                 </div>
// // // // // //               )}

// // // // // //               {/* ================= RESULT ================= */}
// // // // // //               {isCompleted && (
// // // // // //                 <div className="mt-4 p-4 bg-green-50 rounded-lg">
// // // // // //                   <p><strong>APS:</strong> {isCompleted.aps}</p>
// // // // // //                   <p><strong>Recovery:</strong> {isCompleted.recovery?.recoveryType}</p>
// // // // // //                   <p><strong>Habit Risk:</strong> {isCompleted.habitRisk?.riskLevel}</p>
// // // // // //                 </div>
// // // // // //               )}

// // // // // //             </div>
// // // // // //           );
// // // // // //         })}
// // // // // //       </div>
// // // // // //     </>
// // // // // //   );
// // // // // // }


// // // // // import { useEffect, useState } from "react";
// // // // // import { planAPI, aiAPI, readinessAPI } from "../api/axios";
// // // // // import { useAuth } from "../context/AuthContext";
// // // // // import BikeLoader from "../components/BikeLoader";

// // // // // export default function Workout() {
// // // // //   const { user } = useAuth();
// // // // //   const today = new Date().toISOString().split("T")[0];

// // // // //   const [plan, setPlan] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [actionLoading, setActionLoading] = useState(false);

// // // // //   const [readinessForm, setReadinessForm] = useState({
// // // // //     sleepHours: "",
// // // // //     stressLevel: 3,
// // // // //     subjectiveFeeling: 7,
// // // // //     restingHeartRate: "",
// // // // //     hydrationLevelPercent: 70,
// // // // //   });

// // // // //   /* ================= FETCH ACTIVE PLAN ================= */

// // // // //   const fetchPlan = async () => {
// // // // //     try {
// // // // //       const res = await planAPI.getActive(user.id);
// // // // //       setPlan(res.data?.plan || null);
// // // // //     } catch (err) {
// // // // //       setPlan(null);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     if (user?.id) fetchPlan();
// // // // //   }, [user?.id]);

// // // // //   /* ================= GENERATE BASE PLAN ================= */

// // // // //   const generateBasePlan = async () => {
// // // // //     try {
// // // // //       setActionLoading(true);
// // // // //       await planAPI.generate(user.id);
// // // // //       await fetchPlan();
// // // // //     } catch (err) {
// // // // //       alert(err.message || "Base plan generation failed");
// // // // //     } finally {
// // // // //       setActionLoading(false);
// // // // //     }
// // // // //   };

// // // // //   /* ================= GENERATE AI PLAN ================= */

// // // // //   const generateAIPlan = async () => {
// // // // //     try {
// // // // //       setActionLoading(true);
// // // // //       await aiAPI.generateWeekly(user.id);
// // // // //       await fetchPlan();
// // // // //     } catch (err) {
// // // // //       alert(err.message || "AI plan generation failed");
// // // // //     } finally {
// // // // //       setActionLoading(false);
// // // // //     }
// // // // //   };

// // // // //   /* ================= SUBMIT READINESS ================= */

// // // // //   const submitReadiness = async () => {
// // // // //     try {
// // // // //       setActionLoading(true);

// // // // //       await readinessAPI.submit({
// // // // //         userId: user.id,
// // // // //         date: today,
// // // // //         ...readinessForm,
// // // // //         sorenessAreas: []
// // // // //       });

// // // // //       alert("Readiness submitted successfully");
// // // // //     } catch (err) {
// // // // //       alert(err.message || "Readiness submission failed");
// // // // //     } finally {
// // // // //       setActionLoading(false);
// // // // //     }
// // // // //   };

// // // // //   if (loading) return <BikeLoader />;

// // // // //   const weekPlan =
// // // // //     plan?.detailedPlan?.weekPlan ||
// // // // //     plan?.weeklyStructure ||
// // // // //     [];

// // // // //   return (
// // // // //     <>
// // // // //       {actionLoading && <BikeLoader />}

// // // // //       <div className="space-y-8">

// // // // //         {/* ================= HEADER ================= */}

// // // // //         <div className="flex justify-between items-center">
// // // // //           <h1 className="text-2xl font-bold">
// // // // //             Weekly Workout Plan
// // // // //           </h1>

// // // // //           <div className="flex gap-3">
// // // // //             <button
// // // // //               onClick={generateBasePlan}
// // // // //               className="btn-primary"
// // // // //             >
// // // // //               {plan ? "Regenerate Base Plan" : "Generate Base Plan"}
// // // // //             </button>

// // // // //             {plan && (
// // // // //               <button
// // // // //                 onClick={generateAIPlan}
// // // // //                 className="border px-4 py-2 rounded"
// // // // //               >
// // // // //                 Generate AI Plan
// // // // //               </button>
// // // // //             )}
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* ================= READINESS SECTION ================= */}

// // // // //         <div className="card p-6 space-y-4">
// // // // //           <h2 className="font-bold text-lg">
// // // // //             Daily Readiness
// // // // //           </h2>

// // // // //           <div className="grid grid-cols-2 gap-4">

// // // // //             <input
// // // // //               type="number"
// // // // //               placeholder="Sleep Hours"
// // // // //               value={readinessForm.sleepHours}
// // // // //               onChange={(e) =>
// // // // //                 setReadinessForm({
// // // // //                   ...readinessForm,
// // // // //                   sleepHours: e.target.value,
// // // // //                 })
// // // // //               }
// // // // //               className="input-field"
// // // // //             />

// // // // //             <input
// // // // //               type="number"
// // // // //               placeholder="Stress Level (1–5)"
// // // // //               value={readinessForm.stressLevel}
// // // // //               onChange={(e) =>
// // // // //                 setReadinessForm({
// // // // //                   ...readinessForm,
// // // // //                   stressLevel: e.target.value,
// // // // //                 })
// // // // //               }
// // // // //               className="input-field"
// // // // //             />

// // // // //             <input
// // // // //               type="number"
// // // // //               placeholder="Feeling (1–10)"
// // // // //               value={readinessForm.subjectiveFeeling}
// // // // //               onChange={(e) =>
// // // // //                 setReadinessForm({
// // // // //                   ...readinessForm,
// // // // //                   subjectiveFeeling: e.target.value,
// // // // //                 })
// // // // //               }
// // // // //               className="input-field"
// // // // //             />

// // // // //             <input
// // // // //               type="number"
// // // // //               placeholder="Resting HR"
// // // // //               value={readinessForm.restingHeartRate}
// // // // //               onChange={(e) =>
// // // // //                 setReadinessForm({
// // // // //                   ...readinessForm,
// // // // //                   restingHeartRate: e.target.value,
// // // // //                 })
// // // // //               }
// // // // //               className="input-field"
// // // // //             />

// // // // //             <input
// // // // //               type="number"
// // // // //               placeholder="Hydration %"
// // // // //               value={readinessForm.hydrationLevelPercent}
// // // // //               onChange={(e) =>
// // // // //                 setReadinessForm({
// // // // //                   ...readinessForm,
// // // // //                   hydrationLevelPercent: e.target.value,
// // // // //                 })
// // // // //               }
// // // // //               className="input-field col-span-2"
// // // // //             />
// // // // //           </div>

// // // // //           <button
// // // // //             onClick={submitReadiness}
// // // // //             className="btn-primary mt-2"
// // // // //           >
// // // // //             Submit Readiness
// // // // //           </button>
// // // // //         </div>

// // // // //         {/* ================= WEEK PLAN ================= */}

// // // // //         {weekPlan.length === 0 && (
// // // // //           <div className="text-gray-500">
// // // // //             No active plan. Generate one to begin.
// // // // //           </div>
// // // // //         )}

// // // // //         {weekPlan.map((day) => {
// // // // //           const isRest =
// // // // //             day.workoutType === "rest" || day.isRestDay;

// // // // //           return (
// // // // //             <div key={day.day} className="card p-6 space-y-3">

// // // // //               <div className="flex justify-between items-center">
// // // // //                 <h3 className="font-semibold">
// // // // //                   Day {day.day} — {day.workoutType}
// // // // //                 </h3>

// // // // //                 {isRest && (
// // // // //                   <span className="text-gray-400 font-semibold">
// // // // //                     Rest Day
// // // // //                   </span>
// // // // //                 )}
// // // // //               </div>

// // // // //               {day.focus && (
// // // // //                 <p className="text-sm text-gray-500">
// // // // //                   {day.focus}
// // // // //                 </p>
// // // // //               )}

// // // // //               {/* AI Exercises */}
// // // // //               {day.exercises && day.exercises.length > 0 && (
// // // // //                 <div className="space-y-2">
// // // // //                   {day.exercises.map((ex, i) => (
// // // // //                     <div key={i} className="border rounded p-2">
// // // // //                       {ex.name} — {ex.sets} x {ex.reps}
// // // // //                     </div>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>
// // // // //           );
// // // // //         })}
// // // // //       </div>
// // // // //     </>
// // // // //   );
// // // // // }


// // // // import { useEffect, useState } from "react";
// // // // import { planAPI, aiAPI } from "../api/axios";
// // // // import { useAuth } from "../context/AuthContext";
// // // // import BikeLoader from "../components/BikeLoader";

// // // // /* ─────────────────────────────────────────────
// // // //    WORKOUT HEADER
// // // // ───────────────────────────────────────────── */
// // // // function WorkoutHeader({ plan, onGenerateBase, onGenerateAI, actionLoading }) {
// // // //   const meta = plan || {};
// // // //   const dp = meta.detailedPlan || {};

// // // //   const badges = [
// // // //     { label: "Version", value: meta.planVersion ?? "—" },
// // // //     { label: "Generated By", value: meta.generatedBy ?? "—" },
// // // //     { label: "Status", value: meta.status ?? "—" },
// // // //     { label: "Volume", value: meta.baseVolumeLevel ?? "—" },
// // // //     { label: "Intensity", value: meta.baseIntensityLevel ?? "—" },
// // // //     {
// // // //       label: "Workout Days",
// // // //       value: meta.plannedWorkoutDays ?? (meta.weeklyStructure?.filter((d) => !d.isRestDay).length ?? "—"),
// // // //     },
// // // //   ];

// // // //   return (
// // // //     <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/60 shadow-2xl p-8">
// // // //       {/* decorative accent line */}
// // // //       <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

// // // //       <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
// // // //         {/* Left: title + meta */}
// // // //         <div className="space-y-5 flex-1">
// // // //           <div>
// // // //             <p className="text-orange-400 text-xs font-semibold tracking-[0.2em] uppercase mb-1">
// // // //               Training Dashboard
// // // //             </p>
// // // //             <h1 className="text-3xl font-black text-white tracking-tight">
// // // //               Weekly Workout Plan
// // // //             </h1>
// // // //           </div>

// // // //           <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
// // // //             {badges.map((b) => (
// // // //               <div
// // // //                 key={b.label}
// // // //                 className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm"
// // // //               >
// // // //                 <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest mb-0.5">
// // // //                   {b.label}
// // // //                 </p>
// // // //                 <p className="text-white text-sm font-bold capitalize">
// // // //                   {String(b.value)}
// // // //                 </p>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </div>

// // // //         {/* Right: actions */}
// // // //         <div className="flex flex-row lg:flex-col gap-3 shrink-0">
// // // //           <button
// // // //             onClick={onGenerateBase}
// // // //             disabled={actionLoading}
// // // //             className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 active:scale-95 transition-all text-white text-sm font-bold shadow-lg shadow-orange-500/30 disabled:opacity-50 whitespace-nowrap"
// // // //           >
// // // //             {plan ? "Regenerate Base Plan" : "Generate Base Plan"}
// // // //           </button>

// // // //           {plan && (
// // // //             <button
// // // //               onClick={onGenerateAI}
// // // //               disabled={actionLoading}
// // // //               className="px-5 py-3 rounded-xl border border-orange-500/60 hover:bg-orange-500/10 active:scale-95 transition-all text-orange-400 text-sm font-bold disabled:opacity-50 whitespace-nowrap"
// // // //             >
// // // //               Generate AI Plan
// // // //             </button>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // /* ─────────────────────────────────────────────
// // // //    WEEK CALENDAR STRIP
// // // // ───────────────────────────────────────────── */
// // // // function WeekCalendar({ weekPlan, activeDay, onSelectDay }) {
// // // //   const today = new Date().toISOString().split("T")[0];

// // // //   const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// // // //   return (
// // // //     <div className="grid grid-cols-7 gap-2">
// // // //       {weekPlan.map((day, idx) => {
// // // //         const isRest = day.workoutType === "rest" || day.isRestDay;
// // // //         const isToday = idx === new Date().getDay() - 1; // rough heuristic
// // // //         const isActive = activeDay === day.day;

// // // //         return (
// // // //           <button
// // // //             key={day.day}
// // // //             onClick={() => onSelectDay(day.day)}
// // // //             className={`
// // // //               group relative flex flex-col items-center rounded-xl py-4 px-2 border transition-all duration-200
// // // //               ${isActive
// // // //                 ? "bg-orange-500 border-orange-400 shadow-lg shadow-orange-500/30 scale-105"
// // // //                 : isRest
// // // //                   ? "bg-gray-800/60 border-gray-700/40 hover:border-gray-600"
// // // //                   : "bg-gray-800/80 border-gray-700/50 hover:border-orange-500/50 hover:bg-gray-700/80 hover:-translate-y-0.5"
// // // //               }
// // // //             `}
// // // //           >
// // // //             {isToday && !isActive && (
// // // //               <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[9px] font-bold bg-orange-500 text-white px-1.5 rounded-full">
// // // //                 TODAY
// // // //               </span>
// // // //             )}

// // // //             <span className={`text-[10px] font-semibold uppercase tracking-wider mb-1 ${isActive ? "text-white" : "text-gray-400"}`}>
// // // //               {dayNames[idx] ?? `D${day.day}`}
// // // //             </span>

// // // //             <span className={`text-xs font-black ${isActive ? "text-white" : isRest ? "text-gray-600" : "text-white"}`}>
// // // //               {day.day}
// // // //             </span>

// // // //             <span className={`
// // // //               mt-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide truncate max-w-full
// // // //               ${isRest
// // // //                 ? "bg-gray-700 text-gray-500"
// // // //                 : isActive
// // // //                   ? "bg-white/20 text-white"
// // // //                   : "bg-orange-500/20 text-orange-400"
// // // //               }
// // // //             `}>
// // // //               {isRest ? "Rest" : (day.workoutType ?? "Train")}
// // // //             </span>
// // // //           </button>
// // // //         );
// // // //       })}
// // // //     </div>
// // // //   );
// // // // }

// // // // /* ─────────────────────────────────────────────
// // // //    EXERCISE CARD
// // // // ───────────────────────────────────────────── */
// // // // function ExerciseCard({ ex, index }) {
// // // //   const [expanded, setExpanded] = useState(false);

// // // //   const categoryColors = {
// // // //     primary: "bg-orange-500/20 text-orange-400 border-orange-500/30",
// // // //     secondary: "bg-blue-500/20 text-blue-400 border-blue-500/30",
// // // //     accessory: "bg-purple-500/20 text-purple-400 border-purple-500/30",
// // // //   };
// // // //   const catClass = categoryColors[ex.category?.toLowerCase()] ?? "bg-gray-700/50 text-gray-400 border-gray-600/40";

// // // //   return (
// // // //     <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl overflow-hidden transition-all duration-200 hover:border-gray-600">
// // // //       <div className="flex items-start gap-4 p-4">
// // // //         {/* Index bubble */}
// // // //         <div className="shrink-0 w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 text-xs font-black">
// // // //           {index + 1}
// // // //         </div>

// // // //         {/* Left: name + tags */}
// // // //         <div className="flex-1 min-w-0">
// // // //           <p className="text-white font-bold text-sm mb-2">{ex.name}</p>
// // // //           <div className="flex flex-wrap gap-1.5">
// // // //             {ex.category && (
// // // //               <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider ${catClass}`}>
// // // //                 {ex.category}
// // // //               </span>
// // // //             )}
// // // //             {(ex.muscleGroups ?? ex.muscles ?? []).map((m, i) => (
// // // //               <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-700/70 text-gray-300 border border-gray-600/40">
// // // //                 {m}
// // // //               </span>
// // // //             ))}
// // // //           </div>
// // // //         </div>

// // // //         {/* Right: sets/reps/rest */}
// // // //         <div className="shrink-0 text-right space-y-1">
// // // //           <p className="text-white font-black text-sm">
// // // //             {ex.sets} <span className="text-gray-500 font-normal">×</span> {ex.reps}
// // // //           </p>
// // // //           {ex.restSeconds && (
// // // //             <p className="text-gray-400 text-[11px]">{ex.restSeconds}s rest</p>
// // // //           )}
// // // //           {ex.intensityType && (
// // // //             <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-700/70 text-gray-300 border border-gray-600/40">
// // // //               {ex.intensityType}
// // // //             </span>
// // // //           )}
// // // //         </div>
// // // //       </div>

// // // //       {/* Expandable: training effect + adjustments */}
// // // //       {(ex.trainingEffect || ex.adjustmentHints) && (
// // // //         <>
// // // //           <button
// // // //             onClick={() => setExpanded(!expanded)}
// // // //             className="w-full px-4 py-2 border-t border-gray-700/40 text-gray-500 hover:text-gray-300 text-[11px] font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-1"
// // // //           >
// // // //             {expanded ? "Hide" : "Details"}
// // // //             <span className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}>▾</span>
// // // //           </button>

// // // //           {expanded && (
// // // //             <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
// // // //               {ex.trainingEffect && (
// // // //                 <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-700/40 space-y-1.5">
// // // //                   <p className="text-[10px] font-bold uppercase tracking-widest text-orange-400 mb-2">Training Effect</p>
// // // //                   {ex.trainingEffect.primaryEffect && (
// // // //                     <p className="text-gray-300 text-xs"><span className="text-gray-500">Effect: </span>{ex.trainingEffect.primaryEffect}</p>
// // // //                   )}
// // // //                   {ex.trainingEffect.sportRelevance && (
// // // //                     <p className="text-gray-300 text-xs"><span className="text-gray-500">Sport: </span>{ex.trainingEffect.sportRelevance}</p>
// // // //                   )}
// // // //                 </div>
// // // //               )}
// // // //               {ex.adjustmentHints && (
// // // //                 <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-700/40 space-y-1.5">
// // // //                   <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-2">Adjustments</p>
// // // //                   {ex.adjustmentHints.lowReadiness && (
// // // //                     <p className="text-gray-300 text-xs"><span className="text-gray-500">Low: </span>{ex.adjustmentHints.lowReadiness}</p>
// // // //                   )}
// // // //                   {ex.adjustmentHints.highReadiness && (
// // // //                     <p className="text-gray-300 text-xs"><span className="text-gray-500">High: </span>{ex.adjustmentHints.highReadiness}</p>
// // // //                   )}
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           )}
// // // //         </>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // /* ─────────────────────────────────────────────
// // // //    WORKOUT DAY CARD
// // // // ───────────────────────────────────────────── */
// // // // function WorkoutDayCard({ day, isActive }) {
// // // //   const [open, setOpen] = useState(isActive);
// // // //   const isRest = day.workoutType === "rest" || day.isRestDay;

// // // //   if (isRest) {
// // // //     return (
// // // //       <div className="rounded-xl border border-gray-700/30 bg-gray-800/30 p-6 flex items-center justify-center text-center">
// // // //         <div>
// // // //           <div className="text-2xl mb-2">🛌</div>
// // // //           <p className="text-gray-500 font-semibold">Day {day.day} — Rest Day</p>
// // // //           <p className="text-gray-600 text-xs mt-1">Recovery &amp; adaptation</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className={`rounded-xl border transition-all duration-200 overflow-hidden ${isActive ? "border-orange-500/50 bg-gray-800/90" : "border-gray-700/40 bg-gray-800/50"}`}>
// // // //       {/* Day header */}
// // // //       <button
// // // //         onClick={() => setOpen(!open)}
// // // //         className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
// // // //       >
// // // //         <div className="flex items-center gap-4">
// // // //           <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm ${isActive ? "bg-orange-500 text-white" : "bg-gray-700/70 text-gray-300"}`}>
// // // //             {day.day}
// // // //           </div>
// // // //           <div className="text-left">
// // // //             <p className="text-white font-bold capitalize">{day.workoutType}</p>
// // // //             {day.focus && <p className="text-gray-400 text-xs mt-0.5">{day.focus}</p>}
// // // //           </div>
// // // //         </div>

// // // //         <div className="flex items-center gap-3">
// // // //           {day.estimatedDuration && (
// // // //             <span className="text-gray-400 text-xs font-semibold hidden sm:block">
// // // //               ⏱ {day.estimatedDuration}
// // // //             </span>
// // // //           )}
// // // //           <span className={`text-gray-500 text-sm transition-transform duration-200 ${open ? "rotate-180" : ""}`}>▾</span>
// // // //         </div>
// // // //       </button>

// // // //       {/* Exercise list */}
// // // //       {open && day.exercises && day.exercises.length > 0 && (
// // // //         <div className="px-6 pb-6 space-y-3 border-t border-gray-700/30 pt-4">
// // // //           {day.exercises.map((ex, i) => (
// // // //             <ExerciseCard key={i} ex={ex} index={i} />
// // // //           ))}
// // // //         </div>
// // // //       )}

// // // //       {open && (!day.exercises || day.exercises.length === 0) && (
// // // //         <div className="px-6 pb-6 pt-4 border-t border-gray-700/30">
// // // //           <p className="text-gray-500 text-sm text-center">No exercise details. Generate AI Plan for full breakdown.</p>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // /* ─────────────────────────────────────────────
// // // //    GLOBAL NOTES CARD
// // // // ───────────────────────────────────────────── */
// // // // function GlobalNotesCard({ notes }) {
// // // //   if (!notes) return null;

// // // //   return (
// // // //     <div className="rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800/80 to-gray-900/80 overflow-hidden shadow-xl">
// // // //       <div className="px-6 py-4 border-b border-gray-700/40 flex items-center gap-3">
// // // //         <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 text-sm">
// // // //           📋
// // // //         </div>
// // // //         <h2 className="text-white font-black text-lg">Weekly Training Notes</h2>
// // // //       </div>

// // // //       <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
// // // //         {notes.weeklyEmphasis && (
// // // //           <div className="space-y-2">
// // // //             <p className="text-orange-400 text-[10px] font-bold uppercase tracking-widest">Weekly Emphasis</p>
// // // //             <p className="text-gray-300 text-sm leading-relaxed">{notes.weeklyEmphasis}</p>
// // // //           </div>
// // // //         )}

// // // //         {notes.injuryPreventionFocus && (
// // // //           <div className="space-y-2">
// // // //             <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">Injury Prevention</p>
// // // //             <ul className="space-y-1.5">
// // // //               {Array.isArray(notes.injuryPreventionFocus)
// // // //                 ? notes.injuryPreventionFocus.map((item, i) => (
// // // //                     <li key={i} className="text-gray-300 text-sm flex gap-2">
// // // //                       <span className="text-blue-500 mt-0.5 shrink-0">›</span> {item}
// // // //                     </li>
// // // //                   ))
// // // //                 : <p className="text-gray-300 text-sm leading-relaxed">{notes.injuryPreventionFocus}</p>
// // // //               }
// // // //             </ul>
// // // //           </div>
// // // //         )}

// // // //         {notes.progressionLogic && (
// // // //           <div className="lg:col-span-2 pt-4 border-t border-gray-700/40 space-y-2">
// // // //             <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest">Progression Logic</p>
// // // //             <p className="text-gray-300 text-sm leading-relaxed">{notes.progressionLogic}</p>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // /* ─────────────────────────────────────────────
// // // //    MAIN PAGE
// // // // ───────────────────────────────────────────── */
// // // // export default function Workout() {
// // // //   const { user } = useAuth();

// // // //   const [plan, setPlan] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [actionLoading, setActionLoading] = useState(false);
// // // //   const [activeDay, setActiveDay] = useState(1);

// // // //   /* ── fetch active plan ── */
// // // //   const fetchPlan = async () => {
// // // //     try {
// // // //       const res = await planAPI.getActive(user.id);
// // // //       setPlan(res.data?.plan || null);
// // // //     } catch {
// // // //       setPlan(null);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     if (user?.id) fetchPlan();
// // // //   }, [user?.id]);

// // // //   /* ── generate base plan ── */
// // // //   const generateBasePlan = async () => {
// // // //     try {
// // // //       setActionLoading(true);
// // // //       await planAPI.generate(user.id);
// // // //       await fetchPlan();
// // // //     } catch (err) {
// // // //       alert(err.message || "Base plan generation failed");
// // // //     } finally {
// // // //       setActionLoading(false);
// // // //     }
// // // //   };

// // // //   /* ── generate AI plan ── */
// // // //   const generateAIPlan = async () => {
// // // //     try {
// // // //       setActionLoading(true);
// // // //       await aiAPI.generateWeekly(user.id);
// // // //       await fetchPlan();
// // // //     } catch (err) {
// // // //       alert(err.message || "AI plan generation failed");
// // // //     } finally {
// // // //       setActionLoading(false);
// // // //     }
// // // //   };

// // // //   if (loading) return <BikeLoader />;

// // // //   const weekPlan =
// // // //     plan?.detailedPlan?.weekPlan ||
// // // //     plan?.weeklyStructure ||
// // // //     [];

// // // //   const hasDetailedPlan = !!plan?.detailedPlan?.weekPlan;
// // // //   const globalNotes = plan?.detailedPlan?.globalNotes || null;

// // // //   const activeDayData = weekPlan.find((d) => d.day === activeDay);

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-950 text-white">
// // // //       {actionLoading && <BikeLoader />}

// // // //       <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

// // // //         {/* ── HERO HEADER ── */}
// // // //         <WorkoutHeader
// // // //           plan={plan}
// // // //           onGenerateBase={generateBasePlan}
// // // //           onGenerateAI={generateAIPlan}
// // // //           actionLoading={actionLoading}
// // // //         />

// // // //         {/* ── NO PLAN STATE ── */}
// // // //         {weekPlan.length === 0 && (
// // // //           <div className="rounded-2xl border border-dashed border-gray-700 bg-gray-800/30 py-20 flex flex-col items-center justify-center gap-4 text-center">
// // // //             <div className="text-5xl">🏋️</div>
// // // //             <p className="text-white font-bold text-xl">No active plan yet.</p>
// // // //             <p className="text-gray-400 text-sm max-w-xs">Generate a base plan to start training. Then use AI Plan for detailed exercise breakdowns.</p>
// // // //             <button
// // // //               onClick={generateBasePlan}
// // // //               disabled={actionLoading}
// // // //               className="mt-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm shadow-lg shadow-orange-500/30 transition-all active:scale-95 disabled:opacity-50"
// // // //             >
// // // //               Generate Base Plan
// // // //             </button>
// // // //           </div>
// // // //         )}

// // // //         {weekPlan.length > 0 && (
// // // //           <>
// // // //             {/* ── WEEK CALENDAR STRIP ── */}
// // // //             <div className="space-y-3">
// // // //               <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">This Week</p>
// // // //               <WeekCalendar
// // // //                 weekPlan={weekPlan}
// // // //                 activeDay={activeDay}
// // // //                 onSelectDay={setActiveDay}
// // // //               />
// // // //             </div>

// // // //             {/* ── AI PLAN PROMPT ── */}
// // // //             {!hasDetailedPlan && (
// // // //               <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
// // // //                 <div>
// // // //                   <p className="text-orange-300 font-bold text-sm">AI Detailed Plan Not Generated Yet</p>
// // // //                   <p className="text-gray-400 text-xs mt-0.5">Generate an AI plan to unlock exercise breakdowns, muscle targeting, and progression logic.</p>
// // // //                 </div>
// // // //                 <button
// // // //                   onClick={generateAIPlan}
// // // //                   disabled={actionLoading}
// // // //                   className="shrink-0 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold shadow-lg shadow-orange-500/30 transition-all active:scale-95 disabled:opacity-50"
// // // //                 >
// // // //                   Generate AI Plan
// // // //                 </button>
// // // //               </div>
// // // //             )}

// // // //             {/* ── WORKOUT DAYS ── */}
// // // //             <div className="space-y-3">
// // // //               <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Workout Schedule</p>
// // // //               <div className="space-y-3">
// // // //                 {weekPlan.map((day) => (
// // // //                   <WorkoutDayCard
// // // //                     key={day.day}
// // // //                     day={day}
// // // //                     isActive={day.day === activeDay}
// // // //                   />
// // // //                 ))}
// // // //               </div>
// // // //             </div>

// // // //             {/* ── GLOBAL NOTES ── */}
// // // //             {globalNotes && (
// // // //               <div className="space-y-3">
// // // //                 <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Coach's Notes</p>
// // // //                 <GlobalNotesCard notes={globalNotes} />
// // // //               </div>
// // // //             )}
// // // //           </>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // import { useEffect, useState } from "react";
// // // import { planAPI, aiAPI } from "../api/axios";
// // // import { useAuth } from "../context/AuthContext";
// // // import BikeLoader from "../components/BikeLoader";

// // // /* ─────────────────────────────────────────────
// // //    WORKOUT HEADER
// // // ───────────────────────────────────────────── */
// // // function WorkoutHeader({ plan, onGenerateBase, onGenerateAI, actionLoading }) {
// // //   const meta = plan || {};
// // //   const dp = meta.detailedPlan || {};

// // //   const badges = [
// // //     { label: "Version", value: meta.planVersion ?? "—" },
// // //     { label: "Generated By", value: meta.generatedBy ?? "—" },
// // //     { label: "Status", value: meta.status ?? "—" },
// // //     { label: "Volume", value: meta.baseVolumeLevel ?? "—" },
// // //     { label: "Intensity", value: meta.baseIntensityLevel ?? "—" },
// // //     {
// // //       label: "Workout Days",
// // //       value: meta.plannedWorkoutDays ?? (meta.weeklyStructure?.filter((d) => !d.isRestDay).length ?? "—"),
// // //     },
// // //   ];

// // //   return (
// // //     <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border-soft)] shadow-lg p-8"
// // //       style={{ background: "var(--color-bg-soft)" }}>
// // //       {/* decorative accent line */}
// // //       <div className="absolute top-0 left-0 right-0 h-[3px]"
// // //         style={{ background: "linear-gradient(to right, transparent, var(--color-primary), transparent)" }} />

// // //       <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
// // //         {/* Left: title + meta */}
// // //         <div className="space-y-5 flex-1">
// // //           <div>
// // //             <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-1"
// // //               style={{ color: "var(--color-primary)" }}>
// // //               Training Dashboard
// // //             </p>
// // //             <h1 className="text-3xl font-black tracking-tight"
// // //               style={{ color: "var(--color-text-main)" }}>
// // //               Weekly Workout Plan
// // //             </h1>
// // //           </div>

// // //           <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
// // //             {badges.map((b) => (
// // //               <div
// // //                 key={b.label}
// // //                 className="rounded-xl px-4 py-3 border"
// // //                 style={{
// // //                   background: "var(--color-bg-main)",
// // //                   borderColor: "var(--color-border-soft)",
// // //                 }}
// // //               >
// // //                 <p className="text-[10px] font-semibold uppercase tracking-widest mb-0.5"
// // //                   style={{ color: "var(--color-text-muted)" }}>
// // //                   {b.label}
// // //                 </p>
// // //                 <p className="text-sm font-bold capitalize"
// // //                   style={{ color: "var(--color-text-main)" }}>
// // //                   {String(b.value)}
// // //                 </p>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         {/* Right: actions */}
// // //         <div className="flex flex-row lg:flex-col gap-3 shrink-0">
// // //           <button
// // //             onClick={onGenerateBase}
// // //             disabled={actionLoading}
// // //             className="btn-primary px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap disabled:opacity-50 active:scale-95 transition-all"
// // //           >
// // //             {plan ? "Regenerate Base Plan" : "Generate Base Plan"}
// // //           </button>

// // //           {plan && (
// // //             <button
// // //               onClick={onGenerateAI}
// // //               disabled={actionLoading}
// // //               className="btn-outline px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap disabled:opacity-50 active:scale-95 transition-all"
// // //               style={{ color: "var(--color-primary)", borderColor: "var(--color-primary)" }}
// // //             >
// // //               Generate AI Plan
// // //             </button>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* ─────────────────────────────────────────────
// // //    WEEK CALENDAR STRIP
// // // ───────────────────────────────────────────── */
// // // function WeekCalendar({ weekPlan, activeDay, onSelectDay }) {
// // //   const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// // //   return (
// // //     <div className="grid grid-cols-7 gap-2">
// // //       {weekPlan.map((day, idx) => {
// // //         const isRest = day.workoutType === "rest" || day.isRestDay;
// // //         const isToday = idx === new Date().getDay() - 1;
// // //         const isActive = activeDay === day.day;

// // //         return (
// // //           <button
// // //             key={day.day}
// // //             onClick={() => onSelectDay(day.day)}
// // //             className="group relative flex flex-col items-center rounded-xl py-4 px-2 border transition-all duration-200"
// // //             style={{
// // //               background: isActive
// // //                 ? "var(--color-primary)"
// // //                 : isRest
// // //                   ? "var(--color-bg-main)"
// // //                   : "var(--color-bg-soft)",
// // //               borderColor: isActive
// // //                 ? "var(--color-primary)"
// // //                 : "var(--color-border-soft)",
// // //               transform: isActive ? "scale(1.05)" : undefined,
// // //               boxShadow: isActive ? "0 6px 16px rgba(255,106,0,0.25)" : undefined,
// // //             }}
// // //           >
// // //             {isToday && !isActive && (
// // //               <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[9px] font-bold px-1.5 rounded-full text-white"
// // //                 style={{ background: "var(--color-primary)" }}>
// // //                 TODAY
// // //               </span>
// // //             )}

// // //             <span className="text-[10px] font-semibold uppercase tracking-wider mb-1"
// // //               style={{ color: isActive ? "white" : "var(--color-text-muted)" }}>
// // //               {dayNames[idx] ?? `D${day.day}`}
// // //             </span>

// // //             <span className="text-xs font-black"
// // //               style={{ color: isActive ? "white" : isRest ? "var(--color-text-muted)" : "var(--color-text-main)" }}>
// // //               {day.day}
// // //             </span>

// // //             <span className="mt-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide truncate max-w-full border"
// // //               style={{
// // //                 background: isRest
// // //                   ? "var(--color-bg-main)"
// // //                   : isActive
// // //                     ? "rgba(255,255,255,0.2)"
// // //                     : "rgba(255,106,0,0.1)",
// // //                 color: isRest
// // //                   ? "var(--color-text-muted)"
// // //                   : isActive
// // //                     ? "white"
// // //                     : "var(--color-primary)",
// // //                 borderColor: isRest
// // //                   ? "var(--color-border-soft)"
// // //                   : isActive
// // //                     ? "rgba(255,255,255,0.3)"
// // //                     : "rgba(255,106,0,0.3)",
// // //               }}>
// // //               {isRest ? "Rest" : (day.workoutType ?? "Train")}
// // //             </span>
// // //           </button>
// // //         );
// // //       })}
// // //     </div>
// // //   );
// // // }

// // // /* ─────────────────────────────────────────────
// // //    EXERCISE CARD
// // // ───────────────────────────────────────────── */
// // // function ExerciseCard({ ex, index }) {
// // //   const [expanded, setExpanded] = useState(false);

// // //   const categoryColors = {
// // //     primary: { bg: "rgba(255,106,0,0.1)", color: "var(--color-primary)", border: "rgba(255,106,0,0.3)" },
// // //     secondary: { bg: "rgba(59,130,246,0.1)", color: "#3b82f6", border: "rgba(59,130,246,0.3)" },
// // //     accessory: { bg: "rgba(168,85,247,0.1)", color: "#a855f7", border: "rgba(168,85,247,0.3)" },
// // //   };
// // //   const cat = categoryColors[ex.category?.toLowerCase()] ?? {
// // //     bg: "var(--color-bg-main)", color: "var(--color-text-muted)", border: "var(--color-border-soft)",
// // //   };

// // //   return (
// // //     <div className="rounded-xl overflow-hidden transition-all duration-200 border"
// // //       style={{ background: "var(--color-bg-main)", borderColor: "var(--color-border-soft)" }}>
// // //       <div className="flex items-start gap-4 p-4">
// // //         {/* Index bubble */}
// // //         <div className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black border"
// // //           style={{ background: "rgba(255,106,0,0.1)", borderColor: "rgba(255,106,0,0.2)", color: "var(--color-primary)" }}>
// // //           {index + 1}
// // //         </div>

// // //         {/* Left: name + tags */}
// // //         <div className="flex-1 min-w-0">
// // //           <p className="font-bold text-sm mb-2" style={{ color: "var(--color-text-main)" }}>{ex.name}</p>
// // //           <div className="flex flex-wrap gap-1.5">
// // //             {ex.category && (
// // //               <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider"
// // //                 style={{ background: cat.bg, color: cat.color, borderColor: cat.border }}>
// // //                 {ex.category}
// // //               </span>
// // //             )}
// // //             {(ex.muscleGroups ?? ex.muscles ?? []).map((m, i) => (
// // //               <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-full border"
// // //                 style={{ background: "var(--color-bg-soft)", color: "var(--color-text-secondary)", borderColor: "var(--color-border-soft)" }}>
// // //                 {m}
// // //               </span>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         {/* Right: sets/reps/rest */}
// // //         <div className="shrink-0 text-right space-y-1">
// // //           <p className="font-black text-sm" style={{ color: "var(--color-text-main)" }}>
// // //             {ex.sets} <span style={{ color: "var(--color-text-muted)" }}>×</span> {ex.reps}
// // //           </p>
// // //           {ex.restSeconds && (
// // //             <p className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>{ex.restSeconds}s rest</p>
// // //           )}
// // //           {ex.intensityType && (
// // //             <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border"
// // //               style={{ background: "var(--color-bg-soft)", color: "var(--color-text-secondary)", borderColor: "var(--color-border-soft)" }}>
// // //               {ex.intensityType}
// // //             </span>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* Expandable: training effect + adjustments */}
// // //       {(ex.trainingEffect || ex.adjustmentHints) && (
// // //         <>
// // //           <button
// // //             onClick={() => setExpanded(!expanded)}
// // //             className="w-full px-4 py-2 border-t text-[11px] font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-1"
// // //             style={{ borderColor: "var(--color-border-soft)", color: "var(--color-text-muted)" }}
// // //           >
// // //             {expanded ? "Hide" : "Details"}
// // //             <span className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}>▾</span>
// // //           </button>

// // //           {expanded && (
// // //             <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
// // //               {ex.trainingEffect && (
// // //                 <div className="rounded-lg p-3 border space-y-1.5"
// // //                   style={{ background: "var(--color-bg-soft)", borderColor: "var(--color-border-soft)" }}>
// // //                   <p className="text-[10px] font-bold uppercase tracking-widest mb-2"
// // //                     style={{ color: "var(--color-primary)" }}>Training Effect</p>
// // //                   {ex.trainingEffect.primaryEffect && (
// // //                     <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
// // //                       <span style={{ color: "var(--color-text-muted)" }}>Effect: </span>{ex.trainingEffect.primaryEffect}
// // //                     </p>
// // //                   )}
// // //                   {ex.trainingEffect.sportRelevance && (
// // //                     <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
// // //                       <span style={{ color: "var(--color-text-muted)" }}>Sport: </span>{ex.trainingEffect.sportRelevance}
// // //                     </p>
// // //                   )}
// // //                 </div>
// // //               )}
// // //               {ex.adjustmentHints && (
// // //                 <div className="rounded-lg p-3 border space-y-1.5"
// // //                   style={{ background: "var(--color-bg-soft)", borderColor: "var(--color-border-soft)" }}>
// // //                   <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "#3b82f6" }}>Adjustments</p>
// // //                   {ex.adjustmentHints.lowReadiness && (
// // //                     <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
// // //                       <span style={{ color: "var(--color-text-muted)" }}>Low: </span>{ex.adjustmentHints.lowReadiness}
// // //                     </p>
// // //                   )}
// // //                   {ex.adjustmentHints.highReadiness && (
// // //                     <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
// // //                       <span style={{ color: "var(--color-text-muted)" }}>High: </span>{ex.adjustmentHints.highReadiness}
// // //                     </p>
// // //                   )}
// // //                 </div>
// // //               )}
// // //             </div>
// // //           )}
// // //         </>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // /* ─────────────────────────────────────────────
// // //    WORKOUT DAY CARD
// // // ───────────────────────────────────────────── */
// // // function WorkoutDayCard({ day, isActive }) {
// // //   const [open, setOpen] = useState(isActive);
// // //   const isRest = day.workoutType === "rest" || day.isRestDay;

// // //   if (isRest) {
// // //     return (
// // //       <div className="rounded-xl border p-6 flex items-center justify-center text-center"
// // //         style={{ background: "var(--color-bg-main)", borderColor: "var(--color-border-soft)" }}>
// // //         <div>
// // //           <div className="text-2xl mb-2">🛌</div>
// // //           <p className="font-semibold" style={{ color: "var(--color-text-muted)" }}>Day {day.day} — Rest Day</p>
// // //           <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>Recovery &amp; adaptation</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="rounded-xl border transition-all duration-200 overflow-hidden"
// // //       style={{
// // //         background: "var(--color-bg-soft)",
// // //         borderColor: isActive ? "var(--color-primary)" : "var(--color-border-soft)",
// // //         boxShadow: isActive ? "0 4px 14px rgba(255,106,0,0.12)" : undefined,
// // //       }}>
// // //       {/* Day header */}
// // //       <button
// // //         onClick={() => setOpen(!open)}
// // //         className="w-full flex items-center justify-between px-6 py-4 transition-colors"
// // //         style={{ background: "transparent" }}
// // //         onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.02)"}
// // //         onMouseLeave={e => e.currentTarget.style.background = "transparent"}
// // //       >
// // //         <div className="flex items-center gap-4">
// // //           <div className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm"
// // //             style={{
// // //               background: isActive ? "var(--color-primary)" : "var(--color-bg-main)",
// // //               color: isActive ? "white" : "var(--color-text-secondary)",
// // //             }}>
// // //             {day.day}
// // //           </div>
// // //           <div className="text-left">
// // //             <p className="font-bold capitalize" style={{ color: "var(--color-text-main)" }}>{day.workoutType}</p>
// // //             {day.focus && <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>{day.focus}</p>}
// // //           </div>
// // //         </div>

// // //         <div className="flex items-center gap-3">
// // //           {day.estimatedDuration && (
// // //             <span className="text-xs font-semibold hidden sm:block" style={{ color: "var(--color-text-muted)" }}>
// // //               ⏱ {day.estimatedDuration}
// // //             </span>
// // //           )}
// // //           <span className={`text-sm transition-transform duration-200 ${open ? "rotate-180" : ""}`}
// // //             style={{ color: "var(--color-text-muted)" }}>▾</span>
// // //         </div>
// // //       </button>

// // //       {/* Exercise list */}
// // //       {open && day.exercises && day.exercises.length > 0 && (
// // //         <div className="px-6 pb-6 space-y-3 border-t pt-4"
// // //           style={{ borderColor: "var(--color-border-soft)" }}>
// // //           {day.exercises.map((ex, i) => (
// // //             <ExerciseCard key={i} ex={ex} index={i} />
// // //           ))}
// // //         </div>
// // //       )}

// // //       {open && (!day.exercises || day.exercises.length === 0) && (
// // //         <div className="px-6 pb-6 pt-4 border-t" style={{ borderColor: "var(--color-border-soft)" }}>
// // //           <p className="text-sm text-center" style={{ color: "var(--color-text-muted)" }}>
// // //             No exercise details. Generate AI Plan for full breakdown.
// // //           </p>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // /* ─────────────────────────────────────────────
// // //    GLOBAL NOTES CARD
// // // ───────────────────────────────────────────── */
// // // function GlobalNotesCard({ notes }) {
// // //   if (!notes) return null;

// // //   return (
// // //     <div className="rounded-2xl border overflow-hidden shadow-md"
// // //       style={{ background: "var(--color-bg-soft)", borderColor: "var(--color-border-soft)" }}>
// // //       <div className="px-6 py-4 border-b flex items-center gap-3"
// // //         style={{ borderColor: "var(--color-border-soft)" }}>
// // //         <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm border"
// // //           style={{ background: "rgba(255,106,0,0.1)", borderColor: "rgba(255,106,0,0.2)" }}>
// // //           📋
// // //         </div>
// // //         <h2 className="font-black text-lg" style={{ color: "var(--color-text-main)" }}>Weekly Training Notes</h2>
// // //       </div>

// // //       <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //         {notes.weeklyEmphasis && (
// // //           <div className="space-y-2">
// // //             <p className="text-[10px] font-bold uppercase tracking-widest"
// // //               style={{ color: "var(--color-primary)" }}>Weekly Emphasis</p>
// // //             <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{notes.weeklyEmphasis}</p>
// // //           </div>
// // //         )}

// // //         {notes.injuryPreventionFocus && (
// // //           <div className="space-y-2">
// // //             <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#3b82f6" }}>Injury Prevention</p>
// // //             <ul className="space-y-1.5">
// // //               {Array.isArray(notes.injuryPreventionFocus)
// // //                 ? notes.injuryPreventionFocus.map((item, i) => (
// // //                     <li key={i} className="text-sm flex gap-2" style={{ color: "var(--color-text-secondary)" }}>
// // //                       <span style={{ color: "var(--color-primary)", marginTop: "2px" }} className="shrink-0">›</span> {item}
// // //                     </li>
// // //                   ))
// // //                 : <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{notes.injuryPreventionFocus}</p>
// // //               }
// // //             </ul>
// // //           </div>
// // //         )}

// // //         {notes.progressionLogic && (
// // //           <div className="lg:col-span-2 pt-4 border-t space-y-2"
// // //             style={{ borderColor: "var(--color-border-soft)" }}>
// // //             <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#a855f7" }}>Progression Logic</p>
// // //             <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{notes.progressionLogic}</p>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* ─────────────────────────────────────────────
// // //    MAIN PAGE
// // // ───────────────────────────────────────────── */
// // // export default function Workout() {
// // //   const { user } = useAuth();

// // //   const [plan, setPlan] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [actionLoading, setActionLoading] = useState(false);
// // //   const [activeDay, setActiveDay] = useState(1);

// // //   /* ── fetch active plan ── */
// // //   const fetchPlan = async () => {
// // //     try {
// // //       const res = await planAPI.getActive(user.id);
// // //       setPlan(res.data?.plan || null);
// // //     } catch {
// // //       setPlan(null);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     if (user?.id) fetchPlan();
// // //   }, [user?.id]);

// // //   /* ── generate base plan ── */
// // //   const generateBasePlan = async () => {
// // //     try {
// // //       setActionLoading(true);
// // //       await planAPI.generate(user.id);
// // //       await fetchPlan();
// // //     } catch (err) {
// // //       alert(err.message || "Base plan generation failed");
// // //     } finally {
// // //       setActionLoading(false);
// // //     }
// // //   };

// // //   /* ── generate AI plan ── */
// // //   const generateAIPlan = async () => {
// // //     try {
// // //       setActionLoading(true);
// // //       await aiAPI.generateWeekly(user.id);
// // //       await fetchPlan();
// // //     } catch (err) {
// // //       alert(err.message || "AI plan generation failed");
// // //     } finally {
// // //       setActionLoading(false);
// // //     }
// // //   };

// // //   if (loading) return <BikeLoader />;

// // //   const weekPlan =
// // //     plan?.detailedPlan?.weekPlan ||
// // //     plan?.weeklyStructure ||
// // //     [];

// // //   const hasDetailedPlan = !!plan?.detailedPlan?.weekPlan;
// // //   const globalNotes = plan?.detailedPlan?.globalNotes || null;

// // //   const activeDayData = weekPlan.find((d) => d.day === activeDay);

// // //   return (
// // //     <div className="min-h-screen" style={{ background: "var(--color-bg-main)", color: "var(--color-text-main)" }}>
// // //       {actionLoading && <BikeLoader />}

// // //       <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

// // //         {/* ── HERO HEADER ── */}
// // //         <WorkoutHeader
// // //           plan={plan}
// // //           onGenerateBase={generateBasePlan}
// // //           onGenerateAI={generateAIPlan}
// // //           actionLoading={actionLoading}
// // //         />

// // //         {/* ── NO PLAN STATE ── */}
// // //         {weekPlan.length === 0 && (
// // //           <div className="rounded-2xl border border-dashed py-20 flex flex-col items-center justify-center gap-4 text-center"
// // //             style={{ background: "var(--color-bg-soft)", borderColor: "var(--color-border-soft)" }}>
// // //             <div className="text-5xl">🏋️</div>
// // //             <p className="font-bold text-xl" style={{ color: "var(--color-text-main)" }}>No active plan yet.</p>
// // //             <p className="text-sm max-w-xs" style={{ color: "var(--color-text-muted)" }}>
// // //               Generate a base plan to start training. Then use AI Plan for detailed exercise breakdowns.
// // //             </p>
// // //             <button
// // //               onClick={generateBasePlan}
// // //               disabled={actionLoading}
// // //               className="btn-primary mt-2 px-6 py-3 rounded-xl text-sm font-bold transition-all active:scale-95 disabled:opacity-50"
// // //             >
// // //               Generate Base Plan
// // //             </button>
// // //           </div>
// // //         )}

// // //         {weekPlan.length > 0 && (
// // //           <>
// // //             {/* ── WEEK CALENDAR STRIP ── */}
// // //             <div className="space-y-3">
// // //               <p className="text-xs font-semibold uppercase tracking-widest"
// // //                 style={{ color: "var(--color-text-muted)" }}>This Week</p>
// // //               <WeekCalendar
// // //                 weekPlan={weekPlan}
// // //                 activeDay={activeDay}
// // //                 onSelectDay={setActiveDay}
// // //               />
// // //             </div>

// // //             {/* ── AI PLAN PROMPT ── */}
// // //             {!hasDetailedPlan && (
// // //               <div className="rounded-xl border px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
// // //                 style={{
// // //                   background: "rgba(255,106,0,0.04)",
// // //                   borderColor: "rgba(255,106,0,0.25)",
// // //                 }}>
// // //                 <div>
// // //                   <p className="font-bold text-sm" style={{ color: "var(--color-primary)" }}>
// // //                     AI Detailed Plan Not Generated Yet
// // //                   </p>
// // //                   <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
// // //                     Generate an AI plan to unlock exercise breakdowns, muscle targeting, and progression logic.
// // //                   </p>
// // //                 </div>
// // //                 <button
// // //                   onClick={generateAIPlan}
// // //                   disabled={actionLoading}
// // //                   className="btn-primary shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 disabled:opacity-50"
// // //                 >
// // //                   Generate AI Plan
// // //                 </button>
// // //               </div>
// // //             )}

// // //             {/* ── WORKOUT DAYS ── */}
// // //             <div className="space-y-3">
// // //               <p className="text-xs font-semibold uppercase tracking-widest"
// // //                 style={{ color: "var(--color-text-muted)" }}>Workout Schedule</p>
// // //               <div className="space-y-3">
// // //                 {weekPlan.map((day) => (
// // //                   <WorkoutDayCard
// // //                     key={day.day}
// // //                     day={day}
// // //                     isActive={day.day === activeDay}
// // //                   />
// // //                 ))}
// // //               </div>
// // //             </div>

// // //             {/* ── GLOBAL NOTES ── */}
// // //             {globalNotes && (
// // //               <div className="space-y-3">
// // //                 <p className="text-xs font-semibold uppercase tracking-widest"
// // //                   style={{ color: "var(--color-text-muted)" }}>Coach's Notes</p>
// // //                 <GlobalNotesCard notes={globalNotes} />
// // //               </div>
// // //             )}
// // //           </>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import { useEffect, useState } from "react";
// // import { planAPI, aiAPI } from "../api/axios";
// // import { useAuth } from "../context/AuthContext";
// // import BikeLoader from "../components/BikeLoader";

// // const workoutStyles = `
// //   .epa-workout-root {
// //     min-height: 100vh;
// //     background: #111111;
// //     color: #E8E6E3;
// //     font-family: 'DM Sans', system-ui, sans-serif;
// //   }

// //   .epa-workout-container {
// //     max-width: 1100px;
// //     margin: 0 auto;
// //     padding: 56px 32px 100px;
// //     display: flex;
// //     flex-direction: column;
// //     gap: 40px;
// //   }

// //   /* ── Header Card ── */
// //   .epa-workout-header {
// //     background: #1C1C1C;
// //     border: 1px solid rgba(198,167,94,0.15);
// //     border-top: 2px solid rgba(198,167,94,0.7);
// //     border-radius: 8px;
// //     padding: 36px;
// //   }

// //   .epa-workout-header-inner {
// //     display: flex;
// //     flex-direction: column;
// //     gap: 28px;
// //   }

// //   @media (min-width: 900px) {
// //     .epa-workout-header-inner {
// //       flex-direction: row;
// //       align-items: flex-start;
// //       justify-content: space-between;
// //     }
// //   }

// //   .epa-workout-title-block { flex: 1; }

// //   .epa-workout-eyebrow {
// //     font-size: 10px;
// //     font-weight: 600;
// //     letter-spacing: 0.18em;
// //     text-transform: uppercase;
// //     color: #C6A75E;
// //     margin-bottom: 10px;
// //   }

// //   .epa-workout-title {
// //     font-family: 'Cormorant Garamond', Georgia, serif;
// //     font-size: 2.2rem;
// //     font-weight: 600;
// //     color: #E8E6E3;
// //     letter-spacing: -0.01em;
// //     margin-bottom: 24px;
// //     line-height: 1.1;
// //   }

// //   .epa-badge-grid {
// //     display: grid;
// //     grid-template-columns: repeat(3, 1fr);
// //     gap: 12px;
// //   }

// //   @media (max-width: 600px) {
// //     .epa-badge-grid { grid-template-columns: repeat(2, 1fr); }
// //   }

// //   .epa-badge {
// //     background: #111111;
// //     border: 1px solid rgba(198,167,94,0.15);
// //     border-radius: 8px;
// //     padding: 14px 16px;
// //   }

// //   .epa-badge-label {
// //     font-size: 9px;
// //     font-weight: 600;
// //     letter-spacing: 0.16em;
// //     text-transform: uppercase;
// //     color: #A1A1A1;
// //     margin-bottom: 6px;
// //   }

// //   .epa-badge-value {
// //     font-size: 0.875rem;
// //     font-weight: 600;
// //     color: #E8E6E3;
// //     text-transform: capitalize;
// //   }

// //   .epa-header-actions {
// //     display: flex;
// //     flex-direction: row;
// //     gap: 12px;
// //     flex-shrink: 0;
// //     align-items: flex-start;
// //   }

// //   @media (min-width: 900px) {
// //     .epa-header-actions { flex-direction: column; }
// //   }

// //   /* ── Buttons ── */
// //   .epa-btn-gold {
// //     background: #C6A75E;
// //     color: #111111;
// //     border: none;
// //     border-radius: 8px;
// //     padding: 12px 24px;
// //     font-family: 'DM Sans', sans-serif;
// //     font-size: 11px;
// //     font-weight: 600;
// //     letter-spacing: 0.1em;
// //     text-transform: uppercase;
// //     cursor: pointer;
// //     white-space: nowrap;
// //     transition: background 0.2s ease;
// //   }
// //   .epa-btn-gold:hover { background: #b8954f; }
// //   .epa-btn-gold:disabled { opacity: 0.45; cursor: not-allowed; }

// //   .epa-btn-outline {
// //     background: transparent;
// //     color: #C6A75E;
// //     border: 1px solid rgba(198,167,94,0.45);
// //     border-radius: 8px;
// //     padding: 11px 24px;
// //     font-family: 'DM Sans', sans-serif;
// //     font-size: 11px;
// //     font-weight: 600;
// //     letter-spacing: 0.1em;
// //     text-transform: uppercase;
// //     cursor: pointer;
// //     white-space: nowrap;
// //     transition: border-color 0.2s ease, background 0.2s ease;
// //   }
// //   .epa-btn-outline:hover {
// //     border-color: rgba(198,167,94,0.85);
// //     background: rgba(198,167,94,0.05);
// //   }
// //   .epa-btn-outline:disabled { opacity: 0.45; cursor: not-allowed; }

// //   /* ── Section labels ── */
// //   .epa-section-label {
// //     font-size: 9px;
// //     font-weight: 600;
// //     letter-spacing: 0.2em;
// //     text-transform: uppercase;
// //     color: #A1A1A1;
// //     margin-bottom: 16px;
// //   }

// //   /* ── Week calendar ── */
// //   .epa-week-grid {
// //     display: grid;
// //     grid-template-columns: repeat(7, 1fr);
// //     gap: 8px;
// //   }

// //   .epa-day-btn {
// //     display: flex;
// //     flex-direction: column;
// //     align-items: center;
// //     gap: 6px;
// //     padding: 14px 6px;
// //     border-radius: 8px;
// //     border: 1px solid rgba(198,167,94,0.15);
// //     background: #1C1C1C;
// //     cursor: pointer;
// //     position: relative;
// //     transition: border-color 0.2s ease, background 0.2s ease, transform 0.15s ease;
// //   }

// //   .epa-day-btn:hover {
// //     border-color: rgba(198,167,94,0.4);
// //   }

// //   .epa-day-btn.active {
// //     background: #C6A75E;
// //     border-color: #C6A75E;
// //     transform: translateY(-2px);
// //   }

// //   .epa-day-btn.rest {
// //     background: #111111;
// //     border-color: rgba(198,167,94,0.08);
// //   }

// //   .epa-day-name {
// //     font-size: 9px;
// //     font-weight: 600;
// //     letter-spacing: 0.12em;
// //     text-transform: uppercase;
// //     color: #A1A1A1;
// //   }

// //   .epa-day-btn.active .epa-day-name { color: #111111; }

// //   .epa-day-num {
// //     font-size: 13px;
// //     font-weight: 700;
// //     color: #E8E6E3;
// //   }

// //   .epa-day-btn.active .epa-day-num { color: #111111; }
// //   .epa-day-btn.rest .epa-day-num { color: #A1A1A1; }

// //   .epa-day-type {
// //     font-size: 8px;
// //     font-weight: 600;
// //     letter-spacing: 0.1em;
// //     text-transform: uppercase;
// //     padding: 2px 6px;
// //     border-radius: 4px;
// //     border: 1px solid rgba(198,167,94,0.2);
// //     color: #C6A75E;
// //     background: rgba(198,167,94,0.08);
// //     max-width: 100%;
// //     overflow: hidden;
// //     text-overflow: ellipsis;
// //     white-space: nowrap;
// //   }

// //   .epa-day-btn.active .epa-day-type {
// //     background: rgba(0,0,0,0.2);
// //     border-color: rgba(0,0,0,0.2);
// //     color: #111111;
// //   }

// //   .epa-day-btn.rest .epa-day-type {
// //     color: #A1A1A1;
// //     background: transparent;
// //     border-color: rgba(198,167,94,0.1);
// //   }

// //   .epa-today-pip {
// //     position: absolute;
// //     top: -5px;
// //     left: 50%;
// //     transform: translateX(-50%);
// //     background: #C6A75E;
// //     color: #111111;
// //     font-size: 7px;
// //     font-weight: 700;
// //     letter-spacing: 0.1em;
// //     text-transform: uppercase;
// //     padding: 1px 5px;
// //     border-radius: 3px;
// //   }

// //   /* ── AI prompt banner ── */
// //   .epa-ai-banner {
// //     background: rgba(14,59,50,0.25);
// //     border: 1px solid rgba(46,139,106,0.25);
// //     border-radius: 8px;
// //     padding: 20px 24px;
// //     display: flex;
// //     align-items: center;
// //     justify-content: space-between;
// //     gap: 16px;
// //   }

// //   .epa-ai-banner-title {
// //     font-size: 12px;
// //     font-weight: 600;
// //     letter-spacing: 0.05em;
// //     color: #2E8B6A;
// //     margin-bottom: 4px;
// //   }

// //   .epa-ai-banner-sub {
// //     font-size: 11px;
// //     color: #A1A1A1;
// //   }

// //   /* ── Day card ── */
// //   .epa-day-card {
// //     background: #1C1C1C;
// //     border: 1px solid rgba(198,167,94,0.15);
// //     border-radius: 8px;
// //     overflow: hidden;
// //     transition: border-color 0.2s ease;
// //   }

// //   .epa-day-card.active {
// //     border-color: rgba(198,167,94,0.5);
// //   }

// //   .epa-day-card-header {
// //     width: 100%;
// //     display: flex;
// //     align-items: center;
// //     justify-content: space-between;
// //     padding: 18px 24px;
// //     background: transparent;
// //     border: none;
// //     cursor: pointer;
// //     transition: background 0.2s ease;
// //   }

// //   .epa-day-card-header:hover { background: rgba(198,167,94,0.03); }

// //   .epa-day-card-num {
// //     width: 36px;
// //     height: 36px;
// //     border-radius: 8px;
// //     display: flex;
// //     align-items: center;
// //     justify-content: center;
// //     font-size: 13px;
// //     font-weight: 700;
// //     background: #111111;
// //     color: #A1A1A1;
// //     border: 1px solid rgba(198,167,94,0.15);
// //     flex-shrink: 0;
// //   }

// //   .epa-day-card.active .epa-day-card-num {
// //     background: #C6A75E;
// //     color: #111111;
// //     border-color: #C6A75E;
// //   }

// //   .epa-day-card-title {
// //     font-family: 'Cormorant Garamond', Georgia, serif;
// //     font-size: 1.1rem;
// //     font-weight: 600;
// //     color: #E8E6E3;
// //     text-transform: capitalize;
// //   }

// //   .epa-day-card-focus {
// //     font-size: 11px;
// //     color: #A1A1A1;
// //     margin-top: 2px;
// //   }

// //   .epa-day-card-duration {
// //     font-size: 11px;
// //     font-weight: 500;
// //     color: #A1A1A1;
// //     letter-spacing: 0.05em;
// //   }

// //   .epa-chevron {
// //     font-size: 12px;
// //     color: #A1A1A1;
// //     transition: transform 0.2s ease;
// //   }

// //   .epa-chevron.open { transform: rotate(180deg); }

// //   .epa-day-card-body {
// //     padding: 0 24px 24px;
// //     border-top: 1px solid rgba(198,167,94,0.1);
// //   }

// //   .epa-exercise-list {
// //     display: flex;
// //     flex-direction: column;
// //     gap: 10px;
// //     padding-top: 16px;
// //   }

// //   /* ── Rest day ── */
// //   .epa-rest-card {
// //     background: #111111;
// //     border: 1px solid rgba(198,167,94,0.1);
// //     border-radius: 8px;
// //     padding: 32px;
// //     text-align: center;
// //     color: #A1A1A1;
// //   }

// //   .epa-rest-icon {
// //     font-size: 1.5rem;
// //     margin-bottom: 10px;
// //   }

// //   .epa-rest-label {
// //     font-family: 'Cormorant Garamond', Georgia, serif;
// //     font-size: 1.1rem;
// //     font-weight: 500;
// //     color: #A1A1A1;
// //     margin-bottom: 4px;
// //   }

// //   .epa-rest-sub {
// //     font-size: 11px;
// //     color: rgba(161,161,161,0.6);
// //     letter-spacing: 0.08em;
// //     text-transform: uppercase;
// //   }

// //   /* ── Exercise card ── */
// //   .epa-ex-card {
// //     background: #111111;
// //     border: 1px solid rgba(198,167,94,0.12);
// //     border-radius: 8px;
// //     overflow: hidden;
// //   }

// //   .epa-ex-card-main {
// //     display: flex;
// //     align-items: flex-start;
// //     gap: 14px;
// //     padding: 16px;
// //   }

// //   .epa-ex-index {
// //     width: 28px;
// //     height: 28px;
// //     border-radius: 6px;
// //     border: 1px solid rgba(198,167,94,0.25);
// //     background: rgba(198,167,94,0.06);
// //     color: #C6A75E;
// //     font-size: 11px;
// //     font-weight: 700;
// //     display: flex;
// //     align-items: center;
// //     justify-content: center;
// //     flex-shrink: 0;
// //   }

// //   .epa-ex-name {
// //     font-size: 13px;
// //     font-weight: 600;
// //     color: #E8E6E3;
// //     margin-bottom: 8px;
// //   }

// //   .epa-ex-tags {
// //     display: flex;
// //     flex-wrap: wrap;
// //     gap: 6px;
// //   }

// //   .epa-tag {
// //     font-size: 9px;
// //     font-weight: 600;
// //     letter-spacing: 0.1em;
// //     text-transform: uppercase;
// //     padding: 2px 8px;
// //     border-radius: 4px;
// //     border: 1px solid;
// //   }

// //   .epa-tag-primary { background: rgba(198,167,94,0.08); color: #C6A75E; border-color: rgba(198,167,94,0.25); }
// //   .epa-tag-secondary { background: rgba(14,59,50,0.3); color: #2E8B6A; border-color: rgba(46,139,106,0.2); }
// //   .epa-tag-muscle { background: #111111; color: #A1A1A1; border-color: rgba(198,167,94,0.12); }

// //   .epa-ex-sets {
// //     flex-shrink: 0;
// //     text-align: right;
// //   }

// //   .epa-ex-sets-main {
// //     font-size: 15px;
// //     font-weight: 700;
// //     color: #E8E6E3;
// //     letter-spacing: -0.01em;
// //   }

// //   .epa-ex-sets-divider { color: #A1A1A1; font-weight: 400; }

// //   .epa-ex-rest {
// //     font-size: 10px;
// //     color: #A1A1A1;
// //     margin-top: 4px;
// //   }

// //   .epa-ex-expand-btn {
// //     width: 100%;
// //     padding: 8px 16px;
// //     border-top: 1px solid rgba(198,167,94,0.1);
// //     background: transparent;
// //     border-left: none;
// //     border-right: none;
// //     border-bottom: none;
// //     font-size: 9px;
// //     font-weight: 600;
// //     letter-spacing: 0.15em;
// //     text-transform: uppercase;
// //     color: #A1A1A1;
// //     cursor: pointer;
// //     display: flex;
// //     align-items: center;
// //     justify-content: center;
// //     gap: 6px;
// //     transition: color 0.2s ease, background 0.2s ease;
// //   }

// //   .epa-ex-expand-btn:hover {
// //     color: #C6A75E;
// //     background: rgba(198,167,94,0.03);
// //   }

// //   .epa-ex-details {
// //     padding: 16px;
// //     border-top: 1px solid rgba(198,167,94,0.1);
// //     display: grid;
// //     grid-template-columns: 1fr 1fr;
// //     gap: 12px;
// //   }

// //   .epa-ex-detail-box {
// //     background: #1C1C1C;
// //     border: 1px solid rgba(198,167,94,0.12);
// //     border-radius: 8px;
// //     padding: 14px;
// //   }

// //   .epa-ex-detail-label {
// //     font-size: 9px;
// //     font-weight: 600;
// //     letter-spacing: 0.15em;
// //     text-transform: uppercase;
// //     margin-bottom: 8px;
// //   }

// //   .epa-ex-detail-text {
// //     font-size: 11px;
// //     color: #A1A1A1;
// //     line-height: 1.6;
// //   }

// //   .epa-ex-detail-row {
// //     margin-bottom: 4px;
// //   }

// //   .epa-ex-detail-row span:first-child {
// //     color: rgba(161,161,161,0.6);
// //     margin-right: 4px;
// //   }

// //   /* ── Global notes ── */
// //   .epa-notes-card {
// //     background: #1C1C1C;
// //     border: 1px solid rgba(198,167,94,0.15);
// //     border-radius: 8px;
// //     overflow: hidden;
// //   }

// //   .epa-notes-header {
// //     padding: 18px 24px;
// //     border-bottom: 1px solid rgba(198,167,94,0.12);
// //     display: flex;
// //     align-items: center;
// //     gap: 12px;
// //   }

// //   .epa-notes-icon {
// //     width: 32px;
// //     height: 32px;
// //     border-radius: 8px;
// //     background: rgba(198,167,94,0.06);
// //     border: 1px solid rgba(198,167,94,0.2);
// //     display: flex;
// //     align-items: center;
// //     justify-content: center;
// //     font-size: 14px;
// //   }

// //   .epa-notes-title {
// //     font-family: 'Cormorant Garamond', Georgia, serif;
// //     font-size: 1.15rem;
// //     font-weight: 600;
// //     color: #E8E6E3;
// //   }

// //   .epa-notes-body {
// //     padding: 24px;
// //     display: grid;
// //     grid-template-columns: 1fr 1fr;
// //     gap: 24px;
// //   }

// //   @media (max-width: 680px) {
// //     .epa-notes-body { grid-template-columns: 1fr; }
// //   }

// //   .epa-notes-section-label {
// //     font-size: 9px;
// //     font-weight: 600;
// //     letter-spacing: 0.15em;
// //     text-transform: uppercase;
// //     margin-bottom: 10px;
// //   }

// //   .epa-notes-text {
// //     font-size: 12px;
// //     color: #A1A1A1;
// //     line-height: 1.7;
// //   }

// //   .epa-notes-list-item {
// //     display: flex;
// //     gap: 8px;
// //     margin-bottom: 6px;
// //     font-size: 12px;
// //     color: #A1A1A1;
// //     line-height: 1.5;
// //   }

// //   .epa-notes-progression {
// //     grid-column: 1 / -1;
// //     padding-top: 20px;
// //     border-top: 1px solid rgba(198,167,94,0.1);
// //   }

// //   /* ── Empty state ── */
// //   .epa-empty {
// //     background: #1C1C1C;
// //     border: 1px dashed rgba(198,167,94,0.2);
// //     border-radius: 8px;
// //     padding: 80px 32px;
// //     text-align: center;
// //     display: flex;
// //     flex-direction: column;
// //     align-items: center;
// //     gap: 16px;
// //   }

// //   .epa-empty-icon {
// //     width: 56px;
// //     height: 56px;
// //     border-radius: 50%;
// //     border: 1px solid rgba(198,167,94,0.25);
// //     background: rgba(198,167,94,0.05);
// //     display: flex;
// //     align-items: center;
// //     justify-content: center;
// //     font-size: 22px;
// //     margin-bottom: 4px;
// //   }

// //   .epa-empty-title {
// //     font-family: 'Cormorant Garamond', Georgia, serif;
// //     font-size: 1.5rem;
// //     font-weight: 600;
// //     color: #E8E6E3;
// //   }

// //   .epa-empty-sub {
// //     font-size: 12px;
// //     color: #A1A1A1;
// //     max-width: 320px;
// //     line-height: 1.7;
// //   }

// //   .epa-divider-line {
// //     border: none;
// //     border-top: 1px solid rgba(198,167,94,0.1);
// //     margin: 0;
// //   }
// // `;

// // /* ─────────────────────────────────────────────
// //    WORKOUT HEADER
// // ───────────────────────────────────────────── */
// // function WorkoutHeader({ plan, onGenerateBase, onGenerateAI, actionLoading }) {
// //   const meta = plan || {};

// //   const badges = [
// //     { label: "Version",       value: meta.planVersion ?? "—" },
// //     { label: "Generated By",  value: meta.generatedBy  ?? "—" },
// //     { label: "Status",        value: meta.status        ?? "—" },
// //     { label: "Volume",        value: meta.baseVolumeLevel ?? "—" },
// //     { label: "Intensity",     value: meta.baseIntensityLevel ?? "—" },
// //     {
// //       label: "Workout Days",
// //       value:
// //         meta.plannedWorkoutDays ??
// //         (meta.weeklyStructure?.filter((d) => !d.isRestDay).length ?? "—"),
// //     },
// //   ];

// //   return (
// //     <div className="epa-workout-header">
// //       <div className="epa-workout-header-inner">
// //         <div className="epa-workout-title-block">
// //           <p className="epa-workout-eyebrow">Training Dashboard</p>
// //           <h1 className="epa-workout-title">Weekly Workout Protocol</h1>
// //           <div className="epa-badge-grid">
// //             {badges.map((b) => (
// //               <div key={b.label} className="epa-badge">
// //                 <p className="epa-badge-label">{b.label}</p>
// //                 <p className="epa-badge-value">{String(b.value)}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         <div className="epa-header-actions">
// //           <button
// //             onClick={onGenerateBase}
// //             disabled={actionLoading}
// //             className="epa-btn-gold"
// //           >
// //             {plan ? "Regenerate Base Plan" : "Generate Base Plan"}
// //           </button>
// //           {plan && (
// //             <button
// //               onClick={onGenerateAI}
// //               disabled={actionLoading}
// //               className="epa-btn-outline"
// //             >
// //               Generate AI Plan
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────
// //    WEEK CALENDAR STRIP
// // ───────────────────────────────────────────── */
// // function WeekCalendar({ weekPlan, activeDay, onSelectDay }) {
// //   const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// //   return (
// //     <div className="epa-week-grid">
// //       {weekPlan.map((day, idx) => {
// //         const isRest   = day.workoutType === "rest" || day.isRestDay;
// //         const isToday  = idx === new Date().getDay() - 1;
// //         const isActive = activeDay === day.day;

// //         return (
// //           <button
// //             key={day.day}
// //             onClick={() => onSelectDay(day.day)}
// //             className={`epa-day-btn${isActive ? " active" : ""}${isRest ? " rest" : ""}`}
// //           >
// //             {isToday && !isActive && (
// //               <span className="epa-today-pip">Today</span>
// //             )}
// //             <span className="epa-day-name">{dayNames[idx] ?? `D${day.day}`}</span>
// //             <span className="epa-day-num">{day.day}</span>
// //             <span className="epa-day-type">
// //               {isRest ? "Rest" : (day.workoutType ?? "Train")}
// //             </span>
// //           </button>
// //         );
// //       })}
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────
// //    EXERCISE CARD
// // ───────────────────────────────────────────── */
// // function ExerciseCard({ ex, index }) {
// //   const [expanded, setExpanded] = useState(false);

// //   const catClass =
// //     ex.category?.toLowerCase() === "primary"   ? "epa-tag-primary"   :
// //     ex.category?.toLowerCase() === "secondary"  ? "epa-tag-secondary" :
// //     "epa-tag-muscle";

// //   return (
// //     <div className="epa-ex-card">
// //       <div className="epa-ex-card-main">
// //         <div className="epa-ex-index">{index + 1}</div>

// //         <div style={{ flex: 1, minWidth: 0 }}>
// //           <p className="epa-ex-name">{ex.name}</p>
// //           <div className="epa-ex-tags">
// //             {ex.category && (
// //               <span className={`epa-tag ${catClass}`}>{ex.category}</span>
// //             )}
// //             {(ex.muscleGroups ?? ex.muscles ?? []).map((m, i) => (
// //               <span key={i} className="epa-tag epa-tag-muscle">{m}</span>
// //             ))}
// //           </div>
// //         </div>

// //         <div className="epa-ex-sets">
// //           <p className="epa-ex-sets-main">
// //             {ex.sets} <span className="epa-ex-sets-divider">×</span> {ex.reps}
// //           </p>
// //           {ex.restSeconds && (
// //             <p className="epa-ex-rest">{ex.restSeconds}s rest</p>
// //           )}
// //           {ex.intensityType && (
// //             <span className="epa-tag epa-tag-muscle" style={{ display: "inline-block", marginTop: 6 }}>
// //               {ex.intensityType}
// //             </span>
// //           )}
// //         </div>
// //       </div>

// //       {(ex.trainingEffect || ex.adjustmentHints) && (
// //         <>
// //           <button
// //             onClick={() => setExpanded(!expanded)}
// //             className="epa-ex-expand-btn"
// //           >
// //             {expanded ? "Hide Details" : "View Details"}
// //             <span className={`epa-chevron${expanded ? " open" : ""}`}>▾</span>
// //           </button>

// //           {expanded && (
// //             <div className="epa-ex-details">
// //               {ex.trainingEffect && (
// //                 <div className="epa-ex-detail-box">
// //                   <p className="epa-notes-section-label" style={{ color: "#C6A75E" }}>Training Effect</p>
// //                   {ex.trainingEffect.primaryEffect && (
// //                     <p className="epa-ex-detail-row epa-ex-detail-text">
// //                       <span>Effect:</span>{ex.trainingEffect.primaryEffect}
// //                     </p>
// //                   )}
// //                   {ex.trainingEffect.sportRelevance && (
// //                     <p className="epa-ex-detail-row epa-ex-detail-text">
// //                       <span>Sport:</span>{ex.trainingEffect.sportRelevance}
// //                     </p>
// //                   )}
// //                 </div>
// //               )}
// //               {ex.adjustmentHints && (
// //                 <div className="epa-ex-detail-box">
// //                   <p className="epa-notes-section-label" style={{ color: "#2E8B6A" }}>Adjustments</p>
// //                   {ex.adjustmentHints.lowReadiness && (
// //                     <p className="epa-ex-detail-row epa-ex-detail-text">
// //                       <span>Low:</span>{ex.adjustmentHints.lowReadiness}
// //                     </p>
// //                   )}
// //                   {ex.adjustmentHints.highReadiness && (
// //                     <p className="epa-ex-detail-row epa-ex-detail-text">
// //                       <span>High:</span>{ex.adjustmentHints.highReadiness}
// //                     </p>
// //                   )}
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //         </>
// //       )}
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────
// //    WORKOUT DAY CARD
// // ───────────────────────────────────────────── */
// // function WorkoutDayCard({ day, isActive }) {
// //   const [open, setOpen] = useState(isActive);
// //   const isRest = day.workoutType === "rest" || day.isRestDay;

// //   if (isRest) {
// //     return (
// //       <div className="epa-rest-card">
// //         <div className="epa-rest-icon">○</div>
// //         <p className="epa-rest-label">Day {day.day} — Rest &amp; Recovery</p>
// //         <p className="epa-rest-sub">Adaptation &amp; Tissue Repair</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className={`epa-day-card${isActive ? " active" : ""}`}>
// //       <button
// //         className="epa-day-card-header"
// //         onClick={() => setOpen(!open)}
// //       >
// //         <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
// //           <div className="epa-day-card-num">{day.day}</div>
// //           <div style={{ textAlign: "left" }}>
// //             <p className="epa-day-card-title">{day.workoutType}</p>
// //             {day.focus && <p className="epa-day-card-focus">{day.focus}</p>}
// //           </div>
// //         </div>
// //         <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
// //           {day.estimatedDuration && (
// //             <span className="epa-day-card-duration">⏱ {day.estimatedDuration}</span>
// //           )}
// //           <span className={`epa-chevron${open ? " open" : ""}`}>▾</span>
// //         </div>
// //       </button>

// //       {open && (
// //         <div className="epa-day-card-body">
// //           {day.exercises && day.exercises.length > 0 ? (
// //             <div className="epa-exercise-list">
// //               {day.exercises.map((ex, i) => (
// //                 <ExerciseCard key={i} ex={ex} index={i} />
// //               ))}
// //             </div>
// //           ) : (
// //             <p style={{
// //               paddingTop: 16,
// //               fontSize: 12,
// //               color: "#A1A1A1",
// //               textAlign: "center",
// //               fontStyle: "italic",
// //             }}>
// //               No exercise details available. Generate AI Plan for a full breakdown.
// //             </p>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────
// //    GLOBAL NOTES CARD
// // ───────────────────────────────────────────── */
// // function GlobalNotesCard({ notes }) {
// //   if (!notes) return null;

// //   return (
// //     <div className="epa-notes-card">
// //       <div className="epa-notes-header">
// //         <div className="epa-notes-icon">◈</div>
// //         <h2 className="epa-notes-title">Programme Notes</h2>
// //       </div>
// //       <div className="epa-notes-body">
// //         {notes.weeklyEmphasis && (
// //           <div>
// //             <p className="epa-notes-section-label" style={{ color: "#C6A75E" }}>Weekly Emphasis</p>
// //             <p className="epa-notes-text">{notes.weeklyEmphasis}</p>
// //           </div>
// //         )}
// //         {notes.injuryPreventionFocus && (
// //           <div>
// //             <p className="epa-notes-section-label" style={{ color: "#2E8B6A" }}>Injury Prevention</p>
// //             {Array.isArray(notes.injuryPreventionFocus)
// //               ? notes.injuryPreventionFocus.map((item, i) => (
// //                   <div key={i} className="epa-notes-list-item">
// //                     <span style={{ color: "#C6A75E", flexShrink: 0 }}>›</span>
// //                     <span>{item}</span>
// //                   </div>
// //                 ))
// //               : <p className="epa-notes-text">{notes.injuryPreventionFocus}</p>
// //             }
// //           </div>
// //         )}
// //         {notes.progressionLogic && (
// //           <div className="epa-notes-progression">
// //             <p className="epa-notes-section-label" style={{ color: "#A1A1A1" }}>Progression Logic</p>
// //             <p className="epa-notes-text">{notes.progressionLogic}</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────
// //    MAIN PAGE
// // ───────────────────────────────────────────── */
// // export default function Workout() {
// //   const { user } = useAuth();

// //   const [plan,          setPlan]          = useState(null);
// //   const [loading,       setLoading]       = useState(true);
// //   const [actionLoading, setActionLoading] = useState(false);
// //   const [activeDay,     setActiveDay]     = useState(1);

// //   const fetchPlan = async () => {
// //     try {
// //       const res = await planAPI.getActive(user.id);
// //       setPlan(res.data?.plan || null);
// //     } catch {
// //       setPlan(null);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (user?.id) fetchPlan();
// //   }, [user?.id]);

// //   const generateBasePlan = async () => {
// //     try {
// //       setActionLoading(true);
// //       await planAPI.generate(user.id);
// //       await fetchPlan();
// //     } catch (err) {
// //       alert(err.message || "Base plan generation failed");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const generateAIPlan = async () => {
// //     try {
// //       setActionLoading(true);
// //       await aiAPI.generateWeekly(user.id);
// //       await fetchPlan();
// //     } catch (err) {
// //       alert(err.message || "AI plan generation failed");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   if (loading) return <BikeLoader />;

// //   const weekPlan        = plan?.detailedPlan?.weekPlan || plan?.weeklyStructure || [];
// //   const hasDetailedPlan = !!plan?.detailedPlan?.weekPlan;
// //   const globalNotes     = plan?.detailedPlan?.globalNotes || null;

// //   return (
// //     <div className="epa-workout-root">
// //       <style>{workoutStyles}</style>

// //       {actionLoading && <BikeLoader />}

// //       <div className="epa-workout-container">

// //         {/* ── HEADER ── */}
// //         <WorkoutHeader
// //           plan={plan}
// //           onGenerateBase={generateBasePlan}
// //           onGenerateAI={generateAIPlan}
// //           actionLoading={actionLoading}
// //         />

// //         {/* ── EMPTY STATE ── */}
// //         {weekPlan.length === 0 && (
// //           <div className="epa-empty">
// //             <div className="epa-empty-icon">⊕</div>
// //             <h2 className="epa-empty-title">No Active Protocol</h2>
// //             <p className="epa-empty-sub">
// //               Generate a base plan to begin. Then unlock detailed AI exercise breakdowns, muscle targeting, and progression logic.
// //             </p>
// //             <button
// //               onClick={generateBasePlan}
// //               disabled={actionLoading}
// //               className="epa-btn-gold"
// //               style={{ marginTop: 8 }}
// //             >
// //               Generate Base Plan
// //             </button>
// //           </div>
// //         )}

// //         {weekPlan.length > 0 && (
// //           <>
// //             {/* ── WEEK CALENDAR ── */}
// //             <div>
// //               <p className="epa-section-label">Weekly Overview</p>
// //               <WeekCalendar
// //                 weekPlan={weekPlan}
// //                 activeDay={activeDay}
// //                 onSelectDay={setActiveDay}
// //               />
// //             </div>

// //             <hr className="epa-divider-line" />

// //             {/* ── AI PLAN BANNER ── */}
// //             {!hasDetailedPlan && (
// //               <div className="epa-ai-banner">
// //                 <div>
// //                   <p className="epa-ai-banner-title">AI Detailed Plan Not Generated</p>
// //                   <p className="epa-ai-banner-sub">
// //                     Unlock exercise breakdowns, muscle targeting, and progression logic with the AI protocol.
// //                   </p>
// //                 </div>
// //                 <button
// //                   onClick={generateAIPlan}
// //                   disabled={actionLoading}
// //                   className="epa-btn-outline"
// //                   style={{ flexShrink: 0 }}
// //                 >
// //                   Generate AI Plan
// //                 </button>
// //               </div>
// //             )}

// //             {/* ── WORKOUT SCHEDULE ── */}
// //             <div>
// //               <p className="epa-section-label">Workout Schedule</p>
// //               <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
// //                 {weekPlan.map((day) => (
// //                   <WorkoutDayCard
// //                     key={day.day}
// //                     day={day}
// //                     isActive={day.day === activeDay}
// //                   />
// //                 ))}
// //               </div>
// //             </div>

// //             {/* ── GLOBAL NOTES ── */}
// //             {globalNotes && (
// //               <div>
// //                 <p className="epa-section-label">Programme Notes</p>
// //                 <GlobalNotesCard notes={globalNotes} />
// //               </div>
// //             )}
// //           </>
// //         )}

// //       </div>
// //     </div>
// //   );
// // }



// import { useEffect, useState } from "react";
// import { planAPI, aiAPI } from "../api/axios";
// import { useAuth } from "../context/AuthContext";
// import BikeLoader from "../components/BikeLoader";
// import { Zap, RefreshCw, ChevronDown, Plus } from "lucide-react";

// /* ── shared style tokens ── */
// const glass = {
//   background: "rgba(255,255,255,0.85)",
//   backdropFilter: "blur(16px)",
//   WebkitBackdropFilter: "blur(16px)",
//   border: "1px solid rgba(255,255,255,0.9)",
//   boxShadow: "0 4px 24px rgba(99,102,241,0.08), 0 1px 4px rgba(0,0,0,0.04)",
// };

// const TAG = {
//   primary:   { background: "rgba(99,102,241,0.08)",  color: "#6366f1", border: "1px solid rgba(99,102,241,0.2)" },
//   secondary: { background: "rgba(16,185,129,0.08)",  color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" },
//   muscle:    { background: "rgba(148,163,184,0.08)", color: "#64748b", border: "1px solid rgba(148,163,184,0.2)" },
// };

// function Tag({ type = "muscle", children }) {
//   return (
//     <span style={{ ...TAG[type], fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 8px", borderRadius: 4 }}>
//       {children}
//     </span>
//   );
// }

// /* ─── Workout Header ─── */
// function WorkoutHeader({ plan, onGenerateBase, onGenerateAI, actionLoading }) {
//   const meta = plan || {};
//   const badges = [
//     { label: "Version",      value: meta.planVersion ?? "—" },
//     { label: "Generated By", value: meta.generatedBy  ?? "—" },
//     { label: "Status",       value: meta.status        ?? "—" },
//     { label: "Volume",       value: meta.baseVolumeLevel ?? "—" },
//     { label: "Intensity",    value: meta.baseIntensityLevel ?? "—" },
//     { label: "Workout Days", value: meta.plannedWorkoutDays ?? (meta.weeklyStructure?.filter(d => !d.isRestDay).length ?? "—") },
//   ];

//   return (
//     <div style={{ ...glass, borderRadius: 24, padding: 36, borderTop: "2px solid #6366f1" }}>
//       <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 28 }}>

//         {/* Left */}
//         <div style={{ flex: 1, minWidth: 280 }}>
//           <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6366f1", marginBottom: 10 }}>
//             Training Dashboard
//           </p>
//           <h1 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 800, color: "#0f172a", lineHeight: 1.1, marginBottom: 24 }}>
//             Weekly Workout Protocol
//           </h1>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
//             {badges.map(({ label, value }) => (
//               <div key={label} style={{ background: "rgba(238,242,255,0.6)", border: "1px solid #e0e7ff", borderRadius: 12, padding: "12px 14px" }}>
//                 <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 5 }}>{label}</p>
//                 <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0f172a", textTransform: "capitalize" }}>{String(value)}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Actions */}
//         <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
//           <button onClick={onGenerateBase} disabled={actionLoading}
//             style={{ padding: "12px 24px", background: "linear-gradient(135deg,#2563eb,#6366f1,#7c3aed)", color: "white", borderRadius: 12, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", border: "none", cursor: actionLoading ? "not-allowed" : "pointer", opacity: actionLoading ? 0.6 : 1, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 16px rgba(99,102,241,0.3)", transition: "all 0.2s" }}>
//             <RefreshCw size={14} />
//             {plan ? "Regenerate Base Plan" : "Generate Base Plan"}
//           </button>
//           {plan && (
//             <button onClick={onGenerateAI} disabled={actionLoading}
//               style={{ padding: "11px 24px", background: "rgba(255,255,255,0.8)", color: "#6366f1", borderRadius: 12, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", border: "1.5px solid rgba(99,102,241,0.35)", cursor: actionLoading ? "not-allowed" : "pointer", opacity: actionLoading ? 0.6 : 1, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s" }}>
//               <Zap size={14} />
//               Generate AI Plan
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ─── Week Calendar ─── */
// function WeekCalendar({ weekPlan, activeDay, onSelectDay }) {
//   const dayNames = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
//   return (
//     <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 10 }}>
//       {weekPlan.map((day, idx) => {
//         const isRest   = day.workoutType === "rest" || day.isRestDay;
//         const isToday  = idx === new Date().getDay() - 1;
//         const isActive = activeDay === day.day;

//         return (
//           <button key={day.day} onClick={() => onSelectDay(day.day)}
//             style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 6px", borderRadius: 14, border: "none", cursor: "pointer", position: "relative", transition: "all 0.2s",
//               background: isActive ? "linear-gradient(135deg,#2563eb,#6366f1)" : isRest ? "rgba(241,245,249,0.7)" : "rgba(255,255,255,0.85)",
//               boxShadow: isActive ? "0 4px 16px rgba(99,102,241,0.3)" : "0 1px 4px rgba(0,0,0,0.04)",
//               transform: isActive ? "translateY(-3px)" : "none",
//               border: isActive ? "none" : isRest ? "1px solid #e2e8f0" : "1px solid rgba(99,102,241,0.12)",
//             }}>
//             {isToday && !isActive && (
//               <span style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", background: "#6366f1", color: "white", fontSize: 7, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "1px 6px", borderRadius: 4 }}>Today</span>
//             )}
//             <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: isActive ? "rgba(255,255,255,0.7)" : "#94a3b8" }}>{dayNames[idx] ?? `D${day.day}`}</span>
//             <span style={{ fontSize: 14, fontWeight: 800, color: isActive ? "white" : isRest ? "#94a3b8" : "#0f172a" }}>{day.day}</span>
//             <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "2px 6px", borderRadius: 4,
//               background: isActive ? "rgba(255,255,255,0.2)" : isRest ? "transparent" : "rgba(99,102,241,0.08)",
//               color: isActive ? "white" : isRest ? "#94a3b8" : "#6366f1",
//               border: isActive ? "1px solid rgba(255,255,255,0.25)" : isRest ? "1px solid #e2e8f0" : "1px solid rgba(99,102,241,0.15)",
//             }}>
//               {isRest ? "Rest" : (day.workoutType ?? "Train")}
//             </span>
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// /* ─── Exercise Card ─── */
// function ExerciseCard({ ex, index }) {
//   const [expanded, setExpanded] = useState(false);
//   const tagType = ex.category?.toLowerCase() === "primary" ? "primary" : ex.category?.toLowerCase() === "secondary" ? "secondary" : "muscle";

//   return (
//     <div style={{ background: "rgba(238,242,255,0.4)", border: "1px solid #e0e7ff", borderRadius: 14, overflow: "hidden" }}>
//       <div style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: 16 }}>
//         {/* Index */}
//         <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 8px rgba(99,102,241,0.3)" }}>
//           {index + 1}
//         </div>
//         {/* Name + tags */}
//         <div style={{ flex: 1, minWidth: 0 }}>
//           <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>{ex.name}</p>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
//             {ex.category && <Tag type={tagType}>{ex.category}</Tag>}
//             {(ex.muscleGroups ?? ex.muscles ?? []).map((m, i) => <Tag key={i} type="muscle">{m}</Tag>)}
//           </div>
//         </div>
//         {/* Sets × Reps */}
//         <div style={{ flexShrink: 0, textAlign: "right" }}>
//           <p style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.01em" }}>
//             {ex.sets} <span style={{ color: "#94a3b8", fontWeight: 400 }}>×</span> {ex.reps}
//           </p>
//           {ex.restSeconds && <p style={{ fontSize: 10, color: "#94a3b8", marginTop: 3 }}>{ex.restSeconds}s rest</p>}
//           {ex.intensityType && <div style={{ marginTop: 5 }}><Tag type="muscle">{ex.intensityType}</Tag></div>}
//         </div>
//       </div>

//       {(ex.trainingEffect || ex.adjustmentHints) && (
//         <>
//           <button onClick={() => setExpanded(!expanded)}
//             style={{ width: "100%", padding: "8px 16px", borderTop: "1px solid #e0e7ff", background: "transparent", border: "none", borderTop: "1px solid #e0e7ff", fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "color 0.2s" }}>
//             {expanded ? "Hide Details" : "View Details"}
//             <ChevronDown size={12} style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
//           </button>
//           {expanded && (
//             <div style={{ padding: 16, borderTop: "1px solid #e0e7ff", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//               {ex.trainingEffect && (
//                 <div style={{ background: "rgba(99,102,241,0.05)", border: "1px solid #e0e7ff", borderRadius: 10, padding: 14 }}>
//                   <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", marginBottom: 8 }}>Training Effect</p>
//                   {ex.trainingEffect.primaryEffect && <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.6, marginBottom: 4 }}><span style={{ color: "#94a3b8" }}>Effect: </span>{ex.trainingEffect.primaryEffect}</p>}
//                   {ex.trainingEffect.sportRelevance && <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.6 }}><span style={{ color: "#94a3b8" }}>Sport: </span>{ex.trainingEffect.sportRelevance}</p>}
//                 </div>
//               )}
//               {ex.adjustmentHints && (
//                 <div style={{ background: "rgba(16,185,129,0.05)", border: "1px solid #d1fae5", borderRadius: 10, padding: 14 }}>
//                   <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#10b981", marginBottom: 8 }}>Adjustments</p>
//                   {ex.adjustmentHints.lowReadiness && <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.6, marginBottom: 4 }}><span style={{ color: "#94a3b8" }}>Low: </span>{ex.adjustmentHints.lowReadiness}</p>}
//                   {ex.adjustmentHints.highReadiness && <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.6 }}><span style={{ color: "#94a3b8" }}>High: </span>{ex.adjustmentHints.highReadiness}</p>}
//                 </div>
//               )}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// /* ─── Workout Day Card ─── */
// function WorkoutDayCard({ day, isActive }) {
//   const [open, setOpen] = useState(isActive);
//   const isRest = day.workoutType === "rest" || day.isRestDay;

//   if (isRest) {
//     return (
//       <div style={{ background: "rgba(241,245,249,0.7)", border: "1px solid #e2e8f0", borderRadius: 16, padding: 28, textAlign: "center" }}>
//         <p style={{ fontSize: "1.25rem", marginBottom: 6 }}>○</p>
//         <p style={{ fontSize: "1rem", fontWeight: 700, color: "#64748b" }}>Day {day.day} — Rest &amp; Recovery</p>
//         <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>Adaptation &amp; Tissue Repair</p>
//       </div>
//     );
//   }

//   return (
//     <div style={{ ...glass, borderRadius: 16, overflow: "hidden", border: isActive ? "1px solid rgba(99,102,241,0.3)" : "1px solid rgba(255,255,255,0.9)", transition: "border-color 0.2s" }}>
//       <button onClick={() => setOpen(!open)}
//         style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//           <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, flexShrink: 0,
//             background: isActive ? "linear-gradient(135deg,#2563eb,#6366f1)" : "rgba(238,242,255,0.8)",
//             color: isActive ? "white" : "#6366f1",
//             boxShadow: isActive ? "0 2px 10px rgba(99,102,241,0.3)" : "none",
//           }}>
//             {day.day}
//           </div>
//           <div>
//             <p style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", textTransform: "capitalize" }}>{day.workoutType}</p>
//             {day.focus && <p style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{day.focus}</p>}
//           </div>
//         </div>
//         <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//           {day.estimatedDuration && (
//             <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>⏱ {day.estimatedDuration}</span>
//           )}
//           <ChevronDown size={16} style={{ color: "#94a3b8", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
//         </div>
//       </button>

//       {open && (
//         <div style={{ padding: "0 24px 24px", borderTop: "1px solid rgba(226,232,240,0.8)" }}>
//           {day.exercises && day.exercises.length > 0 ? (
//             <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 16 }}>
//               {day.exercises.map((ex, i) => <ExerciseCard key={i} ex={ex} index={i} />)}
//             </div>
//           ) : (
//             <p style={{ paddingTop: 16, fontSize: 12, color: "#94a3b8", textAlign: "center", fontStyle: "italic" }}>
//               No exercise details available. Generate AI Plan for a full breakdown.
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// /* ─── Global Notes ─── */
// function GlobalNotesCard({ notes }) {
//   if (!notes) return null;
//   return (
//     <div style={{ ...glass, borderRadius: 20, overflow: "hidden" }}>
//       <div style={{ padding: "18px 28px", borderBottom: "1px solid rgba(226,232,240,0.8)", display: "flex", alignItems: "center", gap: 12, background: "linear-gradient(135deg,rgba(99,102,241,0.04),rgba(139,92,246,0.04))" }}>
//         <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14, boxShadow: "0 2px 8px rgba(99,102,241,0.3)" }}>◈</div>
//         <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a" }}>Programme Notes</h2>
//       </div>
//       <div style={{ padding: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
//         {notes.weeklyEmphasis && (
//           <div>
//             <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", marginBottom: 10 }}>Weekly Emphasis</p>
//             <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.7 }}>{notes.weeklyEmphasis}</p>
//           </div>
//         )}
//         {notes.injuryPreventionFocus && (
//           <div>
//             <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#10b981", marginBottom: 10 }}>Injury Prevention</p>
//             {Array.isArray(notes.injuryPreventionFocus)
//               ? notes.injuryPreventionFocus.map((item, i) => (
//                   <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>
//                     <span style={{ color: "#6366f1", flexShrink: 0 }}>›</span>
//                     <span>{item}</span>
//                   </div>
//                 ))
//               : <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.7 }}>{notes.injuryPreventionFocus}</p>
//             }
//           </div>
//         )}
//         {notes.progressionLogic && (
//           <div style={{ gridColumn: "1 / -1", paddingTop: 20, borderTop: "1px solid #f1f5f9" }}>
//             <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 10 }}>Progression Logic</p>
//             <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.7 }}>{notes.progressionLogic}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ─── Main Page ─── */
// export default function Workout() {
//   const { user } = useAuth();
//   const [plan,          setPlan]          = useState(null);
//   const [loading,       setLoading]       = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [activeDay,     setActiveDay]     = useState(1);

//   const fetchPlan = async () => {
//     try {
//       const res = await planAPI.getActive(user.id);
//       setPlan(res.data?.plan || null);
//     } catch { setPlan(null); }
//     finally { setLoading(false); }
//   };

//   useEffect(() => { if (user?.id) fetchPlan(); }, [user?.id]);

//   const generateBasePlan = async () => {
//     try { setActionLoading(true); await planAPI.generate(user.id); await fetchPlan(); }
//     catch (err) { alert(err.message || "Base plan generation failed"); }
//     finally { setActionLoading(false); }
//   };

//   const generateAIPlan = async () => {
//     try { setActionLoading(true); await aiAPI.generateWeekly(user.id); await fetchPlan(); }
//     catch (err) { alert(err.message || "AI plan generation failed"); }
//     finally { setActionLoading(false); }
//   };

//   if (loading) return <BikeLoader />;

//   const weekPlan        = plan?.detailedPlan?.weekPlan || plan?.weeklyStructure || [];
//   const hasDetailedPlan = !!plan?.detailedPlan?.weekPlan;
//   const globalNotes     = plan?.detailedPlan?.globalNotes || null;

//   return (
//     <div style={{ minHeight: "100vh", position: "relative", fontFamily: "'Outfit', sans-serif" }}>

//       {/* Blobs */}
//       <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
//         <div className="animate-blob"                style={{ position:"absolute", top:"-8rem",  right:"-8rem",  width:"26rem", height:"26rem", borderRadius:"50%", background:"#93c5fd", mixBlendMode:"multiply", filter:"blur(72px)", opacity:0.35 }} />
//         <div className="animate-blob animation-delay-2000" style={{ position:"absolute", bottom:"-8rem", left:"-8rem",  width:"26rem", height:"26rem", borderRadius:"50%", background:"#c4b5fd", mixBlendMode:"multiply", filter:"blur(72px)", opacity:0.35 }} />
//         <div className="animate-blob animation-delay-4000" style={{ position:"absolute", top:"40%",  left:"40%",  width:"20rem", height:"20rem", borderRadius:"50%", background:"#a5b4fc", mixBlendMode:"multiply", filter:"blur(60px)", opacity:0.25, transform:"translate(-50%,-50%)" }} />
//       </div>

//       {actionLoading && <BikeLoader />}

//       <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "52px 48px 96px", display: "flex", flexDirection: "column", gap: 40 }}>

//         {/* Header */}
//         <WorkoutHeader plan={plan} onGenerateBase={generateBasePlan} onGenerateAI={generateAIPlan} actionLoading={actionLoading} />

//         {/* Empty state */}
//         {weekPlan.length === 0 && (
//           <div style={{ ...glass, borderRadius: 24, padding: "80px 32px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 20, border: "2px dashed #c7d2fe" }}>
//             <div style={{ width: 60, height: 60, borderRadius: "50%", border: "2px dashed #a5b4fc", display: "flex", alignItems: "center", justifyContent: "center", color: "#6366f1" }}>
//               <Plus size={28} />
//             </div>
//             <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a" }}>No Active Protocol</h2>
//             <p style={{ fontSize: "0.875rem", color: "#64748b", maxWidth: 340, lineHeight: 1.7 }}>
//               Generate a base plan to begin. Then unlock detailed AI exercise breakdowns, muscle targeting, and progression logic.
//             </p>
//             <button onClick={generateBasePlan} disabled={actionLoading}
//               style={{ padding: "13px 32px", background: "linear-gradient(135deg,#2563eb,#6366f1,#7c3aed)", color: "white", borderRadius: 14, fontSize: 12, fontWeight: 700, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 16px rgba(99,102,241,0.3)", marginTop: 8 }}>
//               <Zap size={16} /> Generate Base Plan
//             </button>
//           </div>
//         )}

//         {weekPlan.length > 0 && (
//           <>
//             {/* Week Calendar */}
//             <div>
//               <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 16 }}>Weekly Overview</p>
//               <WeekCalendar weekPlan={weekPlan} activeDay={activeDay} onSelectDay={setActiveDay} />
//             </div>

//             <div style={{ height: 1, background: "rgba(226,232,240,0.8)" }} />

//             {/* AI Banner */}
//             {!hasDetailedPlan && (
//               <div style={{ background: "rgba(238,242,255,0.7)", border: "1px solid #c7d2fe", borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
//                 <div>
//                   <p style={{ fontSize: 13, fontWeight: 700, color: "#6366f1", marginBottom: 4 }}>AI Detailed Plan Not Generated</p>
//                   <p style={{ fontSize: 11, color: "#64748b" }}>Unlock exercise breakdowns, muscle targeting, and progression logic with the AI protocol.</p>
//                 </div>
//                 <button onClick={generateAIPlan} disabled={actionLoading}
//                   style={{ padding: "10px 20px", background: "linear-gradient(135deg,#2563eb,#6366f1)", color: "white", borderRadius: 10, fontSize: 11, fontWeight: 700, border: "none", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", gap: 6, boxShadow: "0 2px 10px rgba(99,102,241,0.25)" }}>
//                   <Zap size={13} /> Generate AI Plan
//                 </button>
//               </div>
//             )}

//             {/* Schedule */}
//             <div>
//               <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 16 }}>Workout Schedule</p>
//               <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//                 {weekPlan.map((day) => <WorkoutDayCard key={day.day} day={day} isActive={day.day === activeDay} />)}
//               </div>
//             </div>

//             {/* Global Notes */}
//             {globalNotes && (
//               <div>
//                 <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 16 }}>Programme Notes</p>
//                 <GlobalNotesCard notes={globalNotes} />
//               </div>
//             )}
//           </>
//         )}

//       </div>

//       {/* Footer */}
//       <footer style={{ position: "relative", zIndex: 1, background: "#0f172a", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "40px 48px" }}>
//         <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
//           <div>
//             <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "white" }}>ELITE</span>
//             <span style={{ fontSize: "1.1rem", fontWeight: 800, background: "linear-gradient(135deg,#60a5fa,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ATELIER</span>
//             <p style={{ fontSize: "0.75rem", color: "#475569", marginTop: 4 }}>AI-powered performance engineering.</p>
//           </div>
//           <p style={{ color: "#334155", fontSize: "0.75rem" }}>© 2026 Elite Performance Atelier. All rights reserved.</p>
//         </div>
//       </footer>

//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { planAPI, aiAPI } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import BikeLoader from "../components/BikeLoader";
import { Zap, RefreshCw, ChevronDown, Plus } from "lucide-react";

/* ── shared style tokens ── */
const glass = {
  background: "rgba(255,255,255,0.85)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.9)",
  boxShadow: "0 4px 24px rgba(99,102,241,0.08), 0 1px 4px rgba(0,0,0,0.04)",
};

const TAG = {
  primary:   { background: "rgba(99,102,241,0.08)",  color: "#6366f1", border: "1px solid rgba(99,102,241,0.2)" },
  secondary: { background: "rgba(16,185,129,0.08)",  color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" },
  muscle:    { background: "rgba(148,163,184,0.08)", color: "#64748b", border: "1px solid rgba(148,163,184,0.2)" },
};

function Tag({ type = "muscle", children }) {
  return (
    <span style={{ ...TAG[type], fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 8px", borderRadius: 4 }}>
      {children}
    </span>
  );
}

/* ─── 1️⃣ Evidence Trust Strip ─── */
function EvidenceTrustStrip() {
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      background: "rgba(99,102,241,0.06)",
      border: "1px solid rgba(99,102,241,0.15)",
      borderRadius: 10,
      padding: "8px 16px",
      marginTop: 16,
    }}>
      <span style={{ fontSize: 13 }}>🔬</span>
      <div>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#6366f1", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Evidence-Informed Training System
        </span>
        <span style={{ fontSize: 10, color: "#64748b", marginLeft: 8 }}>
          Built using principles aligned with ACSM &amp; NSCA performance guidelines.
        </span>
      </div>
    </div>
  );
}

/* ─── 2️⃣ Adaptive Personalization Badge ─── */
function AdaptiveSafetyCard() {
  const calibrationPoints = [
    "Volume structured to experience level",
    "Intensity calibrated to readiness inputs",
    "Adjustment logic based on profile data",
    "Progressive load pacing built in",
  ];

  return (
    <div style={{
      ...glass,
      borderRadius: 16,
      border: "1px solid rgba(99,102,241,0.18)",
      boxShadow: "0 4px 20px rgba(99,102,241,0.05), 0 1px 4px rgba(0,0,0,0.04)",
      overflow: "hidden",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 20px",
        background: "linear-gradient(135deg, rgba(99,102,241,0.05), rgba(139,92,246,0.03))",
        borderBottom: "1px solid rgba(99,102,241,0.1)",
      }}>
        <span style={{ fontSize: 16 }}>🧠</span>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#0f172a", letterSpacing: "0.04em" }}>Adaptive Personalization Active</p>
          <p style={{ fontSize: 10, color: "#64748b", marginTop: 2, fontWeight: 400 }}>Your inputs shaped this plan. Treat it as a reference, not a rulebook.</p>
        </div>
        <div style={{ marginLeft: "auto", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 6, padding: "3px 10px", flexShrink: 0 }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: "#6366f1", letterSpacing: "0.1em", textTransform: "uppercase" }}>Active</span>
        </div>
      </div>
      <div style={{ padding: "14px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
        {calibrationPoints.map((point, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#6366f1", flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: "#64748b", lineHeight: 1.5 }}>{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── 3️⃣ Personalization Summary Card ─── */
function PersonalizationCard({ plan }) {
  if (!plan) return null;

  const items = [
    { label: "Experience Level",      value: plan.experienceLevel ?? plan.userExperienceLevel ?? "—" },
    { label: "Workout Days / Week",   value: plan.plannedWorkoutDays ?? plan.weeklyStructure?.filter(d => !d.isRestDay).length ?? "—" },
    { label: "Base Intensity",        value: plan.baseIntensityLevel ?? "—" },
    { label: "Base Volume",           value: plan.baseVolumeLevel ?? "—" },
  ];

  const goalEmphasis = plan.goalEmphasis ?? plan.primaryGoal ?? plan.goal ?? null;

  return (
    <div style={{ ...glass, borderRadius: 20, overflow: "hidden" }}>
      <div style={{
        padding: "16px 24px",
        borderBottom: "1px solid rgba(226,232,240,0.8)",
        background: "linear-gradient(135deg, rgba(99,102,241,0.04), rgba(139,92,246,0.04))",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "white", boxShadow: "0 2px 8px rgba(99,102,241,0.3)" }}>
          ◎
        </div>
        <div>
          <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a" }}>Why This Plan Fits You</p>
          <p style={{ fontSize: 10, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2 }}>Personalized to your profile</p>
        </div>
      </div>
      <div style={{ padding: "20px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {items.map(({ label, value }) => (
            <div key={label} style={{
              background: "rgba(238,242,255,0.5)",
              border: "1px solid #e0e7ff",
              borderRadius: 12,
              padding: "14px 16px",
            }}>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 6 }}>{label}</p>
              <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f172a", textTransform: "capitalize" }}>{String(value)}</p>
            </div>
          ))}
        </div>

        {goalEmphasis && (
          <div style={{
            marginTop: 12,
            background: "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(139,92,246,0.04))",
            border: "1px solid rgba(99,102,241,0.15)",
            borderRadius: 12,
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}>
            <span style={{ fontSize: 16 }}>🎯</span>
            <div>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 4 }}>Goal Emphasis</p>
              <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#6366f1", textTransform: "capitalize" }}>{String(goalEmphasis)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Workout Header ─── */
function WorkoutHeader({ plan, onGenerateBase, onGenerateAI, actionLoading }) {
  const meta = plan || {};
  const badges = [
    { label: "Version",      value: meta.planVersion ?? "—" },
    { label: "Generated By", value: meta.generatedBy  ?? "—" },
    { label: "Status",       value: meta.status        ?? "—" },
    { label: "Volume",       value: meta.baseVolumeLevel ?? "—" },
    { label: "Intensity",    value: meta.baseIntensityLevel ?? "—" },
    { label: "Workout Days", value: meta.plannedWorkoutDays ?? (meta.weeklyStructure?.filter(d => !d.isRestDay).length ?? "—") },
  ];

  return (
    <div style={{ ...glass, borderRadius: 24, padding: 36, borderTop: "2px solid #6366f1" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 28 }}>

        {/* Left */}
        <div style={{ flex: 1, minWidth: 280 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6366f1", marginBottom: 10 }}>
            Training Dashboard
          </p>
          <h1 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 800, color: "#0f172a", lineHeight: 1.1, marginBottom: 6 }}>
            Weekly Training Framework
          </h1>
          <p style={{ fontSize: 12, color: "#94a3b8", fontWeight: 400, lineHeight: 1.6, marginBottom: 0, marginTop: 8 }}>
            Built around your profile — a reference to guide your week, not a rigid prescription.
          </p>

          {/* ── 1️⃣ Evidence Trust Strip ── */}
          <EvidenceTrustStrip />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 24 }}>
            {badges.map(({ label, value }) => (
              <div key={label} style={{ background: "rgba(238,242,255,0.6)", border: "1px solid #e0e7ff", borderRadius: 12, padding: "12px 14px" }}>
                <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 5 }}>{label}</p>
                <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0f172a", textTransform: "capitalize" }}>{String(value)}</p>
              </div>
            ))}
          </div>

          {/* ── 2️⃣ Adaptive Safety Card (below metadata grid) ── */}
          <div style={{ marginTop: 16 }}>
            <AdaptiveSafetyCard />
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
          <button onClick={onGenerateBase} disabled={actionLoading}
            style={{ padding: "12px 24px", background: "linear-gradient(135deg,#2563eb,#6366f1,#7c3aed)", color: "white", borderRadius: 12, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", border: "none", cursor: actionLoading ? "not-allowed" : "pointer", opacity: actionLoading ? 0.6 : 1, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 16px rgba(99,102,241,0.3)", transition: "all 0.2s" }}>
            <RefreshCw size={14} />
            {plan ? "Regenerate Base Plan" : "Generate Base Plan"}
          </button>
          {plan && (
            <button onClick={onGenerateAI} disabled={actionLoading}
              style={{ padding: "11px 24px", background: "rgba(255,255,255,0.8)", color: "#6366f1", borderRadius: 12, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", border: "1.5px solid rgba(99,102,241,0.35)", cursor: actionLoading ? "not-allowed" : "pointer", opacity: actionLoading ? 0.6 : 1, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s" }}>
              <Zap size={14} />
              Generate AI Plan
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Week Calendar ─── */
function WeekCalendar({ weekPlan, activeDay, onSelectDay }) {
  const dayNames = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 10 }}>
      {weekPlan.map((day, idx) => {
        const isRest   = day.workoutType === "rest" || day.isRestDay;
        const isToday  = idx === new Date().getDay() - 1;
        const isActive = activeDay === day.day;

        return (
          <button key={day.day} onClick={() => onSelectDay(day.day)}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 6px", borderRadius: 14, border: "none", cursor: "pointer", position: "relative", transition: "all 0.2s",
              background: isActive ? "linear-gradient(135deg,#2563eb,#6366f1)" : isRest ? "rgba(241,245,249,0.7)" : "rgba(255,255,255,0.85)",
              boxShadow: isActive ? "0 4px 16px rgba(99,102,241,0.3)" : "0 1px 4px rgba(0,0,0,0.04)",
              transform: isActive ? "translateY(-3px)" : "none",
              border: isActive ? "none" : isRest ? "1px solid #e2e8f0" : "1px solid rgba(99,102,241,0.12)",
            }}>
            {isToday && !isActive && (
              <span style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", background: "#6366f1", color: "white", fontSize: 7, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "1px 6px", borderRadius: 4 }}>Today</span>
            )}
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: isActive ? "rgba(255,255,255,0.7)" : "#94a3b8" }}>{dayNames[idx] ?? `D${day.day}`}</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: isActive ? "white" : isRest ? "#94a3b8" : "#0f172a" }}>{day.day}</span>
            <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "2px 6px", borderRadius: 4,
              background: isActive ? "rgba(255,255,255,0.2)" : isRest ? "transparent" : "rgba(99,102,241,0.08)",
              color: isActive ? "white" : isRest ? "#94a3b8" : "#6366f1",
              border: isActive ? "1px solid rgba(255,255,255,0.25)" : isRest ? "1px solid #e2e8f0" : "1px solid rgba(99,102,241,0.15)",
            }}>
              {isRest ? "Rest" : (day.workoutType ?? "Train")}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Exercise Card ─── */
function ExerciseCard({ ex, index }) {
  const [expanded, setExpanded] = useState(false);
  const tagType = ex.category?.toLowerCase() === "primary" ? "primary" : ex.category?.toLowerCase() === "secondary" ? "secondary" : "muscle";

  return (
    <div style={{ background: "rgba(238,242,255,0.4)", border: "1px solid #e0e7ff", borderRadius: 14, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: 16 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 8px rgba(99,102,241,0.3)" }}>
          {index + 1}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>{ex.name}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {ex.category && <Tag type={tagType}>{ex.category}</Tag>}
            {(ex.muscleGroups ?? ex.muscles ?? []).map((m, i) => <Tag key={i} type="muscle">{m}</Tag>)}
          </div>
        </div>
        <div style={{ flexShrink: 0, textAlign: "right" }}>
          <p style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.01em" }}>
            {ex.sets} <span style={{ color: "#94a3b8", fontWeight: 400 }}>×</span> {ex.reps}
          </p>
          {ex.restSeconds && <p style={{ fontSize: 10, color: "#94a3b8", marginTop: 3 }}>{ex.restSeconds}s rest</p>}
          {ex.intensityType && <div style={{ marginTop: 5 }}><Tag type="muscle">{ex.intensityType}</Tag></div>}
        </div>
      </div>

      {(ex.trainingEffect || ex.adjustmentHints) && (
        <>
          <button onClick={() => setExpanded(!expanded)}
            style={{ width: "100%", padding: "8px 16px", borderTop: "1px solid #e0e7ff", background: "transparent", border: "none", borderTop: "1px solid #e0e7ff", fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "color 0.2s" }}>
            {expanded ? "Hide Details" : "View Details"}
            <ChevronDown size={12} style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>
          {expanded && (
            <div style={{ padding: 16, borderTop: "1px solid #e0e7ff", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {ex.trainingEffect && (
                <div style={{ background: "rgba(99,102,241,0.05)", border: "1px solid #e0e7ff", borderRadius: 10, padding: 14 }}>
                  <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", marginBottom: 8 }}>Training Effect</p>
                  {ex.trainingEffect.primaryEffect && <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.6, marginBottom: 4 }}><span style={{ color: "#94a3b8" }}>Effect: </span>{ex.trainingEffect.primaryEffect}</p>}
                  {ex.trainingEffect.sportRelevance && <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.6 }}><span style={{ color: "#94a3b8" }}>Sport: </span>{ex.trainingEffect.sportRelevance}</p>}
                </div>
              )}
              {ex.adjustmentHints && (
                <div style={{ background: "rgba(16,185,129,0.05)", border: "1px solid #d1fae5", borderRadius: 10, padding: 14 }}>
                  <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#10b981", marginBottom: 8 }}>Adjustments</p>
                  {ex.adjustmentHints.lowReadiness && <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.6, marginBottom: 4 }}><span style={{ color: "#94a3b8" }}>Low: </span>{ex.adjustmentHints.lowReadiness}</p>}
                  {ex.adjustmentHints.highReadiness && <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.6 }}><span style={{ color: "#94a3b8" }}>High: </span>{ex.adjustmentHints.highReadiness}</p>}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ─── Workout Day Card ─── */
function WorkoutDayCard({ day, isActive }) {
  const [open, setOpen] = useState(isActive);
  const isRest = day.workoutType === "rest" || day.isRestDay;

  if (isRest) {
    return (
      <div style={{ background: "rgba(241,245,249,0.7)", border: "1px solid #e2e8f0", borderRadius: 16, padding: 28, textAlign: "center" }}>
        <p style={{ fontSize: "1.25rem", marginBottom: 6 }}>○</p>
        <p style={{ fontSize: "1rem", fontWeight: 700, color: "#64748b" }}>Day {day.day} — Rest &amp; Recovery</p>
        <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>Adaptation &amp; Tissue Repair</p>
      </div>
    );
  }

  return (
    <div style={{ ...glass, borderRadius: 16, overflow: "hidden", border: isActive ? "1px solid rgba(99,102,241,0.3)" : "1px solid rgba(255,255,255,0.9)", transition: "border-color 0.2s" }}>
      <button onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, flexShrink: 0,
            background: isActive ? "linear-gradient(135deg,#2563eb,#6366f1)" : "rgba(238,242,255,0.8)",
            color: isActive ? "white" : "#6366f1",
            boxShadow: isActive ? "0 2px 10px rgba(99,102,241,0.3)" : "none",
          }}>
            {day.day}
          </div>
          <div>
            <p style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", textTransform: "capitalize" }}>{day.workoutType}</p>
            {day.focus && <p style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{day.focus}</p>}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {day.estimatedDuration && (
            <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>⏱ {day.estimatedDuration}</span>
          )}
          <ChevronDown size={16} style={{ color: "#94a3b8", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
        </div>
      </button>

      {open && (
        <div style={{ padding: "0 24px 24px", borderTop: "1px solid rgba(226,232,240,0.8)" }}>
          {day.exercises && day.exercises.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 16 }}>
              {day.exercises.map((ex, i) => <ExerciseCard key={i} ex={ex} index={i} />)}
            </div>
          ) : (
            <p style={{ paddingTop: 16, fontSize: 12, color: "#94a3b8", textAlign: "center", fontStyle: "italic" }}>
              No exercise details available. Generate AI Plan for a full breakdown.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Global Notes ─── */
function GlobalNotesCard({ notes }) {
  if (!notes) return null;
  return (
    <div style={{ ...glass, borderRadius: 20, overflow: "hidden" }}>
      <div style={{ padding: "18px 28px", borderBottom: "1px solid rgba(226,232,240,0.8)", display: "flex", alignItems: "center", gap: 12, background: "linear-gradient(135deg,rgba(99,102,241,0.04),rgba(139,92,246,0.04))" }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14, boxShadow: "0 2px 8px rgba(99,102,241,0.3)" }}>◈</div>
        <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a" }}>Programme Notes</h2>
      </div>
      <div style={{ padding: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {notes.weeklyEmphasis && (
          <div>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", marginBottom: 10 }}>Weekly Emphasis</p>
            <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.7 }}>{notes.weeklyEmphasis}</p>
          </div>
        )}
        {notes.injuryPreventionFocus && (
          <div>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#10b981", marginBottom: 10 }}>Injury Prevention</p>
            {Array.isArray(notes.injuryPreventionFocus)
              ? notes.injuryPreventionFocus.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>
                    <span style={{ color: "#6366f1", flexShrink: 0 }}>›</span>
                    <span>{item}</span>
                  </div>
                ))
              : <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.7 }}>{notes.injuryPreventionFocus}</p>
            }
          </div>
        )}
        {notes.progressionLogic && (
          <div style={{ gridColumn: "1 / -1", paddingTop: 20, borderTop: "1px solid #f1f5f9" }}>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 10 }}>Progression Logic</p>
            <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.7 }}>{notes.progressionLogic}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function Workout() {
  const { user } = useAuth();
  const [plan,          setPlan]          = useState(null);
  const [loading,       setLoading]       = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [activeDay,     setActiveDay]     = useState(1);

  const fetchPlan = async () => {
    try {
      const res = await planAPI.getActive(user.id);
      setPlan(res.data?.plan || null);
    } catch { setPlan(null); }
    finally { setLoading(false); }
  };

  useEffect(() => { if (user?.id) fetchPlan(); }, [user?.id]);

  const generateBasePlan = async () => {
    try { setActionLoading(true); await planAPI.generate(user.id); await fetchPlan(); }
    catch (err) { alert(err.message || "Base plan generation failed"); }
    finally { setActionLoading(false); }
  };

  const generateAIPlan = async () => {
    try { setActionLoading(true); await aiAPI.generateWeekly(user.id); await fetchPlan(); }
    catch (err) { alert(err.message || "AI plan generation failed"); }
    finally { setActionLoading(false); }
  };

  if (loading) return <BikeLoader />;

  const weekPlan        = plan?.detailedPlan?.weekPlan || plan?.weeklyStructure || [];
  const hasDetailedPlan = !!plan?.detailedPlan?.weekPlan;
  const globalNotes     = plan?.detailedPlan?.globalNotes || null;

  return (
    <div style={{ minHeight: "100vh", position: "relative", fontFamily: "'Outfit', sans-serif" }}>

      {/* Blobs */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div className="animate-blob"                style={{ position:"absolute", top:"-8rem",  right:"-8rem",  width:"26rem", height:"26rem", borderRadius:"50%", background:"#93c5fd", mixBlendMode:"multiply", filter:"blur(72px)", opacity:0.35 }} />
        <div className="animate-blob animation-delay-2000" style={{ position:"absolute", bottom:"-8rem", left:"-8rem",  width:"26rem", height:"26rem", borderRadius:"50%", background:"#c4b5fd", mixBlendMode:"multiply", filter:"blur(72px)", opacity:0.35 }} />
        <div className="animate-blob animation-delay-4000" style={{ position:"absolute", top:"40%",  left:"40%",  width:"20rem", height:"20rem", borderRadius:"50%", background:"#a5b4fc", mixBlendMode:"multiply", filter:"blur(60px)", opacity:0.25, transform:"translate(-50%,-50%)" }} />
      </div>

      {actionLoading && <BikeLoader />}

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "52px 48px 96px", display: "flex", flexDirection: "column", gap: 40 }}>

        {/* Header (contains Trust Strip + Safety Card) */}
        <WorkoutHeader plan={plan} onGenerateBase={generateBasePlan} onGenerateAI={generateAIPlan} actionLoading={actionLoading} />

        {/* Empty state */}
        {weekPlan.length === 0 && (
          <div style={{ ...glass, borderRadius: 24, padding: "80px 32px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 20, border: "2px dashed #c7d2fe" }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", border: "2px dashed #a5b4fc", display: "flex", alignItems: "center", justifyContent: "center", color: "#6366f1" }}>
              <Plus size={28} />
            </div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a" }}>No Active Protocol</h2>
            <p style={{ fontSize: "0.875rem", color: "#64748b", maxWidth: 340, lineHeight: 1.7 }}>
              Generate a base plan to begin. Then unlock detailed AI exercise breakdowns, muscle targeting, and progression logic.
            </p>
            <button onClick={generateBasePlan} disabled={actionLoading}
              style={{ padding: "13px 32px", background: "linear-gradient(135deg,#2563eb,#6366f1,#7c3aed)", color: "white", borderRadius: 14, fontSize: 12, fontWeight: 700, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 16px rgba(99,102,241,0.3)", marginTop: 8 }}>
              <Zap size={16} /> Generate Base Plan
            </button>
          </div>
        )}

        {weekPlan.length > 0 && (
          <>
            {/* Week Calendar */}
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 16 }}>Weekly Overview</p>
              <WeekCalendar weekPlan={weekPlan} activeDay={activeDay} onSelectDay={setActiveDay} />
            </div>

            <div style={{ height: 1, background: "rgba(226,232,240,0.8)" }} />

            {/* AI Banner */}
            {!hasDetailedPlan && (
              <div style={{ background: "rgba(238,242,255,0.7)", border: "1px solid #c7d2fe", borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#6366f1", marginBottom: 4 }}>Detailed Exercise Breakdown Pending</p>
                  <p style={{ fontSize: 11, color: "#64748b" }}>Unlock full exercise breakdowns, muscle targeting, and progression logic for this framework.</p>
                </div>
                <button onClick={generateAIPlan} disabled={actionLoading}
                  style={{ padding: "10px 20px", background: "linear-gradient(135deg,#2563eb,#6366f1)", color: "white", borderRadius: 10, fontSize: 11, fontWeight: 700, border: "none", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", gap: 6, boxShadow: "0 2px 10px rgba(99,102,241,0.25)" }}>
                  <Zap size={13} /> Generate AI Plan
                </button>
              </div>
            )}

            {/* ── 3️⃣ Personalization Summary (above schedule) ── */}
            {plan && (
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 16 }}>Your Profile Match</p>
                <PersonalizationCard plan={plan} />
              </div>
            )}

            {/* Schedule */}
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 16 }}>Workout Schedule</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {weekPlan.map((day) => <WorkoutDayCard key={day.day} day={day} isActive={day.day === activeDay} />)}
              </div>
            </div>

            {/* Global Notes */}
            {globalNotes && (
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 16 }}>Programme Notes</p>
                <GlobalNotesCard notes={globalNotes} />
              </div>
            )}
          </>
        )}

      </div>

      {/* Footer */}
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
              This training framework is intended for general performance guidance. Adjust intensity and volume based on your individual readiness and comfort.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}