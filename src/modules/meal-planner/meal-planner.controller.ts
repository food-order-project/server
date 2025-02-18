import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { MealPlannerService } from "./meal-planner.service";
import { CreateMealPlannerDto } from "./dto/create-meal-planner.dto";
import { UpdateMealPlannerDto } from "./dto/update-meal-planner.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { RoleType } from "../roles/enums/role.enum";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";

@ApiTags("meal-planner")
@ApiBearerAuth()
@Controller("meal-planner")
@UseGuards(JwtAuthGuard, RolesGuard)
export class MealPlannerController {
  constructor(private readonly mealPlannerService: MealPlannerService) {}

  @Post()
  @Roles(RoleType.MANAGER)
  @ApiOperation({ summary: "Create a new meal plan" })
  @ApiBody({
    type: CreateMealPlannerDto,
    description: "The meal plan to create",
  })
  @ApiResponse({
    status: 201,
    description: "The meal plan has been successfully created.",
  })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  @ApiResponse({
    status: 403,
    description: "Forbidden - Requires Manager Role.",
  })
  create(@Body() createMealPlannerDto: CreateMealPlannerDto) {
    return this.mealPlannerService.create(createMealPlannerDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all meal plans" })
  @ApiResponse({ status: 200, description: "Return all meal plans." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  findAll() {
    return this.mealPlannerService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a meal plan by id" })
  @ApiParam({
    name: "id",
    type: "string",
    description: "ID of the meal plan",
  })
  @ApiResponse({ status: 200, description: "Return the meal plan." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  @ApiResponse({ status: 404, description: "Meal plan not found." })
  findOne(@Param("id") id: string) {
    return this.mealPlannerService.findOne(id);
  }

  @Patch(":id")
  @Roles(RoleType.MANAGER)
  @ApiOperation({ summary: "Update a meal plan" })
  @ApiParam({
    name: "id",
    type: "string",
    description: "ID of the meal plan to update",
  })
  @ApiBody({
    type: UpdateMealPlannerDto,
    description: "The meal plan data to update",
  })
  @ApiResponse({
    status: 200,
    description: "The meal plan has been successfully updated.",
  })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  @ApiResponse({
    status: 403,
    description: "Forbidden - Requires Manager Role.",
  })
  @ApiResponse({ status: 404, description: "Meal plan not found." })
  update(
    @Param("id") id: string,
    @Body() updateMealPlannerDto: UpdateMealPlannerDto
  ) {
    return this.mealPlannerService.update(id, updateMealPlannerDto);
  }

  @Delete(":id")
  @Roles(RoleType.MANAGER)
  @ApiOperation({ summary: "Delete a meal plan" })
  @ApiParam({
    name: "id",
    type: "string",
    description: "ID of the meal plan to delete",
  })
  @ApiResponse({
    status: 200,
    description: "The meal plan has been successfully deleted.",
  })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  @ApiResponse({
    status: 403,
    description: "Forbidden - Requires Manager Role.",
  })
  @ApiResponse({ status: 404, description: "Meal plan not found." })
  remove(@Param("id") id: string) {
    return this.mealPlannerService.remove(id);
  }
}
