'use client'
import { useState, useEffect } from 'react'
import { createClient } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import {
  Users, Activity, Inbox, Star, AlertCircle,
  ChevronRight, LogOut, X, Check, TrendingUp,
  Shield, Bell, RefreshCw
} from 'lucide-react'

const supabase = createClient()
const ADMIN_EMAIL = 'enableos.hq@gmail.com'

const S = {
  sidebar: '#1a1235', canvas: '#FDFBFF', primary: '#7C5CFC',
  primaryLight: '#BDA9FF', accentBg: '#F0ECFF', accentBg2: '#E8E0FF',
  ink: '#1a1235', inkSecondary: '#4a4162', muted: '#8b82a0',
  border: '#E2DCF0', borderLight: '#F0ECF8',
  success: '#059669', warning: '#d97706', error: '#dc2626',
}

const SidebarLogo = () => (
  <svg width="110" height="34" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
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

function Card({ children, style }) {
  return <div style={{ background: '#fff', border: `1px solid ${S.borderLight}`, borderRadius: 12, padding: 20, ...style }}>{children}</div>
}

function Badge({ children, color = 'purple' }) {
  const colors = { purple: { bg: S.accentBg2, text: S.primary }, green: { bg: '#d1fae5', text: S.success }, yellow: { bg: '#fef3c7', text: S.warning }, red: { bg: '#fee2e2', text: S.error }, gray: { bg: S.borderLight, text: S.muted } }
  const c = colors[color] || colors.gray
  return <span style={{ background: c.bg, color: c.text, borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{children}</span>
}

// ── OVERVIEW ──────────────────────────────────────────────────────────────────
function Overview({ users, submissions, setTab }) {
  const now = new Date()
  const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000)
  const newThisWeek = users.filter(u => new Date(u.created_at) > weekAgo).length
  const recentSubmissions = submissions.slice(0, 3)

  const stats = [
    { label: 'Total Users', value: users.length, icon: Users, color: S.primary, sub: `+${newThisWeek} this week` },
    { label: 'Public Submissions', value: submissions.length, icon: Inbox, color: S.success, sub: 'via /submit form' },
    { label: 'New This Week', value: newThisWeek, icon: TrendingUp, color: S.warning, sub: 'signups' },
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontWeight: 700, fontSize: 14, color: S.ink, fontFamily: 'var(--font-display)' }}>Recent Signups</h3>
            <button onClick={() => setTab('users')} style={{ fontSize: 12, color: S.primary, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>View all →</button>
          </div>
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
            <h3 style={{ fontWeight: 700, fontSize: 14, color: S.ink, fontFamily: 'var(--font-display)' }}>Recent Submissions</h3>
            <button onClick={() => setTab('submissions')} style={{ fontSize: 12, color: S.primary, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>View all →</button>
          </div>
          {recentSubmissions.length === 0 && <div style={{ color: S.muted, fontSize: 13 }}>No submissions yet</div>}
          {recentSubmissions.map((s, i) => (
            <div key={i} style={{ padding: '10px 0', borderBottom: `1px solid ${S.borderLight}` }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: S.ink, marginBottom: 3 }}>{s.title}</div>
              <div style={{ fontSize: 12, color: S.muted }}>{s.submitter_name} · {s.submitter_email}</div>
            </div>
          ))}
        </Card>
      </div>

      <Card style={{ marginTop: 16, background: S.ink, border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Check size={18} color="#fff" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 2 }}>All systems operational</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Vercel deployment · Supabase database · Auth · API</div>
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

// ── USERS ─────────────────────────────────────────────────────────────────────
function UsersView({ users }) {
  const [selected, setSelected] = useState(null)
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 340px' : '1fr', gap: 16 }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: S.ink }}>Users</h1>
            <p style={{ color: S.muted, fontSize: 14 }}>{users.length} total accounts</p>
          </div>
        </div>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 16, padding: '12px 20px', borderBottom: `1px solid ${S.borderLight}`, background: S.canvas }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: S.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>User</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: S.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Signed up</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: S.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Status</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: S.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}></span>
          </div>
          {users.map((u, i) => (
            <div key={i} onClick={() => setSelected(selected?.id === u.id ? null : u)}
              style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 16, padding: '14px 20px', borderBottom: `1px solid ${S.borderLight}`, cursor: 'pointer', background: selected?.id === u.id ? S.accentBg : '#fff', transition: 'background 0.15s', alignItems: 'center' }}>
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

// ── SUBMISSIONS ───────────────────────────────────────────────────────────────
function SubmissionsView({ submissions }) {
  const [selected, setSelected] = useState(null)
  const statusColor = { open: 'purple', 'in-progress': 'yellow', done: 'green' }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: 16 }}>
      <div>
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: S.ink }}>Public Submissions</h1>
          <p style={{ color: S.muted, fontSize: 14 }}>{submissions.length} requests via enableos.app/submit</p>
        </div>
        {submissions.length === 0 && (
          <Card style={{ textAlign: 'center', padding: 48 }}>
            <Inbox size={32} color={S.muted} style={{ margin: '0 auto 12px' }} />
            <p style={{ color: S.muted, fontSize: 14 }}>No public submissions yet. Share enableos.app/submit to start collecting requests.</p>
          </Card>
        )}
        {submissions.map((s, i) => (
          <Card key={i} onClick={() => setSelected(selected?.id === s.id ? null : s)}
            style={{ marginBottom: 10, padding: '14px 18px', cursor: 'pointer', background: selected?.id === s.id ? S.accentBg : '#fff', transition: 'background 0.15s' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: S.ink }}>{s.title}</span>
                  <Badge color={statusColor[s.status] || 'gray'}>{s.status}</Badge>
                  <Badge color="gray">{s.bucket}</Badge>
                </div>
                <div style={{ fontSize: 12, color: S.muted }}>
                  {s.submitter_name && <span>{s.submitter_name}</span>}
                  {s.submitter_email && <span> · {s.submitter_email}</span>}
                  {s.submitter_company && <span> · {s.submitter_company}</span>}
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
              <Badge color="gray">{selected.bucket}</Badge>
            </div>
            {selected.description && <p style={{ fontSize: 13, color: S.inkSecondary, lineHeight: 1.6, background: S.canvas, padding: 12, borderRadius: 8 }}>{selected.description}</p>}
          </div>
          <div style={{ borderTop: `1px solid ${S.borderLight}`, paddingTop: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: S.muted, marginBottom: 10 }}>Submitted by</div>
            {[
              ['Name', selected.submitter_name || '—'],
              ['Email', selected.submitter_email || '—'],
              ['Company', selected.submitter_company || '—'],
            ].map(([label, value]) => (
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

// ── NAV ───────────────────────────────────────────────────────────────────────
const NAV = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'submissions', label: 'Public Submissions', icon: Inbox },
]

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function AdminApp() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('overview')
  const [users, setUsers] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user || user.email !== ADMIN_EMAIL) { router.push('/login?next=/admin'); return }
      setUser(user)
      loadData()
    })
  }, [router])

  const loadData = async () => {
    setRefreshing(true)
    // Load users from profiles table
    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
    setUsers(profiles || [])

    // Load public submissions — requests with placeholder user_id
    const { data: subs } = await supabase
      .from('requests')
      .select('*')
      .eq('user_id', '00000000-0000-0000-0000-000000000000')
      .order('created_at', { ascending: false })

    // Parse submitter info from description field
    const parsed = (subs || []).map(s => {
      const match = s.description?.match(/— Submitted by (.+?) \((.+?)(?:, (.+?))?\)/)
      return {
        ...s,
        submitter_name: match?.[1] || null,
        submitter_email: match?.[2] || null,
        submitter_company: match?.[3] || null,
      }
    })
    setSubmissions(parsed)
    setRefreshing(false)
  }

  const signOut = async () => { await supabase.auth.signOut(); router.push('/login') }

  if (loading && !user) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: S.canvas }}>
      <div style={{ textAlign: 'center' }}>
        <SidebarLogo />
        <div style={{ color: S.muted, fontSize: 13, marginTop: 16 }}>Loading admin workspace...</div>
      </div>
    </div>
  )

  const renderView = () => {
    switch (tab) {
      case 'overview': return <Overview users={users} submissions={submissions} setTab={setTab} />
      case 'users': return <UsersView users={users} />
      case 'submissions': return <SubmissionsView submissions={submissions} />
      default: return <Overview users={users} submissions={submissions} setTab={setTab} />
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
        <nav style={{ flex: 1, padding: '14px 10px' }}>
          {NAV.map(item => {
            const active = tab === item.id
            return (
              <button key={item.id} onClick={() => setTab(item.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 9, padding: '9px 10px', borderRadius: 7, border: 'none', cursor: 'pointer', background: active ? `${S.primary}25` : 'transparent', color: active ? '#fff' : 'rgba(255,255,255,0.45)', fontSize: 12, fontWeight: active ? 600 : 400, fontFamily: 'var(--font-body)', marginBottom: 2, transition: 'all 0.15s', textAlign: 'left', borderLeft: `2px solid ${active ? S.primary : 'transparent'}` }}>
                <item.icon size={14} />{item.label}
              </button>
            )
          })}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 16, paddingTop: 14 }}>
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)', padding: '0 8px', marginBottom: 8 }}>My Workspaces</div>
            {[['Personal', '/app'], ['Demo', '/demo']].map(([label, href]) => (
              <a key={label} href={href} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 9, padding: '8px 10px', borderRadius: 7, color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 400, fontFamily: 'var(--font-body)', marginBottom: 2, textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                <ChevronRight size={12} />{label}
              </a>
            ))}
          </div>
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
