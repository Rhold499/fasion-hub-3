import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getCollections } from "@/services/dataService";
import { Collection } from "@/types";

const DesignerCollections = () => {
  const { designerId } = useParams();
  const navigate = useNavigate();
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    const loadCollections = async () => {
      const data = await getCollections();
      const filteredCollections = data.filter(
        (collection) => collection.designerId === designerId
      );
      setCollections(filteredCollections);
    };
    loadCollections();
  }, [designerId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <h1 className="mb-6 text-2xl font-bold">Collections</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <Card
              key={collection.id}
              className="cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
              onClick={() => navigate(`/collection/${collection.id}`)}
            >
              <CardHeader className="p-0">
                <img
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold">{collection.name}</h3>
                <p className="mt-2 text-sm text-gray-500">
                  {collection.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignerCollections;