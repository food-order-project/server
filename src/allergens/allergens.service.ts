import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Allergen, AllergenDocument } from './schemas/allergen.schema';
import { CreateAllergenDto } from './dto/create-allergen.dto';
import { UpdateAllergenDto } from './dto/update-allergen.dto';

@Injectable()
export class AllergensService {
  constructor(
    @InjectModel(Allergen.name) private allergenModel: Model<AllergenDocument>,
  ) {}

  async create(createAllergenDto: CreateAllergenDto): Promise<Allergen> {
    const createdAllergen = new this.allergenModel(createAllergenDto);
    return createdAllergen.save();
  }

  async findAll(): Promise<Allergen[]> {
    return this.allergenModel.find().exec();
  }

  async findOne(id: string): Promise<Allergen> {
    return this.allergenModel.findById(id).exec();
  }

  async update(id: string, updateAllergenDto: UpdateAllergenDto): Promise<Allergen> {
    return this.allergenModel
      .findByIdAndUpdate(id, updateAllergenDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Allergen> {
    return this.allergenModel.findByIdAndDelete(id).exec();
  }

  async findActive(): Promise<Allergen[]> {
    return this.allergenModel.find({ isActive: true }).exec();
  }
} 