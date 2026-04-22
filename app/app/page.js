"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import {
  LayoutDashboard, Inbox, TrendingUp, MessageSquare, BookOpen,
  Calendar, Activity, ListTodo, BarChart3, Trophy, Crown,
  Plus, Sparkles, ArrowUpRight, CheckCircle2, Clock, AlertCircle,
  Flame, Target, ChevronRight, ChevronDown, X, Search, Zap,
  Send, Layers, Settings, ArrowUp, ArrowDown, Check, Circle,
  Loader2, Eye, Lightbulb, Star, Medal, Trash2, LogOut,
} from "lucide-react";

/* ═══ CONSTANTS ═══ */
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
const TODAY = new Date().toISOString().slice(0, 10);
const daysBtwn = (a, b) => Math.floor((new Date(b) - new Date(a)) / 864e5);
const repProg = (rep) => { const t = OB.reduce((a, s) => a + s.items.length, 0); const d = OB.reduce((a, s) => a + (rep.onboarding?.[s.id] || []).filter(Boolean).length, 0); return { done: d, total: t, pct: Math.round((d / t) * 100) }; };
const pScore = r => Math.min(100, Math.round(((r.impact * r.urgency * 2) / Math.max(r.effort, 1)) * 5));
const pBkt = s => s >= 70 ? { l: "P0", f: "Drop everything", c: "#dc2626", bg: "#fef2f2" } : s >= 45 ? { l: "P1", f: "This week", c: "#d97706", bg: "#fffbeb" } : s >= 25 ? { l: "P2", f: "This sprint", c: "#059669", bg: "#ecfdf5" } : { l: "P3", f: "Backlog", c: "#71717a", bg: "#f4f4f5" };

/* ═══ SUPABASE DATA LAYER ═══ */
const DB = {
  async loadAll(userId) {
    const [reps, requests, notes, collaterals, sessions, pulseChecks, todos, forecast, leaderboards] = await Promise.all([
      supabase.from("reps").select("*").eq("user_id", userId).order("created_at"),
      supabase.from("requests").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase.from("notes").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase.from("collaterals").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase.from("sessions").select("*").eq("user_id", userId).order("date", { ascending: true }),
      supabase.from("pulse_checks").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase.from("todos").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase.from("forecast").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase.from("leaderboards").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
    ]);
    return {
      reps: reps.data || [], requests: requests.data || [], notes: notes.data || [],
      collaterals: collaterals.data || [], sessions: sessions.data || [],
      pulseChecks: pulseChecks.data || [], todos: todos.data || [],
      forecast: forecast.data || [], leaderboards: leaderboards.data || [],
      pulse: { mqlToSql: [12,14,13,16,18,17,19], rampAvg: [90,88,75,68,62,55,45], noShows: [22,20,18,15,14,12,11] },
    };
  },
  async insert(table, row) { const { data, error } = await supabase.from(table).insert(row).select().single(); return { data, error }; },
  async update(table, id, updates) { const { data, error } = await supabase.from(table).update(updates).eq("id", id).select().single(); return { data, error }; },
  async remove(table, id) { return await supabase.from(table).delete().eq("id", id); },
};

/* ═══ APP ═══ */
export default function AppPage() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [view, setView] = useState("dashboard");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) { setUser(session.user); } else { window.location.href = "/login"; }
      setChecking(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setUser(session.user); else window.location.href = "/login";
    });
    return () => subscription.unsubscribe();
  }, []);

  // Load data
  useEffect(() => {
    if (!user) return;
    (async () => {
      const d = await DB.loadAll(user.id);
      setData(d);
      setLoading(false);
    })();
  }, [user]);

  const reload = async () => { if (user) { const d = await DB.loadAll(user.id); setData(d); } };
  const logout = async () => { await supabase.auth.signOut(); window.location.href = "/"; };

  if (checking) return <LoadScreen text="checking auth..." />;
  if (!user) return <LoadScreen text="redirecting to login..." />;
  if (loading || !data) return <LoadScreen text="loading your data..." />;

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
            { id: "notes", l: "1:1 Notes", i: MessageSquare },
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
        <div style={{ padding: "8px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 10, color: "#71717a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 140 }}>{user.email}</div>
          <button onClick={logout} style={{ background: "none", border: "none", color: "#71717a", cursor: "pointer", padding: 4 }} title="Log out"><LogOut size={13} /></button>
        </div>
      </aside>
      <main style={{ flex: 1, padding: "24px 32px", minWidth: 0, maxHeight: "100vh", overflowY: "auto" }}>
        <div className="fi" key={view}>
          {view === "dashboard" && <DashView data={data} setView={setView} />}
          {view === "requests" && <IntakeView data={data} userId={user.id} reload={reload} />}
          {view === "ramp" && <RampView data={data} userId={user.id} reload={reload} />}
          {view === "notes" && <NotesView data={data} userId={user.id} reload={reload} />}
          {view === "collaterals" && <CollView data={data} userId={user.id} reload={reload} />}
          {view === "sessions" && <SessionsView data={data} userId={user.id} reload={reload} />}
          {view === "pulse" && <PulseView data={data} userId={user.id} reload={reload} />}
          {view === "planning" && <PlanView data={data} userId={user.id} reload={reload} />}
          {view === "forecast" && <ForecastView data={data} userId={user.id} reload={reload} />}
          {view === "leaderboards" && <LBView data={data} userId={user.id} reload={reload} />}
        </div>
      </main>
    </div>
  );
}

function LoadScreen({ text }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#09090b", fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@400;600;700&display=swap');.dp{font-family:'Instrument Serif',Georgia,serif}@keyframes sp{to{transform:rotate(360deg)}}`}</style>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}><Layers size={20} color="white" /></div>
      <div className="dp" style={{ fontSize: 28, color: "#fafafa" }}>Enable<b>OS</b></div>
      <div style={{ fontSize: 12, color: "#71717a", marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}><Loader2 size={12} style={{ animation: "sp 1s linear infinite" }} /> {text}</div>
    </div>
  );
}

function NavBtn({ l, i: Icon, b, active, onClick }) {
  return <button onClick={onClick} className={`ni ${active ? "act" : ""}`}><Icon size={13} /><span style={{ flex: 1 }}>{l}</span>{b > 0 && <span className="mn" style={{ fontSize: 8, fontWeight: 700, background: "#dc2626", color: "white", padding: "1px 5px", borderRadius: 100 }}>{b}</span>}</button>;
}

function Hdr({ e, t, s, a }) {
  return <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}><div><div className="mn" style={{ fontSize: 8, color: "#a1a1aa", letterSpacing: "0.16em", marginBottom: 5 }}>{e.toUpperCase()}</div><h1 className="dp" style={{ fontSize: 26, fontWeight: 400, lineHeight: 1.1, color: "#09090b", maxWidth: 460, margin: 0 }}>{t}</h1>{s && <p style={{ fontSize: 11, color: "#71717a", marginTop: 5, maxWidth: 460, lineHeight: 1.5 }}>{s}</p>}</div>{a}</div>;
}

function Chip({ children, bg = "#f4f4f5", c = "#09090b" }) {
  return <span className="ch" style={{ background: bg, color: c }}>{children}</span>;
}

/* ═══ DASHBOARD ═══ */
function DashView({ data, setView }) {
  const open = data.requests.filter(r => r.status === "open");
  const top3 = open.map(r => ({ ...r, score: pScore(r) })).sort((a, b) => b.score - a.score).slice(0, 4);
  const ramping = data.reps.filter(r => repProg(r).pct < 100);
  const mustTodos = data.todos.filter(t => t.col === "must" && !t.done).length;
  const avgPct = data.reps.length ? Math.round(data.reps.reduce((a, r) => a + repProg(r).pct, 0) / data.reps.length) : 0;
  const hr = new Date().getHours();
  const g = hr < 12 ? "morning" : hr < 18 ? "afternoon" : "evening";

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div className="mn" style={{ fontSize: 8, color: "#a1a1aa", letterSpacing: "0.16em", marginBottom: 6 }}><span className="ld" style={{ color: "#6366f1", fontSize: 10 }}>●</span> {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</div>
        <h1 className="dp" style={{ fontSize: 40, fontWeight: 400, lineHeight: 1.05, color: "#09090b", margin: 0 }}>good {g}<span style={{ color: "#8b5cf6" }}>.</span></h1>
        <p style={{ fontSize: 13, color: "#71717a", marginTop: 6 }}>Your enablement operating system.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 18 }}>
        {[
          { l: "OPEN REQUESTS", v: open.length, c: "#dc2626", i: Flame, go: "requests" },
          { l: "RAMPING", v: ramping.length, c: "#d97706", i: TrendingUp, go: "ramp" },
          { l: "MUST-DO", v: mustTodos, c: "#6366f1", i: ListTodo, go: "planning" },
          { l: "AVG RAMP", v: avgPct + "%", c: "#059669", i: Target, go: "ramp" },
        ].map((s, i) => (
          <div key={i} className="cd ch-h" style={{ padding: 16, cursor: "pointer", position: "relative", overflow: "hidden" }} onClick={() => setView(s.go)}>
            <div style={{ position: "absolute", top: 8, right: 8, opacity: 0.06, color: s.c }}><s.i size={36} /></div>
            <div className="mn" style={{ fontSize: 7, color: "#a1a1aa", letterSpacing: "0.14em", marginBottom: 6 }}>{s.l}</div>
            <div className="dp" style={{ fontSize: 32, fontWeight: 700, lineHeight: 1 }}>{s.v}</div>
          </div>
        ))}
      </div>
      {top3.length > 0 && <div className="cd" style={{ padding: 18, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}><div className="dp" style={{ fontSize: 16, fontWeight: 600 }}>Priority queue</div><button onClick={() => setView("requests")} className="lk">All <ChevronRight size={10} /></button></div>
        {top3.map((r, i) => { const b = pBkt(r.score); return <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: "1px solid #f4f4f5" }}><div className="dp" style={{ fontSize: 18, fontWeight: 800, color: "#e4e4e7", width: 20, textAlign: "center", fontStyle: "italic" }}>{i+1}</div><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 11, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.title}</div><div style={{ fontSize: 9, color: "#a1a1aa" }}>{r.from_person} · {r.bucket}</div></div><Chip bg={b.bg} c={b.c}>{b.l}</Chip></div>; })}
      </div>}
      {data.reps.length === 0 && <div className="cd" style={{ padding: 32, textAlign: "center" }}>
        <div className="dp" style={{ fontSize: 20, marginBottom: 8 }}>Welcome to EnableOS</div>
        <p style={{ fontSize: 12, color: "#71717a", marginBottom: 16 }}>Start by adding your reps in the Ramp & Onboarding section.</p>
        <button onClick={() => setView("ramp")} className="bp" style={{ background: "#8b5cf6" }}>Add your first rep <ArrowUpRight size={11} /></button>
      </div>}
    </div>
  );
}

/* ═══ INTAKE ═══ */
function IntakeView({ data, userId, reload }) {
  const [show, setShow] = useState(false);
  const [bkt, setBkt] = useState("All");
  const [sf, setSf] = useState("all");
  const scored = data.requests.map(r => ({ ...r, score: pScore(r), pb: pBkt(pScore(r)) })).sort((a, b) => b.score - a.score);
  const filtered = scored.filter(r => bkt === "All" || r.bucket === bkt).filter(r => sf === "all" || r.status === sf);
  const bktCts = {}; scored.forEach(r => { bktCts[r.bucket] = (bktCts[r.bucket] || 0) + 1; });

  const add = async (req) => { await DB.insert("requests", { user_id: userId, title: req.title, from_person: req.from, bucket: req.bucket, impact: req.impact, urgency: req.urgency, effort: req.effort }); setShow(false); await reload(); };
  const upd = async (id, status) => { await DB.update("requests", id, { status }); await reload(); };

  return (
    <div>
      <Hdr e="intake" t="The queue" s="Auto-scored. Bucketed." a={<button onClick={() => setShow(!show)} className="bp"><Plus size={11} /> New</button>} />
      <div style={{ display: "flex", gap: 4, marginBottom: 8, flexWrap: "wrap" }}>{INTAKE_BUCKETS.map(b => { const ct = b === "All" ? scored.length : (bktCts[b] || 0); if (b !== "All" && !ct) return null; return <button key={b} onClick={() => setBkt(b)} className={bkt === b ? "fb act" : "fb"}>{b} <span className="mn" style={{ fontSize: 8, opacity: .7 }}>{ct}</span></button>; })}</div>
      <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>{["all","open","in-progress","done"].map(f => <button key={f} onClick={() => setSf(f)} style={{ padding: "3px 8px", background: sf === f ? "#f4f4f5" : "transparent", color: sf === f ? "#09090b" : "#a1a1aa", border: "none", borderRadius: 5, fontSize: 9, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize" }}>{f}</button>)}</div>
      {show && <IntakeForm onSubmit={add} onClose={() => setShow(false)} />}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {filtered.map(r => (
          <div key={r.id} className="cd ch-h" style={{ padding: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 3, height: 32, background: r.pb.c, borderRadius: 2, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 2 }}><Chip bg={r.pb.bg} c={r.pb.c}>{r.pb.l}</Chip><Chip>{r.bucket}</Chip></div>
                <div style={{ fontSize: 11, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.title}</div>
                <div style={{ fontSize: 9, color: "#a1a1aa" }}>{r.from_person}</div>
              </div>
              <select value={r.status} onChange={e => upd(r.id, e.target.value)} className="sel">{["open","in-progress","done"].map(o => <option key={o} value={o}>{o}</option>)}</select>
            </div>
          </div>))}
        {!filtered.length && <div className="cd" style={{ padding: 36, textAlign: "center", color: "#a1a1aa", fontSize: 11 }}>Nothing here. {data.requests.length === 0 ? "Add your first request." : "Try another filter."}</div>}
      </div>
    </div>
  );
}

function IntakeForm({ onSubmit, onClose }) {
  const [f, sF] = useState({ title: "", from: "", bucket: "Collateral", impact: 3, urgency: 3, effort: 3 });
  const sc = pScore(f); const b = pBkt(sc);
  return (
    <div className="cd fi" style={{ padding: 18, marginBottom: 10, background: "#09090b", color: "#fafafa", border: "none", borderRadius: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}><div className="dp" style={{ fontSize: 16, fontWeight: 700 }}>New request</div><button onClick={onClose} style={{ background: "none", border: "none", color: "#fafafa", cursor: "pointer" }}><X size={14} /></button></div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 8, marginBottom: 8 }}>
        <div><label className="mn lbl">What?</label><input value={f.title} onChange={e => sF({...f,title:e.target.value})} className="inp di" placeholder="Be specific" /></div>
        <div><label className="mn lbl">Who?</label><input value={f.from} onChange={e => sF({...f,from:e.target.value})} className="inp di" placeholder="Role" /></div>
      </div>
      <div style={{ marginBottom: 8 }}><label className="mn lbl">Bucket</label><div style={{ display: "flex", gap: 3, marginTop: 4, flexWrap: "wrap" }}>{INTAKE_BUCKETS.filter(x=>x!=="All").map(t => <button key={t} onClick={() => sF({...f,bucket:t})} style={{ padding: "3px 8px", background: f.bucket === t ? "#8b5cf6" : "transparent", color: f.bucket === t ? "white" : "#fafafa", border: `1px solid ${f.bucket === t ? "#8b5cf6" : "#27272a"}`, borderRadius: 100, fontSize: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>{t}</button>)}</div></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
        {["Impact","Urgency","Effort"].map(l => { const key = l.toLowerCase(); return (
          <div key={l}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span className="mn lbl">{l}</span><span className="mn" style={{ fontSize: 11, fontWeight: 700, color: "#8b5cf6" }}>{f[key]}</span></div><div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map(n => <button key={n} onClick={() => sF({...f,[key]:n})} style={{ flex: 1, height: 22, background: n <= f[key] ? "#8b5cf6" : "#18181b", border: "none", borderRadius: 3, cursor: "pointer" }} />)}</div></div>); })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#18181b", borderRadius: 8, marginBottom: 10 }}>
        <div><div className="mn" style={{ fontSize: 7, color: "#71717a" }}>AUTO-PRIORITY</div><div className="dp" style={{ fontSize: 13, fontWeight: 700, color: b.c === "#71717a" ? "#fafafa" : b.c, marginTop: 2 }}>{b.l} — {b.f} ({sc})</div></div><Zap size={14} color="#8b5cf6" />
      </div>
      <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}><button onClick={onClose} className="bs" style={{ color: "#fafafa", borderColor: "#27272a" }}>Cancel</button><button onClick={() => f.title && f.from && onSubmit(f)} className="bp" style={{ background: "#8b5cf6" }} disabled={!f.title||!f.from}><Send size={10} /> Submit</button></div>
    </div>
  );
}

/* ═══ RAMP ═══ */
function RampView({ data, userId, reload }) {
  const [sel, setSel] = useState(data.reps[0]?.id);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("SDR");
  const [newRegion, setNewRegion] = useState("NAM");
  const rep = data.reps.find(r => r.id === sel);
  const p = rep ? repProg(rep) : { done: 0, total: 0, pct: 0 };
  const dIn = rep ? daysBtwn(rep.start_date, TODAY) : 0;

  const addRep = async () => {
    if (!newName) return;
    await DB.insert("reps", { user_id: userId, name: newName, role: newRole, region: newRegion, start_date: TODAY, onboarding: { ob1: [false,false,false,false], ob2: [false,false,false,false], ob3: [false,false,false,false], ob4: [false,false,false,false], ob5: [false,false,false,false] }, benchmarks: { b1: null, b2: null, b3: null, b4: null, b5: null, b6: null } });
    setNewName(""); setShowAdd(false); await reload();
  };

  const togOb = async (sid, idx) => {
    if (!rep) return;
    const ob = { ...rep.onboarding }; const it = [...(ob[sid] || [])]; it[idx] = !it[idx]; ob[sid] = it;
    await DB.update("reps", rep.id, { onboarding: ob }); await reload();
  };

  const togBm = async (bid) => {
    if (!rep) return;
    const bm = { ...rep.benchmarks }; bm[bid] = bm[bid] ? null : TODAY;
    await DB.update("reps", rep.id, { benchmarks: bm }); await reload();
  };

  return (
    <div>
      <Hdr e="ramp & onboarding" t="The journey" s="Section-by-section onboarding with benchmarks." a={<button onClick={() => setShowAdd(!showAdd)} className="bp"><Plus size={11} /> Add rep</button>} />
      {showAdd && <div className="cd fi" style={{ padding: 14, marginBottom: 10, display: "flex", gap: 8, alignItems: "flex-end" }}>
        <div style={{ flex: 2 }}><label className="mn lbl">Name</label><input value={newName} onChange={e => setNewName(e.target.value)} className="inp" placeholder="Full name" /></div>
        <div style={{ flex: 1 }}><label className="mn lbl">Role</label><select value={newRole} onChange={e => setNewRole(e.target.value)} className="inp"><option>SDR</option><option>AE</option><option>CSM</option></select></div>
        <div style={{ flex: 1 }}><label className="mn lbl">Region</label><select value={newRegion} onChange={e => setNewRegion(e.target.value)} className="inp"><option>NAM</option><option>EMEA</option><option>APAC</option><option>LATAM</option></select></div>
        <button onClick={addRep} className="bp" disabled={!newName}><Plus size={11} /> Add</button>
      </div>}
      <div style={{ display: "flex", gap: 5, marginBottom: 16, flexWrap: "wrap" }}>
        {data.reps.map(r => { const rp = repProg(r); const d = daysBtwn(r.start_date, TODAY); const missed = BM.filter(b => b.targetDays <= d && !r.benchmarks?.[b.id]).length; const col = rp.pct >= 100 ? "#059669" : missed ? "#dc2626" : "#d97706"; return (
          <button key={r.id} onClick={() => setSel(r.id)} style={{ padding: "8px 12px", background: sel === r.id ? "#09090b" : "white", color: sel === r.id ? "#fafafa" : "#09090b", border: `1.5px solid ${sel === r.id ? "#09090b" : "#e4e4e7"}`, borderRadius: 8, cursor: "pointer", fontFamily: "inherit", textAlign: "left", minWidth: 130, flex: "1 1 130px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}><span style={{ fontSize: 11, fontWeight: 600 }}>{r.name}</span><span className="mn" style={{ fontSize: 9, fontWeight: 700, color: col }}>{rp.pct}%</span></div>
            <div style={{ fontSize: 8, opacity: .6 }}>{r.role} · Day {d}</div>
            <div style={{ height: 3, background: sel === r.id ? "#27272a" : "#f4f4f5", borderRadius: 100, marginTop: 5, overflow: "hidden" }}><div style={{ width: `${rp.pct}%`, height: "100%", background: col, borderRadius: 100 }} /></div>
          </button>); })}
      </div>
      {rep && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <div className="mn" style={{ fontSize: 7, color: "#a1a1aa", letterSpacing: "0.16em", marginBottom: 8 }}>ONBOARDING — {p.done}/{p.total}</div>
          {OB.map(sec => { const it = rep.onboarding?.[sec.id] || []; const dn = it.filter(Boolean).length; const all = dn === sec.items.length; return (
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
          {BM.map(bm => { const ach = rep.benchmarks?.[bm.id]; const actD = ach ? daysBtwn(rep.start_date, ach) : null; const delta = actD !== null ? actD - bm.targetDays : null; const overdue = !ach && dIn > bm.targetDays; const overdueBy = overdue ? dIn - bm.targetDays : 0; let sC = "#a1a1aa", sBg = "#f4f4f5", sT = `Target: Day ${bm.targetDays}`; if (ach && delta !== null) { if (delta <= 0) { sC = "#059669"; sBg = "#ecfdf5"; sT = `Day ${actD} — ${Math.abs(delta)}d early`; } else { sC = "#d97706"; sBg = "#fffbeb"; sT = `Day ${actD} — ${delta}d late`; } } else if (overdue) { sC = "#dc2626"; sBg = "#fef2f2"; sT = `${overdueBy}d overdue`; } return (
            <div key={bm.id} className="cd ch-h" style={{ padding: 12, marginBottom: 5, display: "flex", alignItems: "center", gap: 10 }}>
              <button onClick={() => togBm(bm.id)} style={{ width: 22, height: 22, borderRadius: 5, border: `2px solid ${ach ? "#059669" : overdue ? "#dc2626" : "#d4d4d8"}`, background: ach ? "#059669" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>{ach && <Check size={11} color="white" strokeWidth={3} />}</button>
              <div style={{ flex: 1 }}><div style={{ fontSize: 11, fontWeight: 600, color: ach ? "#a1a1aa" : "#09090b", textDecoration: ach ? "line-through" : "none" }}>{bm.label}</div><div className="mn" style={{ fontSize: 8, marginTop: 2 }}><span style={{ padding: "1px 6px", background: sBg, color: sC, borderRadius: 100, fontWeight: 600 }}>{sT}</span></div></div>
            </div>); })}
        </div>
      </div>}
      {data.reps.length === 0 && <div className="cd" style={{ padding: 40, textAlign: "center", color: "#71717a" }}><div style={{ fontSize: 13, marginBottom: 8 }}>No reps yet.</div><div style={{ fontSize: 11 }}>Click "Add rep" above to get started.</div></div>}
    </div>
  );
}

/* ═══ 1:1 NOTES ═══ */
function NotesView({ data, userId, reload }) {
  const [sel, setSel] = useState(data.reps[0]?.id);
  const [note, setNote] = useState("");
  const [agenda, setAgenda] = useState("");
  const [busy, setBusy] = useState(false);
  const rep = data.reps.find(r => r.id === sel);
  const repNotes = data.notes.filter(n => n.rep_id === sel).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const addNote = async () => {
    if (!note.trim() || busy || !rep) return; setBusy(true);
    let analysis;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 500, messages: [{ role: "user", content: `AI inside EnableOS. Rep: ${rep.name} (${rep.role}). Note: "${note}". Respond ONLY JSON: {"sentiment":"concern"/"positive"/"neutral","suggestion":"max 20 words","tag":"2-3 words","session_idea":"title or null"}` }] }) });
      const d = await res.json(); analysis = JSON.parse(d.content.map(i => i.text || "").join("").replace(/```json|```/g, "").trim());
    } catch { analysis = aiFallback(note); }
    await DB.insert("notes", { user_id: userId, rep_id: sel, content: note, agenda, sentiment: analysis.sentiment, suggestion: analysis.suggestion, tag: analysis.tag, session_idea: analysis.session_idea || analysis.sessionIdea || null });
    setNote(""); setAgenda(""); setBusy(false); await reload();
  };

  const sty = { concern: { bg: "#fef2f2", c: "#dc2626", i: AlertCircle }, positive: { bg: "#ecfdf5", c: "#059669", i: CheckCircle2 }, neutral: { bg: "#f4f4f5", c: "#71717a", i: Circle } };

  return (
    <div>
      <Hdr e="1:1 notes" t="The real signal" s="AI-analyzed. Shared agendas." />
      {data.reps.length === 0 ? <div className="cd" style={{ padding: 40, textAlign: "center", color: "#71717a", fontSize: 12 }}>Add reps first in Ramp & Onboarding.</div> :
      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 14 }}>
        <div>{data.reps.map(r => <button key={r.id} onClick={() => setSel(r.id)} style={{ width: "100%", padding: 10, background: sel === r.id ? "#09090b" : "white", color: sel === r.id ? "#fafafa" : "#09090b", border: `1.5px solid ${sel === r.id ? "#09090b" : "#e4e4e7"}`, borderRadius: 8, marginBottom: 4, cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}><div style={{ fontSize: 11, fontWeight: 600 }}>{r.name}</div><div style={{ fontSize: 9, opacity: .6 }}>{r.role}</div></button>)}</div>
        <div>
          <div className="cd" style={{ padding: 14, marginBottom: 10 }}>
            <div className="dp" style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{rep?.name}</div>
            <div style={{ marginBottom: 8 }}><label className="mn lbl">AGENDA (shared)</label><textarea value={agenda} onChange={e => setAgenda(e.target.value)} placeholder="Review pipeline..." style={{ width: "100%", minHeight: 50, padding: 8, border: "1.5px solid #e4e4e7", borderRadius: 7, fontSize: 10, resize: "vertical", fontFamily: "inherit", marginTop: 3, lineHeight: 1.5 }} /></div>
            <div><label className="mn lbl">NOTES (private)</label><textarea value={note} onChange={e => setNote(e.target.value)} placeholder="What came up? Be specific." style={{ width: "100%", minHeight: 60, padding: 8, border: "1.5px solid #e4e4e7", borderRadius: 7, fontSize: 10, resize: "vertical", fontFamily: "inherit", marginTop: 3, lineHeight: 1.5 }} /></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
              <div style={{ fontSize: 9, color: "#a1a1aa", display: "flex", alignItems: "center", gap: 4 }}><Sparkles size={10} color="#8b5cf6" /> AI analysis</div>
              <button onClick={addNote} className="bp" disabled={!note.trim() || busy}>{busy ? <><Loader2 size={10} className="sp" /> Analyzing...</> : <><Plus size={10} /> Save</>}</button>
            </div>
          </div>
          {repNotes.map(n => { const st = sty[n.sentiment] || sty.neutral; const Icon = st.i; return (
            <div key={n.id} className="cd" style={{ padding: 14, marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "flex", gap: 4 }}><Chip bg={st.bg} c={st.c}><Icon size={8} /> {n.sentiment}</Chip>{n.tag && <Chip bg="#ede9fe" c="#6366f1">{n.tag}</Chip>}</div>
                <span className="mn" style={{ fontSize: 8, color: "#a1a1aa" }}>{new Date(n.created_at).toLocaleDateString()}</span>
              </div>
              {n.agenda && <div style={{ padding: 8, background: "#fafaf9", border: "1px solid #f4f4f5", borderRadius: 6, marginBottom: 8, fontSize: 10, whiteSpace: "pre-wrap" }}>{n.agenda}</div>}
              <div style={{ fontSize: 11, lineHeight: 1.6, marginBottom: 10 }}>{n.content}</div>
              <div style={{ borderTop: "1px solid #f4f4f5", paddingTop: 8, display: "flex", gap: 8 }}>
                <div style={{ width: 18, height: 18, borderRadius: 5, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Sparkles size={8} color="white" /></div>
                <div><div className="mn" style={{ fontSize: 7, color: "#a1a1aa" }}>AI</div><div style={{ fontSize: 11, fontWeight: 600 }}>{n.suggestion}</div></div>
              </div>
            </div>); })}
        </div>
      </div>}
    </div>
  );
}

/* ═══ COLLATERALS ═══ */
function CollView({ data, userId, reload }) {
  const [bkt, setBkt] = useState("All");
  const [show, setShow] = useState(false);
  const filtered = data.collaterals.filter(c => bkt === "All" || c.bucket === bkt);
  const bktCts = {}; data.collaterals.forEach(c => { bktCts[c.bucket] = (bktCts[c.bucket] || 0) + 1; });
  const addC = async (item) => { await DB.insert("collaterals", { user_id: userId, title: item.title, bucket: item.bucket }); setShow(false); await reload(); };
  const bump = async (id, current) => { await DB.update("collaterals", id, { uses: current + 1 }); await reload(); };

  return (
    <div>
      <Hdr e="collaterals" t="The library" s="Usage tracked." a={<button onClick={() => setShow(!show)} className="bp"><Plus size={11} /> Add</button>} />
      <div style={{ display: "flex", gap: 4, marginBottom: 12, flexWrap: "wrap" }}>{COLL_BUCKETS.map(b => { const ct = b === "All" ? data.collaterals.length : (bktCts[b] || 0); if (b !== "All" && !ct) return null; return <button key={b} onClick={() => setBkt(b)} className={bkt === b ? "fb act" : "fb"}>{b} <span className="mn" style={{ fontSize: 8, opacity: .7 }}>{ct}</span></button>; })}</div>
      {show && <div className="cd fi" style={{ padding: 16, marginBottom: 10, background: "#09090b", color: "#fafafa", border: "none", borderRadius: 12 }}>
        <CollForm onSubmit={addC} onClose={() => setShow(false)} />
      </div>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
        {filtered.map(c => (
          <div key={c.id} className="cd" style={{ padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><Chip bg="#ede9fe" c="#6366f1">{c.bucket}</Chip></div>
            <div className="dp" style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>{c.title}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderTop: "1px solid #f4f4f5", paddingTop: 8 }}>
              <div><div className="mn" style={{ fontSize: 7, color: "#a1a1aa" }}>USES</div><div className="mn" style={{ fontSize: 18, fontWeight: 700 }}>{c.uses}</div></div>
              <button onClick={() => bump(c.id, c.uses)} className="bs" style={{ padding: "3px 8px", fontSize: 8 }}>+1 use</button>
            </div>
          </div>))}
      </div>
      {data.collaterals.length === 0 && <div className="cd" style={{ padding: 40, textAlign: "center", color: "#71717a", fontSize: 12 }}>No collaterals yet. Add your first.</div>}
    </div>
  );
}
function CollForm({ onSubmit, onClose }) {
  const [f, sF] = useState({ title: "", bucket: "Battle Card" });
  return (<div><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><div className="dp" style={{ fontSize: 14, fontWeight: 700 }}>New collateral</div><button onClick={onClose} style={{ background: "none", border: "none", color: "#fafafa", cursor: "pointer" }}><X size={13} /></button></div>
    <div style={{ marginBottom: 8 }}><label className="mn lbl">Title</label><input value={f.title} onChange={e => sF({...f,title:e.target.value})} className="inp di" /></div>
    <div style={{ marginBottom: 12 }}><label className="mn lbl">Bucket</label><div style={{ display: "flex", gap: 3, marginTop: 4, flexWrap: "wrap" }}>{COLL_BUCKETS.filter(x=>x!=="All").map(t => <button key={t} onClick={() => sF({...f,bucket:t})} style={{ padding: "3px 8px", background: f.bucket === t ? "#8b5cf6" : "transparent", color: f.bucket === t ? "white" : "#fafafa", border: `1px solid ${f.bucket === t ? "#8b5cf6" : "#27272a"}`, borderRadius: 100, fontSize: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>{t}</button>)}</div></div>
    <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}><button onClick={onClose} className="bs" style={{ color: "#fafafa", borderColor: "#27272a" }}>Cancel</button><button onClick={() => f.title && onSubmit(f)} className="bp" style={{ background: "#8b5cf6" }} disabled={!f.title}><Plus size={10} /> Add</button></div>
  </div>);
}

/* ═══ SESSIONS ═══ */
function SessionsView({ data, userId, reload }) {
  const [show, setShow] = useState(false);
  const upcoming = data.sessions.filter(s => s.status === "upcoming");
  const completed = data.sessions.filter(s => s.status === "completed");
  const addS = async (sess) => { await DB.insert("sessions", { user_id: userId, title: sess.title, date: sess.date || null, type: sess.type, attendees: parseInt(sess.attendees) || 0 }); setShow(false); await reload(); };
  const markDone = async (id) => { await DB.update("sessions", id, { status: "completed" }); await reload(); };

  return (
    <div>
      <Hdr e="sessions" t="The calendar" s="Schedule. Track. Prove." a={<button onClick={() => setShow(!show)} className="bp"><Plus size={11} /> Schedule</button>} />
      {show && <div className="cd fi" style={{ padding: 16, marginBottom: 10, background: "#09090b", color: "#fafafa", border: "none", borderRadius: 12 }}>
        <SessForm onSubmit={addS} onClose={() => setShow(false)} />
      </div>}
      <div className="mn" style={{ fontSize: 7, color: "#a1a1aa", letterSpacing: "0.16em", marginBottom: 6 }}>UPCOMING</div>
      {upcoming.map(s => <div key={s.id} className="cd ch-h" style={{ padding: 12, display: "flex", alignItems: "center", gap: 12, marginBottom: 5 }}><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 600 }}>{s.title}</div><div style={{ fontSize: 9, color: "#a1a1aa" }}>{s.type} · {s.date} · {s.attendees} ppl</div></div><button onClick={() => markDone(s.id)} className="bs" style={{ padding: "4px 10px", fontSize: 9 }}><CheckCircle2 size={10} /> Done</button></div>)}
      {!upcoming.length && <div className="cd" style={{ padding: 20, color: "#a1a1aa", fontSize: 11 }}>Nothing scheduled.</div>}
      {completed.length > 0 && <><div className="mn" style={{ fontSize: 7, color: "#a1a1aa", letterSpacing: "0.16em", marginBottom: 6, marginTop: 16 }}>COMPLETED</div>{completed.map(s => <div key={s.id} className="cd" style={{ padding: 12, marginBottom: 5, opacity: .6, display: "flex", alignItems: "center" }}><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 600 }}>{s.title}</div><div style={{ fontSize: 9, color: "#a1a1aa" }}>{s.type} · {s.date}</div></div><Chip bg="#ecfdf5" c="#059669">done</Chip></div>)}</>}
    </div>
  );
}
function SessForm({ onSubmit, onClose }) {
  const [f, sF] = useState({ title: "", date: "", type: "Workshop", attendees: 0 });
  return (<div><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><div className="dp" style={{ fontSize: 14, fontWeight: 700 }}>Schedule session</div><button onClick={onClose} style={{ background: "none", border: "none", color: "#fafafa", cursor: "pointer" }}><X size={13} /></button></div>
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 8, marginBottom: 8 }}><div><label className="mn lbl">Title</label><input value={f.title} onChange={e => sF({...f,title:e.target.value})} className="inp di" /></div><div><label className="mn lbl">Date</label><input type="date" value={f.date} onChange={e => sF({...f,date:e.target.value})} className="inp di" /></div></div>
    <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}><button onClick={onClose} className="bs" style={{ color: "#fafafa", borderColor: "#27272a" }}>Cancel</button><button onClick={() => f.title && onSubmit(f)} className="bp" style={{ background: "#8b5cf6" }} disabled={!f.title}><Send size={10} /> Go</button></div>
  </div>);
}

/* ═══ PULSE ═══ */
function PulseView({ data, userId, reload }) {
  return (
    <div>
      <Hdr e="pulse checks" t="Team confidence" s="Coming in next update — use the demo mode artifact for now." />
      <div className="cd" style={{ padding: 40, textAlign: "center", color: "#71717a", fontSize: 12 }}>Pulse checks with Supabase integration shipping next. The demo artifact has full functionality.</div>
    </div>
  );
}

/* ═══ PLANNING ═══ */
function PlanView({ data, userId, reload }) {
  const [newT, setNewT] = useState("");
  const [newC, setNewC] = useState("must");
  const cols = [{ id: "must", l: "Must Do", c: "#dc2626" },{ id: "should", l: "Should Do", c: "#d97706" },{ id: "could", l: "Could Do", c: "#6366f1" }];
  const add = async () => { if (!newT.trim()) return; await DB.insert("todos", { user_id: userId, text: newT, col: newC }); setNewT(""); await reload(); };
  const tog = async (id, current) => { await DB.update("todos", id, { done: !current }); await reload(); };
  const move = async (id, col) => { await DB.update("todos", id, { col }); await reload(); };
  const del = async (id) => { await DB.remove("todos", id); await reload(); };
  const dc = data.todos.filter(t => t.done).length, tc = data.todos.length;

  return (
    <div>
      <Hdr e="weekly planning" t="Your week" s="Must / Should / Could." />
      <div className="cd" style={{ padding: 12, marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ flex: 1 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontSize: 11, fontWeight: 600 }}>Progress</span><span className="mn" style={{ fontSize: 11, fontWeight: 700 }}>{dc}/{tc}</span></div><div style={{ height: 5, background: "#f4f4f5", borderRadius: 100 }}><div style={{ width: `${tc ? (dc/tc)*100 : 0}%`, height: "100%", background: "linear-gradient(90deg,#6366f1,#8b5cf6)", borderRadius: 100 }} /></div></div>
        <div className="mn" style={{ fontSize: 18, fontWeight: 700, color: dc === tc && tc > 0 ? "#059669" : "#09090b" }}>{tc ? Math.round(dc/tc*100) : 0}%</div>
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
            {active.map(t => <div key={t.id} className="cd" style={{ padding: 8, marginBottom: 4, display: "flex", alignItems: "flex-start", gap: 6 }}>
              <button onClick={() => tog(t.id, t.done)} style={{ width: 16, height: 16, borderRadius: 4, border: "1.5px solid #d4d4d8", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, marginTop: 1 }} />
              <div style={{ flex: 1, fontSize: 10, lineHeight: 1.4 }}>{t.text}</div>
              <button onClick={() => del(t.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#a1a1aa", padding: 1 }}><Trash2 size={10} /></button>
            </div>)}
            {done.map(t => <div key={t.id} className="cd" style={{ padding: 8, marginBottom: 4, display: "flex", alignItems: "flex-start", gap: 6, opacity: .5 }}>
              <button onClick={() => tog(t.id, t.done)} style={{ width: 16, height: 16, borderRadius: 4, border: "1.5px solid #059669", background: "#059669", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, marginTop: 1 }}><Check size={9} color="white" strokeWidth={3} /></button>
              <div style={{ flex: 1, fontSize: 10, lineHeight: 1.4, textDecoration: "line-through", color: "#a1a1aa" }}>{t.text}</div>
            </div>)}
          </div>); })}
      </div>
    </div>
  );
}

/* ═══ FORECAST ═══ */
function ForecastView({ data, userId, reload }) {
  const [show, setShow] = useState(false);
  const stCfg = { "in-progress": { l: "In Progress", c: "#6366f1" }, scheduled: { l: "Scheduled", c: "#d97706" }, planned: { l: "Planned", c: "#71717a" }, backlog: { l: "Backlog", c: "#a1a1aa" }, done: { l: "Done", c: "#059669" } };
  const impCfg = { critical: { c: "#dc2626" }, high: { c: "#d97706" }, medium: { c: "#6366f1" }, low: { c: "#a1a1aa" } };
  const addP = async (proj) => { await DB.insert("forecast", { user_id: userId, ...proj }); setShow(false); await reload(); };
  const upd = async (id, status) => { await DB.update("forecast", id, { status }); await reload(); };

  return (
    <div>
      <Hdr e="forecasting" t="Project pipeline" s="Every enablement project tracked." a={<button onClick={() => setShow(!show)} className="bp"><Plus size={11} /> Add</button>} />
      {show && <div className="cd fi" style={{ padding: 16, marginBottom: 10, background: "#09090b", color: "#fafafa", border: "none", borderRadius: 12 }}>
        <FcForm onSubmit={addP} onClose={() => setShow(false)} />
      </div>}
      {["in-progress","scheduled","planned","backlog","done"].map(status => { const items = data.forecast.filter(f => f.status === status); if (!items.length) return null; const sc = stCfg[status]; return (
        <div key={status} style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}><div style={{ width: 6, height: 6, borderRadius: 2, background: sc.c }} /><span style={{ fontSize: 11, fontWeight: 600 }}>{sc.l}</span></div>
          {items.map(f => { const ic = impCfg[f.impact] || impCfg.medium; return (
            <div key={f.id} className="cd ch-h" style={{ padding: 12, marginBottom: 5, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 3, height: 32, background: ic.c, borderRadius: 2, flexShrink: 0 }} />
              <div style={{ flex: 1 }}><div style={{ display: "flex", gap: 4, marginBottom: 2 }}><Chip bg={ic.c+"18"} c={ic.c}>{f.impact}</Chip>{f.eta && <span style={{ fontSize: 9, color: "#a1a1aa" }}>ETA: {f.eta}</span>}</div><div style={{ fontSize: 12, fontWeight: 600 }}>{f.title}</div>{f.notes && <div style={{ fontSize: 9, color: "#71717a", marginTop: 2 }}>{f.notes}</div>}</div>
              <select value={f.status} onChange={e => upd(f.id, e.target.value)} className="sel">{Object.entries(stCfg).map(([k, v]) => <option key={k} value={k}>{v.l}</option>)}</select>
            </div>); })}
        </div>); })}
      {data.forecast.length === 0 && <div className="cd" style={{ padding: 40, textAlign: "center", color: "#71717a", fontSize: 12 }}>No projects yet.</div>}
    </div>
  );
}
function FcForm({ onSubmit, onClose }) {
  const [f, sF] = useState({ title: "", status: "planned", impact: "medium", eta: "", notes: "" });
  return (<div><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><div className="dp" style={{ fontSize: 14, fontWeight: 700 }}>Add project</div><button onClick={onClose} style={{ background: "none", border: "none", color: "#fafafa", cursor: "pointer" }}><X size={13} /></button></div>
    <div style={{ marginBottom: 8 }}><label className="mn lbl">Title</label><input value={f.title} onChange={e => sF({...f,title:e.target.value})} className="inp di" /></div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
      <div><label className="mn lbl">Status</label><select value={f.status} onChange={e => sF({...f,status:e.target.value})} className="inp di"><option value="in-progress">In Progress</option><option value="scheduled">Scheduled</option><option value="planned">Planned</option><option value="backlog">Backlog</option></select></div>
      <div><label className="mn lbl">Impact</label><select value={f.impact} onChange={e => sF({...f,impact:e.target.value})} className="inp di"><option value="critical">Critical</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select></div>
      <div><label className="mn lbl">ETA</label><input type="date" value={f.eta} onChange={e => sF({...f,eta:e.target.value})} className="inp di" /></div>
    </div>
    <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}><button onClick={onClose} className="bs" style={{ color: "#fafafa", borderColor: "#27272a" }}>Cancel</button><button onClick={() => f.title && onSubmit(f)} className="bp" style={{ background: "#8b5cf6" }} disabled={!f.title}><Plus size={10} /> Add</button></div>
  </div>);
}

/* ═══ LEADERBOARDS ═══ */
function LBView({ data, userId, reload }) {
  return (
    <div>
      <Hdr e="leaderboards" t="Who's winning" s="Coming in next update — use the demo artifact for full leaderboard functionality." />
      <div className="cd" style={{ padding: 40, textAlign: "center", color: "#71717a", fontSize: 12 }}>Leaderboards with Supabase integration shipping next. The demo artifact has full functionality.</div>
    </div>
  );
}

/* ═══ CSS ═══ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
*{box-sizing:border-box;margin:0}body{margin:0}
.dp{font-family:'Instrument Serif',Georgia,serif;letter-spacing:-0.01em}.mn{font-family:'JetBrains Mono',monospace}
.cd{background:white;border:1px solid #e4e4e7;border-radius:10px}
.ch-h{transition:all .2s}.ch-h:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,0,0,.03)}
.bp{background:#09090b;color:#fafafa;border:none;padding:7px 14px;border-radius:7px;font-weight:600;cursor:pointer;font-size:10px;display:inline-flex;align-items:center;gap:4px;font-family:inherit;transition:all .15s}.bp:hover{background:#18181b}.bp:disabled{opacity:.4;cursor:not-allowed}
.bs{background:transparent;color:#09090b;border:1.5px solid #d4d4d8;padding:7px 14px;border-radius:7px;font-weight:500;cursor:pointer;font-size:10px;display:inline-flex;align-items:center;gap:4px;font-family:inherit}.bs:hover{border-color:#09090b}
.lk{background:none;border:none;color:#71717a;font-size:9px;font-weight:600;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:2px;padding:0}.lk:hover{color:#09090b}
.inp{background:white;border:1.5px solid #e4e4e7;border-radius:7px;padding:8px 10px;font-size:11px;width:100%;font-family:inherit;color:#09090b}.inp:focus{outline:none;border-color:#09090b}
.di{background:#18181b!important;color:#fafafa!important;border:1.5px solid #27272a!important}
.sel{padding:5px 7px;border:1.5px solid #e4e4e7;border-radius:5px;font-size:9px;background:white;font-family:inherit;font-weight:600}
.ch{display:inline-flex;align-items:center;gap:2px;padding:2px 7px;border-radius:100px;font-size:7px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;white-space:nowrap}
.lbl{font-size:7px;letter-spacing:0.12em;color:#a1a1aa;display:block;margin-bottom:2px}
.ni{width:100%;display:flex;align-items:center;gap:8px;padding:6px 10px;background:transparent;color:#a1a1aa;border:none;border-radius:7px;cursor:pointer;font-size:10px;font-weight:500;text-align:left;font-family:inherit;transition:all .12s}.ni:hover{color:#fafafa;background:rgba(255,255,255,.05)}.ni.act{color:#fafafa;background:rgba(255,255,255,.08);font-weight:600}
.fb{padding:5px 10px;background:white;color:#71717a;border:1.5px solid #e4e4e7;border-radius:100px;font-size:9px;font-weight:600;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:4px}.fb.act{background:#09090b;color:#fafafa;border-color:#09090b}
@keyframes su{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.fi{animation:su .3s cubic-bezier(.16,1,.3,1)}
@keyframes pg{0%,100%{opacity:1}50%{opacity:.4}}.ld{animation:pg 2s ease-in-out infinite}
@keyframes sp{to{transform:rotate(360deg)}}.sp{animation:sp 1s linear infinite}
::selection{background:#8b5cf6;color:white}textarea{font-family:inherit}
`;
