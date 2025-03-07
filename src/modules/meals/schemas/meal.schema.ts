import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { allergens } from "../../../config/enums/allergens";
import { dietaryTypes } from "../../../config/enums/dietary-types";
import { mealCategory } from "../../../config/enums/meal-category";

export type MealDocument = Meal & Document;

@Schema({ timestamps: true })
export class Meal {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ type: String, default: "" })
  // @Prop({ type: [String], enum: dietaryTypes })
  @Prop({ required: false })
  imageUrl: string;

  @Prop({ required: false })
  preparationTime: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  calories: number;

  @Prop({ type: [String] })
  allergens: string[];

  @Prop({ type: [String] })
  dietaryTypes: string[];
}

export const MealSchema = SchemaFactory.createForClass(Meal);
