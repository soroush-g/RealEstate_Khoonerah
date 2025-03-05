"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function createTodo(formData: FormData) {
    try {
        const input = formData.get('input') as string;
        if (!input || !input.trim()) {
            throw new Error("Input cannot be empty");
        }

        await prisma.todo.create({
            data: {
                title: input,
            },
        });

        revalidatePath("/");
    } catch (error) {
        console.error("Failed to create todo:", error);
        throw error;
    }
}

export async function changeStatus(formData: FormData) {
    try {
        const inputId = formData.get("inputId") as string;
        const todo = await prisma.todo.findUnique({
            where: {
                id: inputId,
            },
        });

        if (!todo) {
            throw new Error("Todo not found");
        }

        const updatedStatus = !todo.isCompleted;

        await prisma.todo.update({
            where: {
                id: inputId,
            },
            data: {
                isCompleted: updatedStatus,
            },
        });

        revalidatePath("/");
    } catch (error) {
        console.error("Failed to change status:", error);
        throw error;
    }
}

export async function editTodo(formData: FormData) {
    try {
        const newTitle = formData.get("newTitle") as string;
        const inputId = formData.get("inputId") as string;

        if (!newTitle || !newTitle.trim()) {
            throw new Error("New title cannot be empty");
        }

        await prisma.todo.update({
            where: {
                id: inputId,
            },
            data: {
                title: newTitle,
            },
        });

        revalidatePath("/");
    } catch (error) {
        console.error("Failed to edit todo:", error);
        throw error;
    }
}

export async function deleteTodo(formData: FormData) {
    try {
        const inputId = formData.get("inputId") as string;

        await prisma.todo.delete({
            where: {
                id: inputId,
            },
        });

        revalidatePath("/");
    } catch (error) {
        console.error("Failed to delete todo:", error);
        throw error;
    }
}