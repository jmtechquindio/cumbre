import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { EDNS } from '../config/data';

function EdnsView({ arts }) {
    const navigate = useNavigate();
    const fd = d => new Date(d).toLocaleDateString("es-LA", { day: "numeric", month: "long", year: "numeric" });

    return (
        <div>
            <div style={{ background: "var(--v)", padding: "44px 20px" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <h1 style={{ fontFamily: "var(--fh)", fontSize: "clamp(2.2rem,4.5vw,3.8rem)", fontWeight: 900, textTransform: "uppercase", color: "#fff", lineHeight: 1 }}>Ediciones</h1>
                </div>
            </div>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "44px 20px" }}>
                {EDNS.map((ed, i) => {
                    const ea = arts.slice(i * 2, i * 2 + 2);
                    return (
                        <div key={ed.id} style={{ marginBottom: 44, paddingBottom: 44, borderBottom: "1px solid rgba(15,61,46,.1)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                                <div style={{ background: ed.c, color: "#fff", fontFamily: "var(--fh)", fontSize: "1.4rem", fontWeight: 900, padding: "7px 14px" }}>#{ed.n}</div>
                                <div>
                                    <div style={{ fontFamily: "var(--fh)", fontSize: "1.1rem", fontWeight: 800, textTransform: "uppercase", color: "var(--v)" }}>{ed.desc}</div>
                                    <div style={{ fontFamily: "var(--fb)", fontSize: ".78rem", color: "rgba(43,43,43,.4)" }}>{fd(ed.date)}</div>
                                </div>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 22 }}>
                                {ea.map((a, j) => <Card key={a.id} a={a} onRead={() => navigate(`/articulo/${a.id}`)} dl={"s" + (j + 1)} />)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default EdnsView;
