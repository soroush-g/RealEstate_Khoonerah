import { inputProps } from "@/types"

function Input({ name, type, placeholder, value }: inputProps) {
  return (
    <div>
      <input type={type} />
    </div>
  )
}

export default Input
