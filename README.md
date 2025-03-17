# سیستم احراز هویت خونه‌راه

این پروژه یک سیستم احراز هویت کامل برای وب‌سایت خونه‌راه است که با استفاده از Next.js و NextAuth.js پیاده‌سازی شده است.

## ویژگی‌ها

- احراز هویت با ایمیل و رمز عبور
- پشتیبانی از نقش‌های کاربری (مدیر، مالک، مستاجر)
- امکان تغییر نقش کاربری
- صفحات ورود، ثبت نام، فراموشی رمز عبور و تأیید ایمیل
- محافظت از صفحات خصوصی
- پشتیبانی کامل از زبان فارسی و RTL

## تکنولوژی‌ها

- Next.js 14
- NextAuth.js
- Prisma ORM
- PostgreSQL
- Tailwind CSS
- Shadcn UI

## نصب و راه‌اندازی

1. نصب وابستگی‌ها:
```bash
npm install
```

2. تنظیم فایل `.env.local`:
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-in-production
NEXT_PUBLIC_API_URL=http://localhost:3000
DATABASE_URL="postgresql://postgres:password@localhost:5432/rental_db?schema=public"
```

3. اجرای مهاجرت‌های Prisma:
```bash
npx prisma migrate dev
```

4. اجرای برنامه در محیط توسعه:
```bash
npm run dev
```

## ساختار پروژه

- `src/app/api/auth/[...nextauth]`: تنظیمات NextAuth.js
- `src/app/(auth)`: صفحات احراز هویت (ورود، ثبت نام و غیره)
- `src/components/auth`: کامپوننت‌های مربوط به احراز هویت
- `src/lib/hooks/useAuth.ts`: هوک سفارشی برای مدیریت احراز هویت
- `src/types/next-auth.d.ts`: تایپ‌های NextAuth.js

## نقش‌های کاربری

- **مدیر (Manager)**: دسترسی به تمام بخش‌های سیستم
- **مالک (Owner)**: امکان ثبت و مدیریت املاک
- **مستاجر (Tenant)**: امکان جستجو و اجاره املاک

## API Endpoints

- `POST /api/auth/register`: ثبت نام کاربر جدید
- `POST /api/auth/change-role`: تغییر نقش کاربری
- `GET/POST /api/auth/[...nextauth]`: مسیرهای NextAuth.js

## مستندات بیشتر

- [NextAuth.js](https://next-auth.js.org/)
- [Next.js](https://nextjs.org/docs)
- [Prisma](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com/) 