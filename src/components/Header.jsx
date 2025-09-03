import React, { useState } from "react";
import { Bell, User, Moon, Sun, LogOut } from "lucide-react";
import { useAuth } from "../lib/auth";
import { read, write } from "../lib/store";

export default function Header() {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState(
    read("settings", { theme: "light" }).theme || "light"
  );

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);

    const s = read("settings", { theme: "light" });
    s.theme = next;
    write("settings", s);

    if (next === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }

  return (
    <header className="header">
      {/* Left section */}
      <div className="left">
        <div style={{ fontWeight: 700 }}>RNS Hotel PMS</div>
        <div
          className="small"
          style={{ marginLeft: 8, color: "var(--muted)" }}
        >
          
        </div>
      </div>

      {/* Right section */}
      <div className="right">
        <button
          title="Notifications"
          style={{ background: "none", border: 0, cursor: "pointer" }}
        >
          <Bell />
        </button>

        <button
          title="Toggle theme"
          onClick={toggleTheme}
          style={{ background: "none", border: 0, cursor: "pointer" }}
        >
          {theme === "light" ? <Moon /> : <Sun />}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <User />
          <div style={{ fontSize: 13 }}>{user?.username || "—"}</div>
        </div>

        <button
          title="Logout"
          onClick={() => logout()}
          style={{ background: "none", border: 0, cursor: "pointer" }}
        >
          <LogOut />
        </button>
      </div>
    </header>
  );
}
