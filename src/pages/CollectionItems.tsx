import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CollectionGrid } from "@/components/CollectionGrid";
import { getClothes, getCollections, getDesigners } from "@/services/dataService";
import { Clothing, Collection, Designer } from "@/types";

const CollectionItems = () => {
  const { collectionId } = useParams();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const [clothes, collections, designers] = await Promise.all([
          getClothes(),
          getCollections(),
          getDesigners(),
        ]);

        const collectionClothes = clothes.filter(
          (item) => item.collectionId === collectionId
        );

        const enrichedClothes = collectionClothes.map((clothing: Clothing) => {
          const collection = collections.find(
            (c: Collection) => c.id === clothing.collectionId
          );
          const designer = designers.find(
            (d: Designer) => d.id === collection?.designerId
          );

          return {
            ...clothing,
            collectionName: collection?.name || "Collection inconnue",
            designerName: designer?.name || "Designer inconnu",
          };
        });

        setItems(enrichedClothes);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        setItems([]);
      }
    };

    loadItems();
  }, [collectionId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <h1 className="mb-6 text-2xl font-bold">Vêtements de la Collection</h1>
        <CollectionGrid items={items} />
      </div>
    </div>
  );
};

export default CollectionItems;