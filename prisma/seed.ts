import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tables = [
    ["Table 1", 2], ["Table 2", 2], ["Table 3", 4],
    ["Table 4", 4], ["Table 5", 6], ["Table 6", 6],
    ["Table 7", 8], ["Table 8", 10]
  ];

  for (const [name, capacity] of tables) {
    await prisma.table.upsert({
      where: { name },
      update: { capacity: Number(capacity), active: true },
      create: { name, capacity: Number(capacity) }
    });
  }

  console.log("Seeded restaurant tables.");
}

main().finally(() => prisma.$disconnect());