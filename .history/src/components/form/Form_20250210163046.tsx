"use client";

import { formProps } from "@/types"
import { useRef } from "react"

function Form({ children, action, className, onSubmit}: formProps) {
    co
  return (
    <form className={className}>{children}</form>
  )
}

export default Form
