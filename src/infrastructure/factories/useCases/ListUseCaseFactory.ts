import ICreditRepository from '@domain/repositories/credit/ICreditRepository';
import CreditRepositoryFactory from '../repositories/CreditRepositoryFactory';
import IListUseCase from '@useCases/list/IListUseCase';
import ListUseCase from '@useCases/list/ListUseCase';

export default class ListUseCaseFactory {
  private static useCase: IListUseCase;
  private static creditRepository: ICreditRepository;

  static async make(creditRepository?: ICreditRepository): Promise<IListUseCase> {
    if (this.useCase) {
      return this.useCase;
    }
    this.creditRepository = creditRepository ?? (await CreditRepositoryFactory.make());

    this.useCase = new ListUseCase(this.creditRepository);
    return this.useCase;
  }
}
