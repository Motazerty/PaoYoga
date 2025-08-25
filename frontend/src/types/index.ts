// Common types for the frontend app

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Pack {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export interface Purchase {
  id: string;
  userId: string;
  packId: string;
  date: string;
}

// Add more types as needed for props, API responses, etc.
