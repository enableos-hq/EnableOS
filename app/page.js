'use client'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'

const S = {
  primary: '#7C5CFC', primaryHover: '#9B7EFF', primaryLight: '#BDA9FF',
  ink: '#1a1235', ink2: '#4a4162', muted: '#8b82a0',
  border: '#E2DCF0', accent: '#F0ECFF', accent2: '#E8E0FF',
  canvas: '#FDFBFF', sidebar: '#1a1235',
}

const Logo = ({ dark, size = 140 }) => (
  <svg width={size} height={Math.round(size * 0.317)} viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ll1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#BDA9FF"/><stop offset="100%" stopColor="#9B7EFF"/></linearGradient>
      <linearGradient id="ll2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#9B7EFF"/><stop offset="100%" stopColor="#7C5CFC"/></linearGradient>
      <linearGradient id="ll3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#7C5CFC"/><stop offset="100%" stopColor="#5B3EDB"/></linearGradient>
    </defs>
    <rect x="0" y="12" width="52" height="9" rx="2.5" fill="url(#ll1)" opacity={dark?"0.45":"0.55"}/>
    <rect x="6" y="27" width="52" height="12" rx="2.5" fill="url(#ll2)" opacity={dark?"0.75":"0.8"}/>
    <rect x="12" y="45" width="52" height="16" rx="2.5" fill="url(#ll3)"/>
    <line x1="6" y1="27" x2="0" y2="21" stroke="#BDA9FF" strokeWidth="0.8" opacity="0.5"/>
    <line x1="12" y1="45" x2="6" y2="39" stroke="#9B7EFF" strokeWidth="0.8" opacity="0.5"/>
    <line x1="58" y1="27" x2="52" y2="21" stroke="#BDA9FF" strokeWidth="0.8" opacity="0.5"/>
    <line x1="64" y1="45" x2="58" y2="39" stroke="#9B7EFF" strokeWidth="0.8" opacity="0.5"/>
    <circle cx="59" cy="53" r="3" fill="#ffffff" opacity={dark?"0.85":"0.9"}/>
    <circle cx="50" cy="53" r="3" fill="#BDA9FF" opacity={dark?"0.7":"0.6"}/>
    <text x="82" y="58" fontFamily="Libre Baskerville,Georgia,serif" fontSize="38" fontWeight="400" fill={dark?"#ffffff":"#1a1235"}>Enable</text>
    <text x="222" y="58" fontFamily="Libre Baskerville,Georgia,serif" fontSize="38" fontWeight="700" fill={dark?"#BDA9FF":"#7C5CFC"}>OS</text>
  </svg>
)

const features = [
  { tag: 'Intake', title: 'Auto-prioritize every request', desc: 'Every enablement request gets a priority score based on impact, urgency, and effort — automatically. Stop guessing what to build next.' },
  { tag: '1:1 Notes + AI', title: 'Notes that actually do something', desc: 'Claude AI reads your private notes and tells you the sentiment, suggests your next coaching action, and flags reps who need attention — before they miss quota.' },
  { tag: 'Ramp & Onboarding', title: 'Know exactly where every rep stands', desc: '5 onboarding sections, 6 ramp benchmarks, per-rep progress tracking. You\'ll know who\'s ahead, who\'s behind, and what\'s blocking them — in 10 seconds.' },
  { tag: 'Collaterals', title: 'A library your team actually uses', desc: 'Track which assets get used and which don\'t. Build impact stories around your best collateral. Retire what\'s not working.' },
  { tag: 'Pulse Checks', title: 'Measure readiness before it\'s too late', desc: 'Send custom pulse surveys to your team. Catch confidence gaps before they show up in pipeline.' },
  { tag: 'Forecasting', title: 'Show what enablement is actually building', desc: 'A project pipeline for enablement work. Track what\'s in progress, what\'s planned, what\'s done. Finally have an answer when leadership asks.' },
]

const pain = [
  { icon: '📊', text: 'Tracking rep ramp progress in a Google Sheet you update manually every week' },
  { icon: '💬', text: 'Enablement requests coming in over Slack, email, and Notion — with no prioritization system' },
  { icon: '📝', text: 'Writing 1:1 notes in a notebook and losing all your follow-up actions' },
  { icon: '📁', text: 'Your collateral library is a Drive folder nobody knows how to navigate' },
  { icon: '🎯', text: 'You can\'t prove the ROI of a single thing you\'ve built' },
]

export default function Landing() {
  const [struck, setStruck] = useState([])
  const painRef = useRef(null)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        pain.forEach((_, i) => setTimeout(() => setStruck(prev => [...prev, i]), i * 300 + 400))
        obs.disconnect()
      }
    }, { threshold: 0.3 })
    if (painRef.current) obs.observe(painRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div style={{ fontFamily: 'var(--font-body)', background: S.canvas, color: S.ink, overflowX: 'hidden' }}>
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(253,251,255,0.92)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${S.border}`, padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <a href="/" style={{ textDecoration: 'none' }}><Logo size={120} /></a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <a href="#features" style={{ fontSize: 14, color: S.ink2, textDecoration: 'none', fontWeight: 500 }}>Features</a>
          <a href="/roadmap" style={{ fontSize: 14, color: S.ink2, textDecoration: 'none', fontWeight: 500 }}>Roadmap</a>
          <a href="/login" style={{ fontSize: 14, color: S.ink2, textDecoration: 'none', fontWeight: 500 }}>Log in</a>
          <a href="#waitlist" style={{ background: S.ink, color: '#fff', padding: '9px 20px', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>Get early access</a>
        </div>
      </nav>

      <section style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '80px 48px', background: 'linear-gradient(160deg,#FDFBFF 0%,#F4F0FF 60%,#EDE5FF 100%)' }}>
        <div style={{ position: 'absolute', width: 56, height: 56, top: '18%', right: '12%', background: 'linear-gradient(135deg,#a78bfa,#7C5CFC)', borderRadius: 10, boxShadow: 'inset -6px -6px 0 #5b3fcf', animation: 'float1 6s ease-in-out infinite', opacity: 0.8 }} />
        <div style={{ position: 'absolute', width: 70, height: 70, top: '30%', left: '8%', border: `8px solid ${S.primaryLight}`, borderRadius: '50%', animation: 'float2 7s ease-in-out infinite', opacity: 0.7 }} />
        <div style={{ position: 'absolute', width: 44, height: 44, top: '65%', right: '8%', borderRadius: '50%', background: `radial-gradient(circle at 35% 35%,#BDA9FF,#7C5CFC)`, animation: 'float1 8s ease-in-out infinite', opacity: 0.8 }} />
        <div style={{ position: 'absolute', width: 80, height: 28, top: '72%', left: '6%', background: 'linear-gradient(90deg,#E8E0FF,#BDA9FF)', borderRadius: 100, animation: 'float2 5s ease-in-out infinite', opacity: 0.7 }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 720 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: S.accent2, color: S.primary, padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: S.primary, display: 'inline-block' }} />
            Built for solo enablement hires
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,5vw,62px)', fontWeight: 700, color: S.ink, lineHeight: 1.1, marginBottom: 20 }}>
            The <em style={{ fontStyle: 'italic', color: S.primary }}>operating system</em> for enablement
          </h1>
          <p style={{ fontSize: 18, color: S.ink2, lineHeight: 1.6, maxWidth: 520, margin: '0 auto 36px' }}>
            Stop running your entire enablement program across Notion, spreadsheets, Slack, and Google Forms. EnableOS puts everything in one place.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#waitlist" style={{ background: S.ink, color: '#fff', padding: '14px 28px', borderRadius: 100, fontSize: 15, fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 24px #1a123530' }}>
              Get early access <ArrowRight size={16} />
            </a>
            <a href="#features" style={{ background: 'transparent', color: S.ink, padding: '14px 28px', borderRadius: 100, border: `1px solid ${S.border}`, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              See all 12 features
            </a>
          </div>
        </div>
        <style>{`
          @keyframes float1{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-18px) rotate(6deg)}}
          @keyframes float2{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        `}</style>
      </section>

      <section ref={painRef} style={{ padding: '100px 48px', background: '#fff', borderTop: `1px solid ${S.border}`, borderBottom: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: S.muted, marginBottom: 16 }}>The problem</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 700, color: S.ink, marginBottom: 40 }}>Sound familiar?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {pain.map((p, i) => (
              <div key={i} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderRadius: 10, border: `1px solid ${S.border}`, background: S.canvas, overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: struck.includes(i) ? '100%' : '0%', background: S.accent, transition: 'width 0.6s ease', zIndex: 0 }} />
                <span style={{ fontSize: 20, position: 'relative', zIndex: 1 }}>{p.icon}</span>
                <span style={{ fontSize: 15, color: struck.includes(i) ? S.muted : S.ink2, fontWeight: 500, position: 'relative', zIndex: 1, textDecoration: struck.includes(i) ? 'line-through' : 'none', transition: 'all 0.4s' }}>{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" style={{ padding: '100px 48px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: S.muted, marginBottom: 16, textAlign: 'center' }}>What you get</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 700, color: S.ink, textAlign: 'center', marginBottom: 12 }}>Everything in one place</h2>
          <p style={{ textAlign: 'center', color: S.ink2, fontSize: 16, marginBottom: 64, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>12 features built specifically for the way enablement actually works at a startup.</p>
          {features.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 48, marginBottom: 64, flexDirection: i % 2 === 1 ? 'row-reverse' : 'row' }}>
              <div style={{ flex: 1 }}>
                <span style={{ display: 'inline-block', background: S.accent2, color: S.primary, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '4px 12px', borderRadius: 100, marginBottom: 12 }}>{f.tag}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: S.ink, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 15, color: S.ink2, lineHeight: 1.65 }}>{f.desc}</p>
              </div>
              <div style={{ flex: '0 0 340px', height: 200, borderRadius: 16, background: `linear-gradient(135deg,${S.accent},#fff)`, border: `1px solid ${S.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: 48 }}>{'📋📊🏃💼📡🔭'.split('').filter((c,j)=>j===i)[0] || '⚡'}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '80px 48px', background: S.sidebar }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 32, textAlign: 'center' }}>
          {[['9', 'Core features'], ['0', 'Spreadsheets needed'], ['20', 'Early access teams'], ['1', 'Person can run it']].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 700, color: S.primaryLight, marginBottom: 6 }}>{n}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="waitlist" style={{ padding: '100px 48px', textAlign: 'center', background: `linear-gradient(160deg,${S.canvas},#F0ECFF)` }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: S.accent2, color: S.primary, padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 20 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: S.primary, display: 'inline-block' }} />
          Limited early access
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 700, color: S.ink, marginBottom: 14 }}>Ready to stop the chaos?</h2>
        <p style={{ fontSize: 16, color: S.ink2, marginBottom: 36 }}>Join 20+ enablement teams on the waitlist. Free for early users.</p>
        <div style={{ display: 'flex', gap: 10, maxWidth: 460, margin: '0 auto', justifyContent: 'center' }}>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" type="email"
            style={{ flex: 1, padding: '13px 18px', border: `1px solid ${S.border}`, borderRadius: 100, fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', color: S.ink }} />
          <a href="https://tally.so/r/kdRgXd" target="_blank" rel="noopener noreferrer" style={{ background: S.ink, color: '#fff', padding: '13px 24px', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
            Get early access
          </a>
        </div>
      </section>

      <footer style={{ padding: '32px 48px', borderTop: `1px solid ${S.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Logo size={100} />
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <a href="/intake-form" style={{ fontSize: 13, color: S.muted, textDecoration: 'none' }}>Submit a request</a>
          <a href="/roadmap" style={{ fontSize: 13, color: S.muted, textDecoration: 'none' }}>Roadmap</a>
        </div>
        <p style={{ fontSize: 13, color: S.muted }}>© 2026 EnableOS · Built for enablement, by enablement</p>
      </footer>
    </div>
  )
}
