import { todoProps } from "@/types";
import ChangeTodo from "./ChangeTodo";
import EditTodo from "./EditTodo";
import DeleteTodo from "./DeleteTodo";

function Todo({ todo }: { todo: todoProps }) {
  return (
    <div className="w-full bg-[#] shadow-lg border border-white/10 py-4 px-6 rounded-xl flex items-center justify-between transition-transform duration-300 hover:scale-[1.03]">
      {/* تغییر وضعیت تسک */}
      <ChangeTodo todo={todo} />

      {/* متن تسک */}
      <span className="text-center font-bold uppercase grow px-4 text-white">
        {todo.title}
      </span>

      {/* ویرایش و حذف */}
      <div className="flex items-center gap-3">
        <EditTodo todo={todo} />
        <DeleteTodo todo={todo} />
      </div>
    </div>
  );
}

export default Todo;
