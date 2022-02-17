import React, { useState } from "react";
import { Link } from "react-router-dom";

function Form({
  inputs,
  submit: { name: submitName = "Submit", action: submitAction } = {},
  cancel: { name: cancelName = "Cancel", url: cancelUrl } = {},
}) {
  const initialForm = {};

  inputs.forEach((input) => (initialForm[input.name] = input.defaultValue));

  const [formData, setFormData] = useState({ ...initialForm });

  const inputList = inputs.map((input, idx) => {
    const updateFormData = (e) => {
      e.persist();
      setFormData((currentFormData) => ({
        ...currentFormData,
        [e.target.name]: e.target.value,
      }));
    };

    return (
      <div key={idx} className="form-group">
        <label htmlFor={input.id}>{input.formattedName}</label>
        {input.inputType === "textarea" ? (
          <textarea
            className="form-control"
            id={input.id}
            name={input.name}
            placeholder={input.placeholder}
            value={formData[input.name]}
            onChange={updateFormData}
            rows={4}
            required={true}
          />
        ) : (
          <input
            className="form-control"
            id={input.id}
            name={input.name}
            placeholder={input.placeholder}
            value={formData[input.name]}
            onChange={updateFormData}
            required={true}
          />
        )}
      </div>
    );
  });

  return (
    <div className="row">
      <div className={"col-12"}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitAction(formData);
            setFormData({ ...initialForm });
          }}
        >
          {inputList}
          <Link className="btn btn-secondary mr-2" to={cancelUrl}>
            {cancelName}
          </Link>
          <button type="submit" className="btn btn-primary">
            {submitName}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;