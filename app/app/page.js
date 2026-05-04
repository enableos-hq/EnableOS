'use client'
import { useState, useEffect, useCallback } from 'react'
import { createClient } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

const SidebarLogo = () => (
  <svg width="154" height="48" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
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
    <div style={{ position: 'relative', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12, marginTop: 4, marginBottom: 10 }}>
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

import {
  LayoutDashboard, Inbox, Users, MessageSquare, BookOpen,
  Video, Activity, Calendar, TrendingUp, Trophy, Settings,
  LogOut, Plus, X, ChevronRight, BarChart2, Zap, Check,
  AlertCircle, Clock, ArrowUp, ArrowDown, Sparkles, Target,
  FileText, Star, ChevronDown, Trash2, Edit3, Send, Loader
} from 'lucide-react'

const supabase = createClient()

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const S = {
  sidebar: { background: '#1a1235', width: 240 },
  canvas: '#FDFBFF',
  primary: '#7C5CFC',
  primaryHover: '#9B7EFF',
  primaryLight: '#BDA9FF',
  accentBg: '#F0ECFF',
  accentBg2: '#E8E0FF',
  ink: '#1a1235',
  inkSecondary: '#4a4162',
  muted: '#8b82a0',
  border: '#E2DCF0',
  borderLight: '#F0ECF8',
  success: '#059669',
  warning: '#d97706',
  error: '#dc2626',
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function Card({ children, style, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: '#fff',
      border: `1px solid ${S.borderLight}`,
      borderRadius: 12,
      padding: 20,
      transition: 'box-shadow 0.2s, border-color 0.2s',
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}
      onMouseEnter={e => { if (onClick) { e.currentTarget.style.boxShadow = `0 4px 20px rgba(124,92,252,0.12)`; e.currentTarget.style.borderColor = S.border } }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = S.borderLight }}
    >
      {children}
    </div>
  )
}

function Btn({ children, onClick, variant = 'primary', size = 'md', disabled, style }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    fontFamily: 'var(--font-body)', fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none', transition: 'all 0.15s', opacity: disabled ? 0.5 : 1,
    borderRadius: size === 'sm' ? 6 : 8,
    fontSize: size === 'sm' ? 12 : 14,
    padding: size === 'sm' ? '6px 12px' : '10px 18px',
    ...style,
  }
  const variants = {
    primary: { background: S.ink, color: '#fff' },
    ghost: { background: 'transparent', color: S.inkSecondary, border: `1px solid ${S.border}` },
    danger: { background: '#fef2f2', color: S.error, border: `1px solid #fecaca` },
    purple: { background: S.primary, color: '#fff' },
  }
  return <button onClick={onClick} disabled={disabled} style={{ ...base, ...variants[variant] }}>{children}</button>
}

function Badge({ children, color = 'purple' }) {
  const colors = {
    purple: { bg: S.accentBg2, text: S.primary },
    green: { bg: '#d1fae5', text: S.success },
    yellow: { bg: '#fef3c7', text: S.warning },
    red: { bg: '#fee2e2', text: S.error },
    gray: { bg: S.borderLight, text: S.muted },
  }
  const c = colors[color] || colors.gray
  return (
    <span style={{
      background: c.bg, color: c.text, borderRadius: 100,
      padding: '3px 10px', fontSize: 11, fontWeight: 700,
      textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-body)',
    }}>{children}</span>
  )
}

function Modal({ title, onClose, children, wide }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(26,18,53,0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: S.ink, borderRadius: 16, width: '100%', maxWidth: wide ? 680 : 480, maxHeight: '90vh', overflowY: 'auto', border: `1px solid #3a3550` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #3a3550' }}>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 16, fontFamily: 'var(--font-display)' }}>{title}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: S.muted, cursor: 'pointer' }}><X size={18} /></button>
        </div>
        <div style={{ padding: '24px' }}>{children}</div>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', color: S.muted, fontSize: 12, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
      {children}
    </div>
  )
}

function Input({ value, onChange, placeholder, type = 'text', style }) {
  return (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}
      style={{ width: '100%', background: '#2a2445', border: '1px solid #3a3550', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', ...style }}
    />
  )
}

function Select({ value, onChange, children, style }) {
  return (
    <select value={value} onChange={onChange}
      style={{ width: '100%', background: '#2a2445', border: '1px solid #3a3550', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', ...style }}>
      {children}
    </select>
  )
}

function Textarea({ value, onChange, placeholder, rows = 3, style }) {
  return (
    <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows}
      style={{ width: '100%', background: '#2a2445', border: '1px solid #3a3550', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical', ...style }}
    />
  )
}

// ─── WALKTHROUGH ──────────────────────────────────────────────────────────────
const WALKTHROUGH_STEPS = [
  { id: 'dashboard', title: 'Welcome to EnableOS 👋', desc: 'Your command centre. Open requests, ramping reps, must-do tasks, and ramp snapshot — everything in one view. Let\'s take a 60-second tour.' },
  { id: 'intake', title: 'Intake — your request queue', desc: 'Every enablement request lands here. Impact × Urgency ÷ Effort = auto priority score. No more guessing what to build next. You can also share a public form link so anyone can submit without a login.' },
  { id: 'ramp', title: 'Ramp & Onboarding', desc: 'Track every rep\'s onboarding across 5 sections. See who\'s ahead, who\'s behind, check off items as they complete them. No more spreadsheet ramp trackers.' },
  { id: 'notes', title: '1:1 Notes with AI', desc: 'Log private coaching notes and shared agendas per rep. Claude AI analyses sentiment, flags reps at risk, and suggests your next coaching action automatically.' },
  { id: 'collaterals', title: 'Collateral Library', desc: 'Every asset in one place with usage tracking. See what\'s actually being used and what\'s collecting dust.' },
  { id: 'planning', title: 'Weekly Planning', desc: 'Must Do / Should Do / Could Do. Kanban for your weekly priorities. Check things off, track your completion rate.' },
  { id: 'settings', title: 'You\'re all set! 🚀', desc: 'That\'s the core loop. Head to Settings to invite your team, or jump straight in. You can replay this tour anytime from the sidebar.' },
]

function Walkthrough({ onClose, onNavigate }) {
  const [step, setStep] = useState(0)
  const current = WALKTHROUGH_STEPS[step]
  const isLast = step === WALKTHROUGH_STEPS.length - 1

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,18,53,0.5)', backdropFilter: 'blur(2px)', pointerEvents: 'all' }} onClick={onClose} />
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', width: 480, background: '#fff', borderRadius: 16, boxShadow: '0 24px 64px rgba(26,18,53,0.3)', pointerEvents: 'all', overflow: 'hidden' }}>
        <div style={{ height: 3, background: S.borderLight }}>
          <div style={{ height: '100%', width: `${((step + 1) / WALKTHROUGH_STEPS.length) * 100}%`, background: `linear-gradient(90deg, ${S.primary}, ${S.primaryHover})`, transition: 'width 0.3s' }} />
        </div>
        <div style={{ padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: S.accentBg2, color: S.primary, padding: '4px 10px', borderRadius: 100, fontSize: 11, fontWeight: 700, marginBottom: 10 }}>
                Step {step + 1} of {WALKTHROUGH_STEPS.length}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: S.ink, marginBottom: 8 }}>{current.title}</h3>
              <p style={{ fontSize: 14, color: S.inkSecondary, lineHeight: 1.65 }}>{current.desc}</p>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: S.muted, cursor: 'pointer', flexShrink: 0, marginLeft: 16 }}>
              <X size={18} />
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
            <div style={{ display: 'flex', gap: 5 }}>
              {WALKTHROUGH_STEPS.map((_, i) => (
                <div key={i} style={{ width: i === step ? 20 : 6, height: 6, borderRadius: 3, background: i <= step ? S.primary : S.borderLight, transition: 'all 0.3s' }} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <button onClick={onClose} style={{ background: 'none', border: 'none', color: S.muted, fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Skip</button>
              {step > 0 && (
                <Btn variant="ghost" size="sm" onClick={() => { setStep(step - 1); onNavigate(WALKTHROUGH_STEPS[step - 1].id) }}>Back</Btn>
              )}
              {isLast
                ? <Btn size="sm" onClick={onClose}>Done — let's go! 🚀</Btn>
                : <Btn size="sm" onClick={() => { setStep(step + 1); onNavigate(WALKTHROUGH_STEPS[step + 1].id) }}>Next <ChevronRight size={14} /></Btn>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ userId }) {
  const [stats, setStats] = useState({ requests: 0, reps: 0, todos: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [{ count: reqCount }, { count: repCount }, { count: todoCount }] = await Promise.all([
        supabase.from('requests').select('*', { count: 'exact', head: true }).eq('user_id', userId).eq('status', 'open'),
        supabase.from('reps').select('*', { count: 'exact', head: true }).eq('user_id', userId),
        supabase.from('todos').select('*', { count: 'exact', head: true }).eq('user_id', userId).eq('done', false),
      ])
      setStats({ requests: reqCount || 0, reps: repCount || 0, todos: todoCount || 0 })
      setLoading(false)
    }
    load()
  }, [userId])

  const statCards = [
    { label: 'Open Requests', value: stats.requests, icon: Inbox, color: S.primary },
    { label: 'Ramping Reps', value: stats.reps, icon: Users, color: S.success },
    { label: 'Must-Do Tasks', value: stats.todos, icon: Target, color: S.warning },
    { label: 'Avg Ramp %', value: '68%', icon: TrendingUp, color: '#8b5cf6' },
  ]

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: S.ink, marginBottom: 4 }}>Good morning 👋</h1>
        <p style={{ color: S.inkSecondary, fontSize: 15 }}>Here's what's happening with your team today.</p>
      </div>
      {loading ? <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} /> : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
            {statCards.map(s => (
              <Card key={s.label}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <s.icon size={18} color={s.color} />
                  </div>
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: S.ink, fontFamily: 'var(--font-display)', marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 13, color: S.muted }}>{s.label}</div>
              </Card>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Card>
              <h3 style={{ fontWeight: 700, color: S.ink, marginBottom: 16, fontFamily: 'var(--font-display)', fontSize: 15 }}>Priority Queue</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Finalize onboarding deck for new cohort', 'Battlecard update — competitor pricing changed', 'Cold outreach sequence refresh'].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: S.accentBg, borderRadius: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: i === 0 ? S.error : i === 1 ? S.warning : S.primary, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: S.inkSecondary }}>{t}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <h3 style={{ fontWeight: 700, color: S.ink, marginBottom: 16, fontFamily: 'var(--font-display)', fontSize: 15 }}>Ramp Snapshot</h3>
              {['Alex Chen', 'Priya Sharma', 'Marcus O.'].map((name, i) => {
                const pct = [78, 52, 91][i]
                return (
                  <div key={name} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: S.ink }}>{name}</span>
                      <span style={{ fontSize: 13, color: S.primary, fontWeight: 700 }}>{pct}%</span>
                    </div>
                    <div style={{ height: 6, background: S.borderLight, borderRadius: 3 }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${S.primary}, ${S.primaryHover})`, borderRadius: 3 }} />
                    </div>
                  </div>
                )
              })}
            </Card>
          </div>
        </>
      )}
    </div>
  )
}

// ─── INTAKE ────────────────────────────────────────────────────────────────────
function Intake({ userId }) {
  const [requests, setRequests] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState('all')
  const [form, setForm] = useState({ title: '', bucket: 'Collateral', description: '', impact: 3, urgency: 3, effort: 3, status: 'open' })

  const load = useCallback(async () => {
    const { data } = await supabase.from('requests').select('*').eq('user_id', userId).order('created_at', { ascending: false })
    setRequests(data || [])
  }, [userId])

  useEffect(() => { load() }, [load])

  const save = async () => {
    const priority = Math.round((form.impact * form.urgency) / form.effort)
    await supabase.from('requests').insert({ ...form, user_id: userId, priority_score: priority })
    setShowModal(false)
    setForm({ title: '', bucket: 'Collateral', description: '', impact: 3, urgency: 3, effort: 3, status: 'open' })
    load()
  }

  const updateStatus = async (id, status) => {
    await supabase.from('requests').update({ status }).eq('id', id)
    load()
  }

  const buckets = ['all', 'Collateral', 'Training Session', 'Everboarding', 'Onboarding', 'Process', 'Playbook', 'Other']
  const filtered = filter === 'all' ? requests : requests.filter(r => r.bucket === filter)
  const statusColor = { open: 'purple', 'in-progress': 'yellow', done: 'green' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: S.ink }}>Intake</h1>
          <p style={{ color: S.muted, fontSize: 14 }}>Manage and prioritize enablement requests</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            title="Share public intake form link"
            onClick={() => {
              const link = `${window.location.origin}/intake-form`
              navigator.clipboard.writeText(link).then(() => alert(`Link copied!\n\n${link}\n\nAnyone with this link can submit a request — no login needed.`))
            }}
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 7, border: `1px solid ${S.border}`, background: 'transparent', cursor: 'pointer', color: S.inkSecondary, transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.background = S.accentBg; e.currentTarget.style.borderColor = S.primary; e.currentTarget.style.color = S.primary }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = S.border; e.currentTarget.style.color = S.inkSecondary }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
          </button>
          <Btn onClick={() => setShowModal(true)}><Plus size={16} />New Request</Btn>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {buckets.map(b => (
          <button key={b} onClick={() => setFilter(b)} style={{
            padding: '6px 14px', borderRadius: 100, border: `1px solid ${filter === b ? S.primary : S.border}`,
            background: filter === b ? S.accentBg2 : 'transparent', color: filter === b ? S.primary : S.inkSecondary,
            fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)',
          }}>{b === 'all' ? 'All' : b}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.length === 0 && <div style={{ textAlign: 'center', color: S.muted, padding: 40 }}>No requests yet. Add your first one!</div>}
        {filtered.map(r => (
          <Card key={r.id} style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, color: S.ink, fontSize: 15 }}>{r.title}</span>
                  <Badge color={statusColor[r.status] || 'gray'}>{r.status}</Badge>
                  <Badge color="gray">{r.bucket}</Badge>
                </div>
                {r.description && <p style={{ color: S.muted, fontSize: 13, marginBottom: 8 }}>{r.description}</p>}
                <div style={{ display: 'flex', gap: 16 }}>
                  <span style={{ fontSize: 12, color: S.muted }}>Impact: <b style={{ color: S.inkSecondary }}>{r.impact}</b></span>
                  <span style={{ fontSize: 12, color: S.muted }}>Urgency: <b style={{ color: S.inkSecondary }}>{r.urgency}</b></span>
                  <span style={{ fontSize: 12, color: S.muted }}>Effort: <b style={{ color: S.inkSecondary }}>{r.effort}</b></span>
                  <span style={{ fontSize: 12, color: S.primary, fontWeight: 700 }}>Priority: {r.priority_score}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, marginLeft: 16 }}>
                {r.status !== 'done' && (
                  <Btn size="sm" variant="ghost" onClick={() => updateStatus(r.id, r.status === 'open' ? 'in-progress' : 'done')}>
                    {r.status === 'open' ? 'Start' : 'Done'}
                  </Btn>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {showModal && (
        <Modal title="New Enablement Request" onClose={() => setShowModal(false)}>
          <Field label="Title"><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="What's being requested?" /></Field>
          <Field label="Bucket">
            <Select value={form.bucket} onChange={e => setForm({ ...form, bucket: e.target.value })}>
              {['Collateral', 'Training Session', 'Everboarding', 'Onboarding', 'Process', 'Playbook', 'Other'].map(b => <option key={b} value={b}>{b}</option>)}
            </Select>
          </Field>
          <Field label="Description"><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="More context..." /></Field>
          {[['impact', 'Impact'], ['urgency', 'Urgency'], ['effort', 'Effort']].map(([key, label]) => (
            <Field key={key} label={`${label}: ${form[key]}/5`}>
              <input type="range" min={1} max={5} value={form[key]} onChange={e => setForm({ ...form, [key]: +e.target.value })}
                style={{ width: '100%', accentColor: S.primary }} />
            </Field>
          ))}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
            <Btn variant="ghost" onClick={() => setShowModal(false)}>Cancel</Btn>
            <Btn onClick={save} disabled={!form.title}>Add Request</Btn>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ─── RAMP & ONBOARDING ────────────────────────────────────────────────────────
function Ramp({ userId }) {
  const [reps, setReps] = useState([])
  const [selected, setSelected] = useState(null)
  const [showAddRep, setShowAddRep] = useState(false)
  const [newRepName, setNewRepName] = useState('')

  const load = useCallback(async () => {
    const { data } = await supabase.from('reps').select('*').eq('user_id', userId)
    setReps(data || [])
    if (data && data.length > 0 && !selected) setSelected(data[0])
  }, [userId, selected])

  useEffect(() => { load() }, [load])

  const addRep = async () => {
    if (!newRepName.trim()) return
    const defaultProgress = {
      sections: { 'Company & Culture': [false, false, false, false], 'Sales Process': [false, false, false, false], 'Product Deep Dive': [false, false, false, false], 'Outbound Mastery': [false, false, false, false], 'Live Certification': [false, false, false, false] },
      benchmarks: {}
    }
    await supabase.from('reps').insert({ user_id: userId, name: newRepName, progress: defaultProgress, start_date: new Date().toISOString() })
    setNewRepName('')
    setShowAddRep(false)
    load()
  }

  const toggleCheck = async (section, idx) => {
    if (!selected) return
    const updated = { ...selected.progress }
    updated.sections[section][idx] = !updated.sections[section][idx]
    await supabase.from('reps').update({ progress: updated }).eq('id', selected.id)
    setSelected({ ...selected, progress: updated })
    load()
  }

  const sections = ['Company & Culture', 'Sales Process', 'Product Deep Dive', 'Outbound Mastery', 'Live Certification']
  const sectionItems = {
    'Company & Culture': ['Company history & mission', 'ICP and buyer personas', 'Competitive landscape', 'Internal tools & tech stack'],
    'Sales Process': ['Discovery call framework', 'Demo flow walkthrough', 'Objection handling', 'Pipeline management'],
    'Product Deep Dive': ['Core product features', 'Integration ecosystem', 'Pricing & packaging', 'Customer use cases'],
    'Outbound Mastery': ['Cold email sequences', 'LinkedIn outreach', 'Cold call framework', 'Social selling tactics'],
    'Live Certification': ['Discovery call roleplay', 'Demo certification', 'Objection handling test', 'Manager sign-off'],
  }

  const calcPct = (rep) => {
    if (!rep?.progress?.sections) return 0
    const all = Object.values(rep.progress.sections).flat()
    return Math.round((all.filter(Boolean).length / all.length) * 100)
  }

  return (
    <div style={{ display: 'flex', gap: 20, height: 'calc(100vh - 120px)' }}>
      <div style={{ width: 220, background: '#fff', border: `1px solid ${S.borderLight}`, borderRadius: 12, padding: 16, overflowY: 'auto', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span style={{ fontWeight: 700, fontSize: 13, color: S.ink }}>Reps</span>
          <button onClick={() => setShowAddRep(true)} style={{ background: 'none', border: 'none', color: S.primary, cursor: 'pointer' }}><Plus size={16} /></button>
        </div>
        {reps.map(r => (
          <div key={r.id} onClick={() => setSelected(r)} style={{
            padding: '10px 12px', borderRadius: 8, marginBottom: 4, cursor: 'pointer',
            background: selected?.id === r.id ? S.accentBg2 : 'transparent',
            border: `1px solid ${selected?.id === r.id ? S.primary + '40' : 'transparent'}`,
          }}>
            <div style={{ fontWeight: 600, fontSize: 13, color: S.ink, marginBottom: 4 }}>{r.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ flex: 1, height: 4, background: S.borderLight, borderRadius: 2 }}>
                <div style={{ height: '100%', width: `${calcPct(r)}%`, background: S.primary, borderRadius: 2 }} />
              </div>
              <span style={{ fontSize: 11, color: S.primary, fontWeight: 700 }}>{calcPct(r)}%</span>
            </div>
          </div>
        ))}
        {reps.length === 0 && <div style={{ fontSize: 13, color: S.muted, textAlign: 'center', paddingTop: 20 }}>No reps yet</div>}
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {!selected ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: S.muted }}>Select a rep or add one</div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: S.ink }}>{selected.name}</h1>
                <p style={{ color: S.muted, fontSize: 14 }}>{calcPct(selected)}% complete · Started {selected.start_date ? new Date(selected.start_date).toLocaleDateString() : 'recently'}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {sections.map(section => {
                const checks = selected.progress?.sections?.[section] || [false, false, false, false]
                const done = checks.filter(Boolean).length
                return (
                  <Card key={section}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                      <h3 style={{ fontWeight: 700, fontSize: 15, color: S.ink }}>{section}</h3>
                      <Badge color={done === 4 ? 'green' : 'gray'}>{done}/4</Badge>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {sectionItems[section].map((item, i) => (
                        <div key={i} onClick={() => toggleCheck(section, i)} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '6px 8px', borderRadius: 6, transition: 'background 0.15s' }}
                          onMouseEnter={e => e.currentTarget.style.background = S.accentBg}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                          <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${checks[i] ? S.primary : S.border}`, background: checks[i] ? S.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
                            {checks[i] && <Check size={11} color="#fff" strokeWidth={3} />}
                          </div>
                          <span style={{ fontSize: 14, color: checks[i] ? S.muted : S.inkSecondary, textDecoration: checks[i] ? 'line-through' : 'none' }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )
              })}
            </div>
          </>
        )}
      </div>

      {showAddRep && (
        <Modal title="Add Rep" onClose={() => setShowAddRep(false)}>
          <Field label="Name"><Input value={newRepName} onChange={e => setNewRepName(e.target.value)} placeholder="Rep's name" /></Field>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <Btn variant="ghost" onClick={() => setShowAddRep(false)}>Cancel</Btn>
            <Btn onClick={addRep} disabled={!newRepName.trim()}>Add Rep</Btn>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ─── 1:1 NOTES ────────────────────────────────────────────────────────────────
function Notes({ userId }) {
  const [reps, setReps] = useState([])
  const [selectedRep, setSelectedRep] = useState(null)
  const [notes, setNotes] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ shared_agenda: '', private_notes: '' })
  const [analyzing, setAnalyzing] = useState(false)
  const [aiResult, setAiResult] = useState(null)

  useEffect(() => {
    supabase.from('reps').select('*').eq('user_id', userId).then(({ data }) => {
      setReps(data || [])
      if (data && data.length > 0) setSelectedRep(data[0])
    })
  }, [userId])

  useEffect(() => {
    if (!selectedRep) return
    supabase.from('notes').select('*').eq('user_id', userId).eq('rep_id', selectedRep.id).order('created_at', { ascending: false }).then(({ data }) => setNotes(data || []))
  }, [selectedRep, userId])

  const save = async () => {
    await supabase.from('notes').insert({ ...form, user_id: userId, rep_id: selectedRep.id, date: new Date().toISOString() })
    setShowModal(false)
    setForm({ shared_agenda: '', private_notes: '' })
    setAiResult(null)
    supabase.from('notes').select('*').eq('user_id', userId).eq('rep_id', selectedRep.id).order('created_at', { ascending: false }).then(({ data }) => setNotes(data || []))
  }

  const analyze = async () => {
    if (!form.private_notes && !form.shared_agenda) return
    setAnalyzing(true)
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `Analyze this 1:1 note from a sales enablement manager. Return ONLY a JSON object with: sentiment ("positive"|"neutral"|"concern"), action (1 suggested next action as string), theme (1-2 word tag), session (suggested session topic).
Shared agenda: ${form.shared_agenda}
Private notes: ${form.private_notes}`
          }]
        })
      })
      const data = await res.json()
      const text = data.content?.[0]?.text || '{}'
      const clean = text.replace(/```json|```/g, '').trim()
      setAiResult(JSON.parse(clean))
    } catch { setAiResult({ sentiment: 'neutral', action: 'Follow up next session', theme: 'General', session: 'Discovery practice' }) }
    setAnalyzing(false)
  }

  const sentimentColor = { positive: 'green', neutral: 'gray', concern: 'red' }

  return (
    <div style={{ display: 'flex', gap: 20, height: 'calc(100vh - 120px)' }}>
      <div style={{ width: 200, background: '#fff', border: `1px solid ${S.borderLight}`, borderRadius: 12, padding: 16, overflowY: 'auto', flexShrink: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: S.ink, marginBottom: 14 }}>Reps</div>
        {reps.map(r => (
          <div key={r.id} onClick={() => setSelectedRep(r)} style={{
            padding: '10px 12px', borderRadius: 8, marginBottom: 4, cursor: 'pointer',
            background: selectedRep?.id === r.id ? S.accentBg2 : 'transparent',
            border: `1px solid ${selectedRep?.id === r.id ? S.primary + '40' : 'transparent'}`,
          }}>
            <span style={{ fontWeight: 600, fontSize: 13, color: S.ink }}>{r.name}</span>
          </div>
        ))}
        {reps.length === 0 && <div style={{ fontSize: 13, color: S.muted }}>Add reps in Ramp & Onboarding first</div>}
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: S.ink }}>1:1 Notes</h1>
            <p style={{ color: S.muted, fontSize: 14 }}>{selectedRep ? `Notes for ${selectedRep.name}` : 'Select a rep'}</p>
          </div>
          {selectedRep && <Btn onClick={() => setShowModal(true)}><Plus size={16} />Add Note</Btn>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {notes.map(n => (
            <Card key={n.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: S.muted }}>{new Date(n.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                {n.sentiment && <Badge color={sentimentColor[n.sentiment] || 'gray'}>{n.sentiment}</Badge>}
              </div>
              {n.shared_agenda && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: S.muted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Shared Agenda</div>
                  <p style={{ fontSize: 14, color: S.inkSecondary }}>{n.shared_agenda}</p>
                </div>
              )}
              {n.ai_action && (
                <div style={{ marginTop: 12, padding: '10px 14px', background: S.accentBg, borderRadius: 8, borderLeft: `3px solid ${S.primary}` }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: S.primary, marginBottom: 4 }}>✦ AI Suggestion</div>
                  <p style={{ fontSize: 13, color: S.inkSecondary }}>{n.ai_action}</p>
                </div>
              )}
            </Card>
          ))}
          {notes.length === 0 && <div style={{ textAlign: 'center', color: S.muted, padding: 40 }}>No notes yet for this rep</div>}
        </div>
      </div>

      {showModal && (
        <Modal title={`New 1:1 Note — ${selectedRep?.name}`} onClose={() => { setShowModal(false); setAiResult(null) }} wide>
          <Field label="Shared Agenda (rep can see)"><Textarea value={form.shared_agenda} onChange={e => setForm({ ...form, shared_agenda: e.target.value })} placeholder="Topics to cover together..." /></Field>
          <Field label="Private Notes (only you see)"><Textarea value={form.private_notes} onChange={e => setForm({ ...form, private_notes: e.target.value })} placeholder="Your private observations, concerns, coaching notes..." rows={4} /></Field>
          {!aiResult ? (
            <Btn variant="ghost" onClick={analyze} disabled={analyzing} style={{ marginBottom: 16, color: S.primary, borderColor: S.primary }}>
              {analyzing ? <><Loader size={14} />Analyzing...</> : <><Sparkles size={14} />Analyze with AI</>}
            </Btn>
          ) : (
            <div style={{ background: '#2a2445', borderRadius: 10, padding: 16, marginBottom: 16, border: '1px solid #3a3550' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: S.primaryLight, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}><Sparkles size={12} />AI Analysis</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div><div style={{ fontSize: 11, color: S.muted, marginBottom: 3 }}>Sentiment</div><Badge color={sentimentColor[aiResult.sentiment] || 'gray'}>{aiResult.sentiment}</Badge></div>
                <div><div style={{ fontSize: 11, color: S.muted, marginBottom: 3 }}>Theme</div><span style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>{aiResult.theme}</span></div>
                <div style={{ gridColumn: '1/-1' }}><div style={{ fontSize: 11, color: S.muted, marginBottom: 3 }}>Suggested Action</div><p style={{ fontSize: 13, color: '#ddd' }}>{aiResult.action}</p></div>
                <div style={{ gridColumn: '1/-1' }}><div style={{ fontSize: 11, color: S.muted, marginBottom: 3 }}>Session Idea</div><p style={{ fontSize: 13, color: S.primaryLight }}>{aiResult.session}</p></div>
              </div>
            </div>
          )}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <Btn variant="ghost" onClick={() => { setShowModal(false); setAiResult(null) }}>Cancel</Btn>
            <Btn onClick={save}>Save Note</Btn>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ─── COLLATERALS ───────────────────────────────────────────────────────────────
function Collaterals({ userId }) {
  const [items, setItems] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({ title: '', bucket: 'Battle Card', description: '', link: '' })

  const load = useCallback(async () => {
    const { data } = await supabase.from('collaterals').select('*').eq('user_id', userId).order('created_at', { ascending: false })
    setItems(data || [])
  }, [userId])

  useEffect(() => { load() }, [load])

  const save = async () => {
    await supabase.from('collaterals').insert({ ...form, user_id: userId, usage_count: 0 })
    setShowModal(false)
    setForm({ title: '', bucket: 'Battle Card', description: '', link: '' })
    load()
  }

  const bump = async (id, count) => {
    await supabase.from('collaterals').update({ usage_count: count + 1 }).eq('id', id)
    load()
  }

  const filtered = items.filter(i => i.title?.toLowerCase().includes(search.toLowerCase()))
  const bucketColors = { 'Battle Card': 'red', 'Framework': 'purple', 'One-Pager': 'green', 'Template': 'yellow', 'Guide': 'gray', 'Sequence': 'purple', 'Other': 'gray' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: S.ink }}>Collaterals</h1>
          <p style={{ color: S.muted, fontSize: 14 }}>Your enablement asset library</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search assets..." style={{ padding: '8px 14px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 13, fontFamily: 'var(--font-body)', outline: 'none', color: S.ink }} />
          <Btn onClick={() => setShowModal(true)}><Plus size={16} />Add Asset</Btn>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {filtered.map(item => (
          <Card key={item.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <Badge color={bucketColors[item.bucket] || 'gray'}>{item.bucket}</Badge>
              <span style={{ fontSize: 12, color: S.muted }}>{item.usage_count || 0} uses</span>
            </div>
            <h3 style={{ fontWeight: 700, fontSize: 15, color: S.ink, marginBottom: 6 }}>{item.title}</h3>
            {item.description && <p style={{ fontSize: 13, color: S.muted, marginBottom: 12 }}>{item.description}</p>}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: S.primary, textDecoration: 'none' }}>Open →</a>}
              <Btn size="sm" variant="ghost" onClick={() => bump(item.id, item.usage_count || 0)}>+1 Use</Btn>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && <div style={{ color: S.muted, gridColumn: '1/-1', textAlign: 'center', padding: 40 }}>No collaterals yet. Add your first asset!</div>}
      </div>

      {showModal && (
        <Modal title="Add Collateral" onClose={() => setShowModal(false)}>
          <Field label="Title"><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Asset name" /></Field>
          <Field label="Type">
            <Select value={form.bucket} onChange={e => setForm({ ...form, bucket: e.target.value })}>
              {['Battle Card', 'Framework', 'One-Pager', 'Template', 'Guide', 'Sequence', 'Other'].map(b => <option key={b}>{b}</option>)}
            </Select>
          </Field>
          <Field label="Description"><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="What's this asset for?" rows={2} /></Field>
          <Field label="Link (optional)"><Input value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} placeholder="https://..." /></Field>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <Btn variant="ghost" onClick={() => setShowModal(false)}>Cancel</Btn>
            <Btn onClick={save} disabled={!form.title}>Add Asset</Btn>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ─── SESSIONS ─────────────────────────────────────────────────────────────────
function Sessions({ userId }) {
  const [sessions, setSessions] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ title: '', date: '', type: 'Training', attendees: '' })

  const load = useCallback(async () => {
    const { data } = await supabase.from('sessions').select('*').eq('user_id', userId).order('date', { ascending: true })
    setSessions(data || [])
  }, [userId])

  useEffect(() => { load() }, [load])

  const save = async () => {
    await supabase.from('sessions').insert({ ...form, user_id: userId, completed: false })
    setShowModal(false)
    setForm({ title: '', date: '', type: 'Training', attendees: '' })
    load()
  }

  const markDone = async (id) => {
    await supabase.from('sessions').update({ completed: true }).eq('id', id)
    load()
  }

  const upcoming = sessions.filter(s => !s.completed)
  const completed = sessions.filter(s => s.completed)
  const typeColor = { Training: 'purple', Workshop: 'green', Coaching: 'yellow', Certification: 'red', Other: 'gray' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: S.ink }}>Sessions</h1>
          <p style={{ color: S.muted, fontSize: 14 }}>Schedule and track training sessions</p>
        </div>
        <Btn onClick={() => setShowModal(true)}><Plus size={16} />Schedule Session</Btn>
      </div>

      <h3 style={{ fontWeight: 700, fontSize: 14, color: S.ink, marginBottom: 12 }}>Upcoming ({upcoming.length})</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {upcoming.map(s => (
          <Card key={s.id} style={{ padding: '14px 18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: S.ink }}>{s.title}</span>
                  <Badge color={typeColor[s.type] || 'gray'}>{s.type}</Badge>
                </div>
                <div style={{ display: 'flex', gap: 16, fontSize: 13, color: S.muted }}>
                  {s.date && <span>📅 {new Date(s.date).toLocaleDateString()}</span>}
                  {s.attendees && <span>👥 {s.attendees}</span>}
                </div>
              </div>
              <Btn size="sm" onClick={() => markDone(s.id)}>Mark Done</Btn>
            </div>
          </Card>
        ))}
        {upcoming.length === 0 && <div style={{ color: S.muted, fontSize: 14, padding: '12px 0' }}>No upcoming sessions. Schedule one!</div>}
      </div>

      <h3 style={{ fontWeight: 700, fontSize: 14, color: S.ink, marginBottom: 12 }}>Completed ({completed.length})</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {completed.map(s => (
          <Card key={s.id} style={{ padding: '14px 18px', opacity: 0.7 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Check size={16} color={S.success} />
              <span style={{ fontWeight: 600, fontSize: 14, color: S.ink, textDecoration: 'line-through' }}>{s.title}</span>
              <Badge color={typeColor[s.type] || 'gray'}>{s.type}</Badge>
            </div>
          </Card>
        ))}
      </div>

      {showModal && (
        <Modal title="Schedule Session" onClose={() => setShowModal(false)}>
          <Field label="Title"><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Session name" /></Field>
          <Field label="Date"><Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></Field>
          <Field label="Type">
            <Select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              {['Training', 'Workshop', 'Coaching', 'Certification', 'Other'].map(t => <option key={t}>{t}</option>)}
            </Select>
          </Field>
          <Field label="Attendees"><Input value={form.attendees} onChange={e => setForm({ ...form, attendees: e.target.value })} placeholder="Who's joining?" /></Field>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <Btn variant="ghost" onClick={() => setShowModal(false)}>Cancel</Btn>
            <Btn onClick={save} disabled={!form.title}>Schedule</Btn>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ─── PULSE CHECKS ─────────────────────────────────────────────────────────────
function PulseChecks({ userId }) {
  const [pulses, setPulses] = useState([])
  const [selected, setSelected] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState({ title: '', questions: [''] })

  const load = useCallback(async () => {
    const { data } = await supabase.from('pulse_checks').select('*').eq('user_id', userId).order('created_at', { ascending: false })
    setPulses(data || [])
  }, [userId])

  useEffect(() => { load() }, [load])

  const save = async () => {
    await supabase.from('pulse_checks').insert({ user_id: userId, title: form.title, questions: form.questions.filter(Boolean), responses: [] })
    setShowCreate(false)
    setForm({ title: '', questions: [''] })
    load()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: S.ink }}>Pulse Checks</h1>
          <p style={{ color: S.muted, fontSize: 14 }}>Track team sentiment and readiness</p>
        </div>
        <Btn onClick={() => setShowCreate(true)}><Plus size={16} />Create Pulse</Btn>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {pulses.map(p => (
          <Card key={p.id} onClick={() => setSelected(p)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: S.ink }}>{p.title}</span>
              <Badge color="purple">{p.questions?.length || 0} Qs</Badge>
            </div>
            <div style={{ fontSize: 13, color: S.muted }}>{p.responses?.length || 0} responses</div>
            <div style={{ fontSize: 12, color: S.muted, marginTop: 4 }}>{new Date(p.created_at).toLocaleDateString()}</div>
          </Card>
        ))}
        {pulses.length === 0 && <div style={{ color: S.muted, padding: 40, textAlign: 'center', gridColumn: '1/-1' }}>No pulse checks yet</div>}
      </div>

      {selected && (
        <Modal title={selected.title} onClose={() => setSelected(null)} wide>
          <div style={{ marginBottom: 16 }}>
            {(selected.questions || []).map((q, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ color: '#fff', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>{i + 1}. {q}</div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <div key={n} style={{ flex: 1, height: 8, background: n <= 3 ? S.primary + '40' : '#3a3550', borderRadius: 4 }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ color: S.muted, fontSize: 13 }}>Share this pulse check link with your team to collect responses.</div>
        </Modal>
      )}

      {showCreate && (
        <Modal title="Create Pulse Check" onClose={() => setShowCreate(false)}>
          <Field label="Title"><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Week 3 Readiness Check" /></Field>
          <Field label="Questions">
            {form.questions.map((q, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <Input value={q} onChange={e => { const qs = [...form.questions]; qs[i] = e.target.value; setForm({ ...form, questions: qs }) }} placeholder={`Question ${i + 1}`} />
                {form.questions.length > 1 && <button onClick={() => setForm({ ...form, questions: form.questions.filter((_, j) => j !== i) })} style={{ background: 'none', border: 'none', color: S.muted, cursor: 'pointer' }}><X size={16} /></button>}
              </div>
            ))}
            <Btn size="sm" variant="ghost" onClick={() => setForm({ ...form, questions: [...form.questions, ''] })} style={{ marginTop: 4 }}><Plus size={14} />Add Question</Btn>
          </Field>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
            <Btn variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Btn>
            <Btn onClick={save} disabled={!form.title}>Create</Btn>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ─── WEEKLY PLANNING ──────────────────────────────────────────────────────────
function WeeklyPlanning({ userId }) {
  const [todos, setTodos] = useState([])
  const [adding, setAdding] = useState(null)
  const [newTask, setNewTask] = useState('')

  const load = useCallback(async () => {
    const { data } = await supabase.from('todos').select('*').eq('user_id', userId).order('created_at', { ascending: true })
    setTodos(data || [])
  }, [userId])

  useEffect(() => { load() }, [load])

  const addTask = async (bucket) => {
    if (!newTask.trim()) return
    await supabase.from('todos').insert({ user_id: userId, title: newTask, bucket, done: false })
    setNewTask('')
    setAdding(null)
    load()
  }

  const toggle = async (id, done) => {
    await supabase.from('todos').update({ done: !done }).eq('id', id)
    load()
  }

  const del = async (id) => {
    await supabase.from('todos').delete().eq('id', id)
    load()
  }

  const buckets = [
    { key: 'must', label: 'Must Do', color: S.error, bg: '#fff5f5' },
    { key: 'should', label: 'Should Do', color: S.warning, bg: '#fffbeb' },
    { key: 'could', label: 'Could Do', color: S.primary, bg: S.accentBg },
  ]
  const total = todos.length
  const done = todos.filter(t => t.done).length

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: S.ink, marginBottom: 4 }}>Weekly Planning</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, maxWidth: 300, height: 6, background: S.borderLight, borderRadius: 3 }}>
            <div style={{ height: '100%', width: `${total ? (done / total) * 100 : 0}%`, background: S.primary, borderRadius: 3, transition: 'width 0.3s' }} />
          </div>
          <span style={{ fontSize: 13, color: S.muted }}>{done}/{total} complete</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {buckets.map(b => {
          const items = todos.filter(t => t.bucket === b.key)
          return (
            <div key={b.key} style={{ background: b.bg, border: `1px solid ${b.color}20`, borderRadius: 12, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: b.color }}>{b.label}</span>
                <button onClick={() => setAdding(b.key)} style={{ background: 'none', border: 'none', color: b.color, cursor: 'pointer' }}><Plus size={16} /></button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {items.map(t => (
                  <div key={t.id} style={{ background: '#fff', borderRadius: 8, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8, border: `1px solid ${S.borderLight}` }}>
                    <div onClick={() => toggle(t.id, t.done)} style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${t.done ? b.color : S.border}`, background: t.done ? b.color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                      {t.done && <Check size={11} color="#fff" strokeWidth={3} />}
                    </div>
                    <span style={{ flex: 1, fontSize: 13, color: t.done ? S.muted : S.ink, textDecoration: t.done ? 'line-through' : 'none' }}>{t.title}</span>
                    <button onClick={() => del(t.id)} style={{ background: 'none', border: 'none', color: S.muted, cursor: 'pointer', opacity: 0.5 }}><X size={12} /></button>
                  </div>
                ))}
                {adding === b.key && (
                  <div style={{ background: '#fff', borderRadius: 8, padding: '8px 12px', border: `1px solid ${b.color}` }}>
                    <input autoFocus value={newTask} onChange={e => setNewTask(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') addTask(b.key); if (e.key === 'Escape') setAdding(null) }}
                      placeholder="Add task..." style={{ width: '100%', border: 'none', outline: 'none', fontSize: 13, fontFamily: 'var(--font-body)', color: S.ink }} />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── FORECASTING ──────────────────────────────────────────────────────────────
function Forecasting({ userId }) {
  const [items, setItems] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ title: '', status: 'planned', impact: 'medium', eta: '', notes: '' })

  const load = useCallback(async () => {
    const { data } = await supabase.from('forecast').select('*').eq('user_id', userId).order('created_at', { ascending: false })
    setItems(data || [])
  }, [userId])

  useEffect(() => { load() }, [load])

  const save = async () => {
    await supabase.from('forecast').insert({ ...form, user_id: userId })
    setShowModal(false)
    setForm({ title: '', status: 'planned', impact: 'medium', eta: '', notes: '' })
    load()
  }

  const updateStatus = async (id, status) => {
    await supabase.from('forecast').update({ status }).eq('id', id)
    load()
  }

  const stages = ['backlog', 'planned', 'in-progress', 'done']
  const stageLabels = { backlog: 'Backlog', planned: 'Planned', 'in-progress': 'In Progress', done: 'Done' }
  const impactColor = { critical: 'red', high: 'yellow', medium: 'purple', low: 'gray' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: S.ink }}>Forecasting</h1>
          <p style={{ color: S.muted, fontSize: 14 }}>Enablement project pipeline</p>
        </div>
        <Btn onClick={() => setShowModal(true)}><Plus size={16} />Add Project</Btn>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {stages.map(stage => {
          const stageItems = items.filter(i => i.status === stage)
          return (
            <div key={stage} style={{ background: S.accentBg, borderRadius: 12, padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: S.ink }}>{stageLabels[stage]}</span>
                <Badge color="gray">{stageItems.length}</Badge>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {stageItems.map(item => (
                  <div key={item.id} style={{ background: '#fff', borderRadius: 8, padding: '12px 14px', border: `1px solid ${S.borderLight}` }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: S.ink, marginBottom: 6 }}>{item.title}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Badge color={impactColor[item.impact] || 'gray'}>{item.impact}</Badge>
                      {item.eta && <span style={{ fontSize: 11, color: S.muted }}>{new Date(item.eta).toLocaleDateString()}</span>}
                    </div>
                    <select value={item.status} onChange={e => updateStatus(item.id, e.target.value)} style={{ marginTop: 8, width: '100%', fontSize: 11, border: `1px solid ${S.border}`, borderRadius: 4, padding: '3px 6px', fontFamily: 'var(--font-body)', color: S.inkSecondary, background: '#fff' }}>
                      {stages.map(s => <option key={s} value={s}>{stageLabels[s]}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {showModal && (
        <Modal title="Add Project" onClose={() => setShowModal(false)}>
          <Field label="Title"><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Project name" /></Field>
          <Field label="Status">
            <Select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              {stages.map(s => <option key={s} value={s}>{stageLabels[s]}</option>)}
            </Select>
          </Field>
          <Field label="Impact">
            <Select value={form.impact} onChange={e => setForm({ ...form, impact: e.target.value })}>
              {['critical', 'high', 'medium', 'low'].map(i => <option key={i}>{i}</option>)}
            </Select>
          </Field>
          <Field label="ETA"><Input type="date" value={form.eta} onChange={e => setForm({ ...form, eta: e.target.value })} /></Field>
          <Field label="Notes"><Textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Additional context..." rows={2} /></Field>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <Btn variant="ghost" onClick={() => setShowModal(false)}>Cancel</Btn>
            <Btn onClick={save} disabled={!form.title}>Add</Btn>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ─── LEADERBOARDS ─────────────────────────────────────────────────────────────
function Leaderboards({ userId }) {
  const [boards, setBoards] = useState([])
  const [selected, setSelected] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const [showEntry, setShowEntry] = useState(false)
  const [form, setForm] = useState({ title: '', type: 'weekly', metric: '' })
  const [entry, setEntry] = useState({ name: '', value: '', unit: '' })

  const load = useCallback(async () => {
    const { data } = await supabase.from('leaderboards').select('*').eq('user_id', userId).order('created_at', { ascending: false })
    setBoards(data || [])
  }, [userId])

  useEffect(() => { load() }, [load])

  const createBoard = async () => {
    await supabase.from('leaderboards').insert({ ...form, user_id: userId, entries: [] })
    setShowCreate(false)
    setForm({ title: '', type: 'weekly', metric: '' })
    load()
  }

  const addEntry = async () => {
    const updated = [...(selected.entries || []), { ...entry, value: +entry.value }].sort((a, b) => b.value - a.value)
    await supabase.from('leaderboards').update({ entries: updated }).eq('id', selected.id)
    setSelected({ ...selected, entries: updated })
    setShowEntry(false)
    setEntry({ name: '', value: '', unit: '' })
    load()
  }

  const medals = ['🥇', '🥈', '🥉']

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: S.ink }}>Leaderboards</h1>
          <p style={{ color: S.muted, fontSize: 14 }}>Track and celebrate rep performance</p>
        </div>
        <Btn onClick={() => setShowCreate(true)}><Plus size={16} />Create Board</Btn>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {boards.map(b => (
          <Card key={b.id} onClick={() => setSelected(b)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: S.ink }}>{b.title}</span>
              <Badge color="purple">{b.type}</Badge>
            </div>
            <div style={{ fontSize: 13, color: S.muted, marginBottom: 12 }}>{b.metric}</div>
            {(b.entries || []).slice(0, 3).map((e, i) => {
              const max = b.entries[0]?.value || 1
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 16 }}>{medals[i] || '·'}</span>
                  <span style={{ fontSize: 13, color: S.ink, fontWeight: 600, minWidth: 80 }}>{e.name}</span>
                  <div style={{ flex: 1, height: 6, background: S.borderLight, borderRadius: 3 }}>
                    <div style={{ height: '100%', width: `${(e.value / max) * 100}%`, background: S.primary, borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: 12, color: S.primary, fontWeight: 700 }}>{e.value}{e.unit}</span>
                </div>
              )
            })}
          </Card>
        ))}
        {boards.length === 0 && <div style={{ color: S.muted, gridColumn: '1/-1', textAlign: 'center', padding: 40 }}>No leaderboards yet</div>}
      </div>

      {selected && (
        <Modal title={selected.title} onClose={() => setSelected(null)} wide>
          <div style={{ marginBottom: 16 }}>
            {(selected.entries || []).map((e, i) => {
              const max = selected.entries[0]?.value || 1
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, padding: '8px 12px', background: i < 3 ? S.accentBg : 'transparent', borderRadius: 8 }}>
                  <span style={{ fontSize: 20, minWidth: 28 }}>{medals[i] || `#${i + 1}`}</span>
                  <span style={{ color: '#fff', fontWeight: 700, minWidth: 100 }}>{e.name}</span>
                  <div style={{ flex: 1, height: 8, background: '#3a3550', borderRadius: 4 }}>
                    <div style={{ height: '100%', width: `${(e.value / max) * 100}%`, background: `linear-gradient(90deg, ${S.primary}, ${S.primaryHover})`, borderRadius: 4 }} />
                  </div>
                  <span style={{ color: S.primaryLight, fontWeight: 700 }}>{e.value}{e.unit}</span>
                </div>
              )
            })}
          </div>
          <Btn onClick={() => setShowEntry(true)}><Plus size={14} />Add Entry</Btn>
        </Modal>
      )}

      {showCreate && (
        <Modal title="Create Leaderboard" onClose={() => setShowCreate(false)}>
          <Field label="Title"><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. This Week's Top Callers" /></Field>
          <Field label="Metric"><Input value={form.metric} onChange={e => setForm({ ...form, metric: e.target.value })} placeholder="e.g. Calls made, Demos booked" /></Field>
          <Field label="Type">
            <Select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              {['weekly', 'quarterly', 'ramp', 'collateral'].map(t => <option key={t}>{t}</option>)}
            </Select>
          </Field>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <Btn variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Btn>
            <Btn onClick={createBoard} disabled={!form.title}>Create</Btn>
          </div>
        </Modal>
      )}

      {showEntry && (
        <Modal title="Add Entry" onClose={() => setShowEntry(false)}>
          <Field label="Rep Name"><Input value={entry.name} onChange={e => setEntry({ ...entry, name: e.target.value })} placeholder="Name" /></Field>
          <Field label="Value"><Input type="number" value={entry.value} onChange={e => setEntry({ ...entry, value: e.target.value })} placeholder="Score or count" /></Field>
          <Field label="Unit (optional)"><Input value={entry.unit} onChange={e => setEntry({ ...entry, unit: e.target.value })} placeholder="e.g. calls, %" /></Field>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <Btn variant="ghost" onClick={() => setShowEntry(false)}>Cancel</Btn>
            <Btn onClick={addEntry} disabled={!entry.name || !entry.value}>Add</Btn>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
function SettingsPanel({ user, onSignOut, onReplayWalkthrough }) {
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('member')
  const [inviteStatus, setInviteStatus] = useState('')
  const [members, setMembers] = useState([
    { email: user?.email, role: 'admin', status: 'active', isYou: true },
  ])

  const sendInvite = () => {
    if (!inviteEmail.trim() || !inviteEmail.includes('@')) { setInviteStatus('error'); return }
    const already = members.find(m => m.email.toLowerCase() === inviteEmail.trim().toLowerCase())
    if (already) { setInviteStatus('error'); return }
    setMembers([...members, { email: inviteEmail.trim().toLowerCase(), role: inviteRole, status: 'pending', isYou: false }])
    setInviteEmail('')
    setInviteRole('member')
    setInviteStatus('sent')
    setTimeout(() => setInviteStatus(''), 3000)
  }

  const removeMember = (email) => setMembers(members.filter(m => m.email !== email))

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: S.ink }}>Settings</h1>
        <p style={{ color: S.muted, fontSize: 14 }}>Manage your workspace and team</p>
      </div>

      <Card style={{ marginBottom: 16 }}>
        <h3 style={{ fontWeight: 700, fontSize: 14, color: S.ink, marginBottom: 16, paddingBottom: 12, borderBottom: `1px solid ${S.borderLight}`, fontFamily: 'var(--font-display)' }}>Team Members</h3>
        <div style={{ marginBottom: 20 }}>
          {members.map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: `1px solid ${S.borderLight}` }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${S.primary}, #a78bfa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>{m.email[0].toUpperCase()}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: S.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {m.email} {m.isYou && <span style={{ fontSize: 11, color: S.muted, fontWeight: 400 }}>(you)</span>}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 100, textTransform: 'uppercase', background: m.role === 'admin' ? S.accentBg2 : S.borderLight, color: m.role === 'admin' ? S.primary : S.muted }}>{m.role}</span>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 100, textTransform: 'uppercase', background: m.status === 'active' ? '#d1fae5' : '#fef3c7', color: m.status === 'active' ? S.success : S.warning }}>{m.status}</span>
                {!m.isYou && (
                  <button onClick={() => removeMember(m.email)} style={{ background: 'none', border: 'none', color: S.muted, cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: '0 2px' }}
                    onMouseEnter={e => e.currentTarget.style.color = S.error}
                    onMouseLeave={e => e.currentTarget.style.color = S.muted}
                  >×</button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: S.accentBg, borderRadius: 10, padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: S.inkSecondary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Invite someone</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <input
              value={inviteEmail}
              onChange={e => { setInviteEmail(e.target.value); setInviteStatus('') }}
              onKeyDown={e => e.key === 'Enter' && sendInvite()}
              placeholder="colleague@company.com"
              style={{ flex: 1, padding: '9px 12px', border: `1px solid ${inviteStatus === 'error' ? S.error : S.border}`, borderRadius: 8, fontSize: 13, fontFamily: 'var(--font-body)', outline: 'none', color: S.ink, background: '#fff' }}
              onFocus={e => e.target.style.borderColor = S.primary}
              onBlur={e => e.target.style.borderColor = inviteStatus === 'error' ? S.error : S.border}
            />
            <select
              value={inviteRole}
              onChange={e => setInviteRole(e.target.value)}
              style={{ padding: '9px 12px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 13, fontFamily: 'var(--font-body)', outline: 'none', color: S.ink, background: '#fff', cursor: 'pointer' }}
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
            <Btn onClick={sendInvite}>Invite</Btn>
          </div>
          <div style={{ fontSize: 12, color: S.muted, lineHeight: 1.6 }}>
            <strong>Admin</strong> — full access, can invite & manage members.<br />
            <strong>Member</strong> — can use all features, cannot change settings.
          </div>
          {inviteStatus === 'sent' && (
            <div style={{ marginTop: 10, padding: '8px 12px', background: '#d1fae5', borderRadius: 7, fontSize: 13, color: S.success, fontWeight: 600 }}>
              ✓ Invite added — they'll get access when they sign up with that email.
            </div>
          )}
          {inviteStatus === 'error' && (
            <div style={{ marginTop: 10, padding: '8px 12px', background: '#fee2e2', borderRadius: 7, fontSize: 13, color: S.error, fontWeight: 600 }}>
              Enter a valid email that isn't already in the workspace.
            </div>
          )}
        </div>
      </Card>

      {[
        { title: 'Workspace', items: [{ label: 'Account Email', value: user?.email }, { label: 'Workspace Name', value: 'My Workspace' }] },
        { title: 'Integrations', items: [{ label: 'CRM (Salesforce/HubSpot)', value: 'Coming soon', badge: 'soon' }, { label: 'Gong', value: 'Coming soon', badge: 'soon' }, { label: 'Slack', value: 'Coming soon', badge: 'soon' }, { label: 'Google Calendar', value: 'Coming soon', badge: 'soon' }] },
        { title: 'Platform', items: [{ label: 'AI Engine', value: 'Claude Sonnet (Anthropic)' }, { label: 'Version', value: 'EnableOS 1.0 Beta' }] },
      ].map(group => (
        <Card key={group.title} style={{ marginBottom: 16 }}>
          <h3 style={{ fontWeight: 700, fontSize: 14, color: S.ink, marginBottom: 16, paddingBottom: 12, borderBottom: `1px solid ${S.borderLight}` }}>{group.title}</h3>
          {group.items.map(item => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${S.borderLight}` }}>
              <span style={{ fontSize: 14, color: S.inkSecondary }}>{item.label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {item.badge && <Badge color="gray">{item.badge}</Badge>}
                <span style={{ fontSize: 14, color: S.muted }}>{item.value}</span>
              </div>
            </div>
          ))}
        </Card>
      ))}

      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={onReplayWalkthrough}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 8, border: `1px solid ${S.border}`, background: 'transparent', color: S.inkSecondary, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}
        >
          <Sparkles size={14} />Replay Walkthrough
        </button>
        <Btn variant="danger" onClick={onSignOut} style={{ background: '#fef2f2', color: S.error, border: '1px solid #fecaca' }}>
          <LogOut size={16} />Sign Out
        </Btn>
      </div>
    </div>
  )
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, group: 'CORE' },
  { id: 'intake', label: 'Intake', icon: Inbox, group: 'CORE' },
  { id: 'ramp', label: 'Ramp & Onboarding', icon: Users, group: 'CORE' },
  { id: 'notes', label: '1:1 Notes', icon: MessageSquare, group: 'CORE' },
  { id: 'collaterals', label: 'Collaterals', icon: BookOpen, group: 'CORE' },
  { id: 'sessions', label: 'Sessions', icon: Video, group: 'CORE' },
  { id: 'pulse', label: 'Pulse Checks', icon: Activity, group: 'OPERATIONS' },
  { id: 'planning', label: 'Weekly Planning', icon: Calendar, group: 'OPERATIONS' },
  { id: 'forecasting', label: 'Forecasting', icon: TrendingUp, group: 'OPERATIONS' },
  { id: 'leaderboards', label: 'Leaderboards', icon: Trophy, group: 'OPERATIONS' },
  { id: 'settings', label: 'Settings', icon: Settings, group: null },
  { id: 'featurereqs', label: 'Feature Requests', icon: Star, group: null },
]

// ─── FEATURE REQUESTS ─────────────────────────────────────────────────────────
function FeatureRequests() {
  const [submitted, setSubmitted] = useState(false)
  const [voted, setVoted] = useState([])
  const [votes, setVotes] = useState({ 0: 34, 1: 28, 2: 22, 3: 19, 4: 17, 5: 31, 6: 14, 7: 26 })
  const [form, setForm] = useState({ title: '', description: '', category: 'Platform' })
  const categories = ['Platform', 'Integrations', 'AI', 'Analytics', 'Other']

  const existing = [
    { title: 'Enablement ROI dashboard — which assets closed which deals', status: 'roadmap', category: 'Analytics' },
    { title: 'Google Calendar integration', status: 'planned', category: 'Integrations' },
    { title: 'Slack intake bot — submit requests from Slack', status: 'planned', category: 'Integrations' },
    { title: 'Salesforce / HubSpot CRM sync', status: 'planned', category: 'Integrations' },
    { title: 'Gong integration — pull call themes into 1:1 notes', status: 'considering', category: 'Integrations' },
    { title: 'AI-generated onboarding plans per rep', status: 'considering', category: 'AI' },
    { title: 'Multi-seat workspaces for larger teams', status: 'roadmap', category: 'Platform' },
    { title: 'Public-facing hub for reps to self-serve assets', status: 'considering', category: 'Platform' },
  ]

  const statusStyle = {
    planned: { bg: '#dbeafe', color: '#1d4ed8', label: 'Planned' },
    considering: { bg: S.accentBg2, color: S.primary, label: 'Considering' },
    roadmap: { bg: '#d1fae5', color: '#065f46', label: 'On Roadmap' },
  }

  const vote = (i) => {
    if (voted.includes(i)) return
    setVoted([...voted, i])
    setVotes({ ...votes, [i]: votes[i] + 1 })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: S.ink }}>Feature Requests</h1>
          <p style={{ color: S.muted, fontSize: 14 }}>Vote on what we build next, or suggest something new</p>
        </div>
        <a href="/feature-requests" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: S.primary, textDecoration: 'none', fontWeight: 600 }}>Public page →</a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20 }}>
        <div>
          <h3 style={{ fontWeight: 700, fontSize: 14, color: S.ink, marginBottom: 14 }}>Top requests</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {existing.map((f, i) => {
              const s = statusStyle[f.status]
              const hasVoted = voted.includes(i)
              return (
                <Card key={i} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <button onClick={() => vote(i)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: hasVoted ? S.accentBg2 : S.accentBg, border: `1px solid ${hasVoted ? S.primary : S.border}`, borderRadius: 8, padding: '7px 10px', cursor: hasVoted ? 'default' : 'pointer', minWidth: 48, transition: 'all 0.15s' }}>
                    <Star size={13} color={hasVoted ? S.primary : S.muted} fill={hasVoted ? S.primary : 'none'} strokeWidth={2} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: hasVoted ? S.primary : S.muted }}>{votes[i]}</span>
                  </button>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: S.ink, marginBottom: 5 }}>{f.title}</div>
                    <div style={{ display: 'flex', gap: 7 }}>
                      <span style={{ background: s.bg, color: s.color, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</span>
                      <span style={{ fontSize: 11, color: S.muted }}>{f.category}</span>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        <div>
          <Card>
            <h3 style={{ fontWeight: 700, fontSize: 14, color: S.ink, marginBottom: 16, fontFamily: 'var(--font-display)' }}>
              {submitted ? '✓ Thanks!' : 'Suggest a feature'}
            </h3>
            {submitted ? (
              <div>
                <p style={{ fontSize: 13, color: S.muted, marginBottom: 14, lineHeight: 1.6 }}>We read every request. If it fits the roadmap, it'll show up on the board.</p>
                <Btn size="sm" variant="ghost" onClick={() => { setSubmitted(false); setForm({ title: '', description: '', category: 'Platform' }) }}>Submit another</Btn>
              </div>
            ) : (
              <div>
                <Field label="Title"><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="What should we build?" style={{ width: '100%', padding: '9px 12px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 13, fontFamily: 'var(--font-body)', outline: 'none', color: S.ink, background: '#fff' }} onFocus={e => e.target.style.borderColor = S.primary} onBlur={e => e.target.style.borderColor = S.border} /></Field>
                <Field label="Category">
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {categories.map(c => (
                      <button type="button" key={c} onClick={() => setForm({ ...form, category: c })}
                        style={{ padding: '4px 10px', borderRadius: 100, border: `1px solid ${form.category === c ? S.primary : S.border}`, background: form.category === c ? S.accentBg2 : '#fff', color: form.category === c ? S.primary : S.inkSecondary, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                        {c}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Why do you need this?"><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="What problem does it solve?" rows={3} style={{ width: '100%', padding: '9px 12px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 13, fontFamily: 'var(--font-body)', outline: 'none', color: S.ink, background: '#fff', resize: 'vertical' }} onFocus={e => e.target.style.borderColor = S.primary} onBlur={e => e.target.style.borderColor = S.border} /></Field>
                <Btn onClick={() => form.title && setSubmitted(true)} disabled={!form.title} style={{ width: '100%', justifyContent: 'center' }}>Submit Request</Btn>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showWalkthrough, setShowWalkthrough] = useState(false)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push('/login'); return }
      setUser(user)
      setLoading(false)
      const seen = localStorage.getItem(`eos_walked_${user.id}`)
      if (!seen) {
        setTimeout(() => setShowWalkthrough(true), 600)
        localStorage.setItem(`eos_walked_${user.id}`, '1')
      }
    })
  }, [router])

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: S.canvas }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg, ${S.primary}, #a78bfa)`, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Zap size={20} color="#fff" />
        </div>
        <div style={{ color: S.muted, fontSize: 14 }}>Loading EnableOS...</div>
      </div>
    </div>
  )

  const groups = ['CORE', 'OPERATIONS']
  const renderView = () => {
    const props = { userId: user.id }
    switch (activeTab) {
      case 'dashboard': return <Dashboard {...props} />
      case 'intake': return <Intake {...props} />
      case 'ramp': return <Ramp {...props} />
      case 'notes': return <Notes {...props} />
      case 'collaterals': return <Collaterals {...props} />
      case 'sessions': return <Sessions {...props} />
      case 'pulse': return <PulseChecks {...props} />
      case 'planning': return <WeeklyPlanning {...props} />
      case 'forecasting': return <Forecasting {...props} />
      case 'leaderboards': return <Leaderboards {...props} />
      case 'settings': return <SettingsPanel user={user} onSignOut={signOut} onReplayWalkthrough={() => setShowWalkthrough(true)} />
      case 'featurereqs': return <FeatureRequests />
      default: return <Dashboard {...props} />
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: S.canvas, overflow: 'hidden' }}>
      {showWalkthrough && (
        <Walkthrough onClose={() => setShowWalkthrough(false)} onNavigate={setActiveTab} />
      )}

      {/* Sidebar */}
      <div style={{ width: S.sidebar.width, background: S.sidebar.background, display: 'flex', flexDirection: 'column', flexShrink: 0, overflowY: 'auto' }}>
        {/* Logo */}
        <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <SidebarLogo />
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {groups.map(group => (
            <div key={group} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', padding: '0 8px', marginBottom: 6 }}>{group}</div>
              {NAV.filter(n => n.group === group).map(item => {
                const active = activeTab === item.id
                return (
                  <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                    padding: '9px 10px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: active ? `${S.primary}25` : 'transparent',
                    color: active ? '#fff' : 'rgba(255,255,255,0.5)',
                    fontSize: 13, fontWeight: active ? 600 : 400, fontFamily: 'var(--font-body)',
                    marginBottom: 2, transition: 'all 0.15s', textAlign: 'left',
                    borderLeft: active ? `2px solid ${S.primary}` : '2px solid transparent',
                  }}>
                    <item.icon size={16} />
                    {item.label}
                  </button>
                )
              })}
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16 }}>
            {NAV.filter(n => n.group === null).map(item => {
              const active = activeTab === item.id
              return (
                <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 10px', borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: active ? `${S.primary}25` : 'transparent',
                  color: active ? '#fff' : 'rgba(255,255,255,0.5)',
                  fontSize: 13, fontWeight: active ? 600 : 400, fontFamily: 'var(--font-body)',
                  transition: 'all 0.15s', textAlign: 'left',
                  borderLeft: active ? `2px solid ${S.primary}` : '2px solid transparent',
                }}>
                  <item.icon size={16} />
                  {item.label}
                </button>
              )
            })}
          </div>
        </nav>

        {/* User */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {user?.email === ADMIN_EMAIL && <WorkspaceSwitcher current="personal" />}
          <button
            onClick={() => setShowWalkthrough(true)}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 7, padding: '7px 10px', borderRadius: 7, border: 'none', background: 'rgba(124,92,252,0.12)', color: '#BDA9FF', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', marginBottom: 10 }}
          >
            <Sparkles size={12} />Replay walkthrough
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${S.primary}, #a78bfa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>{user?.email?.[0]?.toUpperCase()}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, color: '#fff', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Enablement Manager</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 36px' }}>
        {renderView()}
      </div>
    </div>
  )
}
