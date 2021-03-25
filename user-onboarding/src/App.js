import "./App.css";
import UserForm from "./Form";
import User from "./User";
import React, { useState } from "react";
import axios from "axios";
import * as yup from "yup";
import schema from "./formSchema";

const initialFormValues = {
  name: "",
  email: "",
  password: "",
  termsOfService: false,
};

const initialFormErrors = {
  name: "",
  email: "",
  password: "",
};

const initialUsers = [];

function App() {
  const [users, setUsers] = useState(initialUsers); // array
  const [formValues, setFormValues] = useState(initialFormValues); // object
  const [formErrors, setFormErrors] = useState(initialFormErrors); // object

  const postNewUser = (newUser) => {
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((res) => {
        setUsers([res.data, ...users]);
        setFormValues(initialFormValues);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const inputChange = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      termsOfService: formValues.termsOfService,
    };

    postNewUser(newUser);
  };

  return (
    <div className="container">
      <header>
        <h1>Form App</h1>
      </header>

      <UserForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        errors={formErrors}
      />

      {users.map((user) => {
        return <User key={user.name} user={user} />;
      })}
    </div>
  );
}

export default App;
