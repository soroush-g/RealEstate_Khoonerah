"use client";

import { formProps } from "@/types"
import { useRef } from "react"

function Form({ children, action, className, onSubmit}: formProps) {
    const ref = useRef<HTMLFormElement>();
  return (
    <form action={act} ref={ref}>{children}</form>
  )
}

export default Form
