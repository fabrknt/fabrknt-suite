'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DealTermsSchema, type DealTermsInput, type CreateListingInput } from '@/lib/schemas/listing';
import { Shield, DollarSign, CheckCircle } from 'lucide-react';

interface DealTermsStepProps {
  defaultValues: Partial<CreateListingInput>;
  onNext: (data: DealTermsInput) => void;
  onPrevious: () => void;
}

export function DealTermsStep({ defaultValues, onNext, onPrevious }: DealTermsStepProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DealTermsInput>({
    resolver: zodResolver(DealTermsSchema),
    defaultValues: {
      hasNDA: defaultValues.hasNDA ?? false,
      requiresProofOfFunds: defaultValues.requiresProofOfFunds ?? false,
      minBuyerCapital: defaultValues.minBuyerCapital,
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library -- React Hook Form watch() is used intentionally
  const hasNDA = watch('hasNDA');
  const requiresProofOfFunds = watch('requiresProofOfFunds');

  const onSubmit = (data: DealTermsInput) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Deal Terms & Requirements</h2>
        <p className="text-muted-foreground">
          Set requirements for potential buyers or partners
        </p>
      </div>

      <div className="space-y-6">
        {/* NDA Requirement */}
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Non-Disclosure Agreement (NDA)</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    {...register('hasNDA')}
                    type="checkbox"
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              <p className="text-sm text-muted-foreground">
                Require buyers to sign an NDA before accessing detailed information or data room documents.
                {hasNDA && (
                  <span className="block mt-2 text-green-600 font-medium">
                    <CheckCircle className="w-4 h-4 inline mr-1" />
                    NDA will be required before data room access
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Proof of Funds */}
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Proof of Funds Requirement</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    {...register('requiresProofOfFunds')}
                    type="checkbox"
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              <p className="text-sm text-muted-foreground">
                Require buyers to provide proof of funds when making an offer to ensure they have the capital to complete the transaction.
                {requiresProofOfFunds && (
                  <span className="block mt-2 text-green-600 font-medium">
                    <CheckCircle className="w-4 h-4 inline mr-1" />
                    Buyers must upload proof of funds with offers
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Minimum Buyer Capital */}
        {requiresProofOfFunds && (
          <div className="border border-purple-200 bg-purple-50 rounded-lg p-4">
            <label htmlFor="minBuyerCapital" className="block text-sm font-medium mb-2">
              Minimum Buyer Capital (USD)
            </label>
            <input
              {...register('minBuyerCapital', { valueAsNumber: true })}
              id="minBuyerCapital"
              type="number"
              min="0"
              step="100000"
              placeholder="5000000"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Set the minimum capital requirement for serious buyers (optional)
            </p>
            {errors.minBuyerCapital && (
              <p className="text-sm text-red-600 mt-1">{errors.minBuyerCapital.message}</p>
            )}
          </div>
        )}

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">Deal Protection Tips</p>
              <ul className="space-y-1 list-disc list-inside text-blue-800">
                <li>NDAs protect your confidential business information</li>
                <li>Proof of funds reduces time-wasters and ensures serious inquiries</li>
                <li>You can always negotiate terms directly with qualified buyers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t border-border">
        <button
          type="button"
          onClick={onPrevious}
          className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
        >
          Previous
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
