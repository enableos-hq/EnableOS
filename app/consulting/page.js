'use client';

import { useEffect, useState } from 'react';

/* ─── Testimonials array — edit this to add real ones later ─── */
const TESTIMONIALS = [
  // Uncomment and duplicate to add:
  // { quote: "...", name: "First Last", role: "Head of Sales", company: "Company" },
];

const SERVICES = [
  { emoji: '🧭', title: 'Onboarding Design', description: 'New reps stop guessing. A structured ramp program that tracks progress, surfaces gaps, and gets people productive in weeks — not quarters.' },
  { emoji: '📘', title: 'Playbook Creation', description: 'Tribal knowledge turns into repeatable systems. Outbound sequences, qualification frameworks, objection handling — documented and usable.' },
  { emoji: '🎯', title: 'Coaching Frameworks', description: 'Call reviews and 1:1s that actually change behavior. AI-assisted sentiment tracking so no one slips through the cracks.' },
  { emoji: '⚙️', title: 'Enablement Systems', description: 'One workspace replaces six tools. Intake, content, pulse checks, forecasting — all visible, all trackable, all proving ROI.' },
];

const STEPS = [
  { number: '01', label: 'We talk', title: 'Discovery call', description: '30 minutes to understand the sales motion, team size, and where things break. No pitch deck — just questions.' },
  { number: '02', label: 'I build', title: 'Audit & workspace', description: 'Gaps get mapped. Systems get designed. A fully configured EnableOS workspace gets loaded with everything the team needs.' },
  { number: '03', label: 'You grow', title: 'Ongoing support', description: 'Launch call, rep walkthroughs, and monthly check-ins. The workspace evolves as the team scales.' },
];

const METRICS = [
  { value: '191%', label: 'quota attainment as an SDR' },
  { value: '50%', label: 'faster ramp time' },
  { value: '20+', label: 'reps onboarded' },
  { value: '4 yrs', label: 'in sales enablement' },
];

function Logo() {
  return (
    <a href="/" style={{ display: 'inline-flex', alignItems: 'center', height: 44, textDecoration: 'none' }}>
      <svg width="154" height="48" viewBox="0 0 310 78" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cLg1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#BDA9FF"/><stop offset="100%" stopColor="#9B7EFF"/></linearGradient>
          <linearGradient id="cLg2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#9B7EFF"/><stop offset="100%" stopColor="#7C5CFC"/></linearGradient>
          <linearGradient id="cLg3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#7C5CFC"/><stop offset="100%" stopColor="#5B3EDB"/></linearGradient>
        </defs>
        <rect x="0" y="12" width="52" height="9" rx="2.5" fill="url(#cLg1)" opacity="0.45"/>
        <rect x="6" y="27" width="52" height="12" rx="2.5" fill="url(#cLg2)" opacity="0.75"/>
        <rect x="12" y="45" width="52" height="16" rx="2.5" fill="url(#cLg3)"/>
        <line x1="6" y1="27" x2="0" y2="21" stroke="#BDA9FF" strokeWidth="0.8" opacity="0.4"/>
        <line x1="12" y1="45" x2="6" y2="39" stroke="#9B7EFF" strokeWidth="0.8" opacity="0.5"/>
        <line x1="58" y1="27" x2="52" y2="21" stroke="#BDA9FF" strokeWidth="0.8" opacity="0.4"/>
        <line x1="64" y1="45" x2="58" y2="39" stroke="#9B7EFF" strokeWidth="0.8" opacity="0.5"/>
        <circle cx="59" cy="53" r="3" fill="#ffffff" opacity="0.85"/>
        <circle cx="50" cy="53" r="3" fill="#BDA9FF" opacity="0.7"/>
        <text x="82" y="58" fontFamily="Libre Baskerville,Georgia,serif" fontSize="38" fontWeight="400" fill="#FDFBFF">Enable</text>
        <text x="222" y="58" fontFamily="Libre Baskerville,Georgia,serif" fontSize="38" fontWeight="700" fill="#BDA9FF">OS</text>
      </svg>
    </a>
  );
}

export default function ConsultingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navOpacity = Math.min(scrollY / 200, 0.95);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Sora:wght@300;400;500;600;700&display=swap');
        :root { --plum: #1A1235; --lavender: #7C5CFC; --lavender-glow: #9B7EFF; --cream: #FDFBFF; --cream-warm: #F8F6FF; --muted: #8b82a0; --border: #2a2350; --font-display: 'Libre Baskerville', Georgia, serif; --font-body: 'Sora', sans-serif; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: var(--font-body); background: var(--cream); color: var(--plum); -webkit-font-smoothing: antialiased; }
        .c-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 16px 40px; transition: background 0.3s, backdrop-filter 0.3s; }
        .c-nav-links { display: flex; align-items: center; gap: 32px; }
        .c-nav-links a { font-family: var(--font-body); font-size: 14px; font-weight: 500; color: rgba(253,251,255,0.7); text-decoration: none; transition: color 0.2s; }
        .c-nav-links a:hover { color: #FDFBFF; }
        .c-nav-cta { font-family: var(--font-body); font-size: 14px; font-weight: 600; color: var(--plum); background: var(--cream); padding: 10px 24px; border-radius: 10px; text-decoration: none; transition: transform 0.2s, box-shadow 0.2s; }
        .c-nav-cta:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(124,92,252,0.3); }
        .c-hero { position: relative; min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 120px 24px 80px; background: var(--plum); overflow: hidden; }
        .c-hero-aurora { position: absolute; inset: 0; opacity: 0.15; pointer-events: none; background: radial-gradient(ellipse 80% 60% at 20% 80%, #7C5CFC 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 20%, #9B7EFF 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 50% 50%, #5a3fd4 0%, transparent 60%); }
        .c-hero-content { position: relative; z-index: 2; max-width: 720px; }
        .c-hero-eyebrow { font-family: var(--font-body); font-size: 13px; font-weight: 600; color: var(--lavender); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 24px; opacity: 0; animation: fadeUp 0.6s 0.2s forwards; }
        .c-hero h1 { font-family: var(--font-display); font-size: clamp(32px, 5vw, 52px); font-weight: 400; color: var(--cream); line-height: 1.2; margin-bottom: 24px; opacity: 0; animation: fadeUp 0.6s 0.4s forwards; }
        .c-hero h1 em { font-style: italic; color: var(--lavender-glow); }
        .c-hero-sub { font-family: var(--font-body); font-size: 17px; line-height: 1.7; color: rgba(253,251,255,0.6); max-width: 560px; margin: 0 auto 40px; opacity: 0; animation: fadeUp 0.6s 0.6s forwards; }
        .c-hero-cta { display: inline-block; font-family: var(--font-body); font-size: 16px; font-weight: 600; color: var(--plum); background: var(--cream); padding: 16px 36px; border-radius: 12px; text-decoration: none; transition: transform 0.2s, box-shadow 0.3s; opacity: 0; animation: fadeUp 0.6s 0.8s forwards; }
        .c-hero-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(124,92,252,0.35); }
        .c-section { padding: 100px 24px; max-width: 1100px; margin: 0 auto; }
        .c-section-dark { background: var(--plum); padding: 100px 24px; }
        .c-section-tint { background: var(--cream-warm); padding: 100px 24px; }
        .c-section-header { text-align: center; max-width: 600px; margin: 0 auto 60px; }
        .c-section-header h2 { font-family: var(--font-display); font-size: clamp(26px, 3.5vw, 38px); font-weight: 400; line-height: 1.3; margin-bottom: 16px; }
        .c-section-header h2 em { font-style: italic; color: var(--lavender); }
        .c-section-header p { font-size: 15px; line-height: 1.7; color: var(--muted); }
        .c-services { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; max-width: 1100px; margin: 0 auto; }
        .c-service-card { background: white; border: 1px solid #E8E2F0; border-radius: 16px; padding: 36px 28px; transition: transform 0.25s, box-shadow 0.25s; }
        .c-service-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(26,18,53,0.08); }
        .c-service-emoji { font-size: 28px; margin-bottom: 16px; display: block; }
        .c-service-card h3 { font-family: var(--font-display); font-size: 18px; font-weight: 400; margin-bottom: 12px; color: var(--plum); }
        .c-service-card p { font-size: 14px; line-height: 1.7; color: var(--muted); }
        .c-proof { max-width: 900px; margin: 0 auto; }
        .c-proof-story { font-family: var(--font-body); font-size: 16px; line-height: 1.8; color: rgba(253,251,255,0.7); max-width: 640px; margin: 0 auto 56px; text-align: center; }
        .c-proof-story strong { color: var(--cream); font-weight: 600; }
        .c-metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; max-width: 800px; margin: 0 auto; }
        .c-metric { text-align: center; }
        .c-metric-value { font-family: var(--font-display); font-size: clamp(28px, 4vw, 40px); font-weight: 700; color: var(--lavender-glow); margin-bottom: 6px; }
        .c-metric-label { font-size: 13px; color: rgba(253,251,255,0.5); line-height: 1.4; }
        .c-testimonials-empty { text-align: center; padding: 48px 24px; border: 2px dashed #E2DCF0; border-radius: 20px; max-width: 600px; margin: 0 auto; }
        .c-testimonials-empty p { font-size: 15px; color: var(--muted); line-height: 1.6; }
        .c-testimonials-empty p:first-child { font-family: var(--font-display); font-size: 18px; color: #6b6084; margin-bottom: 8px; }
        .c-testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; max-width: 900px; margin: 0 auto; }
        .c-testimonial-card { background: white; border: 1px solid #E8E2F0; border-radius: 16px; padding: 32px 28px; }
        .c-testimonial-quote { font-size: 15px; line-height: 1.7; color: var(--plum); margin-bottom: 20px; font-style: italic; }
        .c-testimonial-name { font-size: 14px; font-weight: 600; color: var(--plum); }
        .c-testimonial-role { font-size: 13px; color: var(--muted); }
        .c-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; max-width: 960px; margin: 0 auto; position: relative; }
        .c-steps::before { content: ''; position: absolute; top: 40px; left: 16.66%; right: 16.66%; height: 2px; background: linear-gradient(90deg, var(--lavender), var(--lavender-glow)); opacity: 0.3; }
        .c-step { text-align: center; position: relative; padding: 0 20px; }
        .c-step-dot { width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, var(--lavender), var(--lavender-glow)); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-family: var(--font-body); font-size: 16px; font-weight: 700; color: white; position: relative; z-index: 2; }
        .c-step-label { font-family: var(--font-body); font-size: 12px; font-weight: 600; color: var(--lavender); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 8px; }
        .c-step h3 { font-family: var(--font-display); font-size: 20px; font-weight: 400; margin-bottom: 12px; color: var(--plum); }
        .c-step p { font-size: 14px; line-height: 1.7; color: var(--muted); }
        .c-final-cta { text-align: center; padding: 100px 24px; background: var(--plum); position: relative; overflow: hidden; }
        .c-final-cta-aurora { position: absolute; inset: 0; opacity: 0.1; pointer-events: none; background: radial-gradient(ellipse 60% 50% at 30% 70%, #7C5CFC 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 70% 30%, #9B7EFF 0%, transparent 70%); }
        .c-final-cta h2 { font-family: var(--font-display); font-size: clamp(26px, 3.5vw, 38px); font-weight: 400; color: var(--cream); margin-bottom: 12px; position: relative; z-index: 2; }
        .c-final-cta h2 em { font-style: italic; color: var(--lavender-glow); }
        .c-final-cta p { font-size: 15px; color: rgba(253,251,255,0.5); margin-bottom: 36px; position: relative; z-index: 2; }
        .c-final-cta a { display: inline-block; font-family: var(--font-body); font-size: 16px; font-weight: 600; color: var(--plum); background: var(--cream); padding: 16px 40px; border-radius: 12px; text-decoration: none; transition: transform 0.2s, box-shadow 0.3s; position: relative; z-index: 2; }
        .c-final-cta a:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(124,92,252,0.35); }
        .c-footer { padding: 40px 24px; text-align: center; background: var(--plum); border-top: 1px solid rgba(124,92,252,0.15); }
        .c-footer p { font-size: 13px; color: rgba(253,251,255,0.3); }
        .c-footer a { color: rgba(253,251,255,0.5); text-decoration: none; }
        .c-footer a:hover { color: var(--lavender-glow); }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 768px) { .c-nav { padding: 14px 20px; } .c-nav-links { gap: 16px; } .c-nav-links a { font-size: 13px; } .c-hero { padding: 100px 20px 60px; min-height: auto; } .c-metrics { grid-template-columns: repeat(2, 1fr); gap: 24px; } .c-steps { grid-template-columns: 1fr; gap: 40px; } .c-steps::before { display: none; } .c-section, .c-section-dark, .c-section-tint { padding: 72px 20px; } .c-services { grid-template-columns: 1fr; } }
        @media (max-width: 480px) { .c-nav-links a:not(.c-nav-cta) { display: none; } .c-hero h1 { font-size: 28px; } }
      `}} />

      {/* Nav */}
      <nav className="c-nav" style={{ background: `rgba(26,18,53,${navOpacity})`, backdropFilter: navOpacity > 0.1 ? 'blur(12px)' : 'none' }}>
        <Logo />
        <div className="c-nav-links">
          <a href="/">Home</a>
          <a href="#services">Services</a>
          <a href="#proof">Background</a>
          <a href="#process">Process</a>
          <a href="https://calendly.com/enableos-hq/30min" className="c-nav-cta" target="_blank" rel="noopener noreferrer">Book a call</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="c-hero">
        <div className="c-hero-aurora" />
        <div className="c-hero-content">
          <div className="c-hero-eyebrow">Consulting + Platform</div>
          <h1>Fractional sales enablement for startups that are <em>done guessing.</em></h1>
          <p className="c-hero-sub">Onboarding, playbooks, coaching systems, and the workspace to run it all — built by someone who&apos;s sat in both the SDR seat and the enablement seat.</p>
          <a href="https://calendly.com/enableos-hq/30min" className="c-hero-cta" target="_blank" rel="noopener noreferrer">Book a free discovery call →</a>
        </div>
      </section>

      {/* Services */}
      <section className="c-section" id="services">
        <div className="c-section-header">
          <h2>What gets <em>built</em></h2>
          <p>Every engagement starts with a conversation and ends with a system the team actually uses.</p>
        </div>
        <div className="c-services">
          {SERVICES.map((s, i) => (
            <div key={i} className="c-service-card">
              <span className="c-service-emoji">{s.emoji}</span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Proof */}
      <section className="c-section-dark" id="proof">
        <div className="c-section-header">
          <h2 style={{ color: 'var(--cream)' }}>Built on <em>real floors,</em> not theory</h2>
        </div>
        <div className="c-proof">
          <p className="c-proof-story">
            The enablement function at SpotDraft was <strong>built from scratch</strong> — starting
            from a 191% quota SDR seat, then designing the systems that got the next
            20+ hires productive faster. Onboarding ramp was <strong>cut from 3 months to 1.5 months.</strong> MQL-to-SQL
            conversion grew <strong>5% quarter over quarter.</strong> Meeting no-shows dropped <strong>10% QoQ.</strong>
          </p>
          <div className="c-metrics">
            {METRICS.map((m, i) => (
              <div key={i} className="c-metric">
                <div className="c-metric-value">{m.value}</div>
                <div className="c-metric-label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="c-section-tint" id="testimonials">
        <div className="c-section-header">
          <h2>What people <em>say</em></h2>
        </div>
        {TESTIMONIALS.length > 0 ? (
          <div className="c-testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="c-testimonial-card">
                <p className="c-testimonial-quote">&quot;{t.quote}&quot;</p>
                <p className="c-testimonial-name">{t.name}</p>
                <p className="c-testimonial-role">{t.role}, {t.company}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="c-testimonials-empty">
            <p>Collecting stories</p>
            <p>First engagements are underway. Real testimonials will appear here soon.</p>
          </div>
        )}
      </section>

      {/* Process */}
      <section className="c-section" id="process">
        <div className="c-section-header">
          <h2>Three steps. <em>No blank pages.</em></h2>
          <p>Every engagement follows the same shape — but the details are entirely yours.</p>
        </div>
        <div className="c-steps">
          {STEPS.map((s, i) => (
            <div key={i} className="c-step">
              <div className="c-step-dot">{s.number}</div>
              <div className="c-step-label">{s.label}</div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="c-final-cta">
        <div className="c-final-cta-aurora" />
        <h2>Ready to stop <em>improvising?</em></h2>
        <p>30-minute call. Free. No commitment. Just a conversation.</p>
        <a href="https://calendly.com/enableos-hq/30min" target="_blank" rel="noopener noreferrer">Book a discovery call →</a>
      </section>

      {/* Footer */}
      <footer className="c-footer">
        <p>© 2026 <a href="/">EnableOS</a>. Built in Bangalore.{' · '}<a href="mailto:enableos.hq@gmail.com">enableos.hq@gmail.com</a>{' · '}<a href="https://www.linkedin.com/in/vedikaagarwal00/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
      </footer>
    </>
  );
}
