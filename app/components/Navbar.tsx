"use client";

import { useState } from "react";
import styles from "./Navbar.module.css";
import { useToast } from "../context/ToastContext";


type Device = {
  name: string;
};

export default function Navbar({
  selected,
  theme,
  setTheme,
}: {
  selected?: Device;  
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
}) {

  const [appsOpen, setAppsOpen] = useState(false);

  const { showToast } = useToast();


  return (
    <header className={styles.navbar}>
      {/* Left side */}
      <div className={styles.navLeft}>
        <span className={styles.brand}>
          Google <b>Find Hub</b>
        </span>
      </div>

      {/* Right side */}
      <div className={styles.navRight}>
        <button
          className={styles.navBtn}
          onClick={() =>
            showToast(
              selected
                ? `${selected.name} is locked 🔒`
                : "No device selected"
            )
          }
        >
          🔒 Remote Lock
        </button>

        {/* 🌙 Dark Mode toggle */}
        <button
          className={styles.navBtn}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀ Light Mode"}
        </button>

        <button
          className={styles.navBtn}
          onClick={() => showToast("Feedback form opens (simulated)")}
        >
          📝 Feedback
        </button>
        <button
          className={styles.navBtn}
          onClick={() => showToast("Help section opens (simulated)")}
        >
          ❓ Help
        </button>


        {/* Apps Dropdown */}
        <div
          className={`${styles.dropdown} ${appsOpen ? styles.open : ""}`}
          onMouseEnter={() => setAppsOpen(true)}
          onMouseLeave={() => setAppsOpen(false)}
        >
          <button className={styles.navBtn}>☰ Apps</button>
          <div className={styles.dropdownContent}>
            <a href="#" target="_blank">👤 Account</a>
            <a href="https://drive.google.com" target="_blank">📂 Drive</a>
            <a href="https://mail.google.com" target="_blank">📧 Gmail</a>
            <a href="https://youtube.com" target="_blank">▶️ YouTube</a>
            <a href="https://gemini.google.com" target="_blank">✨ Gemini</a>
            <a href="https://maps.google.com" target="_blank">🗺️ Maps</a>
            <a href="https://google.com" target="_blank">🔍 Search</a>
            <a href="https://news.google.com" target="_blank">📰 News</a>
            <a href="https://calendar.google.com" target="_blank">📅 Calendar</a>
            <a href="https://photos.google.com" target="_blank">📸 Photos</a>
          </div>
        </div>

        {/* Account icon */}
        <img
          src="https://www.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png"
          alt="Account"
          className={styles.avatar}
        />
      </div>
    </header>
  );
}
