import AddTodo from '@/components/todos/AddTodo'
import Todo from '@/components/todos/Todo';
import { prisma } from '@/utils/prisma'

async function getData() {
  const data = await prisma.todo.findMany({
    select: {
      id: true,
      title: true,
      isCompleted: true,
    },
    orderBy: {
      createdAt: 'desc',
    }
  });
  return data;
}

async function Home() {
  const data = await getData();
  return (
    <div className="w-screen min-h-screen py-20 flex flex-col items-center bg-[#012E40] text-white">
      <span className="text-5xl font-extrabold uppercase text-green-400 drop-shadow-lg">
        یادانگار
      </span>
      <h1 className="text-4xl font-extrabold uppercase mb-8 text-center text-yellow-400">
        <span className="lowercase">w/</span> پردازش سرور
      </h1>

      {/* بخش اضافه کردن تسک */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg w-[90%] md:w-[50%] lg:w-[40%] border border-white/20">
        <AddTodo />
      </div>

      {/* نمایش تسک‌ها به صورت دو ستونه */}
      <div className="mt-6 w-[90%] md:w-[70%] lg:w-[50%] grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.length === 0 ? (
          <p className="text-center text-gray-300 text-lg col-span-2">
            هنوز هیچ کاری ثبت نشده! 🎉
          </p>
        ) : (
          data.map((todo) => (
            <div key={todo.id} className="w-full">
              <Todo todo={todo} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Home;
