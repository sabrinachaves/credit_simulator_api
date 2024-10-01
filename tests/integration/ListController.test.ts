import supertest from 'supertest';
import { OK } from 'http-status';
import { mockServer } from '../helpers';
import CreditRepositoryMock from '../mocks/CreditRepositoryMock';
import ListUseCaseFactory from '../../src/infrastructure/factories/useCases/ListUseCaseFactory';
import { CreditSimulationMock } from '../mocks/CreditMock';

describe('ListController', () => {
  let server: supertest.SuperTest<supertest.Test>;
  const creditRepositoryMock = new CreditRepositoryMock();

  beforeAll(async () => {
    const listUseCase = await ListUseCaseFactory.make(creditRepositoryMock);
    server = await mockServer({ listUseCase });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 when list credit simulations #integration', async () => {
    creditRepositoryMock.listCredits = jest.fn().mockResolvedValueOnce([CreditSimulationMock]);

    return new Promise((done) => {
      server
        .get(`/v1/simulate`)
        .send()
        .end((err, response) => {
          expect(err).toBeNull();
          expect(response.statusCode).toEqual(OK);
          expect(response.body[0]).toHaveProperty('id');
          expect(response.body[0]).toHaveProperty('birthDate');
          expect(response.body[0]).toHaveProperty('amount');
          expect(response.body[0]).toHaveProperty('paymentTerm');
          expect(response.body[0]).toHaveProperty('amountToBePaid');
          expect(response.body[0]).toHaveProperty('installmentsValue');
          expect(response.body[0]).toHaveProperty('amountPaidInInterest');
          expect(response.body[0]).toHaveProperty('interestRate');
          expect(creditRepositoryMock.listCredits).toHaveBeenCalled();
          done(undefined);
        });
    });
  });

  it('should return 200 when list credit simulations with filters #integration', async () => {
    creditRepositoryMock.listCredits = jest.fn().mockResolvedValueOnce([CreditSimulationMock]);

    return new Promise((done) => {
      server
        .get(`/v1/simulate`)
        .query({
          minAmount: 3000,
          page: 1,
          pageSize: 15,
        })
        .end((err, response) => {
          expect(err).toBeNull();
          expect(response.statusCode).toEqual(OK);
          expect(response.body[0]).toHaveProperty('id');
          expect(response.body[0]).toHaveProperty('birthDate');
          expect(response.body[0]).toHaveProperty('amount');
          expect(response.body[0]).toHaveProperty('paymentTerm');
          expect(response.body[0]).toHaveProperty('amountToBePaid');
          expect(response.body[0]).toHaveProperty('installmentsValue');
          expect(response.body[0]).toHaveProperty('amountPaidInInterest');
          expect(response.body[0]).toHaveProperty('interestRate');
          expect(creditRepositoryMock.listCredits).toHaveBeenCalledWith(
            expect.objectContaining({ minAmount: '3000' }),
            1,
            15,
          );
          done(undefined);
        });
    });
  });
});
