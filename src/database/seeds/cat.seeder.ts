import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Cat } from 'src/cat/entities/cat.entity';

export default class CatSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const catFactory = factoryManager.get(Cat);
    await catFactory.saveMany(1000);
  }
}
