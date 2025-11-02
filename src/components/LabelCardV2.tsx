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
        gridTemplateColumns: "1fr",
        gridTemplateRows: "7mm 1fr 11mm",
        gap: `${layout.label.gapMm}mm`,
        border: `${layout.label.borderMm}mm solid ${colors.border}`,
        background: colors.bg,
        position: "relative",
        fontFamily,
        overflow: "hidden"
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
      <div style={{ display: "flex", alignItems: "center", gap: "2mm", justifyContent: "space-between" }}>
        <img src={logoP54} alt="Point 54" style={{ height: `${layout.logo.heightMm}mm`, objectFit: "contain" }} />
        <div
          style={{
            flex: 1,
            fontWeight: 700,
            fontSize: `${sizes.titlePt}pt`,
            lineHeight: 1,
            color: colors.text,
            textTransform: "uppercase",
            textAlign: "left",
            marginLeft: "2mm",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
          title={item.title}
        >
          {String(item.title).toUpperCase()}
        </div>
      </div>

      {/* Middle row: Image + Price */}
      <div style={{ display: "grid", gridTemplateColumns: "35mm 1fr", gap: "2mm", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "35mm", height: "100%", overflow: "hidden" }}>
          {item.image ? (
            <img src={item.image} alt={item.ref} style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto", objectFit: "contain" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "7pt", color: "#999" }}>
              Image
            </div>
          )}
        </div>
        
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
          <div style={{ fontWeight: 800, fontSize: `${sizes.pricePt}pt`, lineHeight: 1, color: colors.price, display: "flex", alignItems: "baseline", gap: "0.5mm" }}>
            <span>{fmtPrice(item.price)}</span>
            <span style={{ fontSize: "11pt", fontWeight: 700 }}>€</span>
          </div>
        </div>
      </div>

      {/* Bottom row: Ref + Barcode + QR Code */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "2mm", alignItems: "end" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5mm", justifyContent: "flex-end" }}>
          <div style={{ fontSize: `${sizes.refPt}pt`, fontWeight: 600, color: colors.text }}>
            {item.ref ? `Réf : ${item.ref}` : "\u00A0"}
          </div>
          {item.ean ? (
            <div style={{ maxWidth: `${layout.barcode.widthMm}mm` }}>
              <Barcode value={item.ean} widthMm={layout.barcode.widthMm} heightMm={layout.barcode.heightMm} />
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5mm" }}>
          <div style={{ width: `${layout.qr.sizeMm}mm`, height: `${layout.qr.sizeMm}mm` }}>
            <QRCodeBox url={item.qrurl || ""} sizeMm={layout.qr.sizeMm} />
          </div>
          {item.qrurl && (
            <div style={{ fontSize: "5pt", fontWeight: 700, whiteSpace: "nowrap", lineHeight: 1 }}>
              SCAN ME!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
