import ListControllerFactory from '../../../../../src/infrastructure/factories/controller/ListControllerFactory';
import ListController from '../../../../../src/application/v1/controller/ListController';
import ListUseCaseMock from '../../../../mocks/ListUseCaseMock';

describe('ListControllerFactory', () => {
  it('should make the list controller #unit', async () => {
    const controller = await ListControllerFactory.make(new ListUseCaseMock());

    expect(controller).toBeInstanceOf(ListController);
  });
});
