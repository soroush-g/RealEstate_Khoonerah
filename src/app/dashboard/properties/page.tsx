"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import { toast } from "sonner";

interface Property {
  id: number;
  name: string;
  description: string;
  pricePerMonth: number;
  photoUrls: string[];
  beds: number;
  baths: number;
  squareFeet: number;
  location: {
    city: string;
    province: string;
  };
  applications: { id: number }[];
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch("/api/properties/manager");
      if (!response.ok) throw new Error("خطا در دریافت لیست املاک");
      
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error("Properties fetch error:", error);
      toast.error("خطا در دریافت لیست املاک");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("آیا از حذف این ملک اطمینان دارید؟")) return;

    try {
      const response = await fetch(`/api/properties/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("خطا در حذف ملک");
      
      toast.success("ملک با موفقیت حذف شد");
      fetchProperties();
    } catch (error) {
      console.error("Property deletion error:", error);
      toast.error("خطا در حذف ملک");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">مدیریت املاک</h1>
        <Link href="/dashboard/properties/new">
          <Button>
            <Plus className="ml-2 h-4 w-4" />
            ثبت ملک جدید
          </Button>
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">هنوز هیچ ملکی ثبت نکرده‌اید</p>
          <Link href="/dashboard/properties/new">
            <Button variant="outline">ثبت اولین ملک</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              actions={
                <>
                  <Link href={`/dashboard/properties/${property.id}/edit`}>
                    <Button variant="outline" size="sm" className="w-full mb-2">
                      ویرایش
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full"
                    onClick={() => handleDelete(property.id)}
                  >
                    حذف
                  </Button>
                  {property.applications.length > 0 && (
                    <Link href={`/dashboard/properties/${property.id}/applications`}>
                      <Button variant="default" size="sm" className="w-full mt-2">
                        درخواست‌های اجاره ({property.applications.length})
                      </Button>
                    </Link>
                  )}
                </>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
} 