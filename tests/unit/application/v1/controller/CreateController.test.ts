import { Request } from 'express';
import CreateController from '../../../../../src/application/v1/controller/CreateController';
import CreateUseCaseMock from '../../../../mocks/CreateUseCaseMock';
import { faker } from '@faker-js/faker';
import { INTERNAL_SERVER_ERROR, OK, UNPROCESSABLE_ENTITY } from 'http-status';
import UnprocessableEntityError from '../../../../../src/domain/exceptions/UnprocessableEntityError';
import InternalServerError from '../../../../../src/domain/exceptions/InternalServerError';
import ICreateUseCase from '../../../../../src/useCases/create/ICreateUseCase';

describe('CreateController', () => {
  const createUseCase = new CreateUseCaseMock();

  it('should handle the request #unit', async () => {
    const instance = new CreateController(createUseCase);
    const req = {
      body: {
        birthDate: new Date('2005-05-01'),
        amount: 15000,
        paymentTermInMonths: 15,
      },
    } as Request;
    const res: any = {
      status: jest.fn().mockImplementation(() => ({
        json: jest.fn(),
      })),
    };

    createUseCase.handle = jest.fn().mockResolvedValue({
      id: faker.datatype.uuid(),
      amount: 15000,
      paymentTerm: 15,
      birthDate: new Date('2005-05-01'),
      amountToBePaid: 15504.9,
      installmentsValue: 1033.66,
      amountPaidInInterest: 504.9,
      interestRate: 5,
    });

    await instance.execute(req, res);

    expect(createUseCase.handle).toHaveBeenCalledWith({
      birthDate: new Date('2005-05-01'),
      amount: 15000,
      paymentTermInMonths: 15,
    });
    expect(res.status).toHaveBeenCalledWith(OK);
  });

  it('should throw an error when age is less than 18 #unit', async () => {
    const instance = new CreateController(createUseCase);
    const req = {
      body: {
        birthDate: new Date('2010-05-01'),
        amount: 15000,
        paymentTermInMonths: 15,
      },
    } as Request;
    const res: any = {
      status: jest.fn().mockImplementation(() => ({
        json: jest.fn(),
      })),
    };

    createUseCase.handle = jest
      .fn()
      .mockRejectedValueOnce(new UnprocessableEntityError('Age can not be less than 18 years old'));

    await instance.execute(req, res);

    expect(createUseCase.handle).toHaveBeenCalledWith({
      birthDate: new Date('2010-05-01'),
      amount: 15000,
      paymentTermInMonths: 15,
    });
    expect(res.status).toHaveBeenCalledWith(UNPROCESSABLE_ENTITY);
  });

  it('should throw an error when useCase throws #unit', async () => {
    const instance = new CreateController(createUseCase);
    const req = {
      body: {
        birthDate: new Date('2010-05-01'),
        amount: 15000,
        paymentTermInMonths: 15,
      },
    } as Request;
    const res: any = {
      status: jest.fn().mockImplementation(() => ({
        json: jest.fn(),
      })),
    };

    createUseCase.handle = jest.fn().mockRejectedValueOnce(new InternalServerError('Internal Server Error'));

    await instance.execute(req, res);

    expect(createUseCase.handle).toHaveBeenCalledWith({
      birthDate: new Date('2010-05-01'),
      amount: 15000,
      paymentTermInMonths: 15,
    });
    expect(res.status).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
  });

  it('should match the snapshot #unit', () => {
    const instance = new CreateController({} as ICreateUseCase);
    expect(instance).toMatchSnapshot();
  });
});
