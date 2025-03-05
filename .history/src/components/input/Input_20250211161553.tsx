import { inputProps } from "@/types";

function Input({ name, type, placeholder, value }: inputProps) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      className="block w-full p-3 border rounded-lg text-base bg-gray-900 border-gray-700 placeholder-gray-500 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
    />
  );
}

export default Input;
