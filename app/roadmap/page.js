'use client'
import { useState } from 'react'
import { Check, Clock, Zap, Circle } from 'lucide-react'

const S = {
  primary:'#7C5CFC', primaryLight:'#BDA9FF', ink:'#1a1235',
  ink2:'#4a4162', muted:'#8b82a0', border:'#E2DCF0',
  accent:'#F0ECFF', accent2:'#E8E0FF', canvas:'#FDFBFF', sidebar:'#1a1235',
}

const Logo = () => (
  <svg width="130" height="38" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rl1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#BDA9FF"/><stop offset="100%" stopColor="#9B7EFF"/></linearGradient>
      <linearGradient id="rl2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#9B7EFF"/><stop offset="100%" stopColor="#7C5CFC"/></linearGradient>
      <linearGradient id="rl3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#7C5CFC"/><stop offset="100%" stopColor="#5B3EDB"/></linearGradient>
    </defs>
    <rect x="0" y="12" width="52" height="9" rx="2.5" fill="url(#rl1)" opacity="0.55"/>
    <rect x="6" y="27" width="52" height="12" rx="2.5" fill="url(#rl2)" opacity="0.8"/>
    <rect x="12" y="45" width="52" height="16" rx="2.5" fill="url(#rl3)"/>
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

const roadmap = [
  {
    quarter: 'Now — Live',
    status: 'shipped',
    items: [
      { title: 'Dashboard with stat cards and priority queue', done: true },
      { title: 'Intake with auto-priority scoring (Impact × Urgency ÷ Effort)', done: true },
      { title: 'Ramp & Onboarding — per-rep progress tracking', done: true },
      { title: '1:1 Notes with Claude AI sentiment analysis', done: true },
      { title: 'Collateral library with usage tracking', done: true },
      { title: 'Sessions scheduling and tracking', done: true },
      { title: 'Pulse checks with custom survey builder', done: true },
      { title: 'Weekly planning board (Must/Should/Could)', done: true },
      { title: 'Forecasting — 4-stage project pipeline', done: true },
      { title: 'Leaderboards with custom metrics', done: true },
      { title: 'Public intake form (enableos.app/submit)', done: true },
      { title: 'Feature request voting board', done: true },
    ]
  },
  {
    quarter: 'Q2 2026 — Building',
    status: 'building',
    items: [
      { title: 'Google SSO — sign in with Google', done: false },
      { title: 'Interactive onboarding walkthrough for new users', done: false },
      { title: 'Demo workspace with sample data', done: false },
      { title: 'Enablement World news feed in platform', done: false },
      { title: 'Newsletter for enablement community', done: false },
    ]
  },
  {
    quarter: 'Q3 2026 — Planned',
    status: 'planned',
    items: [
      { title: 'Google Calendar integration', done: false },
      { title: 'Slack intake bot — submit requests from Slack', done: false },
      { title: 'Salesforce / HubSpot CRM sync', done: false },
      { title: 'Gong integration — call themes into 1:1 notes', done: false },
      { title: 'AI-generated onboarding plans per rep', done: false },
      { title: 'Multi-seat workspaces for larger teams', done: false },
    ]
  },
  {
    quarter: 'Future',
    status: 'future',
    items: [
      { title: 'Enablement ROI dashboard — which assets closed which deals', done: false },
      { title: 'Public-facing hub for reps to self-serve assets', done: false },
      { title: 'Zoom integration for session recording', done: false },
      { title: 'Granola / meeting notes integration', done: false },
      { title: 'Mobile app', done: false },
    ]
  },
]

const statusConfig = {
  shipped: { color: '#059669', bg: '#d1fae5', label: 'Shipped ✓', icon: Check },
  building: { color: S.primary, bg: S.accent2, label: 'In progress', icon: Zap },
  planned: { color: '#1d4ed8', bg: '#dbeafe', label: 'Planned', icon: Clock },
  future: { color: S.muted, bg: S.border, label: 'Future', icon: Circle },
}

export default function Roadmap() {
  return (
    <div style={{ minHeight: '100vh', background: S.canvas, fontFamily: 'var(--font-body)', paddingBottom: 80 }}>
      <nav style={{ borderBottom: `1px solid ${S.border}`, padding: '0 48px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(253,251,255,0.95)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 10 }}>
        <a href="/" style={{ textDecoration: 'none' }}><Logo/></a>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <a href="/feature-requests" style={{ fontSize: 13, color: S.ink2, textDecoration: 'none', fontWeight: 500 }}>Feature Requests</a>
          <a href="/login" style={{ fontSize: 13, color: S.muted, textDecoration: 'none', fontWeight: 500 }}>Log in →</a>
        </div>
      </nav>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '56px 24px 0' }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: S.accent2, color: S.primary, padding: '5px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>Public Roadmap</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: S.ink, marginBottom: 12, lineHeight: 1.2 }}>What we're building</h1>
          <p style={{ fontSize: 16, color: S.ink2, lineHeight: 1.6, maxWidth: 520 }}>We build in public. Here's everything that's live, in progress, and coming next. Want to influence what we build? <a href="/feature-requests" style={{ color: S.primary, textDecoration: 'none', fontWeight: 600 }}>Vote on feature requests →</a></p>
        </div>

        {roadmap.map((section, si) => {
          const cfg = statusConfig[section.status]
          return (
            <div key={si} style={{ marginBottom: 48 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <cfg.icon size={16} color={cfg.color} strokeWidth={2.5}/>
                </div>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: S.ink, marginBottom: 2 }}>{section.quarter}</h2>
                  <span style={{ background: cfg.bg, color: cfg.color, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{cfg.label}</span>
                </div>
              </div>
              <div style={{ marginLeft: 44 }}>
                {section.items.map((item, ii) => (
                  <div key={ii} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 8, marginBottom: 6, background: '#fff', border: `1px solid ${S.border}` }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: item.done ? '#059669' : section.status === 'building' ? S.accent2 : S.border, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {item.done
                        ? <Check size={11} color="#fff" strokeWidth={3}/>
                        : section.status === 'building'
                        ? <div style={{ width: 8, height: 8, borderRadius: '50%', background: S.primary }}/>
                        : <div style={{ width: 6, height: 6, borderRadius: '50%', background: S.muted }}/>
                      }
                    </div>
                    <span style={{ fontSize: 14, color: item.done ? S.muted : S.ink2, textDecoration: item.done ? 'line-through' : 'none', fontWeight: item.done ? 400 : 500 }}>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        <div style={{ background: S.sidebar, borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 10 }}>Want to shape what we build?</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>Vote on existing feature requests or submit your own.</p>
          <a href="/feature-requests" style={{ background: S.primary, color: '#fff', padding: '12px 24px', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)', display: 'inline-block' }}>View feature requests →</a>
        </div>
      </div>
    </div>
  )
}
