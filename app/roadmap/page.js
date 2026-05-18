'use client';

const ROADMAP = [
  {
    id: 'live',
    label: 'Live Now',
    emoji: '✅',
    sub: 'Shipped and in your hands',
    accent: '#8FDD96',
    accentBg: 'rgba(143, 221, 150, 0.15)',
    count: 11,
    items: [
      { title: 'Dashboard', desc: 'Live stats — open requests, ramping reps, must-do tasks, and a ramp snapshot at a glance.' },
      { title: 'Intake & Prioritisation', desc: 'Auto-score every request by Impact × Urgency ÷ Effort. Filter by category, status, and owner.' },
      { title: 'Ramp & Onboarding', desc: 'Per-rep checklists across 5 sections: Culture, Sales Process, Product, Outbound, Certification.' },
      { title: '1:1 Notes', desc: 'Shared agenda plus private notes per rep. Claude AI flags confidence drops and recurring blockers.' },
      { title: 'Collaterals Library', desc: 'One source of truth. Battle cards, playbooks, and decks — tagged, searchable, usage-tracked.' },
      { title: 'Sessions Tracker', desc: 'Schedule and track training sessions, workshops, and certifications with AI gap detection.' },
      { title: 'Pulse Checks', desc: 'Weekly confidence scores from reps. Coach the right thing before it becomes a pipeline problem.' },
      { title: 'Weekly Planning', desc: 'Must / Should / Could prioritisation. Plan the week like you mean it.' },
      { title: 'Forecasting', desc: 'Deal cards across pipeline stages. Coverage, risk, and what to coach before the quarter ends.' },
      { title: 'Leaderboards', desc: "President's Club tracker. Visibility that motivates without spreadsheets." },
      { title: 'Workspace Settings', desc: 'Invite teammates, manage roles, and configure your workspace from one screen.' },
    ]
  },
  {
    id: 'next',
    label: 'Up Next',
    emoji: '🔨',
    sub: 'Actively being built',
    accent: '#FFD466',
    accentBg: 'rgba(255, 212, 102, 0.15)',
    count: 5,
    items: [
      { title: 'Drag-and-drop Forecast', desc: 'Move deal cards between pipeline stages with a single drag. No extra clicks, no forms.' },
      { title: 'Pulse Check Question Types', desc: 'Multiple choice, rating scales, free text — design pulse checks that actually fit your team.' },
      { title: 'Deep-dive Coaching Scores', desc: 'Rate reps across emails, cold calls, demos, and negotiations every month. Coach from the lows up.' },
      { title: 'AI Sentiment on 1:1 Notes', desc: 'Claude AI surfaces confidence trends, recurring blockers, and what to address before the next 1:1.' },
      { title: 'Public Intake Portal', desc: 'Share a link, no login. Stakeholders submit requests directly into your prioritised queue.' },
    ]
  },
  {
    id: 'soon',
    label: 'Coming Soon',
    emoji: '📅',
    sub: 'Shipping next quarter',
    accent: '#FF9F70',
    accentBg: 'rgba(255, 159, 112, 0.15)',
    count: 6,
    items: [
      { title: 'HubSpot Integration', desc: 'Auto-pull rep activity, deals, and contact data. Enablement and revenue finally in sync.' },
      { title: 'Salesforce Integration', desc: 'Bi-directional sync for deals and opportunities. Your forecast lives where your reps live.' },
      { title: 'Slack /enable Command', desc: 'Submit intake requests without leaving Slack. No context switch, no form, no friction.' },
      { title: 'Gong Call Ingestion', desc: 'Pull call transcripts and surface coaching gaps automatically. AI flags what to work on next.' },
      { title: 'Outreach Integration', desc: 'Cadence performance, sequence health, and rep outbound activity — one view.' },
      { title: 'Mobile App', desc: 'Log coaching notes on the go. iOS and Android, fully synced with your workspace.' },
    ]
  },
  {
    id: 'later',
    label: 'On the Horizon',
    emoji: '🌅',
    sub: "What we're exploring",
    accent: '#B89DFF',
    accentBg: 'rgba(184, 157, 255, 0.17)',
    count: 7,
    items: [
      { title: 'AI Next-best-action', desc: 'Per-rep coaching recommendations based on pipeline, call scores, and pulse history.' },
      { title: 'Multi-region Workspaces', desc: 'Separate views for NAM, EMEA, APAC. Global visibility, regional execution.' },
      { title: 'Custom Dashboards', desc: 'Drag-and-drop widgets, your metrics, your layout. Export or share with leadership.' },
      { title: 'CSV Exports & API', desc: 'Pull EnableOS data into your stack — Power BI, Looker, or your own data warehouse.' },
      { title: 'Slack-based Pulse Checks', desc: 'Auto-poll reps weekly via Slack DMs. Responses flow directly into your dashboard.' },
      { title: 'Manager 1:1 View', desc: 'Roll up coaching themes across teams. Hierarchical visibility for sales leaders.' },
      { title: 'Floating Sticky Note Onboarding', desc: 'Cursive handwriting guides that float next to each feature. Onboarding that feels considered.' },
    ]
  }
];

function Logo() {
  return (
    <a href="/" className="rm-logo-wrap" aria-label="EnableOS">
      <svg viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg" className="rm-logo-svg">
        <defs>
          <linearGradient id="rmG1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#BDA9FF"/>
            <stop offset="100%" stopColor="#9B7EFF"/>
          </linearGradient>
          <linearGradient id="rmG2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9B7EFF"/>
            <stop offset="100%" stopColor="#7C5CFC"/>
          </linearGradient>
          <linearGradient id="rmG3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7C5CFC"/>
            <stop offset="100%" stopColor="#5B3EDB"/>
          </linearGradient>
        </defs>
        <rect x="20" y="20" width="52" height="9" rx="2.5" fill="url(#rmG1)" opacity="0.55"/>
        <rect x="26" y="35" width="52" height="12" rx="2.5" fill="url(#rmG2)" opacity="0.8"/>
        <rect x="32" y="53" width="52" height="16" rx="2.5" fill="url(#rmG3)"/>
        <line x1="26" y1="35" x2="20" y2="29" stroke="#BDA9FF" strokeWidth="0.8" opacity="0.45"/>
        <line x1="32" y1="53" x2="26" y2="47" stroke="#9B7EFF" strokeWidth="0.8" opacity="0.5"/>
        <line x1="78" y1="35" x2="72" y2="29" stroke="#BDA9FF" strokeWidth="0.8" opacity="0.45"/>
        <line x1="84" y1="53" x2="78" y2="47" stroke="#9B7EFF" strokeWidth="0.8" opacity="0.5"/>
        <circle cx="79" cy="61" r="3" fill="#ffffff" opacity="0.9"/>
        <circle cx="70" cy="61" r="3" fill="#BDA9FF" opacity="0.7"/>
        <text x="102" y="68" fontFamily="'Libre Baskerville', Georgia, serif" fontSize="38" fontWeight="400" fill="#F5F0FF" letterSpacing="-0.02em">
          Enable<tspan fontWeight="700" fill="#BDA9FF">OS</tspan>
        </text>
      </svg>
      <span className="rm-logo-sep">/</span>
      <span className="rm-logo-page">Roadmap</span>
    </a>
  );
}

export default function RoadmapPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="rm-wrap">

        <nav className="rm-nav">
          <Logo />
          <div className="rm-nav-right">
            <a href="https://tally.so/r/kdRgXd" className="rm-nav-ghost">Submit request</a>
            <a href="/login" className="rm-nav-cta">Sign in</a>
          </div>
        </nav>

        <section className="rm-hero">
          <span className="rm-eyebrow">Built in public</span>
          <h1 className="rm-h1">What&apos;s coming to <em>EnableOS</em></h1>
          <p className="rm-sub">We ship fast and build in public. Here&apos;s what&apos;s live, what&apos;s being built right now, and what&apos;s on the horizon. Your feedback moves things up the list.</p>
          <a href="https://tally.so/r/kdRgXd" className="rm-hero-cta">Join the waitlist →</a>
          <div className="rm-pills">
            {ROADMAP.map(s => (
              <a key={s.id} href={`#${s.id}`} className="rm-pill" style={{ '--pill-color': s.accent, '--pill-bg': s.accentBg }}>
                <span>{s.emoji}</span>
                <span>{s.label}</span>
                <span className="rm-pill-count">{s.count}</span>
              </a>
            ))}
          </div>
        </section>

        <div className="rm-divider" />

        {ROADMAP.map(section => (
          <section key={section.id} id={section.id} className="rm-section">
            <div className="rm-section-head">
              <span className="rm-status-pill" style={{ '--sc': section.accent, '--sb': section.accentBg }}>
                <span className="rm-status-dot" />
                {section.label}
              </span>
              <p className="rm-section-sub">{section.sub}</p>
            </div>
            <div className="rm-grid">
              {section.items.map(item => (
                <div key={item.title} className="rm-card">
                  <h3 className="rm-card-title">{item.title}</h3>
                  <p className="rm-card-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="rm-cta-section" id="submit">
          <div className="rm-cta-inner">
            <span className="rm-eyebrow">Shape the product</span>
            <h2 className="rm-h2">Want to influence what we build next?</h2>
            <p className="rm-cta-sub">EnableOS is free for the first 20 users. Get early access, submit feature requests inside the platform, and help us decide what ships first.</p>
            <a href="https://tally.so/r/kdRgXd" className="rm-cta-btn">Get early access →</a>
          </div>
        </section>

        <footer className="rm-footer">
          <div className="rm-footer-inner">
            <div className="rm-footer-top">
              <div className="rm-footer-brand">
                <a href="/" className="rm-logo-wrap">
                  <svg viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg" className="rm-logo-svg">
                    <defs>
                      <linearGradient id="rmFG1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#BDA9FF"/><stop offset="100%" stopColor="#9B7EFF"/></linearGradient>
                      <linearGradient id="rmFG2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#9B7EFF"/><stop offset="100%" stopColor="#7C5CFC"/></linearGradient>
                      <linearGradient id="rmFG3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#7C5CFC"/><stop offset="100%" stopColor="#5B3EDB"/></linearGradient>
                    </defs>
                    <rect x="20" y="20" width="52" height="9" rx="2.5" fill="url(#rmFG1)" opacity="0.55"/>
                    <rect x="26" y="35" width="52" height="12" rx="2.5" fill="url(#rmFG2)" opacity="0.8"/>
                    <rect x="32" y="53" width="52" height="16" rx="2.5" fill="url(#rmFG3)"/>
                    <line x1="26" y1="35" x2="20" y2="29" stroke="#BDA9FF" strokeWidth="0.8" opacity="0.45"/>
                    <line x1="32" y1="53" x2="26" y2="47" stroke="#9B7EFF" strokeWidth="0.8" opacity="0.5"/>
                    <line x1="78" y1="35" x2="72" y2="29" stroke="#BDA9FF" strokeWidth="0.8" opacity="0.45"/>
                    <line x1="84" y1="53" x2="78" y2="47" stroke="#9B7EFF" strokeWidth="0.8" opacity="0.5"/>
                    <circle cx="79" cy="61" r="3" fill="#ffffff" opacity="0.9"/>
                    <circle cx="70" cy="61" r="3" fill="#BDA9FF" opacity="0.7"/>
                    <text x="102" y="68" fontFamily="'Libre Baskerville', Georgia, serif" fontSize="38" fontWeight="400" fill="#F5F0FF" letterSpacing="-0.02em">Enable<tspan fontWeight="700" fill="#BDA9FF">OS</tspan></text>
                  </svg>
                </a>
                <p className="rm-footer-tag">The operating system for enablement. Built for the one person running it all.</p>
              </div>
              <div className="rm-footer-cols">
                <div className="rm-footer-col">
                  <h4>Product</h4>
                  <a href="/#features">Features</a>
                  <a href="/roadmap">Roadmap</a>
                  <a href="/#stats">Why now</a>
                </div>
                <div className="rm-footer-col">
                  <h4>Get started</h4>
                  <a href="https://tally.so/r/kdRgXd">Early access</a>
                  <a href="/login">Sign in</a>
                </div>
                <div className="rm-footer-col">
                  <h4>Contact</h4>
                  <a href="mailto:hello@enableos.app">hello@enableos.app</a>
                  <a href="https://www.linkedin.com/in/vedikaagarwal00/" target="_blank" rel="noreferrer">LinkedIn</a>
                </div>
              </div>
            </div>
            <div className="rm-footer-bottom">
              <span>© 2026 EnableOS. Built in Bangalore.</span>
              <span>Made for solo enablement hires everywhere.</span>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Sora:wght@300;400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: 'Sora', sans-serif; -webkit-font-smoothing: antialiased; }
a { text-decoration: none; color: inherit; cursor: pointer; }

::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: #1a1235; }
::-webkit-scrollbar-thumb { background: rgba(155, 126, 255, 0.4); border-radius: 5px; }

.rm-wrap {
  --plum: #1a1235;
  --cream: #F5F0FF;
  --cream-muted: #A8A0C0;
  --cream-faint: #6B6385;
  --border: rgba(245, 240, 255, 0.1);
  --lavender: #9B7EFF;
  background: var(--plum);
  color: var(--cream);
  min-height: 100vh;
}

.rm-nav { display: flex; justify-content: space-between; align-items: center; padding: 14px 48px; border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 10; backdrop-filter: blur(14px); background: rgba(26, 18, 53, 0.82); }
.rm-nav-right { display: flex; align-items: center; gap: 16px; }
.rm-nav-ghost { font-size: 13px; color: var(--cream-muted); font-weight: 500; padding: 8px 16px; border-radius: 8px; border: 1px solid var(--border); transition: border-color 0.2s, color 0.2s; }
.rm-nav-ghost:hover { color: var(--cream); border-color: rgba(155, 126, 255, 0.4); }
.rm-nav-cta { font-size: 13px; font-weight: 600; color: var(--plum); background: var(--cream); padding: 8px 18px; border-radius: 8px; transition: opacity 0.2s; }
.rm-nav-cta:hover { opacity: 0.88; }

.rm-logo-wrap { display: inline-flex; align-items: center; gap: 14px; height: 40px; }
.rm-logo-svg { height: 100%; width: auto; display: block; overflow: visible; }
.rm-logo-sep { font-family: 'Libre Baskerville', serif; font-size: 20px; font-weight: 300; color: var(--cream-faint); line-height: 1; }
.rm-logo-page { font-family: 'Libre Baskerville', serif; font-style: italic; font-size: 18px; font-weight: 400; color: var(--cream-muted); line-height: 1; }

.rm-hero { text-align: center; padding: 96px 48px 72px; max-width: 760px; margin: 0 auto; }
.rm-eyebrow { display: inline-flex; align-items: center; gap: 10px; font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 600; color: var(--lavender); border: 1px solid rgba(155, 126, 255, 0.3); padding: 6px 16px; border-radius: 100px; margin-bottom: 28px; background: rgba(155, 126, 255, 0.08); }
.rm-h1 { font-family: 'Libre Baskerville', serif; font-size: 58px; font-weight: 400; line-height: 1.06; letter-spacing: -1.5px; color: var(--cream); margin-bottom: 22px; }
.rm-h1 em { font-style: italic; color: var(--lavender); }
.rm-sub { font-size: 16px; color: var(--cream-muted); line-height: 1.7; font-weight: 300; max-width: 540px; margin: 0 auto 36px; }
.rm-hero-cta { display: inline-block; background: var(--cream); color: var(--plum); font-size: 15px; font-weight: 600; padding: 15px 32px; border-radius: 11px; transition: transform 0.2s; margin-bottom: 44px; box-shadow: 0 20px 50px -15px rgba(0,0,0,0.45); }
.rm-hero-cta:hover { transform: translateY(-2px); }

.rm-pills { display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; }
.rm-pill { display: inline-flex; align-items: center; gap: 8px; padding: 9px 18px; border-radius: 100px; font-size: 13px; font-weight: 500; background: var(--pill-bg, rgba(245,240,255,0.06)); color: var(--pill-color, var(--cream-muted)); border: 1px solid color-mix(in oklab, var(--pill-color, #9B7EFF), transparent 60%); transition: transform 0.15s; }
.rm-pill:hover { transform: translateY(-1px); }
.rm-pill-count { background: color-mix(in oklab, var(--pill-color, #9B7EFF), transparent 70%); color: var(--pill-color, var(--cream)); font-size: 11px; font-weight: 700; padding: 2px 7px; border-radius: 100px; }

.rm-divider { height: 1px; background: var(--border); max-width: 1200px; margin: 0 auto; }

.rm-section { max-width: 1200px; margin: 0 auto; padding: 72px 48px; border-bottom: 1px solid var(--border); scroll-margin-top: 80px; }
.rm-section-head { display: flex; align-items: center; gap: 18px; margin-bottom: 36px; }
.rm-status-pill { display: inline-flex; align-items: center; gap: 8px; padding: 7px 14px; border-radius: 100px; font-size: 12px; font-weight: 700; letter-spacing: 0.5px; background: var(--sb); color: var(--sc); white-space: nowrap; }
.rm-status-dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; box-shadow: 0 0 8px currentColor; }
.rm-section-sub { font-size: 14px; color: var(--cream-faint); font-weight: 300; }

.rm-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.rm-card { background: rgba(245, 240, 255, 0.03); border: 1px solid var(--border); border-radius: 14px; padding: 26px; transition: background 0.2s, transform 0.2s; }
.rm-card:hover { background: rgba(245, 240, 255, 0.055); transform: translateY(-2px); }
.rm-card-title { font-family: 'Libre Baskerville', serif; font-size: 18px; font-weight: 700; color: var(--cream); margin-bottom: 10px; line-height: 1.3; }
.rm-card-desc { font-size: 13px; color: var(--cream-muted); line-height: 1.65; font-weight: 300; }

.rm-cta-section { padding: 96px 48px; text-align: center; }
.rm-cta-inner { max-width: 600px; margin: 0 auto; }
.rm-h2 { font-family: 'Libre Baskerville', serif; font-size: 42px; font-weight: 400; line-height: 1.1; letter-spacing: -1px; color: var(--cream); margin-bottom: 18px; }
.rm-cta-sub { font-size: 15px; color: var(--cream-muted); line-height: 1.7; font-weight: 300; margin-bottom: 36px; }
.rm-cta-btn { display: inline-block; background: var(--cream); color: var(--plum); font-size: 16px; font-weight: 600; padding: 18px 40px; border-radius: 12px; transition: transform 0.2s; box-shadow: 0 20px 50px -15px rgba(0,0,0,0.45); }
.rm-cta-btn:hover { transform: translateY(-2px); }

.rm-footer { border-top: 1px solid var(--border); padding: 64px 48px 32px; background: rgba(26, 18, 53, 0.6); backdrop-filter: blur(12px); }
.rm-footer-inner { max-width: 1200px; margin: 0 auto; }
.rm-footer-top { display: grid; grid-template-columns: 1.4fr 2fr; gap: 64px; padding-bottom: 40px; border-bottom: 1px solid var(--border); }
.rm-footer-brand .rm-logo-wrap { margin-bottom: 18px; }
.rm-footer-tag { font-size: 14px; color: var(--cream-muted); line-height: 1.65; max-width: 320px; font-weight: 300; }
.rm-footer-cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
.rm-footer-col h4 { font-family: 'Sora', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--cream-faint); font-weight: 600; margin-bottom: 16px; }
.rm-footer-col a { display: block; font-size: 14px; color: var(--cream-muted); padding: 6px 0; font-weight: 300; transition: color 0.2s; }
.rm-footer-col a:hover { color: var(--cream); }
.rm-footer-bottom { padding-top: 26px; display: flex; justify-content: space-between; font-size: 12px; color: var(--cream-faint); font-weight: 300; }

@media (max-width: 768px) {
  .rm-nav { padding: 12px 22px; }
  .rm-logo-page { display: none; }
  .rm-logo-sep { display: none; }
  .rm-hero { padding: 64px 22px 48px; }
  .rm-h1 { font-size: 36px; }
  .rm-sub { font-size: 15px; }
  .rm-pills { gap: 8px; }
  .rm-pill { font-size: 12px; padding: 8px 14px; }
  .rm-section { padding: 48px 22px; }
  .rm-grid { grid-template-columns: 1fr; gap: 12px; }
  .rm-section-head { flex-direction: column; align-items: flex-start; gap: 8px; }
  .rm-h2 { font-size: 30px; }
  .rm-cta-section { padding: 64px 22px; }
  .rm-footer { padding: 48px 22px 28px; }
  .rm-footer-top { grid-template-columns: 1fr; gap: 32px; padding-bottom: 32px; }
  .rm-footer-cols { grid-template-columns: 1fr 1fr; gap: 20px; }
  .rm-footer-bottom { flex-direction: column; gap: 10px; text-align: center; }
}
`;
