import * as actions from "@/actions";
import Form from '../form/Form'
import Input from '../input/Input'
import Button from '../button/Button'

function ChangeTodo() {
  return (
    <Form action={actions}>
        <Input name="inputId" value></Input>
        <Button></Button>
    </Form>
  )
}

export default ChangeTodo
