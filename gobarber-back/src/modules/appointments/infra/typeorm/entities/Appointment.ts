import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '../../../../users/infra/typeorm/entities/User';

/**
 * Decorator works like a function. It will get the "Entity" function and
 * as a parameter
 * of this function will send the class bellow. A decorator above the
 * class, means that the class bellow will be send as a parameter.
 */
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  // eslint-disable-next-line camelcase
  provider_id: string;

  // Provider of this appointment
  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  // eslint-disable-next-line camelcase
  created_at: Date;

  @UpdateDateColumn()
  // eslint-disable-next-line camelcase
  updated_at: Date;
}

export default Appointment;
