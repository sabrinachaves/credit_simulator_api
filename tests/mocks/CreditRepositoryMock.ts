import { ICreditSimulation } from '../../src/domain/entities/CreditSimulation';
import ICreditRepository from '../../src/domain/repositories/credit/ICreditRepository';
import { IListCreditsFilters } from '../../src/useCases/list/IListUseCase';
export default class CreditRepositoryMock implements ICreditRepository {
  async create(_data: ICreditSimulation): Promise<ICreditSimulation> {
    return {} as ICreditSimulation;
  }

  async listCredits(_filters?: IListCreditsFilters, _page?: number, _pageSize?: number): Promise<ICreditSimulation[]> {
    return [] as ICreditSimulation[];
  }
}
