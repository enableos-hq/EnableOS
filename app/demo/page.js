'use client'
import { useState, useEffect } from 'react'
import { createClient } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard, Inbox, Users, MessageSquare, BookOpen,
  Video, Activity, Calendar, TrendingUp, Trophy, Settings,
  LogOut, Plus, X, Check, Sparkles, Target, Star,
  ThumbsUp, ArrowRight, Zap, ChevronRight
} from 'lucide-react'

const supabase = createClient()
const DEMO_EMAIL = 'enableos.hq@gmail.com'

const S = {
  sidebar: '#1a1235', canvas: '#FDFBFF', primary: '#7C5CFC',
  primaryHover: '#9B7EFF', primaryLight: '#BDA9FF',
  accentBg: '#F0ECFF', accentBg2: '#E8E0FF', ink: '#1a1235',
  inkSecondary: '#4a4162', muted: '#8b82a0', border: '#E2DCF0',
  borderLight: '#F0ECF8', success: '#059669', warning: '#d97706', error: '#dc2626',
}

const SidebarLogo = () => (
  <svg width="110" height="34" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="dl1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#BDA9FF"/><stop offset="100%" stopColor="#9B7EFF"/></linearGradient>
      <linearGradient id="dl2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#9B7EFF"/><stop offset="100%" stopColor="#7C5CFC"/></linearGradient>
      <linearGradient id="dl3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#7C5CFC"/><stop offset="100%" stopColor="#5B3EDB"/></linearGradient>
    </defs>
    <rect x="0" y="12" width="52" height="9" rx="2.5" fill="url(#dl1)" opacity="0.45"/>
    <rect x="6" y="27" width="52" height="12" rx="2.5" fill="url(#dl2)" opacity="0.75"/>
    <rect x="12" y="45" width="52" height="16" rx="2.5" fill="url(#dl3)"/>
    <line x1="6" y1="27" x2="0" y2="21" stroke="#BDA9FF" strokeWidth="0.8" opacity="0.4"/>
    <line x1="12" y1="45" x2="6" y2="39" stroke="#9B7EFF" strokeWidth="0.8" opacity="0.5"/>
    <line x1="58" y1="27" x2="52" y2="21" stroke="#BDA9FF" strokeWidth="0.8" opacity="0.4"/>
    <line x1="64" y1="45" x2="58" y2="39" stroke="#9B7EFF" strokeWidth="0.8" opacity="0.5"/>
    <circle cx="59" cy="53" r="3" fill="#ffffff" opacity="0.85"/>
    <circle cx="50" cy="53" r="3" fill="#BDA9FF" opacity="0.7"/>
    <text x="82" y="58" fontFamily="Libre Baskerville,Georgia,serif" fontSize="38" fontWeight="400" fill="#ffffff">Enable</text>
    <text x="222" y="58" fontFamily="Libre Baskerville,Georgia,serif" fontSize="38" fontWeight="700" fill="#BDA9FF">OS</text>
  </svg>
)

// ── WORKSPACE SWITCHER ────────────────────────────────────────────────────────
const WORKSPACES = [
  { id: 'admin', label: 'Admin', path: '/admin', color: '#dc2626', desc: 'Platform overview' },
  { id: 'personal', label: 'Personal', path: '/app', color: '#7C5CFC', desc: 'My enablement workspace' },
  { id: 'demo', label: 'Demo', path: '/demo', color: '#059669', desc: 'Sample data & walkthrough' },
]

function WorkspaceSwitcher({ current }) {
  const [open, setOpen] = useState(false)
  const currentWS = WORKSPACES.find(w => w.id === current)
  return (
    <div style={{ position: 'relative', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12, marginTop: 4, marginBottom: 10 }}>
      <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)', padding: '0 8px', marginBottom: 6 }}>Workspace</div>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.05)', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: currentWS?.color, flexShrink: 0 }} />
        <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: '#fff', textAlign: 'left' }}>{currentWS?.label}</span>
        <ChevronRight size={12} color="rgba(255,255,255,0.3)" style={{ transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>
      {open && (
        <div style={{ position: 'absolute', bottom: '100%', left: 0, right: 0, background: '#2a2040', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: 6, marginBottom: 4, zIndex: 100, boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)', padding: '6px 8px 8px' }}>Switch workspace</div>
          {WORKSPACES.map(ws => (
            <a key={ws.id} href={ws.path} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 7, textDecoration: 'none', background: ws.id === current ? 'rgba(255,255,255,0.08)' : 'transparent', marginBottom: 2 }}
              onMouseEnter={e => { if (ws.id !== current) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
              onMouseLeave={e => { if (ws.id !== current) e.currentTarget.style.background = 'transparent' }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: ws.color + '25', border: `1px solid ${ws.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: ws.color }} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: ws.id === current ? '#fff' : 'rgba(255,255,255,0.6)', marginBottom: 1 }}>{ws.label}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{ws.desc}</div>
              </div>
              {ws.id === current && <Check size={12} color="rgba(255,255,255,0.5)" style={{ marginLeft: 'auto' }} />}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

// ── DEMO DATA ─────────────────────────────────────────────────────────────────
const DEMO = {
  reps: [
    { id: 1, name: 'Alex Chen', pct: 78, sections: { 'Company & Culture': [true,true,true,false], 'Sales Process': [true,true,false,false], 'Product Deep Dive': [true,false,false,false], 'Outbound Mastery': [false,false,false,false], 'Live Certification': [false,false,false,false] } },
    { id: 2, name: 'Priya Sharma', pct: 52, sections: { 'Company & Culture': [true,true,false,false], 'Sales Process': [true,false,false,false], 'Product Deep Dive': [false,false,false,false], 'Outbound Mastery': [false,false,false,false], 'Live Certification': [false,false,false,false] } },
    { id: 3, name: 'Marcus O.', pct: 91, sections: { 'Company & Culture': [true,true,true,true], 'Sales Process': [true,true,true,true], 'Product Deep Dive': [true,true,true,false], 'Outbound Mastery': [true,true,false,false], 'Live Certification': [false,false,false,false] } },
  ],
  requests: [
    { id:1, title:'Battlecard refresh — CompX pricing change', bucket:'Collateral', status:'open', priority:9, impact:5, urgency:4, effort:2, desc:'CompX dropped prices last week, our deck is outdated' },
    { id:2, title:'New hire onboarding deck — Q2 cohort', bucket:'Onboarding', status:'in-progress', priority:7, impact:4, urgency:4, effort:3, desc:'5 new AEs starting May 1st' },
    { id:3, title:'Cold outreach sequence Q2', bucket:'Training Session', status:'open', priority:5, impact:3, urgency:3, effort:3, desc:'Current sequence getting low reply rates' },
    { id:4, title:'Discovery call framework update', bucket:'Process', status:'done', priority:4, impact:4, urgency:2, effort:4, desc:'Updated MEDDIC to include new qualification criteria' },
  ],
  notes: [
    { id:1, rep:'Alex Chen', date:'April 21, 2026', sentiment:'concern', agenda:'Pipeline review, demo prep for Acme call', action:'Run discovery call roleplay before next pipeline review', theme:'Confidence Gap', session:'Live objection handling workshop' },
    { id:2, rep:'Priya Sharma', date:'April 14, 2026', sentiment:'positive', agenda:'Q2 goals, first MQL celebration', action:'Give more autonomy — she\'s ready for solo demos', theme:'Momentum', session:'Advanced demo certification' },
  ],
  collaterals: [
    { id:1, title:'CompX Battle Card', type:'Battle Card', uses:23, desc:'Competitive positioning vs CompX', c:'red' },
    { id:2, title:'Discovery Call Framework', type:'Framework', uses:41, desc:'MEDDIC-based discovery for AEs', c:'purple' },
    { id:3, title:'Product One-Pager', type:'One-Pager', uses:18, desc:'Single-page overview for champions', c:'green' },
    { id:4, title:'Cold Email Sequence', type:'Sequence', uses:67, desc:'8-touch sequence with LinkedIn + email + call', c:'purple' },
    { id:5, title:'Onboarding Checklist', type:'Template', uses:12, desc:'New hire 30-60-90 day tracking', c:'yellow' },
    { id:6, title:'Objection Handling Guide', type:'Guide', uses:29, desc:'Top 15 objections with responses', c:'gray' },
  ],
  featureRequests: [
    { title: 'Enablement ROI dashboard', votes: 34, status: 'roadmap', category: 'Analytics' },
    { title: 'Google Calendar integration', votes: 28, status: 'planned', category: 'Integrations' },
    { title: 'Slack intake bot', votes: 26, status: 'planned', category: 'Integrations' },
    { title: 'Salesforce / HubSpot CRM sync', votes: 22, status: 'planned', category: 'Integrations' },
    { title: 'AI-generated onboarding plans per rep', votes: 19, status: 'considering', category: 'AI' },
    { title: 'Multi-seat workspaces', votes: 17, status: 'roadmap', category: 'Platform' },
    { title: 'Gong integration — call themes into 1:1 notes', votes: 14, status: 'considering', category: 'Integrations' },
  ],
  todos: [
    { id:1, title:'Finish battlecard draft', bucket:'must', done:true },
    { id:2, title:'Run Alex discovery roleplay', bucket:'must', done:false },
    { id:3, title:'Send week 4 pulse check', bucket:'must', done:false },
    { id:4, title:'Update onboarding tracker', bucket:'should', done:false },
    { id:5, title:'Schedule Q2 sessions', bucket:'should', done:false },
    { id:6, title:'Review collateral usage stats', bucket:'should', done:false },
    { id:7, title:'Draft LinkedIn post', bucket:'could', done:false },
    { id:8, title:'Research AI coaching tools', bucket:'could', done:false },
  ],
}

// ── SHARED UI ─────────────────────────────────────────────────────────────────
function Card({ children, style }) {
  return <div style={{ background:'#fff', border:`1px solid ${S.borderLight}`, borderRadius:12, padding:20, ...style }}>{children}</div>
}
function Badge({ children, color='purple' }) {
  const colors = { purple:{bg:S.accentBg2,text:S.primary}, green:{bg:'#d1fae5',text:S.success}, yellow:{bg:'#fef3c7',text:S.warning}, red:{bg:'#fee2e2',text:S.error}, gray:{bg:S.borderLight,text:S.muted} }
  const c = colors[color]||colors.gray
  return <span style={{ background:c.bg, color:c.text, borderRadius:100, padding:'3px 10px', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em' }}>{children}</span>
}
function Btn({ children, onClick, variant='primary', size='md', disabled, style }) {
  const base = { display:'inline-flex', alignItems:'center', gap:6, fontFamily:'var(--font-body)', fontWeight:600, cursor:disabled?'not-allowed':'pointer', border:'none', transition:'all 0.15s', opacity:disabled?0.5:1, borderRadius:size==='sm'?6:8, fontSize:size==='sm'?12:14, padding:size==='sm'?'6px 12px':'10px 18px', ...style }
  const variants = { primary:{background:S.ink,color:'#fff'}, ghost:{background:'transparent',color:S.inkSecondary,border:`1px solid ${S.border}`}, purple:{background:S.primary,color:'#fff'} }
  return <button onClick={onClick} disabled={disabled} style={{...base,...variants[variant]}}>{children}</button>
}

// ── WALKTHROUGH ───────────────────────────────────────────────────────────────
const STEPS = [
  { id:'dashboard', title:'Welcome to EnableOS 👋', desc:'This is your command centre. See open requests, ramping reps, must-do tasks, and ramp progress at a glance. Everything you need in one view.', highlight:'Dashboard' },
  { id:'intake', title:'Intake — your request queue', desc:'Every enablement request comes here. Impact × Urgency ÷ Effort = auto priority score. No more guessing what to build next. You can also share a public link so reps submit directly.', highlight:'Intake' },
  { id:'ramp', title:'Ramp & Onboarding', desc:'Track every rep\'s onboarding progress across 5 sections. See who\'s ahead, who\'s behind, check off items as they complete them. No more spreadsheet ramp trackers.', highlight:'Ramp & Onboarding' },
  { id:'notes', title:'1:1 Notes with AI', desc:'Write your private coaching notes and shared agendas. Claude AI analyzes sentiment, flags reps at risk, and suggests your next coaching action automatically.', highlight:'1:1 Notes' },
  { id:'collaterals', title:'Collateral library', desc:'Every asset in one place with usage tracking. See what\'s actually being used and what\'s collecting dust. Add impact stories to prove ROI.', highlight:'Collaterals' },
  { id:'planning', title:'Weekly planning board', desc:'Must Do / Should Do / Could Do. Simple kanban for your weekly priorities. Check things off as you go, track your completion rate.', highlight:'Weekly Planning' },
]

function Walkthrough({ onClose, onNavigate }) {
  const [step, setStep] = useState(0)
  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  return (
    <div style={{ position:'fixed', inset:0, zIndex:1000, pointerEvents:'none' }}>
      {/* Overlay */}
      <div style={{ position:'absolute', inset:0, background:'rgba(26,18,53,0.5)', backdropFilter:'blur(2px)', pointerEvents:'all' }} onClick={onClose} />
      {/* Card */}
      <div style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)', width:480, background:'#fff', borderRadius:16, boxShadow:'0 24px 64px rgba(26,18,53,0.3)', pointerEvents:'all', overflow:'hidden' }}>
        {/* Progress bar */}
        <div style={{ height:3, background:S.borderLight }}>
          <div style={{ height:'100%', width:`${((step+1)/STEPS.length)*100}%`, background:`linear-gradient(90deg,${S.primary},${S.primaryHover})`, transition:'width 0.3s' }} />
        </div>
        <div style={{ padding:28 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:S.accentBg2, color:S.primary, padding:'4px 10px', borderRadius:100, fontSize:11, fontWeight:700, marginBottom:10 }}>
                Step {step+1} of {STEPS.length}
              </div>
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:700, color:S.ink, marginBottom:8 }}>{current.title}</h3>
              <p style={{ fontSize:14, color:S.inkSecondary, lineHeight:1.65 }}>{current.desc}</p>
            </div>
            <button onClick={onClose} style={{ background:'none', border:'none', color:S.muted, cursor:'pointer', flexShrink:0, marginLeft:16 }}><X size={18}/></button>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:20 }}>
            <div style={{ display:'flex', gap:6 }}>
              {STEPS.map((_,i) => (
                <div key={i} style={{ width:i===step?20:6, height:6, borderRadius:3, background:i<=step?S.primary:S.borderLight, transition:'all 0.3s' }} />
              ))}
            </div>
            <div style={{ display:'flex', gap:10 }}>
              {step > 0 && <Btn variant="ghost" size="sm" onClick={() => { setStep(step-1); onNavigate(STEPS[step-1].id) }}>Back</Btn>}
              {isLast
                ? <Btn size="sm" onClick={onClose}>Done — let's go! 🚀</Btn>
                : <Btn size="sm" onClick={() => { setStep(step+1); onNavigate(STEPS[step+1].id) }}>Next <ChevronRight size={14}/></Btn>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── VIEWS ─────────────────────────────────────────────────────────────────────
function Dashboard() {
  const stats = [
    { label:'Open Requests', value:3, color:S.primary, icon:'📥' },
    { label:'Ramping Reps', value:3, color:S.success, icon:'👥' },
    { label:'Must-Do Tasks', value:2, color:S.warning, icon:'🎯' },
    { label:'Avg Ramp', value:'74%', color:'#8b5cf6', icon:'📈' },
  ]
  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:26, fontWeight:700, color:S.ink, marginBottom:4 }}>Good morning 👋</h1>
        <p style={{ color:S.inkSecondary, fontSize:14 }}>Here's what's happening with your team today.</p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:20 }}>
        {stats.map(s => (
          <Card key={s.label}>
            <div style={{ fontSize:24, marginBottom:8 }}>{s.icon}</div>
            <div style={{ fontSize:26, fontWeight:700, color:S.ink, fontFamily:'var(--font-display)', marginBottom:2 }}>{s.value}</div>
            <div style={{ fontSize:12, color:S.muted }}>{s.label}</div>
          </Card>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
        <Card>
          <h3 style={{ fontWeight:700, fontSize:14, color:S.ink, marginBottom:14, fontFamily:'var(--font-display)' }}>Priority Queue</h3>
          {DEMO.requests.filter(r=>r.status!=='done').slice(0,3).map(r => (
            <div key={r.id} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', background:S.accentBg, borderRadius:8, marginBottom:8 }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:r.priority>=8?S.error:r.priority>=6?S.warning:S.primary, flexShrink:0 }} />
              <span style={{ fontSize:13, color:S.inkSecondary, flex:1 }}>{r.title}</span>
              <span style={{ fontSize:11, fontWeight:700, color:S.primary }}>P:{r.priority}</span>
            </div>
          ))}
        </Card>
        <Card>
          <h3 style={{ fontWeight:700, fontSize:14, color:S.ink, marginBottom:14, fontFamily:'var(--font-display)' }}>Ramp Snapshot</h3>
          {DEMO.reps.map(r => (
            <div key={r.id} style={{ marginBottom:14 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                <span style={{ fontSize:13, fontWeight:600, color:S.ink }}>{r.name}</span>
                <span style={{ fontSize:13, color:S.primary, fontWeight:700 }}>{r.pct}%</span>
              </div>
              <div style={{ height:5, background:S.borderLight, borderRadius:3 }}>
                <div style={{ height:'100%', width:`${r.pct}%`, background:`linear-gradient(90deg,${S.primary},${S.primaryHover})`, borderRadius:3 }} />
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}

function Intake() {
  const [filter, setFilter] = useState('all')
  const buckets = ['all','Collateral','Training Session','Onboarding','Process']
  const filtered = filter==='all' ? DEMO.requests : DEMO.requests.filter(r=>r.bucket===filter)
  const statusColor = { open:'purple', 'in-progress':'yellow', done:'green' }
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
        <div><h1 style={{ fontFamily:'var(--font-display)', fontSize:24, fontWeight:700, color:S.ink }}>Intake</h1><p style={{ color:S.muted, fontSize:14 }}>Demo workspace — sample requests</p></div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <a href="/submit" target="_blank" style={{ fontSize:13, color:S.primary, textDecoration:'none', fontWeight:600, border:`1px solid ${S.primary}`, padding:'7px 14px', borderRadius:8 }}>Share public form →</a>
        </div>
      </div>
      <div style={{ display:'flex', gap:7, marginBottom:16, flexWrap:'wrap' }}>
        {buckets.map(b => (
          <button key={b} onClick={() => setFilter(b)} style={{ padding:'5px 12px', borderRadius:100, border:`1px solid ${filter===b?S.primary:S.border}`, background:filter===b?S.accentBg2:'transparent', color:filter===b?S.primary:S.inkSecondary, fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'var(--font-body)' }}>{b==='all'?'All':b}</button>
        ))}
      </div>
      {filtered.map(r => (
        <Card key={r.id} style={{ marginBottom:10, padding:'14px 18px' }}>
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                <span style={{ fontWeight:700, fontSize:14, color:S.ink }}>{r.title}</span>
                <Badge color={statusColor[r.status]||'gray'}>{r.status}</Badge>
                <Badge color="gray">{r.bucket}</Badge>
              </div>
              <p style={{ fontSize:13, color:S.muted, marginBottom:8 }}>{r.desc}</p>
              <div style={{ display:'flex', gap:14, fontSize:12, color:S.muted }}>
                <span>Impact: <b style={{ color:S.inkSecondary }}>{r.impact}</b></span>
                <span>Urgency: <b style={{ color:S.inkSecondary }}>{r.urgency}</b></span>
                <span>Effort: <b style={{ color:S.inkSecondary }}>{r.effort}</b></span>
                <span style={{ color:S.primary, fontWeight:700 }}>Priority: {r.priority}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

function Ramp() {
  const [selected, setSelected] = useState(DEMO.reps[0])
  const sections = ['Company & Culture','Sales Process','Product Deep Dive','Outbound Mastery','Live Certification']
  const sectionItems = {
    'Company & Culture':['Company history & mission','ICP and buyer personas','Competitive landscape','Internal tools & tech stack'],
    'Sales Process':['Discovery call framework','Demo flow walkthrough','Objection handling','Pipeline management'],
    'Product Deep Dive':['Core product features','Integration ecosystem','Pricing & packaging','Customer use cases'],
    'Outbound Mastery':['Cold email sequences','LinkedIn outreach','Cold call framework','Social selling tactics'],
    'Live Certification':['Discovery call roleplay','Demo certification','Objection handling test','Manager sign-off'],
  }
  return (
    <div style={{ display:'flex', gap:16, height:'calc(100vh - 120px)' }}>
      <div style={{ width:180, background:'#fff', border:`1px solid ${S.borderLight}`, borderRadius:12, padding:14, flexShrink:0 }}>
        <div style={{ fontWeight:700, fontSize:12, color:S.ink, marginBottom:12 }}>Reps</div>
        {DEMO.reps.map(r => (
          <div key={r.id} onClick={() => setSelected(r)} style={{ padding:'9px 10px', borderRadius:8, marginBottom:3, cursor:'pointer', background:selected.id===r.id?S.accentBg2:'transparent', border:`1px solid ${selected.id===r.id?S.primary+'40':'transparent'}` }}>
            <div style={{ fontWeight:600, fontSize:12, color:S.ink, marginBottom:4 }}>{r.name}</div>
            <div style={{ display:'flex', alignItems:'center', gap:5 }}>
              <div style={{ flex:1, height:3, background:S.borderLight, borderRadius:2 }}><div style={{ height:'100%', width:`${r.pct}%`, background:S.primary, borderRadius:2 }}/></div>
              <span style={{ fontSize:10, color:S.primary, fontWeight:700 }}>{r.pct}%</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ flex:1, overflowY:'auto' }}>
        <div style={{ marginBottom:20 }}>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:700, color:S.ink }}>{selected.name}</h1>
          <p style={{ color:S.muted, fontSize:13 }}>{selected.pct}% complete</p>
        </div>
        {sections.map(sec => {
          const checks = selected.sections[sec]
          const done = checks.filter(Boolean).length
          return (
            <Card key={sec} style={{ marginBottom:12 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
                <span style={{ fontWeight:700, fontSize:14, color:S.ink }}>{sec}</span>
                <Badge color={done===4?'green':'gray'}>{done}/4</Badge>
              </div>
              {sectionItems[sec].map((item,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'6px 8px', borderRadius:6, marginBottom:3 }}>
                  <div style={{ width:16, height:16, borderRadius:4, border:`2px solid ${checks[i]?S.primary:S.border}`, background:checks[i]?S.primary:'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    {checks[i] && <Check size={9} color="#fff" strokeWidth={3}/>}
                  </div>
                  <span style={{ fontSize:13, color:checks[i]?S.muted:S.inkSecondary, textDecoration:checks[i]?'line-through':'none' }}>{item}</span>
                </div>
              ))}
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function Notes() {
  const [selected, setSelected] = useState(DEMO.notes[0])
  const sentimentColor = { positive:'green', neutral:'gray', concern:'red' }
  return (
    <div style={{ display:'flex', gap:16, height:'calc(100vh - 120px)' }}>
      <div style={{ width:160, background:'#fff', border:`1px solid ${S.borderLight}`, borderRadius:12, padding:14, flexShrink:0 }}>
        <div style={{ fontWeight:700, fontSize:12, color:S.ink, marginBottom:12 }}>Reps</div>
        {DEMO.reps.map(r => (
          <div key={r.id} onClick={() => setSelected(DEMO.notes.find(n=>n.rep===r.name)||DEMO.notes[0])} style={{ padding:'9px 10px', borderRadius:8, marginBottom:3, cursor:'pointer', background:selected.rep===r.name?S.accentBg2:'transparent', border:`1px solid ${selected.rep===r.name?S.primary+'40':'transparent'}` }}>
            <span style={{ fontWeight:600, fontSize:12, color:S.ink }}>{r.name}</span>
          </div>
        ))}
      </div>
      <div style={{ flex:1, overflowY:'auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <div><h1 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:700, color:S.ink }}>1:1 Notes</h1><p style={{ color:S.muted, fontSize:13 }}>Notes for {selected.rep}</p></div>
        </div>
        <Card style={{ marginBottom:12 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
            <span style={{ fontSize:12, color:S.muted }}>{selected.date}</span>
            <Badge color={sentimentColor[selected.sentiment]||'gray'}>{selected.sentiment}</Badge>
          </div>
          <div style={{ marginBottom:10 }}>
            <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em', color:S.muted, marginBottom:4 }}>Shared Agenda</div>
            <p style={{ fontSize:14, color:S.inkSecondary }}>{selected.agenda}</p>
          </div>
          <div style={{ marginTop:12, padding:'12px 14px', background:S.accentBg, borderRadius:8, borderLeft:`3px solid ${S.primary}` }}>
            <div style={{ fontSize:11, fontWeight:700, color:S.primary, marginBottom:8, display:'flex', alignItems:'center', gap:5 }}><Sparkles size={12}/>AI Analysis</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:8 }}>
              <div><div style={{ fontSize:10, color:S.muted, marginBottom:3 }}>Theme</div><span style={{ fontSize:13, fontWeight:600, color:S.ink }}>{selected.theme}</span></div>
            </div>
            <div style={{ fontSize:10, color:S.muted, marginBottom:3 }}>Suggested Action</div>
            <p style={{ fontSize:13, color:S.inkSecondary, marginBottom:8 }}>{selected.action}</p>
            <div style={{ fontSize:10, color:S.muted, marginBottom:3 }}>Session Idea</div>
            <p style={{ fontSize:13, color:S.primary }}>{selected.session}</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

function Collaterals() {
  const typeColors = { 'Battle Card':'red', 'Framework':'purple', 'One-Pager':'green', 'Template':'yellow', 'Guide':'gray', 'Sequence':'purple' }
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
        <div><h1 style={{ fontFamily:'var(--font-display)', fontSize:24, fontWeight:700, color:S.ink }}>Collaterals</h1><p style={{ color:S.muted, fontSize:14 }}>Demo asset library</p></div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:14 }}>
        {DEMO.collaterals.map(item => (
          <Card key={item.id}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
              <Badge color={typeColors[item.type]||'gray'}>{item.type}</Badge>
              <span style={{ fontSize:12, color:S.muted }}>{item.uses} uses</span>
            </div>
            <h3 style={{ fontWeight:700, fontSize:14, color:S.ink, marginBottom:5 }}>{item.title}</h3>
            <p style={{ fontSize:13, color:S.muted }}>{item.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

function Planning() {
  const [todos, setTodos] = useState(DEMO.todos)
  const buckets = [
    { key:'must', label:'Must Do', color:S.error, bg:'#fff5f5' },
    { key:'should', label:'Should Do', color:S.warning, bg:'#fffbeb' },
    { key:'could', label:'Could Do', color:S.primary, bg:S.accentBg },
  ]
  const done = todos.filter(t=>t.done).length
  return (
    <div>
      <div style={{ marginBottom:20 }}>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:24, fontWeight:700, color:S.ink, marginBottom:8 }}>Weekly Planning</h1>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:200, height:5, background:S.borderLight, borderRadius:3 }}><div style={{ height:'100%', width:`${(done/todos.length)*100}%`, background:S.primary, borderRadius:3 }}/></div>
          <span style={{ fontSize:12, color:S.muted }}>{done}/{todos.length} complete</span>
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
        {buckets.map(b => (
          <div key={b.key} style={{ background:b.bg, border:`1px solid ${b.color}20`, borderRadius:12, padding:14 }}>
            <div style={{ fontWeight:700, fontSize:13, color:b.color, marginBottom:12 }}>{b.label}</div>
            {todos.filter(t=>t.bucket===b.key).map(t => (
              <div key={t.id} style={{ background:'#fff', borderRadius:8, padding:'10px 12px', display:'flex', alignItems:'center', gap:8, marginBottom:7, border:`1px solid ${S.borderLight}` }}>
                <div onClick={() => setTodos(todos.map(x=>x.id===t.id?{...x,done:!x.done}:x))} style={{ width:16, height:16, borderRadius:4, border:`2px solid ${t.done?b.color:S.border}`, background:t.done?b.color:'transparent', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0 }}>
                  {t.done && <Check size={9} color="#fff" strokeWidth={3}/>}
                </div>
                <span style={{ fontSize:13, color:t.done?S.muted:S.ink, textDecoration:t.done?'line-through':'none' }}>{t.title}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function FeatureRequestsView() {
  const [voted, setVoted] = useState([])
  const [votes, setVotes] = useState(Object.fromEntries(DEMO.featureRequests.map((f,i)=>[i,f.votes])))
  const statusStyle = {
    planned:{bg:'#dbeafe',color:'#1d4ed8',label:'Planned'},
    considering:{bg:S.accentBg2,color:S.primary,label:'Considering'},
    roadmap:{bg:'#d1fae5',color:'#065f46',label:'On Roadmap'},
  }
  const vote = (i) => {
    if(voted.includes(i)) return
    setVoted([...voted,i])
    setVotes({...votes,[i]:votes[i]+1})
  }
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
        <div><h1 style={{ fontFamily:'var(--font-display)', fontSize:24, fontWeight:700, color:S.ink }}>Feature Requests</h1><p style={{ color:S.muted, fontSize:14 }}>Real votes from the EnableOS community</p></div>
        <a href="/feature-requests" target="_blank" style={{ fontSize:13, color:S.primary, textDecoration:'none', fontWeight:600 }}>Public page →</a>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {DEMO.featureRequests.map((f,i) => {
          const s = statusStyle[f.status]
          const hasVoted = voted.includes(i)
          return (
            <Card key={i} style={{ padding:'14px 18px', display:'flex', alignItems:'center', gap:14 }}>
              <button onClick={() => vote(i)} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2, background:hasVoted?S.accentBg2:S.accentBg, border:`1px solid ${hasVoted?S.primary:S.border}`, borderRadius:8, padding:'7px 10px', cursor:hasVoted?'default':'pointer', minWidth:48 }}>
                <ThumbsUp size={13} color={hasVoted?S.primary:S.muted} strokeWidth={2}/>
                <span style={{ fontSize:12, fontWeight:700, color:hasVoted?S.primary:S.muted }}>{votes[i]}</span>
              </button>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:600, fontSize:14, color:S.ink, marginBottom:5 }}>{f.title}</div>
                <div style={{ display:'flex', gap:8 }}>
                  <span style={{ background:s.bg, color:s.color, fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:100, textTransform:'uppercase' }}>{s.label}</span>
                  <span style={{ fontSize:11, color:S.muted }}>{f.category}</span>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

// ── NAV ───────────────────────────────────────────────────────────────────────
const NAV = [
  { id:'dashboard', label:'Dashboard', icon:LayoutDashboard, group:'CORE' },
  { id:'intake', label:'Intake', icon:Inbox, group:'CORE' },
  { id:'ramp', label:'Ramp & Onboarding', icon:Users, group:'CORE' },
  { id:'notes', label:'1:1 Notes', icon:MessageSquare, group:'CORE' },
  { id:'collaterals', label:'Collaterals', icon:BookOpen, group:'CORE' },
  { id:'planning', label:'Weekly Planning', icon:Calendar, group:'OPERATIONS' },
  { id:'featurereqs', label:'Feature Requests', icon:Star, group:null },
  { id:'settings', label:'Settings', icon:Settings, group:null },
]

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function DemoApp() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showWalkthrough, setShowWalkthrough] = useState(false)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user || user.email !== DEMO_EMAIL) { router.push('/login?next=/demo'); return }
      setUser(user)
      setLoading(false)
      // Show walkthrough on first visit
      const seen = localStorage.getItem('eos_demo_walked')
      if (!seen) { setShowWalkthrough(true); localStorage.setItem('eos_demo_walked','1') }
    })
  }, [router])

  const signOut = async () => { await supabase.auth.signOut(); router.push('/login') }

  if (loading) return (
    <div style={{ height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:S.canvas }}>
      <div style={{ textAlign:'center' }}>
        <SidebarLogo />
        <div style={{ color:S.muted, fontSize:13, marginTop:16 }}>Loading demo workspace...</div>
      </div>
    </div>
  )

  const renderView = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard/>
      case 'intake': return <Intake/>
      case 'ramp': return <Ramp/>
      case 'notes': return <Notes/>
      case 'collaterals': return <Collaterals/>
      case 'planning': return <Planning/>
      case 'featurereqs': return <FeatureRequestsView/>
      case 'settings': return (
        <div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:24, fontWeight:700, color:S.ink, marginBottom:4 }}>Settings</h1>
          <p style={{ color:S.muted, fontSize:14, marginBottom:24 }}>Demo workspace — read only</p>
          <Card style={{ marginBottom:14 }}>
            <div style={{ fontWeight:700, fontSize:13, color:S.ink, marginBottom:14 }}>Workspace</div>
            <div style={{ display:'flex', justifyContent:'space-between', padding:'9px 0', borderBottom:`1px solid ${S.borderLight}` }}>
              <span style={{ fontSize:13, color:S.inkSecondary }}>Account</span>
              <span style={{ fontSize:13, color:S.muted }}>{user?.email}</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', padding:'9px 0' }}>
              <span style={{ fontSize:13, color:S.inkSecondary }}>Workspace type</span>
              <Badge color="purple">Demo</Badge>
            </div>
          </Card>
          <Btn variant="danger" onClick={signOut} style={{ background:'#fef2f2', color:S.error, border:'1px solid #fecaca' }}><LogOut size={14}/>Sign Out</Btn>
        </div>
      )
      default: return <Dashboard/>
    }
  }

  return (
    <div style={{ display:'flex', height:'100vh', background:S.canvas, overflow:'hidden' }}>
      {showWalkthrough && <Walkthrough onClose={() => setShowWalkthrough(false)} onNavigate={setActiveTab}/>}

      {/* Sidebar */}
      <div style={{ width:220, background:S.sidebar, display:'flex', flexDirection:'column', flexShrink:0, overflowY:'auto' }}>
        <div style={{ padding:'20px 16px 16px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
          <SidebarLogo/>
          <div style={{ marginTop:8, display:'inline-flex', alignItems:'center', gap:5, background:'rgba(124,92,252,0.2)', border:'1px solid rgba(124,92,252,0.3)', borderRadius:100, padding:'3px 10px' }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:'#a78bfa' }}/>
            <span style={{ fontSize:10, fontWeight:700, color:'#BDA9FF', letterSpacing:'0.08em' }}>DEMO WORKSPACE</span>
          </div>
        </div>
        <nav style={{ flex:1, padding:'14px 10px' }}>
          {['CORE','OPERATIONS'].map(group => (
            <div key={group} style={{ marginBottom:20 }}>
              <div style={{ fontSize:9, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(255,255,255,0.25)', padding:'0 8px', marginBottom:5 }}>{group}</div>
              {NAV.filter(n=>n.group===group).map(item => {
                const active = activeTab===item.id
                return (
                  <button key={item.id} onClick={() => setActiveTab(item.id)} style={{ width:'100%', display:'flex', alignItems:'center', gap:9, padding:'8px 10px', borderRadius:7, border:'none', cursor:'pointer', background:active?`${S.primary}25`:'transparent', color:active?'#fff':'rgba(255,255,255,0.45)', fontSize:12, fontWeight:active?600:400, fontFamily:'var(--font-body)', marginBottom:2, transition:'all 0.15s', textAlign:'left', borderLeft:`2px solid ${active?S.primary:'transparent'}` }}>
                    <item.icon size={14}/>{item.label}
                  </button>
                )
              })}
            </div>
          ))}
          <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:12 }}>
            {NAV.filter(n=>n.group===null).map(item => {
              const active = activeTab===item.id
              return (
                <button key={item.id} onClick={() => setActiveTab(item.id)} style={{ width:'100%', display:'flex', alignItems:'center', gap:9, padding:'8px 10px', borderRadius:7, border:'none', cursor:'pointer', background:active?`${S.primary}25`:'transparent', color:active?'#fff':'rgba(255,255,255,0.45)', fontSize:12, fontWeight:active?600:400, fontFamily:'var(--font-body)', marginBottom:2, transition:'all 0.15s', textAlign:'left', borderLeft:`2px solid ${active?S.primary:'transparent'}` }}>
                  <item.icon size={14}/>{item.label}
                </button>
              )
            })}
          </div>
        </nav>
        <div style={{ padding:'12px 16px', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={() => setShowWalkthrough(true)} style={{ width:'100%', background:'rgba(124,92,252,0.15)', border:'1px solid rgba(124,92,252,0.3)', borderRadius:8, padding:'8px 12px', color:'#BDA9FF', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'var(--font-body)', marginBottom:10, display:'flex', alignItems:'center', gap:7 }}>
            <Sparkles size={13}/>Replay walkthrough
          </button>
          {user?.email === 'enableos.hq@gmail.com' && <WorkspaceSwitcher current="demo" />}
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:28, height:28, borderRadius:'50%', background:`linear-gradient(135deg,${S.primary},#a78bfa)`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <span style={{ color:'#fff', fontSize:11, fontWeight:700 }}>{user?.email?.[0]?.toUpperCase()}</span>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:11, color:'#fff', fontWeight:600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user?.email}</div>
              <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)' }}>Demo workspace</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex:1, overflowY:'auto', padding:'28px 32px' }}>
        {renderView()}
      </div>
    </div>
  )
}
