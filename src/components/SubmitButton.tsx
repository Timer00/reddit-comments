import React from "react";

interface SubmitButtonProps {
  disabled: boolean
  children: React.ReactNode
}

export const SubmitButton = ({ disabled, children }: SubmitButtonProps) =>
  <button disabled={disabled}
          className='disabled:opacity-50 disabled:cursor-not-allowed m-1 bg-white rounded text-xs px-2 font-bold'>
    {children}
  </button>
