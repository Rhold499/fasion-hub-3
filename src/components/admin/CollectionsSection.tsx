import { useState } from "react";
import { Collection } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import CollectionForm from "@/components/forms/CollectionForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CollectionsSectionProps {
  collections: Collection[];
  onDelete: (id: string) => void;
  onUpdate: () => void;
}

const CollectionsSection = ({ collections, onDelete, onUpdate }: CollectionsSectionProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<Collection | undefined>();

  const handleEdit = (collection: Collection) => {
    setSelectedCollection(collection);
    setIsDialogOpen(true);
  };

  const handleSuccess = () => {
    setIsDialogOpen(false);
    setSelectedCollection(undefined);
    onUpdate();
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Gestion des Collections</CardTitle>
            <Button onClick={() => setIsDialogOpen(true)}>
              Ajouter une collection
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <h3 className="font-medium">{collection.name}</h3>
                  <p className="text-sm text-gray-500">
                    {collection.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    {collection.season} {collection.year}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(collection)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onDelete(collection.id)}
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
              {selectedCollection ? "Modifier la collection" : "Ajouter une collection"}
            </DialogTitle>
            <DialogDescription>
              {selectedCollection 
                ? "Modifiez les informations de la collection ci-dessous" 
                : "Remplissez le formulaire pour ajouter une nouvelle collection"}
            </DialogDescription>
          </DialogHeader>
          <CollectionForm
            collection={selectedCollection}
            onSuccess={handleSuccess}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CollectionsSection;