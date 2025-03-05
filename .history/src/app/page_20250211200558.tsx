import AddTodo from "@/components/todos/AddTodo";
import Todo from "@/components/todos/Todo";
import { prisma } from "@/utils/prisma";

async function getData() {
  return await prisma.todo.findMany({
    select: { id: true, title: true, isCompleted: true },
    orderBy: { createdAt: "desc" },
  });
}

async function Home() {
  const data = await getData();

  return (
    <div className="w-screen min-h-screen py-20 flex flex-col items-center bg-[#030d11] text-white relative">
    {/* عنوان و هدر */}
    <HeaderSection />
    
    {/* بخش اضافه کردن تسک */}
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg w-[90%] md:w-[50%] lg:w-[40%] border border-white/20 mt-6">
      <AddTodo />
    </div>
  
    {/* نمایش تسک‌ها */}
    <TodoList data={data} />
  </div>
  );
}

const HeaderSection = () => {
  return (
    // <header className="w-full bg-[#041217] text-white sticky top-0 py-4 px-8 shadow-lg z-50">
      <div className="flex justify-between items-center max-w-5xl mx-auto flex-wrap gap-4">
        <span className="text-5xl font-extrabold uppercase text-[#D]">
          پیشرفت
        </span>
        <h1 className="text-lg font-bold uppercase text-green-300">
          برای موفقیت پایدار، اهداف روزانه بچین
        </h1>
        <h1 className="text-lg font-bold uppercase text-[#0f4a46]">
          لیست کن - انجامش بده - تیک بزن
        </h1>
      </div>
    // </header>
  );
};

const TodoList = ({ data }) => (
  <div className="mt-6 w-[90%] md:w-[60%] lg:w-[40%] flex flex-col gap-4">
    {data.length === 0 ? (
      <p className="text-center text-gray-300 text-lg">هنوز هیچ کاری ثبت نشده! 🎉</p>
    ) : (
      data.map((todo) => (
        <div key={todo.id} className="w-full transform transition duration-300 hover:scale-105">
          <Todo todo={todo} />
        </div>
      ))
    )}
  </div>
);

export default Home;
