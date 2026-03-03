import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeroZone from '../components/HeroZone';
import Card from '../components/Card';

function ArticleView({ arts }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const a = arts.find(x => x.id === id);

    if (!a) return (
        <div style={{ textAlign: "center", padding: "100px 20px" }}>
            <h2 style={{ fontFamily: "var(--fh)" }}>Artículo no encontrado</h2>
            <button onClick={() => navigate('/')} style={{ background: "none", border: "1.5px solid var(--v)", color: "var(--v)", padding: "10px 20px", marginTop: "20px", cursor: "pointer" }}>Volver al inicio</button>
        </div>
    );

    const fd = d => new Date(d).toLocaleDateString("es-LA", { day: "numeric", month: "long", year: "numeric" });
    const rel = arts.filter(x => x.id !== a.id && x.category === a.category).slice(0, 3);

    const blocks = [];
    let pc = 0;
    (a.content || []).forEach((b, i) => {
        if (b.t === "p") {
            blocks.push(<p key={i}>{b.x}</p>); pc++;
            if (pc % 4 === 0 && b.x.length > 80) {
                const q = b.x.split(".")[0];
                if (q.length > 30) blocks.push(
                    <blockquote key={"q" + i} style={{ margin: "2.5rem 0", borderLeft: "4px solid var(--v)", paddingLeft: "1.4rem" }}>
                        <p style={{ fontFamily: "var(--fh)", fontSize: "1.3rem", fontWeight: 700, textTransform: "uppercase", color: "var(--v)", lineHeight: 1.25, fontStyle: "normal" }}>"{q}"</p>
                    </blockquote>
                );
            }
        } else if (b.t === "h2") blocks.push(<h2 key={i}>{b.x}</h2>);
        else if (b.t === "h3") blocks.push(<h3 key={i}>{b.x}</h3>);
        else if (b.t === "img" && b.src) blocks.push(
            <figure key={i} style={{ margin: "2rem 0" }}>
                <img src={b.src} alt={b.cap || ""} style={{ width: "100%", display: "block" }} />
                {b.cap && <figcaption style={{ fontFamily: "var(--fb)", fontSize: ".8rem", color: "rgba(43,43,43,.5)", marginTop: 6, textAlign: "center", fontStyle: "italic" }}>{b.cap}</figcaption>}
            </figure>
        );
    });

    return (
        <div className="fi">
            <HeroZone art={a} />
            <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px" }}>
                <div style={{ marginTop: 28, marginBottom: 12 }}><span className="pill">{a.category}</span></div>
                <h1 style={{ fontFamily: "var(--fh)", fontSize: "clamp(1.9rem,3.5vw,3.2rem)", fontWeight: 900, textTransform: "uppercase", color: "var(--v)", lineHeight: 1, letterSpacing: "-.02em", marginBottom: 14 }}>{a.title}</h1>
                <p style={{ fontFamily: "var(--fb)", fontSize: "1.15rem", color: "rgba(43,43,43,.6)", lineHeight: 1.7, marginBottom: 18 }}>{a.excerpt}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 24, borderBottom: "2px solid rgba(15,61,46,.1)", fontFamily: "var(--fb)", fontSize: ".82rem", color: "rgba(43,43,43,.45)" }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--v)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--fh)", color: "#fff", fontSize: ".95rem", fontWeight: 800 }}>{a.author.charAt(0)}</div>
                    <span>{a.author}</span><span>·</span><time>{fd(a.publishedAt)}</time>
                </div>
                <div className="ab" style={{ paddingTop: 28, paddingBottom: 36 }}>{blocks}</div>
                <button onClick={() => navigate(-1)} style={{ background: "none", border: "1.5px solid var(--v)", color: "var(--v)", fontFamily: "var(--fh)", fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", padding: "7px 18px", cursor: "pointer", marginBottom: 52 }}>← Volver</button>
            </div>
            {rel.length > 0 && (
                <section style={{ background: "var(--vc)", padding: "44px 0" }}>
                    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
                        <p style={{ fontFamily: "var(--fh)", fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".15em", color: "var(--v2)", marginBottom: 5 }}>Continúa leyendo</p>
                        <h2 style={{ fontFamily: "var(--fh)", fontSize: "1.7rem", fontWeight: 900, textTransform: "uppercase", color: "var(--v)", marginBottom: 24 }}>Artículos relacionados</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 24 }}>
                            {rel.map((x, i) => <Card key={x.id} a={x} onRead={(article) => navigate(`/articulo/${article.id}`)} dl={"s" + (i + 1)} />)}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

export default ArticleView;
