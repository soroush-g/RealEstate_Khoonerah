"use client";

import { formProps } from "@/types";
import { useRef } from "react";

function Form({ children, action, className, onSubmit }: formProps) {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      action={async (formData) => {
        await action(formData);
        ref.current?.reset();
      }}
      onSubmit={onSubmit}
      ref={ref}
      className={className}
    >
      {children}
    </form>
  );
}

export default Form;
