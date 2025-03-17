import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/lib/utils';

interface PaymentFormProps {
  leaseId: number;
  amount: number;
  propertyName: string;
}

export default function PaymentForm({ leaseId, amount, propertyName }: PaymentFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leaseId,
          amount,
          description: `پرداخت اجاره ${propertyName}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'خطا در پرداخت');
      }

      // هدایت به درگاه پرداخت
      window.location.href = data.redirectUrl;
    } catch (err: any) {
      setError(err.message || 'خطا در پرداخت');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">اطلاعات پرداخت</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">مبلغ قابل پرداخت:</span>
          <span className="font-semibold">{formatNumber(amount)} تومان</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">ملک:</span>
          <span>{propertyName}</span>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <Button
          onClick={handlePayment}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'در حال پردازش...' : 'پرداخت'}
        </Button>

        <p className="text-xs text-gray-500 text-center mt-4">
          پرداخت از طریق درگاه امن زرین‌پال انجام می‌شود
        </p>
      </div>
    </div>
  );
} 