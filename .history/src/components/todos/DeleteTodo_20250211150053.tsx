import React from 'react'
import Form from '../form/Form'
import Button from '../button/Button'
import Input from '../input/Input'
import { todoProps } from '@/types'

function DeleteTodo({todo}: {todo: todoProps}) {
  return (
    <div className="flex gap-5 items-center">
        <Button />
      <Form>
        <Input name="inputId" value={todo.id} type="hidden" ></Input>
        <div className="flex justify-center">
            <Input name="deleteTitle" type="text" placeholder="حذف یادداشت"></Input>
            <Button actionButton type="submit" bgColor="bg-red-600" text={} ></Button>
        </div>
      </Form>
    </div>
  )
}

export default DeleteTodo
