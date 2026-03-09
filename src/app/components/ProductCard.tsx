'use client'

import Image from 'next/image'
import { useCartStore } from '@/app/store/cartStore'

type Product = {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
}

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="aspect-square relative">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <h3 className="font-medium text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-purple-700">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <button
            onClick={() => addItem(product)}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}