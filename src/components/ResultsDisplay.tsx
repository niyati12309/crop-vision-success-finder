
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

interface PredictionResult {
  cropName: string;
  location: string;
  season: string;
  month: string;
  suitabilityScore: number;
  successRate: number;
  soilCompatibility: number;
  yieldEstimate: string;
  alternativeCrops: string[];
  rainfall: string;
  humidity: string;
  recommendations: string;
}

interface ResultsDisplayProps {
  predictionData: PredictionResult;
  onNewPrediction: () => void;
}

export function ResultsDisplay({ predictionData, onNewPrediction }: ResultsDisplayProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const getSuitabilityLabel = (score: number) => {
    if (score >= 80) return { label: "Highly Suitable", color: "text-green-600" };
    if (score >= 60) return { label: "Suitable", color: "text-agriculture-600" };
    if (score >= 40) return { label: "Moderately Suitable", color: "text-amber-600" };
    return { label: "Not Suitable", color: "text-red-600" };
  };
  
  const getSoilCompatibilityLabel = (score: number) => {
    if (score >= 7) return { label: "Good", color: "text-green-600" };
    if (score >= 5) return { label: "Average", color: "text-amber-600" };
    return { label: "Poor", color: "text-red-600" };
  };
  
  const { label: suitabilityLabel, color: suitabilityColor } = getSuitabilityLabel(predictionData.suitabilityScore);
  const { label: soilLabel, color: soilColor } = getSoilCompatibilityLabel(predictionData.soilCompatibility);
  
  return (
    <div 
      className={`max-w-4xl mx-auto transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="bg-white border border-agriculture-200 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-agriculture-700 py-6 px-6 text-white">
          <h2 className="text-2xl font-bold">Crop Success Prediction Results</h2>
          <p className="text-agriculture-100 mt-1">
            Analysis for {predictionData.cropName} in {predictionData.location}
          </p>
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Suitability Score */}
            <div className="bg-agriculture-50 rounded-lg p-5">
              <h3 className="text-xl text-agriculture-800 font-medium mb-3">Crop Suitability</h3>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-agriculture-700">Suitability Score</span>
                  <span className={`text-sm font-medium ${suitabilityColor}`}>
                    {predictionData.suitabilityScore}%
                  </span>
                </div>
                <Progress 
                  value={predictionData.suitabilityScore} 
                  className="h-2 bg-agriculture-200" 
                />
                <p className={`text-sm mt-2 font-medium ${suitabilityColor}`}>
                  {suitabilityLabel}
                </p>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-agriculture-700">Success Rate</span>
                  <span className="text-sm font-medium text-agriculture-800">
                    {predictionData.successRate}%
                  </span>
                </div>
                <Progress 
                  value={predictionData.successRate} 
                  className="h-2 bg-agriculture-200" 
                />
              </div>
            </div>
            
            {/* Soil Compatibility */}
            <div className="bg-agriculture-50 rounded-lg p-5">
              <h3 className="text-xl text-agriculture-800 font-medium mb-3">Soil Compatibility</h3>
              
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 rounded-full bg-white border-8 flex items-center justify-center"
                       style={{ borderColor: predictionData.soilCompatibility >= 7 
                                          ? '#22c55e' 
                                          : predictionData.soilCompatibility >= 5 
                                            ? '#d97706' 
                                            : '#dc2626' }}>
                    <span className="text-2xl font-bold text-agriculture-800">
                      {predictionData.soilCompatibility}/10
                    </span>
                  </div>
                  <div>
                    <p className={`font-medium ${soilColor}`}>{soilLabel}</p>
                    <p className="text-sm text-agriculture-600 mt-1">Soil quality rating</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-white p-3 rounded-md">
                    <p className="text-agriculture-700">Rainfall</p>
                    <p className="font-medium text-agriculture-800">{predictionData.rainfall}</p>
                  </div>
                  <div className="bg-white p-3 rounded-md">
                    <p className="text-agriculture-700">Humidity</p>
                    <p className="font-medium text-agriculture-800">{predictionData.humidity}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Yield Estimate */}
            <div className="border border-agriculture-200 rounded-lg p-5">
              <h3 className="text-lg text-agriculture-800 font-medium mb-3">Expected Yield</h3>
              <p className="text-agriculture-700">{predictionData.yieldEstimate}</p>
            </div>
            
            {/* Alternative Crops */}
            <div className="border border-agriculture-200 rounded-lg p-5">
              <h3 className="text-lg text-agriculture-800 font-medium mb-3">Alternative Recommendations</h3>
              {predictionData.alternativeCrops.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {predictionData.alternativeCrops.map((crop, index) => (
                    <span 
                      key={index}
                      className="bg-agriculture-100 text-agriculture-800 px-3 py-1 rounded-full text-sm"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-agriculture-700">No alternative crops recommended.</p>
              )}
            </div>
          </div>
          
          {/* Recommendations */}
          <div className="mt-6 border border-agriculture-200 rounded-lg p-5">
            <h3 className="text-lg text-agriculture-800 font-medium mb-3">Recommendations</h3>
            <p className="text-agriculture-700">{predictionData.recommendations}</p>
          </div>
          
          <div className="mt-8 flex justify-center">
            <button
              onClick={onNewPrediction}
              className="bg-agriculture-600 hover:bg-agriculture-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Make Another Prediction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
