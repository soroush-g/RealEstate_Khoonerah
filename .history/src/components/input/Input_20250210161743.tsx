import { inputProps } from "@/types"

function Input({ name, type, placeholder, value }: inputProps) {
  return (
    <div>
      <input name={name} type={type} placeholder={placeholder} value={value}
      
      />
    </div>
  )
}

export default Input
