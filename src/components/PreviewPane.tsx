import LabelCardV2 from "./LabelCardV2";
import { mapItem, chunk } from "../lib/label-utils";
import type { TemplateConfig } from "./EditeurTemplate";

interface PreviewPaneProps {
  items: any[];
  selectedIds: string[];
  productImages: Record<string, string>;
  templateConfig: TemplateConfig;
}

const PER_PAGE = 21;

export function PreviewPane({
  items = [],
  selectedIds = [],
  productImages = {},
  templateConfig,
}: PreviewPaneProps) {
  // Map raw data to LabelItem format
  const base = (selectedIds && selectedIds.length)
    ? items.filter(item => selectedIds.includes(String(item.REFERENCE)))
    : items;
  
  const mappedItems = base.map(item => mapItem(item, productImages));
  const pages = chunk(mappedItems, PER_PAGE);

  if (mappedItems.length === 0) {
    return (
      <div className="preview-wrap">
        <div className="page-a4-3x7">
          <div className="empty">Aucun article chargé</div>
        </div>
      </div>
    );
  }

  return (
    <div className="preview-wrap w-full">
      <div className="text-sm text-muted-foreground mb-4">
        {mappedItems.length} étiquette(s) • {pages.length} planche(s) A4 (3 colonnes × 7 rangées)
      </div>
      
      {pages.map((page, pi) => (
        <div key={pi}>
          <div className="text-xs text-gray-500 mb-2">
            Planche {pi + 1} / {pages.length}
          </div>
          
          <div className="page-a4-3x7 shadow-lg mx-auto">
            {page.map((item, i) => (
              <LabelCardV2 key={i} item={item} templateConfig={templateConfig} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
