"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import Image from "next/image";

const propertySchema = z.object({
  name: z.string().min(3, { message: "نام ملک باید حداقل 3 کاراکتر باشد" }),
  description: z.string().min(10, { message: "توضیحات باید حداقل 10 کاراکتر باشد" }),
  pricePerMonth: z.number().min(0),
  securityDeposit: z.number().min(0),
  applicationFee: z.number().min(0),
  beds: z.number().min(0),
  baths: z.number().min(0),
  squareFeet: z.number().min(0),
  propertyType: z.enum(["Rooms", "Tinyhouse", "Apartment", "Villa", "Townhouse", "Cottage"]),
  isPetsAllowed: z.boolean().optional(),
  isParkingIncluded: z.boolean().optional(),
  amenities: z.array(z.string()),
  highlights: z.array(z.string()),
  location: z.object({
    address: z.string(),
    province: z.string(),
    city: z.string(),
    district: z.string().optional(),
    postalCode: z.string(),
    coordinates: z.object({
      latitude: z.number(),
      longitude: z.number()
    })
  })
});

type PropertyFormData = z.infer<typeof propertySchema>;

const PROPERTY_TYPES = [
  { value: "Rooms", label: "اتاق" },
  { value: "Tinyhouse", label: "خانه کوچک" },
  { value: "Apartment", label: "آپارتمان" },
  { value: "Villa", label: "ویلا" },
  { value: "Townhouse", label: "خانه شهری" },
  { value: "Cottage", label: "کلبه" }
];

const AMENITIES = [
  { value: "WasherDryer", label: "ماشین لباسشویی و خشک‌کن" },
  { value: "AirConditioning", label: "تهویه مطبوع" },
  { value: "Dishwasher", label: "ماشین ظرفشویی" },
  { value: "HighSpeedInternet", label: "اینترنت پرسرعت" },
  { value: "HardwoodFloors", label: "کف چوبی" },
  { value: "WalkInClosets", label: "کمد دیواری" },
  { value: "Microwave", label: "مایکروویو" },
  { value: "Refrigerator", label: "یخچال" },
  { value: "Pool", label: "استخر" },
  { value: "Gym", label: "باشگاه" },
  { value: "Parking", label: "پارکینگ" },
  { value: "PetsAllowed", label: "مجاز برای حیوانات خانگی" },
  { value: "WiFi", label: "وای‌فای" }
];

const HIGHLIGHTS = [
  { value: "HighSpeedInternetAccess", label: "دسترسی به اینترنت پرسرعت" },
  { value: "WasherDryer", label: "ماشین لباسشویی و خشک‌کن" },
  { value: "AirConditioning", label: "تهویه مطبوع" },
  { value: "Heating", label: "سیستم گرمایش" },
  { value: "SmokeFree", label: "عدم استعمال دخانیات" },
  { value: "CableReady", label: "آماده اتصال کابل" },
  { value: "SatelliteTV", label: "تلویزیون ماهواره‌ای" },
  { value: "DoubleVanities", label: "روشویی دوقلو" },
  { value: "TubShower", label: "وان و دوش" },
  { value: "Intercom", label: "آیفون تصویری" },
  { value: "SprinklerSystem", label: "سیستم آبپاش" },
  { value: "RecentlyRenovated", label: "بازسازی شده" },
  { value: "CloseToTransit", label: "نزدیک به حمل و نقل عمومی" },
  { value: "GreatView", label: "منظره عالی" },
  { value: "QuietNeighborhood", label: "محله آرام" }
];

const PROVINCES = [
  { value: "Tehran", label: "تهران" },
  { value: "Isfahan", label: "اصفهان" },
  { value: "Fars", label: "فارس" },
  { value: "Khorasan_Razavi", label: "خراسان رضوی" },
  { value: "East_Azerbaijan", label: "آذربایجان شرقی" },
  { value: "West_Azerbaijan", label: "آذربایجان غربی" },
  { value: "Gilan", label: "گیلان" },
  { value: "Mazandaran", label: "مازندران" },
  { value: "Kerman", label: "کرمان" },
  { value: "Khuzestan", label: "خوزستان" }
];

interface PropertyFormProps {
  initialData?: PropertyFormData & { id?: number };
  onSubmit: (data: FormData) => Promise<void>;
}

export default function PropertyForm({ initialData, onSubmit }: PropertyFormProps) {
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoUrls, setPhotoUrls] = useState<string[]>(initialData?.photoUrls || []);
  const [loading, setLoading] = useState(false);

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      pricePerMonth: 0,
      securityDeposit: 0,
      applicationFee: 0,
      beds: 0,
      baths: 0,
      squareFeet: 0,
      propertyType: "Apartment",
      isPetsAllowed: false,
      isParkingIncluded: false,
      amenities: [],
      highlights: [],
      location: {
        address: "",
        province: "Tehran",
        city: "",
        district: "",
        postalCode: "",
        coordinates: {
          latitude: 35.6892,
          longitude: 51.3890
        }
      }
    }
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + photos.length > 10) {
      toast.error("حداکثر 10 عکس می‌توانید آپلود کنید");
      return;
    }
    setPhotos(prev => [...prev, ...files]);
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (data: PropertyFormData) => {
    try {
      setLoading(true);

      const formData = new FormData();
      photos.forEach(photo => {
        formData.append("photos", photo);
      });
      formData.append("property", JSON.stringify(data));

      await onSubmit(formData);
      toast.success(initialData ? "ملک با موفقیت بروزرسانی شد" : "ملک با موفقیت ثبت شد");
    } catch (error) {
      console.error("Property submission error:", error);
      toast.error("خطا در ثبت ملک");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام ملک</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نوع ملک</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="نوع ملک را انتخاب کنید" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PROPERTY_TYPES.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>توضیحات</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pricePerMonth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اجاره ماهانه (تومان)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="securityDeposit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ودیعه (تومان)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="applicationFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>هزینه درخواست (تومان)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="beds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>تعداد اتاق خواب</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="baths"
            render={({ field }) => (
              <FormItem>
                <FormLabel>تعداد حمام</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="squareFeet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>متراژ (متر مربع)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-2">
            <FormLabel>امکانات</FormLabel>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
              {AMENITIES.map(amenity => (
                <FormField
                  key={amenity.value}
                  control={form.control}
                  name="amenities"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-x-reverse">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(amenity.value)}
                          onCheckedChange={checked => {
                            const newValue = checked
                              ? [...field.value, amenity.value]
                              : field.value?.filter(value => value !== amenity.value);
                            field.onChange(newValue);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {amenity.label}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          <div className="col-span-2">
            <FormLabel>ویژگی‌های برجسته</FormLabel>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
              {HIGHLIGHTS.map(highlight => (
                <FormField
                  key={highlight.value}
                  control={form.control}
                  name="highlights"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-x-reverse">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(highlight.value)}
                          onCheckedChange={checked => {
                            const newValue = checked
                              ? [...field.value, highlight.value]
                              : field.value?.filter(value => value !== highlight.value);
                            field.onChange(newValue);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {highlight.label}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          <FormField
            control={form.control}
            name="isPetsAllowed"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-x-reverse">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  مجاز برای حیوانات خانگی
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isParkingIncluded"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-x-reverse">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  پارکینگ دارد
                </FormLabel>
              </FormItem>
            )}
          />

          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-4">موقعیت مکانی</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="location.province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>استان</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="استان را انتخاب کنید" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PROVINCES.map(province => (
                          <SelectItem key={province.value} value={province.value}>
                            {province.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شهر</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location.district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>محله</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location.address"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>آدرس کامل</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location.postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>کد پستی</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="col-span-2">
            <FormLabel>عکس‌ها</FormLabel>
            <div className="mt-2">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoChange}
                className="mb-4"
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={URL.createObjectURL(photo)}
                      alt={`عکس ${index + 1}`}
                      width={200}
                      height={200}
                      className="rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {photoUrls.map((url, index) => (
                  <div key={`existing-${index}`} className="relative">
                    <Image
                      src={url}
                      alt={`عکس ${index + 1}`}
                      width={200}
                      height={200}
                      className="rounded-lg object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "در حال پردازش..." : initialData ? "بروزرسانی ملک" : "ثبت ملک"}
        </Button>
      </form>
    </Form>
  );
} 