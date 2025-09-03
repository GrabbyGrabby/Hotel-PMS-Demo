import React from "react";
import { read } from "../lib/store";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  CalendarCheck,
  CalendarX,
  Users,
  BedDouble,
  BarChart3,
} from "lucide-react";

export default function Dashboard() {
  const bookings = read("bookings", []);
  const rooms = read("rooms", []);
  const guests = read("guests", []);
  const reports = read("reports", []);

  // Occupancy
  const occupied = rooms.filter((r) => r.status === "occupied").length;
  const occupancy =
    rooms.length > 0 ? Math.round((occupied / rooms.length) * 100) : 0;

  // Today’s check-ins & check-outs
  const today = new Date().toISOString().slice(0, 10);
  const checkIns = bookings.filter((b) => b.from === today).length;
  const checkOuts = bookings.filter((b) => b.to === today).length;

  // Chart data
  const chartData = reports.map((r) => ({
    name: r.date.slice(-2), // day of month
    bookings: r.bookings,
    revenue: r.revenue,
  }));

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Dashboard</h2>

      {/* KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
        }}
      >
        <KpiCard
          icon={<Users size={22} />}
          label="Guests"
          value={guests.length}
          gradient="linear-gradient(135deg,#000)"
        />

        <KpiCard
          icon={<BedDouble size={22} />}
          label="Rooms"
          value={rooms.length}
         gradient="linear-gradient(135deg,#000)"
        />

        <KpiCard
          icon={<BarChart3 size={22} />}
          label="Occupancy"
          value={`${occupancy}%`}
         gradient="linear-gradient(135deg,#000)"
        />

        <KpiCard
          icon={<CalendarCheck size={22} />}
          label="Check-ins Today"
          value={checkIns}
          gradient="linear-gradient(135deg,#000)"
        />

        <KpiCard
          icon={<CalendarX size={22} />}
          label="Check-outs Today"
          value={checkOuts}
          gradient="linear-gradient(135deg,#000)"
        />
      </div>

      {/* Chart Section */}
      <div
        style={{
          marginTop: 24,
          background: "var(--panel)",
          padding: 20,
          borderRadius: 16,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: 12 }}>
          Revenue & Bookings (Last 10 Days)
        </h3>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" stroke="var(--muted)" />
              <YAxis stroke="var(--muted)" />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  background: "#fff",
                  border: "1px solid #eee",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#101011ff"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#f0fbfbff"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div
        style={{
          marginTop: 24,
          background: "var(--panel)",
          padding: 20,
          borderRadius: 16,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: 12 }}>Recent Bookings</h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {bookings.slice(-5).reverse().map((b) => (
            <li
              key={b.id}
              style={{
                padding: "10px 0",
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                fontSize: 14,
              }}
            >
              <span>
                Guest ID: <strong>{b.guestId}</strong> — Room{" "}
                <strong>{b.roomNumber}</strong>
              </span>
              <span>
                {b.from} → {b.to}
              </span>
            </li>
          ))}
          {bookings.length === 0 && (
            <li style={{ padding: "10px 0", fontSize: 14, color: "var(--muted)" }}>
              No bookings yet.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

/* Reusable KPI Card component */
function KpiCard({ icon, label, value, gradient }) {
  return (
    <div
      style={{
        background: gradient,
        color: "#fff",
        borderRadius: 16,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {icon}
        <span style={{ fontSize: 14, opacity: 0.9 }}>{label}</span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, marginTop: 8 }}>{value}</div>
    </div>
  );
}
