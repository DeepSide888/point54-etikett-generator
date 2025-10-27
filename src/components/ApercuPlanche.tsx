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
  // Calculate pages needed (21 labels per page - 3 columns x 7 rows)
  const labelsPerPage = 21;
  const pages = Math.ceil(selectedProducts.length / labelsPerPage);
  
  const renderLabel = (product: Product) => (
    <div className="label-box bg-white border border-gray-300 flex flex-col p-2 h-full">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-1">
        <img src={logoPoint54} alt="Point 54" className="w-8 h-8 object-contain" />
        <span className="text-[8px] font-bold" style={{ color: '#FF6600' }}>POINT 54</span>
      </div>
      
      {/* Product Image Placeholder */}
      <div className="bg-gray-200 flex items-center justify-center mb-1 flex-shrink-0" style={{ height: '50px' }}>
        <span className="text-[7px] text-gray-500">NO IMAGE</span>
      </div>
      
      {/* Designation */}
      <div className="mb-1 flex-grow">
        <p className="text-[9px] font-semibold leading-tight line-clamp-2">{product.DESIGNATION}</p>
      </div>
      
      {/* Reference */}
      <div className="mb-1">
        <p className="text-[7px] text-gray-600">Réf: {product.REFERENCE}</p>
      </div>
      
      {/* Price */}
      <div className="mb-1 text-center">
        <p className="text-[14px] font-bold" style={{ color: '#FF6600' }}>{product.PRIX}</p>
      </div>
      
      {/* Barcode */}
      <div className="border-t border-gray-300 pt-1">
        <p className="text-[7px] text-center font-mono">{product.CODEBAR}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full space-y-8">
      <div className="text-sm text-muted-foreground mb-4">
        {selectedProducts.length} étiquette(s) sélectionnée(s) • {pages} planche(s) A4
      </div>
      
      {Array.from({ length: pages }).map((_, pageIndex) => {
        const startIndex = pageIndex * labelsPerPage;
        const pageProducts = selectedProducts.slice(startIndex, startIndex + labelsPerPage);
        
        return (
          <div key={pageIndex} className="bg-white shadow-lg mx-auto" style={{ width: '210mm', minHeight: '297mm', padding: '10mm 7mm' }}>
            <div className="text-xs text-gray-500 mb-2">Planche {pageIndex + 1} / {pages}</div>
            
            {/* 3 columns x 7 rows grid */}
            <div 
              className="grid gap-[2mm]"
              style={{ 
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: 'repeat(7, 1fr)',
              }}
            >
              {Array.from({ length: labelsPerPage }).map((_, labelIndex) => {
                const product = pageProducts[labelIndex];
                return (
                  <div 
                    key={labelIndex} 
                    style={{ 
                      width: '70mm', 
                      height: '42mm',
                    }}
                  >
                    {product ? renderLabel(product) : <div className="border border-dashed border-gray-300 h-full bg-gray-50" />}
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
