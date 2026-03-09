import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/app/lib/prisma'
import ProductCard from '@/app/components/ProductCard' // assume you have this

// Simple auto-play hero slider (static images for draft)
const heroImages = [
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600', // crystal necklace
  'https://thumbs.dreamstime.com/b/sparkling-diamond-engagement-ring-dark-background-high-quality-jewelry-shot-stunning-solitaire-marriage-close-up-326521277.jpg', // diamond ring
  'https://thumbs.dreamstime.com/b/elegant-pearl-necklace-pink-roses-white-surface-studio-shot-437795759.jpg', // pearl
  'https://imageretouchinglab.com/wp-content/uploads/2024/06/10.-Rose-Gold-Flower-Jewelry-1024x687.webp', // rose gold
]

export default async function Home() {
  const bestSellers = await prisma.product.findMany({
    take: 8,
    orderBy: { stock: 'desc' }, // simulate popularity
  })
  const events = await prisma.event.findMany({
  where: { isActive: true },
  orderBy: { createdAt: 'desc' },
  take: 6, // limit to avoid overcrowding
})

  return (
    <div className="pt-16"> {/* offset for fixed navbar */}

      {/* Hero Slider */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0 flex animate-slide">
          {heroImages.map((src, i) => (
            <div key={i} className="min-w-full h-full relative flex-shrink-0">
              <Image src={src} alt="Hero" fill className="object-cover brightness-75" priority={i === 0} />
              <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                <div>
                  <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 drop-shadow-2xl">
                    Eraya Ratna
                  </h1>
                  <p className="text-xl md:text-3xl mb-10 drop-shadow-lg max-w-3xl mx-auto">
                    Timeless luxury crafted with natural crystals
                  </p>
                  <Link href="/shop" className="btn-primary text-lg">
                    Shop Collection
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Marquee Announcement */}
      <div className="bg-pink-100 text-pink-800 py-3 overflow-hidden whitespace-nowrap">
        <div className="animate-marquee inline-block">
          New Spring Collection Out Now • Free Worldwide Shipping on Orders Over ₹5000 • Shop Now & Get 10% Off Your First Purchase • 
          &nbsp;&nbsp;&nbsp;&nbsp; {/* duplicate for seamless loop */}
          New Spring Collection Out Now • Free Worldwide Shipping on Orders Over ₹5000 • Shop Now & Get 10% Off Your First Purchase • 
        </div>
      </div>
      {/* Event Section - Horizontal auto/manual scroll */}
<section className="py-12 bg-gradient-to-b from-white to-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-10 text-[var(--primary)]">
      Featured Events & Offers
    </h2>

    <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory flex gap-6 pb-6 cursor-grab active:cursor-grabbing select-none">
      {/* Duplicate items for infinite feel */}
      {[...events, ...events].map((event, idx) => (
        <div
          key={`${event.id}-${idx}`}
          className="flex-shrink-0 w-80 md:w-96 snap-center rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <Link href={event.link || '#'} className="block group">
            <div className="relative aspect-[4/3]">
              <Image
                src={event.imageUrl || 'https://via.placeholder.com/600x450?text=Event'}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl md:text-2xl font-bold mb-2 drop-shadow-md">
                  {event.title}
                </h3>
                {event.description && (
                  <p className="text-sm md:text-base opacity-90 line-clamp-2 drop-shadow">
                    {event.description}
                  </p>
                )}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>

    {/* Optional dots indicator */}
    <div className="flex justify-center mt-6 gap-3">
      {events.map((_, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            i === 0 ? 'bg-[var(--secondary)] scale-125' : 'bg-gray-400/50'
          }`}
        />
      ))}
    </div>
  </div>
</section>

      {/* By Crystals - Hover Pop Circles */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif font-bold text-center mb-12">Shop by Crystal</h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {['Amethyst', 'Rose Quartz', 'Clear Quartz', 'Citrine', 'Black Tourmaline'].map((crystal) => (
            <Link key={crystal} href={`/shop?crystal=${crystal.toLowerCase()}`} className="group">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-transparent group-hover:border-[var(--secondary)] group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Image
                  src={`https://source.unsplash.com/random/400x400/?${crystal.toLowerCase()},crystal`} // placeholder
                  alt={crystal}
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-center mt-4 font-medium">{crystal}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Shop By Intention - 3D Flip Cards */}
      <section className="py-16 px-4 bg-gray-50">
        <h2 className="text-4xl font-serif font-bold text-center mb-12">Shop by Intention</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[
            { front: 'Love', backImg: heroImages[1], text: 'Heart-opening pieces' },
            { front: 'Protection', backImg: heroImages[2], text: 'Shielding energy' },
            { front: 'Abundance', backImg: heroImages[3], text: 'Prosperity & wealth' },
            { front: 'Clarity', backImg: heroImages[0], text: 'Mental focus' },
          ].map((item, i) => (
            <div key={i} className="group perspective-1000 h-96">
              <div className="relative h-full w-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-white rounded-xl shadow-lg flex flex-col items-center justify-center p-8">
                  <h3 className="text-3xl font-serif font-bold text-[var(--primary)]">{item.front}</h3>
                </div>
                {/* Back */}
                <div className="absolute inset-0 backface-hidden bg-white rounded-xl shadow-lg rotate-y-180 overflow-hidden">
                  <Image src={item.backImg} alt={item.front} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-6">
                    <p className="text-xl font-medium mb-4">{item.text}</p>
                    <Link href="/shop" className="btn-primary text-sm">
                      Quick Buy
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
<section className="py-20 px-4 max-w-7xl mx-auto bg-gradient-to-b from-white to-gray-50">
  <div className="flex flex-col items-center mb-12">
    <h2 className="text-4xl md:text-5xl font-serif font-bold text-center text-gray-900 mb-3">
      Best Sellers
    </h2>
    <div className="flex items-center gap-3 text-[var(--secondary)] text-sm md:text-base font-medium">
      <span className="text-xl">✦</span>
      <span>Featured in Vogue & Elle</span>
      <span className="text-xl">✦</span>
    </div>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {bestSellers.map((product) => (
      <div
        key={product.id}
        className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500"
      >
        <div className="aspect-square relative">
          <Image
            src={product.imageUrl || 'https://via.placeholder.com/400'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="bg-red-600 text-white font-bold py-2 px-8 rounded-full transform -rotate-12 text-xl tracking-wider">
                SOLD OUT
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-serif font-medium text-lg text-gray-900 group-hover:text-[var(--secondary)] transition-colors">
              {product.name}
            </h3>
            <span className="text-xl opacity-70 group-hover:opacity-100 transition-opacity">✦</span>
          </div>
          <p className="text-[var(--secondary)] font-bold text-xl mb-4">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
            <button className="text-sm text-[var(--secondary)] hover:underline">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Bottom call-to-action */}
  <div className="text-center mt-12">
    <Link
      href="/shop"
      className="inline-flex items-center gap-3 bg-[var(--secondary)] text-[var(--primary)] font-medium py-4 px-10 rounded-full hover:bg-opacity-90 transition-all text-lg shadow-md hover:shadow-lg"
    >
      View All Best Sellers
      <span className="text-xl">→</span>
    </Link>
  </div>
</section>
{/* Brand Services - Primary dark background, secondary gold accents */}
<section className="py-20 px-4 bg-[var(--primary)] text-white">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 text-[var(--secondary)]">
      Our Promise to You
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
      {[
        {
          icon: "✏️",
          title: "Customization",
          text: "For customization, contact us via WhatsApp or our Instagram handle",
        },
        {
          icon: "📩",
          title: "Get In Touch",
          text: "Happy to help you, DM us on WhatsApp or email",
        },
        {
          icon: "⭐",
          title: "Rewards",
          text: "Follow us on Instagram, share the screenshot and earn 100 points",
        },
      ].map((pillar, i) => (
        <div
          key={i}
          className="group relative bg-gray-900/50 backdrop-blur-sm border border-[var(--secondary)]/30 hover:border-[var(--secondary)]/70 rounded-2xl p-8 transition-all duration-500 hover:shadow-[0_0_25px_rgba(249,220,170,0.15)]"
        >
          {/* Gold icon */}
          <div className="text-6xl mb-6 text-[var(--secondary)] opacity-90 group-hover:opacity-100 transition-opacity text-center">
            {pillar.icon}
          </div>

          {/* Title in gold */}
          <h3 className="text-2xl font-serif font-bold mb-4 text-[var(--secondary)] text-center">
            {pillar.title}
          </h3>

          {/* Description */}
          <p className="text-gray-300 leading-relaxed text-center text-base">
            {pillar.text}
          </p>
        </div>
      ))}
    </div>

    {/* Subtle gold underline */}
    <div className="w-32 h-1 mx-auto mt-16 bg-[var(--secondary)] rounded-full opacity-60" />
  </div>
</section>
    </div>
  )
}