import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../../user/entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsEmail()
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
