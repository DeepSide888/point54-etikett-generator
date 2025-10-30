import { useSettings } from "../settings/SettingsContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Settings2 } from "lucide-react";

export default function SettingsPanel() {
  const { theme, setTheme, reset, exportToFile, loadFromFile, savePreset, loadPreset, listPresets } = useSettings();

  const update = (path: string, value: any) => {
    const clone = structuredClone(theme);
    const seg = path.split(".");
    let cur: any = clone;
    for (let i = 0; i < seg.length - 1; i++) cur = cur[seg[i]];
    cur[seg[seg.length - 1]] = value;
    setTheme(clone);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings2 className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto w-[400px]">
        <SheetHeader>
          <SheetTitle>Personnalisation des étiquettes</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-6">
          <div className="space-y-2">
            <Label>Police</Label>
            <Input value={theme.fontFamily} onChange={e => update("fontFamily", e.target.value)} />
          </div>

          <Card className="p-4 space-y-4">
            <h4 className="font-semibold">Couleurs</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Prix</Label>
                <Input type="color" value={theme.colors.price} onChange={e => update("colors.price", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Texte</Label>
                <Input type="color" value={theme.colors.text} onChange={e => update("colors.text", e.target.value)} />
              </div>
            </div>
          </Card>

          <Card className="p-4 space-y-4">
            <h4 className="font-semibold">Tailles de police (pt)</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Prix</Label>
                <Input type="number" min={8} max={72} value={theme.sizes.pricePt} onChange={e => update("sizes.pricePt", Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Titre</Label>
                <Input type="number" min={6} max={24} value={theme.sizes.titlePt} onChange={e => update("sizes.titlePt", Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Référence</Label>
                <Input type="number" min={6} max={20} value={theme.sizes.refPt} onChange={e => update("sizes.refPt", Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Code-barres</Label>
                <Input type="number" min={6} max={20} value={theme.sizes.eanPt} onChange={e => update("sizes.eanPt", Number(e.target.value))} />
              </div>
            </div>
          </Card>

          <Card className="p-4 space-y-4">
            <h4 className="font-semibold">Dimensions (mm)</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Code-barres L</Label>
                <Input type="number" min={20} max={60} value={theme.layout.barcode.widthMm} onChange={e => update("layout.barcode.widthMm", Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Code-barres H</Label>
                <Input type="number" min={8} max={30} value={theme.layout.barcode.heightMm} onChange={e => update("layout.barcode.heightMm", Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>QR taille</Label>
                <Input type="number" min={10} max={30} value={theme.layout.qr.sizeMm} onChange={e => update("layout.qr.sizeMm", Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Logo H</Label>
                <Input type="number" min={4} max={20} value={theme.layout.logo.heightMm} onChange={e => update("layout.logo.heightMm", Number(e.target.value))} />
              </div>
            </div>
          </Card>

          <Card className="p-4 space-y-4">
            <h4 className="font-semibold">Watermark logo</h4>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="watermark"
                checked={theme.watermark.enabled}
                onChange={e => update("watermark.enabled", e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="watermark">Activé</Label>
            </div>
            <div className="space-y-2">
              <Label>Opacité: {theme.watermark.opacity.toFixed(2)}</Label>
              <input
                type="range"
                min={0}
                max={0.3}
                step={0.01}
                value={theme.watermark.opacity}
                onChange={e => update("watermark.opacity", Number(e.target.value))}
                className="w-full"
              />
            </div>
          </Card>

          <div className="space-y-3">
            <div className="flex gap-2">
              <Button onClick={reset} variant="outline" size="sm">Réinitialiser</Button>
              <Button onClick={exportToFile} variant="outline" size="sm">Exporter JSON</Button>
              <Label className="cursor-pointer">
                <Button variant="outline" size="sm" asChild>
                  <span>Importer JSON</span>
                </Button>
                <input
                  type="file"
                  accept="application/json"
                  hidden
                  onChange={e => e.target.files?.[0] && loadFromFile(e.target.files[0])}
                />
              </Label>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <Input id="presetName" placeholder="Nom du preset" className="flex-1" />
                <Button
                  onClick={() => {
                    const input = document.getElementById("presetName") as HTMLInputElement;
                    savePreset(input.value || "preset");
                    input.value = "";
                  }}
                  size="sm"
                >
                  Sauver
                </Button>
              </div>
              <select
                onChange={e => loadPreset(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option>Charger un preset…</option>
                {listPresets().map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
