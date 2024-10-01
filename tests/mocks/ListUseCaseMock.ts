import { IListCreditsFilters } from '../../src/useCases/list/IListUseCase';
import IListUseCase from '../../src/useCases/list/IListUseCase';
import { ICreditSimulation } from '../../src/domain/entities/CreditSimulation';

export default class ListUseCaseMock implements IListUseCase {
  async handle(_filters: IListCreditsFilters, _page: number, _pageSize: number): Promise<ICreditSimulation[]> {
    return [] as ICreditSimulation[];
  }
}
