import { prisma } from '@/app/lib/prisma'
import ProductCard from '@/app/components/ProductCard'

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const categories = await prisma.product.groupBy({
    by: ['category'],
    _count: { category: true },
  })

  const selectedCategory = searchParams.category || null

  const products = await prisma.product.findMany({
    where: selectedCategory ? { category: selectedCategory } : undefined,
    orderBy: { name: 'asc' },
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Our Collection</h1>

      {/* Category Filter */}
      <div className="mb-10 flex flex-wrap gap-3">
        <a
          href="/shop"
          className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
            !selectedCategory
              ? 'bg-purple-700 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </a>
        {categories.map((cat) => (
          <a
            key={cat.category}
            href={`/shop?category=${encodeURIComponent(cat.category || '')}`}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat.category
                ? 'bg-purple-700 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.category} ({cat._count.category})
          </a>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No products found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}