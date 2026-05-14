'use client'
import { useState, Suspense } from 'react'
import { createClient } from '../../lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, Loader } from 'lucide-react'

const supabase = createClient()
const S = {
  canvas:'#FDFBFF', primary:'#7C5CFC', primaryLight:'#BDA9FF',
  ink:'#1a1235', inkSecondary:'#4a4162', muted:'#8b82a0',
  border:'#E2DCF0', accent:'#F0ECFF', accent2:'#E8E0FF', error:'#dc2626',
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

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

function LoginInner() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/app'

  const handle = async (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      router.push(next)
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      setSuccess('Account created! Signing you in...')
      setTimeout(() => router.push(next), 1500)
    }
    setLoading(false)
  }

  const handleGoogle = async () => {
    setGoogleLoading(true); setError('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${next}`, queryParams: { prompt: 'select_account' } }
    })
    if (error) { setError(error.message); setGoogleLoading(false) }
  }

  return (
    <div style={{ minHeight:'100vh', background:S.canvas, display:'flex', alignItems:'center', justifyContent:'center', padding:20, fontFamily:'var(--font-body)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:-100, right:-100, width:400, height:400, borderRadius:'50%', background:`radial-gradient(circle,${S.primary}12 0%,transparent 70%)`, pointerEvents:'none' }}/>
      <div style={{ position:'absolute', bottom:-80, left:-80, width:300, height:300, borderRadius:'50%', background:`radial-gradient(circle,${S.primaryLight}10 0%,transparent 70%)`, pointerEvents:'none' }}/>
      <div style={{ width:'100%', maxWidth:420, position:'relative' }}>
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <div style={{ display:'inline-flex', justifyContent:'center', marginBottom:16 }}><Logo/></div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:24, fontWeight:700, color:S.ink, marginBottom:6 }}>{mode==='login'?'Welcome back':'Create your account'}</h1>
          <p style={{ color:S.muted, fontSize:14 }}>{mode==='login'?'Sign in to your workspace':'Start your enablement OS today'}</p>
        </div>
        <div style={{ background:'#fff', borderRadius:16, padding:28, border:`1px solid ${S.border}`, boxShadow:'0 4px 32px rgba(124,92,252,0.08)' }}>
          <button onClick={handleGoogle} disabled={googleLoading}
            style={{ width:'100%', padding:'12px', background:'#fff', border:`1px solid ${S.border}`, borderRadius:10, fontSize:14, fontWeight:600, fontFamily:'var(--font-body)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:10, marginBottom:20, color:S.ink, transition:'border-color 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.borderColor=S.primary}
            onMouseLeave={e=>e.currentTarget.style.borderColor=S.border}>
            {googleLoading?<Loader size={16}/>:<GoogleIcon/>}
            Continue with Google
          </button>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
            <div style={{ flex:1, height:1, background:S.border }}/>
            <span style={{ fontSize:12, color:S.muted }}>or</span>
            <div style={{ flex:1, height:1, background:S.border }}/>
          </div>
          <form onSubmit={handle}>
            <div style={{ marginBottom:14 }}>
              <label style={{ display:'block', fontSize:12, fontWeight:600, color:S.inkSecondary, marginBottom:6 }}>Email</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" required
                style={{ width:'100%', padding:'11px 14px', border:`1px solid ${S.border}`, borderRadius:8, fontSize:14, fontFamily:'var(--font-body)', outline:'none', color:S.ink, boxSizing:'border-box' }}
                onFocus={e=>e.target.style.borderColor=S.primary} onBlur={e=>e.target.style.borderColor=S.border}/>
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={{ display:'block', fontSize:12, fontWeight:600, color:S.inkSecondary, marginBottom:6 }}>Password</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required minLength={6}
                style={{ width:'100%', padding:'11px 14px', border:`1px solid ${S.border}`, borderRadius:8, fontSize:14, fontFamily:'var(--font-body)', outline:'none', color:S.ink, boxSizing:'border-box' }}
                onFocus={e=>e.target.style.borderColor=S.primary} onBlur={e=>e.target.style.borderColor=S.border}/>
            </div>
            {error && <div style={{ background:'#fef2f2', border:'1px solid #fecaca', borderRadius:8, padding:'10px 14px', marginBottom:14, fontSize:13, color:S.error }}>{error}</div>}
            {success && <div style={{ background:'#d1fae5', border:'1px solid #6ee7b7', borderRadius:8, padding:'10px 14px', marginBottom:14, fontSize:13, color:'#065f46' }}>{success}</div>}
            <button type="submit" disabled={loading}
              style={{ width:'100%', padding:'12px', background:S.ink, color:'#fff', border:'none', borderRadius:10, fontSize:14, fontWeight:700, fontFamily:'var(--font-body)', cursor:loading?'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, opacity:loading?0.7:1 }}>
              {loading?<><Loader size={16}/>Loading...</>:<>{mode==='login'?'Sign In':'Create Account'} <ArrowRight size={16}/></>}
            </button>
          </form>
          <div style={{ textAlign:'center', marginTop:18, paddingTop:18, borderTop:`1px solid ${S.border}` }}>
            <span style={{ fontSize:13, color:S.muted }}>{mode==='login'?"Don't have an account? ":'Already have an account? '}</span>
            <button onClick={() => { setMode(mode==='login'?'signup':'login'); setError(''); setSuccess('') }}
              style={{ background:'none', border:'none', color:S.primary, fontWeight:700, cursor:'pointer', fontSize:13, fontFamily:'var(--font-body)' }}>
              {mode==='login'?'Sign up':'Sign in'}
            </button>
          </div>
        </div>
        <div style={{ textAlign:'center', marginTop:20 }}>
          <a href="/" style={{ fontSize:13, color:S.muted, textDecoration:'none' }}>← Back to home</a>
        </div>
      </div>
    </div>
  )
}

export default function Login() {
  return (
    <Suspense fallback={<div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}><Loader size={20} color="#7C5CFC"/></div>}>
      <LoginInner/>
    </Suspense>
  )
}
