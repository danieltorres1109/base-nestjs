import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [EntityClass, field = args.property] = args.constraints;
    const repo = this.dataSource.getRepository(EntityClass);
    const record = await repo.findOneBy({ [field]: value });
    return !record;
  }

  defaultMessage(args: ValidationArguments): string {
    const [_, field = args.property] = args.constraints;
    return `El valor de '${field}' ya está en uso.`;
  }
}

// 👇 Exportamos el decorador para que lo uses en tus DTOs
export function IsUnique(
  entity: Function,
  field?: string,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (target: Object, propertyName: string) {
    registerDecorator({
      target: target.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entity, field],
      validator: IsUniqueConstraint,
    });
  };
}
