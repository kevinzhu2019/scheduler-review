import React from "react";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interviewer = "interviewers__item" + (
    props.selected ? "--selected" : ""
  )

  return (
    <li 
      className={interviewer}
      onClick={(event) => props.setInterviewerProp()}
      >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}