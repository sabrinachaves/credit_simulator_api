import { ICreditSimulation } from '../../src/domain/entities/CreditSimulation';
import ICreditRepository, { IRetrieveCreditsFilters } from '../../src/domain/repositories/credit/ICreditRepository';

export default class CreditRepositoryMock implements ICreditRepository {
  async create(_data: ICreditSimulation): Promise<ICreditSimulation> {
    return {} as ICreditSimulation;
  }

  async listCredits(
    _filters?: IRetrieveCreditsFilters,
    _page?: number,
    _pageSize?: number,
  ): Promise<ICreditSimulation[]> {
    return [] as ICreditSimulation[];
  }
}
