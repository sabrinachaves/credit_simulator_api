import CreditRepositoryFactory from '../../../../../src/infrastructure/factories/repositories/CreditRepositoryFactory';
import CreditRepository from '../../../../../src/domain/repositories/credit/CreditRepository';

jest.mock('../../../../../src/infrastructure/factories/persistence/DatabaseFactory', () => ({
  make: jest.fn().mockResolvedValue({
    getDataSource: jest.fn().mockReturnValue({
      getRepository: jest.fn(),
    }),
  }),
}));

describe('CreditRepositoryFactory', () => {
  it('should make the credit repository #unit', async () => {
    const creditRepository = await CreditRepositoryFactory.make();

    expect(creditRepository).toBeInstanceOf(CreditRepository);
    expect(creditRepository).toHaveProperty('create');
    expect(creditRepository).toHaveProperty('listCredits');
  });
});
