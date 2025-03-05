import * as actions from "@/actions";
import Form from '../form/Form'
import Input from '../input/Input'
import Button from '../button/Button'
import { todoProps } from "@/types";

function ChangeTodo({ todo }: todoProps) {
  return (
    <Form action={actions}>
        <Input name="inputId" value={todo.id} type="hidden" ></Input>
        <Button text={<FaChec}></Button>
    </Form>
  )
}

export default ChangeTodo
