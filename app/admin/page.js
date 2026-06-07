'use client'
import { useState, useEffect, useCallback } from 'react'
import { createClient } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import {
  Users, Activity, Inbox, Star, AlertCircle, Briefcase,
  ChevronRight, LogOut, X, Check, TrendingUp, Plus,
  Shield, Bell, RefreshCw, HelpCircle, MessageSquare,
  BarChart2, Zap, FileText, Globe, Heart, Trash2
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

function Card({ children, style, onClick }) {
  return (
    <div onClick={onClick} style={{ background: '#fff', border: `1px solid ${S.borderLight}`, borderRadius: 12, padding: 20, cursor: onClick ? 'pointer' : 'default', transition: 'background 0.15s', ...style }}
      onMouseEnter={e => { if (onClick) e.currentTarget.style.background = S.accentBg }}
      onMouseLeave={e => { if (onClick) e.currentTarget.style.background = '#fff' }}
    >{children}</div>
  )
}

function Badge({ children, color = 'purple' }) {
  const colors = { purple: { bg: S.accentBg2, text: S.primary }, green: { bg: '#d1fae5', text: S.success }, yellow: { bg: '#fef3c7', text: S.warning }, red: { bg: '#fee2e2', text: S.error }, gray: { bg: S.borderLight, text: S.muted }, orange: { bg: '#fff7ed', text: '#ea580c' } }
  const c = colors[color] || colors.gray
  return <span style={{ background: c.bg, color: c.text, borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-body)' }}>{children}</span>
}

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

// ═══════════ CLIENTS VIEW (NEW) ═══════════

const MODEL_LABELS = { 'ground-zero': 'Ground Zero', scattered: 'Scattered but Scaling', stretched: 'Stretched Too Thin' }
const MODEL_COLORS = { 'ground-zero': 'orange', scattered: 'yellow', stretched: 'green' }
const PHASE_LABELS = { discovery: 'Discovery', build: 'Build', launched: 'Launched', evolve: 'Evolve' }
const PHASE_COLORS = { discovery: 'purple', build: 'yellow', launched: 'green', evolve: 'gray' }

function ClientsView({ clients, loadClients, userId }) {
  const [selected, setSelected] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [showCheckin, setShowCheckin] = useState(false)
  const [form, setForm] = useState({ name: '', company: '', email: '', model: 'ground-zero', phase: 'discovery', setup_fee: '', monthly_fee: '', notes: '' })
  const [checkinText, setCheckinText] = useState('')

  const addClient = async () => {
    if (!form.name.trim()) return
    const { error } = await supabase.from('clients').insert({ ...form, user_id: userId })
    if (error) { alert('Error: ' + error.message); return }
    setShowAdd(false); setForm({ name: '', company: '', email: '', model: 'ground-zero', phase: 'discovery', setup_fee: '', monthly_fee: '', notes: '' }); loadClients()
  }

  const updatePhase = async (id, phase) => {
    const { error } = await supabase.from('clients').update({ phase }).eq('id', id)
    if (error) { alert('Error: ' + error.message); return }
    if (selected?.id === id) setSelected({ ...selected, phase })
    loadClients()
  }

  const addCheckin = async () => {
    if (!checkinText.trim() || !selected) return
    const updated = [...(selected.checkins || []), { text: checkinText, date: new Date().toISOString() }]
    const { error } = await supabase.from('clients').update({ checkins: updated }).eq('id', selected.id)
    if (error) { alert('Error: ' + error.message); return }
    setSelected({ ...selected, checkins: updated }); setCheckinText(''); setShowCheckin(false); loadClients()
  }

  const deleteClient = async (id) => {
    if (!confirm('Delete this client? This cannot be undone.')) return
    const { error } = await supabase.from('clients').delete().eq('id', id)
    if (error) { alert('Error: ' + error.message); return }
    if (selected?.id === id) setSelected(null)
    loadClients()
  }

  const phaseOrder = ['discovery', 'build', 'launched', 'evolve']
  const byPhase = phaseOrder.map(p => ({ phase: p, clients: clients.filter(c => c.phase === p) }))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: S.ink }}>Clients</h1>
          <p style={{ color: S.muted, fontSize: 14 }}>{clients.length} engagement{clients.length !== 1 ? 's' : ''} — manage your consulting pipeline</p>
        </div>
        <button onClick={() => setShowAdd(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 8, border: 'none', background: S.ink, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
          <Plus size={16} />Add Client
        </button>
      </div>

      {/* Pipeline kanban */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {byPhase.map(({ phase, clients: phaseClients }) => (
          <div key={phase} style={{ background: S.accentBg, borderRadius: 14, padding: 14, minHeight: 120 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <Badge color={PHASE_COLORS[phase]}>{PHASE_LABELS[phase]}</Badge>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: S.muted, background: S.borderLight, padding: '2px 8px', borderRadius: 100 }}>{phaseClients.length}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {phaseClients.map(c => (
                <div key={c.id} onClick={() => setSelected(c)} style={{ background: '#fff', borderRadius: 10, padding: '12px 14px', border: `1px solid ${selected?.id === c.id ? S.primary : S.borderLight}`, cursor: 'pointer', transition: 'all 0.15s' }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: S.ink, marginBottom: 4 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: S.muted, marginBottom: 6 }}>{c.company || 'No company'}</div>
                  <Badge color={MODEL_COLORS[c.model]}>{MODEL_LABELS[c.model]}</Badge>
                </div>
              ))}
              {phaseClients.length === 0 && <div style={{ padding: '16px 0', textAlign: 'center', color: S.muted, fontSize: 12 }}>No clients</div>}
            </div>
          </div>
        ))}
      </div>

      {/* Selected client detail */}
      {selected && (
        <Card style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: S.ink, marginBottom: 4 }}>{selected.name}</h2>
              <p style={{ fontSize: 14, color: S.muted }}>{selected.company || 'No company'} · {selected.email || 'No email'}</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setShowCheckin(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '7px 14px', borderRadius: 7, border: `1px solid ${S.primary}`, background: S.accentBg2, color: S.primary, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                <Plus size={13} />Log Check-in
              </button>
              <button onClick={() => deleteClient(selected.id)} style={{ padding: '7px 10px', borderRadius: 7, border: '1px solid #fecaca', background: '#fef2f2', color: S.error, cursor: 'pointer' }}>
                <Trash2 size={14} />
              </button>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: S.muted, cursor: 'pointer' }}><X size={18} /></button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
            <div style={{ padding: '12px 14px', background: S.canvas, borderRadius: 9 }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: S.muted, marginBottom: 6 }}>Model</div>
              <Badge color={MODEL_COLORS[selected.model]}>{MODEL_LABELS[selected.model]}</Badge>
            </div>
            <div style={{ padding: '12px 14px', background: S.canvas, borderRadius: 9 }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: S.muted, marginBottom: 6 }}>Phase</div>
              <select value={selected.phase} onChange={e => updatePhase(selected.id, e.target.value)} style={{ padding: '4px 8px', border: `1px solid ${S.border}`, borderRadius: 6, fontSize: 13, fontFamily: 'var(--font-body)', color: S.ink, outline: 'none', cursor: 'pointer', background: '#fff' }}>
                {phaseOrder.map(p => <option key={p} value={p}>{PHASE_LABELS[p]}</option>)}
              </select>
            </div>
            <div style={{ padding: '12px 14px', background: S.canvas, borderRadius: 9 }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: S.muted, marginBottom: 6 }}>Setup Fee</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: S.ink }}>{selected.setup_fee || '—'}</div>
            </div>
            <div style={{ padding: '12px 14px', background: S.canvas, borderRadius: 9 }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: S.muted, marginBottom: 6 }}>Monthly Fee</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: S.ink }}>{selected.monthly_fee || '—'}</div>
            </div>
          </div>

          {selected.notes && (
            <div style={{ padding: '12px 14px', background: S.canvas, borderRadius: 9, marginBottom: 16, borderLeft: `3px solid ${S.primary}` }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: S.muted, marginBottom: 6 }}>Notes</div>
              <p style={{ fontSize: 13, color: S.inkSecondary, lineHeight: 1.6 }}>{selected.notes}</p>
            </div>
          )}

          <div>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: S.muted, marginBottom: 12 }}>Check-in Log</div>
            {(selected.checkins || []).length === 0 && <div style={{ color: S.muted, fontSize: 13, padding: '8px 0' }}>No check-ins yet. Click "Log Check-in" above.</div>}
            {(selected.checkins || []).slice().reverse().map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: `1px solid ${S.borderLight}` }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: S.primary, marginTop: 6, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 11, color: S.muted, marginBottom: 4 }}>{new Date(c.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                  <p style={{ fontSize: 13, color: S.inkSecondary, lineHeight: 1.6 }}>{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Add client modal */}
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(26,18,53,0.65)', backdropFilter: 'blur(6px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: S.ink, borderRadius: 18, width: '100%', maxWidth: 520, border: '1px solid rgba(155,126,255,0.2)', boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid rgba(155,126,255,0.12)' }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: 16, fontFamily: 'var(--font-display)' }}>Add Client</span>
              <button onClick={() => setShowAdd(false)} style={{ background: 'none', border: 'none', color: S.muted, cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div style={{ padding: 24 }}>
              {[
                { key: 'name', label: 'Contact Name', placeholder: 'e.g. Rahul Mehta' },
                { key: 'company', label: 'Company', placeholder: 'e.g. NovaTech' },
                { key: 'email', label: 'Email', placeholder: 'rahul@novatech.io' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', color: S.muted, fontSize: 12, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.label}</label>
                  <input value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} style={{ width: '100%', background: '#2a2445', border: '1px solid rgba(155,126,255,0.15)', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', color: S.muted, fontSize: 12, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Model</label>
                  <select value={form.model} onChange={e => setForm({ ...form, model: e.target.value })} style={{ width: '100%', background: '#2a2445', border: '1px solid rgba(155,126,255,0.15)', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none' }}>
                    <option value="ground-zero">Ground Zero</option>
                    <option value="scattered">Scattered but Scaling</option>
                    <option value="stretched">Stretched Too Thin</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', color: S.muted, fontSize: 12, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phase</label>
                  <select value={form.phase} onChange={e => setForm({ ...form, phase: e.target.value })} style={{ width: '100%', background: '#2a2445', border: '1px solid rgba(155,126,255,0.15)', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none' }}>
                    {phaseOrder.map(p => <option key={p} value={p}>{PHASE_LABELS[p]}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', color: S.muted, fontSize: 12, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Setup Fee</label>
                  <input value={form.setup_fee} onChange={e => setForm({ ...form, setup_fee: e.target.value })} placeholder="e.g. ₹1L" style={{ width: '100%', background: '#2a2445', border: '1px solid rgba(155,126,255,0.15)', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: S.muted, fontSize: 12, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Monthly Fee</label>
                  <input value={form.monthly_fee} onChange={e => setForm({ ...form, monthly_fee: e.target.value })} placeholder="e.g. ₹25K/mo" style={{ width: '100%', background: '#2a2445', border: '1px solid rgba(155,126,255,0.15)', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', color: S.muted, fontSize: 12, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Notes</label>
                <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Discovery call notes, context, anything useful..." rows={3} style={{ width: '100%', background: '#2a2445', border: '1px solid rgba(155,126,255,0.15)', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button onClick={() => setShowAdd(false)} style={{ padding: '10px 18px', borderRadius: 8, border: `1px solid ${S.border}`, background: 'transparent', color: S.muted, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Cancel</button>
                <button onClick={addClient} disabled={!form.name.trim()} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', background: '#fff', color: S.ink, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', opacity: form.name.trim() ? 1 : 0.5 }}>Add Client</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Check-in modal */}
      {showCheckin && selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(26,18,53,0.65)', backdropFilter: 'blur(6px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: S.ink, borderRadius: 18, width: '100%', maxWidth: 480, border: '1px solid rgba(155,126,255,0.2)', boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid rgba(155,126,255,0.12)' }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: 16, fontFamily: 'var(--font-display)' }}>Log Check-in — {selected.name}</span>
              <button onClick={() => setShowCheckin(false)} style={{ background: 'none', border: 'none', color: S.muted, cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div style={{ padding: 24 }}>
              <textarea value={checkinText} onChange={e => setCheckinText(e.target.value)} placeholder="What was discussed? What changed? What's next?" rows={5} autoFocus style={{ width: '100%', background: '#2a2445', border: '1px solid rgba(155,126,255,0.15)', borderRadius: 8, padding: '12px 14px', color: '#fff', fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical', boxSizing: 'border-box', marginBottom: 16 }} />
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button onClick={() => setShowCheckin(false)} style={{ padding: '10px 18px', borderRadius: 8, border: `1px solid ${S.border}`, background: 'transparent', color: S.muted, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Cancel</button>
                <button onClick={addCheckin} disabled={!checkinText.trim()} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', background: '#fff', color: S.ink, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', opacity: checkinText.trim() ? 1 : 0.5 }}>Save Check-in</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ═══════════ EXISTING VIEWS (unchanged) ═══════════

function Overview({ users, submissions, featureVotes, setTab }) {
  const now = new Date(); const weekAgo = new Date(now - 7*24*60*60*1000)
  const newThisWeek = users.filter(u => new Date(u.created_at) > weekAgo).length
  const totalVotes = featureVotes.reduce((sum,f) => sum+f.votes, 0)
  const stats = [
    { label:'Total Users', value:users.length, icon:Users, color:S.primary, sub:`+${newThisWeek} this week` },
    { label:'Public Submissions', value:submissions.length, icon:Inbox, color:S.success, sub:'via intake form' },
    { label:'Feature Votes', value:totalVotes, icon:Star, color:S.warning, sub:'across all requests' },
    { label:'Platform Status', value:'✓ Live', icon:Activity, color:S.success, sub:'all systems go' },
  ]
  return (
    <div>
      <div style={{ marginBottom:28 }}><h1 style={{ fontFamily:'var(--font-display)', fontSize:26, fontWeight:700, color:S.ink, marginBottom:4 }}>Admin Overview</h1><p style={{ color:S.muted, fontSize:14 }}>Platform health and usage across all workspaces.</p></div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:24 }}>
        {stats.map(s => (<Card key={s.label}><div style={{ width:32, height:32, borderRadius:8, background:s.color+'18', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:12 }}><s.icon size={16} color={s.color}/></div><div style={{ fontSize:26, fontWeight:700, color:S.ink, fontFamily:'var(--font-display)', marginBottom:2 }}>{s.value}</div><div style={{ fontSize:12, color:S.muted, marginBottom:4 }}>{s.label}</div><div style={{ fontSize:11, color:s.color, fontWeight:600 }}>{s.sub}</div></Card>))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        <Card>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}><h3 style={{ fontWeight:700, fontSize:14, color:S.ink, fontFamily:'var(--font-display)' }}>Recent Signups</h3><button onClick={() => setTab('users')} style={{ fontSize:12, color:S.primary, fontWeight:600, background:'none', border:'none', cursor:'pointer' }}>View all →</button></div>
          {users.length===0 && <div style={{ color:S.muted, fontSize:13 }}>No users yet</div>}
          {users.slice(0,5).map((u,i) => (<div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom:`1px solid ${S.borderLight}` }}><div style={{ width:28, height:28, borderRadius:'50%', background:`linear-gradient(135deg,${S.primary},#a78bfa)`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><span style={{ color:'#fff', fontSize:11, fontWeight:700 }}>{u.email?.[0]?.toUpperCase()}</span></div><div style={{ flex:1, minWidth:0 }}><div style={{ fontSize:13, fontWeight:600, color:S.ink, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{u.email}</div><div style={{ fontSize:11, color:S.muted }}>{new Date(u.created_at).toLocaleDateString()}</div></div>{new Date(u.created_at)>weekAgo && <Badge color="green">New</Badge>}</div>))}
        </Card>
        <Card>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}><h3 style={{ fontWeight:700, fontSize:14, color:S.ink, fontFamily:'var(--font-display)' }}>Quick Links</h3></div>
          {[{label:'Supabase dashboard',url:'https://supabase.com/dashboard/project/zurkzjhctyfhqcztimnf',icon:'🗄️'},{label:'Vercel deployments',url:'https://vercel.com',icon:'🚀'},{label:'GitHub repo',url:'https://github.com/enableos-hq/EnableOS',icon:'💻'},{label:'Public intake form',url:'/intake-form',icon:'📝'},{label:'Public roadmap',url:'/roadmap',icon:'🗺️'},{label:'Book a call (Calendly)',url:'https://calendly.com/enableos-hq/30min',icon:'📞'}].map((link,i) => (<a key={i} href={link.url} target="_blank" rel="noreferrer" style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom:`1px solid ${S.borderLight}`, textDecoration:'none' }}><span style={{ fontSize:14 }}>{link.icon}</span><span style={{ fontSize:13, color:S.primary, fontWeight:500 }}>{link.label}</span><ChevronRight size={12} color={S.muted} style={{ marginLeft:'auto' }}/></a>))}
        </Card>
      </div>
    </div>
  )
}

function UsersView({ users }) {
  const [search, setSearch] = useState(''); const weekAgo = new Date(Date.now()-7*24*60*60*1000)
  const filtered = users.filter(u => u.email?.toLowerCase().includes(search.toLowerCase()))
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}><div><h1 style={{ fontFamily:'var(--font-display)', fontSize:24, fontWeight:700, color:S.ink }}>Users</h1><p style={{ color:S.muted, fontSize:14 }}>{users.length} total accounts</p></div><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." style={{ padding:'8px 14px', border:`1px solid ${S.border}`, borderRadius:8, fontSize:13, fontFamily:'var(--font-body)', outline:'none', color:S.ink, width:200 }} onFocus={e=>e.target.style.borderColor=S.primary} onBlur={e=>e.target.style.borderColor=S.border}/></div>
      <Card style={{ padding:0, overflow:'hidden' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 160px 100px', gap:16, padding:'12px 20px', borderBottom:`1px solid ${S.borderLight}`, background:S.canvas }}>{['User','Signed up','Status'].map(h => <span key={h} style={{ fontSize:11, fontWeight:700, color:S.muted, textTransform:'uppercase', letterSpacing:'0.06em' }}>{h}</span>)}</div>
        {filtered.length===0 && <div style={{ padding:'32px 20px', textAlign:'center', color:S.muted, fontSize:13 }}>No users found</div>}
        {filtered.map((u,i) => (<div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 160px 100px', gap:16, padding:'14px 20px', borderBottom:`1px solid ${S.borderLight}`, alignItems:'center' }}><div style={{ display:'flex', alignItems:'center', gap:10 }}><div style={{ width:32, height:32, borderRadius:'50%', background:`linear-gradient(135deg,${S.primary},#a78bfa)`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><span style={{ color:'#fff', fontSize:12, fontWeight:700 }}>{u.email?.[0]?.toUpperCase()}</span></div><span style={{ fontSize:14, fontWeight:600, color:S.ink }}>{u.email}</span></div><span style={{ fontSize:13, color:S.muted }}>{new Date(u.created_at).toLocaleDateString('en-US',{month:'short',day:'numeric'})}</span><div>{new Date(u.created_at)>weekAgo?<Badge color="green">New</Badge>:<Badge color="gray">Active</Badge>}</div></div>))}
      </Card>
    </div>
  )
}

function SubmissionsView({ submissions }) {
  const [filter, setFilter] = useState('all'); const statusColor = { open:'purple', 'in-progress':'yellow', done:'green' }
  const filtered = filter==='all'?submissions:submissions.filter(s=>s.status===filter)
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}><div><h1 style={{ fontFamily:'var(--font-display)', fontSize:24, fontWeight:700, color:S.ink }}>Public Submissions</h1><p style={{ color:S.muted, fontSize:14 }}>{submissions.length} requests via intake form</p></div><div style={{ display:'flex', gap:6 }}>{['all','open','in-progress','done'].map(f => <button key={f} onClick={()=>setFilter(f)} style={{ padding:'6px 12px', borderRadius:100, border:`1px solid ${filter===f?S.primary:S.border}`, background:filter===f?S.accentBg2:'transparent', color:filter===f?S.primary:S.inkSecondary, fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'var(--font-body)', textTransform:'capitalize' }}>{f}</button>)}</div></div>
      {filtered.length===0 && <Card style={{ textAlign:'center', padding:48 }}><Inbox size={32} color={S.muted} style={{ margin:'0 auto 12px' }}/><p style={{ color:S.muted, fontSize:14 }}>No submissions yet.</p></Card>}
      {filtered.map((s,i) => (<Card key={i} style={{ marginBottom:10, padding:'14px 18px' }}><div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}><div style={{ flex:1 }}><div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}><span style={{ fontWeight:700, fontSize:14, color:S.ink }}>{s.title}</span><Badge color={statusColor[s.status]||'gray'}>{s.status}</Badge>{s.bucket&&<Badge color="gray">{s.bucket}</Badge>}</div><div style={{ fontSize:12, color:S.muted }}>{s.submitter_name&&<span>{s.submitter_name}</span>}{s.submitter_email&&<span> · {s.submitter_email}</span>}</div></div><span style={{ fontSize:12, fontWeight:700, color:S.primary, marginLeft:12 }}>P:{s.priority_score}</span></div></Card>))}
    </div>
  )
}

function FeatureVotesView({ featureVotes }) {
  const total = featureVotes.reduce((sum,f)=>sum+f.votes,0)
  const statusStyle = { planned:{bg:'#dbeafe',color:'#1d4ed8',label:'Planned'}, considering:{bg:S.accentBg2,color:S.primary,label:'Considering'}, roadmap:{bg:'#d1fae5',color:'#065f46',label:'On Roadmap'} }
  return (
    <div>
      <div style={{ marginBottom:24 }}><h1 style={{ fontFamily:'var(--font-display)', fontSize:24, fontWeight:700, color:S.ink }}>Feature Votes</h1><p style={{ color:S.muted, fontSize:14 }}>{total} total votes across {featureVotes.length} requests</p></div>
      {featureVotes.map((f,i) => { const maxVotes=featureVotes[0]?.votes||1; const s=statusStyle[f.status]||statusStyle.considering; return (<Card key={i} style={{ padding:'16px 20px', marginBottom:10 }}><div style={{ display:'flex', alignItems:'center', gap:16 }}><div style={{ width:44, textAlign:'center', flexShrink:0 }}><div style={{ fontSize:18, fontWeight:700, color:S.primary, fontFamily:'var(--font-display)' }}>{f.votes}</div><div style={{ fontSize:10, color:S.muted }}>votes</div></div><div style={{ flex:1 }}><div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}><span style={{ fontWeight:600, fontSize:14, color:S.ink }}>{f.title}</span><span style={{ background:s.bg, color:s.color, fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:100, textTransform:'uppercase' }}>{s.label}</span></div><div style={{ height:5, background:S.borderLight, borderRadius:3 }}><div style={{ height:'100%', width:`${(f.votes/maxVotes)*100}%`, background:`linear-gradient(90deg,${S.primary},${S.primaryHover})`, borderRadius:3 }}/></div></div></div></Card>)})}
    </div>
  )
}

function PlatformStats({ users, submissions }) {
  const now=new Date(); const weekAgo=new Date(now-7*24*60*60*1000); const monthAgo=new Date(now-30*24*60*60*1000)
  const metrics = [{label:'Total signups',value:users.length,icon:'👥'},{label:'New this week',value:users.filter(u=>new Date(u.created_at)>weekAgo).length,icon:'📈'},{label:'New this month',value:users.filter(u=>new Date(u.created_at)>monthAgo).length,icon:'📅'},{label:'Public submissions',value:submissions.length,icon:'📋'},{label:'Open submissions',value:submissions.filter(s=>s.status==='open').length,icon:'🔵'},{label:'Done submissions',value:submissions.filter(s=>s.status==='done').length,icon:'✅'}]
  return (
    <div>
      <div style={{ marginBottom:24 }}><h1 style={{ fontFamily:'var(--font-display)', fontSize:24, fontWeight:700, color:S.ink }}>Platform Stats</h1><p style={{ color:S.muted, fontSize:14 }}>Usage metrics across EnableOS</p></div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:24 }}>{metrics.map(m => (<Card key={m.label}><div style={{ fontSize:28, marginBottom:8 }}>{m.icon}</div><div style={{ fontSize:26, fontWeight:700, color:S.ink, fontFamily:'var(--font-display)', marginBottom:2 }}>{m.value}</div><div style={{ fontSize:13, color:S.muted }}>{m.label}</div></Card>))}</div>
      <Card><h3 style={{ fontWeight:700, fontSize:14, color:S.ink, fontFamily:'var(--font-display)', marginBottom:16 }}>Infrastructure</h3>{[{label:'Hosting',value:'Vercel (auto-deploy)'},{label:'Database',value:'Supabase (PostgreSQL)'},{label:'Auth',value:'Supabase Auth (email + Google)'},{label:'Domain',value:'enableos.app'},{label:'AI',value:'Claude Sonnet via Anthropic API'},{label:'Booking',value:'Calendly'}].map(item => (<div key={item.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:`1px solid ${S.borderLight}` }}><span style={{ fontSize:13, color:S.muted }}>{item.label}</span><div style={{ display:'flex', alignItems:'center', gap:8 }}><div style={{ width:7, height:7, borderRadius:'50%', background:S.success }}/><span style={{ fontSize:13, color:S.inkSecondary, fontWeight:500 }}>{item.value}</span></div></div>))}</Card>
    </div>
  )
}

function Changelog() {
  const entries = [{version:'v2.0',date:'Jun 2026',tag:'latest',changes:['Consulting + platform model launched','3 engagement models: Ground Zero, Scattered but Scaling, Stretched Too Thin','Demo workspace with package selector for discovery call screenshares','Clients tab in admin with pipeline tracking and check-in logs','Landing page rewrite with new messaging and Calendly CTAs','Calendly booking page at /book','Business blueprint document']},{version:'v1.3',date:'May 2026',tag:null,changes:['Interactive walkthrough on first login','Shareable public intake form','Settings: invite team members','Roadmap page live at enableos.app/roadmap','Pulse checks with multi-question types','Coaching scores with monthly deep-dives','Forecasting with drag-and-drop kanban','Dashboard pulling live data from Supabase']},{version:'v1.0',date:'Apr 2026',tag:null,changes:['Platform launched: Dashboard, Intake, Ramp, 1:1 Notes, Collaterals, Sessions','Supabase auth + database, deployed on Vercel','enableos.app live with waitlist','Lavender design system with Libre Baskerville + Sora']}]
  return (
    <div>
      <div style={{ marginBottom:24 }}><h1 style={{ fontFamily:'var(--font-display)', fontSize:24, fontWeight:700, color:S.ink }}>Changelog</h1><p style={{ color:S.muted, fontSize:14 }}>What has been built and shipped</p></div>
      {entries.map((entry,i) => (<div key={i} style={{ display:'flex', gap:20, marginBottom:32 }}><div style={{ width:80, flexShrink:0, paddingTop:4 }}><div style={{ fontFamily:'var(--font-display)', fontSize:15, fontWeight:700, color:S.ink, marginBottom:3 }}>{entry.version}</div><div style={{ fontSize:11, color:S.muted }}>{entry.date}</div>{entry.tag&&<div style={{ marginTop:6 }}><Badge color="green">{entry.tag}</Badge></div>}</div><Card style={{ flex:1 }}>{entry.changes.map((c,j)=>(<div key={j} style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'8px 0', borderBottom:j<entry.changes.length-1?`1px solid ${S.borderLight}`:'none' }}><div style={{ width:6, height:6, borderRadius:'50%', background:S.primary, marginTop:6, flexShrink:0 }}/><span style={{ fontSize:13, color:S.inkSecondary, lineHeight:1.5 }}>{c}</span></div>))}</Card></div>))}
    </div>
  )
}

function HelpCenter() {
  const [openFaq, setOpenFaq] = useState(null)
  const faqs = [{q:'How do I add a client?',a:'Go to the Clients tab in Admin. Click "Add Client", fill in their details, and select their engagement model and phase.'},{q:'How does the demo workspace work for sales calls?',a:'Go to /demo and use the package selector at the top. Click "Ground Zero", "Scattered but Scaling", or "Stretched Too Thin" to show different sample workspaces. Screenshare this on discovery calls.'},{q:'How do I track a client engagement?',a:'In the Clients tab, click on a client card. You can change their phase (Discovery → Build → Launched → Evolve), log check-ins, and add notes.'},{q:'How do I create a client workspace?',a:'Currently, clients sign up at enableos.app/login with their email. Their workspace is auto-created. You then configure it by adding reps, intake categories, and content through your admin access.'},{q:'What is the difference between the three engagement models?',a:'Ground Zero = startup with no enablement. Scattered but Scaling = has team and data but no system. Stretched Too Thin = has an enablement person but their work is buried across 10 tools.'}]
  return (
    <div>
      <div style={{ marginBottom:28 }}><h1 style={{ fontFamily:'var(--font-display)', fontSize:24, fontWeight:700, color:S.ink }}>Help Center</h1><p style={{ color:S.muted, fontSize:14 }}>Common questions and how to get support</p></div>
      <Card>{faqs.map((faq,i) => (<div key={i} style={{ borderBottom:`1px solid ${S.borderLight}` }}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 0', background:'none', border:'none', cursor:'pointer', textAlign:'left', gap:12 }}><span style={{ fontSize:14, fontWeight:600, color:S.ink, lineHeight:1.4 }}>{faq.q}</span><div style={{ flexShrink:0, width:20, height:20, borderRadius:'50%', background:openFaq===i?S.primary:S.borderLight, display:'flex', alignItems:'center', justifyContent:'center' }}><span style={{ fontSize:14, color:openFaq===i?'#fff':S.muted, lineHeight:1 }}>{openFaq===i?'−':'+'}</span></div></button>{openFaq===i&&<div style={{ paddingBottom:16 }}><p style={{ fontSize:14, color:S.inkSecondary, lineHeight:1.7, background:S.canvas, padding:'12px 14px', borderRadius:8, margin:0 }}>{faq.a}</p></div>}</div>))}</Card>
    </div>
  )
}

// ═══════════ NAV ═══════════

const NAV = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'clients', label: 'Clients', icon: Briefcase },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'submissions', label: 'Submissions', icon: Inbox },
  { id: 'featurevotes', label: 'Feature Votes', icon: Star },
  { id: 'stats', label: 'Platform Stats', icon: BarChart2 },
  { id: 'changelog', label: 'Changelog', icon: FileText },
  { id: 'help', label: 'Help Center', icon: HelpCircle },
]

// ═══════════ MAIN ═══════════

export default function AdminApp() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('overview')
  const [users, setUsers] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [clients, setClients] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const router = useRouter()

  const FEATURE_VOTES = [
    { title: 'Enablement ROI dashboard', votes: 34, status: 'roadmap', category: 'Analytics' },
    { title: 'Slack intake bot', votes: 31, status: 'planned', category: 'Integrations' },
    { title: 'Google Calendar integration', votes: 28, status: 'planned', category: 'Integrations' },
    { title: 'Multi-seat workspaces', votes: 26, status: 'roadmap', category: 'Platform' },
    { title: 'Salesforce / HubSpot CRM sync', votes: 22, status: 'planned', category: 'Integrations' },
    { title: 'AI-generated onboarding plans', votes: 19, status: 'considering', category: 'AI' },
    { title: 'Gong integration', votes: 17, status: 'considering', category: 'Integrations' },
    { title: 'Public rep asset hub', votes: 14, status: 'considering', category: 'Platform' },
  ]

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user || user.email !== ADMIN_EMAIL) { router.push('/login?next=/admin'); return }
      setUser(user); loadData(); setLoading(false)
    })
  }, [router])

  const loadData = async () => {
    setRefreshing(true)
    const [{ data: profiles }, { data: subs }, { data: clientData }] = await Promise.all([
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('requests').select('*').eq('user_id', '00000000-0000-0000-0000-000000000000').order('created_at', { ascending: false }),
      supabase.from('clients').select('*').order('created_at', { ascending: false }),
    ])
    setUsers(profiles || [])
    setSubmissions((subs || []).map(s => { const match = s.description?.match(/Submitted by: (.+?)(?:\s\((.+?)\))?(?:\n|$)/); return { ...s, submitter_name: s.submitter_name || match?.[1] || null, submitter_email: s.submitter_email || match?.[2] || null } }))
    setClients(clientData || [])
    setRefreshing(false)
  }

  const signOut = async () => { await supabase.auth.signOut(); router.push('/login') }

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: S.canvas }}>
      <div style={{ textAlign: 'center' }}><SidebarLogo /><div style={{ color: S.muted, fontSize: 13, marginTop: 16 }}>Loading admin...</div></div>
    </div>
  )

  const renderView = () => {
    switch (tab) {
      case 'overview': return <Overview users={users} submissions={submissions} featureVotes={FEATURE_VOTES} setTab={setTab} />
      case 'clients': return <ClientsView clients={clients} loadClients={loadData} userId={user.id} />
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Sora:wght@300;400;500;600;700&display=swap');
        :root { --font-display: 'Libre Baskerville', Georgia, serif; --font-body: 'Sora', sans-serif; }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: var(--font-body); -webkit-font-smoothing: antialiased; background: ${S.canvas}; }
        a { text-decoration: none; }
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
      `}</style>
      <div style={{ display: 'flex', height: '100vh', background: S.canvas, overflow: 'hidden' }}>
        <div style={{ width: 220, background: S.sidebar, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <SidebarLogo />
            <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(220,38,38,0.2)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: 100, padding: '3px 10px' }}>
              <Shield size={9} color="#fca5a5" /><span style={{ fontSize: 10, fontWeight: 700, color: '#fca5a5', letterSpacing: '0.08em' }}>ADMIN</span>
            </div>
          </div>
          <nav style={{ flex: 1, padding: '14px 10px', overflowY: 'auto' }}>
            {NAV.map(item => {
              const active = tab === item.id
              return (
                <button key={item.id} onClick={() => setTab(item.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 9, padding: '9px 10px', borderRadius: 7, border: 'none', cursor: 'pointer', background: active ? `${S.primary}25` : 'transparent', color: active ? '#fff' : 'rgba(255,255,255,0.45)', fontSize: 12, fontWeight: active ? 600 : 400, fontFamily: 'var(--font-body)', marginBottom: 2, transition: 'all 0.15s', textAlign: 'left', borderLeft: `2px solid ${active ? S.primary : 'transparent'}` }}>
                  <item.icon size={14} />{item.label}
                  {item.id === 'clients' && clients.length > 0 && <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 700, color: S.primaryLight, background: 'rgba(124,92,252,0.2)', padding: '1px 6px', borderRadius: 100 }}>{clients.length}</span>}
                </button>
              )
            })}
            <WorkspaceSwitcher current="admin" />
          </nav>
          <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <button onClick={loadData} disabled={refreshing} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 12px', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 7 }}>
              <RefreshCw size={12} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />{refreshing ? 'Refreshing...' : 'Refresh data'}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(220,38,38,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><span style={{ color: '#fca5a5', fontSize: 11, fontWeight: 700 }}>{user?.email?.[0]?.toUpperCase()}</span></div>
              <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 11, color: '#fff', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div><div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>Admin</div></div>
              <button onClick={signOut} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}><LogOut size={13} /></button>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>{renderView()}</div>
      </div>
    </>
  )
}
