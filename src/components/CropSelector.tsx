
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface CropSelectorProps {
  onCropSelect: (crop: string) => void;
}

export function CropSelector({ onCropSelect }: CropSelectorProps) {
  const [selectedCrop, setSelectedCrop] = useState<string>("");
  
  const crops = [
    "Rice", "Wheat", "Maize", "Chickpea", "Kidney Bean", "Pigeon Pea",
    "Moth Bean", "Mung Bean", "Black Gram", "Lentil", "Pomegranate",
    "Banana", "Mango", "Grapes", "Watermelon", "Muskmelon", "Apple",
    "Orange", "Papaya", "Coconut", "Cotton", "Jute", "Coffee"
  ];
  
  const handleCropChange = (value: string) => {
    setSelectedCrop(value);
    onCropSelect(value);
  };
  
  return (
    <div className="border border-agriculture-200 rounded-lg overflow-hidden shadow-md">
      <div className="p-4 bg-agriculture-50">
        <h3 className="text-agriculture-800 font-medium">Select Crop</h3>
        <p className="text-sm text-agriculture-600 mt-1">
          Choose the crop you'd like to analyze for success prediction
        </p>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="crop-select">Crop Type</Label>
            <Select value={selectedCrop} onValueChange={handleCropChange}>
              <SelectTrigger 
                id="crop-select"
                className="w-full border-agriculture-200 focus:ring-agriculture-500"
              >
                <SelectValue placeholder="Select a crop" />
              </SelectTrigger>
              <SelectContent>
                {crops.map((crop) => (
                  <SelectItem key={crop} value={crop}>
                    {crop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedCrop && (
            <div className="bg-agriculture-50 p-3 rounded-md">
              <p className="text-sm text-agriculture-700">
                <span className="font-medium">Selected:</span> {selectedCrop}
              </p>
              <p className="text-xs text-agriculture-600 mt-1">
                We'll analyze soil compatibility and success rate for {selectedCrop.toLowerCase()} cultivation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
