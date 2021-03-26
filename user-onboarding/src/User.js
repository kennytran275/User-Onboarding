import React from "react";

export default function User(props) {
  const { user } = props;

  return <pre id="userData">{JSON.stringify(user)}</pre>;
}
