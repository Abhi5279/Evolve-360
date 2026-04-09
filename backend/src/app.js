// // // src/app.js

// // import express from "express";
// // import authRoutes from "./routes/auth.routes.js";
// // import profileRoutes from "./routes/profile.routes.js";
// // import readinessRoutes from "./routes/readiness.routes.js";
// // import workoutRoutes from "./routes/workout.routes.js";
// // import planRoutes from "./routes/plan.routes.js";
// // import apsRoutes from "./routes/aps.routes.js";
// // import nutritionRoutes from "./routes/nutrition.routes.js";
// // import foodLogRoutes from "./routes/foodLog.routes.js";
// // import nutritionSummaryRoutes from "./routes/nutritionSummary.routes.js";



// // const app = express();

// // app.use(express.json());

// // // Routes
// // app.use("/api/auth", authRoutes);       // optional
// // app.use("/api/profile", profileRoutes);
// // app.use("/api/readiness", readinessRoutes);
// // app.use("/api/workout", workoutRoutes);
// // app.use("/api/plan", planRoutes);
// // app.use("/api/aps", apsRoutes);
// // app.use("/api/nutrition", nutritionRoutes);
// // app.use("/api/food", foodLogRoutes);
// // app.use("/api/nutrition", nutritionSummaryRoutes);




// // app.get("/", (req, res) => {
// //   res.json({
// //     status: "OK",
// //     message: "Evolve 360 Backend is running"
// //   });
// // });

// // export default app;


// // src/app.js

// import express from "express";
// import cors from "cors";

// import authRoutes from "./routes/auth.routes.js";
// import profileRoutes from "./routes/profile.routes.js";
// import readinessRoutes from "./routes/readiness.routes.js";
// import workoutRoutes from "./routes/workout.routes.js";
// import planRoutes from "./routes/plan.routes.js";
// import apsRoutes from "./routes/aps.routes.js";
// import nutritionRoutes from "./routes/nutrition.routes.js";
// import foodLogRoutes from "./routes/foodLog.routes.js";
// import nutritionSummaryRoutes from "./routes/nutritionSummary.routes.js";
// import aiSessionRoutes from "./routes/aiSession.routes.js";
// import reminderRoutes from "./routes/reminder.routes.js";
// import waterReminderRoutes from "./routes/waterreminder.routes.js";


// const app = express();

// /* =====================================================
//    🔥 CORS CONFIGURATION (MUST BE BEFORE ROUTES)
// ===================================================== */

// app.use(cors({
//   origin: "http://localhost:5173",   // Your Vite frontend
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// }));

// // Explicit preflight handler
// app.options("*", cors());

// /* =====================================================
//    BODY PARSER
// ===================================================== */

// app.use(express.json());

// /* =====================================================
//    ROUTES
// ===================================================== */

// app.use("/api/auth", authRoutes);
// app.use("/api/profile", profileRoutes);
// app.use("/api/readiness", readinessRoutes);
// app.use("/api/workout", workoutRoutes);
// app.use("/api/plan", planRoutes);
// app.use("/api/aps", apsRoutes);
// app.use("/api/nutrition", nutritionRoutes);
// app.use("/api/food", foodLogRoutes);
// app.use("/api/nutrition-summary", nutritionSummaryRoutes);
// app.use("/api/ai-session", aiSessionRoutes);
// app.use("/reminders", reminderRoutes);
// app.use("/water-reminders", waterReminderRoutes);

// /* =====================================================
//    ROOT HEALTH CHECK
// ===================================================== */

// app.get("/", (req, res) => {
//   res.json({
//     status: "OK",
//     message: "Evolve 360 Backend is running"
//   });
// });

// export default app;


import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import readinessRoutes from "./routes/readiness.routes.js";
import workoutRoutes from "./routes/workout.routes.js";
import planRoutes from "./routes/plan.routes.js";
import apsRoutes from "./routes/aps.routes.js";
import nutritionRoutes from "./routes/nutrition.routes.js";
import foodLogRoutes from "./routes/foodLog.routes.js";
import nutritionSummaryRoutes from "./routes/nutritionSummary.routes.js";
import aiSessionRoutes from "./routes/aiSession.routes.js";
import reminderRoutes from "./routes/reminder.routes.js";
import waterReminderRoutes from "./routes/waterreminder.routes.js";
import rehabRoutes from "./routes/rehab.routes.js";
import functionalTestRoutes from "./routes/functionalTest.routes.js";
import painRoutes from "./routes/pain.routes.js";
import trainingRoutes from "./routes/training.routes.js";




const app = express();

/* =====================================================
   🔥 CORS CONFIGURATION (MUST BE BEFORE ROUTES)
===================================================== */

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());

/* =====================================================
   BODY PARSER
===================================================== */

app.use(express.json());

/* =====================================================
   ROUTES
===================================================== */

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/readiness", readinessRoutes);
app.use("/api/workout", workoutRoutes);
app.use("/api/plan", planRoutes);
app.use("/api/aps", apsRoutes);
app.use("/api/nutrition", nutritionRoutes);
app.use("/api/food", foodLogRoutes);
app.use("/api/nutrition-summary", nutritionSummaryRoutes);
app.use("/api/ai-session", aiSessionRoutes);
app.use("/reminders", reminderRoutes);
app.use("/water-reminders", waterReminderRoutes);
app.use("/api/functional-test", functionalTestRoutes);
app.use("/api/pain-analysis", painRoutes);
app.use("/api/training-analysis", trainingRoutes);

/* =====================================================
   REHAB / RRS ROUTES
   POST   /api/rehab/rrs/calculate               → calculate + save to DB
   GET    /api/rehab/rrs/sessions/:userId         → all sessions (paginated)
   GET    /api/rehab/rrs/sessions/:userId/:id     → single session (full detail)
   GET    /api/rehab/rrs/summary/:userId          → progress summary + trend
   GET    /api/rehab/rrs/phases                   → phase definitions
===================================================== */

app.use("/api/rehab", rehabRoutes);

/* =====================================================
   ROOT HEALTH CHECK
===================================================== */

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Evolve 360 Backend is running"
  });
});

export default app;