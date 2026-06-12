'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '../../lib/supabase'

const supabase = createClient()

const fieldStyle = {
  width: '100%', background: '#1a1235', border: '1px solid #3a3550',
  borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14,
  fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
}

const labelStyle = {
  display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: 12,
  fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em'
}

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/app'
  const error = searchParams.get('error')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [mode, setMode] = useState('login')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push(next)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        router.push(next)
      }
    })
    return () => subscription.unsubscribe()
  }, [next, router])

  const handleGoogle = async () => {
    setGoogleLoading(true)
    setErrorMsg('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/app`,
        queryParams: { prompt: 'select_account' },
      }
    })
    if (error) {
      setErrorMsg(error.message)
      setGoogleLoading(false)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setErrorMsg('')
    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setErrorMsg(error.message); setLoading(false) }
      else router.push(next)
    } else {
      if (!firstName.trim() || !lastName.trim()) {
        setErrorMsg('First and last name are required')
        setLoading(false)
        return
      }
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            company: company.trim(),
            role: role,
            full_name: `${firstName.trim()} ${lastName.trim()}`
          }
        }
      })
      if (error) { setErrorMsg(error.message); setLoading(false) }
      else router.push(next)
    }
  }

  const canSubmit = mode === 'login'
    ? email && password
    : email && password && firstName.trim() && lastName.trim()

  return (
    <div style={{
      minHeight: '100vh', background: '#1a1235',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-body, Sora, sans-serif)', padding: 20
    }}>
      <div style={{
        background: '#231a42', borderRadius: 16, padding: 40,
        width: '100%', maxWidth: 420, border: '1px solid #3a3550'
      }}>
        {/* Logo */}
        <div style={{ marginBottom: 32, textAlign: 'center' }}>
          <svg width="160" height="48" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="pl1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#BDA9FF"/><stop offset="100%" stopColor="#9B7EFF"/></linearGradient>
              <linearGradient id="pl2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#9B7EFF"/><stop offset="100%" stopColor="#7C5CFC"/></linearGradient>
              <linearGradient id="pl3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#7C5CFC"/><stop offset="100%" stopColor="#5B3EDB"/></linearGradient>
            </defs>
            <rect x="0" y="12" width="52" height="9" rx="2.5" fill="url(#pl1)" opacity="0.45"/>
            <rect x="6" y="27" width="52" height="12" rx="2.5" fill="url(#pl2)" opacity="0.75"/>
            <rect x="12" y="45" width="52" height="16" rx="2.5" fill="url(#pl3)"/>
            <circle cx="59" cy="53" r="3" fill="#ffffff" opacity="0.85"/>
            <circle cx="50" cy="53" r="3" fill="#BDA9FF" opacity="0.7"/>
            <text x="82" y="58" fontFamily="Libre Baskerville,Georgia,serif" fontSize="38" fontWeight="400" fill="#ffffff">Enable</text>
            <text x="222" y="58" fontFamily="Libre Baskerville,Georgia,serif" fontSize="38" fontWeight="700" fill="#BDA9FF">OS</text>
          </svg>
        </div>

        <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 6, textAlign: 'center', fontFamily: 'Libre Baskerville, Georgia, serif' }}>
          {mode === 'login' ? 'Welcome back' : 'Create your account'}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, textAlign: 'center', marginBottom: 28 }}>
          {mode === 'login' ? 'Sign in to your workspace' : 'Tell us a bit about yourself'}
        </p>

        {(error || errorMsg) && (
          <div style={{ background: '#3d1a1a', border: '1px solid #7f1d1d', borderRadius: 8, padding: '10px 14px', marginBottom: 16, color: '#fca5a5', fontSize: 13 }}>
            {error === 'auth' ? 'Authentication failed. Please try again.' : errorMsg}
          </div>
        )}

        {/* Google Button */}
        <button
          onClick={handleGoogle}
          disabled={googleLoading}
          style={{
            width: '100%', padding: '12px 16px', borderRadius: 10,
            border: '1px solid #3a3550', background: '#2a2050',
            color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            marginBottom: 20, fontFamily: 'inherit',
            opacity: googleLoading ? 0.7 : 1
          }}
        >
          {googleLoading ? 'Redirecting...' : (
            <>
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
                <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.01c-.72.48-1.63.76-2.7.76-2.08 0-3.84-1.4-4.47-3.29H1.88v2.07A8 8 0 0 0 8.98 17z"/>
                <path fill="#FBBC05" d="M4.51 10.52A4.8 4.8 0 0 1 4.26 9c0-.52.09-1.02.25-1.52V5.41H1.88A8 8 0 0 0 .98 9c0 1.29.31 2.51.9 3.59l2.63-2.07z"/>
                <path fill="#EA4335" d="M8.98 3.58c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 8.98 1a8 8 0 0 0-7.1 4.41l2.63 2.07c.63-1.89 2.39-3.9 4.47-3.9z"/>
              </svg>
              Continue with Google
            </>
          )}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: '#3a3550' }} />
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>or</span>
          <div style={{ flex: 1, height: 1, background: '#3a3550' }} />
        </div>

        {/* Signup-only fields */}
        {mode === 'signup' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              <div>
                <label style={labelStyle}>First name *</label>
                <input
                  type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                  placeholder="First name"
                  style={fieldStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Last name *</label>
                <input
                  type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                  placeholder="Last name"
                  style={fieldStyle}
                />
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Company</label>
              <input
                type="text" value={company} onChange={e => setCompany(e.target.value)}
                placeholder="Your company name"
                style={fieldStyle}
              />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Your role</label>
              <select
                value={role} onChange={e => setRole(e.target.value)}
                style={{ ...fieldStyle, cursor: 'pointer', appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%239B7EFF\' stroke-width=\'2\'%3E%3Cpath d=\'M6 9l6 6 6-6\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: 36 }}
              >
                <option value="" style={{ color: '#666' }}>Select your role</option>
                <option value="Sales Enablement">Sales Enablement</option>
                <option value="Sales Leader">Sales Leader / Manager</option>
                <option value="RevOps">Revenue Operations</option>
                <option value="SDR Manager">SDR Manager</option>
                <option value="Founder">Founder / CEO</option>
                <option value="GTM">GTM / Growth</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </>
        )}

        {/* Email */}
        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>Email</label>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="you@company.com"
            style={fieldStyle}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Password</label>
          <input
            type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            onKeyDown={e => e.key === 'Enter' && canSubmit && handleSubmit()}
            style={fieldStyle}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !canSubmit}
          style={{
            width: '100%', padding: '12px 16px', borderRadius: 10,
            border: 'none', background: 'linear-gradient(135deg, #7C5CFC, #9B7EFF)',
            color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
            fontFamily: 'inherit', opacity: (loading || !canSubmit) ? 0.6 : 1
          }}
        >
          {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}
        </button>

        <p style={{ textAlign: 'center', marginTop: 20, color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setErrorMsg('') }}
            style={{ background: 'none', border: 'none', color: '#9B7EFF', cursor: 'pointer', fontWeight: 600, fontSize: 13, fontFamily: 'inherit' }}
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
