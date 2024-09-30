import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export interface ICreditSimulation {
  id: string;
  amount: number;
  paymentTerm: number;
  birthDate: Date;
  amountToBePaid: number;
  installmentsValue: number;
  amountPaidInInterest: number;
  interestRate: number;
  createdAt?: Date;
}

@Entity('creditSimulations')
export class CreditSimulation implements ICreditSimulation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  paymentTerm: number;

  @Column()
  birthDate: Date;

  @Column()
  amountToBePaid: number;

  @Column()
  installmentsValue: number;

  @Column()
  amountPaidInInterest: number;

  @Column()
  interestRate: number;

  @CreateDateColumn()
  createdAt: Date;
}
