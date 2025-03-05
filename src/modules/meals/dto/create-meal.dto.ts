import {
  IsString,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsArray,
  IsUrl,
  ValidateNested,
} from "class-validator";
import { mealCategory } from "../../../config/enums/meal-category";
import { allergens } from "../../../config/enums/allergens";

export class CreateMealDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  // @IsEnum(mealCategory)
  @IsString()
  category: string;

  @IsArray()
  // @IsEnum(allergens)
  @IsOptional()
  dietaryType: string[];

  @IsUrl()
  imageUrl: string;

  @IsNumber()
  preparationTime: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsNumber()
  @IsOptional()
  calories?: number;

  @IsArray()
  // @IsEnum(allergens)
  @IsOptional()
  allergens?: string[];
}
