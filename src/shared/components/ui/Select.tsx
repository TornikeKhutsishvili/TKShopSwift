import React from 'react'

interface SelectProps {
  name: string; value: string; options: { value: string; label: string }[]; className?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  title?: string;
}

const Select: React.FC<SelectProps> = ({ name, value, options, className, onChange, title }) => {
  return (
    <select name={name} value={value} onChange={onChange} className={className} title={title}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Select