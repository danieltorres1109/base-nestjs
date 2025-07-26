import { runSeeders } from 'typeorm-extension';
import { dataSource } from './data-source';

async function seed() {
  await dataSource.initialize();

  // Truncar todas las tablas antes de insertar
  const entities = dataSource.entityMetadatas;

  for (const entity of entities) {
    const repository = dataSource.getRepository(entity.name);
    try {
      await repository.clear(); // clear() = TRUNCATE + RESET IDs
      console.log(`✅ Tabla ${entity.name} limpiada.`);
    } catch (error) {
      console.error(`❌ Error limpiando tabla ${entity.name}:`, error);
    }
  }

  // Ejecutar seeders
  await runSeeders(dataSource);
  await dataSource.destroy();
}

seed();
