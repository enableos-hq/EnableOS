'use client'
import { useState } from 'react'
import { createClient } from '../../lib/supabase'
import { ArrowRight, Check, Loader } from 'lucide-react'

const supabase = createClient()
const S = {
  primary: '#7C5CFC', primaryLight: '#BDA9FF', ink: '#1a1235',
  ink2: '#4a4162', muted: '#8b82a0', border: '#E2DCF0',
  accent: '#F0ECFF', accent2: '#E8E0FF', canvas: '#FDFBFF', error: '#dc2626',
}

const Logo = () => (
  <svg width="140" height="38" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sl1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#BDA9FF"/><stop offset="100%" stopColor="#9B7EFF"/></linearGradient>
      <linearGradient id="sl2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#9B7EFF"/><stop offset="100%" stopColor="#7C5CFC"/></linearGradient>
      <linearGradient id="sl3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#7C5CFC"/><stop offset="100%" stopColor="#5B3EDB"/></linearGradient>
    </defs>
    <rect x="0" y="12" width="52" height="9" rx="2.5" fill="url(#sl1)" opacity="0.55"/>
    <rect x="6" y="27" width="52" height="12" rx="2.5" fill="url(#sl2)" opacity="0.8"/>
    <rect x="12" y="45" width="52" height="16" rx="2.5" fill="url(#sl3)"/>
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

export default function Submit() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', company: '', title: '', bucket: 'Collateral', description: '', impact: 3, urgency: 3, effort: 3 })
  const buckets = ['Collateral', 'Training Session', 'Everboarding', 'Onboarding', 'Process', 'Playbook', 'Other']

  const save = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const priority = Math.round((form.impact * form.urgency) / form.effort)
    const { error } = await supabase.from('requests').insert({
      title: form.title, bucket: form.bucket,
      description: `${form.description}\n\n— Submitted by ${form.name} (${form.email}${form.company ? `, ${form.company}` : ''})`,
      impact: form.impact, urgency: form.urgency, effort: form.effort,
      priority_score: priority, status: 'open',
      user_id: '00000000-0000-0000-0000-000000000000',
    })
    if (error) { setError('Something went wrong. Please try again.'); setLoading(false); return }
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) return (
    <div style={{ minHeight: '100vh', background: S.canvas, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)', padding: 20 }}>
      <div style={{ textAlign: 'center', maxWidth: 440 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <Check size={28} color="#059669" strokeWidth={2.5} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: S.ink, marginBottom: 10 }}>Request submitted!</h1>
        <p style={{ color: S.muted, fontSize: 15, lineHeight: 1.6, marginBottom: 28 }}>Thanks {form.name.split(' ')[0]}! Your request has been logged and the enablement team will review it shortly.</p>
        <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', title: '', bucket: 'Collateral', description: '', impact: 3, urgency: 3, effort: 3 }) }}
          style={{ background: 'transparent', border: `1px solid ${S.border}`, borderRadius: 100, padding: '10px 20px', fontSize: 14, color: S.ink2, cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
          Submit another
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: S.canvas, fontFamily: 'var(--font-body)', paddingBottom: 80 }}>
      <nav style={{ borderBottom: `1px solid ${S.border}`, padding: '0 48px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(253,251,255,0.95)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 10 }}>
        <a href="/" style={{ textDecoration: 'none' }}><Logo /></a>
        <a href="/login" style={{ fontSize: 13, color: S.muted, textDecoration: 'none', fontWeight: 500 }}>Already a user? Log in →</a>
      </nav>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '48px 24px 0' }}>
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: S.accent2, color: S.primary, padding: '5px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>Enablement Request</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: S.ink, marginBottom: 10, lineHeight: 1.2 }}>Submit an enablement request</h1>
          <p style={{ fontSize: 15, color: S.ink2, lineHeight: 1.6 }}>Need a battlecard, training session, playbook, or process doc? Submit it here and it goes straight into the enablement queue.</p>
        </div>
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
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: S.ink2, marginBottom: 6 }}>Company <span style={{ color: S.muted, fontWeight: 400 }}>(optional)</span></label>
            <input value={form.company} onChange={e => setForm({...form,company:e.target.value})} placeholder="Your company"
              style={{ width: '100%', padding: '11px 14px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', color: S.ink, background: '#fff' }}
              onFocus={e => e.target.style.borderColor=S.primary} onBlur={e => e.target.style.borderColor=S.border}/>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${S.border}`, borderRadius: 12, padding: 24, marginBottom: 14 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: S.ink, marginBottom: 16 }}>Request Details</div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: S.ink2, marginBottom: 6 }}>Title <span style={{ color: S.primary }}>*</span></label>
              <input required value={form.title} onChange={e => setForm({...form,title:e.target.value})} placeholder="e.g. Battlecard for competitor X"
                style={{ width: '100%', padding: '11px 14px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', color: S.ink, background: '#fff' }}
                onFocus={e => e.target.style.borderColor=S.primary} onBlur={e => e.target.style.borderColor=S.border}/>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: S.ink2, marginBottom: 8 }}>Type</label>
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                {buckets.map(b => (
                  <button type="button" key={b} onClick={() => setForm({...form,bucket:b})}
                    style={{ padding: '6px 14px', borderRadius: 100, border: `1px solid ${form.bucket===b?S.primary:S.border}`, background: form.bucket===b?S.accent2:'#fff', color: form.bucket===b?S.primary:S.ink2, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                    {b}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: S.ink2, marginBottom: 6 }}>Description <span style={{ color: S.primary }}>*</span></label>
              <textarea required value={form.description} onChange={e => setForm({...form,description:e.target.value})} placeholder="What do you need and why? More context = better output." rows={4}
                style={{ width: '100%', padding: '11px 14px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', color: S.ink, background: '#fff', resize: 'vertical' }}
                onFocus={e => e.target.style.borderColor=S.primary} onBlur={e => e.target.style.borderColor=S.border}/>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
              {[['impact','Impact','How much will this move the needle?'],['urgency','Urgency','How time-sensitive?'],['effort','Effort','How complex to build?']].map(([k,l,h]) => (
                <div key={k}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: S.ink2, marginBottom: 3 }}>{l}: <span style={{ color: S.primary }}>{form[k]}/5</span></label>
                  <p style={{ fontSize: 10, color: S.muted, marginBottom: 8 }}>{h}</p>
                  <input type="range" min={1} max={5} value={form[k]} onChange={e => setForm({...form,[k]:+e.target.value})} style={{ width: '100%', accentColor: S.primary }}/>
                </div>
              ))}
            </div>
          </div>
          {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', marginBottom: 14, fontSize: 13, color: S.error }}>{error}</div>}
          <button type="submit" disabled={loading || !form.title || !form.name || !form.email || !form.description}
            style={{ width: '100%', padding: 14, background: S.ink, color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: (!form.title||!form.name||!form.email||!form.description)?0.5:1 }}>
            {loading ? <><Loader size={16}/>Submitting...</> : <>Submit Request <ArrowRight size={16}/></>}
          </button>
        </form>
      </div>
    </div>
  )
}
