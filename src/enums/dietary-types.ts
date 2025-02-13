export interface DietaryType {
  id: string;
  name: string;
  description: string;
}

export const dietaryTypes: DietaryType[] = [
  {
    id: 'vegetarian',
    name: 'Vegetarian',
    description: 'Vejetaryen yemekler',
  },
  {
    id: 'vegan',
    name: 'Vegan',
    description: 'Vegan yemekler',
  },
]; 