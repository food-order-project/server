import { Controller, Get } from '@nestjs/common';
import { allergens } from './allergens';
import { dietaryTypes } from './dietary-types';

@Controller('api/enums')
export class EnumsController {
  @Get('allergens')
  getAllergens() {
    return allergens;
  }

  @Get('dietary-types')
  getDietaryTypes() {
    return dietaryTypes;
  }
} 