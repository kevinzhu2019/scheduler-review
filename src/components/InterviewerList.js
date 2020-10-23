import React from "react";

import "components/InterviewerList.scss"

import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  const interviewerList = props.interviewers.map((item) => {
    return <InterviewerListItem
            key={item.id}
            name={item.name}
            avatar={item.avatar}
            name={item.name}
            selected={props.value === item.id}
            setInterviewerProp={() => props.onChange(item.id)}//use value and onChange to monitor the item.id change
           />
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  ) 
} 