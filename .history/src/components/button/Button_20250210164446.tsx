import { buttonProps } from "@/types"

function Button({ type, text, onClick, actionButton, bgColor, ...props }: buttonProps) {
  return (
    <div>
      <button className="" onClick={}>
        {text}
      </button>
    </div>
  )
}

export default Button
