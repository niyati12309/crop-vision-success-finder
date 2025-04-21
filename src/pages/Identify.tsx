
import { useState } from "react";
import { Header } from "@/components/Header";
import { ImageUploader } from "@/components/ImageUploader";
import { ImageCropper } from "@/components/ImageCropper";
import { PlantIdentificationResult } from "@/components/PlantIdentificationResult";
import { identifyPlant } from "@/utils/mockData";

const Identify = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [croppingImage, setCroppingImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [identificationResult, setIdentificationResult] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageSelected = (imageDataUrl: string) => {
    setUploadedImage(imageDataUrl);
  };

  const handleCropRequested = (imageDataUrl: string) => {
    setCroppingImage(imageDataUrl);
  };

  const handleCropComplete = (croppedImageUrl: string) => {
    setCroppingImage(null);
    setCroppedImage(croppedImageUrl);
    
    // Automatically identify the plant after cropping
    identifyPlantImage(croppedImageUrl);
  };

  const handleCropCancel = () => {
    setCroppingImage(null);
  };

  const identifyPlantImage = async (imageUrl: string) => {
    setIsLoading(true);
    
    try {
      const result = await identifyPlant(imageUrl);
      setIdentificationResult({
        imageUrl,
        ...result
      });
    } catch (error) {
      console.error("Error identifying plant:", error);
      alert("There was an error identifying the plant. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setUploadedImage(null);
    setCroppedImage(null);
    setIdentificationResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        {!identificationResult ? (
          <>
            <div className="max-w-3xl mx-auto mb-8">
              <h1 className="text-3xl font-bold text-agriculture-800 mb-2">Plant Identification</h1>
              <p className="text-agriculture-600">
                Upload a photo of a plant to identify and get detailed information
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <ImageUploader 
                onImageSelected={handleImageSelected}
                onCropRequested={handleCropRequested}
              />
              
              {isLoading && (
                <div className="mt-8 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-agriculture-500 border-t-transparent"></div>
                  <p className="mt-2 text-agriculture-700">Identifying plant...</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <PlantIdentificationResult 
            {...identificationResult}
            onReset={handleReset}
          />
        )}
      </main>
      
      {croppingImage && (
        <ImageCropper 
          imageUrl={croppingImage}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}
    </div>
  );
};

export default Identify;
