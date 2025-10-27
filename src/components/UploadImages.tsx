import { useState } from 'react';
import { Upload, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface UploadImagesProps {
  onImagesUploaded: (images: Record<string, string>) => void;
  productReferences: string[];
}

const UploadImages = ({ onImagesUploaded, productReferences }: UploadImagesProps) => {
  const [uploadedCount, setUploadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const imageMap: Record<string, string> = {};
    let matched = 0;

    setTotalCount(files.length);

    for (const file of files) {
      // Extract filename without extension
      const fileName = file.name.replace(/\.[^/.]+$/, '');
      
      // Check if this filename matches any product reference
      const matchingRef = productReferences.find(ref => 
        ref.toLowerCase() === fileName.toLowerCase()
      );

      if (matchingRef) {
        // Convert to base64
        const reader = new FileReader();
        await new Promise<void>((resolve) => {
          reader.onload = (event) => {
            imageMap[matchingRef] = event.target?.result as string;
            matched++;
            setUploadedCount(matched);
            resolve();
          };
          reader.readAsDataURL(file);
        });
      }
    }

    onImagesUploaded(imageMap);
    toast.success(`${matched} image(s) associée(s) sur ${files.length}`);
  };

  return (
    <div className="w-full bg-card rounded-lg border border-border p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <ImageIcon className="w-10 h-10 text-primary" />
        </div>
        
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Images des produits
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Sélectionnez un dossier contenant les images nommées selon les références produits
          </p>
          
          {uploadedCount > 0 && (
            <div className="flex items-center gap-2 text-sm text-green-600 mb-4">
              <CheckCircle2 className="w-5 h-5" />
              <span>{uploadedCount} image(s) chargée(s)</span>
            </div>
          )}

          <label htmlFor="image-folder">
            <Button variant="default" className="cursor-pointer" asChild>
              <span>
                <Upload className="w-4 h-4 mr-2" />
                Charger les images
              </span>
            </Button>
          </label>
          <input
            id="image-folder"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default UploadImages;
