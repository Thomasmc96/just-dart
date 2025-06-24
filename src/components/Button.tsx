import React from "react";

type ButtonProps = {
  children: React.ReactNode;
};

export default function Button({ children }: ButtonProps) {
  return (
    <button className="bg-green-400 hover:bg-green-500 text-gray-900 px-6 py-3 rounded-lg font-semibold transition cursor-pointer">
      {children}
    </button>
  );
}
