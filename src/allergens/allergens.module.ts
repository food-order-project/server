import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AllergensService } from './allergens.service';
import { AllergensController } from './allergens.controller';
import { Allergen, AllergenSchema } from './schemas/allergen.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Allergen.name, schema: AllergenSchema }]),
  ],
  controllers: [AllergensController],
  providers: [AllergensService],
  exports: [AllergensService],
})
export class AllergensModule {} 