import React, { useEffect, useState } from "react";
import { read, write } from "../lib/store";

export default function Housekeeping() {
  const [tasks, setTasks] = useState(read("housekeeping", []));
  const [text, setText] = useState("");

  useEffect(() => write("housekeeping", tasks), [tasks]);

  function add() {
    if (!text) return;
    setTasks((s) => [
      ...s,
      { id: "h" + Date.now(), room: "", task: text, status: "todo" },
    ]);
    setText("");
  }

  function toggleStatus(idx) {
    setTasks((s) => {
      const c = [...s];
      c[idx].status =
        c[idx].status === "todo"
          ? "in-progress"
          : c[idx].status === "in-progress"
          ? "done"
          : "todo";
      return c;
    });
  }

  function remove(id) {
    if (!confirm("Delete task?")) return;
    setTasks((s) => s.filter((t) => t.id !== id));
  }

  return (
    <div>
      <h2>Housekeeping</h2>

      {/* Task Form */}
      <div
        style={{
          background: "var(--panel)",
          padding: 12,
          borderRadius: 12,
          marginBottom: 12,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <input
            className="input"
            placeholder="Task description"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="btn" onClick={add}>
            Add task
          </button>
        </div>
      </div>

      {/* Task List */}
      <div
        style={{
          background: "var(--panel)",
          padding: 12,
          borderRadius: 12,
        }}
      >
        <h3>Tasks</h3>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((t, idx) => (
            <li
              key={t.id}
              style={{
                padding: 10,
                background: "#fff",
                borderRadius: 8,
                marginBottom: 8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong>{t.task}</strong>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>
                  Room: {t.room || "—"}
                </div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <div
                  style={{
                    fontSize: 13,
                    color:
                      t.status === "done"
                        ? "green"
                        : t.status === "in-progress"
                        ? "orange"
                        : "#333",
                  }}
                >
                  {t.status}
                </div>
                <button className="btn" onClick={() => toggleStatus(idx)}>
                  Next
                </button>
                <button className="btn" onClick={() => remove(t.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
