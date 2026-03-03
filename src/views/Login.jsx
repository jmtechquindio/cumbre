import React, { useState } from 'react';

function Login({ onLogin, error }) {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        onLogin(user, pass);
    };

    return (
        <div style={{ minHeight: "100vh", background: "var(--v)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, opacity: .05, backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "12px 12px" }} />
            <svg style={{ position: "absolute", bottom: 0, left: 0, width: "100%", opacity: .07 }} viewBox="0 0 1200 280" fill="white"><polygon points="0,280 180,70 340,190 500,30 660,170 820,5 960,140 1100,55 1200,110 1200,280" /></svg>
            <div style={{ background: "var(--b)", width: "100%", maxWidth: 380, padding: "44px 36px", position: "relative", zIndex: 1, boxShadow: "0 28px 70px rgba(0,0,0,.4)" }}>
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                    <div style={{ fontFamily: "var(--fh)", fontSize: "2.6rem", fontWeight: 900, color: "var(--v)", textTransform: "uppercase", lineHeight: 1 }}>Cumbre</div>
                    <div style={{ fontFamily: "var(--fh)", fontSize: ".6rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--v2)", marginTop: 4 }}>Portal del Editor</div>
                </div>
                <div style={{ width: 36, height: 3, background: "var(--a)", margin: "0 auto 28px" }} />
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 14 }}>
                        <label className="fl">Usuario</label>
                        <input className="inp" value={user} onChange={e => setUser(e.target.value)} placeholder="editor" autoFocus />
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <label className="fl">Contraseña</label>
                        <input className="inp" type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" />
                    </div>
                    {error && <div style={{ background: "#fde8e8", border: "1px solid #f5a5a5", color: "#8B2020", fontFamily: "var(--fh)", fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", padding: "7px 11px", marginBottom: 14 }}>✕ Credenciales incorrectas</div>}
                    <button type="submit" style={{ width: "100%", background: "var(--v)", color: "#fff", border: "none", padding: 13, fontFamily: "var(--fh)", fontSize: ".82rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".12em", cursor: "pointer" }}>Ingresar →</button>
                </form>
                <div style={{ marginTop: 22, textAlign: "center", fontFamily: "var(--fb)", fontSize: ".72rem", color: "rgba(0,0,0,.3)" }}>Demo: <strong>editor</strong> / <strong>cumbre2024</strong></div>
            </div>
        </div>
    );
}

export default Login;
