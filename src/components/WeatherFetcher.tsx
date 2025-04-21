
import { useEffect, useState } from "react";
import { AlertTriangle, CloudRain, Thermometer, Droplet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WeatherFetcherProps {
  lat: number;
  lng: number;
}

// Fetch weather data from Open-Meteo
async function fetchWeather(lat: number, lng: number) {
  // Get current weather, humidity, and precipitation for this location
  // Returns: temperature_2m, relative_humidity_2m, precipitation, weathercode
  // Docs: https://open-meteo.com/en/docs
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,precipitation,weathercode`;
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
    <div className="w-full">
      {error && (
        <div className="flex items-center gap-2 text-red-700 text-xs mb-2 p-2 bg-red-50 rounded-md">
          <AlertTriangle className="h-4 w-4" />
          <p>{error}</p>
        </div>
      )}
      
      {weather && !error && (
        <Card className="bg-gradient-to-br from-agriculture-50 to-agriculture-100 border-agriculture-200">
          <CardContent className="p-4">
            <div className="text-agriculture-800 font-semibold text-md mb-2">
              Weather Conditions
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 bg-white/60 px-3 py-2 rounded-lg shadow-sm">
                <Thermometer className="h-5 w-5 text-agriculture-700" />
                <div>
                  <span className="text-lg font-bold text-agriculture-900">
                    {weather.temperature_2m != null ? `${Math.round(weather.temperature_2m)}°C` : "--"}
                  </span>
                  <span className="ml-1 text-gray-500 text-xs">Temperature</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-white/60 px-3 py-2 rounded-lg shadow-sm">
                <Droplet className="h-5 w-5 text-blue-500" />
                <div>
                  <span className="font-semibold text-agriculture-700">
                    {weather.relative_humidity_2m != null ? `${weather.relative_humidity_2m}%` : "--"}
                  </span>
                  <span className="ml-1 text-gray-500 text-xs">Humidity</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-white/60 px-3 py-2 rounded-lg shadow-sm">
                <CloudRain className="h-5 w-5 text-blue-500" />
                <div>
                  <span className="font-semibold text-agriculture-700">
                    {weather.precipitation != null
                      ? `${weather.precipitation} mm`
                      : "0 mm"}
                  </span>
                  <span className="ml-1 text-gray-500 text-xs">Precipitation</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
