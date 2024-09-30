import { DataSource } from 'typeorm';
import { IDatabase } from './IDatabase';

export default class Database implements IDatabase {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async connect(): Promise<void> {
    try {
      await this.dataSource.initialize();

      console.log('Database connected!');
    } catch (error) {
      console.error(`Fail to connect on database with error: ${error}`);
      throw error;
    }
  }

  getDataSource() {
    return this.dataSource;
  }
}
