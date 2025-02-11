import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateAllergenDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
} 