import { useState } from "react";
import { useForm } from "react-hook-form";
import { Designer } from "@/types";
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
import { useToast } from "@/hooks/use-toast";
import { addDesigner, updateDesigner } from "@/services/dataService";
import ImageUpload from "@/components/ui/image-upload";

interface DesignerFormProps {
  designer?: Designer;
  onSuccess: () => void;
  onCancel: () => void;
}

const DesignerForm = ({ designer, onSuccess, onCancel }: DesignerFormProps) => {
  const { toast } = useToast();
  const [imageUrl, setImageUrl] = useState(designer?.image || "/placeholder.svg");
  
  const form = useForm<Omit<Designer, "id">>({
    defaultValues: {
      name: designer?.name || "",
      bio: designer?.bio || "",
      image: designer?.image || "/placeholder.svg",
    },
  });

  const onSubmit = (data: Omit<Designer, "id">) => {
    try {
      const designerData = {
        ...data,
        image: imageUrl,
      };

      if (designer) {
        updateDesigner({ ...designerData, id: designer.id });
        toast({
          title: "Designer modifié",
          description: "Le designer a été modifié avec succès",
        });
      } else {
        addDesigner(designerData);
        toast({
          title: "Designer ajouté",
          description: "Le designer a été ajouté avec succès",
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
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biographie</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
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
            {designer ? "Modifier" : "Ajouter"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DesignerForm;