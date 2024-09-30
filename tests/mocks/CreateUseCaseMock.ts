import { ICreateCreditInput } from '../../src/useCases/create/ICreateUseCase';
import ICreateUseCase from '../../src/useCases/create/ICreateUseCase';
import { ICreditSimulation } from '../../src/domain/entities/CreditSimulation';

export default class CreateUseCaseMock implements ICreateUseCase {
  async handle(_data: ICreateCreditInput): Promise<ICreditSimulation> {
    return {} as ICreditSimulation;
  }
}
