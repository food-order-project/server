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
import { MealsService } from "./meals.service";
import { CreateMealDto } from "./dto/create-meal.dto";
import { UpdateMealDto } from "./dto/update-meal.dto";
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

@ApiTags("meals")
@ApiBearerAuth()
@Controller("meals")
@UseGuards(JwtAuthGuard, RolesGuard)
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Post()
  @Roles(RoleType.MANAGER)
  @ApiOperation({ summary: "Create a new meal" })
  @ApiBody({
    schema: {
      type: "object",
      required: ["name", "description", "price"],
      properties: {
        name: {
          type: "string",
          example: "Chicken Curry",
          description: "Name of the meal",
        },
        description: {
          type: "string",
          example: "Delicious chicken curry with rice",
          description: "Description of the meal",
        },
        price: {
          type: "number",
          example: 12.99,
          description: "Price of the meal",
        },
        imageUrl: {
          type: "string",
          example: "https://example.com/images/chicken-curry.jpg",
          description: "URL of the meal image",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "The meal has been successfully created.",
  })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  @ApiResponse({ status: 403, description: "Forbidden - Requires Admin Role." })
  create(@Body() createMealDto: CreateMealDto) {
    console.log(createMealDto);
    return this.mealsService.create(createMealDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all meals" })
  @ApiResponse({ status: 200, description: "Return all meals." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  findAll() {
    return this.mealsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a meal by id" })
  @ApiParam({
    name: "id",
    type: "string",
    description: "ID of the meal",
    example: "507f1f77bcf86cd799439011",
  })
  @ApiResponse({ status: 200, description: "Return the meal." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  @ApiResponse({ status: 404, description: "Meal not found." })
  findOne(@Param("id") id: string) {
    return this.mealsService.findOne(id);
  }

  @Patch(":id")
  @Roles(RoleType.MANAGER)
  @ApiOperation({ summary: "Update a meal" })
  @ApiParam({
    name: "id",
    type: "string",
    description: "ID of the meal to update",
    example: "507f1f77bcf86cd799439011",
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          example: "Updated Chicken Curry",
          description: "Updated name of the meal",
        },
        description: {
          type: "string",
          example: "Updated delicious chicken curry with rice",
          description: "Updated description of the meal",
        },
        price: {
          type: "number",
          example: 14.99,
          description: "Updated price of the meal",
        },
        imageUrl: {
          type: "string",
          example: "https://example.com/images/updated-chicken-curry.jpg",
          description: "Updated URL of the meal image",
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "The meal has been successfully updated.",
  })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  @ApiResponse({ status: 403, description: "Forbidden - Requires Admin Role." })
  @ApiResponse({ status: 404, description: "Meal not found." })
  update(@Param("id") id: string, @Body() updateMealDto: UpdateMealDto) {
    console.log("id : ", id);
    console.log("updateMEal : ", updateMealDto);
    
    return this.mealsService.update(id, updateMealDto);
  }

  @Delete(":id")
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: "Delete a meal" })
  @ApiParam({
    name: "id",
    type: "string",
    description: "ID of the meal to delete",
    example: "507f1f77bcf86cd799439011",
  })
  @ApiResponse({
    status: 200,
    description: "The meal has been successfully deleted.",
  })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  @ApiResponse({ status: 403, description: "Forbidden - Requires Admin Role." })
  @ApiResponse({ status: 404, description: "Meal not found." })
  remove(@Param("id") id: string) {
    return this.mealsService.remove(id);
  }
}
