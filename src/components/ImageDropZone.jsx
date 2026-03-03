import React, { useRef, useState } from 'react';
import { toDataURL } from '../utils/helpers';

function ImageDropZone({ onImage, label = "Subir imagen", small = false }) {
    const ref = useRef();
    const [over, so] = useState(false);

    const handle = async files => {
        const f = files[0];
        if (!f || !f.type.startsWith("image/")) return;
        const url = await toDataURL(f);
        onImage(url);
    };

    return (
        <div
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
        </div>
    );
}

export default ImageDropZone;
