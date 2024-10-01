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
      createQueryBuilder: jest.fn().mockReturnValue({
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getMany: jest.fn(),
      }),
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
      typeormMock.save = jest.fn().mockResolvedValueOnce({ ...CreditSimulationMock });
      typeormMock.create = jest.fn().mockResolvedValueOnce({ ...CreditSimulationMock });

      const repository = new CreditRepository(typeormMock);
      const data = await repository.create({ ...CreditSimulationMock });

      expect(data).toEqual(CreditSimulationMock);
      expect(typeormMock.create).toHaveBeenCalled();
    });

    it('should return an error when trying to create a credit simulation', async () => {
      typeormMock.save = jest.fn().mockRejectedValueOnce(new Error('invalid credit simulation'));

      const repository = new CreditRepository(typeormMock);
      await expect(repository.create(CreditSimulationMock)).rejects.toThrow(new Error('invalid credit simulation'));

      expect(typeormMock.create).toHaveBeenCalled();
    });
  });

  describe('list #unit', () => {
    it('should list credit simulations from database', async () => {
      typeormMock.createQueryBuilder().getMany = jest.fn().mockResolvedValueOnce([{ ...CreditSimulationMock }]);

      const repository = new CreditRepository(typeormMock);
      const data = await repository.listCredits();

      expect(data).toEqual([CreditSimulationMock]);
      expect(typeormMock.createQueryBuilder).toHaveBeenCalled();
      expect(typeormMock.createQueryBuilder().orderBy).toHaveBeenCalled();
      expect(typeormMock.createQueryBuilder().andWhere).not.toHaveBeenCalled();
      expect(typeormMock.createQueryBuilder().skip).toHaveBeenCalled();
      expect(typeormMock.createQueryBuilder().take).toHaveBeenCalled();
    });

    it('should list credit simulations from database with filters', async () => {
      typeormMock.createQueryBuilder().getMany = jest.fn().mockResolvedValueOnce([{ ...CreditSimulationMock }]);

      const repository = new CreditRepository(typeormMock);
      const data = await repository.listCredits({ minAmount: 15000 });

      expect(data).toEqual([CreditSimulationMock]);
      expect(typeormMock.createQueryBuilder).toHaveBeenCalled();
      expect(typeormMock.createQueryBuilder().orderBy).toHaveBeenCalled();
      expect(typeormMock.createQueryBuilder().andWhere).toHaveBeenCalled();
      expect(typeormMock.createQueryBuilder().skip).toHaveBeenCalled();
      expect(typeormMock.createQueryBuilder().take).toHaveBeenCalled();
    });

    it('should return an error when trying to list credit simulations', async () => {
      typeormMock.createQueryBuilder().getMany = jest.fn().mockRejectedValueOnce(new Error('invalid search'));

      const repository = new CreditRepository(typeormMock);
      await expect(repository.listCredits()).rejects.toThrow(new Error('invalid search'));

      expect(typeormMock.createQueryBuilder().getMany).toHaveBeenCalled();
      expect(typeormMock.createQueryBuilder().orderBy).toHaveBeenCalled();
      expect(typeormMock.createQueryBuilder().andWhere).not.toHaveBeenCalled();
      expect(typeormMock.createQueryBuilder().skip).toHaveBeenCalled();
      expect(typeormMock.createQueryBuilder().take).toHaveBeenCalled();
    });
  });
});
