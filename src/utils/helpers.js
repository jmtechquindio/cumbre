export const toDataURL = file => new Promise(res => {
    const r = new FileReader(); r.onload = e => res(e.target.result); r.readAsDataURL(file);
});

export const uid = () => Math.random().toString(36).slice(2, 8);

export const fs = d => new Date(d).toLocaleDateString("es-LA", { month: "short", year: "numeric" });
export const fd = d => new Date(d).toLocaleDateString("es-LA", { day: "numeric", month: "long", year: "numeric" });
