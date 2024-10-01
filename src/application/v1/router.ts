import { Router } from 'express';
import { validateSchema } from './middlewares/ValidateSchema';
import CreateControllerFactory from '@infrastructure/factories/controller/CreateControllerFactory';
import ListControllerFactory from '@infrastructure/factories/controller/ListControllerFactory';

const router = Router();

(async () => {
  router.post(
    '/simulate',
    validateSchema('createSimulationSchema', 'body'),
    (await CreateControllerFactory.make()).execute,
  );
  router.get(
    '/simulate',
    validateSchema('listSimulationsSchema', 'query'),
    (await ListControllerFactory.make()).execute,
  );
})();

export default router;
