"use client";

import { formProps } from "@/types"
import { useRef } from "react"

function Form({ children, action, className, onSubmit}: formProps) {
    const ref = useRef<HTML>()
  return (
    <form className={className}>{children}</form>
  )
}

export default Form
