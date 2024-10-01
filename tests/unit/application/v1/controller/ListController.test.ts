import { Request } from 'express';
import ListController from '../../../../../src/application/v1/controller/ListController';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import InternalServerError from '../../../../../src/domain/exceptions/InternalServerError';
import ListUseCaseMock from '../../../../mocks/ListUseCaseMock';
import { CreditSimulationMock } from '../../../../mocks/CreditMock';
import IListUseCase from '../../../../../src/useCases/list/IListUseCase';

describe('ListController', () => {
  const listUseCase = new ListUseCaseMock();

  it('should handle the request #unit', async () => {
    const instance = new ListController(listUseCase);
    const req = { query: {} } as Request;
    const res: any = {
      status: jest.fn().mockImplementation(() => ({
        json: jest.fn(),
      })),
    };

    listUseCase.handle = jest.fn().mockResolvedValue([{ ...CreditSimulationMock }]);

    await instance.execute(req, res);

    expect(listUseCase.handle).toHaveBeenCalledWith({}, undefined, undefined);
    expect(res.status).toHaveBeenCalledWith(OK);
  });

  it('should handle the request with query params #unit', async () => {
    const instance = new ListController(listUseCase);
    const req = {
      query: {
        minAmount: 5000,
        page: 2,
        pageSize: 15,
      },
    } as unknown as Request;
    const res: any = {
      status: jest.fn().mockImplementation(() => ({
        json: jest.fn(),
      })),
    };

    listUseCase.handle = jest.fn().mockResolvedValue([{ ...CreditSimulationMock }]);

    await instance.execute(req, res);

    expect(listUseCase.handle).toHaveBeenCalledWith(expect.objectContaining({ minAmount: 5000 }), 2, 15);
    expect(res.status).toHaveBeenCalledWith(OK);
  });

  it('should throw an error when useCase throws #unit', async () => {
    const instance = new ListController(listUseCase);
    const req = { query: {} } as Request;
    const res: any = {
      status: jest.fn().mockImplementation(() => ({
        json: jest.fn(),
      })),
    };

    listUseCase.handle = jest.fn().mockRejectedValueOnce(new InternalServerError('Internal Server Error'));

    await instance.execute(req, res);

    expect(listUseCase.handle).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
  });

  it('should match the snapshot #unit', () => {
    const instance = new ListController({} as IListUseCase);
    expect(instance).toMatchSnapshot();
  });
});
