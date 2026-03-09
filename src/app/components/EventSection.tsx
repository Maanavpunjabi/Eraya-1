'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

type Event = {
  id: string
  title: string
  description?: string | null
  imageUrl?: string | null
  link?: string | null
  isActive: boolean
}

type Props = {
  events: Event[]
}

export default function EventSection({ events }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll effect (slow continuous scroll)
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer || events.length < 3) return // need enough items for loop

    let animationFrame: number
    let scrollPos = 0

    const scroll = () => {
      if (!scrollContainer) return
      scrollPos += 0.5 // adjust speed (higher = faster)
      if (scrollPos >= scrollContainer.scrollWidth / 2) {
        scrollPos = 0
        scrollContainer.scrollLeft = 0 // seamless reset
      }
      scrollContainer.scrollLeft = scrollPos
      animationFrame = requestAnimationFrame(scroll)
    }

    animationFrame = requestAnimationFrame(scroll)

    // Pause on hover
    const pause = () => cancelAnimationFrame(animationFrame)
    const resume = () => (animationFrame = requestAnimationFrame(scroll))

    scrollContainer.addEventListener('mouseenter', pause)
    scrollContainer.addEventListener('mouseleave', resume)

    return () => {
      cancelAnimationFrame(animationFrame)
      scrollContainer.removeEventListener('mouseenter', pause)
      scrollContainer.removeEventListener('mouseleave', resume)
    }
  }, [events.length])

  if (events.length === 0) return null

  // Duplicate events for seamless infinite loop
  const displayedEvents = [...events, ...events]

  return (
    <section className="py-12 bg-gradient-to-b from-white to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-10 text-gray-900">
          Featured Events & Offers
        </h2>

        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide snap-x snap-mandatory flex gap-6 pb-4 cursor-grab active:cursor-grabbing select-none"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {displayedEvents.map((event, idx) => (
            <motion.div
              key={`${event.id}-${idx}`}
              className="flex-shrink-0 w-80 md:w-96 snap-center"
              whileHover={{ scale: 1.04, transition: { duration: 0.3 } }}
            >
              <Link href={event.link || '#'} className="block group">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                  {event.imageUrl ? (
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-purple-200 flex items-center justify-center text-purple-600 text-xl font-medium">
                      {event.title}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{event.title}</h3>
                    {event.description && (
                      <p className="text-sm md:text-base opacity-90 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Dots indicator (optional) */}
        <div className="flex justify-center mt-6 gap-2">
          {events.map((_, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-purple-400/50"
            />
          ))}
        </div>
      </div>
    </section>
  )
}