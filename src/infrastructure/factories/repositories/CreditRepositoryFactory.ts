import { CreditSimulation } from '@domain/entities/CreditSimulation';
import ICreditRepository from '@domain/repositories/credit/ICreditRepository';
import CreditRepository from '@domain/repositories/credit/CreditRepository';
import DatabaseFactory from '../persistence/DatabaseFactory';

export default class CreditRepositoryFactory {
  private static repository: ICreditRepository;

  static async make(): Promise<ICreditRepository> {
    if (this.repository) {
      return this.repository;
    }

    const dataSource = (await DatabaseFactory.make()).getDataSource();
    const creditRepository = dataSource.getRepository(CreditSimulation);

    this.repository = new CreditRepository(creditRepository);
    return this.repository;
  }
}
