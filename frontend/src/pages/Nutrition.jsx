// // // // // // // import { useState } from "react";
// // // // // // // import { nutritionAPI, foodAPI } from "../api/axios";
// // // // // // // import { useAuth } from "../context/AuthContext";

// // // // // // // export default function Nutrition() {
// // // // // // //   const { user } = useAuth();
// // // // // // //   const today = new Date().toISOString().split("T")[0];

// // // // // // //   const [target, setTarget] = useState(null);
// // // // // // //   const [summary, setSummary] = useState(null);
// // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // //   const [food, setFood] = useState({
// // // // // // //     mealType: "breakfast",
// // // // // // //     foodName: "",
// // // // // // //     quantity: "",
// // // // // // //     calories: "",
// // // // // // //     proteinGrams: "",
// // // // // // //     carbsGrams: "",
// // // // // // //     fatGrams: "",
// // // // // // //   });

// // // // // // //   const generateTarget = async () => {
// // // // // // //     setLoading(true);
// // // // // // //     try {
// // // // // // //       const res = await nutritionAPI.generateTarget({
// // // // // // //         userId: user.id,
// // // // // // //         date: today,
// // // // // // //       });

// // // // // // //       setTarget(res.data.nutritionPlan);
// // // // // // //     } catch (err) {
// // // // // // //       alert(err.message || "Failed to generate target");
// // // // // // //     }
// // // // // // //     setLoading(false);
// // // // // // //   };

// // // // // // //   const logFood = async (e) => {
// // // // // // //     e.preventDefault();

// // // // // // //     try {
// // // // // // //       await foodAPI.log({
// // // // // // //         userId: user.id,
// // // // // // //         date: today,
// // // // // // //         ...food,
// // // // // // //       });

// // // // // // //       alert("Food logged");

// // // // // // //     } catch (err) {
// // // // // // //       alert(err.message || "Failed to log food");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const generateSummary = async () => {
// // // // // // //     try {
// // // // // // //       const res = await nutritionAPI.generateSummary(user.id, today);
// // // // // // //       setSummary(res.data.summary);
// // // // // // //     } catch (err) {
// // // // // // //       alert(err.message || "Failed to generate summary");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div>

// // // // // // //       <h1 className="text-3xl font-bold mb-8">
// // // // // // //         Daily Nutrition
// // // // // // //       </h1>

// // // // // // //       {/* Generate Target */}
// // // // // // //       <div className="card mb-8">
// // // // // // //         <button
// // // // // // //           onClick={generateTarget}
// // // // // // //           className="btn-primary"
// // // // // // //           disabled={loading}
// // // // // // //         >
// // // // // // //           {loading ? "Generating..." : "Generate Today's Plan"}
// // // // // // //         </button>

// // // // // // //         {target && (
// // // // // // //           <div className="mt-6 space-y-2">
// // // // // // //             <p>Calories: <strong>{target.calorieTarget}</strong></p>
// // // // // // //             <p>Protein: <strong>{target.proteinTarget}</strong></p>
// // // // // // //             <p>Carbs: <strong>{target.carbsTarget}</strong></p>
// // // // // // //             <p>Fats: <strong>{target.fatsTarget}</strong></p>
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //       </div>

// // // // // // //       {/* Log Food */}
// // // // // // //       <div className="card mb-8">

// // // // // // //         <h2 className="text-xl font-semibold mb-4">
// // // // // // //           Log Food
// // // // // // //         </h2>

// // // // // // //         <form onSubmit={logFood} className="grid grid-cols-2 gap-4">

// // // // // // //           <select
// // // // // // //             value={food.mealType}
// // // // // // //             onChange={(e) =>
// // // // // // //               setFood({ ...food, mealType: e.target.value })
// // // // // // //             }
// // // // // // //             className="input-field"
// // // // // // //           >
// // // // // // //             <option value="breakfast">Breakfast</option>
// // // // // // //             <option value="lunch">Lunch</option>
// // // // // // //             <option value="dinner">Dinner</option>
// // // // // // //             <option value="snack">Snack</option>
// // // // // // //           </select>

// // // // // // //           <input
// // // // // // //             placeholder="Food Name"
// // // // // // //             required
// // // // // // //             value={food.foodName}
// // // // // // //             onChange={(e) =>
// // // // // // //               setFood({ ...food, foodName: e.target.value })
// // // // // // //             }
// // // // // // //             className="input-field"
// // // // // // //           />

// // // // // // //           <input
// // // // // // //             placeholder="Quantity"
// // // // // // //             value={food.quantity}
// // // // // // //             onChange={(e) =>
// // // // // // //               setFood({ ...food, quantity: e.target.value })
// // // // // // //             }
// // // // // // //             className="input-field"
// // // // // // //           />

// // // // // // //           <input
// // // // // // //             type="number"
// // // // // // //             placeholder="Calories"
// // // // // // //             required
// // // // // // //             value={food.calories}
// // // // // // //             onChange={(e) =>
// // // // // // //               setFood({ ...food, calories: e.target.value })
// // // // // // //             }
// // // // // // //             className="input-field"
// // // // // // //           />

// // // // // // //           <input
// // // // // // //             type="number"
// // // // // // //             placeholder="Protein (g)"
// // // // // // //             value={food.proteinGrams}
// // // // // // //             onChange={(e) =>
// // // // // // //               setFood({ ...food, proteinGrams: e.target.value })
// // // // // // //             }
// // // // // // //             className="input-field"
// // // // // // //           />

// // // // // // //           <input
// // // // // // //             type="number"
// // // // // // //             placeholder="Carbs (g)"
// // // // // // //             value={food.carbsGrams}
// // // // // // //             onChange={(e) =>
// // // // // // //               setFood({ ...food, carbsGrams: e.target.value })
// // // // // // //             }
// // // // // // //             className="input-field"
// // // // // // //           />

// // // // // // //           <input
// // // // // // //             type="number"
// // // // // // //             placeholder="Fat (g)"
// // // // // // //             value={food.fatGrams}
// // // // // // //             onChange={(e) =>
// // // // // // //               setFood({ ...food, fatGrams: e.target.value })
// // // // // // //             }
// // // // // // //             className="input-field"
// // // // // // //           />

// // // // // // //           <button
// // // // // // //             type="submit"
// // // // // // //             className="btn-primary col-span-2"
// // // // // // //           >
// // // // // // //             Log Food
// // // // // // //           </button>

// // // // // // //         </form>

// // // // // // //       </div>

// // // // // // //       {/* Summary */}
// // // // // // //       <div className="card">

// // // // // // //         <button
// // // // // // //           onClick={generateSummary}
// // // // // // //           className="btn-outline mb-6"
// // // // // // //         >
// // // // // // //           Generate Summary
// // // // // // //         </button>

// // // // // // //         {summary && (
// // // // // // //           <div className="space-y-2">
// // // // // // //             <p>Status: <strong>{summary.status}</strong></p>
// // // // // // //             <p>Consumed Calories: {summary.consumedCalories}</p>
// // // // // // //             <p>Target Calories: {summary.targetCalories}</p>
// // // // // // //             <p>Difference: {summary.calorieDifference}</p>
// // // // // // //           </div>
// // // // // // //         )}

// // // // // // //       </div>

// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }


// // // // // // import { useState } from "react";
// // // // // // import { nutritionAPI, foodAPI } from "../api/axios";
// // // // // // import { useAuth } from "../context/AuthContext";

// // // // // // export default function Nutrition() {
// // // // // //   const { user } = useAuth();
// // // // // //   const today = new Date().toISOString().split("T")[0];

// // // // // //   const [target, setTarget] = useState(null);
// // // // // //   const [summary, setSummary] = useState(null);
// // // // // //   const [loading, setLoading] = useState(false);

// // // // // //   const [food, setFood] = useState({
// // // // // //     mealType: "breakfast",
// // // // // //     foodName: "",
// // // // // //     quantity: "",
// // // // // //     calories: "",
// // // // // //     proteinGrams: "",
// // // // // //     carbsGrams: "",
// // // // // //     fatGrams: "",
// // // // // //   });

// // // // // //   /* ================= GENERATE TARGET ================= */
// // // // // //   const generateTarget = async () => {
// // // // // //     setLoading(true);

// // // // // //     try {
// // // // // //       const res = await nutritionAPI.generateTarget({
// // // // // //         userId: user?._id || user?.id,
// // // // // //         date: today,
// // // // // //       });

// // // // // //       setTarget(res.data.nutritionPlan);

// // // // // //     } catch (err) {
// // // // // //       console.error("ERROR:", err);
// // // // // //       alert(err.message || "Failed to generate target");
// // // // // //     }

// // // // // //     setLoading(false);
// // // // // //   };

// // // // // //   // const generateTarget = async () => {
// // // // // //   //   setLoading(true);
// // // // // //   //   try {
// // // // // //   //     const res = await nutritionAPI.generateTarget({
// // // // // //   //       userId: user._id,
// // // // // //   //       date: today,
// // // // // //   //     });

// // // // // //   //     setTarget(res.data.nutritionPlan);
// // // // // //   //   } catch (err) {
// // // // // //   //     if (!userId || !date) {
// // // // // //   //       return res.status(400).json({
// // // // // //   //         message: "userId and date are required"
// // // // // //   //       });
// // // // // //   //     }
// // // // // //   //     alert(err.response?.data?.message || "Failed to generate target");
// // // // // //   //   }
// // // // // //   //   setLoading(false);
// // // // // //   // };

// // // // // //   /* ================= LOG FOOD ================= */

// // // // // //   const logFood = async (e) => {
// // // // // //     e.preventDefault();

// // // // // //     try {
// // // // // //       await foodAPI.log({
// // // // // //         userId: user?.id,
// // // // // //         date: today,
// // // // // //         ...food,
// // // // // //         calories: Number(food.calories),
// // // // // //         proteinGrams: Number(food.proteinGrams) || 0,
// // // // // //         carbsGrams: Number(food.carbsGrams) || 0,
// // // // // //         fatGrams: Number(food.fatGrams) || 0,
// // // // // //       });

// // // // // //       alert("Food logged successfully");

// // // // // //       setFood({
// // // // // //         mealType: "breakfast",
// // // // // //         foodName: "",
// // // // // //         quantity: "",
// // // // // //         calories: "",
// // // // // //         proteinGrams: "",
// // // // // //         carbsGrams: "",
// // // // // //         fatGrams: "",
// // // // // //       });

// // // // // //     } catch (err) {
// // // // // //       if (!userId || !date || !mealType || !foodName || calories == null) {
// // // // // //         return res.status(400).json({
// // // // // //           message: "Missing required fields"
// // // // // //         });
// // // // // //       }
// // // // // //       alert(err.response?.data?.message || "Failed to log food");
// // // // // //     }
// // // // // //   };

// // // // // //   /* ================= GENERATE SUMMARY ================= */

// // // // // //   const generateSummary = async () => {
// // // // // //     try {
// // // // // //       const res = await nutritionAPI.generateSummary(user?.id, today);
// // // // // //       setSummary(res.data.summary);
// // // // // //     } catch (err) {
// // // // // //         if (!user?.id || !today) {
// // // // // //         return res.status(400).json({
// // // // // //           message: "Missing required fields"
// // // // // //         });
// // // // // //       }
// // // // // //       alert(err.response?.data?.message || "Failed to generate summary");
// // // // // //     }
// // // // // //   };

// // // // // //   /* ================= RENDER ================= */

// // // // // //   return (
// // // // // //     <div className="space-y-8">

// // // // // //       <h1 className="text-3xl font-bold">
// // // // // //         Daily Nutrition
// // // // // //       </h1>

// // // // // //       {/* ================= TARGET SECTION ================= */}

// // // // // //       <div className="card space-y-4">

// // // // // //         <button
// // // // // //           onClick={generateTarget}
// // // // // //           className="btn-primary"
// // // // // //           disabled={loading}
// // // // // //         >
// // // // // //           {loading ? "Generating..." : "Generate Today's Plan"}
// // // // // //         </button>

// // // // // //         {target && (
// // // // // //           <>
// // // // // //             <div className="grid grid-cols-2 gap-4 mt-4">
// // // // // //               <div>Calories: <strong>{target.calorieTarget}</strong></div>
// // // // // //               <div>Protein: <strong>{target.proteinTarget} g</strong></div>
// // // // // //               <div>Carbs: <strong>{target.carbsTarget} g</strong></div>
// // // // // //               <div>Fats: <strong>{target.fatsTarget} g</strong></div>
// // // // // //             </div>

// // // // // //             {/* ================= AI MEAL PLAN ================= */}

// // // // // //             <div className="mt-8 space-y-6">
// // // // // //               <h2 className="text-xl font-semibold">
// // // // // //                 AI Meal Plan
// // // // // //               </h2>

// // // // // //               {target.aiGeneratedPlan?.weekNutritionPlan?.[0]?.meals?.map(
// // // // // //                 (meal, index) => (
// // // // // //                   <div key={index} className="border p-4 rounded-lg">

// // // // // //                     <h3 className="font-semibold capitalize mb-2">
// // // // // //                       {meal.mealType.replace("_", " ")}
// // // // // //                     </h3>

// // // // // //                     {meal.foods.map((food, i) => (
// // // // // //                       <div key={i} className="text-sm mb-2">
// // // // // //                         <p><strong>{food.name}</strong></p>
// // // // // //                         <p>{food.quantity}</p>
// // // // // //                         <p>
// // // // // //                           {food.calories} kcal |
// // // // // //                           P: {food.protein}g |
// // // // // //                           C: {food.carbs}g |
// // // // // //                           F: {food.fats}g
// // // // // //                         </p>
// // // // // //                       </div>
// // // // // //                     ))}

// // // // // //                   </div>
// // // // // //                 )
// // // // // //               )}
// // // // // //             </div>

// // // // // //           </>
// // // // // //         )}

// // // // // //       </div>

// // // // // //       {/* ================= FOOD LOG ================= */}

// // // // // //       <div className="card">

// // // // // //         <h2 className="text-xl font-semibold mb-4">
// // // // // //           Log Food
// // // // // //         </h2>

// // // // // //         <form onSubmit={logFood} className="grid grid-cols-2 gap-4">

// // // // // //           <select
// // // // // //             value={food.mealType}
// // // // // //             onChange={(e) =>
// // // // // //               setFood({ ...food, mealType: e.target.value })
// // // // // //             }
// // // // // //             className="input-field"
// // // // // //           >
// // // // // //             <option value="breakfast">Breakfast</option>
// // // // // //             <option value="lunch">Lunch</option>
// // // // // //             <option value="dinner">Dinner</option>
// // // // // //             <option value="snack">Snack</option>
// // // // // //           </select>

// // // // // //           <input
// // // // // //             placeholder="Food Name"
// // // // // //             required
// // // // // //             value={food.foodName}
// // // // // //             onChange={(e) =>
// // // // // //               setFood({ ...food, foodName: e.target.value })
// // // // // //             }
// // // // // //             className="input-field"
// // // // // //           />

// // // // // //           <input
// // // // // //             placeholder="Quantity"
// // // // // //             value={food.quantity}
// // // // // //             onChange={(e) =>
// // // // // //               setFood({ ...food, quantity: e.target.value })
// // // // // //             }
// // // // // //             className="input-field"
// // // // // //           />

// // // // // //           <input
// // // // // //             type="number"
// // // // // //             placeholder="Calories"
// // // // // //             required
// // // // // //             value={food.calories}
// // // // // //             onChange={(e) =>
// // // // // //               setFood({ ...food, calories: e.target.value })
// // // // // //             }
// // // // // //             className="input-field"
// // // // // //           />

// // // // // //           <input
// // // // // //             type="number"
// // // // // //             placeholder="Protein (g)"
// // // // // //             value={food.proteinGrams}
// // // // // //             onChange={(e) =>
// // // // // //               setFood({ ...food, proteinGrams: e.target.value })
// // // // // //             }
// // // // // //             className="input-field"
// // // // // //           />

// // // // // //           <input
// // // // // //             type="number"
// // // // // //             placeholder="Carbs (g)"
// // // // // //             value={food.carbsGrams}
// // // // // //             onChange={(e) =>
// // // // // //               setFood({ ...food, carbsGrams: e.target.value })
// // // // // //             }
// // // // // //             className="input-field"
// // // // // //           />

// // // // // //           <input
// // // // // //             type="number"
// // // // // //             placeholder="Fat (g)"
// // // // // //             value={food.fatGrams}
// // // // // //             onChange={(e) =>
// // // // // //               setFood({ ...food, fatGrams: e.target.value })
// // // // // //             }
// // // // // //             className="input-field"
// // // // // //           />

// // // // // //           <button
// // // // // //             type="submit"
// // // // // //             className="btn-primary col-span-2"
// // // // // //           >
// // // // // //             Log Food
// // // // // //           </button>

// // // // // //         </form>

// // // // // //       </div>

// // // // // //       {/* ================= SUMMARY ================= */}

// // // // // //       <div className="card">

// // // // // //         <button
// // // // // //           onClick={generateSummary}
// // // // // //           className="btn-outline mb-6"
// // // // // //         >
// // // // // //           Generate Summary
// // // // // //         </button>

// // // // // //         {summary && (
// // // // // //           <div className="space-y-2">

// // // // // //             <p>Status: <strong>{summary.status}</strong></p>

// // // // // //             <p>
// // // // // //               Calories: {summary.consumedCalories} / {summary.targetCalories}
// // // // // //             </p>

// // // // // //             <p>
// // // // // //               Protein: {summary.consumedProtein} / {summary.targetProtein}
// // // // // //             </p>

// // // // // //             <p>
// // // // // //               Difference: {summary.calorieDifference}
// // // // // //             </p>

// // // // // //           </div>
// // // // // //         )}

// // // // // //       </div>

// // // // // //     </div>
// // // // // //   );
// // // // // // }


// // // // // import { useState } from "react";
// // // // // import { nutritionAPI, foodAPI } from "../api/axios";
// // // // // import { useAuth } from "../context/AuthContext";

// // // // // /* ─────────────────────────────────────────────
// // // // //    MACRO RING / STAT CARD
// // // // // ───────────────────────────────────────────── */
// // // // // function MacroCard({ label, value, unit, color }) {
// // // // //   const colors = {
// // // // //     orange: "border-orange-500/40 bg-orange-500/10 text-orange-400",
// // // // //     blue: "border-blue-500/40 bg-blue-500/10 text-blue-400",
// // // // //     purple: "border-purple-500/40 bg-purple-500/10 text-purple-400",
// // // // //     green: "border-green-500/40 bg-green-500/10 text-green-400",
// // // // //   };
// // // // //   return (
// // // // //     <div className={`rounded-xl border px-4 py-4 flex flex-col items-center justify-center text-center ${colors[color]}`}>
// // // // //       <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{label}</p>
// // // // //       <p className="text-2xl font-black text-white">
// // // // //         {value ?? "—"}
// // // // //       </p>
// // // // //       <p className="text-xs text-gray-500 mt-0.5">{unit}</p>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // /* ─────────────────────────────────────────────
// // // // //    PROGRESS BAR
// // // // // ───────────────────────────────────────────── */
// // // // // function ProgressBar({ label, consumed, target, color = "bg-orange-500" }) {
// // // // //   const pct = target > 0 ? Math.min(100, Math.round((consumed / target) * 100)) : 0;
// // // // //   const over = target > 0 && consumed > target;
// // // // //   return (
// // // // //     <div className="space-y-1.5">
// // // // //       <div className="flex justify-between text-xs">
// // // // //         <span className="text-gray-400 font-semibold">{label}</span>
// // // // //         <span className={`font-bold ${over ? "text-red-400" : "text-white"}`}>
// // // // //           {consumed} / {target}
// // // // //         </span>
// // // // //       </div>
// // // // //       <div className="h-2 bg-gray-700/60 rounded-full overflow-hidden">
// // // // //         <div
// // // // //           className={`h-full rounded-full transition-all duration-500 ${over ? "bg-red-500" : color}`}
// // // // //           style={{ width: `${pct}%` }}
// // // // //         />
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // /* ─────────────────────────────────────────────
// // // // //    MEAL TYPE BADGE
// // // // // ───────────────────────────────────────────── */
// // // // // const mealColors = {
// // // // //   breakfast: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
// // // // //   pre_workout: "bg-orange-500/20 text-orange-400 border-orange-500/30",
// // // // //   post_workout: "bg-green-500/20 text-green-400 border-green-500/30",
// // // // //   lunch: "bg-blue-500/20 text-blue-400 border-blue-500/30",
// // // // //   snack: "bg-purple-500/20 text-purple-400 border-purple-500/30",
// // // // //   dinner: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
// // // // //   optional_snack: "bg-gray-500/20 text-gray-400 border-gray-500/30",
// // // // // };

// // // // // function MealBadge({ type }) {
// // // // //   const cls = mealColors[type] ?? "bg-gray-700/50 text-gray-300 border-gray-600/40";
// // // // //   return (
// // // // //     <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-widest ${cls}`}>
// // // // //       {type.replace(/_/g, " ")}
// // // // //     </span>
// // // // //   );
// // // // // }

// // // // // /* ─────────────────────────────────────────────
// // // // //    FOOD ITEM ROW
// // // // // ───────────────────────────────────────────── */
// // // // // function FoodRow({ food }) {
// // // // //   return (
// // // // //     <div className="flex items-center justify-between py-2.5 border-b border-gray-700/30 last:border-0">
// // // // //       <div className="flex-1 min-w-0">
// // // // //         <p className="text-white text-sm font-semibold truncate">{food.name}</p>
// // // // //         <p className="text-gray-500 text-xs">{food.quantity}</p>
// // // // //       </div>
// // // // //       <div className="flex gap-3 shrink-0 ml-4 text-right">
// // // // //         <div className="text-center">
// // // // //           <p className="text-white text-sm font-bold">{food.calories}</p>
// // // // //           <p className="text-gray-600 text-[10px]">kcal</p>
// // // // //         </div>
// // // // //         <div className="text-center hidden sm:block">
// // // // //           <p className="text-blue-400 text-sm font-bold">{food.protein}g</p>
// // // // //           <p className="text-gray-600 text-[10px]">P</p>
// // // // //         </div>
// // // // //         <div className="text-center hidden sm:block">
// // // // //           <p className="text-yellow-400 text-sm font-bold">{food.carbs}g</p>
// // // // //           <p className="text-gray-600 text-[10px]">C</p>
// // // // //         </div>
// // // // //         <div className="text-center hidden sm:block">
// // // // //           <p className="text-orange-400 text-sm font-bold">{food.fats}g</p>
// // // // //           <p className="text-gray-600 text-[10px]">F</p>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // /* ─────────────────────────────────────────────
// // // // //    MEAL CARD (collapsible)
// // // // // ───────────────────────────────────────────── */
// // // // // function MealCard({ meal }) {
// // // // //   const [open, setOpen] = useState(false);
// // // // //   const totalCals = meal.foods.reduce((acc, f) => acc + (f.calories || 0), 0);
// // // // //   const totalP = meal.foods.reduce((acc, f) => acc + (f.protein || 0), 0);

// // // // //   return (
// // // // //     <div className="rounded-xl border border-gray-700/40 bg-gray-800/50 overflow-hidden">
// // // // //       <button
// // // // //         onClick={() => setOpen(!open)}
// // // // //         className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors"
// // // // //       >
// // // // //         <div className="flex items-center gap-3">
// // // // //           <MealBadge type={meal.mealType} />
// // // // //           <span className="text-gray-400 text-xs hidden sm:block">{meal.foods.length} items</span>
// // // // //         </div>
// // // // //         <div className="flex items-center gap-4">
// // // // //           <div className="text-right hidden sm:block">
// // // // //             <span className="text-white text-sm font-black">{totalCals} kcal</span>
// // // // //             <span className="text-gray-500 text-xs ml-2">· {Math.round(totalP)}g P</span>
// // // // //           </div>
// // // // //           <span className={`text-gray-500 text-sm transition-transform duration-200 ${open ? "rotate-180" : ""}`}>▾</span>
// // // // //         </div>
// // // // //       </button>

// // // // //       {open && (
// // // // //         <div className="px-5 pb-4 pt-1 border-t border-gray-700/30">
// // // // //           {meal.foods.map((food, i) => (
// // // // //             <FoodRow key={i} food={food} />
// // // // //           ))}
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // /* ─────────────────────────────────────────────
// // // // //    DAY PLAN CARD
// // // // // ───────────────────────────────────────────── */
// // // // // function DayPlanCard({ dayPlan }) {
// // // // //   const [open, setOpen] = useState(dayPlan.day === 1);
// // // // //   const s = dayPlan.daySummary;

// // // // //   const isRest = dayPlan.workoutType === "rest";

// // // // //   return (
// // // // //     <div className={`rounded-xl border overflow-hidden transition-all ${open ? "border-orange-500/40 bg-gray-800/90" : "border-gray-700/40 bg-gray-800/40"}`}>
// // // // //       <button
// // // // //         onClick={() => setOpen(!open)}
// // // // //         className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
// // // // //       >
// // // // //         <div className="flex items-center gap-4">
// // // // //           <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm shrink-0 ${open ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-300"}`}>
// // // // //             {dayPlan.day}
// // // // //           </div>
// // // // //           <div className="text-left">
// // // // //             <p className="text-white font-bold capitalize">Day {dayPlan.day} — {dayPlan.workoutType}</p>
// // // // //             <p className="text-gray-400 text-xs mt-0.5">
// // // // //               {s?.totalCalories} kcal · {s?.proteinGrams}g P · {s?.carbsGrams}g C · {s?.fatsGrams}g F · 💧 {s?.hydrationLiters}L
// // // // //             </p>
// // // // //           </div>
// // // // //         </div>
// // // // //         <div className="flex items-center gap-3">
// // // // //           {isRest && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-700 text-gray-400 border border-gray-600/40 uppercase tracking-wider">Rest</span>}
// // // // //           <span className={`text-gray-500 text-sm transition-transform duration-200 ${open ? "rotate-180" : ""}`}>▾</span>
// // // // //         </div>
// // // // //       </button>

// // // // //       {open && (
// // // // //         <div className="px-6 pb-6 pt-1 border-t border-gray-700/30 space-y-3">
// // // // //           {/* Day macro summary */}
// // // // //           <div className="grid grid-cols-4 gap-2 mb-4">
// // // // //             <MacroCard label="Calories" value={s?.totalCalories} unit="kcal" color="orange" />
// // // // //             <MacroCard label="Protein" value={s?.proteinGrams} unit="grams" color="blue" />
// // // // //             <MacroCard label="Carbs" value={s?.carbsGrams} unit="grams" color="purple" />
// // // // //             <MacroCard label="Fats" value={s?.fatsGrams} unit="grams" color="green" />
// // // // //           </div>
// // // // //           {dayPlan.meals.map((meal, i) => (
// // // // //             <MealCard key={i} meal={meal} />
// // // // //           ))}
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // /* ─────────────────────────────────────────────
// // // // //    WEEKLY NOTES CARD
// // // // // ───────────────────────────────────────────── */
// // // // // function WeeklyNotesCard({ notes }) {
// // // // //   if (!notes) return null;
// // // // //   const items = [
// // // // //     { label: "Carb Cycling Strategy", key: "carbCyclingStrategy", color: "text-orange-400" },
// // // // //     { label: "Recovery Focus", key: "recoveryFocus", color: "text-blue-400" },
// // // // //     { label: "Budget Efficiency", key: "budgetEfficiency", color: "text-green-400" },
// // // // //   ];
// // // // //   return (
// // // // //     <div className="rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800/80 to-gray-900/80 overflow-hidden shadow-xl">
// // // // //       <div className="px-6 py-4 border-b border-gray-700/40 flex items-center gap-3">
// // // // //         <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 text-sm">📊</div>
// // // // //         <h2 className="text-white font-black text-lg">Weekly Nutrition Notes</h2>
// // // // //       </div>
// // // // //       <div className="p-6 space-y-5">
// // // // //         {items.map(({ label, key, color }) =>
// // // // //           notes[key] ? (
// // // // //             <div key={key} className="space-y-1.5">
// // // // //               <p className={`text-[10px] font-bold uppercase tracking-widest ${color}`}>{label}</p>
// // // // //               <p className="text-gray-300 text-sm leading-relaxed">{notes[key]}</p>
// // // // //             </div>
// // // // //           ) : null
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // /* ─────────────────────────────────────────────
// // // // //    LOG FOOD FORM
// // // // // ───────────────────────────────────────────── */
// // // // // function LogFoodCard({ onLog }) {
// // // // //   const [food, setFood] = useState({
// // // // //     mealType: "breakfast",
// // // // //     foodName: "",
// // // // //     quantity: "",
// // // // //     calories: "",
// // // // //     proteinGrams: "",
// // // // //     carbsGrams: "",
// // // // //     fatGrams: "",
// // // // //   });
// // // // //   const [submitting, setSubmitting] = useState(false);
// // // // //   const [success, setSuccess] = useState(false);

// // // // //   const handleSubmit = async (e) => {
// // // // //     e.preventDefault();
// // // // //     setSubmitting(true);
// // // // //     try {
// // // // //       await onLog(food);
// // // // //       setSuccess(true);
// // // // //       setFood({ mealType: "breakfast", foodName: "", quantity: "", calories: "", proteinGrams: "", carbsGrams: "", fatGrams: "" });
// // // // //       setTimeout(() => setSuccess(false), 3000);
// // // // //     } catch {}
// // // // //     setSubmitting(false);
// // // // //   };

// // // // //   const inp = "w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/60 focus:bg-gray-700/80 transition-all";

// // // // //   return (
// // // // //     <div className="rounded-2xl border border-gray-700/50 bg-gray-800/60 overflow-hidden">
// // // // //       <div className="px-6 py-4 border-b border-gray-700/40 flex items-center gap-3">
// // // // //         <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400 text-sm">✏️</div>
// // // // //         <h2 className="text-white font-black text-lg">Log Food</h2>
// // // // //       </div>

// // // // //       <form onSubmit={handleSubmit} className="p-6 grid grid-cols-2 gap-4">
// // // // //         <select
// // // // //           value={food.mealType}
// // // // //           onChange={(e) => setFood({ ...food, mealType: e.target.value })}
// // // // //           className={`${inp} col-span-2`}
// // // // //         >
// // // // //           <option value="breakfast">Breakfast</option>
// // // // //           <option value="pre_workout">Pre Workout</option>
// // // // //           <option value="post_workout">Post Workout</option>
// // // // //           <option value="lunch">Lunch</option>
// // // // //           <option value="snack">Snack</option>
// // // // //           <option value="dinner">Dinner</option>
// // // // //         </select>

// // // // //         <input placeholder="Food Name *" required value={food.foodName}
// // // // //           onChange={(e) => setFood({ ...food, foodName: e.target.value })} className={`${inp} col-span-2`} />

// // // // //         <input placeholder="Quantity (e.g. 100g)" value={food.quantity}
// // // // //           onChange={(e) => setFood({ ...food, quantity: e.target.value })} className={inp} />

// // // // //         <input type="number" placeholder="Calories *" required value={food.calories}
// // // // //           onChange={(e) => setFood({ ...food, calories: e.target.value })} className={inp} />

// // // // //         <input type="number" placeholder="Protein (g)" value={food.proteinGrams}
// // // // //           onChange={(e) => setFood({ ...food, proteinGrams: e.target.value })} className={inp} />

// // // // //         <input type="number" placeholder="Carbs (g)" value={food.carbsGrams}
// // // // //           onChange={(e) => setFood({ ...food, carbsGrams: e.target.value })} className={inp} />

// // // // //         <input type="number" placeholder="Fat (g)" value={food.fatGrams}
// // // // //           onChange={(e) => setFood({ ...food, fatGrams: e.target.value })} className={`${inp} col-span-2`} />

// // // // //         <button
// // // // //           type="submit"
// // // // //           disabled={submitting}
// // // // //           className="col-span-2 px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 active:scale-95 transition-all text-white text-sm font-bold shadow-lg shadow-orange-500/30 disabled:opacity-50"
// // // // //         >
// // // // //           {submitting ? "Logging..." : success ? "✓ Logged!" : "Log Food"}
// // // // //         </button>
// // // // //       </form>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // /* ─────────────────────────────────────────────
// // // // //    DAILY SUMMARY CARD
// // // // // ───────────────────────────────────────────── */
// // // // // function SummaryCard({ summary, onGenerate }) {
// // // // //   const statusColors = {
// // // // //     over: "text-red-400 bg-red-500/10 border-red-500/30",
// // // // //     under: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
// // // // //     on_track: "text-green-400 bg-green-500/10 border-green-500/30",
// // // // //   };
// // // // //   const statusCls = statusColors[summary?.status] ?? "text-gray-400 bg-gray-700/30 border-gray-600/30";

// // // // //   return (
// // // // //     <div className="rounded-2xl border border-gray-700/50 bg-gray-800/60 overflow-hidden">
// // // // //       <div className="px-6 py-4 border-b border-gray-700/40 flex items-center justify-between">
// // // // //         <div className="flex items-center gap-3">
// // // // //           <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-sm">📈</div>
// // // // //           <h2 className="text-white font-black text-lg">Today's Summary</h2>
// // // // //         </div>
// // // // //         <button
// // // // //           onClick={onGenerate}
// // // // //           className="px-4 py-2 rounded-xl border border-orange-500/50 hover:bg-orange-500/10 text-orange-400 text-xs font-bold transition-all active:scale-95"
// // // // //         >
// // // // //           Refresh Summary
// // // // //         </button>
// // // // //       </div>

// // // // //       {!summary ? (
// // // // //         <div className="px-6 py-10 flex flex-col items-center text-center">
// // // // //           <p className="text-4xl mb-3">📊</p>
// // // // //           <p className="text-gray-400 text-sm">Generate a summary to see your daily progress.</p>
// // // // //         </div>
// // // // //       ) : (
// // // // //         <div className="p-6 space-y-5">
// // // // //           <div className="flex items-center gap-3">
// // // // //             <span className="text-gray-400 text-sm font-semibold">Status:</span>
// // // // //             <span className={`text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-widest ${statusCls}`}>
// // // // //               {summary.status}
// // // // //             </span>
// // // // //             {summary.calorieDifference != null && (
// // // // //               <span className={`text-xs font-semibold ${summary.calorieDifference > 0 ? "text-red-400" : "text-green-400"}`}>
// // // // //                 {summary.calorieDifference > 0 ? `+${summary.calorieDifference}` : summary.calorieDifference} kcal
// // // // //               </span>
// // // // //             )}
// // // // //           </div>

// // // // //           <div className="space-y-3">
// // // // //             <ProgressBar
// // // // //               label="Calories"
// // // // //               consumed={summary.consumedCalories}
// // // // //               target={summary.targetCalories}
// // // // //               color="bg-orange-500"
// // // // //             />
// // // // //             <ProgressBar
// // // // //               label="Protein"
// // // // //               consumed={summary.consumedProtein}
// // // // //               target={summary.targetProtein}
// // // // //               color="bg-blue-500"
// // // // //             />
// // // // //             <ProgressBar
// // // // //               label="Carbs"
// // // // //               consumed={summary.consumedCarbs}
// // // // //               target={summary.targetCarbs}
// // // // //               color="bg-purple-500"
// // // // //             />
// // // // //             <ProgressBar
// // // // //               label="Fat"
// // // // //               consumed={summary.consumedFat}
// // // // //               target={summary.targetFat}
// // // // //               color="bg-green-500"
// // // // //             />
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // /* ─────────────────────────────────────────────
// // // // //    MAIN PAGE
// // // // // ───────────────────────────────────────────── */
// // // // // export default function Nutrition() {
// // // // //   const { user } = useAuth();
// // // // //   const today = new Date().toISOString().split("T")[0];

// // // // //   const [target, setTarget] = useState(null);
// // // // //   const [summary, setSummary] = useState(null);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [activePlanDay, setActivePlanDay] = useState(0); // index into weekNutritionPlan

// // // // //   /* ── Generate Target ── */
// // // // //   const generateTarget = async () => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const res = await nutritionAPI.generateTarget({
// // // // //         userId: user?._id || user?.id,
// // // // //         date: today,
// // // // //       });
// // // // //       setTarget(res.data.nutritionPlan);
// // // // //     } catch (err) {
// // // // //       alert(err.response?.data?.message || err.message || "Failed to generate target");
// // // // //     }
// // // // //     setLoading(false);
// // // // //   };

// // // // //   /* ── Log Food ── */
// // // // //   const logFood = async (food) => {
// // // // //     try {
// // // // //       await foodAPI.log({
// // // // //         userId: user?.id,
// // // // //         date: today,
// // // // //         ...food,
// // // // //         calories: Number(food.calories),
// // // // //         proteinGrams: Number(food.proteinGrams) || 0,
// // // // //         carbsGrams: Number(food.carbsGrams) || 0,
// // // // //         fatGrams: Number(food.fatGrams) || 0,
// // // // //       });
// // // // //     } catch (err) {
// // // // //       alert(err.response?.data?.message || "Failed to log food");
// // // // //       throw err;
// // // // //     }
// // // // //   };

// // // // //   /* ── Generate Summary ── */
// // // // //   const generateSummary = async () => {
// // // // //     try {
// // // // //       const res = await nutritionAPI.generateSummary(user?.id, today);
// // // // //       setSummary(res.data.summary);
// // // // //     } catch (err) {
// // // // //       alert(err.response?.data?.message || "Failed to generate summary");
// // // // //     }
// // // // //   };

// // // // //   const weekPlan = target?.aiGeneratedPlan?.weekNutritionPlan ?? [];
// // // // //   const weeklyNotes = target?.aiGeneratedPlan?.weeklyNotes ?? null;
// // // // //   const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-950 text-white">
// // // // //       <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

// // // // //         {/* ── HERO HEADER ── */}
// // // // //         <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/60 shadow-2xl p-8">
// // // // //           <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

// // // // //           <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
// // // // //             <div className="space-y-3">
// // // // //               <p className="text-orange-400 text-xs font-semibold tracking-[0.2em] uppercase">Nutrition Dashboard</p>
// // // // //               <h1 className="text-3xl font-black text-white tracking-tight">Daily Nutrition Plan</h1>
// // // // //               <p className="text-gray-400 text-sm">
// // // // //                 {today} &nbsp;·&nbsp; {target ? `Generated by ${target.generatedBy}` : "No plan generated yet"}
// // // // //               </p>

// // // // //               {/* Targets row */}
// // // // //               {target && (
// // // // //                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
// // // // //                   <MacroCard label="Calories" value={target.calorieTarget} unit="kcal" color="orange" />
// // // // //                   <MacroCard label="Protein" value={target.proteinTarget} unit="grams" color="blue" />
// // // // //                   <MacroCard label="Carbs" value={target.carbsTarget} unit="grams" color="purple" />
// // // // //                   <MacroCard label="Fats" value={target.fatsTarget} unit="grams" color="green" />
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>

// // // // //             <div className="shrink-0">
// // // // //               <button
// // // // //                 onClick={generateTarget}
// // // // //                 disabled={loading}
// // // // //                 className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 active:scale-95 transition-all text-white text-sm font-bold shadow-lg shadow-orange-500/30 disabled:opacity-50 whitespace-nowrap"
// // // // //               >
// // // // //                 {loading ? "Generating..." : target ? "Regenerate Plan" : "Generate Today's Plan"}
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* ── NO PLAN STATE ── */}
// // // // //         {!target && (
// // // // //           <div className="rounded-2xl border border-dashed border-gray-700 bg-gray-800/30 py-20 flex flex-col items-center justify-center gap-4 text-center">
// // // // //             <div className="text-5xl">🥗</div>
// // // // //             <p className="text-white font-bold text-xl">No nutrition plan yet.</p>
// // // // //             <p className="text-gray-400 text-sm max-w-xs">Generate a workout-aligned AI nutrition plan to see your daily meal schedule and macro targets.</p>
// // // // //             <button
// // // // //               onClick={generateTarget}
// // // // //               disabled={loading}
// // // // //               className="mt-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm shadow-lg shadow-orange-500/30 transition-all active:scale-95 disabled:opacity-50"
// // // // //             >
// // // // //               {loading ? "Generating..." : "Generate Plan"}
// // // // //             </button>
// // // // //           </div>
// // // // //         )}

// // // // //         {target && weekPlan.length > 0 && (
// // // // //           <>
// // // // //             {/* ── WEEK DAY STRIP ── */}
// // // // //             <div className="space-y-3">
// // // // //               <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Weekly Overview</p>
// // // // //               <div className="grid grid-cols-7 gap-2">
// // // // //                 {weekPlan.map((day, idx) => {
// // // // //                   const isRest = day.workoutType === "rest";
// // // // //                   const isActive = activePlanDay === idx;
// // // // //                   return (
// // // // //                     <button
// // // // //                       key={day.day}
// // // // //                       onClick={() => setActivePlanDay(idx)}
// // // // //                       className={`
// // // // //                         flex flex-col items-center rounded-xl py-4 px-2 border transition-all duration-200
// // // // //                         ${isActive
// // // // //                           ? "bg-orange-500 border-orange-400 shadow-lg shadow-orange-500/30 scale-105"
// // // // //                           : isRest
// // // // //                             ? "bg-gray-800/60 border-gray-700/40 hover:border-gray-600"
// // // // //                             : "bg-gray-800/80 border-gray-700/50 hover:border-orange-500/50 hover:bg-gray-700/80 hover:-translate-y-0.5"
// // // // //                         }
// // // // //                       `}
// // // // //                     >
// // // // //                       <span className={`text-[10px] font-semibold uppercase tracking-wider mb-1 ${isActive ? "text-white" : "text-gray-400"}`}>
// // // // //                         {dayNames[idx] ?? `D${day.day}`}
// // // // //                       </span>
// // // // //                       <span className={`text-xs font-black ${isActive ? "text-white" : isRest ? "text-gray-600" : "text-white"}`}>
// // // // //                         {day.day}
// // // // //                       </span>
// // // // //                       <span className={`mt-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide truncate max-w-full ${isRest ? "bg-gray-700 text-gray-500" : isActive ? "bg-white/20 text-white" : "bg-orange-500/20 text-orange-400"}`}>
// // // // //                         {isRest ? "Rest" : day.workoutType}
// // // // //                       </span>
// // // // //                     </button>
// // // // //                   );
// // // // //                 })}
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* ── SELECTED DAY DETAIL ── */}
// // // // //             <div className="space-y-3">
// // // // //               <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Meal Plan</p>
// // // // //               <div className="space-y-3">
// // // // //                 {weekPlan.map((day, i) => (
// // // // //                   <DayPlanCard key={day.day} dayPlan={day} />
// // // // //                 ))}
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* ── WEEKLY NOTES ── */}
// // // // //             {weeklyNotes && (
// // // // //               <div className="space-y-3">
// // // // //                 <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Strategy Notes</p>
// // // // //                 <WeeklyNotesCard notes={weeklyNotes} />
// // // // //               </div>
// // // // //             )}
// // // // //           </>
// // // // //         )}

// // // // //         {/* ── LOG FOOD + SUMMARY (always visible) ── */}
// // // // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // // // //           <LogFoodCard onLog={logFood} />
// // // // //           <SummaryCard summary={summary} onGenerate={generateSummary} />
// // // // //         </div>

// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }



// // // // import { useState, useEffect } from "react";
// // // // import { nutritionAPI, foodAPI } from "../api/axios";
// // // // import { useAuth } from "../context/AuthContext";

// // // // /* ─────────────────────────────────────────────
// // // //    MACRO RING / STAT CARD
// // // // ───────────────────────────────────────────── */
// // // // function MacroCard({ label, value, unit, color }) {
// // // //   const colors = {
// // // //     orange: "border-orange-500/40 bg-orange-500/10 text-orange-400",
// // // //     blue: "border-blue-500/40 bg-blue-500/10 text-blue-400",
// // // //     purple: "border-purple-500/40 bg-purple-500/10 text-purple-400",
// // // //     green: "border-green-500/40 bg-green-500/10 text-green-400",
// // // //   };
// // // //   return (
// // // //     <div className={`rounded-xl border px-4 py-4 flex flex-col items-center justify-center text-center ${colors[color]}`}>
// // // //       <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{label}</p>
// // // //       <p className="text-2xl font-black text-white">{value ?? "—"}</p>
// // // //       <p className="text-xs text-gray-500 mt-0.5">{unit}</p>
// // // //     </div>
// // // //   );
// // // // }

// // // // /* ─────────────────────────────────────────────
// // // //    PROGRESS BAR
// // // // ───────────────────────────────────────────── */
// // // // function ProgressBar({ label, consumed = 0, target = 0, color = "bg-orange-500" }) {
// // // //   const pct = target > 0 ? Math.min(100, Math.round((consumed / target) * 100)) : 0;
// // // //   const over = target > 0 && consumed > target;

// // // //   return (
// // // //     <div className="space-y-1.5">
// // // //       <div className="flex justify-between text-xs">
// // // //         <span className="text-gray-400 font-semibold">{label}</span>
// // // //         <span className={`font-bold ${over ? "text-red-400" : "text-white"}`}>
// // // //           {consumed} / {target}
// // // //         </span>
// // // //       </div>
// // // //       <div className="h-2 bg-gray-700/60 rounded-full overflow-hidden">
// // // //         <div
// // // //           className={`h-full rounded-full transition-all duration-500 ${over ? "bg-red-500" : color}`}
// // // //           style={{ width: `${pct}%` }}
// // // //         />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // /* ─────────────────────────────────────────────
// // // //    LOG FOOD FORM
// // // // ───────────────────────────────────────────── */
// // // // function LogFoodCard({ onLog }) {
// // // //   const [food, setFood] = useState({
// // // //     mealType: "breakfast",
// // // //     foodName: "",
// // // //     quantity: "",
// // // //     calories: "",
// // // //     proteinGrams: "",
// // // //     carbsGrams: "",
// // // //     fatGrams: "",
// // // //   });

// // // //   const [submitting, setSubmitting] = useState(false);
// // // //   const [success, setSuccess] = useState(false);

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     setSubmitting(true);
// // // //     try {
// // // //       await onLog(food);
// // // //       setSuccess(true);
// // // //       setFood({
// // // //         mealType: "breakfast",
// // // //         foodName: "",
// // // //         quantity: "",
// // // //         calories: "",
// // // //         proteinGrams: "",
// // // //         carbsGrams: "",
// // // //         fatGrams: "",
// // // //       });
// // // //       setTimeout(() => setSuccess(false), 3000);
// // // //     } catch {}
// // // //     setSubmitting(false);
// // // //   };

// // // //   const inp =
// // // //     "w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/60 focus:bg-gray-700/80 transition-all";

// // // //   return (
// // // //     <div className="rounded-2xl border border-gray-700/50 bg-gray-800/60 overflow-hidden">
// // // //       <div className="px-6 py-4 border-b border-gray-700/40 flex items-center gap-3">
// // // //         <h2 className="text-white font-black text-lg">Log Food</h2>
// // // //       </div>

// // // //       <form onSubmit={handleSubmit} className="p-6 grid grid-cols-2 gap-4">
// // // //         <select
// // // //           value={food.mealType}
// // // //           onChange={(e) => setFood({ ...food, mealType: e.target.value })}
// // // //           className={`${inp} col-span-2`}
// // // //         >
// // // //           <option value="breakfast">Breakfast</option>
// // // //           <option value="pre_workout">Pre Workout</option>
// // // //           <option value="post_workout">Post Workout</option>
// // // //           <option value="lunch">Lunch</option>
// // // //           <option value="snack">Snack</option>
// // // //           <option value="dinner">Dinner</option>
// // // //         </select>

// // // //         <input
// // // //           placeholder="Food Name *"
// // // //           required
// // // //           value={food.foodName}
// // // //           onChange={(e) => setFood({ ...food, foodName: e.target.value })}
// // // //           className={`${inp} col-span-2`}
// // // //         />

// // // //         <input
// // // //           placeholder="Quantity"
// // // //           value={food.quantity}
// // // //           onChange={(e) => setFood({ ...food, quantity: e.target.value })}
// // // //           className={inp}
// // // //         />

// // // //         <input
// // // //           type="number"
// // // //           placeholder="Calories *"
// // // //           required
// // // //           value={food.calories}
// // // //           onChange={(e) => setFood({ ...food, calories: e.target.value })}
// // // //           className={inp}
// // // //         />

// // // //         <input
// // // //           type="number"
// // // //           placeholder="Protein (g)"
// // // //           value={food.proteinGrams}
// // // //           onChange={(e) => setFood({ ...food, proteinGrams: e.target.value })}
// // // //           className={inp}
// // // //         />

// // // //         <input
// // // //           type="number"
// // // //           placeholder="Carbs (g)"
// // // //           value={food.carbsGrams}
// // // //           onChange={(e) => setFood({ ...food, carbsGrams: e.target.value })}
// // // //           className={inp}
// // // //         />

// // // //         <input
// // // //           type="number"
// // // //           placeholder="Fat (g)"
// // // //           value={food.fatGrams}
// // // //           onChange={(e) => setFood({ ...food, fatGrams: e.target.value })}
// // // //           className={`${inp} col-span-2`}
// // // //         />

// // // //         <button
// // // //           type="submit"
// // // //           disabled={submitting}
// // // //           className="col-span-2 px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold disabled:opacity-50"
// // // //         >
// // // //           {submitting ? "Logging..." : success ? "✓ Logged!" : "Log Food"}
// // // //         </button>
// // // //       </form>
// // // //     </div>
// // // //   );
// // // // }

// // // // /* ─────────────────────────────────────────────
// // // //    SUMMARY CARD
// // // // ───────────────────────────────────────────── */
// // // // function SummaryCard({ summary, onGenerate }) {
// // // //   return (
// // // //     <div className="rounded-2xl border border-gray-700/50 bg-gray-800/60 overflow-hidden">
// // // //       <div className="px-6 py-4 border-b border-gray-700/40 flex justify-between">
// // // //         <h2 className="text-white font-black text-lg">Today's Summary</h2>
// // // //         <button
// // // //           onClick={onGenerate}
// // // //           className="px-4 py-2 rounded-xl border border-orange-500/50 text-orange-400 text-xs font-bold"
// // // //         >
// // // //           Refresh Summary
// // // //         </button>
// // // //       </div>

// // // //       {!summary ? (
// // // //         <div className="px-6 py-10 text-center text-gray-400">
// // // //           Generate a summary to see your daily progress.
// // // //         </div>
// // // //       ) : (
// // // //         <div className="p-6 space-y-4">
// // // //           <ProgressBar
// // // //             label="Calories"
// // // //             consumed={summary.consumedCalories}
// // // //             target={summary.targetCalories}
// // // //           />
// // // //           <ProgressBar
// // // //             label="Protein"
// // // //             consumed={summary.consumedProtein}
// // // //             target={summary.targetProtein}
// // // //             color="bg-blue-500"
// // // //           />
// // // //           <ProgressBar
// // // //             label="Carbs"
// // // //             consumed={summary.consumedCarbs}
// // // //             target={summary.targetCarbs}
// // // //             color="bg-purple-500"
// // // //           />
// // // //           <ProgressBar
// // // //             label="Fat"
// // // //             consumed={summary.consumedFat}
// // // //             target={summary.targetFat}
// // // //             color="bg-green-500"
// // // //           />
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // /* ─────────────────────────────────────────────
// // // //    MAIN PAGE
// // // // ───────────────────────────────────────────── */
// // // // export default function Nutrition() {
// // // //   const { user } = useAuth();
// // // //   const today = new Date().toISOString().split("T")[0];
// // // //   const userId = user?._id || user?.id;

// // // //   const [target, setTarget] = useState(null);
// // // //   const [summary, setSummary] = useState(null);
// // // //   const [loading, setLoading] = useState(false);

// // // //   useEffect(() => {
// // // //     if (!userId) return;
// // // //     fetchToday();
// // // //   }, [userId]);

// // // //   const fetchToday = async () => {
// // // //     try {
// // // //       const plan = await nutritionAPI.getToday(userId, today);
// // // //       setTarget(plan.data.nutritionPlan);
// // // //     } catch {}

// // // //     try {
// // // //       const sum = await nutritionAPI.getTodaySummary(userId, today);
// // // //       setSummary(sum.data.summary);
// // // //     } catch {}
// // // //   };

// // // //   const generateTarget = async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const res = await nutritionAPI.generateTarget({ userId, date: today });
// // // //       setTarget(res.data.nutritionPlan);
// // // //     } catch (err) {
// // // //       alert(err.message);
// // // //     }
// // // //     setLoading(false);
// // // //   };

// // // //   const logFood = async (food) => {
// // // //     await foodAPI.log({
// // // //       userId,
// // // //       date: today,
// // // //       ...food,
// // // //       calories: Number(food.calories),
// // // //       proteinGrams: Number(food.proteinGrams) || 0,
// // // //       carbsGrams: Number(food.carbsGrams) || 0,
// // // //       fatGrams: Number(food.fatGrams) || 0,
// // // //     });

// // // //     await generateSummary();
// // // //   };

// // // //   const generateSummary = async () => {
// // // //     const res = await nutritionAPI.generateSummary(userId, today);
// // // //     setSummary(res.data.summary);
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-950 text-white">
// // // //       <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

// // // //         <div className="flex justify-between items-center">
// // // //           <h1 className="text-3xl font-black">Daily Nutrition</h1>
// // // //           <button
// // // //             onClick={generateTarget}
// // // //             disabled={loading}
// // // //             className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold disabled:opacity-50"
// // // //           >
// // // //             {loading ? "Generating..." : "Generate Plan"}
// // // //           </button>
// // // //         </div>

// // // //         {target && (
// // // //           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
// // // //             <MacroCard label="Calories" value={target.calorieTarget} unit="kcal" color="orange" />
// // // //             <MacroCard label="Protein" value={target.proteinTarget} unit="g" color="blue" />
// // // //             <MacroCard label="Carbs" value={target.carbsTarget} unit="g" color="purple" />
// // // //             <MacroCard label="Fats" value={target.fatsTarget} unit="g" color="green" />
// // // //           </div>
// // // //         )}

// // // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // // //           <LogFoodCard onLog={logFood} />
// // // //           <SummaryCard summary={summary} onGenerate={generateSummary} />
// // // //         </div>

// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // import { useState, useEffect } from "react";
// // // import { nutritionAPI, foodAPI } from "../api/axios";
// // // import { useAuth } from "../context/AuthContext";

// // // /* ─────────────────────────────────────────────
// // //    MACRO CARD
// // // ───────────────────────────────────────────── */
// // // function MacroCard({ label, value, unit, color }) {
// // //   const colors = {
// // //     orange: "border-orange-500/40 bg-orange-500/10 text-orange-400",
// // //     blue:   "border-blue-500/40 bg-blue-500/10 text-blue-400",
// // //     purple: "border-purple-500/40 bg-purple-500/10 text-purple-400",
// // //     green:  "border-green-500/40 bg-green-500/10 text-green-400",
// // //   };
// // //   return (
// // //     <div className={`rounded-xl border px-4 py-4 flex flex-col items-center justify-center text-center ${colors[color]}`}>
// // //       <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{label}</p>
// // //       <p className="text-2xl font-black text-white">{value ?? "—"}</p>
// // //       <p className="text-xs text-gray-500 mt-0.5">{unit}</p>
// // //     </div>
// // //   );
// // // }

// // // /* ─────────────────────────────────────────────
// // //    PROGRESS BAR
// // // ───────────────────────────────────────────── */
// // // function ProgressBar({ label, consumed = 0, target = 0, color = "bg-orange-500" }) {
// // //   const pct  = target > 0 ? Math.min(100, Math.round((consumed / target) * 100)) : 0;
// // //   const over = target > 0 && consumed > target;
// // //   return (
// // //     <div className="space-y-1.5">
// // //       <div className="flex justify-between text-xs">
// // //         <span className="text-gray-400 font-semibold">{label}</span>
// // //         <span className={`font-bold ${over ? "text-red-400" : "text-white"}`}>
// // //           {consumed} / {target}
// // //         </span>
// // //       </div>
// // //       <div className="h-2 bg-gray-700/60 rounded-full overflow-hidden">
// // //         <div
// // //           className={`h-full rounded-full transition-all duration-500 ${over ? "bg-red-500" : color}`}
// // //           style={{ width: `${pct}%` }}
// // //         />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* ─────────────────────────────────────────────
// // //    MEAL TYPE BADGE
// // // ───────────────────────────────────────────── */
// // // const mealColors = {
// // //   breakfast:      "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
// // //   pre_workout:    "bg-orange-500/20 text-orange-400 border-orange-500/30",
// // //   post_workout:   "bg-green-500/20 text-green-400 border-green-500/30",
// // //   lunch:          "bg-blue-500/20 text-blue-400 border-blue-500/30",
// // //   snack:          "bg-purple-500/20 text-purple-400 border-purple-500/30",
// // //   dinner:         "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
// // //   optional_snack: "bg-gray-500/20 text-gray-400 border-gray-500/30",
// // // };

// // // function MealBadge({ type }) {
// // //   const cls = mealColors[type] ?? "bg-gray-700/50 text-gray-300 border-gray-600/40";
// // //   return (
// // //     <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-widest ${cls}`}>
// // //       {type.replace(/_/g, " ")}
// // //     </span>
// // //   );
// // // }

// // // /* ─────────────────────────────────────────────
// // //    FOOD ROW
// // // ───────────────────────────────────────────── */
// // // function FoodRow({ food }) {
// // //   return (
// // //     <div className="flex items-center justify-between py-2.5 border-b border-gray-700/30 last:border-0">
// // //       <div className="flex-1 min-w-0">
// // //         <p className="text-white text-sm font-semibold truncate">{food.name}</p>
// // //         <p className="text-gray-500 text-xs">{food.quantity}</p>
// // //       </div>
// // //       <div className="flex gap-3 shrink-0 ml-4 text-right">
// // //         <div className="text-center">
// // //           <p className="text-white text-sm font-bold">{food.calories}</p>
// // //           <p className="text-gray-600 text-[10px]">kcal</p>
// // //         </div>
// // //         <div className="text-center hidden sm:block">
// // //           <p className="text-blue-400 text-sm font-bold">{food.protein}g</p>
// // //           <p className="text-gray-600 text-[10px]">P</p>
// // //         </div>
// // //         <div className="text-center hidden sm:block">
// // //           <p className="text-yellow-400 text-sm font-bold">{food.carbs}g</p>
// // //           <p className="text-gray-600 text-[10px]">C</p>
// // //         </div>
// // //         <div className="text-center hidden sm:block">
// // //           <p className="text-orange-400 text-sm font-bold">{food.fats}g</p>
// // //           <p className="text-gray-600 text-[10px]">F</p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* ─────────────────────────────────────────────
// // //    MEAL CARD (collapsible)
// // // ───────────────────────────────────────────── */
// // // function MealCard({ meal }) {
// // //   const [open, setOpen] = useState(false);
// // //   const totalCals = meal.foods.reduce((acc, f) => acc + (f.calories || 0), 0);
// // //   const totalP    = meal.foods.reduce((acc, f) => acc + (f.protein  || 0), 0);

// // //   return (
// // //     <div className="rounded-xl border border-gray-700/40 bg-gray-800/50 overflow-hidden">
// // //       <button
// // //         onClick={() => setOpen(!open)}
// // //         className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors"
// // //       >
// // //         <div className="flex items-center gap-3">
// // //           <MealBadge type={meal.mealType} />
// // //           <span className="text-gray-500 text-xs hidden sm:block">{meal.foods.length} items</span>
// // //         </div>
// // //         <div className="flex items-center gap-4">
// // //           <div className="hidden sm:block text-right">
// // //             <span className="text-white text-sm font-black">{totalCals} kcal</span>
// // //             <span className="text-gray-500 text-xs ml-2">· {Math.round(totalP)}g P</span>
// // //           </div>
// // //           <span className={`text-gray-500 text-sm transition-transform duration-200 ${open ? "rotate-180" : ""}`}>▾</span>
// // //         </div>
// // //       </button>

// // //       {open && (
// // //         <div className="px-5 pb-4 pt-1 border-t border-gray-700/30">
// // //           {meal.foods.map((food, i) => (
// // //             <FoodRow key={i} food={food} />
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // /* ─────────────────────────────────────────────
// // //    DAY PLAN CARD (collapsible)
// // // ───────────────────────────────────────────── */
// // // function DayPlanCard({ dayPlan, defaultOpen }) {
// // //   const [open, setOpen] = useState(defaultOpen);
// // //   const s      = dayPlan.daySummary;
// // //   const isRest = dayPlan.workoutType === "rest";

// // //   return (
// // //     <div className={`rounded-xl border overflow-hidden transition-all ${open ? "border-orange-500/40 bg-gray-800/90" : "border-gray-700/40 bg-gray-800/40"}`}>
// // //       <button
// // //         onClick={() => setOpen(!open)}
// // //         className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
// // //       >
// // //         <div className="flex items-center gap-4">
// // //           <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm shrink-0 ${open ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-300"}`}>
// // //             {dayPlan.day}
// // //           </div>
// // //           <div className="text-left">
// // //             <p className="text-white font-bold capitalize">Day {dayPlan.day} — {dayPlan.workoutType}</p>
// // //             {s && (
// // //               <p className="text-gray-400 text-xs mt-0.5">
// // //                 {s.totalCalories} kcal · {s.proteinGrams}g P · {s.carbsGrams}g C · {s.fatsGrams}g F · 💧 {s.hydrationLiters}L
// // //               </p>
// // //             )}
// // //           </div>
// // //         </div>
// // //         <div className="flex items-center gap-3">
// // //           {isRest && (
// // //             <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-700 text-gray-400 border border-gray-600/40 uppercase tracking-wider hidden sm:block">
// // //               Rest
// // //             </span>
// // //           )}
// // //           <span className={`text-gray-500 text-sm transition-transform duration-200 ${open ? "rotate-180" : ""}`}>▾</span>
// // //         </div>
// // //       </button>

// // //       {open && (
// // //         <div className="px-6 pb-6 pt-1 border-t border-gray-700/30 space-y-3">
// // //           {s && (
// // //             <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
// // //               <MacroCard label="Calories" value={s.totalCalories} unit="kcal"  color="orange" />
// // //               <MacroCard label="Protein"  value={s.proteinGrams}  unit="grams" color="blue"   />
// // //               <MacroCard label="Carbs"    value={s.carbsGrams}    unit="grams" color="purple" />
// // //               <MacroCard label="Fats"     value={s.fatsGrams}     unit="grams" color="green"  />
// // //             </div>
// // //           )}
// // //           {dayPlan.meals?.map((meal, i) => (
// // //             <MealCard key={i} meal={meal} />
// // //           ))}
// // //         </div>
// // //       )}
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
// // //         const isRest   = day.workoutType === "rest";
// // //         const isActive = activeDay === idx;
// // //         return (
// // //           <button
// // //             key={day.day}
// // //             onClick={() => onSelectDay(idx)}
// // //             className={`
// // //               flex flex-col items-center rounded-xl py-4 px-2 border transition-all duration-200
// // //               ${isActive
// // //                 ? "bg-orange-500 border-orange-400 shadow-lg shadow-orange-500/30 scale-105"
// // //                 : isRest
// // //                   ? "bg-gray-800/60 border-gray-700/40 hover:border-gray-600"
// // //                   : "bg-gray-800/80 border-gray-700/50 hover:border-orange-500/50 hover:bg-gray-700/80 hover:-translate-y-0.5"
// // //               }
// // //             `}
// // //           >
// // //             <span className={`text-[10px] font-semibold uppercase tracking-wider mb-1 ${isActive ? "text-white" : "text-gray-400"}`}>
// // //               {dayNames[idx] ?? `D${day.day}`}
// // //             </span>
// // //             <span className={`text-xs font-black ${isActive ? "text-white" : isRest ? "text-gray-600" : "text-white"}`}>
// // //               {day.day}
// // //             </span>
// // //             <span className={`mt-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide truncate max-w-full
// // //               ${isRest ? "bg-gray-700 text-gray-500" : isActive ? "bg-white/20 text-white" : "bg-orange-500/20 text-orange-400"}`}>
// // //               {isRest ? "Rest" : (day.workoutType ?? "Train")}
// // //             </span>
// // //           </button>
// // //         );
// // //       })}
// // //     </div>
// // //   );
// // // }

// // // /* ─────────────────────────────────────────────
// // //    WEEKLY NOTES CARD
// // // ───────────────────────────────────────────── */
// // // function WeeklyNotesCard({ notes }) {
// // //   if (!notes) return null;
// // //   const sections = [
// // //     { label: "Carb Cycling Strategy", key: "carbCyclingStrategy", color: "text-orange-400" },
// // //     { label: "Recovery Focus",         key: "recoveryFocus",        color: "text-blue-400"   },
// // //     { label: "Budget Efficiency",      key: "budgetEfficiency",     color: "text-green-400"  },
// // //   ];
// // //   return (
// // //     <div className="rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800/80 to-gray-900/80 overflow-hidden shadow-xl">
// // //       <div className="px-6 py-4 border-b border-gray-700/40 flex items-center gap-3">
// // //         <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 text-sm">📊</div>
// // //         <h2 className="text-white font-black text-lg">Weekly Nutrition Strategy</h2>
// // //       </div>
// // //       <div className="p-6 space-y-5">
// // //         {sections.map(({ label, key, color }) =>
// // //           notes[key] ? (
// // //             <div key={key} className="space-y-1.5">
// // //               <p className={`text-[10px] font-bold uppercase tracking-widest ${color}`}>{label}</p>
// // //               <p className="text-gray-300 text-sm leading-relaxed">{notes[key]}</p>
// // //             </div>
// // //           ) : null
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* ─────────────────────────────────────────────
// // //    LOG FOOD CARD
// // // ───────────────────────────────────────────── */
// // // function LogFoodCard({ onLog }) {
// // //   const [food, setFood] = useState({
// // //     mealType: "breakfast",
// // //     foodName: "",
// // //     quantity: "",
// // //     calories: "",
// // //     proteinGrams: "",
// // //     carbsGrams: "",
// // //     fatGrams: "",
// // //   });
// // //   const [submitting, setSubmitting] = useState(false);
// // //   const [success, setSuccess]       = useState(false);

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setSubmitting(true);
// // //     try {
// // //       await onLog(food);
// // //       setSuccess(true);
// // //       setFood({ mealType: "breakfast", foodName: "", quantity: "", calories: "", proteinGrams: "", carbsGrams: "", fatGrams: "" });
// // //       setTimeout(() => setSuccess(false), 3000);
// // //     } catch {}
// // //     setSubmitting(false);
// // //   };

// // //   const inp = "w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/60 focus:bg-gray-700/80 transition-all";

// // //   return (
// // //     <div className="rounded-2xl border border-gray-700/50 bg-gray-800/60 overflow-hidden">
// // //       <div className="px-6 py-4 border-b border-gray-700/40 flex items-center gap-3">
// // //         <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400 text-sm">✏️</div>
// // //         <h2 className="text-white font-black text-lg">Log Food</h2>
// // //       </div>

// // //       <form onSubmit={handleSubmit} className="p-6 grid grid-cols-2 gap-4">
// // //         <select value={food.mealType} onChange={(e) => setFood({ ...food, mealType: e.target.value })} className={`${inp} col-span-2`}>
// // //           <option value="breakfast">Breakfast</option>
// // //           <option value="pre_workout">Pre Workout</option>
// // //           <option value="post_workout">Post Workout</option>
// // //           <option value="lunch">Lunch</option>
// // //           <option value="snack">Snack</option>
// // //           <option value="dinner">Dinner</option>
// // //         </select>

// // //         <input placeholder="Food Name *" required value={food.foodName}
// // //           onChange={(e) => setFood({ ...food, foodName: e.target.value })} className={`${inp} col-span-2`} />

// // //         <input placeholder="Quantity (e.g. 100g)" value={food.quantity}
// // //           onChange={(e) => setFood({ ...food, quantity: e.target.value })} className={inp} />

// // //         <input type="number" placeholder="Calories *" required value={food.calories}
// // //           onChange={(e) => setFood({ ...food, calories: e.target.value })} className={inp} />

// // //         <input type="number" placeholder="Protein (g)" value={food.proteinGrams}
// // //           onChange={(e) => setFood({ ...food, proteinGrams: e.target.value })} className={inp} />

// // //         <input type="number" placeholder="Carbs (g)" value={food.carbsGrams}
// // //           onChange={(e) => setFood({ ...food, carbsGrams: e.target.value })} className={inp} />

// // //         <input type="number" placeholder="Fat (g)" value={food.fatGrams}
// // //           onChange={(e) => setFood({ ...food, fatGrams: e.target.value })} className={`${inp} col-span-2`} />

// // //         <button
// // //           type="submit"
// // //           disabled={submitting}
// // //           className="col-span-2 px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 active:scale-95 transition-all text-white text-sm font-bold shadow-lg shadow-orange-500/30 disabled:opacity-50"
// // //         >
// // //           {submitting ? "Logging..." : success ? "✓ Logged!" : "Log Food"}
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // }

// // // /* ─────────────────────────────────────────────
// // //    SUMMARY CARD
// // // ───────────────────────────────────────────── */
// // // function SummaryCard({ summary, onGenerate }) {
// // //   const statusColors = {
// // //     over:     "text-red-400 bg-red-500/10 border-red-500/30",
// // //     under:    "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
// // //     on_track: "text-green-400 bg-green-500/10 border-green-500/30",
// // //   };
// // //   const statusCls = statusColors[summary?.status] ?? "text-gray-400 bg-gray-700/30 border-gray-600/30";

// // //   return (
// // //     <div className="rounded-2xl border border-gray-700/50 bg-gray-800/60 overflow-hidden">
// // //       <div className="px-6 py-4 border-b border-gray-700/40 flex items-center justify-between">
// // //         <div className="flex items-center gap-3">
// // //           <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-sm">📈</div>
// // //           <h2 className="text-white font-black text-lg">Today's Summary</h2>
// // //         </div>
// // //         <button
// // //           onClick={onGenerate}
// // //           className="px-4 py-2 rounded-xl border border-orange-500/50 hover:bg-orange-500/10 text-orange-400 text-xs font-bold transition-all active:scale-95"
// // //         >
// // //           Refresh
// // //         </button>
// // //       </div>

// // //       {!summary ? (
// // //         <div className="px-6 py-12 flex flex-col items-center text-center gap-3">
// // //           <p className="text-4xl">📊</p>
// // //           <p className="text-gray-400 text-sm">Hit Refresh to see your daily progress.</p>
// // //         </div>
// // //       ) : (
// // //         <div className="p-6 space-y-5">
// // //           <div className="flex items-center gap-3 flex-wrap">
// // //             <span className="text-gray-400 text-sm font-semibold">Status:</span>
// // //             <span className={`text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-widest ${statusCls}`}>
// // //               {summary.status}
// // //             </span>
// // //             {summary.calorieDifference != null && (
// // //               <span className={`text-xs font-semibold ${summary.calorieDifference > 0 ? "text-red-400" : "text-green-400"}`}>
// // //                 {summary.calorieDifference > 0 ? `+${summary.calorieDifference}` : summary.calorieDifference} kcal
// // //               </span>
// // //             )}
// // //           </div>
// // //           <div className="space-y-3">
// // //             <ProgressBar label="Calories" consumed={summary.consumedCalories} target={summary.targetCalories} color="bg-orange-500" />
// // //             <ProgressBar label="Protein"  consumed={summary.consumedProtein}  target={summary.targetProtein}  color="bg-blue-500"   />
// // //             <ProgressBar label="Carbs"    consumed={summary.consumedCarbs}    target={summary.targetCarbs}    color="bg-purple-500" />
// // //             <ProgressBar label="Fat"      consumed={summary.consumedFat}      target={summary.targetFat}      color="bg-green-500"  />
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // /* ─────────────────────────────────────────────
// // //    MAIN PAGE
// // // ───────────────────────────────────────────── */
// // // export default function Nutrition() {
// // //   const { user } = useAuth();
// // //   const today  = new Date().toISOString().split("T")[0];
// // //   const userId = user?._id || user?.id;

// // //   const [target,    setTarget]    = useState(null);
// // //   const [summary,   setSummary]   = useState(null);
// // //   const [loading,   setLoading]   = useState(false);
// // //   const [activeDay, setActiveDay] = useState(0);

// // //   /* ── on mount: load existing plan + summary ── */
// // //   useEffect(() => {
// // //     if (!userId) return;
// // //     (async () => {
// // //       try {
// // //         const plan = await nutritionAPI.getToday(userId, today);
// // //         setTarget(plan.data.nutritionPlan);
// // //       } catch {}
// // //       try {
// // //         const sum = await nutritionAPI.getTodaySummary(userId, today);
// // //         setSummary(sum.data.summary);
// // //       } catch {}
// // //     })();
// // //   }, [userId]);

// // //   /* ── generate target ── */
// // //   const generateTarget = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const res = await nutritionAPI.generateTarget({ userId, date: today });
// // //       setTarget(res.data.nutritionPlan);
// // //     } catch (err) {
// // //       alert(err.response?.data?.message || err.message || "Failed to generate plan");
// // //     }
// // //     setLoading(false);
// // //   };

// // //   /* ── log food (auto-refreshes summary) ── */
// // //   const logFood = async (food) => {
// // //     await foodAPI.log({
// // //       userId,
// // //       date:         today,
// // //       ...food,
// // //       calories:     Number(food.calories),
// // //       proteinGrams: Number(food.proteinGrams) || 0,
// // //       carbsGrams:   Number(food.carbsGrams)   || 0,
// // //       fatGrams:     Number(food.fatGrams)      || 0,
// // //     });
// // //     await generateSummary();
// // //   };

// // //   /* ── generate summary ── */
// // //   const generateSummary = async () => {
// // //     try {
// // //       const res = await nutritionAPI.generateSummary(userId, today);
// // //       setSummary(res.data.summary);
// // //     } catch (err) {
// // //       alert(err.response?.data?.message || "Failed to get summary");
// // //     }
// // //   };

// // //   const weekPlan    = target?.aiGeneratedPlan?.weekNutritionPlan ?? [];
// // //   const weeklyNotes = target?.aiGeneratedPlan?.weeklyNotes ?? null;

// // //   return (
// // //     <div className="min-h-screen bg-gray-950 text-white">
// // //       <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

// // //         {/* ── HERO HEADER ── */}
// // //         <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/60 shadow-2xl p-8">
// // //           <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

// // //           <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
// // //             <div className="space-y-4 flex-1">
// // //               <div>
// // //                 <p className="text-orange-400 text-xs font-semibold tracking-[0.2em] uppercase mb-1">Nutrition Dashboard</p>
// // //                 <h1 className="text-3xl font-black text-white tracking-tight">Daily Nutrition Plan</h1>
// // //                 <p className="text-gray-400 text-sm mt-1">
// // //                   {today}
// // //                   {target && (
// // //                     <span> · Generated by <span className="text-orange-400 font-semibold">{target.generatedBy}</span></span>
// // //                   )}
// // //                 </p>
// // //               </div>

// // //               {target && (
// // //                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
// // //                   <MacroCard label="Calories" value={target.calorieTarget} unit="kcal"  color="orange" />
// // //                   <MacroCard label="Protein"  value={target.proteinTarget} unit="grams" color="blue"   />
// // //                   <MacroCard label="Carbs"    value={target.carbsTarget}   unit="grams" color="purple" />
// // //                   <MacroCard label="Fats"     value={target.fatsTarget}    unit="grams" color="green"  />
// // //                 </div>
// // //               )}
// // //             </div>

// // //             <div className="shrink-0">
// // //               <button
// // //                 onClick={generateTarget}
// // //                 disabled={loading}
// // //                 className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 active:scale-95 transition-all text-white text-sm font-bold shadow-lg shadow-orange-500/30 disabled:opacity-50 whitespace-nowrap"
// // //               >
// // //                 {loading ? "Generating..." : target ? "Regenerate Plan" : "Generate Today's Plan"}
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* ── NO PLAN STATE ── */}
// // //         {!target && (
// // //           <div className="rounded-2xl border border-dashed border-gray-700 bg-gray-800/30 py-20 flex flex-col items-center justify-center gap-4 text-center">
// // //             <div className="text-5xl">🥗</div>
// // //             <p className="text-white font-bold text-xl">No nutrition plan yet.</p>
// // //             <p className="text-gray-400 text-sm max-w-xs">
// // //               Generate a workout-aligned AI nutrition plan to see your daily meal schedule and macro targets.
// // //             </p>
// // //             <button
// // //               onClick={generateTarget}
// // //               disabled={loading}
// // //               className="mt-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm shadow-lg shadow-orange-500/30 transition-all active:scale-95 disabled:opacity-50"
// // //             >
// // //               {loading ? "Generating..." : "Generate Plan"}
// // //             </button>
// // //           </div>
// // //         )}

// // //         {/* ── PLAN EXISTS ── */}
// // //         {target && weekPlan.length > 0 && (
// // //           <>
// // //             {/* Week Calendar Strip */}
// // //             <div className="space-y-3">
// // //               <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Weekly Overview</p>
// // //               <WeekCalendar weekPlan={weekPlan} activeDay={activeDay} onSelectDay={setActiveDay} />
// // //             </div>

// // //             {/* All Day Plans */}
// // //             <div className="space-y-3">
// // //               <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Meal Plan</p>
// // //               <div className="space-y-3">
// // //                 {weekPlan.map((day, i) => (
// // //                   <DayPlanCard key={day.day} dayPlan={day} defaultOpen={i === activeDay} />
// // //                 ))}
// // //               </div>
// // //             </div>

// // //             {/* Weekly Notes */}
// // //             {weeklyNotes && (
// // //               <div className="space-y-3">
// // //                 <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Strategy Notes</p>
// // //                 <WeeklyNotesCard notes={weeklyNotes} />
// // //               </div>
// // //             )}
// // //           </>
// // //         )}

// // //         {/* ── LOG + SUMMARY (always visible) ── */}
// // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //           <LogFoodCard onLog={logFood} />
// // //           <SummaryCard summary={summary} onGenerate={generateSummary} />
// // //         </div>

// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import { useState, useEffect } from "react";
// // import { nutritionAPI, foodAPI } from "../api/axios";
// // import { useAuth } from "../context/AuthContext";

// // /* ─────────────────────────────────────────────
// //    All styles use CSS variables from App.jsx :root
// //    --epa-bg, --epa-surface, --epa-gold, --epa-emerald,
// //    --epa-emerald-bright, --epa-text, --epa-muted,
// //    --epa-danger, --epa-border, --epa-serif, --epa-sans
// // ───────────────────────────────────────────── */

// // const S = {
// //   page: {
// //     minHeight: "100vh",
// //     backgroundColor: "var(--epa-bg)",
// //     color: "var(--epa-text)",
// //     fontFamily: "var(--epa-sans)",
// //     padding: "32px 16px",
// //   },
// //   inner: {
// //     maxWidth: 1100,
// //     margin: "0 auto",
// //     display: "flex",
// //     flexDirection: "column",
// //     gap: 28,
// //   },
// //   sectionLabel: {
// //     fontSize: 10,
// //     fontWeight: 600,
// //     letterSpacing: "0.2em",
// //     textTransform: "uppercase",
// //     color: "var(--epa-muted)",
// //     marginBottom: 10,
// //   },

// //   /* HERO */
// //   hero: {
// //     position: "relative",
// //     overflow: "hidden",
// //     borderRadius: "var(--epa-radius)",
// //     background: "var(--epa-surface)",
// //     border: "1px solid var(--epa-border)",
// //     padding: "36px 36px 32px",
// //     boxShadow: "0 4px 40px rgba(0,0,0,0.5)",
// //   },
// //   heroTopLine: {
// //     position: "absolute",
// //     top: 0, left: 0, right: 0,
// //     height: 2,
// //     background: "linear-gradient(90deg, transparent, var(--epa-gold), transparent)",
// //   },
// //   heroGlow: {
// //     position: "absolute",
// //     bottom: -40, right: -40,
// //     width: 200, height: 200,
// //     borderRadius: "50%",
// //     background: "rgba(14,59,50,0.25)",
// //     filter: "blur(48px)",
// //     pointerEvents: "none",
// //   },
// //   heroInner: {
// //     position: "relative",
// //     display: "flex",
// //     flexWrap: "wrap",
// //     justifyContent: "space-between",
// //     alignItems: "flex-start",
// //     gap: 24,
// //   },
// //   heroEyebrow: {
// //     fontSize: 10,
// //     fontWeight: 600,
// //     letterSpacing: "0.2em",
// //     textTransform: "uppercase",
// //     color: "var(--epa-gold)",
// //     marginBottom: 6,
// //   },
// //   heroTitle: {
// //     fontFamily: "var(--epa-serif)",
// //     fontSize: 30,
// //     fontWeight: 700,
// //     color: "var(--epa-text)",
// //     letterSpacing: "-0.02em",
// //     lineHeight: 1.15,
// //     marginBottom: 4,
// //   },
// //   heroMeta: { fontSize: 12, color: "var(--epa-muted)" },
// //   heroMetaAccent: { color: "var(--epa-gold)", fontWeight: 600 },
// //   macroGrid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(4,1fr)",
// //     gap: 10,
// //     marginTop: 20,
// //   },

// //   /* MACRO CARD */
// //   macroCard: (variant) => {
// //     const map = {
// //       gold:    { border: "rgba(198,167,94,0.35)",  bg: "rgba(198,167,94,0.08)" },
// //       emerald: { border: "rgba(46,139,106,0.35)",  bg: "rgba(14,59,50,0.5)" },
// //       ivory:   { border: "rgba(232,230,227,0.15)", bg: "rgba(232,230,227,0.04)" },
// //       stone:   { border: "rgba(161,161,161,0.25)", bg: "rgba(161,161,161,0.06)" },
// //     };
// //     const c = map[variant] || map.stone;
// //     return {
// //       borderRadius: "var(--epa-radius)",
// //       border: `1px solid ${c.border}`,
// //       background: c.bg,
// //       padding: "14px 10px",
// //       display: "flex",
// //       flexDirection: "column",
// //       alignItems: "center",
// //       textAlign: "center",
// //     };
// //   },
// //   macroLabel: {
// //     fontSize: 9, fontWeight: 700,
// //     letterSpacing: "0.2em", textTransform: "uppercase",
// //     color: "var(--epa-muted)", marginBottom: 4,
// //   },
// //   macroValue: { fontSize: 22, fontWeight: 900, color: "var(--epa-text)", lineHeight: 1 },
// //   macroUnit:  { fontSize: 10, color: "var(--epa-muted)", marginTop: 3 },

// //   /* BUTTONS */
// //   btnPrimary: {
// //     padding: "12px 24px",
// //     borderRadius: "var(--epa-radius)",
// //     background: "var(--epa-gold)",
// //     color: "#111111",
// //     fontSize: 11, fontWeight: 700,
// //     fontFamily: "var(--epa-sans)",
// //     letterSpacing: "0.1em", textTransform: "uppercase",
// //     border: "none", cursor: "pointer",
// //     whiteSpace: "nowrap",
// //     transition: "background 0.2s",
// //     boxShadow: "0 4px 20px rgba(198,167,94,0.2)",
// //   },
// //   btnOutline: {
// //     padding: "9px 18px",
// //     borderRadius: "var(--epa-radius)",
// //     background: "transparent",
// //     color: "var(--epa-gold)",
// //     fontSize: 10, fontWeight: 700,
// //     fontFamily: "var(--epa-sans)",
// //     letterSpacing: "0.12em", textTransform: "uppercase",
// //     border: "1px solid rgba(198,167,94,0.4)",
// //     cursor: "pointer",
// //     transition: "border-color 0.2s",
// //   },

// //   /* CARD */
// //   card: {
// //     borderRadius: "var(--epa-radius)",
// //     border: "1px solid var(--epa-border)",
// //     background: "var(--epa-surface)",
// //     overflow: "hidden",
// //   },
// //   cardHeader: {
// //     padding: "16px 24px",
// //     borderBottom: "1px solid rgba(198,167,94,0.1)",
// //     display: "flex", alignItems: "center", justifyContent: "space-between",
// //   },
// //   cardHeaderLeft: { display: "flex", alignItems: "center", gap: 12 },
// //   cardIcon: (bg, border, color) => ({
// //     width: 32, height: 32,
// //     borderRadius: "var(--epa-radius)",
// //     background: bg, border: `1px solid ${border}`,
// //     display: "flex", alignItems: "center", justifyContent: "center",
// //     fontSize: 14, color,
// //   }),
// //   cardTitle: {
// //     fontFamily: "var(--epa-serif)",
// //     fontSize: 17, fontWeight: 700,
// //     color: "var(--epa-text)", letterSpacing: "-0.01em",
// //   },
// //   cardBody: { padding: "24px" },

// //   /* PROGRESS */
// //   progressRow: { marginBottom: 14 },
// //   progressMeta: { display: "flex", justifyContent: "space-between", marginBottom: 6 },
// //   progressLabel: { fontSize: 11, fontWeight: 600, color: "var(--epa-muted)" },
// //   progressTrack: { height: 5, borderRadius: 999, background: "rgba(255,255,255,0.07)", overflow: "hidden" },
// //   progressFill: (pct, over, color) => ({
// //     height: "100%", borderRadius: 999,
// //     width: `${pct}%`,
// //     background: over ? "var(--epa-danger)" : color,
// //     transition: "width 0.5s ease",
// //   }),

// //   /* MEAL BADGE */
// //   mealBadgeMap: {
// //     breakfast:      { bg: "rgba(198,167,94,0.15)", color: "var(--epa-gold)",  border: "rgba(198,167,94,0.3)" },
// //     pre_workout:    { bg: "rgba(14,59,50,0.7)",    color: "#4CAF85",           border: "rgba(46,139,106,0.4)" },
// //     post_workout:   { bg: "rgba(14,59,50,0.9)",    color: "#6DCBA0",           border: "rgba(46,139,106,0.5)" },
// //     lunch:          { bg: "rgba(198,167,94,0.1)",  color: "#d4b97a",           border: "rgba(198,167,94,0.2)" },
// //     snack:          { bg: "rgba(161,161,161,0.1)", color: "var(--epa-muted)", border: "rgba(161,161,161,0.2)" },
// //     dinner:         { bg: "rgba(232,230,227,0.05)",color: "var(--epa-text)",  border: "rgba(232,230,227,0.12)" },
// //     optional_snack: { bg: "rgba(255,255,255,0.03)",color: "var(--epa-muted)", border: "rgba(255,255,255,0.07)" },
// //   },

// //   /* CALENDAR */
// //   calGrid: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 8 },
// //   calDay: (isActive, isRest) => ({
// //     display: "flex", flexDirection: "column", alignItems: "center",
// //     padding: "16px 6px 12px",
// //     borderRadius: "var(--epa-radius)",
// //     border: isActive ? "1px solid var(--epa-gold)" : isRest ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(198,167,94,0.12)",
// //     background: isActive ? "var(--epa-gold)" : "var(--epa-surface)",
// //     cursor: "pointer",
// //     transition: "all 0.2s",
// //     boxShadow: isActive ? "0 4px 20px rgba(198,167,94,0.2)" : "none",
// //     transform: isActive ? "translateY(-2px)" : "none",
// //     fontFamily: "var(--epa-sans)",
// //   }),
// //   calDayName: (isActive) => ({ fontSize: 9, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: isActive ? "#111111" : "var(--epa-muted)", marginBottom: 4 }),
// //   calDayNum:  (isActive, isRest) => ({ fontSize: 13, fontWeight: 900, color: isActive ? "#111111" : isRest ? "rgba(161,161,161,0.4)" : "var(--epa-text)" }),
// //   calDayTag:  (isActive, isRest) => ({
// //     marginTop: 8, fontSize: 8, fontWeight: 700, padding: "2px 6px", borderRadius: 999,
// //     textTransform: "uppercase", letterSpacing: "0.08em",
// //     background: isRest ? "rgba(255,255,255,0.05)" : isActive ? "rgba(0,0,0,0.2)" : "rgba(198,167,94,0.12)",
// //     color: isRest ? "var(--epa-muted)" : isActive ? "#111111" : "var(--epa-gold)",
// //     overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%",
// //   }),

// //   /* DAY CARD */
// //   dayCard: (open) => ({
// //     borderRadius: "var(--epa-radius)",
// //     border: open ? "1px solid rgba(198,167,94,0.4)" : "1px solid rgba(198,167,94,0.1)",
// //     background: "var(--epa-surface)",
// //     overflow: "hidden",
// //     transition: "border-color 0.2s",
// //   }),
// //   dayCardBtn: {
// //     width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
// //     padding: "18px 24px", background: "transparent", border: "none", cursor: "pointer",
// //     color: "var(--epa-text)", fontFamily: "var(--epa-sans)",
// //   },
// //   dayNum: (open) => ({
// //     width: 40, height: 40, borderRadius: "var(--epa-radius)",
// //     display: "flex", alignItems: "center", justifyContent: "center",
// //     fontSize: 14, fontWeight: 900,
// //     background: open ? "var(--epa-gold)" : "rgba(255,255,255,0.06)",
// //     color: open ? "#111111" : "var(--epa-muted)",
// //     flexShrink: 0, transition: "background 0.2s, color 0.2s",
// //   }),

// //   /* INPUT */
// //   input: {
// //     width: "100%", background: "#111111",
// //     border: "1px solid rgba(198,167,94,0.2)",
// //     borderRadius: "var(--epa-radius)",
// //     padding: "12px 16px", color: "var(--epa-text)",
// //     fontSize: 13, fontFamily: "var(--epa-sans)", outline: "none",
// //     transition: "border-color 0.2s",
// //   },
// //   select: {
// //     width: "100%", background: "#111111",
// //     border: "1px solid rgba(198,167,94,0.2)",
// //     borderRadius: "var(--epa-radius)",
// //     padding: "12px 16px", color: "var(--epa-text)",
// //     fontSize: 13, fontFamily: "var(--epa-sans)", outline: "none",
// //   },

// //   /* STATUS */
// //   statusMap: {
// //     over:     { bg: "rgba(92,26,26,0.5)",   color: "#e05555", border: "rgba(92,26,26,0.8)" },
// //     under:    { bg: "rgba(198,167,94,0.1)",  color: "#d4b97a", border: "rgba(198,167,94,0.3)" },
// //     on_track: { bg: "rgba(14,59,50,0.6)",   color: "#4CAF85", border: "rgba(46,139,106,0.4)" },
// //   },

// //   /* EMPTY */
// //   empty: {
// //     borderRadius: "var(--epa-radius)",
// //     border: "1px dashed rgba(198,167,94,0.2)",
// //     background: "rgba(28,28,28,0.5)",
// //     padding: "80px 24px",
// //     display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
// //     gap: 14, textAlign: "center",
// //   },
// // };

// // /* ─────────────────────────────────────────────
// //    MACRO CARD
// // ───────────────────────────────────────────── */
// // function MacroCard({ label, value, unit, color }) {
// //   return (
// //     <div style={S.macroCard(color)}>
// //       <p style={S.macroLabel}>{label}</p>
// //       <p style={S.macroValue}>{value ?? "—"}</p>
// //       <p style={S.macroUnit}>{unit}</p>
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────
// //    PROGRESS BAR
// // ───────────────────────────────────────────── */
// // function ProgressBar({ label, consumed = 0, target = 0, color = "var(--epa-gold)" }) {
// //   const pct  = target > 0 ? Math.min(100, Math.round((consumed / target) * 100)) : 0;
// //   const over = target > 0 && consumed > target;
// //   return (
// //     <div style={S.progressRow}>
// //       <div style={S.progressMeta}>
// //         <span style={S.progressLabel}>{label}</span>
// //         <span style={{ fontSize: 11, fontWeight: 700, color: over ? "#e05555" : "var(--epa-text)" }}>
// //           {consumed} / {target}
// //         </span>
// //       </div>
// //       <div style={S.progressTrack}>
// //         <div style={S.progressFill(pct, over, color)} />
// //       </div>
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────
// //    MEAL BADGE
// // ───────────────────────────────────────────── */
// // function MealBadge({ type }) {
// //   const c = S.mealBadgeMap[type] ?? { bg: "rgba(255,255,255,0.04)", color: "var(--epa-muted)", border: "rgba(255,255,255,0.08)" };
// //   return (
// //     <span style={{
// //       fontSize: 9, fontWeight: 700, padding: "4px 10px", borderRadius: 999,
// //       border: `1px solid ${c.border}`, background: c.bg, color: c.color,
// //       textTransform: "uppercase", letterSpacing: "0.12em", whiteSpace: "nowrap",
// //     }}>
// //       {type.replace(/_/g, " ")}
// //     </span>
// //   );
// // }

// // /* ─────────────────────────────────────────────
// //    FOOD ROW
// // ───────────────────────────────────────────── */
// // function FoodRow({ food }) {
// //   return (
// //     <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(198,167,94,0.07)" }}>
// //       <div style={{ flex: 1, minWidth: 0 }}>
// //         <p style={{ fontSize: 13, fontWeight: 600, color: "var(--epa-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{food.name}</p>
// //         <p style={{ fontSize: 11, color: "var(--epa-muted)", marginTop: 1 }}>{food.quantity}</p>
// //       </div>
// //       <div style={{ display: "flex", gap: 16, flexShrink: 0, marginLeft: 16 }}>
// //         <div style={{ textAlign: "center" }}>
// //           <p style={{ fontSize: 13, fontWeight: 700, color: "var(--epa-gold)" }}>{food.calories}</p>
// //           <p style={{ fontSize: 9, color: "var(--epa-muted)" }}>kcal</p>
// //         </div>
// //         <div style={{ textAlign: "center" }}>
// //           <p style={{ fontSize: 13, fontWeight: 700, color: "#4CAF85" }}>{food.protein}g</p>
// //           <p style={{ fontSize: 9, color: "var(--epa-muted)" }}>P</p>
// //         </div>
// //         <div style={{ textAlign: "center" }}>
// //           <p style={{ fontSize: 13, fontWeight: 700, color: "#d4b97a" }}>{food.carbs}g</p>
// //           <p style={{ fontSize: 9, color: "var(--epa-muted)" }}>C</p>
// //         </div>
// //         <div style={{ textAlign: "center" }}>
// //           <p style={{ fontSize: 13, fontWeight: 700, color: "var(--epa-muted)" }}>{food.fats}g</p>
// //           <p style={{ fontSize: 9, color: "var(--epa-muted)" }}>F</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────
// //    MEAL CARD
// // ───────────────────────────────────────────── */
// // function MealCard({ meal }) {
// //   const [open, setOpen] = useState(false);
// //   const totalCals = meal.foods.reduce((acc, f) => acc + (f.calories || 0), 0);
// //   const totalP    = meal.foods.reduce((acc, f) => acc + (f.protein  || 0), 0);

// //   return (
// //     <div style={{ borderRadius: "var(--epa-radius)", border: "1px solid rgba(198,167,94,0.1)", background: "rgba(255,255,255,0.02)", overflow: "hidden" }}>
// //       <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: "transparent", border: "none", cursor: "pointer", fontFamily: "var(--epa-sans)" }}>
// //         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// //           <MealBadge type={meal.mealType} />
// //           <span style={{ fontSize: 11, color: "var(--epa-muted)" }}>{meal.foods.length} items</span>
// //         </div>
// //         <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
// //           <span style={{ fontSize: 13, fontWeight: 800, color: "var(--epa-text)" }}>
// //             {totalCals} kcal
// //             <span style={{ fontSize: 11, fontWeight: 400, color: "var(--epa-muted)", marginLeft: 6 }}>· {Math.round(totalP)}g P</span>
// //           </span>
// //           <span style={{ color: "var(--epa-muted)", fontSize: 12, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>▾</span>
// //         </div>
// //       </button>
// //       {open && (
// //         <div style={{ padding: "4px 20px 16px", borderTop: "1px solid rgba(198,167,94,0.08)" }}>
// //           {meal.foods.map((food, i) => <FoodRow key={i} food={food} />)}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────
// //    DAY PLAN CARD
// // ───────────────────────────────────────────── */
// // function DayPlanCard({ dayPlan, defaultOpen }) {
// //   const [open, setOpen] = useState(defaultOpen);
// //   const s      = dayPlan.daySummary;
// //   const isRest = dayPlan.workoutType === "rest";

// //   return (
// //     <div style={S.dayCard(open)}>
// //       <button onClick={() => setOpen(!open)} style={S.dayCardBtn}>
// //         <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
// //           <div style={S.dayNum(open)}>{dayPlan.day}</div>
// //           <div style={{ textAlign: "left" }}>
// //             <p style={{ fontSize: 13, fontWeight: 700, color: "var(--epa-text)", textTransform: "capitalize" }}>
// //               Day {dayPlan.day} — {dayPlan.workoutType}
// //             </p>
// //             {s && (
// //               <p style={{ fontSize: 11, color: "var(--epa-muted)", marginTop: 2 }}>
// //                 {s.totalCalories} kcal · {s.proteinGrams}g P · {s.carbsGrams}g C · {s.fatsGrams}g F · 💧 {s.hydrationLiters}L
// //               </p>
// //             )}
// //           </div>
// //         </div>
// //         <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
// //           {isRest && (
// //             <span style={{ fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 999, background: "rgba(255,255,255,0.04)", color: "var(--epa-muted)", border: "1px solid rgba(255,255,255,0.08)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Rest</span>
// //           )}
// //           <span style={{ color: "var(--epa-muted)", fontSize: 12, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>▾</span>
// //         </div>
// //       </button>

// //       {open && (
// //         <div style={{ padding: "4px 24px 24px", borderTop: "1px solid rgba(198,167,94,0.1)" }}>
// //           {s && (
// //             <div style={{ ...S.macroGrid, marginTop: 16, marginBottom: 16 }}>
// //               <MacroCard label="Calories" value={s.totalCalories} unit="kcal"  color="gold"    />
// //               <MacroCard label="Protein"  value={s.proteinGrams}  unit="grams" color="emerald" />
// //               <MacroCard label="Carbs"    value={s.carbsGrams}    unit="grams" color="ivory"   />
// //               <MacroCard label="Fats"     value={s.fatsGrams}     unit="grams" color="stone"   />
// //             </div>
// //           )}
// //           <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
// //             {dayPlan.meals?.map((meal, i) => <MealCard key={i} meal={meal} />)}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────
// //    WEEK CALENDAR
// // ───────────────────────────────────────────── */
// // const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// // function WeekCalendar({ weekPlan, activeDay, onSelectDay }) {
// //   return (
// //     <div style={S.calGrid}>
// //       {weekPlan.map((day, idx) => {
// //         const isRest   = day.workoutType === "rest";
// //         const isActive = activeDay === idx;
// //         return (
// //           <button key={day.day} onClick={() => onSelectDay(idx)} style={S.calDay(isActive, isRest)}>
// //             <span style={S.calDayName(isActive)}>{DAY_NAMES[idx] ?? `D${day.day}`}</span>
// //             <span style={S.calDayNum(isActive, isRest)}>{day.day}</span>
// //             <span style={S.calDayTag(isActive, isRest)}>{isRest ? "Rest" : (day.workoutType ?? "Train")}</span>
// //           </button>
// //         );
// //       })}
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────
// //    WEEKLY NOTES
// // ───────────────────────────────────────────── */
// // function WeeklyNotesCard({ notes }) {
// //   if (!notes) return null;
// //   const sections = [
// //     { label: "Carb Cycling Strategy", key: "carbCyclingStrategy", color: "var(--epa-gold)" },
// //     { label: "Recovery Focus",         key: "recoveryFocus",        color: "#4CAF85" },
// //     { label: "Budget Efficiency",      key: "budgetEfficiency",     color: "#d4b97a" },
// //   ];
// //   return (
// //     <div style={S.card}>
// //       <div style={S.cardHeader}>
// //         <div style={S.cardHeaderLeft}>
// //           <div style={S.cardIcon("rgba(198,167,94,0.1)", "rgba(198,167,94,0.25)", "var(--epa-gold)")}>📊</div>
// //           <h2 style={S.cardTitle}>Weekly Nutrition Strategy</h2>
// //         </div>
// //       </div>
// //       <div style={{ ...S.cardBody, display: "flex", flexDirection: "column", gap: 20 }}>
// //         {sections.map(({ label, key, color }) =>
// //           notes[key] ? (
// //             <div key={key}>
// //               <p style={{ ...S.sectionLabel, color, marginBottom: 6 }}>{label}</p>
// //               <p style={{ fontSize: 13, color: "var(--epa-muted)", lineHeight: 1.65 }}>{notes[key]}</p>
// //             </div>
// //           ) : null
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────
// //    LOG FOOD CARD
// // ───────────────────────────────────────────── */
// // function LogFoodCard({ onLog }) {
// //   const [food, setFood] = useState({
// //     mealType: "breakfast", foodName: "", quantity: "",
// //     calories: "", proteinGrams: "", carbsGrams: "", fatGrams: "",
// //   });
// //   const [submitting, setSubmitting] = useState(false);
// //   const [success, setSuccess]       = useState(false);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setSubmitting(true);
// //     try {
// //       await onLog(food);
// //       setSuccess(true);
// //       setFood({ mealType: "breakfast", foodName: "", quantity: "", calories: "", proteinGrams: "", carbsGrams: "", fatGrams: "" });
// //       setTimeout(() => setSuccess(false), 3000);
// //     } catch {}
// //     setSubmitting(false);
// //   };

// //   return (
// //     <div style={S.card}>
// //       <div style={S.cardHeader}>
// //         <div style={S.cardHeaderLeft}>
// //           <div style={S.cardIcon("rgba(14,59,50,0.7)", "rgba(46,139,106,0.35)", "#4CAF85")}>✏️</div>
// //           <h2 style={S.cardTitle}>Log Food</h2>
// //         </div>
// //       </div>
// //       <form onSubmit={handleSubmit} style={{ ...S.cardBody, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
// //         <select value={food.mealType} onChange={(e) => setFood({ ...food, mealType: e.target.value })}
// //           style={{ ...S.select, gridColumn: "1 / -1" }}>
// //           <option value="breakfast">Breakfast</option>
// //           <option value="pre_workout">Pre Workout</option>
// //           <option value="post_workout">Post Workout</option>
// //           <option value="lunch">Lunch</option>
// //           <option value="snack">Snack</option>
// //           <option value="dinner">Dinner</option>
// //         </select>

// //         <input placeholder="Food Name *" required value={food.foodName}
// //           onChange={(e) => setFood({ ...food, foodName: e.target.value })}
// //           style={{ ...S.input, gridColumn: "1 / -1" }} />

// //         <input placeholder="Quantity (e.g. 100g)" value={food.quantity}
// //           onChange={(e) => setFood({ ...food, quantity: e.target.value })} style={S.input} />

// //         <input type="number" placeholder="Calories *" required value={food.calories}
// //           onChange={(e) => setFood({ ...food, calories: e.target.value })} style={S.input} />

// //         <input type="number" placeholder="Protein (g)" value={food.proteinGrams}
// //           onChange={(e) => setFood({ ...food, proteinGrams: e.target.value })} style={S.input} />

// //         <input type="number" placeholder="Carbs (g)" value={food.carbsGrams}
// //           onChange={(e) => setFood({ ...food, carbsGrams: e.target.value })} style={S.input} />

// //         <input type="number" placeholder="Fat (g)" value={food.fatGrams}
// //           onChange={(e) => setFood({ ...food, fatGrams: e.target.value })}
// //           style={{ ...S.input, gridColumn: "1 / -1" }} />

// //         <button type="submit" disabled={submitting}
// //           style={{ ...S.btnPrimary, gridColumn: "1 / -1", opacity: submitting ? 0.5 : 1 }}>
// //           {submitting ? "Logging..." : success ? "✓ Logged!" : "Log Food"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────
// //    SUMMARY CARD
// // ───────────────────────────────────────────── */
// // function SummaryCard({ summary, onGenerate }) {
// //   const sc = S.statusMap[summary?.status] ?? { bg: "rgba(255,255,255,0.04)", color: "var(--epa-muted)", border: "rgba(255,255,255,0.1)" };

// //   return (
// //     <div style={S.card}>
// //       <div style={S.cardHeader}>
// //         <div style={S.cardHeaderLeft}>
// //           <div style={S.cardIcon("rgba(14,59,50,0.5)", "rgba(46,139,106,0.3)", "#4CAF85")}>📈</div>
// //           <h2 style={S.cardTitle}>Today's Summary</h2>
// //         </div>
// //         <button onClick={onGenerate} style={S.btnOutline}>Refresh</button>
// //       </div>

// //       {!summary ? (
// //         <div style={{ padding: "48px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center" }}>
// //           <span style={{ fontSize: 36 }}>📊</span>
// //           <p style={{ fontSize: 13, color: "var(--epa-muted)" }}>Hit Refresh to see your daily progress.</p>
// //         </div>
// //       ) : (
// //         <div style={S.cardBody}>
// //           <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
// //             <span style={{ fontSize: 12, color: "var(--epa-muted)", fontWeight: 600 }}>Status:</span>
// //             <span style={{ fontSize: 9, fontWeight: 700, padding: "4px 12px", borderRadius: 999, background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, textTransform: "uppercase", letterSpacing: "0.12em" }}>
// //               {summary.status}
// //             </span>
// //             {summary.calorieDifference != null && (
// //               <span style={{ fontSize: 11, fontWeight: 600, color: summary.calorieDifference > 0 ? "#e05555" : "#4CAF85" }}>
// //                 {summary.calorieDifference > 0 ? `+${summary.calorieDifference}` : summary.calorieDifference} kcal
// //               </span>
// //             )}
// //           </div>
// //           <ProgressBar label="Calories" consumed={summary.consumedCalories} target={summary.targetCalories} color="var(--epa-gold)" />
// //           <ProgressBar label="Protein"  consumed={summary.consumedProtein}  target={summary.targetProtein}  color="#4CAF85" />
// //           <ProgressBar label="Carbs"    consumed={summary.consumedCarbs}    target={summary.targetCarbs}    color="#d4b97a" />
// //           <ProgressBar label="Fat"      consumed={summary.consumedFat}      target={summary.targetFat}      color="var(--epa-muted)" />
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────
// //    MAIN PAGE
// // ───────────────────────────────────────────── */
// // export default function Nutrition() {
// //   const { user } = useAuth();
// //   const today  = new Date().toISOString().split("T")[0];
// //   const userId = user?._id || user?.id;

// //   const [target,    setTarget]    = useState(null);
// //   const [summary,   setSummary]   = useState(null);
// //   const [loading,   setLoading]   = useState(false);
// //   const [activeDay, setActiveDay] = useState(0);

// //   useEffect(() => {
// //     if (!userId) return;
// //     (async () => {
// //       try {
// //         const plan = await nutritionAPI.getToday(userId, today);
// //         setTarget(plan.data.nutritionPlan);
// //       } catch {}
// //       try {
// //         const sum = await nutritionAPI.getTodaySummary(userId, today);
// //         setSummary(sum.data.summary);
// //       } catch {}
// //     })();
// //   }, [userId]);

// //   const generateTarget = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await nutritionAPI.generateTarget({ userId, date: today });
// //       setTarget(res.data.nutritionPlan);
// //     } catch (err) {
// //       alert(err.response?.data?.message || err.message || "Failed to generate plan");
// //     }
// //     setLoading(false);
// //   };

// //   const logFood = async (food) => {
// //     await foodAPI.log({
// //       userId, date: today, ...food,
// //       calories:     Number(food.calories),
// //       proteinGrams: Number(food.proteinGrams) || 0,
// //       carbsGrams:   Number(food.carbsGrams)   || 0,
// //       fatGrams:     Number(food.fatGrams)      || 0,
// //     });
// //     await generateSummary();
// //   };

// //   const generateSummary = async () => {
// //     try {
// //       const res = await nutritionAPI.generateSummary(userId, today);
// //       setSummary(res.data.summary);
// //     } catch (err) {
// //       alert(err.response?.data?.message || "Failed to get summary");
// //     }
// //   };

// //   const weekPlan    = target?.aiGeneratedPlan?.weekNutritionPlan ?? [];
// //   const weeklyNotes = target?.aiGeneratedPlan?.weeklyNotes ?? null;

// //   return (
// //     <div style={S.page}>
// //       <div style={S.inner}>

// //         {/* HERO */}
// //         <div style={S.hero}>
// //           <div style={S.heroTopLine} />
// //           <div style={S.heroGlow} />
// //           <div style={S.heroInner}>
// //             <div style={{ flex: 1 }}>
// //               <p style={S.heroEyebrow}>Nutrition Dashboard</p>
// //               <h1 style={S.heroTitle}>Daily Nutrition Plan</h1>
// //               <p style={S.heroMeta}>
// //                 {today}
// //                 {target && <> · Generated by <span style={S.heroMetaAccent}>{target.generatedBy}</span></>}
// //               </p>
// //               {target && (
// //                 <div style={S.macroGrid}>
// //                   <MacroCard label="Calories" value={target.calorieTarget} unit="kcal"  color="gold"    />
// //                   <MacroCard label="Protein"  value={target.proteinTarget} unit="grams" color="emerald" />
// //                   <MacroCard label="Carbs"    value={target.carbsTarget}   unit="grams" color="ivory"   />
// //                   <MacroCard label="Fats"     value={target.fatsTarget}    unit="grams" color="stone"   />
// //                 </div>
// //               )}
// //             </div>
// //             <div style={{ flexShrink: 0, paddingTop: 4 }}>
// //               <button onClick={generateTarget} disabled={loading} style={{ ...S.btnPrimary, opacity: loading ? 0.5 : 1 }}>
// //                 {loading ? "Generating..." : target ? "Regenerate Plan" : "Generate Today's Plan"}
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* EMPTY STATE */}
// //         {!target && (
// //           <div style={S.empty}>
// //             <span style={{ fontSize: 44 }}>🥗</span>
// //             <p style={{ fontFamily: "var(--epa-serif)", fontSize: 20, fontWeight: 700, color: "var(--epa-text)" }}>No nutrition plan yet.</p>
// //             <p style={{ fontSize: 13, color: "var(--epa-muted)", maxWidth: 300, lineHeight: 1.6 }}>
// //               Generate a workout-aligned AI nutrition plan to see your daily meal schedule and macro targets.
// //             </p>
// //             <button onClick={generateTarget} disabled={loading} style={{ ...S.btnPrimary, opacity: loading ? 0.5 : 1, marginTop: 8 }}>
// //               {loading ? "Generating..." : "Generate Plan"}
// //             </button>
// //           </div>
// //         )}

// //         {/* PLAN */}
// //         {target && weekPlan.length > 0 && (
// //           <>
// //             <div>
// //               <p style={S.sectionLabel}>Weekly Overview</p>
// //               <WeekCalendar weekPlan={weekPlan} activeDay={activeDay} onSelectDay={setActiveDay} />
// //             </div>

// //             <div>
// //               <p style={S.sectionLabel}>Meal Plan</p>
// //               <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
// //                 {weekPlan.map((day, i) => (
// //                   <DayPlanCard key={day.day} dayPlan={day} defaultOpen={i === activeDay} />
// //                 ))}
// //               </div>
// //             </div>

// //             {weeklyNotes && (
// //               <div>
// //                 <p style={S.sectionLabel}>Strategy Notes</p>
// //                 <WeeklyNotesCard notes={weeklyNotes} />
// //               </div>
// //             )}
// //           </>
// //         )}

// //         {/* LOG + SUMMARY */}
// //         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
// //           <LogFoodCard onLog={logFood} />
// //           <SummaryCard summary={summary} onGenerate={generateSummary} />
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }

// import { useState, useEffect } from "react";
// import { nutritionAPI, foodAPI } from "../api/axios";
// import { useAuth } from "../context/AuthContext";

// /* ─────────────────────────────────────────────
//    DESIGN TOKENS  (matches Profile / App theme)
// ───────────────────────────────────────────── */
// const T = {
//   gradBody:    "linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #eef2ff 100%)",
//   gradPrimary: "linear-gradient(135deg, #2563eb, #6366f1, #7c3aed)",
//   indigo:      "#6366f1",
//   indigoDark:  "#4f46e5",
//   blue:        "#2563eb",
//   violet:      "#7c3aed",
//   text:        "#0f172a",
//   textMid:     "#475569",
//   textLight:   "#64748b",
//   muted:       "#94a3b8",
//   borderSoft:  "#e0e7ff",
//   borderLight: "rgba(255,255,255,0.9)",
//   surface:     "rgba(255,255,255,0.82)",
//   shadowCard:  "0 4px 32px rgba(99,102,241,0.10), 0 1px 6px rgba(0,0,0,0.05)",
//   r8:  8,  r12: 12, r16: 16, r20: 20,
// };

// const glass = {
//   background:           T.surface,
//   backdropFilter:       "blur(20px)",
//   WebkitBackdropFilter: "blur(20px)",
//   border:               `1px solid ${T.borderLight}`,
//   boxShadow:            T.shadowCard,
// };

// /* ─────────────────────────────────────────────
//    SHARED STYLE OBJECTS
// ───────────────────────────────────────────── */
// const S = {
//   page: {
//     minHeight: "100vh",
//     background: T.gradBody,
//     fontFamily: "'Outfit', sans-serif",
//     padding: "36px 20px 60px",
//     color: T.text,
//   },
//   inner: {
//     maxWidth: 1120,
//     margin: "0 auto",
//     display: "flex",
//     flexDirection: "column",
//     gap: 28,
//   },

//   /* section eyebrow label */
//   sectionLabel: {
//     fontSize: 10,
//     fontWeight: 700,
//     letterSpacing: "0.18em",
//     textTransform: "uppercase",
//     color: T.indigo,
//     marginBottom: 12,
//   },

//   /* glass card */
//   card: {
//     ...glass,
//     borderRadius: T.r20,
//     overflow: "hidden",
//   },
//   cardHeader: {
//     padding: "18px 26px",
//     borderBottom: `1px solid ${T.borderSoft}`,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   cardHeaderLeft: { display: "flex", alignItems: "center", gap: 12 },
//   cardIcon: (bg, color) => ({
//     width: 34, height: 34,
//     borderRadius: T.r8,
//     background: bg,
//     border: `1px solid ${T.borderSoft}`,
//     display: "flex", alignItems: "center", justifyContent: "center",
//     fontSize: 15, color,
//   }),
//   cardTitle: {
//     fontFamily: "'Outfit', sans-serif",
//     fontSize: 16, fontWeight: 700,
//     color: T.text, letterSpacing: "-0.01em",
//   },
//   cardBody: { padding: "24px 26px" },

//   /* macro grid */
//   macroGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(4, 1fr)",
//     gap: 12,
//     marginTop: 20,
//   },
//   macroCard: (accent) => {
//     const map = {
//       indigo:  { bg: "rgba(99,102,241,0.08)",  border: "rgba(99,102,241,0.2)",  color: "#6366f1" },
//       blue:    { bg: "rgba(37,99,235,0.08)",   border: "rgba(37,99,235,0.2)",   color: "#2563eb" },
//       violet:  { bg: "rgba(124,58,237,0.08)",  border: "rgba(124,58,237,0.2)",  color: "#7c3aed" },
//       slate:   { bg: "rgba(148,163,184,0.08)", border: "rgba(148,163,184,0.2)", color: "#94a3b8" },
//     };
//     const c = map[accent] || map.slate;
//     return {
//       borderRadius: T.r16,
//       border: `1px solid ${c.border}`,
//       background: c.bg,
//       padding: "16px 12px",
//       display: "flex", flexDirection: "column",
//       alignItems: "center", textAlign: "center",
//     };
//   },
//   macroLabel: { fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.muted, marginBottom: 5 },
//   macroValue: (accent) => {
//     const map = { indigo:"#6366f1", blue:"#2563eb", violet:"#7c3aed", slate: T.textMid };
//     return { fontSize: 24, fontWeight: 900, color: map[accent] || T.text, lineHeight: 1 };
//   },
//   macroUnit: { fontSize: 10, color: T.muted, marginTop: 3 },

//   /* hero */
//   hero: {
//     ...glass,
//     borderRadius: T.r20,
//     padding: "36px 36px 32px",
//     position: "relative",
//     overflow: "hidden",
//   },
//   heroTopLine: {
//     position: "absolute", top: 0, left: 0, right: 0,
//     height: 2,
//     background: T.gradPrimary,
//     opacity: 0.7,
//   },
//   heroBlob1: {
//     position: "absolute", top: -60, right: -60,
//     width: 260, height: 260, borderRadius: "50%",
//     background: "rgba(99,102,241,0.08)", filter: "blur(60px)",
//     pointerEvents: "none",
//   },
//   heroBlob2: {
//     position: "absolute", bottom: -40, left: "30%",
//     width: 180, height: 180, borderRadius: "50%",
//     background: "rgba(37,99,235,0.06)", filter: "blur(40px)",
//     pointerEvents: "none",
//   },
//   heroInner: { position: "relative", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 24 },
//   heroEyebrow: { fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.indigo, marginBottom: 6 },
//   heroTitle: { fontFamily: "'Outfit', sans-serif", fontSize: 30, fontWeight: 800, color: T.text, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 4 },
//   heroMeta: { fontSize: 12, color: T.textLight },
//   heroMetaAccent: { color: T.indigo, fontWeight: 600 },

//   /* buttons */
//   btnPrimary: {
//     padding: "12px 26px",
//     borderRadius: T.r12,
//     background: T.gradPrimary,
//     color: "white",
//     fontSize: 11, fontWeight: 700,
//     fontFamily: "'Outfit', sans-serif",
//     letterSpacing: "0.12em", textTransform: "uppercase",
//     border: "none", cursor: "pointer",
//     boxShadow: "0 4px 16px rgba(99,102,241,0.30)",
//     transition: "all 0.2s",
//     whiteSpace: "nowrap",
//   },
//   btnOutline: {
//     padding: "9px 18px",
//     borderRadius: T.r12,
//     background: "rgba(238,242,255,0.6)",
//     color: T.indigo,
//     fontSize: 10, fontWeight: 700,
//     fontFamily: "'Outfit', sans-serif",
//     letterSpacing: "0.12em", textTransform: "uppercase",
//     border: `1.5px solid ${T.borderSoft}`,
//     cursor: "pointer",
//     transition: "all 0.2s",
//   },

//   /* progress */
//   progressRow: { marginBottom: 16 },
//   progressMeta: { display: "flex", justifyContent: "space-between", marginBottom: 7 },
//   progressLabel: { fontSize: 11, fontWeight: 600, color: T.textMid },
//   progressTrack: { height: 6, borderRadius: 999, background: "rgba(226,232,240,0.8)", overflow: "hidden" },
//   progressFill: (pct, over, color) => ({
//     height: "100%", borderRadius: 999,
//     width: `${pct}%`,
//     background: over ? "#f43f5e" : color,
//     transition: "width 0.5s ease",
//   }),

//   /* meal badge */
//   mealBadgeMap: {
//     breakfast:      { bg: "rgba(99,102,241,0.1)",  color: "#6366f1", border: "rgba(99,102,241,0.25)" },
//     pre_workout:    { bg: "rgba(37,99,235,0.1)",   color: "#2563eb", border: "rgba(37,99,235,0.25)" },
//     post_workout:   { bg: "rgba(124,58,237,0.1)",  color: "#7c3aed", border: "rgba(124,58,237,0.25)" },
//     lunch:          { bg: "rgba(99,102,241,0.07)", color: "#818cf8", border: "rgba(99,102,241,0.15)" },
//     snack:          { bg: "rgba(148,163,184,0.1)", color: "#94a3b8", border: "rgba(148,163,184,0.2)" },
//     dinner:         { bg: "rgba(226,232,240,0.5)", color: T.textMid, border: T.borderSoft },
//     optional_snack: { bg: "rgba(241,245,249,0.5)", color: T.muted,   border: "rgba(226,232,240,0.5)" },
//   },

//   /* calendar */
//   calGrid: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 10 },
//   calDay: (isActive, isRest) => ({
//     display: "flex", flexDirection: "column", alignItems: "center",
//     padding: "16px 6px 12px",
//     borderRadius: T.r16,
//     border: isActive ? `1px solid ${T.indigo}` : `1px solid ${isRest ? T.borderSoft : "rgba(199,210,254,0.5)"}`,
//     background: isActive ? T.gradPrimary : T.surface,
//     cursor: "pointer",
//     transition: "all 0.2s",
//     boxShadow: isActive ? "0 4px 20px rgba(99,102,241,0.28)" : T.shadowCard,
//     transform: isActive ? "translateY(-2px)" : "none",
//     fontFamily: "'Outfit', sans-serif",
//   }),
//   calDayName: (isActive) => ({ fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: isActive ? "rgba(255,255,255,0.8)" : T.muted, marginBottom: 4 }),
//   calDayNum:  (isActive, isRest) => ({ fontSize: 14, fontWeight: 900, color: isActive ? "white" : isRest ? T.muted : T.text }),
//   calDayTag:  (isActive, isRest) => ({
//     marginTop: 8, fontSize: 8, fontWeight: 700, padding: "2px 7px", borderRadius: 999,
//     textTransform: "uppercase", letterSpacing: "0.08em",
//     background: isRest ? "rgba(226,232,240,0.5)" : isActive ? "rgba(255,255,255,0.2)" : "rgba(99,102,241,0.1)",
//     color: isRest ? T.muted : isActive ? "white" : T.indigo,
//     overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%",
//   }),

//   /* day card */
//   dayCard: (open) => ({
//     ...glass,
//     borderRadius: T.r16,
//     overflow: "hidden",
//     transition: "border-color 0.2s",
//     border: open ? `1px solid rgba(99,102,241,0.35)` : `1px solid ${T.borderLight}`,
//   }),
//   dayCardBtn: {
//     width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
//     padding: "18px 24px", background: "transparent", border: "none", cursor: "pointer",
//     color: T.text, fontFamily: "'Outfit', sans-serif",
//   },
//   dayNum: (open) => ({
//     width: 40, height: 40, borderRadius: T.r8,
//     display: "flex", alignItems: "center", justifyContent: "center",
//     fontSize: 14, fontWeight: 900,
//     background: open ? T.gradPrimary : "rgba(238,242,255,0.7)",
//     color: open ? "white" : T.indigo,
//     flexShrink: 0, transition: "background 0.2s, color 0.2s",
//   }),

//   /* input */
//   input: {
//     width: "100%",
//     background: "rgba(238,242,255,0.5)",
//     border: `1.5px solid ${T.borderSoft}`,
//     borderRadius: T.r12,
//     padding: "11px 15px",
//     color: T.text,
//     fontSize: 13,
//     fontFamily: "'Outfit', sans-serif",
//     outline: "none",
//     transition: "border-color 0.2s",
//   },
//   select: {
//     width: "100%",
//     background: "rgba(238,242,255,0.5)",
//     border: `1.5px solid ${T.borderSoft}`,
//     borderRadius: T.r12,
//     padding: "11px 15px",
//     color: T.text,
//     fontSize: 13,
//     fontFamily: "'Outfit', sans-serif",
//     outline: "none",
//   },

//   /* status */
//   statusMap: {
//     over:     { bg: "rgba(244,63,94,0.08)",   color: "#f43f5e", border: "rgba(244,63,94,0.25)" },
//     under:    { bg: "rgba(99,102,241,0.08)",  color: T.indigo,  border: "rgba(99,102,241,0.2)" },
//     on_track: { bg: "rgba(34,197,94,0.08)",  color: "#22c55e", border: "rgba(34,197,94,0.2)" },
//   },

//   /* empty */
//   empty: {
//     ...glass,
//     borderRadius: T.r20,
//     border: `1.5px dashed rgba(99,102,241,0.25)`,
//     padding: "80px 24px",
//     display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
//     gap: 14, textAlign: "center",
//   },
// };

// /* ─────────────────────────────────────────────
//    MICRO COMPONENTS
// ───────────────────────────────────────────── */
// function MacroCard({ label, value, unit, accent = "indigo" }) {
//   return (
//     <div style={S.macroCard(accent)}>
//       <p style={S.macroLabel}>{label}</p>
//       <p style={S.macroValue(accent)}>{value ?? "—"}</p>
//       <p style={S.macroUnit}>{unit}</p>
//     </div>
//   );
// }

// function ProgressBar({ label, consumed = 0, target = 0, color }) {
//   const pct  = target > 0 ? Math.min(100, Math.round((consumed / target) * 100)) : 0;
//   const over = target > 0 && consumed > target;
//   return (
//     <div style={S.progressRow}>
//       <div style={S.progressMeta}>
//         <span style={S.progressLabel}>{label}</span>
//         <span style={{ fontSize: 11, fontWeight: 700, color: over ? "#f43f5e" : T.text }}>
//           {consumed} / {target}
//         </span>
//       </div>
//       <div style={S.progressTrack}>
//         <div style={S.progressFill(pct, over, color || T.gradPrimary)} />
//       </div>
//     </div>
//   );
// }

// function MealBadge({ type }) {
//   const c = S.mealBadgeMap[type] ?? { bg: "rgba(226,232,240,0.5)", color: T.muted, border: T.borderSoft };
//   return (
//     <span style={{
//       fontSize: 9, fontWeight: 700, padding: "4px 10px", borderRadius: 999,
//       border: `1px solid ${c.border}`, background: c.bg, color: c.color,
//       textTransform: "uppercase", letterSpacing: "0.12em", whiteSpace: "nowrap",
//     }}>
//       {type.replace(/_/g, " ")}
//     </span>
//   );
// }

// function FoodRow({ food }) {
//   return (
//     <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${T.borderSoft}` }}>
//       <div style={{ flex: 1, minWidth: 0 }}>
//         <p style={{ fontSize: 13, fontWeight: 600, color: T.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{food.name}</p>
//         <p style={{ fontSize: 11, color: T.muted, marginTop: 1 }}>{food.quantity}</p>
//       </div>
//       <div style={{ display: "flex", gap: 16, flexShrink: 0, marginLeft: 16 }}>
//         {[
//           { val: food.calories, label: "kcal", color: T.indigo },
//           { val: `${food.protein}g`, label: "P", color: "#2563eb" },
//           { val: `${food.carbs}g`,   label: "C", color: "#7c3aed" },
//           { val: `${food.fats}g`,    label: "F", color: T.muted },
//         ].map(({ val, label, color }) => (
//           <div key={label} style={{ textAlign: "center" }}>
//             <p style={{ fontSize: 13, fontWeight: 700, color }}>{val}</p>
//             <p style={{ fontSize: 9, color: T.muted }}>{label}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function MealCard({ meal }) {
//   const [open, setOpen] = useState(false);
//   const totalCals = meal.foods.reduce((a, f) => a + (f.calories || 0), 0);
//   const totalP    = meal.foods.reduce((a, f) => a + (f.protein  || 0), 0);
//   return (
//     <div style={{ borderRadius: T.r12, border: `1px solid ${T.borderSoft}`, background: "rgba(238,242,255,0.35)", overflow: "hidden" }}>
//       <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 18px", background: "transparent", border: "none", cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           <MealBadge type={meal.mealType} />
//           <span style={{ fontSize: 11, color: T.muted }}>{meal.foods.length} items</span>
//         </div>
//         <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//           <span style={{ fontSize: 13, fontWeight: 800, color: T.text }}>
//             {totalCals} kcal
//             <span style={{ fontSize: 11, fontWeight: 400, color: T.muted, marginLeft: 6 }}>· {Math.round(totalP)}g P</span>
//           </span>
//           <span style={{ color: T.indigo, fontSize: 11, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>▾</span>
//         </div>
//       </button>
//       {open && (
//         <div style={{ padding: "4px 18px 16px", borderTop: `1px solid ${T.borderSoft}` }}>
//           {meal.foods.map((food, i) => <FoodRow key={i} food={food} />)}
//         </div>
//       )}
//     </div>
//   );
// }

// function DayPlanCard({ dayPlan, defaultOpen }) {
//   const [open, setOpen] = useState(defaultOpen);
//   const s      = dayPlan.daySummary;
//   const isRest = dayPlan.workoutType === "rest";
//   return (
//     <div style={S.dayCard(open)}>
//       <button onClick={() => setOpen(!open)} style={S.dayCardBtn}>
//         <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//           <div style={S.dayNum(open)}>{dayPlan.day}</div>
//           <div style={{ textAlign: "left" }}>
//             <p style={{ fontSize: 13, fontWeight: 700, color: T.text, textTransform: "capitalize" }}>
//               Day {dayPlan.day} — {dayPlan.workoutType}
//             </p>
//             {s && (
//               <p style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>
//                 {s.totalCalories} kcal · {s.proteinGrams}g P · {s.carbsGrams}g C · {s.fatsGrams}g F · 💧 {s.hydrationLiters}L
//               </p>
//             )}
//           </div>
//         </div>
//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           {isRest && (
//             <span style={{ fontSize: 9, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: "rgba(238,242,255,0.7)", color: T.muted, border: `1px solid ${T.borderSoft}`, textTransform: "uppercase", letterSpacing: "0.1em" }}>Rest</span>
//           )}
//           <span style={{ color: T.indigo, fontSize: 11, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>▾</span>
//         </div>
//       </button>
//       {open && (
//         <div style={{ padding: "4px 24px 24px", borderTop: `1px solid ${T.borderSoft}` }}>
//           {s && (
//             <div style={{ ...S.macroGrid, marginTop: 16, marginBottom: 16 }}>
//               <MacroCard label="Calories" value={s.totalCalories} unit="kcal"  accent="indigo"  />
//               <MacroCard label="Protein"  value={s.proteinGrams}  unit="grams" accent="blue"    />
//               <MacroCard label="Carbs"    value={s.carbsGrams}    unit="grams" accent="violet"  />
//               <MacroCard label="Fats"     value={s.fatsGrams}     unit="grams" accent="slate"   />
//             </div>
//           )}
//           <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//             {dayPlan.meals?.map((meal, i) => <MealCard key={i} meal={meal} />)}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// function WeekCalendar({ weekPlan, activeDay, onSelectDay }) {
//   return (
//     <div style={S.calGrid}>
//       {weekPlan.map((day, idx) => {
//         const isRest   = day.workoutType === "rest";
//         const isActive = activeDay === idx;
//         return (
//           <button key={day.day} onClick={() => onSelectDay(idx)} style={S.calDay(isActive, isRest)}>
//             <span style={S.calDayName(isActive)}>{DAY_NAMES[idx] ?? `D${day.day}`}</span>
//             <span style={S.calDayNum(isActive, isRest)}>{day.day}</span>
//             <span style={S.calDayTag(isActive, isRest)}>{isRest ? "Rest" : (day.workoutType ?? "Train")}</span>
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// function WeeklyNotesCard({ notes }) {
//   if (!notes) return null;
//   const sections = [
//     { label: "Carb Cycling Strategy", key: "carbCyclingStrategy", color: T.indigo },
//     { label: "Recovery Focus",         key: "recoveryFocus",        color: "#2563eb" },
//     { label: "Budget Efficiency",      key: "budgetEfficiency",     color: "#7c3aed" },
//   ];
//   return (
//     <div style={S.card}>
//       <div style={S.cardHeader}>
//         <div style={S.cardHeaderLeft}>
//           <div style={S.cardIcon("rgba(99,102,241,0.1)", T.indigo)}>📊</div>
//           <h2 style={S.cardTitle}>Weekly Nutrition Strategy</h2>
//         </div>
//       </div>
//       <div style={{ ...S.cardBody, display: "flex", flexDirection: "column", gap: 22 }}>
//         {sections.map(({ label, key, color }) =>
//           notes[key] ? (
//             <div key={key}>
//               <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color, marginBottom: 7 }}>{label}</p>
//               <p style={{ fontSize: 13, color: T.textMid, lineHeight: 1.7 }}>{notes[key]}</p>
//             </div>
//           ) : null
//         )}
//       </div>
//     </div>
//   );
// }

// function LogFoodCard({ onLog }) {
//   const [food, setFood] = useState({
//     mealType: "breakfast", foodName: "", quantity: "",
//     calories: "", proteinGrams: "", carbsGrams: "", fatGrams: "",
//   });
//   const [submitting, setSubmitting] = useState(false);
//   const [success,    setSuccess]    = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       await onLog(food);
//       setSuccess(true);
//       setFood({ mealType: "breakfast", foodName: "", quantity: "", calories: "", proteinGrams: "", carbsGrams: "", fatGrams: "" });
//       setTimeout(() => setSuccess(false), 3000);
//     } catch {}
//     setSubmitting(false);
//   };

//   const inputFocus = (e) => { e.target.style.borderColor = T.indigo; };
//   const inputBlur  = (e) => { e.target.style.borderColor = T.borderSoft; };

//   return (
//     <div style={S.card}>
//       <div style={S.cardHeader}>
//         <div style={S.cardHeaderLeft}>
//           <div style={S.cardIcon("rgba(99,102,241,0.1)", T.indigo)}>✏️</div>
//           <h2 style={S.cardTitle}>Log Food</h2>
//         </div>
//       </div>
//       <form onSubmit={handleSubmit} style={{ ...S.cardBody, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//         <select
//           value={food.mealType}
//           onChange={(e) => setFood({ ...food, mealType: e.target.value })}
//           style={{ ...S.select, gridColumn: "1 / -1" }}
//         >
//           {["breakfast","pre_workout","post_workout","lunch","snack","dinner"].map(t => (
//             <option key={t} value={t}>{t.replace(/_/g," ").replace(/\b\w/g, c => c.toUpperCase())}</option>
//           ))}
//         </select>

//         <input placeholder="Food Name *" required value={food.foodName}
//           onChange={(e) => setFood({ ...food, foodName: e.target.value })}
//           onFocus={inputFocus} onBlur={inputBlur}
//           style={{ ...S.input, gridColumn: "1 / -1" }} />

//         <input placeholder="Quantity (e.g. 100g)" value={food.quantity}
//           onChange={(e) => setFood({ ...food, quantity: e.target.value })}
//           onFocus={inputFocus} onBlur={inputBlur}
//           style={S.input} />

//         <input type="number" placeholder="Calories *" required value={food.calories}
//           onChange={(e) => setFood({ ...food, calories: e.target.value })}
//           onFocus={inputFocus} onBlur={inputBlur}
//           style={S.input} />

//         <input type="number" placeholder="Protein (g)" value={food.proteinGrams}
//           onChange={(e) => setFood({ ...food, proteinGrams: e.target.value })}
//           onFocus={inputFocus} onBlur={inputBlur}
//           style={S.input} />

//         <input type="number" placeholder="Carbs (g)" value={food.carbsGrams}
//           onChange={(e) => setFood({ ...food, carbsGrams: e.target.value })}
//           onFocus={inputFocus} onBlur={inputBlur}
//           style={S.input} />

//         <input type="number" placeholder="Fat (g)" value={food.fatGrams}
//           onChange={(e) => setFood({ ...food, fatGrams: e.target.value })}
//           onFocus={inputFocus} onBlur={inputBlur}
//           style={{ ...S.input, gridColumn: "1 / -1" }} />

//         <button type="submit" disabled={submitting}
//           style={{ ...S.btnPrimary, gridColumn: "1 / -1", opacity: submitting ? 0.6 : 1 }}>
//           {submitting ? "Logging…" : success ? "✓ Logged!" : "Log Food ✦"}
//         </button>
//       </form>
//     </div>
//   );
// }

// function SummaryCard({ summary, onGenerate }) {
//   const sc = S.statusMap[summary?.status] ?? { bg: "rgba(238,242,255,0.5)", color: T.indigo, border: T.borderSoft };
//   return (
//     <div style={S.card}>
//       <div style={S.cardHeader}>
//         <div style={S.cardHeaderLeft}>
//           <div style={S.cardIcon("rgba(37,99,235,0.1)", "#2563eb")}>📈</div>
//           <h2 style={S.cardTitle}>Today's Summary</h2>
//         </div>
//         <button onClick={onGenerate} style={S.btnOutline}>Refresh</button>
//       </div>

//       {!summary ? (
//         <div style={{ padding: "52px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center" }}>
//           <span style={{ fontSize: 38 }}>📊</span>
//           <p style={{ fontSize: 13, color: T.muted }}>Hit Refresh to see your daily progress.</p>
//         </div>
//       ) : (
//         <div style={S.cardBody}>
//           <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 22 }}>
//             <span style={{ fontSize: 12, color: T.textMid, fontWeight: 600 }}>Status:</span>
//             <span style={{ fontSize: 9, fontWeight: 700, padding: "4px 12px", borderRadius: 999, background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, textTransform: "uppercase", letterSpacing: "0.12em" }}>
//               {summary.status}
//             </span>
//             {summary.calorieDifference != null && (
//               <span style={{ fontSize: 11, fontWeight: 700, color: summary.calorieDifference > 0 ? "#f43f5e" : "#22c55e" }}>
//                 {summary.calorieDifference > 0 ? `+${summary.calorieDifference}` : summary.calorieDifference} kcal
//               </span>
//             )}
//           </div>
//           <ProgressBar label="Calories" consumed={summary.consumedCalories} target={summary.targetCalories} color={T.gradPrimary} />
//           <ProgressBar label="Protein"  consumed={summary.consumedProtein}  target={summary.targetProtein}  color="#2563eb" />
//           <ProgressBar label="Carbs"    consumed={summary.consumedCarbs}    target={summary.targetCarbs}    color="#7c3aed" />
//           <ProgressBar label="Fat"      consumed={summary.consumedFat}      target={summary.targetFat}      color={T.muted} />
//         </div>
//       )}
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    MAIN PAGE
// ───────────────────────────────────────────── */
// export default function Nutrition() {
//   const { user } = useAuth();
//   const today  = new Date().toISOString().split("T")[0];
//   const userId = user?._id || user?.id;

//   const [target,    setTarget]    = useState(null);
//   const [summary,   setSummary]   = useState(null);
//   const [loading,   setLoading]   = useState(false);
//   const [activeDay, setActiveDay] = useState(0);

//   useEffect(() => {
//     if (!userId) return;
//     (async () => {
//       try {
//         const plan = await nutritionAPI.getToday(userId, today);
//         setTarget(plan.data.nutritionPlan);
//       } catch {}
//       try {
//         const sum = await nutritionAPI.getTodaySummary(userId, today);
//         setSummary(sum.data.summary);
//       } catch {}
//     })();
//   }, [userId]);

//   const generateTarget = async () => {
//     setLoading(true);
//     try {
//       const res = await nutritionAPI.generateTarget({ userId, date: today });
//       setTarget(res.data.nutritionPlan);
//     } catch (err) {
//       alert(err.response?.data?.message || err.message || "Failed to generate plan");
//     }
//     setLoading(false);
//   };

//   const logFood = async (food) => {
//     await foodAPI.log({
//       userId, date: today, ...food,
//       calories:     Number(food.calories),
//       proteinGrams: Number(food.proteinGrams) || 0,
//       carbsGrams:   Number(food.carbsGrams)   || 0,
//       fatGrams:     Number(food.fatGrams)      || 0,
//     });
//     await generateSummary();
//   };

//   const generateSummary = async () => {
//     try {
//       const res = await nutritionAPI.generateSummary(userId, today);
//       setSummary(res.data.summary);
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to get summary");
//     }
//   };

//   const weekPlan    = target?.aiGeneratedPlan?.weekNutritionPlan ?? [];
//   const weeklyNotes = target?.aiGeneratedPlan?.weeklyNotes       ?? null;

//   return (
//     <div style={S.page}>
//       {/* decorative blobs */}
//       <div style={{ position: "fixed", top: -120, right: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(99,102,241,0.07)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
//       <div style={{ position: "fixed", bottom: -100, left: "20%", width: 300, height: 300, borderRadius: "50%", background: "rgba(124,58,237,0.05)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />

//       <div style={{ ...S.inner, position: "relative", zIndex: 1 }}>

//         {/* ── HERO ── */}
//         <div style={S.hero}>
//           <div style={S.heroTopLine} />
//           <div style={S.heroBlob1} />
//           <div style={S.heroBlob2} />
//           <div style={S.heroInner}>
//             <div style={{ flex: 1 }}>
//               <p style={S.heroEyebrow}>◆ Nutrition Dashboard</p>
//               <h1 style={S.heroTitle}>Daily Nutrition Plan</h1>
//               <p style={S.heroMeta}>
//                 {today}
//                 {target && <> · Generated by <span style={S.heroMetaAccent}>{target.generatedBy}</span></>}
//               </p>
//               {target && (
//                 <div style={S.macroGrid}>
//                   <MacroCard label="Calories" value={target.calorieTarget} unit="kcal"  accent="indigo" />
//                   <MacroCard label="Protein"  value={target.proteinTarget} unit="grams" accent="blue"   />
//                   <MacroCard label="Carbs"    value={target.carbsTarget}   unit="grams" accent="violet" />
//                   <MacroCard label="Fats"     value={target.fatsTarget}    unit="grams" accent="slate"  />
//                 </div>
//               )}
//             </div>
//             <div style={{ flexShrink: 0, paddingTop: 4 }}>
//               <button
//                 onClick={generateTarget}
//                 disabled={loading}
//                 style={{ ...S.btnPrimary, opacity: loading ? 0.6 : 1 }}
//               >
//                 {loading ? "Generating…" : target ? "Regenerate Plan" : "Generate Today's Plan"}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ── EMPTY STATE ── */}
//         {!target && (
//           <div style={S.empty}>
//             <span style={{ fontSize: 44 }}>🥗</span>
//             <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 800, color: T.text }}>No nutrition plan yet.</p>
//             <p style={{ fontSize: 13, color: T.muted, maxWidth: 300, lineHeight: 1.65 }}>
//               Generate a workout-aligned AI nutrition plan to see your daily meal schedule and macro targets.
//             </p>
//             <button onClick={generateTarget} disabled={loading} style={{ ...S.btnPrimary, opacity: loading ? 0.6 : 1, marginTop: 8 }}>
//               {loading ? "Generating…" : "Generate Plan ✦"}
//             </button>
//           </div>
//         )}

//         {/* ── WEEK PLAN ── */}
//         {target && weekPlan.length > 0 && (
//           <>
//             <div>
//               <p style={S.sectionLabel}>Weekly Overview</p>
//               <WeekCalendar weekPlan={weekPlan} activeDay={activeDay} onSelectDay={setActiveDay} />
//             </div>

//             <div>
//               <p style={S.sectionLabel}>Meal Plan</p>
//               <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//                 {weekPlan.map((day, i) => (
//                   <DayPlanCard key={day.day} dayPlan={day} defaultOpen={i === activeDay} />
//                 ))}
//               </div>
//             </div>

//             {weeklyNotes && (
//               <div>
//                 <p style={S.sectionLabel}>Strategy Notes</p>
//                 <WeeklyNotesCard notes={weeklyNotes} />
//               </div>
//             )}
//           </>
//         )}

//         {/* ── LOG + SUMMARY ── */}
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
//           <LogFoodCard onLog={logFood} />
//           <SummaryCard summary={summary} onGenerate={generateSummary} />
//         </div>

//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { nutritionAPI, foodAPI } from "../api/axios";
import { useAuth } from "../context/AuthContext";

/* ─────────────────────────────────────────────
   DESIGN TOKENS
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
  r8:  8,  r12: 12, r16: 16, r20: 20,
};

const glass = {
  background:           T.surface,
  backdropFilter:       "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border:               `1px solid ${T.borderLight}`,
  boxShadow:            T.shadowCard,
};

const S = {
  page: {
    minHeight: "100vh",
    background: T.gradBody,
    fontFamily: "'Outfit', sans-serif",
    padding: "36px 20px 60px",
    color: T.text,
  },
  inner: {
    maxWidth: 1120,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: 28,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: T.indigo,
    marginBottom: 12,
  },
  card: {
    ...glass,
    borderRadius: T.r20,
    overflow: "hidden",
  },
  cardHeader: {
    padding: "18px 26px",
    borderBottom: `1px solid ${T.borderSoft}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardHeaderLeft: { display: "flex", alignItems: "center", gap: 12 },
  cardIcon: (bg, color) => ({
    width: 34, height: 34,
    borderRadius: T.r8,
    background: bg,
    border: `1px solid ${T.borderSoft}`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 15, color,
  }),
  cardTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: 16, fontWeight: 700,
    color: T.text, letterSpacing: "-0.01em",
  },
  cardBody: { padding: "24px 26px" },
  macroGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 12,
    marginTop: 20,
  },
  macroCard: (accent) => {
    const map = {
      indigo:  { bg: "rgba(99,102,241,0.08)",  border: "rgba(99,102,241,0.2)",  color: "#6366f1" },
      blue:    { bg: "rgba(37,99,235,0.08)",   border: "rgba(37,99,235,0.2)",   color: "#2563eb" },
      violet:  { bg: "rgba(124,58,237,0.08)",  border: "rgba(124,58,237,0.2)",  color: "#7c3aed" },
      slate:   { bg: "rgba(148,163,184,0.08)", border: "rgba(148,163,184,0.2)", color: "#94a3b8" },
    };
    const c = map[accent] || map.slate;
    return {
      borderRadius: T.r16,
      border: `1px solid ${c.border}`,
      background: c.bg,
      padding: "16px 12px",
      display: "flex", flexDirection: "column",
      alignItems: "center", textAlign: "center",
    };
  },
  macroLabel: { fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.muted, marginBottom: 5 },
  macroValue: (accent) => {
    const map = { indigo:"#6366f1", blue:"#2563eb", violet:"#7c3aed", slate: T.textMid };
    return { fontSize: 24, fontWeight: 900, color: map[accent] || T.text, lineHeight: 1 };
  },
  macroUnit: { fontSize: 10, color: T.muted, marginTop: 3 },
  hero: {
    ...glass,
    borderRadius: T.r20,
    padding: "36px 36px 32px",
    position: "relative",
    overflow: "hidden",
  },
  heroTopLine: {
    position: "absolute", top: 0, left: 0, right: 0,
    height: 2,
    background: T.gradPrimary,
    opacity: 0.7,
  },
  heroBlob1: {
    position: "absolute", top: -60, right: -60,
    width: 260, height: 260, borderRadius: "50%",
    background: "rgba(99,102,241,0.08)", filter: "blur(60px)",
    pointerEvents: "none",
  },
  heroBlob2: {
    position: "absolute", bottom: -40, left: "30%",
    width: 180, height: 180, borderRadius: "50%",
    background: "rgba(37,99,235,0.06)", filter: "blur(40px)",
    pointerEvents: "none",
  },
  heroInner: { position: "relative", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 24 },
  heroEyebrow: { fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.indigo, marginBottom: 6 },
  heroTitle: { fontFamily: "'Outfit', sans-serif", fontSize: 30, fontWeight: 800, color: T.text, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 4 },
  heroMeta: { fontSize: 12, color: T.textLight },
  heroMetaAccent: { color: T.indigo, fontWeight: 600 },
  btnPrimary: {
    padding: "12px 26px",
    borderRadius: T.r12,
    background: T.gradPrimary,
    color: "white",
    fontSize: 11, fontWeight: 700,
    fontFamily: "'Outfit', sans-serif",
    letterSpacing: "0.12em", textTransform: "uppercase",
    border: "none", cursor: "pointer",
    boxShadow: "0 4px 16px rgba(99,102,241,0.30)",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  },
  btnOutline: {
    padding: "9px 18px",
    borderRadius: T.r12,
    background: "rgba(238,242,255,0.6)",
    color: T.indigo,
    fontSize: 10, fontWeight: 700,
    fontFamily: "'Outfit', sans-serif",
    letterSpacing: "0.12em", textTransform: "uppercase",
    border: `1.5px solid ${T.borderSoft}`,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  progressRow: { marginBottom: 16 },
  progressMeta: { display: "flex", justifyContent: "space-between", marginBottom: 7 },
  progressLabel: { fontSize: 11, fontWeight: 600, color: T.textMid },
  progressTrack: { height: 6, borderRadius: 999, background: "rgba(226,232,240,0.8)", overflow: "hidden" },
  progressFill: (pct, over, color) => ({
    height: "100%", borderRadius: 999,
    width: `${pct}%`,
    background: over ? "#f43f5e" : color,
    transition: "width 0.5s ease",
  }),
  mealBadgeMap: {
    breakfast:      { bg: "rgba(99,102,241,0.1)",  color: "#6366f1", border: "rgba(99,102,241,0.25)" },
    pre_workout:    { bg: "rgba(37,99,235,0.1)",   color: "#2563eb", border: "rgba(37,99,235,0.25)" },
    post_workout:   { bg: "rgba(124,58,237,0.1)",  color: "#7c3aed", border: "rgba(124,58,237,0.25)" },
    lunch:          { bg: "rgba(99,102,241,0.07)", color: "#818cf8", border: "rgba(99,102,241,0.15)" },
    snack:          { bg: "rgba(148,163,184,0.1)", color: "#94a3b8", border: "rgba(148,163,184,0.2)" },
    dinner:         { bg: "rgba(226,232,240,0.5)", color: T.textMid, border: T.borderSoft },
    optional_snack: { bg: "rgba(241,245,249,0.5)", color: T.muted,   border: "rgba(226,232,240,0.5)" },
  },
  calGrid: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 10 },
  calDay: (isActive, isRest) => ({
    display: "flex", flexDirection: "column", alignItems: "center",
    padding: "16px 6px 12px",
    borderRadius: T.r16,
    border: isActive ? `1px solid ${T.indigo}` : `1px solid ${isRest ? T.borderSoft : "rgba(199,210,254,0.5)"}`,
    background: isActive ? T.gradPrimary : T.surface,
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: isActive ? "0 4px 20px rgba(99,102,241,0.28)" : T.shadowCard,
    transform: isActive ? "translateY(-2px)" : "none",
    fontFamily: "'Outfit', sans-serif",
  }),
  calDayName: (isActive) => ({ fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: isActive ? "rgba(255,255,255,0.8)" : T.muted, marginBottom: 4 }),
  calDayNum:  (isActive, isRest) => ({ fontSize: 14, fontWeight: 900, color: isActive ? "white" : isRest ? T.muted : T.text }),
  calDayTag:  (isActive, isRest) => ({
    marginTop: 8, fontSize: 8, fontWeight: 700, padding: "2px 7px", borderRadius: 999,
    textTransform: "uppercase", letterSpacing: "0.08em",
    background: isRest ? "rgba(226,232,240,0.5)" : isActive ? "rgba(255,255,255,0.2)" : "rgba(99,102,241,0.1)",
    color: isRest ? T.muted : isActive ? "white" : T.indigo,
    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%",
  }),
  dayCard: (open) => ({
    ...glass,
    borderRadius: T.r16,
    overflow: "hidden",
    transition: "border-color 0.2s",
    border: open ? `1px solid rgba(99,102,241,0.35)` : `1px solid ${T.borderLight}`,
  }),
  dayCardBtn: {
    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "18px 24px", background: "transparent", border: "none", cursor: "pointer",
    color: T.text, fontFamily: "'Outfit', sans-serif",
  },
  dayNum: (open) => ({
    width: 40, height: 40, borderRadius: T.r8,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 14, fontWeight: 900,
    background: open ? T.gradPrimary : "rgba(238,242,255,0.7)",
    color: open ? "white" : T.indigo,
    flexShrink: 0, transition: "background 0.2s, color 0.2s",
  }),
  input: {
    width: "100%",
    background: "rgba(238,242,255,0.5)",
    border: `1.5px solid ${T.borderSoft}`,
    borderRadius: T.r12,
    padding: "11px 15px",
    color: T.text,
    fontSize: 13,
    fontFamily: "'Outfit', sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
  },
  select: {
    width: "100%",
    background: "rgba(238,242,255,0.5)",
    border: `1.5px solid ${T.borderSoft}`,
    borderRadius: T.r12,
    padding: "11px 15px",
    color: T.text,
    fontSize: 13,
    fontFamily: "'Outfit', sans-serif",
    outline: "none",
  },
  statusMap: {
    over:     { bg: "rgba(244,63,94,0.08)",   color: "#f43f5e", border: "rgba(244,63,94,0.25)" },
    under:    { bg: "rgba(99,102,241,0.08)",  color: T.indigo,  border: "rgba(99,102,241,0.2)" },
    on_track: { bg: "rgba(34,197,94,0.08)",  color: "#22c55e", border: "rgba(34,197,94,0.2)" },
  },
  empty: {
    ...glass,
    borderRadius: T.r20,
    border: `1.5px dashed rgba(99,102,241,0.25)`,
    padding: "80px 24px",
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    gap: 14, textAlign: "center",
  },
};

/* ─────────────────────────────────────────────
   NEW: CREDIBILITY COMPONENTS
───────────────────────────────────────────── */

/* 1️⃣ Scientific Basis Badge */
function ScientificBasisStrip() {
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      background: "rgba(99,102,241,0.06)",
      border: "1px solid rgba(99,102,241,0.14)",
      borderRadius: 10,
      padding: "8px 16px",
      marginTop: 10,
    }}>
      <span style={{ fontSize: 13 }}>🔬</span>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: T.indigo, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Metabolic Calculation Based Framework
        </span>
        <span style={{ fontSize: 10, color: T.muted, fontWeight: 400 }}>
          Energy targets derived using the Mifflin-St Jeor equation and activity multipliers.
        </span>
      </div>
    </div>
  );
}

/* 2️⃣ Calculation Transparency Expandable */
function CalculationTransparency() {
  const [open, setOpen] = useState(false);

  const steps = [
    { label: "Basal Metabolic Rate", detail: "Estimated using the Mifflin-St Jeor equation, the current reference standard for BMR estimation." },
    { label: "Activity Multiplier",  detail: "BMR adjusted by a standardized activity factor based on your reported weekly training frequency." },
    { label: "Goal-Based Adjustment", detail: "Calorie target shifted via a structured deficit, surplus, or maintenance offset aligned with your fitness goal." },
    { label: "Macro Distribution",   detail: "Protein, carb, and fat ratios structured around performance and recovery principles." },
  ];

  return (
    <div style={{
      background: "rgba(238,242,255,0.5)",
      border: "1px solid rgba(99,102,241,0.12)",
      borderRadius: T.r12,
      overflow: "hidden",
      marginTop: 16,
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 18px", background: "transparent", border: "none", cursor: "pointer",
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 600, color: T.textMid, letterSpacing: "0.02em" }}>
          How Your Targets Were Calculated
        </span>
        <span style={{
          fontSize: 10, color: T.indigo, fontWeight: 700,
          transform: open ? "rotate(180deg)" : "none",
          transition: "transform 0.2s", display: "inline-block",
        }}>▾</span>
      </button>

      {open && (
        <div style={{ padding: "4px 18px 16px", borderTop: "1px solid rgba(99,102,241,0.1)" }}>
          {steps.map(({ label, detail }, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <div style={{
                width: 20, height: 20, borderRadius: "50%",
                background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 9, fontWeight: 800, color: T.indigo, flexShrink: 0, marginTop: 1,
              }}>{i + 1}</div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: T.text, marginBottom: 2 }}>{label}</p>
                <p style={{ fontSize: 11, color: T.textLight, lineHeight: 1.6 }}>{detail}</p>
              </div>
            </div>
          ))}

          {/* 5️⃣ Micro calculation model label */}
          <div style={{
            marginTop: 14, paddingTop: 12,
            borderTop: "1px solid rgba(99,102,241,0.08)",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{ fontSize: 9, color: T.muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>Calculation Model:</span>
            <span style={{ fontSize: 9, fontWeight: 700, color: T.indigo, letterSpacing: "0.08em" }}>Mifflin-St Jeor</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* 3️⃣ Personalization Inputs Summary */
function PersonalizationCard({ target }) {
  if (!target) return null;

  const profile = target.userProfile ?? target.profileSnapshot ?? target;

  const items = [
    { label: "Weight",         value: profile.weight      ? `${profile.weight} kg`        : null },
    { label: "Height",         value: profile.height      ? `${profile.height} cm`        : null },
    { label: "Age",            value: profile.age         ? `${profile.age} yrs`          : null },
    { label: "Activity Level", value: profile.activityLevel ?? profile.activity           ?? null },
    { label: "Fitness Goal",   value: profile.fitnessGoal  ?? profile.goal                ?? null },
    { label: "Budget Tier",    value: profile.budgetTier   ?? profile.budget              ?? null },
  ].filter(i => i.value);

  if (items.length === 0) return null;

  return (
    <div style={{ ...glass, borderRadius: T.r20, overflow: "hidden" }}>
      <div style={{
        padding: "16px 24px",
        borderBottom: `1px solid ${T.borderSoft}`,
        display: "flex", alignItems: "center", gap: 12,
        background: "linear-gradient(135deg, rgba(99,102,241,0.04), rgba(139,92,246,0.03))",
      }}>
        <div style={S.cardIcon("rgba(99,102,241,0.1)", T.indigo)}>◎</div>
        <div>
          <p style={{ fontSize: "0.95rem", fontWeight: 700, color: T.text }}>Why This Plan Fits You</p>
          <p style={{ fontSize: 10, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2 }}>Computed from your profile inputs</p>
        </div>
      </div>
      <div style={{ padding: "20px 24px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {items.map(({ label, value }) => (
          <div key={label} style={{
            background: "rgba(238,242,255,0.5)",
            border: `1px solid ${T.borderSoft}`,
            borderRadius: T.r12,
            padding: "12px 14px",
          }}>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.muted, marginBottom: 5 }}>{label}</p>
            <p style={{ fontSize: "0.875rem", fontWeight: 700, color: T.text, textTransform: "capitalize" }}>{String(value)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   EXISTING MICRO COMPONENTS
───────────────────────────────────────────── */
function MacroCard({ label, value, unit, accent = "indigo" }) {
  return (
    <div style={S.macroCard(accent)}>
      <p style={S.macroLabel}>{label}</p>
      <p style={S.macroValue(accent)}>{value ?? "—"}</p>
      <p style={S.macroUnit}>{unit}</p>
    </div>
  );
}

function ProgressBar({ label, consumed = 0, target = 0, color }) {
  const pct  = target > 0 ? Math.min(100, Math.round((consumed / target) * 100)) : 0;
  const over = target > 0 && consumed > target;
  return (
    <div style={S.progressRow}>
      <div style={S.progressMeta}>
        <span style={S.progressLabel}>{label}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: over ? "#f43f5e" : T.text }}>
          {consumed} / {target}
        </span>
      </div>
      <div style={S.progressTrack}>
        <div style={S.progressFill(pct, over, color || T.gradPrimary)} />
      </div>
    </div>
  );
}

function MealBadge({ type }) {
  const c = S.mealBadgeMap[type] ?? { bg: "rgba(226,232,240,0.5)", color: T.muted, border: T.borderSoft };
  return (
    <span style={{
      fontSize: 9, fontWeight: 700, padding: "4px 10px", borderRadius: 999,
      border: `1px solid ${c.border}`, background: c.bg, color: c.color,
      textTransform: "uppercase", letterSpacing: "0.12em", whiteSpace: "nowrap",
    }}>
      {type.replace(/_/g, " ")}
    </span>
  );
}

function FoodRow({ food }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${T.borderSoft}` }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: T.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{food.name}</p>
        <p style={{ fontSize: 11, color: T.muted, marginTop: 1 }}>{food.quantity}</p>
      </div>
      <div style={{ display: "flex", gap: 16, flexShrink: 0, marginLeft: 16 }}>
        {[
          { val: food.calories, label: "kcal", color: T.indigo },
          { val: `${food.protein}g`, label: "P", color: "#2563eb" },
          { val: `${food.carbs}g`,   label: "C", color: "#7c3aed" },
          { val: `${food.fats}g`,    label: "F", color: T.muted },
        ].map(({ val, label, color }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color }}>{val}</p>
            <p style={{ fontSize: 9, color: T.muted }}>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MealCard({ meal }) {
  const [open, setOpen] = useState(false);
  const totalCals = meal.foods.reduce((a, f) => a + (f.calories || 0), 0);
  const totalP    = meal.foods.reduce((a, f) => a + (f.protein  || 0), 0);
  return (
    <div style={{ borderRadius: T.r12, border: `1px solid ${T.borderSoft}`, background: "rgba(238,242,255,0.35)", overflow: "hidden" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 18px", background: "transparent", border: "none", cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <MealBadge type={meal.mealType} />
          <span style={{ fontSize: 11, color: T.muted }}>{meal.foods.length} items</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: T.text }}>
            {totalCals} kcal
            <span style={{ fontSize: 11, fontWeight: 400, color: T.muted, marginLeft: 6 }}>· {Math.round(totalP)}g P</span>
          </span>
          <span style={{ color: T.indigo, fontSize: 11, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>▾</span>
        </div>
      </button>
      {open && (
        <div style={{ padding: "4px 18px 16px", borderTop: `1px solid ${T.borderSoft}` }}>
          {meal.foods.map((food, i) => <FoodRow key={i} food={food} />)}
        </div>
      )}
    </div>
  );
}

function DayPlanCard({ dayPlan, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const s      = dayPlan.daySummary;
  const isRest = dayPlan.workoutType === "rest";
  return (
    <div style={S.dayCard(open)}>
      <button onClick={() => setOpen(!open)} style={S.dayCardBtn}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={S.dayNum(open)}>{dayPlan.day}</div>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: T.text, textTransform: "capitalize" }}>
              Day {dayPlan.day} — {dayPlan.workoutType}
            </p>
            {s && (
              <p style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>
                {s.totalCalories} kcal · {s.proteinGrams}g P · {s.carbsGrams}g C · {s.fatsGrams}g F · 💧 {s.hydrationLiters}L
              </p>
            )}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {isRest && (
            <span style={{ fontSize: 9, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: "rgba(238,242,255,0.7)", color: T.muted, border: `1px solid ${T.borderSoft}`, textTransform: "uppercase", letterSpacing: "0.1em" }}>Rest</span>
          )}
          <span style={{ color: T.indigo, fontSize: 11, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>▾</span>
        </div>
      </button>
      {open && (
        <div style={{ padding: "4px 24px 24px", borderTop: `1px solid ${T.borderSoft}` }}>
          {s && (
            <div style={{ ...S.macroGrid, marginTop: 16, marginBottom: 16 }}>
              <MacroCard label="Calories" value={s.totalCalories} unit="kcal"  accent="indigo"  />
              <MacroCard label="Protein"  value={s.proteinGrams}  unit="grams" accent="blue"    />
              <MacroCard label="Carbs"    value={s.carbsGrams}    unit="grams" accent="violet"  />
              <MacroCard label="Fats"     value={s.fatsGrams}     unit="grams" accent="slate"   />
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {dayPlan.meals?.map((meal, i) => <MealCard key={i} meal={meal} />)}
          </div>
        </div>
      )}
    </div>
  );
}

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function WeekCalendar({ weekPlan, activeDay, onSelectDay }) {
  return (
    <div style={S.calGrid}>
      {weekPlan.map((day, idx) => {
        const isRest   = day.workoutType === "rest";
        const isActive = activeDay === idx;
        return (
          <button key={day.day} onClick={() => onSelectDay(idx)} style={S.calDay(isActive, isRest)}>
            <span style={S.calDayName(isActive)}>{DAY_NAMES[idx] ?? `D${day.day}`}</span>
            <span style={S.calDayNum(isActive, isRest)}>{day.day}</span>
            <span style={S.calDayTag(isActive, isRest)}>{isRest ? "Rest" : (day.workoutType ?? "Train")}</span>
          </button>
        );
      })}
    </div>
  );
}

function WeeklyNotesCard({ notes }) {
  if (!notes) return null;
  const sections = [
    { label: "Carb Cycling Strategy", key: "carbCyclingStrategy", color: T.indigo },
    { label: "Recovery Focus",         key: "recoveryFocus",        color: "#2563eb" },
    { label: "Budget Efficiency",      key: "budgetEfficiency",     color: "#7c3aed" },
  ];
  return (
    <div style={S.card}>
      <div style={S.cardHeader}>
        <div style={S.cardHeaderLeft}>
          <div style={S.cardIcon("rgba(99,102,241,0.1)", T.indigo)}>📊</div>
          <h2 style={S.cardTitle}>Weekly Nutrition Strategy</h2>
        </div>
      </div>
      <div style={{ ...S.cardBody, display: "flex", flexDirection: "column", gap: 22 }}>
        {sections.map(({ label, key, color }) =>
          notes[key] ? (
            <div key={key}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color, marginBottom: 7 }}>{label}</p>
              <p style={{ fontSize: 13, color: T.textMid, lineHeight: 1.7 }}>{notes[key]}</p>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

function LogFoodCard({ onLog }) {
  const [food, setFood] = useState({
    mealType: "breakfast", foodName: "", quantity: "",
    calories: "", proteinGrams: "", carbsGrams: "", fatGrams: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success,    setSuccess]    = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onLog(food);
      setSuccess(true);
      setFood({ mealType: "breakfast", foodName: "", quantity: "", calories: "", proteinGrams: "", carbsGrams: "", fatGrams: "" });
      setTimeout(() => setSuccess(false), 3000);
    } catch {}
    setSubmitting(false);
  };

  const inputFocus = (e) => { e.target.style.borderColor = T.indigo; };
  const inputBlur  = (e) => { e.target.style.borderColor = T.borderSoft; };

  return (
    <div style={S.card}>
      <div style={S.cardHeader}>
        <div style={S.cardHeaderLeft}>
          <div style={S.cardIcon("rgba(99,102,241,0.1)", T.indigo)}>✏️</div>
          <h2 style={S.cardTitle}>Log Food</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit} style={{ ...S.cardBody, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <select value={food.mealType} onChange={(e) => setFood({ ...food, mealType: e.target.value })} style={{ ...S.select, gridColumn: "1 / -1" }}>
          {["breakfast","pre_workout","post_workout","lunch","snack","dinner"].map(t => (
            <option key={t} value={t}>{t.replace(/_/g," ").replace(/\b\w/g, c => c.toUpperCase())}</option>
          ))}
        </select>
        <input placeholder="Food Name *" required value={food.foodName} onChange={(e) => setFood({ ...food, foodName: e.target.value })} onFocus={inputFocus} onBlur={inputBlur} style={{ ...S.input, gridColumn: "1 / -1" }} />
        <input placeholder="Quantity (e.g. 100g)" value={food.quantity} onChange={(e) => setFood({ ...food, quantity: e.target.value })} onFocus={inputFocus} onBlur={inputBlur} style={S.input} />
        <input type="number" placeholder="Calories *" required value={food.calories} onChange={(e) => setFood({ ...food, calories: e.target.value })} onFocus={inputFocus} onBlur={inputBlur} style={S.input} />
        <input type="number" placeholder="Protein (g)" value={food.proteinGrams} onChange={(e) => setFood({ ...food, proteinGrams: e.target.value })} onFocus={inputFocus} onBlur={inputBlur} style={S.input} />
        <input type="number" placeholder="Carbs (g)" value={food.carbsGrams} onChange={(e) => setFood({ ...food, carbsGrams: e.target.value })} onFocus={inputFocus} onBlur={inputBlur} style={S.input} />
        <input type="number" placeholder="Fat (g)" value={food.fatGrams} onChange={(e) => setFood({ ...food, fatGrams: e.target.value })} onFocus={inputFocus} onBlur={inputBlur} style={{ ...S.input, gridColumn: "1 / -1" }} />
        <button type="submit" disabled={submitting} style={{ ...S.btnPrimary, gridColumn: "1 / -1", opacity: submitting ? 0.6 : 1 }}>
          {submitting ? "Logging…" : success ? "✓ Logged!" : "Log Food ✦"}
        </button>
      </form>
    </div>
  );
}

function SummaryCard({ summary, onGenerate }) {
  const sc = S.statusMap[summary?.status] ?? { bg: "rgba(238,242,255,0.5)", color: T.indigo, border: T.borderSoft };
  return (
    <div style={S.card}>
      <div style={S.cardHeader}>
        <div style={S.cardHeaderLeft}>
          <div style={S.cardIcon("rgba(37,99,235,0.1)", "#2563eb")}>📈</div>
          <h2 style={S.cardTitle}>Today's Summary</h2>
        </div>
        <button onClick={onGenerate} style={S.btnOutline}>Refresh</button>
      </div>
      {!summary ? (
        <div style={{ padding: "52px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center" }}>
          <span style={{ fontSize: 38 }}>📊</span>
          <p style={{ fontSize: 13, color: T.muted }}>Hit Refresh to see your daily progress.</p>
        </div>
      ) : (
        <div style={S.cardBody}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 22 }}>
            <span style={{ fontSize: 12, color: T.textMid, fontWeight: 600 }}>Status:</span>
            <span style={{ fontSize: 9, fontWeight: 700, padding: "4px 12px", borderRadius: 999, background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, textTransform: "uppercase", letterSpacing: "0.12em" }}>
              {summary.status}
            </span>
            {summary.calorieDifference != null && (
              <span style={{ fontSize: 11, fontWeight: 700, color: summary.calorieDifference > 0 ? "#f43f5e" : "#22c55e" }}>
                {summary.calorieDifference > 0 ? `+${summary.calorieDifference}` : summary.calorieDifference} kcal
              </span>
            )}
          </div>
          <ProgressBar label="Calories" consumed={summary.consumedCalories} target={summary.targetCalories} color={T.gradPrimary} />
          <ProgressBar label="Protein"  consumed={summary.consumedProtein}  target={summary.targetProtein}  color="#2563eb" />
          <ProgressBar label="Carbs"    consumed={summary.consumedCarbs}    target={summary.targetCarbs}    color="#7c3aed" />
          <ProgressBar label="Fat"      consumed={summary.consumedFat}      target={summary.targetFat}      color={T.muted} />
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function Nutrition() {
  const { user } = useAuth();
  const today  = new Date().toISOString().split("T")[0];
  const userId = user?._id || user?.id;

  const [target,    setTarget]    = useState(null);
  const [summary,   setSummary]   = useState(null);
  const [loading,   setLoading]   = useState(false);
  const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const plan = await nutritionAPI.getToday(userId, today);
        setTarget(plan.data.nutritionPlan);
      } catch {}
      try {
        const sum = await nutritionAPI.getTodaySummary(userId, today);
        setSummary(sum.data.summary);
      } catch {}
    })();
  }, [userId]);

  const generateTarget = async () => {
    setLoading(true);
    try {
      const res = await nutritionAPI.generateTarget({ userId, date: today });
      setTarget(res.data.nutritionPlan);
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Failed to generate plan");
    }
    setLoading(false);
  };

  const logFood = async (food) => {
    await foodAPI.log({
      userId, date: today, ...food,
      calories:     Number(food.calories),
      proteinGrams: Number(food.proteinGrams) || 0,
      carbsGrams:   Number(food.carbsGrams)   || 0,
      fatGrams:     Number(food.fatGrams)      || 0,
    });
    await generateSummary();
  };

  const generateSummary = async () => {
    try {
      const res = await nutritionAPI.generateSummary(userId, today);
      setSummary(res.data.summary);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to get summary");
    }
  };

  const weekPlan    = target?.aiGeneratedPlan?.weekNutritionPlan ?? [];
  const weeklyNotes = target?.aiGeneratedPlan?.weeklyNotes       ?? null;

  return (
    <div style={S.page}>
      {/* decorative blobs */}
      <div style={{ position: "fixed", top: -120, right: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(99,102,241,0.07)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: -100, left: "20%", width: 300, height: 300, borderRadius: "50%", background: "rgba(124,58,237,0.05)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ ...S.inner, position: "relative", zIndex: 1 }}>

        {/* ── HERO ── */}
        <div style={S.hero}>
          <div style={S.heroTopLine} />
          <div style={S.heroBlob1} />
          <div style={S.heroBlob2} />
          <div style={S.heroInner}>
            <div style={{ flex: 1 }}>
              <p style={S.heroEyebrow}>◆ Nutrition Dashboard</p>
              <h1 style={{ ...S.heroTitle, marginBottom: 0 }}>Daily Nutrition Plan</h1>

              {/* 1️⃣ Scientific Basis Strip */}
              <ScientificBasisStrip />

              <p style={{ ...S.heroMeta, marginTop: 12 }}>
                {today}
                {target && <> · Generated by <span style={S.heroMetaAccent}>{target.generatedBy}</span></>}
              </p>

              {target && (
                <>
                  <div style={S.macroGrid}>
                    <MacroCard label="Calories" value={target.calorieTarget} unit="kcal"  accent="indigo" />
                    <MacroCard label="Protein"  value={target.proteinTarget} unit="grams" accent="blue"   />
                    <MacroCard label="Carbs"    value={target.carbsTarget}   unit="grams" accent="violet" />
                    <MacroCard label="Fats"     value={target.fatsTarget}    unit="grams" accent="slate"  />
                  </div>

                  {/* 2️⃣ Calculation Transparency */}
                  <CalculationTransparency />
                </>
              )}
            </div>
            <div style={{ flexShrink: 0, paddingTop: 4 }}>
              <button onClick={generateTarget} disabled={loading} style={{ ...S.btnPrimary, opacity: loading ? 0.6 : 1 }}>
                {loading ? "Generating…" : target ? "Regenerate Plan" : "Generate Today's Plan"}
              </button>
            </div>
          </div>
        </div>

        {/* ── EMPTY STATE ── */}
        {!target && (
          <div style={S.empty}>
            <span style={{ fontSize: 44 }}>🥗</span>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 800, color: T.text }}>No nutrition plan yet.</p>
            <p style={{ fontSize: 13, color: T.muted, maxWidth: 300, lineHeight: 1.65 }}>
              Generate a workout-aligned nutrition plan to see your daily meal schedule and macro targets.
            </p>
            <button onClick={generateTarget} disabled={loading} style={{ ...S.btnPrimary, opacity: loading ? 0.6 : 1, marginTop: 8 }}>
              {loading ? "Generating…" : "Generate Plan ✦"}
            </button>
          </div>
        )}

        {/* ── WEEK PLAN ── */}
        {target && weekPlan.length > 0 && (
          <>
            <div>
              <p style={S.sectionLabel}>Weekly Overview</p>
              <WeekCalendar weekPlan={weekPlan} activeDay={activeDay} onSelectDay={setActiveDay} />
            </div>

            {/* 3️⃣ Personalization Summary — above meal plan */}
            <div>
              <p style={S.sectionLabel}>Your Profile Match</p>
              <PersonalizationCard target={target} />
            </div>

            <div>
              <p style={S.sectionLabel}>Meal Plan</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {weekPlan.map((day, i) => (
                  <DayPlanCard key={day.day} dayPlan={day} defaultOpen={i === activeDay} />
                ))}
              </div>
            </div>

            {weeklyNotes && (
              <div>
                <p style={S.sectionLabel}>Strategy Notes</p>
                <WeeklyNotesCard notes={weeklyNotes} />
              </div>
            )}
          </>
        )}

        {/* ── LOG + SUMMARY ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <LogFoodCard onLog={logFood} />
          <SummaryCard summary={summary} onGenerate={generateSummary} />
        </div>

        {/* 4️⃣ Professional Framing Footer Text */}
        <p style={{
          fontSize: 10,
          color: "rgba(148,163,184,0.8)",
          textAlign: "center",
          lineHeight: 1.7,
          maxWidth: 560,
          margin: "0 auto",
          fontWeight: 400,
        }}>
          This nutrition framework is structured using established metabolic formulas and personalized inputs.
          Adjust portions based on individual comfort and response.
        </p>

      </div>
    </div>
  );
}