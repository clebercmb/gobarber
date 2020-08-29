import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appointement {
  id: string;
  provider: string;
  date: Date;
}

const appointments: Appointement[] = [];

// POST http://localhost:3333/appointments
appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));
  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(appointment.date, parsedDate),
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appoitment = {
    id: uuid(),
    provider,
    date: parsedDate,
  };

  appointments.push(appoitment);

  return response.json(appoitment);
});

export default appointmentsRouter;
