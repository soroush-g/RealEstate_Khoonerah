"use client";

import { useState } from "react";
import Button from "../button/Button";
import { MdEdit } from "react-icons/md";
import Form from "../form/Form";
import Input from "../input/Input";
import { todoProps } from "@/types";
import * as actions from "@/actions";

function EditTodo({ todo }: { todo: todoProps }) {
  const [editTodoState, setEditTodoState] = useState(false);

  const handleEdit = () => {
    setEditTodoState(!editTodoState);
  };

  const handleSubmit = () => {
    setEditTodoState(false);
  };

  return (
    <div className="flex gap-3 items-center">
      <Button onClick={handleEdit} text={<MdEdit />} actionButton />
      {editTodoState ? (
        <Form action={actions.editTodo} onSubmit={handleSubmit}>
          <Input name="inputId" value={todo.id} type="hidden" />
          <div className="flex gap-2">
            <Input name="newTitle" type="text" placeholder="ویرایش یادداشت" />
            <Button type="submit" text="ذخیره" bgColor="bg-yellow-500" />
          </div>
        </Form>
      ) : null}
    </div>
  );
}

export default EditTodo;
