import { RequestHandler, Router, json } from 'express';
import CreateControllerFactory from '../src/infrastructure/factories/controller/CreateControllerFactory';
import ListControllerFactory from '../src/infrastructure/factories/controller/ListControllerFactory';
import { AppConfig } from '../src/config/AppConfig';
import App from '../src/application/App';
import supertest from 'supertest';
import ICreateUseCase from '../src/useCases/create/ICreateUseCase';
import { validateSchema } from '../src/application/v1/middlewares/ValidateSchema';
import IListUseCase from '../src/useCases/list/IListUseCase';

interface MockServerOptions {
  createUseCase?: ICreateUseCase;
  listUseCase?: IListUseCase;
}

const routes = async (options: MockServerOptions): Promise<Router> => {
  const router = Router();

  router.post(
    '/v1/simulate',
    validateSchema('createSimulationSchema', 'body'),
    (await CreateControllerFactory.make(options.createUseCase)).execute,
  );

  router.get(
    '/v1/simulate',
    validateSchema('listSimulationsSchema', 'query'),
    (await ListControllerFactory.make(options.listUseCase)).execute,
  );

  return router;
};

export const mockApp = async (options: MockServerOptions): Promise<App> => {
  const middlewares: RequestHandler[] = [];

  middlewares.push(json());

  const app = new App({
    port: AppConfig.PORT,
    routes: await routes(options),
    middlewares,
    environment: AppConfig.APP_ENVIRONMENT,
  });

  return app;
};

export const mockServer = async (options: MockServerOptions): Promise<supertest.SuperTest<supertest.Test>> => {
  const app = await mockApp(options);
  return supertest(app.app);
};
