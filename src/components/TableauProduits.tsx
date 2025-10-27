import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pencil, Check, X } from 'lucide-react';

interface Product {
  CODEBAR: string;
  PRIX: string;
  DESIGNATION: string;
  REFERENCE: string;
}

interface TableauProduitsProps {
  products: Product[];
  onProductsChange: (products: Product[]) => void;
  selectedIds: number[];
  onSelectionChange: (ids: number[]) => void;
}

const TableauProduits = ({ products, onProductsChange, selectedIds, onSelectionChange }: TableauProduitsProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(products.map((_, index) => index));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectOne = (index: number, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedIds, index]);
    } else {
      onSelectionChange(selectedIds.filter(id => id !== index));
    }
  };

  const startEdit = (index: number) => {
    setEditingId(index);
    setEditedProduct({ ...products[index] });
  };

  const saveEdit = () => {
    if (editingId !== null && editedProduct) {
      const newProducts = [...products];
      newProducts[editingId] = editedProduct;
      onProductsChange(newProducts);
      setEditingId(null);
      setEditedProduct(null);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedProduct(null);
  };

  return (
    <div className="w-full bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="p-3 text-left">
                <Checkbox
                  checked={selectedIds.length === products.length && products.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="p-3 text-left text-sm font-semibold text-foreground">Code-barres</th>
              <th className="p-3 text-left text-sm font-semibold text-foreground">Désignation</th>
              <th className="p-3 text-left text-sm font-semibold text-foreground">Référence</th>
              <th className="p-3 text-left text-sm font-semibold text-foreground">Prix</th>
              <th className="p-3 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-b border-border hover:bg-accent/50 transition-colors">
                <td className="p-3">
                  <Checkbox
                    checked={selectedIds.includes(index)}
                    onCheckedChange={(checked) => handleSelectOne(index, checked as boolean)}
                  />
                </td>
                <td className="p-3">
                  {editingId === index ? (
                    <Input
                      value={editedProduct?.CODEBAR || ''}
                      onChange={(e) => setEditedProduct({ ...editedProduct!, CODEBAR: e.target.value })}
                      className="max-w-[150px]"
                    />
                  ) : (
                    <span className="text-sm text-foreground">{product.CODEBAR}</span>
                  )}
                </td>
                <td className="p-3">
                  {editingId === index ? (
                    <Input
                      value={editedProduct?.DESIGNATION || ''}
                      onChange={(e) => setEditedProduct({ ...editedProduct!, DESIGNATION: e.target.value })}
                      className="min-w-[200px]"
                    />
                  ) : (
                    <span className="text-sm text-foreground">{product.DESIGNATION}</span>
                  )}
                </td>
                <td className="p-3">
                  {editingId === index ? (
                    <Input
                      value={editedProduct?.REFERENCE || ''}
                      onChange={(e) => setEditedProduct({ ...editedProduct!, REFERENCE: e.target.value })}
                      className="max-w-[120px]"
                    />
                  ) : (
                    <span className="text-sm text-foreground">{product.REFERENCE}</span>
                  )}
                </td>
                <td className="p-3">
                  {editingId === index ? (
                    <Input
                      value={editedProduct?.PRIX || ''}
                      onChange={(e) => setEditedProduct({ ...editedProduct!, PRIX: e.target.value })}
                      className="max-w-[100px]"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-foreground">{product.PRIX}</span>
                  )}
                </td>
                <td className="p-3">
                  {editingId === index ? (
                    <div className="flex gap-2">
                      <Button size="sm" variant="default" onClick={saveEdit}>
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary" onClick={cancelEdit}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button size="sm" variant="secondary" onClick={() => startEdit(index)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {products.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          Aucun produit importé. Veuillez importer un fichier.
        </div>
      )}
    </div>
  );
};

export default TableauProduits;
