import { Router } from 'express';
import { validateSchema } from './middlewares/ValidateSchema';
import CreateControllerFactory from '@infrastructure/factories/controller/CreateControllerFactory';

const router = Router();

(async () => {
  router.post(
    '/simulate',
    validateSchema('createCreditSimulationSchema', 'body'),
    (await CreateControllerFactory.make()).execute,
  );
})();

export default router;
