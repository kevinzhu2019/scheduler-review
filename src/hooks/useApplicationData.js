import { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const SPOT_CALC = "SPOT_CALC";

function reducer(state, action) {
  switch(action.type) {
    case SET_DAY:
      return {...state, day: action.day}
    case SET_APPLICATION_DATA:
      return {
        ...state, 
        days: action.daysFromDB, 
        appointments: action.appointmentsFromDB, 
        interviewers: action.interviewersFromDB
      }
    case SET_INTERVIEW:
      return {...state, appointments: action.appointments}
    case SPOT_CALC:
      return {...state, days: action.updatedDays}
    default:
      throw new Error(
        `Tried to reduce unsupported action type: ${action.type}`
      );
  }
}

export default function useApplicationData() {

  const setDay = day => dispatch({type: SET_DAY, day});

  const [state, dispatch] = useReducer(reducer, {
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
      dispatch({type: SET_APPLICATION_DATA, daysFromDB: all[0].data, appointmentsFromDB: all[1].data, interviewersFromDB: all[2].data});
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
    dispatch({type: SET_INTERVIEW, appointments});
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
      dispatch({type: SPOT_CALC, updatedDays});
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}