import * as actions from "@/actions";
import Form from '../form/Form'
import Input from '../input/Input'
import Button from '../button/Button'

function ChangeTodo({ todod }) {
  return (
    <Form action={actions}>
        <Input name="inputId" value={todo.id} type="hidden" ></Input>
        <Button></Button>
    </Form>
  )
}

export default ChangeTodo
