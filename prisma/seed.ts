import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🚀 Prisma 7 Adapter initialized. Starting seed...");
  
  // 1. Seed Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@eraya.com' },
    update: { role: 'ADMIN', password: hashedPassword },
    create: {
      email: 'admin@eraya.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
  console.log("✅ Admin user seeded.");

  // 2. Seed Sample Events
  console.log("⏳ Adding sample events...");
  await prisma.event.createMany({
    data: [
      {
        title: "Diwali Special Collection",
        description: "Up to 30% off on gold & diamond jewelry",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        link: "/shop?category=Rings",
        isActive: true,
      },
      {
        title: "New Bridal Series Launch",
        description: "Exclusive designs for the modern bride",
        imageUrl: "https://images.unsplash.com/photo-1593105079780-264a8f3f8c09?w=800",
        link: "/shop?category=Necklaces",
        isActive: true,
      },
      {
        title: "Limited Edition Sapphire Rings",
        description: "Only 10 pieces available",
        imageUrl: "https://images.unsplash.com/photo-1611590027211-b954fd027b51?w=800",
        link: "/shop",
        isActive: true,
      },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Sample events added');

  console.log("🏆 SEEDING COMPLETE");
}

main()
  .catch((e) => {
    console.error("❌ SEED ERROR:", e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end(); // Important for Prisma 7 Adapters to close the connection pool
  });