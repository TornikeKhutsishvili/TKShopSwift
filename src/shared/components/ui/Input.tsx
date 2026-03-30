import React from 'react'

interface InputProps {
  name: string; value: string;
  className?: string; placeholder?: string; required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  name, value, placeholder, className, required, onChange
}) => {
  return (
    <input
      name={name} value={value} className={`border p-2 rounded w-full ${className}`}
      placeholder={placeholder} required={required} onChange={onChange}
    />
  )
};

export default Input;