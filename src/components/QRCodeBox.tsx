import { QRCodeSVG } from "qrcode.react";

interface QRCodeBoxProps {
  url: string;
  sizeMm?: number;
}

export default function QRCodeBox({ url, sizeMm = 20 }: QRCodeBoxProps) {
  if (!url) return null;
  const px = Math.round((sizeMm / 25.4) * 96);
  return <QRCodeSVG value={String(url)} size={px} includeMargin={false} />;
}
