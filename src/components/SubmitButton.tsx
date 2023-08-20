import React from "react";

interface SubmitButtonProps {
  disabled: boolean
  children: React.ReactNode
}

export const SubmitButton = ({ disabled, children }: SubmitButtonProps) =>
  <button disabled={disabled}
          className='disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:text-white enabled:hover:bg-black m-1 bg-white rounded text-xs p-1 px-2 font-bold'>
    {children}
  </button>
