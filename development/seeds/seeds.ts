export const CreditSimulationSeed = {
  id: '5f5d9aae-273b-4540-a68a-59a6cbbadd06',
  amount: 20000,
  paymentTerm: 60,
  birthDate: new Date('1995-12-08'),
  amountToBePaid: 21562.2,
  installmentsValue: 359.37,
  amountPaidInInterest: 1562.2,
  interestRate: 3,
  createdAt: new Date(),
};

export const CreditSimulationCreatedWithOldDateSeed = {
  id: '3e0df7c5-7645-4d5a-8cd9-9aa844c54a02',
  amount: 10000,
  paymentTerm: 45,
  birthDate: new Date('1990-10-01'),
  amountToBePaid: 10585.35,
  installmentsValue: 235.23,
  amountPaidInInterest: 585.35,
  interestRate: 2,
  createdAt: new Date('2024-03-01'),
};

export const creditSimulationsSeeds = [CreditSimulationSeed, CreditSimulationCreatedWithOldDateSeed];
