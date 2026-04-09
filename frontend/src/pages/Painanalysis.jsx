import { useState, useEffect } from "react";
import { painAPI } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import {
  Zap, Check, RotateCcw, ChevronDown,
  AlertTriangle, Shield, Activity
} from "lucide-react";

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const T = {
  gradBody:    "linear-gradient(135deg, #f8fafc 0%, #fff1f2 50%, #fef3c7 100%)",
  gradPrimary: "linear-gradient(135deg, #f43f5e, #e11d48, #be123c)",
  gradWarm:    "linear-gradient(135deg, #f59e0b, #f97316, #ef4444)",
  rose:        "#f43f5e",
  red:         "#e11d48",
  amber:       "#f59e0b",
  orange:      "#f97316",
  indigo:      "#6366f1",
  text:        "#0f172a",
  textMid:     "#475569",
  textLight:   "#64748b",
  muted:       "#94a3b8",
  borderSoft:  "#fecdd3",
  borderLight: "rgba(255,255,255,0.9)",
  surface:     "rgba(255,255,255,0.88)",
  shadowCard:  "0 4px 32px rgba(244,63,94,0.08), 0 1px 6px rgba(0,0,0,0.04)",
  success:     "#22c55e",
  danger:      "#f43f5e",
  violet:      "#7c3aed",
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
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes pulse-ring {
  0%   { box-shadow: 0 0 0 0 rgba(244,63,94,0.25); }
  70%  { box-shadow: 0 0 0 12px rgba(244,63,94,0); }
  100% { box-shadow: 0 0 0 0 rgba(244,63,94,0); }
}
@keyframes slideIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.pa-fade   { animation: fadeUp 0.38s ease forwards; }
.pa-count  { animation: countUp 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards; }
.pa-delay1 { animation-delay: 0.06s; opacity: 0; }
.pa-delay2 { animation-delay: 0.12s; opacity: 0; }
.pa-delay3 { animation-delay: 0.18s; opacity: 0; }
.pa-delay4 { animation-delay: 0.24s; opacity: 0; }

.hist-row:hover {
  transform: translateY(-2px) !important;
  border-color: rgba(244,63,94,0.22) !important;
  box-shadow: 0 8px 28px rgba(244,63,94,0.09) !important;
}
.loc-chip:hover {
  border-color: #f43f5e !important;
  background: rgba(244,63,94,0.08) !important;
  color: #f43f5e !important;
}
.input-focus:focus {
  border-color: #f43f5e !important;
  background: rgba(255,241,242,0.9) !important;
  box-shadow: 0 0 0 3px rgba(244,63,94,0.08) !important;
  outline: none !important;
}
`;

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const PAIN_LOCATIONS = [
  { value: "lower_back",       icon: "🔴", label: "Lower Back"       },
  { value: "left_knee",        icon: "🦵", label: "Left Knee"        },
  { value: "right_knee",       icon: "🦵", label: "Right Knee"       },
  { value: "left_shoulder",    icon: "💪", label: "Left Shoulder"    },
  { value: "right_shoulder",   icon: "💪", label: "Right Shoulder"   },
  { value: "neck",             icon: "😣", label: "Neck"             },
  { value: "ankle",            icon: "🦶", label: "Ankle"            },
  { value: "hip",              icon: "🏃", label: "Hip"              },
  { value: "elbow",            icon: "💪", label: "Elbow"            },
  { value: "wrist",            icon: "✋", label: "Wrist"            },
  { value: "upper_back",       icon: "🔵", label: "Upper Back"       },
  { value: "other",            icon: "⚡", label: "Other"            },
];

const riskColor = (s) =>
  s >= 75 ? T.danger : s >= 50 ? T.orange : s >= 25 ? T.amber : T.success;

const riskLabel = (s) =>
  s >= 75 ? "High Risk" : s >= 50 ? "Moderate" : s >= 25 ? "Low-Mod" : "Low Risk";

const riskGrad = (s) =>
  s >= 75
    ? "linear-gradient(135deg,#dc2626,#f43f5e)"
    : s >= 50
    ? "linear-gradient(135deg,#ea580c,#f97316)"
    : s >= 25
    ? "linear-gradient(135deg,#d97706,#f59e0b)"
    : "linear-gradient(135deg,#059669,#22c55e)";

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

function ScaleSlider({ name, value, onChange, min = 0, max = 10,
  label, unit = "", accentColor = T.rose }) {
  const pct   = ((value - min) / (max - min)) * 100;
  const color = pct < 30 ? T.success : pct < 60 ? T.amber : T.danger;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between",
        alignItems: "baseline", marginBottom: 8 }}>
        <Label>{label}</Label>
        <span style={{ fontSize: 26, fontWeight: 900, color,
          fontFamily: "'Outfit', sans-serif", lineHeight: 1 }}>
          {value}{unit}
        </span>
      </div>
      <input type="range" name={name} min={min} max={max} value={value}
        onChange={onChange}
        style={{ width: "100%", accentColor: color, cursor: "pointer", height: 4 }} />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
        <span style={{ fontSize: 10, color: T.muted }}>None</span>
        <span style={{ fontSize: 10, color, fontWeight: 600 }}>
          {value === 0 ? "No pain" : value <= 3 ? "Mild" : value <= 6 ? "Moderate" : "Severe"}
        </span>
        <span style={{ fontSize: 10, color: T.muted }}>Max</span>
      </div>
    </div>
  );
}

function StiffnessSlider({ name, value, onChange }) {
  const color = value === 0 ? T.success : value <= 15 ? T.amber : T.danger;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between",
        alignItems: "baseline", marginBottom: 8 }}>
        <Label>Morning Stiffness</Label>
        <span style={{ fontSize: 26, fontWeight: 900, color,
          fontFamily: "'Outfit', sans-serif", lineHeight: 1 }}>
          {value}<span style={{ fontSize: 13, fontWeight: 600, marginLeft: 3 }}>min</span>
        </span>
      </div>
      <input type="range" name={name} min={0} max={60} step={5} value={value}
        onChange={onChange}
        style={{ width: "100%", accentColor: color, cursor: "pointer", height: 4 }} />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
        <span style={{ fontSize: 10, color: T.muted }}>0 min</span>
        <span style={{ fontSize: 10, color, fontWeight: 600 }}>
          {value === 0 ? "None" : value <= 10 ? "Mild" : value <= 20 ? "Moderate" : "Significant"}
        </span>
        <span style={{ fontSize: 10, color: T.muted }}>60 min</span>
      </div>
    </div>
  );
}

function Toggle({ name, checked, onChange, label, desc }) {
  return (
    <div onClick={() => onChange(name, !checked)} style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 16px", borderRadius: 13, cursor: "pointer",
      border: `1.5px solid ${checked ? T.rose : T.borderSoft}`,
      background: checked ? "rgba(244,63,94,0.05)" : "rgba(255,241,242,0.4)",
      transition: "all 0.2s",
    }}>
      <div>
        <p style={{ fontSize: 13, fontWeight: 600,
          color: checked ? T.rose : T.text }}>{label}</p>
        {desc && <p style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{desc}</p>}
      </div>
      <div style={{ width: 44, height: 24, borderRadius: 12, flexShrink: 0,
        background: checked ? T.rose : "rgba(226,232,240,0.8)",
        position: "relative", transition: "background 0.2s",
        boxShadow: checked ? "0 2px 8px rgba(244,63,94,0.3)" : "inset 0 0 0 1px #fecdd3",
      }}>
        <div style={{ position: "absolute", top: 3, left: checked ? 23 : 3,
          width: 18, height: 18, borderRadius: "50%", background: "white",
          transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   RISK RING
───────────────────────────────────────────── */
function RiskRing({ score, size = 120 }) {
  const R    = (size / 2) - 9;
  const circ = 2 * Math.PI * R;
  const fill = (Math.min(score, 100) / 100) * circ;
  const col  = riskColor(score);
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
        <span className="pa-count" style={{ fontSize: size > 100 ? 28 : 20,
          fontWeight: 900, color: col, lineHeight: 1,
          fontFamily: "'Outfit', sans-serif" }}>{score}</span>
        <span style={{ fontSize: 8.5, color: T.muted, fontWeight: 600 }}>risk</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HISTORY ROW
───────────────────────────────────────────── */
function HistoryRow({ rec, index }) {
  const [open, setOpen] = useState(false);
  const col  = riskColor(rec.riskScore);
  const date = new Date(rec.date || rec.createdAt);

  return (
    <div className="hist-row" style={{
      ...glass, borderRadius: 13, overflow: "hidden",
      border: `1px solid rgba(244,63,94,0.12)`, transition: "all 0.2s",
      animation: `slideIn 0.32s ease ${index * 35}ms both`,
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", alignItems: "center", gap: 13,
        padding: "13px 16px", background: "transparent",
        border: "none", cursor: "pointer", textAlign: "left",
      }}>
        {/* Risk score badge */}
        <div style={{ width: 44, height: 44, borderRadius: 11, flexShrink: 0,
          background: riskGrad(rec.riskScore),
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 2px 10px ${col}30` }}>
          <span style={{ fontSize: 13, fontWeight: 900, color: "white",
            fontFamily: "'Outfit', sans-serif" }}>{rec.riskScore}</span>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 12.5, fontWeight: 800, color: T.text, marginBottom: 3 }}>
            {rec.painLocation?.replace(/_/g, " ") || "Pain Record"}
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, color: T.muted }}>
              🔥 {rec.painIntensity}/10 intensity
            </span>
            <span style={{ color: "#fecdd3" }}>|</span>
            <span style={{ fontSize: 10, color: T.muted }}>
              🕐 {rec.morningStiffnessMinutes}min stiffness
            </span>
            <span style={{ color: "#fecdd3" }}>|</span>
            <span style={{ fontSize: 10, color: T.muted }}>
              {date.toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
        </div>

        {/* Risk label */}
        <span style={{ padding: "3px 10px", borderRadius: 99, fontSize: 9.5,
          fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em",
          background: `${col}12`, border: `1px solid ${col}30`,
          color: col, flexShrink: 0 }}>
          {riskLabel(rec.riskScore)}
        </span>

        <ChevronDown size={14} style={{ color: T.muted, flexShrink: 0,
          transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }} />
      </button>

      {open && (
        <div style={{ padding: "0 16px 14px", borderTop: "1px solid rgba(244,63,94,0.10)" }}>
          {/* Metric grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)",
            gap: 8, paddingTop: 12, marginBottom: 12 }}>
            {[
              { label: "Risk Score",   val: rec.riskScore,             color: riskColor(rec.riskScore) },
              { label: "Overload Idx", val: rec.overloadIndex?.toFixed(1) ?? "—", color: T.orange },
              { label: "Inflam. Idx",  val: rec.inflammationIndex?.toFixed(1) ?? "—", color: T.amber  },
              { label: "Prot. Mode",   val: rec.protectiveMode ? "Yes" : "No",     color: rec.protectiveMode ? T.rose : T.success },
            ].map(({ label, val, color }) => (
              <div key={label} style={{ background: "rgba(255,241,242,0.55)",
                border: "1px solid rgba(244,63,94,0.12)", borderRadius: 9, padding: "9px 10px" }}>
                <p style={{ fontSize: 8, fontWeight: 700, color: T.muted,
                  textTransform: "uppercase", letterSpacing: "0.13em", marginBottom: 4 }}>
                  {label}
                </p>
                <p style={{ fontSize: 14, fontWeight: 900, color,
                  fontFamily: "'Outfit', sans-serif" }}>{String(val)}</p>
              </div>
            ))}
          </div>

          {/* Flags */}
          {rec.clinicalFlags?.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
              {rec.clinicalFlags.map(f => (
                <span key={f} style={{ padding: "3px 10px", borderRadius: 99, fontSize: 9.5,
                  fontWeight: 700, background: "rgba(244,63,94,0.08)",
                  border: "1px solid rgba(244,63,94,0.2)", color: T.rose }}>
                  ⚑ {f}
                </span>
              ))}
            </div>
          )}

          {/* Protective action */}
          {rec.protectiveMode && rec.protectiveAction && (
            <div style={{ padding: "9px 12px", borderRadius: 9, marginBottom: 10,
              background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.22)" }}>
              <p style={{ fontSize: 9, fontWeight: 700, color: T.amber,
                textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 3 }}>
                Protective Action
              </p>
              <p style={{ fontSize: 11.5, color: "#92400e", fontWeight: 600 }}>
                {rec.protectiveAction}
              </p>
            </div>
          )}

          {/* AI insight */}
          {rec.aiInsight && (
            <div style={{ padding: "10px 13px", borderRadius: 9,
              background: "rgba(99,102,241,0.05)", border: "1px solid rgba(99,102,241,0.15)" }}>
              <p style={{ fontSize: 9, fontWeight: 700, color: T.indigo,
                textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>
                💡 AI Clinical Insight
              </p>
              <p style={{ fontSize: 11.5, color: T.textMid, lineHeight: 1.65 }}>
                {rec.aiInsight}
              </p>
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
export default function PainAnalysis() {
  const { user } = useAuth();
  const userId   = user?._id || user?.id;
  const today    = new Date().toISOString().split("T")[0];

  /* ── form ── */
  const [form, setForm] = useState({
    painLocation:              "lower_back",
    painIntensity:             3,
    painIncreaseAfterActivity: false,
    morningStiffnessMinutes:   10,
  });

  /* ── ui ── */
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState("");
  const [result,      setResult]      = useState(null);
  const [history,     setHistory]     = useState([]);
  const [histLoading, setHistLoading] = useState(true);

  /* ── fetch history ── */
  useEffect(() => {
    if (!userId) return;
    painAPI.getUserRecords(userId)
      .then(r => setHistory(r.data?.data || []))
      .catch(() => setHistory([]))
      .finally(() => setHistLoading(false));
  }, [userId]);

  /* ── derived stats ── */
  const avgRisk   = history.length
    ? Math.round(history.reduce((a, b) => a + (b.riskScore || 0), 0) / history.length)
    : null;
  const highRisk  = history.filter(h => h.riskScore >= 75).length;
  const protected_ = history.filter(h => h.protectiveMode).length;

  /* ── handlers ── */
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "range" ? Number(value) : value,
    }));
  };
  const handleSet = (name, value) =>
    setForm(prev => ({ ...prev, [name]: value }));

  /* ── submit ── */
  const handleSubmit = async () => {
    setError(""); setLoading(true);
    try {
      const res = await painAPI.create({ userId, date: today, ...form });
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
     RESULT VIEW
  ───────────────────────────────────────────── */
  if (result) {
    const col = riskColor(result.riskScore);

    return (
      <>
        <style>{KEYFRAMES}</style>
        <div style={{ position:"fixed", top:-100, right:-80, width:380, height:380,
          borderRadius:"50%", background:"rgba(244,63,94,0.06)",
          filter:"blur(80px)", pointerEvents:"none", zIndex:0 }} />
        <div style={{ position:"fixed", bottom:-80, left:"10%", width:280, height:280,
          borderRadius:"50%", background:"rgba(245,158,11,0.05)",
          filter:"blur(60px)", pointerEvents:"none", zIndex:0 }} />

        <div style={{ minHeight:"100vh", background:T.gradBody,
          fontFamily:"'Outfit', sans-serif", padding:"44px 20px 72px",
          position:"relative", zIndex:1 }}>
          <div style={{ maxWidth:640, margin:"0 auto",
            display:"flex", flexDirection:"column", gap:16 }}>

            {/* Main result card */}
            <div className="pa-fade" style={{ ...glass, borderRadius:24, overflow:"hidden" }}>
              <div style={{ height:4, background:T.gradPrimary,
                backgroundSize:"200% auto", animation:"gradientShift 2.4s linear infinite" }} />
              <div style={{ padding:"32px 30px" }}>
                <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.2em",
                  textTransform:"uppercase", color:T.rose, marginBottom:10 }}>
                  ◆ Pain Analysis · {today}
                </p>

                <div style={{ display:"flex", alignItems:"flex-start",
                  justifyContent:"space-between", flexWrap:"wrap", gap:20, marginBottom:24 }}>
                  <div>
                    <h2 style={{ fontSize:"clamp(1.5rem,4vw,2.2rem)", fontWeight:900,
                      color:T.text, letterSpacing:"-0.03em", lineHeight:1.05, marginBottom:8 }}>
                      {form.painLocation.replace(/_/g," ")}
                      <span style={{ display:"block", background:riskGrad(result.riskScore),
                        WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                        backgroundClip:"text", textTransform:"capitalize" }}>
                        {riskLabel(result.riskScore)}
                      </span>
                    </h2>
                    {/* Risk band pills */}
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      {[["Low","< 25",T.success,result.riskScore<25],
                        ["Low-Mod","25–49",T.amber,result.riskScore>=25&&result.riskScore<50],
                        ["Moderate","50–74",T.orange,result.riskScore>=50&&result.riskScore<75],
                        ["High","75+",T.danger,result.riskScore>=75]].map(([label,range,c,active])=>(
                        <div key={label} style={{ padding:"3px 11px", borderRadius:99,
                          background: active ? `${c}14` : "rgba(226,232,240,0.5)",
                          border:`1px solid ${active ? c : "#fecdd3"}`,
                          fontSize:9.5, fontWeight: active ? 700 : 500,
                          color: active ? c : T.muted }}>
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ animation:"pulse-ring 2s ease-in-out 3" }}>
                    <RiskRing score={result.riskScore} size={120} />
                  </div>
                </div>

                {/* Metrics grid */}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
                  {[
                    { label:"Pain",        val:`${result.painIntensity}/10`,         color:riskColor(result.painIntensity*10)  },
                    { label:"Overload",    val:result.overloadIndex?.toFixed(1)??"—", color:T.orange },
                    { label:"Inflam.",     val:result.inflammationIndex?.toFixed(1)??"—", color:T.amber },
                    { label:"Prot. Mode",  val:result.protectiveMode ? "On" : "Off",  color:result.protectiveMode ? T.rose : T.success },
                  ].map(({ label, val, color }) => (
                    <div key={label} style={{ padding:"12px 10px", borderRadius:12,
                      background:`${color}08`, border:`1px solid ${color}20`, textAlign:"center" }}>
                      <p style={{ fontSize:8.5, fontWeight:700, color:T.muted,
                        textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:5 }}>
                        {label}
                      </p>
                      <p style={{ fontSize:16, fontWeight:900, color,
                        fontFamily:"'Outfit', sans-serif" }}>{val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Clinical flags */}
            {result.clinicalFlags?.length > 0 && (
              <div className="pa-fade pa-delay1" style={{ ...glass, borderRadius:16,
                overflow:"hidden" }}>
                <div style={{ height:3, background:T.gradPrimary, opacity:0.7 }} />
                <div style={{ padding:"18px 22px" }}>
                  <p style={{ fontSize:9.5, fontWeight:700, letterSpacing:"0.16em",
                    textTransform:"uppercase", color:T.rose, marginBottom:12 }}>
                    ⚑ Clinical Flags
                  </p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                    {result.clinicalFlags.map(f => (
                      <span key={f} style={{ padding:"5px 14px", borderRadius:99,
                        fontSize:11, fontWeight:700,
                        background:"rgba(244,63,94,0.08)", border:"1px solid rgba(244,63,94,0.22)",
                        color:T.rose, display:"flex", alignItems:"center", gap:5 }}>
                        <AlertTriangle size={11} /> {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Protective action */}
            {result.protectiveMode && (
              <div className="pa-fade pa-delay2" style={{ padding:"16px 18px", borderRadius:14,
                background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.25)",
                display:"flex", gap:12, alignItems:"flex-start" }}>
                <Shield size={18} color={T.amber} style={{ flexShrink:0, marginTop:1 }} />
                <div>
                  <p style={{ fontSize:10, fontWeight:700, color:T.amber,
                    textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:4 }}>
                    Protective Action Recommended
                  </p>
                  <p style={{ fontSize:13, color:"#92400e", fontWeight:600 }}>
                    {result.protectiveAction}
                  </p>
                </div>
              </div>
            )}

            {/* AI insight */}
            {result.aiInsight && (
              <div className="pa-fade pa-delay2" style={{ ...glass, borderRadius:16,
                overflow:"hidden" }}>
                <div style={{ height:3, background:"linear-gradient(135deg,#6366f1,#8b5cf6)", opacity:0.7 }} />
                <div style={{ padding:"18px 22px" }}>
                  <p style={{ fontSize:9.5, fontWeight:700, letterSpacing:"0.16em",
                    textTransform:"uppercase", color:T.indigo, marginBottom:10 }}>
                    💡 AI Clinical Insight
                  </p>
                  <p style={{ fontSize:13, color:T.textMid, lineHeight:1.75 }}>
                    {result.aiInsight}
                  </p>
                </div>
              </div>
            )}

            {/* Saved notice */}
            <div className="pa-fade pa-delay3" style={{ padding:"12px 16px", borderRadius:12,
              background:"rgba(34,197,94,0.07)", border:"1px solid rgba(34,197,94,0.2)",
              fontSize:12, color:T.success, fontWeight:600,
              display:"flex", alignItems:"center", gap:8 }}>
              <Check size={14} /> Record saved — visible in your pain history below.
            </div>

            <button onClick={() => setResult(null)} style={{
              padding:"13px", borderRadius:14, background:T.gradPrimary,
              color:"white", fontFamily:"'Outfit', sans-serif",
              fontSize:12, fontWeight:700, letterSpacing:"0.12em",
              textTransform:"uppercase", border:"none", cursor:"pointer",
              boxShadow:"0 4px 20px rgba(244,63,94,0.28)",
              display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              <RotateCcw size={14} /> Log Another Assessment
            </button>
          </div>
        </div>
      </>
    );
  }

  /* ─────────────────────────────────────────────
     MAIN FORM + HISTORY LAYOUT
  ───────────────────────────────────────────── */
  return (
    <>
      <style>{KEYFRAMES}</style>

      {/* BG blobs — rose/amber tinted */}
      <div style={{ position:"fixed", top:-100, right:-80, width:360, height:360,
        borderRadius:"50%", background:"rgba(244,63,94,0.06)",
        filter:"blur(80px)", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"fixed", bottom:-80, left:"10%", width:280, height:280,
        borderRadius:"50%", background:"rgba(245,158,11,0.05)",
        filter:"blur(60px)", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"fixed", top:"35%", left:-50, width:180, height:180,
        borderRadius:"50%", background:"rgba(249,115,22,0.04)",
        filter:"blur(50px)", pointerEvents:"none", zIndex:0 }} />

      <div style={{ minHeight:"100vh", background:T.gradBody,
        fontFamily:"'Outfit', sans-serif", padding:"44px 20px 80px",
        position:"relative", zIndex:1 }}>

        <div style={{ maxWidth:1100, margin:"0 auto",
          display:"grid", gridTemplateColumns:"1fr 380px", gap:28, alignItems:"start" }}>

          {/* ── LEFT: Form ── */}
          <div style={{ display:"flex", flexDirection:"column", gap:0 }}>

            {/* Page header */}
            <div className="pa-fade" style={{ marginBottom:32 }}>
              <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.2em",
                textTransform:"uppercase", color:T.rose, marginBottom:8 }}>
                ◆ Physiotherapy · Pain Monitoring
              </p>
              <h1 style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:900,
                color:T.text, letterSpacing:"-0.03em", lineHeight:1.05, marginBottom:6 }}>
                Pain
                <span style={{ display:"block", background:T.gradPrimary,
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                  backgroundClip:"text", backgroundSize:"200% auto",
                  animation:"gradientShift 3s linear infinite" }}>
                  Analysis
                </span>
              </h1>
              <p style={{ fontSize:13, color:T.muted, maxWidth:440 }}>
                AI-powered pain evaluation with clinical flags, protective modes,
                and risk scoring based on your symptoms.
              </p>
            </div>

            {/* Form card */}
            <div className="pa-fade pa-delay1" style={{ ...glass, borderRadius:22, overflow:"hidden" }}>
              <div style={{ height:4, background:T.gradPrimary }} />
              <div style={{ padding:"28px 28px 24px",
                display:"flex", flexDirection:"column", gap:24 }}>

                {/* Location picker */}
                <div>
                  <Label>Pain Location</Label>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
                    {PAIN_LOCATIONS.map(loc => {
                      const on = form.painLocation === loc.value;
                      return (
                        <button key={loc.value} className="loc-chip" type="button"
                          onClick={() => handleSet("painLocation", loc.value)}
                          style={{
                            padding:"11px 6px", borderRadius:11,
                            border:`1.5px solid ${on ? T.rose : "#fecdd3"}`,
                            background: on ? "rgba(244,63,94,0.08)" : "rgba(255,241,242,0.5)",
                            color: on ? T.rose : T.textLight,
                            fontFamily:"'Outfit', sans-serif",
                            fontSize:10, fontWeight: on ? 700 : 500,
                            cursor:"pointer", transition:"all 0.16s",
                            display:"flex", flexDirection:"column",
                            alignItems:"center", gap:4,
                          }}>
                          <span style={{ fontSize:16 }}>{loc.icon}</span>
                          {loc.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pain intensity slider */}
                <ScaleSlider
                  name="painIntensity"
                  value={form.painIntensity}
                  onChange={handleChange}
                  min={0} max={10}
                  label="Pain Intensity"
                />

                {/* Morning stiffness slider */}
                <StiffnessSlider
                  name="morningStiffnessMinutes"
                  value={form.morningStiffnessMinutes}
                  onChange={handleChange}
                />

                {/* Pain increase toggle */}
                <Toggle
                  name="painIncreaseAfterActivity"
                  checked={form.painIncreaseAfterActivity}
                  onChange={handleSet}
                  label="Pain Increases After Activity"
                  desc="Does this area hurt more after exercise or movement?"
                />

                {/* Live risk preview */}
                {(() => {
                  const preview = Math.min(100, Math.round(
                    (form.painIntensity * 10) +
                    form.painIntensity * (form.painIncreaseAfterActivity ? 1.3 : 1) +
                    (form.morningStiffnessMinutes / 60) * 100
                  ));
                  const col = riskColor(preview);
                  return (
                    <div style={{ padding:"14px 16px", borderRadius:12,
                      background:`${col}07`, border:`1px solid ${col}25`,
                      display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <div>
                        <p style={{ fontSize:9, fontWeight:700, color:T.muted,
                          textTransform:"uppercase", letterSpacing:"0.14em", marginBottom:3 }}>
                          Estimated Risk Score
                        </p>
                        <p style={{ fontSize:11, color:T.textMid }}>
                          Based on current inputs — final score calculated by AI
                        </p>
                      </div>
                      <div style={{ display:"flex", flexDirection:"column",
                        alignItems:"center", flexShrink:0 }}>
                        <span style={{ fontSize:28, fontWeight:900, color:col,
                          fontFamily:"'Outfit', sans-serif", lineHeight:1 }}>{preview}</span>
                        <span style={{ fontSize:9, color:col, fontWeight:700 }}>
                          {riskLabel(preview)}
                        </span>
                      </div>
                    </div>
                  );
                })()}

                {error && (
                  <div style={{ padding:"12px 14px", borderRadius:11,
                    background:"rgba(244,63,94,0.07)", border:"1px solid rgba(244,63,94,0.22)",
                    fontSize:12, color:T.rose,
                    display:"flex", gap:8, alignItems:"center" }}>
                    <span>⚠</span>{error}
                  </div>
                )}

                {/* Submit */}
                <button onClick={handleSubmit} disabled={loading} style={{
                  padding:"13px", borderRadius:13, border:"none",
                  background: loading ? "rgba(244,63,94,0.4)" : T.gradPrimary,
                  color:"white", fontFamily:"'Outfit', sans-serif",
                  fontSize:12, fontWeight:700, letterSpacing:"0.12em",
                  textTransform:"uppercase",
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: !loading ? "0 4px 20px rgba(244,63,94,0.28)" : "none",
                  display:"flex", alignItems:"center", justifyContent:"center", gap:10,
                  transition:"all 0.2s",
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
                    <><Zap size={14} /> Analyse Pain</>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Stats + History ── */}
          <div className="pa-fade pa-delay2" style={{ display:"flex", flexDirection:"column", gap:14 }}>

            {/* Summary stats */}
            {history.length > 0 && (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                {[
                  { label:"Assessments",  val:history.length,       color:T.rose,    icon:"📋" },
                  { label:"Avg Risk",     val:avgRisk ?? "—",       color:riskColor(avgRisk||0), icon:"📊" },
                  { label:"High Risk",    val:highRisk,             color:T.danger,  icon:"⚠️"  },
                  { label:"Protected",    val:protected_,           color:T.amber,   icon:"🛡️"  },
                ].map(({ label, val, color, icon }) => (
                  <div key={label} style={{ ...glass, borderRadius:14, padding:"14px 13px",
                    position:"relative", overflow:"hidden" }}>
                    <div style={{ position:"absolute", top:0, left:0, right:0,
                      height:2, background:T.gradPrimary, opacity:0.6 }} />
                    <p style={{ fontSize:15, marginBottom:4 }}>{icon}</p>
                    <p style={{ fontSize:8.5, fontWeight:700, color:T.muted,
                      textTransform:"uppercase", letterSpacing:"0.14em", marginBottom:2 }}>
                      {label}
                    </p>
                    <p style={{ fontSize:22, fontWeight:900, color,
                      fontFamily:"'Outfit', sans-serif", lineHeight:1 }}>{val}</p>
                  </div>
                ))}
              </div>
            )}

            {/* History card */}
            <div style={{ ...glass, borderRadius:18, overflow:"hidden" }}>
              <div style={{ height:3, background:T.gradPrimary, opacity:0.7 }} />
              <div style={{ padding:"18px 16px 14px" }}>
                <div style={{ display:"flex", alignItems:"center",
                  justifyContent:"space-between", marginBottom:14 }}>
                  <div>
                    <p style={{ fontSize:9, fontWeight:700, color:T.muted,
                      letterSpacing:"0.18em", textTransform:"uppercase" }}>History</p>
                    <p style={{ fontSize:14, fontWeight:800, color:T.text, marginTop:1 }}>
                      Pain Records
                    </p>
                  </div>
                  <span style={{ fontSize:11, color:T.muted, fontWeight:600 }}>
                    {history.length} record{history.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {histLoading ? (
                  <div style={{ display:"flex", justifyContent:"center", padding:"30px 0" }}>
                    <div style={{ width:26, height:26, borderRadius:"50%",
                      border:"2.5px solid rgba(244,63,94,0.2)",
                      borderTopColor:T.rose,
                      animation:"spin 0.8s linear infinite" }} />
                  </div>
                ) : history.length === 0 ? (
                  <div style={{ textAlign:"center", padding:"32px 16px" }}>
                    <p style={{ fontSize:30, marginBottom:10 }}>🩺</p>
                    <p style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:4 }}>
                      No records yet
                    </p>
                    <p style={{ fontSize:11, color:T.muted, lineHeight:1.6 }}>
                      Complete your first pain assessment to start tracking.
                    </p>
                  </div>
                ) : (
                  <div style={{ display:"flex", flexDirection:"column", gap:7,
                    maxHeight:520, overflowY:"auto", paddingRight:3 }}>
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