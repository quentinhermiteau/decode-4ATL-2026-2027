"use client";

import { useReducer } from "react";

const initialFormData = {
  fields: {
    name: "",
    email: "",
    address: "",
    city: "",
    zipcode: "",
  },
  currentStep: 1,
};

const reducer = (state, { action, key, value }) => {
  switch (action) {
    case "next_step":
      return { ...state, currentStep: state.currentStep + 1 };
    case "previous_step":
      return { ...state, currentStep: state.currentStep - 1 };
    case "update_field":
      return { ...state, fields: { ...state.fields, [key]: value } };
    case "reset":
      return initialFormData;
  }
};

export default function MultistepFormReducer() {
  const [formData, dispatch] = useReducer(reducer, initialFormData);

  const handleNextStep = () => dispatch({ action: "next_step" });

  const handlePrevStep = () => dispatch({ action: "previous_step" });

  const handleChange = (e) =>
    dispatch({
      action: "update_field",
      key: e.target.name,
      value: e.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your submission");
    dispatch({ action: "reset" });
  };

  if (formData.currentStep === 1) {
    return (
      <form onSubmit={handleSubmit}>
        <div id="notice">Refacto ce formulaire en utilisant useReducer</div>
        <h2>Personal Information</h2>
        <div>
          <label>Step {formData.currentStep} of 3</label>
          <progress value={formData.currentStep} max={3} />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            required
            name="name"
            id="name"
            placeholder="Enter your name"
            value={formData.fields.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            required
            name="email"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.fields.email}
            onChange={handleChange}
          />
        </div>
        <button type="button" className="secondary" onClick={handleNextStep}>
          Next
        </button>
      </form>
    );
  } else if (formData.currentStep === 2) {
    return (
      <form onSubmit={handleSubmit}>
        <h2>Address</h2>
        <div>
          <label>Step {formData.currentStep} of 3</label>
          <progress value={formData.currentStep} max={3} />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            required
            name="address"
            id="address"
            type="address"
            placeholder="What is your address?"
            value={formData.fields.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            required
            name="city"
            id="city"
            placeholder="What city do you live in?"
            value={formData.fields.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="zipcode">Zipcode</label>
          <input
            required
            name="zipcode"
            id="zipcode"
            type="number"
            placeholder="What is your zipcode?"
            value={formData.fields.zipcode}
            onChange={handleChange}
          />
        </div>
        <div>
          <button className="secondary" type="button" onClick={handleNextStep}>
            Next
          </button>
          <button type="button" className="link" onClick={handlePrevStep}>
            Previous
          </button>
        </div>
      </form>
    );
  } else if (formData.currentStep === 3) {
    return (
      <form onSubmit={handleSubmit}>
        <h2>Confirm your information:</h2>
        <div>
          <label>Step {formData.currentStep} of 3</label>
          <progress value={formData.currentStep} max={3} />
        </div>
        <table>
          <tbody>
            {Object.keys(formData.fields).map((key) => {
              return (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{formData.fields[key]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <button className="primary" type="submit">
            Submit
          </button>
          <button type="button" className="link" onClick={handlePrevStep}>
            Previous
          </button>
        </div>
      </form>
    );
  } else {
    return null;
  }
}
