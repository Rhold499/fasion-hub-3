import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Clothing, Collection } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { addClothing, updateClothing, getCollections } from "@/services/dataService";
import ImageUpload from "@/components/ui/image-upload";

interface ClothingFormProps {
  clothing?: Clothing;
  onSuccess: () => void;
  onCancel: () => void;
}

const ClothingForm = ({ clothing, onSuccess, onCancel }: ClothingFormProps) => {
  const { toast } = useToast();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [imageUrl, setImageUrl] = useState(clothing?.image || "/placeholder.svg");
  
  useEffect(() => {
    const fetchCollections = async () => {
      const data = await getCollections();
      setCollections(data);
    };
    fetchCollections();
  }, []);

  const form = useForm<Omit<Clothing, "id" | "likes">>({
    defaultValues: {
      name: clothing?.name || "",
      description: clothing?.description || "",
      collectionId: clothing?.collectionId || "",
      image: clothing?.image || "/placeholder.svg",
    },
  });

  const onSubmit = async (data: Omit<Clothing, "id" | "likes">) => {
    try {
      const clothingData = {
        ...data,
        image: imageUrl,
      };

      if (clothing) {
        await updateClothing({ ...clothingData, id: clothing.id, likes: clothing.likes });
        toast({
          title: "Vêtement modifié",
          description: "Le vêtement a été modifié avec succès",
        });
      } else {
        await addClothing({ ...clothingData, likes: 0 });
        toast({
          title: "Vêtement ajouté",
          description: "Le vêtement a été ajouté avec succès",
        });
      }
      onSuccess();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="collectionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une collection" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {collections.map((collection) => (
                    <SelectItem key={collection.id} value={collection.id}>
                      {collection.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <ImageUpload
          onChange={setImageUrl}
          defaultImage={imageUrl}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            {clothing ? "Modifier" : "Ajouter"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ClothingForm;