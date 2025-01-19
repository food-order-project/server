import {
  IsEmail,
  IsString,
  IsArray,
  IsOptional,
  IsNotEmpty,
} from "class-validator";
import { Types } from "mongoose";
import { RoleType } from "../../roles/enums/role.enum";

export class UserDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsOptional()
  roleName?: RoleType | string;

  @IsArray()
  @IsOptional()
  roles?: Types.ObjectId[];
}
