import React from 'react';

function HeroZone({ art, height = "min(58vh,460px)" }) {
    return (
        <div style={{
            width: "100%", height, background: art.heroImg ? "transparent" : art.hc,
            display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden"
        }}>
            {art.heroImg
                ? <img src={art.heroImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                : <div style={{ fontSize: "16rem", opacity: .09, userSelect: "none" }}>{art.he}</div>
            }
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.45),rgba(0,0,0,.08))" }} />
        </div>
    );
}

export default HeroZone;
