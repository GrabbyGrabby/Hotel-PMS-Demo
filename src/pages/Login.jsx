import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../lib/auth";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [err, setErr] = useState("");
  const auth = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from?.pathname || "/";

  async function submit(e) {
    e.preventDefault();
    const res = auth.login(form);

    if (res.ok) {
      nav(from, { replace: true });
    } else {
      setErr(res.message || "Login failed");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          width: 420,
          background: "var(--panel)",
          padding: 24,
          borderRadius: 12,
          boxShadow: "var(--card-shadow)",
        }}
      >
        <h2 style={{ margin: 0 }}>Hotel PMS — Admin Login</h2>
        <p style={{ color: "var(--muted)" }}>
          Use <strong>admin / admin123</strong>
        </p>

        <form
          onSubmit={submit}
          style={{ display: "grid", gap: 10, marginTop: 12 }}
        >
          <input
            className="input"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <input
            className="input"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="btn">Sign in</button>

          {err && <div style={{ color: "crimson" }}>{err}</div>}
        </form>
      </div>
    </div>
  );
}
