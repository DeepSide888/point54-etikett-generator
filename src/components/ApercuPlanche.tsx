import { QRCodeSVG } from 'qrcode.react';
import logoPoint54 from '@/assets/logo-point54.png';
import { TemplateConfig } from './EditeurTemplate';

interface Product {
  CODEBAR: string;
  PRIX: string;
  DESIGNATION: string;
  REFERENCE: string;
  QR_CODE?: string;
}

interface ApercuPlancheProps {
  selectedProducts: Product[];
  productImages: Record<string, string>;
  templateConfig: TemplateConfig;
}

const ApercuPlanche = ({ selectedProducts, productImages, templateConfig }: ApercuPlancheProps) => {
  // Calculate pages needed (24 labels per page - 3 columns x 8 rows)
  // Label dimensions: 72mm x 32mm
  const labelsPerPage = 24;
  const pages = Math.ceil(selectedProducts.length / labelsPerPage);
  
  const renderLabel = (product: Product) => {
    const hasImage = productImages[product.REFERENCE];
    const hasQRCode = product.QR_CODE && product.QR_CODE.trim() !== '';
    
    return (
      <div 
        className="label-box bg-white border border-gray-400 flex flex-col h-full overflow-hidden"
        style={{ fontFamily: templateConfig.fontFamily }}
      >
        {/* Header: Logo + QR Code */}
        <div className="flex items-start justify-between px-1 pt-1 pb-0.5">
          <img 
            src={logoPoint54} 
            alt="Point 54" 
            style={{ width: `${templateConfig.logoSize}px`, height: `${templateConfig.logoSize}px` }}
            className="object-contain"
          />
          
          {hasQRCode && (
            <div className="flex-shrink-0">
              <QRCodeSVG 
                value={product.QR_CODE!} 
                size={templateConfig.logoSize}
                level="M"
              />
            </div>
          )}
        </div>
        
        {/* Product Image */}
        <div 
          className="bg-gray-100 flex items-center justify-center flex-shrink-0 border-y border-gray-300 overflow-hidden"
          style={{ height: `${templateConfig.imageHeight}px` }}
        >
          {hasImage ? (
            <img 
              src={productImages[product.REFERENCE]} 
              alt={product.DESIGNATION}
              className="w-full h-full object-contain"
            />
          ) : (
            <span 
              className="text-gray-400 font-medium"
              style={{ fontSize: `${templateConfig.fontSize.reference}px` }}
            >
              IMAGE
            </span>
          )}
        </div>
        
        {/* Product Info Section */}
        <div className="flex-grow px-2 py-1 flex flex-col justify-between">
          {/* Designation */}
          <div className="mb-1">
            <p 
              className="font-bold leading-tight line-clamp-2 uppercase"
              style={{ 
                fontSize: `${templateConfig.fontSize.designation}px`,
                color: templateConfig.colors.text
              }}
            >
              {product.DESIGNATION}
            </p>
          </div>
          
          {/* Reference */}
          <div className="mb-1">
            <p 
              className="text-gray-600"
              style={{ fontSize: `${templateConfig.fontSize.reference}px` }}
            >
              Réf: {product.REFERENCE}
            </p>
          </div>
          
          {/* Price */}
          <div className="text-center py-1">
            <p 
              className="font-bold leading-none"
              style={{ 
                fontSize: `${templateConfig.fontSize.price}px`,
                color: templateConfig.colors.price
              }}
            >
              {product.PRIX}
            </p>
          </div>
          
          {/* Barcode */}
          <div className="border-t border-gray-300 pt-1 mt-1">
            <p 
              className="text-center font-mono tracking-tight"
              style={{ fontSize: `${templateConfig.fontSize.barcode}px` }}
            >
              {product.CODEBAR}
            </p>
          </div>
        </div>
      </div>
    );
  };

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
