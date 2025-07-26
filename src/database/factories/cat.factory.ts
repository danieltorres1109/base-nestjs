import { Cat } from 'src/cat/entities/cat.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Cat, (faker) => {
  const cat = new Cat();
  cat.name = faker.animal.cat();
  cat.age = faker.number.int({ min: 1, max: 20 });
  cat.color = faker.color.human();
  cat.url = faker.image.url(); // o usa una imagen placeholder

  return cat;
});
