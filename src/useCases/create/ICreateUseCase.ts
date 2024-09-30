import { ICreditSimulation } from '@domain/entities/CreditSimulation';

export interface ICreateCreditInput {
  id?: string;
  amount: number;
  paymentTerm: number;
  birthDate: Date;
}

export default interface ICreateUseCase {
  handle(data: ICreateCreditInput): Promise<ICreditSimulation>;
}
