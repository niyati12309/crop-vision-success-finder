
import { useEffect, useState } from "react";

// Util for getting and setting API key in localStorage
function getStoredApiKey() {
  return localStorage.getItem("weatherapi_key") || "";
}

function setStoredApiKey(key: string) {
  localStorage.setItem("weatherapi_key", key);
}

interface WeatherFetcherProps {
  lat: number;
  lng: number;
}

// Fetch weather data from weatherapi.com
async function fetchWeather(lat: number, lng: number, apiKey: string) {
  // weatherapi.com expects q as "latitude,longitude"
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lng}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather fetch error");
  return res.json();
}

export default function WeatherFetcher({ lat, lng }: WeatherFetcherProps) {
  const [apiKey, setApiKey] = useState(getStoredApiKey());
  const [inputKey, setInputKey] = useState(apiKey);
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!apiKey) {
      setWeather(null);
      setError("Please enter your WeatherAPI.com API key below.");
      return;
    }
    setError("");
    fetchWeather(lat, lng, apiKey)
      .then((data) => setWeather(data))
      .catch((err) => setError("Could not fetch weather data. Invalid key or quota exceeded."));
  }, [lat, lng, apiKey]);

  const handleKeySave = () => {
    setApiKey(inputKey);
    setStoredApiKey(inputKey);
  };

  return (
    <div>
      {!apiKey && (
        <div className="mb-2">
          <label className="block text-agriculture-800 mb-1 text-sm font-medium">
            WeatherAPI.com API Key:
          </label>
          <input
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            placeholder="Paste your WeatherAPI.com API Key"
            className="border border-agriculture-300 rounded px-2 py-1 text-sm"
          />
          <button
            onClick={handleKeySave}
            className="ml-2 px-2 py-1 text-xs bg-agriculture-600 text-white rounded"
          >
            Save Key
          </button>
          <p className="text-xs mt-1 text-gray-600">
            Get free API key at{" "}
            <a href="https://weatherapi.com/" target="_blank" rel="noopener noreferrer" className="text-blue-900 underline">
              weatherapi.com
            </a>
          </p>
        </div>
      )}
      {error && <p className="text-red-700 text-xs mb-2">{error}</p>}
      {weather && !error && (
        <div className="bg-agriculture-50 rounded-md p-3 mb-2">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <div className="text-agriculture-800 font-semibold text-md">
                {weather.current?.condition?.text || "Weather"}
              </div>
              <div className="text-agriculture-700 text-xs">
                <span>
                  {weather.location?.name}, {weather.location?.region}
                </span>
              </div>
            </div>
            <div>
              <span className="text-lg font-bold text-agriculture-900">
                {weather.current?.temp_c != null ? `${Math.round(weather.current.temp_c)}°C` : "--"}
              </span>
              <span className="ml-1 text-gray-500 text-xs">Temp</span>
            </div>
            <div>
              <span className="font-semibold text-agriculture-700">
                Humidity: {weather.current?.humidity != null ? `${weather.current.humidity}%` : "--"}
              </span>
            </div>
            <div>
              <span className="font-semibold text-agriculture-700">
                Rain:{" "}
                {weather.current?.precip_mm != null
                  ? `${weather.current.precip_mm} mm`
                  : "0 mm"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
