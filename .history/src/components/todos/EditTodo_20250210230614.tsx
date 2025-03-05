'use client';

import {useState} from "react";
import Button from "../button/Button";
import { MdEdit } from "react-icons/md";


function EditTodo() {
    const [editTodo, setEditTodoState] = useState(false);

    const handleEdit = () => {
        setEditTodoState(!editTodo);
    }
  return (
    <div className="flex gap-5 items-center">
      <Button onClick={handleEdit} text={<MdEdit />} actionButton />
      {editT}
    </div>
  )
}

export default EditTodo
