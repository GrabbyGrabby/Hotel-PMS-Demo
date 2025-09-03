import React, { useEffect, useState } from "react";
import { read, write } from "../lib/store";

export default function Rates() {
  const [rates, setRates] = useState(read("rates", []));
  const [form, setForm] = useState({ type: "", rate: 0 });

  useEffect(() => {
    write("rates", rates);
  }, [rates]);

  function add() {
    if (!form.type) return;
    setRates((prev) => [
      ...prev,
      { ...form, id: "rt" + Date.now() },
    ]);
    setForm({ type: "", rate: 0 });
  }

  function remove(id) {
    if (!confirm("Delete rate?")) return;
    setRates((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div>
      <h2>Rates</h2>

      {/* Add Rate Form */}
      <div style={{ background: "var(--panel)", padding: 12, borderRadius: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            className="input"
            placeholder="Type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          />
          <input
            className="input"
            placeholder="Rate"
            type="number"
            value={form.rate}
            onChange={(e) =>
              setForm({ ...form, rate: Number(e.target.value) })
            }
          />
          <button className="btn" onClick={add}>
            Add rate
          </button>
        </div>
      </div>

      {/* Rates Table */}
      <div
        style={{
          marginTop: 12,
          background: "var(--panel)",
          padding: 12,
          borderRadius: 12,
        }}
      >
        <h3>All rates</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rates.map((r) => (
              <tr key={r.id}>
                <td>{r.type}</td>
                <td>{r.rate}</td>
                <td>
                  <button className="btn" onClick={() => remove(r.id)}>
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
