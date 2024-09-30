import { CreditSimulation } from '../../../../src/domain/entities/CreditSimulation';
import CreditRepository from '../../../../src/domain/repositories/credit/CreditRepository';
import { Repository } from 'typeorm';
import { CreditSimulationMock } from '../../../mocks/CreditMock';

describe('CreditRepository', () => {
  let typeormMock = {} as Repository<CreditSimulation>;
  beforeEach(() => {
    typeormMock = {
      create: jest.fn(),
      save: jest.fn(),
      findOneAndUpdate: jest.fn(),
      startSession: jest.fn(),
    } as unknown as Repository<CreditSimulation>;
  });

  describe('Smoke tests', () => {
    it('should exist #sanity', () => {
      expect(CreditRepository).toBeDefined();
    });

    const functionsName = ['create', 'listCredits'];
    it.each(functionsName)('should have %s function #sanity', (functionName) => {
      const instance = new CreditRepository(typeormMock);
      expect(instance).toHaveProperty(functionName);
    });
  });

  describe('create #unit', () => {
    it('should create creditSimulation from database', async () => {
      const creditToBeMocked = CreditSimulationMock;

      typeormMock.save = jest.fn().mockResolvedValueOnce({ ...creditToBeMocked });
      typeormMock.create = jest.fn().mockResolvedValueOnce({ ...creditToBeMocked });

      const repository = new CreditRepository(typeormMock);
      const data = await repository.create(creditToBeMocked);

      expect(data).toEqual({ ...creditToBeMocked });
      expect(typeormMock.create).toHaveBeenCalled();
    });

    it('should return an error when trying to create a credit simulation', async () => {
      typeormMock.save = jest.fn().mockRejectedValueOnce(new Error('invalid credit simulation'));

      const repository = new CreditRepository(typeormMock);
      await expect(repository.create(CreditSimulationMock)).rejects.toThrow(new Error('invalid credit simulation'));

      expect(typeormMock.create).toHaveBeenCalled();
    });
  });
});
