"use client";
import { useState, useEffect, useRef } from "react";
import { Layers, ArrowRight, CheckCircle2, Inbox, TrendingUp, MessageSquare, BookOpen, Calendar, Activity, ListTodo, BarChart3, Trophy, ChevronDown } from "lucide-react";

function useInView(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

const FEATURES = [
  { icon: Inbox, label: "Intake", title: "Stop being the Slack help desk", desc: "Every request auto-scored by impact, urgency, and effort. Bucketed by type. You decide what gets built.", color: "#dc2626" },
  { icon: TrendingUp, label: "Ramp Tracker", title: "Know exactly where every rep is", desc: "Section-by-section onboarding. Benchmarks for first call, first MQL, first SQL. Days ahead or behind.", color: "#d97706" },
  { icon: MessageSquare, label: "1:1 Notes", title: "AI that reads between the lines", desc: "Log every 1:1. AI analyzes sentiment, suggests actions, flags team-wide gaps. Shared agendas for reps.", color: "#6366f1" },
  { icon: BookOpen, label: "Collaterals", title: "Your library, with receipts", desc: "Battle cards, frameworks, one-pagers tracked by usage. Add impact stories to prove ROI.", color: "#059669" },
  { icon: Calendar, label: "Sessions", title: "Sessions from data, not guesses", desc: "AI detects gaps across 1:1 notes and suggests sessions. Schedule, track, prove outcomes.", color: "#8b5cf6" },
  { icon: Activity, label: "Pulse Checks", title: "Confidence scores before they become problems", desc: "Quick 1-5 surveys. Spot drops across the team before they hit pipeline.", color: "#0ea5e9" },
  { icon: ListTodo, label: "Weekly Planning", title: "Must do. Should do. Could do.", desc: "Priority task board. Check off, move between columns. See your weekly completion rate.", color: "#f59e0b" },
  { icon: BarChart3, label: "Forecasting", title: "Your enablement project pipeline", desc: "Every project tracked by status, impact, and ETA. Show leadership what you deliver.", color: "#ec4899" },
  { icon: Trophy, label: "Leaderboards", title: "Make performance visible", desc: "Weekly, quarterly, ramp speed, collateral usage. Create any board. President Club tracker.", color: "#f59e0b" },
];

const PAINS = ["Ramp tracking on spreadsheets","Playbooks scattered across Notion and Drive","Session planning in your head","Implementation tracking via gut feel","Collateral requests over Slack and email","Pulse checks via random Google Forms","No way to connect training to revenue"];

export default function Page() {
  const [scrollY, setScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => { setScrollY(window.scrollY); setScrolled(window.scrollY > 50); }; window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);

  return (
    <div style={{ background: "#09090b", color: "#fafafa", minHeight: "100vh", fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <style>{CSS}</style>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "16px 40px", background: scrolled ? "rgba(9,9,11,0.85)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", WebkitBackdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid #1e1e1e" : "1px solid transparent", transition: "all 0.3s", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}><div className="logo-i"><Layers size={14} color="white" /></div><span className="dp" style={{ fontSize: 20 }}>Enable<b>OS</b></span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="/login" className="btn-g">Log in</a>
          <a href="#waitlist" className="btn-p">Join waitlist <ArrowRight size={12} /></a>
        </div>
      </nav>
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div className="hero-glow" />
        <div style={{ opacity: Math.max(0, 1 - scrollY / 600), transform: `translateY(${scrollY * 0.3}px)`, position: "relative", zIndex: 1 }}>
          <div className="mn" style={{ fontSize: 11, color: "#6366f1", letterSpacing: "0.2em", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><span style={{ width: 24, height: 1, background: "#6366f1", display: "inline-block" }} /> NOW IN EARLY ACCESS <span style={{ width: 24, height: 1, background: "#6366f1", display: "inline-block" }} /></div>
          <h1 className="dp" style={{ fontSize: "clamp(40px,6vw,76px)", fontWeight: 400, lineHeight: 1, margin: "0 auto", maxWidth: 800, letterSpacing: "-0.03em" }}>The operating system<br />for <span className="gt">enablement</span></h1>
          <p style={{ fontSize: 18, color: "#a1a1aa", marginTop: 24, maxWidth: 520, lineHeight: 1.6, margin: "24px auto 0" }}>Built by a solo enablement hire who got tired of managing ramp tracking on spreadsheets, playbooks on Notion, and session planning in her head.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 36, flexWrap: "wrap" }}><a href="#waitlist" className="btn-hero">Join the waitlist <ArrowRight size={16} /></a><a href="#features" className="btn-hero-s">See features <ChevronDown size={14} /></a></div>
          <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 48, opacity: 0.5, flexWrap: "wrap" }}>{["9 features","AI-powered","Built for solo enablers","Free early access"].map((t, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#71717a" }}><CheckCircle2 size={12} color="#6366f1" /> {t}</div>)}</div>
        </div>
      </section>
      <ProblemSection />
      <section id="features" style={{ padding: "80px 0 40px" }}>
        <div style={{ textAlign: "center", padding: "0 24px", marginBottom: 64 }}><div className="mn" style={{ fontSize: 10, color: "#6366f1", letterSpacing: "0.2em", marginBottom: 16 }}>THE PLATFORM</div><h2 className="dp" style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 400, lineHeight: 1.15 }}>9 features. One system.<br /><span style={{ color: "#71717a" }}>Zero spreadsheets.</span></h2></div>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px" }}>{FEATURES.map((f, i) => <FeatureCard key={i} feat={f} index={i} />)}</div>
      </section>
      <WaitlistSection />
      <footer style={{ padding: "40px 24px", borderTop: "1px solid #1a1a1e", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1000, margin: "0 auto", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}><div className="logo-s"><Layers size={12} color="white" /></div><span className="dp" style={{ fontSize: 16 }}>Enable<b>OS</b></span><span style={{ fontSize: 11, color: "#52525b" }}>enableos.app</span></div>
        <div style={{ fontSize: 11, color: "#52525b" }}>Built with obsession. 2026</div>
      </footer>
    </div>
  );
}

function ProblemSection() {
  const ref = useRef(null); const visible = useInView(ref, 0.1);
  return (
    <section ref={ref} style={{ padding: "120px 24px", maxWidth: 900, margin: "0 auto" }}>
      <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}><div className="mn" style={{ fontSize: 10, color: "#6366f1", letterSpacing: "0.2em", marginBottom: 16 }}>THE PROBLEM</div><h2 className="dp" style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 400, lineHeight: 1.15, marginBottom: 48, maxWidth: 600 }}>You are the only enablement hire.<br /><span style={{ color: "#71717a" }}>Your tech stack is duct tape.</span></h2></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{PAINS.map((p, i) => <PainItem key={i} text={p} index={i} parentVisible={visible} />)}</div>
      <div style={{ marginTop: 64, padding: "32px 40px", borderRadius: 16, background: "linear-gradient(135deg,rgba(99,102,241,0.08),rgba(139,92,246,0.05))", border: "1px solid #1e1e1e", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s" }}><div className="dp" style={{ fontSize: 24, fontWeight: 400, lineHeight: 1.4 }}>EnableOS replaces <em>all of it</em> with one system designed for the person doing the actual work. <span style={{ color: "#a78bfa" }}>You.</span></div></div>
    </section>
  );
}

function PainItem({ text, index, parentVisible }) {
  const [struck, setStruck] = useState(false);
  useEffect(() => { if (parentVisible) { const t = setTimeout(() => setStruck(true), 400 + index * 200); return () => clearTimeout(t); } }, [parentVisible, index]);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 24px", background: struck ? "rgba(99,102,241,0.05)" : "#0f0f11", border: `1px solid ${struck ? "#2e2e3a" : "#1a1a1e"}`, borderRadius: 12, transition: "all 0.5s", opacity: parentVisible ? 1 : 0, transform: parentVisible ? "translateX(0)" : "translateX(-30px)", transitionDelay: `${index * 0.1}s` }}>
      <div style={{ width: 24, height: 24, borderRadius: "50%", background: struck ? "#6366f1" : "#1e1e1e", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", flexShrink: 0 }}>{struck ? <CheckCircle2 size={14} color="white" /> : <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#dc2626", display: "block" }} />}</div>
      <span style={{ fontSize: 16, color: struck ? "#71717a" : "#fafafa", fontWeight: 500, textDecoration: struck ? "line-through" : "none", transition: "all 0.4s", flex: 1 }}>{text}</span>
      {struck && <span className="mn" style={{ fontSize: 9, color: "#6366f1", letterSpacing: "0.1em" }}>SOLVED</span>}
    </div>
  );
}

function FeatureCard({ feat, index }) {
  const ref = useRef(null); const visible = useInView(ref, 0.2); const isEven = index % 2 === 0; const Icon = feat.icon;
  return (
    <div ref={ref} className="feat-row" style={{ display: "flex", alignItems: "flex-start", flexDirection: isEven ? "row" : "row-reverse", gap: 48, padding: "48px 0", borderBottom: "1px solid #1a1a1e", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)" }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}><div style={{ width: 36, height: 36, borderRadius: 10, background: feat.color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={18} color={feat.color} /></div><span className="mn" style={{ fontSize: 10, color: feat.color, letterSpacing: "0.12em" }}>{feat.label.toUpperCase()}</span></div>
        <h3 className="dp" style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.2, marginBottom: 14 }}>{feat.title}</h3>
        <p style={{ fontSize: 15, color: "#a1a1aa", lineHeight: 1.7, margin: 0 }}>{feat.desc}</p>
      </div>
      <div style={{ flex: 1, minHeight: 200, borderRadius: 16, background: `linear-gradient(135deg,${feat.color}08,${feat.color}04)`, border: "1px solid #1e1e1e", padding: 24, display: "flex", alignItems: "center", justifyContent: "center", transform: visible ? "scale(1)" : "scale(0.95)", transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>
        <div style={{ textAlign: "center" }}><Icon size={48} color={feat.color} strokeWidth={1} style={{ opacity: 0.6, marginBottom: 12 }} /><div className="mn" style={{ fontSize: 28, fontWeight: 700, color: feat.color }}>{feat.label}</div></div>
      </div>
    </div>
  );
}

function WaitlistSection() {
  const ref = useRef(null); const visible = useInView(ref, 0.1);
  return (
    <section id="waitlist" ref={ref} style={{ padding: "120px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: "10%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.1) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)", position: "relative", zIndex: 1 }}>
        <div className="mn" style={{ fontSize: 10, color: "#6366f1", letterSpacing: "0.2em", marginBottom: 16 }}>EARLY ACCESS</div>
        <h2 className="dp" style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 16 }}>Get in before everyone else<span style={{ color: "#8b5cf6" }}>.</span></h2>
        <p style={{ fontSize: 16, color: "#71717a", maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.6 }}>First 20 teams get free access forever. No credit card. No strings.</p>
        <div style={{ maxWidth: 560, margin: "0 auto", borderRadius: 16, overflow: "hidden", border: "1px solid #27272a", background: "#0f0f11" }}><iframe src="https://tally.so/r/kdRgXd?transparentBackground=1" width="100%" height="500" frameBorder="0" style={{ border: "none", background: "transparent" }} title="EnableOS Waitlist" /></div>
        <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 32, opacity: 0.5, flexWrap: "wrap" }}>{["No credit card","Free for early users","Shape the product"].map((t, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#71717a" }}><CheckCircle2 size={12} color="#6366f1" /> {t}</div>)}</div>
      </div>
    </section>
  );
}

const CSS = `
*{box-sizing:border-box;margin:0}body{margin:0;background:#09090b}html{scroll-behavior:smooth}
.dp{font-family:'Instrument Serif',Georgia,serif;letter-spacing:-0.01em}.mn{font-family:'JetBrains Mono',monospace}
::selection{background:#8b5cf6;color:white}
.gt{font-style:italic;background:linear-gradient(135deg,#a78bfa,#6366f1);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.logo-i{width:28px;height:28px;border-radius:7px;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center}
.logo-s{width:24px;height:24px;border-radius:6px;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center}
.btn-g{background:transparent;color:#a1a1aa;border:1px solid #27272a;padding:8px 18px;border-radius:8px;font-size:12px;font-weight:500;cursor:pointer;font-family:inherit;text-decoration:none;transition:all .2s}.btn-g:hover{border-color:#fafafa;color:#fafafa}
.btn-p{background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;border:none;padding:8px 20px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;text-decoration:none;display:inline-flex;align-items:center;gap:6px}
.btn-hero{background:white;color:#09090b;padding:14px 32px;border-radius:12px;font-size:15px;font-weight:600;font-family:inherit;text-decoration:none;display:inline-flex;align-items:center;gap:8px;box-shadow:0 0 40px rgba(99,102,241,0.3);transition:all .2s}.btn-hero:hover{transform:translateY(-2px);box-shadow:0 0 60px rgba(99,102,241,0.4)}
.btn-hero-s{background:transparent;color:#a1a1aa;border:1px solid #27272a;padding:14px 28px;border-radius:12px;font-size:15px;font-weight:500;font-family:inherit;text-decoration:none;display:inline-flex;align-items:center;gap:8px}
.hero-glow{position:absolute;top:20%;left:50%;transform:translate(-50%,-50%);width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.12) 0%,transparent 70%);pointer-events:none}
@media(max-width:768px){.feat-row{flex-direction:column!important;gap:24px!important}nav{padding:12px 20px!important}}
`;
