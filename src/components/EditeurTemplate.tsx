import { useState } from 'react';
import { Settings2, Type, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HexColorPicker } from 'react-colorful';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export interface TemplateConfig {
  fontSize: {
    designation: number;
    reference: number;
    price: number;
    barcode: number;
  };
  colors: {
    price: string;
    text: string;
    logo: string;
  };
  fontFamily: string;
  logoSize: number;
  imageHeight: number;
}

interface EditeurTemplateProps {
  config: TemplateConfig;
  onConfigChange: (config: TemplateConfig) => void;
}

const DEFAULT_CONFIG: TemplateConfig = {
  fontSize: {
    designation: 7,
    reference: 6,
    price: 16,
    barcode: 6,
  },
  colors: {
    price: '#FF6600',
    text: '#000000',
    logo: '#FF6600',
  },
  fontFamily: 'Arial',
  logoSize: 40,
  imageHeight: 60,
};

const EditeurTemplate = ({ config, onConfigChange }: EditeurTemplateProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateConfig = (path: string[], value: any) => {
    const newConfig = { ...config };
    let current: any = newConfig;
    
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    
    current[path[path.length - 1]] = value;
    onConfigChange(newConfig);
  };

  const resetToDefault = () => {
    onConfigChange(DEFAULT_CONFIG);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="gap-2">
          <Settings2 className="w-4 h-4" />
          Personnaliser le template
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 max-h-[600px] overflow-y-auto" align="end">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Configuration du template</h3>
            <Button variant="ghost" size="sm" onClick={resetToDefault}>
              Réinitialiser
            </Button>
          </div>

          {/* Font Family */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Police de caractères
            </Label>
            <Select
              value={config.fontFamily}
              onValueChange={(value) => updateConfig(['fontFamily'], value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Arial">Arial</SelectItem>
                <SelectItem value="Helvetica">Helvetica</SelectItem>
                <SelectItem value="Roboto">Roboto</SelectItem>
                <SelectItem value="Open Sans">Open Sans</SelectItem>
                <SelectItem value="Courier New">Courier New</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Font Sizes */}
          <div className="space-y-3">
            <Label className="font-medium">Tailles de police (px)</Label>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Désignation</Label>
                <Input
                  type="number"
                  value={config.fontSize.designation}
                  onChange={(e) => updateConfig(['fontSize', 'designation'], Number(e.target.value))}
                  min="4"
                  max="20"
                />
              </div>
              
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Référence</Label>
                <Input
                  type="number"
                  value={config.fontSize.reference}
                  onChange={(e) => updateConfig(['fontSize', 'reference'], Number(e.target.value))}
                  min="4"
                  max="16"
                />
              </div>
              
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Prix</Label>
                <Input
                  type="number"
                  value={config.fontSize.price}
                  onChange={(e) => updateConfig(['fontSize', 'price'], Number(e.target.value))}
                  min="10"
                  max="30"
                />
              </div>
              
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Code-barres</Label>
                <Input
                  type="number"
                  value={config.fontSize.barcode}
                  onChange={(e) => updateConfig(['fontSize', 'barcode'], Number(e.target.value))}
                  min="4"
                  max="12"
                />
              </div>
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 font-medium">
              <Palette className="w-4 h-4" />
              Couleurs
            </Label>
            
            <div className="space-y-3">
              <ColorPickerRow
                label="Couleur du prix"
                color={config.colors.price}
                onChange={(color) => updateConfig(['colors', 'price'], color)}
              />
              
              <ColorPickerRow
                label="Couleur du texte"
                color={config.colors.text}
                onChange={(color) => updateConfig(['colors', 'text'], color)}
              />
            </div>
          </div>

          {/* Dimensions */}
          <div className="space-y-3">
            <Label className="font-medium">Dimensions</Label>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-muted-foreground">Taille du logo (px)</Label>
                <Input
                  type="number"
                  value={config.logoSize}
                  onChange={(e) => updateConfig(['logoSize'], Number(e.target.value))}
                  min="20"
                  max="80"
                  className="w-20"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-sm text-muted-foreground">Hauteur image (px)</Label>
                <Input
                  type="number"
                  value={config.imageHeight}
                  onChange={(e) => updateConfig(['imageHeight'], Number(e.target.value))}
                  min="40"
                  max="100"
                  className="w-20"
                />
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const ColorPickerRow = ({ label, color, onChange }: { label: string; color: string; onChange: (color: string) => void }) => {
  return (
    <div className="flex items-center justify-between">
      <Label className="text-sm">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-20 h-8 p-1"
            style={{ backgroundColor: color }}
          >
            <div className="w-full h-full rounded" style={{ backgroundColor: color }} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" align="end">
          <HexColorPicker color={color} onChange={onChange} />
          <Input
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="mt-2 text-xs"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EditeurTemplate;
