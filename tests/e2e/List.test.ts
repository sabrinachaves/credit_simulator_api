import supertest from 'supertest';
import { CREDIT_SIMULATOR_API_URL_TEST_ENVIRONMENT } from './constants';
import { OK } from 'http-status';
import { CreditSimulationCreatedWithOldDateSeed } from '../../development/seeds/seeds';

describe('GET /v1/simulate/', () => {
  const request = () => supertest(`${CREDIT_SIMULATOR_API_URL_TEST_ENVIRONMENT}/credit-simulation/v1`);

  it('should return 200 when list credit simulations #e2e', async () => {
    const response = await request().get(`/simulate/`).send().expect(OK);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('birthDate');
    expect(response.body[0]).toHaveProperty('amount');
    expect(response.body[0]).toHaveProperty('paymentTerm');
    expect(response.body[0]).toHaveProperty('amountToBePaid');
    expect(response.body[0]).toHaveProperty('installmentsValue');
    expect(response.body[0]).toHaveProperty('amountPaidInInterest');
    expect(response.body[0]).toHaveProperty('interestRate');
  });

  it('should return 200 when list credit simulations with filters #e2e', async () => {
    const response = await request()
      .get(`/simulate/`)
      .query({
        minAmount: 4000,
      })
      .expect(OK);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].amount).toBeGreaterThanOrEqual(4000);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('birthDate');
    expect(response.body[0]).toHaveProperty('amount');
    expect(response.body[0]).toHaveProperty('paymentTerm');
    expect(response.body[0]).toHaveProperty('amountToBePaid');
    expect(response.body[0]).toHaveProperty('installmentsValue');
    expect(response.body[0]).toHaveProperty('amountPaidInInterest');
    expect(response.body[0]).toHaveProperty('interestRate');
  });

  it('should return 200 when list credit simulations with createdBefore filter #e2e', async () => {
    const response = await request()
      .get(`/simulate/`)
      .query({
        createdBefore: '2024-03-02',
      })
      .expect(OK);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].amount).toBeGreaterThanOrEqual(4000);
    expect(response.body[0].id).toEqual(CreditSimulationCreatedWithOldDateSeed.id);
    expect(response.body[0]).toHaveProperty('birthDate');
    expect(response.body[0]).toHaveProperty('amount');
    expect(response.body[0]).toHaveProperty('paymentTerm');
    expect(response.body[0]).toHaveProperty('amountToBePaid');
    expect(response.body[0]).toHaveProperty('installmentsValue');
    expect(response.body[0]).toHaveProperty('amountPaidInInterest');
    expect(response.body[0]).toHaveProperty('interestRate');
  });

  it('should return 200 when no simulation is found #e2e', async () => {
    const response = await request()
      .get(`/simulate/`)
      .query({
        minAmount: 10,
        maxAmount: 15,
      })
      .expect(OK);
    expect(response.body).toEqual([]);
  });
});
