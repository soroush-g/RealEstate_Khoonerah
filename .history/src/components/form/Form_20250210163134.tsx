"use client";

import { formProps } from "@/types"
import { useRef } from "react"

function Form({ children, action, className, onSubmit}: formProps) {
    const ref = useRef<HTMLFormElement>();
  return (
    <form className={className} ref={ref}>{children}</form>
  )
}

export default Form
