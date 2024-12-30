import { useState } from "react";
import { Designer } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import DesignerForm from "@/components/forms/DesignerForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DesignersSectionProps {
  designers: Designer[];
  onDelete: (id: string) => void;
  onUpdate: () => void;
}

const DesignersSection = ({ designers, onDelete, onUpdate }: DesignersSectionProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDesigner, setSelectedDesigner] = useState<Designer | undefined>();

  const handleEdit = (designer: Designer) => {
    setSelectedDesigner(designer);
    setIsDialogOpen(true);
  };

  const handleSuccess = () => {
    setIsDialogOpen(false);
    setSelectedDesigner(undefined);
    onUpdate();
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Gestion des Designers</CardTitle>
            <Button onClick={() => setIsDialogOpen(true)}>
              Ajouter un designer
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {designers.map((designer) => (
              <div
                key={designer.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <h3 className="font-medium">{designer.name}</h3>
                  <p className="text-sm text-gray-500">{designer.bio}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(designer)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onDelete(designer.id)}
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
              {selectedDesigner ? "Modifier le designer" : "Ajouter un designer"}
            </DialogTitle>
            <DialogDescription>
              {selectedDesigner 
                ? "Modifiez les informations du designer ci-dessous" 
                : "Remplissez le formulaire pour ajouter un nouveau designer"}
            </DialogDescription>
          </DialogHeader>
          <DesignerForm
            designer={selectedDesigner}
            onSuccess={handleSuccess}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DesignersSection;