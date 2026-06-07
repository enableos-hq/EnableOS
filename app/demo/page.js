'use client'
import { useState } from 'react'
import {
  LayoutDashboard, Inbox, Users, MessageSquare, BookOpen,
  Video, Activity, Calendar, TrendingUp, Trophy, Settings,
  ChevronRight, Check, Sparkles, Target, Star, X
} from 'lucide-react'

const S = {
  sidebar: { background: '#1a1235', width: 240 },
  canvas: '#FDFBFF',
  primary: '#7C5CFC', primaryHover: '#9B7EFF',
  primaryLight: '#BDA9FF', accentBg: '#F0ECFF', accentBg2: '#E8E0FF',
  ink: '#1a1235', inkSecondary: '#4a4162', muted: '#8b82a0',
  border: '#E2DCF0', borderLight: '#F0ECF8',
  success: '#059669', warning: '#d97706', error: '#dc2626',
}

const SidebarLogo = () => (
  <svg width="154" height="48" viewBox="0 0 310 78" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="pl1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#BDA9FF"/><stop offset="100%" stopColor="#9B7EFF"/></linearGradient>
      <linearGradient id="pl2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#9B7EFF"/><stop offset="100%" stopColor="#7C5CFC"/></linearGradient>
      <linearGradient id="pl3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#7C5CFC"/><stop offset="100%" stopColor="#5B3EDB"/></linearGradient>
    </defs>
    <rect x="0" y="12" width="52" height="9" rx="2.5" fill="url(#pl1)" opacity="0.45"/>
    <rect x="6" y="27" width="52" height="12" rx="2.5" fill="url(#pl2)" opacity="0.75"/>
    <rect x="12" y="45" width="52" height="16" rx="2.5" fill="url(#pl3)"/>
    <line x1="6" y1="27" x2="0" y2="21" stroke="#BDA9FF" strokeWidth="0.8" opacity="0.4"/>
    <line x1="12" y1="45" x2="6" y2="39" stroke="#9B7EFF" strokeWidth="0.8" opacity="0.5"/>
    <line x1="58" y1="27" x2="52" y2="21" stroke="#BDA9FF" strokeWidth="0.8" opacity="0.4"/>
    <line x1="64" y1="45" x2="58" y2="39" stroke="#9B7EFF" strokeWidth="0.8" opacity="0.5"/>
    <circle cx="59" cy="53" r="3" fill="#ffffff" opacity="0.85"/>
    <circle cx="50" cy="53" r="3" fill="#BDA9FF" opacity="0.7"/>
    <text x="82" y="58" fontFamily="Libre Baskerville,Georgia,serif" fontSize="38" fontWeight="400" fill="#ffffff">Enable</text>
    <text x="222" y="58" fontFamily="Libre Baskerville,Georgia,serif" fontSize="38" fontWeight="700" fill="#BDA9FF">OS</text>
  </svg>
)

const ADMIN_EMAIL = 'enableos.hq@gmail.com'
const WORKSPACES = [
  { id: 'admin', label: 'Admin', path: '/admin', color: '#dc2626', desc: 'Platform overview' },
  { id: 'personal', label: 'Personal', path: '/app', color: '#7C5CFC', desc: 'My enablement workspace' },
  { id: 'demo', label: 'Demo', path: '/demo', color: '#059669', desc: 'Sample data & walkthrough' },
]

function WorkspaceSwitcher({ current }) {
  const [open, setOpen] = useState(false)
  const currentWS = WORKSPACES.find(w => w.id === current)
  return (
    <div style={{ position: 'relative', borderTop: '1px solid rgba(155,126,255,0.12)', paddingTop: 12, marginTop: 4, marginBottom: 10 }}>
      <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)', padding: '0 8px', marginBottom: 6 }}>Workspace</div>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, border: '1px solid rgba(155,126,255,0.15)', background: 'rgba(124,92,252,0.08)', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: currentWS?.color, flexShrink: 0 }} />
        <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: '#fff', textAlign: 'left' }}>{currentWS?.label}</span>
        <ChevronRight size={12} color="rgba(255,255,255,0.3)" style={{ transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>
      {open && (
        <div style={{ position: 'absolute', bottom: '100%', left: 0, right: 0, background: '#2a2040', border: '1px solid rgba(155,126,255,0.15)', borderRadius: 10, padding: 6, marginBottom: 4, zIndex: 100, boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)', padding: '6px 8px 8px' }}>Switch workspace</div>
          {WORKSPACES.map(ws => (
            <a key={ws.id} href={ws.path} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 7, textDecoration: 'none', background: ws.id === current ? 'rgba(124,92,252,0.15)' : 'transparent', marginBottom: 2 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: ws.color + '25', border: `1px solid ${ws.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: ws.color }} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: ws.id === current ? '#fff' : 'rgba(255,255,255,0.6)', marginBottom: 1 }}>{ws.label}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{ws.desc}</div>
              </div>
              {ws.id === current && <Check size={12} color="rgba(255,255,255,0.5)" style={{ marginLeft: 'auto' }} />}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function Card({ children, style }) {
  return <div style={{ background: '#fff', border: `1px solid ${S.borderLight}`, borderRadius: 14, padding: 20, ...style }}>{children}</div>
}

function Badge({ children, color = 'purple' }) {
  const colors = { purple: { bg: S.accentBg2, text: S.primary }, green: { bg: '#d1fae5', text: S.success }, yellow: { bg: '#fef3c7', text: S.warning }, red: { bg: '#fee2e2', text: S.error }, gray: { bg: S.borderLight, text: S.muted } }
  const c = colors[color] || colors.gray
  return <span style={{ background: c.bg, color: c.text, borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{children}</span>
}

// ═══════════ PACKAGE DATA ═══════════

const PACKAGES = {
  'ground-zero': {
    label: 'Ground Zero',
    tagline: 'Built from scratch for a startup with no enablement in place',
    color: '#FF8C42',
    company: 'NovaTech (Seed-stage, 12 people, 3 SDRs, Series A target)',
    stats: { requests: 5, reps: 3, todos: 4, avgRamp: '42%' },
    requests: [
      { title: 'Build competitive battle card — Gong vs Us', score: 21, status: 'open', bucket: 'Collateral' },
      { title: 'Create cold call script for enterprise segment', score: 18, status: 'open', bucket: 'Playbook' },
      { title: 'Design new hire onboarding deck', score: 15, status: 'in-progress', bucket: 'Onboarding' },
      { title: 'Objection handling cheat sheet — pricing pushback', score: 14, status: 'open', bucket: 'Collateral' },
      { title: 'Set up weekly team training cadence', score: 12, status: 'open', bucket: 'Training Session' },
    ],
    reps: [
      { name: 'Aisha', week: 4, pct: 63, next: 'Product Deep Dive certification' },
      { name: 'Dev', week: 2, pct: 35, next: 'Sales Process training' },
      { name: 'Priya', week: 6, pct: 88, next: 'Live Certification sign-off' },
    ],
    collaterals: [
      { title: 'ICP & Buyer Persona Document', type: 'Framework', uses: 12 },
      { title: 'Cold Email Sequence — Enterprise', type: 'Sequence', uses: 8 },
      { title: 'Objection Handling Guide', type: 'Guide', uses: 15 },
      { title: 'Product Demo Script v1', type: 'Template', uses: 6 },
      { title: 'Competitor Landscape Overview', type: 'Battle Card', uses: 9 },
    ],
    notes: [
      { rep: 'Dev', text: '"Pipeline feels slow this week. Not sure if my outbound is even working..."', sentiment: 'concern', action: 'Review outbound sequences together. Check reply rates and adjust messaging.' },
      { rep: 'Aisha', text: '"Closed my first meeting from a cold call! The script really helped."', sentiment: 'positive', action: 'Celebrate the win. Ask her to share the recording with the team.' },
    ],
    coaching: { emails: 3, calls: 2, demos: 3, negotiations: 1 },
  },

  'scattered': {
    label: 'Scattered but Scaling',
    tagline: 'Reorganized from existing chaos — team has data but no system',
    color: '#FFB800',
    company: 'ScaleForce (Series B, 85 people, 14 SDRs + 6 AEs, $4M ARR)',
    stats: { requests: 12, reps: 8, todos: 7, avgRamp: '71%' },
    requests: [
      { title: 'Update battle card — CompetitorX launched new pricing', score: 24, status: 'open', bucket: 'Collateral' },
      { title: 'Redesign onboarding for APAC hires (timezone-adjusted)', score: 21, status: 'in-progress', bucket: 'Onboarding' },
      { title: 'Build discovery call framework for mid-market', score: 19, status: 'open', bucket: 'Playbook' },
      { title: 'Create quarterly business review template for AEs', score: 17, status: 'open', bucket: 'Template' },
      { title: 'Migrate old Google Drive playbook to platform', score: 16, status: 'done', bucket: 'Process' },
      { title: 'Set up Gong call review cadence — weekly top 3', score: 15, status: 'open', bucket: 'Everboarding' },
      { title: 'Churn re-engagement email sequence', score: 14, status: 'in-progress', bucket: 'Sequence' },
    ],
    reps: [
      { name: 'Rahul', week: 8, pct: 92, next: 'Manager sign-off pending' },
      { name: 'Neha', week: 5, pct: 71, next: 'Outbound Mastery' },
      { name: 'Jordan', week: 3, pct: 48, next: 'Product Deep Dive' },
      { name: 'Meera', week: 6, pct: 79, next: 'Live Certification' },
      { name: 'Arjun', week: 1, pct: 15, next: 'Company & Culture' },
      { name: 'Tanya', week: 10, pct: 100, next: 'Fully ramped' },
      { name: 'Karan', week: 4, pct: 55, next: 'Sales Process' },
      { name: 'Zara', week: 7, pct: 85, next: 'Outbound certification' },
    ],
    collaterals: [
      { title: 'Enterprise Playbook v3 (migrated from GDocs)', type: 'Guide', uses: 34 },
      { title: 'Mid-Market Discovery Framework', type: 'Framework', uses: 22 },
      { title: 'Competitor Matrix — 6 competitors', type: 'Battle Card', uses: 41 },
      { title: 'Pricing Objection Responses', type: 'Guide', uses: 28 },
      { title: 'Case Study — FinServ vertical', type: 'One-Pager', uses: 16 },
      { title: 'Cold Email Templates — by persona', type: 'Sequence', uses: 37 },
      { title: 'Demo Recording Library (linked from Gong)', type: 'Template', uses: 19 },
      { title: 'Onboarding Checklist — APAC Region', type: 'Template', uses: 11 },
    ],
    notes: [
      { rep: 'Jordan', text: '"I don\'t understand the mid-market vs enterprise positioning. Getting confused on calls."', sentiment: 'concern', action: 'Schedule a 1:1 session on positioning. Use the mid-market framework as the base.' },
      { rep: 'Neha', text: '"Had 3 demos this week, all went well. The new discovery framework is really clicking."', sentiment: 'positive', action: 'Ask Neha to record her next discovery call for team training.' },
      { rep: 'Karan', text: '"Fine. Nothing major."', sentiment: 'neutral', action: 'Dig deeper next session — short answers may indicate disengagement.' },
    ],
    coaching: { emails: 4, calls: 3, demos: 4, negotiations: 3 },
  },

  'stretched': {
    label: 'Stretched Too Thin',
    tagline: 'Built with the enablement person — their work is now visible and trackable',
    color: '#6BCB77',
    company: 'CloudBridge (Series C, 200 people, 22 reps, enablement lead: Maya)',
    stats: { requests: 8, reps: 12, todos: 3, avgRamp: '78%' },
    requests: [
      { title: 'Q3 product launch enablement package', score: 25, status: 'in-progress', bucket: 'Onboarding' },
      { title: 'Updated win/loss analysis framework', score: 22, status: 'open', bucket: 'Framework' },
      { title: 'New hire bootcamp — July cohort (4 reps)', score: 20, status: 'open', bucket: 'Onboarding' },
      { title: 'Refresh competitive positioning — 2 new entrants', score: 19, status: 'in-progress', bucket: 'Collateral' },
      { title: 'Build ROI calculator for enterprise deals', score: 17, status: 'open', bucket: 'Collateral' },
    ],
    reps: [
      { name: 'Aditya', week: 12, pct: 100, next: 'Fully ramped' },
      { name: 'Sara', week: 10, pct: 95, next: 'Fully ramped' },
      { name: 'Vikram', week: 3, pct: 52, next: 'Product Deep Dive' },
      { name: 'Li Wei', week: 8, pct: 88, next: 'Live Certification' },
      { name: 'Fatima', week: 5, pct: 68, next: 'Outbound Mastery' },
      { name: 'Rohan', week: 1, pct: 12, next: 'Company & Culture' },
    ],
    collaterals: [
      { title: 'Enterprise Playbook v5', type: 'Guide', uses: 67 },
      { title: 'Product Launch Kit — Q2', type: 'Template', uses: 45 },
      { title: 'Competitive Intelligence Hub (5 competitors)', type: 'Battle Card', uses: 58 },
      { title: 'ROI Calculator — Mid-Market', type: 'Template', uses: 31 },
      { title: 'Onboarding Bootcamp Slides', type: 'Template', uses: 24 },
      { title: 'Win/Loss Analysis — Q1 Results', type: 'Framework', uses: 19 },
      { title: 'Objection Handling Matrix v3', type: 'Guide', uses: 52 },
    ],
    notes: [
      { rep: 'Vikram', text: '"Struggling with the enterprise pitch. The mid-market one is fine but enterprise feels different."', sentiment: 'concern', action: 'Pair with Sara for enterprise call shadowing this week.' },
      { rep: 'Fatima', text: '"Booked 6 meetings this week — best week so far! The new sequence is working."', sentiment: 'positive', action: 'Share Fatima\'s sequence with the team as a template.' },
    ],
    coaching: { emails: 4, calls: 4, demos: 5, negotiations: 4 },
  },
}

const scoreColor = (n) => {
  if (n >= 4) return { color: S.success, bg: '#d1fae5' }
  if (n >= 3) return { color: S.warning, bg: '#fef3c7' }
  return { color: S.error, bg: '#fee2e2' }
}

// ═══════════ VIEWS ═══════════

function DemoDashboard({ pkg }) {
  const d = PACKAGES[pkg]
  const statCards = [
    { label: 'Open Requests', value: d.stats.requests, icon: Inbox, color: S.primary },
    { label: 'Reps Tracked', value: d.stats.reps, icon: Users, color: S.success },
    { label: 'Must-Do Tasks', value: d.stats.todos, icon: Target, color: S.warning },
    { label: 'Avg Ramp %', value: d.stats.avgRamp, icon: TrendingUp, color: '#8b5cf6' },
  ]
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: S.ink, marginBottom: 4 }}>Good morning 👋</h1>
        <p style={{ color: S.muted, fontSize: 14, fontWeight: 300 }}>Here&apos;s what&apos;s happening at {d.company.split('(')[0].trim()}.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        {statCards.map(s => (
          <Card key={s.label} style={{ borderTop: `3px solid ${s.color}22` }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: s.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}><s.icon size={17} color={s.color} /></div>
            <div style={{ fontSize: 28, fontWeight: 700, color: S.ink, fontFamily: 'var(--font-display)', marginBottom: 2 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: S.muted }}>{s.label}</div>
          </Card>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Card>
          <h3 style={{ fontWeight: 700, color: S.ink, marginBottom: 14, fontFamily: 'var(--font-display)', fontSize: 15 }}>Priority Queue</h3>
          {d.requests.slice(0, 3).map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', background: S.accentBg, borderRadius: 9, marginBottom: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: i === 0 ? S.error : i === 1 ? S.warning : S.primary, flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 13, color: S.inkSecondary }}>{r.title}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: S.primary }}>P{r.score}</span>
            </div>
          ))}
        </Card>
        <Card>
          <h3 style={{ fontWeight: 700, color: S.ink, marginBottom: 14, fontFamily: 'var(--font-display)', fontSize: 15 }}>Ramp Snapshot</h3>
          {d.reps.slice(0, 4).map((r, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: S.ink }}>{r.name} · Week {r.week}</span>
                <span style={{ fontSize: 13, color: S.primary, fontWeight: 700 }}>{r.pct}%</span>
              </div>
              <div style={{ height: 5, background: S.borderLight, borderRadius: 3 }}>
                <div style={{ height: '100%', width: `${r.pct}%`, background: `linear-gradient(90deg, ${S.primary}, ${S.primaryHover})`, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}

function DemoIntake({ pkg }) {
  const d = PACKAGES[pkg]
  const statusColor = { open: 'purple', 'in-progress': 'yellow', done: 'green' }
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: S.ink }}>Intake</h1>
        <p style={{ color: S.muted, fontSize: 14, marginTop: 2 }}>Auto-prioritized: Impact × Urgency ÷ Effort</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {d.requests.map((r, i) => (
          <Card key={i} style={{ padding: '14px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: S.ink }}>{r.title}</span>
              <Badge color={statusColor[r.status] || 'gray'}>{r.status}</Badge>
              <Badge color="gray">{r.bucket}</Badge>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <span style={{ fontSize: 12, color: S.primary, fontWeight: 700 }}>Priority: {r.score}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function DemoRamp({ pkg }) {
  const d = PACKAGES[pkg]
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: S.ink }}>Ramp &amp; Onboarding</h1>
        <p style={{ color: S.muted, fontSize: 14, marginTop: 2 }}>Track every rep&apos;s progress across structured onboarding</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {d.reps.map((r, i) => (
          <Card key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: S.ink, fontFamily: 'var(--font-display)' }}>{r.name}</span>
              <Badge color={r.pct === 100 ? 'green' : r.pct > 70 ? 'yellow' : 'purple'}>Week {r.week}</Badge>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ flex: 1, height: 6, background: S.borderLight, borderRadius: 3 }}>
                <div style={{ height: '100%', width: `${r.pct}%`, background: r.pct === 100 ? S.success : `linear-gradient(90deg, ${S.primary}, ${S.primaryHover})`, borderRadius: 3 }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: r.pct === 100 ? S.success : S.primary }}>{r.pct}%</span>
            </div>
            <div style={{ fontSize: 12, color: S.muted }}>Next: {r.next}</div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function DemoNotes({ pkg }) {
  const d = PACKAGES[pkg]
  const sentimentColor = { positive: 'green', neutral: 'gray', concern: 'red' }
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: S.ink }}>1:1 Notes</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <p style={{ color: S.muted, fontSize: 14 }}>AI-analyzed coaching notes</p>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 100, background: '#fef3c7', color: S.warning }}>🔒 Private to you</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {d.notes.map((n, i) => (
          <Card key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: S.ink }}>{n.rep}</span>
              <Badge color={sentimentColor[n.sentiment]}>{n.sentiment}</Badge>
            </div>
            <p style={{ fontSize: 13, color: S.inkSecondary, fontStyle: 'italic', marginBottom: 12, lineHeight: 1.6 }}>{n.text}</p>
            <div style={{ padding: '10px 14px', background: S.accentBg, borderRadius: 9, borderLeft: `3px solid ${S.primary}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: S.primary, marginBottom: 4 }}>✦ AI Suggestion</div>
              <p style={{ fontSize: 13, color: S.inkSecondary }}>{n.action}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function DemoCollaterals({ pkg }) {
  const d = PACKAGES[pkg]
  const bucketColors = { 'Battle Card': 'red', 'Framework': 'purple', 'One-Pager': 'green', 'Template': 'yellow', 'Guide': 'gray', 'Sequence': 'purple' }
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: S.ink }}>Collaterals</h1>
        <p style={{ color: S.muted, fontSize: 14, marginTop: 2 }}>Your enablement asset library — one source of truth</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
        {d.collaterals.map((c, i) => (
          <Card key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <Badge color={bucketColors[c.type] || 'gray'}>{c.type}</Badge>
              <span style={{ fontSize: 12, color: S.muted }}>{c.uses} uses</span>
            </div>
            <h3 style={{ fontWeight: 700, fontSize: 14, color: S.ink, fontFamily: 'var(--font-display)' }}>{c.title}</h3>
          </Card>
        ))}
      </div>
    </div>
  )
}

function DemoCoaching({ pkg }) {
  const d = PACKAGES[pkg]
  const areas = [
    { key: 'emails', label: 'Cold Emails', icon: '📧' },
    { key: 'calls', label: 'Cold Calls', icon: '📞' },
    { key: 'demos', label: 'Demos', icon: '🖥' },
    { key: 'negotiations', label: 'Negotiations', icon: '🤝' },
  ]
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: S.ink }}>Coaching Scores</h1>
        <p style={{ color: S.muted, fontSize: 14, marginTop: 2 }}>Monthly deep-dive across 4 areas — averaged across team</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {areas.map(a => {
          const score = d.coaching[a.key]
          const sc = scoreColor(score)
          return (
            <Card key={a.key} style={{ textAlign: 'center', padding: '22px 16px' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{a.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: S.ink, marginBottom: 10 }}>{a.label}</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 52, height: 52, borderRadius: '50%', background: sc.bg, color: sc.color, fontWeight: 700, fontSize: 24, fontFamily: 'var(--font-display)' }}>{score}</div>
              <div style={{ fontSize: 11, color: S.muted, marginTop: 8 }}>out of 5</div>
            </Card>
          )
        })}
      </div>
      <Card>
        <h3 style={{ fontWeight: 700, fontSize: 15, color: S.ink, marginBottom: 14, fontFamily: 'var(--font-display)' }}>Rep Breakdown</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', color: S.muted, fontWeight: 600, padding: '0 12px 10px 0', fontSize: 12 }}>Rep</th>
                {areas.map(a => <th key={a.key} style={{ textAlign: 'center', color: S.muted, fontWeight: 600, padding: '0 12px 10px', fontSize: 12 }}>{a.icon}</th>)}
              </tr>
            </thead>
            <tbody>
              {PACKAGES[pkg].reps.slice(0, 5).map((r, i) => (
                <tr key={i} style={{ borderTop: `1px solid ${S.borderLight}` }}>
                  <td style={{ padding: '10px 12px 10px 0', fontWeight: 600, color: S.ink }}>{r.name}</td>
                  {areas.map(a => {
                    const v = Math.max(1, Math.min(5, d.coaching[a.key] + (i % 3 === 0 ? -1 : i % 3 === 1 ? 0 : 1)))
                    const sc = scoreColor(v)
                    return <td key={a.key} style={{ textAlign: 'center', padding: '10px 12px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '50%', background: sc.bg, color: sc.color, fontWeight: 700, fontSize: 13 }}>{v}</span>
                    </td>
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

// ═══════════ NAV ═══════════

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, group: 'CORE' },
  { id: 'intake', label: 'Intake', icon: Inbox, group: 'CORE' },
  { id: 'ramp', label: 'Ramp & Onboarding', icon: Users, group: 'CORE' },
  { id: 'notes', label: '1:1 Notes', icon: MessageSquare, group: 'CORE' },
  { id: 'collaterals', label: 'Collaterals', icon: BookOpen, group: 'CORE' },
  { id: 'coaching', label: 'Coaching Scores', icon: Activity, group: 'OPERATIONS' },
]

// ═══════════ MAIN ═══════════

export default function Demo() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [pkg, setPkg] = useState('ground-zero')
  const d = PACKAGES[pkg]

  const renderView = () => {
    switch (activeTab) {
      case 'dashboard': return <DemoDashboard pkg={pkg} />
      case 'intake': return <DemoIntake pkg={pkg} />
      case 'ramp': return <DemoRamp pkg={pkg} />
      case 'notes': return <DemoNotes pkg={pkg} />
      case 'collaterals': return <DemoCollaterals pkg={pkg} />
      case 'coaching': return <DemoCoaching pkg={pkg} />
      default: return <DemoDashboard pkg={pkg} />
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Sora:wght@300;400;500;600;700&display=swap');
        :root { --font-display: 'Libre Baskerville', Georgia, serif; --font-body: 'Sora', sans-serif; }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: var(--font-body); -webkit-font-smoothing: antialiased; background: ${S.canvas}; }
        a { text-decoration: none; }
      `}</style>
      <div style={{ display: 'flex', height: '100vh', background: S.canvas, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{ width: S.sidebar.width, background: S.sidebar.background, display: 'flex', flexDirection: 'column', flexShrink: 0, overflowY: 'auto' }}>
          <a href="/" style={{ display: 'block', padding: '20px 16px 16px', borderBottom: '1px solid rgba(155,126,255,0.14)', background: 'linear-gradient(180deg, rgba(124,92,252,0.07), transparent)', textDecoration: 'none' }}>
            <SidebarLogo />
          </a>
          <nav style={{ flex: 1, padding: '16px 12px' }}>
            {['CORE', 'OPERATIONS'].map(group => (
              <div key={group} style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.12em', padding: '0 8px', marginBottom: 6, textTransform: 'uppercase' }}>{group}</div>
                {NAV.filter(n => n.group === group).map(item => {
                  const active = activeTab === item.id
                  return (
                    <button key={item.id} onClick={() => setActiveTab(item.id)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 8, border: 'none', cursor: 'pointer', background: active ? 'linear-gradient(90deg, rgba(124,92,252,0.22), rgba(124,92,252,0.06))' : 'transparent', color: active ? '#fff' : 'rgba(255,255,255,0.48)', fontSize: 13, fontWeight: active ? 600 : 400, fontFamily: 'var(--font-body)', marginBottom: 2, transition: 'all 0.15s', textAlign: 'left', borderLeft: active ? `2px solid ${S.primaryHover}` : '2px solid transparent' }}
                      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)' } }}
                      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.48)' } }}
                    >
                      <item.icon size={16} />{item.label}
                    </button>
                  )
                })}
              </div>
            ))}
          </nav>
          <div style={{ padding: '14px 16px 18px', borderTop: '1px solid rgba(155,126,255,0.1)' }}>
            <WorkspaceSwitcher current="demo" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px', borderRadius: 7, background: 'rgba(107,203,119,0.12)' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6BCB77' }} />
              <span style={{ fontSize: 11, color: '#6BCB77', fontWeight: 600 }}>Demo workspace</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {/* Package selector */}
          <div style={{ padding: '16px 40px', borderBottom: `1px solid ${S.borderLight}`, background: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: S.muted }}>Preview workspace for</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {Object.entries(PACKAGES).map(([key, val]) => (
                <button key={key} onClick={() => { setPkg(key); setActiveTab('dashboard') }}
                  style={{ padding: '8px 18px', borderRadius: 100, border: `2px solid ${pkg === key ? val.color : S.border}`, background: pkg === key ? val.color + '15' : 'transparent', color: pkg === key ? val.color : S.inkSecondary, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.15s' }}>
                  {val.label}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 8, fontSize: 13, color: S.muted }}>
              <span style={{ fontWeight: 600, color: d.color }}>{d.company}</span>
              <span style={{ margin: '0 8px', color: S.borderLight }}>·</span>
              <span style={{ fontStyle: 'italic' }}>{d.tagline}</span>
            </div>
          </div>

          <div style={{ padding: '28px 40px' }}>
            {renderView()}
          </div>
        </div>
      </div>
    </>
  )
}
