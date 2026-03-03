import React from 'react';
import { CATS, AUTHS } from '../config/constants';
import { fs } from '../utils/helpers';

function Dash({ arts, onEdit, onNew, onDel }) {
    return (
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "36px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
                <div>
                    <p style={{ fontFamily: "var(--fh)", fontSize: ".62rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--v2)", marginBottom: 4 }}>Panel de control</p>
                    <h1 style={{ fontFamily: "var(--fh)", fontSize: "2rem", fontWeight: 900, textTransform: "uppercase", color: "var(--v)", lineHeight: 1 }}>Editor de Contenido</h1>
                </div>
                <button onClick={onNew} style={{ background: "var(--v)", color: "#fff", border: "none", padding: "11px 22px", fontFamily: "var(--fh)", fontSize: ".75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", cursor: "pointer" }}>+ Nuevo artículo</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 32 }}>
                {[{ l: "Artículos", v: arts.length, c: "var(--v)" }, { l: "Categorías", v: CATS.length, c: "var(--v2)" }, { l: "Autores", v: AUTHS.length, c: "#8B6914" }].map(s => (
                    <div key={s.l} style={{ background: s.c, color: "#fff", padding: "18px" }}>
                        <div style={{ fontFamily: "var(--fh)", fontSize: "2.2rem", fontWeight: 900, lineHeight: 1 }}>{s.v}</div>
                        <div style={{ fontFamily: "var(--fh)", fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", opacity: .75, marginTop: 3 }}>{s.l}</div>
                    </div>
                ))}
            </div>
            <div style={{ borderTop: "2px solid var(--v)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 14, padding: "9px 0", borderBottom: "1px solid rgba(15,61,46,.12)", fontFamily: "var(--fh)", fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "var(--v2)" }}>
                    <span>Título</span><span>Categoría</span><span>Fecha</span><span>Acciones</span>
                </div>
                {arts.map(a => (
                    <div key={a.id} style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 14, padding: "12px 0", alignItems: "center", borderBottom: "1px solid rgba(15,61,46,.06)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            {a.heroImg
                                ? <img src={a.heroImg} alt="" style={{ width: 40, height: 40, objectFit: "cover", flexShrink: 0 }} />
                                : <div style={{ width: 40, height: 40, background: a.hc, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>{a.he}</div>
                            }
                            <div>
                                <div style={{ fontFamily: "var(--fh)", fontSize: ".88rem", fontWeight: 800, textTransform: "uppercase", lineHeight: 1.2 }}>{a.title}</div>
                                <div style={{ fontFamily: "var(--fb)", fontSize: ".72rem", color: "rgba(43,43,43,.4)", marginTop: 2 }}>{a.author}</div>
                            </div>
                        </div>
                        <span className="pill" style={{ fontSize: ".58rem", whiteSpace: "nowrap" }}>{a.category}</span>
                        <span style={{ fontFamily: "var(--fb)", fontSize: ".75rem", color: "rgba(43,43,43,.4)", whiteSpace: "nowrap" }}>{fs(a.publishedAt)}</span>
                        <div style={{ display: "flex", gap: 6 }}>
                            <button onClick={() => onEdit(a)} style={{ background: "var(--vc)", color: "var(--v)", border: "none", padding: "4px 11px", fontFamily: "var(--fh)", fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase", cursor: "pointer" }}>Editar</button>
                            <button onClick={() => onDel(a.id)} style={{ background: "#fde8e8", color: "#8B2020", border: "none", padding: "4px 9px", fontFamily: "var(--fh)", fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase", cursor: "pointer" }}>✕</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dash;
