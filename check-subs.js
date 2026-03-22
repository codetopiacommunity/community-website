const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  try {
    const subscribers = await prisma.subscriber.findMany();
    console.log("Subscribers in Database:");
    console.dir(subscribers, { depth: null });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
