import React, { useEffect, useState } from "react";
import { read, write } from "../lib/store";

export default function Settings() {
  const [settings, setSettings] = useState(
    read("settings", {
      hotelName: "RNS Hotel Demo",
      theme: "light",
      accent: "#0b5cff",
      notifications: true,
    })
  );

  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const themes = [
    { value: "light", label: " Light" },
    { value: "dark", label: " Dark" },
  ];

  useEffect(() => write("settings", settings), [settings]);

  const selectedTheme = themes.find((t) => t.value === settings.theme);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <h2 style={{ marginBottom: 16 }}>⚙️ Settings</h2>

      <div
        style={{
          background: "var(--panel)",
          padding: 24,
          borderRadius: 16,
          boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
          maxWidth: 600,
        }}
      >
        {/* Hotel Name */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 14, fontWeight: 600, display: "block", marginBottom: 6 }}>
            Hotel Name
          </label>
          <input
            className="input"
            value={settings.hotelName}
            onChange={(e) => setSettings({ ...settings, hotelName: e.target.value })}
            style={{
              padding: "12px 14px",
              borderRadius: 12,
              border: "1px solid var(--border)",
              width: "100%",
              fontSize: 15,
            }}
          />
        </div>

        {/* Theme Selector */}
        <div style={{ marginBottom: 20, position: "relative" }}>
          <label style={{ fontSize: 14, fontWeight: 600, display: "block", marginBottom: 6 }}>
            Theme
          </label>
          <div
            onClick={() => setShowThemeDropdown((s) => !s)}
            style={{
              padding: "12px 14px",
              borderRadius: 12,
              border: "1px solid var(--border)",
              background: "#fff",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            {selectedTheme?.label || "Select Theme"}
            <span style={{ fontSize: 12, color: "#666" }}>▼</span>
          </div>

          {showThemeDropdown && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: 12,
                marginTop: 6,
                boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                zIndex: 10,
              }}
            >
              {themes.map((t) => (
                <div
                  key={t.value}
                  onClick={() => {
                    setSettings({ ...settings, theme: t.value });
                    setShowThemeDropdown(false);
                  }}
                  style={{
                    padding: "12px 14px",
                    cursor: "pointer",
                    fontSize: 15,
                    borderBottom: "1px solid #f0f0f0",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f7f7f7")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#fff")
                  }
                >
                  {t.label}
                </div>
              ))}
            </div>
          )}
        </div>

       

        {/* Notifications Toggle */}
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              fontSize: 14,
              fontWeight: 600,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => setSettings({ ...settings, notifications: !settings.notifications })}
          >
            Enable Notifications
            <span
              style={{
                width: 40,
                height: 22,
                borderRadius: 12,
                background: settings.notifications ? settings.accent : "#ccc",
                position: "relative",
                transition: "all 0.3s",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 2,
                  left: settings.notifications ? 20 : 2,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "#fff",
                  transition: "all 0.3s",
                }}
              />
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
