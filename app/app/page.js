'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '../../lib/supabase'

const supabase = createClient()

// ─── LOGO COMPONENT (shared across sidebar + login) ──────────────
function LogoIcon({ size = 44 }) {
  return (
    <div style={{
      width: `${size}px`, height: `${size}px`,
      background: 'linear-gradient(135deg, #7C5CFC, #9B7EFF)',
      borderRadius: `${Math.round(size * 0.27)}px`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 16px rgba(124,92,252,0.45)',
      flexShrink: 0,
    }}>
      <svg width={Math.round(size * 0.59)} height={Math.round(size * 0.59)} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

// ─── NAV ITEMS ────────────────────────────────────────────────────
const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞', section: 'main' },
  { id: 'intake', label: 'Intake', icon: '📋', section: 'manage' },
  { id: 'ramp', label: 'Ramp & Onboarding', icon: '🚀', section: 'manage' },
  { id: 'notes', label: '1:1 Notes', icon: '📝', section: 'manage' },
  { id: 'collaterals', label: 'Collaterals', icon: '📁', section: 'manage' },
  { id: 'sessions', label: 'Sessions', icon: '🎯', section: 'manage' },
  { id: 'pulse', label: 'Pulse Checks', icon: '💓', section: 'performance' },
  { id: 'planning', label: 'Weekly Planning', icon: '📅', section: 'performance' },
  { id: 'forecast', label: 'Forecasting', icon: '📈', section: 'performance' },
  { id: 'leaderboard', label: 'Leaderboard', icon: '🏆', section: 'performance' },
  { id: 'settings', label: 'Settings', icon: '⚙️', section: 'account' },
]

// ─── SIDEBAR ──────────────────────────────────────────────────────
function Sidebar({ active, setActive, user, onSignOut }) {
  const sections = { main: 'Overview', manage: 'Manage', performance: 'Performance', account: 'Account' }
  return (
    <aside className="sidebar">
      {/* ── LOGO — properly sized ── */}
      <div className="sidebar-logo">
        <div className="logo-mark">
          <LogoIcon size={44} />
          <div className="logo-text">
            <div className="logo-name">EnableOS</div>
            <div className="logo-tagline">Enablement OS</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {Object.entries(sections).map(([key, label]) => {
          const items = NAV.filter(n => n.section === key)
          return (
            <div key={key}>
              <div className="nav-section-label">{label}</div>
              {items.map(item => (
                <button
                  key={item.id}
                  className={`nav-item ${active === item.id ? 'active' : ''}`}
                  onClick={() => setActive(item.id)}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          )
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="user-pill" onClick={onSignOut} title="Click to sign out">
          <div className="avatar">{user?.email?.[0]?.toUpperCase() || 'U'}</div>
          <div className="user-info">
            <div className="user-name">{user?.email?.split('@')[0] || 'User'}</div>
            <div className="user-role">Sign out</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

// ─── DASHBOARD ────────────────────────────────────────────────────
function Dashboard({ user }) {
  const [stats, setStats] = useState({ reps: 0, requests: 0, notes: 0, sessions: 0 })

  useEffect(() => {
    async function load() {
      const [repsRes, reqRes, notesRes, sessRes] = await Promise.all([
        supabase.from('reps').select('id', { count: 'exact' }).eq('user_id', user.id),
        supabase.from('requests').select('id', { count: 'exact' }).eq('user_id', user.id),
        supabase.from('notes').select('id', { count: 'exact' }).eq('user_id', user.id),
        supabase.from('sessions').select('id', { count: 'exact' }).eq('user_id', user.id),
      ])
      setStats({
        reps: repsRes.count || 0,
        requests: reqRes.count || 0,
        notes: notesRes.count || 0,
        sessions: sessRes.count || 0,
      })
    }
    load()
  }, [user.id])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="page-content">
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '700', color: 'var(--plum)', marginBottom: '6px' }}>
          {greeting} 👋
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Here's what's happening with your team today.</p>
      </div>

      <div className="stats-grid">
        {[
          { label: 'Active Reps', value: stats.reps, delta: 'in your team' },
          { label: 'Open Requests', value: stats.requests, delta: 'to prioritise' },
          { label: 'Coaching Notes', value: stats.notes, delta: 'logged' },
          { label: 'Sessions Run', value: stats.sessions, delta: 'this quarter' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-delta">{s.delta}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Quick Actions</div>
            <div className="card-subtitle">Jump straight into the most common tasks</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            { label: '+ Add Rep', action: 'ramp' },
            { label: '+ Log Note', action: 'notes' },
            { label: '+ New Request', action: 'intake' },
            { label: '+ Run Pulse Check', action: 'pulse' },
          ].map((q, i) => (
            <button key={i} className="btn btn-ghost btn-sm">{q.label}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── RAMP & ONBOARDING (with reps bug fix) ───────────────────────
function RampOnboarding({ user }) {
  const [reps, setReps] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', role: '', start_date: '', region: '', manager: '' })

  const loadReps = useCallback(async () => {
    const { data } = await supabase.from('reps').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
    setReps(data || [])
    setLoading(false)
  }, [user.id])

  useEffect(() => { loadReps() }, [loadReps])

  const saveRep = async () => {
    if (!form.name.trim()) { setError('Name is required'); return }
    setSaving(true)
    setError('')
    // ── BUG FIX: progress is jsonb — send as object, not string ──
    const payload = {
      user_id: user.id,
      name: form.name.trim(),
      role: form.role.trim() || null,
      start_date: form.start_date || null,
      region: form.region.trim() || null,
      manager: form.manager.trim() || null,
      status: 'active',
      progress: { week1: false, week2: false, week3: false, week4: false },
    }
    const { error: err } = await supabase.from('reps').insert([payload])
    if (err) {
      setError(err.message)
      setSaving(false)
      return
    }
    setForm({ name: '', role: '', start_date: '', region: '', manager: '' })
    setShowModal(false)
    setSaving(false)
    loadReps()
  }

  const weeks = (start) => {
    if (!start) return '—'
    const diff = Math.floor((new Date() - new Date(start)) / 604800000)
    return `Week ${diff + 1}`
  }

  return (
    <div className="page-content">
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Ramp & Onboarding</div>
            <div className="card-subtitle">Track every rep's ramp progress from day one</div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>+ Add Rep</button>
        </div>

        {loading ? (
          <div className="loading"><div className="spinner" /></div>
        ) : reps.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🚀</div>
            <div className="empty-title">No reps yet</div>
            <div className="empty-desc">Add your first rep to start tracking their ramp.</div>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add First Rep</button>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Region</th>
                  <th>Manager</th>
                  <th>Start Date</th>
                  <th>Week</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {reps.map(rep => (
                  <tr key={rep.id}>
                    <td style={{ fontWeight: 600 }}>{rep.name}</td>
                    <td>{rep.role || '—'}</td>
                    <td>{rep.region || '—'}</td>
                    <td>{rep.manager || '—'}</td>
                    <td>{rep.start_date ? new Date(rep.start_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}</td>
                    <td>{weeks(rep.start_date)}</td>
                    <td><span className={`badge badge-${rep.status === 'active' ? 'green' : 'gray'}`}>{rep.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">Add New Rep</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            {error && <div className="alert alert-error">{error}</div>}
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input className="form-input" placeholder="Sarah Chen" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <input className="form-input" placeholder="SDR" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input className="form-input" type="date" value={form.start_date} onChange={e => setForm({ ...form, start_date: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Region</label>
                <input className="form-input" placeholder="EMEA / NAM / APAC" value={form.region} onChange={e => setForm({ ...form, region: e.target.value })} />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Manager</label>
                <input className="form-input" placeholder="Manager name" value={form.manager} onChange={e => setForm({ ...form, manager: e.target.value })} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveRep} disabled={saving}>{saving ? 'Saving…' : 'Add Rep'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── INTAKE ───────────────────────────────────────────────────────
function Intake({ user }) {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ title: '', requester: '', category: '', impact: 3, urgency: 3, effort: 3, notes: '' })

  const load = useCallback(async () => {
    const { data } = await supabase.from('requests').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
    setRequests(data || [])
    setLoading(false)
  }, [user.id])

  useEffect(() => { load() }, [load])

  const priorityScore = (impact, urgency, effort) => Math.round((impact * urgency) / effort)
  const priorityLabel = (score) => score >= 5 ? 'High' : score >= 3 ? 'Medium' : 'Low'
  const priorityClass = (score) => score >= 5 ? 'priority-high' : score >= 3 ? 'priority-medium' : 'priority-low'

  const save = async () => {
    if (!form.title.trim()) return
    setSaving(true)
    const score = priorityScore(form.impact, form.urgency, form.effort)
    await supabase.from('requests').insert([{
      user_id: user.id,
      title: form.title.trim(),
      requester: form.requester.trim() || null,
      category: form.category || null,
      impact: form.impact,
      urgency: form.urgency,
      effort: form.effort,
      priority_score: score,
      notes: form.notes.trim() || null,
      status: 'open',
    }])
    setForm({ title: '', requester: '', category: '', impact: 3, urgency: 3, effort: 3, notes: '' })
    setShowModal(false)
    setSaving(false)
    load()
  }

  return (
    <div className="page-content">
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Intake & Prioritization</div>
            <div className="card-subtitle">Score every request by Impact × Urgency ÷ Effort</div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>+ New Request</button>
        </div>
        {loading ? <div className="loading"><div className="spinner" /></div> : requests.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <div className="empty-title">No requests yet</div>
            <div className="empty-desc">Log your first enablement request to start prioritising.</div>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ New Request</button>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead><tr><th>Request</th><th>From</th><th>Category</th><th>Score</th><th>Priority</th><th>Status</th></tr></thead>
              <tbody>
                {requests.map(r => {
                  const score = r.priority_score || priorityScore(r.impact, r.urgency, r.effort)
                  return (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 600 }}>{r.title}</td>
                      <td>{r.requester || '—'}</td>
                      <td>{r.category || '—'}</td>
                      <td><strong>{score}</strong></td>
                      <td><span className={`badge ${priorityClass(score)}`}>{priorityLabel(score)}</span></td>
                      <td><span className="badge badge-purple">{r.status}</span></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">New Enablement Request</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="form-group">
              <label className="form-label">Request Title *</label>
              <input className="form-input" placeholder="e.g. Cold email sequence for enterprise" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Requested By</label>
                <input className="form-input" placeholder="Name or team" value={form.requester} onChange={e => setForm({ ...form, requester: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  <option value="">Select…</option>
                  <option>Playbook</option>
                  <option>Training</option>
                  <option>Collateral</option>
                  <option>Process</option>
                  <option>Tool</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="grid-3">
              {['impact', 'urgency', 'effort'].map(field => (
                <div key={field} className="form-group">
                  <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)} (1-5)</label>
                  <input className="form-input" type="number" min="1" max="5" value={form[field]} onChange={e => setForm({ ...form, [field]: parseInt(e.target.value) || 1 })} />
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--lavender-pale)', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', fontSize: '13.5px' }}>
              Priority Score: <strong>{priorityScore(form.impact, form.urgency, form.effort)}</strong> →{' '}
              <span className={`badge ${priorityClass(priorityScore(form.impact, form.urgency, form.effort))}`}>
                {priorityLabel(priorityScore(form.impact, form.urgency, form.effort))}
              </span>
            </div>
            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea className="form-input" placeholder="Additional context…" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Add Request'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── NOTES ────────────────────────────────────────────────────────
function Notes({ user }) {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ rep_name: '', session_date: '', content: '', action_items: '' })

  const load = useCallback(async () => {
    const { data } = await supabase.from('notes').select('*').eq('user_id', user.id).order('session_date', { ascending: false })
    setNotes(data || [])
    setLoading(false)
  }, [user.id])

  useEffect(() => { load() }, [load])

  const save = async () => {
    if (!form.rep_name.trim() || !form.content.trim()) return
    setSaving(true)
    await supabase.from('notes').insert([{
      user_id: user.id,
      rep_name: form.rep_name.trim(),
      session_date: form.session_date || new Date().toISOString().split('T')[0],
      content: form.content.trim(),
      action_items: form.action_items.trim() || null,
    }])
    setForm({ rep_name: '', session_date: '', content: '', action_items: '' })
    setShowModal(false)
    setSaving(false)
    load()
  }

  return (
    <div className="page-content">
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">1:1 Notes</div>
            <div className="card-subtitle">Log coaching sessions and track action items</div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>+ Log Note</button>
        </div>
        {loading ? <div className="loading"><div className="spinner" /></div> : notes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <div className="empty-title">No notes yet</div>
            <div className="empty-desc">Start logging your 1:1 coaching sessions.</div>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Log First Note</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {notes.map(n => (
              <div key={n.id} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--plum)' }}>{n.rep_name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {n.session_date ? new Date(n.session_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                  </div>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: '1.6', marginBottom: '10px' }}>{n.content}</p>
                {n.action_items && (
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
                    <strong>Action items:</strong> {n.action_items}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">Log 1:1 Note</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Rep Name *</label>
                <input className="form-input" placeholder="Sarah Chen" value={form.rep_name} onChange={e => setForm({ ...form, rep_name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Session Date</label>
                <input className="form-input" type="date" value={form.session_date} onChange={e => setForm({ ...form, session_date: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Notes *</label>
              <textarea className="form-input" style={{ minHeight: '120px' }} placeholder="What was discussed…" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Action Items</label>
              <textarea className="form-input" placeholder="Follow-ups and commitments…" value={form.action_items} onChange={e => setForm({ ...form, action_items: e.target.value })} />
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save Note'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── PULSE CHECKS ─────────────────────────────────────────────────
function PulseChecks({ user }) {
  const [checks, setChecks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ rep_name: '', week: '', confidence: 3, blockers: '', wins: '' })

  const load = useCallback(async () => {
    const { data } = await supabase.from('pulse_checks').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
    setChecks(data || [])
    setLoading(false)
  }, [user.id])

  useEffect(() => { load() }, [load])

  const save = async () => {
    if (!form.rep_name.trim()) return
    setSaving(true)
    await supabase.from('pulse_checks').insert([{
      user_id: user.id,
      rep_name: form.rep_name.trim(),
      week: form.week.trim() || null,
      confidence_score: form.confidence,
      blockers: form.blockers.trim() || null,
      wins: form.wins.trim() || null,
    }])
    setForm({ rep_name: '', week: '', confidence: 3, blockers: '', wins: '' })
    setShowModal(false)
    setSaving(false)
    load()
  }

  const confColor = (score) => score >= 4 ? 'badge-green' : score >= 3 ? 'badge-amber' : 'badge-red'

  return (
    <div className="page-content">
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Pulse Checks</div>
            <div className="card-subtitle">Weekly rep confidence and blocker tracking</div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>+ Add Check</button>
        </div>
        {loading ? <div className="loading"><div className="spinner" /></div> : checks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💓</div>
            <div className="empty-title">No pulse checks yet</div>
            <div className="empty-desc">Run your first pulse check to track rep sentiment.</div>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Check</button>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead><tr><th>Rep</th><th>Week</th><th>Confidence</th><th>Blockers</th><th>Wins</th></tr></thead>
              <tbody>
                {checks.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 600 }}>{c.rep_name}</td>
                    <td>{c.week || '—'}</td>
                    <td><span className={`badge ${confColor(c.confidence_score)}`}>{c.confidence_score}/5</span></td>
                    <td style={{ maxWidth: '200px', fontSize: '13px' }}>{c.blockers || '—'}</td>
                    <td style={{ maxWidth: '200px', fontSize: '13px' }}>{c.wins || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">Pulse Check</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Rep Name *</label>
                <input className="form-input" placeholder="Sarah Chen" value={form.rep_name} onChange={e => setForm({ ...form, rep_name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Week</label>
                <input className="form-input" placeholder="e.g. Week 3" value={form.week} onChange={e => setForm({ ...form, week: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Confidence Score (1-5)</label>
              <input className="form-input" type="number" min="1" max="5" value={form.confidence} onChange={e => setForm({ ...form, confidence: parseInt(e.target.value) || 1 })} />
            </div>
            <div className="form-group">
              <label className="form-label">Blockers</label>
              <textarea className="form-input" placeholder="What's slowing them down?" value={form.blockers} onChange={e => setForm({ ...form, blockers: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Wins</label>
              <textarea className="form-input" placeholder="What went well this week?" value={form.wins} onChange={e => setForm({ ...form, wins: e.target.value })} />
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save Check'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── WEEKLY PLANNING ──────────────────────────────────────────────
function WeeklyPlanning({ user }) {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [newItem, setNewItem] = useState({ text: '', priority: 'must' })
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    const { data } = await supabase.from('todos').select('*').eq('user_id', user.id).order('created_at', { ascending: true })
    setTodos(data || [])
    setLoading(false)
  }, [user.id])

  useEffect(() => { load() }, [load])

  const add = async () => {
    if (!newItem.text.trim() || saving) return
    setSaving(true)
    await supabase.from('todos').insert([{ user_id: user.id, text: newItem.text.trim(), priority: newItem.priority, done: false }])
    setNewItem({ text: '', priority: 'must' })
    setSaving(false)
    load()
  }

  const toggle = async (id, done) => {
    await supabase.from('todos').update({ done: !done }).eq('id', id)
    load()
  }

  const columns = ['must', 'should', 'could']
  const labels = { must: '🔴 Must Do', should: '🟡 Should Do', could: '🟢 Could Do' }

  return (
    <div className="page-content">
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="card-title" style={{ marginBottom: '16px' }}>Add Task</div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input className="form-input" placeholder="What needs to get done this week?" value={newItem.text}
            onChange={e => setNewItem({ ...newItem, text: e.target.value })}
            onKeyDown={e => e.key === 'Enter' && add()}
            style={{ flex: 1, marginBottom: 0 }} />
          <select className="form-input" value={newItem.priority} onChange={e => setNewItem({ ...newItem, priority: e.target.value })} style={{ width: '140px', marginBottom: 0 }}>
            <option value="must">Must Do</option>
            <option value="should">Should Do</option>
            <option value="could">Could Do</option>
          </select>
          <button className="btn btn-primary" onClick={add} disabled={saving}>Add</button>
        </div>
      </div>

      {loading ? <div className="loading"><div className="spinner" /></div> : (
        <div className="grid-3">
          {columns.map(col => (
            <div key={col} className="card">
              <div className="card-title" style={{ marginBottom: '16px' }}>{labels[col]}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {todos.filter(t => t.priority === col).length === 0 ? (
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic', padding: '8px 0' }}>Nothing here yet</div>
                ) : todos.filter(t => t.priority === col).map(t => (
                  <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => toggle(t.id, t.done)}>
                    <div style={{
                      width: '18px', height: '18px', borderRadius: '5px', flexShrink: 0,
                      border: `2px solid ${t.done ? 'var(--lavender)' : 'var(--border)'}`,
                      background: t.done ? 'var(--lavender)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {t.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>}
                    </div>
                    <span style={{ fontSize: '13.5px', textDecoration: t.done ? 'line-through' : 'none', color: t.done ? 'var(--text-muted)' : 'var(--text)' }}>{t.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── COLLATERALS ──────────────────────────────────────────────────
function Collaterals({ user }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ title: '', category: '', url: '', description: '' })

  const load = useCallback(async () => {
    const { data } = await supabase.from('collaterals').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
    setItems(data || [])
    setLoading(false)
  }, [user.id])

  useEffect(() => { load() }, [load])

  const save = async () => {
    if (!form.title.trim()) return
    setSaving(true)
    await supabase.from('collaterals').insert([{ user_id: user.id, title: form.title.trim(), category: form.category || null, url: form.url.trim() || null, description: form.description.trim() || null }])
    setForm({ title: '', category: '', url: '', description: '' })
    setShowModal(false)
    setSaving(false)
    load()
  }

  return (
    <div className="page-content">
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Collaterals</div>
            <div className="card-subtitle">All your playbooks, decks, and resources in one place</div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>+ Add Collateral</button>
        </div>
        {loading ? <div className="loading"><div className="spinner" /></div> : items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📁</div>
            <div className="empty-title">No collaterals yet</div>
            <div className="empty-desc">Start adding your playbooks and resources.</div>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Collateral</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
            {items.map(c => (
              <div key={c.id} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--plum)' }}>{c.title}</div>
                  {c.category && <span className="badge badge-purple">{c.category}</span>}
                </div>
                {c.description && <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px', lineHeight: '1.5' }}>{c.description}</div>}
                {c.url && <a href={c.url} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{ fontSize: '12px' }}>Open ↗</a>}
              </div>
            ))}
          </div>
        )}
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">Add Collateral</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="form-group">
              <label className="form-label">Title *</label>
              <input className="form-input" placeholder="e.g. Enterprise Cold Email Playbook" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  <option value="">Select…</option>
                  <option>Playbook</option><option>Deck</option><option>Template</option><option>Guide</option><option>Video</option><option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">URL / Link</label>
                <input className="form-input" placeholder="https://…" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-input" placeholder="What is this and when to use it?" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Add'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── SESSIONS ─────────────────────────────────────────────────────
function Sessions({ user }) {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ title: '', session_date: '', attendees: '', notes: '', recording_url: '' })

  const load = useCallback(async () => {
    const { data } = await supabase.from('sessions').select('*').eq('user_id', user.id).order('session_date', { ascending: false })
    setSessions(data || [])
    setLoading(false)
  }, [user.id])

  useEffect(() => { load() }, [load])

  const save = async () => {
    if (!form.title.trim()) return
    setSaving(true)
    await supabase.from('sessions').insert([{
      user_id: user.id,
      title: form.title.trim(),
      session_date: form.session_date || new Date().toISOString().split('T')[0],
      attendees: form.attendees.trim() ? form.attendees.split(',').map(s => s.trim()) : [],
      notes: form.notes.trim() || null,
      recording_url: form.recording_url.trim() || null,
    }])
    setForm({ title: '', session_date: '', attendees: '', notes: '', recording_url: '' })
    setShowModal(false)
    setSaving(false)
    load()
  }

  return (
    <div className="page-content">
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Sessions</div>
            <div className="card-subtitle">Training sessions, workshops, and team enablement</div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>+ Add Session</button>
        </div>
        {loading ? <div className="loading"><div className="spinner" /></div> : sessions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎯</div>
            <div className="empty-title">No sessions logged</div>
            <div className="empty-desc">Log your first training session or workshop.</div>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Session</button>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead><tr><th>Session</th><th>Date</th><th>Attendees</th><th>Recording</th></tr></thead>
              <tbody>
                {sessions.map(s => (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 600 }}>{s.title}</td>
                    <td>{s.session_date ? new Date(s.session_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}</td>
                    <td style={{ fontSize: '13px' }}>{Array.isArray(s.attendees) ? s.attendees.join(', ') : s.attendees || '—'}</td>
                    <td>{s.recording_url ? <a href={s.recording_url} target="_blank" rel="noreferrer" style={{ color: 'var(--lavender)', fontSize: '13px', fontWeight: 600 }}>Watch ↗</a> : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">Log Session</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="form-group">
              <label className="form-label">Session Title *</label>
              <input className="form-input" placeholder="e.g. Cold call objection handling workshop" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Date</label>
                <input className="form-input" type="date" value={form.session_date} onChange={e => setForm({ ...form, session_date: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Attendees (comma-separated)</label>
                <input className="form-input" placeholder="Sarah, Mike, Priya" value={form.attendees} onChange={e => setForm({ ...form, attendees: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Recording URL</label>
              <input className="form-input" placeholder="https://…" value={form.recording_url} onChange={e => setForm({ ...form, recording_url: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea className="form-input" placeholder="Key takeaways, gaps identified…" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Log Session'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── FORECASTING ──────────────────────────────────────────────────
function Forecasting({ user }) {
  const [forecasts, setForecasts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ rep_name: '', period: '', target: '', committed: '', best_case: '', notes: '' })

  const load = useCallback(async () => {
    const { data } = await supabase.from('forecast').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
    setForecasts(data || [])
    setLoading(false)
  }, [user.id])

  useEffect(() => { load() }, [load])

  const save = async () => {
    if (!form.rep_name.trim()) return
    setSaving(true)
    await supabase.from('forecast').insert([{
      user_id: user.id,
      rep_name: form.rep_name.trim(),
      period: form.period.trim() || null,
      target: parseFloat(form.target) || 0,
      committed: parseFloat(form.committed) || 0,
      best_case: parseFloat(form.best_case) || 0,
      notes: form.notes.trim() || null,
    }])
    setForm({ rep_name: '', period: '', target: '', committed: '', best_case: '', notes: '' })
    setShowModal(false)
    setSaving(false)
    load()
  }

  const attainment = (committed, target) => target ? Math.round((committed / target) * 100) : 0

  return (
    <div className="page-content">
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Forecasting</div>
            <div className="card-subtitle">Track rep targets, committed pipeline, and best-case</div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>+ Add Forecast</button>
        </div>
        {loading ? <div className="loading"><div className="spinner" /></div> : forecasts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📈</div>
            <div className="empty-title">No forecasts yet</div>
            <div className="empty-desc">Add rep targets to start tracking pipeline.</div>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Forecast</button>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead><tr><th>Rep</th><th>Period</th><th>Target</th><th>Committed</th><th>Best Case</th><th>Attainment</th></tr></thead>
              <tbody>
                {forecasts.map(f => {
                  const pct = attainment(f.committed, f.target)
                  return (
                    <tr key={f.id}>
                      <td style={{ fontWeight: 600 }}>{f.rep_name}</td>
                      <td>{f.period || '—'}</td>
                      <td>${(f.target || 0).toLocaleString()}</td>
                      <td>${(f.committed || 0).toLocaleString()}</td>
                      <td>${(f.best_case || 0).toLocaleString()}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div className="progress-bar" style={{ width: '80px' }}>
                            <div className="progress-fill" style={{ width: `${Math.min(pct, 100)}%` }} />
                          </div>
                          <span style={{ fontSize: '13px', fontWeight: 600 }}>{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">Add Forecast Entry</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Rep Name *</label>
                <input className="form-input" placeholder="Sarah Chen" value={form.rep_name} onChange={e => setForm({ ...form, rep_name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Period</label>
                <input className="form-input" placeholder="Q2 2025" value={form.period} onChange={e => setForm({ ...form, period: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Target ($)</label>
                <input className="form-input" type="number" placeholder="50000" value={form.target} onChange={e => setForm({ ...form, target: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Committed ($)</label>
                <input className="form-input" type="number" placeholder="35000" value={form.committed} onChange={e => setForm({ ...form, committed: e.target.value })} />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Best Case ($)</label>
                <input className="form-input" type="number" placeholder="45000" value={form.best_case} onChange={e => setForm({ ...form, best_case: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea className="form-input" placeholder="Any context on the forecast…" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Add'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── LEADERBOARD ──────────────────────────────────────────────────
function Leaderboard({ user }) {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ rep_name: '', metric: '', value: '', period: '', presidents_club: false })

  const load = useCallback(async () => {
    const { data } = await supabase.from('leaderboards').select('*').eq('user_id', user.id).order('value', { ascending: false })
    setEntries(data || [])
    setLoading(false)
  }, [user.id])

  useEffect(() => { load() }, [load])

  const save = async () => {
    if (!form.rep_name.trim()) return
    setSaving(true)
    await supabase.from('leaderboards').insert([{
      user_id: user.id,
      rep_name: form.rep_name.trim(),
      metric: form.metric.trim() || null,
      value: parseFloat(form.value) || 0,
      period: form.period.trim() || null,
      presidents_club: form.presidents_club,
    }])
    setForm({ rep_name: '', metric: '', value: '', period: '', presidents_club: false })
    setShowModal(false)
    setSaving(false)
    load()
  }

  return (
    <div className="page-content">
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Leaderboard 🏆</div>
            <div className="card-subtitle">Rep performance rankings and President's Club tracker</div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>+ Add Entry</button>
        </div>
        {loading ? <div className="loading"><div className="spinner" /></div> : entries.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏆</div>
            <div className="empty-title">Leaderboard is empty</div>
            <div className="empty-desc">Start adding rep performance data.</div>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Entry</button>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead><tr><th>#</th><th>Rep</th><th>Metric</th><th>Value</th><th>Period</th><th>President's Club</th></tr></thead>
              <tbody>
                {entries.map((e, i) => (
                  <tr key={e.id}>
                    <td style={{ fontWeight: 700, color: i === 0 ? '#f59e0b' : i === 1 ? '#9ca3af' : i === 2 ? '#d97706' : 'var(--text-muted)' }}>
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                    </td>
                    <td style={{ fontWeight: 600 }}>{e.rep_name}</td>
                    <td>{e.metric || '—'}</td>
                    <td style={{ fontWeight: 700 }}>{e.value?.toLocaleString()}</td>
                    <td>{e.period || '—'}</td>
                    <td>{e.presidents_club ? '⭐ Yes' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">Add Leaderboard Entry</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Rep Name *</label>
                <input className="form-input" placeholder="Sarah Chen" value={form.rep_name} onChange={e => setForm({ ...form, rep_name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Metric</label>
                <input className="form-input" placeholder="Meetings Booked / Pipeline / Quota %" value={form.metric} onChange={e => setForm({ ...form, metric: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Value</label>
                <input className="form-input" type="number" placeholder="191" value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Period</label>
                <input className="form-input" placeholder="Q2 2025" value={form.period} onChange={e => setForm({ ...form, period: e.target.value })} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <input type="checkbox" id="pc" checked={form.presidents_club} onChange={e => setForm({ ...form, presidents_club: e.target.checked })} style={{ width: '16px', height: '16px', accentColor: 'var(--lavender)' }} />
              <label htmlFor="pc" style={{ fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>President's Club</label>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Add'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── SETTINGS ─────────────────────────────────────────────────────
function Settings({ user, onSignOut }) {
  return (
    <div className="page-content">
      <div className="card" style={{ maxWidth: '600px' }}>
        <div className="card-title" style={{ marginBottom: '24px' }}>Account Settings</div>
        <div style={{ marginBottom: '20px' }}>
          <div className="form-label">Email</div>
          <div style={{ fontSize: '15px', color: 'var(--text)', padding: '10px 14px', background: 'var(--bg)', borderRadius: '10px', border: '1.5px solid var(--border)' }}>{user?.email}</div>
        </div>
        <div style={{ marginBottom: '28px' }}>
          <div className="form-label">Plan</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge badge-purple">Early Access</span>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Free — first 20 users</span>
          </div>
        </div>
        <button className="btn btn-ghost" onClick={onSignOut}>Sign Out</button>
      </div>
    </div>
  )
}

// ─── PLACEHOLDER ──────────────────────────────────────────────────
function Placeholder({ title }) {
  return (
    <div className="page-content">
      <div className="empty-state">
        <div className="empty-icon">🚧</div>
        <div className="empty-title">{title}</div>
        <div className="empty-desc">This feature is coming soon.</div>
      </div>
    </div>
  )
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────
function LoginPage({ onAuth }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')

  const handle = async () => {
    if (!email || !password) { setError('Please fill in all fields'); return }
    setLoading(true)
    setError('')
    setMsg('')
    const fn = mode === 'login'
      ? supabase.auth.signInWithPassword({ email, password })
      : supabase.auth.signUp({ email, password })
    const { data, error: err } = await fn
    if (err) { setError(err.message); setLoading(false); return }
    if (mode === 'signup') { setMsg('Account created! You can now sign in.'); setMode('login'); setLoading(false); return }
    onAuth(data.user)
    setLoading(false)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {/* ── LOGIN LOGO — properly sized ── */}
        <div className="login-logo">
          <LogoIcon size={52} />
          <div className="login-logo-text">
            <div className="logo-name">EnableOS</div>
            <div className="logo-tagline">The OS for Enablement</div>
          </div>
        </div>

        <div className="login-heading">{mode === 'login' ? 'Welcome back' : 'Create your account'}</div>
        <div className="login-sub">{mode === 'login' ? 'Sign in to your EnableOS dashboard' : 'Start running enablement like a pro'}</div>

        {error && <div className="alert alert-error" style={{ marginBottom: '16px' }}>{error}</div>}
        {msg && <div className="alert alert-success" style={{ marginBottom: '16px' }}>{msg}</div>}

        <input className="login-input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="login-input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handle()} />
        <button className="login-btn" onClick={handle} disabled={loading}>
          {loading ? 'Loading…' : mode === 'login' ? 'Sign in' : 'Create Account'}
        </button>

        <div className="login-switch">
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
          <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); setMsg('') }}>
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── ROOT APP ─────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState('dashboard')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--plum)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <LogoIcon size={56} />
        <div style={{ marginTop: '16px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', fontSize: '14px' }}>Loading…</div>
      </div>
    </div>
  )

  if (!user) return <LoginPage onAuth={setUser} />

  const pages = {
    dashboard: <Dashboard user={user} />,
    intake: <Intake user={user} />,
    ramp: <RampOnboarding user={user} />,
    notes: <Notes user={user} />,
    collaterals: <Collaterals user={user} />,
    sessions: <Sessions user={user} />,
    pulse: <PulseChecks user={user} />,
    planning: <WeeklyPlanning user={user} />,
    forecast: <Forecasting user={user} />,
    leaderboard: <Leaderboard user={user} />,
    settings: <Settings user={user} onSignOut={signOut} />,
  }

  const currentNav = NAV.find(n => n.id === active)

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar active={active} setActive={setActive} user={user} onSignOut={signOut} />
      <div className="main-content">
        <div className="topbar">
          <div className="topbar-title">{currentNav?.icon} {currentNav?.label}</div>
          <div className="topbar-right">
            <div className="avatar">{user?.email?.[0]?.toUpperCase() || 'U'}</div>
          </div>
        </div>
        {pages[active] || <Placeholder title={currentNav?.label} />}
      </div>
    </div>
  )
}
