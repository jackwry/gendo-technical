const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

;(async () => {
  // Upsert a user - Alice
  await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      name: 'Alice',
      email: 'alice@prisma.io',
    },
  })
})()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
