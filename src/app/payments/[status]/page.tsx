"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PaymentResult({ params }: { params: { status: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refId = searchParams.get('refId');
  const isSuccess = params.status === 'success';

  useEffect(() => {
    // اگر کاربر مستقیماً وارد این صفحه شود، به داشبورد هدایت می‌شود
    if (!refId && isSuccess) {
      router.replace('/dashboard');
    }
  }, [refId, isSuccess, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          {isSuccess ? (
            <>
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
              <h2 className="mt-4 text-2xl font-semibold text-gray-900">
                پرداخت موفق
              </h2>
              <p className="mt-2 text-gray-600">
                پرداخت شما با موفقیت انجام شد.
              </p>
              {refId && (
                <p className="mt-4 text-sm text-gray-500">
                  کد پیگیری: {refId}
                </p>
              )}
            </>
          ) : (
            <>
              <XCircle className="mx-auto h-12 w-12 text-red-500" />
              <h2 className="mt-4 text-2xl font-semibold text-gray-900">
                پرداخت ناموفق
              </h2>
              <p className="mt-2 text-gray-600">
                متأسفانه پرداخت شما با مشکل مواجه شد.
              </p>
            </>
          )}

          <div className="mt-8 space-y-4">
            <Button
              onClick={() => router.push('/dashboard')}
              className="w-full"
            >
              بازگشت به داشبورد
            </Button>
            
            {!isSuccess && (
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="w-full"
              >
                تلاش مجدد
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 