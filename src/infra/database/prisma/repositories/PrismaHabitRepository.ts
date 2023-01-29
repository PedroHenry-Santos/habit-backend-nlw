import { PrismaClient } from "@prisma/client";

import { DayHabit, Habit } from "../../../../domain/entities";
import { HabitRepository, HabitsByDateQueryData, RemoveDayHabitQueryData } from "../../../../domain/repositories";

export class PrismaHabitRepository implements HabitRepository  {
  constructor (private readonly prisma: PrismaClient) {}

  async getHabitsADate({ date }: Omit<HabitsByDateQueryData, 'weekDay'>) {
    return this.prisma.day.findUnique({
      where: {
        date
      },
      include: {
        dayHabits: true
      }
    })
  }

  async getPossibleHabitsByDate({ date, weekDay }: HabitsByDateQueryData) {
    return this.prisma.habit.findMany({
      where: {
        createdAt: {
          lte: date
        },
        weekDays: {
          some: {
            weekDay
          }
        }
      }
    })
  }

  async create({ id, title, createdAt, weekDays}: Habit): Promise<void> {
    await this.prisma.habit.create({
      data: {
        id,
        title,
        createdAt,
        weekDays: {
          create: weekDays.map(({ id, weekDay }) => ({
            id,
            weekDay
          }))
        }
      }
    })
  }

  async createDayHabit({ day: { date }, habitId, id, dayId }: DayHabit) {
    console.log({ day: { date }, habitId, id, dayId })
    await this.prisma.dayHabit.create({
      data: {
        id,
        habit: {
          connect: {
            id: habitId
          }
        },
        day: {
          connectOrCreate: {
            create: {
              date,
              id: dayId
            },
            where: {
              id: dayId
            }
          }
        }
      }
    })
  }

  async removeDayHabit ({ dayId, habitId }: RemoveDayHabitQueryData) {
    await this.prisma.dayHabit.delete({
      where: {
        dayId_habitId: {
          dayId,
          habitId
        }
      }
    })
  }
}