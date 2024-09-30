import Database from '../../../../src/infrastructure/persistence/Database';
import { AppConfig } from '../../../../src/config/AppConfig';
import { DataSource } from 'typeorm';

jest.mock('typeorm', () => ({
  DataSource: jest.fn().mockImplementation(() => ({
    initialize: jest.fn(),
  })),
}));

describe('Database', () => {
  let database: Database;
  const appDataSource = new DataSource({
    type: 'mysql',
    host: AppConfig.DB_HOST,
    port: AppConfig.DB_PORT,
    username: AppConfig.MYSQL_USER,
    password: AppConfig.MYSQL_ROOT_PASSWORD,
    database: AppConfig.MYSQL_DATABASE,
    entities: [__dirname + '/../domain/entities/*.ts'],
    migrations: [__dirname + '/migrations/*.ts'],
    synchronize: false,
  });

  const buildDatabase = () => {
    return new Database(appDataSource);
  };

  beforeEach(() => {
    database = buildDatabase();
    jest.clearAllMocks();
  });

  it('should build database #unit', async () => {
    expect(database).toBeInstanceOf(Database);
    expect(database).toHaveProperty('connect');
  });

  it('should connect to database #unit', async () => {
    const database = buildDatabase();
    const connectSpy = jest.spyOn(appDataSource, 'initialize');

    console.log = jest.fn();
    console.error = jest.fn();

    await database.connect();

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.error).not.toHaveBeenCalled();
    expect(connectSpy).toHaveBeenCalled();
  });

  it('should catch an error event #unit', async () => {
    const initializeMock = jest.fn().mockRejectedValue(new Error('Error on database connection'));
    appDataSource.initialize = initializeMock;

    const database = buildDatabase();
    console.log = jest.fn();
    console.error = jest.fn();

    await expect(database.connect()).rejects.toThrow(new Error('Error on database connection'));

    expect(console.log).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      `Fail to connect on database with error: Error: Error on database connection`,
    );
  });
});
