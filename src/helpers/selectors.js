export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredDay = state.days.filter(eachDay => eachDay.name === day); //filteredDay is an single object in a array
  if (filteredDay.length === 0) {
    return [];
  }
  let filteredAppointments = [];
  for(const appointmentId of filteredDay[0].appointments) {
    filteredAppointments.push(state.appointments[appointmentId.toString()])
  }
  return filteredAppointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  let interviewer = state.interviewers[interview.interviewer.toString()];
  return {...interview, interviewer};
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(eachDay => eachDay.name === day);
  if (filteredDay.length === 0) {
    return [];
  }
  let filteredInterviewers = [];
  for(const interviewerId of filteredDay[0].interviewers) {
    filteredInterviewers.push(state.interviewers[interviewerId.toString()])
  }
  return filteredInterviewers;
}