"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
}

export default function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="primary-btn  disabled:bg-green-700 disabled:text-green-300 disabled:cursor-not-allowed"
    >
      {pending ? "로딩 중" : text}
    </button>
  );
}
