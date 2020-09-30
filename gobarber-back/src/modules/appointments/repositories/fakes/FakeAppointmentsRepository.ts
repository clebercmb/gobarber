import { isEqual } from 'date-fns';
import { v4 } from 'uuid';

import ICreateAppointmentDTO from '../../dtos/ICreateAppointmentDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../IAppointmentsRepository';

// Liskov Substitution Principle
// The service must not know the final format of the structure that persists the data
// The service must not know if the data will be persisted in SQL DataBase, NoSQL, File etc

class AppointmentRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: v4(), date, provider_id });

    this.appointments.push(appointment);
    return appointment;
  }
}

export default AppointmentRepository;
