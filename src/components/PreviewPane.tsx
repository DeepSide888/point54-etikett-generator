import { LabelCard } from "./LabelCard";
import { TemplateConfig } from "./EditeurTemplate";

export interface LabelItem {
  REFERENCE: string;
  CODEBAR: string;
  DESIGNATION: string;
  PRIX: number | string;
  IMAGE_PATH?: string;
  QR_CODE?: string;
}

interface PreviewPaneProps {
  items: LabelItem[];
  selectedIds: string[];
  productImages: Record<string, string>;
  templateConfig: TemplateConfig;
}

const PLACEHOLDER: LabelItem = {
  REFERENCE: "—",
  CODEBAR: "—",
  DESIGNATION: "Aucun article chargé",
  PRIX: "",
};

const chunk = <T,>(arr: T[], size: number) =>
  Array.from({ length: Math.max(1, Math.ceil(arr.length / size)) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

export function PreviewPane({
  items = [],
  selectedIds = [],
  productImages,
  templateConfig,
}: PreviewPaneProps) {
  // Fallback logic: if no items, show placeholder; if no selection, show all items
  const pool = items.length ? items : [PLACEHOLDER];
  const selected =
    selectedIds && selectedIds.length
      ? pool.filter(p => selectedIds.includes(String(p.REFERENCE)))
      : pool;

  const pages = chunk(selected, 21);

  return (
    <div className="preview w-full space-y-8">
      <div className="text-sm text-muted-foreground mb-4">
        {selected.length} étiquette(s) • {pages.length} planche(s) A4 (3 colonnes × 7 rangées)
      </div>
      
      {pages.map((page, pi) => (
        <div key={pi}>
          <div className="text-xs text-gray-500 mb-2">
            Planche {pi + 1} / {pages.length}
          </div>
          
          <div className="page bg-white shadow-lg mx-auto">
            {Array.from({ length: 21 }).map((_, labelIndex) => {
              const product = page[labelIndex];
              return product ? (
                <LabelCard 
                  key={labelIndex}
                  item={product} 
                  productImages={productImages}
                  templateConfig={templateConfig}
                />
              ) : (
                <div key={labelIndex} className="border border-dashed border-gray-300 bg-gray-50/50" />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
