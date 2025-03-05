import { ReactNode } from "react";

export type inputProps {
   name: string;
   type: string;
   placeholder?: string;
   value?: string;
}

export type formProps = {
   children: ReactNode;
   action: (formDa)
}