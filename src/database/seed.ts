import { runSeeders } from 'typeorm-extension';
import { dataSource } from './data-source';

async function seed() {
  await dataSource.initialize();
  await runSeeders(dataSource);
  await dataSource.destroy();
}

seed();
