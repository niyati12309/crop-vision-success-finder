
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface SeasonSelectorProps {
  onSeasonSelect: (season: string, month: string) => void;
}

export function SeasonSelector({ onSeasonSelect }: SeasonSelectorProps) {
  const [selectedSeason, setSelectedSeason] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  
  const seasons = [
    { name: "Kharif", months: ["June", "July", "August", "September"] },
    { name: "Rabi", months: ["October", "November", "December", "January"] },
    { name: "Zaid", months: ["February", "March", "April", "May"] }
  ];
  
  const handleSeasonChange = (value: string) => {
    setSelectedSeason(value);
    setSelectedMonth(""); // Reset month when season changes
  };
  
  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
    onSeasonSelect(selectedSeason, value);
  };
  
  // Get months for selected season
  const availableMonths = seasons.find(s => s.name === selectedSeason)?.months || [];
  
  return (
    <div className="border border-agriculture-200 rounded-lg overflow-hidden shadow-md">
      <div className="p-4 bg-agriculture-50">
        <h3 className="text-agriculture-800 font-medium">Select Growing Season</h3>
        <p className="text-sm text-agriculture-600 mt-1">
          Choose the planting season and month for your crop
        </p>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="season-select">Growing Season</Label>
            <Select value={selectedSeason} onValueChange={handleSeasonChange}>
              <SelectTrigger 
                id="season-select"
                className="w-full border-agriculture-200 focus:ring-agriculture-500"
              >
                <SelectValue placeholder="Select a season" />
              </SelectTrigger>
              <SelectContent>
                {seasons.map((season) => (
                  <SelectItem key={season.name} value={season.name}>
                    {season.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedSeason && (
            <div className="space-y-2">
              <Label htmlFor="month-select">Planting Month</Label>
              <Select 
                value={selectedMonth} 
                onValueChange={handleMonthChange}
                disabled={!selectedSeason}
              >
                <SelectTrigger 
                  id="month-select"
                  className="w-full border-agriculture-200 focus:ring-agriculture-500"
                >
                  <SelectValue placeholder="Select a month" />
                </SelectTrigger>
                <SelectContent>
                  {availableMonths.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {selectedSeason && selectedMonth && (
            <div className="bg-agriculture-50 p-3 rounded-md">
              <p className="text-sm text-agriculture-700">
                <span className="font-medium">Selected:</span> {selectedSeason} season ({selectedMonth})
              </p>
              <p className="text-xs text-agriculture-600 mt-1">
                {selectedSeason === "Kharif" && "Monsoon crops planted during the rainy season."}
                {selectedSeason === "Rabi" && "Winter crops planted during the post-monsoon season."}
                {selectedSeason === "Zaid" && "Summer crops planted during the short season between Rabi and Kharif."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
