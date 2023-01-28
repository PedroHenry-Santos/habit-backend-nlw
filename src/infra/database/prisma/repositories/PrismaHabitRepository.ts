import { PrismaClient } from "@prisma/client";

import { Habit } from "../../../../domain/entities";
import { HabitRepository, HabitsByDateQueryData } from "../../../../domain/repositories";

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
}