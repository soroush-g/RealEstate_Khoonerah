import { ReactNode } from "react";

export interface inputProps = {
   name: string;
   type: string;
   placeholder?: string;
   value?: string;
}

export int formProps = {
   children: ReactNode;
   action: (formData: FormData) => void;
   className?: string;
   onSubmit?: () => void;
}