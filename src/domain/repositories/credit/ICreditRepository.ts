import { ICreditSimulation } from '../../entities/CreditSimulation';

export interface IRetrieveCreditsFilters {
  minCreditValue?: number;
  maxCreditValue?: number;
  createdAfter?: Date;
  createdBefore?: Date;
}

export default interface ICreditRepository {
  create(data: ICreditSimulation): Promise<ICreditSimulation>;
  listCredits(filters?: IRetrieveCreditsFilters, page?: number, pageSize?: number): Promise<ICreditSimulation[]>;
}
