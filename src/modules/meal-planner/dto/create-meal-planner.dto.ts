import {
  IsDate,
  IsArray,
  IsMongoId,
  IsBoolean,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateMealPlannerDto {
  @Type(() => Date)
  @IsDate()
  plannedDate: Date;

  @IsArray()
  @IsMongoId({ each: true })
  meals: string[];

  @IsMongoId()
  createdUserId: string;

  @IsMongoId()
  companyId: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
