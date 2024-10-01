import { buildErrorInfo } from '@infrastructure/parser/ErrorInfo';
import IListUseCase, { IListCreditsFilters } from '@useCases/list/IListUseCase';
import { OK } from 'http-status';
import { Request, Response } from 'express';

export default class ListController {
  constructor(private listUseCase: IListUseCase) {}

  public execute = async (request: Request, response: Response) => {
    try {
      const filters: IListCreditsFilters = request.query;
      const page = request.query.page ? Number(request.query.page) : undefined;
      const pageSize = request.query.pageSize ? Number(request.query.pageSize) : undefined;

      const creditSimulations = await this.listUseCase.handle(filters, page, pageSize);

      return response.status(OK).json(creditSimulations);
    } catch (err: any) {
      const errorInfo = buildErrorInfo(err);

      console.error('failed to create a credit simulation', errorInfo);
      return response.status(errorInfo.code).json({ error: errorInfo.errorMessage });
    }
  };
}
