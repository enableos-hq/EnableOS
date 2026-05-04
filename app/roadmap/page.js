'use client'

const S = {
  primary: '#7C5CFC',
  primaryHover: '#9B7EFF',
  primaryLight: '#BDA9FF',
  accentBg: '#F0ECFF',
  accentBg2: '#E8E0FF',
  ink: '#1a1235',
  inkSecondary: '#4a4162',
  muted: '#8b82a0',
  border: '#E2DCF0',
  canvas: '#FDFBFF',
  success: '#059669',
  warning: '#d97706',
  error: '#dc2626',
}

const BUCKETS = [
  {
    id: 'live',
    emoji: '✅',
    label: 'Live Now',
    tagline: 'Shipped and in your hands',
    color: S.success,
    colorBg: '#d1fae5',
    items: [
      { title: 'Dashboard', desc: 'Live stats — open requests, ramping reps, must-do tasks, ramp snapshot.' },
      { title: 'Intake & Prioritisation', desc: 'Auto-score every request by Impact × Urgency ÷ Effort. Filter by category.' },
      { title: 'Ramp & Onboarding', desc: 'Per-rep checklists across 5 sections: Culture, Sales Process, Product, Outbound, Certification.' },
      { title: '1:1 Notes', desc: 'Shared agenda + private notes per rep, with Claude AI sentiment analysis and session suggestions.' },
      { title: 'Collaterals Library', desc: 'Asset library with usage tracking. Battle cards, frameworks, templates, sequences, guides.' },
      { title: 'Sessions Tracker', desc: 'Schedule and track training sessions, workshops, and certifications.' },
      { title: 'Pulse Checks', desc: 'Create multi-question pulse checks to track team readiness and sentiment.' },
      { title: 'Weekly Planning', desc: 'Must / Should / Could kanban columns. Full week completion tracker.' },
      { title: 'Forecasting', desc: 'Kanban-style enablement project pipeline: Backlog → Planned → In Progress → Done.' },
      { title: 'Leaderboards', desc: 'Custom performance boards for any metric. Gold/silver/bronze rankings with progress bars.' },
      { title: 'Feature Requests', desc: 'Vote on what we build next. Submit your own requests directly from the platform.' },
    ],
  },
  {
    id: 'next',
    emoji: '🔨',
    label: 'Up Next',
    tagline: 'Building now or starting soon',
    color: S.primary,
    colorBg: S.accentBg2,
    items: [
      { title: 'Intake Form (Google Form-style)', desc: 'A clean, standalone public form for submitting enablement requests — no login required. Sections, scales, category selector.', tag: 'UX' },
      { title: 'Public Roadmap', desc: 'This page — live and linkable so early users can see exactly what\'s coming.', tag: 'Transparency' },
      { title: 'Interactive Onboarding Walkthrough', desc: 'Step-by-step overlay on first login. Shows where everything is and how it helps. Next / Skip controls.', tag: 'Onboarding' },
      { title: 'Member Invites', desc: 'Admins can invite other admins or members to their workspace. Role-based access.', tag: 'Collaboration' },
      { title: 'Isolated Workspaces', desc: 'Full data isolation — nothing from one workspace is visible in any other workspace.', tag: 'Security' },
    ],
  },
  {
    id: 'soon',
    emoji: '📅',
    label: 'Coming Soon',
    tagline: 'Planned for the next few months',
    color: S.warning,
    colorBg: '#fef3c7',
    items: [
      { title: 'AI Gap Detection from Sessions', desc: 'After logging a session, Claude surfaces patterns across rep notes to find coaching blind spots.', tag: 'AI' },
      { title: 'Rep Profile Pages', desc: 'Full per-rep view combining ramp progress, pulse scores, 1:1 history, and forecast in one place.' },
      { title: 'Email Notifications', desc: 'Get notified when a new intake request comes in, or when a pulse score drops below your threshold.' },
      { title: 'Playbook Builder', desc: 'Build structured playbooks inside EnableOS — stop linking out to Google Docs.' },
      { title: 'Custom Ramp Templates', desc: 'Build reusable onboarding templates and apply them to new reps in one click.' },
      { title: 'Mobile View', desc: 'Responsive layout for checking in on reps from your phone.' },
    ],
  },
  {
    id: 'later',
    emoji: '🗺️',
    label: 'On the Horizon',
    tagline: 'Longer-term — your votes shape the order',
    color: '#8b5cf6',
    colorBg: '#ede9fe',
    items: [
      { title: 'Gong Integration', desc: 'Pull call themes and talk-time data directly into rep profiles and session logs.', tag: 'Integration' },
      { title: 'HubSpot / Salesforce Sync', desc: 'Live pipeline data in forecasting without manual entry.', tag: 'Integration' },
      { title: 'Slack Integration', desc: 'Pulse check reminders, weekly summaries, intake notifications — all in Slack.', tag: 'Integration' },
      { title: 'Enablement Health Score', desc: 'One score per rep combining ramp progress, pulse, notes frequency, and forecast attainment.' },
      { title: 'Content Analytics', desc: 'Track which collaterals are used, by whom, and correlate usage with rep performance.' },
      { title: 'Public Rep Portal', desc: 'A branded portal where reps can self-serve playbooks, submit pulses, and track their own ramp.', tag: 'Big Bet' },
      { title: 'SOC 2 Type II', desc: 'Enterprise security compliance for teams that need it.', tag: 'Security' },
    ],
  },
]

function Tag({ label, color }) {
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100,
      background: color + '18', color: color,
      border: `1px solid ${color}30`,
      fontFamily: 'Sora, sans-serif',
      letterSpacing: '0.04em', textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}>{label}</span>
  )
}

export default function RoadmapPage() {
  return (
    <div style={{ minHeight: '100vh', background: S.canvas, fontFamily: 'Sora, sans-serif' }}>

      {/* Top nav */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(253,251,255,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${S.border}`,
        padding: '0 32px', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: `linear-gradient(135deg, ${S.primary}, ${S.primaryHover})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="27" width="52" height="12" rx="2.5" fill="white" opacity="0.8"/>
                <rect x="12" y="45" width="52" height="16" rx="2.5" fill="white"/>
              </svg>
            </div>
            <span style={{ fontFamily: 'Libre Baskerville, serif', fontSize: 15, fontWeight: 700, color: S.ink }}>EnableOS</span>
          </a>
          <span style={{ color: S.border, fontSize: 18 }}>/</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: S.inkSecondary }}>Roadmap</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <a href="/intake-form" style={{ padding: '7px 16px', borderRadius: 8, border: `1px solid ${S.border}`, background: '#fff', color: S.inkSecondary, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Submit Request</a>
          <a href="/login" style={{ padding: '7px 16px', borderRadius: 8, background: S.primary, color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Sign in</a>
        </div>
      </div>

      {/* Hero */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '56px 24px 40px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-block', padding: '4px 14px', borderRadius: 100,
          background: S.accentBg2, border: `1px solid ${S.primary}30`,
          fontSize: 12, fontWeight: 700, color: S.primary,
          textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20,
        }}>
          Built in public
        </div>
        <h1 style={{ fontFamily: 'Libre Baskerville, serif', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, color: S.ink, lineHeight: 1.2, marginBottom: 16 }}>
          What's coming to <span style={{ color: S.primary }}>EnableOS</span>
        </h1>
        <p style={{ fontSize: 16, color: S.muted, lineHeight: 1.75, maxWidth: 520, margin: '0 auto 28px' }}>
          We ship fast and build in public. Here's what's live, what's being built right now, and what's on the horizon. Your feedback moves things up the list.
        </p>
        <a href="https://tally.so/r/kdRgXd" target="_blank" rel="noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '11px 24px', borderRadius: 9,
          background: `linear-gradient(135deg, ${S.primary}, ${S.primaryHover})`,
          color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none',
          boxShadow: '0 4px 16px rgba(124,92,252,0.35)',
        }}>
          Join the waitlist →
        </a>
      </div>

      {/* Legend */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px 32px', display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        {BUCKETS.map(b => (
          <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '6px 14px', borderRadius: 100, background: b.colorBg, border: `1px solid ${b.color}30` }}>
            <span style={{ fontSize: 13 }}>{b.emoji}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: b.color }}>{b.label}</span>
            <span style={{ fontSize: 11, color: b.color, opacity: 0.7 }}>· {b.items.length}</span>
          </div>
        ))}
      </div>

      {/* Buckets */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px 80px' }}>
        {BUCKETS.map((bucket, bi) => (
          <div key={bucket.id} style={{ marginBottom: 48 }}>

            {/* Bucket header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <div style={{ height: 1, flex: 1, background: S.border }} />
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 20px', borderRadius: 100,
                background: bucket.colorBg, border: `1.5px solid ${bucket.color}40`,
              }}>
                <span style={{ fontSize: 16 }}>{bucket.emoji}</span>
                <span style={{ fontFamily: 'Libre Baskerville, serif', fontSize: 15, fontWeight: 700, color: bucket.color }}>{bucket.label}</span>
              </div>
              <div style={{ height: 1, flex: 1, background: S.border }} />
            </div>
            <div style={{ textAlign: 'center', fontSize: 13, color: S.muted, marginBottom: 20 }}>{bucket.tagline}</div>

            {/* Items */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 12 }}>
              {bucket.items.map((item, i) => (
                <div key={i} style={{
                  background: '#fff',
                  border: `1px solid ${S.border}`,
                  borderRadius: 12,
                  padding: '18px 20px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'box-shadow 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(124,92,252,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  {/* Top color bar */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: bucket.color, opacity: 0.5 }} />

                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
                    <div style={{ fontFamily: 'Libre Baskerville, serif', fontSize: 14, fontWeight: 700, color: S.ink, lineHeight: 1.3 }}>{item.title}</div>
                    {item.tag && <Tag label={item.tag} color={bucket.color} />}
                  </div>
                  <div style={{ fontSize: 13, color: S.muted, lineHeight: 1.65 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div style={{
          background: S.accentBg, border: `1px solid ${S.primary}20`,
          borderRadius: 16, padding: '36px 32px', textAlign: 'center',
        }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>💬</div>
          <h3 style={{ fontFamily: 'Libre Baskerville, serif', fontSize: 20, fontWeight: 700, color: S.ink, marginBottom: 10 }}>
            What should we build next?
          </h3>
          <p style={{ fontSize: 14, color: S.muted, marginBottom: 24, maxWidth: 380, margin: '0 auto 24px', lineHeight: 1.7 }}>
            Every message gets read. Tell us what's missing or vote on what matters most.
          </p>
          <a href="mailto:enableos.hq@gmail.com?subject=Feature Request" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 24px', borderRadius: 9,
            background: S.ink, color: '#fff',
            fontSize: 14, fontWeight: 700, textDecoration: 'none',
          }}>
            Send feedback →
          </a>
        </div>
      </div>
    </div>
  )
}
