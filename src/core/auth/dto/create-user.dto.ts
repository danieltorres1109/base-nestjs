import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User, UserRole } from '../../user/entities/user.entity';
import { IsUnique } from 'src/core/validators/is-unique.validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @IsUnique(User, 'email', { message: 'El correo ya está registrado.' })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  // @Matches(
  //     /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //     message: 'The password must have an uppercase, lowercase letter and a number'
  // })
  password: string;

  @IsString()
  @MinLength(1)
  fullName: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole; // ← ahora es opcional y validado por enum
}
