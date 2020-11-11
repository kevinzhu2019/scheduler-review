import React, { Fragment } from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";

import Show from "components/Appointment/Show";

import Empty from "components/Appointment/Empty";

import Form from "components/Appointment/Form";

import Status from "components/Appointment/Status";

import Confirm from "components/Appointment/Confirm";

import Error from "components/Appointment/Error";

import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETE = "DELETE";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    props.bookInterviewFromApplication(props.id, interview)
    .then(() => transition(SHOW))
    .catch((error) => transition(ERROR_SAVE, true));
  }

  const confirmDelete = () => {
    transition(DELETE, true);
    props.deleteInterviewFromApplication()
    .then(() => transition(EMPTY))
    .catch((error) => transition(ERROR_DELETE, true));
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
        {mode === EDIT && (
          <Form
            name={props.interview.student}
            interviewers={props.interviewers}
            interviewer={props.interview.interviewer.id}
            onSaveProp={save}
            onCancelProp={back}
          />
        )}
      {mode === SHOW && (
        <Show
          id={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEditProp={() => transition(EDIT)}
          onDeleteProp={() => transition(CONFIRM)}
        />
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETE && <Status message="Deleting..." />}
      {mode === CONFIRM && (
        <Confirm 
          onConfirmProp={() => confirmDelete()}
          onCancelProp={() => back()}
          message={"Are you sure you want to delete?"}
        />)}
      {mode === ERROR_SAVE && (
        <Error 
          message="Fail to save the appointment." 
          onCloseProp={() => back()}
        />)}
      {mode === ERROR_DELETE && (
        <Error 
          message="Fail to delete the appointment."
          onCloseProp={() => back()}
        />)}
    </article>
  )
}