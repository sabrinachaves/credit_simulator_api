import DatabaseFactory from '../../../../../src/infrastructure/factories/persistence/DatabaseFactory';
import Database from '../../../../../src/infrastructure/persistence/Database';

jest.mock('../../../../../src/infrastructure/persistence/Database');

describe('DatabaseFactory', () => {
  it('should build the database #unit', async () => {
    const database = await DatabaseFactory.make();

    expect(database).toBeInstanceOf(Database);
    expect(database).toHaveProperty('connect');
  });

  it('should not create a new instance if already exists #unit', async () => {
    await DatabaseFactory.make();
    await DatabaseFactory.make();

    expect(Database).toHaveBeenCalledTimes(1);
  });
});
