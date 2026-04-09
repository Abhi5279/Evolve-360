
// // // // // import { useState } from "react";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import { profileAPI } from "../api/axios";
// // // // // import { useAuth } from "../context/AuthContext";

// // // // // export default function Onboarding() {
// // // // //   const navigate = useNavigate();
// // // // //   const { user } = useAuth();

// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [error, setError] = useState("");

// // // // //   const [form, setForm] = useState({
// // // // //     age: "",
// // // // //     gender: "male",
// // // // //     heightCm: "",
// // // // //     weightKg: "",
// // // // //     fitnessGoal: "fat_loss",
// // // // //     experienceLevel: "beginner",
// // // // //     dailyTimeMinutes: "",
// // // // //     workoutDaysPerWeek: 3,
// // // // //     dailyActivityLevel: "moderate",
// // // // //     gymAccess: false,
// // // // //     foodBudgetPerDay: "",
// // // // //     dietPreference: "veg",
// // // // //   });

// // // // //   const handleChange = (e) => {
// // // // //     const { name, value, type, checked } = e.target;

// // // // //     setForm((prev) => ({
// // // // //       ...prev,
// // // // //       [name]: type === "checkbox" ? checked : value,
// // // // //     }));
// // // // //   };

// // // // //   const handleSubmit = async (e) => {
// // // // //     e.preventDefault();
// // // // //     setError("");
// // // // //     setLoading(true);

// // // // //     try {
// // // // //       await profileAPI.createOrUpdate({
// // // // //         userId: user.id,
// // // // //         ...form,
// // // // //       });

// // // // //       // 🔥 Update localStorage user object
// // // // //       const updatedUser = {
// // // // //         ...user,
// // // // //         isOnboarded: true,
// // // // //       };

// // // // //       localStorage.setItem("user", JSON.stringify(updatedUser));

// // // // //       // Redirect
// // // // //       navigate("/dashboard");

// // // // //     } catch (err) {
// // // // //       setError(err.message || "Failed to save profile");
// // // // //     }

// // // // //     setLoading(false);
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen flex items-center justify-center px-6">
// // // // //       <div className="card w-full max-w-2xl">

// // // // //         <h2 className="text-3xl font-bold mb-8 text-center">
// // // // //           Complete Your Profile
// // // // //         </h2>

// // // // //         {error && (
// // // // //           <div className="mb-4 p-3 text-sm bg-red-100 text-red-600 rounded-lg">
// // // // //             {error}
// // // // //           </div>
// // // // //         )}

// // // // //         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">

// // // // //           <input
// // // // //             type="number"
// // // // //             name="age"
// // // // //             placeholder="Age"
// // // // //             required
// // // // //             value={form.age}
// // // // //             onChange={handleChange}
// // // // //             className="input-field"
// // // // //           />

// // // // //           <select
// // // // //             name="gender"
// // // // //             value={form.gender}
// // // // //             onChange={handleChange}
// // // // //             className="input-field"
// // // // //           >
// // // // //             <option value="male">Male</option>
// // // // //             <option value="female">Female</option>
// // // // //             <option value="other">Other</option>
// // // // //           </select>

// // // // //           <input
// // // // //             type="number"
// // // // //             name="heightCm"
// // // // //             placeholder="Height (cm)"
// // // // //             required
// // // // //             value={form.heightCm}
// // // // //             onChange={handleChange}
// // // // //             className="input-field"
// // // // //           />

// // // // //           <input
// // // // //             type="number"
// // // // //             name="weightKg"
// // // // //             placeholder="Weight (kg)"
// // // // //             required
// // // // //             value={form.weightKg}
// // // // //             onChange={handleChange}
// // // // //             className="input-field"
// // // // //           />

// // // // //           <select
// // // // //             name="fitnessGoal"
// // // // //             value={form.fitnessGoal}
// // // // //             onChange={handleChange}
// // // // //             className="input-field"
// // // // //           >
// // // // //             <option value="fat_loss">Fat Loss</option>
// // // // //             <option value="muscle_gain">Muscle Gain</option>
// // // // //             <option value="endurance">Endurance</option>
// // // // //             <option value="general_health">General Health</option>
// // // // //           </select>

// // // // //           <select
// // // // //             name="experienceLevel"
// // // // //             value={form.experienceLevel}
// // // // //             onChange={handleChange}
// // // // //             className="input-field"
// // // // //           >
// // // // //             <option value="beginner">Beginner</option>
// // // // //             <option value="intermediate">Intermediate</option>
// // // // //             <option value="advanced">Advanced</option>
// // // // //           </select>

// // // // //           <input
// // // // //             type="number"
// // // // //             name="dailyTimeMinutes"
// // // // //             placeholder="Daily Time (minutes)"
// // // // //             required
// // // // //             value={form.dailyTimeMinutes}
// // // // //             onChange={handleChange}
// // // // //             className="input-field"
// // // // //           />

// // // // //           <input
// // // // //             type="number"
// // // // //             name="workoutDaysPerWeek"
// // // // //             placeholder="Workout Days/Week"
// // // // //             required
// // // // //             value={form.workoutDaysPerWeek}
// // // // //             onChange={handleChange}
// // // // //             className="input-field"
// // // // //           />

// // // // //           <select
// // // // //             name="dailyActivityLevel"
// // // // //             value={form.dailyActivityLevel}
// // // // //             onChange={handleChange}
// // // // //             className="input-field"
// // // // //           >
// // // // //             <option value="sedentary">Sedentary</option>
// // // // //             <option value="light">Light</option>
// // // // //             <option value="moderate">Moderate</option>
// // // // //             <option value="active">Active</option>
// // // // //           </select>

// // // // //           <input
// // // // //             type="number"
// // // // //             name="foodBudgetPerDay"
// // // // //             placeholder="Food Budget per Day"
// // // // //             required
// // // // //             value={form.foodBudgetPerDay}
// // // // //             onChange={handleChange}
// // // // //             className="input-field"
// // // // //           />

// // // // //           <select
// // // // //             name="dietPreference"
// // // // //             value={form.dietPreference}
// // // // //             onChange={handleChange}
// // // // //             className="input-field"
// // // // //           >
// // // // //             <option value="veg">Veg</option>
// // // // //             <option value="non_veg">Non Veg</option>
// // // // //             <option value="eggetarian">Eggetarian</option>
// // // // //           </select>

// // // // //           <div className="col-span-2 flex items-center gap-3">
// // // // //             <input
// // // // //               type="checkbox"
// // // // //               name="gymAccess"
// // // // //               checked={form.gymAccess}
// // // // //               onChange={handleChange}
// // // // //             />
// // // // //             <span>Gym Access Available</span>
// // // // //           </div>

// // // // //           <button
// // // // //             type="submit"
// // // // //             disabled={loading}
// // // // //             className="btn-primary col-span-2 mt-4"
// // // // //           >
// // // // //             {loading ? "Saving..." : "Save Profile"}
// // // // //           </button>

// // // // //         </form>

// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }



// // // // import { useEffect, useState } from "react";
// // // // import { useAuth } from "../context/AuthContext";
// // // // import { profileAPI } from "../api/axios";

// // // // export default function Profile() {
// // // //   const { user } = useAuth();

// // // //   const [loading, setLoading] = useState(true);
// // // //   const [saving, setSaving] = useState(false);
// // // //   const [editMode, setEditMode] = useState(false);
// // // //   const [error, setError] = useState("");

// // // //   const [form, setForm] = useState({
// // // //     age: "",
// // // //     gender: "male",
// // // //     heightCm: "",
// // // //     weightKg: "",
// // // //     fitnessGoal: "fat_loss",
// // // //     experienceLevel: "beginner",
// // // //     dailyTimeMinutes: "",
// // // //     workoutDaysPerWeek: 3,
// // // //     dailyActivityLevel: "moderate",
// // // //     gymAccess: false,
// // // //     equipmentAvailable: "",
// // // //     medicalConditions: "",
// // // //     injuries: "",
// // // //     foodBudgetPerDay: "",
// // // //     dietPreference: "veg",
// // // //     location: {
// // // //       city: "",
// // // //       state: "",
// // // //       country: ""
// // // //     }
// // // //   });

// // // //   /* ============================================================
// // // //      FETCH PROFILE
// // // //   ============================================================ */
// // // //   useEffect(() => {
// // // //     const fetchProfile = async () => {
// // // //       try {
// // // //         const res = await profileAPI.get(user.id);

// // // //         if (res.data) {
// // // //           const p = res.data;

// // // //           setForm({
// // // //             ...p,
// // // //             equipmentAvailable: p.equipmentAvailable?.join(", ") || "",
// // // //             medicalConditions: p.medicalConditions?.join(", ") || "",
// // // //             injuries: p.injuries?.join(", ") || "",
// // // //             location: {
// // // //               city: p.location?.city || "",
// // // //               state: p.location?.state || "",
// // // //               country: p.location?.country || ""
// // // //             }
// // // //           });

// // // //           setEditMode(false);
// // // //         }
// // // //       } catch (err) {
// // // //         setEditMode(true); // No profile → create mode
// // // //       }

// // // //       setLoading(false);
// // // //     };

// // // //     fetchProfile();
// // // //   }, [user.id]);

// // // //   /* ============================================================
// // // //      HANDLE CHANGE
// // // //   ============================================================ */
// // // //   const handleChange = (e) => {
// // // //     const { name, value, type, checked } = e.target;

// // // //     if (name === "city" || name === "state" || name === "country") {
// // // //       setForm((prev) => ({
// // // //         ...prev,
// // // //         location: {
// // // //           ...prev.location,
// // // //           [name]: value
// // // //         }
// // // //       }));
// // // //     } else {
// // // //       setForm((prev) => ({
// // // //         ...prev,
// // // //         [name]: type === "checkbox" ? checked : value
// // // //       }));
// // // //     }
// // // //   };

// // // //   /* ============================================================
// // // //      SAVE (CREATE OR UPDATE)
// // // //   ============================================================ */
// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     setSaving(true);
// // // //     setError("");

// // // //     try {
// // // //       const payload = {
// // // //         ...form,
// // // //         userId: user.id,
// // // //         equipmentAvailable: form.equipmentAvailable
// // // //           ? form.equipmentAvailable.split(",").map(i => i.trim())
// // // //           : [],
// // // //         medicalConditions: form.medicalConditions
// // // //           ? form.medicalConditions.split(",").map(i => i.trim())
// // // //           : [],
// // // //         injuries: form.injuries
// // // //           ? form.injuries.split(",").map(i => i.trim())
// // // //           : []
// // // //       };

// // // //       if (editMode) {
// // // //         await profileAPI.update(user.id, payload);
// // // //       } else {
// // // //         await profileAPI.createOrUpdate(payload);
// // // //       }

// // // //       setEditMode(false);

// // // //     } catch (err) {
// // // //       setError(err.response?.data?.message || "Save failed");
// // // //     }

// // // //     setSaving(false);
// // // //   };

// // // //   if (loading) {
// // // //     return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
// // // //   }

// // // //   /* ============================================================
// // // //      VIEW MODE
// // // //   ============================================================ */
// // // //   if (!editMode) {
// // // //     return (
// // // //       <div className="min-h-screen flex justify-center px-6 py-10">
// // // //         <div className="card w-full max-w-3xl">
// // // //           <div className="flex justify-between items-center mb-6">
// // // //             <h2 className="text-3xl font-bold">Your Profile</h2>
// // // //             <button
// // // //               onClick={() => setEditMode(true)}
// // // //               className="btn-primary"
// // // //             >
// // // //               Edit
// // // //             </button>
// // // //           </div>

// // // //           <div className="grid grid-cols-2 gap-4 text-sm">

// // // //             <p><strong>Age:</strong> {form.age}</p>
// // // //             <p><strong>Gender:</strong> {form.gender}</p>
// // // //             <p><strong>Height:</strong> {form.heightCm} cm</p>
// // // //             <p><strong>Weight:</strong> {form.weightKg} kg</p>
// // // //             <p><strong>Goal:</strong> {form.fitnessGoal}</p>
// // // //             <p><strong>Experience:</strong> {form.experienceLevel}</p>
// // // //             <p><strong>Daily Time:</strong> {form.dailyTimeMinutes} min</p>
// // // //             <p><strong>Workout Days:</strong> {form.workoutDaysPerWeek}</p>
// // // //             <p><strong>Activity Level:</strong> {form.dailyActivityLevel}</p>
// // // //             <p><strong>Gym Access:</strong> {form.gymAccess ? "Yes" : "No"}</p>
// // // //             <p><strong>Food Budget:</strong> {form.foodBudgetPerDay}</p>
// // // //             <p><strong>Diet:</strong> {form.dietPreference}</p>

// // // //             <div className="col-span-2">
// // // //               <strong>Equipment:</strong> {form.equipmentAvailable || "None"}
// // // //             </div>

// // // //             <div className="col-span-2">
// // // //               <strong>Medical Conditions:</strong> {form.medicalConditions || "None"}
// // // //             </div>

// // // //             <div className="col-span-2">
// // // //               <strong>Injuries:</strong> {form.injuries || "None"}
// // // //             </div>

// // // //             <div className="col-span-2">
// // // //               <strong>Location:</strong>{" "}
// // // //               {form.location.city}, {form.location.state}, {form.location.country}
// // // //             </div>

// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   /* ============================================================
// // // //      EDIT MODE
// // // //   ============================================================ */
// // // //   return (
// // // //     <div className="min-h-screen flex justify-center px-6 py-10">
// // // //       <div className="card w-full max-w-3xl">

// // // //         <h2 className="text-3xl font-bold mb-6">
// // // //           {form.age ? "Edit Profile" : "Create Profile"}
// // // //         </h2>

// // // //         {error && (
// // // //           <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm">
// // // //             {error}
// // // //           </div>
// // // //         )}

// // // //         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

// // // //           <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="Age" required className="input-field" />
// // // //           <select name="gender" value={form.gender} onChange={handleChange} className="input-field">
// // // //             <option value="male">Male</option>
// // // //             <option value="female">Female</option>
// // // //             <option value="other">Other</option>
// // // //           </select>

// // // //           <input type="number" name="heightCm" value={form.heightCm} onChange={handleChange} placeholder="Height (cm)" required className="input-field" />
// // // //           <input type="number" name="weightKg" value={form.weightKg} onChange={handleChange} placeholder="Weight (kg)" required className="input-field" />

// // // //           <input type="text" name="equipmentAvailable" value={form.equipmentAvailable} onChange={handleChange} placeholder="Equipment (comma separated)" className="input-field col-span-2" />
// // // //           <input type="text" name="medicalConditions" value={form.medicalConditions} onChange={handleChange} placeholder="Medical Conditions (comma separated)" className="input-field col-span-2" />
// // // //           <input type="text" name="injuries" value={form.injuries} onChange={handleChange} placeholder="Injuries (comma separated)" className="input-field col-span-2" />

// // // //           <input type="text" name="city" value={form.location.city} onChange={handleChange} placeholder="City" className="input-field" />
// // // //           <input type="text" name="state" value={form.location.state} onChange={handleChange} placeholder="State" className="input-field" />
// // // //           <input type="text" name="country" value={form.location.country} onChange={handleChange} placeholder="Country" className="input-field col-span-2" />

// // // //           <button type="submit" disabled={saving} className="btn-primary col-span-2 mt-4">
// // // //             {saving ? "Saving..." : "Save Profile"}
// // // //           </button>

// // // //         </form>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // import { useEffect, useState } from "react";
// // // import { useAuth } from "../context/AuthContext";
// // // import { profileAPI } from "../api/axios";

// // // /* ─── Inline styles (old-money dark theme) ──────────────────────── */
// // // const CSS = `
// // //   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Tenor+Sans&display=swap');

// // //   :root {
// // //     --cream:   #f5f0e8;
// // //     --gold:    #b8965a;
// // //     --gold2:   #d4af70;
// // //     --dark:    #0e0e0e;
// // //     --panel:   #141410;
// // //     --border:  rgba(184,150,90,0.25);
// // //     --muted:   #6b6455;
// // //     --accent:  #c9a96e;
// // //   }

// // //   .pm-wrap {
// // //     display: flex; min-height: 100vh; background: var(--dark);
// // //     font-family: 'Tenor Sans', sans-serif;
// // //     color: var(--cream);
// // //   }

// // //   /* ── LEFT FORM PANEL ── */
// // //   .pm-left {
// // //     width: 52%; padding: 52px 48px 52px 52px;
// // //     border-right: 1px solid var(--border);
// // //     overflow-y: auto;
// // //     background: var(--panel);
// // //     position: relative;
// // //   }
// // //   .pm-left::before {
// // //     content:'';
// // //     position:absolute; inset:0;
// // //     background: radial-gradient(ellipse 60% 40% at 10% 5%, rgba(184,150,90,0.06) 0%, transparent 70%);
// // //     pointer-events:none;
// // //   }

// // //   .pm-logo {
// // //     font-family: 'Cormorant Garamond', serif;
// // //     font-size: 11px; letter-spacing: 6px; text-transform: uppercase;
// // //     color: var(--gold); margin-bottom: 48px; opacity: .8;
// // //   }

// // //   .pm-title {
// // //     font-family: 'Cormorant Garamond', serif;
// // //     font-size: 42px; font-weight: 300; line-height: 1.15;
// // //     color: var(--cream); margin-bottom: 8px;
// // //   }
// // //   .pm-title em { font-style: italic; color: var(--gold2); }

// // //   .pm-subtitle {
// // //     font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
// // //     color: var(--muted); margin-bottom: 48px;
// // //   }

// // //   /* ── STEP INDICATOR ── */
// // //   .pm-steps {
// // //     display: flex; gap: 6px; margin-bottom: 36px; align-items: center;
// // //   }
// // //   .pm-step-dot {
// // //     width: 24px; height: 2px; background: var(--border); border-radius: 2px;
// // //     transition: background .3s, width .3s;
// // //   }
// // //   .pm-step-dot.active { background: var(--gold); width: 40px; }
// // //   .pm-step-dot.done   { background: var(--gold2); }
// // //   .pm-step-label {
// // //     font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
// // //     color: var(--muted); margin-left: 10px;
// // //   }

// // //   /* ── FIELDSET ── */
// // //   .pm-section-title {
// // //     font-family: 'Cormorant Garamond', serif;
// // //     font-size: 13px; letter-spacing: 4px; text-transform: uppercase;
// // //     color: var(--gold); margin-bottom: 20px; margin-top: 32px;
// // //     display: flex; align-items: center; gap: 12px;
// // //   }
// // //   .pm-section-title::after {
// // //     content: ''; flex: 1; height: 1px; background: var(--border);
// // //   }

// // //   .pm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
// // //   .pm-full { grid-column: span 2; }

// // //   .pm-label {
// // //     display: block; font-size: 9px; letter-spacing: 3px;
// // //     text-transform: uppercase; color: var(--muted); margin-bottom: 6px;
// // //   }

// // //   .pm-input, .pm-select, .pm-textarea {
// // //     width: 100%; background: rgba(255,255,255,0.03);
// // //     border: 1px solid var(--border); border-radius: 4px;
// // //     color: var(--cream); font-family: 'Tenor Sans', sans-serif;
// // //     font-size: 13px; padding: 12px 14px;
// // //     outline: none; transition: border-color .25s, background .25s;
// // //     box-sizing: border-box;
// // //     -moz-appearance: none; -webkit-appearance: none; appearance: none;
// // //   }
// // //   .pm-input::placeholder { color: #3a3830; }
// // //   .pm-input:focus, .pm-select:focus {
// // //     border-color: var(--gold); background: rgba(184,150,90,0.05);
// // //   }
// // //   .pm-select { cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23b8965a' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px; }
// // //   .pm-select option { background: #1a1a14; }

// // //   /* toggle chips */
// // //   .pm-chips { display: flex; flex-wrap: wrap; gap: 8px; }
// // //   .pm-chip {
// // //     padding: 7px 16px; border: 1px solid var(--border); border-radius: 2px;
// // //     font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase;
// // //     color: var(--muted); cursor: pointer; transition: all .2s;
// // //     background: transparent; font-family: 'Tenor Sans', sans-serif;
// // //   }
// // //   .pm-chip:hover  { border-color: var(--gold); color: var(--gold); }
// // //   .pm-chip.active { border-color: var(--gold); color: var(--dark); background: var(--gold); }

// // //   /* slider */
// // //   .pm-slider-wrap { display: flex; align-items: center; gap: 16px; }
// // //   .pm-slider {
// // //     flex: 1; -webkit-appearance: none; appearance: none;
// // //     height: 2px; background: var(--border); border-radius: 2px; outline: none;
// // //   }
// // //   .pm-slider::-webkit-slider-thumb {
// // //     -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%;
// // //     background: var(--gold); cursor: pointer; border: 2px solid var(--dark);
// // //     box-shadow: 0 0 0 1px var(--gold);
// // //   }
// // //   .pm-slider-val {
// // //     font-family: 'Cormorant Garamond', serif; font-size: 22px; color: var(--gold2);
// // //     min-width: 36px; text-align: right;
// // //   }

// // //   /* toggle */
// // //   .pm-toggle-row { display: flex; align-items: center; gap: 14px; }
// // //   .pm-toggle-switch {
// // //     position: relative; width: 40px; height: 22px;
// // //     background: var(--border); border-radius: 11px; cursor: pointer;
// // //     transition: background .2s; flex-shrink: 0; border: 1px solid var(--border);
// // //   }
// // //   .pm-toggle-switch.on { background: var(--gold); border-color: var(--gold); }
// // //   .pm-toggle-switch::after {
// // //     content: ''; position: absolute; width: 16px; height: 16px;
// // //     border-radius: 50%; background: var(--dark); top: 2px; left: 2px;
// // //     transition: left .2s;
// // //   }
// // //   .pm-toggle-switch.on::after { left: 20px; }
// // //   .pm-toggle-label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); }

// // //   /* error */
// // //   .pm-error {
// // //     padding: 12px 16px; background: rgba(180,60,60,0.12);
// // //     border: 1px solid rgba(180,60,60,0.3); border-radius: 4px;
// // //     font-size: 12px; color: #e07070; margin-bottom: 20px; letter-spacing: 1px;
// // //   }

// // //   /* nav buttons */
// // //   .pm-nav { display: flex; gap: 12px; margin-top: 40px; }
// // //   .pm-btn-ghost {
// // //     flex: 1; padding: 14px; border: 1px solid var(--border); border-radius: 3px;
// // //     background: transparent; color: var(--muted); font-family: 'Tenor Sans', sans-serif;
// // //     font-size: 11px; letter-spacing: 3px; text-transform: uppercase; cursor: pointer;
// // //     transition: all .2s;
// // //   }
// // //   .pm-btn-ghost:hover { border-color: var(--gold); color: var(--gold); }
// // //   .pm-btn-primary {
// // //     flex: 2; padding: 14px; border: 1px solid var(--gold);
// // //     border-radius: 3px; background: var(--gold); color: var(--dark);
// // //     font-family: 'Tenor Sans', sans-serif; font-size: 11px; letter-spacing: 3px;
// // //     text-transform: uppercase; cursor: pointer; transition: all .2s;
// // //     font-weight: 600;
// // //   }
// // //   .pm-btn-primary:hover { background: var(--gold2); border-color: var(--gold2); }
// // //   .pm-btn-primary:disabled { opacity: .5; cursor: not-allowed; }

// // //   /* ── RIGHT DISPLAY PANEL ── */
// // //   .pm-right {
// // //     width: 48%; padding: 52px 48px;
// // //     background: var(--dark);
// // //     position: sticky; top: 0; height: 100vh; overflow-y: auto;
// // //   }

// // //   .pm-display-header {
// // //     font-family: 'Cormorant Garamond', serif;
// // //     font-size: 11px; letter-spacing: 6px; text-transform: uppercase;
// // //     color: var(--gold); margin-bottom: 40px; opacity: .8;
// // //   }

// // //   .pm-monogram-ring {
// // //     width: 88px; height: 88px; border-radius: 50%;
// // //     border: 1px solid var(--gold);
// // //     display: flex; align-items: center; justify-content: center;
// // //     margin-bottom: 28px; position: relative;
// // //   }
// // //   .pm-monogram-ring::before {
// // //     content: ''; position: absolute; inset: -6px; border-radius: 50%;
// // //     border: 1px solid var(--border);
// // //   }
// // //   .pm-monogram {
// // //     font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 300;
// // //     color: var(--gold2); font-style: italic;
// // //   }

// // //   .pm-display-name {
// // //     font-family: 'Cormorant Garamond', serif; font-size: 34px; font-weight: 300;
// // //     color: var(--cream); margin-bottom: 4px;
// // //   }
// // //   .pm-display-sub {
// // //     font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted);
// // //     margin-bottom: 40px;
// // //   }

// // //   .pm-divider {
// // //     width: 48px; height: 1px; background: var(--gold); margin-bottom: 36px;
// // //   }

// // //   .pm-stat-grid {
// // //     display: grid; grid-template-columns: 1fr 1fr; gap: 0;
// // //     border: 1px solid var(--border); border-radius: 4px; overflow: hidden;
// // //   }
// // //   .pm-stat {
// // //     padding: 20px 18px; border-bottom: 1px solid var(--border);
// // //     border-right: 1px solid var(--border);
// // //     transition: background .2s;
// // //   }
// // //   .pm-stat:nth-child(2n) { border-right: none; }
// // //   .pm-stat:nth-last-child(-n+2) { border-bottom: none; }
// // //   .pm-stat:hover { background: rgba(184,150,90,0.04); }
// // //   .pm-stat-label {
// // //     font-size: 8px; letter-spacing: 3px; text-transform: uppercase;
// // //     color: var(--muted); margin-bottom: 6px;
// // //   }
// // //   .pm-stat-value {
// // //     font-family: 'Cormorant Garamond', serif; font-size: 22px; color: var(--cream);
// // //     line-height: 1;
// // //   }
// // //   .pm-stat-unit {
// // //     font-size: 10px; color: var(--muted); letter-spacing: 1px; margin-left: 4px;
// // //   }

// // //   .pm-tag-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 24px; }
// // //   .pm-tag {
// // //     padding: 5px 12px; border: 1px solid var(--border); border-radius: 2px;
// // //     font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted);
// // //   }
// // //   .pm-tag.gold { border-color: rgba(184,150,90,0.5); color: var(--gold2); }

// // //   .pm-location-row {
// // //     display: flex; align-items: center; gap: 8px; margin-top: 28px;
// // //     padding-top: 24px; border-top: 1px solid var(--border);
// // //     font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted);
// // //   }
// // //   .pm-loc-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--gold); }

// // //   /* loading */
// // //   .pm-loading {
// // //     min-height: 100vh; display: flex; align-items: center; justify-content: center;
// // //     background: var(--dark); font-family: 'Cormorant Garamond', serif;
// // //     font-size: 28px; font-style: italic; color: var(--gold2); letter-spacing: 4px;
// // //   }

// // //   @media (max-width: 900px) {
// // //     .pm-wrap { flex-direction: column; }
// // //     .pm-left, .pm-right { width: 100%; position: static; height: auto; }
// // //     .pm-right { border-top: 1px solid var(--border); }
// // //   }
// // // `;

// // // /* ─── CONSTANTS ────────────────────────────────────────────────── */
// // // const GOALS        = ["fat_loss","muscle_gain","endurance","flexibility","general_fitness"];
// // // const EXPERIENCES  = ["beginner","intermediate","advanced"];
// // // const ACTIVITY     = ["sedentary","light","moderate","active","very_active"];
// // // const DIET_PREFS   = ["veg","non_veg","vegan","keto","paleo","mediterranean"];
// // // const EQUIPMENT    = ["dumbbell","barbell","machine","resistance_band","kettlebell","pull_up_bar","bench","cable"];
// // // const MEDICAL_LIST = ["diabetes","hypertension","asthma","heart_condition","joint_pain","back_pain"];
// // // const INJURY_LIST  = ["knee","shoulder","lower_back","wrist","ankle","hip","neck"];

// // // const STEP_LABELS  = ["Vitals","Training","Nutrition","Location"];

// // // /* ─── HELPERS ──────────────────────────────────────────────────── */
// // // const fmtGoal = v => v?.replace(/_/g," ") || "—";
// // // const capsFirst = v => v ? v.charAt(0).toUpperCase() + v.slice(1) : "—";

// // // export default function Profile() {
// // //   const { user } = useAuth();
// // //   const [loading,   setLoading]   = useState(true);
// // //   const [saving,    setSaving]    = useState(false);
// // //   const [editMode,  setEditMode]  = useState(false);
// // //   const [error,     setError]     = useState("");
// // //   const [step,      setStep]      = useState(0);   // 0-3

// // //   const [form, setForm] = useState({
// // //     age: "", gender: "male", heightCm: "", weightKg: "",
// // //     fitnessGoal: "fat_loss", experienceLevel: "beginner",
// // //     dailyTimeMinutes: 45, workoutDaysPerWeek: 3,
// // //     dailyActivityLevel: "moderate", gymAccess: false,
// // //     equipmentAvailable: [], medicalConditions: [], injuries: [],
// // //     foodBudgetPerDay: "", dietPreference: "non_veg",
// // //     location: { city: "", state: "", country: "" }
// // //   });

// // //   /* ── FETCH ── */
// // //   useEffect(() => {
// // //     const fetchProfile = async () => {
// // //       try {
// // //         const res = await profileAPI.get(user.id);
// // //         if (res.data) {
// // //           setForm({ ...res.data,
// // //             equipmentAvailable: res.data.equipmentAvailable || [],
// // //             medicalConditions:  res.data.medicalConditions  || [],
// // //             injuries:           res.data.injuries           || [],
// // //             location: res.data.location || { city:"", state:"", country:"" }
// // //           });
// // //           setEditMode(false);
// // //         }
// // //       } catch { setEditMode(true); }
// // //       setLoading(false);
// // //     };
// // //     fetchProfile();
// // //   }, [user.id]);

// // //   /* ── HANDLERS ── */
// // //   const set = (key, val) => setForm(p => ({ ...p, [key]: val }));
// // //   const setLoc = (key, val) => setForm(p => ({ ...p, location: { ...p.location, [key]: val } }));
// // //   const toggleArr = (key, val) =>
// // //     setForm(p => ({ ...p, [key]: p[key].includes(val) ? p[key].filter(x=>x!==val) : [...p[key], val] }));

// // //   /* ── SAVE ── */
// // //   const handleSubmit = async () => {
// // //     setSaving(true); setError("");
// // //     try {
// // //       const payload = { ...form, userId: user.id };
// // //       editMode ? await profileAPI.update(user.id, payload) : await profileAPI.createOrUpdate(payload);
// // //       setEditMode(false);
// // //     } catch (err) { setError(err.response?.data?.message || "Save failed"); }
// // //     setSaving(false);
// // //   };

// // //   /* ── DISPLAY ── */
// // //   const D = form;
// // //   const initials = user?.name?.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase() || "—";

// // //   if (loading) return (
// // //     <>
// // //       <style>{CSS}</style>
// // //       <div className="pm-loading">Preparing your dossier…</div>
// // //     </>
// // //   );

// // //   /* ── STEP SECTIONS ── */
// // //   const steps = [
// // //     /* 0 – Vitals */
// // //     <>
// // //       <div className="pm-section-title">Personal</div>
// // //       <div className="pm-grid">
// // //         <div>
// // //           <label className="pm-label">Age</label>
// // //           <input className="pm-input" type="number" value={D.age}
// // //             onChange={e=>set("age",e.target.value)} placeholder="e.g. 24" />
// // //         </div>
// // //         <div>
// // //           <label className="pm-label">Gender</label>
// // //           <select className="pm-select" value={D.gender} onChange={e=>set("gender",e.target.value)}>
// // //             <option value="male">Male</option>
// // //             <option value="female">Female</option>
// // //             <option value="other">Other</option>
// // //           </select>
// // //         </div>
// // //         <div>
// // //           <label className="pm-label">Height (cm)</label>
// // //           <input className="pm-input" type="number" value={D.heightCm}
// // //             onChange={e=>set("heightCm",e.target.value)} placeholder="e.g. 175" />
// // //         </div>
// // //         <div>
// // //           <label className="pm-label">Weight (kg)</label>
// // //           <input className="pm-input" type="number" value={D.weightKg}
// // //             onChange={e=>set("weightKg",e.target.value)} placeholder="e.g. 72" />
// // //         </div>
// // //       </div>

// // //       <div className="pm-section-title">Medical History</div>
// // //       <div className="pm-full">
// // //         <label className="pm-label">Conditions (select all that apply)</label>
// // //         <div className="pm-chips">
// // //           {MEDICAL_LIST.map(m=>(
// // //             <button key={m} type="button"
// // //               className={`pm-chip ${D.medicalConditions.includes(m)?"active":""}`}
// // //               onClick={()=>toggleArr("medicalConditions",m)}>{m.replace(/_/g," ")}</button>
// // //           ))}
// // //           <button type="button"
// // //             className={`pm-chip ${D.medicalConditions.includes("none")?"active":""}`}
// // //             onClick={()=>set("medicalConditions", D.medicalConditions.includes("none")?[]:[":none"])}>None</button>
// // //         </div>
// // //       </div>
// // //       <div className="pm-full" style={{marginTop:14}}>
// // //         <label className="pm-label">Injuries</label>
// // //         <div className="pm-chips">
// // //           {INJURY_LIST.map(i=>(
// // //             <button key={i} type="button"
// // //               className={`pm-chip ${D.injuries.includes(i)?"active":""}`}
// // //               onClick={()=>toggleArr("injuries",i)}>{i}</button>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </>,

// // //     /* 1 – Training */
// // //     <>
// // //       <div className="pm-section-title">Goals</div>
// // //       <div className="pm-full">
// // //         <label className="pm-label">Primary Fitness Goal</label>
// // //         <div className="pm-chips">
// // //           {GOALS.map(g=>(
// // //             <button key={g} type="button"
// // //               className={`pm-chip ${D.fitnessGoal===g?"active":""}`}
// // //               onClick={()=>set("fitnessGoal",g)}>{fmtGoal(g)}</button>
// // //           ))}
// // //         </div>
// // //       </div>
// // //       <div className="pm-full" style={{marginTop:14}}>
// // //         <label className="pm-label">Experience Level</label>
// // //         <div className="pm-chips">
// // //           {EXPERIENCES.map(e=>(
// // //             <button key={e} type="button"
// // //               className={`pm-chip ${D.experienceLevel===e?"active":""}`}
// // //               onClick={()=>set("experienceLevel",e)}>{capsFirst(e)}</button>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       <div className="pm-section-title">Schedule</div>
// // //       <div className="pm-full">
// // //         <label className="pm-label">Daily Session Time — {D.dailyTimeMinutes} minutes</label>
// // //         <div className="pm-slider-wrap">
// // //           <input type="range" className="pm-slider" min={15} max={120} step={5}
// // //             value={D.dailyTimeMinutes} onChange={e=>set("dailyTimeMinutes",+e.target.value)} />
// // //           <span className="pm-slider-val">{D.dailyTimeMinutes}</span>
// // //         </div>
// // //       </div>
// // //       <div className="pm-full" style={{marginTop:14}}>
// // //         <label className="pm-label">Workout Days per Week — {D.workoutDaysPerWeek} days</label>
// // //         <div className="pm-slider-wrap">
// // //           <input type="range" className="pm-slider" min={1} max={7} step={1}
// // //             value={D.workoutDaysPerWeek} onChange={e=>set("workoutDaysPerWeek",+e.target.value)} />
// // //           <span className="pm-slider-val">{D.workoutDaysPerWeek}</span>
// // //         </div>
// // //       </div>

// // //       <div className="pm-section-title">Environment</div>
// // //       <div className="pm-full">
// // //         <label className="pm-label">Daily Activity Level</label>
// // //         <div className="pm-chips">
// // //           {ACTIVITY.map(a=>(
// // //             <button key={a} type="button"
// // //               className={`pm-chip ${D.dailyActivityLevel===a?"active":""}`}
// // //               onClick={()=>set("dailyActivityLevel",a)}>{fmtGoal(a)}</button>
// // //           ))}
// // //         </div>
// // //       </div>
// // //       <div className="pm-full" style={{marginTop:16}}>
// // //         <div className="pm-toggle-row">
// // //           <div className={`pm-toggle-switch ${D.gymAccess?"on":""}`}
// // //             onClick={()=>set("gymAccess",!D.gymAccess)} />
// // //           <span className="pm-toggle-label">Gym Access</span>
// // //         </div>
// // //       </div>
// // //       <div className="pm-full" style={{marginTop:14}}>
// // //         <label className="pm-label">Equipment Available</label>
// // //         <div className="pm-chips">
// // //           {EQUIPMENT.map(eq=>(
// // //             <button key={eq} type="button"
// // //               className={`pm-chip ${D.equipmentAvailable.includes(eq)?"active":""}`}
// // //               onClick={()=>toggleArr("equipmentAvailable",eq)}>{eq.replace(/_/g," ")}</button>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </>,

// // //     /* 2 – Nutrition */
// // //     <>
// // //       <div className="pm-section-title">Diet & Nutrition</div>
// // //       <div className="pm-full">
// // //         <label className="pm-label">Diet Preference</label>
// // //         <div className="pm-chips">
// // //           {DIET_PREFS.map(d=>(
// // //             <button key={d} type="button"
// // //               className={`pm-chip ${D.dietPreference===d?"active":""}`}
// // //               onClick={()=>set("dietPreference",d)}>{capsFirst(d)}</button>
// // //           ))}
// // //         </div>
// // //       </div>
// // //       <div className="pm-full" style={{marginTop:24}}>
// // //         <label className="pm-label">Daily Food Budget (₹ or $)</label>
// // //         <input className="pm-input" type="number" value={D.foodBudgetPerDay}
// // //           onChange={e=>set("foodBudgetPerDay",e.target.value)} placeholder="e.g. 300" style={{maxWidth:240}} />
// // //       </div>
// // //     </>,

// // //     /* 3 – Location */
// // //     <>
// // //       <div className="pm-section-title">Location</div>
// // //       <div className="pm-grid">
// // //         <div className="pm-full">
// // //           <label className="pm-label">Country</label>
// // //           <input className="pm-input" value={D.location.country}
// // //             onChange={e=>setLoc("country",e.target.value)} placeholder="e.g. India" />
// // //         </div>
// // //         <div>
// // //           <label className="pm-label">State</label>
// // //           <input className="pm-input" value={D.location.state}
// // //             onChange={e=>setLoc("state",e.target.value)} placeholder="e.g. Telangana" />
// // //         </div>
// // //         <div>
// // //           <label className="pm-label">City</label>
// // //           <input className="pm-input" value={D.location.city}
// // //             onChange={e=>setLoc("city",e.target.value)} placeholder="e.g. Hyderabad" />
// // //         </div>
// // //       </div>
// // //     </>
// // //   ];

// // //   /* ── BMI ── */
// // //   const bmi = D.heightCm && D.weightKg
// // //     ? (D.weightKg / ((D.heightCm/100)**2)).toFixed(1) : "—";

// // //   return (
// // //     <>
// // //       <style>{CSS}</style>
// // //       <div className="pm-wrap">

// // //         {/* ════ LEFT ════ */}
// // //         <div className="pm-left">
// // //           <div className="pm-logo">◆ Athlete Dossier</div>

// // //           <h1 className="pm-title">
// // //             {editMode
// // //               ? <>Build Your <em>Profile</em></>
// // //               : <>Your <em>Profile</em></>}
// // //           </h1>
// // //           <p className="pm-subtitle">
// // //             {editMode ? "Step " + (step+1) + " of " + steps.length : "Personal training dossier"}
// // //           </p>

// // //           {editMode && (
// // //             <div className="pm-steps">
// // //               {STEP_LABELS.map((l,i)=>(
// // //                 <div key={i} className={`pm-step-dot ${i===step?"active":i<step?"done":""}`} />
// // //               ))}
// // //               <span className="pm-step-label">{STEP_LABELS[step]}</span>
// // //             </div>
// // //           )}

// // //           {error && <div className="pm-error">⚠ {error}</div>}

// // //           {editMode ? (
// // //             <>
// // //               {steps[step]}
// // //               <div className="pm-nav">
// // //                 {step > 0 && (
// // //                   <button className="pm-btn-ghost" onClick={()=>setStep(s=>s-1)}>← Back</button>
// // //                 )}
// // //                 {step < steps.length - 1 ? (
// // //                   <button className="pm-btn-primary" onClick={()=>setStep(s=>s+1)}>Continue →</button>
// // //                 ) : (
// // //                   <button className="pm-btn-primary" disabled={saving} onClick={handleSubmit}>
// // //                     {saving ? "Saving…" : "Complete Profile ✦"}
// // //                   </button>
// // //                 )}
// // //               </div>
// // //             </>
// // //           ) : (
// // //             <>
// // //               <div style={{color:"var(--muted)",fontSize:13,lineHeight:1.8}}>
// // //                 <p>Your profile is complete. All training plans and nutrition recommendations are calibrated to your specifications.</p>
// // //               </div>
// // //               <div className="pm-nav" style={{marginTop:32}}>
// // //                 <button className="pm-btn-primary" onClick={()=>{setEditMode(true);setStep(0);}}>
// // //                   Edit Profile
// // //                 </button>
// // //               </div>
// // //             </>
// // //           )}
// // //         </div>

// // //         {/* ════ RIGHT ════ */}
// // //         <div className="pm-right">
// // //           <div className="pm-display-header">◆ Live Preview</div>

// // //           <div className="pm-monogram-ring">
// // //             <span className="pm-monogram">{initials}</span>
// // //           </div>

// // //           <div className="pm-display-name">
// // //             {D.age ? `${D.gender==="male"?"Mr.":"Ms."} Athlete` : "Your Profile"}
// // //           </div>
// // //           <div className="pm-display-sub">
// // //             {capsFirst(D.experienceLevel)} · {fmtGoal(D.fitnessGoal)}
// // //           </div>

// // //           <div className="pm-divider" />

// // //           <div className="pm-stat-grid">
// // //             <div className="pm-stat">
// // //               <div className="pm-stat-label">Age</div>
// // //               <div className="pm-stat-value">{D.age || "—"}<span className="pm-stat-unit">yrs</span></div>
// // //             </div>
// // //             <div className="pm-stat">
// // //               <div className="pm-stat-label">BMI</div>
// // //               <div className="pm-stat-value">{bmi}</div>
// // //             </div>
// // //             <div className="pm-stat">
// // //               <div className="pm-stat-label">Height</div>
// // //               <div className="pm-stat-value">{D.heightCm||"—"}<span className="pm-stat-unit">cm</span></div>
// // //             </div>
// // //             <div className="pm-stat">
// // //               <div className="pm-stat-label">Weight</div>
// // //               <div className="pm-stat-value">{D.weightKg||"—"}<span className="pm-stat-unit">kg</span></div>
// // //             </div>
// // //             <div className="pm-stat">
// // //               <div className="pm-stat-label">Session</div>
// // //               <div className="pm-stat-value">{D.dailyTimeMinutes}<span className="pm-stat-unit">min</span></div>
// // //             </div>
// // //             <div className="pm-stat">
// // //               <div className="pm-stat-label">Days / Week</div>
// // //               <div className="pm-stat-value">{D.workoutDaysPerWeek}</div>
// // //             </div>
// // //             <div className="pm-stat">
// // //               <div className="pm-stat-label">Activity</div>
// // //               <div className="pm-stat-value" style={{fontSize:16}}>{capsFirst(D.dailyActivityLevel)}</div>
// // //             </div>
// // //             <div className="pm-stat">
// // //               <div className="pm-stat-label">Gym</div>
// // //               <div className="pm-stat-value" style={{fontSize:16,color: D.gymAccess?"var(--gold2)":"var(--muted)"}}>{D.gymAccess?"Access":"No Gym"}</div>
// // //             </div>
// // //           </div>

// // //           <div className="pm-tag-row">
// // //             {D.fitnessGoal && <span className="pm-tag gold">{fmtGoal(D.fitnessGoal)}</span>}
// // //             {D.dietPreference && <span className="pm-tag">{capsFirst(D.dietPreference)}</span>}
// // //             {D.experienceLevel && <span className="pm-tag">{capsFirst(D.experienceLevel)}</span>}
// // //             {D.foodBudgetPerDay && <span className="pm-tag">Budget: {D.foodBudgetPerDay}</span>}
// // //           </div>

// // //           {D.equipmentAvailable.length > 0 && (
// // //             <div style={{marginTop:20}}>
// // //               <div style={{fontSize:"8px",letterSpacing:"3px",textTransform:"uppercase",color:"var(--muted)",marginBottom:8}}>Equipment</div>
// // //               <div className="pm-tag-row">
// // //                 {D.equipmentAvailable.map(e=><span key={e} className="pm-tag">{e.replace(/_/g," ")}</span>)}
// // //               </div>
// // //             </div>
// // //           )}

// // //           {(D.medicalConditions.length > 0 || D.injuries.length > 0) && (
// // //             <div style={{marginTop:20}}>
// // //               <div style={{fontSize:"8px",letterSpacing:"3px",textTransform:"uppercase",color:"var(--muted)",marginBottom:8}}>Health Notes</div>
// // //               <div className="pm-tag-row">
// // //                 {D.medicalConditions.map(m=><span key={m} className="pm-tag" style={{borderColor:"rgba(200,100,100,0.3)",color:"#c87070"}}>{m.replace(/_/g," ")}</span>)}
// // //                 {D.injuries.map(i=><span key={i} className="pm-tag" style={{borderColor:"rgba(200,150,60,0.3)",color:"#c8a060"}}>{i}</span>)}
// // //               </div>
// // //             </div>
// // //           )}

// // //           {(D.location.city || D.location.country) && (
// // //             <div className="pm-location-row">
// // //               <div className="pm-loc-dot" />
// // //               {[D.location.city, D.location.state, D.location.country].filter(Boolean).join(", ")}
// // //             </div>
// // //           )}
// // //         </div>

// // //       </div>
// // //     </>
// // //   );
// // // }

// // import { useEffect, useState } from "react";
// // import { useAuth } from "../context/AuthContext";
// // import { profileAPI } from "../api/axios";

// // /* ─── Inline styles — exact theme from global CSS ───────────────── */
// // const CSS = `
// //   :root {
// //     --color-primary:     #FF6A00;
// //     --color-primary-hover: #FF8C00;
// //     --color-bg-main:     #1a1008;
// //     --color-bg-soft:     #221508;
// //     --color-bg-card:     rgba(255,255,255,0.03);
// //     --color-bg-card-hover: rgba(255,255,255,0.05);
// //     --color-border-soft: rgba(255,255,255,0.07);
// //     --color-border-accent: rgba(255,106,0,0.3);
// //     --color-text-main:   #ffffff;
// //     --color-text-secondary: rgba(255,255,255,0.55);
// //     --color-text-muted:  rgba(255,255,255,0.3);
// //   }

// //   .pm-wrap {
// //     display: flex; min-height: 100vh;
// //     background: var(--color-bg-main);
// //     font-family: 'DM Sans', sans-serif;
// //     color: var(--color-text-main);
// //   }

// //   /* ── LEFT FORM PANEL ── */
// //   .pm-left {
// //     width: 52%; padding: 52px 48px 52px 52px;
// //     border-right: 1px solid var(--color-border-soft);
// //     overflow-y: auto;
// //     background: var(--color-bg-soft);
// //     position: relative;
// //   }
// //   .pm-left::before {
// //     content: '';
// //     position: absolute; inset: 0;
// //     background: radial-gradient(ellipse 60% 40% at 10% 5%, rgba(255,106,0,0.06) 0%, transparent 70%);
// //     pointer-events: none;
// //   }

// //   .pm-logo {
// //     font-family: 'Bebas Neue', cursive;
// //     font-size: 13px; letter-spacing: 6px; text-transform: uppercase;
// //     color: var(--color-primary); margin-bottom: 48px; opacity: .85;
// //   }

// //   .pm-title {
// //     font-family: 'Bebas Neue', cursive;
// //     font-size: 48px; font-weight: 400; line-height: 1.1;
// //     color: var(--color-text-main); margin-bottom: 8px; letter-spacing: 2px;
// //   }
// //   .pm-title em { font-style: normal; color: var(--color-primary-hover); }

// //   .pm-subtitle {
// //     font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
// //     color: var(--color-text-muted); margin-bottom: 48px;
// //   }

// //   /* ── STEP INDICATOR ── */
// //   .pm-steps {
// //     display: flex; gap: 6px; margin-bottom: 36px; align-items: center;
// //   }
// //   .pm-step-dot {
// //     width: 24px; height: 2px;
// //     background: var(--color-border-soft); border-radius: 2px;
// //     transition: background .3s, width .3s;
// //   }
// //   .pm-step-dot.active { background: var(--color-primary); width: 40px; }
// //   .pm-step-dot.done   { background: var(--color-primary-hover); }
// //   .pm-step-label {
// //     font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
// //     color: var(--color-text-muted); margin-left: 10px; font-weight: 600;
// //   }

// //   /* ── FIELDSET ── */
// //   .pm-section-title {
// //     font-family: 'Bebas Neue', cursive;
// //     font-size: 14px; letter-spacing: 5px; text-transform: uppercase;
// //     color: var(--color-primary); margin-bottom: 20px; margin-top: 32px;
// //     display: flex; align-items: center; gap: 12px;
// //   }
// //   .pm-section-title::after {
// //     content: ''; flex: 1; height: 1px;
// //     background: var(--color-border-accent);
// //   }

// //   .pm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
// //   .pm-full { grid-column: span 2; }

// //   .pm-label {
// //     display: block; font-size: 9px; letter-spacing: 3px;
// //     text-transform: uppercase; color: var(--color-text-muted);
// //     margin-bottom: 6px; font-weight: 700;
// //   }

// //   .pm-input, .pm-select, .pm-textarea {
// //     width: 100%;
// //     background: var(--color-bg-card);
// //     border: 1px solid var(--color-border-soft); border-radius: 10px;
// //     color: var(--color-text-main); font-family: 'DM Sans', sans-serif;
// //     font-size: 13px; padding: 12px 14px;
// //     outline: none; transition: border-color .25s, background .25s;
// //     box-sizing: border-box;
// //     -moz-appearance: none; -webkit-appearance: none; appearance: none;
// //   }
// //   .pm-input::placeholder { color: var(--color-text-muted); }
// //   .pm-input:focus, .pm-select:focus {
// //     border-color: var(--color-primary);
// //     background: rgba(255,106,0,0.04);
// //     box-shadow: 0 0 0 3px rgba(255,106,0,0.12);
// //   }
// //   .pm-select {
// //     cursor: pointer;
// //     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23FF6A00' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
// //     background-repeat: no-repeat; background-position: right 14px center;
// //     padding-right: 36px;
// //   }
// //   .pm-select option { background: #221508; }

// //   /* toggle chips */
// //   .pm-chips { display: flex; flex-wrap: wrap; gap: 8px; }
// //   .pm-chip {
// //     padding: 7px 16px;
// //     border: 1px solid var(--color-border-soft); border-radius: 20px;
// //     font-size: 11px; letter-spacing: 1px; text-transform: uppercase;
// //     color: var(--color-text-muted); cursor: pointer; transition: all .2s;
// //     background: transparent; font-family: 'DM Sans', sans-serif; font-weight: 600;
// //   }
// //   .pm-chip:hover  { border-color: var(--color-primary); color: var(--color-primary); }
// //   .pm-chip.active {
// //     border-color: var(--color-primary);
// //     color: #1a1008; background: var(--color-primary);
// //   }

// //   /* slider */
// //   .pm-slider-wrap { display: flex; align-items: center; gap: 16px; }
// //   .pm-slider {
// //     flex: 1; -webkit-appearance: none; appearance: none;
// //     height: 2px; background: var(--color-border-soft); border-radius: 2px; outline: none;
// //   }
// //   .pm-slider::-webkit-slider-thumb {
// //     -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%;
// //     background: var(--color-primary); cursor: pointer;
// //     border: 2px solid var(--color-bg-main);
// //     box-shadow: 0 0 0 1px var(--color-primary);
// //   }
// //   .pm-slider-val {
// //     font-family: 'Bebas Neue', cursive; font-size: 26px;
// //     color: var(--color-primary-hover);
// //     min-width: 36px; text-align: right; letter-spacing: 1px;
// //   }

// //   /* toggle */
// //   .pm-toggle-row { display: flex; align-items: center; gap: 14px; }
// //   .pm-toggle-switch {
// //     position: relative; width: 40px; height: 22px;
// //     background: var(--color-border-soft); border-radius: 11px; cursor: pointer;
// //     transition: background .2s; flex-shrink: 0;
// //     border: 1px solid var(--color-border-soft);
// //   }
// //   .pm-toggle-switch.on {
// //     background: var(--color-primary);
// //     border-color: var(--color-primary);
// //   }
// //   .pm-toggle-switch::after {
// //     content: ''; position: absolute; width: 16px; height: 16px;
// //     border-radius: 50%; background: var(--color-bg-main); top: 2px; left: 2px;
// //     transition: left .2s;
// //   }
// //   .pm-toggle-switch.on::after { left: 20px; }
// //   .pm-toggle-label {
// //     font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
// //     color: var(--color-text-muted); font-weight: 600;
// //   }

// //   /* error */
// //   .pm-error {
// //     padding: 12px 16px;
// //     background: rgba(239,68,68,0.1);
// //     border: 1px solid rgba(239,68,68,0.3); border-radius: 10px;
// //     font-size: 12px; color: #f87171; margin-bottom: 20px; letter-spacing: 1px;
// //   }

// //   /* nav buttons */
// //   .pm-nav { display: flex; gap: 12px; margin-top: 40px; }
// //   .pm-btn-ghost {
// //     flex: 1; padding: 14px;
// //     border: 1px solid var(--color-border-accent); border-radius: 12px;
// //     background: transparent; color: var(--color-text-muted);
// //     font-family: 'DM Sans', sans-serif;
// //     font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
// //     cursor: pointer; transition: all .2s; font-weight: 700;
// //   }
// //   .pm-btn-ghost:hover { border-color: var(--color-primary); color: var(--color-primary); }
// //   .pm-btn-primary {
// //     flex: 2; padding: 14px;
// //     border: 1px solid var(--color-primary); border-radius: 12px;
// //     background: linear-gradient(135deg, #FF6A00, #FF8C00);
// //     color: #1a1008;
// //     font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: 3px;
// //     text-transform: uppercase; cursor: pointer; transition: all .2s;
// //     font-weight: 700; box-shadow: 0 4px 20px rgba(255,106,0,0.35);
// //     position: relative; overflow: hidden;
// //   }
// //   .pm-btn-primary::before {
// //     content: '';
// //     position: absolute; top: 0; left: -100%;
// //     width: 100%; height: 100%;
// //     background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
// //     transition: left .4s ease;
// //   }
// //   .pm-btn-primary:hover::before { left: 100%; }
// //   .pm-btn-primary:hover {
// //     box-shadow: 0 6px 28px rgba(255,106,0,0.5);
// //     transform: translateY(-1px);
// //   }
// //   .pm-btn-primary:disabled { opacity: .5; cursor: not-allowed; transform: none; }

// //   /* ── RIGHT DISPLAY PANEL ── */
// //   .pm-right {
// //     width: 48%; padding: 52px 48px;
// //     background: var(--color-bg-main);
// //     position: sticky; top: 0; height: 100vh; overflow-y: auto;
// //   }

// //   .pm-display-header {
// //     font-family: 'Bebas Neue', cursive;
// //     font-size: 13px; letter-spacing: 6px; text-transform: uppercase;
// //     color: var(--color-primary); margin-bottom: 40px; opacity: .85;
// //   }

// //   .pm-monogram-ring {
// //     width: 88px; height: 88px; border-radius: 50%;
// //     border: 1px solid var(--color-primary);
// //     display: flex; align-items: center; justify-content: center;
// //     margin-bottom: 28px; position: relative;
// //     background: rgba(255,106,0,0.06);
// //   }
// //   .pm-monogram-ring::before {
// //     content: ''; position: absolute; inset: -6px; border-radius: 50%;
// //     border: 1px solid var(--color-border-accent);
// //   }
// //   .pm-monogram {
// //     font-family: 'Bebas Neue', cursive; font-size: 34px; font-weight: 400;
// //     color: var(--color-primary-hover); letter-spacing: 2px;
// //   }

// //   .pm-display-name {
// //     font-family: 'Bebas Neue', cursive; font-size: 38px; font-weight: 400;
// //     color: var(--color-text-main); margin-bottom: 4px; letter-spacing: 2px;
// //   }
// //   .pm-display-sub {
// //     font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
// //     color: var(--color-text-muted); margin-bottom: 40px; font-weight: 600;
// //   }

// //   .pm-divider {
// //     width: 48px; height: 2px; background: var(--color-primary);
// //     margin-bottom: 36px; border-radius: 2px;
// //   }

// //   .pm-stat-grid {
// //     display: grid; grid-template-columns: 1fr 1fr; gap: 0;
// //     border: 1px solid var(--color-border-accent); border-radius: 14px; overflow: hidden;
// //   }
// //   .pm-stat {
// //     padding: 20px 18px;
// //     border-bottom: 1px solid var(--color-border-soft);
// //     border-right: 1px solid var(--color-border-soft);
// //     transition: background .2s;
// //   }
// //   .pm-stat:nth-child(2n)       { border-right: none; }
// //   .pm-stat:nth-last-child(-n+2){ border-bottom: none; }
// //   .pm-stat:hover { background: var(--color-bg-card-hover); }
// //   .pm-stat-label {
// //     font-size: 8px; letter-spacing: 3px; text-transform: uppercase;
// //     color: var(--color-text-muted); margin-bottom: 6px; font-weight: 700;
// //   }
// //   .pm-stat-value {
// //     font-family: 'Bebas Neue', cursive; font-size: 26px;
// //     color: var(--color-text-main); line-height: 1; letter-spacing: 1px;
// //   }
// //   .pm-stat-unit {
// //     font-size: 10px; color: var(--color-text-muted); letter-spacing: 1px;
// //     margin-left: 4px; font-family: 'DM Sans', sans-serif;
// //   }

// //   .pm-tag-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 24px; }
// //   .pm-tag {
// //     padding: 5px 12px;
// //     border: 1px solid var(--color-border-soft); border-radius: 20px;
// //     font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
// //     color: var(--color-text-muted); font-weight: 700;
// //   }
// //   .pm-tag.gold {
// //     border-color: var(--color-border-accent);
// //     color: var(--color-primary-hover);
// //     background: rgba(255,106,0,0.08);
// //   }

// //   .pm-location-row {
// //     display: flex; align-items: center; gap: 8px; margin-top: 28px;
// //     padding-top: 24px; border-top: 1px solid var(--color-border-soft);
// //     font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
// //     color: var(--color-text-muted); font-weight: 600;
// //   }
// //   .pm-loc-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--color-primary); }

// //   /* loading */
// //   .pm-loading {
// //     min-height: 100vh; display: flex; align-items: center; justify-content: center;
// //     background: var(--color-bg-main); font-family: 'Bebas Neue', cursive;
// //     font-size: 32px; color: var(--color-primary-hover); letter-spacing: 6px;
// //   }

// //   @media (max-width: 900px) {
// //     .pm-wrap { flex-direction: column; }
// //     .pm-left, .pm-right { width: 100%; position: static; height: auto; }
// //     .pm-right { border-top: 1px solid var(--color-border-soft); }
// //   }
// // `;

// // /* ─── CONSTANTS ────────────────────────────────────────────────── */
// // const GOALS        = ["fat_loss","muscle_gain","endurance","flexibility","general_fitness"];
// // const EXPERIENCES  = ["beginner","intermediate","advanced"];
// // const ACTIVITY     = ["sedentary","light","moderate","active","very_active"];
// // const DIET_PREFS   = ["veg","non_veg","vegan","keto","paleo","mediterranean"];
// // const EQUIPMENT    = ["dumbbell","barbell","machine","resistance_band","kettlebell","pull_up_bar","bench","cable"];
// // const MEDICAL_LIST = ["diabetes","hypertension","asthma","heart_condition","joint_pain","back_pain"];
// // const INJURY_LIST  = ["knee","shoulder","lower_back","wrist","ankle","hip","neck"];

// // const STEP_LABELS  = ["Vitals","Training","Nutrition","Location"];

// // /* ─── HELPERS ──────────────────────────────────────────────────── */
// // const fmtGoal   = v => v?.replace(/_/g," ") || "—";
// // const capsFirst = v => v ? v.charAt(0).toUpperCase() + v.slice(1) : "—";

// // export default function Profile() {
// //   const { user } = useAuth();
// //   const [loading,  setLoading]  = useState(true);
// //   const [saving,   setSaving]   = useState(false);
// //   const [editMode, setEditMode] = useState(false);
// //   const [error,    setError]    = useState("");
// //   const [step,     setStep]     = useState(0);

// //   const [form, setForm] = useState({
// //     age: "", gender: "male", heightCm: "", weightKg: "",
// //     fitnessGoal: "fat_loss", experienceLevel: "beginner",
// //     dailyTimeMinutes: 45, workoutDaysPerWeek: 3,
// //     dailyActivityLevel: "moderate", gymAccess: false,
// //     equipmentAvailable: [], medicalConditions: [], injuries: [],
// //     foodBudgetPerDay: "", dietPreference: "non_veg",
// //     location: { city: "", state: "", country: "" }
// //   });

// //   /* ── FETCH ── */
// //   useEffect(() => {
// //     const fetchProfile = async () => {
// //       try {
// //         const res = await profileAPI.get(user.id);
// //         if (res.data) {
// //           setForm({ ...res.data,
// //             equipmentAvailable: res.data.equipmentAvailable || [],
// //             medicalConditions:  res.data.medicalConditions  || [],
// //             injuries:           res.data.injuries           || [],
// //             location: res.data.location || { city:"", state:"", country:"" }
// //           });
// //           setEditMode(false);
// //         }
// //       } catch { setEditMode(true); }
// //       setLoading(false);
// //     };
// //     fetchProfile();
// //   }, [user.id]);

// //   /* ── HANDLERS ── */
// //   const set    = (key, val) => setForm(p => ({ ...p, [key]: val }));
// //   const setLoc = (key, val) => setForm(p => ({ ...p, location: { ...p.location, [key]: val } }));
// //   const toggleArr = (key, val) =>
// //     setForm(p => ({ ...p, [key]: p[key].includes(val) ? p[key].filter(x=>x!==val) : [...p[key], val] }));

// //   /* ── SAVE ── */
// //   const handleSubmit = async () => {
// //     setSaving(true); setError("");
// //     try {
// //       const payload = { ...form, userId: user.id };
// //       editMode ? await profileAPI.update(user.id, payload) : await profileAPI.createOrUpdate(payload);
// //       setEditMode(false);
// //     } catch (err) { setError(err.response?.data?.message || "Save failed"); }
// //     setSaving(false);
// //   };

// //   /* ── DISPLAY ── */
// //   const D = form;
// //   const initials = user?.name?.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase() || "—";

// //   if (loading) return (
// //     <>
// //       <style>{CSS}</style>
// //       <div className="pm-loading">Preparing your dossier…</div>
// //     </>
// //   );

// //   /* ── STEP SECTIONS ── */
// //   const steps = [
// //     /* 0 – Vitals */
// //     <>
// //       <div className="pm-section-title">Personal</div>
// //       <div className="pm-grid">
// //         <div>
// //           <label className="pm-label">Age</label>
// //           <input className="pm-input" type="number" value={D.age}
// //             onChange={e=>set("age",e.target.value)} placeholder="e.g. 24" />
// //         </div>
// //         <div>
// //           <label className="pm-label">Gender</label>
// //           <select className="pm-select" value={D.gender} onChange={e=>set("gender",e.target.value)}>
// //             <option value="male">Male</option>
// //             <option value="female">Female</option>
// //             <option value="other">Other</option>
// //           </select>
// //         </div>
// //         <div>
// //           <label className="pm-label">Height (cm)</label>
// //           <input className="pm-input" type="number" value={D.heightCm}
// //             onChange={e=>set("heightCm",e.target.value)} placeholder="e.g. 175" />
// //         </div>
// //         <div>
// //           <label className="pm-label">Weight (kg)</label>
// //           <input className="pm-input" type="number" value={D.weightKg}
// //             onChange={e=>set("weightKg",e.target.value)} placeholder="e.g. 72" />
// //         </div>
// //       </div>

// //       <div className="pm-section-title">Medical History</div>
// //       <div className="pm-full">
// //         <label className="pm-label">Conditions (select all that apply)</label>
// //         <div className="pm-chips">
// //           {MEDICAL_LIST.map(m=>(
// //             <button key={m} type="button"
// //               className={`pm-chip ${D.medicalConditions.includes(m)?"active":""}`}
// //               onClick={()=>toggleArr("medicalConditions",m)}>{m.replace(/_/g," ")}</button>
// //           ))}
// //           <button type="button"
// //             className={`pm-chip ${D.medicalConditions.includes("none")?"active":""}`}
// //             onClick={()=>set("medicalConditions", D.medicalConditions.includes("none")?[]:[":none"])}>None</button>
// //         </div>
// //       </div>
// //       <div className="pm-full" style={{marginTop:14}}>
// //         <label className="pm-label">Injuries</label>
// //         <div className="pm-chips">
// //           {INJURY_LIST.map(i=>(
// //             <button key={i} type="button"
// //               className={`pm-chip ${D.injuries.includes(i)?"active":""}`}
// //               onClick={()=>toggleArr("injuries",i)}>{i}</button>
// //           ))}
// //         </div>
// //       </div>
// //     </>,

// //     /* 1 – Training */
// //     <>
// //       <div className="pm-section-title">Goals</div>
// //       <div className="pm-full">
// //         <label className="pm-label">Primary Fitness Goal</label>
// //         <div className="pm-chips">
// //           {GOALS.map(g=>(
// //             <button key={g} type="button"
// //               className={`pm-chip ${D.fitnessGoal===g?"active":""}`}
// //               onClick={()=>set("fitnessGoal",g)}>{fmtGoal(g)}</button>
// //           ))}
// //         </div>
// //       </div>
// //       <div className="pm-full" style={{marginTop:14}}>
// //         <label className="pm-label">Experience Level</label>
// //         <div className="pm-chips">
// //           {EXPERIENCES.map(e=>(
// //             <button key={e} type="button"
// //               className={`pm-chip ${D.experienceLevel===e?"active":""}`}
// //               onClick={()=>set("experienceLevel",e)}>{capsFirst(e)}</button>
// //           ))}
// //         </div>
// //       </div>

// //       <div className="pm-section-title">Schedule</div>
// //       <div className="pm-full">
// //         <label className="pm-label">Daily Session Time — {D.dailyTimeMinutes} minutes</label>
// //         <div className="pm-slider-wrap">
// //           <input type="range" className="pm-slider" min={15} max={120} step={5}
// //             value={D.dailyTimeMinutes} onChange={e=>set("dailyTimeMinutes",+e.target.value)} />
// //           <span className="pm-slider-val">{D.dailyTimeMinutes}</span>
// //         </div>
// //       </div>
// //       <div className="pm-full" style={{marginTop:14}}>
// //         <label className="pm-label">Workout Days per Week — {D.workoutDaysPerWeek} days</label>
// //         <div className="pm-slider-wrap">
// //           <input type="range" className="pm-slider" min={1} max={7} step={1}
// //             value={D.workoutDaysPerWeek} onChange={e=>set("workoutDaysPerWeek",+e.target.value)} />
// //           <span className="pm-slider-val">{D.workoutDaysPerWeek}</span>
// //         </div>
// //       </div>

// //       <div className="pm-section-title">Environment</div>
// //       <div className="pm-full">
// //         <label className="pm-label">Daily Activity Level</label>
// //         <div className="pm-chips">
// //           {ACTIVITY.map(a=>(
// //             <button key={a} type="button"
// //               className={`pm-chip ${D.dailyActivityLevel===a?"active":""}`}
// //               onClick={()=>set("dailyActivityLevel",a)}>{fmtGoal(a)}</button>
// //           ))}
// //         </div>
// //       </div>
// //       <div className="pm-full" style={{marginTop:16}}>
// //         <div className="pm-toggle-row">
// //           <div className={`pm-toggle-switch ${D.gymAccess?"on":""}`}
// //             onClick={()=>set("gymAccess",!D.gymAccess)} />
// //           <span className="pm-toggle-label">Gym Access</span>
// //         </div>
// //       </div>
// //       <div className="pm-full" style={{marginTop:14}}>
// //         <label className="pm-label">Equipment Available</label>
// //         <div className="pm-chips">
// //           {EQUIPMENT.map(eq=>(
// //             <button key={eq} type="button"
// //               className={`pm-chip ${D.equipmentAvailable.includes(eq)?"active":""}`}
// //               onClick={()=>toggleArr("equipmentAvailable",eq)}>{eq.replace(/_/g," ")}</button>
// //           ))}
// //         </div>
// //       </div>
// //     </>,

// //     /* 2 – Nutrition */
// //     <>
// //       <div className="pm-section-title">Diet & Nutrition</div>
// //       <div className="pm-full">
// //         <label className="pm-label">Diet Preference</label>
// //         <div className="pm-chips">
// //           {DIET_PREFS.map(d=>(
// //             <button key={d} type="button"
// //               className={`pm-chip ${D.dietPreference===d?"active":""}`}
// //               onClick={()=>set("dietPreference",d)}>{capsFirst(d)}</button>
// //           ))}
// //         </div>
// //       </div>
// //       <div className="pm-full" style={{marginTop:24}}>
// //         <label className="pm-label">Daily Food Budget (₹ or $)</label>
// //         <input className="pm-input" type="number" value={D.foodBudgetPerDay}
// //           onChange={e=>set("foodBudgetPerDay",e.target.value)} placeholder="e.g. 300" style={{maxWidth:240}} />
// //       </div>
// //     </>,

// //     /* 3 – Location */
// //     <>
// //       <div className="pm-section-title">Location</div>
// //       <div className="pm-grid">
// //         <div className="pm-full">
// //           <label className="pm-label">Country</label>
// //           <input className="pm-input" value={D.location.country}
// //             onChange={e=>setLoc("country",e.target.value)} placeholder="e.g. India" />
// //         </div>
// //         <div>
// //           <label className="pm-label">State</label>
// //           <input className="pm-input" value={D.location.state}
// //             onChange={e=>setLoc("state",e.target.value)} placeholder="e.g. Telangana" />
// //         </div>
// //         <div>
// //           <label className="pm-label">City</label>
// //           <input className="pm-input" value={D.location.city}
// //             onChange={e=>setLoc("city",e.target.value)} placeholder="e.g. Hyderabad" />
// //         </div>
// //       </div>
// //     </>
// //   ];

// //   /* ── BMI ── */
// //   const bmi = D.heightCm && D.weightKg
// //     ? (D.weightKg / ((D.heightCm/100)**2)).toFixed(1) : "—";

// //   return (
// //     <>
// //       <style>{CSS}</style>
// //       <div className="pm-wrap">

// //         {/* ════ LEFT ════ */}
// //         <div className="pm-left">
// //           <div className="pm-logo">◆ Athlete Dossier</div>

// //           <h1 className="pm-title">
// //             {editMode
// //               ? <>Build Your <em>Profile</em></>
// //               : <>Your <em>Profile</em></>}
// //           </h1>
// //           <p className="pm-subtitle">
// //             {editMode ? "Step " + (step+1) + " of " + steps.length : "Personal training dossier"}
// //           </p>

// //           {editMode && (
// //             <div className="pm-steps">
// //               {STEP_LABELS.map((l,i)=>(
// //                 <div key={i} className={`pm-step-dot ${i===step?"active":i<step?"done":""}`} />
// //               ))}
// //               <span className="pm-step-label">{STEP_LABELS[step]}</span>
// //             </div>
// //           )}

// //           {error && <div className="pm-error">⚠ {error}</div>}

// //           {editMode ? (
// //             <>
// //               {steps[step]}
// //               <div className="pm-nav">
// //                 {step > 0 && (
// //                   <button className="pm-btn-ghost" onClick={()=>setStep(s=>s-1)}>← Back</button>
// //                 )}
// //                 {step < steps.length - 1 ? (
// //                   <button className="pm-btn-primary" onClick={()=>setStep(s=>s+1)}>Continue →</button>
// //                 ) : (
// //                   <button className="pm-btn-primary" disabled={saving} onClick={handleSubmit}>
// //                     {saving ? "Saving…" : "Complete Profile ✦"}
// //                   </button>
// //                 )}
// //               </div>
// //             </>
// //           ) : (
// //             <>
// //               <div style={{color:"rgba(255,255,255,0.55)",fontSize:13,lineHeight:1.8}}>
// //                 <p>Your profile is complete. All training plans and nutrition recommendations are calibrated to your specifications.</p>
// //               </div>
// //               <div className="pm-nav" style={{marginTop:32}}>
// //                 <button className="pm-btn-primary" onClick={()=>{setEditMode(true);setStep(0);}}>
// //                   Edit Profile
// //                 </button>
// //               </div>
// //             </>
// //           )}
// //         </div>

// //         {/* ════ RIGHT ════ */}
// //         <div className="pm-right">
// //           <div className="pm-display-header">◆ Live Preview</div>

// //           <div className="pm-monogram-ring">
// //             <span className="pm-monogram">{initials}</span>
// //           </div>

// //           <div className="pm-display-name">
// //             {D.age ? `${D.gender==="male"?"Mr.":"Ms."} Athlete` : "Your Profile"}
// //           </div>
// //           <div className="pm-display-sub">
// //             {capsFirst(D.experienceLevel)} · {fmtGoal(D.fitnessGoal)}
// //           </div>

// //           <div className="pm-divider" />

// //           <div className="pm-stat-grid">
// //             <div className="pm-stat">
// //               <div className="pm-stat-label">Age</div>
// //               <div className="pm-stat-value">{D.age || "—"}<span className="pm-stat-unit">yrs</span></div>
// //             </div>
// //             <div className="pm-stat">
// //               <div className="pm-stat-label">BMI</div>
// //               <div className="pm-stat-value">{bmi}</div>
// //             </div>
// //             <div className="pm-stat">
// //               <div className="pm-stat-label">Height</div>
// //               <div className="pm-stat-value">{D.heightCm||"—"}<span className="pm-stat-unit">cm</span></div>
// //             </div>
// //             <div className="pm-stat">
// //               <div className="pm-stat-label">Weight</div>
// //               <div className="pm-stat-value">{D.weightKg||"—"}<span className="pm-stat-unit">kg</span></div>
// //             </div>
// //             <div className="pm-stat">
// //               <div className="pm-stat-label">Session</div>
// //               <div className="pm-stat-value">{D.dailyTimeMinutes}<span className="pm-stat-unit">min</span></div>
// //             </div>
// //             <div className="pm-stat">
// //               <div className="pm-stat-label">Days / Week</div>
// //               <div className="pm-stat-value">{D.workoutDaysPerWeek}</div>
// //             </div>
// //             <div className="pm-stat">
// //               <div className="pm-stat-label">Activity</div>
// //               <div className="pm-stat-value" style={{fontSize:16}}>{capsFirst(D.dailyActivityLevel)}</div>
// //             </div>
// //             <div className="pm-stat">
// //               <div className="pm-stat-label">Gym</div>
// //               <div className="pm-stat-value" style={{fontSize:16,color: D.gymAccess?"#FF8C00":"rgba(255,255,255,0.3)"}}>
// //                 {D.gymAccess?"Access":"No Gym"}
// //               </div>
// //             </div>
// //           </div>

// //           <div className="pm-tag-row">
// //             {D.fitnessGoal    && <span className="pm-tag gold">{fmtGoal(D.fitnessGoal)}</span>}
// //             {D.dietPreference && <span className="pm-tag">{capsFirst(D.dietPreference)}</span>}
// //             {D.experienceLevel && <span className="pm-tag">{capsFirst(D.experienceLevel)}</span>}
// //             {D.foodBudgetPerDay && <span className="pm-tag">Budget: {D.foodBudgetPerDay}</span>}
// //           </div>

// //           {D.equipmentAvailable.length > 0 && (
// //             <div style={{marginTop:20}}>
// //               <div style={{fontSize:"8px",letterSpacing:"3px",textTransform:"uppercase",color:"rgba(255,255,255,0.3)",marginBottom:8,fontWeight:700}}>Equipment</div>
// //               <div className="pm-tag-row">
// //                 {D.equipmentAvailable.map(e=><span key={e} className="pm-tag">{e.replace(/_/g," ")}</span>)}
// //               </div>
// //             </div>
// //           )}

// //           {(D.medicalConditions.length > 0 || D.injuries.length > 0) && (
// //             <div style={{marginTop:20}}>
// //               <div style={{fontSize:"8px",letterSpacing:"3px",textTransform:"uppercase",color:"rgba(255,255,255,0.3)",marginBottom:8,fontWeight:700}}>Health Notes</div>
// //               <div className="pm-tag-row">
// //                 {D.medicalConditions.map(m=><span key={m} className="pm-tag" style={{borderColor:"rgba(239,68,68,0.3)",color:"#f87171"}}>{m.replace(/_/g," ")}</span>)}
// //                 {D.injuries.map(i=><span key={i} className="pm-tag" style={{borderColor:"rgba(255,106,0,0.3)",color:"#FF8C00"}}>{i}</span>)}
// //               </div>
// //             </div>
// //           )}

// //           {(D.location.city || D.location.country) && (
// //             <div className="pm-location-row">
// //               <div className="pm-loc-dot" />
// //               {[D.location.city, D.location.state, D.location.country].filter(Boolean).join(", ")}
// //             </div>
// //           )}
// //         </div>

// //       </div>
// //     </>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { profileAPI } from "../api/axios";

// /* ─── Inline styles ───────────────────────────────────────────── */
// const CSS = `
//   .pm-wrap {
//     display: flex; min-height: 100vh;
//     background: var(--epa-bg);
//     font-family: var(--epa-sans);
//     color: var(--epa-text);
//   }

//   /* ── LEFT FORM PANEL ── */
//   .pm-left {
//     width: 52%; padding: 52px 48px 52px 52px;
//     border-right: 1px solid var(--epa-border);
//     overflow-y: auto;
//     background: var(--epa-surface);
//     position: relative;
//   }
//   .pm-left::before {
//     content: '';
//     position: absolute; inset: 0;
//     background: radial-gradient(ellipse 60% 35% at 10% 5%, rgba(198,167,94,0.05) 0%, transparent 70%);
//     pointer-events: none;
//   }
//   .pm-left::after {
//     content: '';
//     position: absolute; top: 0; left: 0; right: 0;
//     height: 2px;
//     background: rgba(198,167,94,0.55);
//   }

//   .pm-logo {
//     font-family: var(--epa-serif);
//     font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
//     color: var(--epa-gold); margin-bottom: 44px; opacity: .85;
//     font-weight: 600;
//   }

//   .pm-title {
//     font-family: var(--epa-serif);
//     font-size: 2.6rem; font-weight: 600; line-height: 1.05;
//     color: var(--epa-text); margin-bottom: 8px; letter-spacing: -0.01em;
//   }
//   .pm-title em { font-style: italic; color: var(--epa-gold); }

//   .pm-subtitle {
//     font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
//     color: var(--epa-muted); margin-bottom: 44px; font-weight: 600;
//   }

//   /* ── STEP INDICATOR ── */
//   .pm-steps {
//     display: flex; gap: 5px; margin-bottom: 36px; align-items: center;
//   }
//   .pm-step-dot {
//     height: 1px; border-radius: 1px;
//     transition: background .3s, width .3s;
//     background: rgba(198,167,94,0.15); width: 20px;
//   }
//   .pm-step-dot.active { background: var(--epa-gold); width: 36px; }
//   .pm-step-dot.done   { background: rgba(198,167,94,0.5); width: 20px; }
//   .pm-step-label {
//     font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase;
//     color: var(--epa-muted); margin-left: 10px; font-weight: 600;
//   }

//   /* ── SECTION TITLE ── */
//   .pm-section-title {
//     font-family: var(--epa-serif);
//     font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
//     color: var(--epa-gold); margin-bottom: 16px; margin-top: 28px;
//     display: flex; align-items: center; gap: 12px; font-weight: 600;
//   }
//   .pm-section-title::after {
//     content: ''; flex: 1; height: 1px;
//     background: rgba(198,167,94,0.18);
//   }

//   .pm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
//   .pm-full { grid-column: span 2; }

//   .pm-label {
//     display: block; font-size: 9px; letter-spacing: 0.16em;
//     text-transform: uppercase; color: var(--epa-muted);
//     margin-bottom: 6px; font-weight: 700;
//   }

//   .pm-input, .pm-select {
//     width: 100%;
//     background: var(--epa-bg);
//     border: 1px solid rgba(198,167,94,0.18); border-radius: 8px;
//     color: var(--epa-text); font-family: var(--epa-sans);
//     font-size: 13px; padding: 12px 14px;
//     outline: none; transition: border-color .2s, background .2s;
//     box-sizing: border-box;
//     -moz-appearance: none; -webkit-appearance: none; appearance: none;
//   }
//   .pm-input::placeholder { color: rgba(161,161,161,0.3); }
//   .pm-input:focus, .pm-select:focus {
//     border-color: rgba(198,167,94,0.55);
//     background: rgba(198,167,94,0.02);
//   }
//   .pm-select {
//     cursor: pointer;
//     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C6A75E' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
//     background-repeat: no-repeat; background-position: right 14px center;
//     background-color: var(--epa-bg);
//     padding-right: 36px;
//   }
//   .pm-select option { background: #1C1C1C; color: #E8E6E3; }

//   /* chips */
//   .pm-chips { display: flex; flex-wrap: wrap; gap: 7px; }
//   .pm-chip {
//     padding: 6px 14px;
//     border: 1px solid rgba(198,167,94,0.15); border-radius: 20px;
//     font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase;
//     color: var(--epa-muted); cursor: pointer; transition: all .2s;
//     background: transparent; font-family: var(--epa-sans); font-weight: 600;
//   }
//   .pm-chip:hover  { border-color: var(--epa-gold); color: var(--epa-gold); }
//   .pm-chip.active {
//     border-color: var(--epa-gold);
//     color: #111111; background: var(--epa-gold);
//   }

//   /* slider */
//   .pm-slider-wrap { display: flex; align-items: center; gap: 16px; }
//   .pm-slider {
//     flex: 1; -webkit-appearance: none; appearance: none;
//     height: 2px; background: rgba(198,167,94,0.15); border-radius: 2px; outline: none;
//   }
//   .pm-slider::-webkit-slider-thumb {
//     -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%;
//     background: var(--epa-gold); cursor: pointer;
//     border: 2px solid var(--epa-bg);
//     box-shadow: 0 0 0 1px var(--epa-gold);
//   }
//   .pm-slider-val {
//     font-family: var(--epa-serif); font-size: 24px;
//     color: var(--epa-gold);
//     min-width: 40px; text-align: right; letter-spacing: -0.01em; font-weight: 600;
//   }

//   /* toggle */
//   .pm-toggle-row { display: flex; align-items: center; gap: 14px; }
//   .pm-toggle-switch {
//     position: relative; width: 40px; height: 22px;
//     background: rgba(255,255,255,0.07); border-radius: 11px; cursor: pointer;
//     transition: background .2s; flex-shrink: 0;
//     border: 1px solid rgba(198,167,94,0.15);
//   }
//   .pm-toggle-switch.on {
//     background: var(--epa-gold);
//     border-color: var(--epa-gold);
//   }
//   .pm-toggle-switch::after {
//     content: ''; position: absolute; width: 16px; height: 16px;
//     border-radius: 50%; background: var(--epa-bg); top: 2px; left: 2px;
//     transition: left .2s;
//   }
//   .pm-toggle-switch.on::after { left: 20px; }
//   .pm-toggle-label {
//     font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
//     color: var(--epa-muted); font-weight: 600;
//   }

//   /* error */
//   .pm-error {
//     padding: 12px 16px;
//     background: rgba(92,26,26,0.3);
//     border: 1px solid rgba(92,26,26,0.5); border-radius: 8px;
//     font-size: 12px; color: #E57373; margin-bottom: 20px;
//   }

//   /* nav buttons */
//   .pm-nav { display: flex; gap: 12px; margin-top: 40px; }
//   .pm-btn-ghost {
//     flex: 1; padding: 14px;
//     border: 1px solid rgba(198,167,94,0.25); border-radius: 8px;
//     background: transparent; color: var(--epa-muted);
//     font-family: var(--epa-sans);
//     font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
//     cursor: pointer; transition: all .2s; font-weight: 700;
//   }
//   .pm-btn-ghost:hover { border-color: var(--epa-gold); color: var(--epa-gold); }
//   .pm-btn-primary {
//     flex: 2; padding: 14px;
//     border: none; border-radius: 8px;
//     background: var(--epa-gold);
//     color: #111111;
//     font-family: var(--epa-sans); font-size: 10px; letter-spacing: 0.14em;
//     text-transform: uppercase; cursor: pointer; transition: background .2s;
//     font-weight: 700; box-shadow: 0 4px 20px rgba(198,167,94,0.2);
//   }
//   .pm-btn-primary:hover { background: #b8954f; }
//   .pm-btn-primary:disabled { opacity: .45; cursor: not-allowed; }

//   /* ── RIGHT PANEL ── */
//   .pm-right {
//     width: 48%; padding: 52px 48px;
//     background: var(--epa-bg);
//     position: sticky; top: 0; height: 100vh; overflow-y: auto;
//   }

//   .pm-display-header {
//     font-family: var(--epa-serif);
//     font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
//     color: var(--epa-gold); margin-bottom: 36px; font-weight: 600;
//   }

//   .pm-monogram-ring {
//     width: 88px; height: 88px; border-radius: 50%;
//     border: 1px solid rgba(198,167,94,0.5);
//     display: flex; align-items: center; justify-content: center;
//     margin-bottom: 24px; position: relative;
//     background: rgba(198,167,94,0.05);
//   }
//   .pm-monogram-ring::before {
//     content: ''; position: absolute; inset: -6px; border-radius: 50%;
//     border: 1px solid rgba(198,167,94,0.15);
//   }
//   .pm-monogram {
//     font-family: var(--epa-serif); font-size: 32px; font-weight: 600;
//     color: var(--epa-gold); letter-spacing: 0.05em;
//   }

//   .pm-display-name {
//     font-family: var(--epa-serif); font-size: 2rem; font-weight: 600;
//     color: var(--epa-text); margin-bottom: 4px; letter-spacing: -0.01em;
//   }
//   .pm-display-sub {
//     font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase;
//     color: var(--epa-muted); margin-bottom: 32px; font-weight: 600;
//   }

//   .pm-divider {
//     width: 40px; height: 2px; background: var(--epa-gold);
//     margin-bottom: 28px; border-radius: 2px;
//   }

//   .pm-stat-grid {
//     display: grid; grid-template-columns: 1fr 1fr; gap: 0;
//     border: 1px solid var(--epa-border); border-radius: 8px; overflow: hidden;
//   }
//   .pm-stat {
//     padding: 16px 16px;
//     border-bottom: 1px solid rgba(198,167,94,0.08);
//     border-right: 1px solid rgba(198,167,94,0.08);
//   }
//   .pm-stat:nth-child(2n)        { border-right: none; }
//   .pm-stat:nth-last-child(-n+2) { border-bottom: none; }
//   .pm-stat-label {
//     font-size: 8px; letter-spacing: 0.2em; text-transform: uppercase;
//     color: var(--epa-muted); margin-bottom: 5px; font-weight: 700;
//   }
//   .pm-stat-value {
//     font-family: var(--epa-serif); font-size: 22px;
//     color: var(--epa-text); line-height: 1; letter-spacing: -0.01em; font-weight: 600;
//   }
//   .pm-stat-unit {
//     font-size: 10px; color: var(--epa-muted); letter-spacing: 0.05em;
//     margin-left: 3px; font-family: var(--epa-sans);
//   }

//   .pm-tag-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 20px; }
//   .pm-tag {
//     padding: 4px 11px;
//     border: 1px solid rgba(198,167,94,0.12); border-radius: 20px;
//     font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase;
//     color: var(--epa-muted); font-weight: 700;
//   }
//   .pm-tag.gold {
//     border-color: rgba(198,167,94,0.35);
//     color: var(--epa-gold);
//     background: rgba(198,167,94,0.07);
//   }

//   .pm-location-row {
//     display: flex; align-items: center; gap: 8px; margin-top: 24px;
//     padding-top: 20px; border-top: 1px solid rgba(198,167,94,0.08);
//     font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
//     color: var(--epa-muted); font-weight: 600;
//   }
//   .pm-loc-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--epa-gold); flex-shrink: 0; }

//   .pm-loading {
//     min-height: 100vh; display: flex; align-items: center; justify-content: center;
//     background: var(--epa-bg); font-family: var(--epa-serif);
//     font-size: 1.5rem; color: var(--epa-gold); letter-spacing: 0.1em;
//   }

//   @media (max-width: 900px) {
//     .pm-wrap { flex-direction: column; }
//     .pm-left, .pm-right { width: 100%; position: static; height: auto; }
//     .pm-right { border-top: 1px solid var(--epa-border); }
//   }
// `;

// /* ─── CONSTANTS ─────────────────────────────────────────────── */
// const GOALS        = ["fat_loss","muscle_gain","endurance","flexibility","general_fitness"];
// const EXPERIENCES  = ["beginner","intermediate","advanced"];
// const ACTIVITY     = ["sedentary","light","moderate","active","very_active"];
// const DIET_PREFS   = ["veg","non_veg","vegan","keto","paleo","mediterranean"];
// const EQUIPMENT    = ["dumbbell","barbell","machine","resistance_band","kettlebell","pull_up_bar","bench","cable"];
// const MEDICAL_LIST = ["diabetes","hypertension","asthma","heart_condition","joint_pain","back_pain"];
// const INJURY_LIST  = ["knee","shoulder","lower_back","wrist","ankle","hip","neck"];
// const STEP_LABELS  = ["Vitals","Training","Nutrition","Location"];

// /* ─── HELPERS ──────────────────────────────────────────────── */
// const fmtGoal   = v => v?.replace(/_/g," ") || "—";
// const capsFirst = v => v ? v.charAt(0).toUpperCase() + v.slice(1) : "—";

// const BLANK_FORM = {
//   age: "", gender: "male", heightCm: "", weightKg: "",
//   fitnessGoal: "fat_loss", experienceLevel: "beginner",
//   dailyTimeMinutes: 45, workoutDaysPerWeek: 3,
//   dailyActivityLevel: "moderate", gymAccess: false,
//   equipmentAvailable: [], medicalConditions: [], injuries: [],
//   foodBudgetPerDay: "", dietPreference: "non_veg",
//   location: { city: "", state: "", country: "" },
// };

// export default function Profile() {
//   const { user } = useAuth();

//   // BUG FIX 4: user._id || user.id — auth context may use either
//   const userId = user?._id || user?.id;

//   const [loading,      setLoading]      = useState(true);
//   const [saving,       setSaving]       = useState(false);
//   // BUG FIX 2: isNewProfile tracks whether to POST or PUT, separate from editMode
//   const [isNewProfile, setIsNewProfile] = useState(false);
//   const [editMode,     setEditMode]     = useState(false);
//   const [error,        setError]        = useState("");
//   const [step,         setStep]         = useState(0);
//   const [form,         setForm]         = useState(BLANK_FORM);

//   /* ── FETCH ── */
//   useEffect(() => {
//     if (!userId) return;
//     const fetchProfile = async () => {
//       try {
//         const res = await profileAPI.get(userId);
//         // res.data is null when backend returns 200 with null (no profile yet)
//         if (res.data && res.data._id) {
//           setForm({
//             ...BLANK_FORM,
//             ...res.data,
//             equipmentAvailable: res.data.equipmentAvailable || [],
//             medicalConditions:  res.data.medicalConditions  || [],
//             injuries:           res.data.injuries           || [],
//             location: res.data.location || { city: "", state: "", country: "" },
//           });
//           setIsNewProfile(false);
//           setEditMode(false);
//         } else {
//           // 200 but null — no profile exists yet
//           setIsNewProfile(true);
//           setEditMode(true);
//         }
//       } catch {
//         // 404 or any network error — no profile, go to creation mode
//         setIsNewProfile(true);
//         setEditMode(true);
//       }
//       setLoading(false);
//     };
//     fetchProfile();
//   }, [userId]);

//   /* ── HANDLERS ── */
//   const set       = (key, val) => setForm(p => ({ ...p, [key]: val }));
//   const setLoc    = (key, val) => setForm(p => ({ ...p, location: { ...p.location, [key]: val } }));
//   const toggleArr = (key, val) =>
//     setForm(p => ({
//       ...p,
//       [key]: p[key].includes(val) ? p[key].filter(x => x !== val) : [...p[key], val],
//     }));

//   /* ── SAVE ── */
//   // BUG FIX 2: use isNewProfile to pick the right API call
//   const handleSubmit = async () => {
//     setSaving(true);
//     setError("");
//     try {
//       const payload = { ...form, userId };
//       if (isNewProfile) {
//         await profileAPI.createOrUpdate(payload);
//         setIsNewProfile(false);   // now it exists — future saves are updates
//       } else {
//         await profileAPI.update(userId, payload);
//       }
//       setEditMode(false);
//       setStep(0);               // BUG FIX 3: reset step so re-edit starts at step 0
//     } catch (err) {
//       setError(err.response?.data?.message || "Save failed");
//     }
//     setSaving(false);
//   };

//   /* ── DERIVED ── */
//   const D        = form;
//   // BUG FIX 5: use actual user name instead of "Mr. Athlete"
//   const initials = user?.name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "—";
//   const bmi      = D.heightCm && D.weightKg
//     ? (D.weightKg / ((D.heightCm / 100) ** 2)).toFixed(1) : "—";

//   if (loading) return (
//     <>
//       <style>{CSS}</style>
//       <div className="pm-loading">Preparing your dossier…</div>
//     </>
//   );

//   /* ── STEP CONTENT ── */
//   const steps = [

//     /* 0 – Vitals */
//     <div key="vitals">
//       <div className="pm-section-title">Personal</div>
//       <div className="pm-grid">
//         <div>
//           <label className="pm-label">Age</label>
//           <input className="pm-input" type="number" value={D.age}
//             onChange={e => set("age", e.target.value)} placeholder="e.g. 24" />
//         </div>
//         <div>
//           <label className="pm-label">Gender</label>
//           <select className="pm-select" value={D.gender} onChange={e => set("gender", e.target.value)}>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//         </div>
//         <div>
//           <label className="pm-label">Height (cm)</label>
//           <input className="pm-input" type="number" value={D.heightCm}
//             onChange={e => set("heightCm", e.target.value)} placeholder="e.g. 175" />
//         </div>
//         <div>
//           <label className="pm-label">Weight (kg)</label>
//           <input className="pm-input" type="number" value={D.weightKg}
//             onChange={e => set("weightKg", e.target.value)} placeholder="e.g. 72" />
//         </div>
//       </div>

//       <div className="pm-section-title">Medical History</div>
//       <div className="pm-full">
//         <label className="pm-label">Conditions (select all that apply)</label>
//         <div className="pm-chips">
//           {MEDICAL_LIST.map(m => (
//             <button key={m} type="button"
//               className={`pm-chip ${D.medicalConditions.includes(m) ? "active" : ""}`}
//               onClick={() => toggleArr("medicalConditions", m)}>
//               {m.replace(/_/g, " ")}
//             </button>
//           ))}
//           {/* BUG FIX 1: was ":none" (typo), now correctly "none" */}
//           <button type="button"
//             className={`pm-chip ${D.medicalConditions.includes("none") ? "active" : ""}`}
//             onClick={() => set("medicalConditions", D.medicalConditions.includes("none") ? [] : ["none"])}>
//             None
//           </button>
//         </div>
//       </div>
//       <div className="pm-full" style={{ marginTop: 14 }}>
//         <label className="pm-label">Injuries</label>
//         <div className="pm-chips">
//           {INJURY_LIST.map(i => (
//             <button key={i} type="button"
//               className={`pm-chip ${D.injuries.includes(i) ? "active" : ""}`}
//               onClick={() => toggleArr("injuries", i)}>
//               {i}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>,

//     /* 1 – Training */
//     <div key="training">
//       <div className="pm-section-title">Goals</div>
//       <div className="pm-full">
//         <label className="pm-label">Primary Fitness Goal</label>
//         <div className="pm-chips">
//           {GOALS.map(g => (
//             <button key={g} type="button"
//               className={`pm-chip ${D.fitnessGoal === g ? "active" : ""}`}
//               onClick={() => set("fitnessGoal", g)}>
//               {fmtGoal(g)}
//             </button>
//           ))}
//         </div>
//       </div>
//       <div className="pm-full" style={{ marginTop: 14 }}>
//         <label className="pm-label">Experience Level</label>
//         <div className="pm-chips">
//           {EXPERIENCES.map(e => (
//             <button key={e} type="button"
//               className={`pm-chip ${D.experienceLevel === e ? "active" : ""}`}
//               onClick={() => set("experienceLevel", e)}>
//               {capsFirst(e)}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="pm-section-title">Schedule</div>
//       <div className="pm-full">
//         <label className="pm-label">Daily Session Time — {D.dailyTimeMinutes} min</label>
//         <div className="pm-slider-wrap">
//           <input type="range" className="pm-slider" min={15} max={120} step={5}
//             value={D.dailyTimeMinutes}
//             onChange={e => set("dailyTimeMinutes", +e.target.value)} />
//           <span className="pm-slider-val">{D.dailyTimeMinutes}</span>
//         </div>
//       </div>
//       <div className="pm-full" style={{ marginTop: 16 }}>
//         <label className="pm-label">Workout Days per Week — {D.workoutDaysPerWeek} days</label>
//         <div className="pm-slider-wrap">
//           <input type="range" className="pm-slider" min={1} max={7} step={1}
//             value={D.workoutDaysPerWeek}
//             onChange={e => set("workoutDaysPerWeek", +e.target.value)} />
//           <span className="pm-slider-val">{D.workoutDaysPerWeek}</span>
//         </div>
//       </div>

//       <div className="pm-section-title">Environment</div>
//       <div className="pm-full">
//         <label className="pm-label">Daily Activity Level</label>
//         <div className="pm-chips">
//           {ACTIVITY.map(a => (
//             <button key={a} type="button"
//               className={`pm-chip ${D.dailyActivityLevel === a ? "active" : ""}`}
//               onClick={() => set("dailyActivityLevel", a)}>
//               {fmtGoal(a)}
//             </button>
//           ))}
//         </div>
//       </div>
//       <div className="pm-full" style={{ marginTop: 16 }}>
//         <div className="pm-toggle-row">
//           <div className={`pm-toggle-switch ${D.gymAccess ? "on" : ""}`}
//             onClick={() => set("gymAccess", !D.gymAccess)} />
//           <span className="pm-toggle-label">Gym Access</span>
//         </div>
//       </div>
//       <div className="pm-full" style={{ marginTop: 14 }}>
//         <label className="pm-label">Equipment Available</label>
//         <div className="pm-chips">
//           {EQUIPMENT.map(eq => (
//             <button key={eq} type="button"
//               className={`pm-chip ${D.equipmentAvailable.includes(eq) ? "active" : ""}`}
//               onClick={() => toggleArr("equipmentAvailable", eq)}>
//               {eq.replace(/_/g, " ")}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>,

//     /* 2 – Nutrition */
//     <div key="nutrition">
//       <div className="pm-section-title">Diet & Nutrition</div>
//       <div className="pm-full">
//         <label className="pm-label">Diet Preference</label>
//         <div className="pm-chips">
//           {DIET_PREFS.map(d => (
//             <button key={d} type="button"
//               className={`pm-chip ${D.dietPreference === d ? "active" : ""}`}
//               onClick={() => set("dietPreference", d)}>
//               {capsFirst(d)}
//             </button>
//           ))}
//         </div>
//       </div>
//       <div className="pm-full" style={{ marginTop: 24 }}>
//         <label className="pm-label">Daily Food Budget (₹ or $)</label>
//         <input className="pm-input" type="number" value={D.foodBudgetPerDay}
//           onChange={e => set("foodBudgetPerDay", e.target.value)}
//           placeholder="e.g. 300" style={{ maxWidth: 240 }} />
//       </div>
//     </div>,

//     /* 3 – Location */
//     <div key="location">
//       <div className="pm-section-title">Location</div>
//       <div className="pm-grid">
//         <div className="pm-full">
//           <label className="pm-label">Country</label>
//           <input className="pm-input" value={D.location.country}
//             onChange={e => setLoc("country", e.target.value)} placeholder="e.g. India" />
//         </div>
//         <div>
//           <label className="pm-label">State</label>
//           <input className="pm-input" value={D.location.state}
//             onChange={e => setLoc("state", e.target.value)} placeholder="e.g. Telangana" />
//         </div>
//         <div>
//           <label className="pm-label">City</label>
//           <input className="pm-input" value={D.location.city}
//             onChange={e => setLoc("city", e.target.value)} placeholder="e.g. Hyderabad" />
//         </div>
//       </div>
//     </div>,
//   ];

//   /* ── RENDER ── */
//   return (
//     <>
//       <style>{CSS}</style>
//       <div className="pm-wrap">

//         {/* ════ LEFT ════ */}
//         <div className="pm-left">
//           <div className="pm-logo">◆ Athlete Dossier</div>

//           <h1 className="pm-title">
//             {editMode && isNewProfile
//               ? <>Build Your <em>Profile</em></>
//               : editMode
//                 ? <>Edit Your <em>Profile</em></>
//                 : <>Your <em>Profile</em></>
//             }
//           </h1>
//           <p className="pm-subtitle">
//             {editMode
//               ? `Step ${step + 1} of ${steps.length} — ${STEP_LABELS[step]}`
//               : "Personal training dossier"
//             }
//           </p>

//           {editMode && (
//             <div className="pm-steps">
//               {STEP_LABELS.map((l, i) => (
//                 <div key={i} className={`pm-step-dot ${i === step ? "active" : i < step ? "done" : ""}`} />
//               ))}
//               <span className="pm-step-label">{STEP_LABELS[step]}</span>
//             </div>
//           )}

//           {error && <div className="pm-error">⚠ {error}</div>}

//           {editMode ? (
//             <>
//               {steps[step]}
//               <div className="pm-nav">
//                 {step > 0 && (
//                   <button className="pm-btn-ghost" onClick={() => setStep(s => s - 1)}>← Back</button>
//                 )}
//                 {step < steps.length - 1 ? (
//                   <button className="pm-btn-primary" onClick={() => setStep(s => s + 1)}>
//                     Continue →
//                   </button>
//                 ) : (
//                   <button className="pm-btn-primary" disabled={saving} onClick={handleSubmit}>
//                     {saving ? "Saving…" : isNewProfile ? "Complete Profile ✦" : "Save Changes ✦"}
//                   </button>
//                 )}
//               </div>
//             </>
//           ) : (
//             <>
//               <div style={{ color: "var(--epa-muted)", fontSize: 13, lineHeight: 1.8 }}>
//                 <p>Your profile is complete. All training plans and nutrition recommendations are calibrated to your specifications.</p>
//               </div>
//               <div className="pm-nav" style={{ marginTop: 32 }}>
//                 <button className="pm-btn-primary" onClick={() => { setEditMode(true); setStep(0); }}>
//                   Edit Profile
//                 </button>
//               </div>
//             </>
//           )}
//         </div>

//         {/* ════ RIGHT ════ */}
//         <div className="pm-right">
//           <div className="pm-display-header">◆ Live Preview</div>

//           <div className="pm-monogram-ring">
//             <span className="pm-monogram">{initials}</span>
//           </div>

//           {/* BUG FIX 5: show actual user name */}
//           <div className="pm-display-name">{user?.name || "Athlete"}</div>
//           <div className="pm-display-sub">
//             {capsFirst(D.experienceLevel)} · {fmtGoal(D.fitnessGoal)}
//           </div>

//           <div className="pm-divider" />

//           <div className="pm-stat-grid">
//             <div className="pm-stat">
//               <div className="pm-stat-label">Age</div>
//               <div className="pm-stat-value">{D.age || "—"}<span className="pm-stat-unit">yrs</span></div>
//             </div>
//             <div className="pm-stat">
//               <div className="pm-stat-label">BMI</div>
//               <div className="pm-stat-value">{bmi}</div>
//             </div>
//             <div className="pm-stat">
//               <div className="pm-stat-label">Height</div>
//               <div className="pm-stat-value">{D.heightCm || "—"}<span className="pm-stat-unit">cm</span></div>
//             </div>
//             <div className="pm-stat">
//               <div className="pm-stat-label">Weight</div>
//               <div className="pm-stat-value">{D.weightKg || "—"}<span className="pm-stat-unit">kg</span></div>
//             </div>
//             <div className="pm-stat">
//               <div className="pm-stat-label">Session</div>
//               <div className="pm-stat-value">{D.dailyTimeMinutes}<span className="pm-stat-unit">min</span></div>
//             </div>
//             <div className="pm-stat">
//               <div className="pm-stat-label">Days / Week</div>
//               <div className="pm-stat-value">{D.workoutDaysPerWeek}</div>
//             </div>
//             <div className="pm-stat">
//               <div className="pm-stat-label">Activity</div>
//               <div className="pm-stat-value" style={{ fontSize: 15 }}>{capsFirst(D.dailyActivityLevel)}</div>
//             </div>
//             <div className="pm-stat">
//               <div className="pm-stat-label">Gym</div>
//               <div className="pm-stat-value" style={{ fontSize: 15, color: D.gymAccess ? "var(--epa-gold)" : "var(--epa-muted)" }}>
//                 {D.gymAccess ? "Access" : "No Gym"}
//               </div>
//             </div>
//           </div>

//           <div className="pm-tag-row">
//             {D.fitnessGoal     && <span className="pm-tag gold">{fmtGoal(D.fitnessGoal)}</span>}
//             {D.dietPreference  && <span className="pm-tag">{capsFirst(D.dietPreference)}</span>}
//             {D.experienceLevel && <span className="pm-tag">{capsFirst(D.experienceLevel)}</span>}
//             {D.foodBudgetPerDay && <span className="pm-tag">Budget: {D.foodBudgetPerDay}</span>}
//           </div>

//           {D.equipmentAvailable.length > 0 && (
//             <div style={{ marginTop: 20 }}>
//               <div style={{ fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--epa-muted)", marginBottom: 8, fontWeight: 700 }}>
//                 Equipment
//               </div>
//               <div className="pm-tag-row">
//                 {D.equipmentAvailable.map(e => (
//                   <span key={e} className="pm-tag">{e.replace(/_/g, " ")}</span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {(D.medicalConditions.length > 0 || D.injuries.length > 0) && (
//             <div style={{ marginTop: 20 }}>
//               <div style={{ fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--epa-muted)", marginBottom: 8, fontWeight: 700 }}>
//                 Health Notes
//               </div>
//               <div className="pm-tag-row">
//                 {D.medicalConditions.filter(m => m !== "none").map(m => (
//                   <span key={m} className="pm-tag" style={{ borderColor: "rgba(92,26,26,0.5)", color: "#E57373" }}>
//                     {m.replace(/_/g, " ")}
//                   </span>
//                 ))}
//                 {D.injuries.map(i => (
//                   <span key={i} className="pm-tag" style={{ borderColor: "rgba(198,167,94,0.3)", color: "var(--epa-gold)" }}>
//                     {i}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {(D.location.city || D.location.country) && (
//             <div className="pm-location-row">
//               <div className="pm-loc-dot" />
//               {[D.location.city, D.location.state, D.location.country].filter(Boolean).join(", ")}
//             </div>
//           )}
//         </div>

//       </div>
//     </>
//   );
// }


import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { profileAPI } from "../api/axios";

const GOALS        = ["fat_loss","muscle_gain","endurance","flexibility","general_fitness"];
const EXPERIENCES  = ["beginner","intermediate","advanced"];
const ACTIVITY     = ["sedentary","light","moderate","active","very_active"];
const DIET_PREFS   = ["veg","non_veg","vegan","keto","paleo","mediterranean"];
const EQUIPMENT    = ["dumbbell","barbell","machine","resistance_band","kettlebell","pull_up_bar","bench","cable"];
const MEDICAL_LIST = ["diabetes","hypertension","asthma","heart_condition","joint_pain","back_pain"];
const INJURY_LIST  = ["knee","shoulder","lower_back","wrist","ankle","hip","neck"];
const STEP_LABELS  = ["Vitals","Training","Nutrition","Location"];

const fmtGoal   = v => v?.replace(/_/g," ") || "—";
const capsFirst = v => v ? v.charAt(0).toUpperCase() + v.slice(1) : "—";

const BLANK = {
  age:"", gender:"male", heightCm:"", weightKg:"",
  fitnessGoal:"fat_loss", experienceLevel:"beginner",
  dailyTimeMinutes:45, workoutDaysPerWeek:3,
  dailyActivityLevel:"moderate", gymAccess:false,
  equipmentAvailable:[], medicalConditions:[], injuries:[],
  foodBudgetPerDay:"", dietPreference:"non_veg",
  location:{ city:"", state:"", country:"" },
};

/* ── shared tokens ── */
const glass = {
  background:"rgba(255,255,255,0.85)",
  backdropFilter:"blur(16px)",
  WebkitBackdropFilter:"blur(16px)",
  border:"1px solid rgba(255,255,255,0.9)",
  boxShadow:"0 4px 24px rgba(99,102,241,0.08), 0 1px 4px rgba(0,0,0,0.04)",
};

/* ── micro components ── */
function Label({ children }) {
  return <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.16em", textTransform:"uppercase", color:"#94a3b8", marginBottom:6 }}>{children}</p>;
}

function SectionTitle({ children }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, margin:"28px 0 16px", fontSize:10, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#6366f1" }}>
      {children}
      <div style={{ flex:1, height:1, background:"rgba(99,102,241,0.12)" }} />
    </div>
  );
}

function Field({ label, children }) {
  return <div><Label>{label}</Label>{children}</div>;
}

function TextInput({ value, onChange, type="text", placeholder, style }) {
  return (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}
      style={{ width:"100%", background:"rgba(238,242,255,0.5)", border:"1px solid #e0e7ff", borderRadius:10, color:"#0f172a", fontFamily:"'Outfit',sans-serif", fontSize:13, padding:"11px 14px", outline:"none", boxSizing:"border-box", transition:"border-color 0.2s", ...style }}
      onFocus={e => e.target.style.borderColor="#6366f1"}
      onBlur={e  => e.target.style.borderColor="#e0e7ff"}
    />
  );
}

function SelectInput({ value, onChange, children }) {
  return (
    <select value={value} onChange={onChange}
      style={{ width:"100%", background:"rgba(238,242,255,0.5)", border:"1px solid #e0e7ff", borderRadius:10, color:"#0f172a", fontFamily:"'Outfit',sans-serif", fontSize:13, padding:"11px 14px", outline:"none", cursor:"pointer", appearance:"none", WebkitAppearance:"none", boxSizing:"border-box",
        backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236366f1' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat:"no-repeat", backgroundPosition:"right 14px center", paddingRight:36 }}>
      {children}
    </select>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button type="button" onClick={onClick}
      style={{ padding:"6px 14px", borderRadius:999, fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer", transition:"all 0.2s", fontFamily:"'Outfit',sans-serif", border:"none",
        background: active ? "linear-gradient(135deg,#2563eb,#6366f1)" : "rgba(238,242,255,0.7)",
        color: active ? "white" : "#64748b",
        boxShadow: active ? "0 2px 8px rgba(99,102,241,0.25)" : "inset 0 0 0 1px #e0e7ff",
      }}>
      {children}
    </button>
  );
}

function SliderField({ label, value, min, max, step=1, unit="", onChange }) {
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
        <Label>{label}</Label>
        <span style={{ fontSize:"1.25rem", fontWeight:800, color:"#6366f1" }}>{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(+e.target.value)}
        style={{ width:"100%", accentColor:"#6366f1", cursor:"pointer" }} />
      <div style={{ display:"flex", justifyContent:"space-between", marginTop:4, fontSize:9, color:"#d1d5db" }}>
        <span>{min}{unit}</span><span>{max}{unit}</span>
      </div>
    </div>
  );
}

function Toggle({ value, onChange, label }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:14 }}>
      <div onClick={() => onChange(!value)}
        style={{ position:"relative", width:44, height:24, borderRadius:12, cursor:"pointer", transition:"background 0.2s", flexShrink:0,
          background: value ? "linear-gradient(135deg,#2563eb,#6366f1)" : "rgba(226,232,240,0.8)",
          boxShadow: value ? "0 2px 8px rgba(99,102,241,0.3)" : "inset 0 0 0 1px #e0e7ff",
        }}>
        <div style={{ position:"absolute", width:18, height:18, borderRadius:"50%", background:"white", top:3, left: value ? 23 : 3, transition:"left 0.2s", boxShadow:"0 1px 4px rgba(0,0,0,0.15)" }} />
      </div>
      <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#64748b" }}>{label}</span>
    </div>
  );
}

function ChipGroup({ items, active, onToggle, isMulti=true }) {
  return (
    <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
      {items.map(({ val, label }) => (
        <Chip key={val} active={isMulti ? active.includes(val) : active === val} onClick={() => onToggle(val)}>
          {label}
        </Chip>
      ))}
    </div>
  );
}

/* ── right-panel stat cell ── */
function StatCell({ label, value, unit, color, fontSize=22, borderR=true, borderB=true }) {
  return (
    <div style={{ padding:"14px 16px", borderBottom: borderB ? "1px solid rgba(226,232,240,0.6)" : "none", borderRight: borderR ? "1px solid rgba(226,232,240,0.6)" : "none" }}>
      <p style={{ fontSize:8, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#94a3b8", marginBottom:5 }}>{label}</p>
      <p style={{ fontSize, fontWeight:800, color: color||"#0f172a", lineHeight:1 }}>
        {value||"—"}{unit && <span style={{ fontSize:10, fontWeight:400, color:"#94a3b8", marginLeft:3 }}>{unit}</span>}
      </p>
    </div>
  );
}

/* ── tag pill ── */
function TagPill({ children, variant="default" }) {
  const styles = {
    default: { background:"rgba(226,232,240,0.5)", border:"1px solid #e0e7ff", color:"#64748b" },
    indigo:  { background:"rgba(99,102,241,0.1)",  border:"1px solid rgba(99,102,241,0.2)", color:"#6366f1" },
    red:     { background:"#fff1f2", border:"1px solid #fecdd3", color:"#f43f5e" },
    blue:    { background:"rgba(238,242,255,0.8)", border:"1px solid #c7d2fe", color:"#6366f1" },
  };
  return (
    <span style={{ padding:"4px 11px", borderRadius:999, fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", ...styles[variant] }}>
      {children}
    </span>
  );
}

/* ════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════ */
export default function Profile() {
  const { user } = useAuth();
  const userId   = user?._id || user?.id;

  const [loading,      setLoading]      = useState(true);
  const [saving,       setSaving]       = useState(false);
  const [isNewProfile, setIsNewProfile] = useState(false);
  const [editMode,     setEditMode]     = useState(false);
  const [error,        setError]        = useState("");
  const [step,         setStep]         = useState(0);
  const [form,         setForm]         = useState(BLANK);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const res = await profileAPI.get(userId);
        if (res.data && res.data._id) {
          setForm({ ...BLANK, ...res.data,
            equipmentAvailable: res.data.equipmentAvailable || [],
            medicalConditions:  res.data.medicalConditions  || [],
            injuries:           res.data.injuries           || [],
            location: res.data.location || { city:"", state:"", country:"" },
          });
          setIsNewProfile(false); setEditMode(false);
        } else { setIsNewProfile(true); setEditMode(true); }
      } catch { setIsNewProfile(true); setEditMode(true); }
      setLoading(false);
    })();
  }, [userId]);

  const set       = (k,v) => setForm(p => ({ ...p, [k]:v }));
  const setLoc    = (k,v) => setForm(p => ({ ...p, location:{ ...p.location, [k]:v } }));
  const toggleArr = (k,v) => setForm(p => ({ ...p, [k]: p[k].includes(v) ? p[k].filter(x=>x!==v) : [...p[k],v] }));

  const handleSubmit = async () => {
    setSaving(true); setError("");
    try {
      const payload = { ...form, userId };
      if (isNewProfile) { await profileAPI.createOrUpdate(payload); setIsNewProfile(false); }
      else               { await profileAPI.update(userId, payload); }
      setEditMode(false); setStep(0);
    } catch (err) { setError(err.response?.data?.message || "Save failed"); }
    setSaving(false);
  };

  const D        = form;
  const initials = user?.name?.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase() || "EP";
  const bmi      = D.heightCm && D.weightKg ? (D.weightKg/((D.heightCm/100)**2)).toFixed(1) : "—";

  if (loading) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg,#f8fafc,#eff6ff,#eef2ff)", fontFamily:"'Outfit',sans-serif", fontSize:"1.25rem", fontWeight:700, color:"#6366f1" }}>
      Preparing your dossier…
    </div>
  );

  /* ── step panels ── */
  const steps = [

    /* 0 – Vitals */
    <div key="vitals">
      <SectionTitle>Personal</SectionTitle>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        <Field label="Age"><TextInput type="number" value={D.age} onChange={e=>set("age",e.target.value)} placeholder="e.g. 24" /></Field>
        <Field label="Gender">
          <SelectInput value={D.gender} onChange={e=>set("gender",e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </SelectInput>
        </Field>
        <Field label="Height (cm)"><TextInput type="number" value={D.heightCm} onChange={e=>set("heightCm",e.target.value)} placeholder="e.g. 175" /></Field>
        <Field label="Weight (kg)"><TextInput type="number" value={D.weightKg}  onChange={e=>set("weightKg",e.target.value)}  placeholder="e.g. 72" /></Field>
      </div>

      <SectionTitle>Medical History</SectionTitle>
      <div style={{ marginBottom:14 }}>
        <Label>Conditions (select all that apply)</Label>
        <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginTop:8 }}>
          {MEDICAL_LIST.map(m => <Chip key={m} active={D.medicalConditions.includes(m)} onClick={()=>toggleArr("medicalConditions",m)}>{m.replace(/_/g," ")}</Chip>)}
          <Chip active={D.medicalConditions.includes("none")} onClick={()=>set("medicalConditions", D.medicalConditions.includes("none") ? [] : ["none"])}>None</Chip>
        </div>
      </div>
      <div>
        <Label>Injuries</Label>
        <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginTop:8 }}>
          {INJURY_LIST.map(i => <Chip key={i} active={D.injuries.includes(i)} onClick={()=>toggleArr("injuries",i)}>{i}</Chip>)}
        </div>
      </div>
    </div>,

    /* 1 – Training */
    <div key="training">
      <SectionTitle>Goals</SectionTitle>
      <div style={{ marginBottom:14 }}>
        <Label>Primary Fitness Goal</Label>
        <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginTop:8 }}>
          {GOALS.map(g => <Chip key={g} active={D.fitnessGoal===g} onClick={()=>set("fitnessGoal",g)}>{fmtGoal(g)}</Chip>)}
        </div>
      </div>
      <div>
        <Label>Experience Level</Label>
        <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginTop:8 }}>
          {EXPERIENCES.map(e => <Chip key={e} active={D.experienceLevel===e} onClick={()=>set("experienceLevel",e)}>{capsFirst(e)}</Chip>)}
        </div>
      </div>

      <SectionTitle>Schedule</SectionTitle>
      <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
        <SliderField label="Daily Session Time" value={D.dailyTimeMinutes}    min={15} max={120} step={5} unit=" min"  onChange={v=>set("dailyTimeMinutes",v)} />
        <SliderField label="Workout Days / Week" value={D.workoutDaysPerWeek} min={1}  max={7}   step={1} unit=" days" onChange={v=>set("workoutDaysPerWeek",v)} />
      </div>

      <SectionTitle>Environment</SectionTitle>
      <div style={{ marginBottom:14 }}>
        <Label>Daily Activity Level</Label>
        <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginTop:8 }}>
          {ACTIVITY.map(a => <Chip key={a} active={D.dailyActivityLevel===a} onClick={()=>set("dailyActivityLevel",a)}>{fmtGoal(a)}</Chip>)}
        </div>
      </div>
      <div style={{ marginBottom:14 }}><Toggle value={D.gymAccess} onChange={v=>set("gymAccess",v)} label="Gym Access" /></div>
      <div>
        <Label>Equipment Available</Label>
        <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginTop:8 }}>
          {EQUIPMENT.map(eq => <Chip key={eq} active={D.equipmentAvailable.includes(eq)} onClick={()=>toggleArr("equipmentAvailable",eq)}>{eq.replace(/_/g," ")}</Chip>)}
        </div>
      </div>
    </div>,

    /* 2 – Nutrition */
    <div key="nutrition">
      <SectionTitle>Diet & Nutrition</SectionTitle>
      <div style={{ marginBottom:24 }}>
        <Label>Diet Preference</Label>
        <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginTop:8 }}>
          {DIET_PREFS.map(d => <Chip key={d} active={D.dietPreference===d} onClick={()=>set("dietPreference",d)}>{capsFirst(d)}</Chip>)}
        </div>
      </div>
      <div style={{ maxWidth:240 }}>
        <Field label="Daily Food Budget (₹ or $)">
          <TextInput type="number" value={D.foodBudgetPerDay} onChange={e=>set("foodBudgetPerDay",e.target.value)} placeholder="e.g. 300" />
        </Field>
      </div>
    </div>,

    /* 3 – Location */
    <div key="location">
      <SectionTitle>Location</SectionTitle>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        <div style={{ gridColumn:"span 2" }}>
          <Field label="Country"><TextInput value={D.location.country} onChange={e=>setLoc("country",e.target.value)} placeholder="e.g. India" /></Field>
        </div>
        <Field label="State"><TextInput value={D.location.state} onChange={e=>setLoc("state",e.target.value)} placeholder="e.g. Telangana" /></Field>
        <Field label="City"> <TextInput value={D.location.city}  onChange={e=>setLoc("city",e.target.value)}  placeholder="e.g. Hyderabad" /></Field>
      </div>
    </div>,
  ];

  /* ── button styles ── */
  const btnPrimary = { flex:2, padding:14, border:"none", borderRadius:12, background:"linear-gradient(135deg,#2563eb,#6366f1,#7c3aed)", color:"white", fontFamily:"'Outfit',sans-serif", fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer", boxShadow:"0 4px 16px rgba(99,102,241,0.3)", transition:"all 0.2s" };
  const btnGhost   = { flex:1,  padding:14, border:"1.5px solid #e0e7ff", borderRadius:12, background:"rgba(238,242,255,0.5)", color:"#64748b", fontFamily:"'Outfit',sans-serif", fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer", transition:"all 0.2s" };

  return (
    <div style={{ display:"flex", minHeight:"100vh", fontFamily:"'Outfit',sans-serif", position:"relative", overflow:"hidden" }}>

      {/* Blobs */}
      <div style={{ position:"fixed", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0 }}>
        <div className="animate-blob"                style={{ position:"absolute", top:"-8rem", right:"-8rem", width:"26rem", height:"26rem", borderRadius:"50%", background:"#93c5fd", mixBlendMode:"multiply", filter:"blur(72px)", opacity:0.35 }} />
        <div className="animate-blob animation-delay-2000" style={{ position:"absolute", bottom:"-8rem", left:"-8rem", width:"26rem", height:"26rem", borderRadius:"50%", background:"#c4b5fd", mixBlendMode:"multiply", filter:"blur(72px)", opacity:0.35 }} />
        <div className="animate-blob animation-delay-4000" style={{ position:"absolute", top:"40%", left:"30%", width:"20rem", height:"20rem", borderRadius:"50%", background:"#a5b4fc", mixBlendMode:"multiply", filter:"blur(60px)", opacity:0.25, transform:"translate(-50%,-50%)" }} />
      </div>

      {/* ════ LEFT FORM PANEL ════ */}
      <div style={{ position:"relative", zIndex:1, width:"52%", padding:"52px 48px 80px 52px", overflowY:"auto",
        background:"rgba(255,255,255,0.82)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
        borderRight:"1px solid rgba(226,232,240,0.8)", borderTop:"2px solid #6366f1" }}>

        <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:"#6366f1", marginBottom:44, opacity:0.85 }}>◆ Athlete Dossier</p>

        <h1 style={{ fontSize:"clamp(1.8rem,3vw,2.6rem)", fontWeight:800, lineHeight:1.05, marginBottom:8 }}>
          {editMode && isNewProfile ? (
            <><span style={{ color:"#0f172a" }}>Build Your </span><span style={{ background:"linear-gradient(135deg,#2563eb,#6366f1)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Profile</span></>
          ) : editMode ? (
            <><span style={{ color:"#0f172a" }}>Edit Your </span><span style={{ background:"linear-gradient(135deg,#2563eb,#6366f1)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Profile</span></>
          ) : (
            <><span style={{ color:"#0f172a" }}>Your </span><span style={{ background:"linear-gradient(135deg,#2563eb,#6366f1)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Profile</span></>
          )}
        </h1>
        <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:"#94a3b8", marginBottom:editMode?36:44 }}>
          {editMode ? `Step ${step+1} of ${steps.length} — ${STEP_LABELS[step]}` : "Personal training dossier"}
        </p>

        {/* Step progress dots */}
        {editMode && (
          <div style={{ display:"flex", gap:5, alignItems:"center", marginBottom:32 }}>
            {STEP_LABELS.map((_,i) => (
              <div key={i} style={{ height:3, borderRadius:2, transition:"all 0.3s",
                width: i===step ? 36 : 20,
                background: i===step ? "#6366f1" : i<step ? "rgba(99,102,241,0.4)" : "rgba(226,232,240,0.8)",
              }} />
            ))}
            <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.16em", textTransform:"uppercase", color:"#94a3b8", marginLeft:10 }}>{STEP_LABELS[step]}</span>
          </div>
        )}

        {error && (
          <div style={{ padding:"12px 16px", background:"#fff1f2", border:"1px solid #fecdd3", borderRadius:10, fontSize:12, color:"#f43f5e", marginBottom:20 }}>⚠ {error}</div>
        )}

        {editMode ? (
          <>
            {steps[step]}
            <div style={{ display:"flex", gap:12, marginTop:40 }}>
              {step > 0 && <button onClick={()=>setStep(s=>s-1)} style={btnGhost}>← Back</button>}
              {step < steps.length-1 ? (
                <button onClick={()=>setStep(s=>s+1)} style={btnPrimary}>Continue →</button>
              ) : (
                <button onClick={handleSubmit} disabled={saving} style={{ ...btnPrimary, opacity: saving ? 0.6 : 1, cursor: saving ? "not-allowed" : "pointer" }}>
                  {saving ? "Saving…" : isNewProfile ? "Complete Profile ✦" : "Save Changes ✦"}
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <p style={{ color:"#64748b", fontSize:13, lineHeight:1.8 }}>
              Your profile is complete. All training plans and nutrition recommendations are calibrated to your specifications.
            </p>
            <div style={{ marginTop:32 }}>
              <button onClick={()=>{ setEditMode(true); setStep(0); }} style={{ ...btnPrimary, flex:"unset", display:"inline-block", padding:"14px 32px" }}>
                Edit Profile
              </button>
            </div>
          </>
        )}
      </div>

      {/* ════ RIGHT PREVIEW PANEL ════ */}
      <div style={{ position:"sticky", top:0, zIndex:1, width:"48%", height:"100vh", overflowY:"auto", padding:"52px 48px",
        background:"rgba(248,250,252,0.7)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)" }}>

        <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:"#6366f1", marginBottom:36, opacity:0.85 }}>◆ Live Preview</p>

        {/* Monogram */}
        <div style={{ width:88, height:88, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:24, position:"relative", background:"rgba(238,242,255,0.9)", border:"2px solid rgba(99,102,241,0.25)", boxShadow:"0 4px 24px rgba(99,102,241,0.12)" }}>
          <div style={{ position:"absolute", inset:-8, borderRadius:"50%", border:"1px solid rgba(99,102,241,0.1)" }} />
          <span style={{ fontSize:30, fontWeight:800, background:"linear-gradient(135deg,#2563eb,#6366f1)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", letterSpacing:"0.05em" }}>{initials}</span>
        </div>

        <p style={{ fontSize:"1.8rem", fontWeight:800, color:"#0f172a", marginBottom:4, letterSpacing:"-0.01em" }}>{user?.name || "Athlete"}</p>
        <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#94a3b8", marginBottom:28 }}>
          {capsFirst(D.experienceLevel)} · {fmtGoal(D.fitnessGoal)}
        </p>

        <div style={{ width:40, height:3, background:"linear-gradient(90deg,#3b82f6,#6366f1)", borderRadius:999, marginBottom:28 }} />

        {/* Stats grid */}
        <div style={{ ...glass, borderRadius:16, overflow:"hidden", marginBottom:20 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>
            <StatCell label="Age"      value={D.age}                    unit="yrs"  borderR borderB />
            <StatCell label="BMI"      value={bmi}                                  borderR={false} borderB />
            <StatCell label="Height"   value={D.heightCm}               unit="cm"   borderR borderB />
            <StatCell label="Weight"   value={D.weightKg}               unit="kg"   borderR={false} borderB />
            <StatCell label="Session"  value={D.dailyTimeMinutes}       unit="min"  borderR borderB />
            <StatCell label="Days/Wk"  value={D.workoutDaysPerWeek}                 borderR={false} borderB />
            <StatCell label="Activity" value={capsFirst(D.dailyActivityLevel)} fontSize={15} borderR borderB={false} />
            <StatCell label="Gym"      value={D.gymAccess ? "Access" : "No Gym"} fontSize={15} color={D.gymAccess ? "#6366f1" : "#94a3b8"} borderR={false} borderB={false} />
          </div>
        </div>

        {/* Tags */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:12 }}>
          {D.fitnessGoal     && <TagPill variant="indigo">{fmtGoal(D.fitnessGoal)}</TagPill>}
          {D.dietPreference  && <TagPill>{capsFirst(D.dietPreference)}</TagPill>}
          {D.experienceLevel && <TagPill>{capsFirst(D.experienceLevel)}</TagPill>}
          {D.foodBudgetPerDay && <TagPill>Budget: {D.foodBudgetPerDay}</TagPill>}
        </div>

        {D.equipmentAvailable.length > 0 && (
          <div style={{ marginBottom:12 }}>
            <p style={{ fontSize:8, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#94a3b8", marginBottom:8 }}>Equipment</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {D.equipmentAvailable.map(e => <TagPill key={e}>{e.replace(/_/g," ")}</TagPill>)}
            </div>
          </div>
        )}

        {(D.medicalConditions.length > 0 || D.injuries.length > 0) && (
          <div style={{ marginBottom:12 }}>
            <p style={{ fontSize:8, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#94a3b8", marginBottom:8 }}>Health Notes</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {D.medicalConditions.filter(m=>m!=="none").map(m => <TagPill key={m} variant="red">{m.replace(/_/g," ")}</TagPill>)}
              {D.injuries.map(i => <TagPill key={i} variant="blue">{i}</TagPill>)}
            </div>
          </div>
        )}

        {(D.location.city || D.location.country) && (
          <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:20, paddingTop:16, borderTop:"1px solid rgba(226,232,240,0.6)", fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#64748b" }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:"#6366f1", flexShrink:0 }} />
            {[D.location.city, D.location.state, D.location.country].filter(Boolean).join(", ")}
          </div>
        )}
      </div>
    </div>
  );
}