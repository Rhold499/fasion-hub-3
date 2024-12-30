import { useState } from "react";
import { Clothing } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import ClothingForm from "@/components/forms/ClothingForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ClothesSectionProps {
  clothes: Clothing[];
  onDelete: (id: string) => void;
  onUpdate: () => void;
}

const ClothesSection = ({ clothes, onDelete, onUpdate }: ClothesSectionProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedClothing, setSelectedClothing] = useState<Clothing | undefined>();

  const handleEdit = (clothing: Clothing) => {
    setSelectedClothing(clothing);
    setIsDialogOpen(true);
  };

  const handleSuccess = () => {
    setIsDialogOpen(false);
    setSelectedClothing(undefined);
    onUpdate();
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Gestion des Vêtements</CardTitle>
            <Button onClick={() => setIsDialogOpen(true)}>
              Ajouter un vêtement
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clothes.map((clothing) => (
              <div
                key={clothing.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <h3 className="font-medium">{clothing.name}</h3>
                  <p className="text-sm text-gray-500">
                    {clothing.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    Likes: {clothing.likes}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(clothing)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onDelete(clothing.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedClothing ? "Modifier le vêtement" : "Ajouter un vêtement"}
            </DialogTitle>
            <DialogDescription>
              {selectedClothing 
                ? "Modifiez les informations du vêtement ci-dessous" 
                : "Remplissez le formulaire pour ajouter un nouveau vêtement"}
            </DialogDescription>
          </DialogHeader>
          <ClothingForm
            clothing={selectedClothing}
            onSuccess={handleSuccess}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClothesSection;