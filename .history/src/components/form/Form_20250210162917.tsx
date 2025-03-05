import { formProps } from "@/types"
import { useRef } f

function Form({ children, action, className, onSubmit}: formProps) {
  return (
    <form className={className}>{children}</form>
  )
}

export default Form
