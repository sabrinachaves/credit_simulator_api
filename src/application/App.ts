import * as http from 'http';
import express, { RequestHandler } from 'express';
import 'reflect-metadata';
import * as swaggerUI from 'swagger-ui-express';
import * as swaggerDocument from '../../swagger-doc.json';

interface AppOptions {
  port: number;
  routes: express.Router;
  middlewares?: RequestHandler[];
  environment: string;
}

export default class App {
  app: express.Express;
  port: number;
  routes: express.Router;
  middlewares: RequestHandler[];
  environment: string;

  constructor(options: AppOptions) {
    this.app = express();
    this.port = options.port;
    this.routes = options.routes;
    this.middlewares = options.middlewares || [];
    this.environment = options.environment || '';

    this.handlerMiddlewares();
    this.handlerRoutes();
  }

  private handlerRoutes(): void {
    this.app.use(this.routes);
    this.app.use('/credit-simulation/v1/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  }

  private handlerMiddlewares(): void {
    this.middlewares.forEach((value) => this.app.use(value));
  }

  async listen(): Promise<http.Server> {
    return this.app.listen(this.port, () => {
      console.log(`Application "credit_simulator_api" is running. Listening on http://localhost:${this.port}`);
      console.log('Press CTRL+C to exit');
    });
  }
}
