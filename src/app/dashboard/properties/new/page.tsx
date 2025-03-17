"use client";

import { useRouter } from "next/navigation";
import PropertyForm from "@/components/PropertyForm";
import { toast } from "sonner";

export default function NewPropertyPage() {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await fetch("/api/properties", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("خطا در ثبت ملک");
      }

      toast.success("ملک با موفقیت ثبت شد");
      router.push("/dashboard/properties");
    } catch (error) {
      console.error("Property creation error:", error);
      toast.error("خطا در ثبت ملک");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">ثبت ملک جدید</h1>
      <PropertyForm onSubmit={handleSubmit} />
    </div>
  );
} 