/* eslint-disable camelcase */
// SoC Separation of concerns
// A service always must have only a unique and exclusive functionality
// It must NOT have any other functionality

// This service will be responsible only for the schedule of an appointment
import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

// The  service will always have a unique method inside of it
// It will never have more than one method

// SOLID
// Dependency Inversion
//
interface IRequest {
  provider_id: string;
  date: Date;
}

/**
 * SOLID
 *
 * S-Single Responsibility Principle
 * D-Dependency Inversion
 */
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
