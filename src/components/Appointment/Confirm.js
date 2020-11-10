import React from "react";

import Button from "components/Button";

export default function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button danger buttonClicked={props.onCancelProp}>Cancel</Button>
        <Button danger buttonClicked={props.onConfirmProp}>Confirm</Button>
      </section>
    </main>
  )
}