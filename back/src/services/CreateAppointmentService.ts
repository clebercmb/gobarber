// SoC Separation of concerns
// A service always must have only a unique and exclusive functionality
// It must NOT have any other functionality

// This service will be responsible only for the schedule of an appointment
import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

// The  service will always have a unique method inside of it
// It will never have more than one method

interface Request {
  provider: string;
  date: Date;
}

/**
 * SOLID:
 * Dependency Inversion
 * S-Single Responsibility Principle
 * D-Dependency Inversion
 */

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
