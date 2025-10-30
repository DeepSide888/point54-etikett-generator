export type LabelItem = {
  ref: string;
  ean: string;
  title: string;
  price: number | string;
  image?: string;
  qrurl?: string;
  qty?: number | string;
};

export const mapItem = (row: any, productImages?: Record<string, string>): LabelItem => ({
  ref: String(row.REFERENCE ?? row.REF ?? ''),
  ean: String(row.CODEBAR ?? row.EAN ?? ''),
  title: String(row.DESIGNATION ?? ''),
  price: row.PRIX ?? '',
  image: productImages?.[row.REFERENCE] ?? row.IMAGE_PATH ?? row.IMAGE ?? '',
  qrurl: row.QRURL ?? row.QR_URL ?? '',
  qty: row.QTE ?? row.QTY ?? '',
});

export const chunk = <T,>(a: T[], n: number) =>
  Array.from({ length: Math.max(1, Math.ceil((a?.length || 0) / n)) }, (_, i) => a.slice(i * n, i * n + n));

export const fmtPrice = (v: any) => {
  if (v === null || v === undefined || v === '') return '';
  const n = typeof v === 'number' ? v : parseFloat(String(v).replace(',', '.'));
  if (!isFinite(n)) return String(v);
  return Number.isInteger(n) ? String(n) : String(n.toFixed(2)).replace('.', ',');
};

export const titlePt = (s: string = '') => s.length <= 18 ? 18 : s.length <= 28 ? 16 : 12;
