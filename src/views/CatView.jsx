import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../components/Card';

function CatView({ arts }) {
    const { category } = useParams();
    const navigate = useNavigate();
    const f = arts.filter(a => a.category === category);

    return (
        <div>
            <div style={{ background: "var(--v)", padding: "44px 20px" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <p style={{ fontFamily: "var(--fh)", fontSize: ".62rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--a)", marginBottom: 6 }}>Categoría</p>
                    <h1 style={{ fontFamily: "var(--fh)", fontSize: "clamp(2.2rem,4.5vw,3.8rem)", fontWeight: 900, textTransform: "uppercase", color: "#fff", lineHeight: 1 }}>{category}</h1>
                </div>
            </div>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "44px 20px" }}>
                {f.length > 0
                    ? <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(268px,1fr))", gap: 28 }}>
                        {f.map((a, i) => <Card key={a.id} a={a} onRead={() => navigate(`/articulo/${a.id}`)} dl={"s" + ((i % 5) + 1)} />)}
                    </div>
                    : <div style={{ textAlign: "center", padding: "60px 0" }}>
                        <p style={{ fontFamily: "var(--fb)", color: "rgba(43,43,43,.4)" }}>No hay artículos todavía en esta categoría.</p>
                        <button onClick={() => navigate('/')} style={{ background: "none", border: "1px solid var(--v)", color: "var(--v)", padding: "8px 16px", marginTop: "20px", cursor: "pointer", fontFamily: "var(--fh)", fontSize: ".7rem", fontWeight: 700, textTransform: "uppercase" }}>Volver al inicio</button>
                    </div>
                }
            </div>
        </div>
    );
}

export default CatView;
