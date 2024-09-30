import { ICreditSimulation } from '@domain/entities/CreditSimulation';

export interface ICreateCreditInput {
  id?: string;
  amount: number;
  paymentTermInMonths: number;
  birthDate: Date;
}

export default interface ICreateUseCase {
  handle(data: ICreateCreditInput): Promise<ICreditSimulation>;
}
