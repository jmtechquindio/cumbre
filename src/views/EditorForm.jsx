import React, { useState } from 'react';
import { CATS, AUTHS, EMOS, COLS } from '../config/constants';
import { uid } from '../utils/helpers';
import ImageDropZone from '../components/ImageDropZone';
import BlockEditor from '../components/BlockEditor';

function EditorForm({ art, onSave, onCancel }) {
    const isNew = !art.id;
    const [f, sf] = useState({
        title: art.title || "",
        excerpt: art.excerpt || "",
        category: art.category || CATS[0],
        author: art.author || AUTHS[0],
        publishedAt: art.publishedAt || new Date().toISOString().slice(0, 10),
        he: art.he || "🏔",
        hc: art.hc || "#0F3D2E",
        heroImg: art.heroImg || null,
        blocks: (art.content || []).map(b => ({ ...b, id: b.id || uid() })),
    });
    const s = (k, v) => sf(p => ({ ...p, [k]: v }));

    const save = () => {
        if (!f.title.trim()) return;
        onSave({
            ...art,
            id: art.id || String(Date.now()),
            title: f.title,
            slug: f.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            excerpt: f.excerpt,
            category: f.category,
            author: f.author,
            publishedAt: f.publishedAt,
            he: f.he, hc: f.hc,
            heroImg: f.heroImg,
            content: f.blocks,
        });
    };

    return (
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "36px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
                <div>
                    <p style={{ fontFamily: "var(--fh)", fontSize: ".62rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--v2)", marginBottom: 4 }}>{isNew ? "Nuevo artículo" : "Editando artículo"}</p>
                    <h1 style={{ fontFamily: "var(--fh)", fontSize: "1.9rem", fontWeight: 900, textTransform: "uppercase", color: "var(--v)", lineHeight: 1 }}>{isNew ? "Crear artículo" : f.title || "Sin título"}</h1>
                </div>
                <button onClick={onCancel} style={{ background: "none", border: "1.5px solid rgba(0,0,0,.15)", color: "rgba(43,43,43,.5)", fontFamily: "var(--fh)", fontSize: ".68rem", fontWeight: 700, textTransform: "uppercase", padding: "6px 14px", cursor: "pointer" }}>← Cancelar</button>
            </div>

            <div style={{ display: "grid", gap: 22 }}>
                <div style={{ border: "1px solid #c8e0d4", padding: "16px", background: "#fafffe" }}>
                    <label className="fl" style={{ marginBottom: 10 }}>
                        📷 Imagen de portada (hero)
                        {f.heroImg && <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: "var(--v2)", marginLeft: 8, fontSize: ".68rem" }}>— subida ✓</span>}
                    </label>
                    {f.heroImg
                        ? <div style={{ position: "relative" }}>
                            <img src={f.heroImg} alt="hero" style={{ width: "100%", maxHeight: 260, objectFit: "cover", display: "block" }} />
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.5),transparent)", display: "flex", alignItems: "flex-end", padding: 12, gap: 8 }}>
                                <ImageDropZone small onImage={url => s("heroImg", url)} label="Reemplazar imagen" />
                                <button onClick={() => s("heroImg", null)} style={{ background: "rgba(139,32,32,.85)", color: "#fff", border: "none", padding: "8px 12px", fontFamily: "var(--fh)", fontSize: ".65rem", fontWeight: 700, textTransform: "uppercase", cursor: "pointer" }}>Quitar</button>
                            </div>
                        </div>
                        : <ImageDropZone onImage={url => s("heroImg", url)} label="Subir imagen de portada" />
                    }
                    {!f.heroImg && <p style={{ fontFamily: "var(--fb)", fontSize: ".75rem", color: "rgba(43,43,43,.4)", marginTop: 8 }}>Si no subes foto, se usará el color y emoji seleccionados abajo.</p>}
                </div>

                <div><label className="fl">Título *</label><input className="inp" value={f.title} onChange={e => s("title", e.target.value)} placeholder="Título del artículo..." /></div>
                <div>
                    <label className="fl">Bajada * <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: f.excerpt.length > 180 ? "#8B2020" : "rgba(31,111,78,.5)", fontSize: ".68rem" }}>({f.excerpt.length}/180)</span></label>
                    <textarea className="inp" rows={3} value={f.excerpt} onChange={e => s("excerpt", e.target.value)} placeholder="Resumen del artículo (máx. 180 caracteres)..." maxLength={180} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div><label className="fl">Categoría</label><select className="inp" value={f.category} onChange={e => s("category", e.target.value)}>{CATS.map(c => <option key={c}>{c}</option>)}</select></div>
                    <div><label className="fl">Autor</label><select className="inp" value={f.author} onChange={e => s("author", e.target.value)}>{AUTHS.map(a => <option key={a}>{a}</option>)}</select></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                    <div><label className="fl">Fecha</label><input className="inp" type="date" value={f.publishedAt} onChange={e => s("publishedAt", e.target.value)} /></div>
                    <div><label className="fl">Emoji fallback</label><select className="inp" value={f.he} onChange={e => s("he", e.target.value)}>{EMOS.map(e => <option key={e} value={e}>{e} {e}</option>)}</select></div>
                    <div>
                        <label className="fl">Color fallback</label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 4 }}>
                            {COLS.map(c => <button key={c} onClick={() => s("hc", c)} style={{ width: 26, height: 26, background: c, border: "none", cursor: "pointer", outline: f.hc === c ? "2.5px solid var(--a)" : "2px solid transparent", outlineOffset: 2 }} />)}
                        </div>
                    </div>
                </div>

                <div>
                    <label className="fl" style={{ marginBottom: 10 }}>
                        Contenido del artículo
                        <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: "rgba(43,43,43,.35)", fontSize: ".68rem", marginLeft: 8 }}>
                            — bloques de texto e imágenes en el orden que quieras
                        </span>
                    </label>
                    <div style={{ border: "1px solid #c8e0d4", padding: "16px", background: "#fafffe" }}>
                        <BlockEditor blocks={f.blocks} onChange={v => s("blocks", v)} />
                    </div>
                </div>

                <div style={{ background: "var(--vc)", padding: "10px 14px", borderLeft: "3px solid var(--v2)", fontFamily: "var(--fb)", fontSize: ".78rem", color: "rgba(43,43,43,.55)" }}>
                    <strong style={{ fontFamily: "var(--fh)", fontSize: ".65rem", textTransform: "uppercase", letterSpacing: ".08em", color: "var(--v2)" }}>Layout bloqueado:</strong>{" "}La estructura del artículo es fija (Hero → Categoría → Título → Bajada → Autor → Cuerpo). Dentro del cuerpo puedes ordenar los bloques libremente.
                </div>

                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                    <button onClick={onCancel} style={{ background: "none", border: "1.5px solid rgba(0,0,0,.15)", color: "rgba(43,43,43,.5)", fontFamily: "var(--fh)", fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", padding: "9px 22px", cursor: "pointer" }}>Cancelar</button>
                    <button onClick={save} style={{ background: f.title.trim() ? "var(--v)" : "rgba(0,0,0,.2)", color: "#fff", border: "none", padding: "9px 26px", fontFamily: "var(--fh)", fontSize: ".72rem", fontWeight: 800, textTransform: "uppercase", cursor: f.title.trim() ? "pointer" : "not-allowed" }}>
                        {isNew ? "Publicar artículo →" : "Guardar cambios →"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditorForm;
