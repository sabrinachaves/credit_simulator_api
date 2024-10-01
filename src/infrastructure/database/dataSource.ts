import { AppConfig } from '../../config/AppConfig';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: AppConfig.DB_HOST,
  port: AppConfig.DB_PORT,
  username: AppConfig.MYSQL_USER,
  password: AppConfig.MYSQL_ROOT_PASSWORD,
  database: AppConfig.MYSQL_DATABASE,
  entities: [__dirname + '/../../domain/entities/*.ts'],
  migrations: [__dirname + '/migrations/*.ts'],
  synchronize: false,
});
