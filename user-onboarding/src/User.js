import React from "react";

export default function User(props) {
  const { user } = props;

  return <pre>{JSON.stringify(user)}</pre>;
}
