import {
  IsEmail,
  IsString,
  IsArray,
  IsOptional,
  IsNotEmpty,
  IsMongoId,
} from "class-validator";
import { Types } from "mongoose";

export class CreateUserDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsOptional()
  roleName?: string;

  @IsArray()
  @IsOptional()
  roles?: Types.ObjectId[]; // Array of role IDs
}
