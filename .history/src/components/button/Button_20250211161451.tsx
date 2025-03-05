import { buttonProps } from "@/types";
import clsx from "clsx";

function Button({ type, text, onClick, actionButton, bgColor }: buttonProps) {
  return (
    <button
      className={clsx(
        "transition-all duration-300 rounded-lg text-sm px-5 py-2.5 font-medium",
        actionButton
          ? "text-white hover:scale-105 focus:outline-none focus:ring-4"
          : "bg-gray-700 text-white hover:bg-gray-800",
        bgColor && `${bgColor} hover:brightness-110`
      )}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}

export default Button;
