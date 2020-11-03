import React, { useState, useEffect } from "react";

import "components/Application.scss";

import DayList from "components/DayList";

import "components/Appointment";

import Appointment from "components/Appointment";

import axios from "axios";

import { getAppointmentsForDay, getInterview } from "helpers/selectors";

export default function Application() {

  const setDay = day => setState(prev => ({...prev, day}));

  const [state, setState] = useState({//state is an object
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  let dailyAppointments = [];

  /*
  Above 6 lines are replacing the original as below:
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);
  */

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])//empty array to make the side effect to run only once

  dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentList = dailyAppointments.map((item) => {

    const massagedInterview = getInterview(state, item.interview);

    return (
      <Appointment 
        key={item.id}
        id={item.id}
        time={item.time}
        interview={massagedInterview}
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
        {appointmentList}
      </section>
    </main>
  );
}
