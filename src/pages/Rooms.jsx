import React, { useEffect, useState } from "react";
import { read, write } from "../lib/store";

export default function Rooms() {
  const [rooms, setRooms] = useState(() => {
    const saved = read("rooms", []);
    return saved.filter((r) => r && r.id);
  });

  const [form, setForm] = useState({ number: "", type: "", rate: "" });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    write("rooms", rooms);
  }, [rooms]);

  function add() {
    if (!form.number || !form.rate || !form.type)
      return alert("Room number, type & rate required");

    const newRoom = {
      ...form,
      id: "r" + Date.now(),
      status: "available",
      rate: Number(form.rate),
    };

    setRooms((prev) => [...prev, newRoom]);
    setForm({ number: "", type: "", rate: "" });
    setShowForm(false);
  }

  function toggleStatus(idx) {
    setRooms((prev) => {
      const updated = [...prev];
      const currentStatus = updated[idx].status;

      updated[idx].status =
        currentStatus === "available"
          ? "occupied"
          : currentStatus === "occupied"
          ? "cleaning"
          : "available";

      return updated;
    });
  }

  function remove(id) {
    if (!confirm("Delete room?")) return;
    setRooms((prev) => prev.filter((room) => room.id !== id));
  }

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <h2>Rooms</h2>

      {/* Add Room Button */}
      {!showForm && (
        <div style={{ marginBottom: 20 }}>
          <button
            onClick={() => setShowForm(true)}
            style={{
              background: "#000",
              color: "#fff",
              border: "none",
              padding: "14px 22px",
              borderRadius: 12,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 16,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            + Add Room
          </button>
        </div>
      )}

      {/* Add Room Form */}
      {showForm && (
        <div
          style={{
            background: "#0DDBB5",
            padding: 24,
            borderRadius: 16,
            boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
            maxWidth: 600,
            marginBottom: 20,
          }}
        >
          <h3 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: 600 }}>
            Add New Room
          </h3>
          <p style={{ margin: "0 0 20px", color: "var(--muted)", fontSize: 14 }}>
            Fill in the details to create a new room.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
            }}
          >
            {/* Room Number */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 500 }}>Room Number</label>
              <input
                className="input"
                placeholder="101"
                value={form.number}
                onChange={(e) => setForm({ ...form, number: e.target.value })}
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                  marginTop: 6,
                }}
              />
            </div>

            {/* Room Type (removed dropdown, now text input) */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 500 }}>Room Type</label>
              <input
                className="input"
                placeholder="Single / Double / Suite"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                  marginTop: 6,
                }}
              />
            </div>

            {/* Rate */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 500 }}>Rate (₹)</label>
              <input
                className="input"
                placeholder="100"
                type="number"
                value={form.rate}
                onChange={(e) => setForm({ ...form, rate: e.target.value })}
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                  marginTop: 6,
                }}
              />
            </div>
          </div>

          <div
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "flex-end",
              gap: 12,
            }}
          >
            <button
              onClick={() => setShowForm(false)}
              style={{
                background: "#888",
                border: "none",
                color: "#fff",
                padding: "10px 16px",
                borderRadius: 10,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Cancel
            </button>
            <button
              onClick={add}
              style={{
                background: "#000",
                border: "none",
                color: "#fff",
                padding: "10px 16px",
                borderRadius: 10,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Save Room
            </button>
          </div>
        </div>
      )}

      {/* Rooms Table */}
      <div
        style={{
          marginTop: 12,
          background: "var(--panel)",
          padding: 20,
          borderRadius: 16,
        }}
      >
        <h3 style={{ margin: "0 0 12px" }}>All Rooms</h3>
        <table className="table" style={{ fontFamily: "'Poppins', sans-serif" }}>
          <thead>
            <tr>
              <th>No</th>
              <th>Type</th>
              <th>Rate</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((r, idx) => (
              <tr key={r.id}>
                <td>{r.number}</td>
                <td>{r.type}</td>
                <td>₹{r.rate}</td>
                <td>{r.status}</td>
                <td style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => toggleStatus(idx)}
                    style={{
                      background: "#444",
                      border: "none",
                      color: "#fff",
                      padding: "6px 12px",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontSize: 13,
                    }}
                  >
                    Toggle
                  </button>
                  <button
                    onClick={() => remove(r.id)}
                    style={{
                      background: "#000",
                      border: "none",
                      color: "#fff",
                      padding: "6px 12px",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontSize: 13,
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
