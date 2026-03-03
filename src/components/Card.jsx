import React, { useState } from 'react';

function Card({ a, onRead, dl }) {
    const [hov, sh] = useState(false);
    return (
        <article className={"fu " + (dl || "s1")} onClick={() => onRead(a)} style={{ cursor: "pointer", animationFillMode: "both" }}>
            <div style={{ overflow: "hidden", aspectRatio: "4/3", background: a.hc, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                {a.heroImg
                    ? <img src={a.heroImg} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
                    : <div style={{ fontSize: "5rem", opacity: .18, position: "absolute", userSelect: "none" }}>{a.he}</div>
                }
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(0,0,0,.04),rgba(0,0,0,.38))" }} />
                <div style={{ position: "absolute", top: 9, left: 9 }}><span className="pill" style={{ fontSize: ".6rem" }}>{a.category}</span></div>
            </div>
            <div style={{ paddingTop: 12 }}>
                <h3 onMouseEnter={() => sh(true)} onMouseLeave={() => sh(false)}
                    style={{ fontFamily: "var(--fh)", fontSize: "1.1rem", fontWeight: 800, textTransform: "uppercase", lineHeight: 1.15, marginBottom: 7, color: hov ? "var(--v2)" : "var(--g)", transition: "color .2s" }}>
                    {a.title}
                </h3>
                <p style={{ fontFamily: "var(--fb)", fontSize: ".82rem", color: "rgba(43,43,43,.6)", lineHeight: 1.6, marginBottom: 8, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{a.excerpt}</p>
                <div style={{ display: "flex", gap: 7, fontFamily: "var(--fb)", fontSize: ".72rem", color: "rgba(43,43,43,.4)" }}>
                    <span>{a.author}</span><span>·</span><span>{new Date(a.publishedAt).toLocaleDateString("es-LA", { month: "short", year: "numeric" })}</span>
                </div>
            </div>
        </article>
    );
}

export default Card;
