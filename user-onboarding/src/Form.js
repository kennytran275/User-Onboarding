import React from "react";

export default function UserForm(props) {
  const { values, submit, change, errors, disabled } = props;

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };

  const onChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === "checkbox" ? checked : value;
    change(name, valueToUse);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <h2>Add a User</h2>

        <div>
          <div>{errors.name}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
        </div>
      </div>

      <div>
        <h4>General information</h4>

        <label>
          Name&nbsp;
          <input
            value={values.name}
            onChange={onChange}
            name="name"
            type="text"
          />
        </label>

        <label>
          Email&nbsp;
          <input
            value={values.email}
            onChange={onChange}
            name="email"
            type="text"
          />
        </label>

        <label>
          Password&nbsp;
          <input
            value={values.password}
            onChange={onChange}
            name="password"
            type="text"
          />
        </label>
      </div>

      <div>
        <h4>Terms of Service</h4>
        <label>
          Check this box if you agreed to the terms of service.
          <input
            type="checkbox"
            name="termsOfService"
            checked={values.termsOfService}
            onChange={onChange}
          />
        </label>
      </div>

      <button id="submitBtn" disabled={disabled}>
        Submit
      </button>
    </form>
  );
}
