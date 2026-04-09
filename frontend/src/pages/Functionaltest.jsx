import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import {
  Activity, Clock, TrendingUp, TrendingDown,
  Award, Zap, ChevronDown, RotateCcw, Plus, Target
} from "lucide-react";

/* ─────────────────────────────────────────────
   DESIGN TOKENS  (exact match to APS/Water/Rehab theme)
───────────────────────────────────────────── */
const T = {
  gradBody:    "linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #eef2ff 100%)",
  gradPrimary: "linear-gradient(135deg, #2563eb, #6366f1, #7c3aed)",
  blue:        "#2563eb",
  indigo:      "#6366f1",
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

const KEYFRAMES = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
@keyframes countUp {
  from { opacity: 0; transform: scale(0.85); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes slideIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes barGrow {
  from { width: 0%; }
  to   { width: var(--w); }
}

.ft-fade   { animation: fadeUp 0.4s ease forwards; }
.ft-delay1 { animation-delay: 0.05s; opacity: 0; }
.ft-delay2 { animation-delay: 0.10s; opacity: 0; }
.ft-delay3 { animation-delay: 0.15s; opacity: 0; }
.ft-delay4 { animation-delay: 0.20s; opacity: 0; }

.row-hover:hover {
  transform: translateY(-2px) !important;
  border-color: rgba(99,102,241,0.22) !important;
  box-shadow: 0 8px 28px rgba(99,102,241,0.12) !important;
}

.input-field:focus {
  border-color: #6366f1 !important;
  outline: none;
}

.test-chip:hover {
  border-color: #6366f1 !important;
  background: rgba(99,102,241,0.10) !important;
  color: #6366f1 !important;
}
.test-chip-active {
  border-color: #6366f1 !important;
  background: rgba(99,102,241,0.10) !important;
  color: #6366f1 !important;
}
`;

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const TEST_TYPES = [
  "Timed Up and Go",
  "30-Second Sit to Stand",
  "6-Minute Walk Test",
  "Single Leg Stance",
  "Berg Balance Scale",
  "Functional Reach Test",
  "4 Square Step Test",
  "5 Times Sit to Stand",
  "10 Meter Walk Test",
  "Star Excursion Balance",
];

const ACTIVITY_LEVELS = ["sedentary", "light", "moderate", "active", "athletic"];

const GENDERS = ["male", "female", "other"];

const catColor = (cat) => ({
  "Optimal":                   T.success,
  "Mild Delay":                T.indigo,
  "Moderate Limitation":       T.amber,
  "Severe Functional Impairment": T.danger,
}[cat] || T.muted);

const catIcon = (cat) => ({
  "Optimal":                   "🏆",
  "Mild Delay":                "⚡",
  "Moderate Limitation":       "⚠️",
  "Severe Functional Impairment": "🔴",
}[cat] || "📊");

const scoreColor = (s) =>
  s >= 85 ? T.success : s >= 65 ? T.indigo : s >= 40 ? T.amber : T.danger;

/* ─────────────────────────────────────────────
   SCORE RING
───────────────────────────────────────────── */
function ScoreRing({ score, size = 100 }) {
  const R    = (size / 2) - 8;
  const circ = 2 * Math.PI * R;
  const fill = (Math.min(score, 100) / 100) * circ;
  const col  = scoreColor(score);
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={R} fill="none" stroke={`${col}20`} strokeWidth={8} />
        <circle cx={size/2} cy={size/2} r={R} fill="none" stroke={col} strokeWidth={8}
          strokeDasharray={`${fill} ${circ}`} strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ transition: "stroke-dasharray 0.9s cubic-bezier(.4,0,.2,1)" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: size > 90 ? 22 : 16, fontWeight: 900, color: col,
          lineHeight: 1, fontFamily: "'Outfit', sans-serif" }}>{Math.round(score)}</span>
        <span style={{ fontSize: 8, color: T.muted, fontWeight: 600, letterSpacing: "0.08em" }}>/100</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STAT CARD
───────────────────────────────────────────── */
function StatCard({ label, value, sub, color, icon: Icon, delay }) {
  return (
    <div className={`ft-fade ${delay}`} style={{ ...glass, borderRadius: 20,
      padding: "20px 22px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: T.gradPrimary, opacity: 0.7 }} />
      <div style={{ width: 36, height: 36, borderRadius: 10,
        background: `${color}18`, border: `1px solid ${color}33`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 10 }}>
        <Icon size={16} color={color} />
      </div>
      <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em",
        textTransform: "uppercase", color: T.muted, marginBottom: 4 }}>{label}</p>
      <p className="ft-fade" style={{ fontSize: 28, fontWeight: 900, color,
        lineHeight: 1, fontFamily: "'Outfit', sans-serif" }}>{value}</p>
      {sub && <p style={{ fontSize: 11, color: T.textMid, marginTop: 4 }}>{sub}</p>}
    </div>
  );
}

/* ─────────────────────────────────────────────
   DEVIATION BAR
───────────────────────────────────────────── */
function DeviationBar({ score, category }) {
  const col = catColor(category);
  const pct = Math.min(Math.max(score, 0), 100);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: T.muted,
          letterSpacing: "0.12em", textTransform: "uppercase" }}>Performance Score</span>
        <span style={{ fontSize: 12, fontWeight: 800, color: col }}>{Math.round(pct)}%</span>
      </div>
      <div style={{ height: 6, background: "rgba(148,163,184,0.15)",
        borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${pct}%`, background: col,
          borderRadius: 99, transition: "width 0.9s cubic-bezier(.4,0,.2,1)",
        }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HISTORY ROW
───────────────────────────────────────────── */
function HistoryRow({ rec, index }) {
  const [open, setOpen] = useState(false);
  const col = catColor(rec.performanceCategory);
  const scorecol = scoreColor(rec.performanceScore);
  return (
    <div className="row-hover" style={{
      ...glass, borderRadius: 14, overflow: "hidden",
      border: `1px solid ${T.borderSoft}`, transition: "all 0.2s",
      animation: `slideIn 0.35s ease ${index * 35}ms both`,
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", alignItems: "center", gap: 14,
        padding: "14px 20px", background: "transparent", border: "none",
        cursor: "pointer", textAlign: "left",
      }}>
        {/* Score badge */}
        <div style={{ width: 46, height: 46, borderRadius: 12, flexShrink: 0,
          background: `linear-gradient(135deg, ${scorecol}22, ${scorecol}10)`,
          border: `1.5px solid ${scorecol}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 900, color: scorecol,
          fontFamily: "'Outfit', sans-serif" }}>
          {Math.round(rec.performanceScore)}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 800, color: T.text, marginBottom: 3 }}>
            {rec.testType}
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, color: T.muted }}>
              🕐 {rec.userTime}s actual
            </span>
            <span style={{ color: T.borderSoft }}>|</span>
            <span style={{ fontSize: 11, color: T.muted }}>
              🎯 {rec.aiExpectedTime}s expected
            </span>
            <span style={{ color: T.borderSoft }}>|</span>
            <span style={{ fontSize: 11, color: T.muted }}>
              {new Date(rec.date).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
        </div>
        {/* Category pill */}
        <span style={{ padding: "4px 12px", borderRadius: 99, fontSize: 10,
          fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em",
          flexShrink: 0, background: `${col}14`, border: `1px solid ${col}33`, color: col }}>
          {catIcon(rec.performanceCategory)} {rec.performanceCategory}
        </span>
        <ChevronDown size={15} style={{ color: T.muted, flexShrink: 0,
          transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }} />
      </button>

      {/* Expanded detail */}
      {open && (
        <div style={{ padding: "0 20px 18px", borderTop: `1px solid ${T.borderSoft}` }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, paddingTop: 14, marginBottom: 14 }}>
            {[
              { label: "Performance Score",  val: `${Math.round(rec.performanceScore)}/100`, color: scorecol },
              { label: "Deviation",          val: `${rec.deviationSeconds > 0 ? "+" : ""}${rec.deviationSeconds?.toFixed(1)}s`, color: rec.deviationSeconds <= 0 ? T.success : T.danger },
              { label: "Deviation %",        val: `${rec.deviationPercentage?.toFixed(1)}%`, color: T.indigo },
              { label: "Severity Index",     val: rec.severityIndex?.toFixed(2), color: T.amber },
            ].map(({ label, val, color }) => (
              <div key={label} style={{ background: "rgba(238,242,255,0.55)",
                border: `1px solid ${T.borderSoft}`, borderRadius: 10, padding: "10px 12px" }}>
                <p style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: "0.14em",
                  textTransform: "uppercase", color: T.muted, marginBottom: 5 }}>{label}</p>
                <p style={{ fontSize: 14, fontWeight: 900, color,
                  fontFamily: "'Outfit', sans-serif" }}>{val}</p>
              </div>
            ))}
          </div>
          <DeviationBar score={rec.performanceScore} category={rec.performanceCategory} />
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   RESULT CARD (after submission)
───────────────────────────────────────────── */
function ResultCard({ result, onReset }) {
  const col = catColor(result.performanceCategory);
  const deviation = result.deviationSeconds;

  return (
    <div className="ft-fade" style={{ ...glass, borderRadius: 20, overflow: "hidden" }}>
      <div style={{ height: 4, background: T.gradPrimary }} />
      <div style={{ padding: "28px 32px" }}>
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "flex-start",
          justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: 28 }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase", color: T.indigo, marginBottom: 6 }}>
              ◆ Test Result
            </p>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: T.text,
              marginBottom: 6, letterSpacing: "-0.02em" }}>{result.testType}</h2>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6,
              padding: "5px 14px", borderRadius: 99,
              background: `${col}12`, border: `1px solid ${col}30`,
              fontSize: 12, fontWeight: 700, color: col }}>
              {catIcon(result.performanceCategory)} {result.performanceCategory}
            </span>
          </div>
          <ScoreRing score={result.performanceScore} size={110} />
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
          {[
            { label: "Your Time",     val: `${result.userTime}s`,                            color: T.indigo },
            { label: "Expected Time", val: `${result.aiExpectedTime}s`,                      color: T.blue   },
            { label: "Deviation",     val: `${deviation > 0 ? "+" : ""}${deviation?.toFixed(1)}s`, color: deviation <= 0 ? T.success : T.danger },
            { label: "Severity Index",val: result.severityIndex?.toFixed(2),                  color: T.amber  },
          ].map(({ label, val, color }) => (
            <div key={label} style={{ padding: "14px 16px", borderRadius: 14,
              background: `${color}08`, border: `1px solid ${color}20` }}>
              <p style={{ fontSize: 9, fontWeight: 700, color: T.muted,
                textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>{label}</p>
              <p style={{ fontSize: 20, fontWeight: 900, color,
                fontFamily: "'Outfit', sans-serif" }}>{val}</p>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <DeviationBar score={result.performanceScore} category={result.performanceCategory} />

        {/* Interpretation */}
        <div style={{ marginTop: 20, padding: "16px 20px", borderRadius: 14,
          background: "rgba(238,242,255,0.6)", border: `1px solid ${T.borderSoft}` }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase", color: T.indigo, marginBottom: 8 }}>📋 Clinical Interpretation</p>
          <p style={{ fontSize: 13, color: T.textMid, lineHeight: 1.7 }}>
            {result.performanceCategory === "Optimal" &&
              `Excellent performance — your ${result.testType} time of ${result.userTime}s meets or exceeds the expected benchmark of ${result.aiExpectedTime}s. No functional limitations detected.`}
            {result.performanceCategory === "Mild Delay" &&
              `Mild performance delay detected — your time of ${result.userTime}s is ${deviation?.toFixed(1)}s above the expected ${result.aiExpectedTime}s. Minor functional limitation; consider targeted mobility work.`}
            {result.performanceCategory === "Moderate Limitation" &&
              `Moderate functional limitation — your time of ${result.userTime}s exceeds the expected ${result.aiExpectedTime}s by ${deviation?.toFixed(1)}s. A structured rehabilitation programme is recommended.`}
            {result.performanceCategory === "Severe Functional Impairment" &&
              `Severe functional impairment identified — your time of ${result.userTime}s is significantly above the expected ${result.aiExpectedTime}s. Immediate clinical assessment is strongly advised.`}
          </p>
        </div>

        {/* Reset button */}
        <button onClick={onReset} style={{
          marginTop: 20, display: "flex", alignItems: "center", gap: 8,
          padding: "10px 20px", borderRadius: 10,
          border: `1px solid ${T.borderSoft}`, background: T.surface,
          color: T.textLight, fontSize: 12, fontWeight: 700,
          cursor: "pointer", fontFamily: "'Outfit', sans-serif",
        }}>
          <RotateCcw size={13} /> Run Another Test
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function FunctionalTest() {
  const { user } = useAuth();
  const userId   = user?._id || user?.id;

  /* ── Form state ── */
  const [testType,       setTestType]       = useState(TEST_TYPES[0]);
  const [userTime,       setUserTime]       = useState("");
  const [age,            setAge]            = useState(user?.age || 30);
  const [gender,         setGender]         = useState("male");
  const [activityLevel,  setActivityLevel]  = useState("moderate");

  /* ── UI state ── */
  const [loading,        setLoading]        = useState(false);
  const [result,         setResult]         = useState(null);
  const [error,          setError]          = useState(null);
  const [history,        setHistory]        = useState([]);
  const [histLoading,    setHistLoading]    = useState(true);
  const [showForm,       setShowForm]       = useState(true);

  /* ── Fetch history ── */
  useEffect(() => {
    if (!userId) return;
    API.get(`/functional-test/user/${userId}`)
      .then(r => setHistory(r.data?.data || []))
      .catch(() => setHistory([]))
      .finally(() => setHistLoading(false));
  }, [userId]);

  /* ── Derived summary stats ── */
  const avgScore  = history.length
    ? Math.round(history.reduce((a, b) => a + b.performanceScore, 0) / history.length)
    : null;
  const bestScore = history.length
    ? Math.max(...history.map(h => h.performanceScore))
    : null;
  const optimal   = history.filter(h => h.performanceCategory === "Optimal").length;

  /* ── Submit ── */
  async function handleSubmit() {
    if (!userTime || Number(userTime) <= 0) {
      setError("Please enter a valid time (seconds).");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await API.post("/functional-test", {
        userId,
        testType,
        userTime: Number(userTime),
        userProfile: { age: Number(age), gender, activityLevel },
        date: new Date().toISOString().split("T")[0],
      });
      const saved = res.data?.data;
      setResult(saved);
      setHistory(prev => [saved, ...prev]);
      setShowForm(false);
    } catch (err) {
      setError(err.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setResult(null);
    setUserTime("");
    setError(null);
    setShowForm(true);
  }

  const inputStyle = {
    width: "100%", padding: "11px 14px", borderRadius: 10,
    border: `1.5px solid ${T.borderSoft}`, fontSize: 13, color: T.text,
    background: "rgba(238,242,255,0.5)", fontFamily: "'Outfit', sans-serif",
    transition: "border-color 0.15s",
  };

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
        fontFamily:"'Outfit', sans-serif",
        padding:"44px 24px 80px", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:1100, margin:"0 auto",
          display:"flex", flexDirection:"column", gap:28 }}>

          {/* ── PAGE HEADER ── */}
          <div className="ft-fade" style={{ display:"flex", alignItems:"flex-start",
            justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
            <div>
              <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.2em",
                textTransform:"uppercase", color:T.indigo, marginBottom:8 }}>
                ◆ Physiotherapy Assessment
              </p>
              <h1 style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:900,
                color:T.text, letterSpacing:"-0.03em", lineHeight:1.05 }}>
                Functional
                <span style={{ display:"block", background:T.gradPrimary,
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                  backgroundClip:"text", backgroundSize:"200% auto",
                  animation:"gradientShift 3s linear infinite" }}>
                  Performance Test
                </span>
              </h1>
              <p style={{ fontSize:13, color:T.muted, marginTop:6 }}>
                AI-powered benchmark comparison against clinically expected norms.
              </p>
            </div>
            {!showForm && (
              <button onClick={() => { handleReset(); setShowForm(true); }} style={{
                padding:"10px 20px", borderRadius:10, background:T.gradPrimary,
                border:"none", color:"#fff", fontFamily:"'Outfit', sans-serif",
                fontSize:12, fontWeight:700, cursor:"pointer",
                display:"flex", alignItems:"center", gap:6,
                boxShadow:"0 4px 16px rgba(99,102,241,0.3)",
              }}>
                <Plus size={13} /> New Test
              </button>
            )}
          </div>

          {/* ── SUMMARY STATS (shown when history exists) ── */}
          {history.length > 0 && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
              <StatCard label="Tests Done"  value={history.length}         sub="total assessments" color={T.indigo}  icon={Activity}    delay="ft-delay1" />
              <StatCard label="Avg Score"   value={avgScore ?? "—"}        sub="performance average" color={scoreColor(avgScore || 0)} icon={TrendingUp} delay="ft-delay2" />
              <StatCard label="Best Score"  value={bestScore ?? "—"}       sub="personal best"     color={T.success} icon={Award}       delay="ft-delay3" />
              <StatCard label="Optimal"     value={`${optimal}/${history.length}`} sub="goal achieved"  color={T.violet}  icon={Zap}         delay="ft-delay4" />
            </div>
          )}

          {/* ── RESULT CARD ── */}
          {result && !showForm && (
            <ResultCard result={result} onReset={handleReset} />
          )}

          {/* ── SUBMISSION FORM ── */}
          {showForm && (
            <div className="ft-fade ft-delay1" style={{ ...glass, borderRadius:20, overflow:"hidden" }}>
              <div style={{ height:4, background:T.gradPrimary }} />
              <div style={{ padding:"28px 32px", display:"flex", flexDirection:"column", gap:24 }}>

                {/* Form header */}
                <div>
                  <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.18em",
                    textTransform:"uppercase", color:T.muted, marginBottom:4 }}>
                    New Assessment
                  </p>
                  <p style={{ fontSize:16, fontWeight:800, color:T.text }}>
                    Record Test Performance
                  </p>
                </div>

                {/* ── Test type selector ── */}
                <div>
                  <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em",
                    textTransform:"uppercase", color:T.muted, marginBottom:10 }}>
                    Select Test Type
                  </p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                    {TEST_TYPES.map(t => (
                      <button key={t} className={`test-chip ${testType === t ? "test-chip-active" : ""}`}
                        onClick={() => setTestType(t)}
                        style={{
                          padding:"7px 14px", borderRadius:99,
                          border:`1.5px solid ${testType === t ? T.indigo : T.borderSoft}`,
                          background: testType === t ? "rgba(99,102,241,0.10)" : "rgba(238,242,255,0.5)",
                          color: testType === t ? T.indigo : T.muted,
                          fontSize:11, fontWeight:700, cursor:"pointer",
                          fontFamily:"'Outfit', sans-serif", transition:"all 0.15s",
                        }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── Time input ── */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  <div>
                    <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em",
                      textTransform:"uppercase", color:T.muted, marginBottom:6 }}>
                      Your Completion Time (seconds)
                    </p>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <Clock size={16} color={T.indigo} style={{ flexShrink:0 }} />
                      <input
                        className="input-field"
                        type="number" min="0.1" step="0.1"
                        placeholder="e.g. 14.5"
                        value={userTime}
                        onChange={e => setUserTime(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleSubmit()}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  {/* User profile */}
                  <div>
                    <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em",
                      textTransform:"uppercase", color:T.muted, marginBottom:6 }}>
                      Age
                    </p>
                    <input
                      className="input-field"
                      type="number" min="1" max="120" value={age}
                      onChange={e => setAge(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Gender + Activity */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  <div>
                    <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em",
                      textTransform:"uppercase", color:T.muted, marginBottom:6 }}>
                      Gender
                    </p>
                    <select className="input-field" value={gender}
                      onChange={e => setGender(e.target.value)} style={inputStyle}>
                      {GENDERS.map(g => <option key={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em",
                      textTransform:"uppercase", color:T.muted, marginBottom:6 }}>
                      Activity Level
                    </p>
                    <select className="input-field" value={activityLevel}
                      onChange={e => setActivityLevel(e.target.value)} style={inputStyle}>
                      {ACTIVITY_LEVELS.map(a => <option key={a}>{a}</option>)}
                    </select>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div style={{ padding:"12px 16px", borderRadius:10,
                    background:"rgba(244,63,94,0.08)", border:`1px solid rgba(244,63,94,0.2)`,
                    fontSize:13, color:T.danger, fontWeight:600 }}>
                    ⚠️ {error}
                  </div>
                )}

                {/* Submit */}
                <button onClick={handleSubmit} disabled={loading} style={{
                  padding:"13px", borderRadius:12, border:"none",
                  background: loading ? "rgba(99,102,241,0.4)" : T.gradPrimary,
                  color:"#fff", fontSize:14, fontWeight:800,
                  cursor: loading ? "not-allowed" : "pointer",
                  display:"flex", alignItems:"center", justifyContent:"center", gap:10,
                  fontFamily:"'Outfit', sans-serif",
                  boxShadow: !loading ? "0 4px 20px rgba(99,102,241,0.3)" : "none",
                  transition:"all 0.2s",
                }}>
                  {loading ? (
                    <>
                      <div style={{ width:18, height:18, borderRadius:"50%",
                        border:`2px solid rgba(255,255,255,0.3)`,
                        borderTopColor:"#fff", animation:"spin 0.8s linear infinite" }} />
                      Analysing with AI…
                    </>
                  ) : (
                    <><Zap size={16} /> Analyse Performance</>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ── HISTORY ── */}
          {!histLoading && history.length > 0 && (
            <div className="ft-fade ft-delay3">
              <div style={{ display:"flex", alignItems:"center",
                justifyContent:"space-between", marginBottom:14 }}>
                <div>
                  <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.2em",
                    textTransform:"uppercase", color:T.muted }}>Test History</p>
                  <p style={{ fontSize:13, fontWeight:800, color:T.text, marginTop:1 }}>
                    All Assessments
                  </p>
                </div>
                <span style={{ fontSize:11, color:T.muted, fontWeight:600 }}>
                  {history.length} record{history.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                {history.map((rec, i) => (
                  <HistoryRow key={rec._id} rec={rec} index={i} />
                ))}
              </div>
            </div>
          )}

          {/* ── EMPTY HISTORY ── */}
          {!histLoading && history.length === 0 && showForm && (
            <div className="ft-fade ft-delay4" style={{ ...glass, borderRadius:20,
              padding:"48px 32px", textAlign:"center",
              border:`2px dashed ${T.borderSoft}` }}>
              <div style={{ width:56, height:56, borderRadius:"50%",
                border:`2px dashed rgba(99,102,241,0.4)`,
                display:"flex", alignItems:"center", justifyContent:"center",
                margin:"0 auto 16px", color:T.indigo }}>
                <Activity size={24} />
              </div>
              <h3 style={{ fontSize:"1.2rem", fontWeight:900, color:T.text, marginBottom:8 }}>
                No Tests Yet
              </h3>
              <p style={{ fontSize:13, color:T.muted, lineHeight:1.7 }}>
                Complete your first functional test above to start tracking performance benchmarks.
              </p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}