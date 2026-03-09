'use client'

import Image from 'next/image'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useCartStore } from '@/app/store/cartStore'
import Link from 'next/link'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCartStore()

  if (itemCount() === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-serif font-bold mb-6">Your Cart</h1>
        <p className="text-lg text-gray-600 mb-8">Your cart is empty.</p>
        <Link
          href="/shop"
          className="inline-block bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-lg shadow-sm border"
            >
              <div className="relative w-32 h-32 flex-shrink-0">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              <div className="flex-grow">
                <h3 className="font-medium text-lg mb-1">{item.name}</h3>
                <p className="text-purple-700 font-bold mb-4">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </p>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-1 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg border sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({itemCount()} items)</span>
                <span>₹{total().toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total().toLocaleString('en-IN')}</span>
              </div>
            </div>

            <Link
              href="/checkout" // we'll create this later
              className="block w-full bg-purple-600 text-white text-center py-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Proceed to Checkout
            </Link>

            <p className="text-center text-sm text-gray-500 mt-4">
              or <Link href="/shop" className="text-purple-600 hover:underline">continue shopping</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}