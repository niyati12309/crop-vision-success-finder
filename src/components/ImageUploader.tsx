
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Crop, Image } from "lucide-react";

interface ImageUploaderProps {
  onImageSelected: (image: string) => void;
  onCropRequested: (image: string) => void;
}

export function ImageUploader({ onImageSelected, onCropRequested }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageDataUrl = e.target?.result as string;
      setPreviewUrl(imageDataUrl);
      onImageSelected(imageDataUrl);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleCropClick = () => {
    if (previewUrl) {
      onCropRequested(previewUrl);
    }
  };

  return (
    <div className="border border-agriculture-200 rounded-lg overflow-hidden shadow-md bg-white">
      <div className="p-4 bg-agriculture-50">
        <h3 className="text-agriculture-800 font-medium">Upload Plant Image</h3>
        <p className="text-sm text-agriculture-600 mt-1">
          Upload a clear image of the plant you want to identify
        </p>
      </div>

      <div className="p-4">
        <div className="flex flex-col items-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {!previewUrl ? (
            <div 
              onClick={triggerFileInput}
              className="border-2 border-dashed border-agriculture-200 rounded-lg p-8 w-full
                        flex flex-col items-center justify-center cursor-pointer
                        hover:bg-agriculture-50 transition-colors"
            >
              <Image className="h-12 w-12 text-agriculture-400 mb-3" />
              <p className="text-agriculture-800 font-medium">Click to upload</p>
              <p className="text-sm text-agriculture-500 mt-1">or drag and drop</p>
              <p className="text-xs text-agriculture-400 mt-2">PNG, JPG, GIF up to 10MB</p>
            </div>
          ) : (
            <div className="w-full">
              <div className="relative mb-4 rounded-lg overflow-hidden border border-agriculture-200">
                <img
                  src={previewUrl}
                  alt="Uploaded plant"
                  className="w-full h-auto max-h-[300px] object-contain"
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={triggerFileInput} 
                  variant="outline" 
                  className="w-1/2"
                >
                  <Image className="mr-2 h-4 w-4" />
                  Change Image
                </Button>
                <Button 
                  onClick={handleCropClick} 
                  className="w-1/2 bg-agriculture-600 hover:bg-agriculture-700"
                >
                  <Crop className="mr-2 h-4 w-4" />
                  Crop Image
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
