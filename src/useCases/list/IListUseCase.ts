import { ICreditSimulation } from '@domain/entities/CreditSimulation';

export interface IListCreditsFilters {
  minAmount?: number;
  maxAmount?: number;
  createdAfter?: Date;
  createdBefore?: Date;
}

export default interface IListUseCase {
  handle(filters?: IListCreditsFilters, page?: number, pageSize?: number): Promise<ICreditSimulation[]>;
}
