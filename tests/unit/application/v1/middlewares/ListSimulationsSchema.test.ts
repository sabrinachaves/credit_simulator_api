import { Request } from 'express';
import { BAD_REQUEST } from 'http-status';
import { validateSchema } from '../../../../../src/application/v1/middlewares/ValidateSchema';

describe('listSimulationSchema', () => {
  it('should throw error when minAmount is in the wrong type', () => {
    const req = {
      params: {},
      query: {
        minAmount: 'teste',
        maxAmount: 1000,
      },
    } as unknown as Request;

    const res: any = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn(),
    };

    validateSchema('listSimulationsSchema', 'query')(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ error: '"minAmount" must be a number' });
  });

  it('should throw error when maxAmount is in the wrong type', () => {
    const req = {
      params: {},
      query: {
        minAmount: 1,
        maxAmount: 'teste',
      },
    } as unknown as Request;

    const res: any = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn(),
    };

    validateSchema('listSimulationsSchema', 'query')(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ error: '"maxAmount" must be a number' });
  });

  it('should throw error when createdAfter is in the wrong type', () => {
    const req = {
      params: {},
      query: {
        createdAfter: 'teste',
      },
    } as unknown as Request;

    const res: any = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn(),
    };

    validateSchema('listSimulationsSchema', 'query')(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ error: '"createdAfter" must be a valid date' });
  });

  it('should throw error when createdBefore is in the wrong type', () => {
    const req = {
      params: {},
      query: {
        createdBefore: 'teste',
      },
    } as unknown as Request;

    const res: any = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn(),
    };

    validateSchema('listSimulationsSchema', 'query')(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ error: '"createdBefore" must be a valid date' });
  });

  it('should throw error when page is in the wrong type', () => {
    const req = {
      params: {},
      query: {
        page: 'teste',
      },
    } as unknown as Request;

    const res: any = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn(),
    };

    validateSchema('listSimulationsSchema', 'query')(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ error: '"page" must be a number' });
  });

  it('should throw error when pageSize is in the wrong type', () => {
    const req = {
      params: {},
      query: {
        pageSize: 'teste',
      },
    } as unknown as Request;

    const res: any = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn(),
    };

    validateSchema('listSimulationsSchema', 'query')(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ error: '"pageSize" must be a number' });
  });

  it('should now allow unknown fields', () => {
    const req = {
      params: {},
      query: {
        interestRate: 2,
      },
    } as unknown as Request;

    const res: any = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn(),
    };

    validateSchema('listSimulationsSchema', 'query')(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ error: '"interestRate" is not allowed' });
  });
});
