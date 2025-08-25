import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Pack } from '../data/packs';

export type User = { email: string; name: string; phone: string; address: string } | null;
export type PurchasedPack = Pack & { date: string };

interface PurchasedPacksContextType {
  user: User;
  purchasedPacks: PurchasedPack[];
  setUser: (user: User) => void;
  setPurchasedPacks: (packs: PurchasedPack[]) => void;
}

export const PurchasedPacksContext = createContext<PurchasedPacksContextType | undefined>(undefined);

export function usePurchasedPacks() {
  const ctx = useContext(PurchasedPacksContext);
  if (!ctx) throw new Error('usePurchasedPacks must be used within PurchasedPacksProvider');
  return ctx;
}

export const PurchasedPacksProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [purchasedPacks, setPurchasedPacks] = useState<PurchasedPack[]>([]);

  // Example: fetch purchased packs from API when user changes
  useEffect(() => {
    if (user) {
      // Replace with real API call
      setPurchasedPacks([
        {
          id: 1,
          name: 'Pack Débutant Zen',
          price: 15,
          description: 'Séances douces pour débuter en pleine conscience.',
          videoThumbnail: 'https://cdn.pixabay.com/photo/2023/10/14/09/19/meditation-8314420_1280.png',
          details: [
            { label: 'Durée', value: '20 min' },
            { label: 'Niveau', value: 'Débutant' },
            { label: 'Bonus', value: 'Méditation guidée' },
          ],
          videoIds: [],
          date: '2025-08-01',
        },
        {
          id: 201,
          name: 'Pack Beauté Fictif',
          price: 16,
          description: 'Pack fictif beauté pour tester le panier.',
          videoThumbnail: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
          details: [
            { label: 'Durée', value: '20 min' },
            { label: 'Niveau', value: 'Démo' },
            { label: 'Bonus', value: 'Aucun' },
          ],
          videoIds: [],
          date: '2025-08-10',
        },
      ]);
    } else {
      setPurchasedPacks([]);
    }
  }, [user]);

  return (
    <PurchasedPacksContext.Provider value={{ user, purchasedPacks, setUser, setPurchasedPacks }}>
      {children}
    </PurchasedPacksContext.Provider>
  );
};
