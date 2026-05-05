'use client'
import { useState } from 'react'
import { createClient } from '../../lib/supabase'

const supabase = createClient()

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
  borderFocus: '#7C5CFC',
  canvas: '#f8f9ff',
  success: '#059669',
  error: '#dc2626',
}

const BUCKETS = ['Collateral', 'Training Session', 'Everboarding', 'Onboarding', 'Process', 'Playbook', 'Other']

function FormCard({ children, accent }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 12,
      border: `1px solid ${S.border}`,
      overflow: 'hidden',
      boxShadow: '0 1px 4px rgba(26,18,53,0.06)',
      marginBottom: 16,
    }}>
      {accent && (
        <div style={{
          height: 8,
          background: `linear-gradient(90deg, ${S.primary}, ${S.primaryHover})`,
        }} />
      )}
      <div style={{ padding: '24px 28px' }}>
        {children}
      </div>
    </div>
  )
}

function ScaleRow({ value, onChange, label, lowLabel, highLabel }) {
  return (
    <div>
      <div style={{ fontSize: 14, color: S.inkSecondary, marginBottom: 14, fontFamily: 'Sora, sans-serif' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 12, color: S.muted, minWidth: 80, fontFamily: 'Sora, sans-serif' }}>{lowLabel}</span>
        <div style={{ display: 'flex', gap: 8, flex: 1, justifyContent: 'center' }}>
          {[1, 2, 3, 4, 5].map(n => (
            <label key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <input
                type="radio"
                name={label}
                value={n}
                checked={value === n}
                onChange={() => onChange(n)}
                style={{ accentColor: S.primary, width: 18, height: 18 }}
              />
              <span style={{
                fontSize: 13,
                fontWeight: value === n ? 700 : 400,
                color: value === n ? S.primary : S.muted,
                fontFamily: 'Sora, sans-serif',
              }}>{n}</span>
            </label>
          ))}
        </div>
        <span style={{ fontSize: 12, color: S.muted, minWidth: 80, textAlign: 'right', fontFamily: 'Sora, sans-serif' }}>{highLabel}</span>
      </div>
    </div>
  )
}

export default function IntakeFormPage() {
  const [step, setStep] = useState('form') // 'form' | 'submitted'
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [touched, setTouched] = useState({})

  const [form, setForm] = useState({
    requester_name: '',
    requester_email: '',
    requester_team: '',
    title: '',
    bucket: '',
    description: '',
    business_problem: '',
    impact: 3,
    urgency: 3,
    effort: 3,
  })

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))
  const touch = (key) => setTouched(t => ({ ...t, [key]: true }))

  const priorityScore = Math.round((form.impact * form.urgency) / form.effort)
  const priorityLabel = priorityScore >= 7 ? 'High' : priorityScore >= 4 ? 'Medium' : 'Low'
  const priorityColor = priorityScore >= 7 ? S.error : priorityScore >= 4 ? '#d97706' : S.success

  const isValid = form.title.trim() && form.bucket && form.description.trim()

  const handleSubmit = async () => {
    setTouched({ title: true, bucket: true, description: true })
    if (!isValid) return
    setSubmitting(true)
    setError('')

    const { error: err } = await supabase.from('requests').insert({
      title: form.title.trim(),
      bucket: form.bucket,
      description: [
        form.description.trim(),
        form.business_problem ? `\n\nBusiness problem: ${form.business_problem.trim()}` : '',
        form.requester_name ? `\n\nSubmitted by: ${form.requester_name}${form.requester_email ? ` (${form.requester_email})` : ''}${form.requester_team ? ` — ${form.requester_team}` : ''}` : '',
      ].join(''),
      impact: form.impact,
      urgency: form.urgency,
      effort: form.effort,
      priority_score: priorityScore,
      status: 'open',
      // No user_id — public submission uses a placeholder
      user_id: '00000000-0000-0000-0000-000000000000',
    })

    if (err) {
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
      return
    }

    setStep('submitted')
    setSubmitting(false)
  }

  if (step === 'submitted') {
    return (
      <div style={{ minHeight: '100vh', background: S.canvas, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'Sora, sans-serif' }}>
        <div style={{ textAlign: 'center', maxWidth: 480 }}>
          <div style={{
            width: 72, height: 72,
            background: '#d1fae5',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: 32,
          }}>✓</div>
          <h2 style={{ fontFamily: 'Libre Baskerville, serif', fontSize: 26, fontWeight: 700, color: S.ink, marginBottom: 12 }}>
            Request submitted!
          </h2>
          <p style={{ fontSize: 15, color: S.muted, lineHeight: 1.7, marginBottom: 28 }}>
            Your enablement request has been received. The team will review and prioritise it — you'll hear back if we need more context.
          </p>
          <button
            onClick={() => { setStep('form'); setForm({ requester_name: '', requester_email: '', requester_team: '', title: '', bucket: '', description: '', business_problem: '', impact: 3, urgency: 3, effort: 3 }); setTouched({}) }}
            style={{ padding: '10px 24px', borderRadius: 8, border: `1px solid ${S.border}`, background: '#fff', color: S.inkSecondary, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Sora, sans-serif' }}
          >
            Submit another request
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: S.canvas, padding: '40px 16px 80px', fontFamily: 'Sora, sans-serif' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>

        {/* Header card */}
        <FormCard accent>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: `linear-gradient(135deg, ${S.primary}, ${S.primaryHover})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="22" height="22" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="27" width="52" height="12" rx="2.5" fill="white" opacity="0.8"/>
                <rect x="12" y="45" width="52" height="16" rx="2.5" fill="white"/>
              </svg>
            </div>
            <span style={{ fontFamily: 'Libre Baskerville, serif', fontSize: 16, fontWeight: 700, color: S.ink }}>EnableOS</span>
          </div>
          <h1 style={{ fontFamily: 'Libre Baskerville, serif', fontSize: 26, fontWeight: 700, color: S.ink, marginBottom: 8 }}>
            Enablement Request
          </h1>
          <p style={{ fontSize: 14, color: S.muted, lineHeight: 1.7 }}>
            Use this form to submit a request for enablement support — playbooks, training, collateral, process improvements, or anything else the team needs.
            Requests are scored and prioritised automatically.
          </p>
          <div style={{ marginTop: 16, padding: '10px 14px', background: S.accentBg, borderRadius: 8, fontSize: 12, color: S.inkSecondary }}>
            Fields marked <span style={{ color: S.error }}>*</span> are required
          </div>
        </FormCard>

        {/* Section 1 — Who are you */}
        <FormCard>
          <h2 style={{ fontFamily: 'Libre Baskerville, serif', fontSize: 16, fontWeight: 700, color: S.ink, marginBottom: 20 }}>
            About you
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: S.inkSecondary, marginBottom: 6 }}>Your name</label>
              <input
                value={form.requester_name}
                onChange={e => set('requester_name', e.target.value)}
                placeholder="Sarah Chen"
                style={{ width: '100%', padding: '10px 12px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 14, fontFamily: 'Sora, sans-serif', outline: 'none', color: S.ink, boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = S.borderFocus}
                onBlur={e => e.target.style.borderColor = S.border}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: S.inkSecondary, marginBottom: 6 }}>Your email</label>
              <input
                value={form.requester_email}
                onChange={e => set('requester_email', e.target.value)}
                placeholder="sarah@company.com"
                type="email"
                style={{ width: '100%', padding: '10px 12px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 14, fontFamily: 'Sora, sans-serif', outline: 'none', color: S.ink, boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = S.borderFocus}
                onBlur={e => e.target.style.borderColor = S.border}
              />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: S.inkSecondary, marginBottom: 6 }}>Your team / role</label>
            <input
              value={form.requester_team}
              onChange={e => set('requester_team', e.target.value)}
              placeholder="e.g. SDR Team, AE Team, Marketing"
              style={{ width: '100%', padding: '10px 12px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 14, fontFamily: 'Sora, sans-serif', outline: 'none', color: S.ink, boxSizing: 'border-box' }}
              onFocus={e => e.target.style.borderColor = S.borderFocus}
              onBlur={e => e.target.style.borderColor = S.border}
            />
          </div>
        </FormCard>

        {/* Section 2 — The request */}
        <FormCard>
          <h2 style={{ fontFamily: 'Libre Baskerville, serif', fontSize: 16, fontWeight: 700, color: S.ink, marginBottom: 20 }}>
            The request
          </h2>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: S.inkSecondary, marginBottom: 6 }}>
              Request title <span style={{ color: S.error }}>*</span>
            </label>
            <input
              value={form.title}
              onChange={e => set('title', e.target.value)}
              onBlur={() => touch('title')}
              placeholder="e.g. Cold email sequence for mid-market accounts"
              style={{
                width: '100%', padding: '10px 12px',
                border: `1px solid ${touched.title && !form.title.trim() ? S.error : S.border}`,
                borderRadius: 8, fontSize: 14, fontFamily: 'Sora, sans-serif', outline: 'none', color: S.ink, boxSizing: 'border-box'
              }}
              onFocus={e => e.target.style.borderColor = S.borderFocus}
              onBlur={e => { touch('title'); e.target.style.borderColor = touched.title && !form.title.trim() ? S.error : S.border }}
            />
            {touched.title && !form.title.trim() && (
              <div style={{ fontSize: 12, color: S.error, marginTop: 4 }}>This field is required</div>
            )}
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: S.inkSecondary, marginBottom: 10 }}>
              Category <span style={{ color: S.error }}>*</span>
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {BUCKETS.map(b => (
                <button
                  key={b}
                  type="button"
                  onClick={() => set('bucket', b)}
                  style={{
                    padding: '8px 16px', borderRadius: 100,
                    border: `1.5px solid ${form.bucket === b ? S.primary : S.border}`,
                    background: form.bucket === b ? S.accentBg2 : '#fff',
                    color: form.bucket === b ? S.primary : S.inkSecondary,
                    fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    fontFamily: 'Sora, sans-serif',
                    transition: 'all 0.15s',
                  }}
                >
                  {b}
                </button>
              ))}
            </div>
            {touched.bucket && !form.bucket && (
              <div style={{ fontSize: 12, color: S.error, marginTop: 8 }}>Please select a category</div>
            )}
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: S.inkSecondary, marginBottom: 6 }}>
              Describe what you need <span style={{ color: S.error }}>*</span>
            </label>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              onBlur={() => touch('description')}
              placeholder="What exactly are you asking for? Be as specific as possible."
              rows={4}
              style={{
                width: '100%', padding: '10px 12px',
                border: `1px solid ${touched.description && !form.description.trim() ? S.error : S.border}`,
                borderRadius: 8, fontSize: 14, fontFamily: 'Sora, sans-serif', outline: 'none',
                color: S.ink, resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6,
              }}
              onFocus={e => e.target.style.borderColor = S.borderFocus}
              onBlur={e => { touch('description'); e.target.style.borderColor = touched.description && !form.description.trim() ? S.error : S.border }}
            />
            {touched.description && !form.description.trim() && (
              <div style={{ fontSize: 12, color: S.error, marginTop: 4 }}>This field is required</div>
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: S.inkSecondary, marginBottom: 6 }}>
              What business problem does this solve?
            </label>
            <textarea
              value={form.business_problem}
              onChange={e => set('business_problem', e.target.value)}
              placeholder="e.g. Our SDRs are struggling with objection handling on pricing calls, leading to a drop in MQL→SQL conversion."
              rows={3}
              style={{
                width: '100%', padding: '10px 12px', border: `1px solid ${S.border}`,
                borderRadius: 8, fontSize: 14, fontFamily: 'Sora, sans-serif', outline: 'none',
                color: S.ink, resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6,
              }}
              onFocus={e => e.target.style.borderColor = S.borderFocus}
              onBlur={e => e.target.style.borderColor = S.border}
            />
          </div>
        </FormCard>

        {/* Section 3 — Priority */}
        <FormCard>
          <h2 style={{ fontFamily: 'Libre Baskerville, serif', fontSize: 16, fontWeight: 700, color: S.ink, marginBottom: 6 }}>
            Help us prioritise
          </h2>
          <p style={{ fontSize: 13, color: S.muted, marginBottom: 24, lineHeight: 1.6 }}>
            Rate each dimension to help the enablement team understand where this sits relative to other work.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <ScaleRow
              label="Business impact — how much will this move the needle?"
              value={form.impact}
              onChange={v => set('impact', v)}
              lowLabel="Minimal"
              highLabel="Critical"
            />
            <div style={{ height: 1, background: S.border }} />
            <ScaleRow
              label="Urgency — how time-sensitive is this?"
              value={form.urgency}
              onChange={v => set('urgency', v)}
              lowLabel="Can wait"
              highLabel="Needed now"
            />
            <div style={{ height: 1, background: S.border }} />
            <ScaleRow
              label="Effort — how complex is this to build?"
              value={form.effort}
              onChange={v => set('effort', v)}
              lowLabel="Quick win"
              highLabel="Big project"
            />
          </div>

          {/* Live priority preview */}
          <div style={{
            marginTop: 24, padding: '14px 18px',
            background: S.accentBg, borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: 12, color: S.muted, marginBottom: 2 }}>Estimated priority score</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: priorityColor, fontFamily: 'Libre Baskerville, serif' }}>
                {priorityScore} / 10
              </div>
            </div>
            <div style={{
              padding: '6px 18px', borderRadius: 100,
              background: priorityColor + '18',
              border: `1.5px solid ${priorityColor}`,
              color: priorityColor,
              fontSize: 13, fontWeight: 700,
            }}>
              {priorityLabel} Priority
            </div>
          </div>
        </FormCard>

        {/* Submit */}
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 14, color: S.error }}>
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={submitting}
          style={{
            width: '100%', padding: '14px',
            background: submitting ? S.muted : `linear-gradient(135deg, ${S.primary}, ${S.primaryHover})`,
            color: '#fff', border: 'none', borderRadius: 10,
            fontSize: 15, fontWeight: 700, fontFamily: 'Sora, sans-serif',
            cursor: submitting ? 'not-allowed' : 'pointer',
            boxShadow: submitting ? 'none' : '0 4px 16px rgba(124,92,252,0.35)',
            transition: 'all 0.2s',
          }}
        >
          {submitting ? 'Submitting…' : 'Submit Request →'}
        </button>

        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: S.muted }}>
          Powered by <span style={{ color: S.primary, fontWeight: 600 }}>EnableOS</span>
        </div>

      </div>
    </div>
  )
}
