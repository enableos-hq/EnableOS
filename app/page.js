'use client'

export default function LandingPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#1a1235',
      fontFamily: 'var(--font-body, Sora, sans-serif)',
      color: '#ffffff',
      overflowX: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 80% 60% at 60% -10%, rgba(124,92,252,0.22) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at -10% 80%, rgba(155,126,255,0.12) 0%, transparent 70%)',
      }} />

      {/* NAV */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: '68px',
        background: 'rgba(26,18,53,0.85)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        {/* ─── NAV LOGO — bigger, bolder ─── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '46px', height: '46px',
            background: 'linear-gradient(135deg, #7C5CFC, #9B7EFF)',
            borderRadius: '13px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(124,92,252,0.5)',
            flexShrink: 0,
          }}>
            <svg width="27" height="27" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display, Libre Baskerville, serif)',
              fontSize: '20px', fontWeight: '700', color: '#ffffff',
              letterSpacing: '-0.3px', lineHeight: '1.2',
            }}>EnableOS</div>
            <div style={{
              fontSize: '10px', color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '500',
            }}>The OS for Enablement</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="/login" style={{
            padding: '9px 20px', borderRadius: '10px',
            background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.75)',
            fontSize: '13.5px', fontWeight: '500', textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.15s ease',
          }}>Sign in</a>
          <a href="https://tally.so/r/kdRgXd" target="_blank" rel="noreferrer" style={{
            padding: '9px 22px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #7C5CFC, #9B7EFF)',
            color: 'white', fontSize: '13.5px', fontWeight: '600',
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(124,92,252,0.4)',
          }}>Join Waitlist</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        position: 'relative', zIndex: 1,
        maxWidth: '900px', margin: '0 auto',
        padding: '100px 40px 80px',
        textAlign: 'center',
      }}>
        {/* ─── HERO LOGO MARK — prominent center piece ─── */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '36px' }}>
          <div style={{
            width: '80px', height: '80px',
            background: 'linear-gradient(135deg, #7C5CFC, #9B7EFF)',
            borderRadius: '22px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 16px 48px rgba(124,92,252,0.55), 0 0 0 1px rgba(255,255,255,0.1)',
          }}>
            <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div style={{
          display: 'inline-block',
          padding: '5px 16px', borderRadius: '99px',
          background: 'rgba(124,92,252,0.18)',
          border: '1px solid rgba(124,92,252,0.3)',
          fontSize: '12px', fontWeight: '600', color: '#9B7EFF',
          letterSpacing: '0.08em', textTransform: 'uppercase',
          marginBottom: '28px',
        }}>Early Access — Free for First 20 Users</div>

        <h1 style={{
          fontFamily: 'var(--font-display, Libre Baskerville, serif)',
          fontSize: 'clamp(36px, 6vw, 60px)',
          fontWeight: '700', lineHeight: '1.15',
          color: '#ffffff', marginBottom: '24px',
          letterSpacing: '-1px',
        }}>
          The operating system<br />
          <span style={{ color: '#9B7EFF' }}>for enablement.</span>
        </h1>

        <p style={{
          fontSize: '18px', lineHeight: '1.7',
          color: 'rgba(255,255,255,0.55)',
          maxWidth: '560px', margin: '0 auto 44px',
        }}>
          Stop managing your reps, playbooks, and coaching across 6 different tools.
          EnableOS is built for the solo enablement hire at a fast-growing startup.
        </p>

        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://tally.so/r/kdRgXd" target="_blank" rel="noreferrer" style={{
            padding: '15px 36px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #7C5CFC, #9B7EFF)',
            color: 'white', fontSize: '15px', fontWeight: '600',
            textDecoration: 'none',
            boxShadow: '0 8px 32px rgba(124,92,252,0.5)',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
          }}>
            Join the Waitlist
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="/login" style={{
            padding: '15px 32px', borderRadius: '12px',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.8)', fontSize: '15px', fontWeight: '500',
            textDecoration: 'none',
          }}>Sign in</a>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{
        position: 'relative', zIndex: 1,
        maxWidth: '1000px', margin: '0 auto',
        padding: '40px 40px 100px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
        }}>
          {[
            { icon: '🚀', title: 'Ramp & Onboarding', desc: 'Cut rep ramp time in half with structured checklists, benchmarks, and week-by-week tracking.' },
            { icon: '🎯', title: 'Intake & Prioritization', desc: 'Score every enablement request by impact, urgency, and effort. Never drop the ball again.' },
            { icon: '📞', title: '1:1 Notes with AI', desc: 'Log coaching sessions and get AI-powered sentiment analysis to spot rep struggles before they spiral.' },
            { icon: '📊', title: 'Pulse Checks', desc: 'Weekly rep confidence scores and blocker tracking — so you always know who needs help.' },
            { icon: '🏆', title: 'Leaderboards', desc: 'Track rep performance and President\'s Club progress in one glanceable view.' },
            { icon: '📅', title: 'Weekly Planning', desc: 'Must / Should / Could columns for your weekly priorities. Run your week like a product sprint.' },
          ].map((f, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px', padding: '28px',
              transition: 'all 0.2s ease',
            }}>
              <div style={{ fontSize: '28px', marginBottom: '14px' }}>{f.icon}</div>
              <div style={{
                fontFamily: 'var(--font-display, Libre Baskerville, serif)',
                fontSize: '16px', fontWeight: '700',
                color: '#ffffff', marginBottom: '8px',
              }}>{f.title}</div>
              <div style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.6' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        position: 'relative', zIndex: 1,
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: '32px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '16px',
      }}>
        {/* ─── FOOTER LOGO ─── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px', height: '36px',
            background: 'linear-gradient(135deg, #7C5CFC, #9B7EFF)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(124,92,252,0.4)',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{
            fontFamily: 'var(--font-display, Libre Baskerville, serif)',
            fontSize: '16px', fontWeight: '700', color: '#ffffff',
          }}>EnableOS</span>
        </div>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)' }}>
          © 2025 EnableOS. Built for enablement pros.
        </div>
      </footer>
    </main>
  )
}
