import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';

interface Product {
  CODEBAR: string;
  PRIX: string;
  DESIGNATION: string;
  REFERENCE: string;
}

interface ExportPDFProps {
  selectedProducts: Product[];
}

const ExportPDF = ({ selectedProducts }: ExportPDFProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (selectedProducts.length === 0) {
      toast.error('Aucune étiquette sélectionnée');
      return;
    }

    setIsExporting(true);
    
    try {
      // Get all page elements
      const pages = document.querySelectorAll('.page-a4-3x7');

      if (pages.length === 0) {
        toast.error('Aucune planche à exporter');
        setIsExporting(false);
        return;
      }

      // A4 dimensions in mm
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i] as HTMLElement;
        
        // Capture the page as canvas
        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/png');
        
        if (i > 0) {
          pdf.addPage();
        }
        
        // Add image to PDF at actual A4 size
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      }

      // Save the PDF
      const fileName = `etiquettes-point54-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
      toast.success('PDF exporté avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'export PDF:', error);
      toast.error('Erreur lors de l\'export PDF');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button 
      onClick={handleExport} 
      disabled={isExporting || selectedProducts.length === 0}
      size="lg"
      className="w-full sm:w-auto"
    >
      {isExporting ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Exportation en cours...
        </>
      ) : (
        <>
          <Download className="w-5 h-5 mr-2" />
          Exporter en PDF
        </>
      )}
    </Button>
  );
};

export default ExportPDF;
