import logoPoint54 from '@/assets/logo-point54.png';

interface Product {
  CODEBAR: string;
  PRIX: string;
  DESIGNATION: string;
  REFERENCE: string;
}

interface ApercuPlancheProps {
  selectedProducts: Product[];
}

const ApercuPlanche = ({ selectedProducts }: ApercuPlancheProps) => {
  // Calculate pages needed (24 labels per page - 3 columns x 8 rows)
  // Label dimensions: 72mm x 32mm
  const labelsPerPage = 24;
  const pages = Math.ceil(selectedProducts.length / labelsPerPage);
  
  const renderLabel = (product: Product) => (
    <div className="label-box bg-white border border-gray-400 flex flex-col h-full overflow-hidden">
      {/* Logo - Top Left Corner */}
      <div className="px-1 pt-1 pb-0.5">
        <img src={logoPoint54} alt="Point 54" className="w-10 h-10 object-contain" />
      </div>
      
      {/* Product Image - Large and prominent */}
      <div className="bg-gray-100 flex items-center justify-center flex-shrink-0 border-y border-gray-300" style={{ height: '60px' }}>
        <span className="text-[8px] text-gray-400 font-medium">IMAGE</span>
      </div>
      
      {/* Product Info Section */}
      <div className="flex-grow px-2 py-1 flex flex-col justify-between">
        {/* Designation - Bold and prominent */}
        <div className="mb-1">
          <p className="text-[7px] font-bold leading-tight line-clamp-2 uppercase">{product.DESIGNATION}</p>
        </div>
        
        {/* Reference */}
        <div className="mb-1">
          <p className="text-[6px] text-gray-600">Réf: {product.REFERENCE}</p>
        </div>
        
        {/* Price - Large and centered with € symbol */}
        <div className="text-center py-1">
          <p className="text-[16px] font-bold leading-none" style={{ color: '#FF6600' }}>
            {product.PRIX}
          </p>
        </div>
        
        {/* Barcode */}
        <div className="border-t border-gray-300 pt-1 mt-1">
          <p className="text-[6px] text-center font-mono tracking-tight">{product.CODEBAR}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full space-y-8">
      <div className="text-sm text-muted-foreground mb-4">
        {selectedProducts.length} étiquette(s) sélectionnée(s) • {pages} planche(s) A4 (3 colonnes × 8 rangées)
      </div>
      
      {Array.from({ length: pages }).map((_, pageIndex) => {
        const startIndex = pageIndex * labelsPerPage;
        const pageProducts = selectedProducts.slice(startIndex, startIndex + labelsPerPage);
        
        return (
          <div key={pageIndex} className="bg-white shadow-lg mx-auto" style={{ width: '210mm', minHeight: '297mm', padding: '8mm 5mm' }}>
            <div className="text-xs text-gray-500 mb-2">Planche {pageIndex + 1} / {pages}</div>
            
            {/* 3 columns x 8 rows grid - Dimensions exactes: 72mm x 32mm par étiquette */}
            <div 
              className="grid gap-[1.5mm]"
              style={{ 
                gridTemplateColumns: 'repeat(3, 72mm)',
                gridTemplateRows: 'repeat(8, 32mm)',
              }}
            >
              {Array.from({ length: labelsPerPage }).map((_, labelIndex) => {
                const product = pageProducts[labelIndex];
                return (
                  <div 
                    key={labelIndex} 
                    style={{ 
                      width: '72mm', 
                      height: '32mm',
                    }}
                  >
                    {product ? renderLabel(product) : <div className="border border-dashed border-gray-300 h-full bg-gray-50/50" />}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      
      {selectedProducts.length === 0 && (
        <div className="text-center p-12 bg-card rounded-lg border border-border">
          <p className="text-muted-foreground">Aucune étiquette sélectionnée pour l'aperçu</p>
        </div>
      )}
    </div>
  );
};

export default ApercuPlanche;
