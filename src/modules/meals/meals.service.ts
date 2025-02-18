import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Meal, MealDocument } from "./schemas/meal.schema";
import { CreateMealDto } from "./dto/create-meal.dto";
import { UpdateMealDto } from "./dto/update-meal.dto";

@Injectable()
export class MealsService {
  constructor(
    @InjectModel(Meal.name) private readonly mealModel: Model<MealDocument>
  ) {}

  async create(createMealDto: CreateMealDto): Promise<Meal> {
    const createdMeal = new this.mealModel(createMealDto);
    return createdMeal.save();
  }

  async findAll(): Promise<Meal[]> {
    return this.mealModel.find().exec();
  }

  async findOne(id: string): Promise<Meal> {
    const meal = await this.mealModel.findById(id).exec();
    if (!meal) {
      throw new NotFoundException(`Meal with ID ${id} not found`);
    }
    return meal;
  }

  async update(id: string, updateMealDto: UpdateMealDto): Promise<Meal> {
    const updatedMeal = await this.mealModel
      .findByIdAndUpdate(id, updateMealDto, { new: true })
      .exec();
    if (!updatedMeal) {
      throw new NotFoundException(`Meal with ID ${id} not found`);
    }
    return updatedMeal;
  }

  async remove(id: string): Promise<Meal> {
    const deletedMeal = await this.mealModel.findByIdAndDelete(id).exec();
    if (!deletedMeal) {
      throw new NotFoundException(`Meal with ID ${id} not found`);
    }
    return deletedMeal;
  }
}
