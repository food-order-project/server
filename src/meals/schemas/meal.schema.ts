import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type MealDocument = Meal & Document;

@Schema({ timestamps: true })
export class Meal {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    required: true,
    enum: ["main_course", "soup", "salad", "dessert", "beverage"],
  })
  category: string;

  @Prop({ type: Object, default: { vegetarian: false, vegan: false } })
  dietaryType: {
    vegetarian: boolean;
    vegan: boolean;
  };

  @Prop({ required: false })
  imageUrl: string;

  @Prop({ required: false })
  preparationTime: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  calories: number;

  @Prop({ type: [String], enum: ["milk", "nuts", "eggs", "gluten", "fish"] })
  allergens: string[];
}

export const MealSchema = SchemaFactory.createForClass(Meal);
