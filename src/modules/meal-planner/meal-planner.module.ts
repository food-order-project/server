import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MealPlannerService } from "./meal-planner.service";
import { MealPlannerController } from "./meal-planner.controller";
import { MealPlanner, MealPlannerSchema } from "./schemas/meal-planner.schema";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MealPlanner.name, schema: MealPlannerSchema },
    ]),
    AuthModule,
  ],
  controllers: [MealPlannerController],
  providers: [MealPlannerService],
  exports: [MealPlannerService],
})
export class MealPlannerModule {}
