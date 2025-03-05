import React from 'react'
import Form from '../form/Form'
import Button from '../button/Button'
import Input from '../input/Input'

function DeleteTodo() {
  return (
    <div className="flex ga">
        <Button />
      <Form>
        <Input name="inputId" value={todo.id} type="hidden" ></Input>
        <div>
            <Input name="deleteTitle" type="text" placeholder="حذف یادداشت"></Input>
            <Button type="submit" text="حذف"></Button>
        </div>
      </Form>
    </div>
  )
}

export default DeleteTodo
