
import { useState } from "react";

interface MapSelectorProps {
  onLocationSelect: (lat: number, lng: number, locationName: string) => void;
}

export function SimpleMapSelector({ onLocationSelect }: MapSelectorProps) {
  const [location, setLocation] = useState({
    lat: 20.5937,
    lng: 78.9629,
    name: "India"
  });

  // Simulated location selection since we're having TypeScript issues with react-leaflet
  const handleLocationChange = (id: string) => {
    let newLocation = { ...location };
    
    // Predefined locations
    switch(id) {
      case "punjab":
        newLocation = { lat: 31.1471, lng: 75.3412, name: "Punjab, India" };
        break;
      case "maharashtra":
        newLocation = { lat: 19.7515, lng: 75.7139, name: "Maharashtra, India" };
        break;
      case "karnataka":
        newLocation = { lat: 15.3173, lng: 75.7139, name: "Karnataka, India" };
        break;
      case "gujarat":
        newLocation = { lat: 22.2587, lng: 71.1924, name: "Gujarat, India" };
        break;
      case "westbengal":
        newLocation = { lat: 22.9868, lng: 87.8550, name: "West Bengal, India" };
        break;
      default:
        newLocation = { lat: 20.5937, lng: 78.9629, name: "India" };
    }
    
    setLocation(newLocation);
    onLocationSelect(newLocation.lat, newLocation.lng, newLocation.name);
  };

  return (
    <div className="border border-agriculture-200 rounded-lg overflow-hidden shadow-md">
      <div className="bg-agriculture-50 p-4">
        <h3 className="text-agriculture-800 font-medium mb-2">Select Location</h3>
        <p className="text-sm text-agriculture-600 mb-4">
          Choose a farming region to analyze crop suitability
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {["punjab", "maharashtra", "karnataka", "gujarat", "westbengal"].map((region) => (
            <button
              key={region}
              onClick={() => handleLocationChange(region)}
              className={`p-2 rounded-md text-sm ${
                location.name.toLowerCase().includes(region) 
                  ? "bg-agriculture-600 text-white" 
                  : "bg-white border border-agriculture-200 text-agriculture-800 hover:bg-agriculture-100"
              }`}
            >
              {region.charAt(0).toUpperCase() + region.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-4 bg-white">
        <div className="bg-gray-100 rounded-lg h-[250px] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-60 bg-gradient-to-b from-agriculture-50 to-agriculture-100 flex items-center justify-center">
            <p className="text-agriculture-800 font-medium text-center px-4">
              Map visualization would appear here <br/>
              <span className="text-sm font-normal">Currently displaying: {location.name}</span>
            </p>
          </div>
        </div>
        
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
