import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCreditSimulations1727696739862 implements MigrationInterface {
  name = 'CreateCreditSimulations1727696739862';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`creditSimulations\` (\`id\` varchar(36) NOT NULL, \`amount\` int NOT NULL, \`paymentTerm\` int NOT NULL, \`birthDate\` datetime NOT NULL, \`amountToBePaid\` int NOT NULL, \`installmentsValue\` int NOT NULL, \`amountPaidInInterest\` int NOT NULL, \`interestRate\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`creditSimulations\``);
  }
}
