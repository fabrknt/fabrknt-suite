'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BasicInfoSchema, type BasicInfoInput, type CreateListingInput } from '@/lib/schemas/listing';

interface BasicInfoStepProps {
  defaultValues: Partial<CreateListingInput>;
  onNext: (data: BasicInfoInput) => void;
  onPrevious: () => void;
}

const categories = [
  { value: 'defi', label: 'DeFi', description: 'Decentralized Finance' },
  { value: 'nft', label: 'NFT', description: 'Non-Fungible Tokens & Collectibles' },
  { value: 'gaming', label: 'Gaming', description: 'Blockchain Gaming & Metaverse' },
  { value: 'infrastructure', label: 'Infrastructure', description: 'Protocols & Developer Tools' },
  { value: 'dao', label: 'DAO', description: 'Decentralized Autonomous Organizations' },
  { value: 'social', label: 'Social', description: 'Social Networks & Communication' },
  { value: 'marketplace', label: 'Marketplace', description: 'Trading & Commerce Platforms' },
  { value: 'other', label: 'Other', description: 'Other Categories' },
];

const chains = [
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'base', label: 'Base' },
  { value: 'polygon', label: 'Polygon' },
  { value: 'solana', label: 'Solana' },
  { value: 'multi-chain', label: 'Multi-chain' },
  { value: 'other', label: 'Other' },
];

export function BasicInfoStep({ defaultValues, onNext, onPrevious }: BasicInfoStepProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BasicInfoInput>({
    resolver: zodResolver(BasicInfoSchema),
    defaultValues: {
      projectName: defaultValues.projectName || '',
      productType: defaultValues.productType || '',
      description: defaultValues.description || '',
      category: defaultValues.category,
      chain: defaultValues.chain,
      website: defaultValues.website || '',
    },
  });

  const description = watch('description'); // eslint-disable-line react-hooks/incompatible-library -- React Hook Form watch() is used intentionally
  const descriptionLength = description?.length || 0;

  const onSubmit = (data: BasicInfoInput) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
        <p className="text-muted-foreground">
          Tell us about your project
        </p>
      </div>

      <div className="space-y-4">
        {/* Project Name */}
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium mb-2">
            Project Name *
          </label>
          <input
            {...register('projectName')}
            id="projectName"
            type="text"
            placeholder="e.g., Uniswap, Aave, Magic Eden"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {errors.projectName && (
            <p className="text-sm text-red-600 mt-1">{errors.projectName.message}</p>
          )}
        </div>

        {/* Product Type */}
        <div>
          <label htmlFor="productType" className="block text-sm font-medium mb-2">
            Product Type *
          </label>
          <input
            {...register('productType')}
            id="productType"
            type="text"
            placeholder="e.g., DEX, Lending Protocol, NFT Marketplace"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {errors.productType && (
            <p className="text-sm text-red-600 mt-1">{errors.productType.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description *
          </label>
          <textarea
            {...register('description')}
            id="description"
            rows={5}
            placeholder="Describe your project, its unique value proposition, key features, traction, and why it's a good opportunity..."
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <div className="flex items-center justify-between mt-1">
            <div>
              {errors.description && (
                <p className="text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>
            <p className={`text-sm ${descriptionLength < 50 ? 'text-red-600' : 'text-muted-foreground'}`}>
              {descriptionLength} / 50 min
            </p>
          </div>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category *
          </label>
          <select
            {...register('category')}
            id="category"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label} - {cat.description}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-sm text-red-600 mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Chain */}
        <div>
          <label htmlFor="chain" className="block text-sm font-medium mb-2">
            Blockchain *
          </label>
          <select
            {...register('chain')}
            id="chain"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="">Select a blockchain</option>
            {chains.map((chain) => (
              <option key={chain.value} value={chain.value}>
                {chain.label}
              </option>
            ))}
          </select>
          {errors.chain && (
            <p className="text-sm text-red-600 mt-1">{errors.chain.message}</p>
          )}
        </div>

        {/* Website */}
        <div>
          <label htmlFor="website" className="block text-sm font-medium mb-2">
            Website (Optional)
          </label>
          <input
            {...register('website')}
            id="website"
            type="url"
            placeholder="https://yourproject.com"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {errors.website && (
            <p className="text-sm text-red-600 mt-1">{errors.website.message}</p>
          )}
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
