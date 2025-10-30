import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

interface BarcodeProps {
  value: string;
  widthMm?: number;
  heightMm?: number;
}

export default function Barcode({ value, widthMm = 50, heightMm = 15 }: BarcodeProps) {
  const ref = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!value || !ref.current) return;
    try {
      JsBarcode(ref.current, String(value).trim(), {
        format: "CODE128",
        displayValue: false,
        margin: 0,
        lineColor: "#000",
        background: "#fff"
      });
    } catch (e) {
      console.error("Barcode generation error:", e);
    }
  }, [value]);
  
  return <svg ref={ref} style={{ width: `${widthMm}mm`, height: `${heightMm}mm`, display: "block" }} />;
}
