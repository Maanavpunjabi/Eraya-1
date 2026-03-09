import { auth } from '@/app/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/app/lib/prisma'
import AddProductForm from '@/app/admin/AddProductForm'  // ← new client component
// Add more client components later for events, hero, about

export default async function AdminDashboard() {
  const session = await auth()

  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/login')
  }

  const products = await prisma.product.findMany()
  const events = await prisma.event.findMany()

  return (
    <div className="pt-20 pb-12 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-serif font-bold mb-10 text-center">Admin Dashboard</h1>

      {/* Products Management */}
      <section className="mb-16 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Manage Products</h2>

        {/* Client-side interactive form */}
        <AddProductForm />

        {/* List existing products (server-fetched) */}
        <div className="mt-10">
          <h3 className="text-2xl mb-4">Current Products ({products.length})</h3>
          <ul className="space-y-4">
            {products.map((p) => (
              <li key={p.id} className="border p-4 rounded flex justify-between items-center">
                <div>
                  <strong>{p.name}</strong> - ₹{p.price} - {p.category} (Stock: {p.stock})
                </div>
                <button className="text-red-600">Delete</button> {/* TODO: implement delete */}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Events Management - placeholder for now */}
      <section className="mb-16 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Manage Events</h2>
        <p className="text-gray-600">Event form coming soon...</p>

        <div className="mt-10">
          <h3 className="text-2xl mb-4">Current Events ({events.length})</h3>
          <ul className="space-y-4">
            {events.map((e) => (
              <li key={e.id} className="border p-4 rounded">
                <strong>{e.title}</strong> - {e.description}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Hero & About sections - add client forms later */}
      <section className="mb-16 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Hero Images & About Us</h2>
        <p className="text-gray-600">Forms coming soon...</p>
      </section>
    </div>
  )
}