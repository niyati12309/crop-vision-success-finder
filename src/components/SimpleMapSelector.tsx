
import { useEffect, useState } from "react";
import { MapContainer as RLMapContainer, TileLayer as RLTileLayer, Marker as RLMarker, useMapEvents, Popup as RLPopup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import WeatherFetcher from "./WeatherFetcher";

interface MapSelectorProps {
  onLocationSelect: (lat: number, lng: number, locationName: string) => void;
}

const DEFAULT = {
  lat: 20.5937,
  lng: 78.9629,
  name: "India"
};

const markerIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

// Custom component for map click
function MapClicker({ setLocation }: { setLocation: React.Dispatch<React.SetStateAction<typeof DEFAULT>> }) {
  useMapEvents({
    click(e) {
      setLocation({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        name: `Lat: ${e.latlng.lat.toFixed(3)}, Lng: ${e.latlng.lng.toFixed(3)}`
      });
    }
  });
  return null;
}

export function SimpleMapSelector({ onLocationSelect }: MapSelectorProps) {
  const [location, setLocation] = useState(DEFAULT);

  useEffect(() => {
    onLocationSelect(location.lat, location.lng, location.name);
  }, [location, onLocationSelect]);

  // Quick selectors for popular agri-regions
  const regions = [
    { id: "punjab", label: "Punjab, India", lat: 31.1471, lng: 75.3412 },
    { id: "maharashtra", label: "Maharashtra, India", lat: 19.7515, lng: 75.7139 },
    { id: "karnataka", label: "Karnataka, India", lat: 15.3173, lng: 75.7139 },
    { id: "gujarat", label: "Gujarat, India", lat: 22.2587, lng: 71.1924 },
    { id: "westbengal", label: "West Bengal, India", lat: 22.9868, lng: 87.855 },
  ];

  return (
    <div className="border border-agriculture-200 rounded-lg overflow-hidden shadow-md bg-white">
      <div className="bg-agriculture-50 p-4">
        <h3 className="text-agriculture-800 font-medium mb-2">Select Location (OpenStreetMap)</h3>
        <p className="text-sm text-agriculture-600 mb-4">
          Choose a farming region by clicking on the map or quick-select a region.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setLocation({ lat: region.lat, lng: region.lng, name: region.label })}
              className={`p-2 rounded-md text-sm text-left ${
                location.name === region.label
                  ? "bg-agriculture-600 text-white"
                  : "bg-white border border-agriculture-200 text-agriculture-800 hover:bg-agriculture-100"
              }`}
              type="button"
            >
              {region.label}
            </button>
          ))}
        </div>
        <div className="rounded-md overflow-hidden" style={{ height: 260 }}>
          <RLMapContainer
            center={[location.lat, location.lng]}
            zoom={5}
            style={{ height: 240, width: "100%" }}
            scrollWheelZoom={false}
          >
            <RLTileLayer
              attribution='© <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <RLMarker position={[location.lat, location.lng]} icon={markerIcon}>
              <RLPopup>
                <span>{location.name}</span>
              </RLPopup>
            </RLMarker>
            <MapClicker setLocation={setLocation} />
          </RLMapContainer>
        </div>
      </div>
      {/* Weather info */}
      <div className="p-4 bg-white">
        <WeatherFetcher lat={location.lat} lng={location.lng} />
        <div className="mt-3 p-3 bg-agriculture-50 rounded-md">
          <p className="text-sm text-agriculture-700">
            <strong>Selected Location:</strong> {location.name}
          </p>
          <p className="text-xs text-agriculture-600">
            Coordinates: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </p>
        </div>
      </div>
    </div>
  );
}
