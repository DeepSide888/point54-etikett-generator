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
        gridTemplateColumns: "40mm 1fr",
        gridTemplateRows: "8mm 1fr 8mm",
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
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            height: "30mm",
            opacity: watermark.opacity,
            pointerEvents: "none"
          }}
        />
      )}

      {/* Header row: Logo + Title */}
      <div style={{ display: "flex", alignItems: "center", gap: "2mm" }}>
        <img src={logoP54} alt="Point 54" style={{ height: `${layout.logo.heightMm}mm`, objectFit: "contain" }} />
      </div>
      
      <div
        style={{
          fontWeight: 700,
          fontSize: `${sizes.titlePt}pt`,
          lineHeight: 1.1,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          color: colors.text,
          textTransform: "uppercase"
        }}
        title={item.title}
      >
        {String(item.title).toUpperCase()}
      </div>

      {/* Middle row: Image + Price */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {item.image ? (
          <img src={item.image} alt={item.ref} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "7pt", color: "#999" }}>
            Image
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontWeight: 800, fontSize: `${sizes.pricePt}pt`, lineHeight: 1, color: colors.price, display: "flex", alignItems: "baseline", gap: "1mm" }}>
          <span>{fmtPrice(item.price)}</span>
          <span style={{ fontSize: `${Math.round(sizes.pricePt * 0.4)}pt` }}>€</span>
        </div>
      </div>

      {/* Bottom row: Ref + Barcode | QR Code */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5mm", justifyContent: "flex-end" }}>
        <div style={{ fontSize: `${sizes.refPt}pt`, fontWeight: 600, color: colors.text }}>
          {item.ref ? `Réf : ${item.ref}` : "\u00A0"}
        </div>
        {item.ean ? (
          <Barcode value={item.ean} widthMm={layout.barcode.widthMm} heightMm={layout.barcode.heightMm} />
        ) : null}
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
        <div style={{ width: `${layout.qr.sizeMm}mm`, height: `${layout.qr.sizeMm}mm`, position: "relative" }}>
          <QRCodeBox url={item.qrurl || ""} sizeMm={layout.qr.sizeMm} />
          {item.qrurl && (
            <div style={{ position: "absolute", bottom: "-3mm", left: "50%", transform: "translateX(-50%)", fontSize: "5pt", fontWeight: 700, whiteSpace: "nowrap" }}>
              SCAN ME!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
