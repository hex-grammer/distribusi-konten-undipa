import React from "react";
import { useForm, UseFormRegister, FieldValues } from "react-hook-form";

type SkalaLikertProps = {
  name: string;
  opsi: string[];
  register: UseFormRegister<FieldValues>;
};

const SkalaLikert: React.FC<SkalaLikertProps> = ({ name, opsi, register }) => {
  return (
    <div className="flex flex-col-reverse">
      {opsi.map((op, index) => (
        <div key={index} className="flex items-center">
          <input
            id={`${name}-${op}`}
            type="radio"
            value={op}
            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            {...register(name, { required: true })}
          />
          <label htmlFor={`${name}-${op}`} className="ml-3">
            {op}
          </label>
        </div>
      ))}
    </div>
  );
};

export default SkalaLikert;
