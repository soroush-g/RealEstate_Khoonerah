"use server";

import { Prisma } from "@/utils/prisma";

export async function createTodo(formData: FormData) {
    const input = formData.get('input') as string;
}