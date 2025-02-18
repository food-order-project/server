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
import { Type } from "class-transformer";

class DietaryTypeDto {
  @IsBoolean()
  @IsOptional()
  vegetarian?: boolean;

  @IsBoolean()
  @IsOptional()
  vegan?: boolean;
}

export class CreateMealDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(["main_course", "soup", "salad", "dessert", "beverage"])
  category: string;

  @ValidateNested()
  @Type(() => DietaryTypeDto)
  dietaryType: DietaryTypeDto;

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
  @IsEnum(["milk", "nuts", "eggs", "gluten", "fish"], { each: true })
  @IsOptional()
  allergens?: string[];
}
