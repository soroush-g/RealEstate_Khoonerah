import React, { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useVirtualizer } from '@tanstack/react-virtual';
import { PropertyCard } from './PropertyCard';
import { Spinner } from './ui/spinner';
import debounce from 'lodash/debounce';
import { Property } from '@/types';

interface PropertyListProps {
  initialProperties?: Property[];
  filters?: Record<string, any>;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}

export const PropertyList: React.FC<PropertyListProps> = ({
  initialProperties = [],
  filters,
  onLoadMore,
  hasMore = false,
  isLoading = false,
}) => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const parentRef = useRef<HTMLDivElement>(null);
  const { ref: loadMoreRef, inView } = useInView();

  // مجازی‌سازی لیست برای پرفورمنس بهتر
  const rowVirtualizer = useVirtualizer({
    count: properties.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 300, // تخمین ارتفاع هر کارت
    overscan: 5, // تعداد آیتم‌های اضافی برای اسکرول نرم
  });

  // بهینه‌سازی فیلترها با Memo
  const filteredProperties = useMemo(() => {
    if (!filters || Object.keys(filters).length === 0) return properties;

    return properties.filter(property => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        switch (key) {
          case 'priceRange':
            return property.pricePerMonth >= value[0] && property.pricePerMonth <= value[1];
          case 'beds':
            return property.beds >= value;
          case 'baths':
            return property.baths >= value;
          case 'propertyType':
            return property.propertyType === value;
          case 'amenities':
            return value.every((amenity: string) => property.amenities.includes(amenity));
          default:
            return true;
        }
      });
    });
  }, [properties, filters]);

  // لود بیشتر با Debounce
  const debouncedLoadMore = useCallback(
    debounce(() => {
      if (hasMore && !isLoading && onLoadMore) {
        onLoadMore();
      }
    }, 500),
    [hasMore, isLoading, onLoadMore]
  );

  useEffect(() => {
    if (inView) {
      debouncedLoadMore();
    }
  }, [inView, debouncedLoadMore]);

  // بهینه‌سازی رندر با Memo
  const MemoizedPropertyCard = React.memo(PropertyCard);

  return (
    <div 
      ref={parentRef}
      className="h-[800px] overflow-auto"
      style={{
        contain: 'strict', // بهینه‌سازی رندر
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const property = filteredProperties[virtualRow.index];
          return (
            <div
              key={property.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <MemoizedPropertyCard property={property} />
            </div>
          );
        })}
      </div>

      {/* نشانگر لودینگ */}
      {isLoading && (
        <div className="flex justify-center p-4">
          <Spinner />
        </div>
      )}

      {/* المان برای تشخیص رسیدن به انتها */}
      <div ref={loadMoreRef} style={{ height: 20 }} />
    </div>
  );
}; 