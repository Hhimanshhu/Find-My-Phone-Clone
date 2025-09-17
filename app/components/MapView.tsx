"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


type Device = {
  id: number; name: string; location: string; lat: number; lng: number; battery: number;
};

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

export default function MapView({
  devices, selectedId, onSelect
}: { devices: Device[]; selectedId: number; onSelect: (id:number)=>void }) {

  const selected = devices.find(d => d.id === selectedId) ?? devices[0];
const center: [number, number] = selected
  ? [selected.lat, selected.lng]
  : [20.59, 78.96]; // India-ish


  return (
    <MapContainer center={center} zoom={4} scrollWheelZoom className="leaflet-container" style={{height:"100%", width:"100%"}}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Recenter position={center} />
      {devices.map(d=>(
        <Marker key={d.id} position={[d.lat, d.lng]} icon={icon} eventHandlers={{ click:()=>onSelect(d.id) }}>
          <Popup>
            <div style={{fontWeight:700}}>{d.name}</div>
            <div>📍 {d.location}</div>
            <div>🔋 {d.battery}%</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

function Recenter({ position }:{ position:[number,number] }) {
  const map = useMap();
  map.setView(position);
  return null;
}
