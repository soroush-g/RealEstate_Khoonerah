import AddTodo from "@/components/todos/AddTodo";
import Todo from "@/components/todos/Todo";
import { prisma } from "@/utils/prisma";
import Header from "./Header";

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
    <div className="w-screen min-h-screen py-20 flex flex-col items-center bg-[#012E40] text-white">
      {/* عنوان و هدر */}
     <Header />

      {/* بخش اضافه کردن تسک */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg w-[90%] md:w-[50%] lg:w-[40%] border border-white/20">
        <AddTodo />
      </div>

      {/* نمایش تسک‌ها به صورت یک ستونه */}
      <div className="mt-6 w-[90%] md:w-[60%] lg:w-[40%] flex flex-col gap-4">
        {data.length === 0 ? (
          <p className="text-center text-gray-300 text-lg">
            هنوز هیچ کاری ثبت نشده! 🎉
          </p>
        ) : (
          data.map((todo) => (
            <div
              key={todo.id}
              className="w-full transform transition duration-300 hover:scale-105"
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
