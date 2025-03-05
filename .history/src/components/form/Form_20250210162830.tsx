import { formProps } from "@/types"

function Form({ children, action, className, onSubmit}: formProps) {
  return (
    <form className={className}>{children}</form>
  )
}

export default Form
