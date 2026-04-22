import { useState, useEffect } from "react";
import {
  LayoutDashboard, Inbox, TrendingUp, MessageSquare, BookOpen,
  Calendar, Activity, ListTodo, BarChart3, Trophy, Crown,
  Plus, Sparkles, ArrowUpRight, CheckCircle2, Clock, AlertCircle,
  Flame, Target, ChevronRight, ChevronDown, X, Search, Zap,
  Send, Layers, Settings, ArrowUp, ArrowDown, Check, Circle,
  Loader2, Eye, ExternalLink, Lightbulb, Star, Edit3, Medal,
  Trash2, Users, RefreshCw,
} from "lucide-react";

/* ═══════════ STORAGE ═══════════ */
const ST = {
  async get(k, fb = null) { try { const r = await window.storage.get(k); return r ? JSON.parse(r.value) : fb; } catch { return fb; } },
  async set(k, v) { try { await window.storage.set(k, JSON.stringify(v)); } catch (e) { console.error(e); } },
};
const KEY = "eos_unified_v1";
const TODAY = new Date().toISOString().slice(0, 10);
const daysBtwn = (a, b) => Math.floor((new Date(b) - new Date(a)) / 864e5);

/* ═══════════ AI ═══════════ */
async function aiAnalyze(text, name, role, stage) {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: `You are an AI inside EnableOS. An enablement manager logged a 1:1 note.\n\nRep: ${name} (${role}, ${stage})\nNote: "${text}"\n\nRespond ONLY with JSON:\n{"sentiment":"concern" or "positive" or "neutral","suggestion":"Specific next step, max 20 words","tag":"2-3 word theme","sessionIdea":"Suggested session title or null"}` }] }),
    });
    const d = await res.json();
    return JSON.parse(d.content.map(i => i.text || "").join("").replace(/```json|```/g, "").trim());
  } catch { return aiFallback(text); }
}
function aiFallback(t) {
  const l = t.toLowerCase();
  const c = ["struggl","miss","fail","behind","concern","worried","issue","problem","stuck","weak","gap"].some(w => l.includes(w));
  const p = ["hit","exceed","strong","great","ready","confident","ahead","crushing","nailed","certified","improved"].some(w => l.includes(w));
  let suggestion = "Log and revisit next 1:1", tag = "general update", sessionIdea = null;
  if (l.includes("multi-thread")) { suggestion = "Multi-threading workshop + shadow AE"; tag = "multi-threading gap"; sessionIdea = "Enterprise Multi-Threading Workshop"; }
  else if (l.includes("pricing") || l.includes("objection")) { suggestion = "Pricing objection handlers workshop"; tag = "pricing confidence"; sessionIdea = "Pricing Objection Roleplay"; }
  else if (l.includes("discovery")) { suggestion = "Discovery framework refresh"; tag = "discovery skills"; sessionIdea = "Discovery Masterclass"; }
  else if (c) { suggestion = "Urgent follow-up within 48hrs"; tag = "needs attention"; }
  else if (p) { suggestion = "Recognition + peer-teaching opportunity"; tag = "strong performer"; }
  return { sentiment: c ? "concern" : p ? "positive" : "neutral", suggestion, tag, sessionIdea };
}

/* ═══════════ CONSTANTS ═══════════ */
const OB = [
  { id: "ob1", section: "Company & Culture", items: ["Company history & mission","Org chart & stakeholders","Product overview & value prop","ICP & buyer personas"], order: 1 },
  { id: "ob2", section: "Sales Process", items: ["Sales methodology","CRM walkthrough","Lead qualification","Handoff to AE"], order: 2 },
  { id: "ob3", section: "Product Deep Dive", items: ["Feature walkthroughs","Demo environment","FAQ & objection bank","Competitive landscape"], order: 3 },
  { id: "ob4", section: "Outbound Mastery", items: ["Prospecting tools","Email & call sequences","Social selling","Multi-threading"], order: 4 },
  { id: "ob5", section: "Live Certification", items: ["Mock discovery call","Mock cold call","Live call with shadow","Solo call sign-off"], order: 5 },
];
const BM = [
  { id: "b1", label: "First outbound activity", targetDays: 3 },
  { id: "b2", label: "First cold call", targetDays: 7 },
  { id: "b3", label: "First meeting booked", targetDays: 21 },
  { id: "b4", label: "First MQL generated", targetDays: 30 },
  { id: "b5", label: "First SQL converted", targetDays: 45 },
  { id: "b6", label: "Fully ramped", targetDays: 45 },
];
const INTAKE_BUCKETS = ["All","Collateral","Training Session","Everboarding","Onboarding","Process","Playbook","Other"];
const COLL_BUCKETS = ["All","Battle Card","Framework","One-Pager","Template","Guide","Sequence","Other"];

const repProg = (rep) => {
  const total = OB.reduce((a, s) => a + s.items.length, 0);
  const done = OB.reduce((a, s) => a + (rep.onboarding[s.id] || []).filter(Boolean).length, 0);
  return { done, total, pct: Math.round((done / total) * 100) };
};
const pScore = r => Math.min(100, Math.round(((r.impact * r.urgency * 2) / Math.max(r.effort, 1)) * 5));
const pBkt = s => s >= 70 ? { l: "P0", f: "Drop everything", c: "#dc2626", bg: "#fef2f2" } : s >= 45 ? { l: "P1", f: "This week", c: "#d97706", bg: "#fffbeb" } : s >= 25 ? { l: "P2", f: "This sprint", c: "#059669", bg: "#ecfdf5" } : { l: "P3", f: "Backlog", c: "#71717a", bg: "#f4f4f5" };

/* ═══════════ SEED DATA ═══════════ */
const SEED = {
  reps: [
    { id: "r1", name: "Priya Sharma", role: "SDR", region: "NAM", startDate: "2026-02-01", rampStage: "Week 8", onboarding: { ob1: [true,true,true,true], ob2: [true,true,true,false], ob3: [true,true,false,false], ob4: [true,false,false,false], ob5: [false,false,false,false] }, benchmarks: { b1: "2026-02-03", b2: "2026-02-07", b3: "2026-02-20", b4: null, b5: null, b6: null } },
    { id: "r2", name: "Marcus Chen", role: "SDR", region: "EMEA", startDate: "2026-03-15", rampStage: "Week 5", onboarding: { ob1: [true,true,true,true], ob2: [true,true,false,false], ob3: [false,false,false,false], ob4: [false,false,false,false], ob5: [false,false,false,false] }, benchmarks: { b1: "2026-03-17", b2: "2026-03-21", b3: null, b4: null, b5: null, b6: null } },
    { id: "r3", name: "Devika Rao", role: "AE", region: "NAM", startDate: "2025-11-10", rampStage: "Ramped", onboarding: { ob1: [true,true,true,true], ob2: [true,true,true,true], ob3: [true,true,true,true], ob4: [true,true,true,true], ob5: [true,true,true,true] }, benchmarks: { b1: "2025-11-12", b2: "2025-11-15", b3: "2025-11-28", b4: "2025-12-05", b5: "2025-12-18", b6: "2025-12-22" } },
    { id: "r4", name: "James O'Brien", role: "SDR", region: "NAM", startDate: "2026-01-08", rampStage: "Week 10", onboarding: { ob1: [true,true,true,true], ob2: [true,true,true,true], ob3: [true,true,true,true], ob4: [true,true,true,false], ob5: [true,true,false,false] }, benchmarks: { b1: "2026-01-10", b2: "2026-01-14", b3: "2026-01-25", b4: "2026-02-03", b5: "2026-02-20", b6: null } },
    { id: "r5", name: "Aisha Patel", role: "SDR", region: "APAC", startDate: "2026-04-10", rampStage: "Week 1", onboarding: { ob1: [true,true,false,false], ob2: [false,false,false,false], ob3: [false,false,false,false], ob4: [false,false,false,false], ob5: [false,false,false,false] }, benchmarks: { b1: "2026-04-12", b2: null, b3: null, b4: null, b5: null, b6: null } },
  ],
  requests: [
    { id: "q1", title: "Competitive battle card — top 3", from: "VP Sales", bucket: "Collateral", impact: 5, urgency: 5, effort: 3, status: "open", created: "2026-04-14" },
    { id: "q2", title: "Pricing objection workshop", from: "AE Lead", bucket: "Training Session", impact: 4, urgency: 3, effort: 4, status: "open", created: "2026-04-12" },
    { id: "q3", title: "Discovery framework v2", from: "SDR Manager", bucket: "Playbook", impact: 3, urgency: 2, effort: 2, status: "in-progress", created: "2026-04-10" },
    { id: "q4", title: "Product quiz monthly refresh", from: "Rev Ops", bucket: "Everboarding", impact: 3, urgency: 2, effort: 2, status: "open", created: "2026-04-15" },
    { id: "q5", title: "ROI calculator one-pager", from: "PMM", bucket: "Collateral", impact: 4, urgency: 4, effort: 3, status: "open", created: "2026-04-16" },
    { id: "q6", title: "Week 1 onboarding revamp", from: "Head of Sales", bucket: "Onboarding", impact: 5, urgency: 3, effort: 5, status: "open", created: "2026-04-17" },
  ],
  notes: [
    { id: "n1", repId: "r1", date: "2026-04-14", content: "Priya struggling with multi-threading on enterprise deals. Confident on discovery but loses momentum.", agenda: "Review pipeline\nMulti-threading approach\nShadowing schedule", sentiment: "concern", suggestion: "Multi-threading workshop + shadow Devika", tag: "multi-threading gap", sessionIdea: "Multi-Threading Workshop" },
    { id: "n2", repId: "r2", date: "2026-04-13", content: "Marcus cleared call cert on first try. Strong product knowledge, slight pricing hesitation.", agenda: "Cert review\nPricing check\nLive call readiness", sentiment: "positive", suggestion: "Pair with senior SDR for first 5 live calls", tag: "pricing confidence", sessionIdea: "Pricing Roleplay Session" },
    { id: "n3", repId: "r4", date: "2026-04-10", content: "James hit 120% Week 10 targets. Wants AE track. Agreed on 3-month eval.", agenda: "Activity review\nAE track\nGoal setting", sentiment: "positive", suggestion: "AE readiness track + stretch assignment", tag: "promotion path", sessionIdea: null },
  ],
  collaterals: [
    { id: "c1", title: "Outbound Discovery Framework", bucket: "Framework", uses: 47, lastUpdated: "2026-03-22", stories: ["Priya booked 3 meetings in first week using this"] },
    { id: "c2", title: "Closed-Lost Recovery Sequences", bucket: "Sequence", uses: 31, lastUpdated: "2026-02-15", stories: ["Recovered 2 deals worth $120K"] },
    { id: "c3", title: "Top 3 Competitive Battle Cards", bucket: "Battle Card", uses: 19, lastUpdated: "2026-04-01", stories: [] },
    { id: "c4", title: "Pricing Objection Handlers", bucket: "Guide", uses: 54, lastUpdated: "2026-03-10", stories: ["Most-used collateral across team"] },
    { id: "c5", title: "Multi-Threading Playbook", bucket: "Guide", uses: 8, lastUpdated: "2026-04-08", stories: [] },
    { id: "c6", title: "Discovery Call Scorecard", bucket: "Template", uses: 33, lastUpdated: "2026-03-18", stories: ["Used in weekly Gong reviews"] },
  ],
  sessions: [
    { id: "s1", title: "Pricing Objection Workshop", date: "2026-04-22", type: "Workshop", attendees: 8, status: "upcoming", notes: "" },
    { id: "s2", title: "Weekly Gong Call Review", date: "2026-04-25", type: "Review", attendees: 6, status: "upcoming", notes: "" },
    { id: "s3", title: "Week 5 Call Certification", date: "2026-04-18", type: "Certification", attendees: 3, status: "completed", notes: "All passed. Marcus strong on product." },
  ],
  pulseChecks: [
    { id: "pc1", date: "2026-04-14", title: "Week 16 Pulse", questions: ["Discovery confidence?","Qualification clarity?","Enablement support?"], responses: [{ repId: "r1", answers: [3,4,5] },{ repId: "r2", answers: [4,3,4] },{ repId: "r3", answers: [5,5,5] },{ repId: "r4", answers: [4,4,4] },{ repId: "r5", answers: [2,2,3] }] },
  ],
  todos: [
    { id: "t1", text: "Build competitive battle cards", col: "must", done: false },
    { id: "t2", text: "Review Gong calls from this week", col: "must", done: false },
    { id: "t3", text: "Prep pricing workshop slides", col: "must", done: true },
    { id: "t4", text: "Update discovery framework v2", col: "should", done: false },
    { id: "t5", text: "Shadow Priya on enterprise call", col: "should", done: false },
    { id: "t6", text: "Write onboarding quiz for month 2", col: "could", done: false },
  ],
  forecast: [
    { id: "f1", title: "Competitive Battle Cards", status: "in-progress", impact: "high", eta: "2026-04-25", notes: "VP Sales P0 request" },
    { id: "f2", title: "Pricing Workshop", status: "scheduled", impact: "high", eta: "2026-04-22", notes: "8 confirmed" },
    { id: "f3", title: "Discovery Framework v2", status: "in-progress", impact: "medium", eta: "2026-05-01", notes: "Based on Gong data" },
    { id: "f4", title: "Multi-Threading Guide", status: "planned", impact: "high", eta: "2026-05-10", notes: "Flagged in 1:1s" },
    { id: "f5", title: "Onboarding Revamp Week 1", status: "planned", impact: "critical", eta: "2026-05-15", notes: "Head of Sales priority" },
  ],
  leaderboards: [
    { id: "lb1", title: "Weekly Meetings — Wk 16", type: "weekly", metric: "Meetings", period: "Apr 14-18", active: true, entries: [{ repId: "r4", value: 14 },{ repId: "r3", value: 12 },{ repId: "r1", value: 9 },{ repId: "r2", value: 7 },{ repId: "r5", value: 3 }] },
    { id: "lb2", title: "Q2 Pipeline", type: "quarterly", metric: "Pipeline ($K)", period: "Q2 2026", active: true, entries: [{ repId: "r3", value: 480 },{ repId: "r4", value: 320 },{ repId: "r1", value: 210 },{ repId: "r2", value: 150 },{ repId: "r5", value: 60 }] },
  ],
  pulse: { mqlToSql: [12,14,13,16,18,17,19], rampAvg: [90,88,75,68,62,55,45], noShows: [22,20,18,15,14,12,11] },
};

/* ═══════════ APP ═══════════ */
export default function App() {
  const [view, setView] = useState("dashboard");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { (async () => { const d = await ST.get(KEY); if (d?.reps) setData(d); else { setData(SEED); await ST.set(KEY, SEED); } setLoading(false); })(); }, []);
  const save = async (n) => { setData(n); await ST.set(KEY, n); };

  if (loading || !data) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#09090b", fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}><Layers size={20} color="white" /></div>
      <div style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 28, color: "#fafafa" }}>Enable<b>OS</b></div>
      <div style={{ fontSize: 12, color: "#71717a", marginTop: 6 }}>loading platform...</div>
    </div>
  );

  const V = { dashboard: DashView, requests: IntakeView, ramp: RampView, notes: NotesView, collaterals: CollView, sessions: SessionsView, pulse: PulseView, planning: PlanView, forecast: ForecastView, leaderboards: LBView, settings: SettView };
  const Comp = V[view] || DashView;

  return (
    <div style={{ background: "#fafafa", minHeight: "100vh", fontFamily: "'DM Sans',system-ui,sans-serif", display: "flex" }}>
      <style>{CSS}</style>
      <aside style={{ width: 220, background: "#09090b", color: "#fafafa", padding: "20px 8px", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 10px 18px" }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}><Layers size={13} color="white" /></div>
          <div><div className="dp" style={{ fontSize: 18, lineHeight: 1 }}>Enable<b>OS</b></div><div className="mn" style={{ fontSize: 7, color: "#52525b", letterSpacing: "0.14em", marginTop: 1 }}>enableos.app</div></div>
        </div>
        <div style={{ height: 1, background: "#1e1e1e", margin: "0 10px 4px" }} />
        <nav style={{ flex: 1 }}>
          <div className="mn" style={{ fontSize: 7, color: "#3f3f46", letterSpacing: "0.14em", padding: "8px 10px 4px" }}>CORE</div>
          {[
            { id: "dashboard", l: "Dashboard", i: LayoutDashboard },
            { id: "requests", l: "Intake", i: Inbox, b: data.requests.filter(r => r.status === "open").length },
            { id: "ramp", l: "Ramp & Onboarding", i: TrendingUp },
            { id: "notes", l: "1:1 Notes", i: MessageSquare, b: data.notes.filter(n => n.sentiment === "concern").length },
            { id: "collaterals", l: "Collaterals", i: BookOpen },
            { id: "sessions", l: "Sessions", i: Calendar },
          ].map(n => <NavBtn key={n.id} {...n} active={view === n.id} onClick={() => setView(n.id)} />)}
          <div className="mn" style={{ fontSize: 7, color: "#3f3f46", letterSpacing: "0.14em", padding: "12px 10px 4px" }}>OPERATIONS</div>
          {[
            { id: "pulse", l: "Pulse Checks", i: Activity },
            { id: "planning", l: "Weekly Planning", i: ListTodo, b: data.todos.filter(t => t.col === "must" && !t.done).length },
            { id: "forecast", l: "Forecasting", i: BarChart3 },
            { id: "leaderboards", l: "Leaderboards", i: Trophy },
          ].map(n => <NavBtn key={n.id} {...n} active={view === n.id} onClick={() => setView(n.id)} />)}
        </nav>
        <div style={{ height: 1, background: "#1e1e1e", margin: "4px 10px" }} />
        <NavBtn id="settings" l="Settings" i={Settings} active={view === "settings"} onClick={() => setView("settings")} />
      </aside>
      <main style={{ flex: 1, padding: "24px 32px", minWidth: 0, maxHeight: "100vh", overflowY: "auto" }}>
        <div className="fi" key={view}><Comp data={data} save={save} setView={setView} /></div>
      </main>
    </div>
  );
}

function NavBtn({ l, i: Icon, b, active, onClick }) {
  return (
    <button onClick={onClick} className={`ni ${active ? "act" : ""}`}>
      <Icon size={13} /><span style={{ flex: 1 }}>{l}</span>
      {b > 0 && <span className="mn" style={{ fontSize: 8, fontWeight: 700, background: "#dc2626", color: "white", padding: "1px 5px", borderRadius: 100 }}>{b}</span>}
    </button>
  );
}

/* ═══════════ SHARED COMPONENTS ═══════════ */
function Hdr({ e, t, s, a }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
      <div>
        <div className="mn" style={{ fontSize: 8, color: "#a1a1aa", letterSpacing: "0.16em", marginBottom: 5 }}>{e.toUpperCase()}</div>
        <h1 className="dp" style={{ fontSize: 26, fontWeight: 400, lineHeight: 1.1, color: "#09090b", maxWidth: 460, margin: 0 }}>{t}</h1>
        {s && <p style={{ fontSize: 11, color: "#71717a", marginTop: 5, maxWidth: 460, lineHeight: 1.5 }}>{s}</p>}
      </div>
      {a}
    </div>
  );
}

function Chip({ children, bg = "#f4f4f5", c = "#09090b" }) {
  return <span className="ch" style={{ background: bg, color: c }}>{children}</span>;
}

/* ═══════════ DASHBOARD ═══════════ */
function DashView({ data, setView }) {
  const open = data.requests.filter(r => r.status === "open");
  const top3 = open.map(r => ({ ...r, score: pScore(r) })).sort((a, b) => b.score - a.score).slice(0, 4);
  const ramping = data.reps.filter(r => repProg(r).pct < 100);
  const atRisk = data.reps.filter(r => { const d = daysBtwn(r.startDate, TODAY); return BM.some(b => b.targetDays <= d && !r.benchmarks[b.id]); });
  const avgPct = Math.round(data.reps.reduce((a, r) => a + repProg(r).pct, 0) / data.reps.length);
  const bktCts = {}; open.forEach(r => { bktCts[r.bucket] = (bktCts[r.bucket] || 0) + 1; });
  const hr = new Date().getHours();
  const g = hr < 12 ? "morning" : hr < 18 ? "afternoon" : "evening";
  const mustTodos = data.todos.filter(t => t.col === "must" && !t.done).length;

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div className="mn" style={{ fontSize: 8, color: "#a1a1aa", letterSpacing: "0.16em", marginBottom: 6 }}>
          <span className="ld" style={{ color: "#6366f1", fontSize: 10 }}>●</span> {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </div>
        <h1 className="dp" style={{ fontSize: 40, fontWeight: 400, lineHeight: 1.05, color: "#09090b", margin: 0 }}>good {g}<span style={{ color: "#8b5cf6" }}>.</span></h1>
        <p style={{ fontSize: 13, color: "#71717a", marginTop: 6, maxWidth: 460 }}>Your enablement operating system. Everything in one place.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginBottom: 18 }}>
        {[
          { l: "OPEN REQUESTS", v: open.length, s: `${top3.filter(r => r.score >= 70).length} P0`, c: "#dc2626", i: Flame, go: "requests" },
          { l: "RAMPING", v: ramping.length, s: `of ${data.reps.length}`, c: "#d97706", i: TrendingUp, go: "ramp" },
          { l: "BEHIND", v: atRisk.length, s: "benchmark", c: atRisk.length ? "#dc2626" : "#059669", i: AlertCircle, go: "ramp" },
          { l: "MUST-DO", v: mustTodos, s: "this week", c: "#6366f1", i: ListTodo, go: "planning" },
          { l: "AVG RAMP", v: avgPct + "%", s: "complete", c: "#059669", i: Target, go: "ramp" },
        ].map((s, i) => (
          <div key={i} className="cd ch-h" style={{ padding: 14, cursor: "pointer", position: "relative", overflow: "hidden" }} onClick={() => setView(s.go)}>
            <div style={{ position: "absolute", top: 8, right: 8, opacity: 0.06, color: s.c }}><s.i size={36} strokeWidth={1.5} /></div>
            <div className="mn" style={{ fontSize: 7, color: "#a1a1aa", letterSpacing: "0.14em", marginBottom: 6 }}>{s.l}</div>
            <div className="dp" style={{ fontSize: 30, fontWeight: 700, lineHeight: 1, color: "#09090b" }}>{s.v}</div>
            <div style={{ fontSize: 9, color: "#a1a1aa", marginTop: 4 }}>{s.s}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 10, marginBottom: 16 }}>
        <div className="cd" style={{ padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
            <div><div className="mn" style={{ fontSize: 7, color: "#a1a1aa", letterSpacing: "0.16em" }}>PRIORITY QUEUE</div><div className="dp" style={{ fontSize: 16, fontWeight: 600 }}>Top requests</div></div>
            <button onClick={() => setView("requests")} className="lk">All <ChevronRight size={10} /></button>
          </div>
          {top3.map((r, i) => { const b = pBkt(r.score); return (
            <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #f4f4f5" }}>
              <div className="dp" style={{ fontSize: 20, fontWeight: 800, color: "#e4e4e7", width: 24, textAlign: "center", fontStyle: "italic" }}>{i + 1}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#09090b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.title}</div>
                <div style={{ fontSize: 9, color: "#a1a1aa" }}>{r.from} · {r.bucket}</div>
              </div>
              <Chip bg={b.bg} c={b.c}>{b.l}</Chip>
            </div>); })}
        </div>

        <div className="cd" style={{ padding: 18 }}>
          <div className="mn" style={{ fontSize: 7, color: "#a1a1aa", letterSpacing: "0.16em" }}>RAMP SNAPSHOT</div>
          <div className="dp" style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>Team status</div>
          {data.reps.map(r => { const p = repProg(r); const d = daysBtwn(r.startDate, TODAY); const missed = BM.filter(b => b.targetDays <= d && !r.benchmarks[b.id]); const col = p.pct >= 100 ? "#059669" : missed.length ? "#dc2626" : "#d97706"; return (
            <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid #f4f4f5" }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: col + "14", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {p.pct >= 100 ? <CheckCircle2 size={11} color={col} /> : missed.length ? <AlertCircle size={11} color={col} /> : <Clock size={11} color={col} />}
              </div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 11, fontWeight: 600 }}>{r.name}</div><div style={{ fontSize: 8, color: "#a1a1aa" }}>{r.role} · Day {d}</div></div>
              <div className="mn" style={{ fontSize: 11, fontWeight: 700, color: col }}>{p.pct}%</div>
            </div>); })}
          <button onClick={() => setView("ramp")} className="lk" style={{ marginTop: 8 }}>Full tracker <ChevronRight size={10} /></button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 16 }}>
        {[{ l: "MQL→SQL", v: data.pulse.mqlToSql, sfx: "%", good: "up" },{ l: "Ramp days", v: data.pulse.rampAvg, sfx: "d", good: "down" },{ l: "No-shows", v: data.pulse.noShows, sfx: "%", good: "down" }].map((p, i) => {
          const curr = p.v[p.v.length-1], prev = p.v[p.v.length-2], delta = curr - prev, ig = (p.good === "up" && delta >= 0) || (p.good === "down" && delta <= 0), mx = Math.max(...p.v);
          return (
            <div key={i} className="cd" style={{ padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: "#71717a" }}>{p.l}</span>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                  <span className="mn" style={{ fontSize: 15, fontWeight: 700, color: "#09090b" }}>{curr}{p.sfx}</span>
                  <span className="mn" style={{ fontSize: 9, fontWeight: 600, color: ig ? "#059669" : "#dc2626", display: "flex", alignItems: "center" }}>{ig ? <ArrowUp size={8} /> : <ArrowDown size={8} />}{Math.abs(delta)}</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 20 }}>
                {p.v.map((v, j) => <div key={j} className="sb" style={{ flex: 1, height: `${Math.max(8, (v / mx) * 100)}%`, opacity: 0.2 + (j / p.v.length) * 0.8 }} />)}
              </div>
            </div>
          );
        })}
      </div>

      {atRisk.length > 0 && (
        <div style={{ background: "#09090b", color: "#fafafa", padding: "18px 22px", borderRadius: 12, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Sparkles size={14} color="white" /></div>
          <div style={{ flex: 1 }}>
            <div className="mn" style={{ fontSize: 7, color: "#71717a", letterSpacing: "0.12em", marginBottom: 2 }}>PATTERN</div>
            <div style={{ fontSize: 12, lineHeight: 1.4 }}><strong style={{ color: "#a78bfa" }}>{atRisk.map(r => r.name.split(" ")[0]).join(", ")}</strong> behind on benchmarks. Check ramp tracker.</div>
          </div>
          <button onClick={() => setView("ramp")} className="bp" style={{ background: "#8b5cf6", flexShrink: 0 }}>View <ArrowUpRight size={11} /></button>
        </div>
      )}
    </div>
  );
}

/* ═══════════ INTAKE ═══════════ */
function IntakeView({ data, save }) {
  const [show, setShow] = useState(false);
  const [bkt, setBkt] = useState("All");
  const [sf, setSf] = useState("all");
  const scored = data.requests.map(r => ({ ...r, score: pScore(r), pb: pBkt(pScore(r)) })).sort((a, b) => b.score - a.score);
  const filtered = scored.filter(r => bkt === "All" || r.bucket === bkt).filter(r => sf === "all" || r.status === sf);
  const bktCts = {}; scored.forEach(r => { bktCts[r.bucket] = (bktCts[r.bucket] || 0) + 1; });
  const upd = (id, st) => save({ ...data, requests: data.requests.map(r => r.id === id ? { ...r, status: st } : r) });
  const add = req => { save({ ...data, requests: [{ id: `q${Date.now()}`, ...req, status: "open", created: TODAY }, ...data.requests] }); setShow(false); };

  return (
    <div>
      <Hdr e="intake" t="The queue" s="Auto-scored by impact × urgency ÷ effort. Bucketed by type." a={<button onClick={() => setShow(!show)} className="bp"><Plus size={11} /> New</button>} />
      <div style={{ display: "flex", gap: 4, marginBottom: 8, flexWrap: "wrap" }}>
        {INTAKE_BUCKETS.map(b => { const ct = b === "All" ? scored.length : (bktCts[b] || 0); if (b !== "All" && !ct) return null; return (
          <button key={b} onClick={() => setBkt(b)} style={{ padding: "5px 10px", background: bkt === b ? "#09090b" : "white", color: bkt === b ? "#fafafa" : "#71717a", border: `1.5px solid ${bkt === b ? "#09090b" : "#e4e4e7"}`, borderRadius: 100, fontSize: 9, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{b} <span className="mn" style={{ fontSize: 8, opacity: .7 }}>{ct}</span></button>); })}
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
        {["all","open","in-progress","done"].map(f => <button key={f} onClick={() => setSf(f)} style={{ padding: "3px 8px", background: sf === f ? "#f4f4f5" : "transparent", color: sf === f ? "#09090b" : "#a1a1aa", border: "none", borderRadius: 5, fontSize: 9, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize" }}>{f} ({scored.filter(r => f === "all" || r.status === f).filter(r => bkt === "All" || r.bucket === bkt).length})</button>)}
      </div>
      {show && <div className="cd fi" style={{ padding: 18, marginBottom: 10, background: "#09090b", color: "#fafafa", border: "none", borderRadius: 12 }}>
        <IntakeForm onSubmit={add} onClose={() => setShow(false)} />
      </div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {filtered.map(r => (
          <div key={r.id} className="cd ch-h" style={{ padding: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 3, height: 32, background: r.pb.c, borderRadius: 2, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", gap: 5, marginBottom: 2 }}><Chip bg={r.pb.bg} c={r.pb.c}>{r.pb.l} · {r.pb.f}</Chip><Chip>{r.bucket}</Chip></div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#09090b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.title}</div>
                <div style={{ fontSize: 9, color: "#a1a1aa" }}>{r.from} · {r.created}</div>
              </div>
              <div className="mn" style={{ fontSize: 7, color: "#a1a1aa", textAlign: "right", lineHeight: 1.5 }}>I:{r.impact} U:{r.urgency}<br />E:{r.effort}→<b style={{ color: "#09090b" }}>{r.score}</b></div>
              <select value={r.status} onChange={e => upd(r.id, e.target.value)} className="sel">{["open","in-progress","done"].map(o => <option key={o} value={o}>{o}</option>)}</select>
            </div>
          </div>))}
        {!filtered.length && <div className="cd" style={{ padding: 36, textAlign: "center", color: "#a1a1aa", fontSize: 11 }}>Nothing here.</div>}
      </div>
    </div>
  );
}

function IntakeForm({ onSubmit, onClose }) {
  const [f, sF] = useState({ title: "", from: "", bucket: "Collateral", impact: 3, urgency: 3, effort: 3 });
  const sc = pScore(f); const b = pBkt(sc);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}><div className="dp" style={{ fontSize: 16, fontWeight: 700 }}>New request</div><button onClick={onClose} style={{ background: "none", border: "none", color: "#fafafa", cursor: "pointer" }}><X size={14} /></button></div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 8, marginBottom: 8 }}>
        <div><label className="mn lbl">What?</label><input value={f.title} onChange={e => sF({ ...f, title: e.target.value })} className="inp" style={{ background: "#18181b", color: "#fafafa", border: "1.5px solid #27272a" }} placeholder="Be specific" /></div>
        <div><label className="mn lbl">Who?</label><input value={f.from} onChange={e => sF({ ...f, from: e.target.value })} className="inp" style={{ background: "#18181b", color: "#fafafa", border: "1.5px solid #27272a" }} placeholder="Role" /></div>
      </div>
      <div style={{ marginBottom: 8 }}><label className="mn lbl">Bucket</label><div style={{ display: "flex", gap: 3, marginTop: 4, flexWrap: "wrap" }}>{INTAKE_BUCKETS.filter(x => x !== "All").map(t => <button key={t} onClick={() => sF({ ...f, bucket: t })} style={{ padding: "3px 8px", background: f.bucket === t ? "#8b5cf6" : "transparent", color: f.bucket === t ? "white" : "#fafafa", border: `1px solid ${f.bucket === t ? "#8b5cf6" : "#27272a"}`, borderRadius: 100, fontSize: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>{t}</button>)}</div></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
        {["Impact","Urgency","Effort"].map((l, i) => { const key = l.toLowerCase(); return (
          <div key={l}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span className="mn lbl">{l}</span><span className="mn" style={{ fontSize: 11, fontWeight: 700, color: "#8b5cf6" }}>{f[key]}</span></div><div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map(n => <button key={n} onClick={() => sF({ ...f, [key]: n })} style={{ flex: 1, height: 22, background: n <= f[key] ? "#8b5cf6" : "#18181b", border: "none", borderRadius: 3, cursor: "pointer" }} />)}</div></div>); })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#18181b", borderRadius: 8, marginBottom: 10 }}>
        <div><div className="mn" style={{ fontSize: 7, color: "#71717a" }}>AUTO-PRIORITY</div><div className="dp" style={{ fontSize: 13, fontWeight: 700, color: b.c === "#71717a" ? "#fafafa" : b.c, marginTop: 2 }}>{b.l} — {b.f} ({sc})</div></div><Zap size={14} color="#8b5cf6" />
      </div>
      <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}><button onClick={onClose} className="bs" style={{ color: "#fafafa", borderColor: "#27272a" }}>Cancel</button><button onClick={() => f.title && f.from && onSubmit(f)} className="bp" style={{ background: "#8b5cf6" }} disabled={!f.title || !f.from}><Send size={10} /> Submit</button></div>
    </div>
  );
}

/* ═══════════ RAMP ═══════════ */
function RampView({ data, save }) {
  const [sel, setSel] = useState(data.reps[0]?.id);
  const rep = data.reps.find(r => r.id === sel);
  const p = rep ? repProg(rep) : { done: 0, total: 0, pct: 0 };
  const dIn = rep ? daysBtwn(rep.startDate, TODAY) : 0;
  const togOb = (sid, idx) => { const reps = data.reps.map(r => { if (r.id !== sel) return r; const ob = { ...r.onboarding }; const it = [...(ob[sid] || [])]; it[idx] = !it[idx]; ob[sid] = it; return { ...r, onboarding: ob }; }); save({ ...data, reps }); };
  const togBm = bid => { const reps = data.reps.map(r => { if (r.id !== sel) return r; const bm = { ...r.benchmarks }; bm[bid] = bm[bid] ? null : TODAY; return { ...r, benchmarks: bm }; }); save({ ...data, reps }); };

  return (
    <div>
      <Hdr e="ramp & onboarding" t="The journey" s="Section-by-section onboarding with benchmarks." />
      <div style={{ display: "flex", gap: 5, marginBottom: 16, flexWrap: "wrap" }}>
        {data.reps.map(r => { const rp = repProg(r); const d = daysBtwn(r.startDate, TODAY); const missed = BM.filter(b => b.targetDays <= d && !r.benchmarks[b.id]).length; const col = rp.pct >= 100 ? "#059669" : missed ? "#dc2626" : "#d97706"; return (
          <button key={r.id} onClick={() => setSel(r.id)} style={{ padding: "8px 12px", background: sel === r.id ? "#09090b" : "white", color: sel === r.id ? "#fafafa" : "#09090b", border: `1.5px solid ${sel === r.id ? "#09090b" : "#e4e4e7"}`, borderRadius: 8, cursor: "pointer", fontFamily: "inherit", textAlign: "left", minWidth: 130, flex: "1 1 130px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}><span style={{ fontSize: 11, fontWeight: 600 }}>{r.name}</span><span className="mn" style={{ fontSize: 9, fontWeight: 700, color: col }}>{rp.pct}%</span></div>
            <div style={{ fontSize: 8, opacity: .6 }}>{r.role} · Day {d}</div>
            <div style={{ height: 3, background: sel === r.id ? "#27272a" : "#f4f4f5", borderRadius: 100, marginTop: 5, overflow: "hidden" }}><div style={{ width: `${rp.pct}%`, height: "100%", background: col, borderRadius: 100 }} /></div>
          </button>); })}
      </div>
      {rep && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <div className="mn" style={{ fontSize: 7, color: "#a1a1aa", letterSpacing: "0.16em", marginBottom: 8 }}>ONBOARDING — {p.done}/{p.total}</div>
          {OB.map(sec => { const it = rep.onboarding[sec.id] || []; const dn = it.filter(Boolean).length; const all = dn === sec.items.length; return (
            <div key={sec.id} className="cd" style={{ padding: 12, marginBottom: 5 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>{all ? <CheckCircle2 size={12} color="#059669" /> : <Circle size={12} color="#d4d4d8" />}<span style={{ fontSize: 11, fontWeight: 600 }}>§{sec.order} · {sec.section}</span></div>
                <span className="mn" style={{ fontSize: 9, fontWeight: 600, color: all ? "#059669" : "#a1a1aa" }}>{dn}/{sec.items.length}</span>
              </div>
              {sec.items.map((item, idx) => (
                <button key={idx} onClick={() => togOb(sec.id, idx)} style={{ display: "flex", alignItems: "center", gap: 6, width: "100%", padding: "4px 0", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                  <div style={{ width: 14, height: 14, borderRadius: 3, border: `1.5px solid ${it[idx] ? "#059669" : "#d4d4d8"}`, background: it[idx] ? "#059669" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{it[idx] && <Check size={8} color="white" strokeWidth={3} />}</div>
                  <span style={{ fontSize: 10, color: it[idx] ? "#a1a1aa" : "#09090b", textDecoration: it[idx] ? "line-through" : "none" }}>{item}</span>
                </button>))}
            </div>); })}
        </div>
        <div>
          <div className="mn" style={{ fontSize: 7, color: "#a1a1aa", letterSpacing: "0.16em", marginBottom: 8 }}>BENCHMARKS</div>
          {BM.map(bm => { const ach = rep.benchmarks[bm.id]; const actD = ach ? daysBtwn(rep.startDate, ach) : null; const delta = actD !== null ? actD - bm.targetDays : null; const overdue = !ach && dIn > bm.targetDays; const overdueBy = overdue ? dIn - bm.targetDays : 0; let sC = "#a1a1aa", sBg = "#f4f4f5", sT = `Target: Day ${bm.targetDays}`; if (ach && delta !== null) { if (delta <= 0) { sC = "#059669"; sBg = "#ecfdf5"; sT = `Day ${actD} — ${Math.abs(delta)}d early`; } else { sC = "#d97706"; sBg = "#fffbeb"; sT = `Day ${actD} — ${delta}d late`; } } else if (overdue) { sC = "#dc2626"; sBg = "#fef2f2"; sT = `${overdueBy}d overdue`; } else if (dIn < bm.targetDays) { sT = `Day ${bm.targetDays} · ${bm.targetDays - dIn}d away`; } return (
            <div key={bm.id} className="cd ch-h" style={{ padding: 12, marginBottom: 5, display: "flex", alignItems: "center", gap: 10 }}>
              <button onClick={() => togBm(bm.id)} style={{ width: 22, height: 22, borderRadius: 5, border: `2px solid ${ach ? "#059669" : overdue ? "#dc2626" : "#d4d4d8"}`, background: ach ? "#059669" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>{ach && <Check size={11} color="white" strokeWidth={3} />}</button>
              <div style={{ flex: 1 }}><div style={{ fontSize: 11, fontWeight: 600, color: ach ? "#a1a1aa" : "#09090b", textDecoration: ach ? "line-through" : "none" }}>{bm.label}</div><div className="mn" style={{ fontSize: 8, marginTop: 2 }}><span style={{ padding: "1px 6px", background: sBg, color: sC, borderRadius: 100, fontWeight: 600 }}>{sT}</span></div></div>
              {ach && delta !== null && <div style={{ color: delta <= 0 ? "#059669" : "#d97706" }}>{delta <= 0 ? <ArrowUp size={11} /> : <ArrowDown size={11} />}</div>}
            </div>); })}
          <div className="cd" style={{ padding: 12, marginTop: 8, background: "#09090b", color: "#fafafa", border: "none" }}>
            <div className="mn" style={{ fontSize: 7, color: "#71717a", letterSpacing: "0.12em", marginBottom: 3 }}>SUMMARY</div>
            <div style={{ fontSize: 11, lineHeight: 1.5 }}><b>{rep.name}</b> Day {dIn} · <b style={{ color: p.pct >= 100 ? "#059669" : "#a78bfa" }}>{p.done}/{p.total}</b> done.
              {(() => { const m = BM.filter(b => b.targetDays <= dIn && !rep.benchmarks[b.id]); return m.length ? <span style={{ color: "#dc2626" }}> Behind: {m.map(b => b.label).join(", ")}.</span> : <span style={{ color: "#059669" }}> On track.</span>; })()}
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}

/* ═══════════ 1:1 NOTES ═══════════ */
function NotesView({ data, save }) {
  const [sel, setSel] = useState(data.reps[0]?.id);
  const [note, setNote] = useState("");
  const [agenda, setAgenda] = useState("");
  const [busy, setBusy] = useState(false);
  const rep = data.reps.find(r => r.id === sel);
  const repNotes = data.notes.filter(n => n.repId === sel).sort((a, b) => b.date.localeCompare(a.date));

  const addNote = async () => {
    if (!note.trim() || busy) return; setBusy(true);
    const a = await aiAnalyze(note, rep.name, rep.role, rep.rampStage);
    await save({ ...data, notes: [{ id: `n${Date.now()}`, repId: sel, date: TODAY, content: note, agenda, ...a }, ...data.notes] });
    setNote(""); setAgenda(""); setBusy(false);
  };

  const sentStyle = { concern: { bg: "#fef2f2", c: "#dc2626", i: AlertCircle }, positive: { bg: "#ecfdf5", c: "#059669", i: CheckCircle2 }, neutral: { bg: "#f4f4f5", c: "#71717a", i: Circle } };

  return (
    <div>
      <Hdr e="1:1 notes" t="The real signal" s="AI analyzes sentiment and suggests actions." />
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 14 }}>
        <div>
          <div className="mn" style={{ fontSize: 7, color: "#a1a1aa", letterSpacing: "0.16em", marginBottom: 6 }}>TEAM</div>
          {data.reps.map(r => { const ct = data.notes.filter(n => n.repId === r.id).length; const hc = data.notes.some(n => n.repId === r.id && n.sentiment === "concern"); return (
            <button key={r.id} onClick={() => setSel(r.id)} style={{ width: "100%", padding: 10, background: sel === r.id ? "#09090b" : "white", color: sel === r.id ? "#fafafa" : "#09090b", border: `1.5px solid ${sel === r.id ? "#09090b" : "#e4e4e7"}`, borderRadius: 8, marginBottom: 4, cursor: "pointer", textAlign: "left", fontFamily: "inherit", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div><div style={{ fontSize: 11, fontWeight: 600 }}>{r.name}</div><div style={{ fontSize: 9, opacity: .6 }}>{r.role}</div></div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>{hc && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#dc2626" }} />}<span className="mn" style={{ fontSize: 9, opacity: .5 }}>{ct}</span></div>
            </button>); })}
        </div>
        <div>
          <div className="cd" style={{ padding: 16, marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div className="dp" style={{ fontSize: 16, fontWeight: 700 }}>{rep?.name}</div>
              <Chip>{rep?.rampStage}</Chip>
            </div>
            <div style={{ marginBottom: 8 }}>
              <label className="mn lbl">AGENDA (shared with rep)</label>
              <textarea value={agenda} onChange={e => setAgenda(e.target.value)} placeholder={"Review pipeline\nBlockers\nGoals"} style={{ width: "100%", minHeight: 60, padding: 10, border: "1.5px solid #e4e4e7", borderRadius: 7, fontSize: 11, resize: "vertical", background: "#fafafa", fontFamily: "inherit", marginTop: 3, lineHeight: 1.5 }} />
            </div>
            <div>
              <label className="mn lbl">YOUR NOTES (private)</label>
              <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="What came up? Be specific for better AI suggestions." style={{ width: "100%", minHeight: 70, padding: 10, border: "1.5px solid #e4e4e7", borderRadius: 7, fontSize: 11, resize: "vertical", background: "#fafafa", fontFamily: "inherit", marginTop: 3, lineHeight: 1.5 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
              <div style={{ fontSize: 9, color: "#a1a1aa", display: "flex", alignItems: "center", gap: 4 }}><Sparkles size={10} color="#8b5cf6" /> AI sentiment + action</div>
              <button onClick={addNote} className="bp" disabled={!note.trim() || busy}>{busy ? <><Loader2 size={10} className="sp" /> Analyzing...</> : <><Plus size={10} /> Save</>}</button>
            </div>
          </div>
          {repNotes.map(n => { const st = sentStyle[n.sentiment] || sentStyle.neutral; const Icon = st.i; return (
            <div key={n.id} className="cd" style={{ padding: 14, marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ display: "flex", gap: 5 }}><Chip bg={st.bg} c={st.c}><Icon size={8} /> {n.sentiment}</Chip>{n.tag && <Chip bg="#ede9fe" c="#6366f1">{n.tag}</Chip>}</div>
                <span className="mn" style={{ fontSize: 8, color: "#a1a1aa" }}>{n.date}</span>
              </div>
              {n.agenda && <div style={{ padding: 8, background: "#fafaf9", border: "1px solid #f4f4f5", borderRadius: 6, marginBottom: 8, fontSize: 10, whiteSpace: "pre-wrap", lineHeight: 1.5, color: "#3f3f46" }}><div className="mn" style={{ fontSize: 7, color: "#a1a1aa", marginBottom: 2 }}>AGENDA</div>{n.agenda}</div>}
              <div style={{ fontSize: 11, color: "#18181b", lineHeight: 1.6, marginBottom: 10 }}>{n.content}</div>
              <div style={{ borderTop: "1px solid #f4f4f5", paddingTop: 8, display: "flex", gap: 8, alignItems: "flex-start" }}>
                <div style={{ width: 20, height: 20, borderRadius: 5, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Sparkles size={9} color="white" /></div>
                <div><div className="mn" style={{ fontSize: 7, color: "#a1a1aa", marginBottom: 1 }}>AI</div><div style={{ fontSize: 11, fontWeight: 600 }}>{n.suggestion}</div>
                  {n.sessionIdea && <div style={{ marginTop: 4, padding: "3px 8px", background: "#ede9fe", borderRadius: 5, fontSize: 9, color: "#6366f1", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 3 }}><Lightbulb size={9} /> {n.sessionIdea}</div>}
                </div>
              </div>
            </div>); })}
          {!repNotes.length && <div className="cd" style={{ padding: 32, textAlign: "center", color: "#a1a1aa", fontSize: 11 }}>No notes yet for {rep?.name}.</div>}
        </div>
      </div>
    </div>
  );
}

/* ═══════════ COLLATERALS ═══════════ */
function CollView({ data, save }) {
  const [bkt, setBkt] = useState("All");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [newStory, setNewStory] = useState({});
  const filtered = data.collaterals.filter(c => bkt === "All" || c.bucket === bkt).filter(c => c.title.toLowerCase().includes(search.toLowerCase()));
  const bktCts = {}; data.collaterals.forEach(c => { bktCts[c.bucket] = (bktCts[c.bucket] || 0) + 1; });
  const totalUses = data.collaterals.reduce((a, b) => a + b.uses, 0);
  const addC = item => { save({ ...data, collaterals: [{ id: `c${Date.now()}`, ...item, uses: 0, lastUpdated: TODAY, stories: [] }, ...data.collaterals] }); setShow(false); };
  const bump = id => save({ ...data, collaterals: data.collaterals.map(c => c.id === id ? { ...c, uses: c.uses + 1 } : c) });
  const addStory = id => { if (!newStory[id]?.trim()) return; save({ ...data, collaterals: data.collaterals.map(c => c.id === id ? { ...c, stories: [...c.stories, newStory[id]] } : c) }); setNewStory({ ...newStory, [id]: "" }); };

  return (
    <div>
      <Hdr e="collaterals" t="The library" s="Tracked by usage. Add impact stories." a={<button onClick={() => setShow(!show)} className="bp"><Plus size={11} /> Add</button>} />
      <div style={{ display: "flex", gap: 4, marginBottom: 8, flexWrap: "wrap" }}>
        {COLL_BUCKETS.map(b => { const ct = b === "All" ? data.collaterals.length : (bktCts[b] || 0); if (b !== "All" && !ct) return null; return <button key={b} onClick={() => setBkt(b)} style={{ padding: "5px 10px", background: bkt === b ? "#09090b" : "white", color: bkt === b ? "#fafafa" : "#71717a", border: `1.5px solid ${bkt === b ? "#09090b" : "#e4e4e7"}`, borderRadius: 100, fontSize: 9, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{b} <span className="mn" style={{ fontSize: 8, opacity: .7 }}>{ct}</span></button>; })}
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="inp" style={{ maxWidth: 260 }} /><div className="mn" style={{ fontSize: 10, color: "#a1a1aa" }}><b style={{ color: "#09090b" }}>{totalUses}</b> uses</div></div>
      {show && <div className="cd fi" style={{ padding: 16, marginBottom: 10, background: "#09090b", color: "#fafafa", border: "none", borderRadius: 12 }}>
        <CollForm onSubmit={addC} onClose={() => setShow(false)} />
      </div>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 10 }}>
        {filtered.map(c => (
          <div key={c.id} className="cd" style={{ padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}><Chip bg="#ede9fe" c="#6366f1">{c.bucket}</Chip><BookOpen size={12} color="#a1a1aa" /></div>
            <div className="dp" style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>{c.title}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderTop: "1px solid #f4f4f5", paddingTop: 8, marginBottom: 6 }}>
              <div><div className="mn" style={{ fontSize: 7, color: "#a1a1aa" }}>USES</div><div className="mn" style={{ fontSize: 18, fontWeight: 700 }}>{c.uses}</div></div>
              <button onClick={() => bump(c.id)} className="bs" style={{ padding: "3px 8px", fontSize: 8 }}>+1</button>
              <div style={{ textAlign: "right" }}><div className="mn" style={{ fontSize: 7, color: "#a1a1aa" }}>UPDATED</div><div style={{ fontSize: 10 }}>{c.lastUpdated}</div></div>
            </div>
            {c.stories.length > 0 && c.stories.map((s, i) => <div key={i} style={{ padding: "4px 8px", background: "#fafaf9", border: "1px solid #f4f4f5", borderRadius: 5, fontSize: 9, color: "#3f3f46", marginBottom: 3, display: "flex", gap: 4 }}><Star size={9} color="#d97706" style={{ flexShrink: 0, marginTop: 1 }} />{s}</div>)}
            <div style={{ display: "flex", gap: 3, marginTop: 4 }}><input value={newStory[c.id] || ""} onChange={e => setNewStory({ ...newStory, [c.id]: e.target.value })} placeholder="Add impact story..." className="inp" style={{ fontSize: 9, padding: "5px 7px" }} /><button onClick={() => addStory(c.id)} className="bp" style={{ padding: "4px 8px", fontSize: 8 }} disabled={!newStory[c.id]?.trim()}><Plus size={9} /></button></div>
          </div>))}
      </div>
    </div>
  );
}
function CollForm({ onSubmit, onClose }) {
  const [f, sF] = useState({ title: "", bucket: "Battle Card" });
  return (<div><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><div className="dp" style={{ fontSize: 14, fontWeight: 700 }}>New collateral</div><button onClick={onClose} style={{ background: "none", border: "none", color: "#fafafa", cursor: "pointer" }}><X size={13} /></button></div>
    <div style={{ marginBottom: 8 }}><label className="mn lbl">Title</label><input value={f.title} onChange={e => sF({ ...f, title: e.target.value })} className="inp" style={{ background: "#18181b", color: "#fafafa", border: "1.5px solid #27272a" }} /></div>
    <div style={{ marginBottom: 12 }}><label className="mn lbl">Bucket</label><div style={{ display: "flex", gap: 3, marginTop: 4, flexWrap: "wrap" }}>{COLL_BUCKETS.filter(x => x !== "All").map(t => <button key={t} onClick={() => sF({ ...f, bucket: t })} style={{ padding: "3px 8px", background: f.bucket === t ? "#8b5cf6" : "transparent", color: f.bucket === t ? "white" : "#fafafa", border: `1px solid ${f.bucket === t ? "#8b5cf6" : "#27272a"}`, borderRadius: 100, fontSize: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>{t}</button>)}</div></div>
    <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}><button onClick={onClose} className="bs" style={{ color: "#fafafa", borderColor: "#27272a" }}>Cancel</button><button onClick={() => f.title && onSubmit(f)} className="bp" style={{ background: "#8b5cf6" }} disabled={!f.title}><Plus size={10} /> Add</button></div>
  </div>);
}

/* ═══════════ SESSIONS ═══════════ */
function SessionsView({ data, save }) {
  const [show, setShow] = useState(false);
  const upcoming = data.sessions.filter(s => s.status === "upcoming").sort((a, b) => a.date?.localeCompare(b.date));
  const completed = data.sessions.filter(s => s.status === "completed");
  const suggested = []; const seen = new Set();
  data.notes.forEach(n => { if (n.sessionIdea && !seen.has(n.sessionIdea)) { seen.add(n.sessionIdea); if (!data.sessions.some(s => s.title.toLowerCase().includes(n.sessionIdea.toLowerCase().split(" ")[0]))) suggested.push({ idea: n.sessionIdea, source: data.reps.find(r => r.id === n.repId)?.name, tag: n.tag }); } });
  const markDone = id => save({ ...data, sessions: data.sessions.map(s => s.id === id ? { ...s, status: "completed" } : s) });
  const addS = sess => { save({ ...data, sessions: [{ id: `s${Date.now()}`, ...sess, status: "upcoming", notes: "" }, ...data.sessions] }); setShow(false); };
  const adopt = idea => addS({ title: idea, date: "", type: "Workshop", attendees: 0 });

  return (
    <div>
      <Hdr e="sessions" t="The calendar" s="Plan, track, prove outcomes. AI suggests sessions from 1:1 gaps." a={<button onClick={() => setShow(!show)} className="bp"><Plus size={11} /> Schedule</button>} />
      {suggested.length > 0 && <div style={{ marginBottom: 16 }}><div className="mn" style={{ fontSize: 7, color: "#a1a1aa", letterSpacing: "0.16em", marginBottom: 6 }}><Lightbulb size={9} style={{ display: "inline", verticalAlign: "middle" }} /> AI-SUGGESTED</div><div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{suggested.map((s, i) => <div key={i} className="cd" style={{ padding: 10, display: "flex", alignItems: "center", gap: 10, flex: "1 1 250px", background: "#faf5ff", border: "1px solid #e9d5ff" }}><div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Lightbulb size={12} color="white" /></div><div style={{ flex: 1 }}><div style={{ fontSize: 11, fontWeight: 600 }}>{s.idea}</div><div style={{ fontSize: 9, color: "#71717a" }}>{s.source} · {s.tag}</div></div><button onClick={() => adopt(s.idea)} className="bp" style={{ background: "#8b5cf6", padding: "4px 8px", fontSize: 8 }}><Plus size={9} /></button></div>)}</div></div>}
      {show && <div className="cd fi" style={{ padding: 16, marginBottom: 10, background: "#09090b", color: "#fafafa", border: "none", borderRadius: 12 }}><SessForm onSubmit={addS} onClose={() => setShow(false)} /></div>}
      <div className="mn" style={{ fontSize: 7, color: "#a1a1aa", letterSpacing: "0.16em", marginBottom: 6 }}>UPCOMING</div>
      {upcoming.map(s => <div key={s.id} className="cd ch-h" style={{ padding: 12, display: "flex", alignItems: "center", gap: 12, marginBottom: 5 }}><div style={{ width: 42, height: 42, borderRadius: 8, background: "#09090b", color: "#fafafa", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><div className="mn" style={{ fontSize: 7, opacity: .6 }}>{s.date ? new Date(s.date).toLocaleDateString("en-US", { month: "short" }).toUpperCase() : "TBD"}</div><div className="dp" style={{ fontSize: 14, fontWeight: 800, lineHeight: 1 }}>{s.date ? new Date(s.date).getDate() : "?"}</div></div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 600 }}>{s.title}</div><div style={{ fontSize: 9, color: "#a1a1aa" }}>{s.type} · {s.attendees} ppl</div></div><button onClick={() => markDone(s.id)} className="bs" style={{ padding: "4px 10px", fontSize: 9 }}><CheckCircle2 size={10} /> Done</button></div>)}
      {!upcoming.length && <div className="cd" style={{ padding: 20, color: "#a1a1aa", fontSize: 11 }}>Nothing scheduled.</div>}
      {completed.length > 0 && <><div className="mn" style={{ fontSize: 7, color: "#a1a1aa", letterSpacing: "0.16em", marginBottom: 6, marginTop: 16 }}>COMPLETED</div>{completed.map(s => <div key={s.id} className="cd" style={{ padding: 12, display: "flex", alignItems: "center", gap: 12, marginBottom: 5, opacity: .6 }}><div style={{ width: 42, height: 42, borderRadius: 8, background: "#f4f4f5", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><div className="mn" style={{ fontSize: 7, opacity: .6 }}>{new Date(s.date).toLocaleDateString("en-US", { month: "short" }).toUpperCase()}</div><div className="dp" style={{ fontSize: 14, fontWeight: 800, lineHeight: 1 }}>{new Date(s.date).getDate()}</div></div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 600 }}>{s.title}</div><div style={{ fontSize: 9, color: "#a1a1aa" }}>{s.type}{s.notes ? ` · ${s.notes}` : ""}</div></div><Chip bg="#ecfdf5" c="#059669">done</Chip></div>)}</>}
    </div>
  );
}
function SessForm({ onSubmit, onClose }) {
  const [f, sF] = useState({ title: "", date: "", type: "Workshop", attendees: 0 });
  return (<div><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><div className="dp" style={{ fontSize: 14, fontWeight: 700 }}>Schedule session</div><button onClick={onClose} style={{ background: "none", border: "none", color: "#fafafa", cursor: "pointer" }}><X size={13} /></button></div>
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 8, marginBottom: 8 }}><div><label className="mn lbl">Title</label><input value={f.title} onChange={e => sF({ ...f, title: e.target.value })} className="inp" style={{ background: "#18181b", color: "#fafafa", border: "1.5px solid #27272a" }} /></div><div><label className="mn lbl">Date</label><input type="date" value={f.date} onChange={e => sF({ ...f, date: e.target.value })} className="inp" style={{ background: "#18181b", color: "#fafafa", border: "1.5px solid #27272a" }} /></div></div>
    <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}><button onClick={onClose} className="bs" style={{ color: "#fafafa", borderColor: "#27272a" }}>Cancel</button><button onClick={() => f.title && onSubmit(f)} className="bp" style={{ background: "#8b5cf6" }} disabled={!f.title}><Send size={10} /> Schedule</button></div>
  </div>);
}

/* ═══════════ PULSE ═══════════ */
function PulseView({ data, save }) {
  const [sel, setSel] = useState(data.pulseChecks[0]?.id);
  const pulse = data.pulseChecks.find(p => p.id === sel);
  const getAvg = (pc, qi) => { if (!pc?.responses.length) return 0; const v = pc.responses.map(r => r.answers[qi]).filter(x => x != null); return v.length ? (v.reduce((a, b) => a + b, 0) / v.length).toFixed(1) : 0; };
  const addResp = (repId, answers) => { const upd = data.pulseChecks.map(p => { if (p.id !== sel) return p; return { ...p, responses: [...p.responses.filter(r => r.repId !== repId), { repId, answers }] }; }); save({ ...data, pulseChecks: upd }); };

  return (
    <div>
      <Hdr e="pulse checks" t="Team confidence" s="Quick surveys. Spot drops before they hit pipeline." />
      <div style={{ display: "flex", gap: 5, marginBottom: 16, flexWrap: "wrap" }}>{data.pulseChecks.map(pc => <button key={pc.id} onClick={() => setSel(pc.id)} style={{ padding: "8px 14px", background: sel === pc.id ? "#09090b" : "white", color: sel === pc.id ? "#fafafa" : "#09090b", border: `1.5px solid ${sel === pc.id ? "#09090b" : "#e4e4e7"}`, borderRadius: 8, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}><div style={{ fontSize: 11, fontWeight: 600 }}>{pc.title}</div><div style={{ fontSize: 9, opacity: .6 }}>{pc.date} · {pc.responses.length} responses</div></button>)}</div>
      {pulse && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <div className="mn" style={{ fontSize: 7, color: "#a1a1aa", letterSpacing: "0.16em", marginBottom: 8 }}>RESULTS</div>
          {pulse.questions.map((q, qi) => { const avg = parseFloat(getAvg(pulse, qi)); const col = avg >= 4 ? "#059669" : avg >= 3 ? "#d97706" : "#dc2626"; return (
            <div key={qi} className="cd" style={{ padding: 14, marginBottom: 6 }}>
              <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 8 }}>{q}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ flex: 1, height: 6, background: "#f4f4f5", borderRadius: 100 }}><div style={{ width: `${(avg / 5) * 100}%`, height: "100%", background: col, borderRadius: 100 }} /></div>
                <span className="mn" style={{ fontSize: 16, fontWeight: 700, color: col }}>{avg}</span><span className="mn" style={{ fontSize: 9, color: "#a1a1aa" }}>/5</span>
              </div>
              <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>{pulse.responses.map(r => { const rep = data.reps.find(x => x.id === r.repId); const v = r.answers[qi]; const c = v >= 4 ? "#059669" : v >= 3 ? "#d97706" : "#dc2626"; return <Chip key={r.repId} bg={c + "14"} c={c}>{rep?.name.split(" ")[0]} {v}</Chip>; })}</div>
            </div>); })}
        </div>
        <div>
          <div className="mn" style={{ fontSize: 7, color: "#a1a1aa", letterSpacing: "0.16em", marginBottom: 8 }}>LOG RESPONSES</div>
          {data.reps.map(rep => { const existing = pulse.responses.find(r => r.repId === rep.id); return <PulseInput key={rep.id} rep={rep} qs={pulse.questions} existing={existing} onSave={a => addResp(rep.id, a)} />; })}
        </div>
      </div>}
    </div>
  );
}
function PulseInput({ rep, qs, existing, onSave }) {
  const [ans, setAns] = useState(existing?.answers || qs.map(() => 0));
  const [open, setOpen] = useState(!existing);
  return (
    <div className="cd" style={{ padding: 10, marginBottom: 5, opacity: existing && !open ? .6 : 1 }}>
      <button onClick={() => setOpen(!open)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>{existing ? <CheckCircle2 size={12} color="#059669" /> : <Circle size={12} color="#d4d4d8" />}<span style={{ fontSize: 11, fontWeight: 600 }}>{rep.name}</span></div>
        <ChevronDown size={12} color="#a1a1aa" style={{ transform: open ? "rotate(180deg)" : "none", transition: "0.2s" }} />
      </button>
      {open && <div style={{ marginTop: 8 }}>{qs.map((q, qi) => <div key={qi} style={{ marginBottom: 8 }}><div style={{ fontSize: 9, color: "#71717a", marginBottom: 3 }}>{q}</div><div style={{ display: "flex", gap: 3 }}>{[1,2,3,4,5].map(n => <button key={n} onClick={() => { const next = [...ans]; next[qi] = n; setAns(next); }} style={{ width: 32, height: 24, borderRadius: 5, fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace", background: ans[qi] === n ? (n >= 4 ? "#059669" : n >= 3 ? "#d97706" : "#dc2626") : "#f4f4f5", color: ans[qi] === n ? "white" : "#71717a", border: "none" }}>{n}</button>)}</div></div>)}
        <button onClick={() => { onSave(ans); setOpen(false); }} className="bp" style={{ width: "100%", justifyContent: "center", background: "#8b5cf6", marginTop: 4 }} disabled={ans.some(a => a === 0)}><Check size={10} /> Save</button>
      </div>}
    </div>
  );
}

/* ═══════════ PLANNING ═══════════ */
function PlanView({ data, save }) {
  const [newT, setNewT] = useState("");
  const [newC, setNewC] = useState("must");
  const cols = [{ id: "must", l: "Must Do", c: "#dc2626" },{ id: "should", l: "Should Do", c: "#d97706" },{ id: "could", l: "Could Do", c: "#6366f1" }];
  const add = () => { if (!newT.trim()) return; save({ ...data, todos: [{ id: `t${Date.now()}`, text: newT, col: newC, done: false }, ...data.todos] }); setNewT(""); };
  const tog = id => save({ ...data, todos: data.todos.map(t => t.id === id ? { ...t, done: !t.done } : t) });
  const move = (id, c) => save({ ...data, todos: data.todos.map(t => t.id === id ? { ...t, col: c } : t) });
  const del = id => save({ ...data, todos: data.todos.filter(t => t.id !== id) });
  const dc = data.todos.filter(t => t.done).length, tc = data.todos.length;

  return (
    <div>
      <Hdr e="weekly planning" t="Your week" s="Must / Should / Could. Check off. Move around." />
      <div className="cd" style={{ padding: 12, marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ flex: 1 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontSize: 11, fontWeight: 600 }}>Progress</span><span className="mn" style={{ fontSize: 11, fontWeight: 700 }}>{dc}/{tc}</span></div><div style={{ height: 5, background: "#f4f4f5", borderRadius: 100 }}><div style={{ width: `${tc ? (dc / tc) * 100 : 0}%`, height: "100%", background: "linear-gradient(90deg,#6366f1,#8b5cf6)", borderRadius: 100 }} /></div></div>
        <div className="mn" style={{ fontSize: 18, fontWeight: 700, color: dc === tc && tc > 0 ? "#059669" : "#09090b" }}>{tc ? Math.round(dc / tc * 100) : 0}%</div>
      </div>
      <div className="cd" style={{ padding: 10, marginBottom: 14, display: "flex", gap: 6, alignItems: "center" }}>
        <input value={newT} onChange={e => setNewT(e.target.value)} placeholder="Add task..." className="inp" style={{ flex: 1 }} onKeyDown={e => e.key === "Enter" && add()} />
        <select value={newC} onChange={e => setNewC(e.target.value)} className="sel">{cols.map(c => <option key={c.id} value={c.id}>{c.l}</option>)}</select>
        <button onClick={add} className="bp" disabled={!newT.trim()}><Plus size={11} /></button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        {cols.map(col => { const tasks = data.todos.filter(t => t.col === col.id); const active = tasks.filter(t => !t.done); const done = tasks.filter(t => t.done); return (
          <div key={col.id}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><div style={{ width: 6, height: 6, borderRadius: 2, background: col.c }} /><span style={{ fontSize: 11, fontWeight: 600 }}>{col.l}</span><span className="mn" style={{ fontSize: 9, color: "#a1a1aa" }}>{active.length}</span></div>
            {active.map(t => <TodoCard key={t.id} t={t} cols={cols} onTog={() => tog(t.id)} onMove={c => move(t.id, c)} onDel={() => del(t.id)} />)}
            {done.length > 0 && <div style={{ marginTop: 6, opacity: .5 }}><div className="mn" style={{ fontSize: 7, color: "#a1a1aa", marginBottom: 4 }}>DONE ({done.length})</div>{done.map(t => <TodoCard key={t.id} t={t} cols={cols} onTog={() => tog(t.id)} onMove={c => move(t.id, c)} onDel={() => del(t.id)} />)}</div>}
          </div>); })}
      </div>
    </div>
  );
}
function TodoCard({ t, cols, onTog, onMove, onDel }) {
  const [sh, setSh] = useState(false);
  return (
    <div className="cd" style={{ padding: 8, marginBottom: 4, display: "flex", alignItems: "flex-start", gap: 6, opacity: t.done ? .6 : 1 }}>
      <button onClick={onTog} style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${t.done ? "#059669" : "#d4d4d8"}`, background: t.done ? "#059669" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, marginTop: 1 }}>{t.done && <Check size={9} color="white" strokeWidth={3} />}</button>
      <div style={{ flex: 1, fontSize: 10, color: t.done ? "#a1a1aa" : "#09090b", textDecoration: t.done ? "line-through" : "none", lineHeight: 1.4 }}>{t.text}</div>
      <div style={{ position: "relative" }}><button onClick={() => setSh(!sh)} style={{ background: "none", border: "none", cursor: "pointer", padding: 1, color: "#a1a1aa" }}><ChevronDown size={10} /></button>
        {sh && <div style={{ position: "absolute", right: 0, top: 16, background: "white", border: "1px solid #e4e4e7", borderRadius: 6, boxShadow: "0 4px 12px rgba(0,0,0,.08)", zIndex: 10, overflow: "hidden", minWidth: 100 }}>
          {cols.filter(c => c.id !== t.col).map(c => <button key={c.id} onClick={() => { onMove(c.id); setSh(false); }} style={{ display: "block", width: "100%", padding: "6px 10px", background: "none", border: "none", cursor: "pointer", fontSize: 9, textAlign: "left", fontFamily: "inherit" }}>→ {c.l}</button>)}
          <button onClick={() => { onDel(); setSh(false); }} style={{ display: "block", width: "100%", padding: "6px 10px", background: "none", border: "none", cursor: "pointer", fontSize: 9, textAlign: "left", fontFamily: "inherit", color: "#dc2626", borderTop: "1px solid #f4f4f5" }}>Delete</button>
        </div>}
      </div>
    </div>
  );
}

/* ═══════════ FORECAST ═══════════ */
function ForecastView({ data, save }) {
  const [show, setShow] = useState(false);
  const stCfg = { "in-progress": { l: "In Progress", c: "#6366f1" }, scheduled: { l: "Scheduled", c: "#d97706" }, planned: { l: "Planned", c: "#71717a" }, backlog: { l: "Backlog", c: "#a1a1aa" }, done: { l: "Done", c: "#059669" } };
  const impCfg = { critical: { c: "#dc2626" }, high: { c: "#d97706" }, medium: { c: "#6366f1" }, low: { c: "#a1a1aa" } };
  const upd = (id, s) => save({ ...data, forecast: data.forecast.map(f => f.id === id ? { ...f, status: s } : f) });
  const addP = proj => { save({ ...data, forecast: [{ id: `f${Date.now()}`, ...proj }, ...data.forecast] }); setShow(false); };

  return (
    <div>
      <Hdr e="forecasting" t="Project pipeline" s="Every enablement project tracked." a={<button onClick={() => setShow(!show)} className="bp"><Plus size={11} /> Add</button>} />
      {show && <div className="cd fi" style={{ padding: 16, marginBottom: 10, background: "#09090b", color: "#fafafa", border: "none", borderRadius: 12 }}>
        <FcForm onSubmit={addP} onClose={() => setShow(false)} />
      </div>}
      {["in-progress","scheduled","planned","backlog","done"].map(status => { const items = data.forecast.filter(f => f.status === status); if (!items.length) return null; const sc = stCfg[status]; return (
        <div key={status} style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}><div style={{ width: 6, height: 6, borderRadius: 2, background: sc.c }} /><span style={{ fontSize: 11, fontWeight: 600 }}>{sc.l}</span><span className="mn" style={{ fontSize: 9, color: "#a1a1aa" }}>{items.length}</span></div>
          {items.map(f => { const ic = impCfg[f.impact]; return (
            <div key={f.id} className="cd ch-h" style={{ padding: 12, marginBottom: 5, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 3, height: 32, background: ic.c, borderRadius: 2, flexShrink: 0 }} />
              <div style={{ flex: 1 }}><div style={{ display: "flex", gap: 5, marginBottom: 2 }}><Chip bg={ic.c + "18"} c={ic.c}>{f.impact}</Chip>{f.eta && <span style={{ fontSize: 9, color: "#a1a1aa" }}>ETA: {f.eta}</span>}</div><div style={{ fontSize: 12, fontWeight: 600 }}>{f.title}</div>{f.notes && <div style={{ fontSize: 9, color: "#71717a", marginTop: 2 }}>{f.notes}</div>}</div>
              <select value={f.status} onChange={e => upd(f.id, e.target.value)} className="sel">{Object.entries(stCfg).map(([k, v]) => <option key={k} value={k}>{v.l}</option>)}</select>
            </div>); })}
        </div>); })}
    </div>
  );
}
function FcForm({ onSubmit, onClose }) {
  const [f, sF] = useState({ title: "", status: "planned", impact: "medium", eta: "", notes: "" });
  return (<div><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><div className="dp" style={{ fontSize: 14, fontWeight: 700 }}>Add project</div><button onClick={onClose} style={{ background: "none", border: "none", color: "#fafafa", cursor: "pointer" }}><X size={13} /></button></div>
    <div style={{ marginBottom: 8 }}><label className="mn lbl">Title</label><input value={f.title} onChange={e => sF({ ...f, title: e.target.value })} className="inp" style={{ background: "#18181b", color: "#fafafa", border: "1.5px solid #27272a" }} /></div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
      <div><label className="mn lbl">Status</label><select value={f.status} onChange={e => sF({ ...f, status: e.target.value })} className="inp" style={{ background: "#18181b", color: "#fafafa", border: "1.5px solid #27272a" }}><option value="in-progress">In Progress</option><option value="scheduled">Scheduled</option><option value="planned">Planned</option><option value="backlog">Backlog</option></select></div>
      <div><label className="mn lbl">Impact</label><select value={f.impact} onChange={e => sF({ ...f, impact: e.target.value })} className="inp" style={{ background: "#18181b", color: "#fafafa", border: "1.5px solid #27272a" }}><option value="critical">Critical</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select></div>
      <div><label className="mn lbl">ETA</label><input type="date" value={f.eta} onChange={e => sF({ ...f, eta: e.target.value })} className="inp" style={{ background: "#18181b", color: "#fafafa", border: "1.5px solid #27272a" }} /></div>
    </div>
    <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}><button onClick={onClose} className="bs" style={{ color: "#fafafa", borderColor: "#27272a" }}>Cancel</button><button onClick={() => f.title && onSubmit(f)} className="bp" style={{ background: "#8b5cf6" }} disabled={!f.title}><Plus size={10} /> Add</button></div>
  </div>);
}

/* ═══════════ LEADERBOARDS ═══════════ */
function LBView({ data, save }) {
  const [selType, setSelType] = useState("all");
  const types = [{ id: "all", l: "All" },{ id: "weekly", l: "Weekly" },{ id: "quarterly", l: "Quarterly" }];
  const filtered = selType === "all" ? data.leaderboards : data.leaderboards.filter(lb => lb.type === selType);

  return (
    <div>
      <Hdr e="leaderboards" t="Who's winning" s="Track any metric. Weekly, quarterly, custom." />
      <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>{types.map(t => <button key={t.id} onClick={() => setSelType(t.id)} style={{ padding: "5px 12px", background: selType === t.id ? "#09090b" : "white", color: selType === t.id ? "#fafafa" : "#71717a", border: `1.5px solid ${selType === t.id ? "#09090b" : "#e4e4e7"}`, borderRadius: 100, fontSize: 9, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{t.l}</button>)}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 12 }}>
        {filtered.map(lb => { const sorted = [...lb.entries].sort((a, b) => b.value - a.value).filter(e => e.value > 0); const mx = Math.max(...sorted.map(e => e.value), 1); return (
          <div key={lb.id} className="cd" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "14px 16px 10px", borderBottom: "1px solid #f4f4f5" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}><Trophy size={11} color="#6366f1" /><Chip bg="#ede9fe" c="#6366f1">{lb.type}</Chip></div>
              <div className="dp" style={{ fontSize: 14, fontWeight: 700 }}>{lb.title}</div>
              <div style={{ fontSize: 9, color: "#a1a1aa" }}>{lb.period} · {lb.metric}</div>
            </div>
            <div style={{ padding: "6px 16px 14px" }}>
              {sorted.map((entry, idx) => { const rep = data.reps.find(r => r.id === entry.repId); if (!rep) return null; const rank = idx + 1; return (
                <div key={entry.repId} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: idx < sorted.length - 1 ? "1px solid #f4f4f5" : "none" }}>
                  {rank <= 3 ? <div style={{ width: 22, height: 22, borderRadius: "50%", background: rank === 1 ? "linear-gradient(135deg,#f59e0b,#d97706)" : rank === 2 ? "linear-gradient(135deg,#94a3b8,#64748b)" : "linear-gradient(135deg,#d97706,#92400e)", display: "flex", alignItems: "center", justifyContent: "center" }}>{rank === 1 ? <Crown size={10} color="white" /> : <Medal size={10} color="white" />}</div> : <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#f4f4f5", display: "flex", alignItems: "center", justifyContent: "center" }}><span className="mn" style={{ fontSize: 9, color: "#71717a" }}>{rank}</span></div>}
                  <div style={{ flex: 1 }}><div style={{ fontSize: 11, fontWeight: 600 }}>{rep.name}</div><div style={{ fontSize: 8, color: "#a1a1aa" }}>{rep.role}</div></div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}><div style={{ width: 60, height: 5, background: "#f4f4f5", borderRadius: 100 }}><div style={{ width: `${(entry.value / mx) * 100}%`, height: "100%", background: rank <= 3 ? "#6366f1" : "#d4d4d8", borderRadius: 100 }} /></div><span className="mn" style={{ fontSize: 11, fontWeight: 700, color: rank <= 3 ? "#09090b" : "#71717a", minWidth: 30, textAlign: "right" }}>{entry.value}</span></div>
                </div>); })}
            </div>
          </div>); })}
      </div>
    </div>
  );
}

/* ═══════════ SETTINGS ═══════════ */
function SettView({ data, save }) {
  const [resetting, setR] = useState(false);
  const reset = async () => { setR(true); await ST.set(KEY, SEED); setTimeout(() => window.location.reload(), 400); };
  return (
    <div>
      <Hdr e="settings" t="EnableOS Config" s="Platform settings and data management." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8, marginBottom: 16 }}>
        {[{ t: "Workspace", d: "Solo · 1 seat", s: "active" },{ t: "Domain", d: "enableos.app", s: "active" },{ t: "AI", d: "Claude Sonnet", s: "active" },{ t: "Database", d: "Supabase (next step)", s: "coming" },{ t: "Auth", d: "Email + Google", s: "coming" },{ t: "Integrations", d: "Slack, Gong, CRM", s: "coming" }].map(i => <div key={i.t} className="cd" style={{ padding: 12 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}><span style={{ fontSize: 11, fontWeight: 600 }}>{i.t}</span><Chip bg={i.s === "active" ? "#ecfdf5" : "#f4f4f5"} c={i.s === "active" ? "#059669" : "#a1a1aa"}>{i.s}</Chip></div><div style={{ fontSize: 9, color: "#a1a1aa" }}>{i.d}</div></div>)}
      </div>
      <div className="cd" style={{ padding: 14, background: "#fef2f2", border: "1px solid #fecaca", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div><div style={{ fontSize: 11, fontWeight: 600, color: "#dc2626" }}>Reset all data</div><div style={{ fontSize: 9, color: "#991b1b" }}>Restores demo data.</div></div>
        <button onClick={reset} disabled={resetting} className="bs" style={{ borderColor: "#dc2626", color: "#dc2626" }}>{resetting ? "..." : "Reset"}</button>
      </div>
      <div className="cd" style={{ padding: 16, background: "#09090b", color: "#fafafa", border: "none", borderRadius: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><Layers size={12} color="#8b5cf6" /><span className="dp" style={{ fontSize: 13, fontWeight: 700 }}>EnableOS v1.0</span></div>
        <div style={{ fontSize: 10, lineHeight: 2, color: "#d4d4d8" }}>
          <b style={{ color: "#a78bfa" }}>12 features live:</b> Dashboard · Intake · Ramp · 1:1 Notes · Collaterals · Sessions · Pulse · Planning · Forecasting · Leaderboards · Settings · AI Analysis<br />
          <b style={{ color: "#71717a" }}>Next:</b> Supabase auth · Multi-user · CRM integration · Slack bot
        </div>
      </div>
    </div>
  );
}

/* ═══════════ CSS ═══════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
*{box-sizing:border-box;margin:0}body{margin:0}
.dp{font-family:'Instrument Serif',Georgia,serif;letter-spacing:-0.01em}
.mn{font-family:'JetBrains Mono',monospace}
.cd{background:white;border:1px solid #e4e4e7;border-radius:10px}
.ch-h{transition:all .2s}.ch-h:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,0,0,.03);border-color:#d4d4d8}
.bp{background:#09090b;color:#fafafa;border:none;padding:7px 14px;border-radius:7px;font-weight:600;cursor:pointer;font-size:10px;transition:all .15s;display:inline-flex;align-items:center;gap:4px;font-family:inherit}.bp:hover{background:#18181b}.bp:disabled{opacity:.4;cursor:not-allowed}
.bs{background:transparent;color:#09090b;border:1.5px solid #d4d4d8;padding:7px 14px;border-radius:7px;font-weight:500;cursor:pointer;font-size:10px;display:inline-flex;align-items:center;gap:4px;font-family:inherit}.bs:hover{border-color:#09090b}
.lk{background:none;border:none;color:#71717a;font-size:9px;font-weight:600;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:2px;padding:0}.lk:hover{color:#09090b}
.inp{background:white;border:1.5px solid #e4e4e7;border-radius:7px;padding:8px 10px;font-size:11px;width:100%;font-family:inherit;color:#09090b}.inp:focus{outline:none;border-color:#09090b}
.sel{padding:5px 7px;border:1.5px solid #e4e4e7;border-radius:5px;font-size:9px;background:white;font-family:inherit;font-weight:600}
.ch{display:inline-flex;align-items:center;gap:2px;padding:2px 7px;border-radius:100px;font-size:7px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;white-space:nowrap}
.lbl{font-size:7px;letter-spacing:0.12em;color:#a1a1aa;display:block;margin-bottom:2px}
.ni{width:100%;display:flex;align-items:center;gap:8px;padding:6px 10px;background:transparent;color:#a1a1aa;border:none;border-radius:7px;cursor:pointer;font-size:10px;font-weight:500;text-align:left;font-family:inherit;transition:all .12s}
.ni:hover{color:#fafafa;background:rgba(255,255,255,.05)}.ni.act{color:#fafafa;background:rgba(255,255,255,.08);font-weight:600}
.sb{background:#6366f1;border-radius:2px 2px 0 0;transition:all .2s}.sb:hover{background:#8b5cf6}
@keyframes su{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.fi{animation:su .3s cubic-bezier(.16,1,.3,1)}
@keyframes pg{0%,100%{opacity:1}50%{opacity:.4}}.ld{animation:pg 2s ease-in-out infinite}
@keyframes sp{to{transform:rotate(360deg)}}.sp{animation:sp 1s linear infinite}
::selection{background:#8b5cf6;color:white}textarea{font-family:inherit}
`;
