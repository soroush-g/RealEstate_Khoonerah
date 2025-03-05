import { buttonProps } from "@/types"

function Button({ type, text, className, actionButton, bgColor, ...props }: buttonProps) {
  return (
    <div>
      <button >
        {text}
      </button>
    </div>
  )
}

export default Button
