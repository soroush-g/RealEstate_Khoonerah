
import Form from '../form/Form'
import Input from '../input/Input'
import Button from '../button/Button'
import * as actions from '@/actions'

function AddTodo() {
  return (
    <div>
      <Form action={actions.createTodo}>
        <div className='flex gap-4'>
            <Input name="input" type="text" placeholder="یادداشت کنید"/>

            <Button type="submit" text="ثبت" bgColor="bg-blue-600" />
        </div>
      </Form>
    </div>
  )
}

export default AddTodo
