import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MealsService } from "./meals.service";
import { MealsController } from "./meals.controller";
import { Meal, MealSchema } from "./schemas/meal.schema";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Meal.name, schema: MealSchema }]),
    AuthModule,
  ],
  controllers: [MealsController],
  providers: [MealsService],
  exports: [MealsService],
})
export class MealsModule {}
