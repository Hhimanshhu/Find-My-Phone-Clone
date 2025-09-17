"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { DEVICES } from "./data/devices";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import Modal from "./components/Modal"; // ✅ new modal

// Dynamically load Map (Leaflet needs window)
const MapView = dynamic(() => import("./components/MapView"), { ssr: false });

type Device = typeof DEVICES[number];

export default function Page() {
  const [toast, setToast] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Device | null>(DEVICES[0] ?? null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [modal, setModal] = useState<{ action: "ring" | "reset"; device: Device } | null>(null);

  // ✅ Actions
  const onRing = (d: Device) => setToast(`${d.name} is ringing 🔔`);
  const onFactoryReset = (d: Device) =>
    setToast(`⚠ Factory reset command sent for ${d.name} (simulated)`);

  // Load theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) setTheme(saved);
  }, []);

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Filter devices
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DEVICES;
    return DEVICES.filter((d) =>
      [d.name, d.location].some((v) => v.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <>
      <Navbar selected={selected} theme={theme} setTheme={setTheme} />

      <main className="wrapper" style={{ paddingTop: "60px" }}>
        {/* Sidebar */}
        <section className="sidebar">
          {/* 🔎 Search box */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Search device..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="list">
            {filtered.map((d) => (
              <div
                key={d.id}
                className={`item ${selected?.id === d.id ? "active" : ""}`}
                onClick={() => setSelected(d)}
                title={`Open ${d.name}`}
              >
                <div className="thumb">
                  {d.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </div>
                <div className="meta">
                  <div className="name">{d.name}</div>
                  <div className="loc">📍 {d.location}</div>
                </div>
                <div className="battery">🔋 {d.battery}%</div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p style={{ padding: "12px 6px", color: "var(--subtext)" }}>
                No devices match “{query}”.
              </p>
            )}
          </div>

          {selected && (
            <aside className="sidepanel fade-in">
              <div className="panel-header">
                <button className="closebtn" onClick={() => setSelected(null)}>
                  ✖
                </button>
                <h2>{selected.name}</h2>
                <p>
                  {selected.model ?? "—"} • Last seen: {selected.lastSeen}
                </p>
              </div>

              <div className="panel-body">
                <p>📍 {selected.location}</p>
                <p>🔋 {selected.battery}% battery</p>
                <p>
                  🌍 Lat: {selected.lat}, Lng: {selected.lng}
                </p>
              </div>

              <div className="actions">
                <button
                  className="iconbtn primary"
                  onClick={() => setModal({ action: "ring", device: selected })}
                >
                  🔔 Ring
                </button>
                <button
                  className="iconbtn danger"
                  onClick={() => setModal({ action: "reset", device: selected })}
                >
                  ⚠ Factory reset
                </button>
              </div>
            </aside>
          )}
        </section>

        {/* Map */}
        <section className="card mapwrap fade-in">
          <div className="header">
            <div style={{ fontWeight: 700 }}>Map</div>
            <div className="toolbar">
              <span className="badge">Markers are dummy</span>
            </div>
          </div>
          <div className="map">
            <MapView
              devices={[...filtered]}
              selectedId={selected?.id ?? 0}
              onSelect={(id) =>
                setSelected(DEVICES.find((d) => d.id === id) ?? selected)
              }
            />
          </div>
        </section>
      </main>

      {/* ✅ Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* ✅ Modal */}
      {modal && (
        <Modal
          title={modal.action === "ring" ? "Ring Device" : "Factory Reset"}
          message={
            modal.action === "ring"
              ? `Do you want to ring ${modal.device.name}?`
              : `This will erase all data on ${modal.device.name}. Continue?`
          }
          onCancel={() => setModal(null)}
          onConfirm={() => {
            if (modal.action === "ring") onRing(modal.device);
            else onFactoryReset(modal.device);
            setModal(null);
          }}
        />
      )}
    </>
  );
}
