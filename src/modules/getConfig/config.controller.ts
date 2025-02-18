import { Controller, Get } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Configuration")
@Controller("config")
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @ApiOperation({ summary: "Get all allergens" })
  @ApiResponse({
    status: 200,
    description: "Returns an array of all available allergens",
    schema: {
      type: "array",
      items: {
        type: "string",
        example: "Gluten",
      },
    },
  })
  @Get("allergens")
  getAllergens() {
    return this.configService.getAllergens();
  }

  @ApiOperation({ summary: "Get all dietary types" })
  @ApiResponse({
    status: 200,
    description: "Returns an array of all available dietary types",
    schema: {
      type: "array",
      items: {
        type: "string",
        example: "Vegan",
      },
    },
  })
  @Get("dietary-types")
  getDietaryTypes() {
    return this.configService.getDietaryTypes();
  }

  @ApiOperation({ summary: "Get all meal categories" })
  @ApiResponse({
    status: 200,
    description: "Returns an array of all available meal categories",
    schema: {
      type: "array",
      items: {
        type: "string",
        example: "main_course",
      },
    },
  })
  @Get("meal-categories")
  getMealCategories() {
    return this.configService.getMealCategories();
  }

  @ApiOperation({ summary: "Get all configuration data" })
  @ApiResponse({
    status: 200,
    description:
      "Returns all configuration data including allergens, dietary types, and meal categories",
    schema: {
      type: "object",
      properties: {
        allergens: {
          type: "array",
          items: {
            type: "string",
            example: "Gluten",
          },
        },
        dietaryTypes: {
          type: "array",
          items: {
            type: "string",
            example: "Vegan",
          },
        },
        mealCategories: {
          type: "array",
          items: {
            type: "string",
            example: "main_course",
          },
        },
      },
    },
  })
  @Get()
  getConfig() {
    return this.configService.getConfig();
  }
}
