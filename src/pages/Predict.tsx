
import { useState } from "react";
import { SimpleMapSelector } from "@/components/SimpleMapSelector";
import { CropSelector } from "@/components/CropSelector";
import { SeasonSelector } from "@/components/SeasonSelector";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { predictCropSuccess } from "@/utils/mockData";

const Predict = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number; name: string } | null>(null);
  const [crop, setCrop] = useState<string>("");
  const [season, setSeason] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [predictionResult, setPredictionResult] = useState<any | null>(null);

  const handleLocationSelect = (lat: number, lng: number, locationName: string) => {
    setLocation({ lat, lng, name: locationName });
  };

  const handleCropSelect = (cropName: string) => {
    setCrop(cropName);
  };

  const handleSeasonSelect = (seasonName: string, monthName: string) => {
    setSeason(seasonName);
    setMonth(monthName);
  };

  const handleSubmit = async () => {
    if (!location || !crop || !season || !month) {
      alert("Please fill in all the required fields.");
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await predictCropSuccess(crop, location, season, month);
      setPredictionResult(result);
    } catch (error) {
      console.error("Error making prediction:", error);
      alert("There was an error making the prediction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewPrediction = () => {
    setPredictionResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        {!predictionResult ? (
          <>
            <div className="max-w-4xl mx-auto mb-8">
              <h1 className="text-3xl font-bold text-agriculture-800 mb-2">Farming Success Predictor</h1>
              <p className="text-agriculture-600">
                Analyze crop suitability based on location, soil conditions, and season
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mb-8">
              <CropSelector onCropSelect={handleCropSelect} />
              <SimpleMapSelector onLocationSelect={handleLocationSelect} />
              <div className="md:col-span-2">
                <SeasonSelector onSeasonSelect={handleSeasonSelect} />
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto flex justify-center mt-8">
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`px-8 py-6 text-lg bg-agriculture-700 hover:bg-agriculture-800 transition-colors ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Analyzing..." : "Predict Crop Success"}
              </Button>
            </div>
          </>
        ) : (
          <ResultsDisplay 
            predictionData={predictionResult} 
            onNewPrediction={handleNewPrediction} 
          />
        )}
      </main>
    </div>
  );
};

export default Predict;
