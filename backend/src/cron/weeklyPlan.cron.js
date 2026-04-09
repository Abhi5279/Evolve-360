import cron from "node-cron";
import WeeklyPlan from "../models/WeeklyPlan.model.js";
import { regenerateWeeklyPlan } from "../services/plan/planRegenerator.service.js";

// Runs every day at 00:10 AM
cron.schedule("10 0 * * *", async () => {
  const today = new Date();

  const expiredPlans = await WeeklyPlan.find({
    status: "active",
    weekEndDate: { $lt: today }
  });

  for (const plan of expiredPlans) {
    try {
      await regenerateWeeklyPlan(plan.userId);
      console.log(`✅ Bi-weekly plan regenerated for ${plan.userId}`);
    } catch (err) {
      console.error(`❌ Failed for ${plan.userId}`, err.message);
    }
  }
});
