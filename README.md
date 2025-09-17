📍 Find Hub – Find My Device (UI Clone)

A Next.js demo project that mimics Google’s Find My Device interface.
It displays a list of devices, their locations on a map, and allows simulated actions like Ring, Remote Lock, and Factory Reset.

<!-- optional: replace with real screenshot -->

🚀 Features

📍 Interactive map with device markers (Leaflet + OpenStreetMap).

🔍 Sidebar with device search & quick selection.

📱 Device details panel with battery, model, last seen, and location info.

🔔 Simulated device actions: Ring & Factory Reset.

🌙 Light/Dark theme toggle with persistence (localStorage).

📝 Toast notifications for user actions.

🎨 Responsive, modern UI styled with CSS modules + custom design tokens.

🔽 Google-style Navbar with apps dropdown, feedback & help options.

🛠️ Tech Stack

Next.js (App Router) – React framework.

React Leaflet + Leaflet – Map rendering.

TypeScript – Type safety.

CSS Modules & Custom CSS Vars – Theming + styling.



📂 Project Structure

find-my-device/
├── app/
│   ├── components/      # Reusable UI components (Navbar, MapView, Toast, etc.)
│   ├── data/            # Static device data
│   ├── globals.css      # Global styles & theme variables
│   ├── layout.tsx       # Root layout & theme loader
│   ├── page.tsx         # Main dashboard (sidebar + map)
│   └── page.module.css  # Page & sidepanel styling



⚡ Getting Started
1️⃣ Clone & Install
npm install

2️⃣ Run the Dev Server
npm run dev


🎯 Usage

Select a device from the sidebar.

View details in the right-side panel.

Perform simulated actions:

🔔 Ring → shows toast.

⚠ Factory reset → shows warning toast.

Toggle Light/Dark mode from the navbar.

Explore the map – click markers to select devices.



