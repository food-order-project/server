import { Controller, Get } from '@nestjs/common';
import { allergens } from '../enums/allergens';
import { dietaryTypes } from '../enums/dietary-types';

@Controller('configs')
export class ConfigsController {
  @Get()
  getConfigs() {
    return {
      allergens,
      dietaryTypes,
      // İleride başka enum'lar buraya eklenebilir
      // örnek:
      // roles: roles,
      // status: status,
      // etc.
    };
  }
} 