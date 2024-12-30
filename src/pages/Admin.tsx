import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getDesigners,
  getCollections,
  getClothes,
  deleteDesigner,
  deleteCollection,
  deleteClothing,
} from "@/services/dataService";
import { Designer, Collection, Clothing } from "@/types";
import { useToast } from "@/hooks/use-toast";
import DesignersSection from "@/components/admin/DesignersSection";
import CollectionsSection from "@/components/admin/CollectionsSection";
import ClothesSection from "@/components/admin/ClothesSection";

const Admin = () => {
  const [designers, setDesigners] = useState<Designer[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [clothes, setClothes] = useState<Clothing[]>([]);
  const { toast } = useToast();

  const loadData = async () => {
    try {
      const [designersData, collectionsData, clothesData] = await Promise.all([
        getDesigners(),
        getCollections(),
        getClothes()
      ]);
      
      setDesigners(designersData);
      setCollections(collectionsData);
      setClothes(clothesData);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les données",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteDesigner = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce designer ?")) {
      await deleteDesigner(id);
      loadData();
      toast({
        title: "Designer supprimé",
        description: "Le designer a été supprimé avec succès",
      });
    }
  };

  const handleDeleteCollection = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette collection ?")) {
      await deleteCollection(id);
      loadData();
      toast({
        title: "Collection supprimée",
        description: "La collection a été supprimée avec succès",
      });
    }
  };

  const handleDeleteClothing = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce vêtement ?")) {
      await deleteClothing(id);
      loadData();
      toast({
        title: "Vêtement supprimé",
        description: "Le vêtement a été supprimé avec succès",
      });
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-fashion-charcoal">
          Dashboard Admin
        </h1>
        <p className="text-gray-600">
          Gérez vos collections, designers et vêtements
        </p>
      </div>

      <Tabs defaultValue="designers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="designers">Designers</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="clothes">Vêtements</TabsTrigger>
        </TabsList>

        <TabsContent value="designers">
          <DesignersSection
            designers={designers}
            onDelete={handleDeleteDesigner}
            onUpdate={loadData}
          />
        </TabsContent>

        <TabsContent value="collections">
          <CollectionsSection
            collections={collections}
            onDelete={handleDeleteCollection}
            onUpdate={loadData}
          />
        </TabsContent>

        <TabsContent value="clothes">
          <ClothesSection
            clothes={clothes}
            onDelete={handleDeleteClothing}
            onUpdate={loadData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;