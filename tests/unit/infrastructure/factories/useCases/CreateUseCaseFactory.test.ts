import CreateUseCaseFactory from '../../../../../src/infrastructure/factories/useCases/CreateUseCaseFactory';
import CreateUseCase from '../../../../../src/useCases/create/CreateUseCase';
import CreditRepositoryMock from '../../../../mocks/CreditRepositoryMock';

describe('CreateUseCaseFactory', () => {
  it('should make the create useCase #unit', async () => {
    const useCase = await CreateUseCaseFactory.make(new CreditRepositoryMock());

    expect(useCase).toBeInstanceOf(CreateUseCase);
  });
});
