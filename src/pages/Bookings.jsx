import React, { useEffect, useState } from "react";
import { read, write } from "../lib/store";

export default function Bookings() {
  const [bookings, setBookings] = useState(read("bookings", []));
  const [guests, setGuests] = useState(read("guests", []));
  const [form, setForm] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    roomNumber: "",
    from: "",
    to: "",
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    write("bookings", bookings);
  }, [bookings]);

  useEffect(() => {
    write("guests", guests);
  }, [guests]);

  function addBooking() {
    if (!form.guestName || !form.roomNumber) {
      return alert("Guest name and Room number are required");
    }

    // save booking with status = upcoming
    setBookings((prev) => [
      ...prev,
      { ...form, id: "b" + Date.now(), status: "upcoming" },
    ]);

    // save guest if new
    if (form.guestName) {
      const exists = guests.find((g) => g.email === form.guestEmail);
      if (!exists) {
        setGuests((prev) => [
          ...prev,
          {
            id: "g" + Date.now(),
            name: form.guestName,
            email: form.guestEmail,
            phone: form.guestPhone,
          },
        ]);
      }
    }

    setForm({
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      roomNumber: "",
      from: "",
      to: "",
    });
    setShowForm(false);
  }

  function removeBooking(id) {
    if (!confirm("Delete booking?")) return;
    setBookings((prev) => prev.filter((b) => b.id !== id));
  }

  function checkIn(id) {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "checked-in" } : b))
    );
  }

  function checkOut(id) {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "checked-out" } : b))
    );
  }

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <h2 style={{ fontWeight: 600 }}>Bookings</h2>

      {/* Toggle Button */}
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
            + Add Booking
          </button>
        </div>
      )}

      {/* Booking Form */}
      {showForm && (
        <div
          style={{
            background:"#0DDBB5",
            padding: 24,
            borderRadius: 16,
            boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
            maxWidth: 720,
            margin: "20px auto",
          }}
        >
          <h3 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 600 }}>
            Create a New Booking
          </h3>
          <p style={{ margin: "0 0 20px", color: "var(--muted)", fontSize: 14 }}>
            Enter guest details, assign a room, and select booking dates.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
            }}
          >
            <div>
              <label style={{ fontSize: 13, fontWeight: 500 }}>Guest Name</label>
              <input
                className="input"
                placeholder="John Doe"
                value={form.guestName}
                onChange={(e) =>
                  setForm({ ...form, guestName: e.target.value })
                }
                style={{ marginTop: 6 }}
              />
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 500 }}>Guest Email</label>
              <input
                className="input"
                placeholder="john@example.com"
                value={form.guestEmail}
                onChange={(e) =>
                  setForm({ ...form, guestEmail: e.target.value })
                }
                style={{ marginTop: 6 }}
              />
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 500 }}>Guest Phone</label>
              <input
                className="input"
                placeholder="1234567890"
                value={form.guestPhone}
                onChange={(e) =>
                  setForm({ ...form, guestPhone: e.target.value })
                }
                style={{ marginTop: 6 }}
              />
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 500 }}>Room Number</label>
              <input
                className="input"
                placeholder="101"
                value={form.roomNumber}
                onChange={(e) =>
                  setForm({ ...form, roomNumber: e.target.value })
                }
                style={{ marginTop: 6 }}
              />
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 500 }}>Check-in</label>
              <input
                type="date"
                className="input"
                value={form.from}
                onChange={(e) => setForm({ ...form, from: e.target.value })}
                style={{ marginTop: 6 }}
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 500 }}>Check-out</label>
              <input
                type="date"
                className="input"
                value={form.to}
                onChange={(e) => setForm({ ...form, to: e.target.value })}
                style={{ marginTop: 6 }}
              />
            </div>
          </div>

          <div style={{ marginTop: 20, textAlign: "right" }}>
            <button
              onClick={addBooking}
              style={{
                background: "#070707ff",
                border: "none",
                color: "#f6f1f1ff",
                padding: "12px 20px",
                borderRadius: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Add Booking
            </button>
          </div>
        </div>
      )}

      {/* Booking List */}
      <div
        style={{
          marginTop: 24,
          background: "var(--panel)",
          padding: 20,
          borderRadius: 16,
        }}
      >
        <h3 style={{ margin: "0 0 12px", fontWeight: 600 }}>All Bookings</h3>
        <table className="table" style={{ fontFamily: "'Poppins', sans-serif" }}>
          <thead>
            <tr>
              <th>Guest</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.guestName}</td>
                <td>{b.guestEmail}</td>
                <td>{b.guestPhone}</td>
                <td>{b.roomNumber}</td>
                <td>{b.from}</td>
                <td>{b.to}</td>
                <td>{b.status}</td>
                <td style={{ display: "flex", gap: 6 }}>
                  {b.status === "upcoming" && (
                    <button
                      onClick={() => checkIn(b.id)}
                      style={{
                        background: "green",
                        color: "#fff",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: 6,
                        cursor: "pointer",
                      }}
                    >
                      Check-in
                    </button>
                  )}
                  {b.status === "checked-in" && (
                    <button
                      onClick={() => checkOut(b.id)}
                      style={{
                        background: "orange",
                        color: "#fff",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: 6,
                        cursor: "pointer",
                      }}
                    >
                      Check-out
                    </button>
                  )}
                  <button
                    onClick={() => removeBooking(b.id)}
                    style={{
                      background: "#000", // 🔹 black instead of red
                      border: "none",
                      color: "#fff",
                      padding: "6px 10px",
                      borderRadius: 6,
                      cursor: "pointer",
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
