import { ICreditSimulation } from '@domain/entities/CreditSimulation';
import ICreateUseCase, { ICreateCreditInput } from './ICreateUseCase';
import { v4 as uuidv4 } from 'uuid';
import ICreditRepository from '@domain/repositories/credit/ICreditRepository';
import UnprocessableEntityError from '@domain/exceptions/UnprocessableEntityError';

export default class CreateUseCase implements ICreateUseCase {
  constructor(private creditRepository: ICreditRepository) {}

  public async handle(data: ICreateCreditInput): Promise<ICreditSimulation> {
    const age = this.calculateAge(new Date(data.birthDate));
    const interestRate = this.calculateRate(age);
    const installmentsValue = this.calculateInstallmentValue(data.amount, interestRate, data.paymentTermInMonths);

    const amountToBePaid = Number((installmentsValue * data.paymentTermInMonths).toFixed(2));

    const amountPaidInInterest = Number((amountToBePaid - data.amount).toFixed(2));

    const credit = await this.creditRepository.create({
      id: uuidv4(),
      amount: data.amount,
      paymentTermInMonths: data.paymentTermInMonths,
      birthDate: data.birthDate,
      amountToBePaid: amountToBePaid,
      installmentsValue,
      amountPaidInInterest,
      interestRate,
    });

    return credit;
  }

  private calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    if (
      currentMonth < birthDate.getMonth() ||
      (currentMonth === birthDate.getMonth() && currentDay < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  private calculateRate(age: number): number {
    let rate: number;
    if (age < 18) {
      throw new UnprocessableEntityError('Age cannot be less than 18');
    } else if (age > 95) {
      throw new UnprocessableEntityError('Age cannot be greater than 95');
    } else if (age <= 25) {
      rate = 5;
    } else if (age <= 40) {
      rate = 3;
    } else if (age <= 60) {
      rate = 2;
    } else {
      rate = 4;
    }

    return rate;
  }

  private calculateInstallmentValue(presentValue: number, rate: number, numberOfInstallments: number): number {
    const monthlyInterestRate = rate / 100 / 12;

    const installmentValue =
      (presentValue * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfInstallments));

    return Number(installmentValue.toFixed(2));
  }
}
