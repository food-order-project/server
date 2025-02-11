import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Allergen, AllergenSchema } from '../allergens/schemas/allergen.schema';
import { AllergensSeedService } from './allergens.seed';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Allergen.name, schema: AllergenSchema },
    ]),
  ],
  providers: [AllergensSeedService],
  exports: [AllergensSeedService],
})
export class SeedModule {} 