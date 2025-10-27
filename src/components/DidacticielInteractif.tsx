import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface DidacticielInteractifProps {
  open: boolean;
  onClose: () => void;
}

const steps = [
  {
    title: 'Étape 1 : Importez votre fichier',
    content: 'Glissez-déposez ou sélectionnez un fichier Excel (.xlsx) ou CSV contenant les colonnes : CODEBAR, PRIX, DESIGNATION, REFERENCE. La colonne QTE sera automatiquement ignorée si présente.',
  },
  {
    title: 'Étape 2 : Vérifiez les données',
    content: 'Consultez le tableau des produits importés. Vous pouvez modifier les informations en cliquant sur l\'icône de crayon à droite de chaque ligne.',
  },
  {
    title: 'Étape 3 : Sélectionnez les produits',
    content: 'Cochez les cases à gauche des produits que vous souhaitez imprimer. Vous pouvez tout sélectionner avec la case en haut du tableau.',
  },
  {
    title: 'Étape 4 : Prévisualisez la planche',
    content: 'Visualisez vos étiquettes organisées en format A4 (3 colonnes × 8 rangées = 24 étiquettes par planche). Dimensions: 72mm × 32mm par étiquette. Vérifiez que tout est correct avant l\'export.',
  },
  {
    title: 'Étape 5 : Exportez en PDF',
    content: 'Cliquez sur "Exporter en PDF" pour générer votre fichier prêt à imprimer. Le PDF respecte l\'échelle 1:1 pour une impression parfaite sur papier A4.',
  },
];

const DidacticielInteractif = ({ open, onClose }: DidacticielInteractifProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Guide d'utilisation
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Progress indicator */}
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  index === currentStep
                    ? 'bg-primary'
                    : index < currentStep
                    ? 'bg-primary/50'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Step content */}
          <div className="min-h-[200px]">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              {steps[currentStep].title}
            </h3>
            <p className="text-foreground leading-relaxed">
              {steps[currentStep].content}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4 border-t border-border">
            <Button
              variant="secondary"
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>

            <span className="text-sm text-muted-foreground">
              {currentStep + 1} / {steps.length}
            </span>

            {currentStep === steps.length - 1 ? (
              <Button onClick={handleClose}>
                Terminer
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Suivant
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DidacticielInteractif;
