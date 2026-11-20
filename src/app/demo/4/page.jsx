"use client";

import { useReducer } from "react";

const initialFormState = {
  fields: {
    name: "",
    email: "",
    cgu: false,
  },
  submitting: false,
  error: null,
  success: null,
};

const reducer = (state, { action, key, value }) => {
  switch (action) {
    case "update_field":
      return { ...state, fields: { ...state.fields, [key]: value } };
    case "toggle_submit":
      return { ...state, submitting: !state.submitting };
    case "set_error":
      return { ...state, error: value };
    case "set_succes":
      return { ...state, success: value };
  }
};

export default function App() {
  const [form, dispatch] = useReducer(reducer, initialFormState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch("toggle_submit");

    window.setTimeout(() => console.log("api response"));

    dispatch("toggle_submit");

    if ("cas error") {
      dispatch("set_error", { value: "mon erreur" });
      dispatch("set_success", { value: false });
    }

    dispatch("set_success", { value: true });
  };

  return (
    <div>
      <h1>Formulaire d'inscription</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={(e) =>
              dispatch({
                action: "update_field",
                key: "name",
                value: e.target.value,
              })
            }
            value={form.fields.name}
            required
            placeholder="Your name"
          />
          <label htmlFor="email-address">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            onChange={(e) =>
              dispatch({
                action: "update_field",
                key: "email",
                value: e.target.value,
              })
            }
            value={form.fields.email}
            autoComplete="email"
            required
            placeholder="Email Address"
          />
          <button type="submit">Submit</button>
        </div>
        <div>
          <label htmlFor="cgu">CGU</label>
          <input
            id="cgu"
            name="cgu"
            type="checkbox"
            onChange={(e) =>
              dispatch({
                action: "update_field",
                key: "cgu",
                value: e.target.checked,
              })
            }
            checked={form.fields.cgu}
          />
          <p>I agree to everything.</p>
        </div>
      </form>
      {form.submitting && <p>Submitting...</p>}
      {form.error && <p>{error}</p>}
      {form.success && <p>Success!</p>}
    </div>
  );
}
