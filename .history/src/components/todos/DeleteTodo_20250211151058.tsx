import React from 'react'
import Form from '../form/Form'
import Button from '../button/Button'
import Input from '../input/Input'
import { todoProps } from '@/types'
import { FaTrash } from 'react-icons/fa'

function DeleteTodo({todo}: {todo: todoProps}) {
  return (
    <div className="flex gap-5 items-center">
        <Button />
      <Form >
        <Input name="inputId" value={todo.id} type="hidden" ></Input>
      
        <Button actionButton type="submit" bgColor="bg-red-600" text={<FaTrash />} ></Button>
      </Form>
    </div>
  )
}

export default DeleteTodo
