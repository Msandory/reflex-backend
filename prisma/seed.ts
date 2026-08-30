import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/client.js'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create mock users
  await prisma.users.upsert({
    where: { email: 'retailer@example.com' },
    update: {},
    create: {
      id: 'user-1',
      name: 'Retailer Admin',
      email: 'retailer@example.com',
      role: 'retailer',
    },
  })

  await prisma.users.upsert({
    where: { email: 'rider1@example.com' },
    update: {},
    create: {
      id: 'rider-1',
      name: 'James',
      email: 'rider1@example.com',
      role: 'rider',
      points: 1250,
    },
  })

  await prisma.users.upsert({
    where: { email: 'rider2@example.com' },
    update: {},
    create: {
      id: 'rider-2',
      name: 'Sarah',
      email: 'rider2@example.com',
      role: 'rider',
      points: 800,
    },
  })

  // Create mock customer
  await prisma.customers.upsert({
    where: { id: 'cust-1' },
    update: {},
    create: {
      id: 'cust-1',
      name: 'John Doe',
      phone: '1234567890',
      address: 'Westlands',
    },
  })

  console.log('Database seeded successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
