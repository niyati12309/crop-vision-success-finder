
import { useState, useEffect } from "react";

interface PlantIdentificationResultProps {
  imageUrl: string;
  plantName: string;
  scientificName: string;
  confidence: number;
  description: string;
  onReset: () => void;
}

export function PlantIdentificationResult({
  imageUrl,
  plantName,
  scientificName,
  confidence,
  description,
  onReset
}: PlantIdentificationResultProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div 
      className={`max-w-3xl mx-auto transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="bg-white border border-agriculture-200 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-agriculture-700 py-6 px-6 text-white">
          <h2 className="text-2xl font-bold">Plant Identification Result</h2>
          <p className="text-agriculture-100 mt-1">
            We've identified your plant with {Math.round(confidence)}% confidence
          </p>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="rounded-lg overflow-hidden border border-agriculture-200">
                <img 
                  src={imageUrl} 
                  alt={plantName} 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-agriculture-800">{plantName}</h3>
              <p className="text-agriculture-600 italic mb-4">{scientificName}</p>
              
              <div className="mb-4 flex items-center">
                <div className="w-full bg-agriculture-100 rounded-full h-2.5 mr-2">
                  <div 
                    className="bg-agriculture-600 h-2.5 rounded-full" 
                    style={{ width: `${confidence}%` }}
                  ></div>
                </div>
                <span className="text-sm text-agriculture-700">{Math.round(confidence)}% match</span>
              </div>
              
              <div className="bg-agriculture-50 p-4 rounded-lg mb-4">
                <h4 className="text-agriculture-800 font-medium mb-2">Description</h4>
                <p className="text-agriculture-700 text-sm">{description}</p>
              </div>
              
              <button
                onClick={onReset}
                className="mt-4 bg-agriculture-600 hover:bg-agriculture-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Identify Another Plant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
