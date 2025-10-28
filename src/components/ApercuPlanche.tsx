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
  // Calculate pages needed (21 labels per page - 3 columns x 7 rows)
  // Label dimensions: 63.5mm x 38.1mm
  const labelsPerPage = 21;
  const pages = Math.ceil(selectedProducts.length / labelsPerPage);
  
  const renderLabel = (product: Product) => {
    const hasImage = productImages[product.REFERENCE];
    const hasQRCode = product.QR_CODE && product.QR_CODE.trim() !== '';
    
    return (
      <div 
        className="label-box bg-white border border-gray-400 h-full overflow-hidden p-[2mm]"
        style={{ 
          fontFamily: templateConfig.fontFamily,
          display: 'grid',
          gridTemplateColumns: '32% 48% 20%',
          gridTemplateRows: '22% 14% 44% 20%',
          gridTemplateAreas: `
            "logo ref ref"
            "media ean ean"
            "media title price"
            "media price price"
          `,
          gap: '0.5mm'
        }}
      >
        {/* Zone Logo */}
        <div 
          className="zone-logo flex items-start justify-start"
          style={{ gridArea: 'logo' }}
        >
          <img 
            src={logoPoint54} 
            alt="Point 54" 
            style={{ 
              maxWidth: '90%', 
              maxHeight: '90%',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* Zone Reference */}
        <div 
          className="zone-ref flex items-start justify-start pl-1"
          style={{ 
            gridArea: 'ref',
            fontSize: '10pt',
            color: templateConfig.colors.text
          }}
        >
          <span className="font-medium">Réf: {product.REFERENCE}</span>
        </div>

        {/* Zone EAN/Barcode */}
        <div 
          className="zone-ean flex items-center justify-center"
          style={{ 
            gridArea: 'ean',
            fontSize: '11pt',
            fontFamily: 'monospace'
          }}
        >
          <span>{product.CODEBAR}</span>
        </div>

        {/* Zone Media (Image) */}
        <div 
          className="zone-media bg-gray-100 overflow-hidden"
          style={{ 
            gridArea: 'media',
            borderRadius: '1mm'
          }}
        >
          {hasImage ? (
            <img 
              src={productImages[product.REFERENCE]} 
              alt={product.DESIGNATION}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium text-xs">
              IMAGE
            </div>
          )}
        </div>

        {/* Zone Title */}
        <div 
          className="zone-title flex items-center px-1"
          style={{ 
            gridArea: 'title',
            fontSize: `${templateConfig.fontSize.designation}pt`,
            color: templateConfig.colors.text
          }}
        >
          <p 
            className="font-bold leading-tight line-clamp-2 uppercase"
            style={{ fontSize: '14pt' }}
          >
            {product.DESIGNATION}
          </p>
        </div>

        {/* Zone Price */}
        <div 
          className="zone-price flex flex-col items-end justify-center pr-1 relative"
          style={{ 
            gridArea: 'price',
            color: templateConfig.colors.price
          }}
        >
          <div className="flex items-baseline gap-1">
            <span 
              className="font-bold leading-none"
              style={{ fontSize: '48pt' }}
            >
              {String(product.PRIX).replace('€', '').trim()}
            </span>
            <span 
              className="font-bold"
              style={{ fontSize: '24pt' }}
            >
              €
            </span>
          </div>
          
          {hasQRCode && (
            <div className="absolute bottom-0 left-1">
              <QRCodeSVG 
                value={product.QR_CODE!} 
                size={42}
                level="M"
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full space-y-8">
      <div className="text-sm text-muted-foreground mb-4">
        {selectedProducts.length} étiquette(s) sélectionnée(s) • {pages} planche(s) A4 (3 colonnes × 7 rangées)
      </div>
      
      {Array.from({ length: pages }).map((_, pageIndex) => {
        const startIndex = pageIndex * labelsPerPage;
        const pageProducts = selectedProducts.slice(startIndex, startIndex + labelsPerPage);
        
        return (
          <div 
            key={pageIndex} 
            className="bg-white shadow-lg mx-auto" 
            style={{ 
              width: '210mm', 
              minHeight: '297mm', 
              padding: '12.7mm 7.25mm',
              pageBreakAfter: 'always'
            }}
          >
            <div className="text-xs text-gray-500 mb-2">Planche {pageIndex + 1} / {pages}</div>
            
            {/* 3 columns x 7 rows grid - Dimensions exactes: 63.5mm x 38.1mm par étiquette */}
            <div 
              className="grid"
              style={{ 
                gridTemplateColumns: 'repeat(3, 63.5mm)',
                gridTemplateRows: 'repeat(7, 38.1mm)',
                columnGap: '2.5mm',
                rowGap: '1mm'
              }}
            >
              {Array.from({ length: labelsPerPage }).map((_, labelIndex) => {
                const product = pageProducts[labelIndex];
                return (
                  <div 
                    key={labelIndex} 
                    style={{ 
                      width: '63.5mm', 
                      height: '38.1mm',
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
