import { ReactNode } from "react";
import { text } from "stream/consumers";

export interface inputProps = {
   name: string;
   type: string;
   placeholder?: string;
   value?: string;
}

export interface formProps = {
   children: ReactNode;
   action: (formData: FormData) => void;
   className?: string;
   onSubmit?: () => void;
}

export interface buttonProps = {
   type?: "button" | "submit" | "reset";
   text: string | 
}