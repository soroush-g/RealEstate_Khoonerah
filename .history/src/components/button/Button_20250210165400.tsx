import { buttonProps } from "@/types"

function Button({ type, text, onClick, actionButton, bgColor, ...props }: buttonProps) {
  return (
    <div>
      <button className={cldx(
        actionButton && 'text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-800 founded-lg text-sm px-5 py-2.5 me-2 mb-2'
        `${bgColor} text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue`
      )} onClick={onClick} type={type} >
        {text}
      </button>
    </div>
  )
}

export default Button
