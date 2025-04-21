
import { useState } from "react";
import { SimpleMapSelector } from "@/components/SimpleMapSelector";
import { CropSelector } from "@/components/CropSelector";
import { SeasonSelector } from "@/components/SeasonSelector";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { WaterRequirementCalculator } from "@/components/WaterRequirementCalculator";
import { SmsAlertSystem } from "@/components/SmsAlertSystem";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { predictCropSuccess } from "@/utils/mockData";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

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
    <div className="min-h-screen bg-gradient-to-b from-white to-agriculture-50">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        {!predictionResult ? (
          <>
            <div className="max-w-4xl mx-auto mb-8">
              <h1 className="text-3xl font-bold text-agriculture-800 mb-2">FarmSightAI - Smart Farming Assistant</h1>
              <p className="text-agriculture-600 max-w-2xl">
                Our AI-powered system analyzes crop suitability, provides water requirement estimates, 
                and offers real-time weather alerts to optimize your farming operations.
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-6">
                <Card className="border-agriculture-200 shadow-md overflow-hidden">
                  <CardHeader className="bg-agriculture-50 pb-4">
                    <CardTitle className="text-lg text-agriculture-800">Step 1: Select Your Crop</CardTitle>
                    <CardDescription>Choose the crop you want to analyze</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <CropSelector onCropSelect={handleCropSelect} />
                  </CardContent>
                </Card>
                
                <Card className="border-agriculture-200 shadow-md overflow-hidden">
                  <CardHeader className="bg-agriculture-50 pb-4">
                    <CardTitle className="text-lg text-agriculture-800">Step 2: Select Season</CardTitle>
                    <CardDescription>Choose when you plan to grow your crop</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <SeasonSelector onSeasonSelect={handleSeasonSelect} />
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="border-agriculture-200 shadow-md overflow-hidden">
                  <CardHeader className="bg-agriculture-50 pb-4">
                    <CardTitle className="text-lg text-agriculture-800">Step 3: Select Location</CardTitle>
                    <CardDescription>Choose your farming region</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 pb-0 px-0">
                    <SimpleMapSelector onLocationSelect={handleLocationSelect} />
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className="bg-agriculture-50 p-5 rounded-lg shadow-md mb-8 text-center">
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`px-8 py-6 text-lg bg-agriculture-700 hover:bg-agriculture-800 transition-colors ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Analyzing..." : "Predict Crop Success"}
                </Button>
                <p className="text-xs text-agriculture-600 mt-2">
                  Our AI will analyze soil conditions, climate data, and seasonal patterns to predict success
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <WaterRequirementCalculator />
                {location && <SmsAlertSystem location={location.name} />}
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-5xl mx-auto">
            <ResultsDisplay 
              predictionData={predictionResult} 
              onNewPrediction={handleNewPrediction} 
            />
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <WaterRequirementCalculator />
              {location && <SmsAlertSystem location={location.name} />}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Predict;
