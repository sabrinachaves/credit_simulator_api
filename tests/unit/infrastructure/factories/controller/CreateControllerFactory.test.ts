import CreateControllerFactory from '../../../../../src/infrastructure/factories/controller/CreateControllerFactory';
import CreateController from '../../../../../src/application/v1/controller/CreateController';
import CreateUseCaseMock from '../../../../mocks/CreateUseCaseMock';

describe('CreateControllerFactory', () => {
  it('should make the create controller #unit', async () => {
    const controller = await CreateControllerFactory.make(new CreateUseCaseMock());

    expect(controller).toBeInstanceOf(CreateController);
  });
});
