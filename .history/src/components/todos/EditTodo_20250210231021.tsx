'use client';

import {useState} from "react";
import Button from "../button/Button";
import { MdEdit } from "react-icons/md";
import Form from "../form/Form";
import Input from "../input/Input";


function EditTodo() {
    const [editTodo, setEditTodoState] = useState(false);

    const handleEdit = () => {
        setEditTodoState(!editTodo);
    }
  return (
    <div className="flex gap-5 items-center">
      <Button onClick={handleEdit} text={<MdEdit />} actionButton />
      {editTodo ? (<Form>
        <Input name="inputId" value={todo.id} type=""></Input>
        <Button></Button>
        </Form>) : null}
    </div>
  )
}

export default EditTodo
