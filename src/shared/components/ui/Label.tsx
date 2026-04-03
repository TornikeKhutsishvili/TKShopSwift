import React, { type ReactNode } from 'react'

interface LabelProps {
  className?: string;
  children: ReactNode;
}

const Label: React.FC<LabelProps> = ({ className, children }) => {
  return (
    <label className={`block text-sm font-medium text-gray-700 ${className}`}>
      {children}
    </label>
  )
};

export default Label;