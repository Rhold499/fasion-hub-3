import { ClothingCard } from "./ClothingCard";

interface Clothing {
  id: string;
  name: string;
  description: string;
  image: string;
  likes: number;
  price: number;
  collectionName: string;
  designerName: string;
}

interface CollectionGridProps {
  items: Clothing[];
}

export const CollectionGrid = ({ items }: CollectionGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <ClothingCard key={item.id} {...item} />
      ))}
    </div>
  );
};