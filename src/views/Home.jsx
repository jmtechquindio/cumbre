import React, { useState } from 'react';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

function Home({ arts, isEditor, onLoadExample }) {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredArts = arts.filter(a =>
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const ft = filteredArts[0];

    return (
        <div>
            <div style={{ padding: "20px", maxWidth: 1200, margin: "0 auto" }}>
                <input
                    className="inp"
                    type="text"
                    placeholder="Buscar artículos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginBottom: "20px" }}
                />
            </div>

            {ft && !searchTerm && (
                <section style={{ position: "relative", minHeight: "72vh", background: ft.heroImg ? "transparent" : ft.hc, display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
                    {ft.heroImg
                        ? <img src={ft.heroImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                        : <div style={{ position: "absolute", right: "4%", top: "50%", transform: "translateY(-50%)", fontSize: "18rem", opacity: .08, lineHeight: 1, userSelect: "none" }}>{ft.he}</div>
                    }
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.7) 0%,rgba(0,0,0,.18) 55%,transparent 100%)" }} />
                    <div style={{ position: "relative", zIndex: 1, padding: "0 24px 52px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
                        <span className="pill s1 fu" style={{ animationFillMode: "both" }}>{ft.category}</span>
                        <h1 className="s2 fu" style={{ fontFamily: "var(--fh)", fontSize: "clamp(2.2rem,4.5vw,4.2rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1, letterSpacing: "-.02em", marginTop: 10, maxWidth: 680, animationFillMode: "both" }}>{ft.title}</h1>
                        <p className="s3 fu" style={{ fontFamily: "var(--fb)", color: "rgba(255,255,255,.78)", fontSize: "1.05rem", lineHeight: 1.65, maxWidth: 540, marginTop: 10, animationFillMode: "both" }}>{ft.excerpt}</p>
                        <div className="s4 fu" style={{ display: "flex", gap: 10, marginTop: 12, color: "rgba(255,255,255,.5)", fontFamily: "var(--fb)", fontSize: ".82rem", animationFillMode: "both" }}>
                            <span>{ft.author}</span><span>·</span><span>{new Date(ft.publishedAt).toLocaleDateString("es-LA", { day: "numeric", month: "long", year: "numeric" })}</span>
                        </div>
                        <button className="s5 fu" onClick={() => navigate(`/articulo/${ft.id}`)} style={{ marginTop: 20, background: "var(--a)", color: "var(--v)", border: "none", padding: "13px 26px", fontFamily: "var(--fh)", fontSize: ".82rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".12em", cursor: "pointer", animationFillMode: "both" }}>Leer artículo →</button>
                    </div>
                </section>
            )}

            <section style={{ maxWidth: 1200, margin: "0 auto", padding: "52px 20px" }}>
                <p style={{ fontFamily: "var(--fh)", fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".15em", color: "var(--v2)", marginBottom: 5 }}>{searchTerm ? "Resultados de búsqueda" : "Lo más reciente"}</p>
                <h2 style={{ fontFamily: "var(--fh)", fontSize: "1.9rem", fontWeight: 900, textTransform: "uppercase", color: "var(--v)", marginBottom: 28 }}>{searchTerm ? `"${searchTerm}"` : "Últimos artículos"}</h2>

                {isEditor && arts.length === 0 && (
                    <div style={{ background: "var(--vc)", padding: "24px", marginBottom: "28px", textAlign: "center", border: "1px dashed var(--v2)" }}>
                        <p style={{ fontFamily: "var(--fb)", fontSize: ".9rem", color: "var(--v2)", marginBottom: "12px" }}>El sitio está vacío. Como editor, puedes cargar los datos de ejemplo.</p>
                        <button onClick={onLoadExample} style={{ background: "var(--v)", color: "#fff", border: "none", padding: "10px 20px", fontFamily: "var(--fh)", fontSize: ".75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", cursor: "pointer" }}>Cargar ejemplo</button>
                    </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(268px,1fr))", gap: 28 }}>
                    {(searchTerm ? filteredArts : arts.slice(1)).map((a, i) => (
                        <Card key={a.id} a={a} onRead={() => navigate(`/articulo/${a.id}`)} dl={"s" + ((i % 5) + 1)} />
                    ))}
                </div>

                {filteredArts.length === 0 && arts.length > 0 && (
                    <p style={{ textAlign: "center", fontFamily: "var(--fb)", color: "rgba(0,0,0,.3)", padding: "40px 0" }}>No se encontraron artículos que coincidan con tu búsqueda.</p>
                )}
            </section>

            {!searchTerm && (
                <section style={{ background: "var(--vc)", padding: "44px 0" }}>
                    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
                        <h2 style={{ fontFamily: "var(--fh)", fontSize: "1.9rem", fontWeight: 900, textTransform: "uppercase", color: "var(--v)", marginBottom: 20 }}>Secciones</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 10 }}>
                            {[{ t: "Alta Montaña", i: "🏔", d: "Cumbres y expediciones" }, { t: "Trekking", i: "🥾", d: "Rutas de varios días" }, { t: "Turismo Responsable", i: "🌿", d: "Impacto positivo" }, { t: "Expediciones", i: "🧭", d: "Primera línea" }].map(c => (
                                <button key={c.t} onClick={() => navigate(`/categoria/${c.t}`)} style={{ background: "#fff", border: "none", padding: "18px 14px", textAlign: "left", cursor: "pointer" }}>
                                    <div style={{ fontSize: "1.7rem", marginBottom: 7 }}>{c.i}</div>
                                    <div style={{ fontFamily: "var(--fh)", fontSize: ".88rem", fontWeight: 800, textTransform: "uppercase", color: "var(--v)" }}>{c.t}</div>
                                    <div style={{ fontFamily: "var(--fb)", fontSize: ".73rem", color: "rgba(43,43,43,.5)", marginTop: 3 }}>{c.d}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

export default Home;
