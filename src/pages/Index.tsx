import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle, Package } from 'lucide-react';
import ImporterFichier from '@/components/ImporterFichier';
import TableauProduits from '@/components/TableauProduits';
import { PreviewPane } from '@/components/PreviewPane';
import ExportPDF from '@/components/ExportPDF';
import DidacticielInteractif from '@/components/DidacticielInteractif';
import UploadImages from '@/components/UploadImages';
import SettingsPanel from '@/components/SettingsPanel';
import logoPoint54 from '@/assets/logo-point54.png';
import '@/styles/print.css';

interface Product {
  CODEBAR: string;
  PRIX: string;
  DESIGNATION: string;
  REFERENCE: string;
  QR_CODE?: string;
  QRURL?: string;
  IMAGE?: string;
  QTE?: string;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentView, setCurrentView] = useState<'import' | 'table' | 'preview'>('import');
  const [productImages, setProductImages] = useState<Record<string, string>>({});

  const handleDataImported = (data: any[]) => {
    const formattedProducts = data.map((item) => ({
      CODEBAR: item.CODEBAR || '',
      PRIX: item.PRIX || '',
      DESIGNATION: item.DESIGNATION || '',
      REFERENCE: item.REFERENCE || '',
      QR_CODE: item.QR_CODE || '',
      QRURL: item.QRURL || item.QR_URL || '',
      IMAGE: item.IMAGE || item.IMAGE_PATH || '',
      QTE: item.QTE || item.QTY || '',
    }));
    setProducts(formattedProducts);
    setCurrentView('table');
  };

  const handleImagesUploaded = (images: Record<string, string>) => {
    setProductImages(images);
  };

  const selectedProducts = selectedIds
    .map(id => products[id])
    .filter(Boolean);

  // Convert selectedIds (indices) to REFERENCE strings
  const selectedRefs = selectedIds
    .map(id => products[id]?.REFERENCE)
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logoPoint54} alt="Point 54" className="w-12 h-12" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Point 54 Labels</h1>
                <p className="text-sm text-muted-foreground">Générateur d'étiquettes professionnel</p>
              </div>
            </div>
            
            <Button
              variant="secondary"
              onClick={() => setShowTutorial(true)}
              className="gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              Guide d'utilisation
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        {products.length > 0 && (
          <div className="flex gap-2 mb-6 border-b border-border">
            <button
              onClick={() => setCurrentView('import')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                currentView === 'import'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              1. Import
            </button>
            <button
              onClick={() => setCurrentView('table')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                currentView === 'table'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              2. Données ({products.length})
            </button>
            <button
              onClick={() => setCurrentView('preview')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                currentView === 'preview'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              3. Aperçu ({selectedIds.length})
            </button>
          </div>
        )}

        {/* Content Area */}
        <div className="space-y-6">
          {currentView === 'import' && (
            <div className="max-w-3xl mx-auto">
              <div className="mb-6 text-center">
                <Package className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Importez votre fichier
                </h2>
                <p className="text-muted-foreground">
                  Commencez par importer un fichier Excel ou CSV contenant vos produits
                </p>
              </div>
              <ImporterFichier onDataImported={handleDataImported} />
            </div>
          )}

          {currentView === 'table' && products.length > 0 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">
                  Gestion des produits
                </h2>
                <div className="flex gap-3">
                  <SettingsPanel />
                  <Button
                    onClick={() => setCurrentView('preview')}
                    disabled={selectedIds.length === 0}
                  >
                    Voir l'aperçu ({selectedIds.length})
                  </Button>
                </div>
              </div>

              <UploadImages
                onImagesUploaded={handleImagesUploaded}
                productReferences={products.map(p => p.REFERENCE)}
              />

              <TableauProduits
                products={products}
                onProductsChange={setProducts}
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
              />
            </div>
          )}

          {currentView === 'preview' && (
            <div>
              <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <h2 className="text-2xl font-bold text-foreground">
                  Aperçu des planches A4
                </h2>
                <div className="flex gap-3">
                  <SettingsPanel />
                  <ExportPDF selectedProducts={selectedProducts} />
                </div>
              </div>
              <PreviewPane 
                items={products}
                selectedIds={selectedRefs}
                productImages={productImages}
              />
            </div>
          )}
        </div>
      </main>

      {/* Tutorial Dialog */}
      <DidacticielInteractif
        open={showTutorial}
        onClose={() => setShowTutorial(false)}
      />
    </div>
  );
};

export default Index;
