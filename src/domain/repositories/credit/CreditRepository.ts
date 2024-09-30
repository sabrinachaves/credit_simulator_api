import { ICreditSimulation, CreditSimulation } from '../../entities/CreditSimulation';
import ICreditRepository, { IRetrieveCreditsFilters } from './ICreditRepository';
import { Repository } from 'typeorm';

export default class CreditRepository implements ICreditRepository {
  constructor(private creditRepository: Repository<CreditSimulation>) {}

  async create(data: ICreditSimulation): Promise<ICreditSimulation> {
    const credit = this.creditRepository.create(data);
    return await this.creditRepository.save(credit);
  }

  async listCredits(
    filters?: IRetrieveCreditsFilters,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<ICreditSimulation[]> {
    const query = this.creditRepository.createQueryBuilder('creditSimulation');

    if (filters?.minCreditValue) {
      query.andWhere('creditSimulation.value >= :minCreditValue', { minCreditValue: filters.minCreditValue });
    }

    if (filters?.maxCreditValue) {
      query.andWhere('creditSimulation.value <= :maxCreditValue', { maxCreditValue: filters.maxCreditValue });
    }

    if (filters?.createdAfter) {
      query.andWhere('creditSimulation.createdAt >= :createdAfter', { createdAfter: filters?.createdAfter });
    }

    if (filters?.createdBefore) {
      query.andWhere('creditSimulation.createdAt <= :createdBefore', { createdBefore: filters?.createdBefore });
    }

    query.skip((page - 1) * pageSize).take(pageSize);

    return await query.getMany();
  }
}
