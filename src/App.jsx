import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate, useParams } from "react-router-dom";

// Config
import { DATA } from "./config/data";

// Components
import CSS from "./components/CSS";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Notif from "./components/Notif";

// Views
import Home from "./views/Home";
import ArticleView from "./views/ArticleView";
import Login from "./views/Login";
import CatView from "./views/CatView";
import EdnsView from "./views/EditionsView";
import Dash from "./views/Dash";
import EditorForm from "./views/EditorForm";

export default function App() {
  const navigate = useNavigate();

  // -- State Logic with LocalStorage --
  const [isEditor, setIsEditor] = useState(() => {
    return localStorage.getItem("cumbre_session") === "true";
  });

  const [arts, setArts] = useState(() => {
    const saved = localStorage.getItem("cumbre_articles");
    return saved ? JSON.parse(saved) : [];
  });

  const [notif, setNotif] = useState(null);

  // Sync state with LocalStorage
  useEffect(() => {
    localStorage.setItem("cumbre_articles", JSON.stringify(arts));
  }, [arts]);

  useEffect(() => {
    localStorage.setItem("cumbre_session", isEditor);
  }, [isEditor]);

  // -- Actions --
  const notify = (msg, type = "success") => setNotif({ msg, type });

  const doLogin = (user, pass) => {
    if (user.trim() === "editor" && pass === "cumbre2024") {
      setIsEditor(true);
      notify("Bienvenido al panel editorial");
      navigate("/admin");
    } else {
      notify("Credenciales incorrectas", "error");
    }
  };

  const logout = () => {
    setIsEditor(false);
    localStorage.removeItem("cumbre_session");
    notify("Sesión cerrada");
    navigate("/");
  };

  const loadExample = () => {
    setArts(DATA);
    notify("Datos de ejemplo cargados");
  };

  const saveArt = a => {
    setArts(prev => {
      const exists = prev.find(x => x.id === a.id);
      return exists ? prev.map(x => x.id === a.id ? a : x) : [a, ...prev];
    });
    notify("Artículo guardado");
    navigate("/admin");
  };

  const delArt = id => {
    setArts(prev => prev.filter(a => a.id !== id));
    notify("Artículo eliminado", "error");
  };

  return (
    <>
      <CSS />
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header isEditor={isEditor} onLogout={logout} />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home arts={arts} isEditor={isEditor} onLoadExample={loadExample} />} />
            <Route path="/articulo/:id" element={<ArticleView arts={arts} />} />
            <Route path="/categoria/:category" element={<CatView arts={arts} />} />
            <Route path="/ediciones" element={<EdnsView arts={arts} />} />

            <Route path="/login" element={isEditor ? <Navigate to="/admin" /> : <Login onLogin={doLogin} />} />

            <Route path="/admin" element={isEditor ? <Dash arts={arts} onEdit={a => navigate(`/admin/editar/${a.id}`)} onNew={() => navigate("/admin/crear")} onDel={delArt} /> : <Navigate to="/login" />} />
            <Route path="/admin/crear" element={isEditor ? <EditorForm art={{}} onSave={saveArt} onCancel={() => navigate("/admin")} /> : <Navigate to="/login" />} />
            <Route path="/admin/editar/:id" element={isEditor ? <EditorFormWrapper arts={arts} onSave={saveArt} onCancel={() => navigate("/admin")} /> : <Navigate to="/login" />} />

            <Route path="*" element={<NotFound navigate={navigate} />} />
          </Routes>
        </main>

        <Footer />
      </div>
      {notif && <Notif msg={notif.msg} type={notif.type} onClose={() => setNotif(null)} />}
    </>
  );
}

function EditorFormWrapper({ arts, onSave, onCancel }) {
  const { id } = useParams();
  const art = arts.find(x => x.id === id) || {};
  return <EditorForm art={art} onSave={onSave} onCancel={onCancel} />;
}

function NotFound({ navigate }) {
  return (
    <div style={{ textAlign: "center", padding: "100px" }}>
      <h2 style={{ fontFamily: "var(--fh)" }}>404 - Página no encontrada</h2>
      <button onClick={() => navigate("/")} style={{ background: "none", border: "1.5px solid var(--v)", padding: "10px 20px", marginTop: "20px", cursor: "pointer" }}>Volver al inicio</button>
    </div>
  );
}
