import { buildErrorInfo } from '@infrastructure/parser/ErrorInfo';
import ICreateUseCase, { ICreateCreditInput } from '@useCases/create/ICreateUseCase';
import { OK } from 'http-status';
import { Request, Response } from 'express';

export default class CreateController {
  constructor(private createUseCase: ICreateUseCase) {}

  public execute = async (request: Request, response: Response) => {
    try {
      const { amount, paymentTermInMonths, birthDate }: ICreateCreditInput = request.body;
      const credit = await this.createUseCase.handle({ amount, paymentTermInMonths, birthDate });

      return response.status(OK).json(credit);
    } catch (err: any) {
      const errorInfo = buildErrorInfo(err);

      console.error('failed to create a credit simulation', errorInfo);
      return response.status(errorInfo.code).json({ error: errorInfo.errorMessage });
    }
  };
}
