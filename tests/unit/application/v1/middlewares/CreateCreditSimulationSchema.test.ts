import { Request } from 'express';
import { BAD_REQUEST } from 'http-status';
import { validateSchema } from '../../../../../src/application/v1/middlewares/ValidateSchema';

describe('createCreditSimulationSchema', () => {
  it('should throw error when amount is missing', () => {
    const req = {
      params: {},
      body: {
        paymentTermInMonths: 10,
        birthDate: '1990-01-01',
      },
    } as unknown as Request;

    const res: any = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn(),
    };

    validateSchema('createCreditSimulationSchema', 'body')(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ error: '"amount" is required' });
  });

  it('should throw error when paymentTermInMonths is missing', () => {
    const req = {
      params: {},
      body: {
        amount: 50000,
        birthDate: '1990-01-01',
      },
    } as unknown as Request;

    const res: any = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn(),
    };

    validateSchema('createCreditSimulationSchema', 'body')(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ error: '"paymentTermInMonths" is required' });
  });

  it('should throw error when birthDate is missing', () => {
    const req = {
      params: {},
      body: {
        amount: 50000,
        paymentTermInMonths: 10,
      },
    } as unknown as Request;

    const res: any = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn(),
    };

    validateSchema('createCreditSimulationSchema', 'body')(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ error: '"birthDate" is required' });
  });

  it('should throw error when amount is in the wrong type', () => {
    const req = {
      params: {},
      body: {
        amount: 'teste',
        paymentTermInMonths: 10,
        birthDate: '1990-01-01',
      },
    } as unknown as Request;

    const res: any = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn(),
    };

    validateSchema('createCreditSimulationSchema', 'body')(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ error: '"amount" must be a number' });
  });

  it('should throw error when paymentTermInMonths is in the wrong type', () => {
    const req = {
      params: {},
      body: {
        amount: 40000,
        paymentTermInMonths: 'teste',
        birthDate: '1990-01-01',
      },
    } as unknown as Request;

    const res: any = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn(),
    };

    validateSchema('createCreditSimulationSchema', 'body')(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ error: '"paymentTermInMonths" must be a number' });
  });

  it('should throw error when paymentTermInMonths is not an integer', () => {
    const req = {
      params: {},
      body: {
        amount: 40000,
        paymentTermInMonths: 4.5,
        birthDate: '1990-01-01',
      },
    } as unknown as Request;

    const res: any = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn(),
    };

    validateSchema('createCreditSimulationSchema', 'body')(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ error: '"paymentTermInMonths" must be an integer' });
  });

  it('should throw error when birthDate is in the wrong type', () => {
    const req = {
      params: {},
      body: {
        amount: 40000,
        paymentTermInMonths: 20,
        birthDate: 'teste',
      },
    } as unknown as Request;

    const res: any = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn(),
    };

    validateSchema('createCreditSimulationSchema', 'body')(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ error: '"birthDate" must be a valid date' });
  });
});
