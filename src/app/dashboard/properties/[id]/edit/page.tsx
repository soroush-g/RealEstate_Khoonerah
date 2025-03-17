"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PropertyForm from "@/components/PropertyForm";
import { toast } from "sonner";

interface Property {
  id: number;
  name: string;
  description: string;
  pricePerMonth: number;
  securityDeposit: number;
  applicationFee: number;
  photoUrls: string[];
  amenities: string[];
  highlights: string[];
  isPetsAllowed: boolean;
  isParkingIncluded: boolean;
  beds: number;
  baths: number;
  squareFeet: number;
  propertyType: string;
  location: {
    address: string;
    province: string;
    city: string;
    district: string;
    postalCode: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
}

export default function EditPropertyPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const response = await fetch(`/api/properties/${params.id}`);
      if (!response.ok) throw new Error("خطا در دریافت اطلاعات ملک");
      
      const data = await response.json();
      setProperty(data);
    } catch (error) {
      console.error("Property fetch error:", error);
      toast.error("خطا در دریافت اطلاعات ملک");
      router.push("/dashboard/properties");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await fetch(`/api/properties/${params.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("خطا در بروزرسانی ملک");
      }

      toast.success("ملک با موفقیت بروزرسانی شد");
      router.push("/dashboard/properties");
    } catch (error) {
      console.error("Property update error:", error);
      toast.error("خطا در بروزرسانی ملک");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!property) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">ویرایش ملک</h1>
      <PropertyForm initialData={property} onSubmit={handleSubmit} />
    </div>
  );
} 