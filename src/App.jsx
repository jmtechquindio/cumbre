import { useState, useEffect, useRef } from "react";

const CSS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --v:#0F3D2E;--v2:#1F6F4E;--a:#4CAF7D;
      --b:#F8F9F7;--g:#2B2B2B;--vc:#E8F5EE;
      --fh:'Barlow Condensed',sans-serif;
      --fb:'Lora',Georgia,serif;
    }
    body{background:var(--b);color:var(--g);font-family:var(--fb)}
    @keyframes fU{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fI{from{opacity:0}to{opacity:1}}
    @keyframes ni{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    .fu{animation:fU .4s ease both}
    .fi{animation:fI .3s ease both}
    .ni{animation:ni .3s ease both}
    .s1{animation-delay:.06s}.s2{animation-delay:.13s}.s3{animation-delay:.2s}
    .s4{animation-delay:.27s}.s5{animation-delay:.34s}
    .pill{display:inline-block;background:var(--v);color:var(--b);font-family:var(--fh);
      font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:3px 10px}
    .ab p{margin-bottom:1.4rem;line-height:1.85;font-size:1.05rem}
    .ab h2{font-family:var(--fh);font-size:1.6rem;font-weight:800;text-transform:uppercase;
      color:var(--v);margin:2.5rem 0 .8rem}
    .ab h3{font-family:var(--fh);font-size:1.2rem;font-weight:700;text-transform:uppercase;
      color:var(--v2);margin:2rem 0 .6rem}
    .ab img{width:100%;max-width:100%;margin:1.5rem 0;display:block}
    .fl{font-family:var(--fh);font-size:.68rem;font-weight:700;text-transform:uppercase;
      letter-spacing:.1em;color:var(--v2);margin-bottom:5px;display:block}
    .inp{width:100%;border:1.5px solid #c8e0d4;padding:9px 12px;background:#fff;
      color:var(--g);outline:none;font-family:var(--fb);font-size:.95rem}
    .inp:focus{border-color:var(--v2)}
    textarea.inp{resize:vertical}
    .drop{border:2px dashed #c8e0d4;padding:28px;text-align:center;cursor:pointer;
      transition:all .2s;background:#fafffe}
    .drop:hover,.drop.over{border-color:var(--v2);background:var(--vc)}
    .blk-row{display:flex;gap:8px;align-items:flex-start;margin-bottom:8px}
    .blk-drag{cursor:grab;color:#aaa;font-size:1.1rem;padding:8px 4px;user-select:none;flex-shrink:0}
    .blk-body{flex:1}
    .blk-del{background:#fde8e8;color:#8B2020;border:none;padding:6px 10px;
      font-size:.75rem;cursor:pointer;flex-shrink:0;align-self:flex-start;margin-top:2px}
    ::-webkit-scrollbar{width:5px}
    ::-webkit-scrollbar-thumb{background:var(--v2);border-radius:3px}
  `}</style>
);

const CATS = ["Alta Montaña", "Trekking", "Turismo Responsable", "Expediciones", "Equipamiento"];
const AUTHS = ["Valentina Ríos", "Mateo Guerrero", "Luciana Palma", "Carlos Mendoza"];
const EMOS = ["🏔", "⛰", "🌋", "🌿", "🧭", "🥾", "❄", "🌨", "🦅", "🌅"];
const COLS = ["#0F3D2E", "#1a3d2b", "#0d2a3e", "#2d1f0d", "#3d1a0f", "#1f1a2e", "#0f2a2a", "#2a1f1f"];

/* convierte File → dataURL */
const toDataURL = file => new Promise(res => {
  const r = new FileReader(); r.onload = e => res(e.target.result); r.readAsDataURL(file);
});

const DATA = [
  {
    id: "1", title: "Chimborazo: El Techo del Ecuador",
    excerpt: "A 6.263 metros de altura, el Chimborazo esconde rutas que pocos conocen.",
    category: "Alta Montaña", author: "Valentina Ríos", publishedAt: "2024-06-15",
    heroImg: null, hc: "#1a3d2b", he: "🏔",
    content: [
      { id: "b1", t: "p", x: "El amanecer en el refugio Whymper a 5.000 metros tiene una cualidad única. El frío es absoluto, pero la luz sobre los páramos ecuatorianos convierte cualquier sacrificio en algo completamente insignificante." },
      { id: "b2", t: "p", x: "El Chimborazo lleva siglos siendo el símbolo máximo del montañismo en Ecuador. Fue Humboldt quien lo intentó escalar en 1802, y Whymper quien lo coronó por primera vez en 1880." },
      { id: "b3", t: "h2", x: "La Ruta Sur: El Camino Olvidado" },
      { id: "b4", t: "p", x: "Existe una ruta alternativa por el flanco sur que los guías locales conocen perfectamente. Comienza desde la comunidad de Mechahuasca a 3.800 metros, atravesando páramos donde los cóndores dibujan espirales." },
      { id: "b5", t: "h2", x: "Las Comunidades que Custodian la Montaña" },
      { id: "b6", t: "p", x: "Para los Puruhá, el Taita Chimborazo no es un objetivo deportivo sino un ser vivo. Hablar con las comunidades antes del ascenso es parte esencial de una expedición responsable." },
    ]
  },
  {
    id: "2", title: "Torres del Paine: Guía Temporada Baja",
    excerpt: "La Patagonia en invierno austral revela su cara más salvaje.",
    category: "Trekking", author: "Mateo Guerrero", publishedAt: "2024-06-10",
    heroImg: null, hc: "#0d2a3e", he: "⛰",
    content: [
      { id: "c1", t: "p", x: "La mayoría de los trekkistas evitan Torres del Paine entre mayo y septiembre. Cometen un error: en temporada baja el parque pertenece exclusivamente a quien se atreva." },
      { id: "c2", t: "h2", x: "Preparación para el Invierno Patagónico" },
      { id: "c3", t: "p", x: "El equipamiento es clave. Una tienda de tres estaciones no es suficiente: necesitas una certificada para vientos de hasta 120 km/h." },
    ]
  },
  {
    id: "3", title: "Montañismo y Comunidades: El Turismo que Transforma",
    excerpt: "Cinco proyectos que demuestran que el montañismo puede ser motor de desarrollo.",
    category: "Turismo Responsable", author: "Luciana Palma", publishedAt: "2024-05-28",
    heroImg: null, hc: "#2d1f0d", he: "🌿",
    content: [
      { id: "d1", t: "p", x: "El turismo de montaña puede ser devastador si no se gestiona bien, pero también puede ser la herramienta más poderosa para el desarrollo de comunidades rurales." },
    ]
  },
  {
    id: "4", title: "Villarrica: Amanecer sobre el Cráter",
    excerpt: "Subir el Villarrica de noche para ver el amanecer sobre su cráter activo.",
    category: "Alta Montaña", author: "Valentina Ríos", publishedAt: "2024-05-15",
    heroImg: null, hc: "#3d1a0f", he: "🌋",
    content: [
      { id: "e1", t: "p", x: "A las 2 de la mañana, cuando los crampones muerden la nieve y el cráter brilla con su propio fuego, entiendes por qué este volcán es uno de los ascensos más fascinantes de Latinoamérica." },
    ]
  },
  {
    id: "5", title: "Aconcagua por la Cara Sur",
    excerpt: "La ruta más técnica del Aconcagua es también la más espectacular.",
    category: "Alta Montaña", author: "Mateo Guerrero", publishedAt: "2024-05-01",
    heroImg: null, hc: "#1f1a2e", he: "❄",
    content: [
      { id: "f1", t: "p", x: "Hay dos Aconcaguas: el de la ruta normal y el de la cara sur, 3.000 metros de pared vertical que es uno de los objetivos más serios del alpinismo mundial." },
    ]
  },
  {
    id: "6", title: "Cotopaxi: El Regreso del Gigante",
    excerpt: "Tras años de actividad volcánica, el Cotopaxi reabre para expediciones.",
    category: "Expediciones", author: "Luciana Palma", publishedAt: "2024-04-20",
    heroImg: null, hc: "#0f2a2a", he: "🌨",
    content: [
      { id: "g1", t: "p", x: "El Cotopaxi estuvo cerrado durante casi cinco años. Ahora el volcán más perfecto del mundo vuelve a abrir sus faldas a los alpinistas con nuevos protocolos de seguridad." },
    ]
  },
];

const EDNS = [
  { id: "e1", n: 7, desc: "La ruta de los volcanes: Ecuador, Colombia y Chile", date: "2024-06-01", c: "#0F3D2E" },
  { id: "e2", n: 6, desc: "Patagonia sin filtros: el invierno como destino", date: "2024-03-01", c: "#1a2d3e" },
  { id: "e3", n: 5, desc: "Comunidades y cumbres: el turismo que transforma", date: "2023-12-01", c: "#2d1f0d" },
];

const fd = d => new Date(d).toLocaleDateString("es-LA", { day: "numeric", month: "long", year: "numeric" });
const fs = d => new Date(d).toLocaleDateString("es-LA", { month: "short", year: "numeric" });
const uid = () => Math.random().toString(36).slice(2, 8);

/* ── Notif ── */
function Notif({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 2800); return () => clearTimeout(t) }, []);
  return <div className="ni" style={{
    position: "fixed", bottom: 20, right: 20, zIndex: 9999,
    background: type === "error" ? "#8B2020" : "#1F6F4E", color: "#fff", padding: "11px 18px",
    fontFamily: "var(--fh)", fontSize: ".8rem", fontWeight: 700, textTransform: "uppercase",
    letterSpacing: ".08em", boxShadow: "0 4px 20px rgba(0,0,0,.35)",
    display: "flex", gap: 8, alignItems: "center"
  }}>
    <span>{type === "error" ? "!" : "✓"}</span><span>{msg}</span>
  </div>;
}

/* ── Header ── */
function Header({ isEditor, onLogout, onNav }) {
  return <header style={{ position: "sticky", top: 0, zIndex: 100, background: "var(--v)", boxShadow: "0 2px 16px rgba(0,0,0,.2)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 52 }}>
      <button onClick={() => onNav("home")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--fh)", fontSize: "1.75rem", fontWeight: 900, color: "var(--b)", textTransform: "uppercase", letterSpacing: "-.02em" }}>Cumbre</button>
      <nav style={{ display: "flex", gap: 20, alignItems: "center" }}>
        {[["Alta Montaña", "cat", "Alta Montaña"], ["Trekking", "cat", "Trekking"], ["Ediciones", "editions"]].map(([l, a, p]) => (
          <button key={l} onClick={() => onNav(a, p)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--fh)", fontSize: ".68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "rgba(248,249,247,.65)" }}>{l}</button>
        ))}
      </nav>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {isEditor && <button onClick={() => onNav("dash")} style={{ background: "var(--a)", color: "var(--v)", border: "none", padding: "5px 14px", fontFamily: "var(--fh)", fontSize: ".68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", cursor: "pointer" }}>✏ Editor</button>}
        <button onClick={isEditor ? onLogout : () => onNav("login")} style={{ background: "none", border: "1px solid rgba(255,255,255,.3)", color: "rgba(255,255,255,.65)", fontFamily: "var(--fh)", fontSize: ".65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", padding: "5px 12px", cursor: "pointer" }}>
          {isEditor ? "Salir" : "Acceso"}
        </button>
      </div>
    </div>
  </header>;
}

/* ── HeroZone ── */
function HeroZone({ art, height = "min(58vh,460px)" }) {
  return <div style={{
    width: "100%", height, background: art.heroImg ? "transparent" : art.hc,
    display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden"
  }}>
    {art.heroImg
      ? <img src={art.heroImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      : <div style={{ fontSize: "16rem", opacity: .09, userSelect: "none" }}>{art.he}</div>
    }
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.45),rgba(0,0,0,.08))" }} />
  </div>;
}

/* ── Card ── */
function Card({ a, onRead, dl }) {
  const [hov, sh] = useState(false);
  return <article className={"fu " + (dl || "s1")} onClick={() => onRead(a)} style={{ cursor: "pointer", animationFillMode: "both" }}>
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
        <span>{a.author}</span><span>·</span><span>{fs(a.publishedAt)}</span>
      </div>
    </div>
  </article>;
}

/* ── Article view ── */
function ArticleView({ a, all, onBack, onRead }) {
  const rel = all.filter(x => x.id !== a.id && x.category === a.category).slice(0, 3);
  const blocks = []; let pc = 0;
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
  return <div className="fi">
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
      <button onClick={onBack} style={{ background: "none", border: "1.5px solid var(--v)", color: "var(--v)", fontFamily: "var(--fh)", fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", padding: "7px 18px", cursor: "pointer", marginBottom: 52 }}>← Volver</button>
    </div>
    {rel.length > 0 && <section style={{ background: "var(--vc)", padding: "44px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <p style={{ fontFamily: "var(--fh)", fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".15em", color: "var(--v2)", marginBottom: 5 }}>Continúa leyendo</p>
        <h2 style={{ fontFamily: "var(--fh)", fontSize: "1.7rem", fontWeight: 900, textTransform: "uppercase", color: "var(--v)", marginBottom: 24 }}>Artículos relacionados</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 24 }}>
          {rel.map((x, i) => <Card key={x.id} a={x} onRead={onRead} dl={"s" + (i + 1)} />)}
        </div>
      </div>
    </section>}
  </div>;
}

/* ── Home ── */
function Home({ arts, onRead, onNav, isEditor, onLoadExample }) {
  const ft = arts[0];
  return <div>
    {ft && <section style={{ position: "relative", minHeight: "72vh", background: ft.heroImg ? "transparent" : ft.hc, display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
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
          <span>{ft.author}</span><span>·</span><span>{fd(ft.publishedAt)}</span>
        </div>
        <button className="s5 fu" onClick={() => onRead(ft)} style={{ marginTop: 20, background: "var(--a)", color: "var(--v)", border: "none", padding: "13px 26px", fontFamily: "var(--fh)", fontSize: ".82rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".12em", cursor: "pointer", animationFillMode: "both" }}>Leer artículo →</button>
      </div>
    </section>}
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "52px 20px" }}>
      <p style={{ fontFamily: "var(--fh)", fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".15em", color: "var(--v2)", marginBottom: 5 }}>Lo más reciente</p>
      <h2 style={{ fontFamily: "var(--fh)", fontSize: "1.9rem", fontWeight: 900, textTransform: "uppercase", color: "var(--v)", marginBottom: 28 }}>Últimos artículos</h2>
      {isEditor && arts.length === 0 && (
        <div style={{ background: "var(--vc)", padding: "24px", marginBottom: "28px", textAlign: "center", border: "1px dashed var(--v2)" }}>
          <p style={{ fontFamily: "var(--fb)", fontSize: ".9rem", color: "var(--v2)", marginBottom: "12px" }}>El sitio está vacío. Como editor, puedes cargar los datos de ejemplo.</p>
          <button onClick={onLoadExample} style={{ background: "var(--v)", color: "#fff", border: "none", padding: "10px 20px", fontFamily: "var(--fh)", fontSize: ".75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", cursor: "pointer" }}>Cargar ejemplo</button>
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(268px,1fr))", gap: 28 }}>
        {arts.slice(1).map((a, i) => <Card key={a.id} a={a} onRead={onRead} dl={"s" + ((i % 5) + 1)} />)}
      </div>
    </section>
    <section style={{ background: "var(--vc)", padding: "44px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <h2 style={{ fontFamily: "var(--fh)", fontSize: "1.9rem", fontWeight: 900, textTransform: "uppercase", color: "var(--v)", marginBottom: 20 }}>Secciones</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 10 }}>
          {[{ t: "Alta Montaña", i: "🏔", d: "Cumbres y expediciones" }, { t: "Trekking", i: "🥾", d: "Rutas de varios días" }, { t: "Turismo Responsable", i: "🌿", d: "Impacto positivo" }, { t: "Expediciones", i: "🧭", d: "Primera línea" }].map(c => (
            <button key={c.t} onClick={() => onNav("cat", c.t)} style={{ background: "#fff", border: "none", padding: "18px 14px", textAlign: "left", cursor: "pointer" }}>
              <div style={{ fontSize: "1.7rem", marginBottom: 7 }}>{c.i}</div>
              <div style={{ fontFamily: "var(--fh)", fontSize: ".88rem", fontWeight: 800, textTransform: "uppercase", color: "var(--v)" }}>{c.t}</div>
              <div style={{ fontFamily: "var(--fb)", fontSize: ".73rem", color: "rgba(43,43,43,.5)", marginTop: 3 }}>{c.d}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  </div>;
}

function CatView({ cat, arts, onRead }) {
  const f = arts.filter(a => a.category === cat);
  return <div>
    <div style={{ background: "var(--v)", padding: "44px 20px" }}><div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <p style={{ fontFamily: "var(--fh)", fontSize: ".62rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--a)", marginBottom: 6 }}>Categoría</p>
      <h1 style={{ fontFamily: "var(--fh)", fontSize: "clamp(2.2rem,4.5vw,3.8rem)", fontWeight: 900, textTransform: "uppercase", color: "#fff", lineHeight: 1 }}>{cat}</h1>
    </div></div>
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "44px 20px" }}>
      {f.length > 0
        ? <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(268px,1fr))", gap: 28 }}>{f.map((a, i) => <Card key={a.id} a={a} onRead={onRead} dl={"s" + ((i % 5) + 1)} />)}</div>
        : <p style={{ fontFamily: "var(--fb)", color: "rgba(43,43,43,.4)", textAlign: "center", padding: "60px 0" }}>No hay artículos todavía.</p>
      }
    </div>
  </div>;
}

function EdnsView({ arts, onRead }) {
  return <div>
    <div style={{ background: "var(--v)", padding: "44px 20px" }}><div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "var(--fh)", fontSize: "clamp(2.2rem,4.5vw,3.8rem)", fontWeight: 900, textTransform: "uppercase", color: "#fff", lineHeight: 1 }}>Ediciones</h1>
    </div></div>
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "44px 20px" }}>
      {EDNS.map((ed, i) => {
        const ea = arts.slice(i * 2, i * 2 + 2);
        return <div key={ed.id} style={{ marginBottom: 44, paddingBottom: 44, borderBottom: "1px solid rgba(15,61,46,.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
            <div style={{ background: ed.c, color: "#fff", fontFamily: "var(--fh)", fontSize: "1.4rem", fontWeight: 900, padding: "7px 14px" }}>#{ed.n}</div>
            <div>
              <div style={{ fontFamily: "var(--fh)", fontSize: "1.1rem", fontWeight: 800, textTransform: "uppercase", color: "var(--v)" }}>{ed.desc}</div>
              <div style={{ fontFamily: "var(--fb)", fontSize: ".78rem", color: "rgba(43,43,43,.4)" }}>{fd(ed.date)}</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 22 }}>
            {ea.map((a, j) => <Card key={a.id} a={a} onRead={onRead} dl={"s" + (j + 1)} />)}
          </div>
        </div>;
      })}
    </div>
  </div>;
}

/* ── Dashboard ── */
function Dash({ arts, onEdit, onNew, onDel }) {
  return <div style={{ maxWidth: 1080, margin: "0 auto", padding: "36px 20px" }}>
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
  </div>;
}

function ImageDropZone({ onImage, label = "Subir imagen", small = false }) {
  const ref = useRef();
  const [over, so] = useState(false);
  const handle = async files => {
    const f = files[0]; if (!f || !f.type.startsWith("image/")) return;
    const url = await toDataURL(f);
    onImage(url);
  };
  return <div
    className={"drop" + (over ? " over" : "")}
    style={small ? { padding: "14px", fontSize: ".82rem" } : {}}
    onDragOver={e => { e.preventDefault(); so(true) }}
    onDragLeave={() => so(false)}
    onDrop={e => { e.preventDefault(); so(false); handle(e.dataTransfer.files) }}
    onClick={() => ref.current.click()}>
    <input ref={ref} type="file" accept="image/*" style={{ display: "none" }} onChange={e => handle(e.target.files)} />
    <div style={{ fontSize: small ? "1.4rem" : "2rem", marginBottom: 6 }}>📷</div>
    <div style={{ fontFamily: "var(--fh)", fontSize: small ? ".68rem" : ".8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--v2)" }}>{label}</div>
    <div style={{ fontFamily: "var(--fb)", fontSize: ".72rem", color: "rgba(43,43,43,.4)", marginTop: 3 }}>Arrastra o haz clic · JPG, PNG, WebP</div>
  </div>;
}

function BlockEditor({ blocks, onChange }) {
  const add = (t) => {
    const nb = { id: uid(), t, x: "", src: null, cap: "" };
    onChange([...blocks, nb]);
  };
  const upd = (id, data) => onChange(blocks.map(b => b.id === id ? { ...b, ...data } : b));
  const del = (id) => onChange(blocks.filter(b => b.id !== id));
  const setImg = async (id, files) => {
    const f = files[0]; if (!f || !f.type.startsWith("image/")) return;
    const url = await toDataURL(f);
    upd(id, { src: url });
  };

  return <div>
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
  </div>;
}

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

  return <div style={{ maxWidth: 820, margin: "0 auto", padding: "36px 20px" }}>
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
  </div>;
}

/* ── Footer ── */
function Footer({ onNav }) {
  return <footer style={{ background: "var(--v)", color: "var(--b)", marginTop: 56 }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "44px 20px 20px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 28, marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "var(--fh)", fontSize: "1.9rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-.02em", marginBottom: 8 }}>Cumbre</div>
          <p style={{ fontFamily: "var(--fb)", fontSize: ".82rem", color: "rgba(255,255,255,.45)", lineHeight: 1.7, maxWidth: 200 }}>Medio editorial especializado en montañismo y turismo responsable en Latinoamérica.</p>
        </div>
        <div>
          <div style={{ fontFamily: "var(--fh)", fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".15em", color: "var(--a)", marginBottom: 10 }}>Secciones</div>
          {CATS.map(c => <button key={c} onClick={() => onNav("cat", c)} style={{ display: "block", background: "none", border: "none", fontFamily: "var(--fb)", fontSize: ".82rem", color: "rgba(255,255,255,.45)", padding: "2px 0", cursor: "pointer", textAlign: "left" }}>{c}</button>)}
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,.1)", paddingTop: 16, display: "flex", justifyContent: "space-between", fontFamily: "var(--fb)", fontSize: ".72rem", color: "rgba(255,255,255,.28)" }}>
        <span>© {new Date().getFullYear()} Cumbre Editorial</span>
        <span>Hecho con respeto por las montañas 🏔</span>
      </div>
    </div>
  </footer>;
}

/* ══════════════════════════════════════════════════
   APP
══════════════════════════════════════════════════ */
export default function App() {
  const [isEditor, setIsEditor] = useState(false);
  const [view, setView] = useState({ name: "home" });
  const [arts, setArts] = useState([]);
  const [notif, setNotif] = useState(null);
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginErr, setLoginErr] = useState(false);

  const notify = (msg, type = "success") => setNotif({ msg, type });
  const nav = (name, param) => setView({ name, cat: param, art: param });

  const doLogin = () => {
    if (loginUser.trim() === "editor" && loginPass === "cumbre2024") {
      setIsEditor(true); setView({ name: "dash" });
      setLoginUser(""); setLoginPass(""); setLoginErr(false);
      notify("Bienvenido al panel editorial");
    } else { setLoginErr(true); }
  };
  const logout = () => { setIsEditor(false); setView({ name: "home" }); notify("Sesión cerrada"); };
  const loadExample = () => { setArts(DATA); notify("Datos de ejemplo cargados"); };
  const saveArt = a => { setArts(prev => prev.find(x => x.id === a.id) ? prev.map(x => x.id === a.id ? a : x) : [a, ...prev]); notify("Artículo guardado"); setView({ name: "dash" }); };
  const delArt = id => { setArts(prev => prev.filter(a => a.id !== id)); notify("Artículo eliminado", "error"); };

  /* ── Login ── */
  if (view.name === "login") return <>
    <CSS />
    <div style={{ minHeight: "100vh", background: "var(--v)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: .05, backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "12px 12px" }} />
      <svg style={{ position: "absolute", bottom: 0, left: 0, width: "100%", opacity: .07 }} viewBox="0 0 1200 280" fill="white"><polygon points="0,280 180,70 340,190 500,30 660,170 820,5 960,140 1100,55 1200,110 1200,280" /></svg>
      <div style={{ background: "var(--b)", width: "100%", maxWidth: 380, padding: "44px 36px", position: "relative", zIndex: 1, boxShadow: "0 28px 70px rgba(0,0,0,.4)" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontFamily: "var(--fh)", fontSize: "2.6rem", fontWeight: 900, color: "var(--v)", textTransform: "uppercase", lineHeight: 1 }}>Cumbre</div>
          <div style={{ fontFamily: "var(--fh)", fontSize: ".6rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--v2)", marginTop: 4 }}>Portal del Editor</div>
        </div>
        <div style={{ width: 36, height: 3, background: "var(--a)", margin: "0 auto 28px" }} />
        <div style={{ marginBottom: 14 }}>
          <label className="fl">Usuario</label>
          <input className="inp" value={loginUser} onChange={e => { setLoginUser(e.target.value); setLoginErr(false) }} placeholder="editor" autoFocus />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label className="fl">Contraseña</label>
          <input className="inp" type="password" value={loginPass} onChange={e => { setLoginPass(e.target.value); setLoginErr(false) }} placeholder="••••••••" onKeyDown={e => e.key === "Enter" && doLogin()} />
        </div>
        {loginErr && <div style={{ background: "#fde8e8", border: "1px solid #f5a5a5", color: "#8B2020", fontFamily: "var(--fh)", fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", padding: "7px 11px", marginBottom: 14 }}>✕ Credenciales incorrectas</div>}
        <button onClick={doLogin} style={{ width: "100%", background: "var(--v)", color: "#fff", border: "none", padding: 13, fontFamily: "var(--fh)", fontSize: ".82rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".12em", cursor: "pointer" }}>Ingresar →</button>
        <div style={{ marginTop: 22, textAlign: "center", fontFamily: "var(--fb)", fontSize: ".72rem", color: "rgba(0,0,0,.3)" }}>Demo: <strong>editor</strong> / <strong>cumbre2024</strong></div>
      </div>
    </div>
    {notif && <Notif msg={notif.msg} type={notif.type} onClose={() => setNotif(null)} />}
  </>;

  let content = null;
  if (view.name === "home") content = <Home arts={arts} onRead={a => nav("art", a)} onNav={nav} isEditor={isEditor} onLoadExample={loadExample} />;
  else if (view.name === "art") content = <ArticleView a={view.art} all={arts} onBack={() => nav("home")} onRead={a => nav("art", a)} />;
  else if (view.name === "cat") content = <CatView cat={view.cat} arts={arts} onRead={a => nav("art", a)} />;
  else if (view.name === "editions") content = <EdnsView arts={arts} onRead={a => nav("art", a)} />;
  else if (view.name === "dash") content = <Dash arts={arts} onEdit={a => setView({ name: "edit", art: a })} onNew={() => setView({ name: "edit", art: {} })} onDel={delArt} />;
  else if (view.name === "edit") content = <EditorForm art={view.art} onSave={saveArt} onCancel={() => setView({ name: "dash" })} />;

  return <>
    <CSS />
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header isEditor={isEditor} onLogout={logout} onNav={nav} />
      <main style={{ flex: 1 }}>{content}</main>
      {!["dash", "edit"].includes(view.name) && <Footer onNav={nav} />}
    </div>
    {notif && <Notif msg={notif.msg} type={notif.type} onClose={() => setNotif(null)} />}
  </>;
}
