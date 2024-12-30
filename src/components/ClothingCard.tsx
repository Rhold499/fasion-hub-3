import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface ClothingCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  likes: number;
  price: number;
  collectionName: string;
  designerName: string;
}

export const ClothingCard = ({
  id,
  name,
  description,
  image,
  likes,
  price,
  collectionName,
  designerName,
}: ClothingCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    toast({
      description: isLiked ? "Like retiré" : "Ajouté aux favoris",
      duration: 1500,
    });
  };

  const handleOrder = () => {
    navigate(`/order/${id}`);
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-800">
      <CardHeader className="p-0 relative">
        <div className="absolute top-2 right-2 z-10 bg-black/50 text-white px-3 py-1 rounded-full">
          {price.toFixed(2)} €
        </div>
        <img
          src={image}
          alt={name}
          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold text-fashion-charcoal dark:text-white">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        <div className="mt-2 space-y-1">
          <p className="text-sm font-medium text-fashion-charcoal dark:text-gray-300">
            Collection: {collectionName}
          </p>
          <p className="text-sm font-medium text-fashion-charcoal dark:text-gray-300">
            Designer: {designerName}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLike}
            className={`transition-colors ${
              isLiked ? "text-red-500" : "text-gray-500"
            }`}
          >
            <Heart
              className={`h-6 w-6 ${isLiked ? "fill-current animate-heart-beat" : ""}`}
            />
          </Button>
          <span className="text-sm text-gray-500 dark:text-gray-400">{likeCount} likes</span>
        </div>
        <Button 
          onClick={handleOrder}
          className="bg-fashion-gold hover:bg-fashion-gold/90 text-white"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Commander
        </Button>
      </CardFooter>
    </Card>
  );
};