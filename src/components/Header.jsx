import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header({ isEditor, onLogout }) {
    const navigate = useNavigate();

    return (
        <header style={{ position: "sticky", top: 0, zIndex: 100, background: "var(--v)", boxShadow: "0 2px 16px rgba(0,0,0,.2)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 52 }}>
                <Link to="/" style={{ textDecoration: "none", fontFamily: "var(--fh)", fontSize: "1.75rem", fontWeight: 900, color: "var(--b)", textTransform: "uppercase", letterSpacing: "-.02em" }}>Cumbre</Link>
                <nav style={{ display: "flex", gap: 20, alignItems: "center" }}>
                    <Link to="/categoria/Alta Montaña" style={{ textDecoration: "none", fontFamily: "var(--fh)", fontSize: ".68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "rgba(248,249,247,.65)" }}>Alta Montaña</Link>
                    <Link to="/categoria/Trekking" style={{ textDecoration: "none", fontFamily: "var(--fh)", fontSize: ".68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "rgba(248,249,247,.65)" }}>Trekking</Link>
                    <Link to="/ediciones" style={{ textDecoration: "none", fontFamily: "var(--fh)", fontSize: ".68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "rgba(248,249,247,.65)" }}>Ediciones</Link>
                </nav>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    {isEditor && (
                        <button onClick={() => navigate('/admin')} style={{ background: "var(--a)", color: "var(--v)", border: "none", padding: "5px 14px", fontFamily: "var(--fh)", fontSize: ".68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", cursor: "pointer" }}>✏ Editor</button>
                    )}
                    <button onClick={isEditor ? onLogout : () => navigate('/login')} style={{ background: "none", border: "1px solid rgba(255,255,255,.3)", color: "rgba(255,255,255,.65)", fontFamily: "var(--fh)", fontSize: ".65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", padding: "5px 12px", cursor: "pointer" }}>
                        {isEditor ? "Salir" : "Acceso"}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
