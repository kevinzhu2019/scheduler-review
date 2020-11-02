import React, { useState, useEffect } from "react";

import "components/Application.scss";

import DayList from "components/DayList";

import "components/Appointment";

import Appointment from "components/Appointment";

import axios from "axios";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Rachel Zhu",
      interviewer: {
        id: 2,
        name: "Sylvia Palmer_2",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Austin Wang",
      interviewer: {
        id: 3,
        name: "Sylvia Palmer_3",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  },
  {
    id: 6,
    time: "5pm",
  }
];

export default function Application() {

  const setDay = day => setState(prev => ({...prev, day}));
  const setDays = days => setState(prev => ({...prev, days}));

  const [state, setState] = useState({
    day: "Monday",
    days: []
  });

  /*
  Above 6 lines are replacing the original as below:
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);
  */

  useEffect(() => {
    axios.get("http://localhost:8001/api/days")
    .then((response) => {
      setDays([...response.data]);
    });
  }, [])//empty array to make the side effect to run only once

  const appointmentList = appointments.map((item) => {
    return (
      <Appointment 
        key={item.id}
        id={item.id}
        time={item.time}
        interview={item.interview}
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
