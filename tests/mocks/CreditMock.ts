import { faker } from '@faker-js/faker';

export const CreditSimulationMock = {
  id: faker.datatype.uuid(),
  amount: 20000,
  paymentTermInMonths: 10,
  birthDate: new Date('1980-01-04'),
  amountToBePaid: 20183.8,
  installmentsValue: 2018.38,
  amountPaidInInterest: 183.8,
  interestRate: 2,
  createdAt: new Date(),
};
