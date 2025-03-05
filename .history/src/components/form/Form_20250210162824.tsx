import { formProps } from "@/types"

function Form({ children, action, className, onSubmit}: formProps) {
  return (
    <form >{children}</form>
  )
}

export default Form
