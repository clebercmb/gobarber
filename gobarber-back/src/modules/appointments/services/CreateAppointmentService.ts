/* eslint-disable camelcase */
// SoC Separation of concerns
// A service always must have only a unique and exclusive functionality
// It must NOT have any other functionality

// This service will be responsible only for the schedule of an appointment
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../entities/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../../../shared/errors/AppError';

// The  service will always have a unique method inside of it
// It will never have more than one method

interface Request {
  provider_id: string;
  date: Date;
}

/**
 * SOLID
 *
 * S-Single Responsibility Principle
 * D-Dependency Inversion
 */

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
