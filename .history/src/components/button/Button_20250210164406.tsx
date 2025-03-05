import { buttonProps } from "@/types"

function Button({ type, text, className, actionButton, bgColor, ...props }: buttonProps) {
  return (
    <div>
      <button className="" >
        {text}
      </button>
    </div>
  )
}

export default Button
