import React from "react";

import "components/Application.scss";

import DayList from "components/DayList";

import "components/Appointment";

import Appointment from "components/Appointment";

import useApplicationData from "hooks/useApplicationData";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application() {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  // const setDay = day => setState(prev => ({...prev, day}));

  // const [state, setState] = useState({//state is an object
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });

  /*
  Above 6 lines are replacing the original as below:
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);
  */

 let dailyAppointments = [];

  // useEffect(() => {
  //   Promise.all([
  //     axios.get("http://localhost:8001/api/days"),
  //     axios.get("http://localhost:8001/api/appointments"),
  //     axios.get("http://localhost:8001/api/interviewers"),
  //   ]).then((all) => {
  //     setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
  //   })
  // }, [])//empty array to make the side effect to run only once

  // async function bookInterview(id, interview) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: {...interview}
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  //   setState(prev => ({...prev, appointments}));
  //   await axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
  // }

  // async function cancelInterview(id) {
  //   const deletedAppointment = {
  //     ...state.appointments[id],
  //     interview: null
  //   };
  //   // const appointments = {
  //   //   ...state.appointments,
  //   //   [id]: deletedAppointment
  //   // }
  //   // setState(prev => ({...prev, appointments})); 
  //   //No need to setState when deleting appointment, otherwise will cause error handling failed since when go back to (SHOW) mode, the appointment is already removed from props so that app crashes. (SHOW mode depends on state)
  //   await axios.delete(`http://localhost:8001/api/appointments/${id}`, deletedAppointment)
  // }

  dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentList = dailyAppointments.map((item) => {
    const massagedInterview = getInterview(state, item.interview);
    return (
      <Appointment
        key={item.id}
        id={item.id}
        time={item.time}
        interview={massagedInterview}
        interviewers={getInterviewersForDay(state, state.day)}
        bookInterviewFromApplication={bookInterview}
        deleteInterviewFromApplication={() => cancelInterview(item.id)}
      />
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList 
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <section className="schedule">
          {appointmentList}
          <Appointment
            key="last" 
            time="5pm"
          />
        </section>
      </section>
    </main>
  );
}
