import { inputProps } from "@/types"

function Input({ name, type, placeholder, value }: inputProps) {
  return (
    <div>
      <input name={name} type={type} placeholder={placeholder} value={value}
       className="blck w-full p-4 mx-2 border rounded-lg text-base bg-gray-800 border-gray-700 placeholder-gray-500 text-white"
      />
    </div>
  )
}

export default Input
