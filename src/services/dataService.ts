import { Designer, Collection, Clothing } from "@/types";

const API_URL = "http://localhost:3000";

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Designers
export const getDesigners = async (): Promise<Designer[]> => {
  try {
    const response = await fetch(`${API_URL}/designers`);
    return handleResponse(response);
  } catch (error) {
    console.error("Failed to fetch designers:", error);
    throw new Error("Le serveur n'est pas accessible. Assurez-vous que json-server est en cours d'exécution sur le port 3000.");
  }
};

export const addDesigner = async (designer: Omit<Designer, "id">): Promise<Designer> => {
  try {
    const response = await fetch(`${API_URL}/designers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(designer),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Failed to add designer:", error);
    throw new Error("Impossible d'ajouter le designer. Vérifiez que le serveur est accessible.");
  }
};

export const updateDesigner = async (designer: Designer): Promise<Designer> => {
  try {
    const response = await fetch(`${API_URL}/designers/${designer.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(designer),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Failed to update designer:", error);
    throw new Error("Impossible de modifier le designer. Vérifiez que le serveur est accessible.");
  }
};

export const deleteDesigner = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/designers/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to delete designer:", error);
    throw new Error("Impossible de supprimer le designer. Vérifiez que le serveur est accessible.");
  }
};

// Collections
export const getCollections = async (): Promise<Collection[]> => {
  try {
    const response = await fetch(`${API_URL}/collections`);
    return handleResponse(response);
  } catch (error) {
    console.error("Failed to fetch collections:", error);
    throw new Error("Le serveur n'est pas accessible. Assurez-vous que json-server est en cours d'exécution sur le port 3000.");
  }
};

export const addCollection = async (collection: Omit<Collection, "id">): Promise<Collection> => {
  try {
    const response = await fetch(`${API_URL}/collections`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(collection),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Failed to add collection:", error);
    throw new Error("Impossible d'ajouter la collection. Vérifiez que le serveur est accessible.");
  }
};

export const updateCollection = async (collection: Collection): Promise<Collection> => {
  try {
    const response = await fetch(`${API_URL}/collections/${collection.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(collection),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Failed to update collection:", error);
    throw new Error("Impossible de modifier la collection. Vérifiez que le serveur est accessible.");
  }
};

export const deleteCollection = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/collections/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to delete collection:", error);
    throw new Error("Impossible de supprimer la collection. Vérifiez que le serveur est accessible.");
  }
};

// Clothes
export const getClothes = async (): Promise<Clothing[]> => {
  try {
    const response = await fetch(`${API_URL}/clothes`);
    return handleResponse(response);
  } catch (error) {
    console.error("Failed to fetch clothes:", error);
    throw new Error("Le serveur n'est pas accessible. Assurez-vous que json-server est en cours d'exécution sur le port 3000.");
  }
};

export const addClothing = async (clothing: Omit<Clothing, "id">): Promise<Clothing> => {
  try {
    const response = await fetch(`${API_URL}/clothes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clothing),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Failed to add clothing:", error);
    throw new Error("Impossible d'ajouter le vêtement. Vérifiez que le serveur est accessible.");
  }
};

export const updateClothing = async (clothing: Clothing): Promise<Clothing> => {
  try {
    const response = await fetch(`${API_URL}/clothes/${clothing.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clothing),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Failed to update clothing:", error);
    throw new Error("Impossible de modifier le vêtement. Vérifiez que le serveur est accessible.");
  }
};

export const deleteClothing = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/clothes/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to delete clothing:", error);
    throw new Error("Impossible de supprimer le vêtement. Vérifiez que le serveur est accessible.");
  }
};