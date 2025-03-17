import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";

const prisma = new PrismaClient();

// Schema validation for registration
const registerSchema = z.object({
  name: z.string().min(2, { message: "نام باید حداقل 2 کاراکتر باشد" }),
  email: z.string().email({ message: "ایمیل نامعتبر است" }),
  password: z.string().min(6, { message: "رمز عبور باید حداقل 6 کاراکتر باشد" }),
  role: z.enum(["tenant", "manager"], {
    message: "نقش باید یکی از مقادیر tenant یا manager باشد",
  }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input data
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: result.error.errors[0].message },
        { status: 400 }
      );
    }
    
    const { name, email, password, role } = body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "این ایمیل قبلاً ثبت شده است" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    // Create role-specific profile
    if (role === "manager") {
      await prisma.manager.create({
        data: {
          cognitoId: user.id,
          name,
          email,
          phoneNumber: "",
          password: hashedPassword,
        },
      });
    } else {
      await prisma.tenant.create({
        data: {
          cognitoId: user.id,
          name,
          email,
          phoneNumber: "",
          password: hashedPassword,
        },
      });
    }

    return NextResponse.json(
      { message: "ثبت‌نام با موفقیت انجام شد", user: { id: user.id, name, email, role } },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "خطا در ثبت‌نام" },
      { status: 500 }
    );
  }
} 