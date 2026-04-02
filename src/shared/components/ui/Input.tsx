import React from 'react'

interface InputProps {
  name: string;
  value: string;
  type?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  name, value, placeholder, className, required, onChange
}) => {
  return (
    <input className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border ${className}`}
      name={name} value={value} placeholder={placeholder} required={required} onChange={onChange} title={name}
    />
  )
};

export default Input;