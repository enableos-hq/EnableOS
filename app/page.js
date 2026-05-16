'use client';

import { useEffect } from 'react';

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
            <div className="v6-logo">Enable<em>OS</em></div>
            <div className="v6-navlinks">
              <a href="#features">Features</a>
              <a href="#stats">Why now</a>
              <a href="/login">Log in</a>
              <a href="https://tally.so/r/kdRgXd" className="v6-cta-nav">Get early access</a>
            </div>
          </nav>

          <section className="v6-section v6-hero">
            <div>
              <span className="v6-eyebrow">The operating system for enablement</span>
              <h1 className="v6-h1">Built for the one person <em>running it all</em>.</h1>
              <p className="v6-sub">Intake auto-prioritized. 1:1 notes read by AI. Ramp tracked in real time. Stop running enablement across six tools that don&apos;t talk to each other.</p>
              <div className="v6-btns">
                <a href="https://tally.so/r/kdRgXd" className="v6-btn-p">Get early access →</a>
                <a href="#features" className="v6-btn-s">See the platform</a>
              </div>
            </div>

            <div className="v6-dash-wrap">
              <div className="v6-dash-glow" />
              <div className="v6-dash">
                <div className="v6-dh">
                  <span>Today · Your enablement view</span>
                  <span className="v6-dh-live"><span className="v6-dh-live-dot" />Live</span>
                </div>
                <div className="v6-intake">
                  <div className="v6-int-top">
                    <div>
                      <div className="v6-int-title">Build battle card for Competitor X</div>
                      <div className="v6-int-meta">Requested by Maya · just now</div>
                    </div>
                    <span className="v6-pri">P 18</span>
                  </div>
                </div>
                <div className="v6-note">
                  <div className="v6-note-rep">Rahul · 1:1 note · Today</div>
                  <div className="v6-note-txt">&quot;Pipeline feels slow this week. Not sure if my outbound is even working...&quot;</div>
                  <span className="v6-ai">⚠ Claude AI · Confidence dropping ↓</span>
                </div>
                <div className="v6-ramp">
                  <div className="v6-ramp-top">
                    <span>Aisha · Week 4 ramp</span>
                    <span className="v6-ramp-p">63%</span>
                  </div>
                  <div className="v6-bar"><div className="v6-fill" /></div>
                </div>
              </div>
            </div>
          </section>

          <section className="v6-section">
            <div className="v6-hl">
              <span className="v6-eyebrow">Sound familiar?</span>
              <h2 className="v6-h2">Six tools. None of them <em>talk to each other</em>.</h2>
              <ul className="v6-painlist">
                <li><span className="pn">01</span><span>Intake lives in a Google Form. Tracker in a spreadsheet. Notes in Notion. Battle cards in a Drive folder you can&apos;t find.</span></li>
                <li><span className="pn">02</span><span>Three sales leaders ask for the same thing in three different Slack threads.</span></li>
                <li><span className="pn">03</span><span>You can&apos;t tell which rep needs coaching until the QBR — when it&apos;s already too late.</span></li>
                <li><span className="pn">04</span><span>Every new hire gets a slightly different onboarding. None of them feel ready in week one.</span></li>
                <li><span className="pn">05</span><span>Leadership asks you for ROI. You open a spreadsheet. You both look away.</span></li>
              </ul>
            </div>
          </section>

          <div className="v6-transition">
            <span className="v6-transition-pill">It doesn&apos;t have to be like this.</span>
          </div>

          <section className="v6-section" id="features">
            <div className="v6-hl">
              <span className="v6-eyebrow">All in one place</span>
              <h2 className="v6-h2">Every part of your job, <em>finally connected</em>.</h2>
              <div className="v6-grid">
                <div className="v6-card">
                  <div className="v6-card-icon">📥</div>
                  <h3>Intake</h3>
                  <p>Auto-prioritized using Impact × Urgency ÷ Effort. No more sorting forms by hand.</p>
                </div>
                <div className="v6-card">
                  <div className="v6-card-icon">📝</div>
                  <h3>1:1 Notes</h3>
                  <p>Claude AI reads patterns across your notes. Confidence drops surface themselves.</p>
                </div>
                <div className="v6-card">
                  <div className="v6-card-icon">🚀</div>
                  <h3>Ramp &amp; Onboarding</h3>
                  <p>Structured paths that cut ramp time in half. New hires always know what&apos;s next.</p>
                </div>
                <div className="v6-card">
                  <div className="v6-card-icon">📊</div>
                  <h3>Pulse Checks</h3>
                  <p>Weekly confidence scores from reps. Coach the right thing before it&apos;s a problem.</p>
                </div>
                <div className="v6-card">
                  <div className="v6-card-icon">📚</div>
                  <h3>Collaterals</h3>
                  <p>One source of truth. Every battle card, playbook, and deck — searchable.</p>
                </div>
                <div className="v6-card">
                  <div className="v6-card-icon">🏆</div>
                  <h3>Leaderboards</h3>
                  <p>President&apos;s Club tracker. Visibility that motivates without spreadsheets.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="v6-section" id="stats">
            <div className="v6-hl">
              <span className="v6-eyebrow">The gap we close</span>
              <h2 className="v6-h2" style={{ fontSize: '34px', marginBottom: '24px' }}>Industry benchmarks. <em>And what&apos;s possible.</em></h2>
              <div className="v6-stats">
                <div className="v6-stat">
                  <div className="v6-stat-eyebrow">Ramp time</div>
                  <div className="v6-stat-num"><em>1.5 mo</em><span className="small"> / 3 mo</span></div>
                  <div className="v6-stat-label">Structured onboarding cuts SDR ramp in half — when the system exists.</div>
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

          <section className="v6-section">
            <div className="v6-hl">
              <div className="v6-cta-content">
                <h2 className="v6-cta-h2">Stop running enablement <em>across six tools</em>.</h2>
                <p className="v6-cta-sub">Free for the first 20 users. No credit card. Production-ready from day one.</p>
                <a href="https://tally.so/r/kdRgXd" className="v6-cta-big">Get early access →</a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,400i;0,700;1,400&family=Sora:wght@300;400;500;600;700&display=swap');

:root { --p: 0; }

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
  scroll-behavior: smooth;
}

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

.v6-content { position: relative; z-index: 1; padding: 0 48px 48px; max-width: 1280px; margin: 0 auto; }

.v6-nav { display: flex; justify-content: space-between; align-items: center; padding: 22px 48px; border-bottom: 1px solid var(--border-light); margin: 0 -48px 64px; position: sticky; top: 0; z-index: 10; backdrop-filter: blur(12px); background: color-mix(in oklab, rgba(26, 18, 53, 0.75), rgba(253, 251, 255, 0.75) calc(var(--p) * 100%)); }
.v6-logo { font-family: 'Libre Baskerville', serif; font-weight: 700; font-size: 22px; color: color-mix(in oklab, var(--cream), #1a1235 calc(var(--p) * 100%)); letter-spacing: -0.5px; }
.v6-logo em { color: #9B7EFF; font-style: normal; }
.v6-navlinks { display: flex; gap: 28px; align-items: center; font-size: 13px; color: color-mix(in oklab, var(--cream-muted), #4a4162 calc(var(--p) * 100%)); }
.v6-cta-nav { background: color-mix(in oklab, var(--cream), #1a1235 calc(var(--p) * 100%)); color: color-mix(in oklab, #1a1235, var(--cream) calc(var(--p) * 100%)); padding: 9px 18px; border-radius: 8px; font-size: 13px; font-weight: 600; }

.v6-section { padding-bottom: 80px; }

.v6-hl { position: relative; padding: 52px 44px; border-radius: 20px; z-index: 1; isolation: isolate; }
.v6-hl::before { content: ''; position: absolute; inset: 0; background: var(--block); opacity: var(--p); border-radius: inherit; z-index: -1; box-shadow: 0 30px 60px -20px rgba(0, 0, 0, calc(var(--p) * 0.35)); }

.v6-hero { display: grid; grid-template-columns: 1fr 1.05fr; gap: 64px; align-items: center; min-height: 75vh; padding-top: 20px; }
.v6-eyebrow { display: inline-flex; align-items: center; gap: 12px; font-size: 11px; font-weight: 500; letter-spacing: 2.5px; text-transform: uppercase; color: var(--cream-muted); margin-bottom: 26px; }
.v6-eyebrow::before { content: ''; width: 32px; height: 1px; background: #9B7EFF; }
.v6-h1 { font-family: 'Libre Baskerville', serif; font-size: 62px; line-height: 1.04; margin: 0 0 24px; font-weight: 400; color: var(--cream); letter-spacing: -1.5px; }
.v6-h1 em { font-style: italic; color: #FFFAF0; font-weight: 400; }
.v6-sub { font-size: 16px; color: var(--cream-muted); margin-bottom: 36px; line-height: 1.65; max-width: 460px; font-weight: 300; }
.v6-btns { display: flex; gap: 14px; align-items: center; }
.v6-btn-p { background: #F5F0FF; color: #1a1235; padding: 16px 28px; border-radius: 11px; font-size: 14px; font-weight: 600; transition: transform 0.2s; display: inline-block; }
.v6-btn-p:hover { transform: translateY(-2px); }
.v6-btn-s { color: #F5F0FF; padding: 16px 8px; font-size: 14px; font-weight: 500; border-bottom: 1px solid rgba(245, 240, 255, 0.3); }

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

.v6-h2 { font-family: 'Libre Baskerville', serif; font-size: 48px; line-height: 1.08; font-weight: 400; color: var(--cream); letter-spacing: -1px; max-width: 760px; margin: 0 0 36px; }
.v6-h2 em { font-style: italic; color: #FFFAF0; }
.v6-painlist { list-style: none; padding: 0; margin: 0; }
.v6-painlist li { padding: 22px 0; border-top: 1px solid var(--border-light); font-size: 17px; color: var(--cream); font-weight: 300; line-height: 1.5; display: flex; gap: 20px; align-items: baseline; }
.v6-painlist li:last-child { border-bottom: 1px solid var(--border-light); }
.v6-painlist .pn { font-family: 'Libre Baskerville', serif; font-style: italic; font-size: 14px; color: rgba(155, 126, 255, 0.7); min-width: 28px; }

.v6-transition { text-align: center; padding: 40px 0 60px; }
.v6-transition-pill { display: inline-block; padding: 16px 34px; border-radius: 100px; font-family: 'Libre Baskerville', serif; font-style: italic; font-size: 24px; color: var(--cream); position: relative; isolation: isolate; line-height: 1.4; }
.v6-transition-pill::before { content: ''; position: absolute; inset: 0; background: var(--block); opacity: var(--p); border-radius: inherit; z-index: -1; }

.v6-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 28px; }
.v6-card { background: var(--block); border: 1px solid var(--border-light); border-radius: 14px; padding: 24px; transition: transform 0.2s; box-shadow: 0 10px 30px -10px rgba(0, 0, 0, calc(0.2 + var(--p) * 0.3)); }
.v6-card:hover { transform: translateY(-3px); }
.v6-card-icon { display: inline-flex; align-items: center; justify-content: center; width: 42px; height: 42px; border-radius: 11px; background: linear-gradient(135deg, rgba(124, 92, 252, 0.25), rgba(155, 126, 255, 0.25)); margin-bottom: 18px; font-size: 20px; }
.v6-card h3 { font-family: 'Libre Baskerville', serif; font-size: 20px; font-weight: 700; margin: 0 0 10px; color: var(--cream); }
.v6-card p { font-size: 13px; color: var(--cream-muted); line-height: 1.6; margin: 0; }

.v6-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; padding-top: 24px; border-top: 1px solid var(--border-light); margin-top: 12px; }
.v6-stat { padding: 0 28px; border-right: 1px solid var(--border-light); }
.v6-stat:first-child { padding-left: 0; }
.v6-stat:last-child { padding-right: 0; border-right: none; }
.v6-stat-eyebrow { font-size: 10px; letter-spacing: 1.8px; text-transform: uppercase; color: var(--cream-faint); font-weight: 600; margin-bottom: 14px; }
.v6-stat-num { font-family: 'Libre Baskerville', serif; font-size: 52px; line-height: 1; color: var(--cream); font-weight: 400; margin-bottom: 12px; letter-spacing: -1px; }
.v6-stat-num em { font-style: italic; color: #FFFAF0; }
.v6-stat-num .small { font-size: 24px; color: var(--cream-muted); font-style: normal; }
.v6-stat-label { font-size: 14px; color: var(--cream-muted); line-height: 1.55; margin-bottom: 12px; max-width: 240px; }
.v6-stat-src { font-size: 11px; color: var(--cream-faint); line-height: 1.5; }
.v6-stat-src em { font-style: italic; }

.v6-cta-content { text-align: center; padding: 20px 0; }
.v6-cta-h2 { font-family: 'Libre Baskerville', serif; font-size: 48px; line-height: 1.08; font-weight: 400; color: var(--cream); letter-spacing: -1px; max-width: 640px; margin: 0 auto 22px; }
.v6-cta-h2 em { font-style: italic; }
.v6-cta-sub { font-size: 15px; color: var(--cream-muted); margin-bottom: 36px; max-width: 460px; margin-left: auto; margin-right: auto; line-height: 1.6; }
.v6-cta-big { display: inline-block; background: #F5F0FF; color: #1a1235; padding: 18px 38px; border-radius: 12px; font-size: 16px; font-weight: 600; transition: transform 0.2s; box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.35); }
.v6-cta-big:hover { transform: translateY(-2px); }

.v6-scroll-hint { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: rgba(245, 240, 255, 0.6); pointer-events: none; opacity: calc(1 - var(--p) * 5); animation: hintBounce 2s ease-in-out infinite; z-index: 20; }
@keyframes hintBounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(4px); } }

@media (max-width: 768px) {
  .v6-content { padding: 0 22px 24px; }
  .v6-nav { padding: 16px 22px; margin: 0 -22px 40px; }
  .v6-navlinks a:not(.v6-cta-nav) { display: none; }
  .v6-navlinks { gap: 14px; }
  .v6-hero { grid-template-columns: 1fr; gap: 40px; min-height: auto; padding-top: 8px; }
  .v6-h1 { font-size: 40px; }
  .v6-h2 { font-size: 30px; }
  .v6-sub { font-size: 15px; }
  .v6-grid { grid-template-columns: 1fr; }
  .v6-stats { grid-template-columns: 1fr; gap: 28px; }
  .v6-stat { padding: 0 0 20px; border-right: none; border-bottom: 1px solid var(--border-light); }
  .v6-stat:last-child { border-bottom: none; padding-bottom: 0; }
  .v6-hl { padding: 32px 24px; }
  .v6-cta-h2 { font-size: 32px; }
  .v6-stat-num { font-size: 44px; }
  .v6-painlist li { font-size: 15px; }
}
`;
