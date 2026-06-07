'use client';

import { useEffect } from 'react';

function Logo() {
  return (
    <a href="/" className="v6-logo" aria-label="EnableOS — The Enablement Operating System">
      <svg viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg" className="v6-logo-svg">
        <defs>
          <linearGradient id="logoG1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#BDA9FF"/>
            <stop offset="100%" stopColor="#9B7EFF"/>
          </linearGradient>
          <linearGradient id="logoG2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9B7EFF"/>
            <stop offset="100%" stopColor="#7C5CFC"/>
          </linearGradient>
          <linearGradient id="logoG3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7C5CFC"/>
            <stop offset="100%" stopColor="#5B3EDB"/>
          </linearGradient>
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
        <text x="102" y="68" fontFamily="'Libre Baskerville', Georgia, serif" fontSize="38" fontWeight="400" fill="currentColor" letterSpacing="-0.02em">
          Enable<tspan fontWeight="700" className="v6-logo-os">OS</tspan>
        </text>
      </svg>
    </a>
  );
}

export default function Page() {
  useEffect(() => {
    function handleScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const progress = Math.max(0, Math.min(1, window.scrollY / max));
      document.documentElement.style.setProperty('--p', progress.toFixed(3));
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.removeProperty('--p');
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="v6-wrap">
        <div className="v6-bg" aria-hidden="true">
          <div className="v6-aurora" />
          <div className="v6-dots" />
          <div className="v6-orb v6-orb-1" />
          <div className="v6-orb v6-orb-2" />
          <div className="v6-orb v6-orb-3" />
          <div className="v6-frag v6-frag-pri-1">P 21</div>
          <div className="v6-frag v6-frag-pri-2">P 15</div>
          <div className="v6-frag v6-frag-pri-3">P 18</div>
          <div className="v6-frag v6-frag-ai-1">🎯 Coach this week</div>
          <div className="v6-frag v6-frag-dot v6-frag-dot-1" />
          <div className="v6-frag v6-frag-dot v6-frag-dot-2" />
          <div className="v6-frag v6-frag-dot v6-frag-dot-3" />
        </div>

        <div className="v6-scroll-hint">Scroll ↓ to feel it</div>

        <div className="v6-content">
          <nav className="v6-nav">
            <Logo />
            <div className="v6-navlinks">
              <a href="#how-it-works">How it works</a>
              <a href="#who-its-for">Who it&apos;s for</a>
              <a href="#platform">Platform</a>
              <a href="/login">Log in</a>
              <a href="https://calendly.com/enableos-hq/30min" target="_blank" rel="noreferrer" className="v6-cta-nav">Book a discovery call</a>
            </div>
          </nav>

          {/* ═══════ HERO ═══════ */}
          <section className="v6-section v6-hero">
            <div>
              <span className="v6-eyebrow">Enablement consulting + a platform to run it</span>
              <h1 className="v6-h1">Your enablement function, <em>built and loaded</em> before you log in.</h1>
              <p className="v6-sub">I audit your sales process, build your onboarding, coaching, and content systems — then hand you a workspace where everything&apos;s already set up and ready to track.</p>
              <div className="v6-btns">
                <a href="https://calendly.com/enableos-hq/30min" target="_blank" rel="noreferrer" className="v6-btn-p">Book a discovery call →</a>
                <a href="#how-it-works" className="v6-btn-s">See how it works</a>
              </div>
            </div>

            <div className="v6-dash-wrap">
              <div className="v6-dash-glow" />
              <div className="v6-dash">
                <div className="v6-dh">
                  <span>Acme Corp · Your enablement workspace</span>
                  <span className="v6-dh-live"><span className="v6-dh-live-dot" />Ready</span>
                </div>
                <div className="v6-intake">
                  <div className="v6-int-top">
                    <div>
                      <div className="v6-int-title">Build battle card for Competitor X</div>
                      <div className="v6-int-meta">Auto-scored · P 18 · High priority</div>
                    </div>
                    <span className="v6-pri">P 18</span>
                  </div>
                </div>
                <div className="v6-note">
                  <div className="v6-note-rep">Rahul · 1:1 note · Week 3</div>
                  <div className="v6-note-txt">&quot;Pipeline feels slow this week. Not sure if my outbound is even working...&quot;</div>
                  <span className="v6-ai">⚠ AI · Confidence dropping — coach this week</span>
                </div>
                <div className="v6-ramp">
                  <div className="v6-ramp-top">
                    <span>Aisha · Onboarding ramp</span>
                    <span className="v6-ramp-p">63%</span>
                  </div>
                  <div className="v6-bar"><div className="v6-fill" /></div>
                  <div className="v6-ramp-sub">Product training complete · Outbound certification next</div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════ PAIN ═══════ */}
          <section className="v6-section">
            <div className="v6-hl">
              <span className="v6-eyebrow">Sound familiar?</span>
              <h2 className="v6-h2">You&apos;re doing the work. <em>Nobody sees it.</em></h2>
              <ul className="v6-painlist">
                <li><span className="pn">01</span><span>You built onboarding from scratch, but there&apos;s no system to prove it cut ramp time.</span></li>
                <li><span className="pn">02</span><span>Intake lives in a Google Form. Coaching notes in Notion. Battle cards in a Drive folder nobody can find.</span></li>
                <li><span className="pn">03</span><span>Three sales leaders ask for the same thing in three different Slack threads.</span></li>
                <li><span className="pn">04</span><span>You know which rep is struggling, but you can&apos;t show leadership the data until the QBR — when it&apos;s already too late.</span></li>
                <li><span className="pn">05</span><span>Leadership asks for ROI. You open a spreadsheet. You both look away.</span></li>
              </ul>
            </div>
          </section>

          <div className="v6-transition">
            <span className="v6-transition-pill">What if your workspace came <em>pre-built?</em></span>
          </div>

          {/* ═══════ HOW IT WORKS ═══════ */}
          <section className="v6-section" id="how-it-works">
            <div className="v6-hl">
              <span className="v6-eyebrow">How it works</span>
              <h2 className="v6-h2">Four steps. <em>Zero blank pages.</em></h2>
              <div className="v6-steps">
                <div className="v6-step">
                  <div className="v6-step-num">01</div>
                  <div className="v6-step-line" />
                  <h3>Discovery call</h3>
                  <p>I learn your sales process, team structure, ICP, and where things fall apart. 30 minutes.</p>
                </div>
                <div className="v6-step">
                  <div className="v6-step-num">02</div>
                  <div className="v6-step-line" />
                  <h3>I audit &amp; design</h3>
                  <p>I map the gaps — onboarding holes, missing playbooks, coaching blindspots — and design your enablement system.</p>
                </div>
                <div className="v6-step">
                  <div className="v6-step-num">03</div>
                  <div className="v6-step-line" />
                  <h3>I build your workspace</h3>
                  <p>Your EnableOS workspace gets loaded with onboarding tracks, intake categories, coaching frameworks, and content — all configured to your process.</p>
                </div>
                <div className="v6-step">
                  <div className="v6-step-num">04</div>
                  <div className="v6-step-line" />
                  <h3>You log in. It&apos;s ready.</h3>
                  <p>No setup. No blank pages. I walk you through everything on a launch call, and check in as your team grows.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════ WHO IT'S FOR ═══════ */}
          <section className="v6-section" id="who-its-for">
            <div className="v6-hl">
              <span className="v6-eyebrow">Which one sounds like you?</span>
              <h2 className="v6-h2">Three starting points. <em>One system.</em></h2>
              <div className="v6-models">

                <div className="v6-model">
                  <div className="v6-model-tag v6-model-tag-1">Ground Zero</div>
                  <h3>You just hired your first reps. There&apos;s no enablement in place.</h3>
                  <p className="v6-model-desc">The sales process lives in the founder&apos;s head. Onboarding is &quot;shadow someone for a week.&quot; There&apos;s no playbook, no coaching, and no way to know if reps are ramping.</p>
                  <div className="v6-model-what">
                    <span className="v6-model-what-label">What I do</span>
                    <p>I extract the tribal knowledge from your team, design your enablement system from scratch, and hand you a workspace with onboarding tracks, intake, coaching frameworks, and content — all built for your sales motion.</p>
                  </div>
                  <a href="https://calendly.com/enableos-hq/30min" target="_blank" rel="noreferrer" className="v6-model-cta">Book a discovery call →</a>
                </div>

                <div className="v6-model">
                  <div className="v6-model-tag v6-model-tag-2">Scattered but Scaling</div>
                  <h3>You have a team, data, and tools — but nobody connecting the dots.</h3>
                  <p className="v6-model-desc">There are Gong recordings nobody watches, a 40-page playbook in Google Docs nobody reads, and onboarding that&apos;s &quot;two weeks of shadowing.&quot; The raw material exists. Nobody&apos;s turned it into a system.</p>
                  <div className="v6-model-what">
                    <span className="v6-model-what-label">What I do</span>
                    <p>I audit what you already have, find the gaps, restructure your content into something usable, and migrate it all into a workspace that connects onboarding, coaching, and content in one place.</p>
                  </div>
                  <a href="https://calendly.com/enableos-hq/30min" target="_blank" rel="noreferrer" className="v6-model-cta">Book a discovery call →</a>
                </div>

                <div className="v6-model">
                  <div className="v6-model-tag v6-model-tag-3">Stretched Too Thin</div>
                  <h3>You have an enablement person doing great work — but it&apos;s buried across 10 tools.</h3>
                  <p className="v6-model-desc">Someone&apos;s running enablement, but their work lives in Notion, Google Docs, Slack channels, and a spreadsheet that hasn&apos;t been updated in weeks. They can&apos;t prove impact because there&apos;s no system to track it.</p>
                  <div className="v6-model-what">
                    <span className="v6-model-what-label">What I do</span>
                    <p>I work with your enablement person to map their workflows, then migrate everything into a single workspace — making their work visible, trackable, and provable. They keep doing what they&apos;re great at, with the infrastructure to show it.</p>
                  </div>
                  <a href="https://calendly.com/enableos-hq/30min" target="_blank" rel="noreferrer" className="v6-model-cta">Book a discovery call →</a>
                </div>

              </div>
            </div>
          </section>

          {/* ═══════ PLATFORM PREVIEW ═══════ */}
          <section className="v6-section" id="platform">
            <div className="v6-hl">
              <span className="v6-eyebrow">What&apos;s inside your workspace</span>
              <h2 className="v6-h2">Not empty. <em>Never empty.</em></h2>
              <p className="v6-hl-sub">Every workspace comes loaded with your onboarding, coaching, content, and tracking — configured to your team&apos;s sales motion. Here&apos;s what that looks like.</p>

              <div className="v6-preview-wrap">
                <div className="v6-preview-glow" />
                <div className="v6-preview">
                  {/* Sidebar */}
                  <div className="v6-prev-sidebar">
                    <div className="v6-prev-logo">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <rect x="2" y="4" width="14" height="3" rx="1.5" fill="#BDA9FF" opacity="0.5"/>
                        <rect x="4" y="9" width="14" height="4" rx="1.5" fill="#9B7EFF" opacity="0.75"/>
                        <rect x="6" y="15" width="14" height="5" rx="1.5" fill="#7C5CFC"/>
                      </svg>
                      <span>EnableOS</span>
                    </div>
                    {['Dashboard', 'Intake', 'Ramp', '1:1 Notes', 'Collaterals', 'Pulse Checks', 'Sessions', 'Forecasting'].map((item, i) => (
                      <div key={item} className={`v6-prev-nav-item ${i === 0 ? 'active' : ''}`}>{item}</div>
                    ))}
                  </div>

                  {/* Content area — animated workspace showcase */}
                  <div className="v6-prev-main">
                    <div className="v6-prev-header">
                      <span className="v6-prev-title">Dashboard</span>
                      <span className="v6-prev-badge">Your workspace · Live</span>
                    </div>

                    <div className="v6-prev-cards">
                      <div className="v6-prev-card v6-prev-anim-1">
                        <div className="v6-pc-label">Reps ramping</div>
                        <div className="v6-pc-num">4</div>
                        <div className="v6-pc-sub">Avg. 68% complete</div>
                      </div>
                      <div className="v6-prev-card v6-prev-anim-2">
                        <div className="v6-pc-label">Open requests</div>
                        <div className="v6-pc-num">7</div>
                        <div className="v6-pc-sub">3 high priority</div>
                      </div>
                      <div className="v6-prev-card v6-prev-anim-3">
                        <div className="v6-pc-label">Sessions this week</div>
                        <div className="v6-pc-num">2</div>
                        <div className="v6-pc-sub">Objection handling · Demo prep</div>
                      </div>
                    </div>

                    <div className="v6-prev-row">
                      <div className="v6-prev-intake-card v6-prev-anim-4">
                        <div className="v6-pic-top">
                          <span className="v6-pic-title">Latest intake</span>
                          <span className="v6-pic-score">P 21</span>
                        </div>
                        <div className="v6-pic-item">Competitive battle card — Gong</div>
                        <div className="v6-pic-item">Update cold call script — Q3 messaging</div>
                        <div className="v6-pic-item">New hire onboarding deck — APAC</div>
                      </div>
                      <div className="v6-prev-ramp-card v6-prev-anim-5">
                        <span className="v6-pic-title">Ramp tracker</span>
                        <div className="v6-prc-rep">
                          <span>Aisha · Week 4</span>
                          <div className="v6-prc-bar"><div className="v6-prc-fill" style={{width:'63%'}} /></div>
                        </div>
                        <div className="v6-prc-rep">
                          <span>Dev · Week 2</span>
                          <div className="v6-prc-bar"><div className="v6-prc-fill" style={{width:'35%'}} /></div>
                        </div>
                        <div className="v6-prc-rep">
                          <span>Priya · Week 6</span>
                          <div className="v6-prc-bar"><div className="v6-prc-fill" style={{width:'88%'}} /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════ STATS ═══════ */}
          <section className="v6-section" id="stats">
            <div className="v6-hl">
              <span className="v6-eyebrow">The gap we close</span>
              <h2 className="v6-h2" style={{ fontSize: '34px', marginBottom: '24px' }}>Industry benchmarks. <em>And what&apos;s possible.</em></h2>
              <div className="v6-stats">
                <div className="v6-stat">
                  <div className="v6-stat-eyebrow">Ramp time</div>
                  <div className="v6-stat-num"><em>50%</em></div>
                  <div className="v6-stat-label">Cut onboarding time in half with structured ramp programs.</div>
                  <div className="v6-stat-src">Industry avg: 3 months · <em>Bridge Group SDR Metrics Report</em></div>
                </div>
                <div className="v6-stat">
                  <div className="v6-stat-eyebrow">Findability</div>
                  <div className="v6-stat-num"><em>73%</em></div>
                  <div className="v6-stat-label">Of B2B reps can&apos;t find content when they need it. EnableOS exists to close that gap.</div>
                  <div className="v6-stat-src">Sales content benchmark · <em>Highspot · State of Sales Enablement</em></div>
                </div>
                <div className="v6-stat">
                  <div className="v6-stat-eyebrow">Program ROI</div>
                  <div className="v6-stat-num"><em>49%</em></div>
                  <div className="v6-stat-label">Higher win rates at companies with formal enablement. The tooling is the difference.</div>
                  <div className="v6-stat-src">Enablement effectiveness study · <em>CSO Insights / Gartner</em></div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════ FOUNDER ═══════ */}
          <section className="v6-section" id="founder">
            <div className="v6-hl v6-founder-hl">
              <div className="v6-founder">
                <div className="v6-founder-img-wrap">
                  <div className="v6-founder-img-glow" />
                  <img src="/founder.jpg" alt="Vedika Agarwal" className="v6-founder-img" />
                </div>
                <div className="v6-founder-text">
                  <span className="v6-eyebrow">Who&apos;s behind this</span>
                  <h2 className="v6-h2" style={{fontSize:'36px'}}>Hi, I&apos;m Vedika.</h2>
                  <p className="v6-founder-bio">I spent 4 years at SpotDraft — starting as an SDR who hit 191% quota, then building their entire enablement function from scratch. I&apos;ve designed onboarding programs that cut ramp time by 50%, improved MQL→SQL conversion by 5% QoQ, and coached 20+ reps across regions.</p>
                  <p className="v6-founder-bio">I built EnableOS because I lived the problem. Every enablement person I know is doing incredible work — across six tools, with zero proof it matters. This is the system I wish I had.</p>
                  <div className="v6-founder-links">
                    <a href="https://www.linkedin.com/in/vedikaagarwal00/" target="_blank" rel="noreferrer" className="v6-founder-link">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      LinkedIn
                    </a>
                    <a href="mailto:enableos.hq@gmail.com" className="v6-founder-link">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>
                      enableos.hq@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════ ENGAGEMENT PHASES ═══════ */}
          <section className="v6-section" id="pricing">
            <div className="v6-hl">
              <span className="v6-eyebrow">What an engagement looks like</span>
              <h2 className="v6-h2">Not a subscription. <em>A partnership.</em></h2>
              <div className="v6-phases">
                <div className="v6-phase">
                  <div className="v6-phase-icon">🔍</div>
                  <h3>Discovery</h3>
                  <p>A 30-minute call where I learn your sales process, team, tools, and where things break. Free.</p>
                </div>
                <div className="v6-phase-arrow">→</div>
                <div className="v6-phase">
                  <div className="v6-phase-icon">🛠</div>
                  <h3>Build</h3>
                  <p>I design your enablement system and configure your workspace — onboarding, coaching, content, tracking. 1-2 weeks.</p>
                </div>
                <div className="v6-phase-arrow">→</div>
                <div className="v6-phase">
                  <div className="v6-phase-icon">🚀</div>
                  <h3>Launch</h3>
                  <p>You log in to a fully loaded workspace. I walk you through everything on a launch call.</p>
                </div>
                <div className="v6-phase-arrow">→</div>
                <div className="v6-phase">
                  <div className="v6-phase-icon">📈</div>
                  <h3>Evolve</h3>
                  <p>Monthly check-ins as your team grows. New hires, new markets, new challenges — your workspace evolves with you.</p>
                </div>
              </div>
              <div className="v6-phase-cta-wrap">
                <p className="v6-phase-note">Pricing depends on your team size, complexity, and starting point. Most engagements start with a one-time setup fee plus a monthly platform &amp; check-in fee.</p>
                <a href="https://calendly.com/enableos-hq/30min" target="_blank" rel="noreferrer" className="v6-btn-p" style={{marginTop:'8px'}}>Book a discovery call to discuss →</a>
              </div>
            </div>
          </section>

          {/* ═══════ FINAL CTA ═══════ */}
          <section className="v6-section">
            <div className="v6-hl">
              <div className="v6-cta-content">
                <h2 className="v6-cta-h2">Stop building enablement <em>from a blank page</em>.</h2>
                <p className="v6-cta-sub">Book a 30-minute discovery call. I&apos;ll map your gaps and show you what your workspace could look like — no commitment.</p>
                <a href="https://calendly.com/enableos-hq/30min" target="_blank" rel="noreferrer" className="v6-cta-big">Book a discovery call →</a>
              </div>
            </div>
          </section>
        </div>

        <footer className="v6-footer">
          <div className="v6-footer-inner">
            <div className="v6-footer-top">
              <div className="v6-footer-brand">
                <Logo />
                <p className="v6-footer-tag">Enablement consulting + a platform to run it. Built for the people doing the work.</p>
              </div>
              <div className="v6-footer-cols">
                <div className="v6-footer-col">
                  <h4>Product</h4>
                  <a href="#how-it-works">How it works</a>
                  <a href="#who-its-for">Who it&apos;s for</a>
                  <a href="#platform">Platform</a>
                  <a href="/roadmap">Roadmap</a>
                </div>
                <div className="v6-footer-col">
                  <h4>Get started</h4>
                  <a href="https://calendly.com/enableos-hq/30min" target="_blank" rel="noreferrer">Book a call</a>
                  <a href="/login">Log in</a>
                </div>
                <div className="v6-footer-col">
                  <h4>Connect</h4>
                  <a href="mailto:enableos.hq@gmail.com">enableos.hq@gmail.com</a>
                  <a href="https://www.linkedin.com/in/vedikaagarwal00/" target="_blank" rel="noreferrer">LinkedIn</a>
                </div>
              </div>
            </div>
            <div className="v6-footer-bottom">
              <span>© 2026 EnableOS. Built in Bangalore.</span>
              <span>Made for the people building enablement from scratch.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,400i;0,700;1,400&family=Sora:wght@300;400;500;600;700&display=swap');

:root { --p: 0; }
html { scroll-behavior: smooth; }

body { margin: 0; padding: 0; font-family: 'Sora', sans-serif; background: #1a1235; color: #F5F0FF; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
* { box-sizing: border-box; }
a { text-decoration: none; color: inherit; cursor: pointer; }

::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: #1a1235; }
::-webkit-scrollbar-thumb { background: rgba(155, 126, 255, 0.4); border-radius: 5px; }
::-webkit-scrollbar-thumb:hover { background: rgba(155, 126, 255, 0.6); }

.v6-wrap {
  --bg-page: color-mix(in oklab, #1a1235, #FDFBFF calc(var(--p) * 100%));
  --block: #1a1235;
  --cream: #F5F0FF;
  --cream-muted: #A8A0C0;
  --cream-faint: #6B6385;
  --border-light: rgba(245, 240, 255, 0.1);
  background: var(--bg-page);
  color: var(--cream);
  min-height: 100vh;
  position: relative;
  isolation: isolate;
}

/* ─── Background effects ─── */
.v6-bg { position: fixed; top: 0; left: 0; right: 0; pointer-events: none; z-index: 0; overflow: hidden; opacity: calc(1 - var(--p) * 0.95); height: 100vh; }
.v6-aurora { position: absolute; top: 0; left: -10%; right: -10%; height: 800px; background: radial-gradient(ellipse at 30% 30%, rgba(155, 126, 255, 0.32), transparent 55%), radial-gradient(ellipse at 70% 15%, rgba(232, 78, 168, 0.15), transparent 60%); filter: blur(40px); animation: aurora 18s ease-in-out infinite; }
@keyframes aurora { 0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.85; } 50% { transform: translate(40px, 30px) scale(1.1); opacity: 1; } }
.v6-orb { position: absolute; border-radius: 50%; filter: blur(70px); }
.v6-orb-1 { width: 420px; height: 420px; background: radial-gradient(circle, rgba(155, 126, 255, 0.4), transparent 70%); top: -80px; right: -80px; animation: orbDrift1 20s ease-in-out infinite; }
.v6-orb-2 { width: 360px; height: 360px; background: radial-gradient(circle, rgba(76, 50, 180, 0.5), transparent 70%); top: 60vh; left: -100px; animation: orbDrift2 24s ease-in-out infinite; }
.v6-orb-3 { width: 280px; height: 280px; background: radial-gradient(circle, rgba(232, 158, 200, 0.18), transparent 70%); top: 30vh; right: 10%; animation: orbDrift3 26s ease-in-out infinite; }
@keyframes orbDrift1 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-50px, 60px) scale(1.15); } }
@keyframes orbDrift2 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(60px, -40px) scale(1.1); } }
@keyframes orbDrift3 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(40px, -30px); } }
.v6-frag { position: absolute; pointer-events: none; }
.v6-frag-pri-1 { top: 14vh; left: 7%; background: linear-gradient(135deg, rgba(155, 126, 255, 0.35), rgba(123, 92, 252, 0.35)); color: rgba(255,255,255,0.7); padding: 6px 14px; border-radius: 8px; font-size: 13px; font-weight: 700; opacity: 0.55; transform: rotate(-8deg); animation: fragDrift1 22s ease-in-out infinite; }
.v6-frag-pri-2 { top: 32vh; left: 3%; background: linear-gradient(135deg, rgba(155, 126, 255, 0.2), rgba(123, 92, 252, 0.2)); color: rgba(255,255,255,0.45); padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; opacity: 0.4; filter: blur(1.5px); transform: rotate(6deg); animation: fragDrift2 28s ease-in-out infinite; }
.v6-frag-pri-3 { top: 56vh; right: 5%; background: linear-gradient(135deg, rgba(232, 78, 168, 0.22), rgba(155, 126, 255, 0.22)); color: rgba(255,255,255,0.5); padding: 5px 12px; border-radius: 7px; font-size: 12px; font-weight: 700; opacity: 0.45; filter: blur(1px); transform: rotate(-4deg); animation: fragDrift3 26s ease-in-out infinite; }
.v6-frag-ai-1 { top: 26vh; left: 13%; background: rgba(155, 126, 255, 0.2); color: rgba(245, 240, 255, 0.85); padding: 5px 12px; border-radius: 14px; font-size: 11px; font-weight: 600; opacity: 0.55; animation: fragDrift2 24s ease-in-out infinite; }
.v6-frag-dot { position: absolute; width: 8px; height: 8px; border-radius: 50%; background: rgba(155, 126, 255, 0.6); box-shadow: 0 0 12px rgba(155, 126, 255, 0.8); }
.v6-frag-dot-1 { top: 20vh; left: 28%; animation: pulse1 3s ease-in-out infinite, fragDrift2 35s ease-in-out infinite; }
.v6-frag-dot-2 { top: 70vh; left: 32%; animation: pulse1 2.4s ease-in-out infinite 1s, fragDrift3 33s ease-in-out infinite; }
.v6-frag-dot-3 { top: 45vh; right: 22%; animation: pulse1 2.8s ease-in-out infinite 0.5s, fragDrift1 36s ease-in-out infinite; }
@keyframes pulse1 { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 1; transform: scale(1.4); } }
@keyframes fragDrift1 { 0%, 100% { transform: translate(0, 0) rotate(-8deg); } 50% { transform: translate(30px, -20px) rotate(-4deg); } }
@keyframes fragDrift2 { 0%, 100% { transform: translate(0, 0) rotate(6deg); } 50% { transform: translate(-25px, 25px) rotate(2deg); } }
@keyframes fragDrift3 { 0%, 100% { transform: translate(0, 0) rotate(-4deg); } 50% { transform: translate(35px, 15px) rotate(0deg); } }
.v6-dots { position: absolute; inset: 0; background-image: radial-gradient(rgba(155, 126, 255, 0.22) 0.6px, transparent 0.6px); background-size: 28px 28px; opacity: 0.4; }

/* ─── Layout ─── */
.v6-content { position: relative; z-index: 1; padding: 0 48px 48px; max-width: 1280px; margin: 0 auto; }

/* ─── Nav ─── */
.v6-nav { display: flex; justify-content: space-between; align-items: center; padding: 14px 48px; border-bottom: 1px solid var(--border-light); margin: 0 -48px 64px; position: sticky; top: 0; z-index: 10; backdrop-filter: blur(12px); background: color-mix(in oklab, rgba(26, 18, 53, 0.75), rgba(253, 251, 255, 0.75) calc(var(--p) * 100%)); }
.v6-logo { display: inline-flex; align-items: center; height: 44px; color: color-mix(in oklab, #ffffff, #1a1235 calc(var(--p) * 100%)); --logo-os: color-mix(in oklab, #BDA9FF, #7C5CFC calc(var(--p) * 100%)); }
.v6-logo-svg { height: 100%; width: auto; display: block; overflow: visible; }
.v6-logo-os { fill: var(--logo-os); }
.v6-navlinks { display: flex; gap: 26px; align-items: center; font-size: 13px; color: color-mix(in oklab, var(--cream-muted), #4a4162 calc(var(--p) * 100%)); }
.v6-cta-nav { background: color-mix(in oklab, var(--cream), #1a1235 calc(var(--p) * 100%)); color: color-mix(in oklab, #1a1235, var(--cream) calc(var(--p) * 100%)); padding: 9px 18px; border-radius: 8px; font-size: 13px; font-weight: 600; }

/* ─── Sections ─── */
.v6-section { padding-bottom: 80px; scroll-margin-top: 90px; }
.v6-hl { position: relative; padding: 52px 44px; border-radius: 20px; z-index: 1; isolation: isolate; }
.v6-hl::before { content: ''; position: absolute; inset: 0; background: var(--block); opacity: var(--p); border-radius: inherit; z-index: -1; box-shadow: 0 30px 60px -20px rgba(0, 0, 0, calc(var(--p) * 0.35)); }
.v6-hl-sub { font-size: 15px; color: var(--cream-muted); line-height: 1.65; max-width: 560px; margin-bottom: 36px; font-weight: 300; }

/* ─── Hero ─── */
.v6-hero { display: grid; grid-template-columns: 1fr 1.05fr; gap: 64px; align-items: center; min-height: 75vh; padding-top: 20px; }
.v6-eyebrow { display: inline-flex; align-items: center; gap: 12px; font-size: 11px; font-weight: 500; letter-spacing: 2.5px; text-transform: uppercase; color: var(--cream-muted); margin-bottom: 26px; }
.v6-eyebrow::before { content: ''; width: 32px; height: 1px; background: #9B7EFF; }
.v6-h1 { font-family: 'Libre Baskerville', serif; font-size: 56px; line-height: 1.08; margin: 0 0 24px; font-weight: 400; color: var(--cream); letter-spacing: -1.5px; }
.v6-h1 em { font-style: italic; color: #FFFAF0; font-weight: 400; }
.v6-sub { font-size: 16px; color: var(--cream-muted); margin-bottom: 36px; line-height: 1.65; max-width: 480px; font-weight: 300; }
.v6-btns { display: flex; gap: 14px; align-items: center; }
.v6-btn-p { background: #F5F0FF; color: #1a1235; padding: 16px 28px; border-radius: 11px; font-size: 14px; font-weight: 600; transition: transform 0.2s; display: inline-block; }
.v6-btn-p:hover { transform: translateY(-2px); }
.v6-btn-s { color: #F5F0FF; padding: 16px 8px; font-size: 14px; font-weight: 500; border-bottom: 1px solid rgba(245, 240, 255, 0.3); }

/* ─── Dashboard mockup ─── */
.v6-dash-wrap { position: relative; }
.v6-dash-glow { position: absolute; inset: -30px; background: radial-gradient(ellipse at center, rgba(155, 126, 255, 0.4), transparent 65%); filter: blur(40px); animation: breathe 5s ease-in-out infinite; z-index: 0; }
@keyframes breathe { 0%, 100% { opacity: 0.55; transform: scale(0.95); } 50% { opacity: 1; transform: scale(1.08); } }
.v6-dash { position: relative; background: #FDFBFF; color: #1a1235; border-radius: 16px; padding: 20px; box-shadow: 0 40px 100px -25px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(155, 126, 255, 0.15); z-index: 1; }
.v6-dh { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid #F0ECFF; font-size: 13px; font-weight: 600; }
.v6-dh-live { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; color: #6BCB77; }
.v6-dh-live-dot { width: 7px; height: 7px; border-radius: 50%; background: #6BCB77; animation: livePulse 1.5s ease-in-out infinite; }
@keyframes livePulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(107, 203, 119, 0.6); } 50% { box-shadow: 0 0 0 6px rgba(107, 203, 119, 0); } }
.v6-intake { background: #FDFBFF; border: 1px solid #E2DCF0; border-radius: 11px; padding: 13px; margin-bottom: 10px; position: relative; }
.v6-intake::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: linear-gradient(180deg, #7C5CFC, #9B7EFF); border-radius: 11px 0 0 11px; }
.v6-int-top { display: flex; justify-content: space-between; align-items: flex-start; }
.v6-int-title { font-size: 13px; font-weight: 600; color: #1a1235; line-height: 1.3; }
.v6-int-meta { font-size: 11px; color: #8b82a0; margin-top: 3px; }
.v6-pri { background: #1a1235; color: #F5F0FF; padding: 5px 11px; border-radius: 7px; font-size: 12px; font-weight: 700; }
.v6-note { background: #FDFBFF; border: 1px solid #E2DCF0; border-radius: 11px; padding: 13px; margin-bottom: 10px; }
.v6-note-rep { font-size: 12px; font-weight: 600; color: #1a1235; margin-bottom: 5px; }
.v6-note-txt { font-size: 11px; color: #4a4162; font-style: italic; margin-bottom: 8px; line-height: 1.55; }
.v6-ai { display: inline-flex; gap: 5px; padding: 5px 11px; border-radius: 14px; font-size: 10px; font-weight: 600; background: linear-gradient(135deg, #FFF4E5, #FFE8D6); color: #B85C00; }
.v6-ramp { background: #FDFBFF; border: 1px solid #E2DCF0; border-radius: 11px; padding: 13px; }
.v6-ramp-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 12px; font-weight: 600; color: #1a1235; }
.v6-ramp-p { font-family: 'Libre Baskerville', serif; font-size: 14px; font-weight: 700; }
.v6-bar { background: #F0ECFF; height: 7px; border-radius: 4px; overflow: hidden; }
.v6-fill { background: linear-gradient(90deg, #7C5CFC, #9B7EFF); height: 100%; width: 63%; border-radius: 4px; }
.v6-ramp-sub { font-size: 10px; color: #8b82a0; margin-top: 6px; }

/* ─── Typography ─── */
.v6-h2 { font-family: 'Libre Baskerville', serif; font-size: 48px; line-height: 1.08; font-weight: 400; color: var(--cream); letter-spacing: -1px; max-width: 760px; margin: 0 0 36px; }
.v6-h2 em { font-style: italic; color: #FFFAF0; }

/* ─── Pain list ─── */
.v6-painlist { list-style: none; padding: 0; margin: 0; }
.v6-painlist li { padding: 22px 0; border-top: 1px solid var(--border-light); font-size: 17px; color: var(--cream); font-weight: 300; line-height: 1.5; display: flex; gap: 20px; align-items: baseline; }
.v6-painlist li:last-child { border-bottom: 1px solid var(--border-light); }
.v6-painlist .pn { font-family: 'Libre Baskerville', serif; font-style: italic; font-size: 14px; color: rgba(155, 126, 255, 0.7); min-width: 28px; }

/* ─── Transition ─── */
.v6-transition { text-align: center; padding: 40px 0 60px; }
.v6-transition-pill { display: inline-block; padding: 16px 34px; border-radius: 100px; font-family: 'Libre Baskerville', serif; font-style: italic; font-size: 24px; color: var(--cream); position: relative; isolation: isolate; line-height: 1.4; }
.v6-transition-pill::before { content: ''; position: absolute; inset: 0; background: var(--block); opacity: var(--p); border-radius: inherit; z-index: -1; }
.v6-transition-pill em { font-style: italic; color: #FFFAF0; }

/* ─── How it works (steps) ─── */
.v6-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; margin-top: 28px; position: relative; }
.v6-step { position: relative; padding: 0 24px; }
.v6-step:first-child { padding-left: 0; }
.v6-step:last-child { padding-right: 0; }
.v6-step-num { font-family: 'Libre Baskerville', serif; font-size: 48px; font-style: italic; color: rgba(155, 126, 255, 0.3); margin-bottom: 16px; line-height: 1; }
.v6-step-line { width: 40px; height: 2px; background: linear-gradient(90deg, #7C5CFC, #9B7EFF); border-radius: 2px; margin-bottom: 18px; }
.v6-step h3 { font-family: 'Libre Baskerville', serif; font-size: 20px; font-weight: 700; margin: 0 0 12px; color: var(--cream); }
.v6-step p { font-size: 14px; color: var(--cream-muted); line-height: 1.6; margin: 0; font-weight: 300; }

/* ─── Three models ─── */
.v6-models { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 28px; }
.v6-model { background: var(--block); border: 1px solid var(--border-light); border-radius: 16px; padding: 30px 26px; display: flex; flex-direction: column; box-shadow: 0 10px 30px -10px rgba(0, 0, 0, calc(0.2 + var(--p) * 0.3)); transition: transform 0.2s; }
.v6-model:hover { transform: translateY(-3px); }
.v6-model-tag { display: inline-block; font-size: 10px; letter-spacing: 1.8px; text-transform: uppercase; font-weight: 700; padding: 6px 14px; border-radius: 100px; margin-bottom: 20px; width: fit-content; }
.v6-model-tag-1 { background: rgba(255, 140, 66, 0.18); color: #FFB87A; }
.v6-model-tag-2 { background: rgba(255, 196, 0, 0.16); color: #FFD466; }
.v6-model-tag-3 { background: rgba(107, 203, 119, 0.16); color: #8FDD96; }
.v6-model h3 { font-family: 'Libre Baskerville', serif; font-size: 18px; font-weight: 400; line-height: 1.35; margin: 0 0 14px; color: var(--cream); }
.v6-model-desc { font-size: 13px; color: var(--cream-muted); line-height: 1.6; margin: 0 0 20px; font-weight: 300; flex-grow: 1; }
.v6-model-what { border-top: 1px solid var(--border-light); padding-top: 16px; margin-bottom: 20px; }
.v6-model-what-label { font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 600; color: rgba(155, 126, 255, 0.7); display: block; margin-bottom: 8px; }
.v6-model-what p { font-size: 13px; color: var(--cream-muted); line-height: 1.6; margin: 0; font-weight: 300; }
.v6-model-cta { display: inline-block; color: #BDA9FF; font-size: 13px; font-weight: 600; border-bottom: 1px solid rgba(189, 169, 255, 0.3); padding-bottom: 2px; transition: color 0.2s; }
.v6-model-cta:hover { color: #F5F0FF; }

/* ─── Platform preview ─── */
.v6-preview-wrap { position: relative; margin-top: 12px; }
.v6-preview-glow { position: absolute; inset: -40px; background: radial-gradient(ellipse at center, rgba(155, 126, 255, 0.25), transparent 65%); filter: blur(50px); z-index: 0; }
.v6-preview { position: relative; z-index: 1; background: #FDFBFF; border-radius: 16px; display: grid; grid-template-columns: 180px 1fr; overflow: hidden; box-shadow: 0 40px 100px -25px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(155, 126, 255, 0.15); min-height: 380px; }
.v6-prev-sidebar { background: #1a1235; padding: 18px 14px; display: flex; flex-direction: column; gap: 2px; }
.v6-prev-logo { display: flex; align-items: center; gap: 8px; color: #F5F0FF; font-size: 13px; font-weight: 700; font-family: 'Libre Baskerville', serif; margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.v6-prev-nav-item { font-size: 12px; color: rgba(255,255,255,0.45); padding: 8px 10px; border-radius: 7px; font-weight: 400; }
.v6-prev-nav-item.active { background: rgba(124, 92, 252, 0.25); color: #F5F0FF; font-weight: 600; }
.v6-prev-main { padding: 22px 24px; color: #1a1235; }
.v6-prev-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.v6-prev-title { font-family: 'Libre Baskerville', serif; font-size: 18px; font-weight: 700; }
.v6-prev-badge { font-size: 10px; color: #6BCB77; font-weight: 600; background: rgba(107, 203, 119, 0.12); padding: 4px 10px; border-radius: 100px; }

/* Animated cards */
.v6-prev-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; }
.v6-prev-card { background: #F8F5FF; border: 1px solid #E2DCF0; border-radius: 11px; padding: 16px; }
.v6-pc-label { font-size: 10px; color: #8b82a0; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; margin-bottom: 6px; }
.v6-pc-num { font-family: 'Libre Baskerville', serif; font-size: 32px; font-weight: 700; color: #1a1235; line-height: 1; margin-bottom: 4px; }
.v6-pc-sub { font-size: 11px; color: #8b82a0; }

.v6-prev-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.v6-prev-intake-card, .v6-prev-ramp-card { background: #F8F5FF; border: 1px solid #E2DCF0; border-radius: 11px; padding: 16px; }
.v6-pic-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.v6-pic-title { font-size: 12px; font-weight: 700; color: #1a1235; }
.v6-pic-score { background: #1a1235; color: #F5F0FF; padding: 3px 8px; border-radius: 5px; font-size: 10px; font-weight: 700; }
.v6-pic-item { font-size: 11px; color: #4a4162; padding: 8px 0; border-top: 1px solid #F0ECFF; }
.v6-pic-item:first-of-type { border-top: 1px solid #E2DCF0; }
.v6-prc-rep { margin-top: 12px; }
.v6-prc-rep span { font-size: 11px; color: #4a4162; font-weight: 500; display: block; margin-bottom: 5px; }
.v6-prc-bar { background: #F0ECFF; height: 6px; border-radius: 3px; overflow: hidden; }
.v6-prc-fill { background: linear-gradient(90deg, #7C5CFC, #9B7EFF); height: 100%; border-radius: 3px; transition: width 1.5s ease; }

/* Preview animations */
.v6-prev-anim-1 { animation: cardFadeIn 0.8s ease both 0.2s; }
.v6-prev-anim-2 { animation: cardFadeIn 0.8s ease both 0.4s; }
.v6-prev-anim-3 { animation: cardFadeIn 0.8s ease both 0.6s; }
.v6-prev-anim-4 { animation: cardFadeIn 0.8s ease both 0.8s; }
.v6-prev-anim-5 { animation: cardFadeIn 0.8s ease both 1.0s; }
@keyframes cardFadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

/* ─── Stats ─── */
.v6-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; padding-top: 24px; border-top: 1px solid var(--border-light); margin-top: 12px; }
.v6-stat { padding: 0 28px; border-right: 1px solid var(--border-light); }
.v6-stat:first-child { padding-left: 0; }
.v6-stat:last-child { padding-right: 0; border-right: none; }
.v6-stat-eyebrow { font-size: 10px; letter-spacing: 1.8px; text-transform: uppercase; color: var(--cream-faint); font-weight: 600; margin-bottom: 14px; }
.v6-stat-num { font-family: 'Libre Baskerville', serif; font-size: 52px; line-height: 1; color: var(--cream); font-weight: 400; margin-bottom: 12px; letter-spacing: -1px; }
.v6-stat-num em { font-style: italic; color: #FFFAF0; }
.v6-stat-label { font-size: 14px; color: var(--cream-muted); line-height: 1.55; margin-bottom: 12px; max-width: 240px; }
.v6-stat-src { font-size: 11px; color: var(--cream-faint); line-height: 1.5; }
.v6-stat-src em { font-style: italic; }

/* ─── Founder ─── */
.v6-founder-hl { overflow: hidden; }
.v6-founder { display: grid; grid-template-columns: auto 1fr; gap: 48px; align-items: center; }
.v6-founder-img-wrap { position: relative; width: 220px; height: 220px; flex-shrink: 0; }
.v6-founder-img-glow { position: absolute; inset: -20px; background: radial-gradient(circle, rgba(155, 126, 255, 0.35), transparent 70%); filter: blur(30px); }
.v6-founder-img { width: 220px; height: 220px; border-radius: 18px; object-fit: cover; position: relative; z-index: 1; box-shadow: 0 20px 60px -15px rgba(0, 0, 0, 0.4); }
.v6-founder-text .v6-eyebrow { margin-bottom: 14px; }
.v6-founder-text .v6-h2 { margin-bottom: 18px; }
.v6-founder-bio { font-size: 15px; color: var(--cream-muted); line-height: 1.65; margin: 0 0 14px; font-weight: 300; max-width: 520px; }
.v6-founder-links { display: flex; gap: 20px; margin-top: 22px; }
.v6-founder-link { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; color: #BDA9FF; font-weight: 500; border: 1px solid rgba(189, 169, 255, 0.25); padding: 9px 16px; border-radius: 9px; transition: all 0.2s; }
.v6-founder-link:hover { background: rgba(189, 169, 255, 0.12); color: #F5F0FF; }

/* ─── Engagement phases ─── */
.v6-phases { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr; gap: 0; align-items: flex-start; margin-top: 28px; }
.v6-phase { padding: 0 12px; }
.v6-phase:first-child { padding-left: 0; }
.v6-phase:last-child { padding-right: 0; }
.v6-phase-icon { font-size: 28px; margin-bottom: 14px; }
.v6-phase h3 { font-family: 'Libre Baskerville', serif; font-size: 20px; font-weight: 700; margin: 0 0 10px; color: var(--cream); }
.v6-phase p { font-size: 13px; color: var(--cream-muted); line-height: 1.6; margin: 0; font-weight: 300; }
.v6-phase-arrow { font-size: 20px; color: rgba(155, 126, 255, 0.4); padding-top: 20px; }
.v6-phase-cta-wrap { text-align: center; margin-top: 40px; padding-top: 28px; border-top: 1px solid var(--border-light); }
.v6-phase-note { font-size: 14px; color: var(--cream-muted); line-height: 1.6; max-width: 560px; margin: 0 auto; font-weight: 300; }

/* ─── CTA ─── */
.v6-cta-content { text-align: center; padding: 20px 0; }
.v6-cta-h2 { font-family: 'Libre Baskerville', serif; font-size: 48px; line-height: 1.08; font-weight: 400; color: var(--cream); letter-spacing: -1px; max-width: 640px; margin: 0 auto 22px; }
.v6-cta-h2 em { font-style: italic; }
.v6-cta-sub { font-size: 15px; color: var(--cream-muted); margin-bottom: 36px; max-width: 460px; margin-left: auto; margin-right: auto; line-height: 1.6; }
.v6-cta-big { display: inline-block; background: #F5F0FF; color: #1a1235; padding: 18px 38px; border-radius: 12px; font-size: 16px; font-weight: 600; transition: transform 0.2s; box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.35); }
.v6-cta-big:hover { transform: translateY(-2px); }

/* ─── Scroll hint ─── */
.v6-scroll-hint { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: rgba(245, 240, 255, 0.6); pointer-events: none; opacity: calc(1 - var(--p) * 5); animation: hintBounce 2s ease-in-out infinite; z-index: 20; }
@keyframes hintBounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(4px); } }

/* ─── Footer ─── */
.v6-footer { position: relative; z-index: 1; padding: 64px 48px 32px; border-top: 1px solid var(--border-light); background: color-mix(in oklab, rgba(26, 18, 53, 0.85), rgba(253, 251, 255, 0.85) calc(var(--p) * 100%)); backdrop-filter: blur(12px); }
.v6-footer-inner { max-width: 1280px; margin: 0 auto; }
.v6-footer-top { display: grid; grid-template-columns: 1.4fr 2fr; gap: 64px; padding-bottom: 40px; border-bottom: 1px solid var(--border-light); }
.v6-footer-brand .v6-logo { margin-bottom: 18px; }
.v6-footer-tag { font-size: 14px; color: color-mix(in oklab, var(--cream-muted), #4a4162 calc(var(--p) * 100%)); line-height: 1.65; max-width: 340px; margin: 0; font-weight: 300; }
.v6-footer-cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
.v6-footer-col h4 { font-family: 'Sora', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: color-mix(in oklab, var(--cream-faint), #4a4162 calc(var(--p) * 100%)); font-weight: 600; margin: 0 0 18px; }
.v6-footer-col a { display: block; font-size: 14px; color: color-mix(in oklab, var(--cream-muted), #4a4162 calc(var(--p) * 100%)); padding: 6px 0; transition: color 0.2s; font-weight: 300; }
.v6-footer-col a:hover { color: color-mix(in oklab, var(--cream), #1a1235 calc(var(--p) * 100%)); }
.v6-footer-bottom { padding-top: 26px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: color-mix(in oklab, var(--cream-faint), #4a4162 calc(var(--p) * 100%)); font-weight: 300; }

/* ─── Mobile ─── */
@media (max-width: 768px) {
  .v6-content { padding: 0 22px 24px; }
  .v6-nav { padding: 12px 22px; margin: 0 -22px 40px; }
  .v6-navlinks a:not(.v6-cta-nav) { display: none; }
  .v6-navlinks { gap: 14px; }
  .v6-logo { height: 36px; }
  .v6-hero { grid-template-columns: 1fr; gap: 40px; min-height: auto; padding-top: 8px; }
  .v6-h1 { font-size: 36px; }
  .v6-h2 { font-size: 30px; }
  .v6-sub { font-size: 15px; }
  .v6-steps { grid-template-columns: 1fr; gap: 32px; }
  .v6-step { padding: 0 !important; }
  .v6-models { grid-template-columns: 1fr; gap: 14px; }
  .v6-preview { grid-template-columns: 1fr; }
  .v6-prev-sidebar { display: none; }
  .v6-prev-cards { grid-template-columns: 1fr; }
  .v6-prev-row { grid-template-columns: 1fr; }
  .v6-stats { grid-template-columns: 1fr; gap: 28px; }
  .v6-stat { padding: 0 0 20px; border-right: none; border-bottom: 1px solid var(--border-light); }
  .v6-stat:last-child { border-bottom: none; padding-bottom: 0; }
  .v6-founder { grid-template-columns: 1fr; text-align: center; gap: 28px; }
  .v6-founder-img-wrap { margin: 0 auto; width: 160px; height: 160px; }
  .v6-founder-img { width: 160px; height: 160px; }
  .v6-founder-bio { max-width: 100%; }
  .v6-founder-links { justify-content: center; }
  .v6-phases { grid-template-columns: 1fr; gap: 28px; }
  .v6-phase { padding: 0 !important; }
  .v6-phase-arrow { display: none; }
  .v6-hl { padding: 32px 24px; }
  .v6-cta-h2 { font-size: 32px; }
  .v6-stat-num { font-size: 44px; }
  .v6-painlist li { font-size: 15px; }
  .v6-footer { padding: 48px 22px 28px; }
  .v6-footer-top { grid-template-columns: 1fr; gap: 32px; padding-bottom: 32px; }
  .v6-footer-cols { grid-template-columns: 1fr 1fr; gap: 24px; }
  .v6-footer-bottom { flex-direction: column; gap: 10px; text-align: center; }
  .v6-section { scroll-margin-top: 72px; }
}
`;
