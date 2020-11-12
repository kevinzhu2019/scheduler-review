import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const setDay = day => setState(prev => ({...prev, day}));

  const [state, setState] = useState({//state is an object
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])//empty array to make the side effect to run only once

  const bookInterview = async(id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log("this is days: ", state.days);
    setState(prev => ({...prev, appointments: appointments}));
    await axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    spotCalc();
  }

  const cancelInterview = async(id) => {
    const deletedAppointment = {
      ...state.appointments[id],
      interview: null
    };
    // const appointments = {
    //   ...state.appointments,
    //   [id]: deletedAppointment
    // }
    // setState(prev => ({...prev, appointments})); 
    //No need to setState when deleting appointment, otherwise will cause error handling failed since when go back to (SHOW) mode, the appointment is already removed from props so that app crashes. (SHOW mode depends on state)
    await axios.delete(`http://localhost:8001/api/appointments/${id}`, deletedAppointment)
    spotCalc();
  }

  const spotCalc = () => {
    axios.get("http://localhost:8001/api/days")
    .then((res) => {
      let updatedDays = res.data;
      setState(prev => ({...prev, days: updatedDays}));
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}