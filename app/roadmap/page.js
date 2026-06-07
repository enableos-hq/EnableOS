'use client';

function Logo() {
  return (
    <a href="/" className="rm-logo">
      <svg viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg" style={{height:40,width:'auto'}}>
        <defs>
          <linearGradient id="rG1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#BDA9FF"/><stop offset="100%" stopColor="#9B7EFF"/></linearGradient>
          <linearGradient id="rG2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#9B7EFF"/><stop offset="100%" stopColor="#7C5CFC"/></linearGradient>
          <linearGradient id="rG3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#7C5CFC"/><stop offset="100%" stopColor="#5B3EDB"/></linearGradient>
        </defs>
        <rect x="20" y="20" width="52" height="9" rx="2.5" fill="url(#rG1)" opacity="0.55"/>
        <rect x="26" y="35" width="52" height="12" rx="2.5" fill="url(#rG2)" opacity="0.8"/>
        <rect x="32" y="53" width="52" height="16" rx="2.5" fill="url(#rG3)"/>
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
    </a>
  );
}

const ROADMAP = [
  {
    id: 'live', label: 'Live in Your Workspace', emoji: '✅',
    sub: 'Available now in every client workspace',
    accent: '#8FDD96', accentBg: 'rgba(143, 221, 150, 0.15)',
    items: [
      { title: 'Dashboard', desc: 'Live stats — open requests, ramping reps, must-do tasks, and ramp snapshot at a glance.' },
      { title: 'Intake & Prioritisation', desc: 'Auto-score every request: Impact × Urgency ÷ Effort. No more guessing what to build next.' },
      { title: 'Ramp & Onboarding', desc: 'Per-rep checklists across 5 sections. Track who is ready and who needs support before the QBR.' },
      { title: '1:1 Notes with AI', desc: 'Shared agenda + private coaching notes. AI flags confidence drops and suggests coaching actions.' },
      { title: 'Collaterals Library', desc: 'One source of truth for every battle card, playbook, and deck — with usage tracking.' },
      { title: 'Sessions', desc: 'Schedule and track training sessions, workshops, and certifications.' },
      { title: 'Pulse Checks', desc: 'Multi-question surveys with rating scales, multiple choice, and free text. Track team sentiment.' },
      { title: 'Coaching Scores', desc: 'Monthly deep-dive across cold emails, calls, demos, and negotiations — per rep, tracked over time.' },
      { title: 'Weekly Planning', desc: 'Must Do / Should Do / Could Do kanban. Check things off and track completion rate.' },
      { title: 'Forecasting', desc: 'Drag-and-drop kanban for enablement projects: Backlog → Planned → In Progress → Done.' },
      { title: 'Leaderboards', desc: 'Track and celebrate rep performance. Create boards for any metric.' },
    ]
  },
  {
    id: 'next', label: 'Building Next', emoji: '🔨',
    sub: 'Active development — coming to your workspace soon',
    accent: '#FFD466', accentBg: 'rgba(255, 212, 102, 0.15)',
    items: [
      { title: 'HubSpot & Salesforce Sync', desc: 'Connect your CRM so rep data, pipeline metrics, and deal stages flow into your workspace automatically.' },
      { title: 'Slack Integration', desc: 'Submit intake requests from Slack. Get notifications when high-priority requests come in.' },
      { title: 'Public Intake Portal', desc: 'Share a branded link — anyone can submit enablement requests without logging in.' },
      { title: 'Gong Call Ingestion', desc: 'Pull call themes and coaching gaps from Gong recordings directly into 1:1 notes.' },
      { title: 'Client Welcome Page', desc: 'A personalised setup summary that greets new workspace users with what has been built and why.' },
    ]
  },
  {
    id: 'soon', label: 'Coming Soon', emoji: '🚀',
    sub: 'Designed, prioritised, and on the horizon',
    accent: '#B89DFF', accentBg: 'rgba(184, 157, 255, 0.15)',
    items: [
      { title: 'Mobile App', desc: 'Quick coaching on the go — check ramp progress, review 1:1 notes, and log check-ins from your phone.' },
      { title: 'AI Next-Best-Action', desc: 'Recommendations for what to coach, who to check in on, and which content needs updating — powered by your data.' },
      { title: 'Multi-Region Workspaces', desc: 'Separate onboarding tracks and content libraries for APAC, EMEA, and NAM — all under one roof.' },
      { title: 'Custom Dashboards & Exports', desc: 'Build the view leadership wants to see. Export reports as PDF for quarterly reviews.' },
      { title: 'Enablement ROI Dashboard', desc: 'Connect content usage to deal outcomes. Finally prove which assets actually moved pipeline.' },
      { title: 'Template Library', desc: 'Pre-built onboarding tracks, pulse check templates, and session frameworks — ready to drop into any workspace.' },
    ]
  },
];

export default function RoadmapPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: rmStyles }} />
      <div className="rm-wrap">
        <nav className="rm-nav">
          <div className="rm-nav-left">
            <Logo />
            <span className="rm-breadcrumb">/ Platform Roadmap</span>
          </div>
          <div className="rm-nav-right">
            <a href="/" className="rm-nav-link">← Back to site</a>
            <a href="https://calendly.com/enableos-hq/30min" target="_blank" rel="noreferrer" className="rm-nav-cta">Book a call</a>
          </div>
        </nav>

        <header className="rm-header">
          <span className="rm-eyebrow">Platform Roadmap</span>
          <h1 className="rm-h1">What&apos;s inside your workspace — <em>and what&apos;s coming.</em></h1>
          <p className="rm-sub">Every feature below is part of the platform your workspace runs on. When I set up your workspace, I configure these for your team&apos;s sales motion. As new features ship, they become available to all client workspaces.</p>
        </header>

        <div className="rm-sections">
          {ROADMAP.map(section => (
            <section key={section.id} className="rm-section" id={section.id}>
              <div className="rm-section-header">
                <div className="rm-status" style={{ background: section.accentBg, color: section.accent }}>
                  <span>{section.emoji}</span> {section.label}
                </div>
                <span className="rm-count">{section.items.length} features</span>
              </div>
              <p className="rm-section-sub">{section.sub}</p>
              <div className="rm-grid">
                {section.items.map((item, i) => (
                  <div key={i} className="rm-card" style={{ borderTopColor: section.accent + '30' }}>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="rm-cta-section">
          <h2>Want to see this in action?</h2>
          <p>Book a discovery call and I&apos;ll show you what your workspace would look like — configured for your team, your process, your gaps.</p>
          <a href="https://calendly.com/enableos-hq/30min" target="_blank" rel="noreferrer" className="rm-cta-btn">Book a discovery call →</a>
        </div>

        <footer className="rm-footer">
          <span>© 2026 EnableOS. Built in Bangalore.</span>
          <div className="rm-footer-links">
            <a href="/">Home</a>
            <a href="mailto:enableos.hq@gmail.com">Contact</a>
            <a href="https://www.linkedin.com/in/vedikaagarwal00/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </footer>
      </div>
    </>
  );
}

const rmStyles = `
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Sora:wght@300;400;500;600;700&display=swap');
body { margin: 0; font-family: 'Sora', sans-serif; background: #1a1235; color: #F5F0FF; -webkit-font-smoothing: antialiased; }
* { box-sizing: border-box; }
a { text-decoration: none; color: inherit; }

.rm-wrap { max-width: 960px; margin: 0 auto; padding: 0 32px; min-height: 100vh; }

.rm-nav { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; border-bottom: 1px solid rgba(245,240,255,0.08); margin-bottom: 48px; }
.rm-nav-left { display: flex; align-items: center; gap: 14px; }
.rm-breadcrumb { font-family: 'Libre Baskerville', serif; font-style: italic; font-size: 14px; color: #8b82a0; }
.rm-nav-right { display: flex; align-items: center; gap: 16px; }
.rm-nav-link { font-size: 13px; color: #A8A0C0; }
.rm-nav-link:hover { color: #F5F0FF; }
.rm-nav-cta { background: #F5F0FF; color: #1a1235; padding: 8px 18px; border-radius: 8px; font-size: 13px; font-weight: 600; }

.rm-header { text-align: center; margin-bottom: 56px; max-width: 680px; margin-left: auto; margin-right: auto; }
.rm-eyebrow { display: inline-flex; align-items: center; gap: 10px; font-size: 11px; font-weight: 500; letter-spacing: 2.5px; text-transform: uppercase; color: #A8A0C0; margin-bottom: 20px; }
.rm-eyebrow::before, .rm-eyebrow::after { content: ''; width: 24px; height: 1px; background: #9B7EFF; }
.rm-h1 { font-family: 'Libre Baskerville', serif; font-size: 40px; line-height: 1.15; font-weight: 400; margin: 0 0 18px; color: #F5F0FF; letter-spacing: -0.5px; }
.rm-h1 em { font-style: italic; color: #FFFAF0; }
.rm-sub { font-size: 15px; color: #A8A0C0; line-height: 1.7; font-weight: 300; }

.rm-sections { display: flex; flex-direction: column; gap: 48px; margin-bottom: 56px; }
.rm-section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.rm-status { display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; border-radius: 100px; font-size: 12px; font-weight: 700; letter-spacing: 0.5px; }
.rm-count { font-size: 12px; color: #6B6385; }
.rm-section-sub { font-size: 13px; color: #8b82a0; margin-bottom: 18px; font-weight: 300; }

.rm-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 14px; }
.rm-card { background: rgba(245,240,255,0.04); border: 1px solid rgba(245,240,255,0.08); border-top: 3px solid; border-radius: 12px; padding: 20px; }
.rm-card h3 { font-family: 'Libre Baskerville', serif; font-size: 16px; font-weight: 700; margin: 0 0 8px; color: #F5F0FF; }
.rm-card p { font-size: 13px; color: #A8A0C0; line-height: 1.6; margin: 0; font-weight: 300; }

.rm-cta-section { text-align: center; padding: 48px 0; border-top: 1px solid rgba(245,240,255,0.08); margin-bottom: 32px; }
.rm-cta-section h2 { font-family: 'Libre Baskerville', serif; font-size: 28px; font-weight: 400; color: #F5F0FF; margin: 0 0 12px; }
.rm-cta-section p { font-size: 15px; color: #A8A0C0; line-height: 1.65; max-width: 480px; margin: 0 auto 24px; font-weight: 300; }
.rm-cta-btn { display: inline-block; background: #F5F0FF; color: #1a1235; padding: 14px 32px; border-radius: 10px; font-size: 15px; font-weight: 600; }

.rm-footer { padding: 24px 0; border-top: 1px solid rgba(245,240,255,0.08); display: flex; justify-content: space-between; font-size: 12px; color: #6B6385; }
.rm-footer-links { display: flex; gap: 20px; }
.rm-footer-links a { color: #8b82a0; }
.rm-footer-links a:hover { color: #F5F0FF; }

@media (max-width: 768px) {
  .rm-wrap { padding: 0 18px; }
  .rm-h1 { font-size: 28px; }
  .rm-grid { grid-template-columns: 1fr; }
  .rm-nav-link { display: none; }
  .rm-footer { flex-direction: column; gap: 12px; text-align: center; }
  .rm-footer-links { justify-content: center; }
}
`;
