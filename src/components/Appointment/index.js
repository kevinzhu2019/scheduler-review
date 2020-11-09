import React, { Fragment } from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";

import Show from "components/Appointment/Show";

import Empty from "components/Appointment/Empty";

import Form from "components/Appointment/Form";

import Status from "components/Appointment/Status";

import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
    .bookInterviewFromApplication(props.id, interview)
    .then(() => transition(SHOW));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAddProp={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onSaveProp={save}
          onCancelProp={back}
        />)}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEditProp={() => console.log("edit clicked")}
          onDeleteProp={() => console.log("delete clicked")}
        />
      )}
      {mode === SAVING && <Status message="Saving..." />}
    </article>
  )
}