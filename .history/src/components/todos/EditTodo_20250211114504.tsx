'use client';

import {useState} from "react";
import Button from "../button/Button";
import { MdEdit } from "react-icons/md";
import Form from "../form/Form";
import Input from "../input/Input";
import { todoProps } from "@/types";
import * as actions from "@/actions";

function EditTodo({todo}: {todo: todoProps}) {
    const [editTodoState, setEditTodoState] = useState(false);

    const handleEdit = () => {
        setEditTodoState(!editTodoState);
    }

    const handleSubmit = 
  return (
    <div className="flex gap-5 items-center">
      <Button onClick={handleEdit} text={<MdEdit />} actionButton />
      {editTodoState ? (
        <Form action={actions.editTodo} onSubmit={handleSubmit}>
            <Input name="inputId" value={todo.id} type="hidden"></Input>
           <div className="flex justify-center">
            <Input name="newTitle" type="text" placeholder="ویرایش یادداشت"></Input>
            <Button type="submit" text="ذخیره"></Button>
           </div>
        </Form>
    ) : null}
    </div>
  )
}

export default EditTodo
