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