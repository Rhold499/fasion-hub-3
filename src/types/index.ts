export interface Designer {
  id: string;
  name: string;
  bio: string;
  image: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  designerId: string;
  season: string;
  year: number;
  image: string;
  price: number;
}

export interface Clothing {
  id: string;
  name: string;
  description: string;
  collectionId: string;
  image: string;
  likes: number;
  price: number;
}