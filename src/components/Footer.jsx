import React from 'react';
import { Link } from 'react-router-dom';
import { CATS } from '../config/constants';

function Footer() {
    return (
        <footer style={{ background: "var(--v)", color: "var(--b)", marginTop: 56 }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "44px 20px 20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 28, marginBottom: 32 }}>
                    <div>
                        <div style={{ fontFamily: "var(--fh)", fontSize: "1.9rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-.02em", marginBottom: 8 }}>Cumbre</div>
                        <p style={{ fontFamily: "var(--fb)", fontSize: ".82rem", color: "rgba(255,255,255,.45)", lineHeight: 1.7, maxWidth: 200 }}>Medio editorial especializado en montañismo y turismo responsable en Latinoamérica.</p>
                    </div>
                    <div>
                        <div style={{ fontFamily: "var(--fh)", fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".15em", color: "var(--a)", marginBottom: 10 }}>Secciones</div>
                        {CATS.map(c => (
                            <Link key={c} to={`/categoria/${c}`} style={{ display: "block", textDecoration: "none", fontFamily: "var(--fb)", fontSize: ".82rem", color: "rgba(255,255,255,.45)", padding: "2px 0", cursor: "pointer", textAlign: "left" }}>{c}</Link>
                        ))}
                    </div>
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,.1)", paddingTop: 16, display: "flex", justifyContent: "space-between", fontFamily: "var(--fb)", fontSize: ".72rem", color: "rgba(255,255,255,.28)" }}>
                    <span>© {new Date().getFullYear()} Cumbre Editorial</span>
                    <span>Hecho con respeto por las montañas 🏔</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
