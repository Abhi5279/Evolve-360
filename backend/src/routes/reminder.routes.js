// // // routes/reminder.routes.js

// // import express from "express";
// // import cron from "node-cron";
// // import nodemailer from "nodemailer";
// // import User from "../models/User.model.js";
// // import ApsHistory from "../models/ApsHistory.model.js";

// // const router = express.Router();

// // /* =========================================
// //    EMAIL TRANSPORTER
// // ========================================= */
// // const transporter = nodemailer.createTransport({
// //   service: "gmail",
// //   auth: {
// //     user: process.env.EMAIL_USER,
// //     pass: process.env.EMAIL_PASS
// //   }
// // });

// // /* =========================================
// //    APS TIERS
// // ========================================= */
// // const APS_TIERS = [
// //   {
// //     min: 0, max: 30,
// //     subject: "⚠️ Your Fitness Momentum Needs You",
// //     color: "#e74c3c",
// //     badge: "🔴 Critical",
// //     quotes: [
// //       "Every champion was once a beginner who refused to quit.",
// //       "The gym is calling — one rep is all it takes to restart.",
// //       "Your future self is waiting. Lace up.",
// //       "Discipline isn't born, it's built. Start today."
// //     ],
// //     tips: [
// //       "Try a light 15-min walk or stretch session today.",
// //       "Log your water intake — hydration powers recovery.",
// //       "Sleep 7–8 hrs tonight to reset your energy.",
// //       "A small win today builds momentum for tomorrow."
// //     ],
// //     cta: "Start Your Comeback"
// //   },
// //   {
// //     min: 31, max: 50,
// //     subject: "💪 You're Getting Warmer — Keep Going!",
// //     color: "#e67e22",
// //     badge: "🟠 Building",
// //     quotes: [
// //       "Consistency beats perfection every single time.",
// //       "You're not behind — you're just getting started.",
// //       "Progress isn't always visible, but it's always real.",
// //       "The gym misses you. 20 minutes is all it takes."
// //     ],
// //     tips: [
// //       "Hit a moderate workout today — your body is ready.",
// //       "Focus on protein-rich meals to aid muscle repair.",
// //       "Track your workouts this week to see the pattern.",
// //       "One solid session can flip your whole week around."
// //     ],
// //     cta: "Continue Building"
// //   },
// //   {
// //     min: 51, max: 70,
// //     subject: "🚀 Good Progress! Push to the Next Level",
// //     color: "#f39c12",
// //     badge: "🟡 Progressing",
// //     quotes: [
// //       "You're in the zone — don't let up now.",
// //       "Momentum is your best training partner.",
// //       "Results are coming. Stay locked in.",
// //       "Mid-range today, peak performance tomorrow."
// //     ],
// //     tips: [
// //       "Time to increase intensity — your body can handle it.",
// //       "Add 5 extra minutes to today's session.",
// //       "Recovery nutrition is key at this stage — eat smart.",
// //       "Stretch and mobilize after your workout tonight."
// //     ],
// //     cta: "Boost Your Score"
// //   },
// //   {
// //     min: 71, max: 89,
// //     subject: "🔥 You're On Fire — Elite Zone Incoming!",
// //     color: "#27ae60",
// //     badge: "🟢 High",
// //     quotes: [
// //       "You're one push away from peak performance.",
// //       "This is where legends are made. Don't stop.",
// //       "You've earned your progress — now own it.",
// //       "Elite athletes don't slow down near the top."
// //     ],
// //     tips: [
// //       "Push for a personal best this week.",
// //       "Fine-tune your sleep and nutrition to close the gap.",
// //       "Add a challenge — a new exercise or heavier lift.",
// //       "Share your wins — accountability fuels consistency."
// //     ],
// //     cta: "Reach the Peak"
// //   },
// //   {
// //     min: 90, max: 100,
// //     subject: "🏆 ELITE Level Achieved — You're Unstoppable!",
// //     color: "#8e44ad",
// //     badge: "🏅 Elite",
// //     quotes: [
// //       "You're operating at the highest level. Incredible.",
// //       "Elite is not a destination — it's a daily decision.",
// //       "Champions maintain. Keep doing what you're doing.",
// //       "You are the standard others aspire to."
// //     ],
// //     tips: [
// //       "Focus on maintaining and fine-tuning your routine.",
// //       "Consider coaching or mentoring others around you.",
// //       "Log this streak — future you will thank you.",
// //       "Recovery is part of elite performance. Don't skip rest days."
// //     ],
// //     cta: "Stay Legendary"
// //   }
// // ];

// // function getTier(score) {
// //   return APS_TIERS.find(t => score >= t.min && score <= t.max) || APS_TIERS[0];
// // }

// // function pickRandom(arr) {
// //   return arr[Math.floor(Math.random() * arr.length)];
// // }

// // /* =========================================
// //    EMAIL HTML BUILDER
// // ========================================= */
// // function buildEmailHtml({ email, score, tier, stopLink }) {
// //   const quote = pickRandom(tier.quotes);
// //   const tip = pickRandom(tier.tips);

// //   return `
// //     <div style="font-family: Arial, sans-serif; max-width: 560px; margin: auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
// //       <div style="background: ${tier.color}; padding: 28px 32px; text-align: center;">
// //         <h1 style="color: #fff; margin: 0; font-size: 24px;">APS Performance Update</h1>
// //         <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0;">${tier.badge}</p>
// //       </div>
// //       <div style="background: #f9f9f9; padding: 24px 32px; text-align: center; border-bottom: 1px solid #eee;">
// //         <p style="margin: 0; font-size: 14px; color: #777;">YOUR CURRENT APS SCORE</p>
// //         <p style="margin: 8px 0; font-size: 56px; font-weight: bold; color: ${tier.color};">${score}</p>
// //         <p style="margin: 0; font-size: 13px; color: #aaa;">out of 100</p>
// //       </div>
// //       <div style="padding: 24px 32px;">
// //         <blockquote style="border-left: 4px solid ${tier.color}; margin: 0; padding: 8px 16px; color: #333; font-style: italic; font-size: 16px;">
// //           "${quote}"
// //         </blockquote>
// //       </div>
// //       <div style="padding: 0 32px 24px;">
// //         <div style="background: #f0f4ff; border-radius: 8px; padding: 16px 20px;">
// //           <p style="margin: 0 0 6px; font-size: 13px; font-weight: bold; color: #555; text-transform: uppercase;">Today's Action</p>
// //           <p style="margin: 0; font-size: 15px; color: #333;">${tip}</p>
// //         </div>
// //       </div>
// //       <div style="padding: 0 32px 28px; text-align: center;">
// //         <a href="#" style="display: inline-block; background: ${tier.color}; color: #fff; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-size: 15px; font-weight: bold;">
// //           ${tier.cta} →
// //         </a>
// //       </div>
// //       <div style="background: #f5f5f5; padding: 16px 32px; text-align: center; border-top: 1px solid #eee;">
// //         <p style="margin: 0; font-size: 12px; color: #aaa;">
// //           You're receiving this because your APS score was logged.<br/>
// //           <a href="${stopLink}" style="color: #aaa;">Unsubscribe from reminders</a>
// //         </p>
// //       </div>
// //     </div>
// //   `;
// // }

// // /* =========================================
// //    CORE SEND FUNCTION
// // ========================================= */
// // async function sendApsReminder(userId, email, score) {
// //   const tier = getTier(score);
// //   const stopLink = `${process.env.BASE_URL}/reminders/stop/${userId}`;

// //   await transporter.sendMail({
// //     from: `"FitTrack" <${process.env.EMAIL_USER}>`,
// //     to: email,
// //     subject: tier.subject,
// //     html: buildEmailHtml({ email, score, tier, stopLink })
// //   });

// //   console.log(`[APS Reminder] Sent to ${email} | Score: ${score} | Tier: ${tier.badge}`);
// // }

// // /* =========================================
// //    CRON JOB — daily at 8:00 AM
// //    Change "0 8 * * *" to "* * * * *" for testing
// // ========================================= */
// // cron.schedule("0 8 * * *", async () => {
// //   console.log("[APS Cron] Running daily APS reminder check...");
// //   try {
// //     const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

// //     const recentEntries = await ApsHistory.aggregate([
// //       { $match: { date: { $gte: since } } },
// //       { $sort: { date: -1 } },
// //       {
// //         $group: {
// //           _id: "$userId",
// //           latestScore: { $first: "$apsScore" },
// //           latestDate: { $first: "$date" }
// //         }
// //       }
// //     ]);

// //     for (const entry of recentEntries) {
// //       const user = await User.findById(entry._id).select("email reminderActive");
// //       if (!user || !user.email) continue;
// //       if (user.reminderActive === false) continue;
// //       await sendApsReminder(entry._id.toString(), user.email, entry.latestScore);
// //     }

// //     console.log(`[APS Cron] Done — processed ${recentEntries.length} users.`);
// //   } catch (err) {
// //     console.error("[APS Cron] Error:", err.message);
// //   }
// // });

// // /* =========================================
// //    ROUTES
// // ========================================= */

// // // 1. STOP REMINDERS (used as unsubscribe link in email)
// // // GET /reminders/stop/:userId
// // router.get("/stop/:userId", async (req, res) => {
// //   try {
// //     const { userId } = req.params;
// //     await User.findByIdAndUpdate(userId, { reminderActive: false });
// //     res.send(`
// //       <div style="font-family:Arial;text-align:center;padding:60px;">
// //         <h2>✅ Reminders stopped</h2>
// //         <p>You won't receive APS fitness reminders anymore.</p>
// //       </div>
// //     `);
// //   } catch (err) {
// //     res.status(500).send("Something went wrong.");
// //   }
// // });

// // // 2. RE-ENABLE REMINDERS
// // // POST /reminders/enable/:userId
// // router.post("/enable/:userId", async (req, res) => {
// //   try {
// //     const { userId } = req.params;
// //     await User.findByIdAndUpdate(userId, { reminderActive: true });
// //     res.json({ message: "Reminders re-enabled" });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // // 3. MANUAL TEST — fire email instantly without waiting for cron
// // // POST /reminders/test/:userId
// // router.post("/test/:userId", async (req, res) => {
// //   try {
// //     const { userId } = req.params;

// //     const user = await User.findById(userId).select("email");
// //     if (!user) return res.status(404).json({ message: "User not found" });

// //     const latest = await ApsHistory.findOne({ userId })
// //       .sort({ date: -1 })
// //       .select("apsScore");

// //     if (!latest) return res.status(404).json({ message: "No APS score found for this user" });

// //     await sendApsReminder(userId, user.email, latest.apsScore);

// //     res.json({
// //       message: "Test reminder sent successfully",
// //       email: user.email,
// //       score: latest.apsScore,
// //       tier: getTier(latest.apsScore).badge
// //     });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // // 4. CHECK APS STATUS (no email, just view score + tier)
// // // GET /reminders/status/:userId
// // router.get("/status/:userId", async (req, res) => {
// //   try {
// //     const { userId } = req.params;

// //     const user = await User.findById(userId).select("email reminderActive");
// //     if (!user) return res.status(404).json({ message: "User not found" });

// //     const latest = await ApsHistory.findOne({ userId })
// //       .sort({ date: -1 })
// //       .select("apsScore date readinessCategory recoveryType");

// //     if (!latest) return res.status(404).json({ message: "No APS score found" });

// //     const tier = getTier(latest.apsScore);

// //     res.json({
// //       email: user.email,
// //       reminderActive: user.reminderActive,
// //       latestAps: {
// //         score: latest.apsScore,
// //         date: latest.date,
// //         readinessCategory: latest.readinessCategory,
// //         recoveryType: latest.recoveryType
// //       },
// //       tier: {
// //         badge: tier.badge,
// //         range: `${tier.min}–${tier.max}`,
// //         subject: tier.subject
// //       }
// //     });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // export default router;


// // routes/reminder.routes.js

// import express from "express";
// import cron from "node-cron";
// import nodemailer from "nodemailer";
// import User from "../models/User.model.js";
// import ApsHistory from "../models/ApsHistory.model.js";

// const router = express.Router();

// /* =========================================
//    EMAIL TRANSPORTER
//    Created lazily so dotenv is loaded first
// ========================================= */
// function getTransporter() {
//   return nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   });
// }

// /* =========================================
//    APS TIERS
// ========================================= */
// const APS_TIERS = [
//   {
//     min: 0, max: 30,
//     subject: "⚠️ Your Fitness Momentum Needs You",
//     color: "#e74c3c",
//     badge: "🔴 Critical",
//     quotes: [
//       "Every champion was once a beginner who refused to quit.",
//       "The gym is calling — one rep is all it takes to restart.",
//       "Your future self is waiting. Lace up.",
//       "Discipline isn't born, it's built. Start today."
//     ],
//     tips: [
//       "Try a light 15-min walk or stretch session today.",
//       "Log your water intake — hydration powers recovery.",
//       "Sleep 7–8 hrs tonight to reset your energy.",
//       "A small win today builds momentum for tomorrow."
//     ],
//     cta: "Start Your Comeback"
//   },
//   {
//     min: 31, max: 50,
//     subject: "💪 You're Getting Warmer — Keep Going!",
//     color: "#e67e22",
//     badge: "🟠 Building",
//     quotes: [
//       "Consistency beats perfection every single time.",
//       "You're not behind — you're just getting started.",
//       "Progress isn't always visible, but it's always real.",
//       "The gym misses you. 20 minutes is all it takes."
//     ],
//     tips: [
//       "Hit a moderate workout today — your body is ready.",
//       "Focus on protein-rich meals to aid muscle repair.",
//       "Track your workouts this week to see the pattern.",
//       "One solid session can flip your whole week around."
//     ],
//     cta: "Continue Building"
//   },
//   {
//     min: 51, max: 70,
//     subject: "🚀 Good Progress! Push to the Next Level",
//     color: "#f39c12",
//     badge: "🟡 Progressing",
//     quotes: [
//       "You're in the zone — don't let up now.",
//       "Momentum is your best training partner.",
//       "Results are coming. Stay locked in.",
//       "Mid-range today, peak performance tomorrow."
//     ],
//     tips: [
//       "Time to increase intensity — your body can handle it.",
//       "Add 5 extra minutes to today's session.",
//       "Recovery nutrition is key at this stage — eat smart.",
//       "Stretch and mobilize after your workout tonight."
//     ],
//     cta: "Boost Your Score"
//   },
//   {
//     min: 71, max: 89,
//     subject: "🔥 You're On Fire — Elite Zone Incoming!",
//     color: "#27ae60",
//     badge: "🟢 High",
//     quotes: [
//       "You're one push away from peak performance.",
//       "This is where legends are made. Don't stop.",
//       "You've earned your progress — now own it.",
//       "Elite athletes don't slow down near the top."
//     ],
//     tips: [
//       "Push for a personal best this week.",
//       "Fine-tune your sleep and nutrition to close the gap.",
//       "Add a challenge — a new exercise or heavier lift.",
//       "Share your wins — accountability fuels consistency."
//     ],
//     cta: "Reach the Peak"
//   },
//   {
//     min: 90, max: 100,
//     subject: "🏆 ELITE Level Achieved — You're Unstoppable!",
//     color: "#8e44ad",
//     badge: "🏅 Elite",
//     quotes: [
//       "You're operating at the highest level. Incredible.",
//       "Elite is not a destination — it's a daily decision.",
//       "Champions maintain. Keep doing what you're doing.",
//       "You are the standard others aspire to."
//     ],
//     tips: [
//       "Focus on maintaining and fine-tuning your routine.",
//       "Consider coaching or mentoring others around you.",
//       "Log this streak — future you will thank you.",
//       "Recovery is part of elite performance. Don't skip rest days."
//     ],
//     cta: "Stay Legendary"
//   }
// ];

// function getTier(score) {
//   return APS_TIERS.find(t => score >= t.min && score <= t.max) || APS_TIERS[0];
// }

// function pickRandom(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// /* =========================================
//    EMAIL HTML BUILDER
// ========================================= */
// function buildEmailHtml({ email, score, tier, stopLink }) {
//   const quote = pickRandom(tier.quotes);
//   const tip = pickRandom(tier.tips);

//   return `
//     <div style="font-family: Arial, sans-serif; max-width: 560px; margin: auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
//       <div style="background: ${tier.color}; padding: 28px 32px; text-align: center;">
//         <h1 style="color: #fff; margin: 0; font-size: 24px;">APS Performance Update</h1>
//         <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0;">${tier.badge}</p>
//       </div>
//       <div style="background: #f9f9f9; padding: 24px 32px; text-align: center; border-bottom: 1px solid #eee;">
//         <p style="margin: 0; font-size: 14px; color: #777;">YOUR CURRENT APS SCORE</p>
//         <p style="margin: 8px 0; font-size: 56px; font-weight: bold; color: ${tier.color};">${score}</p>
//         <p style="margin: 0; font-size: 13px; color: #aaa;">out of 100</p>
//       </div>
//       <div style="padding: 24px 32px;">
//         <blockquote style="border-left: 4px solid ${tier.color}; margin: 0; padding: 8px 16px; color: #333; font-style: italic; font-size: 16px;">
//           "${quote}"
//         </blockquote>
//       </div>
//       <div style="padding: 0 32px 24px;">
//         <div style="background: #f0f4ff; border-radius: 8px; padding: 16px 20px;">
//           <p style="margin: 0 0 6px; font-size: 13px; font-weight: bold; color: #555; text-transform: uppercase;">Today's Action</p>
//           <p style="margin: 0; font-size: 15px; color: #333;">${tip}</p>
//         </div>
//       </div>
//       <div style="padding: 0 32px 28px; text-align: center;">
//         <a href="#" style="display: inline-block; background: ${tier.color}; color: #fff; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-size: 15px; font-weight: bold;">
//           ${tier.cta} →
//         </a>
//       </div>
//       <div style="background: #f5f5f5; padding: 16px 32px; text-align: center; border-top: 1px solid #eee;">
//         <p style="margin: 0; font-size: 12px; color: #aaa;">
//           You're receiving this because your APS score was logged.<br/>
//           <a href="${stopLink}" style="color: #aaa;">Unsubscribe from reminders</a>
//         </p>
//       </div>
//     </div>
//   `;
// }

// /* =========================================
//    CORE SEND FUNCTION
// ========================================= */
// async function sendApsReminder(userId, email, score) {
//   const tier = getTier(score);
//   const stopLink = `${process.env.BASE_URL}/reminders/stop/${userId}`;
//   const transporter = getTransporter();

//   await transporter.sendMail({
//     from: `"Evolve 360" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: tier.subject,
//     html: buildEmailHtml({ email, score, tier, stopLink })
//   });

//   console.log(`[APS Reminder] Sent to ${email} | Score: ${score} | Tier: ${tier.badge}`);
// }

// /* =========================================
//    CRON JOB — daily at 8:00 AM
//    Change "0 8 * * *" to "* * * * *" for testing
// ========================================= */
// cron.schedule("0 8 * * *", async () => {
//   console.log("[APS Cron] Running daily APS reminder check...");
//   try {
//     const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

//     const recentEntries = await ApsHistory.aggregate([
//       { $match: { date: { $gte: since } } },
//       { $sort: { date: -1 } },
//       {
//         $group: {
//           _id: "$userId",
//           latestScore: { $first: "$apsScore" },
//           latestDate: { $first: "$date" }
//         }
//       }
//     ]);

//     for (const entry of recentEntries) {
//       const user = await User.findById(entry._id).select("email reminderActive");
//       if (!user || !user.email) continue;
//       if (user.reminderActive === false) continue;
//       await sendApsReminder(entry._id.toString(), user.email, entry.latestScore);
//     }

//     console.log(`[APS Cron] Done — processed ${recentEntries.length} users.`);
//   } catch (err) {
//     console.error("[APS Cron] Error:", err.message);
//   }
// });

// /* =========================================
//    ROUTES
// ========================================= */

// // 1. STOP REMINDERS (used as unsubscribe link in email)
// // GET /reminders/stop/:userId
// router.get("/stop/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     await User.findByIdAndUpdate(userId, { reminderActive: false });
//     res.send(`
//       <div style="font-family:Arial;text-align:center;padding:60px;">
//         <h2>✅ Reminders stopped</h2>
//         <p>You won't receive APS fitness reminders anymore.</p>
//       </div>
//     `);
//   } catch (err) {
//     res.status(500).send("Something went wrong.");
//   }
// });

// // 2. RE-ENABLE REMINDERS
// // POST /reminders/enable/:userId
// router.post("/enable/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     await User.findByIdAndUpdate(userId, { reminderActive: true });
//     res.json({ message: "Reminders re-enabled" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // 3. MANUAL TEST — fire email instantly without waiting for cron
// // POST /reminders/test/:userId
// router.post("/test/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const user = await User.findById(userId).select("email");
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const latest = await ApsHistory.findOne({ userId })
//       .sort({ date: -1 })
//       .select("apsScore");

//     if (!latest) return res.status(404).json({ message: "No APS score found for this user" });

//     await sendApsReminder(userId, user.email, latest.apsScore);

//     res.json({
//       message: "Test reminder sent successfully",
//       email: user.email,
//       score: latest.apsScore,
//       tier: getTier(latest.apsScore).badge
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // 4. CHECK APS STATUS (no email, just view score + tier)
// // GET /reminders/status/:userId
// router.get("/status/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const user = await User.findById(userId).select("email reminderActive");
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const latest = await ApsHistory.findOne({ userId })
//       .sort({ date: -1 })
//       .select("apsScore date readinessCategory recoveryType");

//     if (!latest) return res.status(404).json({ message: "No APS score found" });

//     const tier = getTier(latest.apsScore);

//     res.json({
//       email: user.email,
//       reminderActive: user.reminderActive,
//       latestAps: {
//         score: latest.apsScore,
//         date: latest.date,
//         readinessCategory: latest.readinessCategory,
//         recoveryType: latest.recoveryType
//       },
//       tier: {
//         badge: tier.badge,
//         range: `${tier.min}–${tier.max}`,
//         subject: tier.subject
//       }
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// export default router;

// routes/reminder.routes.js

import express from "express";
import cron from "node-cron";
import nodemailer from "nodemailer";
import User from "../models/User.model.js";
import ApsHistory from "../models/ApsHistory.model.js";

const router = express.Router();

/* =========================================
   EMAIL TRANSPORTER
   Created lazily so dotenv is loaded first
========================================= */
function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

/* =========================================
   APS TIERS
========================================= */
const APS_TIERS = [
  {
    min: 0, max: 30,
    subject: "⚠️ Your Fitness Momentum Needs You",
    color: "#e74c3c",
    badge: "🔴 Critical",
    quotes: [
      "Every champion was once a beginner who refused to quit.",
      "The gym is calling — one rep is all it takes to restart.",
      "Your future self is waiting. Lace up.",
      "Discipline isn't born, it's built. Start today."
    ],
    tips: [
      "Try a light 15-min walk or stretch session today.",
      "Log your water intake — hydration powers recovery.",
      "Sleep 7–8 hrs tonight to reset your energy.",
      "A small win today builds momentum for tomorrow."
    ],
    cta: "Start Your Comeback"
  },
  {
    min: 31, max: 50,
    subject: "💪 You're Getting Warmer — Keep Going!",
    color: "#e67e22",
    badge: "🟠 Building",
    quotes: [
      "Consistency beats perfection every single time.",
      "You're not behind — you're just getting started.",
      "Progress isn't always visible, but it's always real.",
      "The gym misses you. 20 minutes is all it takes."
    ],
    tips: [
      "Hit a moderate workout today — your body is ready.",
      "Focus on protein-rich meals to aid muscle repair.",
      "Track your workouts this week to see the pattern.",
      "One solid session can flip your whole week around."
    ],
    cta: "Continue Building"
  },
  {
    min: 51, max: 70,
    subject: "🚀 Good Progress! Push to the Next Level",
    color: "#f39c12",
    badge: "🟡 Progressing",
    quotes: [
      "You're in the zone — don't let up now.",
      "Momentum is your best training partner.",
      "Results are coming. Stay locked in.",
      "Mid-range today, peak performance tomorrow."
    ],
    tips: [
      "Time to increase intensity — your body can handle it.",
      "Add 5 extra minutes to today's session.",
      "Recovery nutrition is key at this stage — eat smart.",
      "Stretch and mobilize after your workout tonight."
    ],
    cta: "Boost Your Score"
  },
  {
    min: 71, max: 89,
    subject: "🔥 You're On Fire — Elite Zone Incoming!",
    color: "#27ae60",
    badge: "🟢 High",
    quotes: [
      "You're one push away from peak performance.",
      "This is where legends are made. Don't stop.",
      "You've earned your progress — now own it.",
      "Elite athletes don't slow down near the top."
    ],
    tips: [
      "Push for a personal best this week.",
      "Fine-tune your sleep and nutrition to close the gap.",
      "Add a challenge — a new exercise or heavier lift.",
      "Share your wins — accountability fuels consistency."
    ],
    cta: "Reach the Peak"
  },
  {
    min: 90, max: 100,
    subject: "🏆 ELITE Level Achieved — You're Unstoppable!",
    color: "#8e44ad",
    badge: "🏅 Elite",
    quotes: [
      "You're operating at the highest level. Incredible.",
      "Elite is not a destination — it's a daily decision.",
      "Champions maintain. Keep doing what you're doing.",
      "You are the standard others aspire to."
    ],
    tips: [
      "Focus on maintaining and fine-tuning your routine.",
      "Consider coaching or mentoring others around you.",
      "Log this streak — future you will thank you.",
      "Recovery is part of elite performance. Don't skip rest days."
    ],
    cta: "Stay Legendary"
  }
];

function getTier(score) {
  return APS_TIERS.find(t => score >= t.min && score <= t.max) || APS_TIERS[0];
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* =========================================
   EMAIL HTML BUILDER
========================================= */
function buildEmailHtml({ email, score, tier, stopLink }) {
  const quote = pickRandom(tier.quotes);
  const tip = pickRandom(tier.tips);

  return `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
      <div style="background: ${tier.color}; padding: 28px 32px; text-align: center;">
        <h1 style="color: #fff; margin: 0; font-size: 24px;">APS Performance Update</h1>
        <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0;">${tier.badge}</p>
      </div>
      <div style="background: #f9f9f9; padding: 24px 32px; text-align: center; border-bottom: 1px solid #eee;">
        <p style="margin: 0; font-size: 14px; color: #777;">YOUR CURRENT APS SCORE</p>
        <p style="margin: 8px 0; font-size: 56px; font-weight: bold; color: ${tier.color};">${score}</p>
        <p style="margin: 0; font-size: 13px; color: #aaa;">out of 100</p>
      </div>
      <div style="padding: 24px 32px;">
        <blockquote style="border-left: 4px solid ${tier.color}; margin: 0; padding: 8px 16px; color: #333; font-style: italic; font-size: 16px;">
          "${quote}"
        </blockquote>
      </div>
      <div style="padding: 0 32px 24px;">
        <div style="background: #f0f4ff; border-radius: 8px; padding: 16px 20px;">
          <p style="margin: 0 0 6px; font-size: 13px; font-weight: bold; color: #555; text-transform: uppercase;">Today's Action</p>
          <p style="margin: 0; font-size: 15px; color: #333;">${tip}</p>
        </div>
      </div>
      <div style="padding: 0 32px 28px; text-align: center;">
        <a href="#" style="display: inline-block; background: ${tier.color}; color: #fff; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-size: 15px; font-weight: bold;">
          ${tier.cta} →
        </a>
      </div>
      <div style="background: #f5f5f5; padding: 16px 32px; text-align: center; border-top: 1px solid #eee;">
        <p style="margin: 0; font-size: 12px; color: #aaa;">
          You're receiving this because your APS score was logged.<br/>
          <a href="${stopLink}" style="color: #aaa;">Unsubscribe from reminders</a>
        </p>
      </div>
    </div>
  `;
}

/* =========================================
   CORE SEND FUNCTION
========================================= */
async function sendApsReminder(userId, email, score) {
  const tier = getTier(score);
  const stopLink = `${process.env.BASE_URL}/reminders/stop/${userId}`;
  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"FitTrack" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: tier.subject,
    html: buildEmailHtml({ email, score, tier, stopLink })
  });

  console.log(`[APS Reminder] Sent to ${email} | Score: ${score} | Tier: ${tier.badge}`);
}

/* =========================================
   CRON JOB — 3x daily at 8 AM, 1 PM, 6 PM
   Change "0 8,13,18 * * *" to "* * * * *" for testing
========================================= */
// In-memory tracker: { userId: { count: 0, resetAt: Date } }
const dailySendTracker = {};

function canSendToday(userId) {
  const now = Date.now();
  const entry = dailySendTracker[userId];

  // Reset if it's a new day
  if (!entry || now > entry.resetAt) {
    dailySendTracker[userId] = {
      count: 0,
      resetAt: new Date().setHours(23, 59, 59, 999) // end of today
    };
  }

  return dailySendTracker[userId].count < 3;
}

function incrementSendCount(userId) {
  dailySendTracker[userId].count += 1;
}

cron.schedule("0 8,13,18 * * *", async () => {
  console.log("[APS Cron] Running reminder check (8 AM / 1 PM / 6 PM)...");
  try {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const recentEntries = await ApsHistory.aggregate([
      { $match: { date: { $gte: since } } },
      { $sort: { date: -1 } },
      {
        $group: {
          _id: "$userId",
          latestScore: { $first: "$apsScore" },
          latestDate: { $first: "$date" }
        }
      }
    ]);

    for (const entry of recentEntries) {
      const user = await User.findById(entry._id).select("email reminderActive");
      if (!user || !user.email) continue;
      if (user.reminderActive === false) continue;

      const uid = entry._id.toString();
      if (!canSendToday(uid)) {
        console.log(`[APS Cron] Skipped ${user.email} — max 3 reminders reached for today`);
        continue;
      }

      await sendApsReminder(uid, user.email, entry.latestScore);
      incrementSendCount(uid);
    }

    console.log(`[APS Cron] Done — processed ${recentEntries.length} users.`);
  } catch (err) {
    console.error("[APS Cron] Error:", err.message);
  }
});

/* =========================================
   ROUTES
========================================= */

// 1. STOP REMINDERS (used as unsubscribe link in email)
// GET /reminders/stop/:userId
router.get("/stop/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndUpdate(userId, { reminderActive: false });
    res.send(`
      <div style="font-family:Arial;text-align:center;padding:60px;">
        <h2>✅ Reminders stopped</h2>
        <p>You won't receive APS fitness reminders anymore.</p>
      </div>
    `);
  } catch (err) {
    res.status(500).send("Something went wrong.");
  }
});

// 2. RE-ENABLE REMINDERS
// POST /reminders/enable/:userId
router.post("/enable/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndUpdate(userId, { reminderActive: true });
    res.json({ message: "Reminders re-enabled" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. MANUAL TEST — fire email instantly without waiting for cron
// POST /reminders/test/:userId
router.post("/test/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("email");
    if (!user) return res.status(404).json({ message: "User not found" });

    const latest = await ApsHistory.findOne({ userId })
      .sort({ date: -1 })
      .select("apsScore");

    if (!latest) return res.status(404).json({ message: "No APS score found for this user" });

    await sendApsReminder(userId, user.email, latest.apsScore);

    res.json({
      message: "Test reminder sent successfully",
      email: user.email,
      score: latest.apsScore,
      tier: getTier(latest.apsScore).badge
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. CHECK APS STATUS (no email, just view score + tier)
// GET /reminders/status/:userId
router.get("/status/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("email reminderActive");
    if (!user) return res.status(404).json({ message: "User not found" });

    const latest = await ApsHistory.findOne({ userId })
      .sort({ date: -1 })
      .select("apsScore date readinessCategory recoveryType");

    if (!latest) return res.status(404).json({ message: "No APS score found" });

    const tier = getTier(latest.apsScore);

    res.json({
      email: user.email,
      reminderActive: user.reminderActive,
      latestAps: {
        score: latest.apsScore,
        date: latest.date,
        readinessCategory: latest.readinessCategory,
        recoveryType: latest.recoveryType
      },
      tier: {
        badge: tier.badge,
        range: `${tier.min}–${tier.max}`,
        subject: tier.subject
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;