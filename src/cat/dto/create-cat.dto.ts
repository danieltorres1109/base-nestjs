import { IsInt, IsString, Length, Min } from 'class-validator';
import { IsUnique } from '../common/validators/is-unique.validator';
import { Cat } from '../entities/cat.entity';

export class CreateCatDto {
  @IsString()
  @Length(2, 30)
  @IsUnique(Cat, 'name', { message: 'El nombre ya está en uso.' })
  name: string;

  @IsInt()
  @Min(0)
  age: number;

  @IsString()
  color: string;
}
