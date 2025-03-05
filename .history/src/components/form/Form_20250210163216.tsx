"use client";

import { formProps } from "@/types"
import { useRef } from "react"

function Form({ children, action, className, onSubmit}: formProps) {
    const ref = useRef<HTMLFormElement>(null);
  return (
    <form action={action} onSubmit={onSubmit} ref={ref}>{children}</form>
  )
}

export default Form
