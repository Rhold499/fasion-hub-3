import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Collection, Designer } from "@/types";
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
import { addCollection, updateCollection, getDesigners } from "@/services/dataService";

interface CollectionFormProps {
  collection?: Collection;
  onSuccess: () => void;
  onCancel: () => void;
}

const CollectionForm = ({ collection, onSuccess, onCancel }: CollectionFormProps) => {
  const { toast } = useToast();
  const [designers, setDesigners] = useState<Designer[]>([]);

  useEffect(() => {
    const fetchDesigners = async () => {
      const data = await getDesigners();
      setDesigners(data);
    };
    fetchDesigners();
  }, []);

  const form = useForm<Omit<Collection, "id">>({
    defaultValues: {
      name: collection?.name || "",
      description: collection?.description || "",
      designerId: collection?.designerId || "",
      season: collection?.season || "",
      year: collection?.year || new Date().getFullYear(),
    },
  });

  const onSubmit = async (data: Omit<Collection, "id">) => {
    try {
      if (collection) {
        await updateCollection({ ...data, id: collection.id });
        toast({
          title: "Collection modifiée",
          description: "La collection a été modifiée avec succès",
        });
      } else {
        await addCollection(data);
        toast({
          title: "Collection ajoutée",
          description: "La collection a été ajoutée avec succès",
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
          name="designerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Designer</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un designer" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {designers.map((designer) => (
                    <SelectItem key={designer.id} value={designer.id}>
                      {designer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="season"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Saison</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une saison" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Printemps">Printemps</SelectItem>
                  <SelectItem value="Été">Été</SelectItem>
                  <SelectItem value="Automne">Automne</SelectItem>
                  <SelectItem value="Hiver">Hiver</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Année</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            {collection ? "Modifier" : "Ajouter"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CollectionForm;