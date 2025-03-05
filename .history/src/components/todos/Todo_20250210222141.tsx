import { todoProps } from "@/types"
import ChangeTodo from "./ChangeTodo"

function Todo({todo}: {todo: todoProps}) {
  return (
    <div className="w-10/12 mx-auto flex items-center justify-between bg-slate-900 py-4 px-20 rounded-2xl">
      {/* change todo */}
      <ChangeTodo todo={todo} />
      <span className='text-center font-bold uppercase grow'>{todo.title}</span>
      <div className='flex items-center mx-2'></div>
      {/* edit todo */}
      <div className='flex items-center mx-2'></div
      {/* delete todo */}
    </div>
  )
}

export default Todo
