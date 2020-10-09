import React from "react";

import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = "day-list__item" + (
    props.selected ? "--selected" : 
    (props.spots === 0 ? "--full" : "")
  );

  const formatSpots = () => {//massage the data from props.spots
    if(props.spots === 1) {
      return `1 spot remaining`;
    } else if (props.spots > 1) {
      return `${props.spots} spots remaining`;
    } else {
      return `no spots remaining`;
    }
  }

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}