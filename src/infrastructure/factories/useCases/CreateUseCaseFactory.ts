import ICreditRepository from '@domain/repositories/credit/ICreditRepository';
import CreateUseCase from '@useCases/create/CreateUseCase';
import ICreateUseCase from '@useCases/create/ICreateUseCase';
import CreditRepositoryFactory from '../repositories/CreditRepositoryFactory';

export default class CreateUseCaseFactory {
  private static useCase: ICreateUseCase;
  private static creditRepository: ICreditRepository;

  static async make(creditRepository?: ICreditRepository): Promise<ICreateUseCase> {
    if (this.useCase) {
      return this.useCase;
    }
    this.creditRepository = creditRepository ?? (await CreditRepositoryFactory.make());

    this.useCase = new CreateUseCase(this.creditRepository);
    return this.useCase;
  }
}
