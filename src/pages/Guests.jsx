import React, { useEffect, useState } from "react";
import { read, write } from "../lib/store";

export default function Guests() {
  const [guests, setGuests] = useState(read("guests", []));
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => write("guests", guests), [guests]);

  function add() {
    if (!form.name) return alert("name required");

    setGuests((s) => [...s, { ...form, id: "g" + Date.now() }]);

    setForm({ name: "", phone: "", email: "" });
  }

  function remove(id) {
    if (!confirm("Delete guest?")) return;
    setGuests((s) => s.filter((g) => g.id !== id));
  }

  return (
    <div>
      <h2>Guests</h2>

      {/* Guest Form */}
      <div
      
        style={{
          background: "var(--panel)",
          padding: 12,
          borderRadius: 12,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <input
            className="input"
            placeholder="Name"
            
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          
          <input
            className="input"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            className="input"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <button className="btn" onClick={add}>
            Add Guest
          </button>
        </div>
      </div>

      {/* Guest List */}
      <div
        style={{
          marginTop: 12,
          background: "var(--panel)",
          padding: 12,
          borderRadius: 12,
        }}
      >
        <h3>Guest list</h3>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {guests.map((g) => (
              <tr key={g.id}>
                <td>{g.name}</td>
                <td>{g.phone}</td>
                <td>{g.email}</td>
                <td>
                  <button className="btn" onClick={() => remove(g.id)}>
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
