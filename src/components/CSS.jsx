import React from 'react';

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

export default CSS;
