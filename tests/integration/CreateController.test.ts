import supertest from 'supertest';
import { OK, UNPROCESSABLE_ENTITY } from 'http-status';
import { mockServer } from '../helpers';
import CreditRepositoryMock from '../mocks/CreditRepositoryMock';
import CreateUseCaseFactory from '../../src/infrastructure/factories/useCases/CreateUseCaseFactory';
import { CreditSimulationMock } from '../mocks/CreditMock';

describe('CreateController', () => {
  let server: supertest.SuperTest<supertest.Test>;
  const creditRepositoryMock = new CreditRepositoryMock();

  beforeAll(async () => {
    const createUseCase = await CreateUseCaseFactory.make(creditRepositoryMock);
    server = await mockServer({ createUseCase });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 when create a credit simulation #integration', async () => {
    const simulationRequest = {
      amount: 10000,
      paymentTermInMonths: 36,
      birthDate: '1990-12-05',
    };
    creditRepositoryMock.create = jest.fn().mockResolvedValueOnce({ ...CreditSimulationMock, ...simulationRequest });

    return new Promise((done) => {
      server
        .post(`/v1/simulate`)
        .send(simulationRequest)
        .end((err, response) => {
          expect(err).toBeNull();
          expect(response.statusCode).toEqual(OK);
          expect(response.body.amount).toBe(10000),
            expect(response.body.paymentTermInMonths).toBe(36),
            expect(response.body.amountToBePaid).toBe(20183.8),
            expect(response.body.installmentsValue).toBe(2018.38),
            expect(response.body.amountPaidInInterest).toBe(183.8),
            expect(response.body.interestRate).toBe(2),
            expect(response.body).toHaveProperty('id'),
            expect(response.body).toHaveProperty('birthDate'),
            expect(creditRepositoryMock.create).toHaveBeenCalled();
          done(undefined);
        });
    });
  });

  it('should return 422 when age is under 18 #integration', async () => {
    creditRepositoryMock.create = jest.fn().mockResolvedValueOnce({ ...CreditSimulationMock });

    return new Promise((done) => {
      server
        .post(`/v1/simulate`)
        .send({
          amount: 10000,
          paymentTermInMonths: 36,
          birthDate: '2010-12-05',
        })
        .end((_err, response) => {
          expect(response.statusCode).toEqual(UNPROCESSABLE_ENTITY);
          expect(response.body.error).toBe('Age cannot be less than 18');
          expect(creditRepositoryMock.create).not.toHaveBeenCalled();
          done(undefined);
        });
    });
  });

  it('should return 422 when age is greater than 95 #integration', async () => {
    creditRepositoryMock.create = jest.fn().mockResolvedValueOnce({ ...CreditSimulationMock });

    return new Promise((done) => {
      server
        .post(`/v1/simulate`)
        .send({
          amount: 10000,
          paymentTermInMonths: 36,
          birthDate: '1924-12-05',
        })
        .end((_err, response) => {
          expect(response.statusCode).toEqual(UNPROCESSABLE_ENTITY);
          expect(response.body.error).toBe('Age cannot be greater than 95');
          expect(creditRepositoryMock.create).not.toHaveBeenCalled();
          done(undefined);
        });
    });
  });
});
