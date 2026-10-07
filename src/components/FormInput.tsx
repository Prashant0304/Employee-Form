import React from "react";
import { ValidationMessage } from "./ValidationMessage";

interface FormInputProps {
  label: string;
  type?: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

export const FormInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  required = false,
}: FormInputProps) => {
  return (
    <div className="form-group">
      <label>
        {label} {required && <span className="required">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={error ? "input-error" : ""}
      />
      <ValidationMessage message={error} />
    </div>
  );
};
