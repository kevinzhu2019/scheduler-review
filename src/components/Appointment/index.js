import React, { Fragment } from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";

import Show from "components/Appointment/Show";

import Empty from "components/Appointment/Empty";

import Form from "components/Appointment/Form";

import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const interviewers = []; //this is temp-hard-coded and will be removed later

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAddProp={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onSaveProp={() => console.log("save is clicked")}
          onCancelProp={() => back()}
        />)}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEditProp={() => console.log("edit clicked")}
          onDeleteProp={() => console.log("delete clicked")}
        />
      )}
    </article>
  )
}