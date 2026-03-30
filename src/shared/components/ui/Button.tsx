import React from 'react'

interface ButtonProps {
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, type, children, className }) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  )
}

export default Button