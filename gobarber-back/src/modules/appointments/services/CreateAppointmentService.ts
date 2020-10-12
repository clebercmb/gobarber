/* eslint-disable camelcase */
// SoC Separation of concerns
// A service always must have only a unique and exclusive functionality
// It must NOT have any other functionality

// This service will be responsible only for the schedule of an appointment
import { startOfHour, isBefore, getHours } from 'date-fns';
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
  user_id: string;
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

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (this.checkIfAppointmentHourIsBeforeCurrentHour(appointmentDate)) {
      throw new AppError('You cannot create an appointment on a pst date');
    }

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    if (user_id === provider_id) {
      throw new AppError('You cannot create an appointment for yourself');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You can only make appointments between 08am and 05pm',
      );
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }

  private checkIfAppointmentHourIsBeforeCurrentHour(
    appointmentDate: Date,
  ): boolean {
    return isBefore(appointmentDate, Date.now());
  }
}

export default CreateAppointmentService;
