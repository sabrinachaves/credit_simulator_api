import { IDatabase } from '@infrastructure/persistence/IDatabase';
import Database from '@infrastructure/persistence/Database';
import { AppDataSource } from '../../../database/dataSource';

export default class DatabaseFactory {
  private static database: IDatabase;

  static async make() {
    if (this.database) {
      return this.database;
    }

    this.database = new Database(AppDataSource);
    return this.database;
  }
}
