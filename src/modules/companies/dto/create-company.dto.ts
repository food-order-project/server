import {
  IsString,
  IsEmail,
  IsOptional,
  IsObject,
  IsBoolean,
} from "class-validator";
import { Types } from "mongoose";

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsObject()
  @IsOptional()
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  createdBy?: Types.ObjectId;
}
