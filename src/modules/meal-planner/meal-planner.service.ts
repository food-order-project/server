import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  MealPlanner,
  MealPlannerDocument,
} from "./schemas/meal-planner.schema";
import { CreateMealPlannerDto } from "./dto/create-meal-planner.dto";
import { UpdateMealPlannerDto } from "./dto/update-meal-planner.dto";

@Injectable()
export class MealPlannerService {
  constructor(
    @InjectModel(MealPlanner.name)
    private readonly mealPlannerModel: Model<MealPlannerDocument>
  ) {}

  async create(
    createMealPlannerDto: CreateMealPlannerDto
  ): Promise<MealPlanner> {
    const createdMealPlanner = new this.mealPlannerModel(createMealPlannerDto);
    return createdMealPlanner.save();
  }

  async findAll(): Promise<MealPlanner[]> {
    return this.mealPlannerModel.find().populate("meals").exec();
  }

  async findOne(id: string): Promise<MealPlanner> {
    const mealPlanner = await this.mealPlannerModel
      .findById(id)
      .populate("meals")
      .exec();
    if (!mealPlanner) {
      throw new NotFoundException(`Meal planner with ID ${id} not found`);
    }
    return mealPlanner;
  }

  async update(
    id: string,
    updateMealPlannerDto: UpdateMealPlannerDto
  ): Promise<MealPlanner> {
    const updatedMealPlanner = await this.mealPlannerModel
      .findByIdAndUpdate(id, updateMealPlannerDto, { new: true })
      .populate("meals")
      .exec();
    if (!updatedMealPlanner) {
      throw new NotFoundException(`Meal planner with ID ${id} not found`);
    }
    return updatedMealPlanner;
  }

  async remove(id: string): Promise<MealPlanner> {
    const deletedMealPlanner = await this.mealPlannerModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedMealPlanner) {
      throw new NotFoundException(`Meal planner with ID ${id} not found`);
    }
    return deletedMealPlanner;
  }
}
