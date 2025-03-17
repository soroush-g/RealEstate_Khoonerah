import Image from "next/image";
import { formatNumber } from "@/lib/utils";
import { Bed, Bath, Ruler, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

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
}

interface PropertyCardProps {
  property: Property;
  actions?: React.ReactNode;
}

export default function PropertyCard({ property, actions }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={property.photoUrls[0] || "/placeholder.jpg"}
          alt={property.name}
          fill
          className="object-cover"
        />
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">{property.name}</h3>
          <p className="text-primary font-semibold">
            {formatNumber(property.pricePerMonth)} تومان
            <span className="text-sm text-gray-500 font-normal"> / ماهانه</span>
          </p>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {property.description}
        </p>

        <div className="grid grid-cols-3 gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Bed className="h-4 w-4 ml-1" />
            {property.beds} خواب
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 ml-1" />
            {property.baths} حمام
          </div>
          <div className="flex items-center">
            <Ruler className="h-4 w-4 ml-1" />
            {property.squareFeet} متر
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="h-4 w-4 ml-1" />
          {property.location.city}، {property.location.province}
        </div>
      </CardContent>

      {actions && (
        <CardFooter className="p-4 pt-0">
          {actions}
        </CardFooter>
      )}
    </Card>
  );
} 