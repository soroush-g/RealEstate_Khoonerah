import { buttonProps } from "@/types"

function Button({ type, text, onClick, actionButton, bgColor, ...props }: buttonProps) {
  return (
    <div>
      <button className={cldx(
        
      )} onClick={onClick} type={type} >
        {text}
      </button>
    </div>
  )
}

export default Button
