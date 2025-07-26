import { setSeederFactory } from 'typeorm-extension';
import { User, UserRole } from 'src/core/user/entities/user.entity';
import { faker } from '@faker-js/faker';

export default setSeederFactory(User, () => {
  const user = new User();

  const firstName = faker.person.firstName(); // OK: usa datos de en_US
  const lastName = faker.person.lastName(); // OK: usa datos de en_US
  user.name = `${firstName} ${lastName}`;
  user.email = faker.internet.email({ firstName, lastName }).toLowerCase();
  user.password =
    '$2b$10$Yaik9.7CcL3qGscy6wP0LOvW1mJC6h7bIJxIb7wxLNdfagHDS0uxC';
  user.isActive = true;
  user.role = UserRole.USER;

  return user;
});
