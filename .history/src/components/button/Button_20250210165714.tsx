import { buttonProps } from "@/types"
import clsx from "clsx"

function Button({ type, text, onClick, actionButton, bgColor, ...props }: buttonProps) {
  return (
    <div>
      <button className={clsx(
        actionButton && 'text-white hover:bg-blue-800 font-medium focus:outline-none focus:ring-4 focus:ring-blue-800 founded-lg text-sm px-5 py-2.5 me-2 mb-2'
        `${bgColor} hover:${bgColor} font-medium focus:outline-none founded-lg text-sm px-5 py-2.5 me-2 mb-2`
      )} onClick={onClick} type={type} >
        {text}
      </button>
    </div>
  )
}

export default Button
