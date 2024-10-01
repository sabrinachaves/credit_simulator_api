import { ICreditSimulation } from '../../entities/CreditSimulation';
import { IListCreditsFilters } from '../../../useCases/list/IListUseCase';
export default interface ICreditRepository {
  create(data: ICreditSimulation): Promise<ICreditSimulation>;
  listCredits(filters?: IListCreditsFilters, page?: number, pageSize?: number): Promise<ICreditSimulation[]>;
}
