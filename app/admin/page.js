'use client'
import { useState, useEffect } from 'react'
import { createClient } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import {
  Users, Activity, Inbox, Star, AlertCircle,
  ChevronRight, LogOut, X, Check, TrendingUp,
  Shield, Bell, RefreshCw, HelpCircle, MessageSquare,
  BarChart2, Zap, FileText, Globe, Heart
} from 'lucide-react'

const supabase = createClient()
const ADMIN_EMAIL = 'enableos.hq@gmail.com'

const S = {
  sidebar: '#1a1235', canvas: '#FDFBFF', primary: '#7C5CFC',
  primaryHover: '#9B7EFF', primaryLight: '#BDA9FF',
  accentBg: '#F0ECFF', accentBg2: '#E8E0FF',
  ink: '#1a1235', inkSecondary: '#4a4162', muted: '#8b82a0',
  border: '#E2DCF0', borderLight: '#F0ECF8',
  success: '#059669', warning: '#d97706', error: '#dc2626',
}

// ─── LOGO ─────────────────────────────────────────────────────────────────────
const SidebarLogo = () => (
  <svg width="154" height="48" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="al1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#BDA9FF"/><stop offset="100%" stopColor="#9B7EFF"/></linearGradient>
      <linearGradient id="al2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#9B7EFF"/><stop offset="100%" stopColor="#7C5CFC"/></linearGradient>
      <linearGradient id="al3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#7C5CFC"/><stop offset="100%" stopColor="#5B3EDB"/></linearGradient>
    </defs>
    <rect x="0" y="12" width="52" height="9" rx="2.5" fill="url(#al1)" opacity="0.45"/>
    <rect x="6" y="27" width="52" height="12" rx="2.5" fill="url(#al2)" opacity="0.75"/>
    <rect x="12" y="45" width="52" height="16" rx="2.5" fill="url(#al3)"/>
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

// ─── SHARED UI ────────────────────────────────────────────────────────────────
function Card({ children, style, onClick }) {
  return (
    <div onClick={onClick} style={{ background: '#fff', border: `1px solid ${S.borderLight}`, borderRadius: 12, padding: 20, cursor: onClick ? 'pointer' : 'default', transition: 'background 0.15s', ...style }}
      onMouseEnter={e => { if (onClick) e.currentTarget.style.background = S.accentBg }}
      onMouseLeave={e => { if (onClick) e.currentTarget.style.background = '#fff' }}
    >{children}</div>
  )
}

function Badge({ children, color = 'purple' }) {
  const colors = { purple: { bg: S.accentBg2, text: S.primary }, green: { bg: '#d1fae5', text: S.success }, yellow: { bg: '#fef3c7', text: S.warning }, red: { bg: '#fee2e2', text: S.error }, gray: { bg: S.borderLight, text: S.muted } }
  const c = colors[color] || colors.gray
  return <span style={{ background: c.bg, color: c.text, borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-body)' }}>{children}</span>
}

// ─── WORKSPACE SWITCHER ───────────────────────────────────────────────────────
const WORKSPACES = [
  { id: 'admin', label: 'Admin', path: '/admin', color: '#dc2626', desc: 'Platform overview' },
  { id: 'personal', label: 'Personal', path: '/app', color: '#7C5CFC', desc: 'My enablement workspace' },
  { id: 'demo', label: 'Demo', path: '/demo', color: '#059669', desc: 'Sample data & walkthrough' },
]

function WorkspaceSwitcher({ current }) {
  const [open, setOpen] = useState(false)
  const currentWS = WORKSPACES.find(w => w.id === current)
  return (
    <div style={{ position: 'relative', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12, marginTop: 12 }}>
      <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)', padding: '0 8px', marginBottom: 6 }}>Workspace</div>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.05)', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: currentWS?.color, flexShrink: 0 }} />
        <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: '#fff', textAlign: 'left' }}>{currentWS?.label}</span>
        <ChevronRight size={12} color="rgba(255,255,255,0.3)" style={{ transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>
      {open && (
        <div style={{ position: 'absolute', bottom: '100%', left: 0, right: 0, background: '#2a2040', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: 6, marginBottom: 4, zIndex: 100, boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)', padding: '6px 8px 8px' }}>Switch workspace</div>
          {WORKSPACES.map(ws => (
            <a key={ws.id} href={ws.path} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 7, textDecoration: 'none', background: ws.id === current ? 'rgba(255,255,255,0.08)' : 'transparent', marginBottom: 2 }}
              onMouseEnter={e => { if (ws.id !== current) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
              onMouseLeave={e => { if (ws.id !== current) e.currentTarget.style.background = 'transparent' }}>
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

// ─── OVERVIEW ─────────────────────────────────────────────────────────────────
function Overview({ users, submissions, featureVotes, setTab }) {
  const now = new Date()
  const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000)
  const newThisWeek = users.filter(u => new Date(u.created_at) > weekAgo).length
  const totalVotes = featureVotes.reduce((sum, f) => sum + f.votes, 0)

  const stats = [
    { label: 'Total Users', value: users.length, icon: Users, color: S.primary, sub: `+${newThisWeek} this week` },
    { label: 'Public Submissions', value: submissions.length, icon: Inbox, color: S.success, sub: 'via intake form' },
    { label: 'Feature Votes', value: totalVotes, icon: Star, color: S.warning, sub: 'across all requests' },
    { label: 'Platform Status', value: '✓ Live', icon: Activity, color: S.success, sub: 'all systems go' },
  ]

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: S.ink, marginBottom: 4 }}>Admin Overview</h1>
        <p style={{ color: S.muted, fontSize: 14 }}>Platform health and usage across all workspaces.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 24 }}>
        {stats.map(s => (
          <Card key={s.label}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <s.icon size={16} color={s.color} />
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: S.ink, fontFamily: 'var(--font-display)', marginBottom: 2 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: S.muted, marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: s.color, fontWeight: 600 }}>{s.sub}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontWeight: 700, fontSize: 14, color: S.ink, fontFamily: 'var(--font-display)' }}>Recent Signups</h3>
            <button onClick={() => setTab('users')} style={{ fontSize: 12, color: S.primary, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>View all →</button>
          </div>
          {users.length === 0 && <div style={{ color: S.muted, fontSize: 13 }}>No users yet</div>}
          {users.slice(0, 5).map((u, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: `1px solid ${S.borderLight}` }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg,${S.primary},#a78bfa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>{u.email?.[0]?.toUpperCase()}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: S.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.email}</div>
                <div style={{ fontSize: 11, color: S.muted }}>{new Date(u.created_at).toLocaleDateString()}</div>
              </div>
              {new Date(u.created_at) > weekAgo && <Badge color="green">New</Badge>}
            </div>
          ))}
        </Card>

        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontWeight: 700, fontSize: 14, color: S.ink, fontFamily: 'var(--font-display)' }}>Top Feature Requests</h3>
            <button onClick={() => setTab('featurevotes')} style={{ fontSize: 12, color: S.primary, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>View all →</button>
          </div>
          {featureVotes.slice(0, 5).map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: `1px solid ${S.borderLight}` }}>
              <div style={{ width: 32, height: 18, background: S.accentBg2, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: S.primary }}>{f.votes}</span>
              </div>
              <span style={{ fontSize: 13, color: S.inkSecondary, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.title}</span>
            </div>
          ))}
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontWeight: 700, fontSize: 14, color: S.ink, fontFamily: 'var(--font-display)' }}>Recent Submissions</h3>
            <button onClick={() => setTab('submissions')} style={{ fontSize: 12, color: S.primary, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>View all →</button>
          </div>
          {submissions.length === 0 && <div style={{ color: S.muted, fontSize: 13 }}>No public submissions yet</div>}
          {submissions.slice(0, 4).map((s, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: `1px solid ${S.borderLight}` }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: S.ink, marginBottom: 2 }}>{s.title}</div>
              <div style={{ fontSize: 11, color: S.muted }}>{s.submitter_name || 'Anonymous'}{s.submitter_email ? ` · ${s.submitter_email}` : ''}</div>
            </div>
          ))}
        </Card>

        <Card>
          <h3 style={{ fontWeight: 700, fontSize: 14, color: S.ink, fontFamily: 'var(--font-display)', marginBottom: 16 }}>Quick Links</h3>
          {[
            { label: 'View waitlist (Tally)', url: 'https://tally.so/r/kdRgXd', icon: '📋' },
            { label: 'Supabase dashboard', url: 'https://supabase.com/dashboard/project/zurkzjhctyfhqcztimnf', icon: '🗄️' },
            { label: 'Vercel deployments', url: 'https://vercel.com', icon: '🚀' },
            { label: 'GitHub repo', url: 'https://github.com', icon: '💻' },
            { label: 'Public intake form', url: '/intake-form', icon: '📝' },
            { label: 'Public roadmap', url: '/roadmap', icon: '🗺️' },
          ].map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: `1px solid ${S.borderLight}`, textDecoration: 'none' }}>
              <span style={{ fontSize: 14 }}>{link.icon}</span>
              <span style={{ fontSize: 13, color: S.primary, fontWeight: 500 }}>{link.label}</span>
              <ChevronRight size={12} color={S.muted} style={{ marginLeft: 'auto' }} />
            </a>
          ))}
        </Card>
      </div>

      <Card style={{ background: S.ink, border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Check size={18} color="#fff" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 2 }}>All systems operational</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Vercel · Supabase · Auth · API</div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 20 }}>
            {['Vercel', 'Supabase', 'Auth', 'API'].map(s => (
              <div key={s} style={{ textAlign: 'center' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#059669', margin: '0 auto 4px' }} />
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}

// ─── USERS VIEW ───────────────────────────────────────────────────────────────
function UsersView({ users }) {
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  const filtered = users.filter(u => u.email?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 340px' : '1fr', gap: 16 }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: S.ink }}>Users</h1>
            <p style={{ color: S.muted, fontSize: 14 }}>{users.length} total accounts</p>
          </div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by email..." style={{ padding: '8px 14px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 13, fontFamily: 'var(--font-body)', outline: 'none', color: S.ink, width: 220 }} onFocus={e => e.target.style.borderColor = S.primary} onBlur={e => e.target.style.borderColor = S.border} />
        </div>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 120px 32px', gap: 16, padding: '12px 20px', borderBottom: `1px solid ${S.borderLight}`, background: S.canvas }}>
            {['User', 'Signed up', 'Status', ''].map(h => (
              <span key={h} style={{ fontSize: 11, fontWeight: 700, color: S.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</span>
            ))}
          </div>
          {filtered.length === 0 && <div style={{ padding: '32px 20px', textAlign: 'center', color: S.muted, fontSize: 13 }}>No users found</div>}
          {filtered.map((u, i) => (
            <div key={i} onClick={() => setSelected(selected?.id === u.id ? null : u)}
              style={{ display: 'grid', gridTemplateColumns: '1fr 160px 120px 32px', gap: 16, padding: '14px 20px', borderBottom: `1px solid ${S.borderLight}`, cursor: 'pointer', background: selected?.id === u.id ? S.accentBg : '#fff', transition: 'background 0.15s', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg,${S.primary},#a78bfa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>{u.email?.[0]?.toUpperCase()}</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: S.ink }}>{u.email}</span>
              </div>
              <span style={{ fontSize: 13, color: S.muted }}>{new Date(u.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <div>{new Date(u.created_at) > weekAgo ? <Badge color="green">New</Badge> : <Badge color="gray">Active</Badge>}</div>
              <ChevronRight size={14} color={S.muted} />
            </div>
          ))}
        </Card>
      </div>

      {selected && (
        <Card style={{ height: 'fit-content', position: 'sticky', top: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontWeight: 700, fontSize: 15, color: S.ink, fontFamily: 'var(--font-display)' }}>User Details</h3>
            <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: S.muted, cursor: 'pointer' }}><X size={16} /></button>
          </div>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: `linear-gradient(135deg,${S.primary},#a78bfa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <span style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>{selected.email?.[0]?.toUpperCase()}</span>
          </div>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: S.ink, marginBottom: 4 }}>{selected.email}</div>
            <Badge color={new Date(selected.created_at) > weekAgo ? 'green' : 'gray'}>
              {new Date(selected.created_at) > weekAgo ? 'New user' : 'Active user'}
            </Badge>
          </div>
          {[
            ['User ID', selected.id?.slice(0, 16) + '...'],
            ['Signed up', new Date(selected.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })],
            ['Auth provider', selected.app_metadata?.provider || 'email'],
            ['Full name', selected.full_name || '—'],
            ['Company', selected.company || '—'],
          ].map(([label, value]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${S.borderLight}` }}>
              <span style={{ fontSize: 13, color: S.muted }}>{label}</span>
              <span style={{ fontSize: 13, color: S.ink, fontWeight: 500, maxWidth: 160, textAlign: 'right', wordBreak: 'break-all' }}>{value}</span>
            </div>
          ))}
        </Card>
      )}
    </div>
  )
}

// ─── SUBMISSIONS VIEW ─────────────────────────────────────────────────────────
function SubmissionsView({ submissions }) {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')
  const statusColor = { open: 'purple', 'in-progress': 'yellow', done: 'green' }
  const filtered = filter === 'all' ? submissions : submissions.filter(s => s.status === filter)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: 16 }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: S.ink }}>Public Submissions</h1>
            <p style={{ color: S.muted, fontSize: 14 }}>{submissions.length} requests via intake form</p>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['all', 'open', 'in-progress', 'done'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ padding: '6px 12px', borderRadius: 100, border: `1px solid ${filter === f ? S.primary : S.border}`, background: filter === f ? S.accentBg2 : 'transparent', color: filter === f ? S.primary : S.inkSecondary, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', textTransform: 'capitalize' }}>{f}</button>
            ))}
          </div>
        </div>
        {filtered.length === 0 && (
          <Card style={{ textAlign: 'center', padding: 48 }}>
            <Inbox size={32} color={S.muted} style={{ margin: '0 auto 12px' }} />
            <p style={{ color: S.muted, fontSize: 14 }}>No submissions yet. Share the intake form link to start collecting requests.</p>
          </Card>
        )}
        {filtered.map((s, i) => (
          <Card key={i} onClick={() => setSelected(selected?.id === s.id ? null : s)}
            style={{ marginBottom: 10, padding: '14px 18px', cursor: 'pointer', background: selected?.id === s.id ? S.accentBg : '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: S.ink }}>{s.title}</span>
                  <Badge color={statusColor[s.status] || 'gray'}>{s.status}</Badge>
                  {s.bucket && <Badge color="gray">{s.bucket}</Badge>}
                </div>
                <div style={{ fontSize: 12, color: S.muted }}>
                  {s.submitter_name && <span>{s.submitter_name}</span>}
                  {s.submitter_email && <span> · {s.submitter_email}</span>}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: S.primary }}>P:{s.priority_score}</span>
                <ChevronRight size={14} color={S.muted} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selected && (
        <Card style={{ height: 'fit-content', position: 'sticky', top: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontWeight: 700, fontSize: 15, color: S.ink, fontFamily: 'var(--font-display)' }}>Submission Detail</h3>
            <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: S.muted, cursor: 'pointer' }}><X size={16} /></button>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: S.ink, marginBottom: 8 }}>{selected.title}</div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
              <Badge color={statusColor[selected.status] || 'gray'}>{selected.status}</Badge>
              {selected.bucket && <Badge color="gray">{selected.bucket}</Badge>}
            </div>
            {selected.description && <p style={{ fontSize: 13, color: S.inkSecondary, lineHeight: 1.6, background: S.canvas, padding: 12, borderRadius: 8 }}>{selected.description}</p>}
          </div>
          <div style={{ borderTop: `1px solid ${S.borderLight}`, paddingTop: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: S.muted, marginBottom: 10 }}>Submitted by</div>
            {[['Name', selected.submitter_name || '—'], ['Email', selected.submitter_email || '—']].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${S.borderLight}` }}>
                <span style={{ fontSize: 13, color: S.muted }}>{label}</span>
                <span style={{ fontSize: 13, color: S.ink, fontWeight: 500 }}>{value}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${S.borderLight}`, paddingTop: 14, marginTop: 4 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: S.muted, marginBottom: 10 }}>Priority Scores</div>
            {[['Impact', selected.impact], ['Urgency', selected.urgency], ['Effort', selected.effort], ['Priority Score', selected.priority_score]].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                <span style={{ fontSize: 13, color: S.muted }}>{label}</span>
                <span style={{ fontSize: 13, color: label === 'Priority Score' ? S.primary : S.ink, fontWeight: label === 'Priority Score' ? 700 : 500 }}>{val}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

// ─── FEATURE VOTES VIEW ───────────────────────────────────────────────────────
function FeatureVotesView({ featureVotes }) {
  const total = featureVotes.reduce((sum, f) => sum + f.votes, 0)
  const statusStyle = {
    planned: { bg: '#dbeafe', color: '#1d4ed8', label: 'Planned' },
    considering: { bg: S.accentBg2, color: S.primary, label: 'Considering' },
    roadmap: { bg: '#d1fae5', color: '#065f46', label: 'On Roadmap' },
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: S.ink }}>Feature Request Votes</h1>
        <p style={{ color: S.muted, fontSize: 14 }}>{total} total votes across {featureVotes.length} requests</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Total Votes', value: total, color: S.primary },
          { label: 'Top Request', value: featureVotes[0]?.votes || 0, color: S.warning, sub: 'votes' },
          { label: 'Requests', value: featureVotes.length, color: S.success },
        ].map(s => (
          <Card key={s.label}>
            <div style={{ fontSize: 24, fontWeight: 700, color: S.ink, fontFamily: 'var(--font-display)', marginBottom: 2 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: S.muted }}>{s.label}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {featureVotes.map((f, i) => {
          const maxVotes = featureVotes[0]?.votes || 1
          const s = statusStyle[f.status] || statusStyle.considering
          return (
            <Card key={i} style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 44, textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: S.primary, fontFamily: 'var(--font-display)' }}>{f.votes}</div>
                  <div style={{ fontSize: 10, color: S.muted }}>votes</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontWeight: 600, fontSize: 14, color: S.ink }}>{f.title}</span>
                    <span style={{ background: s.bg, color: s.color, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100, textTransform: 'uppercase' }}>{s.label}</span>
                    <span style={{ fontSize: 11, color: S.muted }}>{f.category}</span>
                  </div>
                  <div style={{ height: 5, background: S.borderLight, borderRadius: 3 }}>
                    <div style={{ height: '100%', width: `${(f.votes / maxVotes) * 100}%`, background: `linear-gradient(90deg,${S.primary},${S.primaryHover})`, borderRadius: 3 }} />
                  </div>
                </div>
                <div style={{ fontSize: 12, color: S.muted, flexShrink: 0 }}>{Math.round((f.votes / total) * 100)}%</div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

// ─── PLATFORM STATS VIEW ──────────────────────────────────────────────────────
function PlatformStats({ users, submissions }) {
  const now = new Date()
  const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000)
  const monthAgo = new Date(now - 30 * 24 * 60 * 60 * 1000)
  const newThisWeek = users.filter(u => new Date(u.created_at) > weekAgo).length
  const newThisMonth = users.filter(u => new Date(u.created_at) > monthAgo).length

  const metrics = [
    { label: 'Total signups', value: users.length, icon: '👥' },
    { label: 'New this week', value: newThisWeek, icon: '📈' },
    { label: 'New this month', value: newThisMonth, icon: '📅' },
    { label: 'Public submissions', value: submissions.length, icon: '📋' },
    { label: 'Open submissions', value: submissions.filter(s => s.status === 'open').length, icon: '🔵' },
    { label: 'Done submissions', value: submissions.filter(s => s.status === 'done').length, icon: '✅' },
  ]

  // Signup timeline — group by date
  const byDate = users.reduce((acc, u) => {
    const d = new Date(u.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    acc[d] = (acc[d] || 0) + 1
    return acc
  }, {})
  const timeline = Object.entries(byDate).slice(-14)

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: S.ink }}>Platform Stats</h1>
        <p style={{ color: S.muted, fontSize: 14 }}>Usage metrics across EnableOS</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 24 }}>
        {metrics.map(m => (
          <Card key={m.label}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{m.icon}</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: S.ink, fontFamily: 'var(--font-display)', marginBottom: 2 }}>{m.value}</div>
            <div style={{ fontSize: 13, color: S.muted }}>{m.label}</div>
          </Card>
        ))}
      </div>

      <Card>
        <h3 style={{ fontWeight: 700, fontSize: 14, color: S.ink, fontFamily: 'var(--font-display)', marginBottom: 20 }}>Signup Timeline (last 14 days)</h3>
        {timeline.length === 0 ? (
          <div style={{ textAlign: 'center', color: S.muted, padding: 32, fontSize: 14 }}>No signup data yet</div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }}>
            {timeline.map(([date, count]) => {
              const max = Math.max(...timeline.map(([, c]) => c))
              const height = max > 0 ? Math.max((count / max) * 100, 8) : 8
              return (
                <div key={date} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: S.primary }}>{count > 0 ? count : ''}</div>
                  <div style={{ width: '100%', height: `${height}px`, background: `linear-gradient(180deg, ${S.primary}, ${S.primaryHover})`, borderRadius: '3px 3px 0 0', opacity: 0.8 }} />
                  <div style={{ fontSize: 9, color: S.muted, textAlign: 'center', lineHeight: 1.2 }}>{date}</div>
                </div>
              )
            })}
          </div>
        )}
      </Card>

      <Card style={{ marginTop: 16 }}>
        <h3 style={{ fontWeight: 700, fontSize: 14, color: S.ink, fontFamily: 'var(--font-display)', marginBottom: 16 }}>Infrastructure</h3>
        {[
          { label: 'Hosting', value: 'Vercel (auto-deploy on push)', status: 'green' },
          { label: 'Database', value: 'Supabase (PostgreSQL)', status: 'green' },
          { label: 'Auth', value: 'Supabase Auth (email + Google)', status: 'green' },
          { label: 'Domain', value: 'enableos.app', status: 'green' },
          { label: 'AI', value: 'Claude Sonnet via Anthropic API', status: 'green' },
          { label: 'Forms', value: 'Custom + Tally (waitlist)', status: 'green' },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${S.borderLight}` }}>
            <span style={{ fontSize: 13, color: S.muted }}>{item.label}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: S.success }} />
              <span style={{ fontSize: 13, color: S.inkSecondary, fontWeight: 500 }}>{item.value}</span>
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}

// ─── CHANGELOG VIEW ───────────────────────────────────────────────────────────
function Changelog() {
  const entries = [
    {
      version: 'v1.3', date: 'May 2026', tag: 'latest',
      changes: [
        'Interactive walkthrough on first login — step-by-step tour with Next/Skip',
        'Shareable public intake form — link icon in Intake header, no login needed for submitters',
        'Settings: invite team members with Admin or Member roles',
        'Logo size increased across platform, demo, and admin workspaces',
        'Roadmap page live at enableos.app/roadmap',
        'Google Form-style intake page at enableos.app/intake-form',
      ]
    },
    {
      version: 'v1.2', date: 'Apr 2026', tag: null,
      changes: [
        'Demo workspace at /demo — locked to admin email, pre-loaded with sample data',
        'Admin workspace at /admin — users, public submissions, workspace switcher',
        'Feature Requests section — vote on requests, submit new ones',
        'Public submissions via /submit form with priority scoring',
        'Lavender redesign merged with Supabase production code',
      ]
    },
    {
      version: 'v1.1', date: 'Apr 2026', tag: null,
      changes: [
        'Claude AI sentiment analysis in 1:1 Notes',
        'Leaderboards with medal rankings and progress bars',
        'Weekly Planning: Must/Should/Could kanban with completion tracking',
        'Forecasting: kanban pipeline for enablement projects',
        'Pulse Checks: multi-question forms with response tracking',
      ]
    },
    {
      version: 'v1.0', date: 'Apr 2026', tag: null,
      changes: [
        'Platform launched: Dashboard, Intake, Ramp & Onboarding, 1:1 Notes',
        'Collaterals library with usage tracking',
        'Sessions scheduler and tracker',
        'Supabase auth + database, deployed on Vercel',
        'enableos.app live with waitlist (Tally)',
      ]
    },
  ]

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: S.ink }}>Changelog</h1>
        <p style={{ color: S.muted, fontSize: 14 }}>What's been built and shipped</p>
      </div>
      {entries.map((entry, i) => (
        <div key={i} style={{ display: 'flex', gap: 20, marginBottom: 32 }}>
          <div style={{ width: 80, flexShrink: 0, paddingTop: 4 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: S.ink, marginBottom: 3 }}>{entry.version}</div>
            <div style={{ fontSize: 11, color: S.muted }}>{entry.date}</div>
            {entry.tag && <div style={{ marginTop: 6 }}><Badge color="green">{entry.tag}</Badge></div>}
          </div>
          <div style={{ flex: 1 }}>
            <Card>
              {entry.changes.map((c, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderBottom: j < entry.changes.length - 1 ? `1px solid ${S.borderLight}` : 'none' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: S.primary, marginTop: 6, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: S.inkSecondary, lineHeight: 1.5 }}>{c}</span>
                </div>
              ))}
            </Card>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── HELP CENTER ──────────────────────────────────────────────────────────────
function HelpCenter() {
  const [openFaq, setOpenFaq] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', category: 'Bug', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const faqs = [
    {
      q: 'How do I add a new rep to the platform?',
      a: 'Go to Ramp & Onboarding in the sidebar. Click the + button in the rep list on the left. Enter the rep\'s name and hit Add Rep. They\'ll appear in the list with a 0% progress bar — start checking off their onboarding sections as they complete them.'
    },
    {
      q: 'How does the priority score in Intake work?',
      a: 'It uses the formula: Priority = (Impact × Urgency) ÷ Effort. All three are rated 1–5. High impact + high urgency + low effort = highest score. This means quick wins with big impact float to the top automatically.'
    },
    {
      q: 'How do I share the intake form with someone who doesn\'t have an account?',
      a: 'In the Intake section, click the chain-link icon next to the "+ New Request" button. It copies a link to your clipboard. Anyone with that link can fill out a form — no login required. Their submission shows up directly in your Intake board.'
    },
    {
      q: 'What\'s the difference between the three workspaces?',
      a: 'Personal (/app) is your live workspace — real data, real reps, real work. Demo (/demo) is a read-only workspace with sample data, useful for showing the platform to others. Admin (/admin) is this workspace — platform-level data like signups, submissions, and feature votes. Only your email can access Demo and Admin.'
    },
    {
      q: 'How do I replay the onboarding walkthrough?',
      a: 'In your Personal workspace (/app), look for the "Replay walkthrough" button in the bottom of the sidebar. You can also go to Settings and click "Replay Walkthrough" there.'
    },
    {
      q: 'Why can\'t I add a rep? I\'m getting a 400 error.',
      a: 'This is a known Supabase schema issue. Go to Supabase → SQL Editor → New Query and run: SELECT column_name, data_type FROM information_schema.columns WHERE table_name = \'reps\'; Check if the "progress" column exists and is type "jsonb". If not, the reps table needs to be recreated — reach out using the help form below and I\'ll fix it.'
    },
    {
      q: 'How do I invite someone to my workspace?',
      a: 'In your Personal workspace, go to Settings. You\'ll see a "Team Members" section with an invite form. Enter their email, choose their role (Admin or Member), and click Invite. They\'ll get access when they sign up or log in with that email address.'
    },
    {
      q: 'Is my data private? Can other users see it?',
      a: 'Yes — every user\'s data is fully isolated. This is enforced at the database level via Supabase Row Level Security (RLS). When you log in, you can only see data tied to your own user ID. No other user can access your reps, notes, requests, or any other data.'
    },
    {
      q: 'How do I get to the public roadmap?',
      a: 'Go to enableos.app/roadmap — it\'s a public page, no login needed. You can also find it linked from the landing page. It shows what\'s live, what\'s being built next, and what\'s on the horizon.'
    },
    {
      q: 'How do I update a feature request status from Considering to On Roadmap?',
      a: 'Currently the feature request statuses are hardcoded in the platform. To update them, go to GitHub → app/app/page.js → find the "existing" array inside the FeatureRequests function → change the "status" field on the relevant item. Options are: "planned", "considering", "roadmap".'
    },
  ]

  const categories = ['Bug', 'Feature request', 'Question', 'Other']

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: S.ink }}>Help Center</h1>
        <p style={{ color: S.muted, fontSize: 14 }}>Common questions and how to get support</p>
      </div>

      {/* FAQs */}
      <Card style={{ marginBottom: 20 }}>
        <h3 style={{ fontWeight: 700, fontSize: 15, color: S.ink, fontFamily: 'var(--font-display)', marginBottom: 20 }}>Frequently Asked Questions</h3>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: `1px solid ${S.borderLight}` }}>
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 12 }}
            >
              <span style={{ fontSize: 14, fontWeight: 600, color: S.ink, lineHeight: 1.4 }}>{faq.q}</span>
              <div style={{ flexShrink: 0, width: 20, height: 20, borderRadius: '50%', background: openFaq === i ? S.primary : S.borderLight, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                <span style={{ fontSize: 14, color: openFaq === i ? '#fff' : S.muted, lineHeight: 1, marginTop: openFaq === i ? 0 : -1 }}>{openFaq === i ? '−' : '+'}</span>
              </div>
            </button>
            {openFaq === i && (
              <div style={{ paddingBottom: 16 }}>
                <p style={{ fontSize: 14, color: S.inkSecondary, lineHeight: 1.7, background: S.canvas, padding: '12px 14px', borderRadius: 8, margin: 0 }}>{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </Card>

      {/* Help form */}
      <Card>
        <h3 style={{ fontWeight: 700, fontSize: 15, color: S.ink, fontFamily: 'var(--font-display)', marginBottom: 6 }}>
          {submitted ? '✓ Message sent!' : 'Get help'}
        </h3>
        {submitted ? (
          <div>
            <p style={{ fontSize: 14, color: S.muted, marginBottom: 16, lineHeight: 1.6 }}>Got it — I'll look into it and get back to you at your email.</p>
            <button onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', category: 'Bug', message: '' }) }}
              style={{ padding: '8px 16px', borderRadius: 8, border: `1px solid ${S.border}`, background: 'transparent', color: S.inkSecondary, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
              Send another
            </button>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: 13, color: S.muted, marginBottom: 20, lineHeight: 1.6 }}>Can't find the answer above? Send a message and I'll get back to you.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: S.muted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Your name</label>
                <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Sarah Chen"
                  style={{ width: '100%', padding: '9px 12px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 13, fontFamily: 'var(--font-body)', outline: 'none', color: S.ink, boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = S.primary} onBlur={e => e.target.style.borderColor = S.border} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: S.muted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Your email</label>
                <input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="sarah@company.com" type="email"
                  style={{ width: '100%', padding: '9px 12px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 13, fontFamily: 'var(--font-body)', outline: 'none', color: S.ink, boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = S.primary} onBlur={e => e.target.style.borderColor = S.border} />
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: S.muted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Category</label>
              <div style={{ display: 'flex', gap: 6 }}>
                {categories.map(c => (
                  <button key={c} onClick={() => setFormData({ ...formData, category: c })} style={{ padding: '6px 12px', borderRadius: 100, border: `1px solid ${formData.category === c ? S.primary : S.border}`, background: formData.category === c ? S.accentBg2 : 'transparent', color: formData.category === c ? S.primary : S.inkSecondary, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>{c}</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: S.muted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Message</label>
              <textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="Describe what's happening or what you need help with..." rows={4}
                style={{ width: '100%', padding: '9px 12px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 13, fontFamily: 'var(--font-body)', outline: 'none', color: S.ink, resize: 'vertical', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = S.primary} onBlur={e => e.target.style.borderColor = S.border} />
            </div>
            <button
              onClick={() => formData.message.trim() && formData.email.trim() && setSubmitted(true)}
              disabled={!formData.message.trim() || !formData.email.trim()}
              style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: S.ink, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', opacity: (!formData.message.trim() || !formData.email.trim()) ? 0.5 : 1 }}>
              Send message →
            </button>
          </div>
        )}
      </Card>
    </div>
  )
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
const NAV = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'submissions', label: 'Submissions', icon: Inbox },
  { id: 'featurevotes', label: 'Feature Votes', icon: Star },
  { id: 'stats', label: 'Platform Stats', icon: BarChart2 },
  { id: 'changelog', label: 'Changelog', icon: FileText },
  { id: 'help', label: 'Help Center', icon: HelpCircle },
]

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function AdminApp() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('overview')
  const [users, setUsers] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const router = useRouter()

  const FEATURE_VOTES = [
    { title: 'Enablement ROI dashboard — which assets closed which deals', votes: 34, status: 'roadmap', category: 'Analytics' },
    { title: 'Slack intake bot — submit requests from Slack', votes: 31, status: 'planned', category: 'Integrations' },
    { title: 'Google Calendar integration', votes: 28, status: 'planned', category: 'Integrations' },
    { title: 'Multi-seat workspaces for larger teams', votes: 26, status: 'roadmap', category: 'Platform' },
    { title: 'Salesforce / HubSpot CRM sync', votes: 22, status: 'planned', category: 'Integrations' },
    { title: 'AI-generated onboarding plans per rep', votes: 19, status: 'considering', category: 'AI' },
    { title: 'Gong integration — call themes into 1:1 notes', votes: 17, status: 'considering', category: 'Integrations' },
    { title: 'Public-facing hub for reps to self-serve assets', votes: 14, status: 'considering', category: 'Platform' },
  ]

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user || user.email !== ADMIN_EMAIL) { router.push('/login?next=/admin'); return }
      setUser(user)
      loadData()
      setLoading(false)
    })
  }, [router])

  const loadData = async () => {
    setRefreshing(true)
    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
    setUsers(profiles || [])

    const { data: subs } = await supabase
      .from('requests')
      .select('*')
      .eq('user_id', '00000000-0000-0000-0000-000000000000')
      .order('created_at', { ascending: false })

    const parsed = (subs || []).map(s => {
      const match = s.description?.match(/Submitted by: (.+?)(?:\s\((.+?)\))?(?:\n|$)/)
      return {
        ...s,
        submitter_name: s.submitter_name || match?.[1] || null,
        submitter_email: s.submitter_email || match?.[2] || null,
      }
    })
    setSubmissions(parsed)
    setRefreshing(false)
  }

  const signOut = async () => { await supabase.auth.signOut(); router.push('/login') }

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: S.canvas }}>
      <div style={{ textAlign: 'center' }}>
        <SidebarLogo />
        <div style={{ color: S.muted, fontSize: 13, marginTop: 16 }}>Loading admin workspace...</div>
      </div>
    </div>
  )

  const renderView = () => {
    switch (tab) {
      case 'overview': return <Overview users={users} submissions={submissions} featureVotes={FEATURE_VOTES} setTab={setTab} />
      case 'users': return <UsersView users={users} />
      case 'submissions': return <SubmissionsView submissions={submissions} />
      case 'featurevotes': return <FeatureVotesView featureVotes={FEATURE_VOTES} />
      case 'stats': return <PlatformStats users={users} submissions={submissions} />
      case 'changelog': return <Changelog />
      case 'help': return <HelpCenter />
      default: return <Overview users={users} submissions={submissions} featureVotes={FEATURE_VOTES} setTab={setTab} />
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: S.canvas, overflow: 'hidden' }}>
      <div style={{ width: 220, background: S.sidebar, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <SidebarLogo />
          <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(220,38,38,0.2)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: 100, padding: '3px 10px' }}>
            <Shield size={9} color="#fca5a5" />
            <span style={{ fontSize: 10, fontWeight: 700, color: '#fca5a5', letterSpacing: '0.08em' }}>ADMIN</span>
          </div>
        </div>
        <nav style={{ flex: 1, padding: '14px 10px', overflowY: 'auto' }}>
          {NAV.map(item => {
            const active = tab === item.id
            return (
              <button key={item.id} onClick={() => setTab(item.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 9, padding: '9px 10px', borderRadius: 7, border: 'none', cursor: 'pointer', background: active ? `${S.primary}25` : 'transparent', color: active ? '#fff' : 'rgba(255,255,255,0.45)', fontSize: 12, fontWeight: active ? 600 : 400, fontFamily: 'var(--font-body)', marginBottom: 2, transition: 'all 0.15s', textAlign: 'left', borderLeft: `2px solid ${active ? S.primary : 'transparent'}` }}>
                <item.icon size={14} />{item.label}
              </button>
            )
          })}
          <WorkspaceSwitcher current="admin" />
        </nav>
        <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={loadData} disabled={refreshing} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 12px', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 7 }}>
            <RefreshCw size={12} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
            {refreshing ? 'Refreshing...' : 'Refresh data'}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(220,38,38,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: '#fca5a5', fontSize: 11, fontWeight: 700 }}>{user?.email?.[0]?.toUpperCase()}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, color: '#fff', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>Admin</div>
            </div>
            <button onClick={signOut} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}><LogOut size={13} /></button>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>
        {renderView()}
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
