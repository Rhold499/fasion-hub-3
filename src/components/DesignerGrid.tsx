import { Designer } from "@/types";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface DesignerGridProps {
  designers: Designer[];
}

export const DesignerGrid = ({ designers }: DesignerGridProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {designers.map((designer) => (
        <Card 
          key={designer.id} 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate(`/designer/${designer.id}`)}
        >
          <CardHeader className="p-0">
            <img
              src={designer.image}
              alt={designer.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          </CardHeader>
          <CardContent className="p-4">
            <h2 className="text-xl font-bold">{designer.name}</h2>
            <p className="text-gray-600">{designer.bio}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};