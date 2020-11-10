import React from "react";

import "components/Button.scss";

import classnames from "classnames";

export default function Button(props) {
   
   const buttonClass = classnames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });
   /*output would be "button button--confirm" or "button button--danger", it is equal to classnames("button", {"button--confirm": true, "button--danger": false}) or classnames("button", {"button--confirm": false, "button--danger": true})*/

   return <button 
            className={buttonClass}
            onClick={props.buttonClicked}
            disabled={props.disabled}
          >
            {props.children}
          </button>;
}
