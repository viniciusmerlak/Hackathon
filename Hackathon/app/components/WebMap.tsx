import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Importe o Leaflet para tipagem
import "leaflet/dist/leaflet.css";

// Definindo o tipo para as coordenadas
interface Coordinate {
  lat: number;
  lng: number;
}

const WebMap = () => {
  const center: Coordinate = { lat: -23.5505, lng: -46.6333 }; // Coordenadas do centro do mapa
  const markerPosition: Coordinate = { lat: -23.5505, lng: -46.6333 }; // Posição do marcador

  return (
    <MapContainer
      center={center} // Usando o objeto de coordenadas tipado
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={markerPosition}>
        <Popup>Exemplo de marcador</Popup>
      </Marker>
    </MapContainer>
  );
};

export default WebMap;