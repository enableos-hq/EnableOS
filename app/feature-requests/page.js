'use client'
import { useState } from 'react'
import { createClient } from '../../lib/supabase'
import { ArrowRight, Check, Loader, ThumbsUp } from 'lucide-react'

const supabase = createClient()
const S = {
  primary: '#7C5CFC', primaryLight: '#BDA9FF', ink: '#1a1235',
  ink2: '#4a4162', muted: '#8b82a0', border: '#E2DCF0',
  accent: '#F0ECFF', accent2: '#E8E0FF', canvas: '#FDFBFF', error: '#dc2626',
}

const Logo = () => (
  <svg width="154" height="48" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fl1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#BDA9FF"/><stop offset="100%" stopColor="#9B7EFF"/></linearGradient>
      <linearGradient id="fl2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#9B7EFF"/><stop offset="100%" stopColor="#7C5CFC"/></linearGradient>
      <linearGradient id="fl3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#7C5CFC"/><stop offset="100%" stopColor="#5B3EDB"/></linearGradient>
    </defs>
    <rect x="0" y="12" width="52" height="9" rx="2.5" fill="url(#fl1)" opacity="0.55"/>
    <rect x="6" y="27" width="52" height="12" rx="2.5" fill="url(#fl2)" opacity="0.8"/>
    <rect x="12" y="45" width="52" height="16" rx="2.5" fill="url(#fl3)"/>
    <line x1="6" y1="27" x2="0" y2="21" stroke="#BDA9FF" strokeWidth="0.8" opacity="0.5"/>
    <line x1="12" y1="45" x2="6" y2="39" stroke="#9B7EFF" strokeWidth="0.8" opacity="0.5"/>
    <line x1="58" y1="27" x2="52" y2="21" stroke="#BDA9FF" strokeWidth="0.8" opacity="0.5"/>
    <line x1="64" y1="45" x2="58" y2="39" stroke="#9B7EFF" strokeWidth="0.8" opacity="0.5"/>
    <circle cx="59" cy="53" r="3" fill="#ffffff" opacity="0.9"/>
    <circle cx="50" cy="53" r="3" fill="#BDA9FF" opacity="0.6"/>
    <text x="82" y="58" fontFamily="Libre Baskerville,Georgia,serif" fontSize="38" fontWeight="400" fill="#1a1235">Enable</text>
    <text x="222" y="58" fontFamily="Libre Baskerville,Georgia,serif" fontSize="38" fontWeight="700" fill="#7C5CFC">OS</text>
  </svg>
)

const existing = [
  { title: 'Google Calendar integration', votes: 34, status: 'planned', category: 'Integrations' },
  { title: 'Slack intake bot — reps submit requests directly from Slack', votes: 28, status: 'planned', category: 'Integrations' },
  { title: 'Gong integration — pull call themes into 1:1 notes', votes: 22, status: 'considering', category: 'Integrations' },
  { title: 'AI-generated onboarding plans per rep based on role', votes: 19, status: 'considering', category: 'AI' },
  { title: 'Multi-seat workspaces for larger enablement teams', votes: 17, status: 'roadmap', category: 'Platform' },
  { title: 'Enablement ROI dashboard — which assets closed which deals', votes: 31, status: 'roadmap', category: 'Analytics' },
  { title: 'Public-facing enablement hub for reps to self-serve', votes: 14, status: 'considering', category: 'Platform' },
  { title: 'Salesforce / HubSpot CRM sync', votes: 26, status: 'planned', category: 'Integrations' },
]

const statusStyle = {
  planned: { bg: '#dbeafe', color: '#1d4ed8', label: 'Planned' },
  considering: { bg: S.accent2, color: S.primary, label: 'Considering' },
  roadmap: { bg: '#d1fae5', color: '#065f46', label: 'On Roadmap' },
  shipped: { bg: '#f0fdf4', color: '#16a34a', label: 'Shipped ✓' },
}

export default function FeatureRequests() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [voted, setVoted] = useState([])
  const [votes, setVotes] = useState(Object.fromEntries(existing.map((f, i) => [i, f.votes])))
  const [form, setForm] = useState({ name: '', email: '', title: '', description: '', category: 'Platform' })
  const [error, setError] = useState('')
  const categories = ['Platform', 'Integrations', 'AI', 'Analytics', 'Other']

  const vote = (i) => {
    if (voted.includes(i)) return
    setVoted([...voted, i])
    setVotes({ ...votes, [i]: votes[i] + 1 })
  }

  const save = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: S.canvas, fontFamily: 'var(--font-body)', paddingBottom: 80 }}>
      <nav style={{ borderBottom: `1px solid ${S.border}`, padding: '0 48px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(253,251,255,0.95)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 10 }}>
        <a href="/" style={{ textDecoration: 'none' }}><Logo /></a>
        <a href="/login" style={{ fontSize: 13, color: S.muted, textDecoration: 'none', fontWeight: 500 }}>Log in →</a>
      </nav>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px 0' }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: S.accent2, color: S.primary, padding: '5px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>Feature Requests</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: S.ink, marginBottom: 12, lineHeight: 1.2 }}>Shape what we build next</h1>
          <p style={{ fontSize: 16, color: S.ink2, lineHeight: 1.6 }}>Vote on existing requests or submit your own. We read every single one and build what matters most to the community.</p>
        </div>

        {/* Existing requests */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: S.ink, marginBottom: 20 }}>Top requests</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {existing.sort((a,b) => votes[existing.indexOf(b)] - votes[existing.indexOf(a)]).map((f, i) => {
              const idx = existing.indexOf(f)
              const s = statusStyle[f.status]
              const hasVoted = voted.includes(idx)
              return (
                <div key={i} style={{ background: '#fff', border: `1px solid ${S.border}`, borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <button onClick={() => vote(idx)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: hasVoted ? S.accent2 : S.canvas, border: `1px solid ${hasVoted ? S.primary : S.border}`, borderRadius: 8, padding: '8px 12px', cursor: hasVoted ? 'default' : 'pointer', minWidth: 52, transition: 'all 0.15s' }}>
                    <ThumbsUp size={14} color={hasVoted ? S.primary : S.muted} strokeWidth={2}/>
                    <span style={{ fontSize: 13, fontWeight: 700, color: hasVoted ? S.primary : S.muted }}>{votes[idx]}</span>
                  </button>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: S.ink, marginBottom: 5 }}>{f.title}</div>
                    <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
                      <span style={{ background: s.bg, color: s.color, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</span>
                      <span style={{ fontSize: 11, color: S.muted }}>{f.category}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Submit new */}
        <div style={{ background: '#fff', border: `1px solid ${S.border}`, borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: S.ink, marginBottom: 6 }}>Submit a new request</h2>
          <p style={{ fontSize: 14, color: S.muted, marginBottom: 24 }}>Don't see what you need? Tell us what to build.</p>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                <Check size={22} color="#059669" strokeWidth={2.5}/>
              </div>
              <p style={{ fontWeight: 700, color: S.ink, marginBottom: 6 }}>Got it, thank you!</p>
              <p style={{ fontSize: 13, color: S.muted, marginBottom: 16 }}>We'll review your request and add it to the board if it fits the roadmap.</p>
              <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', title: '', description: '', category: 'Platform' }) }}
                style={{ background: 'transparent', border: `1px solid ${S.border}`, borderRadius: 100, padding: '8px 18px', fontSize: 13, color: S.ink2, cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600 }}>Submit another</button>
            </div>
          ) : (
            <form onSubmit={save}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                {[['name','Your Name','text'],['email','Your Email','email']].map(([k,l,t]) => (
                  <div key={k}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: S.ink2, marginBottom: 6 }}>{l} <span style={{ color: S.primary }}>*</span></label>
                    <input required type={t} value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})} placeholder={l}
                      style={{ width: '100%', padding: '11px 14px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', color: S.ink, background: '#fff', boxSizing: 'border-box' }}
                      onFocus={e => e.target.style.borderColor=S.primary} onBlur={e => e.target.style.borderColor=S.border}/>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: S.ink2, marginBottom: 6 }}>Feature Title <span style={{ color: S.primary }}>*</span></label>
                <input required value={form.title} onChange={e => setForm({...form,title:e.target.value})} placeholder="e.g. Zoom integration for session recording"
                  style={{ width: '100%', padding: '11px 14px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', color: S.ink, background: '#fff' }}
                  onFocus={e => e.target.style.borderColor=S.primary} onBlur={e => e.target.style.borderColor=S.border}/>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: S.ink2, marginBottom: 8 }}>Category</label>
                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                  {categories.map(c => (
                    <button type="button" key={c} onClick={() => setForm({...form,category:c})}
                      style={{ padding: '6px 14px', borderRadius: 100, border: `1px solid ${form.category===c?S.primary:S.border}`, background: form.category===c?S.accent2:'#fff', color: form.category===c?S.primary:S.ink2, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: S.ink2, marginBottom: 6 }}>Why do you need this?</label>
                <textarea value={form.description} onChange={e => setForm({...form,description:e.target.value})} placeholder="Describe the problem it solves for you..." rows={3}
                  style={{ width: '100%', padding: '11px 14px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', color: S.ink, background: '#fff', resize: 'vertical' }}
                  onFocus={e => e.target.style.borderColor=S.primary} onBlur={e => e.target.style.borderColor=S.border}/>
              </div>
              <button type="submit" disabled={loading || !form.title || !form.name || !form.email}
                style={{ width: '100%', padding: 14, background: S.ink, color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: (!form.title||!form.name||!form.email)?0.5:1 }}>
                {loading ? <><Loader size={16}/>Submitting...</> : <>Submit Request <ArrowRight size={16}/></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
