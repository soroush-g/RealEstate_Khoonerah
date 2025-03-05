"use client";
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "@/components/todos/SortableItem";
import AddTodo from "@/components/todos/AddTodo";
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

export default function Home() {
  const [todos, setTodos] = useState(await getData());

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setTodos((prev) => {
        const oldIndex = prev.findIndex((todo) => todo.id === active.id);
        const newIndex = prev.findIndex((todo) => todo.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="w-screen min-h-screen py-20 flex flex-col items-center bg-[#012E40] text-white">
      <span className="text-5xl font-extrabold uppercase text-green-400 drop-shadow-lg">
        یادانگار
      </span>
      <h1 className="text-4xl font-extrabold uppercase mb-8 text-center text-yellow-400">
        <span className="lowercase">پردازش سرور</span>
      </h1>

      {/* Add Todo Section */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg w-[90%] md:w-[50%] lg:w-[40%] border border-white/20">
        <AddTodo />
      </div>

      {/* Drag & Drop List */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={todos} strategy={verticalListSortingStrategy}>
          <div className="mt-6 w-[90%] md:w-[70%] lg:w-[50%] grid grid-cols-1 md:grid-cols-2 gap-4">
            {todos.length === 0 ? (
              <p className="text-center text-gray-300 text-lg col-span-2">
                هنوز هیچ کاری ثبت نشده! 🎉
              </p>
            ) : (
              todos.map((todo) => <SortableItem key={todo.id} todo={todo} />)
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
