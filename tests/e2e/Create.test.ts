import supertest from 'supertest';
import { CREDIT_SIMULATOR_API_URL_TEST_ENVIRONMENT } from './constants';
import { OK, UNPROCESSABLE_ENTITY } from 'http-status';

describe('POST /v1/simulate/', () => {
  const request = () => supertest(`${CREDIT_SIMULATOR_API_URL_TEST_ENVIRONMENT}/credit-simulation/v1`);

  it('should return 200 when create a credit simulation #e2e', async () => {
    const response = await request()
      .post(`/simulate/`)
      .send({
        amount: 10000,
        paymentTerm: 36,
        birthDate: '2000-12-05',
      })
      .expect(OK);
    expect(response.body.paymentTerm).toBe(36);
    expect(response.body.amountToBePaid).toBe(10789.56);
    expect(response.body.installmentsValue).toBe(299.71);
    expect(response.body.amountPaidInInterest).toBe(789.56);
    expect(response.body.interestRate).toBe(5);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('birthDate');
  });

  it('should return 422 when try to create a simulation with age less than 18 #e2e', async () => {
    const response = await request()
      .post(`/simulate/`)
      .send({
        amount: 10000,
        paymentTerm: 36,
        birthDate: '2015-12-05',
      })
      .expect(UNPROCESSABLE_ENTITY);
    expect(response.body).toEqual({ error: 'Age cannot be less than 18' });
  });

  it('should return 422 when try to create a simulation with age greater than 95 #e2e', async () => {
    const response = await request()
      .post(`/simulate/`)
      .send({
        amount: 10000,
        paymentTerm: 36,
        birthDate: '1924-01-01',
      })
      .expect(UNPROCESSABLE_ENTITY);
    expect(response.body).toEqual({ error: 'Age cannot be greater than 95' });
  });
});
