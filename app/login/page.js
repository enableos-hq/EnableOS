"use client";
import { useState } from "react";
import { Layers, ArrowRight, Mail, Lock, Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setError(error.message); setLoading(false); }
      else { window.location.href = "/app"; }
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: email.split("@")[0] } } });
      if (error) { setError(error.message); setLoading(false); }
      else { setMessage("Check your email for a confirmation link, then come back and log in."); setLoading(false); }
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#09090b", fontFamily: "'DM Sans',system-ui,sans-serif", padding: 24 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        *{box-sizing:border-box;margin:0}body{margin:0;background:#09090b}
        .dp{font-family:'Instrument Serif',Georgia,serif;letter-spacing:-0.01em}
        .mn{font-family:'JetBrains Mono',monospace}
        ::selection{background:#8b5cf6;color:white}
      `}</style>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><Layers size={24} color="white" /></div>
          <div className="dp" style={{ fontSize: 28, color: "#fafafa" }}>Enable<b>OS</b></div>
          <p style={{ fontSize: 14, color: "#71717a", marginTop: 8 }}>{mode === "login" ? "Welcome back" : "Create your account"}</p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ position: "relative" }}>
            <Mail size={16} color="#52525b" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required style={{ width: "100%", padding: "14px 14px 14px 42px", background: "#18181b", border: "1.5px solid #27272a", borderRadius: 10, color: "#fafafa", fontSize: 14, fontFamily: "inherit" }} />
          </div>
          <div style={{ position: "relative" }}>
            <Lock size={16} color="#52525b" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required minLength={6} style={{ width: "100%", padding: "14px 14px 14px 42px", background: "#18181b", border: "1.5px solid #27272a", borderRadius: 10, color: "#fafafa", fontSize: 14, fontFamily: "inherit" }} />
          </div>
          {error && <div style={{ padding: "10px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, fontSize: 12, color: "#dc2626" }}>{error}</div>}
          {message && <div style={{ padding: "10px 14px", background: "#ecfdf5", border: "1px solid #bbf7d0", borderRadius: 8, fontSize: 12, color: "#059669" }}>{message}</div>}
          <button type="submit" disabled={loading} style={{ width: "100%", padding: 14, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: loading ? "wait" : "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: loading ? 0.7 : 1 }}>
            {loading ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> : null}
            {mode === "login" ? "Log in" : "Sign up"}
            {!loading && <ArrowRight size={14} />}
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(null); setMessage(null); }} style={{ background: "none", border: "none", color: "#6366f1", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
            {mode === "login" ? "No account? Sign up" : "Already have an account? Log in"}
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <a href="/" style={{ fontSize: 12, color: "#52525b", textDecoration: "none" }}>Back to enableos.app</a>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
