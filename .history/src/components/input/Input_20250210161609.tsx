import { inputProps } from "@/types"

function Input({ name, type, placeholder, value }: inputProps) {
  return (
    <div>
      <input name={name} type={type} p />
    </div>
  )
}

export default Input
