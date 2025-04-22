import { InputHTMLAttributes } from "react";
import { DynamicIcon } from "./DynamicIcon";


interface FormInputProps {
  name: string;
  errors?: string[];
  icon: string;
}

export default function FormInput({
  name,
  errors = [],
  icon,
  ...rest
}: FormInputProps & InputHTMLAttributes<HTMLInputElement>) {
  // hasError
  const hasError = errors.length > 0

  return (
    <div className="w-[520px]">
      <div className="relative w-full max-w-sm">
        <input
          name={name}
          className={
            `block w-[520px] h-12 rounded-full border border-gray-400  bg-[#F8F6F5] py-1 pr-4 pl-12 text-gray-900 placeholder-gray-400 focus:border-transparent focus:outline-none shadow-md` +
            (hasError
              ? 'focus:ring-4 border-red-500 focus:border-red-500 focus:ring-red-600 '
              : 'focus:ring-2 border-gray-300 focus:border-green-500 focus:ring-green-600 ')
          }
          {...rest}

        />
        <div className="absolute inset-y-0 left-2 flex items-center pl-3">
          <DynamicIcon name={icon} className="h-6 w-6  text-gray-400" />
        </div>
      </div>
      <div className="flex flex-col w-full justify-end px-5 pb-2 ">
        {errors.map((error, index) => (
          <span key={index} className="text-red-500 font-medium">
            {error}
          </span>
        ))}</div></div>
  );
}
