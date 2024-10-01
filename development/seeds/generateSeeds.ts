import { CreditSimulation } from '../../src/domain/entities/CreditSimulation';
import { AppDataSource } from '../../src/infrastructure/database/dataSource';
import { creditSimulationsSeeds } from './seeds';

(async () => {
  await AppDataSource.initialize();
  const creditRespository = AppDataSource.getRepository(CreditSimulation);

  if ((await creditRespository.find()).length === 0) await creditRespository.insert(creditSimulationsSeeds);
})()
  .then(async () => {
    await AppDataSource.destroy();
    process.exit();
  })
  .catch((err) => console.log(err));
