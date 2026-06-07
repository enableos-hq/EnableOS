'use client';

import { useEffect } from 'react';

export default function BookPage() {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: bookStyles }} />
      <div className="book-wrap">
        <nav className="book-nav">
          <a href="/" className="book-logo" aria-label="EnableOS">
            <svg viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg" style={{height:40,width:'auto'}}>
              <defs>
                <linearGradient id="blG1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#BDA9FF"/><stop offset="100%" stopColor="#9B7EFF"/></linearGradient>
                <linearGradient id="blG2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#9B7EFF"/><stop offset="100%" stopColor="#7C5CFC"/></linearGradient>
                <linearGradient id="blG3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#7C5CFC"/><stop offset="100%" stopColor="#5B3EDB"/></linearGradient>
              </defs>
              <rect x="20" y="20" width="52" height="9" rx="2.5" fill="url(#blG1)" opacity="0.55"/>
              <rect x="26" y="35" width="52" height="12" rx="2.5" fill="url(#blG2)" opacity="0.8"/>
              <rect x="32" y="53" width="52" height="16" rx="2.5" fill="url(#blG3)"/>
              <line x1="26" y1="35" x2="20" y2="29" stroke="#BDA9FF" strokeWidth="0.8" opacity="0.45"/>
              <line x1="32" y1="53" x2="26" y2="47" stroke="#9B7EFF" strokeWidth="0.8" opacity="0.5"/>
              <line x1="78" y1="35" x2="72" y2="29" stroke="#BDA9FF" strokeWidth="0.8" opacity="0.45"/>
              <line x1="84" y1="53" x2="78" y2="47" stroke="#9B7EFF" strokeWidth="0.8" opacity="0.5"/>
              <circle cx="79" cy="61" r="3" fill="#ffffff" opacity="0.9"/>
              <circle cx="70" cy="61" r="3" fill="#BDA9FF" opacity="0.7"/>
              <text x="102" y="68" fontFamily="'Libre Baskerville', Georgia, serif" fontSize="38" fontWeight="400" fill="#F5F0FF" letterSpacing="-0.02em">
                Enable<tspan fontWeight="700" fill="#BDA9FF">OS</tspan>
              </text>
            </svg>
          </a>
          <a href="/" className="book-back">← Back to site</a>
        </nav>

        <div className="book-content">
          <div className="book-header">
            <h1>Book a discovery call</h1>
            <p>30 minutes. I&apos;ll learn about your sales process, team, and where things break — and show you what your workspace could look like.</p>
          </div>

          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/enableos-hq/30min?hide_gdpr_banner=1&background_color=1a1235&text_color=F5F0FF&primary_color=7C5CFC"
            style={{ minWidth: '320px', height: '700px', width: '100%' }}
          />
        </div>
      </div>
    </>
  );
}

const bookStyles = `
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Sora:wght@300;400;500;600&display=swap');

body { margin: 0; padding: 0; font-family: 'Sora', sans-serif; background: #1a1235; color: #F5F0FF; -webkit-font-smoothing: antialiased; }
* { box-sizing: border-box; }
a { text-decoration: none; color: inherit; }

.book-wrap { min-height: 100vh; max-width: 900px; margin: 0 auto; padding: 0 32px; }
.book-nav { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; border-bottom: 1px solid rgba(245, 240, 255, 0.1); margin-bottom: 40px; }
.book-back { font-size: 13px; color: #A8A0C0; transition: color 0.2s; }
.book-back:hover { color: #F5F0FF; }

.book-header { text-align: center; margin-bottom: 36px; }
.book-header h1 { font-family: 'Libre Baskerville', serif; font-size: 36px; font-weight: 400; margin: 0 0 14px; letter-spacing: -0.5px; }
.book-header p { font-size: 15px; color: #A8A0C0; line-height: 1.6; max-width: 480px; margin: 0 auto; font-weight: 300; }

.book-content { padding-bottom: 60px; }

@media (max-width: 768px) {
  .book-wrap { padding: 0 18px; }
  .book-header h1 { font-size: 28px; }
}
`;
