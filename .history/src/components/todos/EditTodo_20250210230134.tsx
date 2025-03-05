'use client';

import {useState} from "react";
import Button from "../button/Button";


function EditTodo() {
    const [editTodo, setEditTodoState] = useState(false);

    const handleEdit = () => {
        setEditTodoState(!editTodo);
    }
  return (
    <div className="flex gap-5 items-center">
      <Button onClick={handleEdit} text={<MdE} />
    </div>
  )
}

export default EditTodo
