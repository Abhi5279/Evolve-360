import { useEffect, useState } from "react";
import { rehabAPI } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import BikeLoader from "../components/BikeLoader";
import {
  Zap, RefreshCw, ChevronDown, Plus, TrendingUp,
  TrendingDown, Minus, CheckCircle, AlertCircle,
  AlertTriangle, Info, Shield, Activity, ClipboardList,
} from "lucide-react";

/* ================================================================
   DESIGN TOKENS  — exact match to APS.jsx / WaterTracker theme
   ================================================================ */

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
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes countUp {
  from { opacity: 0; transform: scale(0.85); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes slideIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.rh-fade   { animation: fadeUp 0.4s ease forwards; }
.rh-delay1 { animation-delay: 0.05s; opacity: 0; }
.rh-delay2 { animation-delay: 0.10s; opacity: 0; }
.rh-delay3 { animation-delay: 0.15s; opacity: 0; }
.rh-delay4 { animation-delay: 0.20s; opacity: 0; }

.row-hover:hover {
  transform: translateY(-2px) !important;
  border-color: rgba(99,102,241,0.22) !important;
  box-shadow: 0 8px 28px rgba(99,102,241,0.12) !important;
}

.domain-card:hover {
  border-color: rgba(99,102,241,0.22) !important;
}

.pg-btn:hover {
  background: rgba(99,102,241,0.08) !important;
}

.input-field:focus {
  border-color: #6366f1 !important;
  outline: none;
}
`;

/* ================================================================
   TAG COLOURS  (mapped to T tokens)
   ================================================================ */
const TAG = {
  primary:   { background: "rgba(99,102,241,0.08)",  color: T.indigo,  border: "1px solid rgba(99,102,241,0.2)"  },
  secondary: { background: "rgba(34,197,94,0.08)",   color: T.success, border: "1px solid rgba(34,197,94,0.2)"   },
  warning:   { background: "rgba(245,158,11,0.08)",  color: T.amber,   border: "1px solid rgba(245,158,11,0.2)"  },
  danger:    { background: "rgba(244,63,94,0.08)",   color: T.danger,  border: "1px solid rgba(244,63,94,0.2)"   },
  muscle:    { background: "rgba(148,163,184,0.08)", color: T.muted,   border: "1px solid rgba(148,163,184,0.2)" },
};

/* ================================================================
   HELPERS
   ================================================================ */

const scoreColor = (s) =>
  s >= 75 ? T.success : s >= 55 ? T.indigo : s >= 35 ? T.amber : T.danger;

const scoreGrad = (s) =>
  s >= 75
    ? "linear-gradient(135deg,#059669,#22c55e)"
    : s >= 55
    ? T.gradPrimary
    : s >= 35
    ? "linear-gradient(135deg,#d97706,#f59e0b)"
    : "linear-gradient(135deg,#dc2626,#f43f5e)";

const phaseInfo = (phase) =>
  ({
    "Acute Recovery":     { icon: "🩹", color: T.danger,  bg: "rgba(244,63,94,0.06)",   border: "rgba(244,63,94,0.2)"   },
    "Controlled Loading": { icon: "⚡", color: T.amber,   bg: "rgba(245,158,11,0.06)",  border: "rgba(245,158,11,0.2)"  },
    "Strength Rebuild":   { icon: "💪", color: T.indigo,  bg: "rgba(99,102,241,0.06)",  border: "rgba(99,102,241,0.2)"  },
    "Performance Ready":  { icon: "🏆", color: T.success, bg: "rgba(34,197,94,0.06)",   border: "rgba(34,197,94,0.2)"   },
  }[phase] || { icon: "📋", color: T.muted, bg: "rgba(148,163,184,0.06)", border: "rgba(148,163,184,0.2)" });

const statusMeta = (status) =>
  ({
    excellent:       { color: T.success, bg: "rgba(34,197,94,0.08)",  border: "rgba(34,197,94,0.2)",  label: "Excellent",       Icon: CheckCircle   },
    good:            { color: T.indigo,  bg: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.2)", label: "Good",            Icon: Info          },
    needs_attention: { color: T.amber,   bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)", label: "Needs Attention", Icon: AlertCircle   },
    critical:        { color: T.danger,  bg: "rgba(244,63,94,0.08)",  border: "rgba(244,63,94,0.2)",  label: "Critical",        Icon: AlertTriangle },
  }[status] || { color: T.muted, bg: "rgba(148,163,184,0.08)", border: "rgba(148,163,184,0.2)", label: status, Icon: Info });

/* ================================================================
   ATOMS
   ================================================================ */

function Tag({ type = "muscle", children }) {
  return (
    <span style={{
      ...TAG[type], fontSize: 9, fontWeight: 700,
      letterSpacing: "0.1em", textTransform: "uppercase",
      padding: "2px 8px", borderRadius: 5,
    }}>
      {children}
    </span>
  );
}

function StatusBadge({ status, small = false }) {
  const m = statusMeta(status);
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      background: m.bg, color: m.color, border: `1px solid ${m.border}`,
      borderRadius: 6, padding: small ? "2px 7px" : "3px 10px",
      fontSize: small ? 9 : 10, fontWeight: 700,
      letterSpacing: "0.08em", textTransform: "uppercase",
    }}>
      <m.Icon size={10} /> {m.label}
    </span>
  );
}

function SectionLabel({ children }) {
  return (
    <p style={{
      fontSize: 10, fontWeight: 700, letterSpacing: "0.2em",
      textTransform: "uppercase", color: T.muted, marginBottom: 14,
    }}>
      {children}
    </p>
  );
}

/* ================================================================
   EVIDENCE STRIP
   ================================================================ */

function EvidenceTrustStrip() {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      background: "rgba(99,102,241,0.06)", border: `1px solid rgba(99,102,241,0.15)`,
      borderRadius: 10, padding: "8px 16px", marginTop: 14,
    }}>
      <span style={{ fontSize: 13 }}>🔬</span>
      <div>
        <span style={{ fontSize: 10, fontWeight: 700, color: T.indigo, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Evidence-Informed Rehabilitation System
        </span>
        <span style={{ fontSize: 10, color: T.textLight, marginLeft: 8 }}>
          ROM · Pain NRS · LSI · Adherence · Fatigue · Form
        </span>
      </div>
    </div>
  );
}

/* ================================================================
   SCORE GAUGE  (SVG ring)
   ================================================================ */

function ScoreGauge({ score, size = 110 }) {
  const r    = (size / 2) - 10;
  const circ = 2 * Math.PI * r;
  const dash = `${(score / 100) * circ} ${circ}`;
  const col  = scoreColor(score);
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={`${col}22`} strokeWidth={8} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={col} strokeWidth={8}
          strokeDasharray={dash} strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ transition: "stroke-dasharray 0.8s ease" }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: size > 100 ? 24 : 18, fontWeight: 900, color: col, lineHeight: 1, fontFamily: "'Outfit', sans-serif" }}>{score}</span>
        <span style={{ fontSize: 8, color: T.muted, fontWeight: 600, letterSpacing: "0.08em" }}>/100</span>
      </div>
    </div>
  );
}

/* ================================================================
   SPARKLINE TREND CHART
   ================================================================ */

function SparkLine({ trend }) {
  if (!trend || trend.length < 2) return null;
  const W = 200, H = 48, pad = 8;
  const scores = trend.map((t) => t.score);
  const min    = Math.min(...scores);
  const max    = Math.max(...scores);
  const range  = max - min || 1;
  const pts    = scores.map((s, i) => {
    const x = pad + (i / (scores.length - 1)) * (W - pad * 2);
    const y = H - pad - ((s - min) / range) * (H - pad * 2);
    return `${x},${y}`;
  }).join(" ");
  const last = scores[scores.length - 1];
  const prev = scores[scores.length - 2];
  const col  = last > prev ? T.success : last < prev ? T.danger : T.muted;
  return (
    <svg width={W} height={H} style={{ overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke={col} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {scores.map((s, i) => {
        const x = pad + (i / (scores.length - 1)) * (W - pad * 2);
        const y = H - pad - ((s - min) / range) * (H - pad * 2);
        return <circle key={i} cx={x} cy={y} r={3} fill={col} />;
      })}
    </svg>
  );
}

/* ================================================================
   REHAB HEADER
   ================================================================ */

function RehabHeader({ summary, onNewSession }) {
  const DirIcon = summary?.scoreDirection === "improving" ? TrendingUp
                : summary?.scoreDirection === "declining" ? TrendingDown : Minus;
  const dirColor = summary?.scoreDirection === "improving" ? T.success
                 : summary?.scoreDirection === "declining" ? T.danger : T.muted;

  const badges = summary ? [
    { label: "Total Sessions", value: summary.totalSessions  ?? "—" },
    { label: "Best Score",     value: summary.bestScore      ?? "—" },
    { label: "Latest Phase",   value: summary.latestPhase?.split(" ")[0] ?? "—" },
    { label: "Score Trend",    value: summary.scoreDirection ?? "stable" },
    { label: "Latest Score",   value: summary.latestScore    ?? "—" },
    { label: "Last Session",   value: summary.latestDate
        ? new Date(summary.latestDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })
        : "—" },
  ] : [];

  return (
    <div className="rh-fade" style={{ ...glass, borderRadius: 24, overflow: "hidden" }}>
      {/* Gradient top bar */}
      <div style={{ height: 4, background: T.gradPrimary }} />
      <div style={{ padding: "32px 36px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 28 }}>

          {/* Left */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.indigo, marginBottom: 8 }}>
              ◆ Rehabilitation Dashboard
            </p>
            <h1 style={{
              fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 900,
              color: T.text, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 6,
            }}>
              RRS Recovery
              <span style={{
                display: "block", background: T.gradPrimary,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text", backgroundSize: "200% auto",
                animation: "gradientShift 3s linear infinite",
              }}>
                Tracker
              </span>
            </h1>
            <p style={{ fontSize: 12, color: T.muted, lineHeight: 1.7, marginTop: 6, maxWidth: 440 }}>
              Evidence-informed clinical progress tracking built on ROM, Pain NRS, LSI, Adherence, Fatigue & Form domains.
            </p>
            <EvidenceTrustStrip />

            {/* Badges grid */}
            {badges.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 22 }}>
                {badges.map(({ label, value }) => (
                  <div key={label} style={{
                    background: "rgba(238,242,255,0.6)", border: `1px solid ${T.borderSoft}`,
                    borderRadius: 12, padding: "12px 14px",
                  }}>
                    <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.muted, marginBottom: 5 }}>{label}</p>
                    <p style={{ fontSize: 13, fontWeight: 800, color: T.text, textTransform: "capitalize", fontFamily: "'Outfit', sans-serif" }}>{String(value)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: gauge + sparkline + CTA */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, flexShrink: 0 }}>
            {summary && (
              <>
                <div style={{ ...glass, borderRadius: 20, padding: "20px 28px",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
                  border: `1px solid ${scoreColor(summary.latestScore)}25` }}>
                  <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.muted }}>Current RRS</p>
                  <ScoreGauge score={summary.latestScore} size={110} />
                  {(() => { const pi = phaseInfo(summary.latestPhase); return (
                    <div style={{ display: "flex", alignItems: "center", gap: 8,
                      background: pi.bg, border: `1px solid ${pi.border}`,
                      borderRadius: 10, padding: "5px 14px" }}>
                      <span style={{ fontSize: 13 }}>{pi.icon}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: pi.color }}>{summary.latestPhase}</span>
                    </div>
                  ); })()}
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <DirIcon size={13} color={dirColor} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: dirColor, textTransform: "capitalize" }}>{summary.scoreDirection}</span>
                  </div>
                </div>

                {summary.trend?.length >= 2 && (
                  <div style={{ ...glass, borderRadius: 14, padding: "12px 16px" }}>
                    <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.muted, marginBottom: 8 }}>Score Trend</p>
                    <SparkLine trend={summary.trend} />
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                      <span style={{ fontSize: 8, color: T.muted }}>Oldest</span>
                      <span style={{ fontSize: 8, color: T.muted }}>Latest</span>
                    </div>
                  </div>
                )}
              </>
            )}

            <button onClick={onNewSession} style={{
              padding: "12px 24px", background: T.gradPrimary,
              color: "white", borderRadius: 12, fontSize: 11, fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
              border: "none", cursor: "pointer", whiteSpace: "nowrap",
              display: "flex", alignItems: "center", gap: 8,
              boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
              transition: "all 0.2s", fontFamily: "'Outfit', sans-serif",
            }}>
              <Plus size={14} /> New RRS Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   ADAPTIVE SAFETY CARD
   ================================================================ */

function AdaptiveSafetyCard() {
  const points = [
    "Weighted composite across 6 clinical domains",
    "Safe defaults & divide-by-zero guards built in",
    "Compensation flags reduce score automatically",
    "Suggestions update dynamically per domain status",
  ];
  return (
    <div style={{ ...glass, borderRadius: 16, border: `1px solid rgba(99,102,241,0.18)`, overflow: "hidden" }}>
      <div style={{ height: 3, background: T.gradPrimary, opacity: 0.7 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 20px",
        background: "rgba(238,242,255,0.4)", borderBottom: `1px solid ${T.borderSoft}` }}>
        <span style={{ fontSize: 16 }}>🧠</span>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: T.text }}>RRS Scoring Engine Active</p>
          <p style={{ fontSize: 10, color: T.textLight, marginTop: 2 }}>
            Your domain inputs shape this score in real time. Treat it as clinical guidance, not a rigid verdict.
          </p>
        </div>
        <div style={{ marginLeft: "auto", background: "rgba(99,102,241,0.08)",
          border: `1px solid rgba(99,102,241,0.2)`, borderRadius: 6, padding: "3px 10px", flexShrink: 0 }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: T.indigo, letterSpacing: "0.1em", textTransform: "uppercase" }}>Active</span>
        </div>
      </div>
      <div style={{ padding: "14px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
        {points.map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: T.indigo, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: T.textLight, lineHeight: 1.5 }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   PHASE REFERENCE CARD
   ================================================================ */

function PhaseReferenceCard({ phases }) {
  if (!phases?.length) return null;
  return (
    <div style={{ ...glass, borderRadius: 20, overflow: "hidden" }}>
      <div style={{ height: 3, background: T.gradPrimary, opacity: 0.7 }} />
      <div style={{ padding: "18px 28px", borderBottom: `1px solid ${T.borderSoft}`,
        display: "flex", alignItems: "center", gap: 12,
        background: "rgba(238,242,255,0.3)" }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: T.gradPrimary,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontSize: 14, boxShadow: "0 2px 8px rgba(99,102,241,0.3)" }}>
          <Shield size={16} />
        </div>
        <h2 style={{ fontSize: "1.05rem", fontWeight: 800, color: T.text }}>Recovery Phase Guide</h2>
      </div>
      <div style={{ padding: 24, display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
        {phases.map((p) => {
          const pi = phaseInfo(p.phase);
          return (
            <div key={p.phase} style={{ background: pi.bg, border: `1px solid ${pi.border}`, borderRadius: 14, padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 18 }}>{pi.icon}</span>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{p.phase}</p>
                  <div style={{ display: "inline-flex", background: `${pi.color}15`,
                    border: `1px solid ${pi.border}`, borderRadius: 5, padding: "1px 8px", marginTop: 3 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: pi.color }}>Score {p.minScore}–{p.maxScore}</span>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 11, color: T.textLight, lineHeight: 1.6 }}>{p.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================================================================
   DOMAIN BAR
   ================================================================ */

const DOMAIN_META = {
  rom:       { label: "Range of Motion",  icon: "🦵", scoreKey: "improvementPercent" },
  pain:      { label: "Pain Reduction",   icon: "💊", scoreKey: "reductionPercent"   },
  symmetry:  { label: "Symmetry (LSI)",   icon: "⚖️", scoreKey: "lsiPercent"         },
  adherence: { label: "Adherence",        icon: "📅", scoreKey: "adherencePercent"   },
  fatigue:   { label: "Fatigue Response", icon: "⚡", scoreKey: "fatigueResponseScore"},
  form:      { label: "Form Quality",     icon: "🎯", scoreKey: "formQualityPercent"  },
};

function DomainBar({ domain, score, status }) {
  const m   = DOMAIN_META[domain] || { label: domain, icon: "📊" };
  const col = statusMeta(status).color;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: T.text }}>{m.icon} {m.label}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: col }}>{Math.round(score)}%</span>
          <StatusBadge status={status} small />
        </div>
      </div>
      <div style={{ height: 5, background: "rgba(148,163,184,0.15)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${Math.min(score, 100)}%`,
          background: col, borderRadius: 3, transition: "width 0.8s ease" }} />
      </div>
    </div>
  );
}

/* ================================================================
   DOMAIN DETAIL CARD
   ================================================================ */

function DomainCard({ domain, data, breakdown }) {
  const [open, setOpen] = useState(false);
  const m  = DOMAIN_META[domain] || { label: domain, icon: "📊", scoreKey: null };
  const sm = statusMeta(data.status);
  const bdScore = m.scoreKey && breakdown?.[domain]?.[m.scoreKey];

  return (
    <div className="domain-card" style={{
      background: "rgba(238,242,255,0.4)", border: `1px solid ${sm.border}`,
      borderRadius: 14, overflow: "hidden", transition: "border-color 0.2s",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: 16 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: T.gradPrimary,
          color: "white", fontSize: 14, display: "flex", alignItems: "center",
          justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 8px rgba(99,102,241,0.25)" }}>
          {m.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 6 }}>{m.label}</p>
          {bdScore != null && (
            <div style={{ height: 4, background: "rgba(148,163,184,0.15)", borderRadius: 2 }}>
              <div style={{ height: "100%", width: `${Math.min(bdScore, 100)}%`,
                background: sm.color, borderRadius: 2, transition: "width 0.8s ease" }} />
            </div>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <StatusBadge status={data.status} />
          {bdScore != null && <span style={{ fontSize: 14, fontWeight: 900, color: sm.color, fontFamily: "'Outfit', sans-serif" }}>{Math.round(bdScore)}%</span>}
        </div>
      </div>

      {data.suggestions?.length > 0 && (
        <>
          <button onClick={() => setOpen(!open)} style={{
            width: "100%", padding: "8px 16px", background: "transparent",
            border: "none", borderTop: `1px solid ${T.borderSoft}`,
            fontSize: 9, fontWeight: 700, letterSpacing: "0.15em",
            textTransform: "uppercase", color: T.muted, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            fontFamily: "'Outfit', sans-serif",
          }}>
            {open ? "Hide Recommendations" : "View Recommendations"}
            <ChevronDown size={12} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>

          {open && (
            <div style={{ padding: 16, borderTop: `1px solid ${T.borderSoft}`, background: sm.bg,
              display: "flex", flexDirection: "column", gap: 10 }}>
              {/* Breakdown mini stats */}
              {breakdown?.[domain] && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 8 }}>
                  {Object.entries(breakdown[domain])
                    .filter(([k]) => !["weight","flags"].includes(k))
                    .slice(0, 6)
                    .map(([k, v]) => (
                      <div key={k} style={{ background: "rgba(255,255,255,0.7)",
                        border: `1px solid ${T.borderLight}`, borderRadius: 8, padding: "8px 10px" }}>
                        <p style={{ fontSize: 8, fontWeight: 700, color: T.muted,
                          textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>
                          {k.replace(/([A-Z])/g, " $1").trim()}
                        </p>
                        <p style={{ fontSize: 12, fontWeight: 800, color: T.text, fontFamily: "'Outfit', sans-serif" }}>
                          {typeof v === "number" ? Math.round(v * 10) / 10 : String(v ?? "—")}
                        </p>
                      </div>
                    ))}
                </div>
              )}
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.15em",
                textTransform: "uppercase", color: sm.color, marginBottom: 4 }}>
                Clinical Recommendations
              </p>
              {data.suggestions.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%",
                    background: `${sm.color}18`, border: `1px solid ${sm.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 9, fontWeight: 800, color: sm.color, flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                  <p style={{ fontSize: 11, color: T.textLight, lineHeight: 1.65, paddingTop: 1 }}>{s}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ================================================================
   SESSION CARD
   ================================================================ */

function SessionCard({ session, onView, index }) {
  const pi  = phaseInfo(session.recoveryPhase);
  const col = scoreColor(session.score);
  return (
    <div className="row-hover" onClick={() => onView(session)} style={{
      ...glass, borderRadius: 16, overflow: "hidden",
      border: `1px solid ${T.borderSoft}`,
      transition: "all 0.2s", cursor: "pointer",
      animation: `slideIn 0.35s ease ${index * 30}ms both`,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Score badge */}
          <div style={{ width: 46, height: 46, borderRadius: 12, background: scoreGrad(session.score),
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, boxShadow: `0 2px 10px ${col}30` }}>
            <span style={{ fontSize: 15, fontWeight: 900, color: "white", fontFamily: "'Outfit', sans-serif" }}>{session.score}</span>
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 800, color: T.text, marginBottom: 3 }}>
              {pi.icon} {session.recoveryPhase}
            </p>
            <p style={{ fontSize: 11, color: T.textLight, marginBottom: 2 }}>
              {session.sessionType} · {session.bodyRegion || "General"}
            </p>
            <p style={{ fontSize: 10, color: T.muted }}>
              {new Date(session.sessionDate || session.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {session.rehabilitationPhase && <Tag type="primary">{session.rehabilitationPhase}</Tag>}
          <ChevronDown size={16} style={{ color: T.muted, transform: "rotate(-90deg)" }} />
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SESSION DETAIL VIEW
   ================================================================ */

function SessionDetail({ session, onBack }) {
  const pi      = phaseInfo(session.recoveryPhase);
  const col     = scoreColor(session.score);
  const domains = ["rom", "pain", "symmetry", "adherence", "fatigue", "form"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Back bar */}
      <div className="rh-fade" style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button onClick={onBack} style={{
          padding: "9px 18px", background: T.surface, border: `1px solid ${T.borderSoft}`,
          borderRadius: 10, fontSize: 12, fontWeight: 700, color: T.indigo,
          cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
          fontFamily: "'Outfit', sans-serif", transition: "all 0.15s",
        }}>
          ← Back to Sessions
        </button>
        <div>
          <p style={{ fontSize: 11, color: T.muted }}>Session Detail</p>
          <p style={{ fontSize: 13, fontWeight: 700, color: T.text }}>
            {new Date(session.sessionDate || session.createdAt)
              .toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
      </div>

      {/* Top 3-col row */}
      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 240px", gap: 16 }}>
        {/* Score panel */}
        <div className="rh-fade rh-delay1" style={{ ...glass, borderRadius: 18, padding: "20px 16px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
          border: `1px solid ${col}25`, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: T.gradPrimary, opacity: 0.7 }} />
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.muted }}>RRS Score</p>
          <ScoreGauge score={session.score} size={100} />
          <div style={{ background: pi.bg, border: `1px solid ${pi.border}`,
            borderRadius: 8, padding: "4px 12px", display: "flex", alignItems: "center", gap: 6 }}>
            <span>{pi.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: pi.color }}>{session.recoveryPhase}</span>
          </div>
        </div>

        {/* Info grid */}
        <div className="rh-fade rh-delay2" style={{ ...glass, borderRadius: 18, padding: 24, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: T.gradPrimary, opacity: 0.7 }} />
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.muted, marginBottom: 14 }}>Session Info</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label: "Session Type",          value: session.sessionType                           },
              { label: "Body Region",            value: session.bodyRegion                            },
              { label: "Rehab Phase",            value: session.rehabilitationPhase                  },
              { label: "Score Before Penalty",   value: session.breakdown?.weightedScoreBeforePenalty },
              { label: "Penalty Applied",        value: session.breakdown?.compensation?.penaltyApplied },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: "rgba(238,242,255,0.5)",
                border: `1px solid ${T.borderSoft}`, borderRadius: 10, padding: "10px 14px" }}>
                <p style={{ fontSize: 8, fontWeight: 700, color: T.muted,
                  textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{label}</p>
                <p style={{ fontSize: 13, fontWeight: 800, color: T.text, fontFamily: "'Outfit', sans-serif" }}>{String(value ?? "—")}</p>
              </div>
            ))}
          </div>
          {session.patientDescription && (
            <div style={{ marginTop: 10, background: "rgba(238,242,255,0.5)",
              border: `1px solid ${T.borderSoft}`, borderRadius: 10, padding: "10px 14px" }}>
              <p style={{ fontSize: 8, fontWeight: 700, color: T.muted,
                textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Chief Complaint</p>
              <p style={{ fontSize: 12, color: T.textLight, lineHeight: 1.6 }}>{session.patientDescription}</p>
            </div>
          )}
        </div>

        {/* Clinical summary */}
        <div className="rh-fade rh-delay3" style={{ ...glass, borderRadius: 18, padding: 24,
          borderLeft: `3px solid ${T.indigo}`, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: T.gradPrimary, opacity: 0.7 }} />
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.indigo, marginBottom: 14 }}>Clinical Summary</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {(session.suggestions?.overall || []).slice(0, 3).map((s, i) => (
              <p key={i} style={{ fontSize: 11, color: T.textLight, lineHeight: 1.6,
                paddingBottom: 8, borderBottom: i < 2 ? `1px solid ${T.borderSoft}` : "none" }}>{s}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Domain overview bars */}
      <div className="rh-fade rh-delay2" style={{ ...glass, borderRadius: 18, overflow: "hidden" }}>
        <div style={{ height: 3, background: T.gradPrimary, opacity: 0.7 }} />
        <div style={{ padding: 24 }}>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.muted, marginBottom: 18 }}>Domain Overview</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 32px" }}>
            {domains.map((d) => {
              const dm    = DOMAIN_META[d];
              const dData = session.suggestions?.byDomain?.[d];
              const bdVal = session.breakdown?.[d]?.[dm.scoreKey];
              if (!dData) return null;
              return <DomainBar key={d} domain={d} score={bdVal ?? 0} status={dData.status} />;
            })}
          </div>
        </div>
      </div>

      {/* Domain cards */}
      <div className="rh-fade rh-delay3">
        <SectionLabel>Domain Analysis & Recommendations</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {domains.map((d) => {
            const dData = session.suggestions?.byDomain?.[d];
            if (!dData) return null;
            return <DomainCard key={d} domain={d} data={dData} breakdown={session.breakdown} />;
          })}
        </div>
      </div>

      {/* Compensation flags */}
      {session.breakdown?.compensation?.flags?.length > 0 && (
        <div className="rh-fade rh-delay4" style={{ ...glass, borderRadius: 16, padding: 22,
          borderLeft: `3px solid ${T.amber}` }}>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.amber, marginBottom: 14 }}>
            ⚠️ Compensation Flags
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {session.breakdown.compensation.flags.map((f, i) => (
              <span key={i} style={{
                ...TAG[f.severity === "severe" ? "danger" : f.severity === "moderate" ? "warning" : "muscle"],
                borderRadius: 8, padding: "5px 12px", fontSize: 11, fontWeight: 700,
              }}>
                {(f.type || "").replace(/_/g, " ")} — {f.severity}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Clinician notes */}
      {session.notes && (
        <div style={{ ...glass, borderRadius: 14, padding: 20 }}>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", color: T.muted, marginBottom: 8 }}>Clinician Notes</p>
          <p style={{ fontSize: 13, color: T.textLight, lineHeight: 1.7 }}>{session.notes}</p>
        </div>
      )}
    </div>
  );
}

/* ================================================================
   NEW SESSION FORM
   ================================================================ */

function NewSessionForm({ userId, onSuccess, isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    sessionType: "Treatment Session",
    bodyRegion: "Knee",
    rehabilitationPhase: "Sub-acute",
    patientDescription: "",
    notes: "",
    romBaseline: 40, romCurrent: 70, romNormative: 120,
    baselinePain: 6, currentPain: 3,
    injuredValue: 30, uninjuredValue: 40,
    completedSessions: 7, prescribedSessions: 10, missedStreak: 2,
    readinessPercent: 70, actualRPE: 6,
    formQualityPercent: 65,
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: 10,
    border: `1.5px solid ${T.borderSoft}`, fontSize: 13, color: T.text,
    background: "rgba(238,242,255,0.5)", outline: "none",
    fontFamily: "'Outfit', sans-serif", boxSizing: "border-box",
    transition: "border-color 0.15s",
  };

  const F = ({ label, k, type = "number", min, max }) => (
    <div>
      <p style={{ fontSize: 9, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 5 }}>{label}</p>
      <input
        className="input-field"
        type={type} value={form[k]} min={min} max={max}
        onChange={(e) => set(k, type === "number" ? +e.target.value : e.target.value)}
        style={inputStyle}
      />
    </div>
  );

  const Sel = ({ label, k, opts }) => (
    <div>
      <p style={{ fontSize: 9, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 5 }}>{label}</p>
      <select className="input-field" value={form[k]} onChange={(e) => set(k, e.target.value)} style={inputStyle}>
        {opts.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await rehabAPI.calculate({
        userId,
        sessionType:         form.sessionType,
        bodyRegion:          form.bodyRegion,
        rehabilitationPhase: form.rehabilitationPhase,
        patientDescription:  form.patientDescription,
        notes:               form.notes,
        rom:      { baselineDeg: +form.romBaseline, currentDeg: +form.romCurrent, normativeDeg: +form.romNormative },
        pain:     { baselineNRS: +form.baselinePain, currentNRS: +form.currentPain },
        symmetry: { injuredValue: +form.injuredValue, uninjuredValue: +form.uninjuredValue },
        adherence:{ completedSessions: +form.completedSessions, prescribedSessions: +form.prescribedSessions, longestMissedStreakDays: +form.missedStreak },
        fatigue:  { readinessPercent: +form.readinessPercent, actualRPE: +form.actualRPE },
        form:     { formQualityPercent: +form.formQualityPercent },
        compensations: [],
      });
      onSuccess();
      onClose();
    } catch (err) {
      alert(err.message || "Failed to save session");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="rh-fade" style={{ ...glass, borderRadius: 20, overflow: "hidden", border: `1px solid rgba(99,102,241,0.3)` }}>
      {/* Header */}
      <div style={{ height: 4, background: T.gradPrimary }} />
      <div style={{ padding: "16px 26px", background: "rgba(238,242,255,0.4)",
        borderBottom: `1px solid ${T.borderSoft}`,
        display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: T.gradPrimary,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontSize: 16, boxShadow: "0 2px 8px rgba(99,102,241,0.3)" }}>◎</div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 800, color: T.text }}>New RRS Session</p>
            <p style={{ fontSize: 10, color: T.muted, marginTop: 2 }}>
              Enter clinical measurements to calculate the Recovery & Rehabilitation Score
            </p>
          </div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none",
          fontSize: 18, color: T.muted, cursor: "pointer", lineHeight: 1 }}>✕</button>
      </div>

      <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Clinical context */}
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, color: T.indigo,
            letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>
            Clinical Context
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <Sel label="Session Type" k="sessionType" opts={["Initial Assessment","Reassessment","Treatment Session","Discharge Assessment","Home Visit","Telehealth Review"]} />
            <Sel label="Body Region"  k="bodyRegion"  opts={["Lumbar Spine","Cervical Spine","Shoulder","Elbow / Wrist","Hip","Knee","Ankle / Foot","Full Body"]} />
            <Sel label="Rehab Phase"  k="rehabilitationPhase" opts={["Acute","Sub-acute","Chronic","Post-surgical","Return to Sport","Maintenance"]} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
            <div>
              <p style={{ fontSize: 9, fontWeight: 700, color: T.muted,
                textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 5 }}>
                Patient Description / Chief Complaint
              </p>
              <textarea value={form.patientDescription}
                onChange={(e) => set("patientDescription", e.target.value)}
                rows={2} placeholder="e.g. ACL reconstruction 4 weeks post-op, mild swelling…"
                style={{ ...inputStyle, resize: "vertical" }} />
            </div>
            <div>
              <p style={{ fontSize: 9, fontWeight: 700, color: T.muted,
                textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 5 }}>
                Clinician Notes
              </p>
              <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)}
                rows={2} placeholder="Session observations…"
                style={{ ...inputStyle, resize: "vertical" }} />
            </div>
          </div>
        </div>

        {/* Domain measurements */}
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, color: T.indigo,
            letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>
            Domain Measurements
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            <F label="ROM Baseline (°)"    k="romBaseline"        min={0} max={180} />
            <F label="ROM Current (°)"     k="romCurrent"         min={0} max={180} />
            <F label="ROM Normative (°)"   k="romNormative"       min={0} max={180} />
            <F label="Form Quality (%)"    k="formQualityPercent" min={0} max={100} />
            <F label="Pain Baseline NRS"   k="baselinePain"       min={0} max={10}  />
            <F label="Pain Current NRS"    k="currentPain"        min={0} max={10}  />
            <F label="Injured Value"       k="injuredValue"       min={0} />
            <F label="Uninjured Value"     k="uninjuredValue"     min={0} />
            <F label="Sessions Completed"  k="completedSessions"  min={0} />
            <F label="Sessions Prescribed" k="prescribedSessions" min={0} />
            <F label="Readiness (%)"       k="readinessPercent"   min={0} max={100} />
            <F label="Actual RPE (1–10)"   k="actualRPE"          min={1} max={10}  />
          </div>
        </div>

        {/* Submit row */}
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={handleSubmit} disabled={loading} style={{
            flex: 1, padding: "13px 0",
            background: loading ? "rgba(99,102,241,0.4)" : T.gradPrimary,
            color: "white", borderRadius: 12, border: "none",
            fontSize: 12, fontWeight: 700, letterSpacing: "0.08em",
            textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
            fontFamily: "'Outfit', sans-serif",
          }}>
            {loading
              ? <><RefreshCw size={14} style={{ animation: "spin 1s linear infinite" }} /> Calculating…</>
              : <><Zap size={14} /> Calculate & Save RRS</>}
          </button>
          <button onClick={onClose} style={{
            padding: "13px 24px", background: "rgba(255,255,255,0.8)",
            color: T.textLight, borderRadius: 12,
            border: `1.5px solid ${T.borderSoft}`, fontSize: 12,
            fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', sans-serif",
          }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   MAIN PAGE
   ================================================================ */

export default function Rehab() {
  const { user } = useAuth();

  const [summary,         setSummary]         = useState(null);
  const [sessions,        setSessions]        = useState([]);
  const [phases,          setPhases]          = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [loading,         setLoading]         = useState(true);
  const [actionLoading,   setActionLoading]   = useState(false);
  const [formOpen,        setFormOpen]        = useState(false);
  const [pagination,      setPagination]      = useState({ page: 1, totalPages: 1, total: 0 });

  const fetchAll = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const [sumRes, sesRes, phRes] = await Promise.allSettled([
        rehabAPI.getSummary(user.id),
        rehabAPI.getSessions(user.id, { limit: 10, page: 1, sort: "desc" }),
        rehabAPI.getPhases(),
      ]);
      if (sumRes.status === "fulfilled") setSummary(sumRes.value.data?.summary || null);
      if (sesRes.status === "fulfilled") {
        setSessions(sesRes.value.data?.sessions || []);
        setPagination(sesRes.value.data?.pagination || { page: 1, totalPages: 1, total: 0 });
      }
      if (phRes.status === "fulfilled") setPhases(phRes.value.data?.phases || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const loadPage = async (page) => {
    setActionLoading(true);
    try {
      const res = await rehabAPI.getSessions(user.id, { limit: 10, page, sort: "desc" });
      setSessions(res.data?.sessions || []);
      setPagination(res.data?.pagination || pagination);
    } catch (e) { console.error(e); }
    finally { setActionLoading(false); }
  };

  const handleViewSession = async (stub) => {
    try {
      const res = await rehabAPI.getSession(user.id, stub._id);
      setSelectedSession(res.data?.session || stub);
    } catch { setSelectedSession(stub); }
  };

  useEffect(() => { fetchAll(); }, [user?.id]);

  if (loading) return <BikeLoader />;

  return (
    <>
      <style>{KEYFRAMES}</style>

      {/* Background blobs */}
      <div style={{ position: "fixed", top: -100, right: -80, width: 380, height: 380,
        borderRadius: "50%", background: "rgba(99,102,241,0.07)",
        filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: -80, left: "15%", width: 280, height: 280,
        borderRadius: "50%", background: "rgba(124,58,237,0.05)",
        filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", top: "40%", left: -60, width: 200, height: 200,
        borderRadius: "50%", background: "rgba(37,99,235,0.04)",
        filter: "blur(50px)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{
        minHeight: "100vh", background: T.gradBody,
        fontFamily: "'Outfit', sans-serif", position: "relative", zIndex: 1,
        padding: "44px 32px 80px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: 32 }}>

          {actionLoading && <BikeLoader />}

          {selectedSession ? (
            <SessionDetail session={selectedSession} onBack={() => setSelectedSession(null)} />
          ) : (
            <>
              {/* Header */}
              <RehabHeader summary={summary} onNewSession={() => setFormOpen(true)} />

              {/* New session form */}
              {formOpen && (
                <NewSessionForm userId={user.id} onSuccess={fetchAll} isOpen={formOpen} onClose={() => setFormOpen(false)} />
              )}

              {/* Scoring system card */}
              <div className="rh-fade rh-delay1">
                <SectionLabel>Scoring System</SectionLabel>
                <AdaptiveSafetyCard />
              </div>

              {/* Empty state */}
              {sessions.length === 0 && !formOpen && (
                <div className="rh-fade rh-delay2" style={{ ...glass, borderRadius: 24,
                  padding: "80px 32px", textAlign: "center",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
                  border: `2px dashed ${T.borderSoft}` }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%",
                    border: `2px dashed rgba(99,102,241,0.4)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: T.indigo }}>
                    <Plus size={28} />
                  </div>
                  <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: T.text }}>No RRS Sessions Yet</h2>
                  <p style={{ fontSize: 13, color: T.muted, maxWidth: 360, lineHeight: 1.7 }}>
                    Submit your first rehabilitation assessment to begin tracking recovery progress with the evidence-informed RRS scoring system.
                  </p>
                  <button onClick={() => setFormOpen(true)} style={{
                    padding: "13px 32px", background: T.gradPrimary,
                    color: "white", borderRadius: 14, fontSize: 12, fontWeight: 700,
                    border: "none", cursor: "pointer", display: "flex", alignItems: "center",
                    gap: 8, boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
                    marginTop: 8, fontFamily: "'Outfit', sans-serif",
                  }}>
                    <Zap size={16} /> Submit First Assessment
                  </button>
                </div>
              )}

              {/* Phase reference */}
              {phases.length > 0 && (
                <div className="rh-fade rh-delay2">
                  <SectionLabel>Phase Reference Guide</SectionLabel>
                  <PhaseReferenceCard phases={phases} />
                </div>
              )}

              {/* Session history */}
              {sessions.length > 0 && (
                <div className="rh-fade rh-delay3">
                  <div style={{ display: "flex", alignItems: "center",
                    justifyContent: "space-between", marginBottom: 14 }}>
                    <SectionLabel>Session History</SectionLabel>
                    <span style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>
                      {pagination.total} session{pagination.total !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {sessions.map((s, i) => (
                      <SessionCard key={s._id} session={s} onView={handleViewSession} index={i} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pg) => (
                        <button key={pg} className="pg-btn" onClick={() => loadPage(pg)} style={{
                          width: 36, height: 36, borderRadius: 8, border: "none",
                          cursor: "pointer", fontWeight: 700, fontSize: 12,
                          fontFamily: "'Outfit', sans-serif", transition: "all 0.15s",
                          background: pg === pagination.page ? T.gradPrimary : "rgba(238,242,255,0.7)",
                          color:      pg === pagination.page ? "white" : T.textLight,
                          boxShadow:  pg === pagination.page ? "0 2px 10px rgba(99,102,241,0.3)" : "none",
                        }}>
                          {pg}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ position: "relative", zIndex: 1, background: "#0f172a",
        borderTop: "1px solid rgba(255,255,255,0.05)", padding: "36px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex",
          flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
          <div>
            <span style={{ fontSize: "1.1rem", fontWeight: 900, color: "white" }}>ELITE</span>
            <span style={{ fontSize: "1.1rem", fontWeight: 900,
              background: T.gradPrimary, WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent" }}>ATELIER</span>
            <p style={{ fontSize: "0.75rem", color: "#475569", marginTop: 4 }}>Clinical performance engineering.</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ color: "#334155", fontSize: "0.75rem" }}>© 2026 Elite Performance Atelier. All rights reserved.</p>
            <p style={{ color: "#1e293b", fontSize: 10, marginTop: 6, maxWidth: 480, lineHeight: 1.6 }}>
              RRS analysis is intended for clinical reference and rehabilitation guidance only.
              Always apply professional clinical judgement when interpreting scores.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}