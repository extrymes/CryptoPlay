import { hashPassword } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create sample user
  const user = await prisma.user.upsert({
    where: { email: "demo@cryptoplay.com" },
    update: {},
    create: {
      username: "demouser",
      email: "demo@cryptoplay.com",
      password: await hashPassword("demopassword"),
    },
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
