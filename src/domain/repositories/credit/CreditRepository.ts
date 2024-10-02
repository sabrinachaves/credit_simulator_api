import { ICreditSimulation, CreditSimulation } from '../../entities/CreditSimulation';
import ICreditRepository from './ICreditRepository';
import { IListCreditsFilters } from '../../../useCases/list/IListUseCase';
import { Repository } from 'typeorm';

export default class CreditRepository implements ICreditRepository {
  constructor(private creditRepository: Repository<CreditSimulation>) {}

  async create(data: ICreditSimulation): Promise<ICreditSimulation> {
    return await this.creditRepository.save(data);
  }

  async listCredits(
    filters?: IListCreditsFilters,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<ICreditSimulation[]> {
    const query = this.creditRepository.createQueryBuilder('creditSimulation');

    if (filters?.minAmount) {
      query.andWhere('creditSimulation.amount >= :minAmount', { minAmount: filters.minAmount });
    }

    if (filters?.maxAmount) {
      query.andWhere('creditSimulation.amount <= :maxAmount', { maxAmount: filters.maxAmount });
    }

    if (filters?.createdAfter) {
      query.andWhere('creditSimulation.createdAt >= :createdAfter', { createdAfter: filters?.createdAfter });
    }

    if (filters?.createdBefore) {
      query.andWhere('creditSimulation.createdAt <= :createdBefore', { createdBefore: filters?.createdBefore });
    }

    query
      .orderBy('creditSimulation.createdAt', 'ASC')
      .skip((page - 1) * pageSize)
      .take(pageSize);

    return await query.getMany();
  }
}
