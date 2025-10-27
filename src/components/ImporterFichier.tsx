import { useState } from 'react';
import { Upload, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as XLSX from 'xlsx';

interface ImporterFichierProps {
  onDataImported: (data: any[]) => void;
}

const ImporterFichier = ({ onDataImported }: ImporterFichierProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        
        // Filter out QTE column if present
        const filteredData = jsonData.map((row: any) => {
          const { QTE, ...rest } = row;
          return rest;
        });
        
        setFileName(file.name);
        onDataImported(filteredData);
      } catch (error) {
        console.error('Erreur lors de la lecture du fichier:', error);
        alert('Erreur lors de la lecture du fichier. Vérifiez le format.');
      }
    };
    
    reader.readAsArrayBuffer(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.csv'))) {
      handleFile(file);
    } else {
      alert('Veuillez déposer un fichier .xlsx ou .csv');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className="w-full">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          isDragging ? 'border-primary bg-accent' : 'border-border bg-card'
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          {fileName ? (
            <>
              <FileSpreadsheet className="w-16 h-16 text-primary" />
              <div>
                <p className="text-lg font-medium text-foreground">{fileName}</p>
                <p className="text-sm text-muted-foreground mt-1">Fichier importé avec succès</p>
              </div>
            </>
          ) : (
            <>
              <Upload className="w-16 h-16 text-muted-foreground" />
              <div>
                <p className="text-lg font-medium text-foreground">
                  Glissez-déposez votre fichier ici
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  ou cliquez pour sélectionner un fichier .xlsx ou .csv
                </p>
              </div>
            </>
          )}
          
          <label htmlFor="file-input">
            <Button variant="default" className="cursor-pointer" asChild>
              <span>{fileName ? 'Importer un autre fichier' : 'Sélectionner un fichier'}</span>
            </Button>
          </label>
          <input
            id="file-input"
            type="file"
            accept=".xlsx,.csv"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default ImporterFichier;
