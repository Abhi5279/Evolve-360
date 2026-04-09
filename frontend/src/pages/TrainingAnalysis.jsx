import { useState, useEffect } from "react";
import { trainingAPI } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import {
  Zap, ChevronRight, ChevronLeft, Check, Clock,
  Flame, Target, BarChart2, RotateCcw, TrendingUp,
  AlertTriangle, ChevronDown
} from "lucide-react";

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const T = {
  gradBody:    "linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #eef2ff 100%)",
  gradPrimary: "linear-gradient(135deg, #2563eb, #6366f1, #7c3aed)",
  indigo:      "#6366f1",
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
  success:     "#22c55e",
  danger:      "#f43f5e",
  amber:       "#f59e0b",
};

const glass = {
  background:           T.surface,
  backdropFilter:       "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border:               `1px solid ${T.borderLight}`,
  boxShadow:            T.shadowCard,
};

/* ─────────────────────────────────────────────
   KEYFRAMES
───────────────────────────────────────────── */
const KEYFRAMES = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes countUp {
  from { opacity: 0; transform: scale(0.82); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes slideIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

.ta-fade   { animation: fadeUp 0.38s ease forwards; }
.ta-count  { animation: countUp 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards; }
.ta-delay1 { animation-delay: 0.06s; opacity: 0; }
.ta-delay2 { animation-delay: 0.12s; opacity: 0; }
.ta-delay3 { animation-delay: 0.18s; opacity: 0; }
.ta-delay4 { animation-delay: 0.24s; opacity: 0; }

.hist-row:hover {
  transform: translateY(-2px) !important;
  border-color: rgba(99,102,241,0.22) !important;
  box-shadow: 0 8px 28px rgba(99,102,241,0.10) !important;
}

.seg-btn:hover {
  border-color: #6366f1 !important;
  background: rgba(99,102,241,0.08) !important;
  color: #6366f1 !important;
}

.type-chip:hover {
  border-color: #6366f1 !important;
  background: rgba(99,102,241,0.08) !important;
  color: #6366f1 !important;
}

.input-focus:focus {
  border-color: #6366f1 !important;
  background: rgba(238,242,255,0.9) !important;
  box-shadow: 0 0 0 3px rgba(99,102,241,0.10) !important;
  outline: none !important;
}
`;

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const STEPS = [
  { id: 0, icon: "⚡", label: "Session",    desc: "What did you train today?" },
  { id: 1, icon: "💪", label: "Load",       desc: "Training load details"     },
  { id: 2, icon: "🧠", label: "Readiness",  desc: "How your body responded"   },
];

const SESSION_TYPES = [
  { value: "strength",    icon: "🏋️", label: "Strength"   },
  { value: "hypertrophy", icon: "💪", label: "Hypertrophy" },
  { value: "endurance",   icon: "🏃", label: "Endurance"   },
  { value: "power",       icon: "⚡", label: "Power"       },
  { value: "hiit",        icon: "🔥", label: "HIIT"        },
  { value: "mobility",    icon: "🧘", label: "Mobility"    },
  { value: "sport",       icon: "⚽", label: "Sport"       },
  { value: "recovery",    icon: "😴", label: "Recovery"    },
];

const MUSCLES = [
  "Chest", "Back", "Shoulders", "Biceps", "Triceps",
  "Core", "Quads", "Hamstrings", "Glutes", "Calves", "Full Body",
];

const RPE_LABELS = {
  1: "Very Easy", 2: "Easy", 3: "Moderate", 4: "Somewhat Hard",
  5: "Hard", 6: "Harder", 7: "Very Hard", 8: "Very Very Hard",
  9: "Near Max", 10: "Max Effort",
};

const scoreColor = (s) =>
  s >= 80 ? T.success : s >= 55 ? T.indigo : s >= 35 ? T.amber : T.danger;

const scoreGrad = (s) =>
  s >= 80
    ? "linear-gradient(135deg,#059669,#22c55e)"
    : s >= 55
    ? "linear-gradient(135deg,#2563eb,#6366f1,#7c3aed)"
    : s >= 35
    ? "linear-gradient(135deg,#d97706,#f59e0b)"
    : "linear-gradient(135deg,#dc2626,#f43f5e)";

/* ─────────────────────────────────────────────
   ATOMS
───────────────────────────────────────────── */
function Label({ children }) {
  return (
    <p style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.18em",
      textTransform: "uppercase", color: T.muted, marginBottom: 8 }}>
      {children}
    </p>
  );
}

function ScaleSlider({ name, value, onChange, min = 1, max = 10, label, colorize, unit = "" }) {
  const pct   = ((value - min) / (max - min)) * 100;
  const color = colorize
    ? pct < 35 ? T.success : pct < 65 ? T.indigo : T.danger
    : T.indigo;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <Label>{label}</Label>
        <span style={{ fontSize: 24, fontWeight: 900, color,
          fontFamily: "'Outfit', sans-serif", lineHeight: 1 }}>
          {value}{unit}
        </span>
      </div>
      <input type="range" name={name} min={min} max={max} value={value}
        onChange={onChange}
        style={{ width: "100%", accentColor: color, cursor: "pointer", height: 4 }} />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
        <span style={{ fontSize: 10, color: T.muted }}>{min}{unit}</span>
        {colorize && value <= max && (
          <span style={{ fontSize: 10, color, fontWeight: 600 }}>
            {RPE_LABELS[value] || ""}
          </span>
        )}
        <span style={{ fontSize: 10, color: T.muted }}>{max}{unit}</span>
      </div>
    </div>
  );
}

function SegmentPicker({ options, value, onChange, name }) {
  const colorMap = { low: T.success, moderate: T.indigo, high: T.danger,
                     yes: T.danger, no: T.success };
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {options.map(opt => {
        const active = value === opt;
        const color  = colorMap[opt] || T.indigo;
        return (
          <button key={opt} className="seg-btn" type="button"
            onClick={() => onChange(name, opt)}
            style={{
              flex: 1, padding: "11px 8px", borderRadius: 11,
              border: `1.5px solid ${active ? color : T.borderSoft}`,
              background: active ? `${color}14` : "rgba(238,242,255,0.45)",
              color: active ? color : T.muted,
              fontFamily: "'Outfit', sans-serif",
              fontSize: 12, fontWeight: active ? 700 : 500,
              cursor: "pointer", transition: "all 0.15s",
              textTransform: "capitalize",
            }}>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function MuscleSelector({ selected, onToggle }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
      {MUSCLES.map(m => {
        const on = selected.includes(m);
        return (
          <button key={m} className="type-chip" type="button"
            onClick={() => onToggle(m)}
            style={{
              padding: "6px 13px", borderRadius: 99,
              border: `1.5px solid ${on ? T.indigo : T.borderSoft}`,
              background: on ? "rgba(99,102,241,0.10)" : "rgba(238,242,255,0.5)",
              color: on ? T.indigo : T.muted,
              fontFamily: "'Outfit', sans-serif",
              fontSize: 11, fontWeight: on ? 700 : 500,
              cursor: "pointer", transition: "all 0.15s",
            }}>
            {m}
          </button>
        );
      })}
    </div>
  );
}

function NumberInput({ name, value, onChange, label, unit, min = 0 }) {
  return (
    <div>
      <Label>{label}</Label>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <input
          className="input-focus"
          type="number" name={name} value={value} min={min}
          onChange={onChange}
          style={{
            flex: 1, padding: "11px 14px", borderRadius: 11,
            border: `1.5px solid ${T.borderSoft}`,
            background: "rgba(238,242,255,0.5)",
            fontFamily: "'Outfit', sans-serif",
            fontSize: 14, color: T.text, transition: "all 0.18s",
          }}
        />
        {unit && <span style={{ fontSize: 12, color: T.muted, fontWeight: 600, whiteSpace: "nowrap" }}>{unit}</span>}
      </div>
    </div>
  );
}

function TextInput({ name, value, onChange, label, placeholder }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        className="input-focus"
        type="text" name={name} value={value}
        onChange={onChange} placeholder={placeholder}
        style={{
          width: "100%", padding: "11px 14px", borderRadius: 11,
          border: `1.5px solid ${T.borderSoft}`,
          background: "rgba(238,242,255,0.5)",
          fontFamily: "'Outfit', sans-serif",
          fontSize: 13, color: T.text, transition: "all 0.18s",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "9px 0", borderBottom: `1px solid ${T.borderSoft}` }}>
      <span style={{ fontSize: 11, color: T.textLight, fontWeight: 600,
        textTransform: "capitalize", letterSpacing: "0.03em" }}>
        {label}
      </span>
      <span style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{String(value)}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCORE RING
───────────────────────────────────────────── */
function ScoreRing({ score, size = 120 }) {
  const R    = (size / 2) - 9;
  const circ = 2 * Math.PI * R;
  const fill = (Math.min(score, 100) / 100) * circ;
  const col  = scoreColor(score);
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={R} fill="none" stroke={`${col}20`} strokeWidth={9} />
        <circle cx={size/2} cy={size/2} r={R} fill="none" stroke={col} strokeWidth={9}
          strokeDasharray={`${fill} ${circ}`} strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ transition: "stroke-dasharray 1s cubic-bezier(.4,0,.2,1)" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span className="ta-count" style={{ fontSize: size > 100 ? 30 : 22,
          fontWeight: 900, color: col, lineHeight: 1,
          fontFamily: "'Outfit', sans-serif" }}>{score}</span>
        <span style={{ fontSize: 9, color: T.muted, fontWeight: 600 }}>/100</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HISTORY ROW
───────────────────────────────────────────── */
function HistoryRow({ rec, index }) {
  const [open, setOpen] = useState(false);
  const score = rec.performanceScore ?? rec.score ?? rec.analysisScore ?? 0;
  const col   = scoreColor(score);
  const date  = new Date(rec.date || rec.sessionDate || rec.createdAt);

  return (
    <div className="hist-row" style={{
      ...glass, borderRadius: 14, overflow: "hidden",
      border: `1px solid ${T.borderSoft}`, transition: "all 0.2s",
      animation: `slideIn 0.32s ease ${index * 35}ms both`,
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", alignItems: "center", gap: 14,
        padding: "14px 18px", background: "transparent",
        border: "none", cursor: "pointer", textAlign: "left",
      }}>
        {/* Score badge */}
        <div style={{ width: 46, height: 46, borderRadius: 12, flexShrink: 0,
          background: scoreGrad(score),
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 2px 10px ${col}30` }}>
          <span style={{ fontSize: 14, fontWeight: 900, color: "white",
            fontFamily: "'Outfit', sans-serif" }}>{Math.round(score)}</span>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 800, color: T.text, marginBottom: 3 }}>
            {rec.sessionType?.replace(/_/g, " ") || "Training Session"}
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, color: T.muted }}>
              🕐 {rec.durationMinutes || rec.duration || "—"}min
            </span>
            {rec.muscleGroups?.length > 0 && (
              <>
                <span style={{ color: T.borderSoft }}>|</span>
                <span style={{ fontSize: 11, color: T.muted }}>
                  💪 {rec.muscleGroups.slice(0, 2).join(", ")}
                  {rec.muscleGroups.length > 2 ? ` +${rec.muscleGroups.length - 2}` : ""}
                </span>
              </>
            )}
            <span style={{ color: T.borderSoft }}>|</span>
            <span style={{ fontSize: 11, color: T.muted }}>
              {date.toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
        </div>

        {/* RPE chip */}
        {rec.perceivedExertion && (
          <span style={{ padding: "4px 10px", borderRadius: 99, fontSize: 10,
            fontWeight: 700, background: "rgba(99,102,241,0.08)",
            border: "1px solid rgba(99,102,241,0.18)", color: T.indigo,
            flexShrink: 0 }}>
            RPE {rec.perceivedExertion}
          </span>
        )}

        <ChevronDown size={15} style={{ color: T.muted, flexShrink: 0,
          transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }} />
      </button>

      {open && (
        <div style={{ padding: "0 18px 16px", borderTop: `1px solid ${T.borderSoft}` }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, paddingTop: 12, marginBottom: 12 }}>
            {[
              { label: "Score",        val: `${Math.round(score)}/100`,          color: col     },
              { label: "RPE",          val: rec.perceivedExertion ?? "—",        color: T.indigo },
              { label: "Sets",         val: rec.totalSets ?? "—",                color: T.violet },
              { label: "Volume",       val: rec.volumeLevel || "—",              color: T.blue   },
            ].map(({ label, val, color }) => (
              <div key={label} style={{ background: "rgba(238,242,255,0.55)",
                border: `1px solid ${T.borderSoft}`, borderRadius: 10, padding: "10px 12px" }}>
                <p style={{ fontSize: 8.5, fontWeight: 700, color: T.muted,
                  textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 4 }}>
                  {label}
                </p>
                <p style={{ fontSize: 15, fontWeight: 900, color,
                  fontFamily: "'Outfit', sans-serif", textTransform: "capitalize" }}>
                  {String(val)}
                </p>
              </div>
            ))}
          </div>

          {/* Muscle groups */}
          {rec.muscleGroups?.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {rec.muscleGroups.map(m => (
                <span key={m} style={{ padding: "3px 10px", borderRadius: 99, fontSize: 10,
                  fontWeight: 600, background: "rgba(99,102,241,0.07)",
                  border: "1px solid rgba(99,102,241,0.15)", color: T.indigo }}>
                  {m}
                </span>
              ))}
            </div>
          )}

          {/* AI feedback if present */}
          {rec.feedback && (
            <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10,
              background: "rgba(238,242,255,0.6)", border: `1px solid ${T.borderSoft}` }}>
              <p style={{ fontSize: 9.5, fontWeight: 700, color: T.muted,
                letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 5 }}>
                AI Feedback
              </p>
              <p style={{ fontSize: 12, color: T.textMid, lineHeight: 1.65 }}>{rec.feedback}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function TrainingAnalysis() {
  const { user } = useAuth();
  const userId   = user?._id || user?.id;
  const today    = new Date().toISOString().split("T")[0];

  /* ── wizard state ── */
  const [step,    setStep]    = useState(0);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [result,  setResult]  = useState(null);

  /* ── history ── */
  const [history,     setHistory]     = useState([]);
  const [histLoading, setHistLoading] = useState(true);

  /* ── form ── */
  const [form, setForm] = useState({
    sessionType:        "strength",
    muscleGroups:       [],
    durationMinutes:    60,
    totalSets:          15,
    totalReps:          120,
    weightUsed:         "",
    perceivedExertion:  7,
    volumeLevel:        "moderate",
    intensityLevel:     "moderate",
    completionRate:     100,
    energyLevel:        7,
    sleepQuality:       7,
    stressLevel:        4,
    injuryFlag:         "no",
    notes:              "",
  });

  /* ── fetch history ── */
  useEffect(() => {
    if (!userId) return;
    trainingAPI.getUserRecords(userId)
      .then(r => setHistory(r.data?.data || r.data?.records || []))
      .catch(() => setHistory([]))
      .finally(() => setHistLoading(false));
  }, [userId]);

  /* ── derived stats ── */
  const avgScore  = history.length
    ? Math.round(history.reduce((a, b) => a + (b.performanceScore ?? b.score ?? 0), 0) / history.length)
    : null;
  const bestScore = history.length
    ? Math.max(...history.map(h => h.performanceScore ?? h.score ?? 0))
    : null;

  /* ── change handlers ── */
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const numFields = ["durationMinutes","totalSets","totalReps","weightUsed",
                       "perceivedExertion","completionRate","energyLevel",
                       "sleepQuality","stressLevel"];
    setForm(prev => ({
      ...prev,
      [name]: numFields.includes(name) && value !== "" ? Number(value) : value,
    }));
  };

  const handleSet = (name, value) =>
    setForm(prev => ({ ...prev, [name]: value }));

  const toggleMuscle = (m) =>
    setForm(prev => ({
      ...prev,
      muscleGroups: prev.muscleGroups.includes(m)
        ? prev.muscleGroups.filter(x => x !== m)
        : [...prev.muscleGroups, m],
    }));

  /* ── submit ── */
  const handleSubmit = async () => {
    setError(""); setLoading(true);
    try {
      const res = await trainingAPI.create({
        userId, date: today, ...form,
        injuryFlag: form.injuryFlag === "yes",
      });
      const data = res.data?.data || res.data;
      setResult(data);
      setHistory(prev => [data, ...prev]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────────────────
     STEP CONTENT
  ───────────────────────────────────────────── */
  const stepContent = [

    /* STEP 0 — Session */
    <div key={0} className="ta-fade" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div>
        <Label>Session Type</Label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
          {SESSION_TYPES.map(t => {
            const on = form.sessionType === t.value;
            return (
              <button key={t.value} className="type-chip" type="button"
                onClick={() => handleSet("sessionType", t.value)}
                style={{
                  padding: "12px 6px", borderRadius: 12, flexDirection: "column",
                  border: `1.5px solid ${on ? T.indigo : T.borderSoft}`,
                  background: on ? "rgba(99,102,241,0.09)" : "rgba(238,242,255,0.45)",
                  color: on ? T.indigo : T.textLight,
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 11, fontWeight: on ? 700 : 500,
                  cursor: "pointer", transition: "all 0.16s",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: 5,
                }}>
                <span style={{ fontSize: 18 }}>{t.icon}</span>
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <Label>Muscle Groups Trained</Label>
        <MuscleSelector selected={form.muscleGroups} onToggle={toggleMuscle} />
        {form.muscleGroups.length === 0 && (
          <p style={{ fontSize: 11, color: T.muted, marginTop: 6 }}>Select all that apply</p>
        )}
      </div>

      <NumberInput name="durationMinutes" value={form.durationMinutes}
        onChange={handleChange} label="Duration" unit="minutes" min={1} />
    </div>,

    /* STEP 1 — Load */
    <div key={1} className="ta-fade" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <NumberInput name="totalSets"  value={form.totalSets}  onChange={handleChange} label="Total Sets"  unit="sets" />
        <NumberInput name="totalReps"  value={form.totalReps}  onChange={handleChange} label="Total Reps"  unit="reps" />
      </div>
      <NumberInput name="weightUsed" value={form.weightUsed} onChange={handleChange} label="Avg Weight Used" unit="kg (optional)" />

      <div>
        <Label>Volume Level</Label>
        <SegmentPicker name="volumeLevel" value={form.volumeLevel}
          options={["low","moderate","high"]} onChange={handleSet} />
      </div>
      <div>
        <Label>Intensity Level</Label>
        <SegmentPicker name="intensityLevel" value={form.intensityLevel}
          options={["low","moderate","high"]} onChange={handleSet} />
      </div>

      <ScaleSlider name="completionRate" value={form.completionRate}
        min={0} max={100} onChange={handleChange} label="Session Completion" unit="%" />
    </div>,

    /* STEP 2 — Readiness */
    <div key={2} className="ta-fade" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <ScaleSlider name="perceivedExertion" value={form.perceivedExertion}
        min={1} max={10} onChange={handleChange} label="Perceived Exertion (RPE)" colorize />
      <ScaleSlider name="energyLevel" value={form.energyLevel}
        min={1} max={10} onChange={handleChange} label="Energy Level" />
      <ScaleSlider name="sleepQuality" value={form.sleepQuality}
        min={1} max={10} onChange={handleChange} label="Sleep Quality (last night)" />
      <ScaleSlider name="stressLevel" value={form.stressLevel}
        min={1} max={10} onChange={handleChange} label="Stress Level" colorize />

      <div>
        <Label>Injury / Pain Flag</Label>
        <SegmentPicker name="injuryFlag" value={form.injuryFlag}
          options={["no","yes"]} onChange={handleSet} />
      </div>

      <TextInput name="notes" value={form.notes} onChange={handleChange}
        label="Session Notes (optional)"
        placeholder="Any observations, PRs, or things to track…" />

      {/* Mini review */}
      <div style={{ padding: "16px 18px", borderRadius: 14,
        background: "rgba(238,242,255,0.6)", border: `1px solid ${T.borderSoft}` }}>
        <p style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: T.muted, marginBottom: 10 }}>Review</p>
        <ReviewRow label="Type"       value={form.sessionType}                    />
        <ReviewRow label="Muscles"    value={form.muscleGroups.join(", ") || "—"} />
        <ReviewRow label="Duration"   value={`${form.durationMinutes} min`}       />
        <ReviewRow label="Sets / Reps" value={`${form.totalSets} sets · ${form.totalReps} reps`} />
        <ReviewRow label="Volume"     value={form.volumeLevel}                    />
        <ReviewRow label="Intensity"  value={form.intensityLevel}                 />
        <ReviewRow label="Completion" value={`${form.completionRate}%`}           />
      </div>
    </div>,
  ];

  /* ─────────────────────────────────────────────
     RESULT VIEW
  ───────────────────────────────────────────── */
  if (result) {
    const score = result.performanceScore ?? result.score ?? result.analysisScore ?? 75;
    const col   = scoreColor(score);

    return (
      <>
        <style>{KEYFRAMES}</style>
        {/* BG blobs */}
        <div style={{ position:"fixed", top:-100, right:-80, width:380, height:380,
          borderRadius:"50%", background:"rgba(99,102,241,0.07)",
          filter:"blur(80px)", pointerEvents:"none", zIndex:0 }} />
        <div style={{ position:"fixed", bottom:-80, left:"15%", width:280, height:280,
          borderRadius:"50%", background:"rgba(124,58,237,0.05)",
          filter:"blur(60px)", pointerEvents:"none", zIndex:0 }} />

        <div style={{ minHeight:"100vh", background:T.gradBody,
          fontFamily:"'Outfit', sans-serif", padding:"44px 20px 72px",
          position:"relative", zIndex:1 }}>
          <div style={{ maxWidth:640, margin:"0 auto",
            display:"flex", flexDirection:"column", gap:18 }}>

            {/* Big result card */}
            <div className="ta-fade" style={{ ...glass, borderRadius:24, overflow:"hidden" }}>
              <div style={{ height:4, background:T.gradPrimary,
                backgroundSize:"200% auto", animation:"gradientShift 2.4s linear infinite" }} />
              <div style={{ padding:"36px 32px" }}>
                <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.2em",
                  textTransform:"uppercase", color:T.indigo, marginBottom:10 }}>
                  ◆ Analysis Complete · {today}
                </p>

                <div style={{ display:"flex", alignItems:"center",
                  justifyContent:"space-between", flexWrap:"wrap", gap:20, marginBottom:24 }}>
                  <div>
                    <h2 style={{ fontSize:"clamp(1.6rem,4vw,2.4rem)", fontWeight:900,
                      color:T.text, letterSpacing:"-0.03em", lineHeight:1.05, marginBottom:6 }}>
                      Training
                      <span style={{ display:"block", background:scoreGrad(score),
                        WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                        backgroundClip:"text" }}>
                        Performance Score
                      </span>
                    </h2>
                    {/* Band pills */}
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      {[["0–34","Needs Work",T.danger,score<35],
                        ["35–54","Fair",T.amber,score>=35&&score<55],
                        ["55–79","Good",T.indigo,score>=55&&score<80],
                        ["80+","Excellent",T.success,score>=80]].map(([range,label,c,active])=>(
                        <div key={range} style={{ padding:"3px 12px", borderRadius:99,
                          background: active ? `${c}14` : "rgba(226,232,240,0.5)",
                          border:`1px solid ${active ? c : T.borderSoft}`,
                          fontSize:10, fontWeight: active ? 700 : 500,
                          color: active ? c : T.muted }}>
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>
                  <ScoreRing score={Math.round(score)} size={120} />
                </div>

                {/* Snapshot grid */}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
                  {[
                    { label:"Type",       val:form.sessionType.replace(/_/g," "), color:T.indigo  },
                    { label:"Duration",   val:`${form.durationMinutes}m`,         color:T.blue    },
                    { label:"Completion", val:`${form.completionRate}%`,           color:T.success },
                    { label:"RPE",        val:`${form.perceivedExertion}/10`,      color:T.violet  },
                  ].map(({ label, val, color }) => (
                    <div key={label} style={{ padding:"12px 10px", borderRadius:12,
                      background:`${color}08`, border:`1px solid ${color}20`,
                      textAlign:"center" }}>
                      <p style={{ fontSize:9, fontWeight:700, color:T.muted,
                        textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:5 }}>
                        {label}
                      </p>
                      <p style={{ fontSize:15, fontWeight:900, color,
                        fontFamily:"'Outfit', sans-serif", textTransform:"capitalize" }}>
                        {val}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI feedback / recommendations if returned */}
            {result.feedback && (
              <div className="ta-fade ta-delay1" style={{ ...glass, borderRadius:18, overflow:"hidden" }}>
                <div style={{ height:3, background:T.gradPrimary, opacity:0.7 }} />
                <div style={{ padding:"20px 24px" }}>
                  <p style={{ fontSize:9.5, fontWeight:700, letterSpacing:"0.16em",
                    textTransform:"uppercase", color:T.indigo, marginBottom:10 }}>
                    💡 AI Feedback
                  </p>
                  <p style={{ fontSize:13, color:T.textMid, lineHeight:1.7 }}>{result.feedback}</p>
                </div>
              </div>
            )}

            {/* Recommendations array */}
            {result.recommendations?.length > 0 && (
              <div className="ta-fade ta-delay2" style={{ ...glass, borderRadius:18, overflow:"hidden" }}>
                <div style={{ height:3, background:T.gradPrimary, opacity:0.7 }} />
                <div style={{ padding:"20px 24px" }}>
                  <p style={{ fontSize:9.5, fontWeight:700, letterSpacing:"0.16em",
                    textTransform:"uppercase", color:T.indigo, marginBottom:12 }}>
                    📋 Recommendations
                  </p>
                  {result.recommendations.map((r, i) => (
                    <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start",
                      marginBottom: i < result.recommendations.length-1 ? 10 : 0 }}>
                      <div style={{ width:20, height:20, borderRadius:"50%", flexShrink:0,
                        background:"rgba(99,102,241,0.10)", border:"1px solid rgba(99,102,241,0.2)",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:9, fontWeight:800, color:T.indigo, marginTop:1 }}>{i+1}</div>
                      <p style={{ fontSize:12, color:T.textMid, lineHeight:1.65 }}>{r}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Injury flag warning */}
            {form.injuryFlag === "yes" && (
              <div className="ta-fade ta-delay3" style={{ padding:"14px 18px", borderRadius:14,
                background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.25)",
                display:"flex", alignItems:"center", gap:10 }}>
                <AlertTriangle size={16} color={T.amber} style={{ flexShrink:0 }} />
                <p style={{ fontSize:12, color:"#b45309", fontWeight:600, lineHeight:1.5 }}>
                  Injury flag raised — consider consulting a physiotherapist before your next session.
                </p>
              </div>
            )}

            {/* Saved notice */}
            <div className="ta-fade ta-delay3" style={{ padding:"12px 16px", borderRadius:12,
              background:"rgba(34,197,94,0.07)", border:"1px solid rgba(34,197,94,0.2)",
              fontSize:12, color:T.success, fontWeight:600,
              display:"flex", alignItems:"center", gap:8 }}>
              <Check size={14} /> Session saved — visible in your history below.
            </div>

            <button onClick={() => { setResult(null); setStep(0); setForm(prev => ({
              ...prev, muscleGroups:[], notes:"", weightUsed:"" })); }}
              style={{ padding:"13px", borderRadius:14, background:T.gradPrimary,
                color:"white", fontFamily:"'Outfit', sans-serif",
                fontSize:12, fontWeight:700, letterSpacing:"0.12em",
                textTransform:"uppercase", border:"none", cursor:"pointer",
                boxShadow:"0 4px 20px rgba(99,102,241,0.28)",
                display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              <RotateCcw size={14} /> Log Another Session
            </button>
          </div>
        </div>
      </>
    );
  }

  /* ─────────────────────────────────────────────
     WIZARD + HISTORY LAYOUT
  ───────────────────────────────────────────── */
  return (
    <>
      <style>{KEYFRAMES}</style>

      {/* BG blobs */}
      <div style={{ position:"fixed", top:-100, right:-80, width:380, height:380,
        borderRadius:"50%", background:"rgba(99,102,241,0.07)",
        filter:"blur(80px)", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"fixed", bottom:-80, left:"15%", width:280, height:280,
        borderRadius:"50%", background:"rgba(124,58,237,0.05)",
        filter:"blur(60px)", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"fixed", top:"40%", left:-60, width:200, height:200,
        borderRadius:"50%", background:"rgba(37,99,235,0.04)",
        filter:"blur(50px)", pointerEvents:"none", zIndex:0 }} />

      <div style={{ minHeight:"100vh", background:T.gradBody,
        fontFamily:"'Outfit', sans-serif", padding:"44px 20px 80px",
        position:"relative", zIndex:1 }}>

        {/* ── 2-col layout: form left, history right ── */}
        <div style={{ maxWidth:1100, margin:"0 auto",
          display:"grid", gridTemplateColumns:"1fr 380px", gap:28,
          alignItems:"start" }}>

          {/* ── LEFT: Wizard ── */}
          <div style={{ display:"flex", flexDirection:"column", gap:0 }}>

            {/* Page header */}
            <div className="ta-fade" style={{ marginBottom:32 }}>
              <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.2em",
                textTransform:"uppercase", color:T.indigo, marginBottom:8 }}>
                ◆ Training Log
              </p>
              <h1 style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:900,
                color:T.text, letterSpacing:"-0.03em", lineHeight:1.05, marginBottom:6 }}>
                Training
                <span style={{ display:"block", background:T.gradPrimary,
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                  backgroundClip:"text", backgroundSize:"200% auto",
                  animation:"gradientShift 3s linear infinite" }}>
                  Analysis
                </span>
              </h1>
              <p style={{ fontSize:13, color:T.muted }}>
                Log your session in 3 steps — get an AI-powered performance score.
              </p>
            </div>

            {/* Step indicators */}
            <div className="ta-fade ta-delay1" style={{ display:"flex", alignItems:"center", marginBottom:28 }}>
              {STEPS.map((s, i) => {
                const done    = i < step;
                const current = i === step;
                return (
                  <div key={s.id} style={{ flex:1, display:"flex",
                    flexDirection:"column", alignItems:"center", position:"relative" }}>
                    {i < STEPS.length - 1 && (
                      <div style={{ position:"absolute", top:18, left:"50%", width:"100%",
                        height:2, background: done ? T.gradPrimary : T.borderSoft,
                        transition:"background 0.4s", zIndex:0 }} />
                    )}
                    <div style={{ width:36, height:36, borderRadius:"50%", zIndex:1,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      background: done ? T.gradPrimary : current ? "white" : "rgba(238,242,255,0.8)",
                      border:`2px solid ${done ? "transparent" : current ? T.indigo : T.borderSoft}`,
                      boxShadow: current ? "0 0 0 4px rgba(99,102,241,0.13)" : "none",
                      transition:"all 0.28s", fontSize: done ? 13 : 17,
                      cursor: done ? "pointer" : "default",
                    }} onClick={() => done && setStep(i)}>
                      {done ? <Check size={14} color="white" /> : s.icon}
                    </div>
                    <span style={{ fontSize:10, fontWeight: current ? 700 : 500,
                      color: current ? T.indigo : T.muted, marginTop:6,
                      letterSpacing:"0.04em" }}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Form card */}
            <div className="ta-fade ta-delay2" style={{ ...glass, borderRadius:22, overflow:"hidden" }}>
              <div style={{ height:3, background:T.gradPrimary, opacity:0.7 }} />
              <div style={{ padding:"28px 28px 24px" }}>
                <div style={{ marginBottom:22 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:4 }}>
                    <span style={{ fontSize:19 }}>{STEPS[step].icon}</span>
                    <p style={{ fontSize:9.5, fontWeight:700, letterSpacing:"0.16em",
                      textTransform:"uppercase", color:T.indigo }}>
                      Step {step + 1} of {STEPS.length} — {STEPS[step].label}
                    </p>
                  </div>
                  <p style={{ fontSize:12, color:T.muted }}>{STEPS[step].desc}</p>
                </div>

                {error && (
                  <div style={{ padding:"12px 14px", borderRadius:11,
                    background:"rgba(244,63,94,0.07)", border:"1px solid rgba(244,63,94,0.22)",
                    fontSize:12, color:T.danger, marginBottom:18,
                    display:"flex", gap:8, alignItems:"center" }}>
                    <span>⚠</span>{error}
                  </div>
                )}

                {stepContent[step]}

                {/* Nav buttons */}
                <div style={{ display:"flex", gap:10, marginTop:26 }}>
                  {step > 0 && (
                    <button type="button" onClick={() => setStep(s => s - 1)} style={{
                      flex:1, padding:"12px", borderRadius:13,
                      border:`1.5px solid ${T.borderSoft}`,
                      background:"rgba(238,242,255,0.55)", color:T.textLight,
                      fontFamily:"'Outfit', sans-serif", fontSize:12, fontWeight:700,
                      letterSpacing:"0.1em", textTransform:"uppercase",
                      cursor:"pointer", display:"flex", alignItems:"center",
                      justifyContent:"center", gap:6,
                    }}>
                      <ChevronLeft size={13} /> Back
                    </button>
                  )}

                  {step < STEPS.length - 1 ? (
                    <button type="button" onClick={() => setStep(s => s + 1)} style={{
                      flex:2, padding:"12px", borderRadius:13,
                      background:T.gradPrimary, color:"white",
                      fontFamily:"'Outfit', sans-serif", fontSize:12, fontWeight:700,
                      letterSpacing:"0.1em", textTransform:"uppercase", border:"none",
                      cursor:"pointer", boxShadow:"0 4px 16px rgba(99,102,241,0.26)",
                      display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                    }}>
                      Continue <ChevronRight size={13} />
                    </button>
                  ) : (
                    <button type="button" onClick={handleSubmit} disabled={loading} style={{
                      flex:2, padding:"12px", borderRadius:13,
                      background: loading ? "rgba(99,102,241,0.4)" : T.gradPrimary,
                      color:"white", fontFamily:"'Outfit', sans-serif",
                      fontSize:12, fontWeight:700, letterSpacing:"0.1em",
                      textTransform:"uppercase", border:"none",
                      cursor: loading ? "not-allowed" : "pointer",
                      boxShadow: !loading ? "0 4px 16px rgba(99,102,241,0.26)" : "none",
                      display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                    }}>
                      {loading ? (
                        <>
                          <div style={{ width:15, height:15, borderRadius:"50%",
                            border:"2px solid rgba(255,255,255,0.3)",
                            borderTopColor:"#fff",
                            animation:"spin 0.8s linear infinite" }} />
                          Analysing…
                        </>
                      ) : (
                        <><Zap size={14} /> Get My Score ✦</>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <p style={{ textAlign:"center", fontSize:11, color:T.muted, marginTop:14 }}>
              {step + 1} of {STEPS.length} steps
              {step > 0 && (
                <span style={{ color:T.indigo, fontWeight:600 }}>
                  {" · "}tap completed steps to go back
                </span>
              )}
            </p>
          </div>

          {/* ── RIGHT: Stats + History ── */}
          <div className="ta-fade ta-delay3" style={{ display:"flex", flexDirection:"column", gap:16 }}>

            {/* Summary stats */}
            {history.length > 0 && (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                {[
                  { label:"Sessions",  val:history.length, color:T.indigo,  icon:"🏋️" },
                  { label:"Avg Score", val:avgScore ?? "—", color:scoreColor(avgScore||0), icon:"📊" },
                  { label:"Best",      val:bestScore ?? "—", color:T.success, icon:"🏆" },
                  { label:"Today",     val:history[0]?.date === today ? "✓ Logged" : "—",
                    color:T.violet, icon:"📅" },
                ].map(({ label, val, color, icon }) => (
                  <div key={label} style={{ ...glass, borderRadius:16, padding:"16px 14px",
                    position:"relative", overflow:"hidden" }}>
                    <div style={{ position:"absolute", top:0, left:0, right:0, height:2,
                      background:T.gradPrimary, opacity:0.6 }} />
                    <p style={{ fontSize:16, marginBottom:4 }}>{icon}</p>
                    <p style={{ fontSize:9, fontWeight:700, color:T.muted,
                      textTransform:"uppercase", letterSpacing:"0.14em", marginBottom:3 }}>
                      {label}
                    </p>
                    <p style={{ fontSize:22, fontWeight:900, color,
                      fontFamily:"'Outfit', sans-serif", lineHeight:1 }}>{val}</p>
                  </div>
                ))}
              </div>
            )}

            {/* History list */}
            <div style={{ ...glass, borderRadius:18, overflow:"hidden" }}>
              <div style={{ height:3, background:T.gradPrimary, opacity:0.7 }} />
              <div style={{ padding:"18px 18px 14px" }}>
                <div style={{ display:"flex", alignItems:"center",
                  justifyContent:"space-between", marginBottom:14 }}>
                  <div>
                    <p style={{ fontSize:9.5, fontWeight:700, letterSpacing:"0.18em",
                      textTransform:"uppercase", color:T.muted }}>History</p>
                    <p style={{ fontSize:14, fontWeight:800, color:T.text, marginTop:1 }}>
                      All Sessions
                    </p>
                  </div>
                  <span style={{ fontSize:11, color:T.muted, fontWeight:600 }}>
                    {history.length} record{history.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {histLoading ? (
                  <div style={{ display:"flex", justifyContent:"center", padding:"32px 0" }}>
                    <div style={{ width:28, height:28, borderRadius:"50%",
                      border:"2.5px solid rgba(99,102,241,0.2)",
                      borderTopColor:T.indigo,
                      animation:"spin 0.8s linear infinite" }} />
                  </div>
                ) : history.length === 0 ? (
                  <div style={{ textAlign:"center", padding:"36px 20px" }}>
                    <p style={{ fontSize:32, marginBottom:10 }}>🏋️</p>
                    <p style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:4 }}>
                      No sessions yet
                    </p>
                    <p style={{ fontSize:11, color:T.muted, lineHeight:1.6 }}>
                      Complete your first analysis to start tracking performance.
                    </p>
                  </div>
                ) : (
                  <div style={{ display:"flex", flexDirection:"column", gap:8,
                    maxHeight:520, overflowY:"auto",
                    paddingRight:4,
                  }}>
                    {history.map((rec, i) => (
                      <HistoryRow key={rec._id || i} rec={rec} index={i} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}