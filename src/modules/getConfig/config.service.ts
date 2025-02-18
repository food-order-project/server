import { Injectable } from "@nestjs/common";
import { allergens } from "../../config/enums/allergens";
import { dietaryTypes } from "../../config/enums/dietary-types";
import { mealCategory } from "../../config/enums/meal-category";

@Injectable()
export class ConfigService {
  getAllergens() {
    return allergens;
  }

  getDietaryTypes() {
    return dietaryTypes;
  }

  getMealCategories() {
    return mealCategory;
  }

  getConfig() {
    return {
      allergens: this.getAllergens(),
      dietaryTypes: this.getDietaryTypes(),
      mealCategories: this.getMealCategories(),
    };
  }
}
