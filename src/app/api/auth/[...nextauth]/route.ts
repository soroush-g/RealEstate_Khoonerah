import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // First check in User table
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        // Get role-specific details
        let roleSpecificUser;
        if (user.role === "manager") {
          roleSpecificUser = await prisma.manager.findUnique({
            where: { cognitoId: user.id },
          });
        } else {
          roleSpecificUser = await prisma.tenant.findUnique({
            where: { cognitoId: user.id },
          });
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          roleSpecificDetails: roleSpecificUser,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.roleSpecificDetails = user.roleSpecificDetails;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "manager" | "tenant";
        session.user.roleSpecificDetails = token.roleSpecificDetails;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    signUp: "/signup",
    error: "/signin",
  },
});

export { handler as GET, handler as POST };