import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../entities/Appointment';

// SOLID
// Liskov Substitution Principle
// The service must not know the final format of the structure that persists the data
// The service must not know if the data will be persisted in SQL DataBase, NoSQL, File etc

@EntityRepository(Appointment)
class AppointmentRepository
  extends Repository<Appointment>
  implements IAppointmentsRepository {
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    // const findAppointment = this.appointments.find(appointment =>
    //     isEqual(appointment.date, date),
    // );
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment;
  }
}

export default AppointmentRepository;
