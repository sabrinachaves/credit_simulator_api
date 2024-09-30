import { Router } from 'express';
import router from './v1/router';

const routes = Router();

routes.use('/credit-simulation/v1', router);

export default routes;
