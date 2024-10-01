import ListUseCase from '../../../src/useCases/list/ListUseCase';
import { CreditSimulationMock } from '../../mocks/CreditMock';
import CreditRepositoryMock from '../../mocks/CreditRepositoryMock';

describe('ListCreditSimulationUseCase', () => {
  const creditRepository = new CreditRepositoryMock();
  const listUseCase = new ListUseCase(creditRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2024-09-29'));
  });

  it('should list credit simulations successfully without filters', async () => {
    creditRepository.listCredits = jest.fn().mockResolvedValueOnce([{ ...CreditSimulationMock }]);

    const response = await listUseCase.handle();

    expect(creditRepository.listCredits).toHaveBeenCalledTimes(1);
    expect(response[0]).toHaveProperty('id');
    expect(response[0]).toHaveProperty('amount');
    expect(response[0]).toHaveProperty('paymentTerm');
    expect(response[0]).toHaveProperty('birthDate');
    expect(response[0]).toHaveProperty('amountToBePaid');
    expect(response[0]).toHaveProperty('installmentsValue');
    expect(response[0]).toHaveProperty('amountPaidInInterest');
    expect(response[0]).toHaveProperty('interestRate');
  });

  it('should list credit simulations successfully with filters', async () => {
    creditRepository.listCredits = jest.fn().mockResolvedValueOnce([{ ...CreditSimulationMock }]);

    const filters = {
      minAmount: 3000,
    };

    const response = await listUseCase.handle(filters);

    expect(creditRepository.listCredits).toHaveBeenCalledTimes(1);
    expect(response[0]).toHaveProperty('id');
    expect(response[0]).toHaveProperty('amount');
    expect(response[0]).toHaveProperty('paymentTerm');
    expect(response[0]).toHaveProperty('birthDate');
    expect(response[0]).toHaveProperty('amountToBePaid');
    expect(response[0]).toHaveProperty('installmentsValue');
    expect(response[0]).toHaveProperty('amountPaidInInterest');
    expect(response[0]).toHaveProperty('interestRate');
  });

  it('should list credit simulations successfully with page and pageSize', async () => {
    creditRepository.listCredits = jest.fn().mockResolvedValueOnce([{ ...CreditSimulationMock }]);

    const response = await listUseCase.handle(undefined, 5, 10);

    expect(creditRepository.listCredits).toHaveBeenCalledTimes(1);
    expect(response[0]).toHaveProperty('id');
    expect(response[0]).toHaveProperty('amount');
    expect(response[0]).toHaveProperty('paymentTerm');
    expect(response[0]).toHaveProperty('birthDate');
    expect(response[0]).toHaveProperty('amountToBePaid');
    expect(response[0]).toHaveProperty('installmentsValue');
    expect(response[0]).toHaveProperty('amountPaidInInterest');
    expect(response[0]).toHaveProperty('interestRate');
  });

  it('should list an empty array when no credit simulations is found', async () => {
    creditRepository.listCredits = jest.fn().mockResolvedValueOnce([]);

    const filters = {
      minAmount: 3000,
    };

    const response = await listUseCase.handle(filters);

    expect(creditRepository.listCredits).toHaveBeenCalledTimes(1);
    expect(response).toEqual([]);
  });
});
