import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

const firstHabitId = '0730ffac-d039-4194-9571-01aa2aa0efbd'
const firstHabitCreationDate = new Date('2022-12-31T03:00:00.000')

const secondHabitId = '00880d75-a933-4fef-94ab-e05744435297'
const secondHabitCreationDate = new Date('2023-01-03T03:00:00.000')

const thirdHabitId = 'fa1a1bcf-3d87-4626-8c0d-d7fd1255ac00'
const thirdHabitCreationDate = new Date('2023-01-08T03:00:00.000')

async function run() {
  await prisma.habit.deleteMany()
  await prisma.day.deleteMany()

  /**
   * Create habits
   */
  await Promise.all([
    prisma.habit.create({
      data: {
        id: firstHabitId,
        title: 'Beber 2L água',
        createdAt: firstHabitCreationDate,
        weekDays: {
          create: [
            { id: randomUUID(), weekDay: 1 },
            { id: randomUUID(), weekDay: 2 },
            { id: randomUUID(), weekDay: 3 },
          ]
        }
      }
    }),

    prisma.habit.create({
      data: {
        id: secondHabitId,
        title: 'Exercitar',
        createdAt: secondHabitCreationDate,
        weekDays: {
          create: [
            { id: randomUUID(), weekDay: 3 },
            { id: randomUUID(), weekDay: 4 },
            { id: randomUUID(), weekDay: 5 },
          ]
        }
      }
    }),

    prisma.habit.create({
      data: {
        id: thirdHabitId,
        title: 'Dormir 8h',
        createdAt: thirdHabitCreationDate,
        weekDays: {
          create: [
            { id: randomUUID(), weekDay: 1 },
            { id: randomUUID(), weekDay: 2 },
            { id: randomUUID(), weekDay: 3 },
            { id: randomUUID(), weekDay: 4 },
            { id: randomUUID(), weekDay: 5 },
          ]
        }
      }
    })
  ])

  await Promise.all([
    /**
     * Habits (Complete/Available): 1/1
     */
    prisma.day.create({
      data: {
        /** Monday */
        id: randomUUID(),
        date: new Date('2023-01-02T03:00:00.000z'),
        dayHabits: {
          create: {
            id: randomUUID(),
            habitId: firstHabitId,
          }
        }
      }
    }),

    /**
     * Habits (Complete/Available): 1/1
     */
    prisma.day.create({
      data: {
        /** Friday */
        id: randomUUID(),
        date: new Date('2023-01-06T03:00:00.000z'),
        dayHabits: {
          create: {
            id: randomUUID(),
            habitId: firstHabitId,
          }
        }
      }
    }),

    /**
     * Habits (Complete/Available): 2/2
     */
    prisma.day.create({
      data: {
        /** Wednesday */
        id: randomUUID(),
        date: new Date('2023-01-04T03:00:00.000z'),
        dayHabits: {
          create: [
            { id: randomUUID(), habitId: firstHabitId },
            { id: randomUUID(), habitId: secondHabitId },
          ]
        }
      }
    }),
  ])
}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })