
// Mock data for plant identification
export const identifyPlant = (imageUrl: string): Promise<{
  plantName: string;
  scientificName: string;
  confidence: number;
  description: string;
}> => {
  // This simulates an API call to identify a plant
  return new Promise((resolve) => {
    setTimeout(() => {
      // Randomly select a plant from our predefined list
      const plants = [
        {
          plantName: "Rice",
          scientificName: "Oryza sativa",
          confidence: 95.8,
          description: "Rice is the seed of the grass species Oryza sativa. As a cereal grain, it is the most widely consumed staple food for a large part of the world's human population, especially in Asia and Africa."
        },
        {
          plantName: "Wheat",
          scientificName: "Triticum aestivum",
          confidence: 92.3,
          description: "Wheat is a grass widely cultivated for its seed, a cereal grain which is a worldwide staple food. The many species of wheat together make up the genus Triticum."
        },
        {
          plantName: "Maize (Corn)",
          scientificName: "Zea mays",
          confidence: 94.6,
          description: "Maize, also known as corn, is a cereal grain first domesticated by indigenous peoples in southern Mexico about 10,000 years ago."
        },
        {
          plantName: "Cotton",
          scientificName: "Gossypium hirsutum",
          confidence: 88.7,
          description: "Cotton is a soft, fluffy staple fiber that grows in a boll, or protective case, around the seeds of the cotton plants. It is a natural fiber most commonly harvested from cotton plants."
        },
        {
          plantName: "Chickpea",
          scientificName: "Cicer arietinum",
          confidence: 87.2,
          description: "The chickpea is an annual legume of the family Fabaceae. It is one of the earliest cultivated legumes, and currently grown in many countries worldwide."
        }
      ];
      
      const selectedPlant = plants[Math.floor(Math.random() * plants.length)];
      
      resolve(selectedPlant);
    }, 1500); // Simulate network delay
  });
};

// Mock data for crop prediction
export const predictCropSuccess = (
  cropName: string,
  location: { lat: number; lng: number; name: string },
  season: string,
  month: string
): Promise<{
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
}> => {
  // This simulates an API call to predict crop success
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate random scores that favor certain crops in certain regions
      let suitabilityScore = Math.floor(Math.random() * 30) + 50; // Base score between 50-80
      let successRate = Math.floor(Math.random() * 30) + 50; // Base success rate
      let soilCompatibility = Math.floor(Math.random() * 5) + 3; // Base soil score
      
      // Adjust scores based on crop and location combinations
      if (
        (cropName === "Rice" && location.name.includes("Bengal")) ||
        (cropName === "Wheat" && location.name.includes("Punjab")) ||
        (cropName === "Cotton" && location.name.includes("Gujarat")) ||
        (cropName === "Coffee" && location.name.includes("Karnataka"))
      ) {
        suitabilityScore += 15;
        successRate += 15;
        soilCompatibility += 2;
      }
      
      // Season adjustments
      if (
        (cropName === "Rice" && season === "Kharif") ||
        (cropName === "Wheat" && season === "Rabi") ||
        (cropName === "Cotton" && season === "Kharif") ||
        (cropName === "Maize" && season === "Kharif")
      ) {
        suitabilityScore += 10;
        successRate += 10;
      }
      
      // Cap scores at 100%
      suitabilityScore = Math.min(suitabilityScore, 98);
      successRate = Math.min(successRate, 98);
      soilCompatibility = Math.min(soilCompatibility, 10);
      
      const alternativeCrops = getAlternativeCrops(cropName, location.name, season);
      const rainfall = getRegionalRainfall(location.name);
      const humidity = getRegionalHumidity(location.name);
      const recommendations = generateRecommendations(cropName, suitabilityScore, location.name, season);
      const yieldEstimate = generateYieldEstimate(cropName, suitabilityScore);
      
      resolve({
        cropName,
        location: location.name,
        season,
        month,
        suitabilityScore,
        successRate,
        soilCompatibility,
        yieldEstimate,
        alternativeCrops,
        rainfall,
        humidity,
        recommendations
      });
    }, 2000); // Simulate network delay
  });
};

// Helper functions for generating realistic looking mock data
function getAlternativeCrops(crop: string, location: string, season: string): string[] {
  const kharifCrops = ["Rice", "Maize", "Cotton", "Mung Bean", "Black Gram", "Pigeon Pea"];
  const rabiCrops = ["Wheat", "Chickpea", "Lentil", "Mustard", "Peas"];
  
  let alternatives: string[];
  
  if (season === "Kharif") {
    alternatives = kharifCrops.filter(c => c !== crop);
  } else {
    alternatives = rabiCrops.filter(c => c !== crop);
  }
  
  // Randomize and take 2-3 alternatives
  alternatives.sort(() => Math.random() - 0.5);
  return alternatives.slice(0, Math.floor(Math.random() * 2) + 2);
}

function getRegionalRainfall(location: string): string {
  if (location.includes("Bengal") || location.includes("Karnataka")) {
    return "High (>1000mm)";
  } else if (location.includes("Maharashtra") || location.includes("Gujarat")) {
    return "Moderate (500-1000mm)";
  } else if (location.includes("Punjab")) {
    return "Low (300-500mm)";
  } else {
    return "Moderate (500-1000mm)";
  }
}

function getRegionalHumidity(location: string): string {
  if (location.includes("Bengal") || location.includes("Kerala")) {
    return "High (70-80%)";
  } else if (location.includes("Maharashtra") || location.includes("Karnataka")) {
    return "Moderate (50-60%)";
  } else {
    return "Low (30-50%)";
  }
}

function generateRecommendations(crop: string, score: number, location: string, season: string): string {
  if (score >= 80) {
    return `${crop} is highly suitable for cultivation in ${location} during ${season} season. Ensure proper irrigation and maintain recommended plant spacing for optimal yield.`;
  } else if (score >= 60) {
    return `${crop} can be grown in ${location} during ${season} season with proper care. Consider using drought-resistant varieties and focus on soil moisture conservation.`;
  } else {
    return `${crop} is not ideal for ${location} during ${season} season. Consider our alternative crop recommendations that are better suited to your location's climate and soil conditions.`;
  }
}

function generateYieldEstimate(crop: string, score: number): string {
  const cropYields: Record<string, [number, string]> = {
    "Rice": [4.5, "tons per hectare"],
    "Wheat": [3.2, "tons per hectare"],
    "Maize": [5.7, "tons per hectare"],
    "Cotton": [1.8, "tons per hectare"],
    "Chickpea": [1.2, "tons per hectare"],
    "Mung Bean": [0.8, "tons per hectare"],
    "Black Gram": [0.7, "tons per hectare"],
    "Pigeon Pea": [1.0, "tons per hectare"]
  };
  
  // Get base yield for the crop, or use default value
  const [baseYield, unit] = cropYields[crop] || [2.5, "tons per hectare"];
  
  // Adjust yield based on suitability score
  const adjustmentFactor = score / 75;
  const estimatedYield = baseYield * adjustmentFactor;
  
  return `${estimatedYield.toFixed(1)} ${unit}`;
}
