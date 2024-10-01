import ListController from '@application/v1/controller/ListController';
import IListUseCase from '@useCases/list/IListUseCase';
import ListUseCaseFactory from '../useCases/ListUseCaseFactory';

export default class ListControllerFactory {
  private static controller: ListController;

  static async make(listUseCase?: IListUseCase): Promise<ListController> {
    if (this.controller) {
      return this.controller;
    }

    const listUseCaseInstance = listUseCase ?? (await ListUseCaseFactory.make());

    this.controller = new ListController(listUseCaseInstance);
    return this.controller;
  }
}
