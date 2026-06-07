'use client';
import { useEffect, useState } from 'react';

function Logo() {
  return (
    <a href="/" className="v6-logo" aria-label="EnableOS">
      <svg viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg" className="v6-logo-svg">
        <defs>
          <linearGradient id="logoG1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#BDA9FF"/><stop offset="100%" stopColor="#9B7EFF"/></linearGradient>
          <linearGradient id="logoG2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#9B7EFF"/><stop offset="100%" stopColor="#7C5CFC"/></linearGradient>
          <linearGradient id="logoG3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#7C5CFC"/><stop offset="100%" stopColor="#5B3EDB"/></linearGradient>
        </defs>
        <rect x="20" y="20" width="52" height="9" rx="2.5" fill="url(#logoG1)" opacity="0.55"/>
        <rect x="26" y="35" width="52" height="12" rx="2.5" fill="url(#logoG2)" opacity="0.8"/>
        <rect x="32" y="53" width="52" height="16" rx="2.5" fill="url(#logoG3)"/>
        <line x1="26" y1="35" x2="20" y2="29" stroke="#BDA9FF" strokeWidth="0.8" opacity="0.45"/>
        <line x1="32" y1="53" x2="26" y2="47" stroke="#9B7EFF" strokeWidth="0.8" opacity="0.5"/>
        <line x1="78" y1="35" x2="72" y2="29" stroke="#BDA9FF" strokeWidth="0.8" opacity="0.45"/>
        <line x1="84" y1="53" x2="78" y2="47" stroke="#9B7EFF" strokeWidth="0.8" opacity="0.5"/>
        <circle cx="79" cy="61" r="3" fill="#ffffff" opacity="0.9"/>
        <circle cx="70" cy="61" r="3" fill="#BDA9FF" opacity="0.7"/>
        <text x="102" y="68" fontFamily="'Libre Baskerville', Georgia, serif" fontSize="38" fontWeight="400" fill="currentColor" letterSpacing="-0.02em">Enable<tspan fontWeight="700" className="v6-logo-os">OS</tspan></text>
      </svg>
    </a>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: 'How long until the workspace is ready?', a: 'Most workspaces are built and delivered in 4-6 weeks. Discovery in week 0, build in weeks 1-4, launch call in week 4-5.' },
    { q: 'Can reps log in too?', a: 'Yes. Every workspace supports multiple users. Reps see shared content, sessions, and collaterals. Coaching notes stay private.' },
    { q: 'What if there\'s already some content and tools?', a: 'Even better — existing playbooks, Gong recordings, and onboarding materials get audited, restructured, and migrated in.' },
    { q: 'What happens after 3 months?', a: 'Three options: continue with monthly check-ins, switch to quarterly reviews, or run independently. The platform and all data stay yours.' },
    { q: 'Is this only for SDR teams?', a: 'No. It works for SDRs, AEs, full-cycle reps, and CS teams. The workspace gets configured for the specific sales motion.' },
    { q: 'How is this different from Notion or a spreadsheet?', a: 'Neither auto-prioritizes requests, tracks onboarding per rep, analyzes coaching notes with AI, or gives a live enablement dashboard. And the real difference: this workspace arrives pre-built, not blank.' },
  ];
  return (
    <div className="v6-faq-list">
      {faqs.map((f, i) => (
        <div key={i} className="v6-faq-item" onClick={() => setOpen(open === i ? null : i)}>
          <div className="v6-faq-q"><span>{f.q}</span><span className="v6-faq-toggle">{open === i ? '−' : '+'}</span></div>
          {open === i && <p className="v6-faq-a">{f.a}</p>}
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  useEffect(() => {
    function handleScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      document.documentElement.style.setProperty('--p', Math.max(0, Math.min(1, window.scrollY / max)).toFixed(3));
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => { window.removeEventListener('scroll', handleScroll); document.documentElement.style.removeProperty('--p'); };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="v6-wrap">
        <div className="v6-bg" aria-hidden="true">
          <div className="v6-aurora" /><div className="v6-dots" /><div className="v6-orb v6-orb-1" /><div className="v6-orb v6-orb-2" />
        </div>
        <div className="v6-scroll-hint">Scroll ↓</div>

        <div className="v6-content">
          <nav className="v6-nav">
            <Logo />
            <div className="v6-navlinks">
              <a href="#how-it-works">How it works</a>
              <a href="#who-its-for">Who it&apos;s for</a>
              <a href="#faq">FAQ</a>
              <a href="/login">Log in</a>
              <a href="https://calendly.com/enableos-hq/30min" target="_blank" rel="noreferrer" className="v6-cta-nav">Book a call</a>
            </div>
          </nav>

          {/* HERO */}
          <section className="v6-section v6-hero">
            <div>
              <span className="v6-eyebrow">Sales enablement, done for you</span>
              <h1 className="v6-h1">Your reps ramp faster when someone <em>builds the system for you.</em></h1>
              <p className="v6-sub">Your sales process gets audited. Onboarding, coaching, and content systems get designed. Then a workspace arrives — configured, loaded, and ready to track.</p>
              <div className="v6-btns">
                <a href="https://calendly.com/enableos-hq/30min" target="_blank" rel="noreferrer" className="v6-btn-p">Book a free discovery call →</a>
                <a href="#how-it-works" className="v6-btn-s">See how it works</a>
              </div>
              <div className="v6-hero-proof">
                <span>Built on 4 years of enablement</span><span className="v6-dot">·</span>
                <span>50% faster ramp</span><span className="v6-dot">·</span>
                <span>20+ reps onboarded</span>
              </div>
            </div>
            <div className="v6-dash-wrap">
              <div className="v6-dash-glow" />
              <div className="v6-dash">
                <div className="v6-dh"><span>Your workspace · Live</span><span className="v6-dh-live"><span className="v6-dh-live-dot" />Ready</span></div>
                <div className="v6-intake"><div className="v6-int-top"><div><div className="v6-int-title">Build battle card for Competitor X</div><div className="v6-int-meta">Auto-prioritized · High</div></div><span className="v6-pri">⬆ High</span></div></div>
                <div className="v6-note"><div className="v6-note-rep">Rahul · 1:1 coaching note</div><div className="v6-note-txt">&quot;Pipeline feels slow this week...&quot;</div><span className="v6-ai">⚠ Confidence dropping — coach this week</span></div>
                <div className="v6-ramp"><div className="v6-ramp-top"><span>Aisha · Onboarding</span><span className="v6-ramp-p">63%</span></div><div className="v6-bar"><div className="v6-fill" /></div></div>
              </div>
            </div>
          </section>

          {/* BEFORE / AFTER */}
          <section className="v6-section">
            <div className="v6-hl">
              <div className="v6-ba">
                <div className="v6-ba-col">
                  <span className="v6-ba-label v6-ba-red">Without a system</span>
                  <div className="v6-ba-item">📋 Onboarding in a Google Doc nobody updates</div>
                  <div className="v6-ba-item">📝 Coaching notes scattered across 3 tools</div>
                  <div className="v6-ba-item">📊 No way to prove ramp time improved</div>
                  <div className="v6-ba-item">💬 Requests via Slack, email, hallway</div>
                  <div className="v6-ba-item">😓 Leadership asks for ROI. Awkward silence.</div>
                </div>
                <div className="v6-ba-arrow">→</div>
                <div className="v6-ba-col">
                  <span className="v6-ba-label v6-ba-green">With EnableOS</span>
                  <div className="v6-ba-item">✅ Onboarding tracked per rep with progress bars</div>
                  <div className="v6-ba-item">✅ AI-analyzed coaching notes flag who needs help</div>
                  <div className="v6-ba-item">✅ Dashboard shows exactly how fast reps ramp</div>
                  <div className="v6-ba-item">✅ One intake queue, auto-prioritized</div>
                  <div className="v6-ba-item">✅ Real data for every leadership conversation</div>
                </div>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="v6-section" id="how-it-works">
            <div className="v6-hl">
              <span className="v6-eyebrow">How it works</span>
              <h2 className="v6-h2">Four steps. <em>Zero blank pages.</em></h2>
              <div className="v6-steps">
                {[
                  { icon: '📞', title: 'Discovery call', desc: '30 minutes. Your sales process, team, and gaps get mapped.', time: 'Week 0' },
                  { icon: '🔍', title: 'Audit & design', desc: 'Gaps found. Onboarding, coaching, and content systems designed for your motion.', time: 'Weeks 1-2' },
                  { icon: '🛠', title: 'Workspace built', desc: 'EnableOS workspace loaded with everything — configured, not empty.', time: 'Weeks 2-4' },
                  { icon: '🚀', title: 'Log in. It\'s ready.', desc: 'Launch call, full walkthrough, ongoing check-ins as the team grows.', time: 'Week 4+' },
                ].map((s, i) => (
                  <div key={i} className="v6-step">
                    <div className="v6-step-icon">{s.icon}</div>
                    <div className="v6-step-time">{s.time}</div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WHO ITS FOR */}
          <section className="v6-section" id="who-its-for">
            <div className="v6-hl">
              <span className="v6-eyebrow">Which one sounds like you?</span>
              <h2 className="v6-h2">Three starting points. <em>One system.</em></h2>
              <div className="v6-models">
                {[
                  { tag: 'Ground Zero', color: 1, h: 'Just hired first reps. No playbooks, no process.', desc: 'The sales process lives in someone\'s head. Onboarding is "shadow someone for a week."', what: 'Tribal knowledge gets extracted, a full system gets designed, and a ready-to-use workspace gets delivered.' },
                  { tag: 'Scattered but Scaling', color: 2, h: 'Team and data exist — nobody\'s connecting the dots.', desc: 'Gong recordings nobody watches. A 40-page playbook nobody reads. Two weeks of shadowing.', what: 'Existing content gets audited, restructured, and migrated into one workspace that connects everything.' },
                  { tag: 'Stretched Too Thin', color: 3, h: 'Enablement person doing great work — buried across 10 tools.', desc: 'The work is happening. It\'s just invisible. No way to track it or prove impact.', what: 'Workflows get mapped with the enablement person, then migrated into one workspace. Visible. Trackable. Provable.' },
                ].map((m, i) => (
                  <div key={i} className="v6-model">
                    <div className={`v6-model-tag v6-model-tag-${m.color}`}>{m.tag}</div>
                    <h3>{m.h}</h3>
                    <p className="v6-model-desc">{m.desc}</p>
                    <p className="v6-model-what">{m.what}</p>
                    <a href="https://calendly.com/enableos-hq/30min" target="_blank" rel="noreferrer" className="v6-model-cta">Book a call →</a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PLATFORM PREVIEW */}
          <section className="v6-section" id="platform">
            <div className="v6-hl">
              <span className="v6-eyebrow">What&apos;s inside</span>
              <h2 className="v6-h2">Not empty. <em>Never empty.</em></h2>
              <div className="v6-preview-wrap">
                <div className="v6-preview-glow" />
                <div className="v6-preview">
                  <div className="v6-prev-sidebar">
                    <div className="v6-prev-logo"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="14" height="3" rx="1.5" fill="#BDA9FF" opacity="0.5"/><rect x="4" y="9" width="14" height="4" rx="1.5" fill="#9B7EFF" opacity="0.75"/><rect x="6" y="15" width="14" height="5" rx="1.5" fill="#7C5CFC"/></svg><span>EnableOS</span></div>
                    {['Dashboard','Intake','Ramp','1:1 Notes','Collaterals','Pulse Checks','Sessions'].map((item, i) => (<div key={item} className={`v6-prev-nav-item ${i===0?'active':''}`}>{item}</div>))}
                  </div>
                  <div className="v6-prev-main">
                    <div className="v6-prev-header"><span className="v6-prev-title">Dashboard</span><span className="v6-prev-badge">Live</span></div>
                    <div className="v6-prev-cards">
                      {[{l:'Reps ramping',v:'4'},{l:'Open requests',v:'7'},{l:'Sessions this week',v:'2'}].map((c,i) => (<div key={i} className={`v6-prev-card v6-prev-anim-${i+1}`}><div className="v6-pc-label">{c.l}</div><div className="v6-pc-num">{c.v}</div></div>))}
                    </div>
                    <div className="v6-prev-row">
                      <div className="v6-prev-intake-card v6-prev-anim-4"><span className="v6-pic-title">Latest intake</span><div className="v6-pic-item">Competitive battle card</div><div className="v6-pic-item">Cold call script update</div><div className="v6-pic-item">New hire onboarding deck</div></div>
                      <div className="v6-prev-ramp-card v6-prev-anim-5"><span className="v6-pic-title">Ramp tracker</span>{[{n:'Aisha · Wk 4',w:'63%'},{n:'Dev · Wk 2',w:'35%'},{n:'Priya · Wk 6',w:'88%'}].map((r,i) => (<div key={i} className="v6-prc-rep"><span>{r.n}</span><div className="v6-prc-bar"><div className="v6-prc-fill" style={{width:r.w}} /></div></div>))}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PRICING */}
          <section className="v6-section" id="pricing">
            <div className="v6-hl">
              <span className="v6-eyebrow">Investment</span>
              <h2 className="v6-h2">Less than 2 months of <em>a full-time hire.</em></h2>
              <div className="v6-pricing-grid">
                {[
                  { label: 'Setup', range: '₹50K – ₹1.5L', desc: 'Discovery, audit, design, and workspace build. One-time.' },
                  { label: 'Monthly', range: '₹20K – ₹40K', desc: 'Weekly check-ins, workspace updates, ongoing support. 3-month minimum.' },
                  { label: 'Compare', range: '₹15–20L/yr', desc: 'What a full-time enablement hire costs — if you can find one.' },
                ].map((p, i) => (
                  <div key={i} className="v6-pricing-card"><div className="v6-pricing-label">{p.label}</div><div className="v6-pricing-range">{p.range}</div><p>{p.desc}</p></div>
                ))}
              </div>
              <p className="v6-pricing-note">Exact pricing depends on team size and starting point. The discovery call is free.</p>
              <div style={{textAlign:'center',marginTop:12}}><a href="https://calendly.com/enableos-hq/30min" target="_blank" rel="noreferrer" className="v6-btn-p">Book a free discovery call →</a></div>
            </div>
          </section>

          {/* FOUNDER */}
          <section className="v6-section" id="founder">
            <div className="v6-hl">
              <div className="v6-founder">
                <div className="v6-founder-img-wrap"><img src="/founder.jpg" alt="Vedika Agarwal" className="v6-founder-img" /></div>
                <div className="v6-founder-text">
                  <span className="v6-eyebrow">Who builds your workspace</span>
                  <h2 className="v6-h2" style={{fontSize:'34px'}}>Hi, I&apos;m Vedika.</h2>
                  <p className="v6-founder-bio">4 years at SpotDraft — started as an SDR (191% of quota), then built the entire enablement function from scratch. Onboarding programs that cut ramp time by 50%, turned more inbound leads into real sales conversations, and coached 20+ reps across regions.</p>
                  <p className="v6-founder-bio">EnableOS exists because every enablement person deserves better than 6 tools and no proof it matters.</p>
                  <div className="v6-founder-links">
                    <a href="https://www.linkedin.com/in/vedikaagarwal00/" target="_blank" rel="noreferrer" className="v6-founder-link"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>LinkedIn</a>
                    <a href="mailto:enableos.hq@gmail.com" className="v6-founder-link"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>enableos.hq@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="v6-section" id="faq">
            <div className="v6-hl">
              <span className="v6-eyebrow">Common questions</span>
              <h2 className="v6-h2">Before you book.</h2>
              <FAQ />
            </div>
          </section>

          {/* FINAL CTA */}
          <section className="v6-section">
            <div className="v6-hl">
              <div className="v6-cta-content">
                <h2 className="v6-cta-h2">Your reps shouldn&apos;t have to <em>figure it out alone.</em></h2>
                <p className="v6-cta-sub">30-minute discovery call. Free. No commitment.</p>
                <a href="https://calendly.com/enableos-hq/30min" target="_blank" rel="noreferrer" className="v6-cta-big">Book a free discovery call →</a>
              </div>
            </div>
          </section>
        </div>

        <footer className="v6-footer">
          <div className="v6-footer-inner">
            <div className="v6-footer-top">
              <div className="v6-footer-brand"><Logo /><p className="v6-footer-tag">Enablement consulting + a platform to run it.</p></div>
              <div className="v6-footer-cols">
                <div className="v6-footer-col"><h4>Product</h4><a href="#how-it-works">How it works</a><a href="#who-its-for">Who it&apos;s for</a><a href="#faq">FAQ</a><a href="/roadmap">Roadmap</a></div>
                <div className="v6-footer-col"><h4>Get started</h4><a href="https://calendly.com/enableos-hq/30min" target="_blank" rel="noreferrer">Book a call</a><a href="/login">Log in</a></div>
                <div className="v6-footer-col"><h4>Connect</h4><a href="mailto:enableos.hq@gmail.com">enableos.hq@gmail.com</a><a href="https://www.linkedin.com/in/vedikaagarwal00/" target="_blank" rel="noreferrer">LinkedIn</a></div>
              </div>
            </div>
            <div className="v6-footer-bottom"><span>© 2026 EnableOS. Built in Bangalore.</span></div>
          </div>
        </footer>
      </div>
    </>
  );
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Sora:wght@300;400;500;600;700&display=swap');
:root{--p:0}html{scroll-behavior:smooth}
body{margin:0;font-family:'Sora',sans-serif;background:#1a1235;color:#F5F0FF;overflow-x:hidden;-webkit-font-smoothing:antialiased}
*{box-sizing:border-box}a{text-decoration:none;color:inherit;cursor:pointer}

.v6-wrap{--bg-page:color-mix(in oklab,#1a1235,#FDFBFF calc(var(--p)*100%));--block:#1a1235;--cream:#F5F0FF;--cream-muted:#A8A0C0;--cream-faint:#6B6385;--accent:#8B7AE8;--accent-soft:rgba(139,122,232,0.1);--border-light:rgba(245,240,255,0.08);background:var(--bg-page);color:var(--cream);min-height:100vh;position:relative;isolation:isolate}

.v6-bg{position:fixed;top:0;left:0;right:0;pointer-events:none;z-index:0;overflow:hidden;opacity:calc(0.5 - var(--p)*0.45);height:100vh}
.v6-aurora{position:absolute;top:0;left:-10%;right:-10%;height:800px;background:radial-gradient(ellipse at 30% 30%,rgba(139,122,232,0.15),transparent 55%),radial-gradient(ellipse at 70% 15%,rgba(200,120,180,0.06),transparent 60%);filter:blur(50px);animation:aurora 22s ease-in-out infinite}
@keyframes aurora{0%,100%{transform:translate(0,0) scale(1);opacity:.6}50%{transform:translate(30px,20px) scale(1.05);opacity:.8}}
.v6-orb{position:absolute;border-radius:50%;filter:blur(80px)}
.v6-orb-1{width:350px;height:350px;background:radial-gradient(circle,rgba(139,122,232,0.15),transparent 70%);top:-80px;right:-80px;animation:od1 24s ease-in-out infinite}
.v6-orb-2{width:280px;height:280px;background:radial-gradient(circle,rgba(76,50,180,0.18),transparent 70%);top:60vh;left:-100px;animation:od2 28s ease-in-out infinite}
@keyframes od1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-40px,50px) scale(1.08)}}
@keyframes od2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(50px,-30px) scale(1.05)}}
.v6-dots{position:absolute;inset:0;background-image:radial-gradient(rgba(139,122,232,0.1) 0.6px,transparent 0.6px);background-size:32px 32px;opacity:.25}

.v6-content{position:relative;z-index:1;padding:0 48px 48px;max-width:1280px;margin:0 auto}
.v6-nav{display:flex;justify-content:space-between;align-items:center;padding:14px 48px;border-bottom:1px solid var(--border-light);margin:0 -48px 64px;position:sticky;top:0;z-index:10;backdrop-filter:blur(12px);background:color-mix(in oklab,rgba(26,18,53,0.8),rgba(253,251,255,0.8) calc(var(--p)*100%))}
.v6-logo{display:inline-flex;align-items:center;height:44px;color:color-mix(in oklab,#ffffff,#1a1235 calc(var(--p)*100%));--logo-os:color-mix(in oklab,#BDA9FF,#7C5CFC calc(var(--p)*100%))}
.v6-logo-svg{height:100%;width:auto;display:block;overflow:visible}.v6-logo-os{fill:var(--logo-os)}
.v6-navlinks{display:flex;gap:26px;align-items:center;font-size:13px;color:color-mix(in oklab,var(--cream-muted),#4a4162 calc(var(--p)*100%))}
.v6-cta-nav{background:color-mix(in oklab,var(--cream),#1a1235 calc(var(--p)*100%));color:color-mix(in oklab,#1a1235,var(--cream) calc(var(--p)*100%));padding:9px 18px;border-radius:8px;font-size:13px;font-weight:600}

.v6-section{padding-bottom:68px;scroll-margin-top:90px}
.v6-hl{position:relative;padding:44px 40px;border-radius:20px;z-index:1;isolation:isolate}
.v6-hl::before{content:'';position:absolute;inset:0;background:var(--block);opacity:var(--p);border-radius:inherit;z-index:-1;box-shadow:0 24px 48px -16px rgba(0,0,0,calc(var(--p)*0.25))}

.v6-hero{display:grid;grid-template-columns:1fr 1.05fr;gap:52px;align-items:center;min-height:70vh;padding-top:12px}
.v6-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:var(--cream-muted);margin-bottom:20px}
.v6-eyebrow::before{content:'';width:24px;height:1px;background:var(--accent)}
.v6-h1{font-family:'Libre Baskerville',serif;font-size:50px;line-height:1.1;margin:0 0 20px;font-weight:400;color:var(--cream);letter-spacing:-1px}
.v6-h1 em,.v6-h2 em,.v6-cta-h2 em{font-style:italic;color:#FFFAF0}
.v6-sub{font-size:15px;color:var(--cream-muted);margin-bottom:28px;line-height:1.7;max-width:460px;font-weight:300}
.v6-btns{display:flex;gap:14px;align-items:center;margin-bottom:16px}
.v6-btn-p{background:#F5F0FF;color:#1a1235;padding:15px 26px;border-radius:10px;font-size:14px;font-weight:600;transition:transform .2s;display:inline-block}
.v6-btn-p:hover{transform:translateY(-2px)}
.v6-btn-s{color:#F5F0FF;padding:15px 8px;font-size:14px;font-weight:500;border-bottom:1px solid rgba(245,240,255,0.3)}
.v6-hero-proof{display:flex;gap:6px;font-size:12px;color:var(--cream-faint);font-weight:300;flex-wrap:wrap}
.v6-dot{color:var(--accent)}

.v6-dash-wrap{position:relative}.v6-dash-glow{position:absolute;inset:-30px;background:radial-gradient(ellipse at center,rgba(139,122,232,0.2),transparent 65%);filter:blur(40px);animation:breathe 6s ease-in-out infinite;z-index:0}
@keyframes breathe{0%,100%{opacity:.35;transform:scale(.96)}50%{opacity:.7;transform:scale(1.04)}}
.v6-dash{position:relative;background:#FDFBFF;color:#1a1235;border-radius:16px;padding:18px;box-shadow:0 32px 80px -20px rgba(0,0,0,0.4);z-index:1}
.v6-dh{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid #F0ECFF;font-size:13px;font-weight:600}
.v6-dh-live{display:inline-flex;align-items:center;gap:5px;font-size:11px;color:#6BCB77}
.v6-dh-live-dot{width:7px;height:7px;border-radius:50%;background:#6BCB77;animation:lp 1.5s ease-in-out infinite}
@keyframes lp{0%,100%{box-shadow:0 0 0 0 rgba(107,203,119,0.6)}50%{box-shadow:0 0 0 5px rgba(107,203,119,0)}}
.v6-intake{background:#FDFBFF;border:1px solid #E2DCF0;border-radius:10px;padding:12px;margin-bottom:8px;position:relative}
.v6-intake::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--accent);border-radius:10px 0 0 10px}
.v6-int-top{display:flex;justify-content:space-between;align-items:flex-start}
.v6-int-title{font-size:13px;font-weight:600;color:#1a1235}.v6-int-meta{font-size:11px;color:#8b82a0;margin-top:2px}
.v6-pri{background:#1a1235;color:#F5F0FF;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:700}
.v6-note{background:#FDFBFF;border:1px solid #E2DCF0;border-radius:10px;padding:12px;margin-bottom:8px}
.v6-note-rep{font-size:12px;font-weight:600;color:#1a1235;margin-bottom:4px}
.v6-note-txt{font-size:11px;color:#4a4162;font-style:italic;margin-bottom:6px;line-height:1.5}
.v6-ai{display:inline-flex;gap:4px;padding:4px 10px;border-radius:12px;font-size:10px;font-weight:600;background:linear-gradient(135deg,#FFF4E5,#FFE8D6);color:#B85C00}
.v6-ramp{background:#FDFBFF;border:1px solid #E2DCF0;border-radius:10px;padding:12px}
.v6-ramp-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;font-size:12px;font-weight:600;color:#1a1235}
.v6-ramp-p{font-family:'Libre Baskerville',serif;font-size:14px;font-weight:700}
.v6-bar{background:#F0ECFF;height:6px;border-radius:3px;overflow:hidden}
.v6-fill{background:linear-gradient(90deg,#8B7AE8,#A99BF0);height:100%;width:63%;border-radius:3px}

.v6-h2{font-family:'Libre Baskerville',serif;font-size:42px;line-height:1.1;font-weight:400;color:var(--cream);letter-spacing:-.8px;max-width:680px;margin:0 0 28px}

.v6-ba{display:grid;grid-template-columns:1fr auto 1fr;gap:24px;align-items:stretch}
.v6-ba-col{display:flex;flex-direction:column;gap:8px}
.v6-ba-label{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:5px 14px;border-radius:100px;margin-bottom:4px;width:fit-content}
.v6-ba-red{background:rgba(220,38,38,0.12);color:#fca5a5}.v6-ba-green{background:rgba(107,203,119,0.12);color:#8FDD96}
.v6-ba-item{font-size:14px;color:var(--cream-muted);line-height:1.5;font-weight:300;padding:7px 0;border-bottom:1px solid var(--border-light)}
.v6-ba-arrow{font-size:28px;color:var(--accent);display:flex;align-items:center;opacity:.3}

.v6-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:20px}
.v6-step{padding:20px;background:var(--accent-soft);border:1px solid var(--border-light);border-radius:14px}
.v6-step-icon{font-size:28px;margin-bottom:10px}
.v6-step-time{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--accent);margin-bottom:10px}
.v6-step h3{font-family:'Libre Baskerville',serif;font-size:17px;font-weight:700;margin:0 0 8px;color:var(--cream)}
.v6-step p{font-size:13px;color:var(--cream-muted);line-height:1.6;margin:0;font-weight:300}

.v6-models{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:20px}
.v6-model{background:var(--block);border:1px solid var(--border-light);border-radius:16px;padding:26px 22px;display:flex;flex-direction:column}
.v6-model-tag{display:inline-block;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;font-weight:700;padding:5px 12px;border-radius:100px;margin-bottom:14px;width:fit-content}
.v6-model-tag-1{background:rgba(255,140,66,0.12);color:#FFB87A}
.v6-model-tag-2{background:rgba(255,196,0,0.1);color:#FFD466}
.v6-model-tag-3{background:rgba(107,203,119,0.1);color:#8FDD96}
.v6-model h3{font-family:'Libre Baskerville',serif;font-size:17px;font-weight:400;line-height:1.35;margin:0 0 10px;color:var(--cream)}
.v6-model-desc{font-size:13px;color:var(--cream-faint);line-height:1.5;margin:0 0 12px;font-weight:300}
.v6-model-what{font-size:13px;color:var(--cream-muted);line-height:1.6;margin:0 0 14px;font-weight:300;border-top:1px solid var(--border-light);padding-top:10px;flex-grow:1}
.v6-model-cta{display:inline-block;color:var(--cream-muted);font-size:13px;font-weight:600;border-bottom:1px solid rgba(168,160,192,0.3);padding-bottom:2px}
.v6-model-cta:hover{color:var(--cream)}

.v6-preview-wrap{position:relative;margin-top:8px}.v6-preview-glow{position:absolute;inset:-40px;background:radial-gradient(ellipse at center,rgba(139,122,232,0.12),transparent 65%);filter:blur(50px);z-index:0}
.v6-preview{position:relative;z-index:1;background:#FDFBFF;border-radius:16px;display:grid;grid-template-columns:160px 1fr;overflow:hidden;box-shadow:0 32px 80px -20px rgba(0,0,0,0.4);min-height:320px}
.v6-prev-sidebar{background:#1a1235;padding:14px 10px;display:flex;flex-direction:column;gap:2px}
.v6-prev-logo{display:flex;align-items:center;gap:6px;color:#F5F0FF;font-size:11px;font-weight:700;font-family:'Libre Baskerville',serif;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,0.06)}
.v6-prev-nav-item{font-size:11px;color:rgba(255,255,255,0.35);padding:6px 8px;border-radius:5px}
.v6-prev-nav-item.active{background:rgba(139,122,232,0.18);color:#F5F0FF;font-weight:600}
.v6-prev-main{padding:18px 20px;color:#1a1235}
.v6-prev-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
.v6-prev-title{font-family:'Libre Baskerville',serif;font-size:15px;font-weight:700}
.v6-prev-badge{font-size:10px;color:#6BCB77;font-weight:600;background:rgba(107,203,119,0.12);padding:3px 8px;border-radius:100px}
.v6-prev-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px}
.v6-prev-card{background:#F8F5FF;border:1px solid #E2DCF0;border-radius:9px;padding:12px}
.v6-pc-label{font-size:9px;color:#8b82a0;text-transform:uppercase;letter-spacing:.8px;font-weight:600;margin-bottom:3px}
.v6-pc-num{font-family:'Libre Baskerville',serif;font-size:26px;font-weight:700;color:#1a1235}
.v6-prev-row{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.v6-prev-intake-card,.v6-prev-ramp-card{background:#F8F5FF;border:1px solid #E2DCF0;border-radius:9px;padding:12px}
.v6-pic-title{font-size:11px;font-weight:700;color:#1a1235;display:block;margin-bottom:6px}
.v6-pic-item{font-size:10px;color:#4a4162;padding:5px 0;border-top:1px solid #F0ECFF}
.v6-prc-rep{margin-top:8px}
.v6-prc-rep span{font-size:10px;color:#4a4162;font-weight:500;display:block;margin-bottom:3px}
.v6-prc-bar{background:#F0ECFF;height:5px;border-radius:3px;overflow:hidden}
.v6-prc-fill{background:linear-gradient(90deg,#8B7AE8,#A99BF0);height:100%;border-radius:3px}
.v6-prev-anim-1{animation:cfi .8s ease both .2s}.v6-prev-anim-2{animation:cfi .8s ease both .4s}.v6-prev-anim-3{animation:cfi .8s ease both .6s}.v6-prev-anim-4{animation:cfi .8s ease both .8s}.v6-prev-anim-5{animation:cfi .8s ease both 1s}
@keyframes cfi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

.v6-pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:16px}
.v6-pricing-card{background:var(--block);border:1px solid var(--border-light);border-radius:14px;padding:22px}
.v6-pricing-label{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--cream-faint);margin-bottom:8px}
.v6-pricing-range{font-family:'Libre Baskerville',serif;font-size:26px;font-weight:700;color:var(--cream);margin-bottom:6px;letter-spacing:-.5px}
.v6-pricing-card p{font-size:13px;color:var(--cream-muted);line-height:1.55;margin:0;font-weight:300}
.v6-pricing-note{font-size:13px;color:var(--cream-faint);text-align:center}

.v6-founder{display:grid;grid-template-columns:auto 1fr;gap:36px;align-items:center}
.v6-founder-img-wrap{width:190px;height:190px;flex-shrink:0}
.v6-founder-img{width:190px;height:190px;border-radius:16px;object-fit:cover;box-shadow:0 16px 48px -12px rgba(0,0,0,0.3)}
.v6-founder-text .v6-eyebrow{margin-bottom:10px}.v6-founder-text .v6-h2{margin-bottom:12px}
.v6-founder-bio{font-size:14px;color:var(--cream-muted);line-height:1.65;margin:0 0 10px;font-weight:300;max-width:480px}
.v6-founder-links{display:flex;gap:14px;margin-top:16px}
.v6-founder-link{display:inline-flex;align-items:center;gap:6px;font-size:13px;color:var(--cream-muted);font-weight:500;border:1px solid var(--border-light);padding:8px 14px;border-radius:8px}
.v6-founder-link:hover{background:var(--accent-soft);color:var(--cream)}

.v6-faq-list{margin-top:4px}.v6-faq-item{border-bottom:1px solid var(--border-light);cursor:pointer}
.v6-faq-q{display:flex;justify-content:space-between;align-items:center;padding:16px 0;gap:14px}
.v6-faq-q span:first-child{font-size:15px;font-weight:500;color:var(--cream);line-height:1.4}
.v6-faq-toggle{width:22px;height:22px;border-radius:50%;background:var(--accent-soft);color:var(--cream-muted);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
.v6-faq-a{font-size:14px;color:var(--cream-muted);line-height:1.7;padding:0 0 16px;margin:0;font-weight:300;max-width:600px}

.v6-cta-content{text-align:center;padding:12px 0}
.v6-cta-h2{font-family:'Libre Baskerville',serif;font-size:42px;line-height:1.1;font-weight:400;color:var(--cream);letter-spacing:-.8px;max-width:560px;margin:0 auto 16px}
.v6-cta-sub{font-size:15px;color:var(--cream-muted);margin-bottom:24px;max-width:400px;margin-left:auto;margin-right:auto;line-height:1.6;font-weight:300}
.v6-cta-big{display:inline-block;background:#F5F0FF;color:#1a1235;padding:16px 34px;border-radius:11px;font-size:15px;font-weight:600;transition:transform .2s;box-shadow:0 16px 40px -12px rgba(0,0,0,0.25)}
.v6-cta-big:hover{transform:translateY(-2px)}

.v6-scroll-hint{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(245,240,255,0.4);pointer-events:none;opacity:calc(1 - var(--p)*5);animation:hb 2s ease-in-out infinite;z-index:20}
@keyframes hb{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(4px)}}

.v6-footer{position:relative;z-index:1;padding:52px 48px 24px;border-top:1px solid var(--border-light);background:color-mix(in oklab,rgba(26,18,53,0.85),rgba(253,251,255,0.85) calc(var(--p)*100%));backdrop-filter:blur(12px)}
.v6-footer-inner{max-width:1280px;margin:0 auto}
.v6-footer-top{display:grid;grid-template-columns:1.4fr 2fr;gap:52px;padding-bottom:28px;border-bottom:1px solid var(--border-light)}
.v6-footer-brand .v6-logo{margin-bottom:12px}
.v6-footer-tag{font-size:14px;color:color-mix(in oklab,var(--cream-muted),#4a4162 calc(var(--p)*100%));line-height:1.6;max-width:280px;margin:0;font-weight:300}
.v6-footer-cols{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.v6-footer-col h4{font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:color-mix(in oklab,var(--cream-faint),#4a4162 calc(var(--p)*100%));font-weight:600;margin:0 0 12px}
.v6-footer-col a{display:block;font-size:14px;color:color-mix(in oklab,var(--cream-muted),#4a4162 calc(var(--p)*100%));padding:4px 0;font-weight:300}
.v6-footer-col a:hover{color:color-mix(in oklab,var(--cream),#1a1235 calc(var(--p)*100%))}
.v6-footer-bottom{padding-top:20px;text-align:center;font-size:12px;color:color-mix(in oklab,var(--cream-faint),#4a4162 calc(var(--p)*100%));font-weight:300}

@media(max-width:768px){
.v6-content{padding:0 22px 24px}.v6-nav{padding:12px 22px;margin:0 -22px 40px}
.v6-navlinks a:not(.v6-cta-nav){display:none}.v6-navlinks{gap:14px}.v6-logo{height:36px}
.v6-hero{grid-template-columns:1fr;gap:36px;min-height:auto;padding-top:8px}
.v6-h1{font-size:32px}.v6-h2{font-size:28px}.v6-sub{font-size:14px}
.v6-ba{grid-template-columns:1fr;gap:16px}.v6-ba-arrow{display:none}
.v6-steps{grid-template-columns:1fr 1fr;gap:12px}
.v6-models{grid-template-columns:1fr;gap:12px}
.v6-preview{grid-template-columns:1fr}.v6-prev-sidebar{display:none}
.v6-prev-cards{grid-template-columns:1fr}.v6-prev-row{grid-template-columns:1fr}
.v6-pricing-grid{grid-template-columns:1fr;gap:10px}
.v6-founder{grid-template-columns:1fr;text-align:center;gap:20px}
.v6-founder-img-wrap{margin:0 auto;width:140px;height:140px}.v6-founder-img{width:140px;height:140px}
.v6-founder-bio{max-width:100%}.v6-founder-links{justify-content:center}
.v6-hl{padding:28px 22px}.v6-cta-h2{font-size:28px}
.v6-footer{padding:40px 22px 20px}.v6-footer-top{grid-template-columns:1fr;gap:24px;padding-bottom:20px}
.v6-footer-cols{grid-template-columns:1fr 1fr;gap:16px}.v6-section{scroll-margin-top:72px}
}
`;
