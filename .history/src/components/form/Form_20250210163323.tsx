"use client";

import { formProps } from "@/types"
import { useRef } from "react"

function Form({ children, action, className, onSubmit}: formProps) {
    const ref = useRef<HTMLFormElement>(null);
  return (
    <form action={async (formData) } onSubmit={onSubmit} ref={ref}>{children}</form>
  )
}

export default Form
