import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { FiClock, FiPower } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  NextAppointment,
  Section,
  Appointment,
  Schedule,
  Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  const disableDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        return new Date(year, month, monthDay.day);
      });
    return dates;
  }, [currentMonth, monthAvailability]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Welcome,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Appointments hours</h1>
          <p>
            <span>Today</span>
            <span>Day 06</span>
            <span>Monday</span>
          </p>

          <NextAppointment>
            <strong>Next appointment</strong>
            <div>
              <img
                src="https://avatars1.githubusercontent.com/u/18425787?s=460&u=692e0e711e5fe60188a1518cc9a2f7bae3bd6624&v=4"
                alt="Cleber Miranda"
              />
              <strong>Cleber Miranda</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Morning</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/18425787?s=460&u=692e0e711e5fe60188a1518cc9a2f7bae3bd6624&v=4"
                  alt="Cleber Miranda"
                />
                <strong>Cleber Miranda</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/18425787?s=460&u=692e0e711e5fe60188a1518cc9a2f7bae3bd6624&v=4"
                  alt="Cleber Miranda"
                />
                <strong>Cleber Miranda</strong>
              </div>
            </Appointment>

            <Section>
              <strong>Afternoon</strong>
              <Appointment>
                <span>
                  <FiClock />
                  08:00
                </span>

                <div>
                  <img
                    src="https://avatars1.githubusercontent.com/u/18425787?s=460&u=692e0e711e5fe60188a1518cc9a2f7bae3bd6624&v=4"
                    alt="Cleber Miranda"
                  />
                  <strong>Cleber Miranda</strong>
                </div>
              </Appointment>
            </Section>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disableDays]}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
