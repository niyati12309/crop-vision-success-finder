
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { fabric } from "fabric";

interface ImageCropperProps {
  imageUrl: string;
  onCropComplete: (croppedImageUrl: string) => void;
  onCancel: () => void;
}

export function ImageCropper({ imageUrl, onCropComplete, onCancel }: ImageCropperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [cropRect, setCropRect] = useState<fabric.Rect | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Initialize canvas
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 600,
      height: 400,
      backgroundColor: "#f0f0f0",
    });
    
    setCanvas(fabricCanvas);
    
    // Load the image
    fabric.Image.fromURL(imageUrl, (img) => {
      // Scale the image to fit within canvas
      const scale = Math.min(
        fabricCanvas.getWidth() / img.width!,
        fabricCanvas.getHeight() / img.height!
      ) * 0.8;
      
      img.scale(scale);
      
      // Center the image
      img.set({
        left: fabricCanvas.getWidth() / 2,
        top: fabricCanvas.getHeight() / 2,
        originX: 'center',
        originY: 'center',
        selectable: false,
      });
      
      fabricCanvas.add(img);
      fabricCanvas.centerObject(img);
      
      // Create crop rectangle
      const rect = new fabric.Rect({
        width: img.getScaledWidth() * 0.8,
        height: img.getScaledHeight() * 0.8,
        left: fabricCanvas.getWidth() / 2,
        top: fabricCanvas.getHeight() / 2,
        fill: 'rgba(0,0,0,0)',
        stroke: '#22c55e',
        strokeWidth: 2,
        strokeDashArray: [5, 5],
        originX: 'center',
        originY: 'center',
        cornerColor: '#22c55e',
        cornerSize: 10,
        transparentCorners: false,
        hasRotatingPoint: false,
      });
      
      fabricCanvas.add(rect);
      setCropRect(rect);
      
      fabricCanvas.setActiveObject(rect);
      fabricCanvas.renderAll();
    });
    
    return () => {
      fabricCanvas.dispose();
    };
  }, [imageUrl]);
  
  const handleCrop = () => {
    if (!canvas || !cropRect) return;
    
    // Get the crop rectangle dimensions
    const rect = cropRect;
    const left = rect.left! - rect.width! / 2;
    const top = rect.top! - rect.height! / 2;
    const width = rect.width! * rect.scaleX!;
    const height = rect.height! * rect.scaleY!;
    
    // Create a new canvas with just the cropped area
    const tempCanvas = document.createElement('canvas');
    const tempContext = tempCanvas.getContext('2d');
    tempCanvas.width = width;
    tempCanvas.height = height;
    
    // Find the image object
    const originalImage = canvas.getObjects().find(obj => obj.type === 'image');
    if (!originalImage || !(originalImage instanceof fabric.Image)) return;
    
    // Calculate the portion of the image to crop
    const img = new Image();
    img.src = imageUrl;
    
    img.onload = () => {
      if (!tempContext) return;
      
      // Draw the cropped portion to our temp canvas
      const imgElement = originalImage.getElement() as HTMLImageElement;
      const { left: imgLeft, top: imgTop, scaleX, scaleY } = originalImage;
      
      tempContext.drawImage(
        imgElement,
        (left - (imgLeft! - originalImage.width! * scaleX! / 2)) / scaleX!,
        (top - (imgTop! - originalImage.height! * scaleY! / 2)) / scaleY!,
        width / scaleX!,
        height / scaleY!,
        0, 0, width, height
      );
      
      // Convert the canvas to data URL
      const croppedImageUrl = tempCanvas.toDataURL('image/jpeg');
      onCropComplete(croppedImageUrl);
    };
  };
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-4">
        <h2 className="text-xl font-semibold text-agriculture-800 mb-4">Crop Your Image</h2>
        
        <div className="border border-agriculture-200 rounded-lg overflow-hidden mb-4">
          <canvas ref={canvasRef} />
        </div>
        
        <div className="flex gap-3 justify-end">
          <Button 
            variant="outline" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCrop} 
            className="bg-agriculture-600 hover:bg-agriculture-700"
          >
            Apply Crop
          </Button>
        </div>
      </div>
    </div>
  );
}
