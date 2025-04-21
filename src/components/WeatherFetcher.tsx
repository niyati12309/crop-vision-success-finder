
import { useEffect, useState } from "react";

interface WeatherFetcherProps {
  lat: number;
  lng: number;
}

// Fetch weather data from Open-Meteo
async function fetchWeather(lat: number, lng: number) {
  // Get current weather, humidity, and precipitation for this location
  // Returns: temperature_2m, relative_humidity_2m, precipitation, weathercode
  // Docs: https://open-meteo.com/en/docs
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,precipitation`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather fetch error");
  return res.json();
}

export default function WeatherFetcher({ lat, lng }: WeatherFetcherProps) {
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setWeather(null);
    setError("");
    fetchWeather(lat, lng)
      .then((data) => {
        setWeather(data?.current || null);
      })
      .catch((err) => setError("Could not fetch weather data from Open-Meteo."));
  }, [lat, lng]);

  return (
    <div>
      {error && <p className="text-red-700 text-xs mb-2">{error}</p>}
      {weather && !error && (
        <div className="bg-agriculture-50 rounded-md p-3 mb-2">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <div className="text-agriculture-800 font-semibold text-md">
                Weather @ Lat: {lat.toFixed(2)}, Lng: {lng.toFixed(2)}
              </div>
            </div>
            <div>
              <span className="text-lg font-bold text-agriculture-900">
                {/* temperature_2m in °C */}
                {weather.temperature_2m != null ? `${Math.round(weather.temperature_2m)}°C` : "--"}
              </span>
              <span className="ml-1 text-gray-500 text-xs">Temp</span>
            </div>
            <div>
              <span className="font-semibold text-agriculture-700">
                Humidity:{" "}
                {weather.relative_humidity_2m != null ? `${weather.relative_humidity_2m}%` : "--"}
              </span>
            </div>
            <div>
              <span className="font-semibold text-agriculture-700">
                Rain:{" "}
                {weather.precipitation != null
                  ? `${weather.precipitation} mm`
                  : "0 mm"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
