import React from 'react'
import Form from '../form/Form'
import Input from '../input/Input'
import Button from '../button/Button'

function AddTodo() {
  return (
    <div>
      <Form>
        <div className='flex gap-2'>
            <Input name="input" type="text" placeholder="Add Todo"/>
            <Button type="submit" />
        </div>
      </Form>
    </div>
  )
}

export default AddTodo
