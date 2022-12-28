import { useField } from "formik";
import React from "react";

const Button: React.FC<{
  className?: string;
  type: "submit" | "reset" | "button";
}> = ({ className, type }) => {
  return (
    <button
      type={type}
      className={`py-2 px-4 rounded-full text-white bg-blue-500 ${className}`}
    >
      Submit
    </button>
  );
};

const Input: React.FC<{
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
}> = ({ name, label, type = "text", placeholder, className }) => {
  const [field, meta] = useField(name);
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <input
        {...field}
        id={name}
        type={type}
        placeholder={placeholder}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
      />
      {meta.touched && meta.error ? (
        <p className="text-red-500 text-xs italic">{meta.error}</p>
      ) : null}
    </div>
  );
};

const RadioGroup: React.FC<{
  name: string;
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  touched?: boolean;
  register?: any;
  className?: string;
}> = ({ name, label, options, error, touched, register, className }) => {
  return (
    <div className="mb-4">
      <p className="block text-gray-700 text-sm font-bold mb-2">{label}</p>
      {options.map((option) => (
        <div key={option.value} className="mb-2">
          <input
            type="radio"
            name={name}
            value={option.value}
            ref={register}
            className={className}
          />
          <label className="ml-2">{option.label}</label>
        </div>
      ))}
      {touched && error ? (
        <p className="text-red-500 text-xs italic">{error}</p>
      ) : null}
    </div>
  );
};

const Select: React.FC<{
  name: string;
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  touched?: boolean;
  register?: any;
  className?: string;
}> = ({ name, label, options, error, touched, register, className }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <select
        name={name}
        id={name}
        ref={register}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {touched && error ? (
        <p className="text-red-500 text-xs italic">{error}</p>
      ) : null}
    </div>
  );
};

export { Button, Input, RadioGroup, Select };
