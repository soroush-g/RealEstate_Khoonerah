import { buttonProps } from "@/types"

function Button({ type, text, onClick, actionButton, bgColor, ...props }: buttonProps) {
  return (
    <div>
      <button className={cldx(
        actionButton && 'text-white hover:bg-blue-800 focus:outline-none focus:'
      )} onClick={onClick} type={type} >
        {text}
      </button>
    </div>
  )
}

export default Button
