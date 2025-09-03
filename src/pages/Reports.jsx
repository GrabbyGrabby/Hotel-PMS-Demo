import React from "react";
import { read } from "../lib/store";

export default function Reports() {
  const reports = read("reports", []);

  return (
    <div>
      <h2>Reports</h2>

      <div
        style={{
          background: "var(--panel)",
          padding: 12,
          borderRadius: 12,
        }}
      >
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Bookings</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id}>
                <td>{r.date}</td>
                <td>{r.bookings}</td>
                <td>${r.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
