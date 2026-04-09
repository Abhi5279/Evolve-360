// // routes/waterReminder.routes.js

// import express from "express";
// import cron from "node-cron";
// import nodemailer from "nodemailer";
// // import { runGeminiJSON } from "../services/gemini.service.js";
// import { runGeminiJSON } from "../services/ai/gemini.service.js";

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
//    IN-MEMORY HYDRATION STATE
//    (mirrors your existing hydration system)
// ========================================= */
// let hydrationState = {
//   target: 0,
//   consumed: 0,
//   status: "onTrack",       // onTrack | completed
//   completionMailSent: false,
//   notificationEnabled: true,
//   date: null
// };

// function getTodayKey() {
//   const now = new Date();
//   if (now.getHours() < 6) now.setDate(now.getDate() - 1);
//   return now.toISOString().split("T")[0];
// }

// function syncState(target, consumed, status) {
//   hydrationState.target = target;
//   hydrationState.consumed = consumed;
//   hydrationState.status = status;
//   hydrationState.date = getTodayKey();
// }

// /* =========================================
//    GEMINI — AI WATER REMINDER CONTENT
// ========================================= */
// async function getAIWaterContent({ consumed, target, remaining, percentDone }) {
//   const prompt = `
// You are a hydration coach. A user has drunk ${consumed}ml out of their ${target}ml daily water target.
// They have ${remaining}ml remaining (${percentDone}% done).

// Generate a hydration reminder email content. Respond ONLY with a JSON object:
// {
//   "subject": "short catchy email subject with a water emoji",
//   "message": "one friendly 1-2 sentence reminder to drink water, specific to how much they've done",
//   "tip": "one practical hydration tip for right now (1 sentence)",
//   "cta": "short button text (2-4 words)"
// }

// Keep it friendly, motivating, and not preachy.
// `;

//   try {
//     return await runGeminiJSON({ prompt });
//   } catch (err) {
//     console.error("[Gemini Water] Fallback used:", err.message);
//     return getFallbackWaterContent(percentDone);
//   }
// }

// function getFallbackWaterContent(percentDone) {
//   if (percentDone < 25) {
//     return {
//       subject: "💧 Time to Start Hydrating!",
//       message: "You've barely started your water intake today. Your body needs water to function at its best.",
//       tip: "Keep a water bottle on your desk as a visual reminder to sip throughout the day.",
//       cta: "Start Drinking"
//     };
//   } else if (percentDone < 50) {
//     return {
//       subject: "💧 Halfway There — Keep Drinking!",
//       message: "You're making progress but still need more water today. Don't let the day get away from you.",
//       tip: "Drink a full glass of water right now before continuing your work.",
//       cta: "Drink Now"
//     };
//   } else if (percentDone < 75) {
//     return {
//       subject: "💧 Almost There — Final Push!",
//       message: "You're doing well! Just a little more water and you'll hit your goal for the day.",
//       tip: "Add a slice of lemon or mint to make the last stretch more enjoyable.",
//       cta: "Finish Strong"
//     };
//   } else {
//     return {
//       subject: "💧 So Close to Your Water Goal!",
//       message: "You're nearly at your hydration goal for today. Just a bit more to go!",
//       tip: "A glass of water now and you're done for the day — you've got this.",
//       cta: "Almost Done!"
//     };
//   }
// }

// /* =========================================
//    EMAIL HTML BUILDER
// ========================================= */
// function buildWaterEmailHtml({ consumed, target, remaining, percentDone, aiContent, stopLink }) {
//   const { message, tip, cta } = aiContent;
//   const progressColor = percentDone >= 75 ? "#27ae60"
//     : percentDone >= 50 ? "#f39c12"
//     : percentDone >= 25 ? "#e67e22"
//     : "#e74c3c";

//   const glassCount = Math.round(consumed / 250);
//   const glassTotal = Math.round(target / 250);

//   return `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8"/>
//   <meta name="viewport" content="width=device-width, initial-scale=1"/>
// </head>
// <body style="margin:0; padding:0; background:#eaf6ff; font-family: 'Segoe UI', Arial, sans-serif;">

//   <table width="100%" cellpadding="0" cellspacing="0" style="background:#eaf6ff; padding: 32px 0;">
//     <tr>
//       <td align="center">
//         <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

//           <!-- HEADER -->
//           <tr>
//             <td style="background: linear-gradient(135deg, #1a9be6, #0d7abf); padding: 32px 40px; text-align:center;">
//               <p style="margin:0; font-size:40px; line-height:1;">💧</p>
//               <h1 style="margin:10px 0 4px; color:#ffffff; font-size:22px; font-weight:700;">Hydration Reminder</h1>
//               <p style="margin:0; color:rgba(255,255,255,0.85); font-size:13px;">${getTodayKey()}</p>
//             </td>
//           </tr>

//           <!-- PROGRESS STATS -->
//           <tr>
//             <td style="padding: 32px 40px 0;">
//               <table width="100%" cellpadding="0" cellspacing="0">
//                 <tr>
//                   <!-- Consumed -->
//                   <td width="33%" style="text-align:center;">
//                     <p style="margin:0; font-size:28px; font-weight:800; color:#1a9be6;">${consumed}ml</p>
//                     <p style="margin:4px 0 0; font-size:11px; color:#aaa; text-transform:uppercase; letter-spacing:1px;">Consumed</p>
//                   </td>
//                   <!-- Divider -->
//                   <td width="1" style="background:#f0f0f0;">&nbsp;</td>
//                   <!-- Remaining -->
//                   <td width="33%" style="text-align:center;">
//                     <p style="margin:0; font-size:28px; font-weight:800; color:${progressColor};">${remaining}ml</p>
//                     <p style="margin:4px 0 0; font-size:11px; color:#aaa; text-transform:uppercase; letter-spacing:1px;">Remaining</p>
//                   </td>
//                   <!-- Divider -->
//                   <td width="1" style="background:#f0f0f0;">&nbsp;</td>
//                   <!-- Target -->
//                   <td width="33%" style="text-align:center;">
//                     <p style="margin:0; font-size:28px; font-weight:800; color:#333;">${target}ml</p>
//                     <p style="margin:4px 0 0; font-size:11px; color:#aaa; text-transform:uppercase; letter-spacing:1px;">Daily Target</p>
//                   </td>
//                 </tr>
//               </table>
//             </td>
//           </tr>

//           <!-- PROGRESS BAR -->
//           <tr>
//             <td style="padding: 20px 40px 0;">
//               <table width="100%" cellpadding="0" cellspacing="0">
//                 <tr>
//                   <td style="background:#e8f4fd; border-radius:99px; height:14px; overflow:hidden;">
//                     <div style="background: linear-gradient(90deg, #1a9be6, #0d7abf); width:${Math.min(percentDone, 100)}%; height:14px; border-radius:99px; transition: width 0.3s;"></div>
//                   </td>
//                 </tr>
//               </table>
//               <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">
//                 <tr>
//                   <td style="font-size:12px; color:#1a9be6; font-weight:700;">${percentDone}% complete</td>
//                   <td align="right" style="font-size:12px; color:#aaa;">~${glassCount} of ${glassTotal} glasses</td>
//                 </tr>
//               </table>
//             </td>
//           </tr>

//           <!-- DIVIDER -->
//           <tr><td style="padding:24px 40px 0;"><hr style="border:none; border-top:1px solid #f0f0f0;"/></td></tr>

//           <!-- AI MESSAGE -->
//           <tr>
//             <td style="padding: 24px 40px 0;">
//               <p style="margin:0; font-size:15px; color:#333; line-height:1.7;">${message}</p>
//             </td>
//           </tr>

//           <!-- TIP BLOCK -->
//           <tr>
//             <td style="padding: 16px 40px 28px;">
//               <table width="100%" cellpadding="0" cellspacing="0" style="background:#eaf6ff; border-radius:12px; border:1px solid #b8dff5;">
//                 <tr>
//                   <td style="padding:16px 20px;">
//                     <p style="margin:0 0 6px; font-size:11px; color:#1a9be6; text-transform:uppercase; letter-spacing:1.5px; font-weight:700;">💡 Quick Tip</p>
//                     <p style="margin:0; font-size:14px; color:#333; line-height:1.6;">${tip}</p>
//                   </td>
//                 </tr>
//               </table>
//             </td>
//           </tr>

//           <!-- NEXT GLASS SUGGESTION -->
//           <tr>
//             <td style="padding: 0 40px 28px; text-align:center;">
//               <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9ff; border-radius:12px;">
//                 <tr>
//                   <td style="padding: 16px 24px; text-align:center;">
//                     <p style="margin:0; font-size:13px; color:#888;">Suggested next intake</p>
//                     <p style="margin:4px 0 0; font-size:22px; font-weight:800; color:#1a9be6;">${Math.min(Math.ceil(remaining / 2), 500)}ml</p>
//                     <p style="margin:2px 0 0; font-size:12px; color:#aaa;">in the next 2 hours</p>
//                   </td>
//                 </tr>
//               </table>
//             </td>
//           </tr>

//           <!-- CTA -->
//           <tr>
//             <td style="padding: 0 40px 36px; text-align:center;">
//               <a href="${process.env.BASE_URL || '#'}" style="display:inline-block; background:linear-gradient(135deg, #1a9be6, #0d7abf); color:#ffffff; padding:14px 40px; border-radius:99px; text-decoration:none; font-size:15px; font-weight:700;">
//                 ${cta} 💧
//               </a>
//             </td>
//           </tr>

//           <!-- FOOTER -->
//           <tr>
//             <td style="background:#fafafa; border-top:1px solid #f0f0f0; padding:20px 40px; text-align:center;">
//               <p style="margin:0; font-size:12px; color:#bbb; line-height:1.7;">
//                 You're receiving this as part of your FitTrack hydration plan.<br/>
//                 <a href="${stopLink}" style="color:#bbb; text-decoration:underline;">Unsubscribe from water reminders</a>
//               </p>
//             </td>
//           </tr>

//         </table>
//       </td>
//     </tr>
//   </table>

// </body>
// </html>
//   `;
// }

// /* =========================================
//    CORE SEND FUNCTION
// ========================================= */
// async function sendWaterReminder(email, userId) {
//   const { consumed, target, status } = hydrationState;

//   if (status === "completed") return;
//   if (!hydrationState.notificationEnabled) return;

//   const remaining = Math.max(target - consumed, 0);
//   if (remaining <= 0) return;

//   const percentDone = Math.round((consumed / target) * 100);

//   const aiContent = await getAIWaterContent({ consumed, target, remaining, percentDone });
//   const stopLink = `${process.env.BASE_URL}/water-reminders/stop/${userId}`;

//   const transporter = getTransporter();

//   await transporter.sendMail({
//     from: `"FitTrack Hydration 💧" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: aiContent.subject,
//     html: buildWaterEmailHtml({ consumed, target, remaining, percentDone, aiContent, stopLink })
//   });

//   console.log(`[Water Reminder] ✅ Sent to ${email} | ${consumed}ml / ${target}ml (${percentDone}%)`);
// }

// /* =========================================
//    CRON — Every 2 hours between 8 AM – 10 PM
//    "0 8,10,12,14,16,18,20,22 * * *"
//    Change to "* * * * *" for testing
// ========================================= */
// let waterReminderTarget = null; // set via route

// cron.schedule("0 8,10,12,14,16,18,20,22 * * *", async () => {
//   console.log("[Water Cron] Running hydration reminder check...");

//   if (!waterReminderTarget) {
//     console.log("[Water Cron] No user configured. Use POST /water-reminders/setup to register.");
//     return;
//   }

//   await sendWaterReminder(waterReminderTarget.email, waterReminderTarget.userId);
// });

// /* =========================================
//    ROUTES
// ========================================= */

// // 1. SETUP — register user + hydration state for reminders
// // POST /water-reminders/setup
// // Body: { userId, email, target, consumed, status }
// router.post("/setup", (req, res) => {
//   const { userId, email, target, consumed = 0, status = "onTrack" } = req.body;

//   if (!userId || !email || !target) {
//     return res.status(400).json({ message: "userId, email and target are required" });
//   }

//   waterReminderTarget = { userId, email };
//   syncState(target, consumed, status);

//   res.json({
//     message: "Water reminder setup complete",
//     hydrationState
//   });
// });

// // 2. SYNC STATE — update consumed/target/status from your main hydration system
// // POST /water-reminders/sync
// // Body: { target, consumed, status }
// router.post("/sync", (req, res) => {
//   const { target, consumed, status } = req.body;

//   if (target === undefined || consumed === undefined) {
//     return res.status(400).json({ message: "target and consumed are required" });
//   }

//   syncState(target, consumed, status || "onTrack");

//   res.json({
//     message: "Hydration state synced",
//     hydrationState
//   });
// });

// // 3. MANUAL TEST — fire email instantly
// // POST /water-reminders/test
// // Body: { userId, email, target, consumed }
// router.post("/test", async (req, res) => {
//   try {
//     const { userId, email, target, consumed = 0 } = req.body;

//     if (!userId || !email || !target) {
//       return res.status(400).json({ message: "userId, email and target are required" });
//     }

//     syncState(target, consumed, "onTrack");
//     await sendWaterReminder(email, userId);

//     const remaining = Math.max(target - consumed, 0);
//     const percentDone = Math.round((consumed / target) * 100);

//     res.json({
//       message: "Water reminder sent successfully",
//       email,
//       consumed,
//       target,
//       remaining,
//       percentDone: `${percentDone}%`
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // 4. TOGGLE NOTIFICATIONS
// // POST /water-reminders/toggle
// router.post("/toggle", (req, res) => {
//   hydrationState.notificationEnabled = !hydrationState.notificationEnabled;
//   res.json({
//     message: `Water reminders ${hydrationState.notificationEnabled ? "enabled" : "disabled"}`,
//     notificationEnabled: hydrationState.notificationEnabled
//   });
// });

// // 5. STOP REMINDERS — unsubscribe link in email
// // GET /water-reminders/stop/:userId
// router.get("/stop/:userId", (req, res) => {
//   hydrationState.notificationEnabled = false;
//   res.send(`
//     <!DOCTYPE html>
//     <html>
//     <body style="font-family:Arial;background:#eaf6ff;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
//       <div style="background:#fff;border-radius:16px;padding:48px 56px;text-align:center;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
//         <p style="font-size:48px;margin:0 0 16px;">✅</p>
//         <h2 style="margin:0 0 8px;color:#222;">Water Reminders Stopped</h2>
//         <p style="margin:0;color:#888;font-size:15px;">You won't receive hydration reminders anymore.</p>
//       </div>
//     </body>
//     </html>
//   `);
// });

// // 6. STATUS — check current hydration state
// // GET /water-reminders/status
// router.get("/status", (req, res) => {
//   const { consumed, target, status, notificationEnabled } = hydrationState;
//   const remaining = Math.max(target - consumed, 0);
//   const percentDone = target > 0 ? Math.round((consumed / target) * 100) : 0;

//   res.json({
//     date: getTodayKey(),
//     consumed,
//     target,
//     remaining,
//     percentDone: `${percentDone}%`,
//     status,
//     notificationEnabled,
//     registeredUser: waterReminderTarget?.email || null
//   });
// });

// export default router;

// routes/waterReminder.routes.js

import express from "express";
import cron from "node-cron";
import nodemailer from "nodemailer";
import { runGeminiJSON } from "../services/ai/gemini.service.js";

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
   IN-MEMORY HYDRATION STATE
   (mirrors your existing hydration system)
========================================= */
let hydrationState = {
  target: 0,
  consumed: 0,
  status: "onTrack",       // onTrack | completed
  completionMailSent: false,
  notificationEnabled: true,
  date: null
};

function getTodayKey() {
  const now = new Date();
  if (now.getHours() < 6) now.setDate(now.getDate() - 1);
  return now.toISOString().split("T")[0];
}

function syncState(target, consumed, status) {
  hydrationState.target = target;
  hydrationState.consumed = consumed;
  hydrationState.status = status;
  hydrationState.date = getTodayKey();
}

/* =========================================
   GEMINI — AI WATER REMINDER CONTENT
========================================= */
async function getAIWaterContent({ consumed, target, remaining, percentDone }) {
  const prompt = `
You are a hydration coach. A user has drunk ${consumed}ml out of their ${target}ml daily water target.
They have ${remaining}ml remaining (${percentDone}% done).

Generate a hydration reminder email content. Respond ONLY with a JSON object:
{
  "subject": "short catchy email subject with a water emoji",
  "message": "one friendly 1-2 sentence reminder to drink water, specific to how much they've done",
  "tip": "one practical hydration tip for right now (1 sentence)",
  "cta": "short button text (2-4 words)"
}

Keep it friendly, motivating, and not preachy.
`;

  try {
    return await runGeminiJSON({ prompt });
  } catch (err) {
    console.error("[Gemini Water] Fallback used:", err.message);
    return getFallbackWaterContent(percentDone);
  }
}

function getFallbackWaterContent(percentDone) {
  if (percentDone < 25) {
    return {
      subject: "💧 Time to Start Hydrating!",
      message: "You've barely started your water intake today. Your body needs water to function at its best.",
      tip: "Keep a water bottle on your desk as a visual reminder to sip throughout the day.",
      cta: "Start Drinking"
    };
  } else if (percentDone < 50) {
    return {
      subject: "💧 Halfway There — Keep Drinking!",
      message: "You're making progress but still need more water today. Don't let the day get away from you.",
      tip: "Drink a full glass of water right now before continuing your work.",
      cta: "Drink Now"
    };
  } else if (percentDone < 75) {
    return {
      subject: "💧 Almost There — Final Push!",
      message: "You're doing well! Just a little more water and you'll hit your goal for the day.",
      tip: "Add a slice of lemon or mint to make the last stretch more enjoyable.",
      cta: "Finish Strong"
    };
  } else {
    return {
      subject: "💧 So Close to Your Water Goal!",
      message: "You're nearly at your hydration goal for today. Just a bit more to go!",
      tip: "A glass of water now and you're done for the day — you've got this.",
      cta: "Almost Done!"
    };
  }
}

/* =========================================
   EMAIL HTML BUILDER
========================================= */
function buildWaterEmailHtml({ consumed, target, remaining, percentDone, aiContent, stopLink }) {
  const { message, tip, cta } = aiContent;
  const progressColor = percentDone >= 75 ? "#27ae60"
    : percentDone >= 50 ? "#f39c12"
    : percentDone >= 25 ? "#e67e22"
    : "#e74c3c";

  const glassCount = Math.round(consumed / 250);
  const glassTotal = Math.round(target / 250);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
</head>
<body style="margin:0; padding:0; background:#eaf6ff; font-family: 'Segoe UI', Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#eaf6ff; padding: 32px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a9be6, #0d7abf); padding: 32px 40px; text-align:center;">
              <p style="margin:0; font-size:40px; line-height:1;">💧</p>
              <h1 style="margin:10px 0 4px; color:#ffffff; font-size:22px; font-weight:700;">Hydration Reminder</h1>
              <p style="margin:0; color:rgba(255,255,255,0.85); font-size:13px;">${getTodayKey()}</p>
            </td>
          </tr>

          <!-- PROGRESS STATS -->
          <tr>
            <td style="padding: 32px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <!-- Consumed -->
                  <td width="33%" style="text-align:center;">
                    <p style="margin:0; font-size:28px; font-weight:800; color:#1a9be6;">${consumed}ml</p>
                    <p style="margin:4px 0 0; font-size:11px; color:#aaa; text-transform:uppercase; letter-spacing:1px;">Consumed</p>
                  </td>
                  <!-- Divider -->
                  <td width="1" style="background:#f0f0f0;">&nbsp;</td>
                  <!-- Remaining -->
                  <td width="33%" style="text-align:center;">
                    <p style="margin:0; font-size:28px; font-weight:800; color:${progressColor};">${remaining}ml</p>
                    <p style="margin:4px 0 0; font-size:11px; color:#aaa; text-transform:uppercase; letter-spacing:1px;">Remaining</p>
                  </td>
                  <!-- Divider -->
                  <td width="1" style="background:#f0f0f0;">&nbsp;</td>
                  <!-- Target -->
                  <td width="33%" style="text-align:center;">
                    <p style="margin:0; font-size:28px; font-weight:800; color:#333;">${target}ml</p>
                    <p style="margin:4px 0 0; font-size:11px; color:#aaa; text-transform:uppercase; letter-spacing:1px;">Daily Target</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- PROGRESS BAR -->
          <tr>
            <td style="padding: 20px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#e8f4fd; border-radius:99px; height:14px; overflow:hidden;">
                    <div style="background: linear-gradient(90deg, #1a9be6, #0d7abf); width:${Math.min(percentDone, 100)}%; height:14px; border-radius:99px; transition: width 0.3s;"></div>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">
                <tr>
                  <td style="font-size:12px; color:#1a9be6; font-weight:700;">${percentDone}% complete</td>
                  <td align="right" style="font-size:12px; color:#aaa;">~${glassCount} of ${glassTotal} glasses</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- DIVIDER -->
          <tr><td style="padding:24px 40px 0;"><hr style="border:none; border-top:1px solid #f0f0f0;"/></td></tr>

          <!-- AI MESSAGE -->
          <tr>
            <td style="padding: 24px 40px 0;">
              <p style="margin:0; font-size:15px; color:#333; line-height:1.7;">${message}</p>
            </td>
          </tr>

          <!-- TIP BLOCK -->
          <tr>
            <td style="padding: 16px 40px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#eaf6ff; border-radius:12px; border:1px solid #b8dff5;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 6px; font-size:11px; color:#1a9be6; text-transform:uppercase; letter-spacing:1.5px; font-weight:700;">💡 Quick Tip</p>
                    <p style="margin:0; font-size:14px; color:#333; line-height:1.6;">${tip}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- NEXT GLASS SUGGESTION -->
          <tr>
            <td style="padding: 0 40px 28px; text-align:center;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9ff; border-radius:12px;">
                <tr>
                  <td style="padding: 16px 24px; text-align:center;">
                    <p style="margin:0; font-size:13px; color:#888;">Suggested next intake</p>
                    <p style="margin:4px 0 0; font-size:22px; font-weight:800; color:#1a9be6;">${Math.min(Math.ceil(remaining / 2), 500)}ml</p>
                    <p style="margin:2px 0 0; font-size:12px; color:#aaa;">in the next 2 hours</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding: 0 40px 36px; text-align:center;">
              <a href="${process.env.BASE_URL || '#'}" style="display:inline-block; background:linear-gradient(135deg, #1a9be6, #0d7abf); color:#ffffff; padding:14px 40px; border-radius:99px; text-decoration:none; font-size:15px; font-weight:700;">
                ${cta} 💧
              </a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#fafafa; border-top:1px solid #f0f0f0; padding:20px 40px; text-align:center;">
              <p style="margin:0; font-size:12px; color:#bbb; line-height:1.7;">
                You're receiving this as part of your FitTrack hydration plan.<br/>
                <a href="${stopLink}" style="color:#bbb; text-decoration:underline;">Unsubscribe from water reminders</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `;
}

/* =========================================
   CORE SEND FUNCTION
========================================= */
async function sendWaterReminder(email, userId) {
  const { consumed, target, status } = hydrationState;

  if (status === "completed") return;
  if (!hydrationState.notificationEnabled) return;

  const remaining = Math.max(target - consumed, 0);
  if (remaining <= 0) return;

  const percentDone = Math.round((consumed / target) * 100);

  const aiContent = await getAIWaterContent({ consumed, target, remaining, percentDone });
  const stopLink = `${process.env.BASE_URL}/water-reminders/stop/${userId}`;

  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"Evolve 360💧" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: aiContent.subject,
    html: buildWaterEmailHtml({ consumed, target, remaining, percentDone, aiContent, stopLink })
  });

  console.log(`[Water Reminder] ✅ Sent to ${email} | ${consumed}ml / ${target}ml (${percentDone}%)`);
}

/* =========================================
   CRON — Every 2 hours between 8 AM – 10 PM
   "0 8,10,12,14,16,18,20,22 * * *"
   Change to "* * * * *" for testing
========================================= */
let waterReminderTarget = null; // set via route

cron.schedule("0 8,10,12,14,16,18,20,22 * * *", async () => {
  console.log("[Water Cron] Running hydration reminder check...");

  if (!waterReminderTarget) {
    console.log("[Water Cron] No user configured. Use POST /water-reminders/setup to register.");
    return;
  }

  await sendWaterReminder(waterReminderTarget.email, waterReminderTarget.userId);
});

/* =========================================
   ROUTES
========================================= */

// 1. SETUP — register user + hydration state for reminders
// POST /water-reminders/setup
// Body: { userId, email, target, consumed, status }
router.post("/setup", (req, res) => {
  const { userId, email, target, consumed = 0, status = "onTrack" } = req.body;

  if (!userId || !email || !target) {
    return res.status(400).json({ message: "userId, email and target are required" });
  }

  waterReminderTarget = { userId, email };
  syncState(target, consumed, status);

  res.json({
    message: "Water reminder setup complete",
    hydrationState
  });
});

// 2. SYNC STATE — update consumed/target/status from your main hydration system
// POST /water-reminders/sync
// Body: { target, consumed, status }
router.post("/sync", (req, res) => {
  const { target, consumed, status } = req.body;

  if (target === undefined || consumed === undefined) {
    return res.status(400).json({ message: "target and consumed are required" });
  }

  syncState(target, consumed, status || "onTrack");

  res.json({
    message: "Hydration state synced",
    hydrationState
  });
});

// 3. MANUAL TEST — fire email instantly
// POST /water-reminders/test
// Body: { userId, email, target, consumed }
router.post("/test", async (req, res) => {
  try {
    const { userId, email, target, consumed = 0 } = req.body;

    if (!userId || !email || !target) {
      return res.status(400).json({ message: "userId, email and target are required" });
    }

    syncState(target, consumed, "onTrack");
    await sendWaterReminder(email, userId);

    const remaining = Math.max(target - consumed, 0);
    const percentDone = Math.round((consumed / target) * 100);

    res.json({
      message: "Water reminder sent successfully",
      email,
      consumed,
      target,
      remaining,
      percentDone: `${percentDone}%`
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. TOGGLE NOTIFICATIONS
// POST /water-reminders/toggle
router.post("/toggle", (req, res) => {
  hydrationState.notificationEnabled = !hydrationState.notificationEnabled;
  res.json({
    message: `Water reminders ${hydrationState.notificationEnabled ? "enabled" : "disabled"}`,
    notificationEnabled: hydrationState.notificationEnabled
  });
});

// 5. STOP REMINDERS — unsubscribe link in email
// GET /water-reminders/stop/:userId
router.get("/stop/:userId", (req, res) => {
  const { userId } = req.params;

  // Disable globally if it matches the registered user
  if (waterReminderTarget && waterReminderTarget.userId === userId) {
    hydrationState.notificationEnabled = false;
    waterReminderTarget = null; // clear registered user so cron skips entirely
  }

  res.send(`
    <!DOCTYPE html>
    <html>
    <body style="font-family:Arial;background:#eaf6ff;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
      <div style="background:#fff;border-radius:16px;padding:48px 56px;text-align:center;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <p style="font-size:48px;margin:0 0 16px;">✅</p>
        <h2 style="margin:0 0 8px;color:#222;">Water Reminders Stopped</h2>
        <p style="margin:0;color:#888;font-size:15px;">You won't receive hydration reminders anymore.</p>
      </div>
    </body>
    </html>
  `);
});

// 6. STATUS — check current hydration state
// GET /water-reminders/status
router.get("/status", (req, res) => {
  const { consumed, target, status, notificationEnabled } = hydrationState;
  const remaining = Math.max(target - consumed, 0);
  const percentDone = target > 0 ? Math.round((consumed / target) * 100) : 0;

  res.json({
    date: getTodayKey(),
    consumed,
    target,
    remaining,
    percentDone: `${percentDone}%`,
    status,
    notificationEnabled,
    registeredUser: waterReminderTarget?.email || null
  });
});

export default router;