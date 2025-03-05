import * as actions from "@/actions";
import Form from '../form/Form'
import Input from '../input/Input'
import Button from '../button/Button'
import { todoProps } from "@/types";
import { FaCheckCircle } from "react-icons/fa";

function ChangeTodo({ todo }: todoProps) {
  return (
    <Form action={actions}>
        <Input name="inputId" value={todo.id} type="hidden" ></Input>
        <Button text={<FaCheckCircle />}  actionButton bgColor={todo.isCompleted ? 'bg-green-500' : 'bg-red-500'}></Button>
    </Form>
  )
}

export default ChangeTodo
