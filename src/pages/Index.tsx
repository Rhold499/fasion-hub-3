import { useQuery } from "@tanstack/react-query";
import { getDesigners } from "@/services/dataService";
import { DesignerGrid } from "@/components/DesignerGrid";
import { Designer } from "@/types";

const Index = () => {
  const { data: designers = [], isLoading, error } = useQuery<Designer[]>({
    queryKey: ["designers"],
    queryFn: getDesigners,
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Une erreur est survenue</div>;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Nos Designers</h1>
      <DesignerGrid designers={designers} />
    </div>
  );
};

export default Index;