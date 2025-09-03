import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Bed,
  Users,
  ListChecks,
  BarChart3,
  Settings,
} from "lucide-react";

const items = [
  { label: "Dashboard", to: "/", icon: <LayoutDashboard /> },
  { label: "Bookings", to: "/bookings", icon: <Calendar /> },
  { label: "Rooms", to: "/rooms", icon: <Bed /> },
  { label: "Guests", to: "/guests", icon: <Users /> },
  { label: "Housekeeping", to: "/housekeeping", icon: <ListChecks /> },
  { label: "Reports", to: "/reports", icon: <BarChart3 /> },
  { label: "Settings", to: "/settings", icon: <Settings /> },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <aside className={`sidebar ${open ? "" : "collapsed"}`}>
      <div className="brand">
        <div className="logo"></div>
        <div className="title">{open && "RNS Hotel"}</div>
        <button className="toggle" onClick={() => setOpen((o) => !o)}>
          {open ? "◀" : "▶"}
        </button>
      </div>

      <nav className="nav">
        {items.map((it) => (
          <NavLink key={it.to} to={it.to}>
            <div className="icon">{it.icon}</div>
            {open && <div>{it.label}</div>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
