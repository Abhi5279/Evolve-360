import mongoose from "mongoose";

/* ─────────────────────────────────────────────
   SUB-SCHEMAS (reusable, clean structure)
───────────────────────────────────────────── */

const CompensationFlagSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      trim: true,
      // e.g. "knee_valgus", "hip_shift", "forward_lean"
    },
    severity: {
      type: String,
      enum: ["mild", "moderate", "severe"],
      required: true,
    },
  },
  { _id: false }
);

const SuggestionDomainSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["excellent", "good", "needs_attention", "critical"],
      required: true,
    },
    suggestions: [{ type: String }],
  },
  { _id: false }
);

/* ─────────────────────────────────────────────
   BREAKDOWN SUB-SCHEMAS
───────────────────────────────────────────── */

const ROMBreakdownSchema = new mongoose.Schema(
  {
    baselineDeg:        { type: Number, default: 0 },
    currentDeg:         { type: Number, default: 0 },
    normativeDeg:       { type: Number, default: null },
    improvementPercent: { type: Number, default: 0 },
    weight:             { type: Number, default: 0.2 },
  },
  { _id: false }
);

const PainBreakdownSchema = new mongoose.Schema(
  {
    baselineNRS:      { type: Number, default: 0 },
    currentNRS:       { type: Number, default: 0 },
    reductionPercent: { type: Number, default: 0 },
    weight:           { type: Number, default: 0.2 },
  },
  { _id: false }
);

const SymmetryBreakdownSchema = new mongoose.Schema(
  {
    injuredValue:   { type: Number, default: 0 },
    uninjuredValue: { type: Number, default: 0 },
    lsiPercent:     { type: Number, default: 0 },
    weight:         { type: Number, default: 0.15 },
  },
  { _id: false }
);

const AdherenceBreakdownSchema = new mongoose.Schema(
  {
    completedSessions:       { type: Number, default: 0 },
    prescribedSessions:      { type: Number, default: 0 },
    longestMissedStreakDays: { type: Number, default: 0 },
    adherencePercent:        { type: Number, default: 0 },
    weight:                  { type: Number, default: 0.15 },
  },
  { _id: false }
);

const FatigueBreakdownSchema = new mongoose.Schema(
  {
    readinessPercent:       { type: Number, default: 100 },
    actualIntensityPercent: { type: Number, default: null },
    actualRPE:              { type: Number, default: null },
    fatigueResponseScore:   { type: Number, default: 0 },
    weight:                 { type: Number, default: 0.1 },
  },
  { _id: false }
);

const FormBreakdownSchema = new mongoose.Schema(
  {
    formQualityPercent: { type: Number, default: 50 },
    weight:             { type: Number, default: 0.2 },
  },
  { _id: false }
);

const CompensationBreakdownSchema = new mongoose.Schema(
  {
    flags:         [CompensationFlagSchema],
    penaltyApplied: { type: Number, default: 0 },
  },
  { _id: false }
);

const BreakdownSchema = new mongoose.Schema(
  {
    rom:                        ROMBreakdownSchema,
    pain:                       PainBreakdownSchema,
    symmetry:                   SymmetryBreakdownSchema,
    adherence:                  AdherenceBreakdownSchema,
    fatigue:                    FatigueBreakdownSchema,
    form:                       FormBreakdownSchema,
    compensation:               CompensationBreakdownSchema,
    weightedScoreBeforePenalty: { type: Number, default: 0 },
  },
  { _id: false }
);

/* ─────────────────────────────────────────────
   RAW INPUT SNAPSHOT
   Store exactly what the user sent so you can
   re-run calculations or audit later.
───────────────────────────────────────────── */

const RawInputSchema = new mongoose.Schema(
  {
    rom: {
      baselineDeg:  { type: Number, default: null },
      currentDeg:   { type: Number, default: null },
      normativeDeg: { type: Number, default: null },
      history:      [Number],
    },
    pain: {
      baselineNRS: { type: Number, default: null },
      currentNRS:  { type: Number, default: null },
    },
    symmetry: {
      injuredValue:   { type: Number, default: null },
      uninjuredValue: { type: Number, default: null },
      historyPercent: [Number],
    },
    adherence: {
      completedSessions:       { type: Number, default: null },
      prescribedSessions:      { type: Number, default: null },
      longestMissedStreakDays: { type: Number, default: 0 },
    },
    fatigue: {
      readinessPercent:       { type: Number, default: null },
      actualIntensityPercent: { type: Number, default: null },
      actualRPE:              { type: Number, default: null },
    },
    form: {
      formQualityPercent: { type: Number, default: null },
      poseQualityArray:   [Number],
    },
    compensations: [CompensationFlagSchema],
    weights: {
      rom:       { type: Number, default: 0.2 },
      pain:      { type: Number, default: 0.2 },
      symmetry:  { type: Number, default: 0.15 },
      adherence: { type: Number, default: 0.15 },
      fatigue:   { type: Number, default: 0.1 },
      form:      { type: Number, default: 0.2 },
    },
  },
  { _id: false }
);

/* ─────────────────────────────────────────────
   MAIN SCHEMA
───────────────────────────────────────────── */

const RehabSessionSchema = new mongoose.Schema(
  {
    // ── Who this belongs to ──
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // ── Clinical context (optional but useful) ──
    sessionType: {
      type: String,
      enum: [
        "Initial Assessment",
        "Reassessment",
        "Treatment Session",
        "Discharge Assessment",
        "Home Visit",
        "Telehealth Review",
      ],
      default: "Treatment Session",
    },
    bodyRegion: {
      type: String,
      trim: true,
      default: null,
      // e.g. "Lumbar Spine", "Knee", "Shoulder"
    },
    rehabilitationPhase: {
      type: String,
      enum: ["Acute", "Sub-acute", "Chronic", "Post-surgical", "Return to Sport", "Maintenance"],
      default: null,
    },
    patientDescription: {
      type: String,
      trim: true,
      default: null,
      // Chief complaint / clinician notes snapshot
    },

    // ── RRS Result ──
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    recoveryPhase: {
      type: String,
      enum: ["Acute Recovery", "Controlled Loading", "Strength Rebuild", "Performance Ready"],
      required: true,
    },

    // ── Suggestions ──
    suggestions: {
      overall: [{ type: String }],
      byDomain: {
        rom:       SuggestionDomainSchema,
        pain:      SuggestionDomainSchema,
        symmetry:  SuggestionDomainSchema,
        adherence: SuggestionDomainSchema,
        fatigue:   SuggestionDomainSchema,
        form:      SuggestionDomainSchema,
      },
    },

    // ── Full breakdown ──
    breakdown: BreakdownSchema,

    // ── Raw input snapshot ──
    rawInput: RawInputSchema,

    // ── Meta ──
    sessionDate: {
      type: Date,
      default: Date.now,
      index: true,
    },
    notes: {
      type: String,
      trim: true,
      default: null,
      // Clinician free-text notes for this session
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt + updatedAt automatically
    collection: "rehab_sessions",
  }
);

/* ─────────────────────────────────────────────
   INDEXES
───────────────────────────────────────────── */

// Fast lookup: all sessions for a user, sorted by date
RehabSessionSchema.index({ userId: 1, sessionDate: -1 });

// Filter by phase across users (e.g. analytics dashboard)
RehabSessionSchema.index({ recoveryPhase: 1 });

// Score range queries
RehabSessionSchema.index({ userId: 1, score: 1 });

/* ─────────────────────────────────────────────
   VIRTUALS
───────────────────────────────────────────── */

// Human-readable score band — available on any document
RehabSessionSchema.virtual("scoreBand").get(function () {
  if (this.score >= 75) return "High";
  if (this.score >= 55) return "Moderate-High";
  if (this.score >= 35) return "Moderate-Low";
  return "Low";
});

// Days since this session
RehabSessionSchema.virtual("daysSinceSession").get(function () {
  const diff = Date.now() - new Date(this.sessionDate).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
});

const RehabSession = mongoose.model("RehabSession", RehabSessionSchema);
export default RehabSession;