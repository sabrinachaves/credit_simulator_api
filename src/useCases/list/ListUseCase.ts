import { ICreditSimulation } from '@domain/entities/CreditSimulation';
import IListUseCase, { IListCreditsFilters } from './IListUseCase';
import ICreditRepository from '@domain/repositories/credit/ICreditRepository';

export default class ListUseCase implements IListUseCase {
  constructor(private creditRepository: ICreditRepository) {}

  public async handle(filters?: IListCreditsFilters, page?: number, pageSize?: number): Promise<ICreditSimulation[]> {
    const creditSimulations = await this.creditRepository.listCredits(filters, page, pageSize);
    return creditSimulations;
  }
}
