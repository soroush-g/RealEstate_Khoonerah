import { inputProps } from "@/types"

function Input({ name, type, placeholder, value }: inputProps) {
  return (
    <div>
      <input name={name} type={type} placeholder={placeholder} value={value}
       className="black w-full p-4 mx-2 border rounded-l"
      />
    </div>
  )
}

export default Input
