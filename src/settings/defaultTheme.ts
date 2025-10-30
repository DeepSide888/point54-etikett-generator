export const defaultTheme = {
  fontFamily: "Inter, Arial, sans-serif",
  colors: {
    price: "#f47c20",
    text: "#000000",
    border: "#000000",
    bg: "#ffffff"
  },
  sizes: {
    titlePt: 9,
    refPt: 8,
    pricePt: 28,
    eanPt: 7
  },
  layout: {
    label: { widthMm: 62, heightMm: 37, paddingMm: 2, gapMm: 1, borderMm: 0.2 },
    barcode: { widthMm: 38, heightMm: 14 },
    qr: { sizeMm: 20 },
    logo: { heightMm: 8 },
    sheet: { columns: 3, rows: 7, pagePaddingMm: 5, colGapMm: 4, rowGapMm: 0 }
  },
  watermark: { enabled: false, opacity: 0.08 }
} as const;

export type Theme = typeof defaultTheme;
