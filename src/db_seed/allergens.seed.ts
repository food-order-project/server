import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Allergen } from '../allergens/schemas/allergen.schema';

@Injectable()
export class AllergensSeedService {
  constructor(
    @InjectModel(Allergen.name) private allergenModel: Model<Allergen>,
  ) {}

  async seed() {
    const allergens = [
      {
        name: 'milk',
        description: 'Süt ve süt ürünleri',
        isActive: true,
      },
      {
        name: 'nuts',
        description: 'Kuruyemişler',
        isActive: true,
      },
      {
        name: 'eggs',
        description: 'Yumurta',
        isActive: true,
      },
      {
        name: 'gluten',
        description: 'Gluten içeren tahıllar',
        isActive: true,
      },
      {
        name: 'fish',
        description: 'Balık ve balık ürünleri',
        isActive: true,
      },
    ];

    for (const allergen of allergens) {
      const exists = await this.allergenModel.findOne({ name: allergen.name }).exec();
      if (!exists) {
        await this.allergenModel.create(allergen);
      }
    }
  }
} 