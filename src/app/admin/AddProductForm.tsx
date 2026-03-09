'use client'

import { useState } from 'react'

// Defining an interface for the form data for better type safety
interface ProductFormData {
  name: string
  description: string
  price: string
  category: string
  stock: string
  imageFile: File | null
}

export default function AddProductForm() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    category: 'Rings',
    stock: '',
    imageFile: null,
  })

  const [preview, setPreview] = useState<string | null>(null)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, imageFile: file }))
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('')
    setLoading(true)

    try {
      let imageUrl = ''

      // Upload image if selected
      if (formData.imageFile) {
        const uploadForm = new FormData()
        uploadForm.append('file', formData.imageFile)

        const uploadRes = await fetch('/api/upload-image', {
          method: 'POST',
          body: uploadForm,
        })

        if (!uploadRes.ok) {
          const errData = await uploadRes.json()
          throw new Error(errData.error || 'Image upload failed')
        }

        const { url } = await uploadRes.json()
        imageUrl = url
      }

      // Save product
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          category: formData.category,
          stock: Number(formData.stock),
          imageUrl,
        }),
      })

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.error || 'Failed to save product')
      }

      setStatus('Product added successfully!')
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'Rings',
        stock: '',
        imageFile: null,
      })
      setPreview(null)
      
    } catch (err: unknown) {
      // Type-safe error handling
      if (err instanceof Error) {
        setStatus('Error: ' + err.message)
      } else {
        setStatus('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        required
        className="p-3 border rounded"
      />

      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price (₹)"
        required
        className="p-3 border rounded"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="p-3 border rounded md:col-span-2"
        rows={3}
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="p-3 border rounded"
      >
        <option>Rings</option>
        <option>Necklaces</option>
        <option>Bracelets</option>
        <option>Earrings</option>
      </select>

      <input
        name="stock"
        type="number"
        value={formData.stock}
        onChange={handleChange}
        placeholder="Stock Quantity"
        required
        className="p-3 border rounded"
      />

      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1">Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-3 border rounded"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-3 w-48 h-48 object-cover rounded shadow"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:opacity-50 md:col-span-2"
      >
        {loading ? 'Adding...' : 'Add Product'}
      </button>

      {status && (
        <p className={`mt-4 text-center font-medium md:col-span-2 ${status.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {status}
        </p>
      )}
    </form>
  )
}