"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function createTodo(formData: FormData) {
    const input = formData.get('input') as string;
    if(!input.trim()) {
        return;
    }

    await prisma.todo.create({
        data: {
            title: input,
        }
    })

    revalidatePath("/");
}

export async function changeStatus(formData: FormData) {
   const inputId = formData.get("inputId") as string;
   const todo = await prisma.todo.findUnique({
    where: {
        id: inputId,
    },
   });

   const updatedStatus = !todo?.isCompleted;

   await prisma.todo.update({
    where:{
        id: inputId,
    },
    data:{
        isCompleted: updatedStatus,
    },
   });

   revalidatePath("/");
}

export async function editTodo(formData: FormData) {
    const newTitle = formData.get("newTitle") as string;
    const inputId = formData.get("inputid") as string;

    await prisma.todo.update({
        where: {
            id: inputId,
        },
        data: {
            title: newTitle,
        }
    })

    revalidatePath("/");
}

export async function deleteTodo(formData: FormData) {
    const deleteTitle = formData.get("deleteTitle") as string;
    const inputId = formData.get("inputid") as string;

    await prisma.todo.delete({
        where: {
            id: inputId,
        },
        data: {
            title: deleteTitle,
        },
    });

    
}