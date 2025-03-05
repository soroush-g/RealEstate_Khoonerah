import Form from "../form/Form";
import Button from "../button/Button";
import Input from "../input/Input";
import { todoProps } from "@/types";
import { FaTrash } from "react-icons/fa";
import * as actions from "@/actions";

function DeleteTodo({ todo }: { todo: todoProps }) {
  return (
    <Form action={actions.deleteTodo}>
      <Input name="inputId" value={todo.id} type="hidden" />
      <Button
        actionButton
        type="submit"
        bgColor="bg-red-600"
        text={<FaTrash />}
      />
    </Form>
  );
}

export default DeleteTodo;
