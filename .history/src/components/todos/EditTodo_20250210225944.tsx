'use client';

import {useState} from "react";
import Button from "../button/Button";


function EditTodo() {
    const [editTodo, setEditTodo] = useState(false);

    const handleEdit = () => {
        setEditTodo(!editT)
    }
  return (
    <div className="flex gap-5 items-center">
      <Button onClick={} />
    </div>
  )
}

export default EditTodo
