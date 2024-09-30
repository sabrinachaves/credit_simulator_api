import { DataSource } from 'typeorm';

export interface IDatabase {
  connect(): Promise<void>;
  getDataSource(): DataSource;
}
