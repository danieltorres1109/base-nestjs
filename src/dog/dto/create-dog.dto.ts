import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { IsUnique } from 'src/core/validators/is-unique.validator';
import { Dog } from '../entities/dog.entity';

export class CreateDogDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @IsUnique(Dog, 'name', { message: 'El nombre ya está en uso.' })
  name: string;

  @IsIn(['white', 'black', 'brown'])
  color: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  edad: number;
}
