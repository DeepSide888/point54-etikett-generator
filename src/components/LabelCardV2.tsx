import { LabelItem, fmtPrice } from '../lib/label-utils';
import logoP54 from '../assets/logo-point54.png';
import Barcode from './Barcode';
import QRCodeBox from './QRCodeBox';
import { useSettings } from '../settings/SettingsContext';

interface LabelCardV2Props {
  item: LabelItem;
}

export default function LabelCardV2({ item }: LabelCardV2Props) {
  const { theme } = useSettings();
  const { fontFamily, colors, sizes, layout, watermark } = theme;

  return (
    <div
      style={{
        width: `${layout.label.widthMm}mm`,
        height: `${layout.label.heightMm}mm`,
        boxSizing: "border-box",
        padding: `${layout.label.paddingMm}mm`,
        display: "grid",
        gridTemplateColumns: "38mm 1fr",
        gridTemplateRows: "10mm 18mm 7mm",
        gap: `${layout.label.gapMm}mm`,
        border: `${layout.label.borderMm}mm solid ${colors.border}`,
        background: colors.bg,
        position: "relative",
        fontFamily
      }}
    >
      {watermark.enabled && (
        <img
          src={logoP54}
          aria-hidden
          style={{
            position: "absolute",
            left: "2mm",
            top: "14mm",
            height: "18mm",
            opacity: watermark.opacity,
            pointerEvents: "none"
          }}
        />
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "2mm" }}>
        <img src={logoP54} alt="Point 54" style={{ height: `${layout.logo.heightMm}mm`, objectFit: "contain" }} />
      </div>
      
      <div style={{ textAlign: "right", alignSelf: "center" }}>
        <div style={{ fontWeight: 800, fontSize: `${sizes.pricePt}pt`, lineHeight: 1, color: colors.price }}>
          {fmtPrice(item.price)}
        </div>
      </div>

      <div
        style={{
          gridColumn: "1 / span 2",
          fontWeight: 700,
          fontSize: `${sizes.titlePt}pt`,
          lineHeight: 1.1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: colors.text
        }}
        title={item.title}
      >
        {String(item.title).toUpperCase()}
      </div>

      <div>
        {item.image ? (
          <img src={item.image} alt={item.ref} style={{ width: "100%", height: "18mm", objectFit: "contain" }} />
        ) : null}
      </div>

      <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", alignItems: "end", justifyItems: "end" }}>
        <div style={{ fontSize: `${sizes.refPt}pt`, fontWeight: 600, justifySelf: "start", color: colors.text }}>
          {item.ref ? `Réf : ${item.ref}` : "\u00A0"}
        </div>
        <div style={{ display: "flex", gap: "2mm", alignItems: "end" }}>
          {item.ean ? <Barcode value={item.ean} widthMm={layout.barcode.widthMm} heightMm={layout.barcode.heightMm} /> : null}
          <div style={{ width: `${layout.qr.sizeMm}mm`, height: `${layout.qr.sizeMm}mm` }}>
            <QRCodeBox url={(item as any).qrurl || ""} sizeMm={layout.qr.sizeMm} />
          </div>
        </div>
      </div>
    </div>
  );
}
