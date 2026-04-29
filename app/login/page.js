'use client'
import { useState } from 'react'
import { createClient } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import { ArrowRight, Loader } from 'lucide-react'

const supabase = createClient()

const S = {
  canvas: '#FDFBFF', primary: '#7C5CFC', primaryHover: '#9B7EFF',
  primaryLight: '#BDA9FF', accentBg: '#F0ECFF', ink: '#1a1235',
  inkSecondary: '#4a4162', muted: '#8b82a0', border: '#E2DCF0',
  sidebar: '#1a1235', error: '#dc2626',
}

const Logo = () => (
  <svg width="160" height="48" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#BDA9FF"/><stop offset="100%" stopColor="#9B7EFF"/></linearGradient>
      <linearGradient id="lg2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#9B7EFF"/><stop offset="100%" stopColor="#7C5CFC"/></linearGradient>
      <linearGradient id="lg3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#7C5CFC"/><stop offset="100%" stopColor="#5B3EDB"/></linearGradient>
    </defs>
    <rect x="0" y="12" width="52" height="9" rx="2.5" fill="url(#lg1)" opacity="0.55"/>
    <rect x="6" y="27" width="52" height="12" rx="2.5" fill="url(#lg2)" opacity="0.8"/>
    <rect x="12" y="45" width="52" height="16" rx="2.5" fill="url(#lg3)"/>
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

export default function Login() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handle = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      router.push('/app')
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      setSuccess('Account created! Signing you in...')
      setTimeout(() => router.push('/app'), 1500)
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: S.canvas, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: 'var(--font-body)', position: 'relative', overflow: 'hidden' }}>
      {/* Background decorations */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${S.primary}12 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle, ${S.primaryLight}10 0%, transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 420, position: 'relative' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            <Logo />
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: S.ink, marginBottom: 6 }}>
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p style={{ color: S.muted, fontSize: 14 }}>
            {mode === 'login' ? 'Sign in to your workspace' : 'Start your enablement OS today'}
          </p>
        </div>

        {/* Card */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: `1px solid ${S.border}`, boxShadow: '0 4px 32px rgba(124,92,252,0.08)' }}>
          <form onSubmit={handle}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: S.inkSecondary, marginBottom: 6 }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                style={{ width: '100%', padding: '12px 16px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', color: S.ink, transition: 'border-color 0.15s', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = S.primary}
                onBlur={e => e.target.style.borderColor = S.border}
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: S.inkSecondary, marginBottom: 6 }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                style={{ width: '100%', padding: '12px 16px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', color: S.ink, transition: 'border-color 0.15s', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = S.primary}
                onBlur={e => e.target.style.borderColor = S.border}
              />
            </div>

            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: S.error }}>
                {error}
              </div>
            )}
            {success && (
              <div style={{ background: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#065f46' }}>
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '13px', background: S.ink, color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-body)', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: loading ? 0.7 : 1, transition: 'all 0.15s' }}
            >
              {loading ? <><Loader size={16} />Loading...</> : <>{mode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight size={16} /></>}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 20, paddingTop: 20, borderTop: `1px solid ${S.border}` }}>
            <span style={{ fontSize: 14, color: S.muted }}>
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            </span>
            <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); setSuccess('') }}
              style={{ background: 'none', border: 'none', color: S.primary, fontWeight: 700, cursor: 'pointer', fontSize: 14, fontFamily: 'var(--font-body)' }}>
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <a href="/" style={{ fontSize: 13, color: S.muted, textDecoration: 'none' }}>← Back to home</a>
        </div>
      </div>
    </div>
  )
}
