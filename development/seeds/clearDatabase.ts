import { CreditSimulation } from '../../src/domain/entities/CreditSimulation';
import { AppDataSource } from '../../src/infrastructure/database/dataSource';

(async () => {
  await AppDataSource.initialize();
  const creditRespository = AppDataSource.getRepository(CreditSimulation);

  await creditRespository.delete({});
})()
  .then(async () => {
    await AppDataSource.destroy();
    process.exit();
  })
  .catch((err) => console.log(err));
