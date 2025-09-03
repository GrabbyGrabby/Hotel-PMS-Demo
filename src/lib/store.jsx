export function read(key, defaultValue){ try{ const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : defaultValue; }catch(e){ return defaultValue; } }
export function write(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
