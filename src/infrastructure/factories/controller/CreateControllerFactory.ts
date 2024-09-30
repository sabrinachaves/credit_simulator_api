import CreateController from '@application/v1/controller/CreateController';
import ICreateUseCase from '@useCases/create/ICreateUseCase';
import CreateUseCaseFactory from '@infrastructure/factories/useCases/CreateUseCaseFactory';

export default class CreateControllerFactory {
  private static controller: CreateController;

  static async make(createUseCase?: ICreateUseCase): Promise<CreateController> {
    if (this.controller) {
      return this.controller;
    }

    const createUseCaseInstance = createUseCase ?? (await CreateUseCaseFactory.make());

    this.controller = new CreateController(createUseCaseInstance);
    return this.controller;
  }
}
