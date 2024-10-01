import ListUseCaseFactory from '../../../../../src/infrastructure/factories/useCases/ListUseCaseFactory';
import ListUseCase from '../../../../../src/useCases/list/ListUseCase';
import CreditRepositoryMock from '../../../../mocks/CreditRepositoryMock';

describe('ListUseCaseFactory', () => {
  it('should make the list useCase #unit', async () => {
    const useCase = await ListUseCaseFactory.make(new CreditRepositoryMock());

    expect(useCase).toBeInstanceOf(ListUseCase);
  });
});
