import { PartialType } from "@nestjs/mapped-types";
import { CreateMealPlannerDto } from "./create-meal-planner.dto";

export class UpdateMealPlannerDto extends PartialType(CreateMealPlannerDto) {}
