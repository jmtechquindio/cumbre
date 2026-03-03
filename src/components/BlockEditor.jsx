import React from 'react';
import { uid, toDataURL } from '../utils/helpers';
import ImageDropZone from './ImageDropZone';

function BlockEditor({ blocks, onChange }) {
    const add = (t) => {
        const nb = { id: uid(), t, x: "", src: null, cap: "" };
        onChange([...blocks, nb]);
    };
    const upd = (id, data) => onChange(blocks.map(b => b.id === id ? { ...b, ...data } : b));
    const del = (id) => onChange(blocks.filter(b => b.id !== id));

    return (
        <div>
            {blocks.map((b, i) => (
                <div key={b.id} className="blk-row">
                    <span className="blk-drag" title="Bloque">⠿</span>
                    <div className="blk-body">
                        {b.t === "p" &&
                            <textarea className="inp" rows={3} value={b.x}
                                onChange={e => upd(b.id, { x: e.target.value })}
                                placeholder="Escribe un párrafo..."
                                style={{ fontFamily: "var(--fb)", fontSize: ".9rem", lineHeight: 1.7 }} />
                        }
                        {b.t === "h2" &&
                            <input className="inp" value={b.x}
                                onChange={e => upd(b.id, { x: e.target.value })}
                                placeholder="Subtítulo H2..."
                                style={{ fontFamily: "var(--fh)", fontSize: "1.1rem", fontWeight: 700, textTransform: "uppercase" }} />
                        }
                        {b.t === "h3" &&
                            <input className="inp" value={b.x}
                                onChange={e => upd(b.id, { x: e.target.value })}
                                placeholder="Subtítulo H3..."
                                style={{ fontFamily: "var(--fh)", fontSize: ".95rem", fontWeight: 700, textTransform: "uppercase" }} />
                        }
                        {b.t === "img" && (
                            <div>
                                {b.src
                                    ? <div style={{ position: "relative", marginBottom: 6 }}>
                                        <img src={b.src} alt="" style={{ width: "100%", maxHeight: 220, objectFit: "cover", display: "block" }} />
                                        <button onClick={() => upd(b.id, { src: null })}
                                            style={{ position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,.65)", color: "#fff", border: "none", padding: "4px 8px", cursor: "pointer", fontSize: ".75rem" }}>
                                            Cambiar
                                        </button>
                                    </div>
                                    : <ImageDropZone small onImage={url => upd(b.id, { src: url })} label="Subir imagen" />
                                }
                                <input className="inp" value={b.cap || ""}
                                    onChange={e => upd(b.id, { cap: e.target.value })}
                                    placeholder="Pie de foto (opcional)..."
                                    style={{ marginTop: 6, fontSize: ".82rem" }} />
                            </div>
                        )}
                    </div>
                    <button className="blk-del" onClick={() => del(b.id)}>✕</button>
                </div>
            ))}

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                <span style={{ fontFamily: "var(--fh)", fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "rgba(43,43,43,.4)", alignSelf: "center" }}>Agregar:</span>
                {[
                    { label: "Párrafo", t: "p", icon: "¶" },
                    { label: "H2", t: "h2", icon: "H2" },
                    { label: "H3", t: "h3", icon: "H3" },
                    { label: "Imagen", t: "img", icon: "🖼" },
                ].map(btn => (
                    <button key={btn.t} onClick={() => add(btn.t)}
                        style={{
                            background: "var(--vc)", color: "var(--v)", border: "1px solid #c8e0d4",
                            padding: "6px 12px", fontFamily: "var(--fh)", fontSize: ".72rem", fontWeight: 700,
                            textTransform: "uppercase", letterSpacing: ".08em", cursor: "pointer",
                            display: "flex", gap: 5, alignItems: "center"
                        }}>
                        <span>{btn.icon}</span><span>{btn.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default BlockEditor;
