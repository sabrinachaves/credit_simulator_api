import CreateUseCase from '../../../src/useCases/create/CreateUseCase';
import CreditRepositoryMock from '../../mocks/CreditRepositoryMock';
import UnprocessableEntityError from '../../../src/domain/exceptions/UnprocessableEntityError';

describe('CreateCreditSimulationUseCase', () => {
  const creditRepository = new CreditRepositoryMock();
  const createUseCase = new CreateUseCase(creditRepository);

  creditRepository.create = jest.fn().mockImplementation((data) => data);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2024-09-29'));
  });

  it('should create a credit simulation successfully for a 19 years old', async () => {
    const creditSimulationInput = {
      birthDate: new Date('2005-05-01'),
      amount: 15000,
      paymentTermInMonths: 15,
    };

    const response = await createUseCase.handle(creditSimulationInput);

    expect(creditRepository.create).toHaveBeenCalledTimes(1);
    expect(response).toHaveProperty('id'),
      expect(response).toHaveProperty('amount'),
      expect(response).toHaveProperty('paymentTerm'),
      expect(response).toHaveProperty('birthDate'),
      expect(response).toHaveProperty('amountToBePaid'),
      expect(response).toHaveProperty('installmentsValue'),
      expect(response).toHaveProperty('amountPaidInInterest'),
      expect(response).toHaveProperty('interestRate'),
      expect(response.interestRate).toBe(5),
      expect(response.installmentsValue).toBe(1033.66),
      expect(response.amountToBePaid).toBe(15504.9),
      expect(response.amountPaidInInterest).toBe(504.9);
  });

  it('should create a credit simulation successfully for a 34 years old person', async () => {
    const creditSimulationInput = {
      birthDate: new Date('1990-05-01'),
      amount: 15000,
      paymentTermInMonths: 15,
    };

    const response = await createUseCase.handle(creditSimulationInput);

    expect(creditRepository.create).toHaveBeenCalledTimes(1);
    expect(response).toHaveProperty('id'),
      expect(response).toHaveProperty('amount'),
      expect(response).toHaveProperty('paymentTerm'),
      expect(response).toHaveProperty('birthDate'),
      expect(response).toHaveProperty('amountToBePaid'),
      expect(response).toHaveProperty('installmentsValue'),
      expect(response).toHaveProperty('amountPaidInInterest'),
      expect(response).toHaveProperty('interestRate'),
      expect(response.interestRate).toBe(3),
      expect(response.installmentsValue).toBe(1020.12),
      expect(response.amountToBePaid).toBe(15301.8),
      expect(response.amountPaidInInterest).toBe(301.8);
  });

  it('should create a credit simulation successfully for a 55 years old person', async () => {
    const creditSimulationInput = {
      birthDate: new Date('1969-05-01'),
      amount: 15000,
      paymentTermInMonths: 15,
    };

    const response = await createUseCase.handle(creditSimulationInput);

    expect(creditRepository.create).toHaveBeenCalledTimes(1);
    expect(response).toHaveProperty('id'),
      expect(response).toHaveProperty('amount'),
      expect(response).toHaveProperty('paymentTerm'),
      expect(response).toHaveProperty('birthDate'),
      expect(response).toHaveProperty('amountToBePaid'),
      expect(response).toHaveProperty('installmentsValue'),
      expect(response).toHaveProperty('amountPaidInInterest'),
      expect(response).toHaveProperty('interestRate'),
      expect(response.interestRate).toBe(2),
      expect(response.installmentsValue).toBe(1013.39),
      expect(response.amountToBePaid).toBe(15200.85),
      expect(response.amountPaidInInterest).toBe(200.85);
  });

  it('should create a credit simulation successfully for a 65 years old person', async () => {
    const creditSimulationInput = {
      birthDate: new Date('1959-05-01'),
      amount: 15000,
      paymentTermInMonths: 15,
    };

    const response = await createUseCase.handle(creditSimulationInput);

    expect(creditRepository.create).toHaveBeenCalledTimes(1);
    expect(response).toHaveProperty('id'),
      expect(response).toHaveProperty('amount'),
      expect(response).toHaveProperty('paymentTerm'),
      expect(response).toHaveProperty('birthDate'),
      expect(response).toHaveProperty('amountToBePaid'),
      expect(response).toHaveProperty('installmentsValue'),
      expect(response).toHaveProperty('amountPaidInInterest'),
      expect(response).toHaveProperty('interestRate'),
      expect(response.interestRate).toBe(4),
      expect(response.installmentsValue).toBe(1026.87),
      expect(response.amountToBePaid).toBe(15403.05),
      expect(response.amountPaidInInterest).toBe(403.05);
  });

  it('should thrown an error when age is less than 18', async () => {
    const creditSimulationInput = {
      birthDate: new Date('2008-01-01'),
      amount: 10000,
      paymentTermInMonths: 12,
    };

    await expect(createUseCase.handle(creditSimulationInput)).rejects.toThrow(
      new UnprocessableEntityError('Age can not be less than 18 years old'),
    );
  });
});
