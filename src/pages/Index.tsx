import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle, Package } from 'lucide-react';
import ImporterFichier from '@/components/ImporterFichier';
import TableauProduits from '@/components/TableauProduits';
import ApercuPlanche from '@/components/ApercuPlanche';
import ExportPDF from '@/components/ExportPDF';
import DidacticielInteractif from '@/components/DidacticielInteractif';
import logoPoint54 from '@/assets/logo-point54.png';

interface Product {
  CODEBAR: string;
  PRIX: string;
  DESIGNATION: string;
  REFERENCE: string;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentView, setCurrentView] = useState<'import' | 'table' | 'preview'>('import');

  const handleDataImported = (data: any[]) => {
    const formattedProducts = data.map((item) => ({
      CODEBAR: item.CODEBAR || '',
      PRIX: item.PRIX || '',
      DESIGNATION: item.DESIGNATION || '',
      REFERENCE: item.REFERENCE || '',
    }));
    setProducts(formattedProducts);
    setCurrentView('table');
  };

  const selectedProducts = selectedIds
    .map(id => products[id])
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
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Gestion des produits
                </h2>
                <Button
                  onClick={() => setCurrentView('preview')}
                  disabled={selectedIds.length === 0}
                >
                  Voir l'aperçu ({selectedIds.length})
                </Button>
              </div>
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
                <ExportPDF selectedProducts={selectedProducts} />
              </div>
              <ApercuPlanche selectedProducts={selectedProducts} />
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
