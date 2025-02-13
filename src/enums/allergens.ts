export interface Allergen {
  id: string;
  name: string;
  description: string;
}

export const allergens: Allergen[] = [
  {
    id: 'milk',
    name: 'Milk',
    description: 'Süt ve süt ürünleri',
  },
  {
    id: 'nuts',
    name: 'Nuts',
    description: 'Kuruyemişler',
  },
  {
    id: 'eggs',
    name: 'Eggs',
    description: 'Yumurta',
  },
  {
    id: 'gluten',
    name: 'Gluten',
    description: 'Gluten içeren tahıllar',
  },
  {
    id: 'fish',
    name: 'Fish',
    description: 'Balık ve balık ürünleri',
  },
]; 