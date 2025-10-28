import { QRCodeSVG } from 'qrcode.react';
import logoPoint54 from '@/assets/logo-point54.png';
import { LabelItem } from './PreviewPane';
import { TemplateConfig } from './EditeurTemplate';

interface LabelCardProps {
  item: LabelItem;
  productImages: Record<string, string>;
  templateConfig: TemplateConfig;
}

export function LabelCard({ item, productImages, templateConfig }: LabelCardProps) {
  const hasImage = productImages[item.REFERENCE];
  const hasQRCode = item.QR_CODE && String(item.QR_CODE).trim() !== '';

  return (
    <div 
      className="label-box bg-white border border-gray-400 h-full overflow-hidden"
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
        gap: '0.5mm',
        padding: '2mm'
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
        <span className="font-medium">Réf: {item.REFERENCE}</span>
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
        <span>{item.CODEBAR}</span>
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
            src={productImages[item.REFERENCE]} 
            alt={item.DESIGNATION}
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
          {item.DESIGNATION}
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
            {String(item.PRIX).replace('€', '').trim()}
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
              value={item.QR_CODE!} 
              size={42}
              level="M"
            />
          </div>
        )}
      </div>
    </div>
  );
}
