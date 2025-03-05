'use client';

import {useState} from "react";
import Button from "../button/Button";


function EditTodo() {
    const [editTodo, setEditTodo] = useState(false);

    const handleEdit = () => {
        setEditTodo(!editTodo);
    }
  return (
    <div className="flex gap-5 items-center">
      <Button onClick={han} />
    </div>
  )
}

export default EditTodo
