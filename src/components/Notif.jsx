import React, { useEffect } from 'react';

function Notif({ msg, type, onClose }) {
    useEffect(() => {
        const t = setTimeout(onClose, 2800);
        return () => clearTimeout(t);
    }, [onClose]);

    return (
        <div className="ni" style={{
            position: "fixed", bottom: 20, right: 20, zIndex: 9999,
            background: type === "error" ? "#8B2020" : "#1F6F4E", color: "#fff", padding: "11px 18px",
            fontFamily: "var(--fh)", fontSize: ".8rem", fontWeight: 700, textTransform: "uppercase",
            letterSpacing: ".08em", boxShadow: "0 4px 20px rgba(0,0,0,.35)",
            display: "flex", gap: 8, alignItems: "center"
        }}>
            <span>{type === "error" ? "!" : "✓"}</span><span>{msg}</span>
        </div>
    );
}

export default Notif;
