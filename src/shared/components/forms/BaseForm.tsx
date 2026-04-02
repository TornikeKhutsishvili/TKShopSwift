import React, { type ReactNode } from "react";

interface BaseFormProps {
  title: string;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

const BaseForm: React.FC<BaseFormProps> = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6 p-8 shadow rounded-lg">
      {children}
    </form>
  );
};

export default BaseForm;