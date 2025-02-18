import { mealCategory } from "../../config/enums/meal-category";
import { allergens } from "../../config/enums/allergens";
import { dietaryTypes } from "../../config/enums/dietary-types";

export const meals = [
  {
    name: "Grilled Chicken Salad",
    description:
      "Fresh mixed greens with grilled chicken breast, cherry tomatoes, and balsamic vinaigrette",
    category: "main_course",
    preparationTime: 20,
    isActive: true,
    calories: 350,
    allergens: [],
    dietaryTypes: ["Keto"],
  },
  {
    name: "Vegetarian Pasta",
    description:
      "Whole grain pasta with seasonal vegetables and marinara sauce",
    category: "main_course",
    preparationTime: 25,
    isActive: true,
    calories: 450,
    allergens: ["Gluten"],
    dietaryTypes: ["Vegetarian"],
  },
  {
    name: "Fresh Fruit Cup",
    description: "Seasonal fresh fruits mix",
    category: "dessert",
    preparationTime: 10,
    isActive: true,
    calories: 100,
    allergens: [],
    dietaryTypes: ["Vegan"],
  },
];
