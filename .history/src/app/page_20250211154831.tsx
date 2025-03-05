import AddTodo from "@/components/todos/AddTodo";
import Todo from "@/components/todos/Todo";
import { prisma } from "@/utils/prisma";

async function getData() {
  const data = await prisma.todo.findMany({
    select: {
      id: true,
      title: true,
      isCompleted: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

async function Home() {
  const data = await getData();
  return (
    <div className="w-screen min-h-screen py-20 flex flex-col items-center bg-gradient-to-br from-green-100 to-blue-200">
      <span className="text-5xl font-extrabold uppercase text-green-700 drop-shadow-lg">
        یادانگار
      </span>
      <h1 className="text-4xl font-extrabold uppercase mb-8 text-center text-red-700">
        <span className="lowercase"> پردازش سرور</span>
      </h1>

      {/* Add Todo Section */}
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] md:w-[50%] lg:w-[40%]">
        <AddTodo />
      </div>

      {/* Todo List */}
      <div className="mt-6 w-[90%] md:w-[50%] lg:w-[40%] space-y-4">
        {data.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            هنوز هیچ کاری ثبت نشده! 🎉
          </p>
        ) : (
          data.map((todo) => (
            <div
              key={todo.id}
              className="w-full bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <Todo todo={todo} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
