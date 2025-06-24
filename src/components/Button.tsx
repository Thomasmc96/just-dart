import React, { type ButtonHTMLAttributes } from "react";

type ButtonProps = {
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="bg-green-400 hover:bg-green-500 text-gray-900 px-6 py-3 rounded-lg font-semibold transition cursor-pointer"
    >
      {children}
    </button>
  );
}
