// src/models/ApsHistory.model.js

import mongoose from "mongoose";

const apsHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    apsScore: {
      type: Number,
      required: true
    },

    readinessCategory: {
      type: String,
      enum: ["low", "moderate", "high"]
    },

    recoveryType: {
      type: String,
      enum: ["none", "active_recovery", "mobility", "rest"]
    }
  },
  {
    timestamps: true
  }
);

// One APS entry per user per day
apsHistorySchema.index({ userId: 1, date: 1 }, { unique: true });

const ApsHistory = mongoose.model("ApsHistory", apsHistorySchema);

export default ApsHistory;
