// data-source.ts
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql', // o el que uses
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'prueba1',
  entities: ['src/**/*.entity.ts'],
  synchronize: false,

  // Rutas para seeds y factories
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
};

export const dataSource = new DataSource(options);
