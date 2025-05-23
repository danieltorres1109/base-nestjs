import { IsInt, IsString, Length, Min } from 'class-validator';
import { Cat } from '../entities/cat.entity';
import { IsUnique } from 'src/common/validators/is-unique.validator';

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

  @IsString()
  url: string;
}
