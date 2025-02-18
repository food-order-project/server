import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Meal } from "../../meals/schemas/meal.schema";

export type MealPlannerDocument = MealPlanner & Document;

@Schema({ timestamps: true })
export class MealPlanner {
  @Prop({ required: true, type: Date })
  plannedDate: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: "Meal" }], required: true })
  meals: Meal[];

  @Prop({ type: Types.ObjectId, required: true })
  createdUserId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  companyId: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;
}

export const MealPlannerSchema = SchemaFactory.createForClass(MealPlanner);
